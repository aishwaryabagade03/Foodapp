import UserModel from "../Models/UserModel";
import validator from "validator";
import bcrypt from "bcrypt";
import otpgenerator from "otp-generator";
import jwt from "jsonwebtoken";


export const Allusers = async (req, res) => {
  try {
    const UserData = await UserModel.find();
    if (UserData) {
      return res.status(200).json({
      data:UserData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Adduser = async (req, res) => {
  try {
      const {name, email, password, contact, location } = req.body;
      const UserData = new UserModel({
       name: name,
       email:email,
       password:password,
       contact:contact,
       location:location,  
      });
      UserData.save();
      if (UserData) {
        return res.status(201).json({
          data: UserData,
          message: "Created",
        });
      }
    }catch (error){
      return res.status(500).json({
        message: error.message,
      });
    }}

export const Getuser = async (req, res) => {
  try {
    const id = req.params.user_id;
    const UserData = await UserModel.findOne({ _id: id });
    if (UserData) {
      return res.status(200).json({
        data: UserData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Updateuser = async (req, res) => {
  try {
      const id = req.params.user_id;
      const {name, email, password, contact, location } = req.body;
      const Updateduser = await UserModel.updateOne(
        { _id: id },
        {
          $set: {
            name: name,
            email:email,
            password:password,
            contact:contact,
            location:location,
          },
        }
      );
      if (Updateduser.acknowledged) {
        return res.status(201).json({
          data: Updateduser,
          message: "Updated",
        });
      }
    ;
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Deleteuser = async (req, res) => {
  try {
    const id = req.params.user_id;
    const Deleteduser = await UserModel.deleteOne({ _id: id });
    if (Deleteduser.acknowledged) {
      return res.status(200).json({
        message: "Deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Signup = async (req, res) => {
  try {
    const {name, email, password, contact, location } = req.body;
    const IsEmail = validator.isEmail(email);
    const IsPassword = validator.isStrongPassword(password);
    if (!IsEmail) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
    if (!IsPassword) {
      return res.status(400).json({
        message: "Passsword must be minLength: 6",
      });
    }
    const Userexist = await UserModel.findOne({ Email: email });
    if (Userexist) {
      return res.status(400).json({
        message: "User already exist",
      });
    }
    const passString = password.toString();
    const hashPassword = bcrypt.hashSync(passString, 10);
    const otp = otpgenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    console.log(otp)
    const Newuser = new UserModel({
      name: name,
      email:email,
      password:hashPassword,
      contact:contact,
      location:location,
      otp: otp 
    });
    Newuser.save();
    console.log(Newuser);
    if (Newuser) {
      return res.status(201).json({
        message: "Successfully Registered",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const Signin = async (req, res) => {
  try {
    const { email, password, otp } = req.body; 
    if  (otp) {
      const OTP = otpgenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      console.log(OTP)
      return res.status(200).json({
        OTP:OTP,
        message: "OTP generated and sent",
      });
    } else {
      const IsEmail = validator.isEmail(email);
      const IsPassword = validator.isStrongPassword(password);

      if (!IsEmail) {
        return res.status(400).json({
          message: "Invalid email",
        });
      } else if (!IsPassword) {
        return res.status(400).json({
          message: "Password must be minLength: 6",
        });
      }

      const Userexist = await UserModel.findOne({ Email: email });

      if (!Userexist) {
        return res.status(400).json({
          message: "User does not exist",
        });
      }

      const ComparePassword = await bcrypt.compare(password, Userexist.password);

      if (!ComparePassword) {
        return res.status(400).json({
          message: "Invalid Credentials",
        });
      }

      const Token = await jwt.sign(
        {
          ID: Userexist._id,
          Email: Userexist.email,
        },
        "SecretKey",
        { expiresIn: "2h" }
      );

      return res.status(200).json({
        data: Userexist,
        token: Token,
        message: "Successfully login",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


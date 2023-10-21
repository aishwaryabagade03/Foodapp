import DrinkModel from "../Models/DrinkModel";
import multer from "multer";
import fs from "fs";
import path from "path";

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./Upload/drink")) {
      cb(null, "./Upload/drink");
    } else {
      fs.mkdirSync("./Upload/drink");
      cb(null, "./Upload/drink");
    }
  },
  filename: function (req, file, cb) {
    const name = file.originalname;
    const lastname = path.extname(name);
    const split = name.split(".");
    split.pop();
    const firstname = split.join(".");
    const fullname = firstname + "-" + Date.now() + lastname;
    cb(null, fullname);
  },
});

const Upload = multer({ storage: Storage });

export const Adddrink = (req, res) => {
  try {
    const Imgdata = Upload.single("thumbnail")
    console.log(Imgdata);
    Imgdata(req, res, function (error) {
      if (error) return res.status(400).json({ message: error.message });

      const {name,alcohol, type,description } = req.body;
      let thumbnail = null;
      if (req.file !== undefined) {
       thumbnail = req.file.filename;
      }
      console.log(req.file);

      const drinkData = new DrinkModel({
        name: name,
        alcohol: alcohol,
        type: type, 
        description: description,
        thumbnail: thumbnail,
      });

      drinkData.save();
      console.log(drinkData.thumbnail);

      const validationError = drinkData.validateSync();
      if (validationError) {
        return res.status(400).json({ message: validationError.message });
      }

      if (drinkData) {
        return res.status(201).json({
          data: drinkData,
          message: "Success",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Alldrinks = async (req, res) => {
  try {
    const drinkData = await DrinkModel.find();
    if (drinkData) {
      return res.status(200).json({
        data: drinkData,
        message: "Success",
      });
    }
    console.log(drinkData);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const Singledrink = async (req, res) => {
  try {
    const drinkId = req.params.drink_id;
    const drinkData = await DrinkModel.findOne({ _id: drinkId });
    if (drinkData) {
      return res.status(200).json({
        data: drinkData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const Updatedrink = async (req, res) => {
  try {
    const Imgdata = Upload.single("thumbnail")
    Imgdata(req, res, function (err) {
      if (err) return res.status(400).json({ message: err.message });
    });
    let thumbnail = drinkData.thumbnail;
    if (req.file) {
      thumbnail = req.file.filename;
      if (fs.existsSync(`./Upload/drink/${drinkData.thumbnail}`)) {
        fs.unlinkSync(`./Upload/drink/${drinkData.thumbnail}`);
      }
    }
    const {name,alcohol, type,description } = req.body;
    const drinkData = await DrinkModel.findOne({ _id: drinkId });
    const drinkId = req.params.drink_id;
    const Updateddrink = await DrinkModel.updateOne(
      { _id: drinkId },
      {
        $set: {
          name: name,
          alcohol: alcohol,
          type: type, 
          description: description,
          thumbnail: thumbnail,
        },
      }
    );
    if (Updateddrink.acknowledged) {
      return res.status(200).json({
        data: Updateddrink,
        message: "Updated Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Deletedrink = async (req, res) => {
  try {
    const drinkId = req.params.drink_id;
    const drinkData = await DrinkModel.findOne({ _id: drinkId });
    if (fs.existsSync("./Upload/drink" + drinkData.thumbnail)) {
      fs.unlinkSync("./Upload/drink" + drinkData.thumbnail);
    }
    const Deleteddrink = await DrinkModel.deleteOne({ _id: drinkId });
    if (Deleteddrink.acknowledged) {
      return res.status(200).json({
        message: "Data Successfully deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
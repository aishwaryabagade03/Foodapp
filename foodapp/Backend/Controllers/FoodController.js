import FoodModel from "../Models/FoodModel";
import multer from "multer";
import fs from "fs";
import path from "path";

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./Upload/food")) {
      cb(null, "./Upload/food");
    } else {
      fs.mkdirSync("./Upload/food");
      cb(null, "./Upload/food");
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

export const AddFood = (req, res) => {
  try {
    const Imgdata = Upload.single("thumbnail")
    console.log(Imgdata);
    Imgdata(req, res, function (error) {
      if (error) return res.status(400).json({ message: error.message });

      const {name,price, type, category,description } = req.body;
      let thumbnail = null;
      if (req.file !== undefined) {
       thumbnail = req.file.filename;
      }
      console.log(req.file);

      const FoodData = new FoodModel({
        name: name,
        price: price,
        type: type,
        category: category,  
        description: description,
        thumbnail: thumbnail,
      });

      FoodData.save();
      console.log(FoodData.thumbnail);

      const validationError = FoodData.validateSync();
      if (validationError) {
        return res.status(400).json({ message: validationError.message });
      }

      if (FoodData) {
        return res.status(201).json({
          data: FoodData,
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

export const AllFoods = async (req, res) => {
  try {
    const FoodData = await FoodModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categories",
        },
      },
      { $unwind: "$categories" },
    ]);
    if (FoodData) {
      return res.status(200).json({
        data: FoodData,
        message: "Success",
      });
    }
    console.log(FoodData);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const Singlefood = async (req, res) => {
  try {
    const foodId = req.params.food_id;
    const FoodData = await FoodModel.findOne({ _id: foodId });
    if (FoodData) {
      return res.status(200).json({
        data: FoodData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const Updatefood = async (req, res) => {
  try {
    const Imgdata = Upload.single("thumbnail")
    Imgdata(req, res, function (err) {
      if (err) return res.status(400).json({ message: err.message });
    });
    let thumbnail = FoodData.thumbnail;
    if (req.file) {
      thumbnail = req.file.filename;
      if (fs.existsSync(`./Upload/food/${FoodData.thumbnail}`)) {
        fs.unlinkSync(`./Upload/food/${FoodData.thumbnail}`);
      }
    }
    const {name,price, type, category,description } = req.body;
    const FoodData = await FoodModel.findOne({ _id: foodId });
    const foodId = req.params.food_id;
    const Updatedfood = await FoodModel.updateOne(
      { _id: foodId },
      {
        $set: {
          name: name,
          price: price,
          type: type,
          category: category,  
          description: description,
          thumbnail: thumbnail,
        },
      }
    );
    if (Updatedfood.acknowledged) {
      return res.status(200).json({
        data: Updatedfood,
        message: "Updated Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Deletefood = async (req, res) => {
  try {
    const foodId = req.params.food_id;
    const FoodData = await FoodModel.findOne({ _id: foodId });
    if (fs.existsSync("./Upload/food" + FoodData.thumbnail)) {
      fs.unlinkSync("./Upload/food" + FoodData.thumbnail);
    }
    const Deletedfood = await FoodModel.deleteOne({ _id: foodId });
    if (Deletedfood.acknowledged) {
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

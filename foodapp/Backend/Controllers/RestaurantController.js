import RestaurantsModel from "../Models/RestaurantsModel";
import multer from "multer";
import fs from "fs";
import path from "path";

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./Upload/restaurant")) {
      cb(null, "./Upload/restaurant");
    } else {
      fs.mkdirSync("./Upload/restaurant");
      cb(null, "./Upload/restaurant");
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

export const Addrestaurant = (req, res) => {
  try {
    const Imgdata = Upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "images", maxCount: 5 },
    ]);
    console.log(Imgdata);
    Imgdata(req, res, function (error) {
      if (error) return res.status(400).json({ message: error.message });

      const { name, description, location, cuisines, services, contact, paymentmethod} = req.body;

      let images = [];
      let thumbnail = null;

      if (req.files && req.files["thumbnail"]) {
        thumbnail = req.files["thumbnail"][0].filename;
      }
      console.log(req.files);
      if (req.files && req.files["images"]) {
        req.files["images"].forEach((file) => {
          images.push(file.filename);
        });
      }

      const restaurantData = new RestaurantsModel({
        name,
        description,
        location,
        cuisines,
        services,
        contact,
        paymentmethod,
        thumbnail: thumbnail,
        images: images.join(","),
      });

      restaurantData.save();
      console.log(restaurantData.images);

      const validationError = restaurantData.validateSync();
      if (validationError) {
        return res.status(400).json({ message: validationError.message });
      }

      if (restaurantData) {
        return res.status(201).json({
          data: restaurantData,
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

export const Allrestaurants = async (req, res) => {
  try {
    const restaurantData = await RestaurantsModel.find()
    if (restaurantData) {
      return res.status(200).json({
        data: restaurantData,
        message: "Success",
      });
    }
    console.log(restaurantData);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const Singlerestaurant = async (req, res) => {
  try {
    const restaurantid = req.params.restaurant_id;
    const restaurantData = await RestaurantsModel.findOne({ _id: restaurantid });
    const images = restaurantData.images.split(",");
    for (var i = 0; i < images.length; i++) {
      console.log(images[i]);
    }
    if (restaurantData) {
      return res.status(200).json({
        data: restaurantData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const Updaterestaurant = async (req, res) => {
  try {
    const Imgdata = Upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "images", maxCount: 5 },
    ]);
    Imgdata(req, res, function (err) {
      if (err) return res.status(400).json({ message: err.message });
    });
    let thumbnail = restaurantData.thumbnail;
    let images = [];
    if (req.files && req.files["thumbnail"]) {
      thumbnail = req.files["thumbnail"][0].filename;
      if (fs.existsSync("./Upload/restaurant" + restaurantData.thumbnail)) {
        fs.unlinkSync("./Upload/restaurant" + restaurantData.thumbnail);
      }
    }
    if (req.files && req.files["images"]) {
      req.files["images"].forEach((file) => {
        images.push(file.filename);
        for (var i = 0; i < images.length; i++) {
          if (fs.existsSync("./Upload/restaurant" + restaurantData.images[i])) {
            fs.unlinkSync("./Upload/restaurant" + restaurantData.images[i]);
          }
        }
      });
    }
    const { name, description, location, cuisines,services, contact, paymentmethod} = req.body;
    const restaurantData = await RestaurantsModel.findOne({ _id: restaurantid });
    const restaurantid = req.params.restaurant_id;
    const Updatedrestaurant = await RestaurantsModel.updateOne(
      { _id: restaurantid },
      {
        $set: {
          name,
          description,
          location,
          cuisines,
          services,
          contact,
          paymentmethod,
          thumbnail: thumbnail,
          images: images.join(","),
        },
      }
    );
    if (Updatedrestaurant.acknowledged) {
      return res.status(200).json({
        data: Updatedrestaurant,
        message: "Updated Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Deleterestaurant = async (req, res) => {
  try {
    const restaurantid = req.params.restaurant_id;
    const restaurantData = await RestaurantsModel.findOne({ _id: restaurantid });
    let images = restaurantData.images.split(",");
    for (var i = 0; i < images.length; i++) {
      if (fs.existsSync("./Upload/restaurant" + restaurantData.images[i])) {
        fs.unlinkSync("./Upload/restaurant" + restaurantData.images[i]);
      }
    }
    if (fs.existsSync("./Upload/restaurant" + restaurantData.thumbnail)) {
      fs.unlinkSync("./Upload/restaurant" + restaurantData.thumbnail);
    }
    const Deletedrestaurant = await RestaurantsModel.deleteOne({ _id: restaurantid });
    if (Deletedrestaurant.acknowledged) {
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

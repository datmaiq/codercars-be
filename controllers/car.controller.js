const { sendResponse, AppError } = require("../helpers/utils.js");

const { Car, DB } = require("../models/Car.js");

const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    const info = req.body;

    if (!info) throw new AppError(402, "Bad Request", "Create car Error");
    //mongoose query
    const created = await Car.create(info);
    console.log(created);
    sendResponse(
      res,
      200,
      true,
      { car: created },
      null,
      "Create Car Successfully"
    );
  } catch (err) {
    next(err);
  }
};

//Get all car
carController.getCars = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  try {
    Car.f;
    const listCar = await Car.find().skip(skip).limit(limit);
    const total = await Car.countDocuments();

    sendResponse(
      res,
      200,
      true,
      { cars: listCar, page: page, total: Math.ceil(total / limit) },
      null,
      "Get Car List Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

//Update a car
carController.editCar = async (req, res, next) => {
  const targetId = req.params.id;
  const updateInfo = req.body;

  if (!targetId || !updateInfo)
    throw new AppError(402, "Bad Request", "Update Car Error");

  const options = { new: true };
  try {
    const updated = await Car.findByIdAndUpdate(targetId, updateInfo, options);

    if (!updated) throw new AppError(404, "Not Found", "Car not found");

    sendResponse(
      res,
      200,
      true,
      { car: updated },
      null,
      "Update Car Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

// Delete car
carController.deleteCar = async (req, res, next) => {
  const targetId = req.params.id;

  if (!targetId) throw new AppError(402, "Bad Request", "Delete Car Error");

  try {
    const deleted = await Car.findByIdAndDelete(targetId);

    if (!deleted) throw new AppError(404, "Not Found", "Car not found");

    sendResponse(
      res,
      200,
      true,
      { car: deleted },
      null,
      "Delete Car Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = carController;

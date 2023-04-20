const mongoose = require('mongoose');
const Car = require('../models/Car');
const carController = {};

carController.createCar = async (req, res, next) => {
  const { make, model, transmission_type, size, style, release_date, price } = req.body;
  const info = {
    make,
    model,
    transmission_type,
    size,
    style,
    release_date,
    price,
  };
  try {
    if (!info) {
      throw new AppError(400, "Bad Request", "Create car Error");
    }
    const created = await Car.create(info);
    res.status(200).send({ message: "Create Car Successfully!", car: created })
    
  } catch (err) {
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  //const filter = { isDeleted: { $eq: false } };
  let { page } = req.query;
  page = parseInt(page) || 1;
  const limit = 10;
  let offset = limit * (page - 1);
  try {
    const listOfCar = await Car.find();
    console.log(listOfCar)
    const result = listOfCar.slice(offset, offset + limit);
    const total = listOfCar.length;
    res.status(200).send({
      cars: result,
      message: "Get Car List Successfully!",
      page: page,
      total: total,
    });
  } catch (err) {
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  const { id } = req.params;
  const { make, model, transmission_type, size, style, release_date, price } = req.body;
  const updateInfo = {
    make,
    model,
    transmission_type,
    size,
    style,
    release_date,
    price,
  };
  const targetId = id;
  const options = { new: true };
  try {
    if (Object.keys(updateInfo).length === 0) {
      throw new Error("field is invalid");
    }
    const updated = await Car.findByIdAndUpdate(targetId, updateInfo, options);
    res.status(200).send({ message: "Edit car successfully", car: updated });
  } catch (err) {
    next(err);
  }
};


carController.deleteCar = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
      return next(new Error('Invalid ID'));
    }
        const car = await Car.findByIdAndUpdate(id, 
      { isDeleted: true }, //we want to return the updated document. 
      { new: true, runValidators: true });// validating the updated document against the schema
        if (!car) {
      return next(new Error('Car not found!'));
    }
        return res.status(200).send({ message: 'Delete Car Successfully!'});
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
};


module.exports = carController;

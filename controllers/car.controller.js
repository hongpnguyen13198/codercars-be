const mongoose = require('mongoose');
const Car = require('../models/Car');
const carController = {};

carController.createCar = async (req, res, next) => {
	const { make, model, transmission_type, size, style, release_date, price } =
    req.body;
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
		// YOUR CODE HERE
		if(!info) throw new AppError(402,"Bad Request","Create car Error")
		const created= await Foo.create(info)
		sendResponse(res,200,true,{data:created},null,"Create car Success")
	} catch (err) {
		// YOUR CODE HERE
		next(err)
	}
};

carController.getCars = async (req, res, next) => {
	const filter = {}
	try {
		// YOUR CODE HERE
		const filter = { isDeleted: { $eq: false } };

let { page } = req.query;

page = parseInt(page) || 1;

const limit = 10;

let offset = limit * (page - 1);

const listOfCar = await Car.find(filter).sort({ createdAt: -1 });

const result = listOfCar.slice(offset, offset + limit);

const total = listOfCar.length;

res.status(200).send({
  cars: result,
  message: "Get Car List Successfully!",
  page: page,
  total: total,
});

		
	} catch (err) {
		// YOUR CODE HERE
		next(err)
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

if (Object.keys(updateInfo).length === 0) {
  throw new Error("field is invalid");
}

	try {
		// YOUR CODE HERE
		const updated = await Car.findByIdAndUpdate(targetId, updateInfo, options);
    res.status(200).send({ message: "Edit car successfully", car: updated });
	} catch (err) {
		// YOUR CODE HERE
		next(err);
	}
};

carController.deleteCar = async (req, res, next) => {
	const { id } = req.params;
  const targetId = id;
  const options = { new: true };
	try {
		// YOUR CODE HERE
		const deletedCar = await Car.findByIdAndUpdate(
			targetId,
			{
			  isDeleted: true,
			},
			options
		  );
		  if (!deletedCar) throw new Error("Car is not exist");
	  
		  deletedCar = await deletedCar.save();
		  res
      .status(200)
      .send({ cars: deletedCar, message: "Delete car successfully" });
		
	} catch (err) {
		// YOUR CODE HERE
		next(err)
	}
};

module.exports = carController;

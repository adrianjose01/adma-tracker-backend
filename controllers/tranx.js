const Tranx = require("../models/tranx");

exports.createTranx = (req, res, next) => {
  const { desc, type, amount, date, userId } = req.body;
  const newTranx = new Tranx({
    description: desc,
    amount: amount,
    type: type,
    date: date,
    userId: userId,
  });
  newTranx
    .save()
    .then((result) => {
      res.status(201).json({ message: "Transaction created succesfully" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getTranx = (req, res, next) => {
  const { userId } = req.params;

  Tranx.find({ userId: userId })
    .then((results) => {
      res.status(200).json({ trx: results });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteAll = (req, res, next) => {
  const { userId } = req.params;

  Tranx.deleteMany({ userId: userId })
    .then((results) => {
      res.status(200).json({ messge: "movements deleted succesfully!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

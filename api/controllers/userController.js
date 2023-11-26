exports.test = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello World",
  });
};

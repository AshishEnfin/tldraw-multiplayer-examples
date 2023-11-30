export const notFound = (req, res, next) => {
  res.status(404).json({
    succuss: false,
    message: "Api url doesn't exist",
  });
};

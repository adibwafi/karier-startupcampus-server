const errorHandler = async (err, req, res, next) => {
  console.log(err);
  if (
    err.name === `SequelizeValidationError` ||
    err.name === `SequelizeUniqueConstraintError`
  ) {
    let errorList = err.errors.map((el) => {
      return el.message;
    });
    res.status(400).json({
      statuscode: 400,
      status: `Bad Request`,
      error: errorList,
    });
  } else if (
    err.name === `SequelizeDatabaseError` ||
    err.name === "SequelizeForeignKeyConstraintError" ||
    err.name === `DATA_NOT_FOUND`
  ) {
    res.status(404).json({
      statuscode: 404,
      error: `${err.params ? err.params : 'data'} not found`,
    });
  } else if (err.name === "PASSWORD_MIN") {
    res.status(400).json({
      statuscode: 400,
      error: "Minimum password length is 5 digits",
    });
  } else if (err.name === `BADREQUEST`) {
    res.status(400).json({
      error: `Please fill in all of the forms`,
    });
  } else if (err.name === `NAME_IS_REQUIRED`) {
    res.status(400).json({
      error: `Name is required`,
    });
  } else if (err.name === `TITLE_IS_REQUIRED`) {
    res.status(400).json({
      error: `Title is required`,
    });
  } else if (err.name === `PASSWORD_IS_REQUIRED`) {
    res.status(400).json({
      error: `Password is required`,
    });
  } else if (err.name === `EMAIL_IS_REQUIRED`) {
    res.status(400).json({
      error: `Email is required`,
    });
  } else if (err.name === `SLUG_IS_REQUIRED`) {
    res.status(400).json({
      error: `Slug is required`,
    });
  } else if (err.name === `CONTENT_IS_REQUIRED`) {
    res.status(400).json({
      error: `Content is required`,
    });
  } else if (err.name === "UNAUTHORIZED" || err.name === "JsonWebTokenError") {
    res.status(401).json({
      statuscode: 401,
      error: "Invalid Token",
    });
  } else if (err.name === "INVALID_CREDENTIAL") {
    res.status(401).json({
      statuscode: 401,
      error: `User not found/password not matched`,
    });
  } else if (err.name === "FORBIDDEN") {
    res.status(403).json({
      error: "You're not an admin, you can only remove your product",
    });
  } else {
    res.status(500).json({
      statuscode: 500,
      error: "Internal Server Error",
    });
  }
};

module.exports = errorHandler;

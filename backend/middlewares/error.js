async function logErrors(err, req, res, next) {
  console.error("ERROR:", err.name);
  console.error(err.stack);
  next(err);
}

const handleDuplicateKeyError = async (err, res) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const msg = `An account with that ${field} already exists.`;
  res.status(code).send({ suc: false, msg, err: field });
};

const handleValidationError = async (err, res) => {
  let errors = Object.values(err.errors).map((el) => el.message);
  const fields = Object.values(err.errors).map((el) => el.path);
  const code = 400;
  if (errors.length > 1) {
    const formattedErrors = errors.join("");
    res.status(code).send({ suc: false, msg: formattedErrors, err: fields });
  } else {
    res.status(code).send({ suc: false, msg: errors, err: fields });
  }
};

async function errorHandler(err, req, res, next) {
  try {
    if (err.name === "ValidationError") {
      return await handleValidationError(err, res);
    } else if (err.code && err.code == 11000) {
      return await handleDuplicateKeyError(err, res);
    }
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).send({
        suc: false,
        msg: "Unexpected Error Occurred",
        err,
      });
    }
  }

  if (!res.headersSent) {
    res.status(err.status).send({ suc: false, msg: err.message, err});
  }
}

module.exports = {
  logErrors,
  errorHandler,
};

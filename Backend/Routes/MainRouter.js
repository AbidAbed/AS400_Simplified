const express = require("express");
const UsersRouter = require("./UsersRoute");
const { isCelebrateError } = require("celebrate");

//---------- MAIN ROUTER

//---------- ERROR HANDLER
async function errorHandler(err, req, res, next) {
  console.log(err);

  // CHECK FOR VALIDATION ERRORS
  if (!isCelebrateError(err)) {
    return next(err);
  }

  const [arr] = err.details.entries();

  const [obj] = arr[1].details;

  const result = {
    statusCode: 400,
    error: "Bad Request",
    message: obj.message,
    validation: {
      source: err.source,
      keys: [],
    },
  };

  if (err.details) {
    for (let i = 0; i < err.details.length; i += 1) {
      const path = err.details[i].path.join(".");
      result.validation.keys.push(EscapeHtml(path));
    }
  }

  return res.status(400).send(result);
}

//---------- DEFINING THE MAIN ROUTER , IMAGINE IT AS A WATER FLOW 😈

const MainRouter = express.Router();

MainRouter.use("/user", UsersRouter);

MainRouter.use(errorHandler);

module.exports = MainRouter;

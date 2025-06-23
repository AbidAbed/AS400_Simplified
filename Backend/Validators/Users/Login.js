const {
  celebrate,
  Joi,
  Segments,
  isCelebrateError,
  CelebrateError,
} = require("celebrate");

const loginValidator = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      username: Joi.string().required().not().empty(),
      password: Joi.string().required().not().empty(),
    })
    .required()
    .not()
    .empty(),
});

module.exports = loginValidator;

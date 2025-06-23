const {
  celebrate,
  Joi,
  Segments,
  isCelebrateError,
  CelebrateError,
} = require("celebrate");

const checkTokenValidator = celebrate({
  [Segments.HEADERS]: Joi.object()
    .keys({
      token: Joi.string().required().not().empty(),
    })
    .unknown(),
});

module.exports = checkTokenValidator;

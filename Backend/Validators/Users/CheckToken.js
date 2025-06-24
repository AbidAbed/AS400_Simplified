const {
  celebrate,
  Joi,
  Segments,
  isCelebrateError,
  CelebrateError,
} = require("celebrate");


//--------- VALIDATE EXSITANCE OF TOKEN
const checkTokenValidator = celebrate({
  [Segments.HEADERS]: Joi.object()
    .keys({
      token: Joi.string().required().not().empty(),
    })
    .unknown(),
});

module.exports = checkTokenValidator;

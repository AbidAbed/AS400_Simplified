const {
  celebrate,
  Joi,
  Segments,
  isCelebrateError,
  CelebrateError,
} = require("celebrate");

//--------- VALIDATE EXSITANCE OF USERNAME AND PASSWORD IN THE SENT REQUEST
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

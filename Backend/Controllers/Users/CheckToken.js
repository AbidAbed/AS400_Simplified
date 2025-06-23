const jsonwebtoken = require("jsonwebtoken");
const UsersModel = require("../../Models/Users");

async function checkToken(request, response) {
  try {
    const { token } = request.headers;
    console.log(typeof token);

    if (!token)
      return response.status(401).send({
        statusCode: 403,
        error: "Token Expired",
        message: "Token Expired , please re login",
        validation: {
          keys: [],
        },
      });

    const isTokenValid = await jsonwebtoken.verify(
      token,
      process.env.TOkENS_SECRET
    );

    if (!isTokenValid)
      return response.status(401).send({
        statusCode: 403,
        error: "Token Expired",
        message: "Token Expired , please re login",
        validation: {
          keys: [],
        },
      });

    const { _id, authCodes } = await jsonwebtoken.decode(
      token,
      process.env.TOkENS_SECRET
    );
    const foundUser = await UsersModel.findById(_id)
      .select("-password")
      .populate({
        path: "authrizations",
        select: "-authrizedUsers",
      });

    if (foundUser === null || foundUser === undefined)
      return response.status(401).send({
        statusCode: 404,
        error: "User doesn't exist",
        message: "User doesn't exist",
        validation: {
          keys: [],
        },
      });

    response.status(200).send({ ...foundUser.toObject(), token: token });
  } catch (exp) {
    console.log("[-] ERROR LOGIN " + exp);
    return response.status(500).send({
      statusCode: 500,
      error: "Token Expired",
      message: "Token Expired , please re login",
      validation: {
        keys: [],
      },
    });
  }
}

module.exports = checkToken;

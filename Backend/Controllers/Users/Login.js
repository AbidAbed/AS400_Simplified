const UsersModel = require("../../Models/Users");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

//---------------- LOGIN API  : BASE_URL/user/login

async function Login(request, response) {
  try {
    // EXTRACTING DATA
    const { username, password } = request.body;

    // FIRST THINGS FIRST CALCULATE HASHED PASSWORD
    const hashed_password = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    // GET USERNAME AND COMPARE PASSWORD
    const foundUser = await UsersModel.findOne({ username });

    // NO USER FOUND
    if (!foundUser || foundUser === null)
      return response.status(404).send({
        statusCode: 404,
        error: "User Doesn't exist",
        message: "User Doesn't exist",
        validation: {
          keys: [],
        },
      });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.toObject().password
    );

    if (!isPasswordCorrect)
      return response.status(401).send({
        statusCode: 401,
        error: "Invalid Credentials",
        message: "Wrong Username or Password",
        validation: {
          keys: [],
        },
      });

    // GENERATE TOKEN
    const token = jsonwebtoken.sign(
      {
        _id: foundUser.toObject()._id,
        authCodes: foundUser.toObject().authCodes.toString(),
      },
      process.env.TOkENS_SECRET,
      { expiresIn: "4h" }
    );

    // GET USER WITHOUT PASSWORD AND AUTHRIZED USERS TO WHAT THE USER IS AUTHRIZED ( SECURITY REASONS OBVIOUSLY -_- )
    const foundReturnedUser = await UsersModel.findById(foundUser._id)
      .select("-password")
      .populate({
        path: "authrizations",
        select: "-authrizedUsers",
      });

    response
      .status(200)
      .send({ ...foundReturnedUser.toObject(), token: token });
  } catch (exp) {
    console.log("[-] ERROR LOGIN EXP");
  }
}

module.exports = {
  Login,
};

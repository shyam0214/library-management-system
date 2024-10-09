const userService = require("../services/userService");
const {
  registerUserSchema,
  updateUserSchema,
  loginUserSchema,
} = require("../helper/validations");
const { getPagination } = require("../helper/pagination");
const { sendResponse } = require("../helper/responsesMessage");

const {
  ConvertHashPassword,
  ComparePassword,
  CreateToken,
} = require("../helper/helper");

exports.registerUser = async (req, res, next) => {
  try {
    let { email, name, password,role } =req.body ;
   
    const validate = await registerUserSchema.validateAsync(req.body);
   
    const findEmail = await userService.getUserByEmail(email);
    console.log(req.body)
    if (findEmail)
      return sendResponse(
        res,
        true,
        400,
        "Email Already Exist Try Another mail"
      );
   
    req.body.password = await ConvertHashPassword(password);

    let user = await userService.registerUser(req.body);

    return sendResponse(res, true, 201, "User registered successfully");
  } catch (error) {
    if (error.isJoi == true) {
      return sendResponse(
        res,
        false,
        400,
        error.details[0]?.message || "Invalid request data"
      );
    }
    return sendResponse(res, false, 500, error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const validation = loginUserSchema.validateAsync(req.body);

    const { email, password } = req.body;

    let user = await userService.getUserByEmail(email);
    if (!user)
      return sendResponse(res, false, 404, "Invalid email or password");

    const isMatch = await ComparePassword(password, user.password);
    if (isMatch == false)
      return sendResponse(res, false, 400, "Invalid email or password");

    const token = await CreateToken({
      id: user._id,
      name: user.name,
      email: user.email,
      role:user.role
    });

    return sendResponse(res, true, 200, "Login successful", { token });
  } catch (error) {
    if (error.isJoi == true) {
      return sendResponse(
        res,
        false,
        400,
        error.details[0]?.message || "Invalid request data"
      );
    }
    return sendResponse(res, false, 500, error.message);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { page, size } = req.query;
    const pagination = getPagination(page, size);
    const data = await userService.getAllUsers(pagination);
    return sendResponse(res, true, 200, "Users retrieved successfully", data);
  } catch (error) {
    return sendResponse(res, false, 500, error.message);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return sendResponse(res, false, 404, "User not found");
    return sendResponse(res, true, 200, "User retrieved successfully", user);
  } catch (error) {
    return sendResponse(res, false, 500, error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const error = updateUserSchema.validateAsync(req.body);
    if (email) {
      const findEmail = await userService.getUserByEmail(email);
      if (findEmail)
        return sendResponse(
          res,
          true,
          200,
          "Email Already Exist Try Another mail"
        );
    }

    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) return sendResponse(res, false, 404, "User not found");
    return sendResponse(res, true, 200, "User updated successfully", user);
  } catch (error) {
    if (error.isJoi == true) {
      return sendResponse(
        res,
        false,
        400,
        error.details[0]?.message || "Invalid request data"
      );
    }
    return sendResponse(res, false, 500, error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) return sendResponse(res, false, 404, "User not found");
    return sendResponse(res, true, 200, "User deleted successfully");
  } catch (error) {
    return sendResponse(res, false, 500, error.message);
  }
};

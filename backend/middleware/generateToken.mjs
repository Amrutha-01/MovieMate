import jwt from "jsonwebtoken";

 const generateToken = async function (id, email) {
  try {
    return jwt.sign({ _id: id, email: email }, process.env.JWT_SECRET_KEY);
  } catch (err) {
    console.log(err);
  }
};
export default generateToken;
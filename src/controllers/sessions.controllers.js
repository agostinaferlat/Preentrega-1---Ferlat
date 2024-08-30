import { createToken } from "../utils/jwt.js";
import { userDto } from "../dto/user.dto.js";

const newUser = async (req, res) => {
    try {
      res.status(201).json({ status: "OK", msg: "New user created" });
    } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
}; 


const loginUser = async (req, res) => {
    try {
      const token = createToken(req.user);
  
      res.cookie("token", token, { httpOnly: true });
      
      return res.status(200).json({ status: "OK", payload: req.user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
};


const loginGoogle = async (req, res) => {
    try {
      return res.status(200).json({ status: "OK", payload: req.user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
};

const currentSession = async (req, res) => {
    try {
      const userDTO = userDto(req.user);
      res.status(200).json({ status: "OK", user: userDTO });
    } catch (error) {
      res.status(500).json({ status: "Error", msg: "Internar server error" });
    }
};


export default {
    newUser,
    loginUser,
    loginGoogle,
    currentSession
};
// import userModel from "../models/userModel.js";
// import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
// import JWT from "jsonwebtoken";

// export const  registerController =async (req,res)=>{
//     try{
//       const {name,email,password,phone,address} =req.body
//       //validations
//       if (!name) {
//         return res.send({ error: "Name is Required" });
//       }
//       if (!email) {
//         return res.send({ error: "Email is Required" });
//       }
//       if (!password) {
//         return res.send({ error: "Password is Required" });
//       }
//       if (!phone) {
//         return res.send({ error: "Phone no is Required" });
//       }
//       if (!address) {
//         return res.send({ error: "Address is Required" });
//       }
//        //check user
//     const exisitingUser = await userModel.findOne({ email });
//     //exisiting user
//     if (exisitingUser) {
//       return res.status(200).send({
//         success: true,
//         message: "Already Register please login",
//       });
//     }
//     //register user
//     const hashedPassword = await hashPassword(password);
//     //save
//     const user = await new userModel({
//       name,
//       email,
//       phone,
//       address,
//       password: hashedPassword,
//     }).save();

//     res.status(201).send({
//       success: true,
//       message: "User Register Successfully",
//       user,
//     });
//     }
//     catch (error){
//         console.log(error);
//         res.send(500).send({
//             success:false,
//             message:"Error registering",
//             error
//         })
//     }
// }

// //POST LOGIN
// export const loginController = async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       //validation
//       if (!email || !password) {
//         return res.status(404).send({
//           success: false,
//           message: "Invalid email or password",
//         });
//       }
//       //check user
//       const user = await userModel.findOne({ email });
//       if (!user) {
//         return res.status(404).send({
//           success: false,
//           message: "Email is not registerd",
//         });
//       }
//       const match = await comparePassword(password, user.password);
//       if (!match) {
//         return res.status(200).send({
//           success: false,
//           message: "Invalid Password",
//         });
//       }
//       //token
//       const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: "1d",
//       });
//       res.status(200).send({
//         success: true,
//         message: "login successfully",
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           phone: user.phone,
//           adddress: user.address,
//         },
//         token,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         success: false,
//         message: "Error in login",
//         error,
//       });
//     }
//   };

//   //test controller
//   export const testController = (req, res) => {
//     try {
//       res.send("Protected Routes");
//     } catch (error) {
//       console.log(error);
//       res.send({ error });
//     }
//   };

import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // Validations
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User already registered. Please log in.",
      });
    }

    // Register user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error registering",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate a JWT token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token expires in 1 day
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const testController = (req, res) => {
  try {
    res.send("Protected Route");
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

// import express from "express";
// import {registerController,loginController,testController} from "../controller/authController.js"
// import {isAdmin,  requireSignIn } from "../middleware/authMiddleware.js";

// //router object
// const router = express.Router();

// //routing
// //REGISTER || METHOD POST
// router.post("/register", registerController);

// //LOGIN || POST
// router.post("/login", loginController);

// //test routes
// router.get("/test", requireSignIn, isAdmin, testController);

// export default router;
import express from "express";
import { registerController, loginController, testController } from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/test", requireSignIn, isAdmin, testController);

export default router;

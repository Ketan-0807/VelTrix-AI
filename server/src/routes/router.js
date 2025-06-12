import express from "express";
import templateController from "../controllers/template.controller.js";
import chatController from "../controllers/chat.controller.js";
import {getClerkUsers} from "../controllers/clerk.controller.js"; 
import { updateUser, userUpdateMiddleware } from '../controllers/updateUser.controller.js';
import { userData } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/template").post(templateController);
router.route("/chat").post(chatController);
router.route("/users").get(getClerkUsers); 
router.get('/health', (req, res) => {
    res.status(200).send({ status: 'OK' });
  });
// Use middleware for handling file uploads before the updateUser controller
router.route('/users/update').post(userUpdateMiddleware, updateUser);

router.route("/subscription").post(userData);


export default router;
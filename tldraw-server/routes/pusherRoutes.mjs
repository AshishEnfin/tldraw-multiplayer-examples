import { Router } from "express";
import { handler } from "../controller/pusherController.mjs";
const router = Router();

router.route("/pusher/auth").get(handler);

export default router;

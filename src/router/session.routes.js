import { Router } from "express";
import passport from "passport";
import { passportCall } from "../middlewares/passport.middleware.js"
import sessionsControllers from "../controllers/sessions.controllers.js";


const router = Router();

router.post("/register", passportCall("register"), sessionsControllers.newUser);
  
router.post("/login", passportCall("login"), sessionsControllers.loginUser );
  
  
router.get(
    "/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
      session: false,
    }), sessionsControllers.loginGoogle);
  
router.get("/current", passportCall("current"), sessionsControllers.currentSession );




export default router;

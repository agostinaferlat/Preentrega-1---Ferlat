import passport from "passport";
import { request, response } from "express";

export const passportCall = (strategy) => {
  return async (req = request, res = response, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ status: "Error", msg: info.message ? info.message : info.toString() });

      req.user = user;
      next();
    })(req, res, next);
  };
};
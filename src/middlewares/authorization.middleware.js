import { request, response } from "express";

export const authorization = (role) => {
  return async (req = request, res = response, next) => {
    if (!req.user) return res.status(401).json({ status: "error", msg: "The request requires user authentication" });
    if (req.user.role != role) return res.status(403).json({ status: "error", msg: "You don't have authorization to access this page." });
    
    next();
  };
};
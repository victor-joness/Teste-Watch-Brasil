import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "minhasenha";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acesso não autorizado: token ausente" });
  }

  try {
    jwt.verify(token as string, JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

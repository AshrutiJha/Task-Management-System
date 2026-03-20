import { Request, Response } from "express";
import { registerUser, loginUser, refreshTokenService } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = await loginUser(req.body);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const refresh = (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const data = refreshTokenService(refreshToken);

    res.json(data);
  } catch (e: any) {
    res.status(401).json({ message: e.message });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    // In real systems:
    // - Store refresh token in DB
    // - Delete it here

    res.status(200).json({
      message: "Logged out successfully. Please remove tokens from client.",
    });
  } catch (error: any) {
    res.status(500).json({ message: "Logout failed" });
  }
};
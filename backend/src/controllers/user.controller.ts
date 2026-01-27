import { Request, Response } from "express";

let users = [
  { id: 1, name: "Nitin" },
  { id: 2, name: "Guest" }
];

export const getUsers = (_req: Request, res: Response) => {
  res.status(200).json(users);
};

export const createUser = (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const newUser = {
    id: users.length + 1,
    name
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

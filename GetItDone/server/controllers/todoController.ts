import { Request, Response } from "express"

/*
 *  @route - GET /api/v1/todo
 *  @desc - Get the todo
 *  @access - Public (for now)
 */
export const getTodos = (req: Request, res: Response) => {
  res.send("Hello")
}

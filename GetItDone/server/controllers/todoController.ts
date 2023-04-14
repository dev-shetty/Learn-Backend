import { Request, Response } from "express"
import Todo from "../models/TodoModel"

/*
 *  @route - POST /api/v1/todo
 *  @desc - Create a todo
 *  @access - Protected
 */
export const createTodos = async (req: Request, res: Response) => {
  const { user } = req
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    })
  }

  const { title, description } = req.body
  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Enter the title for Todo",
    })
  }

  const newTodo = await Todo.create({
    title,
    description: description ?? "",
    user: user._id,
  })

  if (!newTodo) {
    return res.status(400).json({
      success: false,
      message: "Unable to create todo, please check the details and try again",
    })
  }

  return res.status(200).json({
    success: true,
    id: newTodo._id,
    title: newTodo.title,
    message: "Todo has been created!",
  })
}

/*
 *  @route - GET /api/v1/todo
 *  @desc - Get all the todos
 *  @access - Protected
 */
export const getTodos = async (req: Request, res: Response) => {
  const { user } = req
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    })
  }

  const todos = await Todo.find({ user: user._id })
  return res.status(200).json({
    success: true,
    todos,
  })
}

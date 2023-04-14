import { Request, Response } from "express"
import { FilterQuery } from "../lib/types"
import Todo from "../models/TodoModel"

/*
 *  @route  - POST /api/v1/todo
 *  @desc   - Create a todo
 *  @body   - title*, description
 *  @access - Protected
 */
export const createTodos = async (req: Request, res: Response) => {
  try {
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
        message:
          "Unable to create todo, please check the details and try again",
      })
    }

    return res.status(200).json({
      success: true,
      id: newTodo._id,
      title: newTodo.title,
      message: "Todo has been created!",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    })
  }
}

/*
 *  @route  - GET /api/v1/todo
 *         or GET /api/v1/todo?completed=true
 *  @desc   - Get all the todos
 *  @query  - completed = true | false
 *  @access - Protected
 */
export const getTodos = async (req: Request, res: Response) => {
  try {
    const { user } = req
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      })
    }

    const filterQuery: FilterQuery = {
      user: user._id,
    }

    const { completed } = req.query

    // if Completed query is not given then send all the Todos
    if (completed) {
      // If completed is true then give all the completed todo and vice-versa
      filterQuery.isCompleted = completed === "true"
    }

    const todos = await Todo.find(filterQuery)

    return res.status(200).json({
      success: true,
      todos: todos,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    })
  }
}

/*
 *  @route  - PATCH /api/v1/todo/:id
 *  @desc   - Update a specific todo
 *  @access - Protected
 */
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { isCompleted, title, description } = req.body

    const updates = {
      isCompleted,
      title,
      description,
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    )

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Cannot find the requested todo",
      })
    }

    return res.status(200).json({
      success: true,
      updatedTodo,
      message: "Todo Updated",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    })
  }
}

/*
 *  @route  - DELETE /api/v1/todo/:id
 *  @desc   - Delete the todo
 *  @access - Protected
 */
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const deletedTodo = await Todo.findByIdAndDelete(id)
    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Cannot find the requested todo",
      })
    }

    return res.status(200).json({
      success: true,
      deleteTodo,
      message: "Todo Deleted",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    })
  }
}

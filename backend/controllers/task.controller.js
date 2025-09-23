import { InvalidIdError, InvalidInputError, InvalidResourceError } from "../errors/customErrors.js";
import { catchAsyncErrors } from "../errors/globalErrorHandler.js";
import { getCurrentUsersTasks, getTaskById, createTask } from "../repositories/task.repo.js";

export const fetchCurrentUsersTasks = catchAsyncErrors(
  async (req, res, next) => {
    const { currentUser } = req;

    const tasks = await getCurrentUsersTasks(currentUser);

    res.status(200).json({
      message: "tasks fetches successfully",
      data: tasks,
    });
  }
);

export const fetchTaskDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    throw new InvalidIdError("Invalid task id");
  }

  const task = await getTaskById(id);

  res.status(200).json({
    message: "task fetched successfully",
    data: task,
  });
});

export const addTask = catchAsyncErrors(async (req, res, next) => {
  const { currentUser } = req;
  const { title, content } = req.body;

  // Validate required fields
  if (!title || !content) {
    throw new InvalidInputError("All starred fields are required");
  }

  // Create the task
  const newTask = await createTask({title, content, user : currentUser});

  res.status(201).json({
    message: "task created successfully",
    data: newTask,
  });
});



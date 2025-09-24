import { InvalidIdError, InvalidInputError, InvalidResourceError, UnAuthorizedError } from "../errors/customErrors.js";
import { catchAsyncErrors } from "../errors/globalErrorHandler.js";
import { getCurrentUsersTasks, getTaskById, createTask } from "../repositories/task.repo.js";
import { deleteTaskById } from "../repositories/task.repo.js";

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
  const { currentUser } = req;

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


// write the controller to edit a task
export const editTask = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { title, content, priority, tags  } = req.body;
  const { currentUser } = req;

  // validate the id
  if (!id) {
    throw new InvalidIdError("Invalid task id");
  } 

  // Validate required fields
  if (!title || !content || !priority || !tags  ) {
    throw new InvalidInputError("All starred fields are required");
  }

  // fetch the task to be updated
  const task = await getTaskById(id);

  // if task is not found
  if (!task) {
    throw new InvalidResourceError("Task not found");
  } 

  // check if the current user is the owner of the task
  if (task.user.toString() !== currentUser?._id?.toString()) {
    throw new UnAuthorizedError("You are not authorized to edit this task");
  }

 
  // update the task
  task.title = title;
  task.content = content;
  task.priority = priority;
  task.tags = tags; 
  await task.save();


  // send response
  res.status(200).json({
    message: "task updated successfully",
    data: task,
  });
});



// write the controller to delete a task
export const deleteTask = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req;
  // validate the id
  if (!id) {
    throw new InvalidIdError("Invalid task id");
  } 

  // fetch the task to be deleted
  const task = await getTaskById(id);   
  // if task is not found
  if (!task) {
    throw new InvalidResourceError("Task not found");
  }

  // check if the current user is the owner of the task
  if (task.user.toString() !== currentUser?._id?.toString()) {
    throw new UnAuthorizedError("You are not authorized to delete this task");
  }

  // delete the task
  await deleteTaskById(id); 
  // send response
  res.status(200).json({
    message: "task deleted successfully",
    data: null,
  });
});



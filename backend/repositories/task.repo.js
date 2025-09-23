import taskModel from "../models/task.model.js"



export const getCurrentUsersTasks = async (currentUser) => {
    // get all tasks and sort by priority
    const tasks = await taskModel.find({user : currentUser}).sort({ priority: 1 });
    return tasks;
}

export const getTaskById = async (id) => {
    const task = await taskModel.findById(id);
    return task;
}

export const createTask = async (taskData) => {
    const newTask = await taskModel.create(taskData);
    return newTask;
}
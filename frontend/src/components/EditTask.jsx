


import { useEffect, useState } from 'react';


import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import toast from 'react-hot-toast';
import { useEditTaskMutation } from '../redux/api/task.api';

export default function EditTask({ open = false, setOpen, task }) {
    const isOpen = Boolean(open);

    const [newTask, setNewTask] = useState({ ...task });
    const [newTags, setNewTags] = useState(newTask?.tags?.join(', ') || '');
    const [editTask, {error, isSuccess, data}] = useEditTaskMutation();




    useEffect(() => {
        if(error) {
            toast.error(error?.data?.message || "Something went wrong");
        }

        if(isSuccess) {
            toast.success("task edited successfully");
        }

    }, [error, isSuccess]);


    const handleTags = (e) => {

        setNewTags(e.target.value);

        const tagsStr = e.target.value;
        setNewTask((prev) => ({
            ...prev,
            tags: tagsStr.split(',').map(tag => tag.trim()).filter(tag => tag)
        }));

       
    }


    // handle add new task 
    const handleEditTask = async (e) => {
        e.preventDefault();

        const editTaskData = {
            title : newTask?.title || "",
            content : newTask?.content || "",
            tags : newTask?.tags || [],
            priority : newTask?.priority || 3,
        };

        await editTask({ id: task._id, body: editTaskData });

         setOpen(false);

        console.log(data);
    }


    return (
        <Dialog open={isOpen} onClose={setOpen} className="relative z-20">
            <DialogBackdrop className="fixed inset-0 backdrop-blur-md" />

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">

                        <DialogTitle className="text-lg font-bold text-gray-900 mb-4">
                            Edit Task
                        </DialogTitle>

                        <form onSubmit={handleEditTask} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter task title"
                                    value={newTask?.title}
                                    onChange={(e) => setNewTask((prev) => {
                                        return {
                                            ...prev, title: e.target.value
                                        }
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    rows="3"
                                    value={newTask?.content || ''}
                                    onChange={(e) => setNewTask((prev) => {
                                        return {
                                            ...prev, content: e.target.value
                                        }
                                    })}
                                    placeholder="Enter description"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Priority
                                </label>
                                <select
                                    value={newTask?.priority || 3}
                                    onChange={(e) => setNewTask((prev) => ({ ...prev, priority: parseInt(e.target.value) }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="3">Low</option>
                                    <option value="2">Medium</option>
                                    <option value="1">High</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tags
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter tags separated by commas"
                                    value={newTags}
                                    onChange={handleTags}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">Example: work, urgent, project</p>
                            </div>



                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Update Task
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>

                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}




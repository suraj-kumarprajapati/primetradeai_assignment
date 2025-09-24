


import { useEffect, useState } from 'react';


import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import toast from 'react-hot-toast';

export default function EditTask({ open = false, setOpen, task }) {
    const isOpen = Boolean(open);

    const [newTask, setNewTask] = useState({...task});




    useEffect(() => {
       
    }, []);


    // handle add new task 
    const handleEditTask = async (e) => {
        e.preventDefault();

       

    }


    return (
        <Dialog open={isOpen} onClose={setOpen} className="relative z-20">
            <DialogBackdrop className="fixed inset-0 backdrop-blur-md" />

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">

                        <DialogTitle className="text-lg font-bold text-gray-900 mb-4">
                            Add New Task
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
                                    value={newTask.content}
                                    onChange={(e) => setNewTask((prev) => {
                                        return {
                                            ...prev, content: e.target.value
                                        }
                                    })}
                                    placeholder="Enter description"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>



                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Create Task
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




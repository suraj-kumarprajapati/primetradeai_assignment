import { useEffect, useState } from "react";
import { useDeleteTaskMutation } from "../redux/api/task.api";
import toast from "react-hot-toast";
import EditTask from "./EditTask";

const Task = ({ task }) => {


    // for opening the edit task modal
    const [open, setOpen] = useState(false);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 1: return 'bg-red-100 text-red-800 border-red-200';
            case 2: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 3: return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getPriorityText = (priority) => {
        switch (priority) {
            case 1: return 'High Priority';
            case 2: return 'Medium Priority';
            case 3: return 'Low Priority';
            default: return 'Very Low Priority';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };


    const [deleteTask, {error, isSuccess}] = useDeleteTaskMutation();

    useEffect(() => {
        if(error) {
            toast.error(error?.data?.message || "Something went wrong");
        }

        if(isSuccess) {
            toast.success("Task Deleted Successfully");
        }
    }, [error, isSuccess])


    // handle delete task
    const handleDeleteTask = async () => {
        await deleteTask(task?._id);
    }
   

  

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
                {/* Task Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900 capitalize">
                            {task.title}
                        </h3>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {getPriorityText(task.priority)}
                    </span>
                </div>

                {/* Task Content */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {task.content || 'No description provided'}
                </p>

                {/* Tags */}
                {task.tags && task.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {task.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Task Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Created: {formatDate(task.createdAt)}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                    <button 
                        onClick={() => setOpen(true)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 cursor-pointer"
                    >
                        Edit
                    </button>

                    <button 
                        onClick={handleDeleteTask}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 cursor-pointer"
                    >
                        Delete
                    </button>
                   
                </div>
            </div>

            <EditTask open={open} setOpen={setOpen}  task={task} />
        </div>
    );
};

export default Task;
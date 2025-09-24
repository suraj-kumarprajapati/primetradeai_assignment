
import { useEffect, useState } from "react";
import {useGetAllTasksQuery } from "../redux/api/task.api";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import Task from "../components/Task";
import AddTask from "../components/AddTask";

const Tasks = () => {

    // for opening the add task modal
    const [open, setOpen] = useState(false);

   
    const { error : taskLoadError, isSuccess : taskLoadSuccess, data : tasks, isLoading : isTaskLoading} = useGetAllTasksQuery();

   



    // getting all tasks
    useEffect(() => {
        if (taskLoadError) {
            toast.error(taskLoadError?.data?.message || "Something went wrong");
        }

        if (taskLoadSuccess) {
            toast.success("tasks fetched successfully");
        }
    }, [taskLoadError, taskLoadSuccess]);


    

    // loggin tasks
    // console.log("Tasks API Response:", {
    //     tasks,
    //     isArray: Array.isArray(tasks),
    //     length: tasks?.length
    // });




    if(isTaskLoading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Manage your tasks and stay organized
                    </p>
                </div>

                {/* Tasks Grid */}
                {tasks && Array.isArray(tasks) && tasks.length != 0 && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        { tasks.map((task) => (
                            <Task key={task._id} task={task} />
                        ))}
                    </div>
                )}

                {/* Add New Task Button */}
                <div className="mt-8 text-center">
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New Task
                    </button>
                </div>


            </div>


            <AddTask open={open} setOpen={setOpen}   />
        </div>
    )
}

export default Tasks
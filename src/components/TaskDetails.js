import React from 'react';

const TaskDetails = ({ task, onEdit, onDelete }) => {
    if (!task) return <div className="text-center text-gray-500">Select a task to see details</div>;

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">{task.title}</h2>
            <p className="mb-2"><span className="font-semibold">Description:</span> {task.description}</p>
            <p className="mb-2"><span className="font-semibold">Due Date:</span> {new Date(task.dueDate).toLocaleDateString()}</p>
            <div className="flex justify-between mt-4">
                <button onClick={() => onEdit(task)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Edit
                </button>
                <button onClick={() => onDelete(task._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskDetails;

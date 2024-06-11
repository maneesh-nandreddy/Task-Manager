import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = ({ toggleQuestion, expandedQuestion, prelimsData }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const { data } = await axios.get('/api/tasks');
        setTasks(data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-500 mb-4">Task List</h1>
            <div className="space-y-4">
                {tasks.map((task) => (
                    <div key={task._id} className="border border-gray-300 rounded-md shadow-md p-2">
                        <div onClick={() => toggleQuestion(task._id)} className="flex justify-between cursor-pointer">
                            <p className="text-lg font-semibold">{task.title}</p>
                            <p className='text-blue-500 font-extrabold'>{expandedQuestion === task._id ? '-' : '+'}</p>
                        </div>
                        {expandedQuestion === task._id && (
                            <div className="text-sm pt-1 font-lg bg-gray-100 p-2 rounded-md">
                                <p>Description: {task.description}</p>
                                <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                                <button className="text-red-500 mt-2" onClick={() => handleDelete(task._id)}>Delete</button>
                                <button className="text-blue-500 mt-2 ml-4" onClick={() => setSelectedTask(task)}>Edit</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;

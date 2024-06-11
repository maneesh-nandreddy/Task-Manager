import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('/api/tasks');
            setTasks(response.data);
        };
        fetchTasks();
    }, []);

    const handleSaveTask = async (task) => {
        if (editingTask) {
            const response = await axios.put(`/api/tasks/${editingTask._id}`, task);
            setTasks(tasks.map((t) => (t._id === editingTask._id ? response.data : t)));
            setEditingTask(null);
        } else {
            const response = await axios.post('/api/tasks', task);
            setTasks([...tasks, response.data]);
        }
        setSelectedTask(null);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
    };

    const handleDeleteTask = async (id) => {
        await axios.delete(`/api/tasks/${id}`);
        setTasks(tasks.filter((task) => task._id !== id));
        setSelectedTask(null);
    };

    const handleCancel = () => {
        setEditingTask(null);
        setSelectedTask(null);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Task Management Application</h1>
            <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/3 px-2">
                    <TaskList tasks={tasks} onSelectTask={setSelectedTask} />
                </div>
                <div className="w-full md:w-1/3 px-2">
                    <TaskDetails task={selectedTask} onEdit={handleEditTask} onDelete={handleDeleteTask} />
                </div>
                <div className="w-full md:w-1/3 px-2">
                    <TaskForm task={editingTask} onSave={handleSaveTask} onCancel={handleCancel} />
                </div>
            </div>
        </div>
    );
};

export default App;

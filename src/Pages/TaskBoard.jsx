
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import React icons
import io from "socket.io-client";

// Establish the connection to the backend's socket
const socket = io("https://task-server-woad.vercel.app");

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "TODO",
  });
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get("https://task-server-woad.vercel.app/tasks");
      setTasks(data);
    };
    fetchTasks();

    // Listen for changes in the tasks collection
    socket.on("taskChange", (updatedTask) => {
      setTasks((prev) => {
        const taskIndex = prev.findIndex((task) => task._id === updatedTask._id);
        if (taskIndex !== -1) {
          const updatedTasks = [...prev];
          updatedTasks[taskIndex] = updatedTask;
          return updatedTasks;
        }
        return [...prev, updatedTask];
      });
    });

    return () => {
      socket.off("taskChange"); // Cleanup when the component unmounts
    };
  }, []);

  // Handle Add Task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://task-server-woad.vercel.app/tasks", newTask);
      setTasks((prev) => [...prev, { ...newTask, _id: data.taskId }]);
      setNewTask({ title: "", description: "", category: "TODO" });
      setShowAddTask(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Handle Edit Task
  const handleEditTask = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = { ...editingTask };
      setTasks((prev) =>
        prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );

      const { data } = await axios.put(
        `https://task-server-woad.vercel.app/tasks/${updatedTask._id}`,
        updatedTask
      );

      socket.emit("taskChange", data);
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle Delete Task
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`https://task-server-woad.vercel.app/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle Drag and Drop
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    movedTask.category = result.destination.droppableId;
    updatedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(updatedTasks);

    try {
      await axios.put(`https://task-server-woad.vercel.app/tasks/${movedTask._id}`, movedTask);
      socket.emit("taskChange", movedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className=" bg-gradient-to-r from-blue-500 to-green-500">
      <div className=" container mx-auto min-h-screen text-gray-200 py-16  p-4">
      <h1 className=" text-2xl md:text-4xl font-bold text-center   mb-6">Task Management System</h1>

      <button
        className="bg-green-500 text-white font-bold px-4 py-2 rounded mb-4"
        onClick={() => setShowAddTask(true)}
      >
        Add Task
      </button>

      {showAddTask && (
        <div className="bg-gray-800 p-4 rounded shadow-md">
          <h2 className="text-xl mb-2">Add New Task</h2>
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Task Title"
              className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Task Description"
              className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <select
              className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
              value={newTask.category}
              onChange={(e) =>
                setNewTask({ ...newTask, category: e.target.value })
              }
            >
              <option value="TODO">TODO</option>
              <option value="INPROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Add Task
            </button>
          </form>
        </div>
      )}

      {editingTask && (
        <div className="bg-gray-800 p-4 rounded shadow-md">
          <h2 className="text-xl mb-2">Edit Task</h2>
          <form onSubmit={handleEditTask}>
            <input
              type="text"
              placeholder="Task Title"
              className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Task Description"
              className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
              value={editingTask.description}
              onChange={(e) =>
                setEditingTask({ ...editingTask, description: e.target.value })
              }
            />
            <select
              className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
              value={editingTask.category}
              onChange={(e) =>
                setEditingTask({ ...editingTask, category: e.target.value })
              }
            >
              <option value="TODO">TODO</option>
              <option value="INPROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
            <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
              Update Task
            </button>
          </form>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["TODO", "INPROGRESS", "DONE"].map((category) => (
            <div key={category}>
              <h2 className="text-xl font-semibold mb-2 text-center">{category}</h2>
              <Droppable droppableId={category}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-gray-800 p-4 rounded min-h-[100px]"
                  >
                    {tasks
                      .filter((task) => task.category === category)
                      .map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="bg-gray-700 p-4 mb-2 rounded shadow relative flex flex-col justify-between h-full"
                            >
                              <div>
                                <h3 className="text-lg font-bold truncate">{task.title}</h3>
                                <p className="text-sm break-words overflow-hidden">{task.description}</p>
                              </div>

                              {/* Buttons at the bottom */}
                              <div className="mt-2 flex justify-end space-x-2 z-10">
                                <button
                                  onClick={() => setEditingTask(task)}
                                  className="bg-yellow-500 text-white px-3 py-1 rounded transform hover:scale-105 transition-all duration-300"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDeleteTask(task._id)}
                                  className="bg-red-500 text-white px-3 py-1 rounded transform hover:scale-105 transition-all duration-300"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
    </div>
  );
};

export default TaskBoard;

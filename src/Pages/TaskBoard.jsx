
// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";

// const TaskBoard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [showAddTask, setShowAddTask] = useState(false);
//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     category: "TODO",
//   });
//   const [editingTask, setEditingTask] = useState(null);

//   // Fetch tasks from the API
//   useEffect(() => {
//     const fetchTasks = async () => {
//       const { data } = await axios.get("http://localhost:5000/tasks");
//       setTasks(data);
//     };
//     fetchTasks();
//   }, []);

//   // Handle Add Task
//   const handleAddTask = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:5000/tasks", newTask);
//       setTasks((prev) => [...prev, data]); // Add the new task to the state
//       setNewTask({ title: "", description: "", category: "TODO" });
//       setShowAddTask(false);
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   // Handle Edit Task
//   const handleEditTask = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.put(
//         `http://localhost:5000/tasks/${editingTask._id}`,
//         editingTask
//       );
//       setTasks((prev) =>
//         prev.map((task) => (task._id === editingTask._id ? data : task))
//       );
//       setEditingTask(null);
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   // Handle Delete Task
//   const handleDeleteTask = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/tasks/${id}`);
//       setTasks((prev) => prev.filter((task) => task._id !== id));
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   // Handle Drag and Drop
//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;

//     const updatedTasks = [...tasks];
//     const [movedTask] = updatedTasks.splice(result.source.index, 1);
//     movedTask.category = result.destination.droppableId;
//     updatedTasks.splice(result.destination.index, 0, movedTask);

//     setTasks(updatedTasks);

//     try {
//       await axios.put(`http://localhost:5000/tasks/${movedTask._id}`, movedTask);
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-200 p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">Task Management System</h1>

//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//         onClick={() => setShowAddTask(true)}
//       >
//         Add Task
//       </button>

//       {showAddTask && (
//         <div className="bg-gray-800 p-4 rounded shadow-md">
//           <h2 className="text-xl mb-2">Add New Task</h2>
//           <form onSubmit={handleAddTask}>
//             <input
//               type="text"
//               placeholder="Task Title"
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={newTask.title}
//               onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//               required
//             />
//             <textarea
//               placeholder="Task Description"
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={newTask.description}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, description: e.target.value })
//               }
//             />
//             <select
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={newTask.category}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, category: e.target.value })
//               }
//             >
//               <option value="TODO">TODO</option>
//               <option value="INPROGRESS">IN PROGRESS</option>
//               <option value="DONE">DONE</option>
//             </select>
//             <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
//               Add Task
//             </button>
//           </form>
//         </div>
//       )}

//       {editingTask && (
//         <div className="bg-gray-800 p-4 rounded shadow-md">
//           <h2 className="text-xl mb-2">Edit Task</h2>
//           <form onSubmit={handleEditTask}>
//             <input
//               type="text"
//               placeholder="Task Title"
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={editingTask.title}
//               onChange={(e) =>
//                 setEditingTask({ ...editingTask, title: e.target.value })
//               }
//               required
//             />
//             <textarea
//               placeholder="Task Description"
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={editingTask.description}
//               onChange={(e) =>
//                 setEditingTask({ ...editingTask, description: e.target.value })
//               }
//             />
//             <select
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={editingTask.category}
//               onChange={(e) =>
//                 setEditingTask({ ...editingTask, category: e.target.value })
//               }
//             >
//               <option value="TODO">TODO</option>
//               <option value="INPROGRESS">IN PROGRESS</option>
//               <option value="DONE">DONE</option>
//             </select>
//             <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
//               Update Task
//             </button>
//           </form>
//         </div>
//       )}

//       <DragDropContext onDragEnd={handleDragEnd}>
//         {["TODO", "INPROGRESS", "DONE"].map((category) => (
//           <div key={category} className="mb-4">
//             <h2 className="text-xl font-semibold mb-2">{category}</h2>
//             <Droppable droppableId={category}>
//               {(provided) => (
//                 <div
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                   className="bg-gray-800 p-4 rounded min-h-[100px]"
//                 >
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                     {tasks
//                       .filter((task) => task.category === category)
//                       .map((task, index) => (
//                         <Draggable key={task._id} draggableId={task._id} index={index}>
//                           {(provided) => (
//                             <div
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               ref={provided.innerRef}
//                               className="bg-gray-700 p-4 mb-2 rounded shadow relative"
//                             >
//                               <h3 className="text-lg font-bold">{task.title}</h3>
//                               <p className="text-sm">{task.description}</p>
//                               <div className="absolute top-2 right-2 space-x-2">
//                                 <button
//                                   onClick={() => setEditingTask(task)}
//                                   className="bg-yellow-500 text-white px-2 py-1 rounded"
//                                 >
//                                   Edit
//                                 </button>
//                                 <button
//                                   onClick={() => handleDeleteTask(task._id)}
//                                   className="bg-red-500 text-white px-2 py-1 rounded"
//                                 >
//                                   Delete
//                                 </button>
//                               </div>
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                   </div>
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           </div>
//         ))}
//       </DragDropContext>
//     </div>
//   );
// };

// export default TaskBoard;
// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import io from "socket.io-client";

// // Establish the connection to the backend's socket
// const socket = io("http://localhost:5000");

// const TaskBoard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [showAddTask, setShowAddTask] = useState(false);
//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     category: "TODO",
//   });
//   const [editingTask, setEditingTask] = useState(null);

//   // Fetch tasks from the API
//   useEffect(() => {
//     const fetchTasks = async () => {
//       const { data } = await axios.get("http://localhost:5000/tasks");
//       setTasks(data);
//     };
//     fetchTasks();

//     // Listen for changes in the tasks collection
//     socket.on("taskChange", (updatedTask) => {
//       setTasks((prev) => {
//         const taskIndex = prev.findIndex((task) => task._id === updatedTask._id);
//         if (taskIndex !== -1) {
//           const updatedTasks = [...prev];
//           updatedTasks[taskIndex] = updatedTask;
//           return updatedTasks;
//         }
//         return [...prev, updatedTask];
//       });
//     });

//     return () => {
//       socket.off("taskChange"); // Cleanup when the component unmounts
//     };
//   }, []);

//   // Handle Add Task
//   const handleAddTask = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:5000/tasks", newTask);
//       setTasks((prev) => [...prev, { ...newTask, _id: data.taskId }]);
//       setNewTask({ title: "", description: "", category: "TODO" });
//       setShowAddTask(false);
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   // Handle Edit Task
//   const handleEditTask = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.put(
//         `http://localhost:5000/tasks/${editingTask._id}`,
//         editingTask
//       );
//       setTasks((prev) =>
//         prev.map((task) => (task._id === editingTask._id ? data : task))
//       );
//       setEditingTask(null);
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   // Handle Delete Task
//   const handleDeleteTask = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/tasks/${id}`);
//       setTasks((prev) => prev.filter((task) => task._id !== id));
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   // Handle Drag and Drop
//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;

//     const updatedTasks = [...tasks];
//     const [movedTask] = updatedTasks.splice(result.source.index, 1);
//     movedTask.category = result.destination.droppableId;
//     updatedTasks.splice(result.destination.index, 0, movedTask);

//     setTasks(updatedTasks);

//     try {
//       await axios.put(`http://localhost:5000/tasks/${movedTask._id}`, movedTask);
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-200 p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">Task Management System</h1>

//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//         onClick={() => setShowAddTask(true)}
//       >
//         Add Task
//       </button>

//       {showAddTask && (
//         <div className="bg-gray-800 p-4 rounded shadow-md">
//           <h2 className="text-xl mb-2">Add New Task</h2>
//           <form onSubmit={handleAddTask}>
//             <input
//               type="text"
//               placeholder="Task Title"
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={newTask.title}
//               onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//               required
//             />
//             <textarea
//               placeholder="Task Description"
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={newTask.description}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, description: e.target.value })
//               }
//             />
//             <select
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={newTask.category}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, category: e.target.value })
//               }
//             >
//               <option value="TODO">TODO</option>
//               <option value="INPROGRESS">IN PROGRESS</option>
//               <option value="DONE">DONE</option>
//             </select>
//             <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
//               Add Task
//             </button>
//           </form>
//         </div>
//       )}

//       {editingTask && (
//         <div className="bg-gray-800 p-4 rounded shadow-md">
//           <h2 className="text-xl mb-2">Edit Task</h2>
//           <form onSubmit={handleEditTask}>
//             <input
//               type="text"
//               placeholder="Task Title"
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={editingTask.title}
//               onChange={(e) =>
//                 setEditingTask({ ...editingTask, title: e.target.value })
//               }
//               required
//             />
//             <textarea
//               placeholder="Task Description"
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={editingTask.description}
//               onChange={(e) =>
//                 setEditingTask({ ...editingTask, description: e.target.value })
//               }
//             />
//             <select
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={editingTask.category}
//               onChange={(e) =>
//                 setEditingTask({ ...editingTask, category: e.target.value })
//               }
//             >
//               <option value="TODO">TODO</option>
//               <option value="INPROGRESS">IN PROGRESS</option>
//               <option value="DONE">DONE</option>
//             </select>
//             <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
//               Update Task
//             </button>
//           </form>
//         </div>
//       )}

//       <DragDropContext onDragEnd={handleDragEnd}>
//         {["TODO", "INPROGRESS", "DONE"].map((category) => (
//           <div key={category} className="mb-4">
//             <h2 className="text-xl font-semibold mb-2">{category}</h2>
//             <Droppable droppableId={category}>
//               {(provided) => (
//                 <div
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                   className="bg-gray-800 p-4 rounded min-h-[100px]"
//                 >
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                     {tasks
//                       .filter((task) => task.category === category)
//                       .map((task, index) => (
//                         <Draggable key={task._id} draggableId={task._id} index={index}>
//                           {(provided) => (
//                             <div
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               ref={provided.innerRef}
//                               className="bg-gray-700 p-4 mb-2 rounded shadow relative"
//                             >
//                               <h3 className="text-lg font-bold">{task.title}</h3>
//                               <p className="text-sm">{task.description}</p>
//                               <div className="absolute top-2 right-2 space-x-2">
//                                 <button
//                                   onClick={() => setEditingTask(task)}
//                                   className="bg-yellow-500 text-white px-2 py-1 rounded"
//                                 >
//                                   Edit
//                                 </button>
//                                 <button
//                                   onClick={() => handleDeleteTask(task._id)}
//                                   className="bg-red-500 text-white px-2 py-1 rounded"
//                                 >
//                                   Delete
//                                 </button>
//                               </div>
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                   </div>
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           </div>
//         ))}
//       </DragDropContext>
//     </div>
//   );
// };

// export default TaskBoard;
// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import io from "socket.io-client";

// // Establish the connection to the backend's socket
// const socket = io("http://localhost:5000");

// const TaskBoard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [showAddTask, setShowAddTask] = useState(false);
//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     category: "TODO",
//   });
//   const [editingTask, setEditingTask] = useState(null);

//   // Fetch tasks from the API
//   useEffect(() => {
//     const fetchTasks = async () => {
//       const { data } = await axios.get("http://localhost:5000/tasks");
//       setTasks(data);
//     };
//     fetchTasks();

//     // Listen for changes in the tasks collection
//     socket.on("taskChange", (updatedTask) => {
//       setTasks((prev) => {
//         const taskIndex = prev.findIndex((task) => task._id === updatedTask._id);
//         if (taskIndex !== -1) {
//           const updatedTasks = [...prev];
//           updatedTasks[taskIndex] = updatedTask;
//           return updatedTasks;
//         }
//         return [...prev, updatedTask];
//       });
//     });

//     return () => {
//       socket.off("taskChange"); // Cleanup when the component unmounts
//     };
//   }, []);

//   // Handle Add Task
//   const handleAddTask = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:5000/tasks", newTask);
//       setTasks((prev) => [...prev, { ...newTask, _id: data.taskId }]);
//       setNewTask({ title: "", description: "", category: "TODO" });
//       setShowAddTask(false);
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   // Handle Edit Task
//   const handleEditTask = async (e) => {
//     e.preventDefault();
//     try {
//       // Optimistically update the task in the UI
//       const updatedTask = { ...editingTask };
//       setTasks((prev) =>
//         prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
//       );

//       // Send the updated task to the backend
//       const { data } = await axios.put(
//         `http://localhost:5000/tasks/${updatedTask._id}`,
//         updatedTask
//       );

//       // Emit the updated task through socket to notify other clients
//       socket.emit("taskChange", data);

//       setEditingTask(null);
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   // Handle Delete Task
//   const handleDeleteTask = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/tasks/${id}`);
//       setTasks((prev) => prev.filter((task) => task._id !== id));
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   // Handle Drag and Drop
//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;

//     const updatedTasks = [...tasks];
//     const [movedTask] = updatedTasks.splice(result.source.index, 1);
//     movedTask.category = result.destination.droppableId;
//     updatedTasks.splice(result.destination.index, 0, movedTask);

//     setTasks(updatedTasks);

//     try {
//       await axios.put(`http://localhost:5000/tasks/${movedTask._id}`, movedTask);
//       // Emit the updated task after drag and drop
//       socket.emit("taskChange", movedTask);
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-200 p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">Task Management System</h1>

//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//         onClick={() => setShowAddTask(true)}
//       >
//         Add Task
//       </button>

//       {showAddTask && (
//         <div className="bg-gray-800 p-4 rounded shadow-md">
//           <h2 className="text-xl mb-2">Add New Task</h2>
//           <form onSubmit={handleAddTask}>
//             <input
//               type="text"
//               placeholder="Task Title"
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={newTask.title}
//               onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//               required
//             />
//             <textarea
//               placeholder="Task Description"
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={newTask.description}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, description: e.target.value })
//               }
//             />
//             <select
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={newTask.category}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, category: e.target.value })
//               }
//             >
//               <option value="TODO">TODO</option>
//               <option value="INPROGRESS">IN PROGRESS</option>
//               <option value="DONE">DONE</option>
//             </select>
//             <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
//               Add Task
//             </button>
//           </form>
//         </div>
//       )}

//       {editingTask && (
//         <div className="bg-gray-800 p-4 rounded shadow-md">
//           <h2 className="text-xl mb-2">Edit Task</h2>
//           <form onSubmit={handleEditTask}>
//             <input
//               type="text"
//               placeholder="Task Title"
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={editingTask.title}
//               onChange={(e) =>
//                 setEditingTask({ ...editingTask, title: e.target.value })
//               }
//               required
//             />
//             <textarea
//               placeholder="Task Description"
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={editingTask.description}
//               onChange={(e) =>
//                 setEditingTask({ ...editingTask, description: e.target.value })
//               }
//             />
//             <select
//               className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
//               value={editingTask.category}
//               onChange={(e) =>
//                 setEditingTask({ ...editingTask, category: e.target.value })
//               }
//             >
//               <option value="TODO">TODO</option>
//               <option value="INPROGRESS">IN PROGRESS</option>
//               <option value="DONE">DONE</option>
//             </select>
//             <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
//               Update Task
//             </button>
//           </form>
//         </div>
//       )}

//       <DragDropContext onDragEnd={handleDragEnd}>
//         {["TODO", "INPROGRESS", "DONE"].map((category) => (
//           <div key={category} className="mb-4">
//             <h2 className="text-xl font-semibold mb-2">{category}</h2>
//             <Droppable droppableId={category}>
//               {(provided) => (
//                 <div
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                   className="bg-gray-800 p-4 rounded min-h-[100px]"
//                 >
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                     {tasks
//                       .filter((task) => task.category === category)
//                       .map((task, index) => (
//                         <Draggable key={task._id} draggableId={task._id} index={index}>
//                           {(provided) => (
//                             <div
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               ref={provided.innerRef}
//                               className="bg-gray-700 p-4 mb-2 rounded shadow relative"
//                             >
//                               <h3 className="text-lg font-bold">{task.title}</h3>
//                               <p className="text-sm">{task.description}</p>
//                               <div className="absolute top-2 right-2 space-x-2">
//                                 <button
//                                   onClick={() => setEditingTask(task)}
//                                   className="bg-yellow-500 text-white px-2 py-1 rounded"
//                                 >
//                                   Edit
//                                 </button>
//                                 <button
//                                   onClick={() => handleDeleteTask(task._id)}
//                                   className="bg-red-500 text-white px-2 py-1 rounded"
//                                 >
//                                   Delete
//                                 </button>
//                               </div>
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                   </div>
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           </div>
//         ))}
//       </DragDropContext>
//     </div>
//   );
// };

// export default TaskBoard;
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import io from "socket.io-client";

// Establish the connection to the backend's socket
const socket = io("http://localhost:5000");

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
      const { data } = await axios.get("http://localhost:5000/tasks");
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
      const { data } = await axios.post("http://localhost:5000/tasks", newTask);
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
        `http://localhost:5000/tasks/${updatedTask._id}`,
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
      await axios.delete(`http://localhost:5000/tasks/${id}`);
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
      await axios.put(`http://localhost:5000/tasks/${movedTask._id}`, movedTask);
      socket.emit("taskChange", movedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Task Management System</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
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
                              className="bg-gray-700 p-4 mb-2 rounded shadow relative"
                            >
                              <h3 className="text-lg font-bold">{task.title}</h3>
                              <p className="text-sm">{task.description}</p>
                              <div className="absolute top-2 right-2 space-x-2">
                                <button
                                  onClick={() => setEditingTask(task)}
                                  className="bg-yellow-500 text-white px-3 py-1 rounded transform hover:scale-105 transition-all duration-300"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteTask(task._id)}
                                  className="bg-red-500 text-white px-3 py-1 rounded transform hover:scale-105 transition-all duration-300"
                                >
                                  Delete
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
  );
};

export default TaskBoard;

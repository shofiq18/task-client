

// const TaskBoard = () => {
//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       <header className="p-4 bg-blue-500 text-white text-center">
//         <h1 className="text-2xl font-bold">Task Management</h1>
//       </header>
//       <main className="flex-1 p-4">
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div className="bg-white p-4 rounded shadow">
//             <h2 className="text-xl font-bold mb-2">To-Do</h2>
//             <div>/* Drag-and-drop tasks here */</div>
//           </div>
//           <div className="bg-white p-4 rounded shadow">
//             <h2 className="text-xl font-bold mb-2">In Progress</h2>
//             <div>/* Drag-and-drop tasks here */</div>
//           </div>
//           <div className="bg-white p-4 rounded shadow">
//             <h2 className="text-xl font-bold mb-2">Done</h2>
//             <div>/* Drag-and-drop tasks here */</div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default TaskBoard;
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks", {
        params: { userId: "123" }, // Replace with actual user ID
      });
      const groupedTasks = groupByCategory(response.data);
      setCategories(groupedTasks);
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const groupByCategory = (tasks) => {
    return tasks.reduce(
      (acc, task) => {
        acc[task.category].push(task);
        return acc;
      },
      { todo: [], inProgress: [], done: [] }
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCategory = source.droppableId;
    const destCategory = destination.droppableId;

    if (sourceCategory === destCategory) {
      // Reorder within the same category
      const items = Array.from(categories[sourceCategory]);
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);
      setCategories((prev) => ({
        ...prev,
        [sourceCategory]: items,
      }));
    } else {
      // Move between categories
      const sourceItems = Array.from(categories[sourceCategory]);
      const destItems = Array.from(categories[destCategory]);
      const [movedItem] = sourceItems.splice(source.index, 1);
      movedItem.category = destCategory;
      destItems.splice(destination.index, 0, movedItem);

      setCategories((prev) => ({
        ...prev,
        [sourceCategory]: sourceItems,
        [destCategory]: destItems,
      }));

      // Update task in backend
      updateTaskCategory(movedItem);
    }
  };

  const updateTaskCategory = async (task) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${task._id}`, task);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(categories).map((category) => (
          <Droppable key={category} droppableId={category}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="p-4 bg-gray-100 rounded shadow"
              >
                <h2 className="font-bold text-lg mb-2 capitalize">{category}</h2>
                {categories[category].map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 mb-2 bg-white rounded shadow"
                      >
                        <h3 className="font-bold">{task.title}</h3>
                        <p>{task.description}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;

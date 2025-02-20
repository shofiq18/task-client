

const TaskBoard = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="p-4 bg-blue-500 text-white text-center">
        <h1 className="text-2xl font-bold">Task Management</h1>
      </header>
      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">To-Do</h2>
            <div>/* Drag-and-drop tasks here */</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">In Progress</h2>
            <div>/* Drag-and-drop tasks here */</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Done</h2>
            <div>/* Drag-and-drop tasks here */</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskBoard;

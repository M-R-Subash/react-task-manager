import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const App = () => {
  const [tasks, setTask] = useState([]);
  const [addTask, setAddTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savingEdit, setSavingEdit] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  // Load from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      setTask(JSON.parse(savedTasks));
    }
    setTimeout(() => setShowWelcome(false), 3000);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'completed') return task.completed;
    if (activeFilter === 'pending') return !task.completed;
    return true;
  });

  // Calculate stats for pie chart
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Add new task
  const addBtn = async () => {
    if (addTask.trim()) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newTask = {
        id: Date.now(),
        text: addTask,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTask([...tasks, newTask]);
      setAddTask("");
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  // Edit task functions
  const editBtn = (index) => {
    setEditingId(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = async (index) => {
    setSavingEdit(index);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editText } : task
    );
    setTask(updatedTasks);
    setEditingId(null);
    setEditText("");
    setSavingEdit(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // Delete task with confirmation
  const deleteTask = (index) => {
    Swal.fire({
      title: 'Delete Task?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      background: '#1f2937',
      color: '#f9fafb',
      customClass: {
        popup: 'rounded-2xl shadow-2xl border border-gray-600'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTask(updatedTasks);
      }
    });
  };

  // Toggle complete status
  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTask(updatedTasks);
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") addBtn();
  };

  // Welcome Animation
  const WelcomeAnimation = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center z-50 transition-all duration-1000 ease-in-out">
      <div className="text-center text-white">
        <div className="text-8xl mb-6 animate-pulse">📊</div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          TaskFlow Dashboard
        </h1>
        <p className="text-xl opacity-90">Visualize Your Productivity</p>
      </div>
    </div>
  );

  // Pie Chart Component
  const PieChart = () => (
    <div className="relative w-48 h-48 mx-auto mb-6">
      <svg viewBox="0 0 100 100" className="transform -rotate-90">
        {/* Background circle */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="#374151" strokeWidth="10" />
        
        {/* Completed segment */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#10b981"
          strokeWidth="10"
          strokeDasharray={`${completionPercentage * 2.827} 282.7`}
          className="transition-all duration-1000 ease-out"
        />
        
        {/* Pending segment */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="10"
          strokeDasharray={`${(100 - completionPercentage) * 2.827} 282.7`}
          strokeDashoffset={-completionPercentage * 2.827}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center ">
          <div className="text-2xl font-bold text-white">{Math.round(completionPercentage)}%</div>
          <div className="text-xs text-gray-400">Done</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Welcome Animation */}
      {showWelcome && <WelcomeAnimation />}

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg transform transition-all duration-500 ease-in-out z-40 animate-slide-in-right">
          <div className="flex items-center gap-2">
            <span className="text-lg">✓</span>
            <span>Task added successfully!</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            TaskFlow Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Visualize your productivity with interactive charts and manage your tasks efficiently
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Analytics */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Chart */}
            <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-center">Progress Overview</h2>
              <PieChart />
              
              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Completed</span>
                  </div>
                  <span className="font-bold text-green-400">{completedTasks}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-300">Pending</span>
                  </div>
                  <span className="font-bold text-amber-400">{pendingTasks}</span>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                  <span className="text-gray-300 font-semibold">Total</span>
                  <span className="font-bold text-blue-400">{totalTasks}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Completion Rate</span>
                  <span className="font-bold">{Math.round(completionPercentage)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Productivity Score</span>
                  <span className="font-bold text-green-400">
                    {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Task Management */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Task Card */}
            <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700">
              <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={addTask}
                  placeholder="Enter a new task..."
                  onChange={(e) => setAddTask(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                />
                <button
                  onClick={addBtn}
                  disabled={!addTask.trim() || isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 font-semibold flex items-center justify-center min-w-32"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Adding...
                    </>
                  ) : (
                    'Add Task'
                  )}
                </button>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {['all', 'pending', 'completed'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 capitalize ${
                    activeFilter === filter
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12 bg-gray-800 rounded-2xl border border-gray-700">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">
                    No tasks found
                  </h3>
                  <p className="text-gray-500">
                    {activeFilter === 'all' 
                      ? "Add your first task to get started!" 
                      : `No ${activeFilter} tasks found.`
                    }
                  </p>
                </div>
              ) : (
                filteredTasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    {editingId === index ? (
                      // Edit Mode
                      <div className="flex flex-col md:flex-row gap-4 items-center">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && saveEdit(index)}
                          className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(index)}
                            disabled={savingEdit === index}
                            className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                          >
                            {savingEdit === index ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              'Save'
                            )}
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transform hover:scale-105 transition-all duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <button
                            onClick={() => toggleComplete(index)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 transform hover:scale-110 ${
                              task.completed
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-gray-500 hover:border-green-400'
                            }`}
                          >
                            {task.completed && '✓'}
                          </button>
                          
                          <div className="flex-1">
                            <span
                              className={`text-lg transition-all duration-200 ${
                                task.completed
                                  ? 'line-through text-gray-500'
                                  : 'text-white'
                              }`}
                            >
                              {task.text}
                            </span>
                            <div className="text-sm text-gray-400 mt-1">
                              Created: {new Date(task.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => editBtn(index)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 text-sm font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTask(index)}
                            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transform hover:scale-105 transition-all duration-200 text-sm font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes slide-in-right {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-slide-in-right {
            animation: slide-in-right 0.5s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default App;
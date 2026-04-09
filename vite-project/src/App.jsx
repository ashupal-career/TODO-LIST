import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import NavBar from "./components/NavBar";

const App = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const isInitialLoad = useRef(true);

  const changeInput = (e) => {
    setInput(e.target.value);
  };

  const saveToLC = (todo) => {
    localStorage.setItem("todos", JSON.stringify(todo));
  };

  const handleAdd = () => {
    if (input.trim().length < 1) return;

    let id = Date.now();

    setTodos([...todos, { id, input, isComplete: false }]);
    setInput("");
  };

  const handleChecked = (id) => {
    let newTodo = todos.map((item) =>
      item.id === id
        ? { ...item, isComplete: !item.isComplete }
        : item
    );
    setTodos(newTodo);
  };

  const handleEdit = (id) => {
    let todoToEdit = todos.find((item) => item.id === id);
    setInput(todoToEdit.input);
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setTodos([]);
  };

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    saveToLC(todos);
  }, [todos]);

  const completedCount = todos.filter((t) => t.isComplete).length;

  return (
    <>
      <NavBar />

      {/* Background */}
      <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center p-4">
        
        {/* Main Container */}
        <div className="w-full max-w-3xl backdrop-blur-lg bg-white/30 border border-white/20 shadow-xl rounded-2xl p-6">

          {/* Add Todo */}
          <div className="my-5">
            <h1 className="text-xl font-bold mb-3 text-white">
              ✨ Add Todo
            </h1>

            <div className="flex gap-3 items-center bg-white/70 p-3 rounded-xl shadow-inner">
              <input
                type="text"
                className="flex-1 bg-transparent outline-none px-2 text-gray-800 placeholder-gray-500"
                onChange={changeInput}
                value={input}
                placeholder="What needs to be done?"
              />
              <button
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-105 transition-transform px-5 py-2 rounded-lg text-white font-semibold"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </div>

          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-lg font-bold text-white">
              Your Todos ({todos.length})
            </h1>

            {todos.length > 0 && (
              <button
                onClick={clearAll}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-white text-sm"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Completed Count */}
          <p className="text-sm text-white mb-4">
            ✅ Completed: {completedCount}
          </p>

          {/* Todo List */}
          <div className="space-y-3">

            {todos.length === 0 && (
              <div className="text-center text-white py-10">
                <p className="text-xl">📝 No tasks yet</p>
                <p className="text-sm">
                  Start by adding a new todo above
                </p>
              </div>
            )}

            {todos.map((item, index) => (
              <div
                key={item.id}
                className="bg-white/80 backdrop-blur-md rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <p>{index + 1}</p>

                  <input
                    type="checkbox"
                    checked={item.isComplete}
                    onChange={() => handleChecked(item.id)}
                    className="cursor-pointer"
                  />

                  <span
                    className={`font-medium break-words ${
                      item.isComplete
                        ? "line-through text-gray-500"
                        : ""
                    }`}
                  >
                    {item.input}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    className="bg-violet-700 hover:bg-violet-900 px-4 py-1 rounded-lg text-white font-semibold"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg text-white font-semibold"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default App;
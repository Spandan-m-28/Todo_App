import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Todo from "./Components/Todo";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  // Save new task to localStorage
  const handleSave = () => {
    if (!text.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    const newItem = {
      id: uuidv4(),
      task: text,
      isCompleted: false,
    };
    localStorage.setItem(newItem.id, JSON.stringify(newItem));
    setText(""); // Clear input field
    loadItems(); // Refresh data
  };

  // Handle input change
  const handleChange = (event) => {
    setText(event.target.value);
  };

  // Load all items from localStorage
  const loadItems = () => {
    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
      const id = localStorage.key(i);
      try {
        const item = JSON.parse(localStorage.getItem(id));
        if (item && item.task !== undefined) items.push(item);
      } catch (error) {
        console.error(`Skipping invalid item: ${id}`, error);
      }
    }
    setData(items);
  };

  const handleDelete = (id) => {
    localStorage.removeItem(id);
    loadItems();
  };

  const handleEdit = (id) => {
    const item = JSON.parse(localStorage.getItem(id));
    if (item) {
      setText(item.task); // Set the task text to the input field
      handleDelete(id); // Delete the item after editing
    } else {
      console.error(`Item with id: ${id} not found`);
    }
  };

  const handlecheck = (id, isCompleted) => {
    const item = JSON.parse(localStorage.getItem(id));
    if (item) {
      item.isCompleted = isCompleted;
      localStorage.setItem(id, JSON.stringify(item)); // Save the updated item back to localStorage
      loadItems(); // Refresh the task list
    }
  };

  // Load items on component mount
  useEffect(() => {
    loadItems();
  }, []);

  return (
    <>
      <Navbar />
      <div className="md:w-1/2 md:mx-auto bg-amber-100 rounded-md min-h-[90vh] mt-3 mx-2">
        <div className="flex flex-col">
          <input
            value={text}
            onChange={handleChange}
            type="text"
            placeholder="Type something here..."
            className="rounded h-7 w-[85%] mt-4 mx-auto px-1 focus:outline-none"
          />
          <button
            onClick={handleSave}
            className="bg-amber-300 w-[80%] mx-auto mt-4 rounded-md h-6 hover:scale-105">
            Save!
          </button>
        </div>
        <div className="h-[1px] bg-gray-400 mt-5 w-[90%] mx-auto"></div>
        <div>
          <p className="mx-9 font-medium mt-2">Your ToDo's</p>
          {data.map((item) => (
            <Todo
              key={item.id}
              id={item.id}
              task={item.task}
              isCompleted={item.isCompleted}
              onDelete={handleDelete}
              onEdit={handleEdit}
              oncheck={handlecheck}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

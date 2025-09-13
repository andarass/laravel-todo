import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editing, setEditing] = useState(null); 
  const [editTitle, setEditTitle] = useState('');

  // ambil data tasks saat pertama kali load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      await axios.post("http://127.0.0.1:8000/api/tasks", { title });
      setTitle('');
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editTitle) return;
    try {
      await axios.put(`http://127.0.0.1:8000/api/tasks/${editing}`, {
        title: editTitle
      });
      setEditing(null);
      setEditTitle('');
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>

      {/* form tambah task */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="flex-1 border rounded p-2"
          placeholder="New task"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
      </form>

      <ul>
        {tasks.map(t => (
          <li key={t.id} className="p-2 border-b flex justify-between items-center">
            {editing === t.id ? (
              <form onSubmit={handleUpdate} className="flex gap-2 w-full">
                <input
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="flex-1 border rounded p-1"
                />
                <button className="px-2 bg-green-600 text-white rounded">Save</button>
              </form>
            ) : (
              <>
                <span>{t.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditing(t.id); setEditTitle(t.title); }}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
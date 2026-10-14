import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: '', content: '' });
  const [darkMode, setDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notes');
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err.message);
    }
  };

  const addOrUpdateNote = async () => {
    if (!note.title || !note.content) return;

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/notes/${editId}`, note);
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/api/notes', note);
      }

      setNote({ title: '', content: '' });
      fetchNotes();
    } catch (err) {
      console.error('Error saving note:', err.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error('Error deleting note:', err.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className={`container ${darkMode ? 'dark' : 'light'}`}>
      <button onClick={toggleTheme} style={{ float: 'right', marginBottom: '10px' }}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <h1>📝 Notes Marker</h1>

      <input
        type="text"
        placeholder="🔍 Search notes by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '15px', padding: '8px', width: '100%' }}
      />

      <input
        placeholder="Title"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />

      <textarea
        placeholder="Content"
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        rows={4}
      />

      <button onClick={addOrUpdateNote}>
        {isEditing ? 'Update Note' : 'Add Note'}
      </button>

      <h2>📚 Notes</h2>

      {notes
        .filter((n) => n.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((n) => (
          <div className="note" key={n._id}>
            <h3>{n.title}</h3>
            <p>{n.content}</p>
            <button
              onClick={() => {
                setNote({ title: n.title, content: n.content });
                setEditId(n._id);
                setIsEditing(true);
              }}
              style={{ marginRight: '10px' }}
            >
              ✏️ Edit
            </button>
            <button onClick={() => deleteNote(n._id)}>🗑️ Delete</button>
          </div>
        ))}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

// Main App component
function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  // Fetch posts from backend
  useEffect(() => {
    axios.get(`${process.env.TWITTER_CLONE_BACKEND_URL}/posts`)
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  // Handle new post submission
  const handlePostSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.TWITTER_CLONE_BACKEND_URL}/posts`, { content: newPost })
      .then(response => setPosts([response.data, ...posts]))
      .catch(error => console.error('Error posting:', error));
    setNewPost('');
  };

  // Render the component
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold underline mb-4">Twitter Clone</h1>
      <form onSubmit={handlePostSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's happening?"
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Post</button>
      </form>
      <div>
        {posts.map((post, index) => (
          <div key={index} className="p-4 border-b">
            {post.content}
          </div>
        ))}
      </div>
    </div>
  );
}

// Export the App component
export default App;
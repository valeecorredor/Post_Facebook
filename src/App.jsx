import React, { useState, createContext } from 'react';
import Post from './components/post';
import './App.css';

export const PostContext = createContext();

function App() {
  const [likes, setLikes] = useState(248);
  const [shares, setShares] = useState(36);
  const [comments, setComments] = useState([
    { id: 1, text: "Me gustan mucho los postres", replies: [] },
    { id: 2, text: "Pasame la receta", replies: [] }
  ]);

  return (
    <PostContext.Provider value={{ likes, setLikes, shares, setShares, comments, setComments }}>
      <div className="container mt-5 d-flex justify-content-center">
        <Post />
      </div>
    </PostContext.Provider>
  );
}

export default App;

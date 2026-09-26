import React, { useState, useContext } from 'react';
import { PostContext } from '../App';

const CommentForm = () => {
  const { comments, setComments } = useContext(PostContext);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const newEntry = { id: Date.now(), text: newComment, replies: [] };
      setComments([...comments, newEntry]);
      setNewComment("");
    }
  };

  return (
    <div className="d-flex align-items-center mt-3 pt-2">
      <div className="rounded-circle bg-secondary bg-opacity-25 me-2" style={{ width: '32px', height: '32px', minWidth: '32px' }}></div>
      <form onSubmit={handleSubmit} className="flex-fill d-flex align-items-center bg-light rounded-pill px-3 py-2" style={{ backgroundColor: '#f0f2f5' }}>
        <input 
          id="main-comment-input"
          type="text" 
          className="form-control border-0 bg-transparent shadow-none p-0" 
          placeholder="Write a comment..." 
          style={{ fontSize: '15px' }}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="text-muted d-flex gap-2">
          <i className="bi bi-emoji-smile fs-5" style={{ cursor: 'pointer' }}></i>
          <i className="bi bi-camera fs-5" style={{ cursor: 'pointer' }}></i>
          <i className="bi bi-filetype-gif fs-5" style={{ cursor: 'pointer' }}></i>
          <i className="bi bi-sticky fs-5" style={{ cursor: 'pointer' }}></i>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;

import React, { useState, useContext, useRef } from 'react';
import { PostContext } from '../App';

const ListComments = () => {
  const { comments, setComments } = useContext(PostContext);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const inputRef = useRef(null);

  const handleReplySubmit = (e, commentId) => {
    e.preventDefault();
    if (replyText.trim() === "") return;

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const newReply = { id: Date.now(), text: replyText };
        return { ...comment, replies: [...(comment.replies || []), newReply] };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <div className="mb-2 mt-2">
      {comments.length > 0 ? (
        <div className="d-flex flex-column gap-3">
          {comments.map((comment) => (
            <div key={comment.id} className="d-flex flex-column">
              
              {/* Main Comment */}
              <div className="d-flex">
                <div className="rounded-circle bg-secondary bg-opacity-25 me-2 mt-1" style={{ width: '32px', height: '32px', minWidth: '32px' }}></div>
                <div>
                  <div className="bg-light rounded-4 px-3 py-2" style={{ backgroundColor: '#f0f2f5' }}>
                    <span className="fw-semibold d-block" style={{ fontSize: '13px' }}>User Name</span>
                    <span style={{ fontSize: '15px' }}>{comment.text}</span>
                  </div>
                  <div className="d-flex gap-3 ms-3 mt-1 text-muted fw-bold" style={{ fontSize: '12px' }}>
                    <span style={{ cursor: 'pointer' }}>Like</span>
                    <span style={{ cursor: 'pointer' }} onClick={() => {
                      setReplyingTo(comment.id);
                      setTimeout(() => inputRef.current?.focus(), 50);
                    }}>Reply</span>
                    <span className="fw-normal">1h</span>
                  </div>
                </div>
              </div>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ms-5 mt-2 d-flex flex-column gap-2">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="d-flex">
                      <div className="rounded-circle bg-secondary bg-opacity-25 me-2 mt-1" style={{ width: '24px', height: '24px', minWidth: '24px' }}></div>
                      <div>
                        <div className="bg-light rounded-4 px-3 py-2" style={{ backgroundColor: '#f0f2f5' }}>
                          <span className="fw-semibold d-block" style={{ fontSize: '12px' }}>User Name</span>
                          <span style={{ fontSize: '14px' }}>{reply.text}</span>
                        </div>
                        <div className="d-flex gap-3 ms-3 mt-1 text-muted fw-bold" style={{ fontSize: '11px' }}>
                          <span style={{ cursor: 'pointer' }}>Like</span>
                          <span style={{ cursor: 'pointer' }} onClick={() => {
                            setReplyingTo(comment.id);
                            setTimeout(() => inputRef.current?.focus(), 50);
                          }}>Reply</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Form */}
              {replyingTo === comment.id && (
                <div className="ms-5 mt-2 d-flex align-items-center">
                  <div className="rounded-circle bg-secondary bg-opacity-25 me-2" style={{ width: '24px', height: '24px', minWidth: '24px' }}></div>
                  <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="flex-fill d-flex align-items-center bg-light rounded-pill px-3 py-1">
                    <input 
                      type="text" 
                      className="form-control border-0 bg-transparent shadow-none p-0" 
                      placeholder="Write a reply..." 
                      style={{ fontSize: '14px' }}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      ref={inputRef}
                    />
                    <i className="bi bi-send text-primary ms-2" style={{ cursor: 'pointer' }} onClick={(e) => handleReplySubmit(e, comment.id)}></i>
                  </form>
                </div>
              )}

            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ListComments;

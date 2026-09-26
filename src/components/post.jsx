import React, { useContext } from 'react';
import { PostContext } from '../App';
import CommentForm from './commentform';
import ListComments from './listcomments';

const Post = () => {
  const { likes, setLikes, shares, setShares, comments } = useContext(PostContext);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleShare = () => {
    setShares(shares + 1);
  };

  // Calculate total comments including replies
  const totalComments = comments.reduce((total, comment) => total + 1 + (comment.replies ? comment.replies.length : 0), 0);

  return (
    <div className="card post-card bg-white" style={{ maxWidth: '500px', width: '100%', borderRadius: '0' }}>

      {/* Post Header */}
      <div className="card-body px-3 py-2 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div className="rounded-circle bg-secondary bg-opacity-25 me-2" style={{ width: '40px', height: '40px' }}></div>
          <div>
            <h6 className="mb-0 fw-bold d-flex align-items-center" style={{ fontSize: '15px' }}>
              Your Brand Name
              <i className="bi bi-patch-check-fill text-primary ms-1" style={{ fontSize: '12px' }}></i>
            </h6>
            <span className="text-muted d-flex align-items-center" style={{ fontSize: '13px' }}>
              4h <span className="mx-1">·</span> <i className="bi bi-globe-americas"></i>
            </span>
          </div>
        </div>
        <div className="text-muted fs-5">
          <i className="bi bi-three-dots me-3"></i>
          <i className="bi bi-x-lg"></i>
        </div>
      </div>

      {/* Post Content */}
      <div className="card-body px-3 py-1">
        <p className="card-text mb-2" style={{ fontSize: '15px' }}>
          Mi creación<br />
          <span className="text-muted">Delicioso batido de fresa🍓🥤</span>
        </p>
      </div>

      {/* Post Image */}
      <img
        src="https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=600&auto=format&fit=crop"
        className="w-100"
        alt="Post Image"
        style={{ height: '350px', objectFit: 'cover' }}
      />

      {/* Stats Row */}
      <div className="px-3 py-2 d-flex justify-content-between align-items-center text-muted" style={{ fontSize: '15px' }}>
        <div className="d-flex align-items-center">
          <div className="bg-primary rounded-circle d-flex justify-content-center align-items-center me-1" style={{ width: '18px', height: '18px' }}>
            <i className="bi bi-hand-thumbs-up-fill text-white" style={{ fontSize: '10px' }}></i>
          </div>
          <span>{likes}</span>
        </div>
        <div>
          <span className="me-3">{totalComments} comments</span>
          <span>{shares} shares</span>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="px-3">
        <div className="d-flex justify-content-between border-top border-bottom py-1">
          <button className="btn btn-action flex-fill text-muted fw-semibold" onClick={handleLike}>
            <i className="bi bi-hand-thumbs-up fs-5 me-2"></i> Like
          </button>
          <button className="btn btn-action flex-fill text-muted fw-semibold" onClick={() => document.getElementById('main-comment-input').focus()}>
            <i className="bi bi-chat fs-5 me-2"></i> Comment
          </button>
          <button className="btn btn-action flex-fill text-muted fw-semibold" onClick={handleShare}>
            <i className="bi bi-share fs-5 me-2"></i> Share
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="card-body px-3">
        <ListComments />
        <CommentForm />
      </div>
    </div>
  );
};

export default Post;

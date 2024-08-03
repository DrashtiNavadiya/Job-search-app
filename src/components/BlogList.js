import React from 'react';

const BlogList = ({ posts, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Blog Posts</h2>
      {posts.map(post => (
        <div key={post.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.content}</p>
            <button className="btn btn-primary" onClick={() => onEdit(post)}>Edit</button>
            <button className="btn btn-danger ml-2" onClick={() => onDelete(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;

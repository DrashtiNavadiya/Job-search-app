import React from 'react';
import { useLocation } from 'react-router-dom';

const BlogDetail = () => {
  const { state: blog } = useLocation();

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>By: {blog.authorName}</p>
      <p>Date: {blog.date}</p>
      <p>{blog.content}</p>
      {blog.image && <img src={`data:image/jpeg;base64,${blog.image}`} alt="Blog Image" />}
    </div>
  );
};

export default BlogDetail;

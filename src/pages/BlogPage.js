import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('YOUR_API_ENDPOINT/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div>
      <h1>All Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.postId}>
            <a href={`/blog/${post.postId}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;

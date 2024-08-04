import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/BlogPage.css';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://mwkn4w753j.execute-api.us-east-1.amazonaws.com/prod/posts');
        console.log('API response:', response.data); // Log the response data

        // Parse the body as JSON
        const parsedData = response.data.body;

        // Ensure parsedData is an array
        if (Array.isArray(parsedData)) {
          setBlogs(parsedData);
          
          console.log(parsedData)
        } else {
          throw new Error('API response is not an array');
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError('Error fetching blog posts. Please try again later.');
      }
    };

    fetchBlogs();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (blogs.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-4">
      {/* Hero Section */}
      <Row className="hero-section text-center">
        <h1>Welcome to Our Blog</h1>
        <p>Explore a variety of topics, insights, and stories from our authors.</p>
        <Link to="/login">
          <Button variant="primary">Create a New Post</Button>
        </Link>
      </Row>

      {/* Blog List */}
      <div className="blog-list-h1">      <h1>Blogs</h1>
</div>
      <div className="blog-list">
        {blogs.map(blog => (
          <Card key={blog.postId} className="mb-4">
            {blog.imageKey && (
              <Card.Img variant="top" src={`https://blogpoststorage.s3.amazonaws.com/${blog.imageKey}`} className="card-img" />
            )}
            <Card.Body>
              <Card.Title>Title: {blog.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Author: {blog.authorName}</Card.Subtitle>
              <Link to={`/blogdetail/${blog.postId}`}>
                <Button variant="primary">Read More</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default BlogPage;

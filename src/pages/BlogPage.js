import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button, Row} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../css/BlogPage.css';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { AWS_CONFIG } from '../constant';


const poolData = {
  UserPoolId: AWS_CONFIG.UserPoolId,
  ClientId: AWS_CONFIG.ClientId
};

const userPool = new CognitoUserPool(poolData);

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();


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

    const checkAuthStatus = () => {
      const currentUser = userPool.getCurrentUser();
      if (currentUser) {
        currentUser.getSession((err, session) => {
          if (err || !session.isValid()) {
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
          }
        });
      } else {
        setIsAuthenticated(false);
      }
    };

    fetchBlogs();
    checkAuthStatus(); // Check authentication status on component mount

    // Add event listener to update auth status when user signs in or out
    window.addEventListener('storage', checkAuthStatus);

    return () => {
      window.removeEventListener('storage', checkAuthStatus); // Cleanup on unmount
    };
  }, []);
  const handleButtonClick = () => {
    if (isAuthenticated) {
      navigate('/my-posts'); // Redirect to /my-posts if authenticated
    } else {
      navigate('/login'); // Redirect to /login if not authenticated
    }
  };


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
          <Button variant="primary"  onClick={handleButtonClick}>Create a New Post</Button>
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

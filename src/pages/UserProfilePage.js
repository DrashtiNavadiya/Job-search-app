import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Card, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const email = localStorage.getItem('email');
        if (!email) {
          throw new Error('No user email found in local storage');
        }
        console.log('Sending payload:', { email });

        const response = await axios.post(
          'https://mwkn4w753j.execute-api.us-east-1.amazonaws.com/prod/profile',
          { email},
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data)
          setUser(response.data.body);
        } else {
          throw new Error('User not found');
        }
      } catch (error) {
        setError('Error fetching user details: ' + (error.message || 'Unknown error'));
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (user) {
      console.log('User data:', user);
      console.log('First Name:', user.firstName);
    }
  }, [user]);

  const handleGoToMyPosts = () => {
    navigate('/my-posts');
  };

  return (
    <Container className="d-flex flex-column align-items-center min-vh-100 py-5">
      {loading ? (
        <Spinner animation="border" role="status" className="mt-5">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger" className="mt-5">
          {error}
        </Alert>
      ) : user ? (
        <Card className="w-90 w-md-75 w-lg-50 shadow-sm">
          <Card.Body> 
            <Card.Title className="text-center mb-4">User Profile</Card.Title>
            <Card.Text>
              <strong>First Name:</strong> {user.firstName}
            </Card.Text>
            <Card.Text>
              <strong>Last Name:</strong> {user.lastName}
            </Card.Text>
            <Card.Text>
              <strong>Email:</strong> {user.email}
            </Card.Text>
            <Button variant="primary" onClick={handleGoToMyPosts} type="submit" className="mt-3">
              Go to My Posts
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <p>No user details found.</p>
      )}
    </Container>
  );
};

export default UserProfilePage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, confirmSignUp } from '../services/auth';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import '../css/Signup.css'; // Import custom CSS file
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await signUp(email, password);
      console.log(user)

      setShowVerification(true); 


      const response = await axios.post('https://mwkn4w753j.execute-api.us-east-1.amazonaws.com/prod/users', {
        firstName,
        lastName,
        email,
      });
    } catch (error) {
      console.error('Signup error:', error);
      setError('Signup failed: ' + (error.message || 'Unknown error'));
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await confirmSignUp(email, verificationCode);
      alert('Signup and verification successful!');
      navigate('/login'); // Redirect to main page upon success
    } catch (error) {
      console.error('Verification error:', error);
      setError('Verification failed: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="signup-box p-4 shadow-sm border rounded bg-light">
        {!showVerification ? (
          <Form onSubmit={handleSignup}>
            <h2 className="text-center mb-4">Signup</h2>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Signup
            </Button>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Form>
        ) : (
          <Form onSubmit={handleVerification}>
            <h2 className="text-center mb-4">Verify Your Email</h2>
            <Form.Group controlId="formBasicVerificationCode">
              <Form.Label>Verification Code</Form.Label>
              <Form.Control
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Verify
            </Button>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Form>
        )}
      </div>
    </Container>
  );
};

export default Signup;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { AWS_CONFIG } from '../constant';
import '../css/Navbar.css';


const poolData = {
  UserPoolId: AWS_CONFIG.UserPoolId,
  ClientId: AWS_CONFIG.ClientId
};

const userPool = new CognitoUserPool(poolData);

const NavbarComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  const handleSignOut = () => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
      setIsAuthenticated(false);
      navigate('/');
      localStorage.clear();
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Job Search Platform</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {isAuthenticated ? (
            <Button variant="outline-light" onClick={handleSignOut}>Sign Out</Button>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;

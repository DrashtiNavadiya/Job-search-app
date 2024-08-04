import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';
import '../css/BlogDetail.css';

const BlogDetail = () => {
  const { postId } = useParams();  // Extract postId from URL parameters
  const [blogDetails, setBlogDetails] = useState(null);  // State to hold blog details

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {

        // Log parameters before sending the request
        console.log('Fetching blog details with parameters:', { postId });

        const response = await axios.get('https://mwkn4w753j.execute-api.us-east-1.amazonaws.com/prod/blogdetail', {
          params: {
            postId: postId
                  }
        });

        // Log the response data
        console.log('Response data:', response.data);

        setBlogDetails(response.data.body); 
        console.log(blogDetails) // Set blog details state
      } catch (error) {
        // Log the error details
        console.error('Error fetching blog details:', error);
      }
    };

    fetchBlogDetails();  // Fetch blog details on component mount
  }, [postId]);  // Effect dependency on postId

  if (!blogDetails) {
    return <div>Loading...</div>;  // Show loading text while data is being fetched
  }

  return (
    <Container className="mt-4">
      <h2>{blogDetails.title}</h2>
      <p><strong>Author:</strong> {blogDetails.authorName}</p>
      <p><strong>Date Posted:</strong> {blogDetails.date}</p>
      {blogDetails.imageKey && (
        <Image src={`https://blogpoststorage.s3.amazonaws.com/${blogDetails.imageKey}`} alt={blogDetails.title} fluid />
      )}
      <div className="mt-4">
        <p>{blogDetails.content}</p>
      </div>
    </Container>
  );
};

export default BlogDetail;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// import { Container, Form, Button } from 'react-bootstrap';

// const BlogPost = () => {
//   const [userBlogs, setUserBlogs] = useState([]);
//   // const navigate = useNavigate();

//   const [newPost, setNewPost] = useState({
//     title: '',
//     content: '',
//     image: '',
//     date: '',
//     authorName: '',
//     email: localStorage.getItem('email')
//   });
  
//   const fetchUserBlogs = async () => {
//     try {
//       const email = localStorage.getItem('email');
//       const response = await axios.get('https://mwkn4w753j.execute-api.us-east-1.amazonaws.com/prod/userBlog', {
//         params: {
//           email: email
//         }
//       });

//       const blogs = response.data.body; 
//       console.log(blogs); 
//       setUserBlogs(blogs); 
//     } catch (error) {
//       console.error('Error fetching user blogs:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUserBlogs();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewPost({ ...newPost, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewPost({ ...newPost, image: reader.result.split(',')[1] }); // Convert image to base64 string
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const requestData = {
//         title: newPost.title,
//         content: newPost.content,
//         image: newPost.image,
//         date: newPost.date,
//         email: newPost.email,
//         authorName: newPost.authorName
//       };
//       await axios.post('https://mwkn4w753j.execute-api.us-east-1.amazonaws.com/prod/posts', { body: requestData });
//       setNewPost({
//         title: '',
//         content: '',
//         image: '',
//         date: '',
//         authorName:'',
//         email: localStorage.getItem('email')
//       })
//       fetchUserBlogs();
//     } catch (error) {
//       console.error('Error saving post:', error);
//     }
//   };
//   // const handleBlogClick = (blog) => {
//   //   navigate(`/blogdetail/${blog.postId}`, { state: blog });
//   // };

//   return (
//     <Container className="mt-4">
//       <h2>Create a New Blog Post</h2>
//       <Form className="mt-4">
//         <Form.Group>
//           <Form.Label>Title</Form.Label>
//           <Form.Control
//             type="text"
//             name="title"
//             value={newPost.title}
//             onChange={handleInputChange}
//             placeholder="Enter blog title"
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Content</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             name="content"
//             value={newPost.content}
//             onChange={handleInputChange}
//             placeholder="Enter blog content"
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Image</Form.Label>
//           <Form.Control
//             type="file"
//             onChange={handleFileChange}
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Author Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="authorName"
//             value={newPost.authorName}
//             onChange={handleInputChange}
//             placeholder="Enter your name"
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Date</Form.Label>
//           <Form.Control
//             type="date"
//             name="date"
//             value={newPost.date}
//             onChange={handleInputChange}
//           />
//         </Form.Group>
//         <Button className="mt-3" variant="primary" onClick={handleSave}>
//           Add Post
//         </Button>
//       </Form>

//       <div className="mt-5">
//   <h2>Your Blogs</h2>
//   <div className="grid-container">
//     {userBlogs.length > 0 ? (
//       userBlogs.map((blog) => (
//         // <div className="grid-item" key={blog.postId} onClick={() => handleBlogClick(blog)}>
//         <div className="grid-item" key={blog.postId}>

//           {blog.imageKey && (
//             <img
//               src={`https://blogpoststorage.s3.amazonaws.com/${blog.imageKey}`}
//               alt={blog.title}
//               style={{ width: '100%', height: 'auto' }}
//             />
//           )}
//           <h3>{blog.title}</h3>
//           <p>{blog.authorName || 'Unknown Author'}</p>
//           <p>{blog.date}</p>
//         </div>
//       ))
//     ) : (
//       <p>No blogs found.</p>
//     )}
//   </div>
// </div>
//     </Container>
//   );
// };

// export default BlogPost;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import '../css/BlogPost.css';



const BlogPost = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    image: '',
    date: '',
    authorName: '',
    email: localStorage.getItem('email')
  });
  
  const fetchUserBlogs = async () => {
    try {
      const email = localStorage.getItem('email');
      const response = await axios.get('https://mwkn4w753j.execute-api.us-east-1.amazonaws.com/prod/userBlog', {
        params: {
          email: email
        }
      });
      const blogs = response.data.body; 
      console.log(blogs); 
      setUserBlogs(blogs); 
    } catch (error) {
      console.error('Error fetching user blogs:', error);
    }
  };

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost({ ...newPost, image: reader.result.split(',')[1] });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const requestData = {
        title: newPost.title,
        content: newPost.content,
        image: newPost.image,
        date: newPost.date,
        email: newPost.email,
        authorName: newPost.authorName
      };
      await axios.post('https://mwkn4w753j.execute-api.us-east-1.amazonaws.com/prod/posts', { body: requestData });
      setNewPost({
        title: '',
        content: '',
        image: '',
        date: '',
        authorName:'',
        email: localStorage.getItem('email')
      })
      fetchUserBlogs();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const email = localStorage.getItem('email');
      const response = await axios.delete('https://mwkn4w753j.execute-api.us-east-1.amazonaws.com/prod/posts', {
        params: {
          postId: postId,
          email: email
        }
      });
      console.log(response.data); // Log the response data
      fetchUserBlogs(); // Refresh the blog list after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  

  return (
    <Container className="mt-4">
      <h2>Create a New Blog Post</h2>
      <Form className="mt-4">
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
            placeholder="Enter blog title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
            placeholder="Enter blog content"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author Name</Form.Label>
          <Form.Control
            type="text"
            name="authorName"
            value={newPost.authorName}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={newPost.date}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" onClick={handleSave}>
          Add Post
        </Button>
      </Form>

      <div className="mt-5">
        <h2>Your Blogs</h2>
        <div className="grid-container">
          {userBlogs.length > 0 ? (
            userBlogs.map((blog) => (
              <div className="grid-item" key={blog.postId}>
                {blog.imageKey && (
                  <img
                    src={`https://blogpoststorage.s3.amazonaws.com/${blog.imageKey}`}
                    alt={blog.title}
                    style={{ width: '100%', height: 'auto' }}
                  />
                )}
                <h3>{blog.title}</h3>
                <p>{blog.authorName || 'Unknown Author'}</p>
                <p>{blog.date}</p>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(blog.postId)}
                >
                  Delete Post
                </Button>
              </div>
            ))
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default BlogPost;

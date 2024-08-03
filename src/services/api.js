import axios from 'axios';

const API_URL = 'YOUR_API_ENDPOINT';

export const getPosts = () => {
  return axios.get(`${API_URL}/posts`);
};

export const createPost = (post) => {
  return axios.post(`${API_URL}/posts`, post);
};

export const updatePost = (id, post) => {
  return axios.put(`${API_URL}/posts/${id}`, post);
};

export const deletePost = (id) => {
  return axios.delete(`${API_URL}/posts/${id}`);
};

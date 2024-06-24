import axios from 'axios';
import getAuthToken from '@/apis/utils/getAuthToken';

const API_BASE_URL = 'https://be.travel-laboratory.site/api/v1';

const token = getAuthToken();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'authorization-token': token
  }
});

export const createArticle = async (data) => {
  try {
    const response = await api.post('/article', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSchedule = async (articleId) => {
  try {
    const response = await api.get(`/articles/${articleId}/schedules/places`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await api.patch(`/reviews/${id}/status`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const likeReview = async (id) => {
  try {
    const response = await api.patch(`/reviews/${id}/status`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postReview = async (data) => {
  try {
    const response = await api.post('/review', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReview = async (id) => {
  try {
    const response = await api.get(`/reviews/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

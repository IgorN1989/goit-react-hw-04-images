import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32119761-f60b77538f277e08da301bce8';

export async function fetchImages(searchQuery, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    page: page,
    per_page: 12,
  });
  const response = await axios.get(BASE_URL, { params });
  return response.data;
}

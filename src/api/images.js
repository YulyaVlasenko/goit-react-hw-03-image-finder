import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '36983985-d9bb28c0a2c0b2d1eb9b72e71';

export const getImagesBySearch = async (searchQuery, page) => {
	const response = await axios(`?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    return response.data
}
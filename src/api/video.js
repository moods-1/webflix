import { baseUrl, ROUTES } from '../helpers/constants';
import { mainRequest } from './main';

export const getVideosByCategoryId = async (categoryId) => {
    const url = `${baseUrl}${ROUTES.VIDEOS.GET_BY_CATEGORY_ID}/${categoryId}`;
	const method = 'get';
	return await mainRequest(method, url, {});
};

export const updateVideoTrailer = async (videoId, trailerId) => {
    const url = `${baseUrl}${ROUTES.VIDEOS.UPDATE_VIDEO_TRAILER}`;
	const method = 'put';
	return await mainRequest(method, url, {videoId,trailerId});
};

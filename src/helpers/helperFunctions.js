import moment from 'moment-timezone';
import { youtubeSearch } from './constants';
import axios from 'axios';

export const timeFormatter = (time, format) => {
	if (!time) return null;
	if (Number(new Date(time))) {
		return moment(time).format(format);
	}
	return null;
};

export const textTruncater = (text, length) =>
	text?.length > length ? text.substr(0, length - 1) + '...' : text;

	
export const searchYoutube = async (subject) => {
	try {
		const response = await axios(youtubeSearch + subject);
		const { data, status } = response;
		return { status, data };
	} catch (error) {
		const { status, data } = error.response;
		return { status, data };
	}
}
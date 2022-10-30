import moment from 'moment-timezone';

export const timeFormatter = (time, format) => {
	if (!time) return null;
	if (Number(new Date(time))) {
		return moment(time).format(format);
	}
	return null;
};

export const textTruncater = (text, length) =>
	text?.length > length ? text.substr(0, length - 1) + '...' : text;

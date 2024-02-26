const path = require('path');

const getAll = async (request, response) => {
	response.sendFile(path.join(__dirname, '../client/build/index.html'));
};

export { getAll };

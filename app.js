const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.resolve(__dirname, 'client', 'build')));

	app.get('*', (request, response) => {
		response.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}/`);
});

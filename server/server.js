const app = require('../server/index.js');

const port = process.env.PORT || 8080;

app.listen(port, () => console.log('server is running on 8080'));

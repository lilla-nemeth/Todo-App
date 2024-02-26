const app = require('../server/index.js');

const port = process.env.PORT || 3002;

app.listen(port, () => console.log('server is running on 3002'));

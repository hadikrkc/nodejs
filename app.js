const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const sequelize = require('./config/database');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/', routes);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to sync database:', err);
});
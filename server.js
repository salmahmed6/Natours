const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env'});

const DB = process.env.MONGO_URL;
mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
}).then(con => {
    console.log(con.connection);
    console.log('DB connection successful');
}).catch(err => {
    console.error('Database connection error:', err)
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}..`);
});

const express = require('express')
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect');
require('dotenv').config();


// middleware
app.use(express.json());
app.use(express.static('./public'));


//routers
// app.get('/hello', (req, res) => {
//     res.send('Task manager')
// })


app.use('/api/v1/tasks', tasks);

const PORT = 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`server is listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}
start()
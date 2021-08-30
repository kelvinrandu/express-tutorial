const express = require('express');
const path = require('path');
const { send } = require('process');
const users = require('./Users');


const app = express();

const logger =( req,res,next) =>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};
app.use(logger);

app.get('/api/users', (req,res) => res.json(users));

app.use(express.static(path.join(__dirname,'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server started on port ${PORT}`));
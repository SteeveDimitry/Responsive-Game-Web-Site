var express = require('express');
var app = express();
var path = require('path');
const PORT = process.env.PORT || 5000


//app.use(express.static(__dirname)); // Current directory is root
app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

app.listen(PORT);
console.log('Listening on port '+PORT);
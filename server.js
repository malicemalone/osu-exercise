const express = require('express');
const cities = require('./data');
const app = express();
const port = 8080;


app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {

	res.sendFile(__dirname + '/index.html');

})

app.get('/api/cities', (req, res) =>  {

	res.send(cities);

})

app.listen(port, () => console.log(`Server listening at port:${port}`));


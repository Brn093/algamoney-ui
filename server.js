const express = require('express');
const app = express();
const projectName = 'algamoney-ui'

app.use(express.static(__dirname + '/dist/' + 'meuprojeto'));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/' + 'meuprojeto' + '/index.html');
});

//app.listen(4200);
app.listen(process.env.PORT || 4200);
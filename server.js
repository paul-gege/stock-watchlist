const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express(); 
const bodyParser = require('body-parser');
const cors = require('cors');
const accountSid = 'AC84c44d339322962f178f31e651ede2b8';
const authToken = 'fdb7c4529c0b62d93fc426f9383b37d9';
const client = require('twilio')(accountSid, authToken);


app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(cors());

app.post("/send-message", function(req,res){
	const message = req.body.message;
	const to = req.body.phoneNumber;

	console.log(message);
	console.log(to);
	client.messages
	  .create({
	     body: message,
	     from: '+12132385909',
	     to: `+${to}`
	   })
	  .then(message => res.json(message.sid))
	  .catch((error) => console.log(error));
})
 
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
 
const PORT = process.env.PORT || 3000;
 
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

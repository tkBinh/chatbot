const express = require('express'); //added
const port = process.env.PORT || 3000; //added
const app = express(); //added

const sentence_feature = require('./sentence_feature'); //added
const neural = require('./neural_iris'); //added
const neural_vietis = require('./neural_vietis'); //added

// Routing for index.html
app.use(express.static(__dirname + '/public')); //added

const server = app.listen(port, '0.0.0.0', () => {  //added
    console.log('Server listening at port %d', port);
});

app.get('/hello', function (req, res) {
	
	//sentence_feature.extract_feature('VietIS là một công ty tuyệt vời', (feature) => {
	//	res.send(JSON.stringify(feature));
	//});
    sentence_feature.extract_feature(req.query.sentence, (feature) => {
		res.send(JSON.stringify(feature));
	});
});

app.get('/neural_train', function (req, res) {
	neural.train();
    res.send("neural_train");
})

app.get('/neural_predict', function (req, res) {
	neural.predict();
    res.send("neural_predict");
})

app.get('/neural_vietis', function (req, res) {
	neural_vietis.train();
    res.send("neural_vietis");
})

app.get('/neural_vietis_predict', function (req, res) {
	neural_vietis.predict(req.query.sentence);
    res.send("neural_vietis");
})
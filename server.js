
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const stripe = require('stripe')('sk_test_51KP6OgCU7wHmOgIeOzCGrwvAHsBA5J3LxUO3De4D24UwBw2ZmfbWufRL9mOGI5bXpqmRvBKI7rJmuRCuROgsGbhV000lpLt332');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.post('/charge', async (req, res) => {
        stripe.paymentIntents.create(
            {
              amount: parseInt(req.body.amount),
              currency: "usd",
              payment_method_types: ["card"],
              receipt_email: "chinedukogu@gmail.com",
            },
            function (err, paymentIntent) {
              if (err) {
                res.status(500).json(err.message);
              } else {
                res.status(201).json(paymentIntent);
                console.log('intent', paymentIntent)
              }
            }
          );

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server is running...'));

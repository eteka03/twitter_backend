require("dotenv").config();
const { TwitterClient } = require("twitter-api-client");
const express = require("express");
const twitterClient = new TwitterClient({
  apiKey: `${process.env.CONSUMER_KEY}`,
  apiSecret: `${process.env.CONSUMER_SECRET_KEY}`,
  accessToken: `${process.env.CONSUMER_ACCESS_TOKEN_KEY}`,
  accessTokenSecret: `${process.env.CONSUMER_TOKEN_SECRET_KEY}`,
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const app = express();
app.use(express.json());

app.get("/user", async (req, res) => {
  const { name } = req.query;

  try {
    const data = await twitterClient.tweets.statusesUserTimeline({
      screen_name: name,
    });

    res.send(data);
  } catch (error) {
    console.error(error);
  }
});
app.listen(process.env.PORT || 8000, console.log(`app is running`));

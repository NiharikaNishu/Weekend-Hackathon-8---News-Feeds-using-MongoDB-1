const express = require('express');
const app = express();
const port = 8080;
const {newsArticleModel} = require("./connector");
const onePageArticleCount = 10;


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/newFeeds/', (req, res) => {
    let limit = (!req.query.limit || isNaN(req.query.limit)) ? 10 : parseInt(req.query.limit);
    let offset = (!req.query.offset || isNaN(req.query.limit)) ? 0 : parseInt(req.query.offset);
    newsArticleModel.find().limit(limit).skip(offset).then(dailynews => res.status(200).send(dailynews));
    return;
});



app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
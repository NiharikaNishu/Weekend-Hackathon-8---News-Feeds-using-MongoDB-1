const express = require('express');
const app = express();
const port = 8080;
const {newsArticleModel} = require("./connector");
const onePageArticleCount = 10;


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/newFeeds/', (req, res) => {
    let docCount = ((req.query.limit !== undefined) && Number.isInteger(req.query.limit)) ? parseInt(req.query.limit) : onePageArticleCount;
    let skipCount = ((req.query.offset !== undefined) && Number.isInteger(req.query.limit)) ? parseInt(req.query.offset) : 0;
    newsArticleModel.find().skip(skipCount).limit(docCount).then(dailynews => res.status(200).send(dailynews));
    return;
});



app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
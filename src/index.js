const express = require('express');
const app = express();
const port = 8080;
const {newsArticleModel} = require("./connector");
const onePageArticleCount = 10;


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/newFeeds/:limit?/:offset?', (req, res) => {
    // console.log(req.params.limit + " " + req.params.offset);
    let docCount = ((req.params.limit === undefined) || isNaN(req.params.limit)) ? onePageArticleCount : parseInt(req.params.limit);
    let skipCount = ((req.params.offset === undefined) || isNaN(req.params.limit)) ? 0 : parseInt(req.params.offset);
    newsArticleModel.find().skip(skipCount).limit(docCount).then(dailynews => res.status(200).send(dailynews));
    return;
});



app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
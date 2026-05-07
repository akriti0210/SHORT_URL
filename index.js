import express from 'express';
import urlRoute from './routes/url.js';
import { connectToMongoDB } from './connect.js';
import URL from './models/url.js';
const app = express();
const port = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.json());
app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
    {
        $push: {
            visitHistory: {timestamp: Date.now()}
    }})
    res.redirect(entry.redirectUrl);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
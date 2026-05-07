import { nanoid } from 'nanoid';
import URL from '../models/url.js';
async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: []
    });
    res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory});
}
export default handleGenerateNewShortURL;
export { handleGetAnalytics };

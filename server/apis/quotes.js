const mongoose = require("mongoose");
const Quotes = mongoose.model("quotes");
const checkAuth = require('../bridge/check-auth'); // checkAuth function is for making the API to work only with an "access_token".

module.exports = (app) => {

    // Get quotes. One random quote is returned.
    app.get(`/api/quotes`, checkAuth, async (req, res) => {
        let quotes = await Quotes.aggregate([{$sample: {size: 1}}]);
        // let quotes = await Quotes.find();
        return res.status(200).send(quotes);
    });

    // Create a new quote.
    app.post(`/api/quotes`, checkAuth, async (req, res) => {
        let quotes = await Quotes.create(req.body);
        return res.status(201).send({
            error: false, quotes,
        });
    });

    // Update a quote.
    app.put(`/api/quotes/:id`, checkAuth, async (req, res) => {
        const {id} = req.params;

        let quotes = await Quotes.findByIdAndUpdate(id, req.body);

        return res.status(202).send({
            error: false, quotes,
        });
    });

    // Delete a quote.
    app.delete(`/api/quotes/:id`, checkAuth, async (req, res) => {
        const {id} = req.params;

        let quotes = await Quotes.findByIdAndDelete(id);

        return res.status(202).send({
            error: false, quotes,
        });
    });
};

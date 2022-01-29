const mongoose = require("mongoose");
const Bookmarks = mongoose.model("bookmarks");
const checkAuth = require('../middleware/check-auth'); // checkAuth function is for making the API to work only with an "access_token".

module.exports = (app) => {
    app.get(`/api/bookmarks`, checkAuth, async (req, res) => {
        let bookmarks = await Bookmarks.find().collation({locale: "en"}).sort({name: 1});
        // let links = await Links.find();
        return res.status(200).send(bookmarks);
    });

    app.post(`/api/bookmarks`, checkAuth, async (req, res) => {
        let bookmarks = await Bookmarks.create(req.body);
        return res.status(201).send({
            error: false,
            bookmarks,
        });
    });

    app.put(`/api/bookmarks/:id`, checkAuth, async (req, res) => {
        const {id} = req.params;

        let bookmarks = await Bookmarks.findByIdAndUpdate(id, req.body);

        return res.status(202).send({
            error: false,
            bookmarks,
        });
    });

    app.delete(`/api/bookmarks/:id`, checkAuth, async (req, res) => {
        const {id} = req.params;

        let bookmarks = await Bookmarks.findByIdAndDelete(id);

        return res.status(202).send({
            error: false,
            bookmarks,
        });
    });
};

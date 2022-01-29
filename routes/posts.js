const mongoose = require("mongoose");
const Collection = mongoose.model("posts");
const checkAuth = require("../middleware/check-auth"); // checkAuth function is for making the API to work only with an "access_token".
const _ = require('lodash');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit.rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

module.exports = (app) => {

    app.use('/api', limiter);

    // Get all.
    app.get("/api/posts/", checkAuth, (req, res) => {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 3; // If not limit provided in the API call, return 3 only.
        const query = {};
        Collection.find(query)
            .skip(page * limit)
            .limit(limit)
            .sort({date: -1})
            .exec((err, doc) => {
                if (err) {
                    return res.json(err);
                }
                Collection.countDocuments(query).exec((count_error, count) => {
                    if (err) {
                        return res.json(count_error);
                    }
                    return res.json({
                        total: count,
                        page: page,
                        page_size: doc.length,
                        posts: doc
                    });
                });
            });
    });

    // Search.
    app.get(`/api/posts/search/`, checkAuth, (req, res) => {

        const log = req.query.log; // "req.query" is what tells the API request to expect parameters, and it gets whatever comes after it.

        // 'escapeRegExp' for preventing regexp-injection vulnerability.
        Collection.find({log: new RegExp(_.escapeRegExp(log), 'i')}).sort({date: -1}).exec((err, doc) => {
            if (err) {
                return res.json(err);
            }
            if (log.length === 0) {
                return res.json({message: "Oi, mate! That parameter is empty, innit?"})
            }
            return res.json(doc)
        });

    });

    // Create.
    app.post(`/api/posts/`, checkAuth, async (req, res) => {
        let posts = await Collection.create(req.body);
        return res.status(201).send({
            error: false,
            posts,
        });
    });

    // Change.
    app.put(`/api/posts/:id`, checkAuth, async (req, res) => {
        const {id} = req.params;

        let posts = await Collection.findByIdAndUpdate(id, req.body);

        return res.status(202).send({
            error: false,
            posts,
        });
    });

    // Delete.
    app.delete(`/api/posts/:id`, checkAuth, async (req, res) => {
        const {id} = req.params;

        let posts = await Collection.findByIdAndDelete(id);

        return res.status(202).send({
            error: false,
            posts,
        });
    });
};

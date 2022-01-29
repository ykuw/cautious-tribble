const mongoose = require("mongoose");
const Collection = mongoose.model("efficiency");
const checkAuth = require('../middleware/check-auth'); // checkAuth function is for making the API to work only with an "access_token".

module.exports = (app) => {
    app.get(`/api/efficiency`, checkAuth, async (req, res) => {
        let efficiency = await Collection.find().sort({date: -1});
        return res.status(200).send(efficiency);
    });

    app.get(`/api/efficiency/:id`, checkAuth, async (req, res) => {
        const {id} = req.params;

        let efficiency = await Collection.findById(id, req.body);
        return res.status(200).send(efficiency);
    });

    app.post(`/api/efficiency`, checkAuth, async (req, res) => {
        let efficiency = await Collection.create(req.body);
        return res.status(201).send({
            error: false,
            efficiency,
        });
    });

    app.put(`/api/efficiency/:id`, checkAuth, async (req, res) => {
        const {id} = req.params;

        let efficiency = await Collection.findByIdAndUpdate(id, req.body);

        return res.status(202).send({
            error: false,
            efficiency,
        });
    });

    app.delete(`/api/efficiency/:id`, checkAuth, async (req, res) => {
        const {id} = req.params;

        let efficiency = await Collection.findByIdAndDelete(id);

        return res.status(202).send({
            error: false,
            efficiency,
        });
    });
};

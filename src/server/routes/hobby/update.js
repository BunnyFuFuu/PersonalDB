const { ObjectID } = require("mongodb");

module.exports = {
    method: "put",
    path: "/hobby/update",
    admin: true,
    handler: async function (req, res) {
        const exp = this.db.collection("hobbies");
        req.body._id = new ObjectID(req.body._id);
        const filter = {_id: req.body._id};
        await exp.replaceOne(filter, req.body);
        res.sendStatus(200);
    }
}
const { ObjectID } = require("mongodb");

module.exports = {
    method: "put",
    path: "/experience/update",
    admin: true,
    handler: async function (req, res) {
        const exp = this.db.collection("experiences");
        req.body._id = new ObjectID(req.body._id);
        const filter = {_id: req.body._id};
        await exp.replaceOne(filter, req.body);
        console.log("replaced");
        res.sendStatus(200);
    }
}
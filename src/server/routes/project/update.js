const { ObjectID } = require("mongodb");

module.exports = {
    method: "put",
    path: "/project/update",
    admin: true,
    /**
     * Updates selected project in database
     */
    handler: async function (req, res) {
        const exp = this.db.collection("projects");
        req.body._id = new ObjectID(req.body._id);
        const filter = {_id: req.body._id};
        await exp.replaceOne(filter, req.body);
        res.sendStatus(200);
    }
}
const { ObjectID } = require("mongodb");

/**
 * @type {Endpoint}
 */
module.exports = {
    method: "put",
    path: "/experience/update",
    admin: true,
    /**
     * Updates selected experience in database
     */
    handler: async function (req, res) {
        const exp = this.db.collection("experiences");
        req.body._id = new ObjectID(req.body._id);
        const filter = {_id: req.body._id};
        await exp.replaceOne(filter, req.body);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.sendStatus(200);
    }
}
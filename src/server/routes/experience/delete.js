const { ObjectID } = require("mongodb");

/**
 * @type {Endpoint}
 */
module.exports = {
    method: "delete",
    path: "/experience/delete",
    admin: true,
    /**
     * Deletes the selected experience from database.
     */
    handler: async function (req, res) {
        const exp = this.db.collection("experiences");
        const query = {_id: new ObjectID(req.body._id)};
        const result =  await exp.deleteOne(query);
        res.setHeader("Access-Control-Allow-Origin", "*");
        return result.deletedCount == 1 ? res.sendStatus(200) : res.sendStatus(404);
    }
}
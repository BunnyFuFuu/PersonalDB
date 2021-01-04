const { ObjectID } = require("mongodb");

module.exports = {
    method: "delete",
    path: "/experience/delete",
    admin: true,
    handler: async function (req, res) {
        const exp = this.db.collection("experiences");
        const query = {_id: new ObjectID(req.body._id)};
        const result =  await exp.deleteOne(query);
        return result.deletedCount == 1 ? res.sendStatus(200) : res.sendStatus(404);
    }
}
/**
 * @type {Endpoint}
 */
module.exports = {
    method: "post",
    path: "/hobby/create",
    admin: true,
    /**
     * Creates a hobby on the database.
     */
    handler: async function (req, res) {
        const exp = this.db.collection("hobbies");
        const result = await exp.insertOne(req.body);
        res.setHeader("Access-Control-Allow-Origin", "*");
        return result.insertedCount == 1 ? res.sendStatus(200) : res.sendStatus(400);
    }
}
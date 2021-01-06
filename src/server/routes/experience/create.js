module.exports = {
    method: "post",
    path: "/experience/create",
    admin: true,
    /**
     * Creates an experience on the database.
     */
    handler: async function (req, res) {
        const exp = this.db.collection("experiences");
        const result = await exp.insertOne(req.body);
        return result.insertedCount == 1 ? res.sendStatus(200) : res.sendStatus(400);
    }
}
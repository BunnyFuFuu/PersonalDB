module.exports = {
    method: "post",
    path: "/project/create",
    admin: true,
    /**
     * Creates a project on the database.
     */
    handler: async function (req, res) {
        const exp = this.db.collection("projects");
        const result = await exp.insertOne(req.body);
        return result.insertedCount == 1 ? res.sendStatus(200) : res.sendStatus(400);
    }
}
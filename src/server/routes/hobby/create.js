module.exports = {
    method: "post",
    path: "/hobby/create",
    admin: true,
    handler: async function (req, res) {
        const exp = this.db.collection("hobbies");
        const result = await exp.insertOne(req.body);
        return result.insertedCount == 1 ? res.sendStatus(200) : res.sendStatus(400);
    }
}
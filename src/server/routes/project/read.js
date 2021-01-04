module.exports = {
    method: "get",
    path: "/project/read",
    handler: async function (req, res) {
        const exp = this.db.collection("projects");
        let result = {"docs": []};
        const dbQuery = await exp.find().forEach(i => result.docs.push(i));
        return res.json(result);
    }
}
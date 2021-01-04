module.exports = {
    method: "get",
    path: "/experience/read",
    handler: async function (req, res) {
        const exp = this.db.collection("experiences");
        let result = {"docs": []};
        const dbQuery = await exp.find().forEach(i => result.docs.push(i));
        return res.json(result);
    }
}
module.exports = {
    method: "get",
    path: "/hobby/read",
    /**
     * Sends all hobbies in database back to caller
     */
    handler: async function (req, res) {
        const exp = this.db.collection("hobbies");
        let result = {"docs": []};
        const dbQuery = await exp.find().forEach(i => result.docs.push(i));
        return res.json(result);
    }
}
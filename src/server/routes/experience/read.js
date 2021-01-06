/**
 * @type {Endpoint}
 */
module.exports = {
    method: "get",
    path: "/experience/read",
    /**
     * Sends all experiences in database back to caller
     */
    handler: async function (req, res) {
        const exp = this.db.collection("experiences");
        let result = {"docs": []};
        const dbQuery = await exp.find().forEach(i => result.docs.push(i));
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(result);
    }
}
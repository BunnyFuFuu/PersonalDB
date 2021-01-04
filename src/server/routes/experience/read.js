module.exports = {
    method: "get",
    path: "/experience/read",
    handler: async function (req, res) {
        // TODO
        console.log("in experience GET");
        res.sendStatus(200);
    }
}
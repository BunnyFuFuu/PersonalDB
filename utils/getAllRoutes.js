const fs = require('fs');
const path = require('path');

/**
 * Gets all endpoint files within this subdirectory
 * @param { string } route
 * @returns { Array<string> } All valid file routes in this directory
 */
getAllRoutes = (route) => {
    const subs = fs.readdirSync(route);
    const routes = subs.map(file => {
        const fPath = path.join(route, file);
        return fs.statSync(fPath).isDirectory() ? getAllRoutes(fPath) : fPath;
    });
    return routes;
};

module.exports = getAllRoutes;
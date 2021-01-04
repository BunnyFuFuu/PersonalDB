const express = require('express');
const fs   = require('fs');
const path = require('path');
const body = require('body-parser');
const getAllRoutes = require('../../utils/getAllRoutes');
const { urlencoded } = require('express');
const { MongoClient } = require("mongodb");                                                                                                                                   
const dbConfig = require('../../db-config.json');

/**
 * TODO: Actually define this.db
 */
class Server {
    constructor() {
        this.client = new MongoClient(dbConfig.uri);
        this.client.connect().then(() =>{
            console.debug(`Connected to MongoDB`);
            this.db = this.client.db(dbConfig.db);
        });
        
        
        this.router = express.Router()
            .use(async (req, res, next) => {
                const token = req.get("Authorization");
                if(token) {
                    // Parse token, ignore until we use admin enabled endpoints
                }
                return next();
            });
        this.registerAllEndpoints();
    }
    registerAllEndpoints() {
        const routes = getAllRoutes(path.join(__dirname, 'routes')).flat();
        routes.map(route => {
            /** @type { Endpoint } */
            const endpoint = require(route);
            if(!endpoint.path || !endpoint.method || !endpoint.handler) {
                console.debug(`Incomplete endpoint at ${route}`);
                return false;
            }
            if (endpoint.admin) {
                
                this.router.use(endpoint.path, (req, res, next)=> {
                    // TODO: check Auth0 management API to verify user has mgt privs
                    // TODO: also check if the user is authenticated at all
                    if (!req.payload) return res.sendStatus(401);
                    
                    next();
                })
            }
            this.router.use(endpoint.path, body.json(), urlencoded({extended: true}));
            this.router[endpoint.method](endpoint.path, endpoint.handler.bind(this));
            
            console.debug(`${endpoint.method} method at ${endpoint.path}`);
        })

    }
}

module.exports = Server;
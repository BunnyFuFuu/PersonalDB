const express = require('express');
const fs   = require('fs');
const path = require('path');
const body = require('body-parser');
const getAllRoutes = require('../../utils/getAllRoutes');
const { urlencoded } = require('express');
const { MongoClient } = require("mongodb");                                                                                                                                   
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * TODO: Actually define this.db
 */
class Server {
    constructor() {
        this.client = new MongoClient(process.env.DB_ADDR);
        this.client.connect().then(() =>{
            console.debug(`Connected to MongoDB`);
            this.db = this.client.db(process.env.DB_NAME);
        });
        
        
        this.router = express.Router()
            .use(async (req, res, next) => {
                const token = req.get("Authorization");
                if(token) {
                    // Parse token
                    try {
                        req.payload = token.split(" ")[1];
                    } catch (e) {
                        console.debug('Issue with obtaining JWT.');
                    }
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
                    // TODO: Verify the JWT
                    // TODO: also check if the user is authenticated at all
                    if (!req.payload) return res.sendStatus(401);
                    let decoded;
                    try {
                        decoded = jwt.verify(req.payload, fs.readFileSync(path.join(__dirname, '../../dev-j3ai5m4d.pem')), { algorithms: ['RS256'] });
                        //console.log(decoded.iss);
                        if (decoded.iss != "https://dev-j3ai5m4d.us.auth0.com/") {
                            return res.sendStatus(403);
                        }
                        if (decoded.sub != process.env.AUTH_USER) {
                            return res.sendStatus(403);
                        }

                    } catch (e) {
                        return res.sendStatus(403);
                    }
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
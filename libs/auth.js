import jwt from "jwt-simple";

/**
 * Verify if the token sent by the endpoint is valid
 * @param req Request object of requisition
 * @param res Response object of requisition
 * @param app App module
 * @param secret Secret of JWT
 * @param next Next route
 */
exports.verifyToken = (req, res, app, secret, next) => {

    // Import user model
    const Users = app.db.models.Users;

    // Get the authorization header
    const token = req.headers["authorization"];

    // Verify if header has sent
    if(token){

        const decoded = jwt.decode(token, secret);

        // Verify token lifetime
        if (decoded.exp <= Date.now()) {
            res.status(401).json({error: 'Acesso Expirado, faça login novamente'});
        }

        // Verify owner of token
        Users.findOne({ where : {id : decoded.iss}}).then( user => {
            req.user = user;
            return next();
        }).catch( error => {
            res.status(500).json({"error" : ""});
        });
    } else {
        res.status(400).json({"error" : "Authorization header not sent"});
    }
};
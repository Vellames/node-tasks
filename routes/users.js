

module.exports = app => {

    // Authorization module
    const auth = require("../libs/auth");

    // Other modules
    const Users = app.db.models.Users;
    const Config = app.libs.config;

    app.route("/users")
        .all((req, res, next) => {
            if(req.method.toUpperCase() != "POST"){
                auth.verifyToken(req, res, app, Config.jwtSecret, next);
            }
        })
        .post((req, res) => {
            Users.create(req.body).then(result =>
                res.json({user : result})
            ).catch(error => {
                res.status(500).json({msg: error.message});
            });
        })
        .get((req, res) => {

            Users.findById(req.user.id).then(result =>
                res.json({user : result})
            ).catch(error => {
                res.status(500).json({msg: error.message});
            });
        })
        .delete((req, res) => {

            Users.destroy({where: {id: req.user.id} }).then(result =>
                res.sendStatus(204)
            ).catch(error => {
                res.status(500).json({msg: error.message});
            });
        });
};

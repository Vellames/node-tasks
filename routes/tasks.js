const auth = require("../libs/auth");
import jwt from "jwt-simple";

module.exports = app => {
    const Tasks = app.db.models.Tasks;
    const Config = app.libs.config;

    app.route("/tasks")
        .all((req, res, next) => {
            auth.verifyToken(req, res, app, Config.jwtSecret, next)
        })
        .get((req, res) => {
            Tasks.findAll({}).then(result =>
                res.json(req.user)
            ).catch(error => {
                res.status(500).json({error: error.message});
            });
        })
        .post((req, res) => {
            req.body.user_id = req.user.id;
            Tasks.create(req.body).then(result =>
                res.json({"task" : result})
            ) .catch(error => {
                res.status(500).json({error : "aqui" + error.message});
            });
        });
    app.route("/tasks/:id")
        .get((req, res) => {
            Tasks.findOne({where: req.params}).then(result => {
                if(result){
                    res.json(result);
                } else {
                    res.sendStatus(404);
                }
            }).catch(error => {
                res.status(500).json({error: error.message});
            });
        })
        .put((req, res) => {
            Tasks.update(req.body, {where: req.params}).then(result =>
                res.sendStatus(204)
            ).catch(error => {
                res.status(500).json({error: error.message});
            });
        })
        .delete((req, res) => {
            Tasks.destroy({where: req.params}).then(result =>
                res.sendStatus(204)
            ).catch(error => {
                res.status(500).json({error: error.message});
            });
        });
};
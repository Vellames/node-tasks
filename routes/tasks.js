const auth = require("../libs/auth");

module.exports = app => {
    const Tasks = app.db.models.Tasks;
    const Config = app.libs.config;

    app.route("/tasks")
        .all((req, res, next) => {
            auth.verifyToken(req, res, app, Config.jwtSecret, next)
        })
        .get((req, res) => {
            Tasks.findAll({where :{user_id : req.user.id}}).then(result =>
                res.json({"tasks" : result})
            ).catch(error => {
                res.status(500).json({error: error.message});
            });
        })
        .post((req, res) => {
            req.body.user_id = req.user.id;
            Tasks.create(req.body).then(result =>
                res.json({"task" : result})
            ) .catch(error => {
                res.status(500).json({error : error.message});
            });
        });
    app.route("/tasks/:id")
        .all((req, res, next) => {
            auth.verifyToken(req, res, app, Config.jwtSecret, next)
        })
        .get((req, res) => {

            const param = {where :{
                "id" : req.params.id,
                "user_id" : req.user.id
            }};

            Tasks.findOne(param).then(result => {
                if(result){
                    res.json({task : result});
                } else {
                    res.status(400).json({info : "Task not found"});
                }
            }).catch(error => {
                res.status(500).json({error: error.message});
            });
        })
        .put((req, res) => {

            const param = {where : {
                id: req.params.id,
                user_id: req.user.id,
            }};

            Tasks.update(req.body, param).then(result => {
                res.json({
                    info: (result == 1 ? "Task updated with success" : "No tasks are updated")
                });
            }).catch(error => {
                res.status(500).json({error: error.message});
            });
        })
        .delete((req, res) => {

            const param = { where : {
                id: req.params.id,
                user_id: req.user.id
            }};

            Tasks.destroy(param).then(result =>{
                console.log("deleted" + result);
                res.json({
                   info: (result == 1 ? "Task deleted with success" : "No tasks are deleted")
                });
            }).catch(error => {
                res.status(500).json({error: error.message});
            });

        });
};
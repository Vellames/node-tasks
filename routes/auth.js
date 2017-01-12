import jwt from "jwt-simple";
import moment from 'moment';

module.exports = app => {

    const Users = app.db.models.Users;
    const Config = app.libs.config;

    app.post("/auth/login", (req, res) => {

        const email = req.body.email;
        const password = req.body.password;

        const jsonFindOne = { where : {
           email: email
        }};

        Users.findOne(jsonFindOne).then( (user) => {

            if(user == null){
                res.status(401);
                res.json({error : "Invalid email"});
            }

            if(Users.verifyPassword(user.password, password)){

                const expires = moment().add(7, "days");
                const token = jwt.encode({
                    iss: user.id,
                    exp: expires.valueOf()
                }, Config.jwtSecret);

                res.json({
                    token : token,
                    expires: expires,
                    user: user
                });

            } else {
                res.status(401);
                res.json({"error" : "Invalid password"});
            }
        }).catch(error => {
            res.json({"error" : error.message});
            res.sendStatus(401);
        });
    });

};
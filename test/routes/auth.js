describe("Routes: Auth", () => {

    const Users = app.db.models.Users;

    const userTest = {
        name : "Jonh Connor",
        email: "jonh@gmail.com",
        password : "123456"
    };

    describe("POST /auth/login", () => {

        beforeEach(done => {

            Users.destroy({where: { email : userTest.email}}).then((result) => {
               Users.create(userTest).then((result) => {
                    done();
               });
            })


        });

        describe("Status 200", () => {
            it("returns authenticated user token", done => {

                const user = {
                    email: userTest.email,
                    password : userTest.password
                };

                request.post("/auth/login").send(user).expect(200).end((err, res) => {
                    expect(res.body).to.include.keys("token");
                    done(err);
                });
            });
        });

        describe("Status 401", () => {
            it("Throws error when password is incorrect", done => {

                const user = {
                    email: userTest.email,
                    password: "1234567890"
                };

                request.post("/auth/login").send(user).expect(401).end((err, res) => {
                    const expected = {"error" : "Invalid password"};
                    expect(res.body).to.eql(expected);
                    done(err);
                });

            });
            it("Throws error when email is incorrect", done => {

                const user = {
                    email: "a123@a123.commmm",
                    password: userTest.password
                };

                request.post("/auth/login").send(user).expect(401).end((err, res) => {
                    const expected = {error : "Invalid email"};
                    expect(res.body).to.eql(expected);
                    done(err);
                });

            });
            it("Throws error when email is not sent", done => {
                const user = {
                    password : userTest.password
                };

                request.post("/auth/login").send(user).expect(401).end((err, res) => {
                    expect(res.body).to.include.keys("error");
                    done(err);
                });
            });
           /* it("Throws error when password is not sent", done => {

            });
            it("Throws error when password and email is not sent", done => {

            });*/
        });
    });
});
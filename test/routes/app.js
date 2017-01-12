describe("Routes: App", () => {
    describe("GET /", () => {
        it("returns the API status", done => {
            request.get("/")
                .expect(200)
                .end((err, res) => {
                    const expected = {status: "Node Tasks API"};
                    expect(res.body).to.eql(expected);
                    done(err);
                });
        });
    });
});
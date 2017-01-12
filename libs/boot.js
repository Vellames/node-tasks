module.exports = app => {
    if (process.env.NODE_ENV.toLowerCase() !== "test") {
        app.db.sequelize.sync().done(() => {
            app.listen(app.get("port"), () => {
                console.log(`Node Task API - Port ${app.get("port")}`);
            });
        });
    }
}


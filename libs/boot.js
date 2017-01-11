module.exports = app => {
	app.db.sequelize.sync().done(() => {
		app.listen(app.get("port"), () => {
			console.log(`Node Task API - Port ${app.get("port")}`);
		});
	});
}


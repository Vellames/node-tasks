module.exports = app => {
	
	return {
		findAll: (params, callback) => {
			return callback([
				{title: "Fazer comprasssssss"},
				{title: "Consertar o pcccc"},
			]);
		}
	};

};
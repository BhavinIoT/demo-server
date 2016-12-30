/**
 * LightController
 *
 * @description :: Server-side logic for managing lights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res, next) {
		Light.find({}).exec(function (err, lights) {
			if(err) return next(err);
			res.ok(lights);
		});
	},
	create: function (req, res, next) {
		// valid params: 
		// - name
		// - state
		Light.create(req.params.all()).exec(function (err, light) {
			if(err) return next(err);
			res.ok(light);
		});
	},
	update: function (req, res, next) {
		// valid params: 
		// - name
		// - state
		Light.findOne(req.param('id')).exec(function (err, light) {
			if(err) return next(err);
			if (light) {
				Light.update(light.id,req.params.all()).exec(function (err, lights) {
					if(err) return next(err);
					res.ok(lights[0]);
				});
			} else return next("pls enter a valid id");
		});
	},
	turnOn: function (req, res, next) {
		// valid params: 
		// - name
		// - state
		Light.findOne(req.param('id')).exec(function (err, light) {
			if(err) return next(err);
			if (light) {
				Light.update(light.id,{id: light.id, state: true}).exec(function (err, lights) {
					if(err) return next(err);
					res.ok(lights[0]);
				});
			} else return next("pls enter a valid id");
		});
	},
	turnOff: function (req, res, next) {
		// valid params: 
		// - name
		// - state
		Light.findOne(req.param('id')).exec(function (err, light) {
			if(err) return next(err);
			if (light) {
				Light.update(light.id,{id: light.id, state: false}).exec(function (err, lights) {
					if(err) return next(err);
					res.ok(lights[0]);
				});
			} else return next("pls enter a valid id");
		});
	},
	toggle: function (req, res, next) {
		// valid params: 
		// - name
		// - state
		Light.findOne(req.param('id')).exec(function (err, light) {
			if(err) return next(err);
			if (light) {
				Light.update(light.id,{id: light.id, state: !light.state}).exec(function (err, lights) {
					if(err) return next(err);
					res.ok(lights[0]);
				});
			} else return next("pls enter a valid id");
		});
	},
	destroy: function (req, res, next) {
		Light.findOne(req.param('id')).exec(function (err, light) {
			if(err) return next(err);
			if (light) {
				Light.destroy(light.id).exec(function (err) {
					if(err) return next(err);
					Light.publishDestroy(light.id);
					res.ok(light);
				});
			} else return next("pls enter a valid id");
		});
	},
	destroyAll: function (req, res, next) {
		Light.destroy().exec(function (err, lights) {
			if(err) return next(err);
			res.ok(lights);
		});
	}
};

/**
 * Light.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	schema: true,
	connection: 'demoMongoDb',
	tableName: 'light',
	attributes: {
		// static properties: don't change that frequently
		name: {
			type: 'string',
			required: true
		},
		// protected properties: should ideally require elevated permissions to change
		topic: {
			type: 'string'
		},
		state: {
			type: 'boolean',
			defaultsTo: false
		},
		// to speed things up, don't return these, unless explicitly asked for
		toJSON: function () {
			var obj = this.toObject();
			// delete obj.createdAt;
			// delete obj.updatedAt;
			return obj;
		}
	},
	// lifecycle callbacks
	beforeCreate: function (vals, next) {
		// if state is passed, check state and set state
		if (LightService.exists(vals.state)) {
			var state = LightService.getBool(vals.state);
			if (state == null) return next('The parameter state should be a boolean (or "true"/"false")');
			else vals.state = state;
		};
		vals.topic = 'lights/'+LightService.getId(10);
		next();
	},
	beforeUpdate: function (vals, next) {
		console.log(vals);
		// get the light object before futher validation
		Light.findOne(vals.id).exec(function (err, light) {
			// if state is passed: check state, set state and publish on mqtt
			if (LightService.exists(vals.state)) {
				// make sure the state is entered correctly
				var state = LightService.getBool(vals.state);
				if (state == null) return next('The parameter state should be a boolean (or "true"/"false")');
				else vals.state = state;
				// create the payload
				var payload;
				if (vals.state == true) payload = 1;
				if (vals.state == false) payload = 0;
				MqttService.shout({ topic:light.topic, payload:payload });
				// finally, move on
				next();
			} else {				
				next();
			}
		});
	}
};

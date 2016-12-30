var mqtt = require('mqtt');

var mqtt_client = mqtt.connect('tcp://127.0.0.1:1883', {
	clientId		: 'nodejs_server_' + Math.random().toString(36).substr(2,7),
	clean			: false
});

mqtt_client.on('connect', function () {
	mqtt_client.subscribe('lights/#');
});

mqtt_client.on('message', function (topic, payload) {
	console.log('recieved message on topic: '+topic+' and payload: '+payload)
});

module.exports = {
	shout: function(opts){
		console.log('publishing on topic: '+opts.topic+' and payload: '+opts.payload)
		mqtt_client.publish(opts.topic, String(opts.payload));
		return true;
	}
}
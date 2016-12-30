var shortid = require('shortid');

module.exports = {
	exists: function (param) {
		if (typeof param !== 'undefined' && param != null) return true;
		if (typeof param === 'undefined' || param == null) return false;
	},
	getBool: function (bool) {
		if (bool == true || bool == 'true') return true;
		else if (bool == false || bool == 'false') return false;
		else return null;
	},
	getId: function () {
		return shortid.generate();
	}
}
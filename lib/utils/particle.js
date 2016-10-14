'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.generateParticles = generateParticles;

var _profiles = require('../utils/profiles');

/**
 * Create a single particle Object.
 *
 * @private
 *
 * @param  {array}  profile - particle profile that contains type and velocity
 * @param  {object} bounds  - canvas width and height
 *
 * @return {object} particle Object
 */
function _createParticle(profile, _ref) {
	var width = _ref.width;
	var height = _ref.height;
	var random = Math.random;

	var _getParticleValues = (0, _profiles.getParticleValues)(profile);

	var deltaX = _getParticleValues.deltaX;
	var deltaY = _getParticleValues.deltaY;
	var deltaOpacity = _getParticleValues.deltaOpacity;
	var radius = _getParticleValues.radius;
	var color = _getParticleValues.color;
	var opacity = _getParticleValues.opacity;


	return {
		init: function init() {
			this.x = random() * width;
			this.y = random() * -height;
			this.deltaX = deltaX;
			this.deltaY = deltaY;
			this.color = color;
			this.radius = radius;
			this.opacity = opacity;
			this.deltaOpacity = deltaOpacity;

			return this;
		}
	};
}

/**
 * Generates a specific amount of particles to be rendered
 * on the canvas based on the specified particle profile.
 *
 * @param  {array}  profile - particle profile that contains type and velocity
 * @param  {number} amount  - the amount of particles to be rendered
 * @param  {object} bounds  - canvas width and height
 *
 * @return {array} particle Objects to be rendered
 */
function generateParticles(profile, amount, bounds) {
	var particles = [];

	while (amount--) {
		var particle = _createParticle(profile, bounds);

		particle.init();
		particles.push(particle);
	}

	return particles;
}
//# sourceMappingURL=particle.js.map
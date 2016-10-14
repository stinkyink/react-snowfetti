'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getParticleValues = getParticleValues;

var _randomHex = require('random-hex');

var _randomHex2 = _interopRequireDefault(_randomHex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var random = Math.random;
var floor = Math.floor;

/**
 * Retrieves a random color from the supplied color
 * palette.
 *
 * @private
 *
 * @param  {array} palette - contains hex color strings
 *
 * @return {string} random hex color code
 */

function _getRandomPaletteColor(palette) {
	var i = floor(random() * palette.length);

	return palette[i];
}

/**
 * Hash map of particle types.
 *
 * @type {Object}
 */
var TYPES = {

	/**
  * Retrieves the visual values of a `snow` particle.
  *
  * @param  {array} palette - optional hex color strings
  *
  * @return {object} snow particle values.
  */
	snow: function snow(palette) {
		var color = palette && palette.length ? _getRandomPaletteColor(palette) : '#fff';

		return {
			color: color,
			radius: 0.4 + random() * 2,
			opacity: 0.5 + random() * 0.5
		};
	},


	/**
  * Retrieves the visual values of a `confetti` particle.
  *
  * @param  {array} palette - optional hex color strings
  *
  * @return {object} confetti particle values.
  */
	confetti: function confetti(palette) {
		var color = palette && palette.length ? _getRandomPaletteColor(palette) : _randomHex2.default.generate();

		return {
			color: color,
			radius: 0.2 + random() * 4,
			opacity: 1,
			deltaOpacity: 0.05 * random()
		};
	}
};

/**
 * Hash map of particle velocity types.
 *
 * @type {Object}
 */
var VELOCITIES = {

	/**
  * Retrieves the kinetic values of a `slow` particle.
  *
  * @return {object} kinetic particle values.
  */
	slow: function slow() {
		return {
			deltaX: 0.35 - random(),
			deltaY: 0.15 + random() * 1.1
		};
	},


	/**
  * Retrieves the kinetic values of a `steady` particle.
  *
  * @return {object} kinetic particle values.
  */
	steady: function steady() {
		return {
			deltaX: 0.25 - random(),
			deltaY: 0.8 + random() * 0.4 + random() * 2
		};
	},


	/**
  * Retrieves the kinetic values of a `fast` particle.
  *
  * @return {object} kinetic particle values.
  */
	fast: function fast() {
		return {
			deltaX: 0.25 - random(),
			deltaY: 1.1 + random() * 0.4 + random() * 2
		};
	}
};

/**
 * Retrieves all particle values denoted by a specific
 * profile.
 *
 * @param  {array} profile - contains `type`, `velocity` and optional `palette`
 *
 * @return {object} contains all particle values
 */
function getParticleValues(_ref) {
	var _ref2 = _slicedToArray(_ref, 3);

	var _ref2$ = _ref2[0];
	var type = _ref2$ === undefined ? 'snow' : _ref2$;
	var _ref2$2 = _ref2[1];
	var velocity = _ref2$2 === undefined ? 'slow' : _ref2$2;
	var _ref2$3 = _ref2[2];
	var palette = _ref2$3 === undefined ? [] : _ref2$3;

	return Object.assign({}, TYPES[type](palette), VELOCITIES[velocity]());
};
//# sourceMappingURL=profiles.js.map
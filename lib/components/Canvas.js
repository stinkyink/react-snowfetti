'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _particle = require('../utils/particle');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypes = _react2.default.PropTypes;

var PROFILE = ['snow', 'steady'];
var AMOUNT = 800;
var WIDTH = 600;
var HEIGHT = 300;
var STYLES = {
	backgroundColor: '#0A2933',
	position: 'absolute',
	top: '0',
	left: '0'
};

exports.default = _react2.default.createClass({
	displayName: 'Canvas',


	propTypes: {
		width: PropTypes.number,
		height: PropTypes.number,
		style: PropTypes.object,
		amount: PropTypes.number,
		profile: PropTypes.array
	},

	/**
  * Canvas context.
  *
  * @type {object}
  *
  * @see `render()`
  */
	ctx: null,

	/**
  * Dynamic particle x coordinate value, determined by the mouse
  * cursor position.
  *
  * @type {number}
  *
  * @see `handleMouseMove()`
  */
	dynamicX: 1,

	/**
  * Draws particles on the canvas by continiously updating the
  * particle values.
  *
  * @param  {array} particles - particle Objects to be rendered
  */
	draw: function draw(particles) {

		/**
   * Note that angles are measured in radians:
   *
   * radians = (Math.PI / 180) * degrees
   */
		var startAngle = 0;
		var endAngle = 2 * Math.PI; // 360 degrees in radians
		var antiClockwise = true;
		var ctx = this.ctx;
		var dynamicX = this.dynamicX;
		var _props = this.props;
		var _props$width = _props.width;
		var width = _props$width === undefined ? WIDTH : _props$width;
		var _props$height = _props.height;
		var height = _props$height === undefined ? HEIGHT : _props$height;
		var _props$profile = _props.profile;
		var profile = _props$profile === undefined ? PROFILE : _props$profile;

		var _profile = _slicedToArray(profile, 1);

		var type = _profile[0];

		// Clear the canvas context before updating and animating the particles.

		ctx.clearRect(0, 0, width, height);

		// Updates the particle values before (re) drawing to create an animation on the canvas.
		particles.forEach(function (particle) {
			var deltaX = particle.deltaX;
			var deltaY = particle.deltaY;
			var color = particle.color;
			var radius = particle.radius;
			var opacity = particle.opacity;
			var deltaOpacity = particle.deltaOpacity;

			// Update particle values before animating.

			particle.x += deltaX + 1.33 * dynamicX;
			particle.y += deltaY;

			// Update particle opacity based on particle type.
			switch (type) {
				case 'snow':
					{
						particle.opacity = opacity;

						break;
					}

				case 'confetti':
					{
						if (particle.opacity <= 0) {
							particle.opacity += deltaOpacity;
						}

						if (particle.opacity > 0) {
							particle.opacity -= deltaOpacity;
						}

						break;
					}
			}

			// Style the particles.
			ctx.fillStyle = color;
			ctx.globalAlpha = particle.opacity;

			// Animate the particles.
			ctx.beginPath();
			ctx.arc(particle.x, particle.y, radius, startAngle, endAngle, antiClockwise);
			ctx.fill();
			ctx.closePath();

			// Re initialize the particle when it falls out of the view port.
			if (particle.y > height) {
				particle.init();
			}
		});

		this.animate(particles);
	},


	/**
  * Animate by drawing all particles.
  *
  * @param  {array} particles - particle Objects to be rendered
  */
	animate: function animate(particles) {
		window.requestAnimationFrame(this.draw.bind(this, particles));
	},
	componentDidMount: function componentDidMount() {
		var _props2 = this.props;
		var _props2$profile = _props2.profile;
		var profile = _props2$profile === undefined ? PROFILE : _props2$profile;
		var _props2$amount = _props2.amount;
		var amount = _props2$amount === undefined ? AMOUNT : _props2$amount;
		var _props2$width = _props2.width;
		var width = _props2$width === undefined ? WIDTH : _props2$width;
		var _props2$height = _props2.height;
		var height = _props2$height === undefined ? HEIGHT : _props2$height;


		var particles = (0, _particle.generateParticles)(profile, amount, { width: width, height: height });

		this.animate(particles);
	},
	render: function render() {
		var _this = this;

		var _props3 = this.props;
		var _props3$width = _props3.width;
		var width = _props3$width === undefined ? WIDTH : _props3$width;
		var _props3$height = _props3.height;
		var height = _props3$height === undefined ? HEIGHT : _props3$height;
		var _props3$styles = _props3.styles;
		var styles = _props3$styles === undefined ? STYLES : _props3$styles;


		return _react2.default.createElement(
			'canvas',
			{
				id: 'react-snowfetti',
				width: width,
				height: height,
				style: styles,
				ref: function ref(canvas) {
					if (canvas) {
						_this.ctx = canvas.getContext('2d');
					}
				}
			},
			_react2.default.createElement(
				'h3',
				null,
				'Oh no! You do not have support for the html5 canvas API!'
			)
		);
	}
});
//# sourceMappingURL=Canvas.js.map
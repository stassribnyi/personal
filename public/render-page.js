/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/***/ ((module) => {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@linaria/server/esm/collect.js":
/*!*****************************************************!*\
  !*** ./node_modules/@linaria/server/esm/collect.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ collect)
/* harmony export */ });
/* harmony import */ var postcss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! postcss */ "./node_modules/@linaria/server/node_modules/postcss/lib/postcss.js");
/* harmony import */ var postcss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(postcss__WEBPACK_IMPORTED_MODULE_0__);
/**
 * This utility extracts critical CSS from given HTML and CSS file to be used in SSR environments
 */

function collect(html, css) {
  const animations = new Set();
  const other = postcss__WEBPACK_IMPORTED_MODULE_0___default().root();
  const critical = postcss__WEBPACK_IMPORTED_MODULE_0___default().root();
  const stylesheet = postcss__WEBPACK_IMPORTED_MODULE_0___default().parse(css);
  const htmlClassesRegExp = extractClassesFromHtml(html);

  const isCritical = rule => {
    // Only check class names selectors
    if ('selector' in rule && rule.selector.startsWith('.')) {
      return Boolean(rule.selector.match(htmlClassesRegExp));
    }

    return true;
  };

  const handleAtRule = rule => {
    let addedToCritical = false;
    rule.each(childRule => {
      if (isCritical(childRule) && !addedToCritical) {
        critical.append(rule.clone());
        addedToCritical = true;
      }
    });

    if (rule.name === 'keyframes') {
      return;
    }

    if (addedToCritical) {
      rule.remove();
    } else {
      other.append(rule);
    }
  };

  stylesheet.walkAtRules('font-face', rule => {
    /**
     * @font-face rules may be defined also in CSS conditional groups (eg. @media)
     * we want only handle those from top-level, rest will be handled in stylesheet.walkRules
     */
    if (rule.parent.type === 'root') {
      critical.append(rule);
    }
  });
  const walkedAtRules = new Set();
  stylesheet.walkRules(rule => {
    if ('name' in rule.parent && rule.parent.name === 'keyframes') {
      return;
    }

    if (rule.parent.type === 'atrule') {
      if (!walkedAtRules.has(rule.parent)) {
        handleAtRule(rule.parent);
        walkedAtRules.add(rule.parent);
      }

      return;
    }

    if (isCritical(rule)) {
      critical.append(rule);
    } else {
      other.append(rule);
    }
  });
  critical.walkDecls(/animation/, decl => {
    animations.add(decl.value.split(' ')[0]);
  });
  stylesheet.walkAtRules('keyframes', rule => {
    if (animations.has(rule.params)) {
      critical.append(rule);
    }
  });
  return {
    critical: critical.toString(),
    other: other.toString()
  };
}

const extractClassesFromHtml = html => {
  const htmlClasses = [];
  const regex = /\s+class="([^"]*)"/gm;
  let match = regex.exec(html);

  while (match !== null) {
    match[1].split(' ').forEach(className => {
      className = className.replace(/\\|\^|\$|\{|\}|\[|\]|\(|\)|\.|\*|\+|\?|\|/g, '\\$&');
      htmlClasses.push(className);
    });
    match = regex.exec(html);
  }

  return new RegExp(htmlClasses.join('|'), 'gm');
};
//# sourceMappingURL=collect.js.map

/***/ }),

/***/ "./node_modules/@linaria/server/esm/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@linaria/server/esm/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "collect": () => (/* reexport safe */ _collect__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _collect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collect */ "./node_modules/@linaria/server/esm/collect.js");

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/ansi-styles/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/ansi-styles/index.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);

const colorConvert = __webpack_require__(/*! color-convert */ "./node_modules/@linaria/server/node_modules/color-convert/index.js");

const wrapAnsi16 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => function () {
	const rgb = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

function assembleStyles() {
	const codes = new Map();
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39],

			// Bright color
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Fix humans
	styles.color.grey = styles.color.gray;

	for (const groupName of Object.keys(styles)) {
		const group = styles[groupName];

		for (const styleName of Object.keys(group)) {
			const style = group[styleName];

			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});

		Object.defineProperty(styles, 'codes', {
			value: codes,
			enumerable: false
		});
	}

	const ansi2ansi = n => n;
	const rgb2rgb = (r, g, b) => [r, g, b];

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	styles.color.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 0)
	};
	styles.color.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 0)
	};
	styles.color.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 0)
	};

	styles.bgColor.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 10)
	};
	styles.bgColor.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 10)
	};
	styles.bgColor.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 10)
	};

	for (let key of Object.keys(colorConvert)) {
		if (typeof colorConvert[key] !== 'object') {
			continue;
		}

		const suite = colorConvert[key];

		if (key === 'ansi16') {
			key = 'ansi';
		}

		if ('ansi16' in suite) {
			styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0);
			styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10);
		}

		if ('ansi256' in suite) {
			styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0);
			styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10);
		}

		if ('rgb' in suite) {
			styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0);
			styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10);
		}
	}

	return styles;
}

// Make the export immutable
Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/chalk/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/chalk/index.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const escapeStringRegexp = __webpack_require__(/*! escape-string-regexp */ "./node_modules/escape-string-regexp/index.js");
const ansiStyles = __webpack_require__(/*! ansi-styles */ "./node_modules/@linaria/server/node_modules/ansi-styles/index.js");
const stdoutColor = __webpack_require__(/*! supports-color */ "./node_modules/@linaria/server/node_modules/chalk/node_modules/supports-color/index.js").stdout;

const template = __webpack_require__(/*! ./templates.js */ "./node_modules/@linaria/server/node_modules/chalk/templates.js");

const isSimpleWindowsTerm = process.platform === 'win32' && !(({}).TERM || '').toLowerCase().startsWith('xterm');

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m'];

// `color-convert` models to exclude from the Chalk API due to conflicts and such
const skipModels = new Set(['gray']);

const styles = Object.create(null);

function applyOptions(obj, options) {
	options = options || {};

	// Detect level if not set manually
	const scLevel = stdoutColor ? stdoutColor.level : 0;
	obj.level = options.level === undefined ? scLevel : options.level;
	obj.enabled = 'enabled' in options ? options.enabled : obj.level > 0;
}

function Chalk(options) {
	// We check for this.template here since calling `chalk.constructor()`
	// by itself will have a `this` of a previously constructed chalk object
	if (!this || !(this instanceof Chalk) || this.template) {
		const chalk = {};
		applyOptions(chalk, options);

		chalk.template = function () {
			const args = [].slice.call(arguments);
			return chalkTag.apply(null, [chalk.template].concat(args));
		};

		Object.setPrototypeOf(chalk, Chalk.prototype);
		Object.setPrototypeOf(chalk.template, chalk);

		chalk.template.constructor = Chalk;

		return chalk.template;
	}

	applyOptions(this, options);
}

// Use bright blue on Windows as the normal blue color is illegible
if (isSimpleWindowsTerm) {
	ansiStyles.blue.open = '\u001B[94m';
}

for (const key of Object.keys(ansiStyles)) {
	ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

	styles[key] = {
		get() {
			const codes = ansiStyles[key];
			return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key);
		}
	};
}

styles.visible = {
	get() {
		return build.call(this, this._styles || [], true, 'visible');
	}
};

ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), 'g');
for (const model of Object.keys(ansiStyles.color.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	styles[model] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.color[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.color.close,
					closeRe: ansiStyles.color.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), 'g');
for (const model of Object.keys(ansiStyles.bgColor.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.bgColor[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.bgColor.close,
					closeRe: ansiStyles.bgColor.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, styles);

function build(_styles, _empty, key) {
	const builder = function () {
		return applyStyle.apply(builder, arguments);
	};

	builder._styles = _styles;
	builder._empty = _empty;

	const self = this;

	Object.defineProperty(builder, 'level', {
		enumerable: true,
		get() {
			return self.level;
		},
		set(level) {
			self.level = level;
		}
	});

	Object.defineProperty(builder, 'enabled', {
		enumerable: true,
		get() {
			return self.enabled;
		},
		set(enabled) {
			self.enabled = enabled;
		}
	});

	// See below for fix regarding invisible grey/dim combination on Windows
	builder.hasGrey = this.hasGrey || key === 'gray' || key === 'grey';

	// `__proto__` is used because we must return a function, but there is
	// no way to create a function with a different prototype
	builder.__proto__ = proto; // eslint-disable-line no-proto

	return builder;
}

function applyStyle() {
	// Support varags, but simply cast to string in case there's only one arg
	const args = arguments;
	const argsLen = args.length;
	let str = String(arguments[0]);

	if (argsLen === 0) {
		return '';
	}

	if (argsLen > 1) {
		// Don't slice `arguments`, it prevents V8 optimizations
		for (let a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}

	if (!this.enabled || this.level <= 0 || !str) {
		return this._empty ? '' : str;
	}

	// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
	// see https://github.com/chalk/chalk/issues/58
	// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
	const originalDim = ansiStyles.dim.open;
	if (isSimpleWindowsTerm && this.hasGrey) {
		ansiStyles.dim.open = '';
	}

	for (const code of this._styles.slice().reverse()) {
		// Replace any instances already present with a re-opening code
		// otherwise only the part of the string until said closing code
		// will be colored, and the rest will simply be 'plain'.
		str = code.open + str.replace(code.closeRe, code.open) + code.close;

		// Close the styling before a linebreak and reopen
		// after next line to fix a bleed issue on macOS
		// https://github.com/chalk/chalk/pull/92
		str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
	}

	// Reset the original `dim` if we changed it to work around the Windows dimmed gray issue
	ansiStyles.dim.open = originalDim;

	return str;
}

function chalkTag(chalk, strings) {
	if (!Array.isArray(strings)) {
		// If chalk() was called by itself or with a string,
		// return the string itself as a string.
		return [].slice.call(arguments, 1).join(' ');
	}

	const args = [].slice.call(arguments, 2);
	const parts = [strings.raw[0]];

	for (let i = 1; i < strings.length; i++) {
		parts.push(String(args[i - 1]).replace(/[{}\\]/g, '\\$&'));
		parts.push(String(strings.raw[i]));
	}

	return template(chalk, parts.join(''));
}

Object.defineProperties(Chalk.prototype, styles);

module.exports = Chalk(); // eslint-disable-line new-cap
module.exports.supportsColor = stdoutColor;
module.exports.default = module.exports; // For TypeScript


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/chalk/node_modules/supports-color/index.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/chalk/node_modules/supports-color/index.js ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const os = __webpack_require__(/*! os */ "os");
const hasFlag = __webpack_require__(/*! has-flag */ "./node_modules/has-flag/index.js");

const env = ({});

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false')) {
	forceColor = false;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = true;
}
if ('FORCE_COLOR' in env) {
	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === false) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor !== true) {
		return 0;
	}

	const min = forceColor ? 1 : 0;

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return min;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/chalk/templates.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/chalk/templates.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";

const TEMPLATE_REGEX = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;

const ESCAPES = new Map([
	['n', '\n'],
	['r', '\r'],
	['t', '\t'],
	['b', '\b'],
	['f', '\f'],
	['v', '\v'],
	['0', '\0'],
	['\\', '\\'],
	['e', '\u001B'],
	['a', '\u0007']
]);

function unescape(c) {
	if ((c[0] === 'u' && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
		return String.fromCharCode(parseInt(c.slice(1), 16));
	}

	return ESCAPES.get(c) || c;
}

function parseArguments(name, args) {
	const results = [];
	const chunks = args.trim().split(/\s*,\s*/g);
	let matches;

	for (const chunk of chunks) {
		if (!isNaN(chunk)) {
			results.push(Number(chunk));
		} else if ((matches = chunk.match(STRING_REGEX))) {
			results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, chr) => escape ? unescape(escape) : chr));
		} else {
			throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
		}
	}

	return results;
}

function parseStyle(style) {
	STYLE_REGEX.lastIndex = 0;

	const results = [];
	let matches;

	while ((matches = STYLE_REGEX.exec(style)) !== null) {
		const name = matches[1];

		if (matches[2]) {
			const args = parseArguments(name, matches[2]);
			results.push([name].concat(args));
		} else {
			results.push([name]);
		}
	}

	return results;
}

function buildStyle(chalk, styles) {
	const enabled = {};

	for (const layer of styles) {
		for (const style of layer.styles) {
			enabled[style[0]] = layer.inverse ? null : style.slice(1);
		}
	}

	let current = chalk;
	for (const styleName of Object.keys(enabled)) {
		if (Array.isArray(enabled[styleName])) {
			if (!(styleName in current)) {
				throw new Error(`Unknown Chalk style: ${styleName}`);
			}

			if (enabled[styleName].length > 0) {
				current = current[styleName].apply(current, enabled[styleName]);
			} else {
				current = current[styleName];
			}
		}
	}

	return current;
}

module.exports = (chalk, tmp) => {
	const styles = [];
	const chunks = [];
	let chunk = [];

	// eslint-disable-next-line max-params
	tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse, style, close, chr) => {
		if (escapeChar) {
			chunk.push(unescape(escapeChar));
		} else if (style) {
			const str = chunk.join('');
			chunk = [];
			chunks.push(styles.length === 0 ? str : buildStyle(chalk, styles)(str));
			styles.push({inverse, styles: parseStyle(style)});
		} else if (close) {
			if (styles.length === 0) {
				throw new Error('Found extraneous } in Chalk template literal');
			}

			chunks.push(buildStyle(chalk, styles)(chunk.join('')));
			chunk = [];
			styles.pop();
		} else {
			chunk.push(chr);
		}
	});

	chunks.push(chunk.join(''));

	if (styles.length > 0) {
		const errMsg = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
		throw new Error(errMsg);
	}

	return chunks.join('');
};


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/color-convert/conversions.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/color-convert/conversions.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* MIT license */
var cssKeywords = __webpack_require__(/*! color-name */ "./node_modules/@linaria/server/node_modules/color-name/index.js");

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/color-convert/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/color-convert/index.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var conversions = __webpack_require__(/*! ./conversions */ "./node_modules/@linaria/server/node_modules/color-convert/conversions.js");
var route = __webpack_require__(/*! ./route */ "./node_modules/@linaria/server/node_modules/color-convert/route.js");

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/color-convert/route.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/color-convert/route.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var conversions = __webpack_require__(/*! ./conversions */ "./node_modules/@linaria/server/node_modules/color-convert/conversions.js");

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/color-name/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/color-name/index.js ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/at-rule.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/at-rule.js ***!
  \**************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _container = _interopRequireDefault(__webpack_require__(/*! ./container */ "./node_modules/@linaria/server/node_modules/postcss/lib/container.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Represents an at-rule.
 *
 * If it’s followed in the CSS by a {} block, this node will have
 * a nodes property representing its children.
 *
 * @extends Container
 *
 * @example
 * const root = postcss.parse('@charset "UTF-8"; @media print {}')
 *
 * const charset = root.first
 * charset.type  //=> 'atrule'
 * charset.nodes //=> undefined
 *
 * const media = root.last
 * media.nodes   //=> []
 */
var AtRule = /*#__PURE__*/function (_Container) {
  _inheritsLoose(AtRule, _Container);

  function AtRule(defaults) {
    var _this;

    _this = _Container.call(this, defaults) || this;
    _this.type = 'atrule';
    return _this;
  }

  var _proto = AtRule.prototype;

  _proto.append = function append() {
    var _Container$prototype$;

    if (!this.nodes) this.nodes = [];

    for (var _len = arguments.length, children = new Array(_len), _key = 0; _key < _len; _key++) {
      children[_key] = arguments[_key];
    }

    return (_Container$prototype$ = _Container.prototype.append).call.apply(_Container$prototype$, [this].concat(children));
  };

  _proto.prepend = function prepend() {
    var _Container$prototype$2;

    if (!this.nodes) this.nodes = [];

    for (var _len2 = arguments.length, children = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      children[_key2] = arguments[_key2];
    }

    return (_Container$prototype$2 = _Container.prototype.prepend).call.apply(_Container$prototype$2, [this].concat(children));
  }
  /**
   * @memberof AtRule#
   * @member {string} name The at-rule’s name immediately follows the `@`.
   *
   * @example
   * const root  = postcss.parse('@media print {}')
   * media.name //=> 'media'
   * const media = root.first
   */

  /**
   * @memberof AtRule#
   * @member {string} params The at-rule’s parameters, the values
   *                         that follow the at-rule’s name but precede
   *                         any {} block.
   *
   * @example
   * const root  = postcss.parse('@media print, screen {}')
   * const media = root.first
   * media.params //=> 'print, screen'
   */

  /**
   * @memberof AtRule#
   * @member {object} raws Information to generate byte-to-byte equal
   *                        node string as it was in the origin input.
   *
   * Every parser saves its own properties,
   * but the default CSS parser uses:
   *
   * * `before`: the space symbols before the node. It also stores `*`
   *   and `_` symbols before the declaration (IE hack).
   * * `after`: the space symbols after the last child of the node
   *   to the end of the node.
   * * `between`: the symbols between the property and value
   *   for declarations, selector and `{` for rules, or last parameter
   *   and `{` for at-rules.
   * * `semicolon`: contains true if the last child has
   *   an (optional) semicolon.
   * * `afterName`: the space between the at-rule name and its parameters.
   *
   * PostCSS cleans at-rule parameters from comments and extra spaces,
   * but it stores origin content in raws properties.
   * As such, if you don’t change a declaration’s value,
   * PostCSS will use the raw value with comments.
   *
   * @example
   * const root = postcss.parse('  @media\nprint {\n}')
   * root.first.first.raws //=> { before: '  ',
   *                       //     between: ' ',
   *                       //     afterName: '\n',
   *                       //     after: '\n' }
   */
  ;

  return AtRule;
}(_container.default);

var _default = AtRule;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0LXJ1bGUuZXM2Il0sIm5hbWVzIjpbIkF0UnVsZSIsImRlZmF1bHRzIiwidHlwZSIsImFwcGVuZCIsIm5vZGVzIiwiY2hpbGRyZW4iLCJwcmVwZW5kIiwiQ29udGFpbmVyIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBa0JNQSxNOzs7QUFDSixrQkFBYUMsUUFBYixFQUF1QjtBQUFBOztBQUNyQixrQ0FBTUEsUUFBTjtBQUNBLFVBQUtDLElBQUwsR0FBWSxRQUFaO0FBRnFCO0FBR3RCOzs7O1NBRURDLE0sR0FBQSxrQkFBcUI7QUFBQTs7QUFDbkIsUUFBSSxDQUFDLEtBQUtDLEtBQVYsRUFBaUIsS0FBS0EsS0FBTCxHQUFhLEVBQWI7O0FBREUsc0NBQVZDLFFBQVU7QUFBVkEsTUFBQUEsUUFBVTtBQUFBOztBQUVuQix5REFBYUYsTUFBYixrREFBdUJFLFFBQXZCO0FBQ0QsRzs7U0FFREMsTyxHQUFBLG1CQUFzQjtBQUFBOztBQUNwQixRQUFJLENBQUMsS0FBS0YsS0FBVixFQUFpQixLQUFLQSxLQUFMLEdBQWEsRUFBYjs7QUFERyx1Q0FBVkMsUUFBVTtBQUFWQSxNQUFBQSxRQUFVO0FBQUE7O0FBRXBCLDBEQUFhQyxPQUFiLG1EQUF3QkQsUUFBeEI7QUFDRDtBQUVEOzs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7OztBQVlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBdENtQkUsa0I7O2VBdUVOUCxNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcidcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGF0LXJ1bGUuXG4gKlxuICogSWYgaXTigJlzIGZvbGxvd2VkIGluIHRoZSBDU1MgYnkgYSB7fSBibG9jaywgdGhpcyBub2RlIHdpbGwgaGF2ZVxuICogYSBub2RlcyBwcm9wZXJ0eSByZXByZXNlbnRpbmcgaXRzIGNoaWxkcmVuLlxuICpcbiAqIEBleHRlbmRzIENvbnRhaW5lclxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnQGNoYXJzZXQgXCJVVEYtOFwiOyBAbWVkaWEgcHJpbnQge30nKVxuICpcbiAqIGNvbnN0IGNoYXJzZXQgPSByb290LmZpcnN0XG4gKiBjaGFyc2V0LnR5cGUgIC8vPT4gJ2F0cnVsZSdcbiAqIGNoYXJzZXQubm9kZXMgLy89PiB1bmRlZmluZWRcbiAqXG4gKiBjb25zdCBtZWRpYSA9IHJvb3QubGFzdFxuICogbWVkaWEubm9kZXMgICAvLz0+IFtdXG4gKi9cbmNsYXNzIEF0UnVsZSBleHRlbmRzIENvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yIChkZWZhdWx0cykge1xuICAgIHN1cGVyKGRlZmF1bHRzKVxuICAgIHRoaXMudHlwZSA9ICdhdHJ1bGUnXG4gIH1cblxuICBhcHBlbmQgKC4uLmNoaWxkcmVuKSB7XG4gICAgaWYgKCF0aGlzLm5vZGVzKSB0aGlzLm5vZGVzID0gW11cbiAgICByZXR1cm4gc3VwZXIuYXBwZW5kKC4uLmNoaWxkcmVuKVxuICB9XG5cbiAgcHJlcGVuZCAoLi4uY2hpbGRyZW4pIHtcbiAgICBpZiAoIXRoaXMubm9kZXMpIHRoaXMubm9kZXMgPSBbXVxuICAgIHJldHVybiBzdXBlci5wcmVwZW5kKC4uLmNoaWxkcmVuKVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBBdFJ1bGUjXG4gICAqIEBtZW1iZXIge3N0cmluZ30gbmFtZSBUaGUgYXQtcnVsZeKAmXMgbmFtZSBpbW1lZGlhdGVseSBmb2xsb3dzIHRoZSBgQGAuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJvb3QgID0gcG9zdGNzcy5wYXJzZSgnQG1lZGlhIHByaW50IHt9JylcbiAgICogbWVkaWEubmFtZSAvLz0+ICdtZWRpYSdcbiAgICogY29uc3QgbWVkaWEgPSByb290LmZpcnN0XG4gICAqL1xuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgQXRSdWxlI1xuICAgKiBAbWVtYmVyIHtzdHJpbmd9IHBhcmFtcyBUaGUgYXQtcnVsZeKAmXMgcGFyYW1ldGVycywgdGhlIHZhbHVlc1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0IGZvbGxvdyB0aGUgYXQtcnVsZeKAmXMgbmFtZSBidXQgcHJlY2VkZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICBhbnkge30gYmxvY2suXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJvb3QgID0gcG9zdGNzcy5wYXJzZSgnQG1lZGlhIHByaW50LCBzY3JlZW4ge30nKVxuICAgKiBjb25zdCBtZWRpYSA9IHJvb3QuZmlyc3RcbiAgICogbWVkaWEucGFyYW1zIC8vPT4gJ3ByaW50LCBzY3JlZW4nXG4gICAqL1xuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgQXRSdWxlI1xuICAgKiBAbWVtYmVyIHtvYmplY3R9IHJhd3MgSW5mb3JtYXRpb24gdG8gZ2VuZXJhdGUgYnl0ZS10by1ieXRlIGVxdWFsXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSBzdHJpbmcgYXMgaXQgd2FzIGluIHRoZSBvcmlnaW4gaW5wdXQuXG4gICAqXG4gICAqIEV2ZXJ5IHBhcnNlciBzYXZlcyBpdHMgb3duIHByb3BlcnRpZXMsXG4gICAqIGJ1dCB0aGUgZGVmYXVsdCBDU1MgcGFyc2VyIHVzZXM6XG4gICAqXG4gICAqICogYGJlZm9yZWA6IHRoZSBzcGFjZSBzeW1ib2xzIGJlZm9yZSB0aGUgbm9kZS4gSXQgYWxzbyBzdG9yZXMgYCpgXG4gICAqICAgYW5kIGBfYCBzeW1ib2xzIGJlZm9yZSB0aGUgZGVjbGFyYXRpb24gKElFIGhhY2spLlxuICAgKiAqIGBhZnRlcmA6IHRoZSBzcGFjZSBzeW1ib2xzIGFmdGVyIHRoZSBsYXN0IGNoaWxkIG9mIHRoZSBub2RlXG4gICAqICAgdG8gdGhlIGVuZCBvZiB0aGUgbm9kZS5cbiAgICogKiBgYmV0d2VlbmA6IHRoZSBzeW1ib2xzIGJldHdlZW4gdGhlIHByb3BlcnR5IGFuZCB2YWx1ZVxuICAgKiAgIGZvciBkZWNsYXJhdGlvbnMsIHNlbGVjdG9yIGFuZCBge2AgZm9yIHJ1bGVzLCBvciBsYXN0IHBhcmFtZXRlclxuICAgKiAgIGFuZCBge2AgZm9yIGF0LXJ1bGVzLlxuICAgKiAqIGBzZW1pY29sb25gOiBjb250YWlucyB0cnVlIGlmIHRoZSBsYXN0IGNoaWxkIGhhc1xuICAgKiAgIGFuIChvcHRpb25hbCkgc2VtaWNvbG9uLlxuICAgKiAqIGBhZnRlck5hbWVgOiB0aGUgc3BhY2UgYmV0d2VlbiB0aGUgYXQtcnVsZSBuYW1lIGFuZCBpdHMgcGFyYW1ldGVycy5cbiAgICpcbiAgICogUG9zdENTUyBjbGVhbnMgYXQtcnVsZSBwYXJhbWV0ZXJzIGZyb20gY29tbWVudHMgYW5kIGV4dHJhIHNwYWNlcyxcbiAgICogYnV0IGl0IHN0b3JlcyBvcmlnaW4gY29udGVudCBpbiByYXdzIHByb3BlcnRpZXMuXG4gICAqIEFzIHN1Y2gsIGlmIHlvdSBkb27igJl0IGNoYW5nZSBhIGRlY2xhcmF0aW9u4oCZcyB2YWx1ZSxcbiAgICogUG9zdENTUyB3aWxsIHVzZSB0aGUgcmF3IHZhbHVlIHdpdGggY29tbWVudHMuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKCcgIEBtZWRpYVxcbnByaW50IHtcXG59JylcbiAgICogcm9vdC5maXJzdC5maXJzdC5yYXdzIC8vPT4geyBiZWZvcmU6ICcgICcsXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgYmV0d2VlbjogJyAnLFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGFmdGVyTmFtZTogJ1xcbicsXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgYWZ0ZXI6ICdcXG4nIH1cbiAgICovXG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0UnVsZVxuIl0sImZpbGUiOiJhdC1ydWxlLmpzIn0=


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/comment.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/comment.js ***!
  \**************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _node = _interopRequireDefault(__webpack_require__(/*! ./node */ "./node_modules/@linaria/server/node_modules/postcss/lib/node.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Represents a comment between declarations or statements (rule and at-rules).
 *
 * Comments inside selectors, at-rule parameters, or declaration values
 * will be stored in the `raws` properties explained above.
 *
 * @extends Node
 */
var Comment = /*#__PURE__*/function (_Node) {
  _inheritsLoose(Comment, _Node);

  function Comment(defaults) {
    var _this;

    _this = _Node.call(this, defaults) || this;
    _this.type = 'comment';
    return _this;
  }
  /**
   * @memberof Comment#
   * @member {string} text The comment’s text.
   */

  /**
   * @memberof Comment#
   * @member {object} raws Information to generate byte-to-byte equal
   *                       node string as it was in the origin input.
   *
   * Every parser saves its own properties,
   * but the default CSS parser uses:
   *
   * * `before`: the space symbols before the node.
   * * `left`: the space symbols between `/*` and the comment’s text.
   * * `right`: the space symbols between the comment’s text.
   */


  return Comment;
}(_node.default);

var _default = Comment;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1lbnQuZXM2Il0sIm5hbWVzIjpbIkNvbW1lbnQiLCJkZWZhdWx0cyIsInR5cGUiLCJOb2RlIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7Ozs7QUFFQTs7Ozs7Ozs7SUFRTUEsTzs7O0FBQ0osbUJBQWFDLFFBQWIsRUFBdUI7QUFBQTs7QUFDckIsNkJBQU1BLFFBQU47QUFDQSxVQUFLQyxJQUFMLEdBQVksU0FBWjtBQUZxQjtBQUd0QjtBQUVEOzs7OztBQUtBOzs7Ozs7Ozs7Ozs7Ozs7RUFYb0JDLGE7O2VBeUJQSCxPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5vZGUgZnJvbSAnLi9ub2RlJ1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb21tZW50IGJldHdlZW4gZGVjbGFyYXRpb25zIG9yIHN0YXRlbWVudHMgKHJ1bGUgYW5kIGF0LXJ1bGVzKS5cbiAqXG4gKiBDb21tZW50cyBpbnNpZGUgc2VsZWN0b3JzLCBhdC1ydWxlIHBhcmFtZXRlcnMsIG9yIGRlY2xhcmF0aW9uIHZhbHVlc1xuICogd2lsbCBiZSBzdG9yZWQgaW4gdGhlIGByYXdzYCBwcm9wZXJ0aWVzIGV4cGxhaW5lZCBhYm92ZS5cbiAqXG4gKiBAZXh0ZW5kcyBOb2RlXG4gKi9cbmNsYXNzIENvbW1lbnQgZXh0ZW5kcyBOb2RlIHtcbiAgY29uc3RydWN0b3IgKGRlZmF1bHRzKSB7XG4gICAgc3VwZXIoZGVmYXVsdHMpXG4gICAgdGhpcy50eXBlID0gJ2NvbW1lbnQnXG4gIH1cblxuICAvKipcbiAgICogQG1lbWJlcm9mIENvbW1lbnQjXG4gICAqIEBtZW1iZXIge3N0cmluZ30gdGV4dCBUaGUgY29tbWVudOKAmXMgdGV4dC5cbiAgICovXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBDb21tZW50I1xuICAgKiBAbWVtYmVyIHtvYmplY3R9IHJhd3MgSW5mb3JtYXRpb24gdG8gZ2VuZXJhdGUgYnl0ZS10by1ieXRlIGVxdWFsXG4gICAqICAgICAgICAgICAgICAgICAgICAgICBub2RlIHN0cmluZyBhcyBpdCB3YXMgaW4gdGhlIG9yaWdpbiBpbnB1dC5cbiAgICpcbiAgICogRXZlcnkgcGFyc2VyIHNhdmVzIGl0cyBvd24gcHJvcGVydGllcyxcbiAgICogYnV0IHRoZSBkZWZhdWx0IENTUyBwYXJzZXIgdXNlczpcbiAgICpcbiAgICogKiBgYmVmb3JlYDogdGhlIHNwYWNlIHN5bWJvbHMgYmVmb3JlIHRoZSBub2RlLlxuICAgKiAqIGBsZWZ0YDogdGhlIHNwYWNlIHN5bWJvbHMgYmV0d2VlbiBgLypgIGFuZCB0aGUgY29tbWVudOKAmXMgdGV4dC5cbiAgICogKiBgcmlnaHRgOiB0aGUgc3BhY2Ugc3ltYm9scyBiZXR3ZWVuIHRoZSBjb21tZW504oCZcyB0ZXh0LlxuICAgKi9cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tbWVudFxuIl0sImZpbGUiOiJjb21tZW50LmpzIn0=


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/container.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/container.js ***!
  \****************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _declaration = _interopRequireDefault(__webpack_require__(/*! ./declaration */ "./node_modules/@linaria/server/node_modules/postcss/lib/declaration.js"));

var _comment = _interopRequireDefault(__webpack_require__(/*! ./comment */ "./node_modules/@linaria/server/node_modules/postcss/lib/comment.js"));

var _node = _interopRequireDefault(__webpack_require__(/*! ./node */ "./node_modules/@linaria/server/node_modules/postcss/lib/node.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function cleanSource(nodes) {
  return nodes.map(function (i) {
    if (i.nodes) i.nodes = cleanSource(i.nodes);
    delete i.source;
    return i;
  });
}
/**
 * The {@link Root}, {@link AtRule}, and {@link Rule} container nodes
 * inherit some common methods to help work with their children.
 *
 * Note that all containers can store any content. If you write a rule inside
 * a rule, PostCSS will parse it.
 *
 * @extends Node
 * @abstract
 */


var Container = /*#__PURE__*/function (_Node) {
  _inheritsLoose(Container, _Node);

  function Container() {
    return _Node.apply(this, arguments) || this;
  }

  var _proto = Container.prototype;

  _proto.push = function push(child) {
    child.parent = this;
    this.nodes.push(child);
    return this;
  }
  /**
   * Iterates through the container’s immediate children,
   * calling `callback` for each child.
   *
   * Returning `false` in the callback will break iteration.
   *
   * This method only iterates through the container’s immediate children.
   * If you need to recursively iterate through all the container’s descendant
   * nodes, use {@link Container#walk}.
   *
   * Unlike the for `{}`-cycle or `Array#forEach` this iterator is safe
   * if you are mutating the array of child nodes during iteration.
   * PostCSS will adjust the current index to match the mutations.
   *
   * @param {childIterator} callback Iterator receives each node and index.
   *
   * @return {false|undefined} Returns `false` if iteration was broke.
   *
   * @example
   * const root = postcss.parse('a { color: black; z-index: 1 }')
   * const rule = root.first
   *
   * for (const decl of rule.nodes) {
   *   decl.cloneBefore({ prop: '-webkit-' + decl.prop })
   *   // Cycle will be infinite, because cloneBefore moves the current node
   *   // to the next index
   * }
   *
   * rule.each(decl => {
   *   decl.cloneBefore({ prop: '-webkit-' + decl.prop })
   *   // Will be executed only for color and z-index
   * })
   */
  ;

  _proto.each = function each(callback) {
    if (!this.lastEach) this.lastEach = 0;
    if (!this.indexes) this.indexes = {};
    this.lastEach += 1;
    var id = this.lastEach;
    this.indexes[id] = 0;
    if (!this.nodes) return undefined;
    var index, result;

    while (this.indexes[id] < this.nodes.length) {
      index = this.indexes[id];
      result = callback(this.nodes[index], index);
      if (result === false) break;
      this.indexes[id] += 1;
    }

    delete this.indexes[id];
    return result;
  }
  /**
   * Traverses the container’s descendant nodes, calling callback
   * for each node.
   *
   * Like container.each(), this method is safe to use
   * if you are mutating arrays during iteration.
   *
   * If you only need to iterate through the container’s immediate children,
   * use {@link Container#each}.
   *
   * @param {childIterator} callback Iterator receives each node and index.
   *
   * @return {false|undefined} Returns `false` if iteration was broke.
   *
   * @example
   * root.walk(node => {
   *   // Traverses all descendant nodes.
   * })
   */
  ;

  _proto.walk = function walk(callback) {
    return this.each(function (child, i) {
      var result;

      try {
        result = callback(child, i);
      } catch (e) {
        e.postcssNode = child;

        if (e.stack && child.source && /\n\s{4}at /.test(e.stack)) {
          var s = child.source;
          e.stack = e.stack.replace(/\n\s{4}at /, "$&" + s.input.from + ":" + s.start.line + ":" + s.start.column + "$&");
        }

        throw e;
      }

      if (result !== false && child.walk) {
        result = child.walk(callback);
      }

      return result;
    });
  }
  /**
   * Traverses the container’s descendant nodes, calling callback
   * for each declaration node.
   *
   * If you pass a filter, iteration will only happen over declarations
   * with matching properties.
   *
   * Like {@link Container#each}, this method is safe
   * to use if you are mutating arrays during iteration.
   *
   * @param {string|RegExp} [prop]   String or regular expression
   *                                 to filter declarations by property name.
   * @param {childIterator} callback Iterator receives each node and index.
   *
   * @return {false|undefined} Returns `false` if iteration was broke.
   *
   * @example
   * root.walkDecls(decl => {
   *   checkPropertySupport(decl.prop)
   * })
   *
   * root.walkDecls('border-radius', decl => {
   *   decl.remove()
   * })
   *
   * root.walkDecls(/^background/, decl => {
   *   decl.value = takeFirstColorFromGradient(decl.value)
   * })
   */
  ;

  _proto.walkDecls = function walkDecls(prop, callback) {
    if (!callback) {
      callback = prop;
      return this.walk(function (child, i) {
        if (child.type === 'decl') {
          return callback(child, i);
        }
      });
    }

    if (prop instanceof RegExp) {
      return this.walk(function (child, i) {
        if (child.type === 'decl' && prop.test(child.prop)) {
          return callback(child, i);
        }
      });
    }

    return this.walk(function (child, i) {
      if (child.type === 'decl' && child.prop === prop) {
        return callback(child, i);
      }
    });
  }
  /**
   * Traverses the container’s descendant nodes, calling callback
   * for each rule node.
   *
   * If you pass a filter, iteration will only happen over rules
   * with matching selectors.
   *
   * Like {@link Container#each}, this method is safe
   * to use if you are mutating arrays during iteration.
   *
   * @param {string|RegExp} [selector] String or regular expression
   *                                   to filter rules by selector.
   * @param {childIterator} callback   Iterator receives each node and index.
   *
   * @return {false|undefined} returns `false` if iteration was broke.
   *
   * @example
   * const selectors = []
   * root.walkRules(rule => {
   *   selectors.push(rule.selector)
   * })
   * console.log(`Your CSS uses ${ selectors.length } selectors`)
   */
  ;

  _proto.walkRules = function walkRules(selector, callback) {
    if (!callback) {
      callback = selector;
      return this.walk(function (child, i) {
        if (child.type === 'rule') {
          return callback(child, i);
        }
      });
    }

    if (selector instanceof RegExp) {
      return this.walk(function (child, i) {
        if (child.type === 'rule' && selector.test(child.selector)) {
          return callback(child, i);
        }
      });
    }

    return this.walk(function (child, i) {
      if (child.type === 'rule' && child.selector === selector) {
        return callback(child, i);
      }
    });
  }
  /**
   * Traverses the container’s descendant nodes, calling callback
   * for each at-rule node.
   *
   * If you pass a filter, iteration will only happen over at-rules
   * that have matching names.
   *
   * Like {@link Container#each}, this method is safe
   * to use if you are mutating arrays during iteration.
   *
   * @param {string|RegExp} [name]   String or regular expression
   *                                 to filter at-rules by name.
   * @param {childIterator} callback Iterator receives each node and index.
   *
   * @return {false|undefined} Returns `false` if iteration was broke.
   *
   * @example
   * root.walkAtRules(rule => {
   *   if (isOld(rule.name)) rule.remove()
   * })
   *
   * let first = false
   * root.walkAtRules('charset', rule => {
   *   if (!first) {
   *     first = true
   *   } else {
   *     rule.remove()
   *   }
   * })
   */
  ;

  _proto.walkAtRules = function walkAtRules(name, callback) {
    if (!callback) {
      callback = name;
      return this.walk(function (child, i) {
        if (child.type === 'atrule') {
          return callback(child, i);
        }
      });
    }

    if (name instanceof RegExp) {
      return this.walk(function (child, i) {
        if (child.type === 'atrule' && name.test(child.name)) {
          return callback(child, i);
        }
      });
    }

    return this.walk(function (child, i) {
      if (child.type === 'atrule' && child.name === name) {
        return callback(child, i);
      }
    });
  }
  /**
   * Traverses the container’s descendant nodes, calling callback
   * for each comment node.
   *
   * Like {@link Container#each}, this method is safe
   * to use if you are mutating arrays during iteration.
   *
   * @param {childIterator} callback Iterator receives each node and index.
   *
   * @return {false|undefined} Returns `false` if iteration was broke.
   *
   * @example
   * root.walkComments(comment => {
   *   comment.remove()
   * })
   */
  ;

  _proto.walkComments = function walkComments(callback) {
    return this.walk(function (child, i) {
      if (child.type === 'comment') {
        return callback(child, i);
      }
    });
  }
  /**
   * Inserts new nodes to the end of the container.
   *
   * @param {...(Node|object|string|Node[])} children New nodes.
   *
   * @return {Node} This node for methods chain.
   *
   * @example
   * const decl1 = postcss.decl({ prop: 'color', value: 'black' })
   * const decl2 = postcss.decl({ prop: 'background-color', value: 'white' })
   * rule.append(decl1, decl2)
   *
   * root.append({ name: 'charset', params: '"UTF-8"' })  // at-rule
   * root.append({ selector: 'a' })                       // rule
   * rule.append({ prop: 'color', value: 'black' })       // declaration
   * rule.append({ text: 'Comment' })                     // comment
   *
   * root.append('a {}')
   * root.first.append('color: black; z-index: 1')
   */
  ;

  _proto.append = function append() {
    for (var _len = arguments.length, children = new Array(_len), _key = 0; _key < _len; _key++) {
      children[_key] = arguments[_key];
    }

    for (var _i = 0, _children = children; _i < _children.length; _i++) {
      var child = _children[_i];
      var nodes = this.normalize(child, this.last);

      for (var _iterator = _createForOfIteratorHelperLoose(nodes), _step; !(_step = _iterator()).done;) {
        var node = _step.value;
        this.nodes.push(node);
      }
    }

    return this;
  }
  /**
   * Inserts new nodes to the start of the container.
   *
   * @param {...(Node|object|string|Node[])} children New nodes.
   *
   * @return {Node} This node for methods chain.
   *
   * @example
   * const decl1 = postcss.decl({ prop: 'color', value: 'black' })
   * const decl2 = postcss.decl({ prop: 'background-color', value: 'white' })
   * rule.prepend(decl1, decl2)
   *
   * root.append({ name: 'charset', params: '"UTF-8"' })  // at-rule
   * root.append({ selector: 'a' })                       // rule
   * rule.append({ prop: 'color', value: 'black' })       // declaration
   * rule.append({ text: 'Comment' })                     // comment
   *
   * root.append('a {}')
   * root.first.append('color: black; z-index: 1')
   */
  ;

  _proto.prepend = function prepend() {
    for (var _len2 = arguments.length, children = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      children[_key2] = arguments[_key2];
    }

    children = children.reverse();

    for (var _iterator2 = _createForOfIteratorHelperLoose(children), _step2; !(_step2 = _iterator2()).done;) {
      var child = _step2.value;
      var nodes = this.normalize(child, this.first, 'prepend').reverse();

      for (var _iterator3 = _createForOfIteratorHelperLoose(nodes), _step3; !(_step3 = _iterator3()).done;) {
        var node = _step3.value;
        this.nodes.unshift(node);
      }

      for (var id in this.indexes) {
        this.indexes[id] = this.indexes[id] + nodes.length;
      }
    }

    return this;
  };

  _proto.cleanRaws = function cleanRaws(keepBetween) {
    _Node.prototype.cleanRaws.call(this, keepBetween);

    if (this.nodes) {
      for (var _iterator4 = _createForOfIteratorHelperLoose(this.nodes), _step4; !(_step4 = _iterator4()).done;) {
        var node = _step4.value;
        node.cleanRaws(keepBetween);
      }
    }
  }
  /**
   * Insert new node before old node within the container.
   *
   * @param {Node|number} exist             Child or child’s index.
   * @param {Node|object|string|Node[]} add New node.
   *
   * @return {Node} This node for methods chain.
   *
   * @example
   * rule.insertBefore(decl, decl.clone({ prop: '-webkit-' + decl.prop }))
   */
  ;

  _proto.insertBefore = function insertBefore(exist, add) {
    exist = this.index(exist);
    var type = exist === 0 ? 'prepend' : false;
    var nodes = this.normalize(add, this.nodes[exist], type).reverse();

    for (var _iterator5 = _createForOfIteratorHelperLoose(nodes), _step5; !(_step5 = _iterator5()).done;) {
      var node = _step5.value;
      this.nodes.splice(exist, 0, node);
    }

    var index;

    for (var id in this.indexes) {
      index = this.indexes[id];

      if (exist <= index) {
        this.indexes[id] = index + nodes.length;
      }
    }

    return this;
  }
  /**
   * Insert new node after old node within the container.
   *
   * @param {Node|number} exist             Child or child’s index.
   * @param {Node|object|string|Node[]} add New node.
   *
   * @return {Node} This node for methods chain.
   */
  ;

  _proto.insertAfter = function insertAfter(exist, add) {
    exist = this.index(exist);
    var nodes = this.normalize(add, this.nodes[exist]).reverse();

    for (var _iterator6 = _createForOfIteratorHelperLoose(nodes), _step6; !(_step6 = _iterator6()).done;) {
      var node = _step6.value;
      this.nodes.splice(exist + 1, 0, node);
    }

    var index;

    for (var id in this.indexes) {
      index = this.indexes[id];

      if (exist < index) {
        this.indexes[id] = index + nodes.length;
      }
    }

    return this;
  }
  /**
   * Removes node from the container and cleans the parent properties
   * from the node and its children.
   *
   * @param {Node|number} child Child or child’s index.
   *
   * @return {Node} This node for methods chain
   *
   * @example
   * rule.nodes.length  //=> 5
   * rule.removeChild(decl)
   * rule.nodes.length  //=> 4
   * decl.parent        //=> undefined
   */
  ;

  _proto.removeChild = function removeChild(child) {
    child = this.index(child);
    this.nodes[child].parent = undefined;
    this.nodes.splice(child, 1);
    var index;

    for (var id in this.indexes) {
      index = this.indexes[id];

      if (index >= child) {
        this.indexes[id] = index - 1;
      }
    }

    return this;
  }
  /**
   * Removes all children from the container
   * and cleans their parent properties.
   *
   * @return {Node} This node for methods chain.
   *
   * @example
   * rule.removeAll()
   * rule.nodes.length //=> 0
   */
  ;

  _proto.removeAll = function removeAll() {
    for (var _iterator7 = _createForOfIteratorHelperLoose(this.nodes), _step7; !(_step7 = _iterator7()).done;) {
      var node = _step7.value;
      node.parent = undefined;
    }

    this.nodes = [];
    return this;
  }
  /**
   * Passes all declaration values within the container that match pattern
   * through callback, replacing those values with the returned result
   * of callback.
   *
   * This method is useful if you are using a custom unit or function
   * and need to iterate through all values.
   *
   * @param {string|RegExp} pattern      Replace pattern.
   * @param {object} opts                Options to speed up the search.
   * @param {string|string[]} opts.props An array of property names.
   * @param {string} opts.fast           String that’s used to narrow down
   *                                     values and speed up the regexp search.
   * @param {function|string} callback   String to replace pattern or callback
   *                                     that returns a new value. The callback
   *                                     will receive the same arguments
   *                                     as those passed to a function parameter
   *                                     of `String#replace`.
   *
   * @return {Node} This node for methods chain.
   *
   * @example
   * root.replaceValues(/\d+rem/, { fast: 'rem' }, string => {
   *   return 15 * parseInt(string) + 'px'
   * })
   */
  ;

  _proto.replaceValues = function replaceValues(pattern, opts, callback) {
    if (!callback) {
      callback = opts;
      opts = {};
    }

    this.walkDecls(function (decl) {
      if (opts.props && opts.props.indexOf(decl.prop) === -1) return;
      if (opts.fast && decl.value.indexOf(opts.fast) === -1) return;
      decl.value = decl.value.replace(pattern, callback);
    });
    return this;
  }
  /**
   * Returns `true` if callback returns `true`
   * for all of the container’s children.
   *
   * @param {childCondition} condition Iterator returns true or false.
   *
   * @return {boolean} Is every child pass condition.
   *
   * @example
   * const noPrefixes = rule.every(i => i.prop[0] !== '-')
   */
  ;

  _proto.every = function every(condition) {
    return this.nodes.every(condition);
  }
  /**
   * Returns `true` if callback returns `true` for (at least) one
   * of the container’s children.
   *
   * @param {childCondition} condition Iterator returns true or false.
   *
   * @return {boolean} Is some child pass condition.
   *
   * @example
   * const hasPrefix = rule.some(i => i.prop[0] === '-')
   */
  ;

  _proto.some = function some(condition) {
    return this.nodes.some(condition);
  }
  /**
   * Returns a `child`’s index within the {@link Container#nodes} array.
   *
   * @param {Node} child Child of the current container.
   *
   * @return {number} Child index.
   *
   * @example
   * rule.index( rule.nodes[2] ) //=> 2
   */
  ;

  _proto.index = function index(child) {
    if (typeof child === 'number') {
      return child;
    }

    return this.nodes.indexOf(child);
  }
  /**
   * The container’s first child.
   *
   * @type {Node}
   *
   * @example
   * rule.first === rules.nodes[0]
   */
  ;

  _proto.normalize = function normalize(nodes, sample) {
    var _this = this;

    if (typeof nodes === 'string') {
      var parse = __webpack_require__(/*! ./parse */ "./node_modules/@linaria/server/node_modules/postcss/lib/parse.js");

      nodes = cleanSource(parse(nodes).nodes);
    } else if (Array.isArray(nodes)) {
      nodes = nodes.slice(0);

      for (var _iterator8 = _createForOfIteratorHelperLoose(nodes), _step8; !(_step8 = _iterator8()).done;) {
        var i = _step8.value;
        if (i.parent) i.parent.removeChild(i, 'ignore');
      }
    } else if (nodes.type === 'root') {
      nodes = nodes.nodes.slice(0);

      for (var _iterator9 = _createForOfIteratorHelperLoose(nodes), _step9; !(_step9 = _iterator9()).done;) {
        var _i2 = _step9.value;
        if (_i2.parent) _i2.parent.removeChild(_i2, 'ignore');
      }
    } else if (nodes.type) {
      nodes = [nodes];
    } else if (nodes.prop) {
      if (typeof nodes.value === 'undefined') {
        throw new Error('Value field is missed in node creation');
      } else if (typeof nodes.value !== 'string') {
        nodes.value = String(nodes.value);
      }

      nodes = [new _declaration.default(nodes)];
    } else if (nodes.selector) {
      var Rule = __webpack_require__(/*! ./rule */ "./node_modules/@linaria/server/node_modules/postcss/lib/rule.js");

      nodes = [new Rule(nodes)];
    } else if (nodes.name) {
      var AtRule = __webpack_require__(/*! ./at-rule */ "./node_modules/@linaria/server/node_modules/postcss/lib/at-rule.js");

      nodes = [new AtRule(nodes)];
    } else if (nodes.text) {
      nodes = [new _comment.default(nodes)];
    } else {
      throw new Error('Unknown node type in node creation');
    }

    var processed = nodes.map(function (i) {
      if (i.parent) i.parent.removeChild(i);

      if (typeof i.raws.before === 'undefined') {
        if (sample && typeof sample.raws.before !== 'undefined') {
          i.raws.before = sample.raws.before.replace(/[^\s]/g, '');
        }
      }

      i.parent = _this;
      return i;
    });
    return processed;
  }
  /**
   * @memberof Container#
   * @member {Node[]} nodes An array containing the container’s children.
   *
   * @example
   * const root = postcss.parse('a { color: black }')
   * root.nodes.length           //=> 1
   * root.nodes[0].selector      //=> 'a'
   * root.nodes[0].nodes[0].prop //=> 'color'
   */
  ;

  _createClass(Container, [{
    key: "first",
    get: function get() {
      if (!this.nodes) return undefined;
      return this.nodes[0];
    }
    /**
     * The container’s last child.
     *
     * @type {Node}
     *
     * @example
     * rule.last === rule.nodes[rule.nodes.length - 1]
     */

  }, {
    key: "last",
    get: function get() {
      if (!this.nodes) return undefined;
      return this.nodes[this.nodes.length - 1];
    }
  }]);

  return Container;
}(_node.default);

var _default = Container;
/**
 * @callback childCondition
 * @param {Node} node    Container child.
 * @param {number} index Child index.
 * @param {Node[]} nodes All container children.
 * @return {boolean}
 */

/**
 * @callback childIterator
 * @param {Node} node    Container child.
 * @param {number} index Child index.
 * @return {false|undefined} Returning `false` will break iteration.
 */

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lci5lczYiXSwibmFtZXMiOlsiY2xlYW5Tb3VyY2UiLCJub2RlcyIsIm1hcCIsImkiLCJzb3VyY2UiLCJDb250YWluZXIiLCJwdXNoIiwiY2hpbGQiLCJwYXJlbnQiLCJlYWNoIiwiY2FsbGJhY2siLCJsYXN0RWFjaCIsImluZGV4ZXMiLCJpZCIsInVuZGVmaW5lZCIsImluZGV4IiwicmVzdWx0IiwibGVuZ3RoIiwid2FsayIsImUiLCJwb3N0Y3NzTm9kZSIsInN0YWNrIiwidGVzdCIsInMiLCJyZXBsYWNlIiwiaW5wdXQiLCJmcm9tIiwic3RhcnQiLCJsaW5lIiwiY29sdW1uIiwid2Fsa0RlY2xzIiwicHJvcCIsInR5cGUiLCJSZWdFeHAiLCJ3YWxrUnVsZXMiLCJzZWxlY3RvciIsIndhbGtBdFJ1bGVzIiwibmFtZSIsIndhbGtDb21tZW50cyIsImFwcGVuZCIsImNoaWxkcmVuIiwibm9ybWFsaXplIiwibGFzdCIsIm5vZGUiLCJwcmVwZW5kIiwicmV2ZXJzZSIsImZpcnN0IiwidW5zaGlmdCIsImNsZWFuUmF3cyIsImtlZXBCZXR3ZWVuIiwiaW5zZXJ0QmVmb3JlIiwiZXhpc3QiLCJhZGQiLCJzcGxpY2UiLCJpbnNlcnRBZnRlciIsInJlbW92ZUNoaWxkIiwicmVtb3ZlQWxsIiwicmVwbGFjZVZhbHVlcyIsInBhdHRlcm4iLCJvcHRzIiwiZGVjbCIsInByb3BzIiwiaW5kZXhPZiIsImZhc3QiLCJ2YWx1ZSIsImV2ZXJ5IiwiY29uZGl0aW9uIiwic29tZSIsInNhbXBsZSIsInBhcnNlIiwicmVxdWlyZSIsIkFycmF5IiwiaXNBcnJheSIsInNsaWNlIiwiRXJyb3IiLCJTdHJpbmciLCJEZWNsYXJhdGlvbiIsIlJ1bGUiLCJBdFJ1bGUiLCJ0ZXh0IiwiQ29tbWVudCIsInByb2Nlc3NlZCIsInJhd3MiLCJiZWZvcmUiLCJOb2RlIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsU0FBU0EsV0FB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LE1BQU4sRUFBY0wsQ0FBQyxDQUFDSyxNQUFGLENBQVMrQyxXQUFULENBQXFCcEQsQ0FBckI7O0FBQ2QsVUFBSSxPQUFPQSxDQUFDLENBQUMrRSxJQUFGLENBQU9DLE1BQWQsS0FBeUIsV0FBN0IsRUFBMEM7QUFDeEMsWUFBSWYsTUFBTSxJQUFJLE9BQU9BLE1BQU0sQ0FBQ2MsSUFBUCxDQUFZQyxNQUFuQixLQUE4QixXQUE1QyxFQUF5RDtBQUN2RGhGLFVBQUFBLENBQUMsQ0FBQytFLElBQUYsQ0FBT0MsTUFBUCxHQUFnQmYsTUFBTSxDQUFDYyxJQUFQLENBQVlDLE1BQVosQ0FBbUIzRCxPQUFuQixDQUEyQixRQUEzQixFQUFxQyxFQUFyQyxDQUFoQjtBQUNEO0FBQ0Y7O0FBQ0RyQixNQUFBQSxDQUFDLENBQUNLLE1BQUYsR0FBVyxLQUFYO0FBQ0EsYUFBT0wsQ0FBUDtBQUNELEtBVGUsQ0FBaEI7QUFXQSxXQUFPOEUsU0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7O3dCQW5FYTtBQUNYLFVBQUksQ0FBQyxLQUFLaEYsS0FBVixFQUFpQixPQUFPYSxTQUFQO0FBQ2pCLGFBQU8sS0FBS2IsS0FBTCxDQUFXLENBQVgsQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7O3dCQVFZO0FBQ1YsVUFBSSxDQUFDLEtBQUtBLEtBQVYsRUFBaUIsT0FBT2EsU0FBUDtBQUNqQixhQUFPLEtBQUtiLEtBQUwsQ0FBVyxLQUFLQSxLQUFMLENBQVdnQixNQUFYLEdBQW9CLENBQS9CLENBQVA7QUFDRDs7OztFQWhqQnFCbUUsYTs7ZUErbUJUL0UsUztBQUVmOzs7Ozs7OztBQVFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERlY2xhcmF0aW9uIGZyb20gJy4vZGVjbGFyYXRpb24nXG5pbXBvcnQgQ29tbWVudCBmcm9tICcuL2NvbW1lbnQnXG5pbXBvcnQgTm9kZSBmcm9tICcuL25vZGUnXG5cbmZ1bmN0aW9uIGNsZWFuU291cmNlIChub2Rlcykge1xuICByZXR1cm4gbm9kZXMubWFwKGkgPT4ge1xuICAgIGlmIChpLm5vZGVzKSBpLm5vZGVzID0gY2xlYW5Tb3VyY2UoaS5ub2RlcylcbiAgICBkZWxldGUgaS5zb3VyY2VcbiAgICByZXR1cm4gaVxuICB9KVxufVxuXG4vKipcbiAqIFRoZSB7QGxpbmsgUm9vdH0sIHtAbGluayBBdFJ1bGV9LCBhbmQge0BsaW5rIFJ1bGV9IGNvbnRhaW5lciBub2Rlc1xuICogaW5oZXJpdCBzb21lIGNvbW1vbiBtZXRob2RzIHRvIGhlbHAgd29yayB3aXRoIHRoZWlyIGNoaWxkcmVuLlxuICpcbiAqIE5vdGUgdGhhdCBhbGwgY29udGFpbmVycyBjYW4gc3RvcmUgYW55IGNvbnRlbnQuIElmIHlvdSB3cml0ZSBhIHJ1bGUgaW5zaWRlXG4gKiBhIHJ1bGUsIFBvc3RDU1Mgd2lsbCBwYXJzZSBpdC5cbiAqXG4gKiBAZXh0ZW5kcyBOb2RlXG4gKiBAYWJzdHJhY3RcbiAqL1xuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgTm9kZSB7XG4gIHB1c2ggKGNoaWxkKSB7XG4gICAgY2hpbGQucGFyZW50ID0gdGhpc1xuICAgIHRoaXMubm9kZXMucHVzaChjaGlsZClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGVzIHRocm91Z2ggdGhlIGNvbnRhaW5lcuKAmXMgaW1tZWRpYXRlIGNoaWxkcmVuLFxuICAgKiBjYWxsaW5nIGBjYWxsYmFja2AgZm9yIGVhY2ggY2hpbGQuXG4gICAqXG4gICAqIFJldHVybmluZyBgZmFsc2VgIGluIHRoZSBjYWxsYmFjayB3aWxsIGJyZWFrIGl0ZXJhdGlvbi5cbiAgICpcbiAgICogVGhpcyBtZXRob2Qgb25seSBpdGVyYXRlcyB0aHJvdWdoIHRoZSBjb250YWluZXLigJlzIGltbWVkaWF0ZSBjaGlsZHJlbi5cbiAgICogSWYgeW91IG5lZWQgdG8gcmVjdXJzaXZlbHkgaXRlcmF0ZSB0aHJvdWdoIGFsbCB0aGUgY29udGFpbmVy4oCZcyBkZXNjZW5kYW50XG4gICAqIG5vZGVzLCB1c2Uge0BsaW5rIENvbnRhaW5lciN3YWxrfS5cbiAgICpcbiAgICogVW5saWtlIHRoZSBmb3IgYHt9YC1jeWNsZSBvciBgQXJyYXkjZm9yRWFjaGAgdGhpcyBpdGVyYXRvciBpcyBzYWZlXG4gICAqIGlmIHlvdSBhcmUgbXV0YXRpbmcgdGhlIGFycmF5IG9mIGNoaWxkIG5vZGVzIGR1cmluZyBpdGVyYXRpb24uXG4gICAqIFBvc3RDU1Mgd2lsbCBhZGp1c3QgdGhlIGN1cnJlbnQgaW5kZXggdG8gbWF0Y2ggdGhlIG11dGF0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtjaGlsZEl0ZXJhdG9yfSBjYWxsYmFjayBJdGVyYXRvciByZWNlaXZlcyBlYWNoIG5vZGUgYW5kIGluZGV4LlxuICAgKlxuICAgKiBAcmV0dXJuIHtmYWxzZXx1bmRlZmluZWR9IFJldHVybnMgYGZhbHNlYCBpZiBpdGVyYXRpb24gd2FzIGJyb2tlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSB7IGNvbG9yOiBibGFjazsgei1pbmRleDogMSB9JylcbiAgICogY29uc3QgcnVsZSA9IHJvb3QuZmlyc3RcbiAgICpcbiAgICogZm9yIChjb25zdCBkZWNsIG9mIHJ1bGUubm9kZXMpIHtcbiAgICogICBkZWNsLmNsb25lQmVmb3JlKHsgcHJvcDogJy13ZWJraXQtJyArIGRlY2wucHJvcCB9KVxuICAgKiAgIC8vIEN5Y2xlIHdpbGwgYmUgaW5maW5pdGUsIGJlY2F1c2UgY2xvbmVCZWZvcmUgbW92ZXMgdGhlIGN1cnJlbnQgbm9kZVxuICAgKiAgIC8vIHRvIHRoZSBuZXh0IGluZGV4XG4gICAqIH1cbiAgICpcbiAgICogcnVsZS5lYWNoKGRlY2wgPT4ge1xuICAgKiAgIGRlY2wuY2xvbmVCZWZvcmUoeyBwcm9wOiAnLXdlYmtpdC0nICsgZGVjbC5wcm9wIH0pXG4gICAqICAgLy8gV2lsbCBiZSBleGVjdXRlZCBvbmx5IGZvciBjb2xvciBhbmQgei1pbmRleFxuICAgKiB9KVxuICAgKi9cbiAgZWFjaCAoY2FsbGJhY2spIHtcbiAgICBpZiAoIXRoaXMubGFzdEVhY2gpIHRoaXMubGFzdEVhY2ggPSAwXG4gICAgaWYgKCF0aGlzLmluZGV4ZXMpIHRoaXMuaW5kZXhlcyA9IHsgfVxuXG4gICAgdGhpcy5sYXN0RWFjaCArPSAxXG4gICAgbGV0IGlkID0gdGhpcy5sYXN0RWFjaFxuICAgIHRoaXMuaW5kZXhlc1tpZF0gPSAwXG5cbiAgICBpZiAoIXRoaXMubm9kZXMpIHJldHVybiB1bmRlZmluZWRcblxuICAgIGxldCBpbmRleCwgcmVzdWx0XG4gICAgd2hpbGUgKHRoaXMuaW5kZXhlc1tpZF0gPCB0aGlzLm5vZGVzLmxlbmd0aCkge1xuICAgICAgaW5kZXggPSB0aGlzLmluZGV4ZXNbaWRdXG4gICAgICByZXN1bHQgPSBjYWxsYmFjayh0aGlzLm5vZGVzW2luZGV4XSwgaW5kZXgpXG4gICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkgYnJlYWtcblxuICAgICAgdGhpcy5pbmRleGVzW2lkXSArPSAxXG4gICAgfVxuXG4gICAgZGVsZXRlIHRoaXMuaW5kZXhlc1tpZF1cblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmF2ZXJzZXMgdGhlIGNvbnRhaW5lcuKAmXMgZGVzY2VuZGFudCBub2RlcywgY2FsbGluZyBjYWxsYmFja1xuICAgKiBmb3IgZWFjaCBub2RlLlxuICAgKlxuICAgKiBMaWtlIGNvbnRhaW5lci5lYWNoKCksIHRoaXMgbWV0aG9kIGlzIHNhZmUgdG8gdXNlXG4gICAqIGlmIHlvdSBhcmUgbXV0YXRpbmcgYXJyYXlzIGR1cmluZyBpdGVyYXRpb24uXG4gICAqXG4gICAqIElmIHlvdSBvbmx5IG5lZWQgdG8gaXRlcmF0ZSB0aHJvdWdoIHRoZSBjb250YWluZXLigJlzIGltbWVkaWF0ZSBjaGlsZHJlbixcbiAgICogdXNlIHtAbGluayBDb250YWluZXIjZWFjaH0uXG4gICAqXG4gICAqIEBwYXJhbSB7Y2hpbGRJdGVyYXRvcn0gY2FsbGJhY2sgSXRlcmF0b3IgcmVjZWl2ZXMgZWFjaCBub2RlIGFuZCBpbmRleC5cbiAgICpcbiAgICogQHJldHVybiB7ZmFsc2V8dW5kZWZpbmVkfSBSZXR1cm5zIGBmYWxzZWAgaWYgaXRlcmF0aW9uIHdhcyBicm9rZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcm9vdC53YWxrKG5vZGUgPT4ge1xuICAgKiAgIC8vIFRyYXZlcnNlcyBhbGwgZGVzY2VuZGFudCBub2Rlcy5cbiAgICogfSlcbiAgICovXG4gIHdhbGsgKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaCgoY2hpbGQsIGkpID0+IHtcbiAgICAgIGxldCByZXN1bHRcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBlLnBvc3Rjc3NOb2RlID0gY2hpbGRcbiAgICAgICAgaWYgKGUuc3RhY2sgJiYgY2hpbGQuc291cmNlICYmIC9cXG5cXHN7NH1hdCAvLnRlc3QoZS5zdGFjaykpIHtcbiAgICAgICAgICBsZXQgcyA9IGNoaWxkLnNvdXJjZVxuICAgICAgICAgIGUuc3RhY2sgPSBlLnN0YWNrLnJlcGxhY2UoL1xcblxcc3s0fWF0IC8sXG4gICAgICAgICAgICBgJCYkeyBzLmlucHV0LmZyb20gfTokeyBzLnN0YXJ0LmxpbmUgfTokeyBzLnN0YXJ0LmNvbHVtbiB9JCZgKVxuICAgICAgICB9XG4gICAgICAgIHRocm93IGVcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgIT09IGZhbHNlICYmIGNoaWxkLndhbGspIHtcbiAgICAgICAgcmVzdWx0ID0gY2hpbGQud2FsayhjYWxsYmFjaylcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYXZlcnNlcyB0aGUgY29udGFpbmVy4oCZcyBkZXNjZW5kYW50IG5vZGVzLCBjYWxsaW5nIGNhbGxiYWNrXG4gICAqIGZvciBlYWNoIGRlY2xhcmF0aW9uIG5vZGUuXG4gICAqXG4gICAqIElmIHlvdSBwYXNzIGEgZmlsdGVyLCBpdGVyYXRpb24gd2lsbCBvbmx5IGhhcHBlbiBvdmVyIGRlY2xhcmF0aW9uc1xuICAgKiB3aXRoIG1hdGNoaW5nIHByb3BlcnRpZXMuXG4gICAqXG4gICAqIExpa2Uge0BsaW5rIENvbnRhaW5lciNlYWNofSwgdGhpcyBtZXRob2QgaXMgc2FmZVxuICAgKiB0byB1c2UgaWYgeW91IGFyZSBtdXRhdGluZyBhcnJheXMgZHVyaW5nIGl0ZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVnRXhwfSBbcHJvcF0gICBTdHJpbmcgb3IgcmVndWxhciBleHByZXNzaW9uXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gZmlsdGVyIGRlY2xhcmF0aW9ucyBieSBwcm9wZXJ0eSBuYW1lLlxuICAgKiBAcGFyYW0ge2NoaWxkSXRlcmF0b3J9IGNhbGxiYWNrIEl0ZXJhdG9yIHJlY2VpdmVzIGVhY2ggbm9kZSBhbmQgaW5kZXguXG4gICAqXG4gICAqIEByZXR1cm4ge2ZhbHNlfHVuZGVmaW5lZH0gUmV0dXJucyBgZmFsc2VgIGlmIGl0ZXJhdGlvbiB3YXMgYnJva2UuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHJvb3Qud2Fsa0RlY2xzKGRlY2wgPT4ge1xuICAgKiAgIGNoZWNrUHJvcGVydHlTdXBwb3J0KGRlY2wucHJvcClcbiAgICogfSlcbiAgICpcbiAgICogcm9vdC53YWxrRGVjbHMoJ2JvcmRlci1yYWRpdXMnLCBkZWNsID0+IHtcbiAgICogICBkZWNsLnJlbW92ZSgpXG4gICAqIH0pXG4gICAqXG4gICAqIHJvb3Qud2Fsa0RlY2xzKC9eYmFja2dyb3VuZC8sIGRlY2wgPT4ge1xuICAgKiAgIGRlY2wudmFsdWUgPSB0YWtlRmlyc3RDb2xvckZyb21HcmFkaWVudChkZWNsLnZhbHVlKVxuICAgKiB9KVxuICAgKi9cbiAgd2Fsa0RlY2xzIChwcm9wLCBjYWxsYmFjaykge1xuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gcHJvcFxuICAgICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdkZWNsJykge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaWYgKHByb3AgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZC50eXBlID09PSAnZGVjbCcgJiYgcHJvcC50ZXN0KGNoaWxkLnByb3ApKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdkZWNsJyAmJiBjaGlsZC5wcm9wID09PSBwcm9wKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYXZlcnNlcyB0aGUgY29udGFpbmVy4oCZcyBkZXNjZW5kYW50IG5vZGVzLCBjYWxsaW5nIGNhbGxiYWNrXG4gICAqIGZvciBlYWNoIHJ1bGUgbm9kZS5cbiAgICpcbiAgICogSWYgeW91IHBhc3MgYSBmaWx0ZXIsIGl0ZXJhdGlvbiB3aWxsIG9ubHkgaGFwcGVuIG92ZXIgcnVsZXNcbiAgICogd2l0aCBtYXRjaGluZyBzZWxlY3RvcnMuXG4gICAqXG4gICAqIExpa2Uge0BsaW5rIENvbnRhaW5lciNlYWNofSwgdGhpcyBtZXRob2QgaXMgc2FmZVxuICAgKiB0byB1c2UgaWYgeW91IGFyZSBtdXRhdGluZyBhcnJheXMgZHVyaW5nIGl0ZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVnRXhwfSBbc2VsZWN0b3JdIFN0cmluZyBvciByZWd1bGFyIGV4cHJlc3Npb25cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIGZpbHRlciBydWxlcyBieSBzZWxlY3Rvci5cbiAgICogQHBhcmFtIHtjaGlsZEl0ZXJhdG9yfSBjYWxsYmFjayAgIEl0ZXJhdG9yIHJlY2VpdmVzIGVhY2ggbm9kZSBhbmQgaW5kZXguXG4gICAqXG4gICAqIEByZXR1cm4ge2ZhbHNlfHVuZGVmaW5lZH0gcmV0dXJucyBgZmFsc2VgIGlmIGl0ZXJhdGlvbiB3YXMgYnJva2UuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHNlbGVjdG9ycyA9IFtdXG4gICAqIHJvb3Qud2Fsa1J1bGVzKHJ1bGUgPT4ge1xuICAgKiAgIHNlbGVjdG9ycy5wdXNoKHJ1bGUuc2VsZWN0b3IpXG4gICAqIH0pXG4gICAqIGNvbnNvbGUubG9nKGBZb3VyIENTUyB1c2VzICR7IHNlbGVjdG9ycy5sZW5ndGggfSBzZWxlY3RvcnNgKVxuICAgKi9cbiAgd2Fsa1J1bGVzIChzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IHNlbGVjdG9yXG5cbiAgICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZC50eXBlID09PSAncnVsZScpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdydWxlJyAmJiBzZWxlY3Rvci50ZXN0KGNoaWxkLnNlbGVjdG9yKSkge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgIGlmIChjaGlsZC50eXBlID09PSAncnVsZScgJiYgY2hpbGQuc2VsZWN0b3IgPT09IHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYXZlcnNlcyB0aGUgY29udGFpbmVy4oCZcyBkZXNjZW5kYW50IG5vZGVzLCBjYWxsaW5nIGNhbGxiYWNrXG4gICAqIGZvciBlYWNoIGF0LXJ1bGUgbm9kZS5cbiAgICpcbiAgICogSWYgeW91IHBhc3MgYSBmaWx0ZXIsIGl0ZXJhdGlvbiB3aWxsIG9ubHkgaGFwcGVuIG92ZXIgYXQtcnVsZXNcbiAgICogdGhhdCBoYXZlIG1hdGNoaW5nIG5hbWVzLlxuICAgKlxuICAgKiBMaWtlIHtAbGluayBDb250YWluZXIjZWFjaH0sIHRoaXMgbWV0aG9kIGlzIHNhZmVcbiAgICogdG8gdXNlIGlmIHlvdSBhcmUgbXV0YXRpbmcgYXJyYXlzIGR1cmluZyBpdGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfFJlZ0V4cH0gW25hbWVdICAgU3RyaW5nIG9yIHJlZ3VsYXIgZXhwcmVzc2lvblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIGZpbHRlciBhdC1ydWxlcyBieSBuYW1lLlxuICAgKiBAcGFyYW0ge2NoaWxkSXRlcmF0b3J9IGNhbGxiYWNrIEl0ZXJhdG9yIHJlY2VpdmVzIGVhY2ggbm9kZSBhbmQgaW5kZXguXG4gICAqXG4gICAqIEByZXR1cm4ge2ZhbHNlfHVuZGVmaW5lZH0gUmV0dXJucyBgZmFsc2VgIGlmIGl0ZXJhdGlvbiB3YXMgYnJva2UuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHJvb3Qud2Fsa0F0UnVsZXMocnVsZSA9PiB7XG4gICAqICAgaWYgKGlzT2xkKHJ1bGUubmFtZSkpIHJ1bGUucmVtb3ZlKClcbiAgICogfSlcbiAgICpcbiAgICogbGV0IGZpcnN0ID0gZmFsc2VcbiAgICogcm9vdC53YWxrQXRSdWxlcygnY2hhcnNldCcsIHJ1bGUgPT4ge1xuICAgKiAgIGlmICghZmlyc3QpIHtcbiAgICogICAgIGZpcnN0ID0gdHJ1ZVxuICAgKiAgIH0gZWxzZSB7XG4gICAqICAgICBydWxlLnJlbW92ZSgpXG4gICAqICAgfVxuICAgKiB9KVxuICAgKi9cbiAgd2Fsa0F0UnVsZXMgKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSBuYW1lXG4gICAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2F0cnVsZScpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGlmIChuYW1lIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2F0cnVsZScgJiYgbmFtZS50ZXN0KGNoaWxkLm5hbWUpKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdhdHJ1bGUnICYmIGNoaWxkLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogVHJhdmVyc2VzIHRoZSBjb250YWluZXLigJlzIGRlc2NlbmRhbnQgbm9kZXMsIGNhbGxpbmcgY2FsbGJhY2tcbiAgICogZm9yIGVhY2ggY29tbWVudCBub2RlLlxuICAgKlxuICAgKiBMaWtlIHtAbGluayBDb250YWluZXIjZWFjaH0sIHRoaXMgbWV0aG9kIGlzIHNhZmVcbiAgICogdG8gdXNlIGlmIHlvdSBhcmUgbXV0YXRpbmcgYXJyYXlzIGR1cmluZyBpdGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7Y2hpbGRJdGVyYXRvcn0gY2FsbGJhY2sgSXRlcmF0b3IgcmVjZWl2ZXMgZWFjaCBub2RlIGFuZCBpbmRleC5cbiAgICpcbiAgICogQHJldHVybiB7ZmFsc2V8dW5kZWZpbmVkfSBSZXR1cm5zIGBmYWxzZWAgaWYgaXRlcmF0aW9uIHdhcyBicm9rZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcm9vdC53YWxrQ29tbWVudHMoY29tbWVudCA9PiB7XG4gICAqICAgY29tbWVudC5yZW1vdmUoKVxuICAgKiB9KVxuICAgKi9cbiAgd2Fsa0NvbW1lbnRzIChjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2NvbW1lbnQnKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydHMgbmV3IG5vZGVzIHRvIHRoZSBlbmQgb2YgdGhlIGNvbnRhaW5lci5cbiAgICpcbiAgICogQHBhcmFtIHsuLi4oTm9kZXxvYmplY3R8c3RyaW5nfE5vZGVbXSl9IGNoaWxkcmVuIE5ldyBub2Rlcy5cbiAgICpcbiAgICogQHJldHVybiB7Tm9kZX0gVGhpcyBub2RlIGZvciBtZXRob2RzIGNoYWluLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBkZWNsMSA9IHBvc3Rjc3MuZGVjbCh7IHByb3A6ICdjb2xvcicsIHZhbHVlOiAnYmxhY2snIH0pXG4gICAqIGNvbnN0IGRlY2wyID0gcG9zdGNzcy5kZWNsKHsgcHJvcDogJ2JhY2tncm91bmQtY29sb3InLCB2YWx1ZTogJ3doaXRlJyB9KVxuICAgKiBydWxlLmFwcGVuZChkZWNsMSwgZGVjbDIpXG4gICAqXG4gICAqIHJvb3QuYXBwZW5kKHsgbmFtZTogJ2NoYXJzZXQnLCBwYXJhbXM6ICdcIlVURi04XCInIH0pICAvLyBhdC1ydWxlXG4gICAqIHJvb3QuYXBwZW5kKHsgc2VsZWN0b3I6ICdhJyB9KSAgICAgICAgICAgICAgICAgICAgICAgLy8gcnVsZVxuICAgKiBydWxlLmFwcGVuZCh7IHByb3A6ICdjb2xvcicsIHZhbHVlOiAnYmxhY2snIH0pICAgICAgIC8vIGRlY2xhcmF0aW9uXG4gICAqIHJ1bGUuYXBwZW5kKHsgdGV4dDogJ0NvbW1lbnQnIH0pICAgICAgICAgICAgICAgICAgICAgLy8gY29tbWVudFxuICAgKlxuICAgKiByb290LmFwcGVuZCgnYSB7fScpXG4gICAqIHJvb3QuZmlyc3QuYXBwZW5kKCdjb2xvcjogYmxhY2s7IHotaW5kZXg6IDEnKVxuICAgKi9cbiAgYXBwZW5kICguLi5jaGlsZHJlbikge1xuICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICBsZXQgbm9kZXMgPSB0aGlzLm5vcm1hbGl6ZShjaGlsZCwgdGhpcy5sYXN0KVxuICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2RlcykgdGhpcy5ub2Rlcy5wdXNoKG5vZGUpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0cyBuZXcgbm9kZXMgdG8gdGhlIHN0YXJ0IG9mIHRoZSBjb250YWluZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7Li4uKE5vZGV8b2JqZWN0fHN0cmluZ3xOb2RlW10pfSBjaGlsZHJlbiBOZXcgbm9kZXMuXG4gICAqXG4gICAqIEByZXR1cm4ge05vZGV9IFRoaXMgbm9kZSBmb3IgbWV0aG9kcyBjaGFpbi5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3QgZGVjbDEgPSBwb3N0Y3NzLmRlY2woeyBwcm9wOiAnY29sb3InLCB2YWx1ZTogJ2JsYWNrJyB9KVxuICAgKiBjb25zdCBkZWNsMiA9IHBvc3Rjc3MuZGVjbCh7IHByb3A6ICdiYWNrZ3JvdW5kLWNvbG9yJywgdmFsdWU6ICd3aGl0ZScgfSlcbiAgICogcnVsZS5wcmVwZW5kKGRlY2wxLCBkZWNsMilcbiAgICpcbiAgICogcm9vdC5hcHBlbmQoeyBuYW1lOiAnY2hhcnNldCcsIHBhcmFtczogJ1wiVVRGLThcIicgfSkgIC8vIGF0LXJ1bGVcbiAgICogcm9vdC5hcHBlbmQoeyBzZWxlY3RvcjogJ2EnIH0pICAgICAgICAgICAgICAgICAgICAgICAvLyBydWxlXG4gICAqIHJ1bGUuYXBwZW5kKHsgcHJvcDogJ2NvbG9yJywgdmFsdWU6ICdibGFjaycgfSkgICAgICAgLy8gZGVjbGFyYXRpb25cbiAgICogcnVsZS5hcHBlbmQoeyB0ZXh0OiAnQ29tbWVudCcgfSkgICAgICAgICAgICAgICAgICAgICAvLyBjb21tZW50XG4gICAqXG4gICAqIHJvb3QuYXBwZW5kKCdhIHt9JylcbiAgICogcm9vdC5maXJzdC5hcHBlbmQoJ2NvbG9yOiBibGFjazsgei1pbmRleDogMScpXG4gICAqL1xuICBwcmVwZW5kICguLi5jaGlsZHJlbikge1xuICAgIGNoaWxkcmVuID0gY2hpbGRyZW4ucmV2ZXJzZSgpXG4gICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgIGxldCBub2RlcyA9IHRoaXMubm9ybWFsaXplKGNoaWxkLCB0aGlzLmZpcnN0LCAncHJlcGVuZCcpLnJldmVyc2UoKVxuICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2RlcykgdGhpcy5ub2Rlcy51bnNoaWZ0KG5vZGUpXG4gICAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmluZGV4ZXMpIHtcbiAgICAgICAgdGhpcy5pbmRleGVzW2lkXSA9IHRoaXMuaW5kZXhlc1tpZF0gKyBub2Rlcy5sZW5ndGhcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGNsZWFuUmF3cyAoa2VlcEJldHdlZW4pIHtcbiAgICBzdXBlci5jbGVhblJhd3Moa2VlcEJldHdlZW4pXG4gICAgaWYgKHRoaXMubm9kZXMpIHtcbiAgICAgIGZvciAobGV0IG5vZGUgb2YgdGhpcy5ub2Rlcykgbm9kZS5jbGVhblJhd3Moa2VlcEJldHdlZW4pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydCBuZXcgbm9kZSBiZWZvcmUgb2xkIG5vZGUgd2l0aGluIHRoZSBjb250YWluZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZXxudW1iZXJ9IGV4aXN0ICAgICAgICAgICAgIENoaWxkIG9yIGNoaWxk4oCZcyBpbmRleC5cbiAgICogQHBhcmFtIHtOb2RlfG9iamVjdHxzdHJpbmd8Tm9kZVtdfSBhZGQgTmV3IG5vZGUuXG4gICAqXG4gICAqIEByZXR1cm4ge05vZGV9IFRoaXMgbm9kZSBmb3IgbWV0aG9kcyBjaGFpbi5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcnVsZS5pbnNlcnRCZWZvcmUoZGVjbCwgZGVjbC5jbG9uZSh7IHByb3A6ICctd2Via2l0LScgKyBkZWNsLnByb3AgfSkpXG4gICAqL1xuICBpbnNlcnRCZWZvcmUgKGV4aXN0LCBhZGQpIHtcbiAgICBleGlzdCA9IHRoaXMuaW5kZXgoZXhpc3QpXG5cbiAgICBsZXQgdHlwZSA9IGV4aXN0ID09PSAwID8gJ3ByZXBlbmQnIDogZmFsc2VcbiAgICBsZXQgbm9kZXMgPSB0aGlzLm5vcm1hbGl6ZShhZGQsIHRoaXMubm9kZXNbZXhpc3RdLCB0eXBlKS5yZXZlcnNlKClcbiAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB0aGlzLm5vZGVzLnNwbGljZShleGlzdCwgMCwgbm9kZSlcblxuICAgIGxldCBpbmRleFxuICAgIGZvciAobGV0IGlkIGluIHRoaXMuaW5kZXhlcykge1xuICAgICAgaW5kZXggPSB0aGlzLmluZGV4ZXNbaWRdXG4gICAgICBpZiAoZXhpc3QgPD0gaW5kZXgpIHtcbiAgICAgICAgdGhpcy5pbmRleGVzW2lkXSA9IGluZGV4ICsgbm9kZXMubGVuZ3RoXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnQgbmV3IG5vZGUgYWZ0ZXIgb2xkIG5vZGUgd2l0aGluIHRoZSBjb250YWluZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZXxudW1iZXJ9IGV4aXN0ICAgICAgICAgICAgIENoaWxkIG9yIGNoaWxk4oCZcyBpbmRleC5cbiAgICogQHBhcmFtIHtOb2RlfG9iamVjdHxzdHJpbmd8Tm9kZVtdfSBhZGQgTmV3IG5vZGUuXG4gICAqXG4gICAqIEByZXR1cm4ge05vZGV9IFRoaXMgbm9kZSBmb3IgbWV0aG9kcyBjaGFpbi5cbiAgICovXG4gIGluc2VydEFmdGVyIChleGlzdCwgYWRkKSB7XG4gICAgZXhpc3QgPSB0aGlzLmluZGV4KGV4aXN0KVxuXG4gICAgbGV0IG5vZGVzID0gdGhpcy5ub3JtYWxpemUoYWRkLCB0aGlzLm5vZGVzW2V4aXN0XSkucmV2ZXJzZSgpXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2RlcykgdGhpcy5ub2Rlcy5zcGxpY2UoZXhpc3QgKyAxLCAwLCBub2RlKVxuXG4gICAgbGV0IGluZGV4XG4gICAgZm9yIChsZXQgaWQgaW4gdGhpcy5pbmRleGVzKSB7XG4gICAgICBpbmRleCA9IHRoaXMuaW5kZXhlc1tpZF1cbiAgICAgIGlmIChleGlzdCA8IGluZGV4KSB7XG4gICAgICAgIHRoaXMuaW5kZXhlc1tpZF0gPSBpbmRleCArIG5vZGVzLmxlbmd0aFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBub2RlIGZyb20gdGhlIGNvbnRhaW5lciBhbmQgY2xlYW5zIHRoZSBwYXJlbnQgcHJvcGVydGllc1xuICAgKiBmcm9tIHRoZSBub2RlIGFuZCBpdHMgY2hpbGRyZW4uXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZXxudW1iZXJ9IGNoaWxkIENoaWxkIG9yIGNoaWxk4oCZcyBpbmRleC5cbiAgICpcbiAgICogQHJldHVybiB7Tm9kZX0gVGhpcyBub2RlIGZvciBtZXRob2RzIGNoYWluXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHJ1bGUubm9kZXMubGVuZ3RoICAvLz0+IDVcbiAgICogcnVsZS5yZW1vdmVDaGlsZChkZWNsKVxuICAgKiBydWxlLm5vZGVzLmxlbmd0aCAgLy89PiA0XG4gICAqIGRlY2wucGFyZW50ICAgICAgICAvLz0+IHVuZGVmaW5lZFxuICAgKi9cbiAgcmVtb3ZlQ2hpbGQgKGNoaWxkKSB7XG4gICAgY2hpbGQgPSB0aGlzLmluZGV4KGNoaWxkKVxuICAgIHRoaXMubm9kZXNbY2hpbGRdLnBhcmVudCA9IHVuZGVmaW5lZFxuICAgIHRoaXMubm9kZXMuc3BsaWNlKGNoaWxkLCAxKVxuXG4gICAgbGV0IGluZGV4XG4gICAgZm9yIChsZXQgaWQgaW4gdGhpcy5pbmRleGVzKSB7XG4gICAgICBpbmRleCA9IHRoaXMuaW5kZXhlc1tpZF1cbiAgICAgIGlmIChpbmRleCA+PSBjaGlsZCkge1xuICAgICAgICB0aGlzLmluZGV4ZXNbaWRdID0gaW5kZXggLSAxXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBjaGlsZHJlbiBmcm9tIHRoZSBjb250YWluZXJcbiAgICogYW5kIGNsZWFucyB0aGVpciBwYXJlbnQgcHJvcGVydGllcy5cbiAgICpcbiAgICogQHJldHVybiB7Tm9kZX0gVGhpcyBub2RlIGZvciBtZXRob2RzIGNoYWluLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBydWxlLnJlbW92ZUFsbCgpXG4gICAqIHJ1bGUubm9kZXMubGVuZ3RoIC8vPT4gMFxuICAgKi9cbiAgcmVtb3ZlQWxsICgpIHtcbiAgICBmb3IgKGxldCBub2RlIG9mIHRoaXMubm9kZXMpIG5vZGUucGFyZW50ID0gdW5kZWZpbmVkXG4gICAgdGhpcy5ub2RlcyA9IFtdXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXNzZXMgYWxsIGRlY2xhcmF0aW9uIHZhbHVlcyB3aXRoaW4gdGhlIGNvbnRhaW5lciB0aGF0IG1hdGNoIHBhdHRlcm5cbiAgICogdGhyb3VnaCBjYWxsYmFjaywgcmVwbGFjaW5nIHRob3NlIHZhbHVlcyB3aXRoIHRoZSByZXR1cm5lZCByZXN1bHRcbiAgICogb2YgY2FsbGJhY2suXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIHVzZWZ1bCBpZiB5b3UgYXJlIHVzaW5nIGEgY3VzdG9tIHVuaXQgb3IgZnVuY3Rpb25cbiAgICogYW5kIG5lZWQgdG8gaXRlcmF0ZSB0aHJvdWdoIGFsbCB2YWx1ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfFJlZ0V4cH0gcGF0dGVybiAgICAgIFJlcGxhY2UgcGF0dGVybi5cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdHMgICAgICAgICAgICAgICAgT3B0aW9ucyB0byBzcGVlZCB1cCB0aGUgc2VhcmNoLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gb3B0cy5wcm9wcyBBbiBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMuZmFzdCAgICAgICAgICAgU3RyaW5nIHRoYXTigJlzIHVzZWQgdG8gbmFycm93IGRvd25cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzIGFuZCBzcGVlZCB1cCB0aGUgcmVnZXhwIHNlYXJjaC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbnxzdHJpbmd9IGNhbGxiYWNrICAgU3RyaW5nIHRvIHJlcGxhY2UgcGF0dGVybiBvciBjYWxsYmFja1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0IHJldHVybnMgYSBuZXcgdmFsdWUuIFRoZSBjYWxsYmFja1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWxsIHJlY2VpdmUgdGhlIHNhbWUgYXJndW1lbnRzXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzIHRob3NlIHBhc3NlZCB0byBhIGZ1bmN0aW9uIHBhcmFtZXRlclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZiBgU3RyaW5nI3JlcGxhY2VgLlxuICAgKlxuICAgKiBAcmV0dXJuIHtOb2RlfSBUaGlzIG5vZGUgZm9yIG1ldGhvZHMgY2hhaW4uXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHJvb3QucmVwbGFjZVZhbHVlcygvXFxkK3JlbS8sIHsgZmFzdDogJ3JlbScgfSwgc3RyaW5nID0+IHtcbiAgICogICByZXR1cm4gMTUgKiBwYXJzZUludChzdHJpbmcpICsgJ3B4J1xuICAgKiB9KVxuICAgKi9cbiAgcmVwbGFjZVZhbHVlcyAocGF0dGVybiwgb3B0cywgY2FsbGJhY2spIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IG9wdHNcbiAgICAgIG9wdHMgPSB7IH1cbiAgICB9XG5cbiAgICB0aGlzLndhbGtEZWNscyhkZWNsID0+IHtcbiAgICAgIGlmIChvcHRzLnByb3BzICYmIG9wdHMucHJvcHMuaW5kZXhPZihkZWNsLnByb3ApID09PSAtMSkgcmV0dXJuXG4gICAgICBpZiAob3B0cy5mYXN0ICYmIGRlY2wudmFsdWUuaW5kZXhPZihvcHRzLmZhc3QpID09PSAtMSkgcmV0dXJuXG5cbiAgICAgIGRlY2wudmFsdWUgPSBkZWNsLnZhbHVlLnJlcGxhY2UocGF0dGVybiwgY2FsbGJhY2spXG4gICAgfSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBgdHJ1ZWAgaWYgY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWBcbiAgICogZm9yIGFsbCBvZiB0aGUgY29udGFpbmVy4oCZcyBjaGlsZHJlbi5cbiAgICpcbiAgICogQHBhcmFtIHtjaGlsZENvbmRpdGlvbn0gY29uZGl0aW9uIEl0ZXJhdG9yIHJldHVybnMgdHJ1ZSBvciBmYWxzZS5cbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gSXMgZXZlcnkgY2hpbGQgcGFzcyBjb25kaXRpb24uXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IG5vUHJlZml4ZXMgPSBydWxlLmV2ZXJ5KGkgPT4gaS5wcm9wWzBdICE9PSAnLScpXG4gICAqL1xuICBldmVyeSAoY29uZGl0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZXMuZXZlcnkoY29uZGl0aW9uKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYHRydWVgIGlmIGNhbGxiYWNrIHJldHVybnMgYHRydWVgIGZvciAoYXQgbGVhc3QpIG9uZVxuICAgKiBvZiB0aGUgY29udGFpbmVy4oCZcyBjaGlsZHJlbi5cbiAgICpcbiAgICogQHBhcmFtIHtjaGlsZENvbmRpdGlvbn0gY29uZGl0aW9uIEl0ZXJhdG9yIHJldHVybnMgdHJ1ZSBvciBmYWxzZS5cbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gSXMgc29tZSBjaGlsZCBwYXNzIGNvbmRpdGlvbi5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3QgaGFzUHJlZml4ID0gcnVsZS5zb21lKGkgPT4gaS5wcm9wWzBdID09PSAnLScpXG4gICAqL1xuICBzb21lIChjb25kaXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5ub2Rlcy5zb21lKGNvbmRpdGlvbilcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgYGNoaWxkYOKAmXMgaW5kZXggd2l0aGluIHRoZSB7QGxpbmsgQ29udGFpbmVyI25vZGVzfSBhcnJheS5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfSBjaGlsZCBDaGlsZCBvZiB0aGUgY3VycmVudCBjb250YWluZXIuXG4gICAqXG4gICAqIEByZXR1cm4ge251bWJlcn0gQ2hpbGQgaW5kZXguXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHJ1bGUuaW5kZXgoIHJ1bGUubm9kZXNbMl0gKSAvLz0+IDJcbiAgICovXG4gIGluZGV4IChjaGlsZCkge1xuICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubm9kZXMuaW5kZXhPZihjaGlsZClcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY29udGFpbmVy4oCZcyBmaXJzdCBjaGlsZC5cbiAgICpcbiAgICogQHR5cGUge05vZGV9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHJ1bGUuZmlyc3QgPT09IHJ1bGVzLm5vZGVzWzBdXG4gICAqL1xuICBnZXQgZmlyc3QgKCkge1xuICAgIGlmICghdGhpcy5ub2RlcykgcmV0dXJuIHVuZGVmaW5lZFxuICAgIHJldHVybiB0aGlzLm5vZGVzWzBdXG4gIH1cblxuICAvKipcbiAgICogVGhlIGNvbnRhaW5lcuKAmXMgbGFzdCBjaGlsZC5cbiAgICpcbiAgICogQHR5cGUge05vZGV9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHJ1bGUubGFzdCA9PT0gcnVsZS5ub2Rlc1tydWxlLm5vZGVzLmxlbmd0aCAtIDFdXG4gICAqL1xuICBnZXQgbGFzdCAoKSB7XG4gICAgaWYgKCF0aGlzLm5vZGVzKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHRoaXMubm9kZXNbdGhpcy5ub2Rlcy5sZW5ndGggLSAxXVxuICB9XG5cbiAgbm9ybWFsaXplIChub2Rlcywgc2FtcGxlKSB7XG4gICAgaWYgKHR5cGVvZiBub2RlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKVxuICAgICAgbm9kZXMgPSBjbGVhblNvdXJjZShwYXJzZShub2Rlcykubm9kZXMpXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG5vZGVzKSkge1xuICAgICAgbm9kZXMgPSBub2Rlcy5zbGljZSgwKVxuICAgICAgZm9yIChsZXQgaSBvZiBub2Rlcykge1xuICAgICAgICBpZiAoaS5wYXJlbnQpIGkucGFyZW50LnJlbW92ZUNoaWxkKGksICdpZ25vcmUnKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobm9kZXMudHlwZSA9PT0gJ3Jvb3QnKSB7XG4gICAgICBub2RlcyA9IG5vZGVzLm5vZGVzLnNsaWNlKDApXG4gICAgICBmb3IgKGxldCBpIG9mIG5vZGVzKSB7XG4gICAgICAgIGlmIChpLnBhcmVudCkgaS5wYXJlbnQucmVtb3ZlQ2hpbGQoaSwgJ2lnbm9yZScpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub2Rlcy50eXBlKSB7XG4gICAgICBub2RlcyA9IFtub2Rlc11cbiAgICB9IGVsc2UgaWYgKG5vZGVzLnByb3ApIHtcbiAgICAgIGlmICh0eXBlb2Ygbm9kZXMudmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVmFsdWUgZmllbGQgaXMgbWlzc2VkIGluIG5vZGUgY3JlYXRpb24nKVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygbm9kZXMudmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG5vZGVzLnZhbHVlID0gU3RyaW5nKG5vZGVzLnZhbHVlKVxuICAgICAgfVxuICAgICAgbm9kZXMgPSBbbmV3IERlY2xhcmF0aW9uKG5vZGVzKV1cbiAgICB9IGVsc2UgaWYgKG5vZGVzLnNlbGVjdG9yKSB7XG4gICAgICBsZXQgUnVsZSA9IHJlcXVpcmUoJy4vcnVsZScpXG4gICAgICBub2RlcyA9IFtuZXcgUnVsZShub2RlcyldXG4gICAgfSBlbHNlIGlmIChub2Rlcy5uYW1lKSB7XG4gICAgICBsZXQgQXRSdWxlID0gcmVxdWlyZSgnLi9hdC1ydWxlJylcbiAgICAgIG5vZGVzID0gW25ldyBBdFJ1bGUobm9kZXMpXVxuICAgIH0gZWxzZSBpZiAobm9kZXMudGV4dCkge1xuICAgICAgbm9kZXMgPSBbbmV3IENvbW1lbnQobm9kZXMpXVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gbm9kZSB0eXBlIGluIG5vZGUgY3JlYXRpb24nKVxuICAgIH1cblxuICAgIGxldCBwcm9jZXNzZWQgPSBub2Rlcy5tYXAoaSA9PiB7XG4gICAgICBpZiAoaS5wYXJlbnQpIGkucGFyZW50LnJlbW92ZUNoaWxkKGkpXG4gICAgICBpZiAodHlwZW9mIGkucmF3cy5iZWZvcmUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmIChzYW1wbGUgJiYgdHlwZW9mIHNhbXBsZS5yYXdzLmJlZm9yZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpLnJhd3MuYmVmb3JlID0gc2FtcGxlLnJhd3MuYmVmb3JlLnJlcGxhY2UoL1teXFxzXS9nLCAnJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaS5wYXJlbnQgPSB0aGlzXG4gICAgICByZXR1cm4gaVxuICAgIH0pXG5cbiAgICByZXR1cm4gcHJvY2Vzc2VkXG4gIH1cblxuICAvKipcbiAgICogQG1lbWJlcm9mIENvbnRhaW5lciNcbiAgICogQG1lbWJlciB7Tm9kZVtdfSBub2RlcyBBbiBhcnJheSBjb250YWluaW5nIHRoZSBjb250YWluZXLigJlzIGNoaWxkcmVuLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSB7IGNvbG9yOiBibGFjayB9JylcbiAgICogcm9vdC5ub2Rlcy5sZW5ndGggICAgICAgICAgIC8vPT4gMVxuICAgKiByb290Lm5vZGVzWzBdLnNlbGVjdG9yICAgICAgLy89PiAnYSdcbiAgICogcm9vdC5ub2Rlc1swXS5ub2Rlc1swXS5wcm9wIC8vPT4gJ2NvbG9yJ1xuICAgKi9cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyXG5cbi8qKlxuICogQGNhbGxiYWNrIGNoaWxkQ29uZGl0aW9uXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgICAgQ29udGFpbmVyIGNoaWxkLlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IENoaWxkIGluZGV4LlxuICogQHBhcmFtIHtOb2RlW119IG5vZGVzIEFsbCBjb250YWluZXIgY2hpbGRyZW4uXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5cbi8qKlxuICogQGNhbGxiYWNrIGNoaWxkSXRlcmF0b3JcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAgICBDb250YWluZXIgY2hpbGQuXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggQ2hpbGQgaW5kZXguXG4gKiBAcmV0dXJuIHtmYWxzZXx1bmRlZmluZWR9IFJldHVybmluZyBgZmFsc2VgIHdpbGwgYnJlYWsgaXRlcmF0aW9uLlxuICovXG4iXSwiZmlsZSI6ImNvbnRhaW5lci5qcyJ9


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/css-syntax-error.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/css-syntax-error.js ***!
  \***********************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _supportsColor = _interopRequireDefault(__webpack_require__(/*! supports-color */ "./node_modules/@linaria/server/node_modules/supports-color/index.js"));

var _chalk = _interopRequireDefault(__webpack_require__(/*! chalk */ "./node_modules/@linaria/server/node_modules/chalk/index.js"));

var _terminalHighlight = _interopRequireDefault(__webpack_require__(/*! ./terminal-highlight */ "./node_modules/@linaria/server/node_modules/postcss/lib/terminal-highlight.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * The CSS parser throws this error for broken CSS.
 *
 * Custom parsers can throw this error for broken custom syntax using
 * the {@link Node#error} method.
 *
 * PostCSS will use the input source map to detect the original error location.
 * If you wrote a Sass file, compiled it to CSS and then parsed it with PostCSS,
 * PostCSS will show the original position in the Sass file.
 *
 * If you need the position in the PostCSS input
 * (e.g., to debug the previous compiler), use `error.input.file`.
 *
 * @example
 * // Catching and checking syntax error
 * try {
 *   postcss.parse('a{')
 * } catch (error) {
 *   if (error.name === 'CssSyntaxError') {
 *     error //=> CssSyntaxError
 *   }
 * }
 *
 * @example
 * // Raising error from plugin
 * throw node.error('Unknown variable', { plugin: 'postcss-vars' })
 */
var CssSyntaxError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(CssSyntaxError, _Error);

  /**
   * @param {string} message  Error message.
   * @param {number} [line]   Source line of the error.
   * @param {number} [column] Source column of the error.
   * @param {string} [source] Source code of the broken file.
   * @param {string} [file]   Absolute path to the broken file.
   * @param {string} [plugin] PostCSS plugin name, if error came from plugin.
   */
  function CssSyntaxError(message, line, column, source, file, plugin) {
    var _this;

    _this = _Error.call(this, message) || this;
    /**
     * Always equal to `'CssSyntaxError'`. You should always check error type
     * by `error.name === 'CssSyntaxError'`
     * instead of `error instanceof CssSyntaxError`,
     * because npm could have several PostCSS versions.
     *
     * @type {string}
     *
     * @example
     * if (error.name === 'CssSyntaxError') {
     *   error //=> CssSyntaxError
     * }
     */

    _this.name = 'CssSyntaxError';
    /**
     * Error message.
     *
     * @type {string}
     *
     * @example
     * error.message //=> 'Unclosed block'
     */

    _this.reason = message;

    if (file) {
      /**
       * Absolute path to the broken file.
       *
       * @type {string}
       *
       * @example
       * error.file       //=> 'a.sass'
       * error.input.file //=> 'a.css'
       */
      _this.file = file;
    }

    if (source) {
      /**
       * Source code of the broken file.
       *
       * @type {string}
       *
       * @example
       * error.source       //=> 'a { b {} }'
       * error.input.column //=> 'a b { }'
       */
      _this.source = source;
    }

    if (plugin) {
      /**
       * Plugin name, if error came from plugin.
       *
       * @type {string}
       *
       * @example
       * error.plugin //=> 'postcss-vars'
       */
      _this.plugin = plugin;
    }

    if (typeof line !== 'undefined' && typeof column !== 'undefined') {
      /**
       * Source line of the error.
       *
       * @type {number}
       *
       * @example
       * error.line       //=> 2
       * error.input.line //=> 4
       */
      _this.line = line;
      /**
       * Source column of the error.
       *
       * @type {number}
       *
       * @example
       * error.column       //=> 1
       * error.input.column //=> 4
       */

      _this.column = column;
    }

    _this.setMessage();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_this), CssSyntaxError);
    }

    return _this;
  }

  var _proto = CssSyntaxError.prototype;

  _proto.setMessage = function setMessage() {
    /**
     * Full error text in the GNU error format
     * with plugin, file, line and column.
     *
     * @type {string}
     *
     * @example
     * error.message //=> 'a.css:1:1: Unclosed block'
     */
    this.message = this.plugin ? this.plugin + ': ' : '';
    this.message += this.file ? this.file : '<css input>';

    if (typeof this.line !== 'undefined') {
      this.message += ':' + this.line + ':' + this.column;
    }

    this.message += ': ' + this.reason;
  }
  /**
   * Returns a few lines of CSS source that caused the error.
   *
   * If the CSS has an input source map without `sourceContent`,
   * this method will return an empty string.
   *
   * @param {boolean} [color] Whether arrow will be colored red by terminal
   *                          color codes. By default, PostCSS will detect
   *                          color support by `process.stdout.isTTY`
   *                          and `process.env.NODE_DISABLE_COLORS`.
   *
   * @example
   * error.showSourceCode() //=> "  4 | }
   *                        //      5 | a {
   *                        //    > 6 |   bad
   *                        //        |   ^
   *                        //      7 | }
   *                        //      8 | b {"
   *
   * @return {string} Few lines of CSS source that caused the error.
   */
  ;

  _proto.showSourceCode = function showSourceCode(color) {
    var _this2 = this;

    if (!this.source) return '';
    var css = this.source;

    if (_terminalHighlight.default) {
      if (typeof color === 'undefined') color = _supportsColor.default.stdout;
      if (color) css = (0, _terminalHighlight.default)(css);
    }

    var lines = css.split(/\r?\n/);
    var start = Math.max(this.line - 3, 0);
    var end = Math.min(this.line + 2, lines.length);
    var maxWidth = String(end).length;

    function mark(text) {
      if (color && _chalk.default.red) {
        return _chalk.default.red.bold(text);
      }

      return text;
    }

    function aside(text) {
      if (color && _chalk.default.gray) {
        return _chalk.default.gray(text);
      }

      return text;
    }

    return lines.slice(start, end).map(function (line, index) {
      var number = start + 1 + index;
      var gutter = ' ' + (' ' + number).slice(-maxWidth) + ' | ';

      if (number === _this2.line) {
        var spacing = aside(gutter.replace(/\d/g, ' ')) + line.slice(0, _this2.column - 1).replace(/[^\t]/g, ' ');
        return mark('>') + aside(gutter) + line + '\n ' + spacing + mark('^');
      }

      return ' ' + aside(gutter) + line;
    }).join('\n');
  }
  /**
   * Returns error position, message and source code of the broken part.
   *
   * @example
   * error.toString() //=> "CssSyntaxError: app.css:1:1: Unclosed block
   *                  //    > 1 | a {
   *                  //        | ^"
   *
   * @return {string} Error position, message and source code.
   */
  ;

  _proto.toString = function toString() {
    var code = this.showSourceCode();

    if (code) {
      code = '\n\n' + code + '\n';
    }

    return this.name + ': ' + this.message + code;
  }
  /**
   * @memberof CssSyntaxError#
   * @member {Input} input Input object with PostCSS internal information
   *                       about input file. If input has source map
   *                       from previous tool, PostCSS will use origin
   *                       (for example, Sass) source. You can use this
   *                       object to get PostCSS input source.
   *
   * @example
   * error.input.file //=> 'a.css'
   * error.file       //=> 'a.sass'
   */
  ;

  return CssSyntaxError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var _default = CssSyntaxError;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNzcy1zeW50YXgtZXJyb3IuZXM2Il0sIm5hbWVzIjpbIkNzc1N5bnRheEVycm9yIiwibWVzc2FnZSIsImxpbmUiLCJjb2x1bW4iLCJzb3VyY2UiLCJmaWxlIiwicGx1Z2luIiwibmFtZSIsInJlYXNvbiIsInNldE1lc3NhZ2UiLCJFcnJvciIsImNhcHR1cmVTdGFja1RyYWNlIiwic2hvd1NvdXJjZUNvZGUiLCJjb2xvciIsImNzcyIsInRlcm1pbmFsSGlnaGxpZ2h0Iiwic3VwcG9ydHNDb2xvciIsInN0ZG91dCIsImxpbmVzIiwic3BsaXQiLCJzdGFydCIsIk1hdGgiLCJtYXgiLCJlbmQiLCJtaW4iLCJsZW5ndGgiLCJtYXhXaWR0aCIsIlN0cmluZyIsIm1hcmsiLCJ0ZXh0IiwiY2hhbGsiLCJyZWQiLCJib2xkIiwiYXNpZGUiLCJncmF5Iiwic2xpY2UiLCJtYXAiLCJpbmRleCIsIm51bWJlciIsImd1dHRlciIsInNwYWNpbmciLCJyZXBsYWNlIiwiam9pbiIsInRvU3RyaW5nIiwiY29kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMkJNQSxjOzs7QUFDSjs7Ozs7Ozs7QUFRQSwwQkFBYUMsT0FBYixFQUFzQkMsSUFBdEIsRUFBNEJDLE1BQTVCLEVBQW9DQyxNQUFwQyxFQUE0Q0MsSUFBNUMsRUFBa0RDLE1BQWxELEVBQTBEO0FBQUE7O0FBQ3hELDhCQUFNTCxPQUFOO0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBYUEsVUFBS00sSUFBTCxHQUFZLGdCQUFaO0FBQ0E7Ozs7Ozs7OztBQVFBLFVBQUtDLE1BQUwsR0FBY1AsT0FBZDs7QUFFQSxRQUFJSSxJQUFKLEVBQVU7QUFDUjs7Ozs7Ozs7O0FBU0EsWUFBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0Q7O0FBQ0QsUUFBSUQsTUFBSixFQUFZO0FBQ1Y7Ozs7Ozs7OztBQVNBLFlBQUtBLE1BQUwsR0FBY0Es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QUFDQSxVQUFJWSxNQUFNLEtBQUssTUFBSSxDQUFDcEMsSUFBcEIsRUFBMEI7QUFDeEIsWUFBSXNDLE9BQU8sR0FBR1AsS0FBSyxDQUFDTSxNQUFNLENBQUNFLE9BQVAsQ0FBZSxLQUFmLEVBQXNCLEdBQXRCLENBQUQsQ0FBTCxHQUNadkMsSUFBSSxDQUFDaUMsS0FBTCxDQUFXLENBQVgsRUFBYyxNQUFJLENBQUNoQyxNQUFMLEdBQWMsQ0FBNUIsRUFBK0JzQyxPQUEvQixDQUF1QyxRQUF2QyxFQUFpRCxHQUFqRCxDQURGO0FBRUEsZUFBT2IsSUFBSSxDQUFDLEdBQUQsQ0FBSixHQUFZSyxLQUFLLENBQUNNLE1BQUQsQ0FBakIsR0FBNEJyQyxJQUE1QixHQUFtQyxLQUFuQyxHQUEyQ3NDLE9BQTNDLEdBQXFEWixJQUFJLENBQUMsR0FBRCxDQUFoRTtBQUNEOztBQUNELGFBQU8sTUFBTUssS0FBSyxDQUFDTSxNQUFELENBQVgsR0FBc0JyQyxJQUE3QjtBQUNELEtBVE0sRUFTSndDLElBVEksQ0FTQyxJQVRELENBQVA7QUFVRDtBQUVEOzs7Ozs7Ozs7Ozs7U0FVQUMsUSxHQUFBLG9CQUFZO0FBQ1YsUUFBSUMsSUFBSSxHQUFHLEtBQUtoQyxjQUFMLEVBQVg7O0FBQ0EsUUFBSWdDLElBQUosRUFBVTtBQUNSQSxNQUFBQSxJQUFJLEdBQUcsU0FBU0EsSUFBVCxHQUFnQixJQUF2QjtBQUNEOztBQUNELFdBQU8sS0FBS3JDLElBQUwsR0FBWSxJQUFaLEdBQW1CLEtBQUtOLE9BQXhCLEdBQWtDMkMsSUFBekM7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7aUNBdE0yQmxDLEs7O2VBb05kVixjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN1cHBvcnRzQ29sb3IgZnJvbSAnc3VwcG9ydHMtY29sb3InXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5cbmltcG9ydCB0ZXJtaW5hbEhpZ2hsaWdodCBmcm9tICcuL3Rlcm1pbmFsLWhpZ2hsaWdodCdcblxuLyoqXG4gKiBUaGUgQ1NTIHBhcnNlciB0aHJvd3MgdGhpcyBlcnJvciBmb3IgYnJva2VuIENTUy5cbiAqXG4gKiBDdXN0b20gcGFyc2VycyBjYW4gdGhyb3cgdGhpcyBlcnJvciBmb3IgYnJva2VuIGN1c3RvbSBzeW50YXggdXNpbmdcbiAqIHRoZSB7QGxpbmsgTm9kZSNlcnJvcn0gbWV0aG9kLlxuICpcbiAqIFBvc3RDU1Mgd2lsbCB1c2UgdGhlIGlucHV0IHNvdXJjZSBtYXAgdG8gZGV0ZWN0IHRoZSBvcmlnaW5hbCBlcnJvciBsb2NhdGlvbi5cbiAqIElmIHlvdSB3cm90ZSBhIFNhc3MgZmlsZSwgY29tcGlsZWQgaXQgdG8gQ1NTIGFuZCB0aGVuIHBhcnNlZCBpdCB3aXRoIFBvc3RDU1MsXG4gKiBQb3N0Q1NTIHdpbGwgc2hvdyB0aGUgb3JpZ2luYWwgcG9zaXRpb24gaW4gdGhlIFNhc3MgZmlsZS5cbiAqXG4gKiBJZiB5b3UgbmVlZCB0aGUgcG9zaXRpb24gaW4gdGhlIFBvc3RDU1MgaW5wdXRcbiAqIChlLmcuLCB0byBkZWJ1ZyB0aGUgcHJldmlvdXMgY29tcGlsZXIpLCB1c2UgYGVycm9yLmlucHV0LmZpbGVgLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDYXRjaGluZyBhbmQgY2hlY2tpbmcgc3ludGF4IGVycm9yXG4gKiB0cnkge1xuICogICBwb3N0Y3NzLnBhcnNlKCdheycpXG4gKiB9IGNhdGNoIChlcnJvcikge1xuICogICBpZiAoZXJyb3IubmFtZSA9PT0gJ0Nzc1N5bnRheEVycm9yJykge1xuICogICAgIGVycm9yIC8vPT4gQ3NzU3ludGF4RXJyb3JcbiAqICAgfVxuICogfVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBSYWlzaW5nIGVycm9yIGZyb20gcGx1Z2luXG4gKiB0aHJvdyBub2RlLmVycm9yKCdVbmtub3duIHZhcmlhYmxlJywgeyBwbHVnaW46ICdwb3N0Y3NzLXZhcnMnIH0pXG4gKi9cbmNsYXNzIENzc1N5bnRheEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgIEVycm9yIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGluZV0gICBTb3VyY2UgbGluZSBvZiB0aGUgZXJyb3IuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbY29sdW1uXSBTb3VyY2UgY29sdW1uIG9mIHRoZSBlcnJvci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtzb3VyY2VdIFNvdXJjZSBjb2RlIG9mIHRoZSBicm9rZW4gZmlsZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtmaWxlXSAgIEFic29sdXRlIHBhdGggdG8gdGhlIGJyb2tlbiBmaWxlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3BsdWdpbl0gUG9zdENTUyBwbHVnaW4gbmFtZSwgaWYgZXJyb3IgY2FtZSBmcm9tIHBsdWdpbi5cbiAgICovXG4gIGNvbnN0cnVjdG9yIChtZXNzYWdlLCBsaW5lLCBjb2x1bW4sIHNvdXJjZSwgZmlsZSwgcGx1Z2luKSB7XG4gICAgc3VwZXIobWVzc2FnZSlcblxuICAgIC8qKlxuICAgICAqIEFsd2F5cyBlcXVhbCB0byBgJ0Nzc1N5bnRheEVycm9yJ2AuIFlvdSBzaG91bGQgYWx3YXlzIGNoZWNrIGVycm9yIHR5cGVcbiAgICAgKiBieSBgZXJyb3IubmFtZSA9PT0gJ0Nzc1N5bnRheEVycm9yJ2BcbiAgICAgKiBpbnN0ZWFkIG9mIGBlcnJvciBpbnN0YW5jZW9mIENzc1N5bnRheEVycm9yYCxcbiAgICAgKiBiZWNhdXNlIG5wbSBjb3VsZCBoYXZlIHNldmVyYWwgUG9zdENTUyB2ZXJzaW9ucy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGlmIChlcnJvci5uYW1lID09PSAnQ3NzU3ludGF4RXJyb3InKSB7XG4gICAgICogICBlcnJvciAvLz0+IENzc1N5bnRheEVycm9yXG4gICAgICogfVxuICAgICAqL1xuICAgIHRoaXMubmFtZSA9ICdDc3NTeW50YXhFcnJvcidcbiAgICAvKipcbiAgICAgKiBFcnJvciBtZXNzYWdlLlxuICAgICAqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogZXJyb3IubWVzc2FnZSAvLz0+ICdVbmNsb3NlZCBibG9jaydcbiAgICAgKi9cbiAgICB0aGlzLnJlYXNvbiA9IG1lc3NhZ2VcblxuICAgIGlmIChmaWxlKSB7XG4gICAgICAvKipcbiAgICAgICAqIEFic29sdXRlIHBhdGggdG8gdGhlIGJyb2tlbiBmaWxlLlxuICAgICAgICpcbiAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgKlxuICAgICAgICogQGV4YW1wbGVcbiAgICAgICAqIGVycm9yLmZpbGUgICAgICAgLy89PiAnYS5zYXNzJ1xuICAgICAgICogZXJyb3IuaW5wdXQuZmlsZSAvLz0+ICdhLmNzcydcbiAgICAgICAqL1xuICAgICAgdGhpcy5maWxlID0gZmlsZVxuICAgIH1cbiAgICBpZiAoc291cmNlKSB7XG4gICAgICAvKipcbiAgICAgICAqIFNvdXJjZSBjb2RlIG9mIHRoZSBicm9rZW4gZmlsZS5cbiAgICAgICAqXG4gICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICpcbiAgICAgICAqIEBleGFtcGxlXG4gICAgICAgKiBlcnJvci5zb3VyY2UgICAgICAgLy89PiAnYSB7IGIge30gfSdcbiAgICAgICAqIGVycm9yLmlucHV0LmNvbHVtbiAvLz0+ICdhIGIgeyB9J1xuICAgICAgICovXG4gICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxuICAgIH1cbiAgICBpZiAocGx1Z2luKSB7XG4gICAgICAvKipcbiAgICAgICAqIFBsdWdpbiBuYW1lLCBpZiBlcnJvciBjYW1lIGZyb20gcGx1Z2luLlxuICAgICAgICpcbiAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgKlxuICAgICAgICogQGV4YW1wbGVcbiAgICAgICAqIGVycm9yLnBsdWdpbiAvLz0+ICdwb3N0Y3NzLXZhcnMnXG4gICAgICAgKi9cbiAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luXG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbHVtbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8qKlxuICAgICAgICogU291cmNlIGxpbmUgb2YgdGhlIGVycm9yLlxuICAgICAgICpcbiAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgKlxuICAgICAgICogQGV4YW1wbGVcbiAgICAgICAqIGVycm9yLmxpbmUgICAgICAgLy89PiAyXG4gICAgICAgKiBlcnJvci5pbnB1dC5saW5lIC8vPT4gNFxuICAgICAgICovXG4gICAgICB0aGlzLmxpbmUgPSBsaW5lXG4gICAgICAvKipcbiAgICAgICAqIFNvdXJjZSBjb2x1bW4gb2YgdGhlIGVycm9yLlxuICAgICAgICpcbiAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgKlxuICAgICAgICogQGV4YW1wbGVcbiAgICAgICAqIGVycm9yLmNvbHVtbiAgICAgICAvLz0+IDFcbiAgICAgICAqIGVycm9yLmlucHV0LmNvbHVtbiAvLz0+IDRcbiAgICAgICAqL1xuICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW5cbiAgICB9XG5cbiAgICB0aGlzLnNldE1lc3NhZ2UoKVxuXG4gICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBDc3NTeW50YXhFcnJvcilcbiAgICB9XG4gIH1cblxuICBzZXRNZXNzYWdlICgpIHtcbiAgICAvKipcbiAgICAgKiBGdWxsIGVycm9yIHRleHQgaW4gdGhlIEdOVSBlcnJvciBmb3JtYXRcbiAgICAgKiB3aXRoIHBsdWdpbiwgZmlsZSwgbGluZSBhbmQgY29sdW1uLlxuICAgICAqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogZXJyb3IubWVzc2FnZSAvLz0+ICdhLmNzczoxOjE6IFVuY2xvc2VkIGJsb2NrJ1xuICAgICAqL1xuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMucGx1Z2luID8gdGhpcy5wbHVnaW4gKyAnOiAnIDogJydcbiAgICB0aGlzLm1lc3NhZ2UgKz0gdGhpcy5maWxlID8gdGhpcy5maWxlIDogJzxjc3MgaW5wdXQ+J1xuICAgIGlmICh0eXBlb2YgdGhpcy5saW5lICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5tZXNzYWdlICs9ICc6JyArIHRoaXMubGluZSArICc6JyArIHRoaXMuY29sdW1uXG4gICAgfVxuICAgIHRoaXMubWVzc2FnZSArPSAnOiAnICsgdGhpcy5yZWFzb25cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgZmV3IGxpbmVzIG9mIENTUyBzb3VyY2UgdGhhdCBjYXVzZWQgdGhlIGVycm9yLlxuICAgKlxuICAgKiBJZiB0aGUgQ1NTIGhhcyBhbiBpbnB1dCBzb3VyY2UgbWFwIHdpdGhvdXQgYHNvdXJjZUNvbnRlbnRgLFxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHJldHVybiBhbiBlbXB0eSBzdHJpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NvbG9yXSBXaGV0aGVyIGFycm93IHdpbGwgYmUgY29sb3JlZCByZWQgYnkgdGVybWluYWxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yIGNvZGVzLiBCeSBkZWZhdWx0LCBQb3N0Q1NTIHdpbGwgZGV0ZWN0XG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvciBzdXBwb3J0IGJ5IGBwcm9jZXNzLnN0ZG91dC5pc1RUWWBcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBgcHJvY2Vzcy5lbnYuTk9ERV9ESVNBQkxFX0NPTE9SU2AuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGVycm9yLnNob3dTb3VyY2VDb2RlKCkgLy89PiBcIiAgNCB8IH1cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgIDUgfCBhIHtcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAvLyAgICA+IDYgfCAgIGJhZFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB8ICAgXlxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgNyB8IH1cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgIDggfCBiIHtcIlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IEZldyBsaW5lcyBvZiBDU1Mgc291cmNlIHRoYXQgY2F1c2VkIHRoZSBlcnJvci5cbiAgICovXG4gIHNob3dTb3VyY2VDb2RlIChjb2xvcikge1xuICAgIGlmICghdGhpcy5zb3VyY2UpIHJldHVybiAnJ1xuXG4gICAgbGV0IGNzcyA9IHRoaXMuc291cmNlXG4gICAgaWYgKHRlcm1pbmFsSGlnaGxpZ2h0KSB7XG4gICAgICBpZiAodHlwZW9mIGNvbG9yID09PSAndW5kZWZpbmVkJykgY29sb3IgPSBzdXBwb3J0c0NvbG9yLnN0ZG91dFxuICAgICAgaWYgKGNvbG9yKSBjc3MgPSB0ZXJtaW5hbEhpZ2hsaWdodChjc3MpXG4gICAgfVxuXG4gICAgbGV0IGxpbmVzID0gY3NzLnNwbGl0KC9cXHI/XFxuLylcbiAgICBsZXQgc3RhcnQgPSBNYXRoLm1heCh0aGlzLmxpbmUgLSAzLCAwKVxuICAgIGxldCBlbmQgPSBNYXRoLm1pbih0aGlzLmxpbmUgKyAyLCBsaW5lcy5sZW5ndGgpXG5cbiAgICBsZXQgbWF4V2lkdGggPSBTdHJpbmcoZW5kKS5sZW5ndGhcblxuICAgIGZ1bmN0aW9uIG1hcmsgKHRleHQpIHtcbiAgICAgIGlmIChjb2xvciAmJiBjaGFsay5yZWQpIHtcbiAgICAgICAgcmV0dXJuIGNoYWxrLnJlZC5ib2xkKHRleHQpXG4gICAgICB9XG4gICAgICByZXR1cm4gdGV4dFxuICAgIH1cbiAgICBmdW5jdGlvbiBhc2lkZSAodGV4dCkge1xuICAgICAgaWYgKGNvbG9yICYmIGNoYWxrLmdyYXkpIHtcbiAgICAgICAgcmV0dXJuIGNoYWxrLmdyYXkodGV4dClcbiAgICAgIH1cbiAgICAgIHJldHVybiB0ZXh0XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcCgobGluZSwgaW5kZXgpID0+IHtcbiAgICAgIGxldCBudW1iZXIgPSBzdGFydCArIDEgKyBpbmRleFxuICAgICAgbGV0IGd1dHRlciA9ICcgJyArICgnICcgKyBudW1iZXIpLnNsaWNlKC1tYXhXaWR0aCkgKyAnIHwgJ1xuICAgICAgaWYgKG51bWJlciA9PT0gdGhpcy5saW5lKSB7XG4gICAgICAgIGxldCBzcGFjaW5nID0gYXNpZGUoZ3V0dGVyLnJlcGxhY2UoL1xcZC9nLCAnICcpKSArXG4gICAgICAgICAgbGluZS5zbGljZSgwLCB0aGlzLmNvbHVtbiAtIDEpLnJlcGxhY2UoL1teXFx0XS9nLCAnICcpXG4gICAgICAgIHJldHVybiBtYXJrKCc+JykgKyBhc2lkZShndXR0ZXIpICsgbGluZSArICdcXG4gJyArIHNwYWNpbmcgKyBtYXJrKCdeJylcbiAgICAgIH1cbiAgICAgIHJldHVybiAnICcgKyBhc2lkZShndXR0ZXIpICsgbGluZVxuICAgIH0pLmpvaW4oJ1xcbicpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBlcnJvciBwb3NpdGlvbiwgbWVzc2FnZSBhbmQgc291cmNlIGNvZGUgb2YgdGhlIGJyb2tlbiBwYXJ0LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBlcnJvci50b1N0cmluZygpIC8vPT4gXCJDc3NTeW50YXhFcnJvcjogYXBwLmNzczoxOjE6IFVuY2xvc2VkIGJsb2NrXG4gICAqICAgICAgICAgICAgICAgICAgLy8gICAgPiAxIHwgYSB7XG4gICAqICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHwgXlwiXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gRXJyb3IgcG9zaXRpb24sIG1lc3NhZ2UgYW5kIHNvdXJjZSBjb2RlLlxuICAgKi9cbiAgdG9TdHJpbmcgKCkge1xuICAgIGxldCBjb2RlID0gdGhpcy5zaG93U291cmNlQ29kZSgpXG4gICAgaWYgKGNvZGUpIHtcbiAgICAgIGNvZGUgPSAnXFxuXFxuJyArIGNvZGUgKyAnXFxuJ1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5uYW1lICsgJzogJyArIHRoaXMubWVzc2FnZSArIGNvZGVcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgQ3NzU3ludGF4RXJyb3IjXG4gICAqIEBtZW1iZXIge0lucHV0fSBpbnB1dCBJbnB1dCBvYmplY3Qgd2l0aCBQb3N0Q1NTIGludGVybmFsIGluZm9ybWF0aW9uXG4gICAqICAgICAgICAgICAgICAgICAgICAgICBhYm91dCBpbnB1dCBmaWxlLiBJZiBpbnB1dCBoYXMgc291cmNlIG1hcFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBwcmV2aW91cyB0b29sLCBQb3N0Q1NTIHdpbGwgdXNlIG9yaWdpblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgKGZvciBleGFtcGxlLCBTYXNzKSBzb3VyY2UuIFlvdSBjYW4gdXNlIHRoaXNcbiAgICogICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCB0byBnZXQgUG9zdENTUyBpbnB1dCBzb3VyY2UuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGVycm9yLmlucHV0LmZpbGUgLy89PiAnYS5jc3MnXG4gICAqIGVycm9yLmZpbGUgICAgICAgLy89PiAnYS5zYXNzJ1xuICAgKi9cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ3NzU3ludGF4RXJyb3JcbiJdLCJmaWxlIjoiY3NzLXN5bnRheC1lcnJvci5qcyJ9


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/declaration.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/declaration.js ***!
  \******************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _node = _interopRequireDefault(__webpack_require__(/*! ./node */ "./node_modules/@linaria/server/node_modules/postcss/lib/node.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Represents a CSS declaration.
 *
 * @extends Node
 *
 * @example
 * const root = postcss.parse('a { color: black }')
 * const decl = root.first.first
 * decl.type       //=> 'decl'
 * decl.toString() //=> ' color: black'
 */
var Declaration = /*#__PURE__*/function (_Node) {
  _inheritsLoose(Declaration, _Node);

  function Declaration(defaults) {
    var _this;

    _this = _Node.call(this, defaults) || this;
    _this.type = 'decl';
    return _this;
  }
  /**
   * @memberof Declaration#
   * @member {string} prop The declaration’s property name.
   *
   * @example
   * const root = postcss.parse('a { color: black }')
   * const decl = root.first.first
   * decl.prop //=> 'color'
   */

  /**
   * @memberof Declaration#
   * @member {string} value The declaration’s value.
   *
   * @example
   * const root = postcss.parse('a { color: black }')
   * const decl = root.first.first
   * decl.value //=> 'black'
   */

  /**
   * @memberof Declaration#
   * @member {boolean} important `true` if the declaration
   *                             has an !important annotation.
   *
   * @example
   * const root = postcss.parse('a { color: black !important; color: red }')
   * root.first.first.important //=> true
   * root.first.last.important  //=> undefined
   */

  /**
   * @memberof Declaration#
   * @member {object} raws Information to generate byte-to-byte equal
   *                       node string as it was in the origin input.
   *
   * Every parser saves its own properties,
   * but the default CSS parser uses:
   *
   * * `before`: the space symbols before the node. It also stores `*`
   *   and `_` symbols before the declaration (IE hack).
   * * `between`: the symbols between the property and value
   *   for declarations.
   * * `important`: the content of the important statement,
   *   if it is not just `!important`.
   *
   * PostCSS cleans declaration from comments and extra spaces,
   * but it stores origin content in raws properties.
   * As such, if you don’t change a declaration’s value,
   * PostCSS will use the raw value with comments.
   *
   * @example
   * const root = postcss.parse('a {\n  color:black\n}')
   * root.first.first.raws //=> { before: '\n  ', between: ':' }
   */


  return Declaration;
}(_node.default);

var _default = Declaration;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlY2xhcmF0aW9uLmVzNiJdLCJuYW1lcyI6WyJEZWNsYXJhdGlvbiIsImRlZmF1bHRzIiwidHlwZSIsIk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7OztBQUVBOzs7Ozs7Ozs7OztJQVdNQSxXOzs7QUFDSix1QkFBYUMsUUFBYixFQUF1QjtBQUFBOztBQUNyQiw2QkFBTUEsUUFBTjtBQUNBLFVBQUtDLElBQUwsR0FBWSxNQUFaO0FBRnFCO0FBR3RCO0FBRUQ7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFyQ3dCQyxhOztlQStEWEgsVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOb2RlIGZyb20gJy4vbm9kZSdcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgQ1NTIGRlY2xhcmF0aW9uLlxuICpcbiAqIEBleHRlbmRzIE5vZGVcbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJ2EgeyBjb2xvcjogYmxhY2sgfScpXG4gKiBjb25zdCBkZWNsID0gcm9vdC5maXJzdC5maXJzdFxuICogZGVjbC50eXBlICAgICAgIC8vPT4gJ2RlY2wnXG4gKiBkZWNsLnRvU3RyaW5nKCkgLy89PiAnIGNvbG9yOiBibGFjaydcbiAqL1xuY2xhc3MgRGVjbGFyYXRpb24gZXh0ZW5kcyBOb2RlIHtcbiAgY29uc3RydWN0b3IgKGRlZmF1bHRzKSB7XG4gICAgc3VwZXIoZGVmYXVsdHMpXG4gICAgdGhpcy50eXBlID0gJ2RlY2wnXG4gIH1cblxuICAvKipcbiAgICogQG1lbWJlcm9mIERlY2xhcmF0aW9uI1xuICAgKiBAbWVtYmVyIHtzdHJpbmd9IHByb3AgVGhlIGRlY2xhcmF0aW9u4oCZcyBwcm9wZXJ0eSBuYW1lLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSB7IGNvbG9yOiBibGFjayB9JylcbiAgICogY29uc3QgZGVjbCA9IHJvb3QuZmlyc3QuZmlyc3RcbiAgICogZGVjbC5wcm9wIC8vPT4gJ2NvbG9yJ1xuICAgKi9cblxuICAvKipcbiAgICogQG1lbWJlcm9mIERlY2xhcmF0aW9uI1xuICAgKiBAbWVtYmVyIHtzdHJpbmd9IHZhbHVlIFRoZSBkZWNsYXJhdGlvbuKAmXMgdmFsdWUuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKCdhIHsgY29sb3I6IGJsYWNrIH0nKVxuICAgKiBjb25zdCBkZWNsID0gcm9vdC5maXJzdC5maXJzdFxuICAgKiBkZWNsLnZhbHVlIC8vPT4gJ2JsYWNrJ1xuICAgKi9cblxuICAvKipcbiAgICogQG1lbWJlcm9mIERlY2xhcmF0aW9uI1xuICAgKiBAbWVtYmVyIHtib29sZWFufSBpbXBvcnRhbnQgYHRydWVgIGlmIHRoZSBkZWNsYXJhdGlvblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzIGFuICFpbXBvcnRhbnQgYW5ub3RhdGlvbi5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJ2EgeyBjb2xvcjogYmxhY2sgIWltcG9ydGFudDsgY29sb3I6IHJlZCB9JylcbiAgICogcm9vdC5maXJzdC5maXJzdC5pbXBvcnRhbnQgLy89PiB0cnVlXG4gICAqIHJvb3QuZmlyc3QubGFzdC5pbXBvcnRhbnQgIC8vPT4gdW5kZWZpbmVkXG4gICAqL1xuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgRGVjbGFyYXRpb24jXG4gICAqIEBtZW1iZXIge29iamVjdH0gcmF3cyBJbmZvcm1hdGlvbiB0byBnZW5lcmF0ZSBieXRlLXRvLWJ5dGUgZXF1YWxcbiAgICogICAgICAgICAgICAgICAgICAgICAgIG5vZGUgc3RyaW5nIGFzIGl0IHdhcyBpbiB0aGUgb3JpZ2luIGlucHV0LlxuICAgKlxuICAgKiBFdmVyeSBwYXJzZXIgc2F2ZXMgaXRzIG93biBwcm9wZXJ0aWVzLFxuICAgKiBidXQgdGhlIGRlZmF1bHQgQ1NTIHBhcnNlciB1c2VzOlxuICAgKlxuICAgKiAqIGBiZWZvcmVgOiB0aGUgc3BhY2Ugc3ltYm9scyBiZWZvcmUgdGhlIG5vZGUuIEl0IGFsc28gc3RvcmVzIGAqYFxuICAgKiAgIGFuZCBgX2Agc3ltYm9scyBiZWZvcmUgdGhlIGRlY2xhcmF0aW9uIChJRSBoYWNrKS5cbiAgICogKiBgYmV0d2VlbmA6IHRoZSBzeW1ib2xzIGJldHdlZW4gdGhlIHByb3BlcnR5IGFuZCB2YWx1ZVxuICAgKiAgIGZvciBkZWNsYXJhdGlvbnMuXG4gICAqICogYGltcG9ydGFudGA6IHRoZSBjb250ZW50IG9mIHRoZSBpbXBvcnRhbnQgc3RhdGVtZW50LFxuICAgKiAgIGlmIGl0IGlzIG5vdCBqdXN0IGAhaW1wb3J0YW50YC5cbiAgICpcbiAgICogUG9zdENTUyBjbGVhbnMgZGVjbGFyYXRpb24gZnJvbSBjb21tZW50cyBhbmQgZXh0cmEgc3BhY2VzLFxuICAgKiBidXQgaXQgc3RvcmVzIG9yaWdpbiBjb250ZW50IGluIHJhd3MgcHJvcGVydGllcy5cbiAgICogQXMgc3VjaCwgaWYgeW91IGRvbuKAmXQgY2hhbmdlIGEgZGVjbGFyYXRpb27igJlzIHZhbHVlLFxuICAgKiBQb3N0Q1NTIHdpbGwgdXNlIHRoZSByYXcgdmFsdWUgd2l0aCBjb21tZW50cy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJ2Ege1xcbiAgY29sb3I6YmxhY2tcXG59JylcbiAgICogcm9vdC5maXJzdC5maXJzdC5yYXdzIC8vPT4geyBiZWZvcmU6ICdcXG4gICcsIGJldHdlZW46ICc6JyB9XG4gICAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBEZWNsYXJhdGlvblxuIl0sImZpbGUiOiJkZWNsYXJhdGlvbi5qcyJ9


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/input.js":
/*!************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/input.js ***!
  \************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _path = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

var _cssSyntaxError = _interopRequireDefault(__webpack_require__(/*! ./css-syntax-error */ "./node_modules/@linaria/server/node_modules/postcss/lib/css-syntax-error.js"));

var _previousMap = _interopRequireDefault(__webpack_require__(/*! ./previous-map */ "./node_modules/@linaria/server/node_modules/postcss/lib/previous-map.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sequence = 0;
/**
 * Represents the source CSS.
 *
 * @example
 * const root  = postcss.parse(css, { from: file })
 * const input = root.source.input
 */

var Input = /*#__PURE__*/function () {
  /**
   * @param {string} css    Input CSS source.
   * @param {object} [opts] {@link Processor#process} options.
   */
  function Input(css, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (css === null || typeof css === 'undefined' || typeof css === 'object' && !css.toString) {
      throw new Error("PostCSS received " + css + " instead of CSS string");
    }
    /**
     * Input CSS source
     *
     * @type {string}
     *
     * @example
     * const input = postcss.parse('a{}', { from: file }).input
     * input.css //=> "a{}"
     */


    this.css = css.toString();

    if (this.css[0] === "\uFEFF" || this.css[0] === "\uFFFE") {
      this.hasBOM = true;
      this.css = this.css.slice(1);
    } else {
      this.hasBOM = false;
    }

    if (opts.from) {
      if (/^\w+:\/\//.test(opts.from) || _path.default.isAbsolute(opts.from)) {
        /**
         * The absolute path to the CSS source file defined
         * with the `from` option.
         *
         * @type {string}
         *
         * @example
         * const root = postcss.parse(css, { from: 'a.css' })
         * root.source.input.file //=> '/home/ai/a.css'
         */
        this.file = opts.from;
      } else {
        this.file = _path.default.resolve(opts.from);
      }
    }

    var map = new _previousMap.default(this.css, opts);

    if (map.text) {
      /**
       * The input source map passed from a compilation step before PostCSS
       * (for example, from Sass compiler).
       *
       * @type {PreviousMap}
       *
       * @example
       * root.source.input.map.consumer().sources //=> ['a.sass']
       */
      this.map = map;
      var file = map.consumer().file;
      if (!this.file && file) this.file = this.mapResolve(file);
    }

    if (!this.file) {
      sequence += 1;
      /**
       * The unique ID of the CSS source. It will be created if `from` option
       * is not provided (because PostCSS does not know the file path).
       *
       * @type {string}
       *
       * @example
       * const root = postcss.parse(css)
       * root.source.input.file //=> undefined
       * root.source.input.id   //=> "<input css 1>"
       */

      this.id = '<input css ' + sequence + '>';
    }

    if (this.map) this.map.file = this.from;
  }

  var _proto = Input.prototype;

  _proto.error = function error(message, line, column, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var result;
    var origin = this.origin(line, column);

    if (origin) {
      result = new _cssSyntaxError.default(message, origin.line, origin.column, origin.source, origin.file, opts.plugin);
    } else {
      result = new _cssSyntaxError.default(message, line, column, this.css, this.file, opts.plugin);
    }

    result.input = {
      line: line,
      column: column,
      source: this.css
    };
    if (this.file) result.input.file = this.file;
    return result;
  }
  /**
   * Reads the input source map and returns a symbol position
   * in the input source (e.g., in a Sass file that was compiled
   * to CSS before being passed to PostCSS).
   *
   * @param {number} line   Line in input CSS.
   * @param {number} column Column in input CSS.
   *
   * @return {filePosition} Position in input source.
   *
   * @example
   * root.source.input.origin(1, 1) //=> { file: 'a.css', line: 3, column: 1 }
   */
  ;

  _proto.origin = function origin(line, column) {
    if (!this.map) return false;
    var consumer = this.map.consumer();
    var from = consumer.originalPositionFor({
      line: line,
      column: column
    });
    if (!from.source) return false;
    var result = {
      file: this.mapResolve(from.source),
      line: from.line,
      column: from.column
    };
    var source = consumer.sourceContentFor(from.source);
    if (source) result.source = source;
    return result;
  };

  _proto.mapResolve = function mapResolve(file) {
    if (/^\w+:\/\//.test(file)) {
      return file;
    }

    return _path.default.resolve(this.map.consumer().sourceRoot || '.', file);
  }
  /**
   * The CSS source identifier. Contains {@link Input#file} if the user
   * set the `from` option, or {@link Input#id} if they did not.
   *
   * @type {string}
   *
   * @example
   * const root = postcss.parse(css, { from: 'a.css' })
   * root.source.input.from //=> "/home/ai/a.css"
   *
   * const root = postcss.parse(css)
   * root.source.input.from //=> "<input css 1>"
   */
  ;

  _createClass(Input, [{
    key: "from",
    get: function get() {
      return this.file || this.id;
    }
  }]);

  return Input;
}();

var _default = Input;
/**
 * @typedef  {object} filePosition
 * @property {string} file   Path to file.
 * @property {number} line   Source line in file.
 * @property {number} column Source column in file.
 */

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlucHV0LmVzNiJdLCJuYW1lcyI6WyJzZXF1ZW5jZSIsIklucHV0IiwiY3NzIiwib3B0cyIsInRvU3RyaW5nIiwiRXJyb3IiLCJoYXNCT00iLCJzbGljZSIsImZyb20iLCJ0ZXN0IiwicGF0aCIsImlzQWJzb2x1dGUiLCJmaWxlIiwicmVzb2x2ZSIsIm1hcCIsIlByZXZpb3VzTWFwIiwidGV4dCIsImNvbnN1bWVyIiwibWFwUmVzb2x2ZSIsImlkIiwiZXJyb3IiLCJtZXNzYWdlIiwibGluZSIsImNvbHVtbiIsInJlc3VsdCIsIm9yaWdpbiIsIkNzc1N5bnRheEVycm9yIiwic291cmNlIiwicGx1Z2luIiwiaW5wdXQiLCJvcmlnaW5hbFBvc2l0aW9uRm9yIiwic291cmNlQ29udGVudEZvciIsInNvdXJjZVJvb3QiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBSUEsUUFBUSxHQUFHLENBQWY7QUFFQTs7Ozs7Ozs7SUFPTUMsSztBQUNKOzs7O0FBSUEsaUJBQWFDLEdBQWIsRUFBa0JDLElBQWxCLEVBQThCO0FBQUEsUUFBWkEsSUFBWTtBQUFaQSxNQUFBQSxJQUFZLEdBQUwsRUFBSztBQUFBOztBQUM1QixRQUNFRCxHQUFHLEtBQUssSUFBUixJQUNBLE9BQU9BLEdBQVAsS0FBZSxXQURmLElBRUMsT0FBT0EsR0FBUCxLQUFlLFFBQWYsSUFBMkIsQ0FBQ0EsR0FBRyxDQUFDRSxRQUhuQyxFQUlFO0FBQ0EsWUFBTSxJQUFJQyxLQUFKLHVCQUErQkgsR0FBL0IsNEJBQU47QUFDRDtBQUVEOzs7Ozs7Ozs7OztBQVNBLFNBQUtBLEdBQUwsR0FBV0EsR0FBRyxDQUFDRSxRQUFKLEVBQVg7O0FBRUEsUUFBSSxLQUFLRixHQUFMLENBQVMsQ0FBVCxNQUFnQixRQUFoQixJQUE0QixLQUFLQSxHQUFMLENBQVMsQ0FBVCxNQUFnQixRQUFoRCxFQUEwRDtBQUN4RCxXQUFLSSxNQUFMLEdBQWMsSUFBZDtBQUNBLFdBQUtKLEdBQUws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bUJBQVQsQ0FBNkI7QUFBRVIsTUFBQUEsSUFBSSxFQUFKQSxJQUFGO0FBQVFDLE1BQUFBLE1BQU0sRUFBTkE7QUFBUixLQUE3QixDQUFYO0FBQ0EsUUFBSSxDQUFDZixJQUFJLENBQUNtQixNQUFWLEVBQWtCLE9BQU8sS0FBUDtBQUVsQixRQUFJSCxNQUFNLEdBQUc7QUFDWFosTUFBQUEsSUFBSSxFQUFFLEtBQUtNLFVBQUwsQ0FBZ0JWLElBQUksQ0FBQ21CLE1BQXJCLENBREs7QUFFWEwsTUFBQUEsSUFBSSxFQUFFZCxJQUFJLENBQUNjLElBRkE7QUFHWEMsTUFBQUEsTUFBTSxFQUFFZixJQUFJLENBQUNlO0FBSEYsS0FBYjtBQU1BLFFBQUlJLE1BQU0sR0FBR1YsUUFBUSxDQUFDYyxnQkFBVCxDQUEwQnZCLElBQUksQ0FBQ21CLE1BQS9CLENBQWI7QUFDQSxRQUFJQSxNQUFKLEVBQVlILE1BQU0sQ0FBQ0csTUFBUCxHQUFnQkEsTUFBaEI7QUFFWixXQUFPSCxNQUFQO0FBQ0QsRzs7U0FFRE4sVSxHQUFBLG9CQUFZTixJQUFaLEVBQWtCO0FBQ2hCLFFBQUksWUFBWUgsSUFBWixDQUFpQkcsSUFBakIsQ0FBSixFQUE0QjtBQUMxQixhQUFPQSxJQUFQO0FBQ0Q7O0FBQ0QsV0FBT0YsY0FBS0csT0FBTCxDQUFhLEtBQUtDLEdBQUwsQ0FBU0csUUFBVCxHQUFvQmUsVUFBcEIsSUFBa0MsR0FBL0MsRUFBb0RwQixJQUFwRCxDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBYVk7QUFDVixhQUFPLEtBQUtBLElBQUwsSUFBYSxLQUFLTyxFQUF6QjtBQUNEOzs7Ozs7ZUFHWWxCLEs7QUFFZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmltcG9ydCBDc3NTeW50YXhFcnJvciBmcm9tICcuL2Nzcy1zeW50YXgtZXJyb3InXG5pbXBvcnQgUHJldmlvdXNNYXAgZnJvbSAnLi9wcmV2aW91cy1tYXAnXG5cbmxldCBzZXF1ZW5jZSA9IDBcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBzb3VyY2UgQ1NTLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByb290ICA9IHBvc3Rjc3MucGFyc2UoY3NzLCB7IGZyb206IGZpbGUgfSlcbiAqIGNvbnN0IGlucHV0ID0gcm9vdC5zb3VyY2UuaW5wdXRcbiAqL1xuY2xhc3MgSW5wdXQge1xuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNzcyAgICBJbnB1dCBDU1Mgc291cmNlLlxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdHNdIHtAbGluayBQcm9jZXNzb3IjcHJvY2Vzc30gb3B0aW9ucy5cbiAgICovXG4gIGNvbnN0cnVjdG9yIChjc3MsIG9wdHMgPSB7IH0pIHtcbiAgICBpZiAoXG4gICAgICBjc3MgPT09IG51bGwgfHxcbiAgICAgIHR5cGVvZiBjc3MgPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAodHlwZW9mIGNzcyA9PT0gJ29iamVjdCcgJiYgIWNzcy50b1N0cmluZylcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUG9zdENTUyByZWNlaXZlZCAkeyBjc3MgfSBpbnN0ZWFkIG9mIENTUyBzdHJpbmdgKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElucHV0IENTUyBzb3VyY2VcbiAgICAgKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IGlucHV0ID0gcG9zdGNzcy5wYXJzZSgnYXt9JywgeyBmcm9tOiBmaWxlIH0pLmlucHV0XG4gICAgICogaW5wdXQuY3NzIC8vPT4gXCJhe31cIlxuICAgICAqL1xuICAgIHRoaXMuY3NzID0gY3NzLnRvU3RyaW5nKClcblxuICAgIGlmICh0aGlzLmNzc1swXSA9PT0gJ1xcdUZFRkYnIHx8IHRoaXMuY3NzWzBdID09PSAnXFx1RkZGRScpIHtcbiAgICAgIHRoaXMuaGFzQk9NID0gdHJ1ZVxuICAgICAgdGhpcy5jc3MgPSB0aGlzLmNzcy5zbGljZSgxKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhc0JPTSA9IGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZnJvbSkge1xuICAgICAgaWYgKC9eXFx3KzpcXC9cXC8vLnRlc3Qob3B0cy5mcm9tKSB8fCBwYXRoLmlzQWJzb2x1dGUob3B0cy5mcm9tKSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGFic29sdXRlIHBhdGggdG8gdGhlIENTUyBzb3VyY2UgZmlsZSBkZWZpbmVkXG4gICAgICAgICAqIHdpdGggdGhlIGBmcm9tYCBvcHRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKGNzcywgeyBmcm9tOiAnYS5jc3MnIH0pXG4gICAgICAgICAqIHJvb3Quc291cmNlLmlucHV0LmZpbGUgLy89PiAnL2hvbWUvYWkvYS5jc3MnXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmZpbGUgPSBvcHRzLmZyb21cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmlsZSA9IHBhdGgucmVzb2x2ZShvcHRzLmZyb20pXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IG1hcCA9IG5ldyBQcmV2aW91c01hcCh0aGlzLmNzcywgb3B0cylcbiAgICBpZiAobWFwLnRleHQpIHtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIGlucHV0IHNvdXJjZSBtYXAgcGFzc2VkIGZyb20gYSBjb21waWxhdGlvbiBzdGVwIGJlZm9yZSBQb3N0Q1NTXG4gICAgICAgKiAoZm9yIGV4YW1wbGUsIGZyb20gU2FzcyBjb21waWxlcikuXG4gICAgICAgKlxuICAgICAgICogQHR5cGUge1ByZXZpb3VzTWFwfVxuICAgICAgICpcbiAgICAgICAqIEBleGFtcGxlXG4gICAgICAgKiByb290LnNvdXJjZS5pbnB1dC5tYXAuY29uc3VtZXIoKS5zb3VyY2VzIC8vPT4gWydhLnNhc3MnXVxuICAgICAgICovXG4gICAgICB0aGlzLm1hcCA9IG1hcFxuICAgICAgbGV0IGZpbGUgPSBtYXAuY29uc3VtZXIoKS5maWxlXG4gICAgICBpZiAoIXRoaXMuZmlsZSAmJiBmaWxlKSB0aGlzLmZpbGUgPSB0aGlzLm1hcFJlc29sdmUoZmlsZSlcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZmlsZSkge1xuICAgICAgc2VxdWVuY2UgKz0gMVxuICAgICAgLyoqXG4gICAgICAgKiBUaGUgdW5pcXVlIElEIG9mIHRoZSBDU1Mgc291cmNlLiBJdCB3aWxsIGJlIGNyZWF0ZWQgaWYgYGZyb21gIG9wdGlvblxuICAgICAgICogaXMgbm90IHByb3ZpZGVkIChiZWNhdXNlIFBvc3RDU1MgZG9lcyBub3Qga25vdyB0aGUgZmlsZSBwYXRoKS5cbiAgICAgICAqXG4gICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICpcbiAgICAgICAqIEBleGFtcGxlXG4gICAgICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZShjc3MpXG4gICAgICAgKiByb290LnNvdXJjZS5pbnB1dC5maWxlIC8vPT4gdW5kZWZpbmVkXG4gICAgICAgKiByb290LnNvdXJjZS5pbnB1dC5pZCAgIC8vPT4gXCI8aW5wdXQgY3NzIDE+XCJcbiAgICAgICAqL1xuICAgICAgdGhpcy5pZCA9ICc8aW5wdXQgY3NzICcgKyBzZXF1ZW5jZSArICc+J1xuICAgIH1cbiAgICBpZiAodGhpcy5tYXApIHRoaXMubWFwLmZpbGUgPSB0aGlzLmZyb21cbiAgfVxuXG4gIGVycm9yIChtZXNzYWdlLCBsaW5lLCBjb2x1bW4sIG9wdHMgPSB7IH0pIHtcbiAgICBsZXQgcmVzdWx0XG4gICAgbGV0IG9yaWdpbiA9IHRoaXMub3JpZ2luKGxpbmUsIGNvbHVtbilcbiAgICBpZiAob3JpZ2luKSB7XG4gICAgICByZXN1bHQgPSBuZXcgQ3NzU3ludGF4RXJyb3IoXG4gICAgICAgIG1lc3NhZ2UsIG9yaWdpbi5saW5lLCBvcmlnaW4uY29sdW1uLFxuICAgICAgICBvcmlnaW4uc291cmNlLCBvcmlnaW4uZmlsZSwgb3B0cy5wbHVnaW5cbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gbmV3IENzc1N5bnRheEVycm9yKFxuICAgICAgICBtZXNzYWdlLCBsaW5lLCBjb2x1bW4sIHRoaXMuY3NzLCB0aGlzLmZpbGUsIG9wdHMucGx1Z2luKVxuICAgIH1cblxuICAgIHJlc3VsdC5pbnB1dCA9IHsgbGluZSwgY29sdW1uLCBzb3VyY2U6IHRoaXMuY3NzIH1cbiAgICBpZiAodGhpcy5maWxlKSByZXN1bHQuaW5wdXQuZmlsZSA9IHRoaXMuZmlsZVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRzIHRoZSBpbnB1dCBzb3VyY2UgbWFwIGFuZCByZXR1cm5zIGEgc3ltYm9sIHBvc2l0aW9uXG4gICAqIGluIHRoZSBpbnB1dCBzb3VyY2UgKGUuZy4sIGluIGEgU2FzcyBmaWxlIHRoYXQgd2FzIGNvbXBpbGVkXG4gICAqIHRvIENTUyBiZWZvcmUgYmVpbmcgcGFzc2VkIHRvIFBvc3RDU1MpLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbGluZSAgIExpbmUgaW4gaW5wdXQgQ1NTLlxuICAgKiBAcGFyYW0ge251bWJlcn0gY29sdW1uIENvbHVtbiBpbiBpbnB1dCBDU1MuXG4gICAqXG4gICAqIEByZXR1cm4ge2ZpbGVQb3NpdGlvbn0gUG9zaXRpb24gaW4gaW5wdXQgc291cmNlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiByb290LnNvdXJjZS5pbnB1dC5vcmlnaW4oMSwgMSkgLy89PiB7IGZpbGU6ICdhLmNzcycsIGxpbmU6IDMsIGNvbHVtbjogMSB9XG4gICAqL1xuICBvcmlnaW4gKGxpbmUsIGNvbHVtbikge1xuICAgIGlmICghdGhpcy5tYXApIHJldHVybiBmYWxzZVxuICAgIGxldCBjb25zdW1lciA9IHRoaXMubWFwLmNvbnN1bWVyKClcblxuICAgIGxldCBmcm9tID0gY29uc3VtZXIub3JpZ2luYWxQb3NpdGlvbkZvcih7IGxpbmUsIGNvbHVtbiB9KVxuICAgIGlmICghZnJvbS5zb3VyY2UpIHJldHVybiBmYWxzZVxuXG4gICAgbGV0IHJlc3VsdCA9IHtcbiAgICAgIGZpbGU6IHRoaXMubWFwUmVzb2x2ZShmcm9tLnNvdXJjZSksXG4gICAgICBsaW5lOiBmcm9tLmxpbmUsXG4gICAgICBjb2x1bW46IGZyb20uY29sdW1uXG4gICAgfVxuXG4gICAgbGV0IHNvdXJjZSA9IGNvbnN1bWVyLnNvdXJjZUNvbnRlbnRGb3IoZnJvbS5zb3VyY2UpXG4gICAgaWYgKHNvdXJjZSkgcmVzdWx0LnNvdXJjZSA9IHNvdXJjZVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgbWFwUmVzb2x2ZSAoZmlsZSkge1xuICAgIGlmICgvXlxcdys6XFwvXFwvLy50ZXN0KGZpbGUpKSB7XG4gICAgICByZXR1cm4gZmlsZVxuICAgIH1cbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKHRoaXMubWFwLmNvbnN1bWVyKCkuc291cmNlUm9vdCB8fCAnLicsIGZpbGUpXG4gIH1cblxuICAvKipcbiAgICogVGhlIENTUyBzb3VyY2UgaWRlbnRpZmllci4gQ29udGFpbnMge0BsaW5rIElucHV0I2ZpbGV9IGlmIHRoZSB1c2VyXG4gICAqIHNldCB0aGUgYGZyb21gIG9wdGlvbiwgb3Ige0BsaW5rIElucHV0I2lkfSBpZiB0aGV5IGRpZCBub3QuXG4gICAqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKGNzcywgeyBmcm9tOiAnYS5jc3MnIH0pXG4gICAqIHJvb3Quc291cmNlLmlucHV0LmZyb20gLy89PiBcIi9ob21lL2FpL2EuY3NzXCJcbiAgICpcbiAgICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoY3NzKVxuICAgKiByb290LnNvdXJjZS5pbnB1dC5mcm9tIC8vPT4gXCI8aW5wdXQgY3NzIDE+XCJcbiAgICovXG4gIGdldCBmcm9tICgpIHtcbiAgICByZXR1cm4gdGhpcy5maWxlIHx8IHRoaXMuaWRcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnB1dFxuXG4vKipcbiAqIEB0eXBlZGVmICB7b2JqZWN0fSBmaWxlUG9zaXRpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBmaWxlICAgUGF0aCB0byBmaWxlLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGxpbmUgICBTb3VyY2UgbGluZSBpbiBmaWxlLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGNvbHVtbiBTb3VyY2UgY29sdW1uIGluIGZpbGUuXG4gKi9cbiJdLCJmaWxlIjoiaW5wdXQuanMifQ==


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/lazy-result.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/lazy-result.js ***!
  \******************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _mapGenerator = _interopRequireDefault(__webpack_require__(/*! ./map-generator */ "./node_modules/@linaria/server/node_modules/postcss/lib/map-generator.js"));

var _stringify2 = _interopRequireDefault(__webpack_require__(/*! ./stringify */ "./node_modules/@linaria/server/node_modules/postcss/lib/stringify.js"));

var _warnOnce = _interopRequireDefault(__webpack_require__(/*! ./warn-once */ "./node_modules/@linaria/server/node_modules/postcss/lib/warn-once.js"));

var _result = _interopRequireDefault(__webpack_require__(/*! ./result */ "./node_modules/@linaria/server/node_modules/postcss/lib/result.js"));

var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse */ "./node_modules/@linaria/server/node_modules/postcss/lib/parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function isPromise(obj) {
  return typeof obj === 'object' && typeof obj.then === 'function';
}
/**
 * A Promise proxy for the result of PostCSS transformations.
 *
 * A `LazyResult` instance is returned by {@link Processor#process}.
 *
 * @example
 * const lazy = postcss([autoprefixer]).process(css)
 */


var LazyResult = /*#__PURE__*/function () {
  function LazyResult(processor, css, opts) {
    this.stringified = false;
    this.processed = false;
    var root;

    if (typeof css === 'object' && css !== null && css.type === 'root') {
      root = css;
    } else if (css instanceof LazyResult || css instanceof _result.default) {
      root = css.root;

      if (css.map) {
        if (typeof opts.map === 'undefined') opts.map = {};
        if (!opts.map.inline) opts.map.inline = false;
        opts.map.prev = css.map;
      }
    } else {
      var parser = _parse.default;
      if (opts.syntax) parser = opts.syntax.parse;
      if (opts.parser) parser = opts.parser;
      if (parser.parse) parser = parser.parse;

      try {
        root = parser(css, opts);
      } catch (error) {
        this.error = error;
      }
    }

    this.result = new _result.default(processor, root, opts);
  }
  /**
   * Returns a {@link Processor} instance, which will be used
   * for CSS transformations.
   *
   * @type {Processor}
   */


  var _proto = LazyResult.prototype;

  /**
   * Processes input CSS through synchronous plugins
   * and calls {@link Result#warnings()}.
   *
   * @return {Warning[]} Warnings from plugins.
   */
  _proto.warnings = function warnings() {
    return this.sync().warnings();
  }
  /**
   * Alias for the {@link LazyResult#css} property.
   *
   * @example
   * lazy + '' === lazy.css
   *
   * @return {string} Output CSS.
   */
  ;

  _proto.toString = function toString() {
    return this.css;
  }
  /**
   * Processes input CSS through synchronous and asynchronous plugins
   * and calls `onFulfilled` with a Result instance. If a plugin throws
   * an error, the `onRejected` callback will be executed.
   *
   * It implements standard Promise API.
   *
   * @param {onFulfilled} onFulfilled Callback will be executed
   *                                  when all plugins will finish work.
   * @param {onRejected}  onRejected  Callback will be executed on any error.
   *
   * @return {Promise} Promise API to make queue.
   *
   * @example
   * postcss([autoprefixer]).process(css, { from: cssPath }).then(result => {
   *   console.log(result.css)
   * })
   */
  ;

  _proto.then = function then(onFulfilled, onRejected) {
    if (true) {
      if (!('from' in this.opts)) {
        (0, _warnOnce.default)('Without `from` option PostCSS could generate wrong source map ' + 'and will not find Browserslist config. Set it to CSS file path ' + 'or to `undefined` to prevent this warning.');
      }
    }

    return this.async().then(onFulfilled, onRejected);
  }
  /**
   * Processes input CSS through synchronous and asynchronous plugins
   * and calls onRejected for each error thrown in any plugin.
   *
   * It implements standard Promise API.
   *
   * @param {onRejected} onRejected Callback will be executed on any error.
   *
   * @return {Promise} Promise API to make queue.
   *
   * @example
   * postcss([autoprefixer]).process(css).then(result => {
   *   console.log(result.css)
   * }).catch(error => {
   *   console.error(error)
   * })
   */
  ;

  _proto.catch = function _catch(onRejected) {
    return this.async().catch(onRejected);
  }
  /**
   * Processes input CSS through synchronous and asynchronous plugins
   * and calls onFinally on any error or when all plugins will finish work.
   *
   * It implements standard Promise API.
   *
   * @param {onFinally} onFinally Callback will be executed on any error or
   *                              when all plugins will finish work.
   *
   * @return {Promise} Promise API to make queue.
   *
   * @example
   * postcss([autoprefixer]).process(css).finally(() => {
   *   console.log('processing ended')
   * })
   */
  ;

  _proto.finally = function _finally(onFinally) {
    return this.async().then(onFinally, onFinally);
  };

  _proto.handleError = function handleError(error, plugin) {
    try {
      this.error = error;

      if (error.name === 'CssSyntaxError' && !error.plugin) {
        error.plugin = plugin.postcssPlugin;
        error.setMessage();
      } else if (plugin.postcssVersion) {
        if (true) {
          var pluginName = plugin.postcssPlugin;
          var pluginVer = plugin.postcssVersion;
          var runtimeVer = this.result.processor.version;
          var a = pluginVer.split('.');
          var b = runtimeVer.split('.');

          if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
            console.error('Unknown error from PostCSS plugin. Your current PostCSS ' + 'version is ' + runtimeVer + ', but ' + pluginName + ' uses ' + pluginVer + '. Perhaps this is the source of the error below.');
          }
        }
      }
    } catch (err) {
      if (console && console.error) console.error(err);
    }
  };

  _proto.asyncTick = function asyncTick(resolve, reject) {
    var _this = this;

    if (this.plugin >= this.processor.plugins.length) {
      this.processed = true;
      return resolve();
    }

    try {
      var plugin = this.processor.plugins[this.plugin];
      var promise = this.run(plugin);
      this.plugin += 1;

      if (isPromise(promise)) {
        promise.then(function () {
          _this.asyncTick(resolve, reject);
        }).catch(function (error) {
          _this.handleError(error, plugin);

          _this.processed = true;
          reject(error);
        });
      } else {
        this.asyncTick(resolve, reject);
      }
    } catch (error) {
      this.processed = true;
      reject(error);
    }
  };

  _proto.async = function async() {
    var _this2 = this;

    if (this.processed) {
      return new Promise(function (resolve, reject) {
        if (_this2.error) {
          reject(_this2.error);
        } else {
          resolve(_this2.stringify());
        }
      });
    }

    if (this.processing) {
      return this.processing;
    }

    this.processing = new Promise(function (resolve, reject) {
      if (_this2.error) return reject(_this2.error);
      _this2.plugin = 0;

      _this2.asyncTick(resolve, reject);
    }).then(function () {
      _this2.processed = true;
      return _this2.stringify();
    });
    return this.processing;
  };

  _proto.sync = function sync() {
    if (this.processed) return this.result;
    this.processed = true;

    if (this.processing) {
      throw new Error('Use process(css).then(cb) to work with async plugins');
    }

    if (this.error) throw this.error;

    for (var _iterator = _createForOfIteratorHelperLoose(this.result.processor.plugins), _step; !(_step = _iterator()).done;) {
      var plugin = _step.value;
      var promise = this.run(plugin);

      if (isPromise(promise)) {
        throw new Error('Use process(css).then(cb) to work with async plugins');
      }
    }

    return this.result;
  };

  _proto.run = function run(plugin) {
    this.result.lastPlugin = plugin;

    try {
      return plugin(this.result.root, this.result);
    } catch (error) {
      this.handleError(error, plugin);
      throw error;
    }
  };

  _proto.stringify = function stringify() {
    if (this.stringified) return this.result;
    this.stringified = true;
    this.sync();
    var opts = this.result.opts;
    var str = _stringify2.default;
    if (opts.syntax) str = opts.syntax.stringify;
    if (opts.stringifier) str = opts.stringifier;
    if (str.stringify) str = str.stringify;
    var map = new _mapGenerator.default(str, this.result.root, this.result.opts);
    var data = map.generate();
    this.result.css = data[0];
    this.result.map = data[1];
    return this.result;
  };

  _createClass(LazyResult, [{
    key: "processor",
    get: function get() {
      return this.result.processor;
    }
    /**
     * Options from the {@link Processor#process} call.
     *
     * @type {processOptions}
     */

  }, {
    key: "opts",
    get: function get() {
      return this.result.opts;
    }
    /**
     * Processes input CSS through synchronous plugins, converts `Root`
     * to a CSS string and returns {@link Result#css}.
     *
     * This property will only work with synchronous plugins.
     * If the processor contains any asynchronous plugins
     * it will throw an error. This is why this method is only
     * for debug purpose, you should always use {@link LazyResult#then}.
     *
     * @type {string}
     * @see Result#css
     */

  }, {
    key: "css",
    get: function get() {
      return this.stringify().css;
    }
    /**
     * An alias for the `css` property. Use it with syntaxes
     * that generate non-CSS output.
     *
     * This property will only work with synchronous plugins.
     * If the processor contains any asynchronous plugins
     * it will throw an error. This is why this method is only
     * for debug purpose, you should always use {@link LazyResult#then}.
     *
     * @type {string}
     * @see Result#content
     */

  }, {
    key: "content",
    get: function get() {
      return this.stringify().content;
    }
    /**
     * Processes input CSS through synchronous plugins
     * and returns {@link Result#map}.
     *
     * This property will only work with synchronous plugins.
     * If the processor contains any asynchronous plugins
     * it will throw an error. This is why this method is only
     * for debug purpose, you should always use {@link LazyResult#then}.
     *
     * @type {SourceMapGenerator}
     * @see Result#map
     */

  }, {
    key: "map",
    get: function get() {
      return this.stringify().map;
    }
    /**
     * Processes input CSS through synchronous plugins
     * and returns {@link Result#root}.
     *
     * This property will only work with synchronous plugins. If the processor
     * contains any asynchronous plugins it will throw an error.
     *
     * This is why this method is only for debug purpose,
     * you should always use {@link LazyResult#then}.
     *
     * @type {Root}
     * @see Result#root
     */

  }, {
    key: "root",
    get: function get() {
      return this.sync().root;
    }
    /**
     * Processes input CSS through synchronous plugins
     * and returns {@link Result#messages}.
     *
     * This property will only work with synchronous plugins. If the processor
     * contains any asynchronous plugins it will throw an error.
     *
     * This is why this method is only for debug purpose,
     * you should always use {@link LazyResult#then}.
     *
     * @type {Message[]}
     * @see Result#messages
     */

  }, {
    key: "messages",
    get: function get() {
      return this.sync().messages;
    }
  }]);

  return LazyResult;
}();

var _default = LazyResult;
/**
 * @callback onFulfilled
 * @param {Result} result
 */

/**
 * @callback onRejected
 * @param {Error} error
 */

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxhenktcmVzdWx0LmVzNiJdLCJuYW1lcyI6WyJpc1Byb21pc2UiLCJvYmoiLCJ0aGVuIiwiTGF6eVJlc3VsdCIsInByb2Nlc3NvciIsImNzcyIsIm9wdHMiLCJzdHJpbmdpZmllZCIsInByb2Nlc3NlZCIsInJvb3QiLCJ0eXBlIiwiUmVzdWx0IiwibWFwIiwiaW5saW5lIiwicHJldiIsInBhcnNlciIsInBhcnNlIiwic3ludGF4IiwiZXJyb3IiLCJyZXN1bHQiLCJ3YXJuaW5ncyIsInN5bmMiLCJ0b1N0cmluZyIsIm9uRnVsZmlsbGVkIiwib25SZWplY3RlZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImFzeW5jIiwiY2F0Y2giLCJmaW5hbGx5Iiwib25GaW5hbGx5IiwiaGFuZGxlRXJyb3IiLCJwbHVnaW4iLCJuYW1lIiwicG9zdGNzc1BsdWdpbiIsInNldE1lc3NhZ2UiLCJwb3N0Y3NzVmVyc2lvbiIsInBsdWdpbk5hbWUiLCJwbHVnaW5WZXIiLCJydW50aW1lVmVyIiwidmVyc2lvbiIsImEiLCJzcGxpdCIsImIiLCJwYXJzZUludCIsImNvbnNvbGUiLCJlcnIiLCJhc3luY1RpY2siLCJyZXNvbHZlIiwicmVqZWN0IiwicGx1Z2lucyIsImxlbmd0aCIsInByb21pc2UiLCJydW4iLCJQcm9taXNlIiwic3RyaW5naWZ5IiwicHJvY2Vzc2luZyIsIkVycm9yIiwibGFzdFBsdWdpbiIsInN0ciIsInN0cmluZ2lmaWVyIiwiTWFwR2VuZXJhdG9yIiwiZGF0YSIsImdlbmVyYXRlIiwiY29udGVudCIsIm1lc3NhZ2VzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLFNBQVNBLFNBQVQsQ0FBb0JDLEdBQXBCLEVBQXlCO0FBQ3ZCLFNBQU8sT0FBT0EsR0FBUCxLQUFlLFFBQWYsSUFBMkIsT0FBT0EsR0FBRyxDQUFDQyxJQUFYLEtBQW9CLFVBQXREO0FBQ0Q7QUFFRDs7Ozs7Ozs7OztJ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SUFBSWtELHFCQUFKLENBQWlCRixHQUFqQixFQUFzQixLQUFLekMsTUFBTCxDQUFZVixJQUFsQyxFQUF3QyxLQUFLVSxNQUFMLENBQVliLElBQXBELENBQVY7QUFDQSxRQUFJeUQsSUFBSSxHQUFHbkQsR0FBRyxDQUFDb0QsUUFBSixFQUFYO0FBQ0EsU0FBSzdDLE1BQUwsQ0FBWWQsR0FBWixHQUFrQjBELElBQUksQ0FBQyxDQUFELENBQXRCO0FBQ0EsU0FBSzVDLE1BQUwsQ0FBWVAsR0FBWixHQUFrQm1ELElBQUksQ0FBQyxDQUFELENBQXRCO0FBRUEsV0FBTyxLQUFLNUMsTUFBWjtBQUNELEc7Ozs7d0JBalVnQjtBQUNmLGFBQU8sS0FBS0EsTUFBTCxDQUFZZixTQUFuQjtBQUNEO0FBRUQ7Ozs7Ozs7O3dCQUtZO0FBQ1YsYUFBTyxLQUFLZSxNQUFMLENBQVliLElBQW5CO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7Ozs7O3dCQVlXO0FBQ1QsYUFBTyxLQUFLa0QsU0FBTCxHQUFpQm5ELEdBQXhCO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7Ozs7O3dCQVllO0FBQ2IsYUFBTyxLQUFLbUQsU0FBTCxHQUFpQlMsT0FBeEI7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7d0JBWVc7QUFDVCxhQUFPLEtBQUtULFNBQUwsR0FBaUI1QyxHQUF4QjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBYVk7QUFDVixhQUFPLEtBQUtTLElBQUwsR0FBWVosSUFBbkI7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7O3dCQWFnQjtBQUNkLGFBQU8sS0FBS1ksSUFBTCxHQUFZNkMsUUFBbkI7QUFDRDs7Ozs7O2VBdU9ZL0QsVTtBQUVmOzs7OztBQUtBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hcEdlbmVyYXRvciBmcm9tICcuL21hcC1nZW5lcmF0b3InXG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5J1xuaW1wb3J0IHdhcm5PbmNlIGZyb20gJy4vd2Fybi1vbmNlJ1xuaW1wb3J0IFJlc3VsdCBmcm9tICcuL3Jlc3VsdCdcbmltcG9ydCBwYXJzZSBmcm9tICcuL3BhcnNlJ1xuXG5mdW5jdGlvbiBpc1Byb21pc2UgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai50aGVuID09PSAnZnVuY3Rpb24nXG59XG5cbi8qKlxuICogQSBQcm9taXNlIHByb3h5IGZvciB0aGUgcmVzdWx0IG9mIFBvc3RDU1MgdHJhbnNmb3JtYXRpb25zLlxuICpcbiAqIEEgYExhenlSZXN1bHRgIGluc3RhbmNlIGlzIHJldHVybmVkIGJ5IHtAbGluayBQcm9jZXNzb3IjcHJvY2Vzc30uXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IGxhenkgPSBwb3N0Y3NzKFthdXRvcHJlZml4ZXJdKS5wcm9jZXNzKGNzcylcbiAqL1xuY2xhc3MgTGF6eVJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yIChwcm9jZXNzb3IsIGNzcywgb3B0cykge1xuICAgIHRoaXMuc3RyaW5naWZpZWQgPSBmYWxzZVxuICAgIHRoaXMucHJvY2Vzc2VkID0gZmFsc2VcblxuICAgIGxldCByb290XG4gICAgaWYgKHR5cGVvZiBjc3MgPT09ICdvYmplY3QnICYmIGNzcyAhPT0gbnVsbCAmJiBjc3MudHlwZSA9PT0gJ3Jvb3QnKSB7XG4gICAgICByb290ID0gY3NzXG4gICAgfSBlbHNlIGlmIChjc3MgaW5zdGFuY2VvZiBMYXp5UmVzdWx0IHx8IGNzcyBpbnN0YW5jZW9mIFJlc3VsdCkge1xuICAgICAgcm9vdCA9IGNzcy5yb290XG4gICAgICBpZiAoY3NzLm1hcCkge1xuICAgICAgICBpZiAodHlwZW9mIG9wdHMubWFwID09PSAndW5kZWZpbmVkJykgb3B0cy5tYXAgPSB7IH1cbiAgICAgICAgaWYgKCFvcHRzLm1hcC5pbmxpbmUpIG9wdHMubWFwLmlubGluZSA9IGZhbHNlXG4gICAgICAgIG9wdHMubWFwLnByZXYgPSBjc3MubWFwXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBwYXJzZXIgPSBwYXJzZVxuICAgICAgaWYgKG9wdHMuc3ludGF4KSBwYXJzZXIgPSBvcHRzLnN5bnRheC5wYXJzZVxuICAgICAgaWYgKG9wdHMucGFyc2VyKSBwYXJzZXIgPSBvcHRzLnBhcnNlclxuICAgICAgaWYgKHBhcnNlci5wYXJzZSkgcGFyc2VyID0gcGFyc2VyLnBhcnNlXG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJvb3QgPSBwYXJzZXIoY3NzLCBvcHRzKVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yZXN1bHQgPSBuZXcgUmVzdWx0KHByb2Nlc3Nvciwgcm9vdCwgb3B0cylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEge0BsaW5rIFByb2Nlc3Nvcn0gaW5zdGFuY2UsIHdoaWNoIHdpbGwgYmUgdXNlZFxuICAgKiBmb3IgQ1NTIHRyYW5zZm9ybWF0aW9ucy5cbiAgICpcbiAgICogQHR5cGUge1Byb2Nlc3Nvcn1cbiAgICovXG4gIGdldCBwcm9jZXNzb3IgKCkge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdC5wcm9jZXNzb3JcbiAgfVxuXG4gIC8qKlxuICAgKiBPcHRpb25zIGZyb20gdGhlIHtAbGluayBQcm9jZXNzb3IjcHJvY2Vzc30gY2FsbC5cbiAgICpcbiAgICogQHR5cGUge3Byb2Nlc3NPcHRpb25zfVxuICAgKi9cbiAgZ2V0IG9wdHMgKCkge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdC5vcHRzXG4gIH1cblxuICAvKipcbiAgICogUHJvY2Vzc2VzIGlucHV0IENTUyB0aHJvdWdoIHN5bmNocm9ub3VzIHBsdWdpbnMsIGNvbnZlcnRzIGBSb290YFxuICAgKiB0byBhIENTUyBzdHJpbmcgYW5kIHJldHVybnMge0BsaW5rIFJlc3VsdCNjc3N9LlxuICAgKlxuICAgKiBUaGlzIHByb3BlcnR5IHdpbGwgb25seSB3b3JrIHdpdGggc3luY2hyb25vdXMgcGx1Z2lucy5cbiAgICogSWYgdGhlIHByb2Nlc3NvciBjb250YWlucyBhbnkgYXN5bmNocm9ub3VzIHBsdWdpbnNcbiAgICogaXQgd2lsbCB0aHJvdyBhbiBlcnJvci4gVGhpcyBpcyB3aHkgdGhpcyBtZXRob2QgaXMgb25seVxuICAgKiBmb3IgZGVidWcgcHVycG9zZSwgeW91IHNob3VsZCBhbHdheXMgdXNlIHtAbGluayBMYXp5UmVzdWx0I3RoZW59LlxuICAgKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAc2VlIFJlc3VsdCNjc3NcbiAgICovXG4gIGdldCBjc3MgKCkge1xuICAgIHJldHVybiB0aGlzLnN0cmluZ2lmeSgpLmNzc1xuICB9XG5cbiAgLyoqXG4gICAqIEFuIGFsaWFzIGZvciB0aGUgYGNzc2AgcHJvcGVydHkuIFVzZSBpdCB3aXRoIHN5bnRheGVzXG4gICAqIHRoYXQgZ2VuZXJhdGUgbm9uLUNTUyBvdXRwdXQuXG4gICAqXG4gICAqIFRoaXMgcHJvcGVydHkgd2lsbCBvbmx5IHdvcmsgd2l0aCBzeW5jaHJvbm91cyBwbHVnaW5zLlxuICAgKiBJZiB0aGUgcHJvY2Vzc29yIGNvbnRhaW5zIGFueSBhc3luY2hyb25vdXMgcGx1Z2luc1xuICAgKiBpdCB3aWxsIHRocm93IGFuIGVycm9yLiBUaGlzIGlzIHdoeSB0aGlzIG1ldGhvZCBpcyBvbmx5XG4gICAqIGZvciBkZWJ1ZyBwdXJwb3NlLCB5b3Ugc2hvdWxkIGFsd2F5cyB1c2Uge0BsaW5rIExhenlSZXN1bHQjdGhlbn0uXG4gICAqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBzZWUgUmVzdWx0I2NvbnRlbnRcbiAgICovXG4gIGdldCBjb250ZW50ICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdHJpbmdpZnkoKS5jb250ZW50XG4gIH1cblxuICAvKipcbiAgICogUHJvY2Vzc2VzIGlucHV0IENTUyB0aHJvdWdoIHN5bmNocm9ub3VzIHBsdWdpbnNcbiAgICogYW5kIHJldHVybnMge0BsaW5rIFJlc3VsdCNtYXB9LlxuICAgKlxuICAgKiBUaGlzIHByb3BlcnR5IHdpbGwgb25seSB3b3JrIHdpdGggc3luY2hyb25vdXMgcGx1Z2lucy5cbiAgICogSWYgdGhlIHByb2Nlc3NvciBjb250YWlucyBhbnkgYXN5bmNocm9ub3VzIHBsdWdpbnNcbiAgICogaXQgd2lsbCB0aHJvdyBhbiBlcnJvci4gVGhpcyBpcyB3aHkgdGhpcyBtZXRob2QgaXMgb25seVxuICAgKiBmb3IgZGVidWcgcHVycG9zZSwgeW91IHNob3VsZCBhbHdheXMgdXNlIHtAbGluayBMYXp5UmVzdWx0I3RoZW59LlxuICAgKlxuICAgKiBAdHlwZSB7U291cmNlTWFwR2VuZXJhdG9yfVxuICAgKiBAc2VlIFJlc3VsdCNtYXBcbiAgICovXG4gIGdldCBtYXAgKCkge1xuICAgIHJldHVybiB0aGlzLnN0cmluZ2lmeSgpLm1hcFxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3NlcyBpbnB1dCBDU1MgdGhyb3VnaCBzeW5jaHJvbm91cyBwbHVnaW5zXG4gICAqIGFuZCByZXR1cm5zIHtAbGluayBSZXN1bHQjcm9vdH0uXG4gICAqXG4gICAqIFRoaXMgcHJvcGVydHkgd2lsbCBvbmx5IHdvcmsgd2l0aCBzeW5jaHJvbm91cyBwbHVnaW5zLiBJZiB0aGUgcHJvY2Vzc29yXG4gICAqIGNvbnRhaW5zIGFueSBhc3luY2hyb25vdXMgcGx1Z2lucyBpdCB3aWxsIHRocm93IGFuIGVycm9yLlxuICAgKlxuICAgKiBUaGlzIGlzIHdoeSB0aGlzIG1ldGhvZCBpcyBvbmx5IGZvciBkZWJ1ZyBwdXJwb3NlLFxuICAgKiB5b3Ugc2hvdWxkIGFsd2F5cyB1c2Uge0BsaW5rIExhenlSZXN1bHQjdGhlbn0uXG4gICAqXG4gICAqIEB0eXBlIHtSb290fVxuICAgKiBAc2VlIFJlc3VsdCNyb290XG4gICAqL1xuICBnZXQgcm9vdCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3luYygpLnJvb3RcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgaW5wdXQgQ1NTIHRocm91Z2ggc3luY2hyb25vdXMgcGx1Z2luc1xuICAgKiBhbmQgcmV0dXJucyB7QGxpbmsgUmVzdWx0I21lc3NhZ2VzfS5cbiAgICpcbiAgICogVGhpcyBwcm9wZXJ0eSB3aWxsIG9ubHkgd29yayB3aXRoIHN5bmNocm9ub3VzIHBsdWdpbnMuIElmIHRoZSBwcm9jZXNzb3JcbiAgICogY29udGFpbnMgYW55IGFzeW5jaHJvbm91cyBwbHVnaW5zIGl0IHdpbGwgdGhyb3cgYW4gZXJyb3IuXG4gICAqXG4gICAqIFRoaXMgaXMgd2h5IHRoaXMgbWV0aG9kIGlzIG9ubHkgZm9yIGRlYnVnIHB1cnBvc2UsXG4gICAqIHlvdSBzaG91bGQgYWx3YXlzIHVzZSB7QGxpbmsgTGF6eVJlc3VsdCN0aGVufS5cbiAgICpcbiAgICogQHR5cGUge01lc3NhZ2VbXX1cbiAgICogQHNlZSBSZXN1bHQjbWVzc2FnZXNcbiAgICovXG4gIGdldCBtZXNzYWdlcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3luYygpLm1lc3NhZ2VzXG4gIH1cblxuICAvKipcbiAgICogUHJvY2Vzc2VzIGlucHV0IENTUyB0aHJvdWdoIHN5bmNocm9ub3VzIHBsdWdpbnNcbiAgICogYW5kIGNhbGxzIHtAbGluayBSZXN1bHQjd2FybmluZ3MoKX0uXG4gICAqXG4gICAqIEByZXR1cm4ge1dhcm5pbmdbXX0gV2FybmluZ3MgZnJvbSBwbHVnaW5zLlxuICAgKi9cbiAgd2FybmluZ3MgKCkge1xuICAgIHJldHVybiB0aGlzLnN5bmMoKS53YXJuaW5ncygpXG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgZm9yIHRoZSB7QGxpbmsgTGF6eVJlc3VsdCNjc3N9IHByb3BlcnR5LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBsYXp5ICsgJycgPT09IGxhenkuY3NzXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gT3V0cHV0IENTUy5cbiAgICovXG4gIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy5jc3NcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgaW5wdXQgQ1NTIHRocm91Z2ggc3luY2hyb25vdXMgYW5kIGFzeW5jaHJvbm91cyBwbHVnaW5zXG4gICAqIGFuZCBjYWxscyBgb25GdWxmaWxsZWRgIHdpdGggYSBSZXN1bHQgaW5zdGFuY2UuIElmIGEgcGx1Z2luIHRocm93c1xuICAgKiBhbiBlcnJvciwgdGhlIGBvblJlamVjdGVkYCBjYWxsYmFjayB3aWxsIGJlIGV4ZWN1dGVkLlxuICAgKlxuICAgKiBJdCBpbXBsZW1lbnRzIHN0YW5kYXJkIFByb21pc2UgQVBJLlxuICAgKlxuICAgKiBAcGFyYW0ge29uRnVsZmlsbGVkfSBvbkZ1bGZpbGxlZCBDYWxsYmFjayB3aWxsIGJlIGV4ZWN1dGVkXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZW4gYWxsIHBsdWdpbnMgd2lsbCBmaW5pc2ggd29yay5cbiAgICogQHBhcmFtIHtvblJlamVjdGVkfSAgb25SZWplY3RlZCAgQ2FsbGJhY2sgd2lsbCBiZSBleGVjdXRlZCBvbiBhbnkgZXJyb3IuXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFByb21pc2UgQVBJIHRvIG1ha2UgcXVldWUuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHBvc3Rjc3MoW2F1dG9wcmVmaXhlcl0pLnByb2Nlc3MoY3NzLCB7IGZyb206IGNzc1BhdGggfSkudGhlbihyZXN1bHQgPT4ge1xuICAgKiAgIGNvbnNvbGUubG9nKHJlc3VsdC5jc3MpXG4gICAqIH0pXG4gICAqL1xuICB0aGVuIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoISgnZnJvbScgaW4gdGhpcy5vcHRzKSkge1xuICAgICAgICB3YXJuT25jZShcbiAgICAgICAgICAnV2l0aG91dCBgZnJvbWAgb3B0aW9uIFBvc3RDU1MgY291bGQgZ2VuZXJhdGUgd3Jvbmcgc291cmNlIG1hcCAnICtcbiAgICAgICAgICAnYW5kIHdpbGwgbm90IGZpbmQgQnJvd3NlcnNsaXN0IGNvbmZpZy4gU2V0IGl0IHRvIENTUyBmaWxlIHBhdGggJyArXG4gICAgICAgICAgJ29yIHRvIGB1bmRlZmluZWRgIHRvIHByZXZlbnQgdGhpcyB3YXJuaW5nLidcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hc3luYygpLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gIH1cblxuICAvKipcbiAgICogUHJvY2Vzc2VzIGlucHV0IENTUyB0aHJvdWdoIHN5bmNocm9ub3VzIGFuZCBhc3luY2hyb25vdXMgcGx1Z2luc1xuICAgKiBhbmQgY2FsbHMgb25SZWplY3RlZCBmb3IgZWFjaCBlcnJvciB0aHJvd24gaW4gYW55IHBsdWdpbi5cbiAgICpcbiAgICogSXQgaW1wbGVtZW50cyBzdGFuZGFyZCBQcm9taXNlIEFQSS5cbiAgICpcbiAgICogQHBhcmFtIHtvblJlamVjdGVkfSBvblJlamVjdGVkIENhbGxiYWNrIHdpbGwgYmUgZXhlY3V0ZWQgb24gYW55IGVycm9yLlxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBQcm9taXNlIEFQSSB0byBtYWtlIHF1ZXVlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBwb3N0Y3NzKFthdXRvcHJlZml4ZXJdKS5wcm9jZXNzKGNzcykudGhlbihyZXN1bHQgPT4ge1xuICAgKiAgIGNvbnNvbGUubG9nKHJlc3VsdC5jc3MpXG4gICAqIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICogICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgKiB9KVxuICAgKi9cbiAgY2F0Y2ggKG9uUmVqZWN0ZWQpIHtcbiAgICByZXR1cm4gdGhpcy5hc3luYygpLmNhdGNoKG9uUmVqZWN0ZWQpXG4gIH1cbiAgLyoqXG4gICAqIFByb2Nlc3NlcyBpbnB1dCBDU1MgdGhyb3VnaCBzeW5jaHJvbm91cyBhbmQgYXN5bmNocm9ub3VzIHBsdWdpbnNcbiAgICogYW5kIGNhbGxzIG9uRmluYWxseSBvbiBhbnkgZXJyb3Igb3Igd2hlbiBhbGwgcGx1Z2lucyB3aWxsIGZpbmlzaCB3b3JrLlxuICAgKlxuICAgKiBJdCBpbXBsZW1lbnRzIHN0YW5kYXJkIFByb21pc2UgQVBJLlxuICAgKlxuICAgKiBAcGFyYW0ge29uRmluYWxseX0gb25GaW5hbGx5IENhbGxiYWNrIHdpbGwgYmUgZXhlY3V0ZWQgb24gYW55IGVycm9yIG9yXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiBhbGwgcGx1Z2lucyB3aWxsIGZpbmlzaCB3b3JrLlxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBQcm9taXNlIEFQSSB0byBtYWtlIHF1ZXVlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBwb3N0Y3NzKFthdXRvcHJlZml4ZXJdKS5wcm9jZXNzKGNzcykuZmluYWxseSgoKSA9PiB7XG4gICAqICAgY29uc29sZS5sb2coJ3Byb2Nlc3NpbmcgZW5kZWQnKVxuICAgKiB9KVxuICAgKi9cbiAgZmluYWxseSAob25GaW5hbGx5KSB7XG4gICAgcmV0dXJuIHRoaXMuYXN5bmMoKS50aGVuKG9uRmluYWxseSwgb25GaW5hbGx5KVxuICB9XG5cbiAgaGFuZGxlRXJyb3IgKGVycm9yLCBwbHVnaW4pIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5lcnJvciA9IGVycm9yXG4gICAgICBpZiAoZXJyb3IubmFtZSA9PT0gJ0Nzc1N5bnRheEVycm9yJyAmJiAhZXJyb3IucGx1Z2luKSB7XG4gICAgICAgIGVycm9yLnBsdWdpbiA9IHBsdWdpbi5wb3N0Y3NzUGx1Z2luXG4gICAgICAgIGVycm9yLnNldE1lc3NhZ2UoKVxuICAgICAgfSBlbHNlIGlmIChwbHVnaW4ucG9zdGNzc1ZlcnNpb24pIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBsZXQgcGx1Z2luTmFtZSA9IHBsdWdpbi5wb3N0Y3NzUGx1Z2luXG4gICAgICAgICAgbGV0IHBsdWdpblZlciA9IHBsdWdpbi5wb3N0Y3NzVmVyc2lvblxuICAgICAgICAgIGxldCBydW50aW1lVmVyID0gdGhpcy5yZXN1bHQucHJvY2Vzc29yLnZlcnNpb25cbiAgICAgICAgICBsZXQgYSA9IHBsdWdpblZlci5zcGxpdCgnLicpXG4gICAgICAgICAgbGV0IGIgPSBydW50aW1lVmVyLnNwbGl0KCcuJylcblxuICAgICAgICAgIGlmIChhWzBdICE9PSBiWzBdIHx8IHBhcnNlSW50KGFbMV0pID4gcGFyc2VJbnQoYlsxXSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICdVbmtub3duIGVycm9yIGZyb20gUG9zdENTUyBwbHVnaW4uIFlvdXIgY3VycmVudCBQb3N0Q1NTICcgK1xuICAgICAgICAgICAgICAndmVyc2lvbiBpcyAnICsgcnVudGltZVZlciArICcsIGJ1dCAnICsgcGx1Z2luTmFtZSArICcgdXNlcyAnICtcbiAgICAgICAgICAgICAgcGx1Z2luVmVyICsgJy4gUGVyaGFwcyB0aGlzIGlzIHRoZSBzb3VyY2Ugb2YgdGhlIGVycm9yIGJlbG93LidcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jVGljayAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgaWYgKHRoaXMucGx1Z2luID49IHRoaXMucHJvY2Vzc29yLnBsdWdpbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnByb2Nlc3NlZCA9IHRydWVcbiAgICAgIHJldHVybiByZXNvbHZlKClcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgbGV0IHBsdWdpbiA9IHRoaXMucHJvY2Vzc29yLnBsdWdpbnNbdGhpcy5wbHVnaW5dXG4gICAgICBsZXQgcHJvbWlzZSA9IHRoaXMucnVuKHBsdWdpbilcbiAgICAgIHRoaXMucGx1Z2luICs9IDFcblxuICAgICAgaWYgKGlzUHJvbWlzZShwcm9taXNlKSkge1xuICAgICAgICBwcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYXN5bmNUaWNrKHJlc29sdmUsIHJlamVjdClcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IsIHBsdWdpbilcbiAgICAgICAgICB0aGlzLnByb2Nlc3NlZCA9IHRydWVcbiAgICAgICAgICByZWplY3QoZXJyb3IpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFzeW5jVGljayhyZXNvbHZlLCByZWplY3QpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMucHJvY2Vzc2VkID0gdHJ1ZVxuICAgICAgcmVqZWN0KGVycm9yKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jICgpIHtcbiAgICBpZiAodGhpcy5wcm9jZXNzZWQpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KHRoaXMuZXJyb3IpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLnN0cmluZ2lmeSgpKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9jZXNzaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9jZXNzaW5nXG4gICAgfVxuXG4gICAgdGhpcy5wcm9jZXNzaW5nID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZXJyb3IpIHJldHVybiByZWplY3QodGhpcy5lcnJvcilcbiAgICAgIHRoaXMucGx1Z2luID0gMFxuICAgICAgdGhpcy5hc3luY1RpY2socmVzb2x2ZSwgcmVqZWN0KVxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5wcm9jZXNzZWQgPSB0cnVlXG4gICAgICByZXR1cm4gdGhpcy5zdHJpbmdpZnkoKVxuICAgIH0pXG5cbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzaW5nXG4gIH1cblxuICBzeW5jICgpIHtcbiAgICBpZiAodGhpcy5wcm9jZXNzZWQpIHJldHVybiB0aGlzLnJlc3VsdFxuICAgIHRoaXMucHJvY2Vzc2VkID0gdHJ1ZVxuXG4gICAgaWYgKHRoaXMucHJvY2Vzc2luZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVXNlIHByb2Nlc3MoY3NzKS50aGVuKGNiKSB0byB3b3JrIHdpdGggYXN5bmMgcGx1Z2lucycpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZXJyb3IpIHRocm93IHRoaXMuZXJyb3JcblxuICAgIGZvciAobGV0IHBsdWdpbiBvZiB0aGlzLnJlc3VsdC5wcm9jZXNzb3IucGx1Z2lucykge1xuICAgICAgbGV0IHByb21pc2UgPSB0aGlzLnJ1bihwbHVnaW4pXG4gICAgICBpZiAoaXNQcm9taXNlKHByb21pc2UpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnVXNlIHByb2Nlc3MoY3NzKS50aGVuKGNiKSB0byB3b3JrIHdpdGggYXN5bmMgcGx1Z2lucycpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVzdWx0XG4gIH1cblxuICBydW4gKHBsdWdpbikge1xuICAgIHRoaXMucmVzdWx0Lmxhc3RQbHVnaW4gPSBwbHVnaW5cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gcGx1Z2luKHRoaXMucmVzdWx0LnJvb3QsIHRoaXMucmVzdWx0KVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmhhbmRsZUVycm9yKGVycm9yLCBwbHVnaW4pXG4gICAgICB0aHJvdyBlcnJvclxuICAgIH1cbiAgfVxuXG4gIHN0cmluZ2lmeSAoKSB7XG4gICAgaWYgKHRoaXMuc3RyaW5naWZpZWQpIHJldHVybiB0aGlzLnJlc3VsdFxuICAgIHRoaXMuc3RyaW5naWZpZWQgPSB0cnVlXG5cbiAgICB0aGlzLnN5bmMoKVxuXG4gICAgbGV0IG9wdHMgPSB0aGlzLnJlc3VsdC5vcHRzXG4gICAgbGV0IHN0ciA9IHN0cmluZ2lmeVxuICAgIGlmIChvcHRzLnN5bnRheCkgc3RyID0gb3B0cy5zeW50YXguc3RyaW5naWZ5XG4gICAgaWYgKG9wdHMuc3RyaW5naWZpZXIpIHN0ciA9IG9wdHMuc3RyaW5naWZpZXJcbiAgICBpZiAoc3RyLnN0cmluZ2lmeSkgc3RyID0gc3RyLnN0cmluZ2lmeVxuXG4gICAgbGV0IG1hcCA9IG5ldyBNYXBHZW5lcmF0b3Ioc3RyLCB0aGlzLnJlc3VsdC5yb290LCB0aGlzLnJlc3VsdC5vcHRzKVxuICAgIGxldCBkYXRhID0gbWFwLmdlbmVyYXRlKClcbiAgICB0aGlzLnJlc3VsdC5jc3MgPSBkYXRhWzBdXG4gICAgdGhpcy5yZXN1bHQubWFwID0gZGF0YVsxXVxuXG4gICAgcmV0dXJuIHRoaXMucmVzdWx0XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eVJlc3VsdFxuXG4vKipcbiAqIEBjYWxsYmFjayBvbkZ1bGZpbGxlZFxuICogQHBhcmFtIHtSZXN1bHR9IHJlc3VsdFxuICovXG5cbi8qKlxuICogQGNhbGxiYWNrIG9uUmVqZWN0ZWRcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yXG4gKi9cbiJdLCJmaWxlIjoibGF6eS1yZXN1bHQuanMifQ==


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/list.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/list.js ***!
  \***********************************************************************/
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

/**
 * Contains helpers for safely splitting lists of CSS values,
 * preserving parentheses and quotes.
 *
 * @example
 * const list = postcss.list
 *
 * @namespace list
 */
var list = {
  split: function split(string, separators, last) {
    var array = [];
    var current = '';
    var split = false;
    var func = 0;
    var quote = false;
    var escape = false;

    for (var i = 0; i < string.length; i++) {
      var letter = string[i];

      if (quote) {
        if (escape) {
          escape = false;
        } else if (letter === '\\') {
          escape = true;
        } else if (letter === quote) {
          quote = false;
        }
      } else if (letter === '"' || letter === '\'') {
        quote = letter;
      } else if (letter === '(') {
        func += 1;
      } else if (letter === ')') {
        if (func > 0) func -= 1;
      } else if (func === 0) {
        if (separators.indexOf(letter) !== -1) split = true;
      }

      if (split) {
        if (current !== '') array.push(current.trim());
        current = '';
        split = false;
      } else {
        current += letter;
      }
    }

    if (last || current !== '') array.push(current.trim());
    return array;
  },

  /**
   * Safely splits space-separated values (such as those for `background`,
   * `border-radius`, and other shorthand properties).
   *
   * @param {string} string Space-separated values.
   *
   * @return {string[]} Split values.
   *
   * @example
   * postcss.list.space('1px calc(10% + 1px)') //=> ['1px', 'calc(10% + 1px)']
   */
  space: function space(string) {
    var spaces = [' ', '\n', '\t'];
    return list.split(string, spaces);
  },

  /**
   * Safely splits comma-separated values (such as those for `transition-*`
   * and `background` properties).
   *
   * @param {string} string Comma-separated values.
   *
   * @return {string[]} Split values.
   *
   * @example
   * postcss.list.comma('black, linear-gradient(white, black)')
   * //=> ['black', 'linear-gradient(white, black)']
   */
  comma: function comma(string) {
    return list.split(string, [','], true);
  }
};
var _default = list;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuZXM2Il0sIm5hbWVzIjpbImxpc3QiLCJzcGxpdCIsInN0cmluZyIsInNlcGFyYXRvcnMiLCJsYXN0IiwiYXJyYXkiLCJjdXJyZW50IiwiZnVuYyIsInF1b3RlIiwiZXNjYXBlIiwiaSIsImxlbmd0aCIsImxldHRlciIsImluZGV4T2YiLCJwdXNoIiwidHJpbSIsInNwYWNlIiwic3BhY2VzIiwiY29tbWEiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7Ozs7OztBQVNBLElBQUlBLElBQUksR0FBRztBQUVUQyxFQUFBQSxLQUZTLGlCQUVGQyxNQUZFLEVBRU1DLFVBRk4sRUFFa0JDLElBRmxCLEVBRXdCO0FBQy9CLFFBQUlDLEtBQUssR0FBRyxFQUFaO0FBQ0EsUUFBSUMsT0FBTyxHQUFHLEVBQWQ7QUFDQSxRQUFJTCxLQUFLLEdBQUcsS0FBWjtBQUVBLFFBQUlNLElBQUksR0FBRyxDQUFYO0FBQ0EsUUFBSUMsS0FBSyxHQUFHLEtBQVo7QUFDQSxRQUFJQyxNQUFNLEdBQUcsS0FBYjs7QUFFQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdSLE1BQU0sQ0FBQ1MsTUFBM0IsRUFBbUNELENBQUMsRUFBcEMsRUFBd0M7QUFDdEMsVUFBSUUsTUFBTSxHQUFHVixNQUFNLENBQUNRLENBQUQsQ0FBbkI7O0FBRUEsVUFBSUYsS0FBSixFQUFXO0FBQ1QsWUFBSUMsTUFBSixFQUFZO0FBQ1ZBLFVBQUFBLE1BQU0sR0FBRyxLQUFUO0FBQ0QsU0FGRCxNQUVPLElBQUlHLE1BQU0sS0FBSyxJQUFmLEVBQXFCO0FBQzFCSCxVQUFBQSxNQUFNLEdBQUcsSUFBVDtBQUNELFNBRk0sTUFFQSxJQUFJRyxNQUFNLEtBQUtKLEtBQWYsRUFBc0I7QUFDM0JBLFVBQUFBLEtBQUssR0FBRyxLQUFSO0FBQ0Q7QUFDRixPQVJELE1BUU8sSUFBSUksTUFBTSxLQUFLLEdBQVgsSUFBa0JBLE1BQU0sS0FBSyxJQUFqQyxFQUF1QztBQUM1Q0osUUFBQUEsS0FBSyxHQUFHSSxNQUFSO0FBQ0QsT0FGTSxNQUVBLElBQUlBLE1BQU0sS0FBSyxHQUFmLEVBQW9CO0FBQ3pCTCxRQUFBQSxJQUFJLElBQUksQ0FBUjtBQUNELE9BRk0sTUFFQSxJQUFJSyxNQUFNLEtBQUssR0FBZixFQUFvQjtBQUN6QixZQUFJTCxJQUFJLEdBQUcsQ0FBWCxFQUFjQSxJQUFJLElBQUksQ0FBUjtBQUNmLE9BRk0sTUFFQSxJQUFJQSxJQUFJLEtBQUssQ0FBYixFQUFnQjtBQUNyQixZQUFJSixVQUFVLENBQUNVLE9BQVgsQ0FBbUJELE1BQW5CLE1BQStCLENBQUMsQ0FBcEMsRUFBdUNYLEtBQUssR0FBRyxJQUFSO0FBQ3hDOztBQUVELFVBQUlBLEtBQUosRUFBVztBQUNULFlBQUlLLE9BQU8sS0FBSyxFQUFoQixFQUFvQkQsS0FBSyxDQUFDUyxJQUFOLENBQVdSLE9BQU8sQ0FBQ1MsSUFBUixFQUFYO0FBQ3BCVCxRQUFBQSxPQUFPLEdBQUcsRUFBVjtBQUNBTCxRQUFBQSxLQUFLLEdBQUcsS0FBUjtBQUNELE9BSkQsTUFJTztBQUNMSyxRQUFBQSxPQUFPLElBQUlNLE1BQVg7QUFDRDtBQUNGOztBQUVELFFBQUlSLElBQUksSUFBSUUsT0FBTyxLQUFLLEVBQXhCLEVBQTRCRCxLQUFLLENBQUNTLElBQU4sQ0FBV1IsT0FBTyxDQUFDUyxJQUFSLEVBQVg7QUFDNUIsV0FBT1YsS0FBUDtBQUNELEdBM0NROztBQTZDVDs7Ozs7Ozs7Ozs7QUFXQVcsRUFBQUEsS0F4RFMsaUJBd0RGZCxNQXhERSxFQXdETTtBQUNiLFFBQUllLE1BQU0sR0FBRyxDQUFDLEdBQUQsRUFBTSxJQUFOLEVBQVksSUFBWixDQUFiO0FBQ0EsV0FBT2pCLElBQUksQ0FBQ0MsS0FBTCxDQUFXQyxNQUFYLEVBQW1CZSxNQUFuQixDQUFQO0FBQ0QsR0EzRFE7O0FBNkRUOzs7Ozs7Ozs7Ozs7QUFZQUMsRUFBQUEsS0F6RVMsaUJBeUVGaEIsTUF6RUUsRUF5RU07QUFDYixXQUFPRixJQUFJLENBQUNDLEtBQUwsQ0FBV0MsTUFBWCxFQUFtQixDQUFDLEdBQUQsQ0FBbkIsRUFBMEIsSUFBMUIsQ0FBUDtBQUNEO0FBM0VRLENBQVg7ZUErRWVGLEkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbnRhaW5zIGhlbHBlcnMgZm9yIHNhZmVseSBzcGxpdHRpbmcgbGlzdHMgb2YgQ1NTIHZhbHVlcyxcbiAqIHByZXNlcnZpbmcgcGFyZW50aGVzZXMgYW5kIHF1b3Rlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgbGlzdCA9IHBvc3Rjc3MubGlzdFxuICpcbiAqIEBuYW1lc3BhY2UgbGlzdFxuICovXG5sZXQgbGlzdCA9IHtcblxuICBzcGxpdCAoc3RyaW5nLCBzZXBhcmF0b3JzLCBsYXN0KSB7XG4gICAgbGV0IGFycmF5ID0gW11cbiAgICBsZXQgY3VycmVudCA9ICcnXG4gICAgbGV0IHNwbGl0ID0gZmFsc2VcblxuICAgIGxldCBmdW5jID0gMFxuICAgIGxldCBxdW90ZSA9IGZhbHNlXG4gICAgbGV0IGVzY2FwZSA9IGZhbHNlXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGxldHRlciA9IHN0cmluZ1tpXVxuXG4gICAgICBpZiAocXVvdGUpIHtcbiAgICAgICAgaWYgKGVzY2FwZSkge1xuICAgICAgICAgIGVzY2FwZSA9IGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAobGV0dGVyID09PSAnXFxcXCcpIHtcbiAgICAgICAgICBlc2NhcGUgPSB0cnVlXG4gICAgICAgIH0gZWxzZSBpZiAobGV0dGVyID09PSBxdW90ZSkge1xuICAgICAgICAgIHF1b3RlID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChsZXR0ZXIgPT09ICdcIicgfHwgbGV0dGVyID09PSAnXFwnJykge1xuICAgICAgICBxdW90ZSA9IGxldHRlclxuICAgICAgfSBlbHNlIGlmIChsZXR0ZXIgPT09ICcoJykge1xuICAgICAgICBmdW5jICs9IDFcbiAgICAgIH0gZWxzZSBpZiAobGV0dGVyID09PSAnKScpIHtcbiAgICAgICAgaWYgKGZ1bmMgPiAwKSBmdW5jIC09IDFcbiAgICAgIH0gZWxzZSBpZiAoZnVuYyA9PT0gMCkge1xuICAgICAgICBpZiAoc2VwYXJhdG9ycy5pbmRleE9mKGxldHRlcikgIT09IC0xKSBzcGxpdCA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKHNwbGl0KSB7XG4gICAgICAgIGlmIChjdXJyZW50ICE9PSAnJykgYXJyYXkucHVzaChjdXJyZW50LnRyaW0oKSlcbiAgICAgICAgY3VycmVudCA9ICcnXG4gICAgICAgIHNwbGl0ID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnQgKz0gbGV0dGVyXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGxhc3QgfHwgY3VycmVudCAhPT0gJycpIGFycmF5LnB1c2goY3VycmVudC50cmltKCkpXG4gICAgcmV0dXJuIGFycmF5XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNhZmVseSBzcGxpdHMgc3BhY2Utc2VwYXJhdGVkIHZhbHVlcyAoc3VjaCBhcyB0aG9zZSBmb3IgYGJhY2tncm91bmRgLFxuICAgKiBgYm9yZGVyLXJhZGl1c2AsIGFuZCBvdGhlciBzaG9ydGhhbmQgcHJvcGVydGllcykuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU3BhY2Utc2VwYXJhdGVkIHZhbHVlcy5cbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nW119IFNwbGl0IHZhbHVlcy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcG9zdGNzcy5saXN0LnNwYWNlKCcxcHggY2FsYygxMCUgKyAxcHgpJykgLy89PiBbJzFweCcsICdjYWxjKDEwJSArIDFweCknXVxuICAgKi9cbiAgc3BhY2UgKHN0cmluZykge1xuICAgIGxldCBzcGFjZXMgPSBbJyAnLCAnXFxuJywgJ1xcdCddXG4gICAgcmV0dXJuIGxpc3Quc3BsaXQoc3RyaW5nLCBzcGFjZXMpXG4gIH0sXG5cbiAgLyoqXG4gICAqIFNhZmVseSBzcGxpdHMgY29tbWEtc2VwYXJhdGVkIHZhbHVlcyAoc3VjaCBhcyB0aG9zZSBmb3IgYHRyYW5zaXRpb24tKmBcbiAgICogYW5kIGBiYWNrZ3JvdW5kYCBwcm9wZXJ0aWVzKS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBDb21tYS1zZXBhcmF0ZWQgdmFsdWVzLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmdbXX0gU3BsaXQgdmFsdWVzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBwb3N0Y3NzLmxpc3QuY29tbWEoJ2JsYWNrLCBsaW5lYXItZ3JhZGllbnQod2hpdGUsIGJsYWNrKScpXG4gICAqIC8vPT4gWydibGFjaycsICdsaW5lYXItZ3JhZGllbnQod2hpdGUsIGJsYWNrKSddXG4gICAqL1xuICBjb21tYSAoc3RyaW5nKSB7XG4gICAgcmV0dXJuIGxpc3Quc3BsaXQoc3RyaW5nLCBbJywnXSwgdHJ1ZSlcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RcbiJdLCJmaWxlIjoibGlzdC5qcyJ9


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/map-generator.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/map-generator.js ***!
  \********************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _sourceMap = _interopRequireDefault(__webpack_require__(/*! source-map */ "./node_modules/source-map/source-map.js"));

var _path = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var MapGenerator = /*#__PURE__*/function () {
  function MapGenerator(stringify, root, opts) {
    this.stringify = stringify;
    this.mapOpts = opts.map || {};
    this.root = root;
    this.opts = opts;
  }

  var _proto = MapGenerator.prototype;

  _proto.isMap = function isMap() {
    if (typeof this.opts.map !== 'undefined') {
      return !!this.opts.map;
    }

    return this.previous().length > 0;
  };

  _proto.previous = function previous() {
    var _this = this;

    if (!this.previousMaps) {
      this.previousMaps = [];
      this.root.walk(function (node) {
        if (node.source && node.source.input.map) {
          var map = node.source.input.map;

          if (_this.previousMaps.indexOf(map) === -1) {
            _this.previousMaps.push(map);
          }
        }
      });
    }

    return this.previousMaps;
  };

  _proto.isInline = function isInline() {
    if (typeof this.mapOpts.inline !== 'undefined') {
      return this.mapOpts.inline;
    }

    var annotation = this.mapOpts.annotation;

    if (typeof annotation !== 'undefined' && annotation !== true) {
      return false;
    }

    if (this.previous().length) {
      return this.previous().some(function (i) {
        return i.inline;
      });
    }

    return true;
  };

  _proto.isSourcesContent = function isSourcesContent() {
    if (typeof this.mapOpts.sourcesContent !== 'undefined') {
      return this.mapOpts.sourcesContent;
    }

    if (this.previous().length) {
      return this.previous().some(function (i) {
        return i.withContent();
      });
    }

    return true;
  };

  _proto.clearAnnotation = function clearAnnotation() {
    if (this.mapOpts.annotation === false) return;
    var node;

    for (var i = this.root.nodes.length - 1; i >= 0; i--) {
      node = this.root.nodes[i];
      if (node.type !== 'comment') continue;

      if (node.text.indexOf('# sourceMappingURL=') === 0) {
        this.root.removeChild(i);
      }
    }
  };

  _proto.setSourcesContent = function setSourcesContent() {
    var _this2 = this;

    var already = {};
    this.root.walk(function (node) {
      if (node.source) {
        var from = node.source.input.from;

        if (from && !already[from]) {
          already[from] = true;

          var relative = _this2.relative(from);

          _this2.map.setSourceContent(relative, node.source.input.css);
        }
      }
    });
  };

  _proto.applyPrevMaps = function applyPrevMaps() {
    for (var _iterator = _createForOfIteratorHelperLoose(this.previous()), _step; !(_step = _iterator()).done;) {
      var prev = _step.value;
      var from = this.relative(prev.file);

      var root = prev.root || _path.default.dirname(prev.file);

      var map = void 0;

      if (this.mapOpts.sourcesContent === false) {
        map = new _sourceMap.default.SourceMapConsumer(prev.text);

        if (map.sourcesContent) {
          map.sourcesContent = map.sourcesContent.map(function () {
            return null;
          });
        }
      } else {
        map = prev.consumer();
      }

      this.map.applySourceMap(map, from, this.relative(root));
    }
  };

  _proto.isAnnotation = function isAnnotation() {
    if (this.isInline()) {
      return true;
    }

    if (typeof this.mapOpts.annotation !== 'undefined') {
      return this.mapOpts.annotation;
    }

    if (this.previous().length) {
      return this.previous().some(function (i) {
        return i.annotation;
      });
    }

    return true;
  };

  _proto.toBase64 = function toBase64(str) {
    if (Buffer) {
      return Buffer.from(str).toString('base64');
    }

    return window.btoa(unescape(encodeURIComponent(str)));
  };

  _proto.addAnnotation = function addAnnotation() {
    var content;

    if (this.isInline()) {
      content = 'data:application/json;base64,' + this.toBase64(this.map.toString());
    } else if (typeof this.mapOpts.annotation === 'string') {
      content = this.mapOpts.annotation;
    } else {
      content = this.outputFile() + '.map';
    }

    var eol = '\n';
    if (this.css.indexOf('\r\n') !== -1) eol = '\r\n';
    this.css += eol + '/*# sourceMappingURL=' + content + ' */';
  };

  _proto.outputFile = function outputFile() {
    if (this.opts.to) {
      return this.relative(this.opts.to);
    }

    if (this.opts.from) {
      return this.relative(this.opts.from);
    }

    return 'to.css';
  };

  _proto.generateMap = function generateMap() {
    this.generateString();
    if (this.isSourcesContent()) this.setSourcesContent();
    if (this.previous().length > 0) this.applyPrevMaps();
    if (this.isAnnotation()) this.addAnnotation();

    if (this.isInline()) {
      return [this.css];
    }

    return [this.css, this.map];
  };

  _proto.relative = function relative(file) {
    if (file.indexOf('<') === 0) return file;
    if (/^\w+:\/\//.test(file)) return file;
    var from = this.opts.to ? _path.default.dirname(this.opts.to) : '.';

    if (typeof this.mapOpts.annotation === 'string') {
      from = _path.default.dirname(_path.default.resolve(from, this.mapOpts.annotation));
    }

    file = _path.default.relative(from, file);

    if (_path.default.sep === '\\') {
      return file.replace(/\\/g, '/');
    }

    return file;
  };

  _proto.sourcePath = function sourcePath(node) {
    if (this.mapOpts.from) {
      return this.mapOpts.from;
    }

    return this.relative(node.source.input.from);
  };

  _proto.generateString = function generateString() {
    var _this3 = this;

    this.css = '';
    this.map = new _sourceMap.default.SourceMapGenerator({
      file: this.outputFile()
    });
    var line = 1;
    var column = 1;
    var lines, last;
    this.stringify(this.root, function (str, node, type) {
      _this3.css += str;

      if (node && type !== 'end') {
        if (node.source && node.source.start) {
          _this3.map.addMapping({
            source: _this3.sourcePath(node),
            generated: {
              line: line,
              column: column - 1
            },
            original: {
              line: node.source.start.line,
              column: node.source.start.column - 1
            }
          });
        } else {
          _this3.map.addMapping({
            source: '<no source>',
            original: {
              line: 1,
              column: 0
            },
            generated: {
              line: line,
              column: column - 1
            }
          });
        }
      }

      lines = str.match(/\n/g);

      if (lines) {
        line += lines.length;
        last = str.lastIndexOf('\n');
        column = str.length - last;
      } else {
        column += str.length;
      }

      if (node && type !== 'start') {
        var p = node.parent || {
          raws: {}
        };

        if (node.type !== 'decl' || node !== p.last || p.raws.semicolon) {
          if (node.source && node.source.end) {
            _this3.map.addMapping({
              source: _this3.sourcePath(node),
              generated: {
                line: line,
                column: column - 2
              },
              original: {
                line: node.source.end.line,
                column: node.source.end.column - 1
              }
            });
          } else {
            _this3.map.addMapping({
              source: '<no source>',
              original: {
                line: 1,
                column: 0
              },
              generated: {
                line: line,
                column: column - 1
              }
            });
          }
        }
      }
    });
  };

  _proto.generate = function generate() {
    this.clearAnnotation();

    if (this.isMap()) {
      return this.generateMap();
    }

    var result = '';
    this.stringify(this.root, function (i) {
      result += i;
    });
    return [result];
  };

  return MapGenerator;
}();

var _default = MapGenerator;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcC1nZW5lcmF0b3IuZXM2Il0sIm5hbWVzIjpbIk1hcEdlbmVyYXRvciIsInN0cmluZ2lmeSIsInJvb3QiLCJvcHRzIiwibWFwT3B0cyIsIm1hcCIsImlzTWFwIiwicHJldmlvdXMiLCJsZW5ndGgiLCJwcmV2aW91c01hcHMiLCJ3YWxrIiwibm9kZSIsInNvdXJjZSIsImlucHV0IiwiaW5kZXhPZiIsInB1c2giLCJpc0lubGluZSIsImlubGluZSIsImFubm90YXRpb24iLCJzb21lIiwiaSIsImlzU291cmNlc0NvbnRlbnQiLCJzb3VyY2VzQ29udGVudCIsIndpdGhDb250ZW50IiwiY2xlYXJBbm5vdGF0aW9uIiwibm9kZXMiLCJ0eXBlIiwidGV4dCIsInJlbW92ZUNoaWxkIiwic2V0U291cmNlc0NvbnRlbnQiLCJhbHJlYWR5IiwiZnJvbSIsInJlbGF0aXZlIiwic2V0U291cmNlQ29udGVudCIsImNzcyIsImFwcGx5UHJldk1hcHMiLCJwcmV2IiwiZmlsZSIsInBhdGgiLCJkaXJuYW1lIiwibW96aWxsYSIsIlNvdXJjZU1hcENvbnN1bWVyIiwiY29uc3VtZXIiLCJhcHBseVNvdXJjZU1hcCIsImlzQW5ub3RhdGlvbiIsInRvQmFzZTY0Iiwic3RyIiwiQnVmZmVyIiwidG9TdHJpbmciLCJ3aW5kb3ciLCJidG9hIiwidW5lc2NhcGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJhZGRBbm5vdGF0aW9uIiwiY29udGVudCIsIm91dHB1dEZpbGUiLCJlb2wiLCJ0byIsImdlbmVyYXRlTWFwIiwiZ2VuZXJhdGVTdHJpbmciLCJ0ZXN0IiwicmVzb2x2ZSIsInNlcCIsInJlcGxhY2UiLCJzb3VyY2VQYXRoIiwiU291cmNlTWFwR2VuZXJhdG9yIiwibGluZSIsImNvbHVtbiIsImxpbmVzIiwibGFzdCIsInN0YXJ0IiwiYWRkTWFwcGluZyIsImdlbmVyYXRlZCIsIm9yaWdpbmFsIiwibWF0Y2giLCJsYXN0SW5kZXhPZiIsInAiLCJwYXJlbnQiLCJyYXdzIiwic2VtaWNv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YUFBcEI7QUFLRDtBQUNGO0FBQ0Y7QUFDRixLQXBERDtBQXFERCxHOztTQUVEYyxRLEdBQUEsb0JBQVk7QUFDVixTQUFLekQsZUFBTDs7QUFFQSxRQUFJLEtBQUtsQixLQUFMLEVBQUosRUFBa0I7QUFDaEIsYUFBTyxLQUFLb0QsV0FBTCxFQUFQO0FBQ0Q7O0FBRUQsUUFBSXdCLE1BQU0sR0FBRyxFQUFiO0FBQ0EsU0FBS2pGLFNBQUwsQ0FBZSxLQUFLQyxJQUFwQixFQUEwQixVQUFBa0IsQ0FBQyxFQUFJO0FBQzdCOEQsTUFBQUEsTUFBTSxJQUFJOUQsQ0FBVjtBQUNELEtBRkQ7QUFHQSxXQUFPLENBQUM4RCxNQUFELENBQVA7QUFDRCxHOzs7OztlQUdZbEYsWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb3ppbGxhIGZyb20gJ3NvdXJjZS1tYXAnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5jbGFzcyBNYXBHZW5lcmF0b3Ige1xuICBjb25zdHJ1Y3RvciAoc3RyaW5naWZ5LCByb290LCBvcHRzKSB7XG4gICAgdGhpcy5zdHJpbmdpZnkgPSBzdHJpbmdpZnlcbiAgICB0aGlzLm1hcE9wdHMgPSBvcHRzLm1hcCB8fCB7IH1cbiAgICB0aGlzLnJvb3QgPSByb290XG4gICAgdGhpcy5vcHRzID0gb3B0c1xuICB9XG5cbiAgaXNNYXAgKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRzLm1hcCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiAhIXRoaXMub3B0cy5tYXBcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJldmlvdXMoKS5sZW5ndGggPiAwXG4gIH1cblxuICBwcmV2aW91cyAoKSB7XG4gICAgaWYgKCF0aGlzLnByZXZpb3VzTWFwcykge1xuICAgICAgdGhpcy5wcmV2aW91c01hcHMgPSBbXVxuICAgICAgdGhpcy5yb290LndhbGsobm9kZSA9PiB7XG4gICAgICAgIGlmIChub2RlLnNvdXJjZSAmJiBub2RlLnNvdXJjZS5pbnB1dC5tYXApIHtcbiAgICAgICAgICBsZXQgbWFwID0gbm9kZS5zb3VyY2UuaW5wdXQubWFwXG4gICAgICAgICAgaWYgKHRoaXMucHJldmlvdXNNYXBzLmluZGV4T2YobWFwKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNNYXBzLnB1c2gobWFwKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wcmV2aW91c01hcHNcbiAgfVxuXG4gIGlzSW5saW5lICgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMubWFwT3B0cy5pbmxpbmUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBPcHRzLmlubGluZVxuICAgIH1cblxuICAgIGxldCBhbm5vdGF0aW9uID0gdGhpcy5tYXBPcHRzLmFubm90YXRpb25cbiAgICBpZiAodHlwZW9mIGFubm90YXRpb24gIT09ICd1bmRlZmluZWQnICYmIGFubm90YXRpb24gIT09IHRydWUpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmICh0aGlzLnByZXZpb3VzKCkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcmV2aW91cygpLnNvbWUoaSA9PiBpLmlubGluZSlcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlzU291cmNlc0NvbnRlbnQgKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5tYXBPcHRzLnNvdXJjZXNDb250ZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRoaXMubWFwT3B0cy5zb3VyY2VzQ29udGVudFxuICAgIH1cbiAgICBpZiAodGhpcy5wcmV2aW91cygpLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJldmlvdXMoKS5zb21lKGkgPT4gaS53aXRoQ29udGVudCgpKVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgY2xlYXJBbm5vdGF0aW9uICgpIHtcbiAgICBpZiAodGhpcy5tYXBPcHRzLmFubm90YXRpb24gPT09IGZhbHNlKSByZXR1cm5cblxuICAgIGxldCBub2RlXG4gICAgZm9yIChsZXQgaSA9IHRoaXMucm9vdC5ub2Rlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgbm9kZSA9IHRoaXMucm9vdC5ub2Rlc1tpXVxuICAgICAgaWYgKG5vZGUudHlwZSAhPT0gJ2NvbW1lbnQnKSBjb250aW51ZVxuICAgICAgaWYgKG5vZGUudGV4dC5pbmRleE9mKCcjIHNvdXJjZU1hcHBpbmdVUkw9JykgPT09IDApIHtcbiAgICAgICAgdGhpcy5yb290LnJlbW92ZUNoaWxkKGkpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0U291cmNlc0NvbnRlbnQgKCkge1xuICAgIGxldCBhbHJlYWR5ID0geyB9XG4gICAgdGhpcy5yb290LndhbGsobm9kZSA9PiB7XG4gICAgICBpZiAobm9kZS5zb3VyY2UpIHtcbiAgICAgICAgbGV0IGZyb20gPSBub2RlLnNvdXJjZS5pbnB1dC5mcm9tXG4gICAgICAgIGlmIChmcm9tICYmICFhbHJlYWR5W2Zyb21dKSB7XG4gICAgICAgICAgYWxyZWFkeVtmcm9tXSA9IHRydWVcbiAgICAgICAgICBsZXQgcmVsYXRpdmUgPSB0aGlzLnJlbGF0aXZlKGZyb20pXG4gICAgICAgICAgdGhpcy5tYXAuc2V0U291cmNlQ29udGVudChyZWxhdGl2ZSwgbm9kZS5zb3VyY2UuaW5wdXQuY3NzKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGFwcGx5UHJldk1hcHMgKCkge1xuICAgIGZvciAobGV0IHByZXYgb2YgdGhpcy5wcmV2aW91cygpKSB7XG4gICAgICBsZXQgZnJvbSA9IHRoaXMucmVsYXRpdmUocHJldi5maWxlKVxuICAgICAgbGV0IHJvb3QgPSBwcmV2LnJvb3QgfHwgcGF0aC5kaXJuYW1lKHByZXYuZmlsZSlcbiAgICAgIGxldCBtYXBcblxuICAgICAgaWYgKHRoaXMubWFwT3B0cy5zb3VyY2VzQ29udGVudCA9PT0gZmFsc2UpIHtcbiAgICAgICAgbWFwID0gbmV3IG1vemlsbGEuU291cmNlTWFwQ29uc3VtZXIocHJldi50ZXh0KVxuICAgICAgICBpZiAobWFwLnNvdXJjZXNDb250ZW50KSB7XG4gICAgICAgICAgbWFwLnNvdXJjZXNDb250ZW50ID0gbWFwLnNvdXJjZXNDb250ZW50Lm1hcCgoKSA9PiBudWxsKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXAgPSBwcmV2LmNvbnN1bWVyKClcbiAgICAgIH1cblxuICAgICAgdGhpcy5tYXAuYXBwbHlTb3VyY2VNYXAobWFwLCBmcm9tLCB0aGlzLnJlbGF0aXZlKHJvb3QpKVxuICAgIH1cbiAgfVxuXG4gIGlzQW5ub3RhdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaXNJbmxpbmUoKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm1hcE9wdHMuYW5ub3RhdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcE9wdHMuYW5ub3RhdGlvblxuICAgIH1cbiAgICBpZiAodGhpcy5wcmV2aW91cygpLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJldmlvdXMoKS5zb21lKGkgPT4gaS5hbm5vdGF0aW9uKVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgdG9CYXNlNjQgKHN0cikge1xuICAgIGlmIChCdWZmZXIpIHtcbiAgICAgIHJldHVybiBCdWZmZXIuZnJvbShzdHIpLnRvU3RyaW5nKCdiYXNlNjQnKVxuICAgIH1cbiAgICByZXR1cm4gd2luZG93LmJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpKVxuICB9XG5cbiAgYWRkQW5ub3RhdGlvbiAoKSB7XG4gICAgbGV0IGNvbnRlbnRcblxuICAgIGlmICh0aGlzLmlzSW5saW5lKCkpIHtcbiAgICAgIGNvbnRlbnQgPSAnZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICtcbiAgICAgICAgICAgICAgICB0aGlzLnRvQmFzZTY0KHRoaXMubWFwLnRvU3RyaW5nKCkpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5tYXBPcHRzLmFubm90YXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gdGhpcy5tYXBPcHRzLmFubm90YXRpb25cbiAgICB9IGVsc2Uge1xuICAgICAgY29udGVudCA9IHRoaXMub3V0cHV0RmlsZSgpICsgJy5tYXAnXG4gICAgfVxuXG4gICAgbGV0IGVvbCA9ICdcXG4nXG4gICAgaWYgKHRoaXMuY3NzLmluZGV4T2YoJ1xcclxcbicpICE9PSAtMSkgZW9sID0gJ1xcclxcbidcblxuICAgIHRoaXMuY3NzICs9IGVvbCArICcvKiMgc291cmNlTWFwcGluZ1VSTD0nICsgY29udGVudCArICcgKi8nXG4gIH1cblxuICBvdXRwdXRGaWxlICgpIHtcbiAgICBpZiAodGhpcy5vcHRzLnRvKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWxhdGl2ZSh0aGlzLm9wdHMudG8pXG4gICAgfVxuICAgIGlmICh0aGlzLm9wdHMuZnJvbSkge1xuICAgICAgcmV0dXJuIHRoaXMucmVsYXRpdmUodGhpcy5vcHRzLmZyb20pXG4gICAgfVxuICAgIHJldHVybiAndG8uY3NzJ1xuICB9XG5cbiAgZ2VuZXJhdGVNYXAgKCkge1xuICAgIHRoaXMuZ2VuZXJhdGVTdHJpbmcoKVxuICAgIGlmICh0aGlzLmlzU291cmNlc0NvbnRlbnQoKSkgdGhpcy5zZXRTb3VyY2VzQ29udGVudCgpXG4gICAgaWYgKHRoaXMucHJldmlvdXMoKS5sZW5ndGggPiAwKSB0aGlzLmFwcGx5UHJldk1hcHMoKVxuICAgIGlmICh0aGlzLmlzQW5ub3RhdGlvbigpKSB0aGlzLmFkZEFubm90YXRpb24oKVxuXG4gICAgaWYgKHRoaXMuaXNJbmxpbmUoKSkge1xuICAgICAgcmV0dXJuIFt0aGlzLmNzc11cbiAgICB9XG4gICAgcmV0dXJuIFt0aGlzLmNzcywgdGhpcy5tYXBdXG4gIH1cblxuICByZWxhdGl2ZSAoZmlsZSkge1xuICAgIGlmIChmaWxlLmluZGV4T2YoJzwnKSA9PT0gMCkgcmV0dXJuIGZpbGVcbiAgICBpZiAoL15cXHcrOlxcL1xcLy8udGVzdChmaWxlKSkgcmV0dXJuIGZpbGVcblxuICAgIGxldCBmcm9tID0gdGhpcy5vcHRzLnRvID8gcGF0aC5kaXJuYW1lKHRoaXMub3B0cy50bykgOiAnLidcblxuICAgIGlmICh0eXBlb2YgdGhpcy5tYXBPcHRzLmFubm90YXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICBmcm9tID0gcGF0aC5kaXJuYW1lKHBhdGgucmVzb2x2ZShmcm9tLCB0aGlzLm1hcE9wdHMuYW5ub3RhdGlvbikpXG4gICAgfVxuXG4gICAgZmlsZSA9IHBhdGgucmVsYXRpdmUoZnJvbSwgZmlsZSlcbiAgICBpZiAocGF0aC5zZXAgPT09ICdcXFxcJykge1xuICAgICAgcmV0dXJuIGZpbGUucmVwbGFjZSgvXFxcXC9nLCAnLycpXG4gICAgfVxuICAgIHJldHVybiBmaWxlXG4gIH1cblxuICBzb3VyY2VQYXRoIChub2RlKSB7XG4gICAgaWYgKHRoaXMubWFwT3B0cy5mcm9tKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBPcHRzLmZyb21cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVsYXRpdmUobm9kZS5zb3VyY2UuaW5wdXQuZnJvbSlcbiAgfVxuXG4gIGdlbmVyYXRlU3RyaW5nICgpIHtcbiAgICB0aGlzLmNzcyA9ICcnXG4gICAgdGhpcy5tYXAgPSBuZXcgbW96aWxsYS5Tb3VyY2VNYXBHZW5lcmF0b3IoeyBmaWxlOiB0aGlzLm91dHB1dEZpbGUoKSB9KVxuXG4gICAgbGV0IGxpbmUgPSAxXG4gICAgbGV0IGNvbHVtbiA9IDFcblxuICAgIGxldCBsaW5lcywgbGFzdFxuICAgIHRoaXMuc3RyaW5naWZ5KHRoaXMucm9vdCwgKHN0ciwgbm9kZSwgdHlwZSkgPT4ge1xuICAgICAgdGhpcy5jc3MgKz0gc3RyXG5cbiAgICAgIGlmIChub2RlICYmIHR5cGUgIT09ICdlbmQnKSB7XG4gICAgICAgIGlmIChub2RlLnNvdXJjZSAmJiBub2RlLnNvdXJjZS5zdGFydCkge1xuICAgICAgICAgIHRoaXMubWFwLmFkZE1hcHBpbmcoe1xuICAgICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZVBhdGgobm9kZSksXG4gICAgICAgICAgICBnZW5lcmF0ZWQ6IHsgbGluZSwgY29sdW1uOiBjb2x1bW4gLSAxIH0sXG4gICAgICAgICAgICBvcmlnaW5hbDoge1xuICAgICAgICAgICAgICBsaW5lOiBub2RlLnNvdXJjZS5zdGFydC5saW5lLFxuICAgICAgICAgICAgICBjb2x1bW46IG5vZGUuc291cmNlLnN0YXJ0LmNvbHVtbiAtIDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWFwLmFkZE1hcHBpbmcoe1xuICAgICAgICAgICAgc291cmNlOiAnPG5vIHNvdXJjZT4nLFxuICAgICAgICAgICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAwIH0sXG4gICAgICAgICAgICBnZW5lcmF0ZWQ6IHsgbGluZSwgY29sdW1uOiBjb2x1bW4gLSAxIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpbmVzID0gc3RyLm1hdGNoKC9cXG4vZylcbiAgICAgIGlmIChsaW5lcykge1xuICAgICAgICBsaW5lICs9IGxpbmVzLmxlbmd0aFxuICAgICAgICBsYXN0ID0gc3RyLmxhc3RJbmRleE9mKCdcXG4nKVxuICAgICAgICBjb2x1bW4gPSBzdHIubGVuZ3RoIC0gbGFzdFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sdW1uICs9IHN0ci5sZW5ndGhcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUgJiYgdHlwZSAhPT0gJ3N0YXJ0Jykge1xuICAgICAgICBsZXQgcCA9IG5vZGUucGFyZW50IHx8IHsgcmF3czogeyB9IH1cbiAgICAgICAgaWYgKG5vZGUudHlwZSAhPT0gJ2RlY2wnIHx8IG5vZGUgIT09IHAubGFzdCB8fCBwLnJhd3Muc2VtaWNvbG9uKSB7XG4gICAgICAgICAgaWYgKG5vZGUuc291cmNlICYmIG5vZGUuc291cmNlLmVuZCkge1xuICAgICAgICAgICAgdGhpcy5tYXAuYWRkTWFwcGluZyh7XG4gICAgICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2VQYXRoKG5vZGUpLFxuICAgICAgICAgICAgICBnZW5lcmF0ZWQ6IHsgbGluZSwgY29sdW1uOiBjb2x1bW4gLSAyIH0sXG4gICAgICAgICAgICAgIG9yaWdpbmFsOiB7XG4gICAgICAgICAgICAgICAgbGluZTogbm9kZS5zb3VyY2UuZW5kLmxpbmUsXG4gICAgICAgICAgICAgICAgY29sdW1uOiBub2RlLnNvdXJjZS5lbmQuY29sdW1uIC0gMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1hcC5hZGRNYXBwaW5nKHtcbiAgICAgICAgICAgICAgc291cmNlOiAnPG5vIHNvdXJjZT4nLFxuICAgICAgICAgICAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDAgfSxcbiAgICAgICAgICAgICAgZ2VuZXJhdGVkOiB7IGxpbmUsIGNvbHVtbjogY29sdW1uIC0gMSB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBnZW5lcmF0ZSAoKSB7XG4gICAgdGhpcy5jbGVhckFubm90YXRpb24oKVxuXG4gICAgaWYgKHRoaXMuaXNNYXAoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVNYXAoKVxuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSAnJ1xuICAgIHRoaXMuc3RyaW5naWZ5KHRoaXMucm9vdCwgaSA9PiB7XG4gICAgICByZXN1bHQgKz0gaVxuICAgIH0pXG4gICAgcmV0dXJuIFtyZXN1bHRdXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFwR2VuZXJhdG9yXG4iXSwiZmlsZSI6Im1hcC1nZW5lcmF0b3IuanMifQ==


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/node.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/node.js ***!
  \***********************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _cssSyntaxError = _interopRequireDefault(__webpack_require__(/*! ./css-syntax-error */ "./node_modules/@linaria/server/node_modules/postcss/lib/css-syntax-error.js"));

var _stringifier = _interopRequireDefault(__webpack_require__(/*! ./stringifier */ "./node_modules/@linaria/server/node_modules/postcss/lib/stringifier.js"));

var _stringify = _interopRequireDefault(__webpack_require__(/*! ./stringify */ "./node_modules/@linaria/server/node_modules/postcss/lib/stringify.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cloneNode(obj, parent) {
  var cloned = new obj.constructor();

  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    var value = obj[i];
    var type = typeof value;

    if (i === 'parent' && type === 'object') {
      if (parent) cloned[i] = parent;
    } else if (i === 'source') {
      cloned[i] = value;
    } else if (value instanceof Array) {
      cloned[i] = value.map(function (j) {
        return cloneNode(j, cloned);
      });
    } else {
      if (type === 'object' && value !== null) value = cloneNode(value);
      cloned[i] = value;
    }
  }

  return cloned;
}
/**
 * All node classes inherit the following common methods.
 *
 * @abstract
 */


var Node = /*#__PURE__*/function () {
  /**
   * @param {object} [defaults] Value for node properties.
   */
  function Node(defaults) {
    if (defaults === void 0) {
      defaults = {};
    }

    this.raws = {};

    if (true) {
      if (typeof defaults !== 'object' && typeof defaults !== 'undefined') {
        throw new Error('PostCSS nodes constructor accepts object, not ' + JSON.stringify(defaults));
      }
    }

    for (var name in defaults) {
      this[name] = defaults[name];
    }
  }
  /**
   * Returns a `CssSyntaxError` instance containing the original position
   * of the node in the source, showing line and column numbers and also
   * a small excerpt to facilitate debugging.
   *
   * If present, an input source map will be used to get the original position
   * of the source, even from a previous compilation step
   * (e.g., from Sass compilation).
   *
   * This method produces very useful error messages.
   *
   * @param {string} message     Error description.
   * @param {object} [opts]      Options.
   * @param {string} opts.plugin Plugin name that created this error.
   *                             PostCSS will set it automatically.
   * @param {string} opts.word   A word inside a node’s string that should
   *                             be highlighted as the source of the error.
   * @param {number} opts.index  An index inside a node’s string that should
   *                             be highlighted as the source of the error.
   *
   * @return {CssSyntaxError} Error object to throw it.
   *
   * @example
   * if (!variables[name]) {
   *   throw decl.error('Unknown variable ' + name, { word: name })
   *   // CssSyntaxError: postcss-vars:a.sass:4:3: Unknown variable $black
   *   //   color: $black
   *   // a
   *   //          ^
   *   //   background: white
   * }
   */


  var _proto = Node.prototype;

  _proto.error = function error(message, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (this.source) {
      var pos = this.positionBy(opts);
      return this.source.input.error(message, pos.line, pos.column, opts);
    }

    return new _cssSyntaxError.default(message);
  }
  /**
   * This method is provided as a convenience wrapper for {@link Result#warn}.
   *
   * @param {Result} result      The {@link Result} instance
   *                             that will receive the warning.
   * @param {string} text        Warning message.
   * @param {object} [opts]      Options
   * @param {string} opts.plugin Plugin name that created this warning.
   *                             PostCSS will set it automatically.
   * @param {string} opts.word   A word inside a node’s string that should
   *                             be highlighted as the source of the warning.
   * @param {number} opts.index  An index inside a node’s string that should
   *                             be highlighted as the source of the warning.
   *
   * @return {Warning} Created warning object.
   *
   * @example
   * const plugin = postcss.plugin('postcss-deprecated', () => {
   *   return (root, result) => {
   *     root.walkDecls('bad', decl => {
   *       decl.warn(result, 'Deprecated property bad')
   *     })
   *   }
   * })
   */
  ;

  _proto.warn = function warn(result, text, opts) {
    var data = {
      node: this
    };

    for (var i in opts) {
      data[i] = opts[i];
    }

    return result.warn(text, data);
  }
  /**
   * Removes the node from its parent and cleans the parent properties
   * from the node and its children.
   *
   * @example
   * if (decl.prop.match(/^-webkit-/)) {
   *   decl.remove()
   * }
   *
   * @return {Node} Node to make calls chain.
   */
  ;

  _proto.remove = function remove() {
    if (this.parent) {
      this.parent.removeChild(this);
    }

    this.parent = undefined;
    return this;
  }
  /**
   * Returns a CSS string representing the node.
   *
   * @param {stringifier|syntax} [stringifier] A syntax to use
   *                                           in string generation.
   *
   * @return {string} CSS string of this node.
   *
   * @example
   * postcss.rule({ selector: 'a' }).toString() //=> "a {}"
   */
  ;

  _proto.toString = function toString(stringifier) {
    if (stringifier === void 0) {
      stringifier = _stringify.default;
    }

    if (stringifier.stringify) stringifier = stringifier.stringify;
    var result = '';
    stringifier(this, function (i) {
      result += i;
    });
    return result;
  }
  /**
   * Returns an exact clone of the node.
   *
   * The resulting cloned node and its (cloned) children will retain
   * code style properties.
   *
   * @param {object} [overrides] New properties to override in the clone.
   *
   * @example
   * decl.raws.before    //=> "\n  "
   * const cloned = decl.clone({ prop: '-moz-' + decl.prop })
   * cloned.raws.before  //=> "\n  "
   * cloned.toString()   //=> -moz-transform: scale(0)
   *
   * @return {Node} Clone of the node.
   */
  ;

  _proto.clone = function clone(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }

    var cloned = cloneNode(this);

    for (var name in overrides) {
      cloned[name] = overrides[name];
    }

    return cloned;
  }
  /**
   * Shortcut to clone the node and insert the resulting cloned node
   * before the current node.
   *
   * @param {object} [overrides] Mew properties to override in the clone.
   *
   * @example
   * decl.cloneBefore({ prop: '-moz-' + decl.prop })
   *
   * @return {Node} New node
   */
  ;

  _proto.cloneBefore = function cloneBefore(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }

    var cloned = this.clone(overrides);
    this.parent.insertBefore(this, cloned);
    return cloned;
  }
  /**
   * Shortcut to clone the node and insert the resulting cloned node
   * after the current node.
   *
   * @param {object} [overrides] New properties to override in the clone.
   *
   * @return {Node} New node.
   */
  ;

  _proto.cloneAfter = function cloneAfter(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }

    var cloned = this.clone(overrides);
    this.parent.insertAfter(this, cloned);
    return cloned;
  }
  /**
   * Inserts node(s) before the current node and removes the current node.
   *
   * @param {...Node} nodes Mode(s) to replace current one.
   *
   * @example
   * if (atrule.name === 'mixin') {
   *   atrule.replaceWith(mixinRules[atrule.params])
   * }
   *
   * @return {Node} Current node to methods chain.
   */
  ;

  _proto.replaceWith = function replaceWith() {
    if (this.parent) {
      for (var _len = arguments.length, nodes = new Array(_len), _key = 0; _key < _len; _key++) {
        nodes[_key] = arguments[_key];
      }

      for (var _i = 0, _nodes = nodes; _i < _nodes.length; _i++) {
        var node = _nodes[_i];
        this.parent.insertBefore(this, node);
      }

      this.remove();
    }

    return this;
  }
  /**
   * Returns the next child of the node’s parent.
   * Returns `undefined` if the current node is the last child.
   *
   * @return {Node|undefined} Next node.
   *
   * @example
   * if (comment.text === 'delete next') {
   *   const next = comment.next()
   *   if (next) {
   *     next.remove()
   *   }
   * }
   */
  ;

  _proto.next = function next() {
    if (!this.parent) return undefined;
    var index = this.parent.index(this);
    return this.parent.nodes[index + 1];
  }
  /**
   * Returns the previous child of the node’s parent.
   * Returns `undefined` if the current node is the first child.
   *
   * @return {Node|undefined} Previous node.
   *
   * @example
   * const annotation = decl.prev()
   * if (annotation.type === 'comment') {
   *   readAnnotation(annotation.text)
   * }
   */
  ;

  _proto.prev = function prev() {
    if (!this.parent) return undefined;
    var index = this.parent.index(this);
    return this.parent.nodes[index - 1];
  }
  /**
   * Insert new node before current node to current node’s parent.
   *
   * Just alias for `node.parent.insertBefore(node, add)`.
   *
   * @param {Node|object|string|Node[]} add New node.
   *
   * @return {Node} This node for methods chain.
   *
   * @example
   * decl.before('content: ""')
   */
  ;

  _proto.before = function before(add) {
    this.parent.insertBefore(this, add);
    return this;
  }
  /**
   * Insert new node after current node to current node’s parent.
   *
   * Just alias for `node.parent.insertAfter(node, add)`.
   *
   * @param {Node|object|string|Node[]} add New node.
   *
   * @return {Node} This node for methods chain.
   *
   * @example
   * decl.after('color: black')
   */
  ;

  _proto.after = function after(add) {
    this.parent.insertAfter(this, add);
    return this;
  };

  _proto.toJSON = function toJSON() {
    var fixed = {};

    for (var name in this) {
      if (!this.hasOwnProperty(name)) continue;
      if (name === 'parent') continue;
      var value = this[name];

      if (value instanceof Array) {
        fixed[name] = value.map(function (i) {
          if (typeof i === 'object' && i.toJSON) {
            return i.toJSON();
          } else {
            return i;
          }
        });
      } else if (typeof value === 'object' && value.toJSON) {
        fixed[name] = value.toJSON();
      } else {
        fixed[name] = value;
      }
    }

    return fixed;
  }
  /**
   * Returns a {@link Node#raws} value. If the node is missing
   * the code style property (because the node was manually built or cloned),
   * PostCSS will try to autodetect the code style property by looking
   * at other nodes in the tree.
   *
   * @param {string} prop          Name of code style property.
   * @param {string} [defaultType] Name of default value, it can be missed
   *                               if the value is the same as prop.
   *
   * @example
   * const root = postcss.parse('a { background: white }')
   * root.nodes[0].append({ prop: 'color', value: 'black' })
   * root.nodes[0].nodes[1].raws.before   //=> undefined
   * root.nodes[0].nodes[1].raw('before') //=> ' '
   *
   * @return {string} Code style value.
   */
  ;

  _proto.raw = function raw(prop, defaultType) {
    var str = new _stringifier.default();
    return str.raw(this, prop, defaultType);
  }
  /**
   * Finds the Root instance of the node’s tree.
   *
   * @example
   * root.nodes[0].nodes[0].root() === root
   *
   * @return {Root} Root parent.
   */
  ;

  _proto.root = function root() {
    var result = this;

    while (result.parent) {
      result = result.parent;
    }

    return result;
  }
  /**
   * Clear the code style properties for the node and its children.
   *
   * @param {boolean} [keepBetween] Keep the raws.between symbols.
   *
   * @return {undefined}
   *
   * @example
   * node.raws.before  //=> ' '
   * node.cleanRaws()
   * node.raws.before  //=> undefined
   */
  ;

  _proto.cleanRaws = function cleanRaws(keepBetween) {
    delete this.raws.before;
    delete this.raws.after;
    if (!keepBetween) delete this.raws.between;
  };

  _proto.positionInside = function positionInside(index) {
    var string = this.toString();
    var column = this.source.start.column;
    var line = this.source.start.line;

    for (var i = 0; i < index; i++) {
      if (string[i] === '\n') {
        column = 1;
        line += 1;
      } else {
        column += 1;
      }
    }

    return {
      line: line,
      column: column
    };
  };

  _proto.positionBy = function positionBy(opts) {
    var pos = this.source.start;

    if (opts.index) {
      pos = this.positionInside(opts.index);
    } else if (opts.word) {
      var index = this.toString().indexOf(opts.word);
      if (index !== -1) pos = this.positionInside(index);
    }

    return pos;
  }
  /**
   * @memberof Node#
   * @member {string} type String representing the node’s type.
   *                       Possible values are `root`, `atrule`, `rule`,
   *                       `decl`, or `comment`.
   *
   * @example
   * postcss.decl({ prop: 'color', value: 'black' }).type //=> 'decl'
   */

  /**
   * @memberof Node#
   * @member {Container} parent The node’s parent node.
   *
   * @example
   * root.nodes[0].parent === root
   */

  /**
   * @memberof Node#
   * @member {source} source The input source of the node.
   *
   * The property is used in source map generation.
   *
   * If you create a node manually (e.g., with `postcss.decl()`),
   * that node will not have a `source` property and will be absent
   * from the source map. For this reason, the plugin developer should
   * consider cloning nodes to create new ones (in which case the new node’s
   * source will reference the original, cloned node) or setting
   * the `source` property manually.
   *
   * ```js
   * // Bad
   * const prefixed = postcss.decl({
   *   prop: '-moz-' + decl.prop,
   *   value: decl.value
   * })
   *
   * // Good
   * const prefixed = decl.clone({ prop: '-moz-' + decl.prop })
   * ```
   *
   * ```js
   * if (atrule.name === 'add-link') {
   *   const rule = postcss.rule({ selector: 'a', source: atrule.source })
   *   atrule.parent.insertBefore(atrule, rule)
   * }
   * ```
   *
   * @example
   * decl.source.input.from //=> '/home/ai/a.sass'
   * decl.source.start      //=> { line: 10, column: 2 }
   * decl.source.end        //=> { line: 10, column: 12 }
   */

  /**
   * @memberof Node#
   * @member {object} raws Information to generate byte-to-byte equal
   *                       node string as it was in the origin input.
   *
   * Every parser saves its own properties,
   * but the default CSS parser uses:
   *
   * * `before`: the space symbols before the node. It also stores `*`
   *   and `_` symbols before the declaration (IE hack).
   * * `after`: the space symbols after the last child of the node
   *   to the end of the node.
   * * `between`: the symbols between the property and value
   *   for declarations, selector and `{` for rules, or last parameter
   *   and `{` for at-rules.
   * * `semicolon`: contains true if the last child has
   *   an (optional) semicolon.
   * * `afterName`: the space between the at-rule name and its parameters.
   * * `left`: the space symbols between `/*` and the comment’s text.
   * * `right`: the space symbols between the comment’s text
   *   and <code>*&#47;</code>.
   * * `important`: the content of the important statement,
   *   if it is not just `!important`.
   *
   * PostCSS cleans selectors, declaration values and at-rule parameters
   * from comments and extra spaces, but it stores origin content in raws
   * properties. As such, if you don’t change a declaration’s value,
   * PostCSS will use the raw value with comments.
   *
   * @example
   * const root = postcss.parse('a {\n  color:black\n}')
   * root.first.first.raws //=> { before: '\n  ', between: ':' }
   */
  ;

  return Node;
}();

var _default = Node;
/**
 * @typedef {object} position
 * @property {number} line   Source line in file.
 * @property {number} column Source column in file.
 */

/**
 * @typedef {object} source
 * @property {Input} input    {@link Input} with input file
 * @property {position} start The starting position of the node’s source.
 * @property {position} end   The ending position of the node’s source.
 */

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGUuZXM2Il0sIm5hbWVzIjpbImNsb25lTm9kZSIsIm9iaiIsInBhcmVudCIsImNsb25lZCIsImNvbnN0cnVjdG9yIiwiaSIsImhhc093blByb3BlcnR5IiwidmFsdWUiLCJ0eXBlIiwiQXJyYXkiLCJtYXAiLCJqIiwiTm9kZSIsImRlZmF1bHRzIiwicmF3cyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hbWUiLCJlcnJvciIsIm1lc3NhZ2UiLCJvcHRzIiwic291cmNlIiwicG9zIiwicG9zaXRpb25CeSIsImlucHV0IiwibGluZSIsImNvbHVtbiIsIkNzc1N5bnRheEVycm9yIiwid2FybiIsInJlc3VsdCIsInRleHQiLCJkYXRhIiwibm9kZSIsInJlbW92ZSIsInJlbW92ZUNoaWxkIiwidW5kZWZpbmVkIiwidG9TdHJpbmciLCJzdHJpbmdpZmllciIsImNsb25lIiwib3ZlcnJpZGVzIiwiY2xvbmVCZWZvcmUiLCJpbnNlcnRCZWZvcmUiLCJjbG9uZUFmdGVyIiwiaW5zZXJ0QWZ0ZXIiLCJyZXBsYWNlV2l0aCIsIm5vZGVzIiwibmV4dCIsImluZGV4IiwicHJldiIsImJlZm9yZSIsImFkZCIsImFmdGVyIiwidG9KU09OIiwiZml4ZWQiLCJyYXciLCJwcm9wIiwiZGVmYXVsdFR5cGUiLCJzdHIiLCJTdHJpbmdpZmllciIsInJvb3QiLCJjbGVhblJhd3MiLCJrZWVwQmV0d2VlbiIsImJldHdlZW4iLCJwb3NpdGlvbkluc2lkZSIsInN0cmluZyIsInN0YXJ0Iiwid29yZCIsImluZGV4T2YiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxTQUFTQSxTQUFULENBQW9CQyxHQUFwQixFQUF5QkMsTUFBekIsRUFBaUM7QUFDL0IsTUFBSUMsTUFBTSxHQUFHLElBQUlGLEdBQUcsQ0FBQ0csV0FBUixFQUFiOztBQUVBLE9BQUssSUFBSUMsQ0FBVCxJQUFjSixHQUFkLEVBQW1C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Y3NzLXN5bnRheC1lcnJvcidcbmltcG9ydCBTdHJpbmdpZmllciBmcm9tICcuL3N0cmluZ2lmaWVyJ1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICcuL3N0cmluZ2lmeSdcblxuZnVuY3Rpb24gY2xvbmVOb2RlIChvYmosIHBhcmVudCkge1xuICBsZXQgY2xvbmVkID0gbmV3IG9iai5jb25zdHJ1Y3RvcigpXG5cbiAgZm9yIChsZXQgaSBpbiBvYmopIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWVcbiAgICBsZXQgdmFsdWUgPSBvYmpbaV1cbiAgICBsZXQgdHlwZSA9IHR5cGVvZiB2YWx1ZVxuXG4gICAgaWYgKGkgPT09ICdwYXJlbnQnICYmIHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAocGFyZW50KSBjbG9uZWRbaV0gPSBwYXJlbnRcbiAgICB9IGVsc2UgaWYgKGkgPT09ICdzb3VyY2UnKSB7XG4gICAgICBjbG9uZWRbaV0gPSB2YWx1ZVxuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgY2xvbmVkW2ldID0gdmFsdWUubWFwKGogPT4gY2xvbmVOb2RlKGosIGNsb25lZCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCkgdmFsdWUgPSBjbG9uZU5vZGUodmFsdWUpXG4gICAgICBjbG9uZWRbaV0gPSB2YWx1ZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjbG9uZWRcbn1cblxuLyoqXG4gKiBBbGwgbm9kZSBjbGFzc2VzIGluaGVyaXQgdGhlIGZvbGxvd2luZyBjb21tb24gbWV0aG9kcy5cbiAqXG4gKiBAYWJzdHJhY3RcbiAqL1xuY2xhc3MgTm9kZSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge29iamVjdH0gW2RlZmF1bHRzXSBWYWx1ZSBmb3Igbm9kZSBwcm9wZXJ0aWVzLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKGRlZmF1bHRzID0geyB9KSB7XG4gICAgdGhpcy5yYXdzID0geyB9XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgZGVmYXVsdHMgIT09ICdvYmplY3QnICYmIHR5cGVvZiBkZWZhdWx0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdQb3N0Q1NTIG5vZGVzIGNvbnN0cnVjdG9yIGFjY2VwdHMgb2JqZWN0LCBub3QgJyArXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZGVmYXVsdHMpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgbmFtZSBpbiBkZWZhdWx0cykge1xuICAgICAgdGhpc1tuYW1lXSA9IGRlZmF1bHRzW25hbWVdXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBgQ3NzU3ludGF4RXJyb3JgIGluc3RhbmNlIGNvbnRhaW5pbmcgdGhlIG9yaWdpbmFsIHBvc2l0aW9uXG4gICAqIG9mIHRoZSBub2RlIGluIHRoZSBzb3VyY2UsIHNob3dpbmcgbGluZSBhbmQgY29sdW1uIG51bWJlcnMgYW5kIGFsc29cbiAgICogYSBzbWFsbCBleGNlcnB0IHRvIGZhY2lsaXRhdGUgZGVidWdnaW5nLlxuICAgKlxuICAgKiBJZiBwcmVzZW50LCBhbiBpbnB1dCBzb3VyY2UgbWFwIHdpbGwgYmUgdXNlZCB0byBnZXQgdGhlIG9yaWdpbmFsIHBvc2l0aW9uXG4gICAqIG9mIHRoZSBzb3VyY2UsIGV2ZW4gZnJvbSBhIHByZXZpb3VzIGNvbXBpbGF0aW9uIHN0ZXBcbiAgICogKGUuZy4sIGZyb20gU2FzcyBjb21waWxhdGlvbikuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHByb2R1Y2VzIHZlcnkgdXNlZnVsIGVycm9yIG1lc3NhZ2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAgICAgRXJyb3IgZGVzY3JpcHRpb24uXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0c10gICAgICBPcHRpb25zLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5wbHVnaW4gUGx1Z2luIG5hbWUgdGhhdCBjcmVhdGVkIHRoaXMgZXJyb3IuXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQb3N0Q1NTIHdpbGwgc2V0IGl0IGF1dG9tYXRpY2FsbHkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLndvcmQgICBBIHdvcmQgaW5zaWRlIGEgbm9kZeKAmXMgc3RyaW5nIHRoYXQgc2hvdWxkXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZSBoaWdobGlnaHRlZCBhcyB0aGUgc291cmNlIG9mIHRoZSBlcnJvci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdHMuaW5kZXggIEFuIGluZGV4IGluc2lkZSBhIG5vZGXigJlzIHN0cmluZyB0aGF0IHNob3VsZFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmUgaGlnaGxpZ2h0ZWQgYXMgdGhlIHNvdXJjZSBvZiB0aGUgZXJyb3IuXG4gICAqXG4gICAqIEByZXR1cm4ge0Nzc1N5bnRheEVycm9yfSBFcnJvciBvYmplY3QgdG8gdGhyb3cgaXQuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGlmICghdmFyaWFibGVzW25hbWVdKSB7XG4gICAqICAgdGhyb3cgZGVjbC5lcnJvcignVW5rbm93biB2YXJpYWJsZSAnICsgbmFtZSwgeyB3b3JkOiBuYW1lIH0pXG4gICAqICAgLy8gQ3NzU3ludGF4RXJyb3I6IHBvc3Rjc3MtdmFyczphLnNhc3M6NDozOiBVbmtub3duIHZhcmlhYmxlICRibGFja1xuICAgKiAgIC8vICAgY29sb3I6ICRibGFja1xuICAgKiAgIC8vIGFcbiAgICogICAvLyAgICAgICAgICBeXG4gICAqICAgLy8gICBiYWNrZ3JvdW5kOiB3aGl0ZVxuICAgKiB9XG4gICAqL1xuICBlcnJvciAobWVzc2FnZSwgb3B0cyA9IHsgfSkge1xuICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgbGV0IHBvcyA9IHRoaXMucG9zaXRpb25CeShvcHRzKVxuICAgICAgcmV0dXJuIHRoaXMuc291cmNlLmlucHV0LmVycm9yKG1lc3NhZ2UsIHBvcy5saW5lLCBwb3MuY29sdW1uLCBvcHRzKVxuICAgIH1cbiAgICByZXR1cm4gbmV3IENzc1N5bnRheEVycm9yKG1lc3NhZ2UpXG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgcHJvdmlkZWQgYXMgYSBjb252ZW5pZW5jZSB3cmFwcGVyIGZvciB7QGxpbmsgUmVzdWx0I3dhcm59LlxuICAgKlxuICAgKiBAcGFyYW0ge1Jlc3VsdH0gcmVzdWx0ICAgICAgVGhlIHtAbGluayBSZXN1bHR9IGluc3RhbmNlXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0IHdpbGwgcmVjZWl2ZSB0aGUgd2FybmluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgICAgICAgIFdhcm5pbmcgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRzXSAgICAgIE9wdGlvbnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMucGx1Z2luIFBsdWdpbiBuYW1lIHRoYXQgY3JlYXRlZCB0aGlzIHdhcm5pbmcuXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQb3N0Q1NTIHdpbGwgc2V0IGl0IGF1dG9tYXRpY2FsbHkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLndvcmQgICBBIHdvcmQgaW5zaWRlIGEgbm9kZeKAmXMgc3RyaW5nIHRoYXQgc2hvdWxkXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZSBoaWdobGlnaHRlZCBhcyB0aGUgc291cmNlIG9mIHRoZSB3YXJuaW5nLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0cy5pbmRleCAgQW4gaW5kZXggaW5zaWRlIGEgbm9kZeKAmXMgc3RyaW5nIHRoYXQgc2hvdWxkXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZSBoaWdobGlnaHRlZCBhcyB0aGUgc291cmNlIG9mIHRoZSB3YXJuaW5nLlxuICAgKlxuICAgKiBAcmV0dXJuIHtXYXJuaW5nfSBDcmVhdGVkIHdhcm5pbmcgb2JqZWN0LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBwbHVnaW4gPSBwb3N0Y3NzLnBsdWdpbigncG9zdGNzcy1kZXByZWNhdGVkJywgKCkgPT4ge1xuICAgKiAgIHJldHVybiAocm9vdCwgcmVzdWx0KSA9PiB7XG4gICAqICAgICByb290LndhbGtEZWNscygnYmFkJywgZGVjbCA9PiB7XG4gICAqICAgICAgIGRlY2wud2FybihyZXN1bHQsICdEZXByZWNhdGVkIHByb3BlcnR5IGJhZCcpXG4gICAqICAgICB9KVxuICAgKiAgIH1cbiAgICogfSlcbiAgICovXG4gIHdhcm4gKHJlc3VsdCwgdGV4dCwgb3B0cykge1xuICAgIGxldCBkYXRhID0geyBub2RlOiB0aGlzIH1cbiAgICBmb3IgKGxldCBpIGluIG9wdHMpIGRhdGFbaV0gPSBvcHRzW2ldXG4gICAgcmV0dXJuIHJlc3VsdC53YXJuKHRleHQsIGRhdGEpXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgbm9kZSBmcm9tIGl0cyBwYXJlbnQgYW5kIGNsZWFucyB0aGUgcGFyZW50IHByb3BlcnRpZXNcbiAgICogZnJvbSB0aGUgbm9kZSBhbmQgaXRzIGNoaWxkcmVuLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBpZiAoZGVjbC5wcm9wLm1hdGNoKC9eLXdlYmtpdC0vKSkge1xuICAgKiAgIGRlY2wucmVtb3ZlKClcbiAgICogfVxuICAgKlxuICAgKiBAcmV0dXJuIHtOb2RlfSBOb2RlIHRvIG1ha2UgY2FsbHMgY2hhaW4uXG4gICAqL1xuICByZW1vdmUgKCkge1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcylcbiAgICB9XG4gICAgdGhpcy5wYXJlbnQgPSB1bmRlZmluZWRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBDU1Mgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmdpZmllcnxzeW50YXh9IFtzdHJpbmdpZmllcl0gQSBzeW50YXggdG8gdXNlXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIHN0cmluZyBnZW5lcmF0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IENTUyBzdHJpbmcgb2YgdGhpcyBub2RlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBwb3N0Y3NzLnJ1bGUoeyBzZWxlY3RvcjogJ2EnIH0pLnRvU3RyaW5nKCkgLy89PiBcImEge31cIlxuICAgKi9cbiAgdG9TdHJpbmcgKHN0cmluZ2lmaWVyID0gc3RyaW5naWZ5KSB7XG4gICAgaWYgKHN0cmluZ2lmaWVyLnN0cmluZ2lmeSkgc3RyaW5naWZpZXIgPSBzdHJpbmdpZmllci5zdHJpbmdpZnlcbiAgICBsZXQgcmVzdWx0ID0gJydcbiAgICBzdHJpbmdpZmllcih0aGlzLCBpID0+IHtcbiAgICAgIHJlc3VsdCArPSBpXG4gICAgfSlcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBleGFjdCBjbG9uZSBvZiB0aGUgbm9kZS5cbiAgICpcbiAgICogVGhlIHJlc3VsdGluZyBjbG9uZWQgbm9kZSBhbmQgaXRzIChjbG9uZWQpIGNoaWxkcmVuIHdpbGwgcmV0YWluXG4gICAqIGNvZGUgc3R5bGUgcHJvcGVydGllcy5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IFtvdmVycmlkZXNdIE5ldyBwcm9wZXJ0aWVzIHRvIG92ZXJyaWRlIGluIHRoZSBjbG9uZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogZGVjbC5yYXdzLmJlZm9yZSAgICAvLz0+IFwiXFxuICBcIlxuICAgKiBjb25zdCBjbG9uZWQgPSBkZWNsLmNsb25lKHsgcHJvcDogJy1tb3otJyArIGRlY2wucHJvcCB9KVxuICAgKiBjbG9uZWQucmF3cy5iZWZvcmUgIC8vPT4gXCJcXG4gIFwiXG4gICAqIGNsb25lZC50b1N0cmluZygpICAgLy89PiAtbW96LXRyYW5zZm9ybTogc2NhbGUoMClcbiAgICpcbiAgICogQHJldHVybiB7Tm9kZX0gQ2xvbmUgb2YgdGhlIG5vZGUuXG4gICAqL1xuICBjbG9uZSAob3ZlcnJpZGVzID0geyB9KSB7XG4gICAgbGV0IGNsb25lZCA9IGNsb25lTm9kZSh0aGlzKVxuICAgIGZvciAobGV0IG5hbWUgaW4gb3ZlcnJpZGVzKSB7XG4gICAgICBjbG9uZWRbbmFtZV0gPSBvdmVycmlkZXNbbmFtZV1cbiAgICB9XG4gICAgcmV0dXJuIGNsb25lZFxuICB9XG5cbiAgLyoqXG4gICAqIFNob3J0Y3V0IHRvIGNsb25lIHRoZSBub2RlIGFuZCBpbnNlcnQgdGhlIHJlc3VsdGluZyBjbG9uZWQgbm9kZVxuICAgKiBiZWZvcmUgdGhlIGN1cnJlbnQgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IFtvdmVycmlkZXNdIE1ldyBwcm9wZXJ0aWVzIHRvIG92ZXJyaWRlIGluIHRoZSBjbG9uZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogZGVjbC5jbG9uZUJlZm9yZSh7IHByb3A6ICctbW96LScgKyBkZWNsLnByb3AgfSlcbiAgICpcbiAgICogQHJldHVybiB7Tm9kZX0gTmV3IG5vZGVcbiAgICovXG4gIGNsb25lQmVmb3JlIChvdmVycmlkZXMgPSB7IH0pIHtcbiAgICBsZXQgY2xvbmVkID0gdGhpcy5jbG9uZShvdmVycmlkZXMpXG4gICAgdGhpcy5wYXJlbnQuaW5zZXJ0QmVmb3JlKHRoaXMsIGNsb25lZClcbiAgICByZXR1cm4gY2xvbmVkXG4gIH1cblxuICAvKipcbiAgICogU2hvcnRjdXQgdG8gY2xvbmUgdGhlIG5vZGUgYW5kIGluc2VydCB0aGUgcmVzdWx0aW5nIGNsb25lZCBub2RlXG4gICAqIGFmdGVyIHRoZSBjdXJyZW50IG5vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3ZlcnJpZGVzXSBOZXcgcHJvcGVydGllcyB0byBvdmVycmlkZSBpbiB0aGUgY2xvbmUuXG4gICAqXG4gICAqIEByZXR1cm4ge05vZGV9IE5ldyBub2RlLlxuICAgKi9cbiAgY2xvbmVBZnRlciAob3ZlcnJpZGVzID0geyB9KSB7XG4gICAgbGV0IGNsb25lZCA9IHRoaXMuY2xvbmUob3ZlcnJpZGVzKVxuICAgIHRoaXMucGFyZW50Lmluc2VydEFmdGVyKHRoaXMsIGNsb25lZClcbiAgICByZXR1cm4gY2xvbmVkXG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0cyBub2RlKHMpIGJlZm9yZSB0aGUgY3VycmVudCBub2RlIGFuZCByZW1vdmVzIHRoZSBjdXJyZW50IG5vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7Li4uTm9kZX0gbm9kZXMgTW9kZShzKSB0byByZXBsYWNlIGN1cnJlbnQgb25lLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBpZiAoYXRydWxlLm5hbWUgPT09ICdtaXhpbicpIHtcbiAgICogICBhdHJ1bGUucmVwbGFjZVdpdGgobWl4aW5SdWxlc1thdHJ1bGUucGFyYW1zXSlcbiAgICogfVxuICAgKlxuICAgKiBAcmV0dXJuIHtOb2RlfSBDdXJyZW50IG5vZGUgdG8gbWV0aG9kcyBjaGFpbi5cbiAgICovXG4gIHJlcGxhY2VXaXRoICguLi5ub2Rlcykge1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICB0aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUodGhpcywgbm9kZSlcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZW1vdmUoKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbmV4dCBjaGlsZCBvZiB0aGUgbm9kZeKAmXMgcGFyZW50LlxuICAgKiBSZXR1cm5zIGB1bmRlZmluZWRgIGlmIHRoZSBjdXJyZW50IG5vZGUgaXMgdGhlIGxhc3QgY2hpbGQuXG4gICAqXG4gICAqIEByZXR1cm4ge05vZGV8dW5kZWZpbmVkfSBOZXh0IG5vZGUuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGlmIChjb21tZW50LnRleHQgPT09ICdkZWxldGUgbmV4dCcpIHtcbiAgICogICBjb25zdCBuZXh0ID0gY29tbWVudC5uZXh0KClcbiAgICogICBpZiAobmV4dCkge1xuICAgKiAgICAgbmV4dC5yZW1vdmUoKVxuICAgKiAgIH1cbiAgICogfVxuICAgKi9cbiAgbmV4dCAoKSB7XG4gICAgaWYgKCF0aGlzLnBhcmVudCkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIGxldCBpbmRleCA9IHRoaXMucGFyZW50LmluZGV4KHRoaXMpXG4gICAgcmV0dXJuIHRoaXMucGFyZW50Lm5vZGVzW2luZGV4ICsgMV1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwcmV2aW91cyBjaGlsZCBvZiB0aGUgbm9kZeKAmXMgcGFyZW50LlxuICAgKiBSZXR1cm5zIGB1bmRlZmluZWRgIGlmIHRoZSBjdXJyZW50IG5vZGUgaXMgdGhlIGZpcnN0IGNoaWxkLlxuICAgKlxuICAgKiBAcmV0dXJuIHtOb2RlfHVuZGVmaW5lZH0gUHJldmlvdXMgbm9kZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3QgYW5ub3RhdGlvbiA9IGRlY2wucHJldigpXG4gICAqIGlmIChhbm5vdGF0aW9uLnR5cGUgPT09ICdjb21tZW50Jykge1xuICAgKiAgIHJlYWRBbm5vdGF0aW9uKGFubm90YXRpb24udGV4dClcbiAgICogfVxuICAgKi9cbiAgcHJldiAoKSB7XG4gICAgaWYgKCF0aGlzLnBhcmVudCkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIGxldCBpbmRleCA9IHRoaXMucGFyZW50LmluZGV4KHRoaXMpXG4gICAgcmV0dXJuIHRoaXMucGFyZW50Lm5vZGVzW2luZGV4IC0gMV1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnQgbmV3IG5vZGUgYmVmb3JlIGN1cnJlbnQgbm9kZSB0byBjdXJyZW50IG5vZGXigJlzIHBhcmVudC5cbiAgICpcbiAgICogSnVzdCBhbGlhcyBmb3IgYG5vZGUucGFyZW50Lmluc2VydEJlZm9yZShub2RlLCBhZGQpYC5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfG9iamVjdHxzdHJpbmd8Tm9kZVtdfSBhZGQgTmV3IG5vZGUuXG4gICAqXG4gICAqIEByZXR1cm4ge05vZGV9IFRoaXMgbm9kZSBmb3IgbWV0aG9kcyBjaGFpbi5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogZGVjbC5iZWZvcmUoJ2NvbnRlbnQ6IFwiXCInKVxuICAgKi9cbiAgYmVmb3JlIChhZGQpIHtcbiAgICB0aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUodGhpcywgYWRkKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0IG5ldyBub2RlIGFmdGVyIGN1cnJlbnQgbm9kZSB0byBjdXJyZW50IG5vZGXigJlzIHBhcmVudC5cbiAgICpcbiAgICogSnVzdCBhbGlhcyBmb3IgYG5vZGUucGFyZW50Lmluc2VydEFmdGVyKG5vZGUsIGFkZClgLlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGV8b2JqZWN0fHN0cmluZ3xOb2RlW119IGFkZCBOZXcgbm9kZS5cbiAgICpcbiAgICogQHJldHVybiB7Tm9kZX0gVGhpcyBub2RlIGZvciBtZXRob2RzIGNoYWluLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBkZWNsLmFmdGVyKCdjb2xvcjogYmxhY2snKVxuICAgKi9cbiAgYWZ0ZXIgKGFkZCkge1xuICAgIHRoaXMucGFyZW50Lmluc2VydEFmdGVyKHRoaXMsIGFkZClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdG9KU09OICgpIHtcbiAgICBsZXQgZml4ZWQgPSB7IH1cblxuICAgIGZvciAobGV0IG5hbWUgaW4gdGhpcykge1xuICAgICAgaWYgKCF0aGlzLmhhc093blByb3BlcnR5KG5hbWUpKSBjb250aW51ZVxuICAgICAgaWYgKG5hbWUgPT09ICdwYXJlbnQnKSBjb250aW51ZVxuICAgICAgbGV0IHZhbHVlID0gdGhpc1tuYW1lXVxuXG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBmaXhlZFtuYW1lXSA9IHZhbHVlLm1hcChpID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIGkgPT09ICdvYmplY3QnICYmIGkudG9KU09OKSB7XG4gICAgICAgICAgICByZXR1cm4gaS50b0pTT04oKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS50b0pTT04pIHtcbiAgICAgICAgZml4ZWRbbmFtZV0gPSB2YWx1ZS50b0pTT04oKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZml4ZWRbbmFtZV0gPSB2YWx1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaXhlZFxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB7QGxpbmsgTm9kZSNyYXdzfSB2YWx1ZS4gSWYgdGhlIG5vZGUgaXMgbWlzc2luZ1xuICAgKiB0aGUgY29kZSBzdHlsZSBwcm9wZXJ0eSAoYmVjYXVzZSB0aGUgbm9kZSB3YXMgbWFudWFsbHkgYnVpbHQgb3IgY2xvbmVkKSxcbiAgICogUG9zdENTUyB3aWxsIHRyeSB0byBhdXRvZGV0ZWN0IHRoZSBjb2RlIHN0eWxlIHByb3BlcnR5IGJ5IGxvb2tpbmdcbiAgICogYXQgb3RoZXIgbm9kZXMgaW4gdGhlIHRyZWUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wICAgICAgICAgIE5hbWUgb2YgY29kZSBzdHlsZSBwcm9wZXJ0eS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtkZWZhdWx0VHlwZV0gTmFtZSBvZiBkZWZhdWx0IHZhbHVlLCBpdCBjYW4gYmUgbWlzc2VkXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHRoZSB2YWx1ZSBpcyB0aGUgc2FtZSBhcyBwcm9wLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSB7IGJhY2tncm91bmQ6IHdoaXRlIH0nKVxuICAgKiByb290Lm5vZGVzWzBdLmFwcGVuZCh7IHByb3A6ICdjb2xvcicsIHZhbHVlOiAnYmxhY2snIH0pXG4gICAqIHJvb3Qubm9kZXNbMF0ubm9kZXNbMV0ucmF3cy5iZWZvcmUgICAvLz0+IHVuZGVmaW5lZFxuICAgKiByb290Lm5vZGVzWzBdLm5vZGVzWzFdLnJhdygnYmVmb3JlJykgLy89PiAnICdcbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nfSBDb2RlIHN0eWxlIHZhbHVlLlxuICAgKi9cbiAgcmF3IChwcm9wLCBkZWZhdWx0VHlwZSkge1xuICAgIGxldCBzdHIgPSBuZXcgU3RyaW5naWZpZXIoKVxuICAgIHJldHVybiBzdHIucmF3KHRoaXMsIHByb3AsIGRlZmF1bHRUeXBlKVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIHRoZSBSb290IGluc3RhbmNlIG9mIHRoZSBub2Rl4oCZcyB0cmVlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiByb290Lm5vZGVzWzBdLm5vZGVzWzBdLnJvb3QoKSA9PT0gcm9vdFxuICAgKlxuICAgKiBAcmV0dXJuIHtSb290fSBSb290IHBhcmVudC5cbiAgICovXG4gIHJvb3QgKCkge1xuICAgIGxldCByZXN1bHQgPSB0aGlzXG4gICAgd2hpbGUgKHJlc3VsdC5wYXJlbnQpIHJlc3VsdCA9IHJlc3VsdC5wYXJlbnRcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGNvZGUgc3R5bGUgcHJvcGVydGllcyBmb3IgdGhlIG5vZGUgYW5kIGl0cyBjaGlsZHJlbi5cbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBba2VlcEJldHdlZW5dIEtlZXAgdGhlIHJhd3MuYmV0d2VlbiBzeW1ib2xzLlxuICAgKlxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIG5vZGUucmF3cy5iZWZvcmUgIC8vPT4gJyAnXG4gICAqIG5vZGUuY2xlYW5SYXdzKClcbiAgICogbm9kZS5yYXdzLmJlZm9yZSAgLy89PiB1bmRlZmluZWRcbiAgICovXG4gIGNsZWFuUmF3cyAoa2VlcEJldHdlZW4pIHtcbiAgICBkZWxldGUgdGhpcy5yYXdzLmJlZm9yZVxuICAgIGRlbGV0ZSB0aGlzLnJhd3MuYWZ0ZXJcbiAgICBpZiAoIWtlZXBCZXR3ZWVuKSBkZWxldGUgdGhpcy5yYXdzLmJldHdlZW5cbiAgfVxuXG4gIHBvc2l0aW9uSW5zaWRlIChpbmRleCkge1xuICAgIGxldCBzdHJpbmcgPSB0aGlzLnRvU3RyaW5nKClcbiAgICBsZXQgY29sdW1uID0gdGhpcy5zb3VyY2Uuc3RhcnQuY29sdW1uXG4gICAgbGV0IGxpbmUgPSB0aGlzLnNvdXJjZS5zdGFydC5saW5lXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4OyBpKyspIHtcbiAgICAgIGlmIChzdHJpbmdbaV0gPT09ICdcXG4nKSB7XG4gICAgICAgIGNvbHVtbiA9IDFcbiAgICAgICAgbGluZSArPSAxXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2x1bW4gKz0gMVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IGxpbmUsIGNvbHVtbiB9XG4gIH1cblxuICBwb3NpdGlvbkJ5IChvcHRzKSB7XG4gICAgbGV0IHBvcyA9IHRoaXMuc291cmNlLnN0YXJ0XG4gICAgaWYgKG9wdHMuaW5kZXgpIHtcbiAgICAgIHBvcyA9IHRoaXMucG9zaXRpb25JbnNpZGUob3B0cy5pbmRleClcbiAgICB9IGVsc2UgaWYgKG9wdHMud29yZCkge1xuICAgICAgbGV0IGluZGV4ID0gdGhpcy50b1N0cmluZygpLmluZGV4T2Yob3B0cy53b3JkKVxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkgcG9zID0gdGhpcy5wb3NpdGlvbkluc2lkZShpbmRleClcbiAgICB9XG4gICAgcmV0dXJuIHBvc1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBOb2RlI1xuICAgKiBAbWVtYmVyIHtzdHJpbmd9IHR5cGUgU3RyaW5nIHJlcHJlc2VudGluZyB0aGUgbm9kZeKAmXMgdHlwZS5cbiAgICogICAgICAgICAgICAgICAgICAgICAgIFBvc3NpYmxlIHZhbHVlcyBhcmUgYHJvb3RgLCBgYXRydWxlYCwgYHJ1bGVgLFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgYGRlY2xgLCBvciBgY29tbWVudGAuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHBvc3Rjc3MuZGVjbCh7IHByb3A6ICdjb2xvcicsIHZhbHVlOiAnYmxhY2snIH0pLnR5cGUgLy89PiAnZGVjbCdcbiAgICovXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBOb2RlI1xuICAgKiBAbWVtYmVyIHtDb250YWluZXJ9IHBhcmVudCBUaGUgbm9kZeKAmXMgcGFyZW50IG5vZGUuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHJvb3Qubm9kZXNbMF0ucGFyZW50ID09PSByb290XG4gICAqL1xuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgTm9kZSNcbiAgICogQG1lbWJlciB7c291cmNlfSBzb3VyY2UgVGhlIGlucHV0IHNvdXJjZSBvZiB0aGUgbm9kZS5cbiAgICpcbiAgICogVGhlIHByb3BlcnR5IGlzIHVzZWQgaW4gc291cmNlIG1hcCBnZW5lcmF0aW9uLlxuICAgKlxuICAgKiBJZiB5b3UgY3JlYXRlIGEgbm9kZSBtYW51YWxseSAoZS5nLiwgd2l0aCBgcG9zdGNzcy5kZWNsKClgKSxcbiAgICogdGhhdCBub2RlIHdpbGwgbm90IGhhdmUgYSBgc291cmNlYCBwcm9wZXJ0eSBhbmQgd2lsbCBiZSBhYnNlbnRcbiAgICogZnJvbSB0aGUgc291cmNlIG1hcC4gRm9yIHRoaXMgcmVhc29uLCB0aGUgcGx1Z2luIGRldmVsb3BlciBzaG91bGRcbiAgICogY29uc2lkZXIgY2xvbmluZyBub2RlcyB0byBjcmVhdGUgbmV3IG9uZXMgKGluIHdoaWNoIGNhc2UgdGhlIG5ldyBub2Rl4oCZc1xuICAgKiBzb3VyY2Ugd2lsbCByZWZlcmVuY2UgdGhlIG9yaWdpbmFsLCBjbG9uZWQgbm9kZSkgb3Igc2V0dGluZ1xuICAgKiB0aGUgYHNvdXJjZWAgcHJvcGVydHkgbWFudWFsbHkuXG4gICAqXG4gICAqIGBgYGpzXG4gICAqIC8vIEJhZFxuICAgKiBjb25zdCBwcmVmaXhlZCA9IHBvc3Rjc3MuZGVjbCh7XG4gICAqICAgcHJvcDogJy1tb3otJyArIGRlY2wucHJvcCxcbiAgICogICB2YWx1ZTogZGVjbC52YWx1ZVxuICAgKiB9KVxuICAgKlxuICAgKiAvLyBHb29kXG4gICAqIGNvbnN0IHByZWZpeGVkID0gZGVjbC5jbG9uZSh7IHByb3A6ICctbW96LScgKyBkZWNsLnByb3AgfSlcbiAgICogYGBgXG4gICAqXG4gICAqIGBgYGpzXG4gICAqIGlmIChhdHJ1bGUubmFtZSA9PT0gJ2FkZC1saW5rJykge1xuICAgKiAgIGNvbnN0IHJ1bGUgPSBwb3N0Y3NzLnJ1bGUoeyBzZWxlY3RvcjogJ2EnLCBzb3VyY2U6IGF0cnVsZS5zb3VyY2UgfSlcbiAgICogICBhdHJ1bGUucGFyZW50Lmluc2VydEJlZm9yZShhdHJ1bGUsIHJ1bGUpXG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGRlY2wuc291cmNlLmlucHV0LmZyb20gLy89PiAnL2hvbWUvYWkvYS5zYXNzJ1xuICAgKiBkZWNsLnNvdXJjZS5zdGFydCAgICAgIC8vPT4geyBsaW5lOiAxMCwgY29sdW1uOiAyIH1cbiAgICogZGVjbC5zb3VyY2UuZW5kICAgICAgICAvLz0+IHsgbGluZTogMTAsIGNvbHVtbjogMTIgfVxuICAgKi9cblxuICAvKipcbiAgICogQG1lbWJlcm9mIE5vZGUjXG4gICAqIEBtZW1iZXIge29iamVjdH0gcmF3cyBJbmZvcm1hdGlvbiB0byBnZW5lcmF0ZSBieXRlLXRvLWJ5dGUgZXF1YWxcbiAgICogICAgICAgICAgICAgICAgICAgICAgIG5vZGUgc3RyaW5nIGFzIGl0IHdhcyBpbiB0aGUgb3JpZ2luIGlucHV0LlxuICAgKlxuICAgKiBFdmVyeSBwYXJzZXIgc2F2ZXMgaXRzIG93biBwcm9wZXJ0aWVzLFxuICAgKiBidXQgdGhlIGRlZmF1bHQgQ1NTIHBhcnNlciB1c2VzOlxuICAgKlxuICAgKiAqIGBiZWZvcmVgOiB0aGUgc3BhY2Ugc3ltYm9scyBiZWZvcmUgdGhlIG5vZGUuIEl0IGFsc28gc3RvcmVzIGAqYFxuICAgKiAgIGFuZCBgX2Agc3ltYm9scyBiZWZvcmUgdGhlIGRlY2xhcmF0aW9uIChJRSBoYWNrKS5cbiAgICogKiBgYWZ0ZXJgOiB0aGUgc3BhY2Ugc3ltYm9scyBhZnRlciB0aGUgbGFzdCBjaGlsZCBvZiB0aGUgbm9kZVxuICAgKiAgIHRvIHRoZSBlbmQgb2YgdGhlIG5vZGUuXG4gICAqICogYGJldHdlZW5gOiB0aGUgc3ltYm9scyBiZXR3ZWVuIHRoZSBwcm9wZXJ0eSBhbmQgdmFsdWVcbiAgICogICBmb3IgZGVjbGFyYXRpb25zLCBzZWxlY3RvciBhbmQgYHtgIGZvciBydWxlcywgb3IgbGFzdCBwYXJhbWV0ZXJcbiAgICogICBhbmQgYHtgIGZvciBhdC1ydWxlcy5cbiAgICogKiBgc2VtaWNvbG9uYDogY29udGFpbnMgdHJ1ZSBpZiB0aGUgbGFzdCBjaGlsZCBoYXNcbiAgICogICBhbiAob3B0aW9uYWwpIHNlbWljb2xvbi5cbiAgICogKiBgYWZ0ZXJOYW1lYDogdGhlIHNwYWNlIGJldHdlZW4gdGhlIGF0LXJ1bGUgbmFtZSBhbmQgaXRzIHBhcmFtZXRlcnMuXG4gICAqICogYGxlZnRgOiB0aGUgc3BhY2Ugc3ltYm9scyBiZXR3ZWVuIGAvKmAgYW5kIHRoZSBjb21tZW504oCZcyB0ZXh0LlxuICAgKiAqIGByaWdodGA6IHRoZSBzcGFjZSBzeW1ib2xzIGJldHdlZW4gdGhlIGNvbW1lbnTigJlzIHRleHRcbiAgICogICBhbmQgPGNvZGU+KiYjNDc7PC9jb2RlPi5cbiAgICogKiBgaW1wb3J0YW50YDogdGhlIGNvbnRlbnQgb2YgdGhlIGltcG9ydGFudCBzdGF0ZW1lbnQsXG4gICAqICAgaWYgaXQgaXMgbm90IGp1c3QgYCFpbXBvcnRhbnRgLlxuICAgKlxuICAgKiBQb3N0Q1NTIGNsZWFucyBzZWxlY3RvcnMsIGRlY2xhcmF0aW9uIHZhbHVlcyBhbmQgYXQtcnVsZSBwYXJhbWV0ZXJzXG4gICAqIGZyb20gY29tbWVudHMgYW5kIGV4dHJhIHNwYWNlcywgYnV0IGl0IHN0b3JlcyBvcmlnaW4gY29udGVudCBpbiByYXdzXG4gICAqIHByb3BlcnRpZXMuIEFzIHN1Y2gsIGlmIHlvdSBkb27igJl0IGNoYW5nZSBhIGRlY2xhcmF0aW9u4oCZcyB2YWx1ZSxcbiAgICogUG9zdENTUyB3aWxsIHVzZSB0aGUgcmF3IHZhbHVlIHdpdGggY29tbWVudHMuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKCdhIHtcXG4gIGNvbG9yOmJsYWNrXFxufScpXG4gICAqIHJvb3QuZmlyc3QuZmlyc3QucmF3cyAvLz0+IHsgYmVmb3JlOiAnXFxuICAnLCBiZXR3ZWVuOiAnOicgfVxuICAgKi9cbn1cblxuZXhwb3J0IGRlZmF1bHQgTm9kZVxuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IHBvc2l0aW9uXG4gKiBAcHJvcGVydHkge251bWJlcn0gbGluZSAgIFNvdXJjZSBsaW5lIGluIGZpbGUuXG4gKiBAcHJvcGVydHkge251bWJlcn0gY29sdW1uIFNvdXJjZSBjb2x1bW4gaW4gZmlsZS5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IHNvdXJjZVxuICogQHByb3BlcnR5IHtJbnB1dH0gaW5wdXQgICAge0BsaW5rIElucHV0fSB3aXRoIGlucHV0IGZpbGVcbiAqIEBwcm9wZXJ0eSB7cG9zaXRpb259IHN0YXJ0IFRoZSBzdGFydGluZyBwb3NpdGlvbiBvZiB0aGUgbm9kZeKAmXMgc291cmNlLlxuICogQHByb3BlcnR5IHtwb3NpdGlvbn0gZW5kICAgVGhlIGVuZGluZyBwb3NpdGlvbiBvZiB0aGUgbm9kZeKAmXMgc291cmNlLlxuICovXG4iXSwiZmlsZSI6Im5vZGUuanMifQ==


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/parse.js":
/*!************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/parse.js ***!
  \************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _parser = _interopRequireDefault(__webpack_require__(/*! ./parser */ "./node_modules/@linaria/server/node_modules/postcss/lib/parser.js"));

var _input = _interopRequireDefault(__webpack_require__(/*! ./input */ "./node_modules/@linaria/server/node_modules/postcss/lib/input.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(css, opts) {
  var input = new _input.default(css, opts);
  var parser = new _parser.default(input);

  try {
    parser.parse();
  } catch (e) {
    if (true) {
      if (e.name === 'CssSyntaxError' && opts && opts.from) {
        if (/\.scss$/i.test(opts.from)) {
          e.message += '\nYou tried to parse SCSS with ' + 'the standard CSS parser; ' + 'try again with the postcss-scss parser';
        } else if (/\.sass/i.test(opts.from)) {
          e.message += '\nYou tried to parse Sass with ' + 'the standard CSS parser; ' + 'try again with the postcss-sass parser';
        } else if (/\.less$/i.test(opts.from)) {
          e.message += '\nYou tried to parse Less with ' + 'the standard CSS parser; ' + 'try again with the postcss-less parser';
        }
      }
    }

    throw e;
  }

  return parser.root;
}

var _default = parse;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlLmVzNiJdLCJuYW1lcyI6WyJwYXJzZSIsImNzcyIsIm9wdHMiLCJpbnB1dCIsIklucHV0IiwicGFyc2VyIiwiUGFyc2VyIiwiZSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIm5hbWUiLCJmcm9tIiwidGVzdCIsIm1lc3NhZ2UiLCJyb290Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOzs7O0FBRUEsU0FBU0EsS0FBVCxDQUFnQkMsR0FBaEIsRUFBcUJDLElBQXJCLEVBQTJCO0FBQ3pCLE1BQUlDLEtBQUssR0FBRyxJQUFJQyxjQUFKLENBQVVILEdBQVYsRUFBZUMsSUFBZixDQUFaO0FBQ0EsTUFBSUcsTUFBTSxHQUFHLElBQUlDLGVBQUosQ0FBV0gsS0FBWCxDQUFiOztBQUNBLE1BQUk7QUFDRkUsSUFBQUEsTUFBTSxDQUFDTCxLQUFQO0FBQ0QsR0FGRCxDQUVFLE9BQU9PLENBQVAsRUFBVTtBQUNWLFFBQUlDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDLFVBQUlILENBQUMsQ0FBQ0ksSUFBRixLQUFXLGdCQUFYLElBQStCVCxJQUEvQixJQUF1Q0EsSUFBSSxDQUFDVSxJQUFoRCxFQUFzRDtBQUNwRCxZQUFJLFdBQVdDLElBQVgsQ0FBZ0JYLElBQUksQ0FBQ1UsSUFBckIsQ0FBSixFQUFnQztBQUM5QkwsVUFBQUEsQ0FBQyxDQUFDTyxPQUFGLElBQWEsb0NBQ0EsMkJBREEsR0FFQSx3Q0FGYjtBQUdELFNBSkQsTUFJTyxJQUFJLFVBQVVELElBQVYsQ0FBZVgsSUFBSSxDQUFDVSxJQUFwQixDQUFKLEVBQStCO0FBQ3BDTCxVQUFBQSxDQUFDLENBQUNPLE9BQUYsSUFBYSxvQ0FDQSwyQkFEQSxHQUVBLHdDQUZiO0FBR0QsU0FKTSxNQUlBLElBQUksV0FBV0QsSUFBWCxDQUFnQlgsSUFBSSxDQUFDVSxJQUFyQixDQUFKLEVBQWdDO0FBQ3JDTCxVQUFBQSxDQUFDLENBQUNPLE9BQUYsSUFBYSxvQ0FDQSwyQkFEQSxHQUVBLHdDQUZiO0FBR0Q7QUFDRjtBQUNGOztBQUNELFVBQU1QLENBQU47QUFDRDs7QUFFRCxTQUFPRixNQUFNLENBQUNVLElBQWQ7QUFDRDs7ZUFFY2YsSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJzZXIgZnJvbSAnLi9wYXJzZXInXG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9pbnB1dCdcblxuZnVuY3Rpb24gcGFyc2UgKGNzcywgb3B0cykge1xuICBsZXQgaW5wdXQgPSBuZXcgSW5wdXQoY3NzLCBvcHRzKVxuICBsZXQgcGFyc2VyID0gbmV3IFBhcnNlcihpbnB1dClcbiAgdHJ5IHtcbiAgICBwYXJzZXIucGFyc2UoKVxuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChlLm5hbWUgPT09ICdDc3NTeW50YXhFcnJvcicgJiYgb3B0cyAmJiBvcHRzLmZyb20pIHtcbiAgICAgICAgaWYgKC9cXC5zY3NzJC9pLnRlc3Qob3B0cy5mcm9tKSkge1xuICAgICAgICAgIGUubWVzc2FnZSArPSAnXFxuWW91IHRyaWVkIHRvIHBhcnNlIFNDU1Mgd2l0aCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3RoZSBzdGFuZGFyZCBDU1MgcGFyc2VyOyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3RyeSBhZ2FpbiB3aXRoIHRoZSBwb3N0Y3NzLXNjc3MgcGFyc2VyJ1xuICAgICAgICB9IGVsc2UgaWYgKC9cXC5zYXNzL2kudGVzdChvcHRzLmZyb20pKSB7XG4gICAgICAgICAgZS5tZXNzYWdlICs9ICdcXG5Zb3UgdHJpZWQgdG8gcGFyc2UgU2FzcyB3aXRoICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAndGhlIHN0YW5kYXJkIENTUyBwYXJzZXI7ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAndHJ5IGFnYWluIHdpdGggdGhlIHBvc3Rjc3Mtc2FzcyBwYXJzZXInXG4gICAgICAgIH0gZWxzZSBpZiAoL1xcLmxlc3MkL2kudGVzdChvcHRzLmZyb20pKSB7XG4gICAgICAgICAgZS5tZXNzYWdlICs9ICdcXG5Zb3UgdHJpZWQgdG8gcGFyc2UgTGVzcyB3aXRoICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAndGhlIHN0YW5kYXJkIENTUyBwYXJzZXI7ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAndHJ5IGFnYWluIHdpdGggdGhlIHBvc3Rjc3MtbGVzcyBwYXJzZXInXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgZVxuICB9XG5cbiAgcmV0dXJuIHBhcnNlci5yb290XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlXG4iXSwiZmlsZSI6InBhcnNlLmpzIn0=


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/parser.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/parser.js ***!
  \*************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _declaration = _interopRequireDefault(__webpack_require__(/*! ./declaration */ "./node_modules/@linaria/server/node_modules/postcss/lib/declaration.js"));

var _tokenize = _interopRequireDefault(__webpack_require__(/*! ./tokenize */ "./node_modules/@linaria/server/node_modules/postcss/lib/tokenize.js"));

var _comment = _interopRequireDefault(__webpack_require__(/*! ./comment */ "./node_modules/@linaria/server/node_modules/postcss/lib/comment.js"));

var _atRule = _interopRequireDefault(__webpack_require__(/*! ./at-rule */ "./node_modules/@linaria/server/node_modules/postcss/lib/at-rule.js"));

var _root = _interopRequireDefault(__webpack_require__(/*! ./root */ "./node_modules/@linaria/server/node_modules/postcss/lib/root.js"));

var _rule = _interopRequireDefault(__webpack_require__(/*! ./rule */ "./node_modules/@linaria/server/node_modules/postcss/lib/rule.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parser = /*#__PURE__*/function () {
  function Parser(input) {
    this.input = input;
    this.root = new _root.default();
    this.current = this.root;
    this.spaces = '';
    this.semicolon = false;
    this.createTokenizer();
    this.root.source = {
      input: input,
      start: {
        line: 1,
        column: 1
      }
    };
  }

  var _proto = Parser.prototype;

  _proto.createTokenizer = function createTokenizer() {
    this.tokenizer = (0, _tokenize.default)(this.input);
  };

  _proto.parse = function parse() {
    var token;

    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken();

      switch (token[0]) {
        case 'space':
          this.spaces += token[1];
          break;

        case ';':
          this.freeSemicolon(token);
          break;

        case '}':
          this.end(token);
          break;

        case 'comment':
          this.comment(token);
          break;

        case 'at-word':
          this.atrule(token);
          break;

        case '{':
          this.emptyRule(token);
          break;

        default:
          this.other(token);
          break;
      }
    }

    this.endFile();
  };

  _proto.comment = function comment(token) {
    var node = new _comment.default();
    this.init(node, token[2], token[3]);
    node.source.end = {
      line: token[4],
      column: token[5]
    };
    var text = token[1].slice(2, -2);

    if (/^\s*$/.test(text)) {
      node.text = '';
      node.raws.left = text;
      node.raws.right = '';
    } else {
      var match = text.match(/^(\s*)([^]*[^\s])(\s*)$/);
      node.text = match[2];
      node.raws.left = match[1];
      node.raws.right = match[3];
    }
  };

  _proto.emptyRule = function emptyRule(token) {
    var node = new _rule.default();
    this.init(node, token[2], token[3]);
    node.selector = '';
    node.raws.between = '';
    this.current = node;
  };

  _proto.other = function other(start) {
    var end = false;
    var type = null;
    var colon = false;
    var bracket = null;
    var brackets = [];
    var tokens = [];
    var token = start;

    while (token) {
      type = token[0];
      tokens.push(token);

      if (type === '(' || type === '[') {
        if (!bracket) bracket = token;
        brackets.push(type === '(' ? ')' : ']');
      } else if (brackets.length === 0) {
        if (type === ';') {
          if (colon) {
            this.decl(tokens);
            return;
          } else {
            break;
          }
        } else if (type === '{') {
          this.rule(tokens);
          return;
        } else if (type === '}') {
          this.tokenizer.back(tokens.pop());
          end = true;
          break;
        } else if (type === ':') {
          colon = true;
        }
      } else if (type === brackets[brackets.length - 1]) {
        brackets.pop();
        if (brackets.length === 0) bracket = null;
      }

      token = this.tokenizer.nextToken();
    }

    if (this.tokenizer.endOfFile()) end = true;
    if (brackets.length > 0) this.unclosedBracket(bracket);

    if (end && colon) {
      while (tokens.length) {
        token = tokens[tokens.length - 1][0];
        if (token !== 'space' && token !== 'comment') break;
        this.tokenizer.back(tokens.pop());
      }

      this.decl(tokens);
    } else {
      this.unknownWord(tokens);
    }
  };

  _proto.rule = function rule(tokens) {
    tokens.pop();
    var node = new _rule.default();
    this.init(node, tokens[0][2], tokens[0][3]);
    node.raws.between = this.spacesAndCommentsFromEnd(tokens);
    this.raw(node, 'selector', tokens);
    this.current = node;
  };

  _proto.decl = function decl(tokens) {
    var node = new _declaration.default();
    this.init(node);
    var last = tokens[tokens.length - 1];

    if (last[0] === ';') {
      this.semicolon = true;
      tokens.pop();
    }

    if (last[4]) {
      node.source.end = {
        line: last[4],
        column: last[5]
      };
    } else {
      node.source.end = {
        line: last[2],
        column: last[3]
      };
    }

    while (tokens[0][0] !== 'word') {
      if (tokens.length === 1) this.unknownWord(tokens);
      node.raws.before += tokens.shift()[1];
    }

    node.source.start = {
      line: tokens[0][2],
      column: tokens[0][3]
    };
    node.prop = '';

    while (tokens.length) {
      var type = tokens[0][0];

      if (type === ':' || type === 'space' || type === 'comment') {
        break;
      }

      node.prop += tokens.shift()[1];
    }

    node.raws.between = '';
    var token;

    while (tokens.length) {
      token = tokens.shift();

      if (token[0] === ':') {
        node.raws.between += token[1];
        break;
      } else {
        if (token[0] === 'word' && /\w/.test(token[1])) {
          this.unknownWord([token]);
        }

        node.raws.between += token[1];
      }
    }

    if (node.prop[0] === '_' || node.prop[0] === '*') {
      node.raws.before += node.prop[0];
      node.prop = node.prop.slice(1);
    }

    node.raws.between += this.spacesAndCommentsFromStart(tokens);
    this.precheckMissedSemicolon(tokens);

    for (var i = tokens.length - 1; i > 0; i--) {
      token = tokens[i];

      if (token[1].toLowerCase() === '!important') {
        node.important = true;
        var string = this.stringFrom(tokens, i);
        string = this.spacesFromEnd(tokens) + string;
        if (string !== ' !important') node.raws.important = string;
        break;
      } else if (token[1].toLowerCase() === 'important') {
        var cache = tokens.slice(0);
        var str = '';

        for (var j = i; j > 0; j--) {
          var _type = cache[j][0];

          if (str.trim().indexOf('!') === 0 && _type !== 'space') {
            break;
          }

          str = cache.pop()[1] + str;
        }

        if (str.trim().indexOf('!') === 0) {
          node.important = true;
          node.raws.important = str;
          tokens = cache;
        }
      }

      if (token[0] !== 'space' && token[0] !== 'comment') {
        break;
      }
    }

    this.raw(node, 'value', tokens);
    if (node.value.indexOf(':') !== -1) this.checkMissedSemicolon(tokens);
  };

  _proto.atrule = function atrule(token) {
    var node = new _atRule.default();
    node.name = token[1].slice(1);

    if (node.name === '') {
      this.unnamedAtrule(node, token);
    }

    this.init(node, token[2], token[3]);
    var prev;
    var shift;
    var last = false;
    var open = false;
    var params = [];

    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken();

      if (token[0] === ';') {
        node.source.end = {
          line: token[2],
          column: token[3]
        };
        this.semicolon = true;
        break;
      } else if (token[0] === '{') {
        open = true;
        break;
      } else if (token[0] === '}') {
        if (params.length > 0) {
          shift = params.length - 1;
          prev = params[shift];

          while (prev && prev[0] === 'space') {
            prev = params[--shift];
          }

          if (prev) {
            node.source.end = {
              line: prev[4],
              column: prev[5]
            };
          }
        }

        this.end(token);
        break;
      } else {
        params.push(token);
      }

      if (this.tokenizer.endOfFile()) {
        last = true;
        break;
      }
    }

    node.raws.between = this.spacesAndCommentsFromEnd(params);

    if (params.length) {
      node.raws.afterName = this.spacesAndCommentsFromStart(params);
      this.raw(node, 'params', params);

      if (last) {
        token = params[params.length - 1];
        node.source.end = {
          line: token[4],
          column: token[5]
        };
        this.spaces = node.raws.between;
        node.raws.between = '';
      }
    } else {
      node.raws.afterName = '';
      node.params = '';
    }

    if (open) {
      node.nodes = [];
      this.current = node;
    }
  };

  _proto.end = function end(token) {
    if (this.current.nodes && this.current.nodes.length) {
      this.current.raws.semicolon = this.semicolon;
    }

    this.semicolon = false;
    this.current.raws.after = (this.current.raws.after || '') + this.spaces;
    this.spaces = '';

    if (this.current.parent) {
      this.current.source.end = {
        line: token[2],
        column: token[3]
      };
      this.current = this.current.parent;
    } else {
      this.unexpectedClose(token);
    }
  };

  _proto.endFile = function endFile() {
    if (this.current.parent) this.unclosedBlock();

    if (this.current.nodes && this.current.nodes.length) {
      this.current.raws.semicolon = this.semicolon;
    }

    this.current.raws.after = (this.current.raws.after || '') + this.spaces;
  };

  _proto.freeSemicolon = function freeSemicolon(token) {
    this.spaces += token[1];

    if (this.current.nodes) {
      var prev = this.current.nodes[this.current.nodes.length - 1];

      if (prev && prev.type === 'rule' && !prev.raws.ownSemicolon) {
        prev.raws.ownSemicolon = this.spaces;
        this.spaces = '';
      }
    }
  } // Helpers
  ;

  _proto.init = function init(node, line, column) {
    this.current.push(node);
    node.source = {
      start: {
        line: line,
        column: column
      },
      input: this.input
    };
    node.raws.before = this.spaces;
    this.spaces = '';
    if (node.type !== 'comment') this.semicolon = false;
  };

  _proto.raw = function raw(node, prop, tokens) {
    var token, type;
    var length = tokens.length;
    var value = '';
    var clean = true;
    var next, prev;
    var pattern = /^([.|#])?([\w])+/i;

    for (var i = 0; i < length; i += 1) {
      token = tokens[i];
      type = token[0];

      if (type === 'comment' && node.type === 'rule') {
        prev = tokens[i - 1];
        next = tokens[i + 1];

        if (prev[0] !== 'space' && next[0] !== 'space' && pattern.test(prev[1]) && pattern.test(next[1])) {
          value += token[1];
        } else {
          clean = false;
        }

        continue;
      }

      if (type === 'comment' || type === 'space' && i === length - 1) {
        clean = false;
      } else {
        value += token[1];
      }
    }

    if (!clean) {
      var raw = tokens.reduce(function (all, i) {
        return all + i[1];
      }, '');
      node.raws[prop] = {
        value: value,
        raw: raw
      };
    }

    node[prop] = value;
  };

  _proto.spacesAndCommentsFromEnd = function spacesAndCommentsFromEnd(tokens) {
    var lastTokenType;
    var spaces = '';

    while (tokens.length) {
      lastTokenType = tokens[tokens.length - 1][0];
      if (lastTokenType !== 'space' && lastTokenType !== 'comment') break;
      spaces = tokens.pop()[1] + spaces;
    }

    return spaces;
  };

  _proto.spacesAndCommentsFromStart = function spacesAndCommentsFromStart(tokens) {
    var next;
    var spaces = '';

    while (tokens.length) {
      next = tokens[0][0];
      if (next !== 'space' && next !== 'comment') break;
      spaces += tokens.shift()[1];
    }

    return spaces;
  };

  _proto.spacesFromEnd = function spacesFromEnd(tokens) {
    var lastTokenType;
    var spaces = '';

    while (tokens.length) {
      lastTokenType = tokens[tokens.length - 1][0];
      if (lastTokenType !== 'space') break;
      spaces = tokens.pop()[1] + spaces;
    }

    return spaces;
  };

  _proto.stringFrom = function stringFrom(tokens, from) {
    var result = '';

    for (var i = from; i < tokens.length; i++) {
      result += tokens[i][1];
    }

    tokens.splice(from, tokens.length - from);
    return result;
  };

  _proto.colon = function colon(tokens) {
    var brackets = 0;
    var token, type, prev;

    for (var i = 0; i < tokens.length; i++) {
      token = tokens[i];
      type = token[0];

      if (type === '(') {
        brackets += 1;
      }

      if (type === ')') {
        brackets -= 1;
      }

      if (brackets === 0 && type === ':') {
        if (!prev) {
          this.doubleColon(token);
        } else if (prev[0] === 'word' && prev[1] === 'progid') {
          continue;
        } else {
          return i;
        }
      }

      prev = token;
    }

    return false;
  } // Errors
  ;

  _proto.unclosedBracket = function unclosedBracket(bracket) {
    throw this.input.error('Unclosed bracket', bracket[2], bracket[3]);
  };

  _proto.unknownWord = function unknownWord(tokens) {
    throw this.input.error('Unknown word', tokens[0][2], tokens[0][3]);
  };

  _proto.unexpectedClose = function unexpectedClose(token) {
    throw this.input.error('Unexpected }', token[2], token[3]);
  };

  _proto.unclosedBlock = function unclosedBlock() {
    var pos = this.current.source.start;
    throw this.input.error('Unclosed block', pos.line, pos.column);
  };

  _proto.doubleColon = function doubleColon(token) {
    throw this.input.error('Double colon', token[2], token[3]);
  };

  _proto.unnamedAtrule = function unnamedAtrule(node, token) {
    throw this.input.error('At-rule without name', token[2], token[3]);
  };

  _proto.precheckMissedSemicolon = function precheckMissedSemicolon()
  /* tokens */
  {// Hook for Safe Parser
  };

  _proto.checkMissedSemicolon = function checkMissedSemicolon(tokens) {
    var colon = this.colon(tokens);
    if (colon === false) return;
    var founded = 0;
    var token;

    for (var j = colon - 1; j >= 0; j--) {
      token = tokens[j];

      if (token[0] !== 'space') {
        founded += 1;
        if (founded === 2) break;
      }
    }

    throw this.input.error('Missed semicolon', token[2], token[3]);
  };

  return Parser;
}();

exports.default = Parser;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlci5lczYiXSwibmFtZXMiOlsiUGFyc2VyIiwiaW5wdXQiLCJyb290IiwiUm9vdCIsImN1cnJlbnQiLCJzcGFjZXMiLCJzZW1pY29sb24iLCJjcmVhdGVUb2tlbml6ZXIiLCJzb3VyY2UiLCJzdGFydCIsImxpbmUiLCJjb2x1bW4iLCJ0b2tlbml6ZXIiLCJwYXJzZSIsInRva2VuIiwiZW5kT2ZGaWxlIiwibmV4dFRva2VuIiwiZnJlZVNlbWljb2xvbiIsImVuZCIsImNvbW1lbnQiLCJhdHJ1bGUiLCJlbXB0eVJ1bGUiLCJvdGhlciIsImVuZEZpbGUiLCJub2RlIiwiQ29tbWVudCIsImluaXQiLCJ0ZXh0Iiwic2xpY2UiLCJ0ZXN0IiwicmF3cyIsImxlZnQiLCJyaWdodCIsIm1hdGNoIiwiUnVsZSIsInNlbGVjdG9yIiwiYmV0d2VlbiIsInR5cGUiLCJjb2xvbiIsImJyYWNrZXQiLCJicmFja2V0cyIsInRva2VucyIsInB1c2giLCJsZW5ndGgiLCJkZWNsIiwicnVsZSIsImJhY2siLCJwb3AiLCJ1bmNsb3NlZEJyYWNrZXQiLCJ1bmtub3duV29yZCIsInNwYWNlc0FuZENvbW1lbnRzRnJvbUVuZCIsInJhdyIsIkRlY2xhcmF0aW9uIiwibGFzdCIsImJlZm9yZSIsInNoaWZ0IiwicHJvcCIsInNwYWNlc0FuZENvbW1lbnRzRnJvbVN0YXJ0IiwicHJlY2hlY2tNaXNzZWRTZW1pY29sb24iLCJpIiwidG9Mb3dlckNhc2UiLCJpbXBvcnRhbnQiLCJzdHJpbmciLCJzdHJpbmdGcm9tIiwic3BhY2VzRnJvbUVuZCIsImNhY2hlIiwic3RyIiwiaiIsInRyaW0iLCJpbmRleE9mIiwidmFsdWUiLCJjaGVja01pc3NlZFNlbWljb2xvbiIsIkF0UnVsZSIsIm5hbWUiLCJ1bm5hbWVkQXRydWxlIiwicHJldiIsIm9wZW4iLCJwYXJhbXMiLCJhZnRlck5hbWUiLCJub2RlcyIsImFmdGVyIiwicGFyZW50IiwidW5leHBlY3RlZENsb3NlIiwidW5jbG9zZWRCbG9jayIsIm93blNlbWljb2xvbiIsImNsZWFuIiwibmV4dCIsInBhdHRlcm4iLCJyZWR1Y2UiLCJhbGwiLCJsYXN0VG9rZW5UeXBlIiwiZnJvbSIsInJlc3VsdCIsInNwbGljZSIsImRvdWJsZUNvbG9uIiwiZXJyb3IiLCJwb3MiLCJmb3VuZGVkIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0lBRXFCQSxNO0FBQ25CLGtCQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUVBLFNBQUtDLElBQUwsR0FBWSxJQUFJQyxhQUFKLEVBQVo7QUFDQSxTQUFLQyxPQUFMLEdBQWUsS0FBS0YsSUFBcEI7QUFDQSxTQUFLRyxNQUFMLEdBQWMsRUFBZDtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFFQSxTQUFLQyxlQUFMO0FBQ0EsU0FBS0wsSUFBTCxDQUFVTSxNQUFWLEdBQW1CO0FBQUVQLE1BQUFBLEtBQUssRUFBTEEsS0FBRjtBQUFTUSxNQUFBQSxLQUFLLEVBQUU7QUFBRUMsUUFBQUEsSUFBSSxFQUFFLENBQVI7QUFBV0MsUUFBQUEsTUFBTSxFQUFFO0FBQW5CO0FBQWhCLEtBQW5CO0FBQ0Q7Ozs7U0FFREosZSxHQUFBLDJCQUFtQjtBQUNqQixTQUFLSyxTQUFMLEdBQWlCLHVCQUFVLEtBQUtYLEtBQWYsQ0FBakI7QUFDRCxHOztTQUVEWSxLLEdBQUEsaUJBQVM7QUFDUCxRQUFJQyxLQUFKOztBQUNBLFdBQU8sQ0FBQyxLQUFLRixTQUFMLENBQWVHLFNBQWYsRUFBUixFQUFvQztBQUNsQ0QsTUFBQUEsS0FBSyxHQUFHLEtBQUtGLFNBQUwsQ0FBZUksU0FBZixFQUFSOztBQUVBLGNBQVFGLEtBQUssQ0FBQyxDQUFELENBQWI7QUFDRSxhQUFLLE9BQUw7QUFDRSxlQUFLVCxNQUFMLElBQWVTLEtBQUssQ0FBQyxDQUFELENBQXBCO0FBQ0E7O0FBRUYsYUFBSyxHQUFMO0FBQ0UsZUFBS0csYUFBTCxDQUFtQkgsS0FBbkI7QUFD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LENBQWhCLEVBQW1CO0FBQ3BCO0FBQ0Y7O0FBQ0QsVUFBTSxLQUFLaEcsS0FBTCxDQUFXOEYsS0FBWCxDQUFpQixrQkFBakIsRUFBcUNqRixLQUFLLENBQUMsQ0FBRCxDQUExQyxFQUErQ0EsS0FBSyxDQUFDLENBQUQsQ0FBcEQsQ0FBTjtBQUNELEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGVjbGFyYXRpb24gZnJvbSAnLi9kZWNsYXJhdGlvbidcbmltcG9ydCB0b2tlbml6ZXIgZnJvbSAnLi90b2tlbml6ZSdcbmltcG9ydCBDb21tZW50IGZyb20gJy4vY29tbWVudCdcbmltcG9ydCBBdFJ1bGUgZnJvbSAnLi9hdC1ydWxlJ1xuaW1wb3J0IFJvb3QgZnJvbSAnLi9yb290J1xuaW1wb3J0IFJ1bGUgZnJvbSAnLi9ydWxlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJzZXIge1xuICBjb25zdHJ1Y3RvciAoaW5wdXQpIHtcbiAgICB0aGlzLmlucHV0ID0gaW5wdXRcblxuICAgIHRoaXMucm9vdCA9IG5ldyBSb290KClcbiAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLnJvb3RcbiAgICB0aGlzLnNwYWNlcyA9ICcnXG4gICAgdGhpcy5zZW1pY29sb24gPSBmYWxzZVxuXG4gICAgdGhpcy5jcmVhdGVUb2tlbml6ZXIoKVxuICAgIHRoaXMucm9vdC5zb3VyY2UgPSB7IGlucHV0LCBzdGFydDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSB9XG4gIH1cblxuICBjcmVhdGVUb2tlbml6ZXIgKCkge1xuICAgIHRoaXMudG9rZW5pemVyID0gdG9rZW5pemVyKHRoaXMuaW5wdXQpXG4gIH1cblxuICBwYXJzZSAoKSB7XG4gICAgbGV0IHRva2VuXG4gICAgd2hpbGUgKCF0aGlzLnRva2VuaXplci5lbmRPZkZpbGUoKSkge1xuICAgICAgdG9rZW4gPSB0aGlzLnRva2VuaXplci5uZXh0VG9rZW4oKVxuXG4gICAgICBzd2l0Y2ggKHRva2VuWzBdKSB7XG4gICAgICAgIGNhc2UgJ3NwYWNlJzpcbiAgICAgICAgICB0aGlzLnNwYWNlcyArPSB0b2tlblsxXVxuICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgY2FzZSAnOyc6XG4gICAgICAgICAgdGhpcy5mcmVlU2VtaWNvbG9uKHRva2VuKVxuICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgY2FzZSAnfSc6XG4gICAgICAgICAgdGhpcy5lbmQodG9rZW4pXG4gICAgICAgICAgYnJlYWtcblxuICAgICAgICBjYXNlICdjb21tZW50JzpcbiAgICAgICAgICB0aGlzLmNvbW1lbnQodG9rZW4pXG4gICAgICAgICAgYnJlYWtcblxuICAgICAgICBjYXNlICdhdC13b3JkJzpcbiAgICAgICAgICB0aGlzLmF0cnVsZSh0b2tlbilcbiAgICAgICAgICBicmVha1xuXG4gICAgICAgIGNhc2UgJ3snOlxuICAgICAgICAgIHRoaXMuZW1wdHlSdWxlKHRva2VuKVxuICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aGlzLm90aGVyKHRva2VuKVxuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZW5kRmlsZSgpXG4gIH1cblxuICBjb21tZW50ICh0b2tlbikge1xuICAgIGxldCBub2RlID0gbmV3IENvbW1lbnQoKVxuICAgIHRoaXMuaW5pdChub2RlLCB0b2tlblsyXSwgdG9rZW5bM10pXG4gICAgbm9kZS5zb3VyY2UuZW5kID0geyBsaW5lOiB0b2tlbls0XSwgY29sdW1uOiB0b2tlbls1XSB9XG5cbiAgICBsZXQgdGV4dCA9IHRva2VuWzFdLnNsaWNlKDIsIC0yKVxuICAgIGlmICgvXlxccyokLy50ZXN0KHRleHQpKSB7XG4gICAgICBub2RlLnRleHQgPSAnJ1xuICAgICAgbm9kZS5yYXdzLmxlZnQgPSB0ZXh0XG4gICAgICBub2RlLnJhd3MucmlnaHQgPSAnJ1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbWF0Y2ggPSB0ZXh0Lm1hdGNoKC9eKFxccyopKFteXSpbXlxcc10pKFxccyopJC8pXG4gICAgICBub2RlLnRleHQgPSBtYXRjaFsyXVxuICAgICAgbm9kZS5yYXdzLmxlZnQgPSBtYXRjaFsxXVxuICAgICAgbm9kZS5yYXdzLnJpZ2h0ID0gbWF0Y2hbM11cbiAgICB9XG4gIH1cblxuICBlbXB0eVJ1bGUgKHRva2VuKSB7XG4gICAgbGV0IG5vZGUgPSBuZXcgUnVsZSgpXG4gICAgdGhpcy5pbml0KG5vZGUsIHRva2VuWzJdLCB0b2tlblszXSlcbiAgICBub2RlLnNlbGVjdG9yID0gJydcbiAgICBub2RlLnJhd3MuYmV0d2VlbiA9ICcnXG4gICAgdGhpcy5jdXJyZW50ID0gbm9kZVxuICB9XG5cbiAgb3RoZXIgKHN0YXJ0KSB7XG4gICAgbGV0IGVuZCA9IGZhbHNlXG4gICAgbGV0IHR5cGUgPSBudWxsXG4gICAgbGV0IGNvbG9uID0gZmFsc2VcbiAgICBsZXQgYnJhY2tldCA9IG51bGxcbiAgICBsZXQgYnJhY2tldHMgPSBbXVxuXG4gICAgbGV0IHRva2VucyA9IFtdXG4gICAgbGV0IHRva2VuID0gc3RhcnRcbiAgICB3aGlsZSAodG9rZW4pIHtcbiAgICAgIHR5cGUgPSB0b2tlblswXVxuICAgICAgdG9rZW5zLnB1c2godG9rZW4pXG5cbiAgICAgIGlmICh0eXBlID09PSAnKCcgfHwgdHlwZSA9PT0gJ1snKSB7XG4gICAgICAgIGlmICghYnJhY2tldCkgYnJhY2tldCA9IHRva2VuXG4gICAgICAgIGJyYWNrZXRzLnB1c2godHlwZSA9PT0gJygnID8gJyknIDogJ10nKVxuICAgICAgfSBlbHNlIGlmIChicmFja2V0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICc7Jykge1xuICAgICAgICAgIGlmIChjb2xvbikge1xuICAgICAgICAgICAgdGhpcy5kZWNsKHRva2VucylcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAneycpIHtcbiAgICAgICAgICB0aGlzLnJ1bGUodG9rZW5zKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd9Jykge1xuICAgICAgICAgIHRoaXMudG9rZW5pemVyLmJhY2sodG9rZW5zLnBvcCgpKVxuICAgICAgICAgIGVuZCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICc6Jykge1xuICAgICAgICAgIGNvbG9uID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IGJyYWNrZXRzW2JyYWNrZXRzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgIGJyYWNrZXRzLnBvcCgpXG4gICAgICAgIGlmIChicmFja2V0cy5sZW5ndGggPT09IDApIGJyYWNrZXQgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIHRva2VuID0gdGhpcy50b2tlbml6ZXIubmV4dFRva2VuKClcbiAgICB9XG5cbiAgICBpZiAodGhpcy50b2tlbml6ZXIuZW5kT2ZGaWxlKCkpIGVuZCA9IHRydWVcbiAgICBpZiAoYnJhY2tldHMubGVuZ3RoID4gMCkgdGhpcy51bmNsb3NlZEJyYWNrZXQoYnJhY2tldClcblxuICAgIGlmIChlbmQgJiYgY29sb24pIHtcbiAgICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgIHRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXVswXVxuICAgICAgICBpZiAodG9rZW4gIT09ICdzcGFjZScgJiYgdG9rZW4gIT09ICdjb21tZW50JykgYnJlYWtcbiAgICAgICAgdGhpcy50b2tlbml6ZXIuYmFjayh0b2tlbnMucG9wKCkpXG4gICAgICB9XG4gICAgICB0aGlzLmRlY2wodG9rZW5zKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVua25vd25Xb3JkKHRva2VucylcbiAgICB9XG4gIH1cblxuICBydWxlICh0b2tlbnMpIHtcbiAgICB0b2tlbnMucG9wKClcblxuICAgIGxldCBub2RlID0gbmV3IFJ1bGUoKVxuICAgIHRoaXMuaW5pdChub2RlLCB0b2tlbnNbMF1bMl0sIHRva2Vuc1swXVszXSlcblxuICAgIG5vZGUucmF3cy5iZXR3ZWVuID0gdGhpcy5zcGFjZXNBbmRDb21tZW50c0Zyb21FbmQodG9rZW5zKVxuICAgIHRoaXMucmF3KG5vZGUsICdzZWxlY3RvcicsIHRva2VucylcbiAgICB0aGlzLmN1cnJlbnQgPSBub2RlXG4gIH1cblxuICBkZWNsICh0b2tlbnMpIHtcbiAgICBsZXQgbm9kZSA9IG5ldyBEZWNsYXJhdGlvbigpXG4gICAgdGhpcy5pbml0KG5vZGUpXG5cbiAgICBsZXQgbGFzdCA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV1cbiAgICBpZiAobGFzdFswXSA9PT0gJzsnKSB7XG4gICAgICB0aGlzLnNlbWljb2xvbiA9IHRydWVcbiAgICAgIHRva2Vucy5wb3AoKVxuICAgIH1cbiAgICBpZiAobGFzdFs0XSkge1xuICAgICAgbm9kZS5zb3VyY2UuZW5kID0geyBsaW5lOiBsYXN0WzRdLCBjb2x1bW46IGxhc3RbNV0gfVxuICAgIH0gZWxzZSB7XG4gICAgICBub2RlLnNvdXJjZS5lbmQgPSB7IGxpbmU6IGxhc3RbMl0sIGNvbHVtbjogbGFzdFszXSB9XG4gICAgfVxuXG4gICAgd2hpbGUgKHRva2Vuc1swXVswXSAhPT0gJ3dvcmQnKSB7XG4gICAgICBpZiAodG9rZW5zLmxlbmd0aCA9PT0gMSkgdGhpcy51bmtub3duV29yZCh0b2tlbnMpXG4gICAgICBub2RlLnJhd3MuYmVmb3JlICs9IHRva2Vucy5zaGlmdCgpWzFdXG4gICAgfVxuICAgIG5vZGUuc291cmNlLnN0YXJ0ID0geyBsaW5lOiB0b2tlbnNbMF1bMl0sIGNvbHVtbjogdG9rZW5zWzBdWzNdIH1cblxuICAgIG5vZGUucHJvcCA9ICcnXG4gICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgIGxldCB0eXBlID0gdG9rZW5zWzBdWzBdXG4gICAgICBpZiAodHlwZSA9PT0gJzonIHx8IHR5cGUgPT09ICdzcGFjZScgfHwgdHlwZSA9PT0gJ2NvbW1lbnQnKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBub2RlLnByb3AgKz0gdG9rZW5zLnNoaWZ0KClbMV1cbiAgICB9XG5cbiAgICBub2RlLnJhd3MuYmV0d2VlbiA9ICcnXG5cbiAgICBsZXQgdG9rZW5cbiAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgdG9rZW4gPSB0b2tlbnMuc2hpZnQoKVxuXG4gICAgICBpZiAodG9rZW5bMF0gPT09ICc6Jykge1xuICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiArPSB0b2tlblsxXVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRva2VuWzBdID09PSAnd29yZCcgJiYgL1xcdy8udGVzdCh0b2tlblsxXSkpIHtcbiAgICAgICAgICB0aGlzLnVua25vd25Xb3JkKFt0b2tlbl0pXG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5yYXdzLmJldHdlZW4gKz0gdG9rZW5bMV1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobm9kZS5wcm9wWzBdID09PSAnXycgfHwgbm9kZS5wcm9wWzBdID09PSAnKicpIHtcbiAgICAgIG5vZGUucmF3cy5iZWZvcmUgKz0gbm9kZS5wcm9wWzBdXG4gICAgICBub2RlLnByb3AgPSBub2RlLnByb3Auc2xpY2UoMSlcbiAgICB9XG4gICAgbm9kZS5yYXdzLmJldHdlZW4gKz0gdGhpcy5zcGFjZXNBbmRDb21tZW50c0Zyb21TdGFydCh0b2tlbnMpXG4gICAgdGhpcy5wcmVjaGVja01pc3NlZFNlbWljb2xvbih0b2tlbnMpXG5cbiAgICBmb3IgKGxldCBpID0gdG9rZW5zLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldXG4gICAgICBpZiAodG9rZW5bMV0udG9Mb3dlckNhc2UoKSA9PT0gJyFpbXBvcnRhbnQnKSB7XG4gICAgICAgIG5vZGUuaW1wb3J0YW50ID0gdHJ1ZVxuICAgICAgICBsZXQgc3RyaW5nID0gdGhpcy5zdHJpbmdGcm9tKHRva2VucywgaSlcbiAgICAgICAgc3RyaW5nID0gdGhpcy5zcGFjZXNGcm9tRW5kKHRva2VucykgKyBzdHJpbmdcbiAgICAgICAgaWYgKHN0cmluZyAhPT0gJyAhaW1wb3J0YW50Jykgbm9kZS5yYXdzLmltcG9ydGFudCA9IHN0cmluZ1xuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIGlmICh0b2tlblsxXS50b0xvd2VyQ2FzZSgpID09PSAnaW1wb3J0YW50Jykge1xuICAgICAgICBsZXQgY2FjaGUgPSB0b2tlbnMuc2xpY2UoMClcbiAgICAgICAgbGV0IHN0ciA9ICcnXG4gICAgICAgIGZvciAobGV0IGogPSBpOyBqID4gMDsgai0tKSB7XG4gICAgICAgICAgbGV0IHR5cGUgPSBjYWNoZVtqXVswXVxuICAgICAgICAgIGlmIChzdHIudHJpbSgpLmluZGV4T2YoJyEnKSA9PT0gMCAmJiB0eXBlICE9PSAnc3BhY2UnKSB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdHIgPSBjYWNoZS5wb3AoKVsxXSArIHN0clxuICAgICAgICB9XG4gICAgICAgIGlmIChzdHIudHJpbSgpLmluZGV4T2YoJyEnKSA9PT0gMCkge1xuICAgICAgICAgIG5vZGUuaW1wb3J0YW50ID0gdHJ1ZVxuICAgICAgICAgIG5vZGUucmF3cy5pbXBvcnRhbnQgPSBzdHJcbiAgICAgICAgICB0b2tlbnMgPSBjYWNoZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlblswXSAhPT0gJ3NwYWNlJyAmJiB0b2tlblswXSAhPT0gJ2NvbW1lbnQnKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yYXcobm9kZSwgJ3ZhbHVlJywgdG9rZW5zKVxuXG4gICAgaWYgKG5vZGUudmFsdWUuaW5kZXhPZignOicpICE9PSAtMSkgdGhpcy5jaGVja01pc3NlZFNlbWljb2xvbih0b2tlbnMpXG4gIH1cblxuICBhdHJ1bGUgKHRva2VuKSB7XG4gICAgbGV0IG5vZGUgPSBuZXcgQXRSdWxlKClcbiAgICBub2RlLm5hbWUgPSB0b2tlblsxXS5zbGljZSgxKVxuICAgIGlmIChub2RlLm5hbWUgPT09ICcnKSB7XG4gICAgICB0aGlzLnVubmFtZWRBdHJ1bGUobm9kZSwgdG9rZW4pXG4gICAgfVxuICAgIHRoaXMuaW5pdChub2RlLCB0b2tlblsyXSwgdG9rZW5bM10pXG5cbiAgICBsZXQgcHJldlxuICAgIGxldCBzaGlmdFxuICAgIGxldCBsYXN0ID0gZmFsc2VcbiAgICBsZXQgb3BlbiA9IGZhbHNlXG4gICAgbGV0IHBhcmFtcyA9IFtdXG5cbiAgICB3aGlsZSAoIXRoaXMudG9rZW5pemVyLmVuZE9mRmlsZSgpKSB7XG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5pemVyLm5leHRUb2tlbigpXG5cbiAgICAgIGlmICh0b2tlblswXSA9PT0gJzsnKSB7XG4gICAgICAgIG5vZGUuc291cmNlLmVuZCA9IHsgbGluZTogdG9rZW5bMl0sIGNvbHVtbjogdG9rZW5bM10gfVxuICAgICAgICB0aGlzLnNlbWljb2xvbiA9IHRydWVcbiAgICAgICAgYnJlYWtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW5bMF0gPT09ICd7Jykge1xuICAgICAgICBvcGVuID0gdHJ1ZVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIGlmICh0b2tlblswXSA9PT0gJ30nKSB7XG4gICAgICAgIGlmIChwYXJhbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHNoaWZ0ID0gcGFyYW1zLmxlbmd0aCAtIDFcbiAgICAgICAgICBwcmV2ID0gcGFyYW1zW3NoaWZ0XVxuICAgICAgICAgIHdoaWxlIChwcmV2ICYmIHByZXZbMF0gPT09ICdzcGFjZScpIHtcbiAgICAgICAgICAgIHByZXYgPSBwYXJhbXNbLS1zaGlmdF1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgICAgIG5vZGUuc291cmNlLmVuZCA9IHsgbGluZTogcHJldls0XSwgY29sdW1uOiBwcmV2WzVdIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmQodG9rZW4pXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXMucHVzaCh0b2tlbilcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMudG9rZW5pemVyLmVuZE9mRmlsZSgpKSB7XG4gICAgICAgIGxhc3QgPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuXG4gICAgbm9kZS5yYXdzLmJldHdlZW4gPSB0aGlzLnNwYWNlc0FuZENvbW1lbnRzRnJvbUVuZChwYXJhbXMpXG4gICAgaWYgKHBhcmFtcy5sZW5ndGgpIHtcbiAgICAgIG5vZGUucmF3cy5hZnRlck5hbWUgPSB0aGlzLnNwYWNlc0FuZENvbW1lbnRzRnJvbVN0YXJ0KHBhcmFtcylcbiAgICAgIHRoaXMucmF3KG5vZGUsICdwYXJhbXMnLCBwYXJhbXMpXG4gICAgICBpZiAobGFzdCkge1xuICAgICAgICB0b2tlbiA9IHBhcmFtc1twYXJhbXMubGVuZ3RoIC0gMV1cbiAgICAgICAgbm9kZS5zb3VyY2UuZW5kID0geyBsaW5lOiB0b2tlbls0XSwgY29sdW1uOiB0b2tlbls1XSB9XG4gICAgICAgIHRoaXMuc3BhY2VzID0gbm9kZS5yYXdzLmJldHdlZW5cbiAgICAgICAgbm9kZS5yYXdzLmJldHdlZW4gPSAnJ1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBub2RlLnJhd3MuYWZ0ZXJOYW1lID0gJydcbiAgICAgIG5vZGUucGFyYW1zID0gJydcbiAgICB9XG5cbiAgICBpZiAob3Blbikge1xuICAgICAgbm9kZS5ub2RlcyA9IFtdXG4gICAgICB0aGlzLmN1cnJlbnQgPSBub2RlXG4gICAgfVxuICB9XG5cbiAgZW5kICh0b2tlbikge1xuICAgIGlmICh0aGlzLmN1cnJlbnQubm9kZXMgJiYgdGhpcy5jdXJyZW50Lm5vZGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5jdXJyZW50LnJhd3Muc2VtaWNvbG9uID0gdGhpcy5zZW1pY29sb25cbiAgICB9XG4gICAgdGhpcy5zZW1pY29sb24gPSBmYWxzZVxuXG4gICAgdGhpcy5jdXJyZW50LnJhd3MuYWZ0ZXIgPSAodGhpcy5jdXJyZW50LnJhd3MuYWZ0ZXIgfHwgJycpICsgdGhpcy5zcGFjZXNcbiAgICB0aGlzLnNwYWNlcyA9ICcnXG5cbiAgICBpZiAodGhpcy5jdXJyZW50LnBhcmVudCkge1xuICAgICAgdGhpcy5jdXJyZW50LnNvdXJjZS5lbmQgPSB7IGxpbmU6IHRva2VuWzJdLCBjb2x1bW46IHRva2VuWzNdIH1cbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMuY3VycmVudC5wYXJlbnRcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51bmV4cGVjdGVkQ2xvc2UodG9rZW4pXG4gICAgfVxuICB9XG5cbiAgZW5kRmlsZSAoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudC5wYXJlbnQpIHRoaXMudW5jbG9zZWRCbG9jaygpXG4gICAgaWYgKHRoaXMuY3VycmVudC5ub2RlcyAmJiB0aGlzLmN1cnJlbnQubm9kZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmN1cnJlbnQucmF3cy5zZW1pY29sb24gPSB0aGlzLnNlbWljb2xvblxuICAgIH1cbiAgICB0aGlzLmN1cnJlbnQucmF3cy5hZnRlciA9ICh0aGlzLmN1cnJlbnQucmF3cy5hZnRlciB8fCAnJykgKyB0aGlzLnNwYWNlc1xuICB9XG5cbiAgZnJlZVNlbWljb2xvbiAodG9rZW4pIHtcbiAgICB0aGlzLnNwYWNlcyArPSB0b2tlblsxXVxuICAgIGlmICh0aGlzLmN1cnJlbnQubm9kZXMpIHtcbiAgICAgIGxldCBwcmV2ID0gdGhpcy5jdXJyZW50Lm5vZGVzW3RoaXMuY3VycmVudC5ub2Rlcy5sZW5ndGggLSAxXVxuICAgICAgaWYgKHByZXYgJiYgcHJldi50eXBlID09PSAncnVsZScgJiYgIXByZXYucmF3cy5vd25TZW1pY29sb24pIHtcbiAgICAgICAgcHJldi5yYXdzLm93blNlbWljb2xvbiA9IHRoaXMuc3BhY2VzXG4gICAgICAgIHRoaXMuc3BhY2VzID0gJydcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBIZWxwZXJzXG5cbiAgaW5pdCAobm9kZSwgbGluZSwgY29sdW1uKSB7XG4gICAgdGhpcy5jdXJyZW50LnB1c2gobm9kZSlcblxuICAgIG5vZGUuc291cmNlID0geyBzdGFydDogeyBsaW5lLCBjb2x1bW4gfSwgaW5wdXQ6IHRoaXMuaW5wdXQgfVxuICAgIG5vZGUucmF3cy5iZWZvcmUgPSB0aGlzLnNwYWNlc1xuICAgIHRoaXMuc3BhY2VzID0gJydcbiAgICBpZiAobm9kZS50eXBlICE9PSAnY29tbWVudCcpIHRoaXMuc2VtaWNvbG9uID0gZmFsc2VcbiAgfVxuXG4gIHJhdyAobm9kZSwgcHJvcCwgdG9rZW5zKSB7XG4gICAgbGV0IHRva2VuLCB0eXBlXG4gICAgbGV0IGxlbmd0aCA9IHRva2Vucy5sZW5ndGhcbiAgICBsZXQgdmFsdWUgPSAnJ1xuICAgIGxldCBjbGVhbiA9IHRydWVcbiAgICBsZXQgbmV4dCwgcHJldlxuICAgIGxldCBwYXR0ZXJuID0gL14oWy58I10pPyhbXFx3XSkrL2lcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldXG4gICAgICB0eXBlID0gdG9rZW5bMF1cblxuICAgICAgaWYgKHR5cGUgPT09ICdjb21tZW50JyAmJiBub2RlLnR5cGUgPT09ICdydWxlJykge1xuICAgICAgICBwcmV2ID0gdG9rZW5zW2kgLSAxXVxuICAgICAgICBuZXh0ID0gdG9rZW5zW2kgKyAxXVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcmV2WzBdICE9PSAnc3BhY2UnICYmXG4gICAgICAgICAgbmV4dFswXSAhPT0gJ3NwYWNlJyAmJlxuICAgICAgICAgIHBhdHRlcm4udGVzdChwcmV2WzFdKSAmJlxuICAgICAgICAgIHBhdHRlcm4udGVzdChuZXh0WzFdKVxuICAgICAgICApIHtcbiAgICAgICAgICB2YWx1ZSArPSB0b2tlblsxXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNsZWFuID0gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlID09PSAnY29tbWVudCcgfHwgKHR5cGUgPT09ICdzcGFjZScgJiYgaSA9PT0gbGVuZ3RoIC0gMSkpIHtcbiAgICAgICAgY2xlYW4gPSBmYWxzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgKz0gdG9rZW5bMV1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFjbGVhbikge1xuICAgICAgbGV0IHJhdyA9IHRva2Vucy5yZWR1Y2UoKGFsbCwgaSkgPT4gYWxsICsgaVsxXSwgJycpXG4gICAgICBub2RlLnJhd3NbcHJvcF0gPSB7IHZhbHVlLCByYXcgfVxuICAgIH1cbiAgICBub2RlW3Byb3BdID0gdmFsdWVcbiAgfVxuXG4gIHNwYWNlc0FuZENvbW1lbnRzRnJvbUVuZCAodG9rZW5zKSB7XG4gICAgbGV0IGxhc3RUb2tlblR5cGVcbiAgICBsZXQgc3BhY2VzID0gJydcbiAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgbGFzdFRva2VuVHlwZSA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV1bMF1cbiAgICAgIGlmIChsYXN0VG9rZW5UeXBlICE9PSAnc3BhY2UnICYmIGxhc3RUb2tlblR5cGUgIT09ICdjb21tZW50JykgYnJlYWtcbiAgICAgIHNwYWNlcyA9IHRva2Vucy5wb3AoKVsxXSArIHNwYWNlc1xuICAgIH1cbiAgICByZXR1cm4gc3BhY2VzXG4gIH1cblxuICBzcGFjZXNBbmRDb21tZW50c0Zyb21TdGFydCAodG9rZW5zKSB7XG4gICAgbGV0IG5leHRcbiAgICBsZXQgc3BhY2VzID0gJydcbiAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgbmV4dCA9IHRva2Vuc1swXVswXVxuICAgICAgaWYgKG5leHQgIT09ICdzcGFjZScgJiYgbmV4dCAhPT0gJ2NvbW1lbnQnKSBicmVha1xuICAgICAgc3BhY2VzICs9IHRva2Vucy5zaGlmdCgpWzFdXG4gICAgfVxuICAgIHJldHVybiBzcGFjZXNcbiAgfVxuXG4gIHNwYWNlc0Zyb21FbmQgKHRva2Vucykge1xuICAgIGxldCBsYXN0VG9rZW5UeXBlXG4gICAgbGV0IHNwYWNlcyA9ICcnXG4gICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgIGxhc3RUb2tlblR5cGUgPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdWzBdXG4gICAgICBpZiAobGFzdFRva2VuVHlwZSAhPT0gJ3NwYWNlJykgYnJlYWtcbiAgICAgIHNwYWNlcyA9IHRva2Vucy5wb3AoKVsxXSArIHNwYWNlc1xuICAgIH1cbiAgICByZXR1cm4gc3BhY2VzXG4gIH1cblxuICBzdHJpbmdGcm9tICh0b2tlbnMsIGZyb20pIHtcbiAgICBsZXQgcmVzdWx0ID0gJydcbiAgICBmb3IgKGxldCBpID0gZnJvbTsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzdWx0ICs9IHRva2Vuc1tpXVsxXVxuICAgIH1cbiAgICB0b2tlbnMuc3BsaWNlKGZyb20sIHRva2Vucy5sZW5ndGggLSBmcm9tKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGNvbG9uICh0b2tlbnMpIHtcbiAgICBsZXQgYnJhY2tldHMgPSAwXG4gICAgbGV0IHRva2VuLCB0eXBlLCBwcmV2XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldXG4gICAgICB0eXBlID0gdG9rZW5bMF1cblxuICAgICAgaWYgKHR5cGUgPT09ICcoJykge1xuICAgICAgICBicmFja2V0cyArPSAxXG4gICAgICB9XG4gICAgICBpZiAodHlwZSA9PT0gJyknKSB7XG4gICAgICAgIGJyYWNrZXRzIC09IDFcbiAgICAgIH1cbiAgICAgIGlmIChicmFja2V0cyA9PT0gMCAmJiB0eXBlID09PSAnOicpIHtcbiAgICAgICAgaWYgKCFwcmV2KSB7XG4gICAgICAgICAgdGhpcy5kb3VibGVDb2xvbih0b2tlbilcbiAgICAgICAgfSBlbHNlIGlmIChwcmV2WzBdID09PSAnd29yZCcgJiYgcHJldlsxXSA9PT0gJ3Byb2dpZCcpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHJldiA9IHRva2VuXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gRXJyb3JzXG5cbiAgdW5jbG9zZWRCcmFja2V0IChicmFja2V0KSB7XG4gICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcignVW5jbG9zZWQgYnJhY2tldCcsIGJyYWNrZXRbMl0sIGJyYWNrZXRbM10pXG4gIH1cblxuICB1bmtub3duV29yZCAodG9rZW5zKSB7XG4gICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcignVW5rbm93biB3b3JkJywgdG9rZW5zWzBdWzJdLCB0b2tlbnNbMF1bM10pXG4gIH1cblxuICB1bmV4cGVjdGVkQ2xvc2UgKHRva2VuKSB7XG4gICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcignVW5leHBlY3RlZCB9JywgdG9rZW5bMl0sIHRva2VuWzNdKVxuICB9XG5cbiAgdW5jbG9zZWRCbG9jayAoKSB7XG4gICAgbGV0IHBvcyA9IHRoaXMuY3VycmVudC5zb3VyY2Uuc3RhcnRcbiAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKCdVbmNsb3NlZCBibG9jaycsIHBvcy5saW5lLCBwb3MuY29sdW1uKVxuICB9XG5cbiAgZG91YmxlQ29sb24gKHRva2VuKSB7XG4gICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcignRG91YmxlIGNvbG9uJywgdG9rZW5bMl0sIHRva2VuWzNdKVxuICB9XG5cbiAgdW5uYW1lZEF0cnVsZSAobm9kZSwgdG9rZW4pIHtcbiAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKCdBdC1ydWxlIHdpdGhvdXQgbmFtZScsIHRva2VuWzJdLCB0b2tlblszXSlcbiAgfVxuXG4gIHByZWNoZWNrTWlzc2VkU2VtaWNvbG9uICgvKiB0b2tlbnMgKi8pIHtcbiAgICAvLyBIb29rIGZvciBTYWZlIFBhcnNlclxuICB9XG5cbiAgY2hlY2tNaXNzZWRTZW1pY29sb24gKHRva2Vucykge1xuICAgIGxldCBjb2xvbiA9IHRoaXMuY29sb24odG9rZW5zKVxuICAgIGlmIChjb2xvbiA9PT0gZmFsc2UpIHJldHVyblxuXG4gICAgbGV0IGZvdW5kZWQgPSAwXG4gICAgbGV0IHRva2VuXG4gICAgZm9yIChsZXQgaiA9IGNvbG9uIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2pdXG4gICAgICBpZiAodG9rZW5bMF0gIT09ICdzcGFjZScpIHtcbiAgICAgICAgZm91bmRlZCArPSAxXG4gICAgICAgIGlmIChmb3VuZGVkID09PSAyKSBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKCdNaXNzZWQgc2VtaWNvbG9uJywgdG9rZW5bMl0sIHRva2VuWzNdKVxuICB9XG59XG4iXSwiZmlsZSI6InBhcnNlci5qcyJ9


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/postcss.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/postcss.js ***!
  \**************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _declaration = _interopRequireDefault(__webpack_require__(/*! ./declaration */ "./node_modules/@linaria/server/node_modules/postcss/lib/declaration.js"));

var _processor = _interopRequireDefault(__webpack_require__(/*! ./processor */ "./node_modules/@linaria/server/node_modules/postcss/lib/processor.js"));

var _stringify = _interopRequireDefault(__webpack_require__(/*! ./stringify */ "./node_modules/@linaria/server/node_modules/postcss/lib/stringify.js"));

var _comment = _interopRequireDefault(__webpack_require__(/*! ./comment */ "./node_modules/@linaria/server/node_modules/postcss/lib/comment.js"));

var _atRule = _interopRequireDefault(__webpack_require__(/*! ./at-rule */ "./node_modules/@linaria/server/node_modules/postcss/lib/at-rule.js"));

var _vendor = _interopRequireDefault(__webpack_require__(/*! ./vendor */ "./node_modules/@linaria/server/node_modules/postcss/lib/vendor.js"));

var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse */ "./node_modules/@linaria/server/node_modules/postcss/lib/parse.js"));

var _list = _interopRequireDefault(__webpack_require__(/*! ./list */ "./node_modules/@linaria/server/node_modules/postcss/lib/list.js"));

var _rule = _interopRequireDefault(__webpack_require__(/*! ./rule */ "./node_modules/@linaria/server/node_modules/postcss/lib/rule.js"));

var _root = _interopRequireDefault(__webpack_require__(/*! ./root */ "./node_modules/@linaria/server/node_modules/postcss/lib/root.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new {@link Processor} instance that will apply `plugins`
 * as CSS processors.
 *
 * @param {Array.<Plugin|pluginFunction>|Processor} plugins PostCSS plugins.
 *        See {@link Processor#use} for plugin format.
 *
 * @return {Processor} Processor to process multiple CSS.
 *
 * @example
 * import postcss from 'postcss'
 *
 * postcss(plugins).process(css, { from, to }).then(result => {
 *   console.log(result.css)
 * })
 *
 * @namespace postcss
 */
function postcss() {
  for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins[_key] = arguments[_key];
  }

  if (plugins.length === 1 && Array.isArray(plugins[0])) {
    plugins = plugins[0];
  }

  return new _processor.default(plugins);
}
/**
 * Creates a PostCSS plugin with a standard API.
 *
 * The newly-wrapped function will provide both the name and PostCSS
 * version of the plugin.
 *
 * ```js
 * const processor = postcss([replace])
 * processor.plugins[0].postcssPlugin  //=> 'postcss-replace'
 * processor.plugins[0].postcssVersion //=> '6.0.0'
 * ```
 *
 * The plugin function receives 2 arguments: {@link Root}
 * and {@link Result} instance. The function should mutate the provided
 * `Root` node. Alternatively, you can create a new `Root` node
 * and override the `result.root` property.
 *
 * ```js
 * const cleaner = postcss.plugin('postcss-cleaner', () => {
 *   return (root, result) => {
 *     result.root = postcss.root()
 *   }
 * })
 * ```
 *
 * As a convenience, plugins also expose a `process` method so that you can use
 * them as standalone tools.
 *
 * ```js
 * cleaner.process(css, processOpts, pluginOpts)
 * // This is equivalent to:
 * postcss([ cleaner(pluginOpts) ]).process(css, processOpts)
 * ```
 *
 * Asynchronous plugins should return a `Promise` instance.
 *
 * ```js
 * postcss.plugin('postcss-import', () => {
 *   return (root, result) => {
 *     return new Promise( (resolve, reject) => {
 *       fs.readFile('base.css', (base) => {
 *         root.prepend(base)
 *         resolve()
 *       })
 *     })
 *   }
 * })
 * ```
 *
 * Add warnings using the {@link Node#warn} method.
 * Send data to other plugins using the {@link Result#messages} array.
 *
 * ```js
 * postcss.plugin('postcss-caniuse-test', () => {
 *   return (root, result) => {
 *     root.walkDecls(decl => {
 *       if (!caniuse.support(decl.prop)) {
 *         decl.warn(result, 'Some browsers do not support ' + decl.prop)
 *       }
 *     })
 *   }
 * })
 * ```
 *
 * @param {string} name          PostCSS plugin name. Same as in `name`
 *                               property in `package.json`. It will be saved
 *                               in `plugin.postcssPlugin` property.
 * @param {function} initializer Will receive plugin options
 *                               and should return {@link pluginFunction}
 *
 * @return {Plugin} PostCSS plugin.
 */


postcss.plugin = function plugin(name, initializer) {
  function creator() {
    var transformer = initializer.apply(void 0, arguments);
    transformer.postcssPlugin = name;
    transformer.postcssVersion = new _processor.default().version;
    return transformer;
  }

  var cache;
  Object.defineProperty(creator, 'postcss', {
    get: function get() {
      if (!cache) cache = creator();
      return cache;
    }
  });

  creator.process = function (css, processOpts, pluginOpts) {
    return postcss([creator(pluginOpts)]).process(css, processOpts);
  };

  return creator;
};
/**
 * Default function to convert a node tree into a CSS string.
 *
 * @param {Node} node       Start node for stringifing. Usually {@link Root}.
 * @param {builder} builder Function to concatenate CSS from node’s parts
 *                          or generate string and source map.
 *
 * @return {void}
 *
 * @function
 */


postcss.stringify = _stringify.default;
/**
 * Parses source css and returns a new {@link Root} node,
 * which contains the source CSS nodes.
 *
 * @param {string|toString} css   String with input CSS or any object
 *                                with toString() method, like a Buffer
 * @param {processOptions} [opts] Options with only `from` and `map` keys.
 *
 * @return {Root} PostCSS AST.
 *
 * @example
 * // Simple CSS concatenation with source map support
 * const root1 = postcss.parse(css1, { from: file1 })
 * const root2 = postcss.parse(css2, { from: file2 })
 * root1.append(root2).toResult().css
 *
 * @function
 */

postcss.parse = _parse.default;
/**
 * Contains the {@link vendor} module.
 *
 * @type {vendor}
 *
 * @example
 * postcss.vendor.unprefixed('-moz-tab') //=> ['tab']
 */

postcss.vendor = _vendor.default;
/**
 * Contains the {@link list} module.
 *
 * @member {list}
 *
 * @example
 * postcss.list.space('5px calc(10% + 5px)') //=> ['5px', 'calc(10% + 5px)']
 */

postcss.list = _list.default;
/**
 * Creates a new {@link Comment} node.
 *
 * @param {object} [defaults] Properties for the new node.
 *
 * @return {Comment} New comment node
 *
 * @example
 * postcss.comment({ text: 'test' })
 */

postcss.comment = function (defaults) {
  return new _comment.default(defaults);
};
/**
 * Creates a new {@link AtRule} node.
 *
 * @param {object} [defaults] Properties for the new node.
 *
 * @return {AtRule} new at-rule node
 *
 * @example
 * postcss.atRule({ name: 'charset' }).toString() //=> "@charset"
 */


postcss.atRule = function (defaults) {
  return new _atRule.default(defaults);
};
/**
 * Creates a new {@link Declaration} node.
 *
 * @param {object} [defaults] Properties for the new node.
 *
 * @return {Declaration} new declaration node
 *
 * @example
 * postcss.decl({ prop: 'color', value: 'red' }).toString() //=> "color: red"
 */


postcss.decl = function (defaults) {
  return new _declaration.default(defaults);
};
/**
 * Creates a new {@link Rule} node.
 *
 * @param {object} [defaults] Properties for the new node.
 *
 * @return {Rule} new rule node
 *
 * @example
 * postcss.rule({ selector: 'a' }).toString() //=> "a {\n}"
 */


postcss.rule = function (defaults) {
  return new _rule.default(defaults);
};
/**
 * Creates a new {@link Root} node.
 *
 * @param {object} [defaults] Properties for the new node.
 *
 * @return {Root} new root node.
 *
 * @example
 * postcss.root({ after: '\n' }).toString() //=> "\n"
 */


postcss.root = function (defaults) {
  return new _root.default(defaults);
};

var _default = postcss;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvc3Rjc3MuZXM2Il0sIm5hbWVzIjpbInBvc3Rjc3MiLCJwbHVnaW5zIiwibGVuZ3RoIiwiQXJyYXkiLCJpc0FycmF5IiwiUHJvY2Vzc29yIiwicGx1Z2luIiwibmFtZSIsImluaXRpYWxpemVyIiwiY3JlYXRvciIsInRyYW5zZm9ybWVyIiwicG9zdGNzc1BsdWdpbiIsInBvc3Rjc3NWZXJzaW9uIiwidmVyc2lvbiIsImNhY2hlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJwcm9jZXNzIiwiY3NzIiwicHJvY2Vzc09wdHMiLCJwbHVnaW5PcHRzIiwic3RyaW5naWZ5IiwicGFyc2UiLCJ2ZW5kb3IiLCJsaXN0IiwiY29tbWVudCIsImRlZmF1bHRzIiwiQ29tbWVudCIsImF0UnVsZSIsIkF0UnVsZSIsImRlY2wiLCJEZWNsYXJhdGlvbiIsInJ1bGUiLCJSdWxlIiwicm9vdCIsIlJvb3QiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBLFNBQVNBLE9BQVQsR0FBOEI7QUFBQSxvQ0FBVEMsT0FBUztBQUFUQSxJQUFBQSxPQUFTO0FBQUE7O0FBQzVCLE1BQUlBLE9BQU8sQ0FBQ0MsTUFBUixLQUFtQixDQUFuQixJQUF3QkMsS0FBSyxDQUFDQyxPQUFOLENBQWNILE9BQU8sQ0FBQyxDQUFELENBQXJCLENBQTVCLEVBQXVEO0FBQ3JEQSxJQUFBQSxPQUFPLEdBQUdBLE9BQU8sQ0FBQyxDQUFELENBQWpCO0FBQ0Q7O0FBQ0QsU0FBTyxJQUFJSSxrQkFBSixDQUFjSixPQUFkLENBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdFQUQsT0FBTyxDQUFDTSxNQUFSLEdBQWlCLFNBQVNBLE1BQVQsQ0FBaUJDLElBQWpCLEVBQXVCQyxXQUF2QixFQUFvQztBQUNuRCxXQUFTQyxPQUFULEdBQTJCO0FBQ3pCLFFBQUlDLFdBQVcsR0FBR0YsV0FBVyxNQUFYLG1CQUFsQjtBQUNBRSxJQUFBQSxXQUFXLENBQUNDLGFBQVosR0FBNEJKLElBQTVCO0FBQ0FHLElBQUFBLFdBQVcsQ0FBQ0UsY0FBWixHQUE4QixJQUFJUCxrQkFBSixFQUFELENBQWtCUSxPQUEvQztBQUNBLFdBQU9ILFdBQVA7QUFDRDs7QUFFRCxNQUFJSSxLQUFKO0FBQ0FDLEVBQUFBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQlAsT0FBdEIsRUFBK0IsU0FBL0IsRUFBMEM7QUFDeENRLElBQUFBLEdBRHdDLGlCQUNqQztBQUNMLFVBQUksQ0FBQ0gsS0FBTCxFQUFZQSxLQUFLLEdBQUdMLE9BQU8sRUFBZjtBQUNaLGFBQU9LLEtBQVA7QUFDRDtBQUp1QyxHQUExQzs7QUFPQUwsRUFBQUEsT0FBTyxDQUFDUyxPQUFSLEdBQWtCLFVBQVVDLEdBQVYsRUFBZUMsV0FBZixFQUE0QkMsVUFBNUIsRUFBd0M7QUFDeEQsV0FBT3JCLE9BQU8sQ0FBQyxDQUFDUyxPQUFPLENBQUNZLFVBQUQsQ0FBUixDQUFELENBQVAsQ0FBK0JILE9BQS9CLENBQXVDQyxHQUF2QyxFQUE0Q0MsV0FBNUMsQ0FBUDtBQUNELEdBRkQ7O0FBSUEsU0FBT1gsT0FBUDtBQUNELENBckJEO0FBdUJBOzs7Ozs7Ozs7Ozs7O0FBV0FULE9BQU8sQ0FBQ3NCLFNBQVIsR0FBb0JBLGtCQUFwQjtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBdEIsT0FBTyxDQUFDdUIsS0FBUixHQUFnQkEsY0FBaEI7QUFFQTs7Ozs7Ozs7O0FBUUF2QixPQUFPLENBQUN3QixNQUFSLEdBQWlCQSxlQUFqQjtBQUVBOzs7Ozs7Ozs7QUFRQXhCLE9BQU8sQ0FBQ3lCLElBQVIsR0FBZUEsYUFBZjtBQUVBOzs7Ozs7Ozs7OztBQVVBekIsT0FBTyxDQUFDMEIsT0FBUixHQUFrQixVQUFBQyxRQUFRO0FBQUEsU0FBSSxJQUFJQyxnQkFBSixDQUFZRCxRQUFaLENBQUo7QUFBQSxDQUExQjtBQUVBOzs7Ozs7Ozs7Ozs7QUFVQTNCLE9BQU8sQ0FBQzZCLE1BQVIsR0FBaUIsVUFBQUYsUUFBUTtBQUFBLFNBQUksSUFBSUcsZUFBSixDQUFXSCxRQUFYLENBQUo7QUFBQSxDQUF6QjtBQUVBOzs7Ozs7Ozs7Ozs7QUFVQTNCLE9BQU8sQ0FBQytCLElBQVIsR0FBZSxVQUFBSixRQUFRO0FBQUEsU0FBSSxJQUFJSyxvQkFBSixDQUFnQkwsUUFBaEIsQ0FBSjtBQUFBLENBQXZCO0FBRUE7Ozs7Ozs7Ozs7OztBQVVBM0IsT0FBTyxDQUFDaUMsSUFBUixHQUFlLFVBQUFOLFFBQVE7QUFBQSxTQUFJLElBQUlPLGFBQUosQ0FBU1AsUUFBVCxDQUFKO0FBQUEsQ0FBdkI7QUFFQTs7Ozs7Ozs7Ozs7O0FBVUEzQixPQUFPLENBQUNtQyxJQUFSLEdBQWUsVUFBQVIsUUFBUTtBQUFBLFNBQUksSUFBSVMsYUFBSixDQUFTVCxRQUFULENBQUo7QUFBQSxDQUF2Qjs7ZUFFZTNCLE8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGVjbGFyYXRpb24gZnJvbSAnLi9kZWNsYXJhdGlvbidcbmltcG9ydCBQcm9jZXNzb3IgZnJvbSAnLi9wcm9jZXNzb3InXG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5J1xuaW1wb3J0IENvbW1lbnQgZnJvbSAnLi9jb21tZW50J1xuaW1wb3J0IEF0UnVsZSBmcm9tICcuL2F0LXJ1bGUnXG5pbXBvcnQgdmVuZG9yIGZyb20gJy4vdmVuZG9yJ1xuaW1wb3J0IHBhcnNlIGZyb20gJy4vcGFyc2UnXG5pbXBvcnQgbGlzdCBmcm9tICcuL2xpc3QnXG5pbXBvcnQgUnVsZSBmcm9tICcuL3J1bGUnXG5pbXBvcnQgUm9vdCBmcm9tICcuL3Jvb3QnXG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IHtAbGluayBQcm9jZXNzb3J9IGluc3RhbmNlIHRoYXQgd2lsbCBhcHBseSBgcGx1Z2luc2BcbiAqIGFzIENTUyBwcm9jZXNzb3JzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPFBsdWdpbnxwbHVnaW5GdW5jdGlvbj58UHJvY2Vzc29yfSBwbHVnaW5zIFBvc3RDU1MgcGx1Z2lucy5cbiAqICAgICAgICBTZWUge0BsaW5rIFByb2Nlc3NvciN1c2V9IGZvciBwbHVnaW4gZm9ybWF0LlxuICpcbiAqIEByZXR1cm4ge1Byb2Nlc3Nvcn0gUHJvY2Vzc29yIHRvIHByb2Nlc3MgbXVsdGlwbGUgQ1NTLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgcG9zdGNzcyBmcm9tICdwb3N0Y3NzJ1xuICpcbiAqIHBvc3Rjc3MocGx1Z2lucykucHJvY2Vzcyhjc3MsIHsgZnJvbSwgdG8gfSkudGhlbihyZXN1bHQgPT4ge1xuICogICBjb25zb2xlLmxvZyhyZXN1bHQuY3NzKVxuICogfSlcbiAqXG4gKiBAbmFtZXNwYWNlIHBvc3Rjc3NcbiAqL1xuZnVuY3Rpb24gcG9zdGNzcyAoLi4ucGx1Z2lucykge1xuICBpZiAocGx1Z2lucy5sZW5ndGggPT09IDEgJiYgQXJyYXkuaXNBcnJheShwbHVnaW5zWzBdKSkge1xuICAgIHBsdWdpbnMgPSBwbHVnaW5zWzBdXG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9jZXNzb3IocGx1Z2lucylcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgUG9zdENTUyBwbHVnaW4gd2l0aCBhIHN0YW5kYXJkIEFQSS5cbiAqXG4gKiBUaGUgbmV3bHktd3JhcHBlZCBmdW5jdGlvbiB3aWxsIHByb3ZpZGUgYm90aCB0aGUgbmFtZSBhbmQgUG9zdENTU1xuICogdmVyc2lvbiBvZiB0aGUgcGx1Z2luLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBwcm9jZXNzb3IgPSBwb3N0Y3NzKFtyZXBsYWNlXSlcbiAqIHByb2Nlc3Nvci5wbHVnaW5zWzBdLnBvc3Rjc3NQbHVnaW4gIC8vPT4gJ3Bvc3Rjc3MtcmVwbGFjZSdcbiAqIHByb2Nlc3Nvci5wbHVnaW5zWzBdLnBvc3Rjc3NWZXJzaW9uIC8vPT4gJzYuMC4wJ1xuICogYGBgXG4gKlxuICogVGhlIHBsdWdpbiBmdW5jdGlvbiByZWNlaXZlcyAyIGFyZ3VtZW50czoge0BsaW5rIFJvb3R9XG4gKiBhbmQge0BsaW5rIFJlc3VsdH0gaW5zdGFuY2UuIFRoZSBmdW5jdGlvbiBzaG91bGQgbXV0YXRlIHRoZSBwcm92aWRlZFxuICogYFJvb3RgIG5vZGUuIEFsdGVybmF0aXZlbHksIHlvdSBjYW4gY3JlYXRlIGEgbmV3IGBSb290YCBub2RlXG4gKiBhbmQgb3ZlcnJpZGUgdGhlIGByZXN1bHQucm9vdGAgcHJvcGVydHkuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IGNsZWFuZXIgPSBwb3N0Y3NzLnBsdWdpbigncG9zdGNzcy1jbGVhbmVyJywgKCkgPT4ge1xuICogICByZXR1cm4gKHJvb3QsIHJlc3VsdCkgPT4ge1xuICogICAgIHJlc3VsdC5yb290ID0gcG9zdGNzcy5yb290KClcbiAqICAgfVxuICogfSlcbiAqIGBgYFxuICpcbiAqIEFzIGEgY29udmVuaWVuY2UsIHBsdWdpbnMgYWxzbyBleHBvc2UgYSBgcHJvY2Vzc2AgbWV0aG9kIHNvIHRoYXQgeW91IGNhbiB1c2VcbiAqIHRoZW0gYXMgc3RhbmRhbG9uZSB0b29scy5cbiAqXG4gKiBgYGBqc1xuICogY2xlYW5lci5wcm9jZXNzKGNzcywgcHJvY2Vzc09wdHMsIHBsdWdpbk9wdHMpXG4gKiAvLyBUaGlzIGlzIGVxdWl2YWxlbnQgdG86XG4gKiBwb3N0Y3NzKFsgY2xlYW5lcihwbHVnaW5PcHRzKSBdKS5wcm9jZXNzKGNzcywgcHJvY2Vzc09wdHMpXG4gKiBgYGBcbiAqXG4gKiBBc3luY2hyb25vdXMgcGx1Z2lucyBzaG91bGQgcmV0dXJuIGEgYFByb21pc2VgIGluc3RhbmNlLlxuICpcbiAqIGBgYGpzXG4gKiBwb3N0Y3NzLnBsdWdpbigncG9zdGNzcy1pbXBvcnQnLCAoKSA9PiB7XG4gKiAgIHJldHVybiAocm9vdCwgcmVzdWx0KSA9PiB7XG4gKiAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gKiAgICAgICBmcy5yZWFkRmlsZSgnYmFzZS5jc3MnLCAoYmFzZSkgPT4ge1xuICogICAgICAgICByb290LnByZXBlbmQoYmFzZSlcbiAqICAgICAgICAgcmVzb2x2ZSgpXG4gKiAgICAgICB9KVxuICogICAgIH0pXG4gKiAgIH1cbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBBZGQgd2FybmluZ3MgdXNpbmcgdGhlIHtAbGluayBOb2RlI3dhcm59IG1ldGhvZC5cbiAqIFNlbmQgZGF0YSB0byBvdGhlciBwbHVnaW5zIHVzaW5nIHRoZSB7QGxpbmsgUmVzdWx0I21lc3NhZ2VzfSBhcnJheS5cbiAqXG4gKiBgYGBqc1xuICogcG9zdGNzcy5wbHVnaW4oJ3Bvc3Rjc3MtY2FuaXVzZS10ZXN0JywgKCkgPT4ge1xuICogICByZXR1cm4gKHJvb3QsIHJlc3VsdCkgPT4ge1xuICogICAgIHJvb3Qud2Fsa0RlY2xzKGRlY2wgPT4ge1xuICogICAgICAgaWYgKCFjYW5pdXNlLnN1cHBvcnQoZGVjbC5wcm9wKSkge1xuICogICAgICAgICBkZWNsLndhcm4ocmVzdWx0LCAnU29tZSBicm93c2VycyBkbyBub3Qgc3VwcG9ydCAnICsgZGVjbC5wcm9wKVxuICogICAgICAgfVxuICogICAgIH0pXG4gKiAgIH1cbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAgICAgICAgICBQb3N0Q1NTIHBsdWdpbiBuYW1lLiBTYW1lIGFzIGluIGBuYW1lYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkgaW4gYHBhY2thZ2UuanNvbmAuIEl0IHdpbGwgYmUgc2F2ZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIGBwbHVnaW4ucG9zdGNzc1BsdWdpbmAgcHJvcGVydHkuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBpbml0aWFsaXplciBXaWxsIHJlY2VpdmUgcGx1Z2luIG9wdGlvbnNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBzaG91bGQgcmV0dXJuIHtAbGluayBwbHVnaW5GdW5jdGlvbn1cbiAqXG4gKiBAcmV0dXJuIHtQbHVnaW59IFBvc3RDU1MgcGx1Z2luLlxuICovXG5wb3N0Y3NzLnBsdWdpbiA9IGZ1bmN0aW9uIHBsdWdpbiAobmFtZSwgaW5pdGlhbGl6ZXIpIHtcbiAgZnVuY3Rpb24gY3JlYXRvciAoLi4uYXJncykge1xuICAgIGxldCB0cmFuc2Zvcm1lciA9IGluaXRpYWxpemVyKC4uLmFyZ3MpXG4gICAgdHJhbnNmb3JtZXIucG9zdGNzc1BsdWdpbiA9IG5hbWVcbiAgICB0cmFuc2Zvcm1lci5wb3N0Y3NzVmVyc2lvbiA9IChuZXcgUHJvY2Vzc29yKCkpLnZlcnNpb25cbiAgICByZXR1cm4gdHJhbnNmb3JtZXJcbiAgfVxuXG4gIGxldCBjYWNoZVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRvciwgJ3Bvc3Rjc3MnLCB7XG4gICAgZ2V0ICgpIHtcbiAgICAgIGlmICghY2FjaGUpIGNhY2hlID0gY3JlYXRvcigpXG4gICAgICByZXR1cm4gY2FjaGVcbiAgICB9XG4gIH0pXG5cbiAgY3JlYXRvci5wcm9jZXNzID0gZnVuY3Rpb24gKGNzcywgcHJvY2Vzc09wdHMsIHBsdWdpbk9wdHMpIHtcbiAgICByZXR1cm4gcG9zdGNzcyhbY3JlYXRvcihwbHVnaW5PcHRzKV0pLnByb2Nlc3MoY3NzLCBwcm9jZXNzT3B0cylcbiAgfVxuXG4gIHJldHVybiBjcmVhdG9yXG59XG5cbi8qKlxuICogRGVmYXVsdCBmdW5jdGlvbiB0byBjb252ZXJ0IGEgbm9kZSB0cmVlIGludG8gYSBDU1Mgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAgICAgICBTdGFydCBub2RlIGZvciBzdHJpbmdpZmluZy4gVXN1YWxseSB7QGxpbmsgUm9vdH0uXG4gKiBAcGFyYW0ge2J1aWxkZXJ9IGJ1aWxkZXIgRnVuY3Rpb24gdG8gY29uY2F0ZW5hdGUgQ1NTIGZyb20gbm9kZeKAmXMgcGFydHNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBvciBnZW5lcmF0ZSBzdHJpbmcgYW5kIHNvdXJjZSBtYXAuXG4gKlxuICogQHJldHVybiB7dm9pZH1cbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xucG9zdGNzcy5zdHJpbmdpZnkgPSBzdHJpbmdpZnlcblxuLyoqXG4gKiBQYXJzZXMgc291cmNlIGNzcyBhbmQgcmV0dXJucyBhIG5ldyB7QGxpbmsgUm9vdH0gbm9kZSxcbiAqIHdoaWNoIGNvbnRhaW5zIHRoZSBzb3VyY2UgQ1NTIG5vZGVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfHRvU3RyaW5nfSBjc3MgICBTdHJpbmcgd2l0aCBpbnB1dCBDU1Mgb3IgYW55IG9iamVjdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggdG9TdHJpbmcoKSBtZXRob2QsIGxpa2UgYSBCdWZmZXJcbiAqIEBwYXJhbSB7cHJvY2Vzc09wdGlvbnN9IFtvcHRzXSBPcHRpb25zIHdpdGggb25seSBgZnJvbWAgYW5kIGBtYXBgIGtleXMuXG4gKlxuICogQHJldHVybiB7Um9vdH0gUG9zdENTUyBBU1QuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFNpbXBsZSBDU1MgY29uY2F0ZW5hdGlvbiB3aXRoIHNvdXJjZSBtYXAgc3VwcG9ydFxuICogY29uc3Qgcm9vdDEgPSBwb3N0Y3NzLnBhcnNlKGNzczEsIHsgZnJvbTogZmlsZTEgfSlcbiAqIGNvbnN0IHJvb3QyID0gcG9zdGNzcy5wYXJzZShjc3MyLCB7IGZyb206IGZpbGUyIH0pXG4gKiByb290MS5hcHBlbmQocm9vdDIpLnRvUmVzdWx0KCkuY3NzXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbnBvc3Rjc3MucGFyc2UgPSBwYXJzZVxuXG4vKipcbiAqIENvbnRhaW5zIHRoZSB7QGxpbmsgdmVuZG9yfSBtb2R1bGUuXG4gKlxuICogQHR5cGUge3ZlbmRvcn1cbiAqXG4gKiBAZXhhbXBsZVxuICogcG9zdGNzcy52ZW5kb3IudW5wcmVmaXhlZCgnLW1vei10YWInKSAvLz0+IFsndGFiJ11cbiAqL1xucG9zdGNzcy52ZW5kb3IgPSB2ZW5kb3JcblxuLyoqXG4gKiBDb250YWlucyB0aGUge0BsaW5rIGxpc3R9IG1vZHVsZS5cbiAqXG4gKiBAbWVtYmVyIHtsaXN0fVxuICpcbiAqIEBleGFtcGxlXG4gKiBwb3N0Y3NzLmxpc3Quc3BhY2UoJzVweCBjYWxjKDEwJSArIDVweCknKSAvLz0+IFsnNXB4JywgJ2NhbGMoMTAlICsgNXB4KSddXG4gKi9cbnBvc3Rjc3MubGlzdCA9IGxpc3RcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHtAbGluayBDb21tZW50fSBub2RlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVmYXVsdHNdIFByb3BlcnRpZXMgZm9yIHRoZSBuZXcgbm9kZS5cbiAqXG4gKiBAcmV0dXJuIHtDb21tZW50fSBOZXcgY29tbWVudCBub2RlXG4gKlxuICogQGV4YW1wbGVcbiAqIHBvc3Rjc3MuY29tbWVudCh7IHRleHQ6ICd0ZXN0JyB9KVxuICovXG5wb3N0Y3NzLmNvbW1lbnQgPSBkZWZhdWx0cyA9PiBuZXcgQ29tbWVudChkZWZhdWx0cylcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHtAbGluayBBdFJ1bGV9IG5vZGUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IFtkZWZhdWx0c10gUHJvcGVydGllcyBmb3IgdGhlIG5ldyBub2RlLlxuICpcbiAqIEByZXR1cm4ge0F0UnVsZX0gbmV3IGF0LXJ1bGUgbm9kZVxuICpcbiAqIEBleGFtcGxlXG4gKiBwb3N0Y3NzLmF0UnVsZSh7IG5hbWU6ICdjaGFyc2V0JyB9KS50b1N0cmluZygpIC8vPT4gXCJAY2hhcnNldFwiXG4gKi9cbnBvc3Rjc3MuYXRSdWxlID0gZGVmYXVsdHMgPT4gbmV3IEF0UnVsZShkZWZhdWx0cylcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHtAbGluayBEZWNsYXJhdGlvbn0gbm9kZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gW2RlZmF1bHRzXSBQcm9wZXJ0aWVzIGZvciB0aGUgbmV3IG5vZGUuXG4gKlxuICogQHJldHVybiB7RGVjbGFyYXRpb259IG5ldyBkZWNsYXJhdGlvbiBub2RlXG4gKlxuICogQGV4YW1wbGVcbiAqIHBvc3Rjc3MuZGVjbCh7IHByb3A6ICdjb2xvcicsIHZhbHVlOiAncmVkJyB9KS50b1N0cmluZygpIC8vPT4gXCJjb2xvcjogcmVkXCJcbiAqL1xucG9zdGNzcy5kZWNsID0gZGVmYXVsdHMgPT4gbmV3IERlY2xhcmF0aW9uKGRlZmF1bHRzKVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcge0BsaW5rIFJ1bGV9IG5vZGUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IFtkZWZhdWx0c10gUHJvcGVydGllcyBmb3IgdGhlIG5ldyBub2RlLlxuICpcbiAqIEByZXR1cm4ge1J1bGV9IG5ldyBydWxlIG5vZGVcbiAqXG4gKiBAZXhhbXBsZVxuICogcG9zdGNzcy5ydWxlKHsgc2VsZWN0b3I6ICdhJyB9KS50b1N0cmluZygpIC8vPT4gXCJhIHtcXG59XCJcbiAqL1xucG9zdGNzcy5ydWxlID0gZGVmYXVsdHMgPT4gbmV3IFJ1bGUoZGVmYXVsdHMpXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB7QGxpbmsgUm9vdH0gbm9kZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gW2RlZmF1bHRzXSBQcm9wZXJ0aWVzIGZvciB0aGUgbmV3IG5vZGUuXG4gKlxuICogQHJldHVybiB7Um9vdH0gbmV3IHJvb3Qgbm9kZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogcG9zdGNzcy5yb290KHsgYWZ0ZXI6ICdcXG4nIH0pLnRvU3RyaW5nKCkgLy89PiBcIlxcblwiXG4gKi9cbnBvc3Rjc3Mucm9vdCA9IGRlZmF1bHRzID0+IG5ldyBSb290KGRlZmF1bHRzKVxuXG5leHBvcnQgZGVmYXVsdCBwb3N0Y3NzXG4iXSwiZmlsZSI6InBvc3Rjc3MuanMifQ==


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/previous-map.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/previous-map.js ***!
  \*******************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _sourceMap = _interopRequireDefault(__webpack_require__(/*! source-map */ "./node_modules/source-map/source-map.js"));

var _path = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

var _fs = _interopRequireDefault(__webpack_require__(/*! fs */ "fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fromBase64(str) {
  if (Buffer) {
    return Buffer.from(str, 'base64').toString();
  } else {
    return window.atob(str);
  }
}
/**
 * Source map information from input CSS.
 * For example, source map after Sass compiler.
 *
 * This class will automatically find source map in input CSS or in file system
 * near input file (according `from` option).
 *
 * @example
 * const root = postcss.parse(css, { from: 'a.sass.css' })
 * root.input.map //=> PreviousMap
 */


var PreviousMap = /*#__PURE__*/function () {
  /**
   * @param {string}         css    Input CSS source.
   * @param {processOptions} [opts] {@link Processor#process} options.
   */
  function PreviousMap(css, opts) {
    this.loadAnnotation(css);
    /**
     * Was source map inlined by data-uri to input CSS.
     *
     * @type {boolean}
     */

    this.inline = this.startWith(this.annotation, 'data:');
    var prev = opts.map ? opts.map.prev : undefined;
    var text = this.loadMap(opts.from, prev);
    if (text) this.text = text;
  }
  /**
   * Create a instance of `SourceMapGenerator` class
   * from the `source-map` library to work with source map information.
   *
   * It is lazy method, so it will create object only on first call
   * and then it will use cache.
   *
   * @return {SourceMapGenerator} Object with source map information.
   */


  var _proto = PreviousMap.prototype;

  _proto.consumer = function consumer() {
    if (!this.consumerCache) {
      this.consumerCache = new _sourceMap.default.SourceMapConsumer(this.text);
    }

    return this.consumerCache;
  }
  /**
   * Does source map contains `sourcesContent` with input source text.
   *
   * @return {boolean} Is `sourcesContent` present.
   */
  ;

  _proto.withContent = function withContent() {
    return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
  };

  _proto.startWith = function startWith(string, start) {
    if (!string) return false;
    return string.substr(0, start.length) === start;
  };

  _proto.getAnnotationURL = function getAnnotationURL(sourceMapString) {
    return sourceMapString.match(/\/\*\s*# sourceMappingURL=((?:(?!sourceMappingURL=).)*)\*\//)[1].trim();
  };

  _proto.loadAnnotation = function loadAnnotation(css) {
    var annotations = css.match(/\/\*\s*# sourceMappingURL=(?:(?!sourceMappingURL=).)*\*\//gm);

    if (annotations && annotations.length > 0) {
      // Locate the last sourceMappingURL to avoid picking up
      // sourceMappingURLs from comments, strings, etc.
      var lastAnnotation = annotations[annotations.length - 1];

      if (lastAnnotation) {
        this.annotation = this.getAnnotationURL(lastAnnotation);
      }
    }
  };

  _proto.decodeInline = function decodeInline(text) {
    var baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
    var baseUri = /^data:application\/json;base64,/;
    var uri = 'data:application/json,';

    if (this.startWith(text, uri)) {
      return decodeURIComponent(text.substr(uri.length));
    }

    if (baseCharsetUri.test(text) || baseUri.test(text)) {
      return fromBase64(text.substr(RegExp.lastMatch.length));
    }

    var encoding = text.match(/data:application\/json;([^,]+),/)[1];
    throw new Error('Unsupported source map encoding ' + encoding);
  };

  _proto.loadMap = function loadMap(file, prev) {
    if (prev === false) return false;

    if (prev) {
      if (typeof prev === 'string') {
        return prev;
      } else if (typeof prev === 'function') {
        var prevPath = prev(file);

        if (prevPath && _fs.default.existsSync && _fs.default.existsSync(prevPath)) {
          return _fs.default.readFileSync(prevPath, 'utf-8').toString().trim();
        } else {
          throw new Error('Unable to load previous source map: ' + prevPath.toString());
        }
      } else if (prev instanceof _sourceMap.default.SourceMapConsumer) {
        return _sourceMap.default.SourceMapGenerator.fromSourceMap(prev).toString();
      } else if (prev instanceof _sourceMap.default.SourceMapGenerator) {
        return prev.toString();
      } else if (this.isMap(prev)) {
        return JSON.stringify(prev);
      } else {
        throw new Error('Unsupported previous source map format: ' + prev.toString());
      }
    } else if (this.inline) {
      return this.decodeInline(this.annotation);
    } else if (this.annotation) {
      var map = this.annotation;
      if (file) map = _path.default.join(_path.default.dirname(file), map);
      this.root = _path.default.dirname(map);

      if (_fs.default.existsSync && _fs.default.existsSync(map)) {
        return _fs.default.readFileSync(map, 'utf-8').toString().trim();
      } else {
        return false;
      }
    }
  };

  _proto.isMap = function isMap(map) {
    if (typeof map !== 'object') return false;
    return typeof map.mappings === 'string' || typeof map._mappings === 'string';
  };

  return PreviousMap;
}();

var _default = PreviousMap;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpb3VzLW1hcC5lczYiXSwibmFtZXMiOlsiZnJvbUJhc2U2NCIsInN0ciIsIkJ1ZmZlciIsImZyb20iLCJ0b1N0cmluZyIsIndpbmRvdyIsImF0b2IiLCJQcmV2aW91c01hcCIsImNzcyIsIm9wdHMiLCJsb2FkQW5ub3RhdGlvbiIsImlubGluZSIsInN0YXJ0V2l0aCIsImFubm90YXRpb24iLCJwcmV2IiwibWFwIiwidW5kZWZpbmVkIiwidGV4dCIsImxvYWRNYXAiLCJjb25zdW1lciIsImNvbnN1bWVyQ2FjaGUiLCJtb3ppbGxhIiwiU291cmNlTWFwQ29uc3VtZXIiLCJ3aXRoQ29udGVudCIsInNvdXJjZXNDb250ZW50IiwibGVuZ3RoIiwic3RyaW5nIiwic3RhcnQiLCJzdWJzdHIiLCJnZXRBbm5vdGF0aW9uVVJMIiwic291cmNlTWFwU3RyaW5nIiwibWF0Y2giLCJ0cmltIiwiYW5ub3RhdGlvbnMiLCJsYXN0QW5ub3RhdGlvbiIsImRlY29kZUlubGluZSIsImJhc2VDaGFyc2V0VXJpIiwiYmFzZVVyaSIsInVyaSIsImRlY29kZVVSSUNvbXBvbmVudCIsInRlc3QiLCJSZWdFeHAiLCJsYXN0TWF0Y2giLCJlbmNvZGluZyIsIkVycm9yIiwiZmlsZSIsInByZXZQYXRoIiwiZnMiLCJleGlzdHNTeW5jIiwicmVhZEZpbGVTeW5jIiwiU291cmNlTWFwR2VuZXJhdG9yIiwiZnJvbVNvdXJjZU1hcCIsImlzTWFwIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhdGgiLCJqb2luIiwiZGlybmFtZSIsInJvb3QiLCJtYXBwaW5ncyIsIl9tYXBwaW5ncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUVBLFNBQVNBLFVBQVQsQ0FBcUJDLEdBQXJCLEVBQTBCO0FBQ3hCLE1BQUlDLE1BQUosRUFBWTtBQUNWLFdBQU9BLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZRixHQUFaLEVBQWlCLFFBQWpCLEVBQTJCRyxRQUEzQixFQUFQO0FBQ0QsR0FGRCxN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QUFMLENBQWV4QyxJQUFmLENBQVA7QUFDRCxPQUZNLE1BRUE7QUFDTCxjQUFNLElBQUk4QixLQUFKLENBQ0osNkNBQTZDOUIsSUFBSSxDQUFDVixRQUFMLEVBRHpDLENBQU47QUFFRDtBQUNGLEtBckJELE1BcUJPLElBQUksS0FBS08sTUFBVCxFQUFpQjtBQUN0QixhQUFPLEtBQUt3QixZQUFMLENBQWtCLEtBQUt0QixVQUF2QixDQUFQO0FBQ0QsS0FGTSxNQUVBLElBQUksS0FBS0EsVUFBVCxFQUFxQjtBQUMxQixVQUFJRSxHQUFHLEdBQUcsS0FBS0YsVUFBZjtBQUNBLFVBQUlnQyxJQUFKLEVBQVU5QixHQUFHLEdBQUd3QyxjQUFLQyxJQUFMLENBQVVELGNBQUtFLE9BQUwsQ0FBYVosSUFBYixDQUFWLEVBQThCOUIsR0FBOUIsQ0FBTjtBQUVWLFdBQUsyQyxJQUFMLEdBQVlILGNBQUtFLE9BQUwsQ0FBYTFDLEdBQWIsQ0FBWjs7QUFDQSxVQUFJZ0MsWUFBR0MsVUFBSCxJQUFpQkQsWUFBR0MsVUFBSCxDQUFjakMsR0FBZCxDQUFyQixFQUF5QztBQUN2QyxlQUFPZ0MsWUFBR0UsWUFBSCxDQUFnQmxDLEdBQWhCLEVBQXFCLE9BQXJCLEVBQThCWCxRQUE5QixHQUF5QzRCLElBQXpDLEVBQVA7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPLEtBQVA7QUFDRDtBQUNGO0FBQ0YsRzs7U0FFRG9CLEssR0FBQSxlQUFPckMsR0FBUCxFQUFZO0FBQ1YsUUFBSSxPQUFPQSxHQUFQLEtBQWUsUUFBbkIsRUFBNkIsT0FBTyxLQUFQO0FBQzdCLFdBQU8sT0FBT0EsR0FBRyxDQUFDNEMsUUFBWCxLQUF3QixRQUF4QixJQUFvQyxPQUFPNUMsR0FBRyxDQUFDNkMsU0FBWCxLQUF5QixRQUFwRTtBQUNELEc7Ozs7O2VBR1lyRCxXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vemlsbGEgZnJvbSAnc291cmNlLW1hcCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5cbmZ1bmN0aW9uIGZyb21CYXNlNjQgKHN0cikge1xuICBpZiAoQnVmZmVyKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHN0ciwgJ2Jhc2U2NCcpLnRvU3RyaW5nKClcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gd2luZG93LmF0b2Ioc3RyKVxuICB9XG59XG5cbi8qKlxuICogU291cmNlIG1hcCBpbmZvcm1hdGlvbiBmcm9tIGlucHV0IENTUy5cbiAqIEZvciBleGFtcGxlLCBzb3VyY2UgbWFwIGFmdGVyIFNhc3MgY29tcGlsZXIuXG4gKlxuICogVGhpcyBjbGFzcyB3aWxsIGF1dG9tYXRpY2FsbHkgZmluZCBzb3VyY2UgbWFwIGluIGlucHV0IENTUyBvciBpbiBmaWxlIHN5c3RlbVxuICogbmVhciBpbnB1dCBmaWxlIChhY2NvcmRpbmcgYGZyb21gIG9wdGlvbikuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKGNzcywgeyBmcm9tOiAnYS5zYXNzLmNzcycgfSlcbiAqIHJvb3QuaW5wdXQubWFwIC8vPT4gUHJldmlvdXNNYXBcbiAqL1xuY2xhc3MgUHJldmlvdXNNYXAge1xuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgY3NzICAgIElucHV0IENTUyBzb3VyY2UuXG4gICAqIEBwYXJhbSB7cHJvY2Vzc09wdGlvbnN9IFtvcHRzXSB7QGxpbmsgUHJvY2Vzc29yI3Byb2Nlc3N9IG9wdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoY3NzLCBvcHRzKSB7XG4gICAgdGhpcy5sb2FkQW5ub3RhdGlvbihjc3MpXG4gICAgLyoqXG4gICAgICogV2FzIHNvdXJjZSBtYXAgaW5saW5lZCBieSBkYXRhLXVyaSB0byBpbnB1dCBDU1MuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmlubGluZSA9IHRoaXMuc3RhcnRXaXRoKHRoaXMuYW5ub3RhdGlvbiwgJ2RhdGE6JylcblxuICAgIGxldCBwcmV2ID0gb3B0cy5tYXAgPyBvcHRzLm1hcC5wcmV2IDogdW5kZWZpbmVkXG4gICAgbGV0IHRleHQgPSB0aGlzLmxvYWRNYXAob3B0cy5mcm9tLCBwcmV2KVxuICAgIGlmICh0ZXh0KSB0aGlzLnRleHQgPSB0ZXh0XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgaW5zdGFuY2Ugb2YgYFNvdXJjZU1hcEdlbmVyYXRvcmAgY2xhc3NcbiAgICogZnJvbSB0aGUgYHNvdXJjZS1tYXBgIGxpYnJhcnkgdG8gd29yayB3aXRoIHNvdXJjZSBtYXAgaW5mb3JtYXRpb24uXG4gICAqXG4gICAqIEl0IGlzIGxhenkgbWV0aG9kLCBzbyBpdCB3aWxsIGNyZWF0ZSBvYmplY3Qgb25seSBvbiBmaXJzdCBjYWxsXG4gICAqIGFuZCB0aGVuIGl0IHdpbGwgdXNlIGNhY2hlLlxuICAgKlxuICAgKiBAcmV0dXJuIHtTb3VyY2VNYXBHZW5lcmF0b3J9IE9iamVjdCB3aXRoIHNvdXJjZSBtYXAgaW5mb3JtYXRpb24uXG4gICAqL1xuICBjb25zdW1lciAoKSB7XG4gICAgaWYgKCF0aGlzLmNvbnN1bWVyQ2FjaGUpIHtcbiAgICAgIHRoaXMuY29uc3VtZXJDYWNoZSA9IG5ldyBtb3ppbGxhLlNvdXJjZU1hcENvbnN1bWVyKHRoaXMudGV4dClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29uc3VtZXJDYWNoZVxuICB9XG5cbiAgLyoqXG4gICAqIERvZXMgc291cmNlIG1hcCBjb250YWlucyBgc291cmNlc0NvbnRlbnRgIHdpdGggaW5wdXQgc291cmNlIHRleHQuXG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IElzIGBzb3VyY2VzQ29udGVudGAgcHJlc2VudC5cbiAgICovXG4gIHdpdGhDb250ZW50ICgpIHtcbiAgICByZXR1cm4gISEodGhpcy5jb25zdW1lcigpLnNvdXJjZXNDb250ZW50ICYmXG4gICAgICAgICAgICAgIHRoaXMuY29uc3VtZXIoKS5zb3VyY2VzQ29udGVudC5sZW5ndGggPiAwKVxuICB9XG5cbiAgc3RhcnRXaXRoIChzdHJpbmcsIHN0YXJ0KSB7XG4gICAgaWYgKCFzdHJpbmcpIHJldHVybiBmYWxzZVxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RyKDAsIHN0YXJ0Lmxlbmd0aCkgPT09IHN0YXJ0XG4gIH1cblxuICBnZXRBbm5vdGF0aW9uVVJMIChzb3VyY2VNYXBTdHJpbmcpIHtcbiAgICByZXR1cm4gc291cmNlTWFwU3RyaW5nXG4gICAgICAubWF0Y2goL1xcL1xcKlxccyojIHNvdXJjZU1hcHBpbmdVUkw9KCg/Oig/IXNvdXJjZU1hcHBpbmdVUkw9KS4pKilcXCpcXC8vKVsxXVxuICAgICAgLnRyaW0oKVxuICB9XG5cbiAgbG9hZEFubm90YXRpb24gKGNzcykge1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IGNzcy5tYXRjaChcbiAgICAgIC9cXC9cXCpcXHMqIyBzb3VyY2VNYXBwaW5nVVJMPSg/Oig/IXNvdXJjZU1hcHBpbmdVUkw9KS4pKlxcKlxcLy9nbVxuICAgIClcblxuICAgIGlmIChhbm5vdGF0aW9ucyAmJiBhbm5vdGF0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBMb2NhdGUgdGhlIGxhc3Qgc291cmNlTWFwcGluZ1VSTCB0byBhdm9pZCBwaWNraW5nIHVwXG4gICAgICAvLyBzb3VyY2VNYXBwaW5nVVJMcyBmcm9tIGNvbW1lbnRzLCBzdHJpbmdzLCBldGMuXG4gICAgICBsZXQgbGFzdEFubm90YXRpb24gPSBhbm5vdGF0aW9uc1thbm5vdGF0aW9ucy5sZW5ndGggLSAxXVxuICAgICAgaWYgKGxhc3RBbm5vdGF0aW9uKSB7XG4gICAgICAgIHRoaXMuYW5ub3RhdGlvbiA9IHRoaXMuZ2V0QW5ub3RhdGlvblVSTChsYXN0QW5ub3RhdGlvbilcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkZWNvZGVJbmxpbmUgKHRleHQpIHtcbiAgICBsZXQgYmFzZUNoYXJzZXRVcmkgPSAvXmRhdGE6YXBwbGljYXRpb25cXC9qc29uO2NoYXJzZXQ9dXRmLT84O2Jhc2U2NCwvXG4gICAgbGV0IGJhc2VVcmkgPSAvXmRhdGE6YXBwbGljYXRpb25cXC9qc29uO2Jhc2U2NCwvXG4gICAgbGV0IHVyaSA9ICdkYXRhOmFwcGxpY2F0aW9uL2pzb24sJ1xuXG4gICAgaWYgKHRoaXMuc3RhcnRXaXRoKHRleHQsIHVyaSkpIHtcbiAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQodGV4dC5zdWJzdHIodXJpLmxlbmd0aCkpXG4gICAgfVxuXG4gICAgaWYgKGJhc2VDaGFyc2V0VXJpLnRlc3QodGV4dCkgfHwgYmFzZVVyaS50ZXN0KHRleHQpKSB7XG4gICAgICByZXR1cm4gZnJvbUJhc2U2NCh0ZXh0LnN1YnN0cihSZWdFeHAubGFzdE1hdGNoLmxlbmd0aCkpXG4gICAgfVxuXG4gICAgbGV0IGVuY29kaW5nID0gdGV4dC5tYXRjaCgvZGF0YTphcHBsaWNhdGlvblxcL2pzb247KFteLF0rKSwvKVsxXVxuICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgc291cmNlIG1hcCBlbmNvZGluZyAnICsgZW5jb2RpbmcpXG4gIH1cblxuICBsb2FkTWFwIChmaWxlLCBwcmV2KSB7XG4gICAgaWYgKHByZXYgPT09IGZhbHNlKSByZXR1cm4gZmFsc2VcblxuICAgIGlmIChwcmV2KSB7XG4gICAgICBpZiAodHlwZW9mIHByZXYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBwcmV2XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcmV2ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGxldCBwcmV2UGF0aCA9IHByZXYoZmlsZSlcbiAgICAgICAgaWYgKHByZXZQYXRoICYmIGZzLmV4aXN0c1N5bmMgJiYgZnMuZXhpc3RzU3luYyhwcmV2UGF0aCkpIHtcbiAgICAgICAgICByZXR1cm4gZnMucmVhZEZpbGVTeW5jKHByZXZQYXRoLCAndXRmLTgnKS50b1N0cmluZygpLnRyaW0oKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdVbmFibGUgdG8gbG9hZCBwcmV2aW91cyBzb3VyY2UgbWFwOiAnICsgcHJldlBhdGgudG9TdHJpbmcoKSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwcmV2IGluc3RhbmNlb2YgbW96aWxsYS5Tb3VyY2VNYXBDb25zdW1lcikge1xuICAgICAgICByZXR1cm4gbW96aWxsYS5Tb3VyY2VNYXBHZW5lcmF0b3IuZnJvbVNvdXJjZU1hcChwcmV2KS50b1N0cmluZygpXG4gICAgICB9IGVsc2UgaWYgKHByZXYgaW5zdGFuY2VvZiBtb3ppbGxhLlNvdXJjZU1hcEdlbmVyYXRvcikge1xuICAgICAgICByZXR1cm4gcHJldi50b1N0cmluZygpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNNYXAocHJldikpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHByZXYpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1Vuc3VwcG9ydGVkIHByZXZpb3VzIHNvdXJjZSBtYXAgZm9ybWF0OiAnICsgcHJldi50b1N0cmluZygpKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5pbmxpbmUpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlY29kZUlubGluZSh0aGlzLmFubm90YXRpb24pXG4gICAgfSBlbHNlIGlmICh0aGlzLmFubm90YXRpb24pIHtcbiAgICAgIGxldCBtYXAgPSB0aGlzLmFubm90YXRpb25cbiAgICAgIGlmIChmaWxlKSBtYXAgPSBwYXRoLmpvaW4ocGF0aC5kaXJuYW1lKGZpbGUpLCBtYXApXG5cbiAgICAgIHRoaXMucm9vdCA9IHBhdGguZGlybmFtZShtYXApXG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyAmJiBmcy5leGlzdHNTeW5jKG1hcCkpIHtcbiAgICAgICAgcmV0dXJuIGZzLnJlYWRGaWxlU3luYyhtYXAsICd1dGYtOCcpLnRvU3RyaW5nKCkudHJpbSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc01hcCAobWFwKSB7XG4gICAgaWYgKHR5cGVvZiBtYXAgIT09ICdvYmplY3QnKSByZXR1cm4gZmFsc2VcbiAgICByZXR1cm4gdHlwZW9mIG1hcC5tYXBwaW5ncyA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG1hcC5fbWFwcGluZ3MgPT09ICdzdHJpbmcnXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJldmlvdXNNYXBcbiJdLCJmaWxlIjoicHJldmlvdXMtbWFwLmpzIn0=


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/processor.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/processor.js ***!
  \****************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _lazyResult = _interopRequireDefault(__webpack_require__(/*! ./lazy-result */ "./node_modules/@linaria/server/node_modules/postcss/lib/lazy-result.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Contains plugins to process CSS. Create one `Processor` instance,
 * initialize its plugins, and then use that instance on numerous CSS files.
 *
 * @example
 * const processor = postcss([autoprefixer, precss])
 * processor.process(css1).then(result => console.log(result.css))
 * processor.process(css2).then(result => console.log(result.css))
 */
var Processor = /*#__PURE__*/function () {
  /**
   * @param {Array.<Plugin|pluginFunction>|Processor} plugins PostCSS plugins.
   *        See {@link Processor#use} for plugin format.
   */
  function Processor(plugins) {
    if (plugins === void 0) {
      plugins = [];
    }

    /**
     * Current PostCSS version.
     *
     * @type {string}
     *
     * @example
     * if (result.processor.version.split('.')[0] !== '6') {
     *   throw new Error('This plugin works only with PostCSS 6')
     * }
     */
    this.version = '7.0.36';
    /**
     * Plugins added to this processor.
     *
     * @type {pluginFunction[]}
     *
     * @example
     * const processor = postcss([autoprefixer, precss])
     * processor.plugins.length //=> 2
     */

    this.plugins = this.normalize(plugins);
  }
  /**
   * Adds a plugin to be used as a CSS processor.
   *
   * PostCSS plugin can be in 4 formats:
   * * A plugin created by {@link postcss.plugin} method.
   * * A function. PostCSS will pass the function a @{link Root}
   *   as the first argument and current {@link Result} instance
   *   as the second.
   * * An object with a `postcss` method. PostCSS will use that method
   *   as described in #2.
   * * Another {@link Processor} instance. PostCSS will copy plugins
   *   from that instance into this one.
   *
   * Plugins can also be added by passing them as arguments when creating
   * a `postcss` instance (see [`postcss(plugins)`]).
   *
   * Asynchronous plugins should return a `Promise` instance.
   *
   * @param {Plugin|pluginFunction|Processor} plugin PostCSS plugin
   *                                                 or {@link Processor}
   *                                                 with plugins.
   *
   * @example
   * const processor = postcss()
   *   .use(autoprefixer)
   *   .use(precss)
   *
   * @return {Processes} Current processor to make methods chain.
   */


  var _proto = Processor.prototype;

  _proto.use = function use(plugin) {
    this.plugins = this.plugins.concat(this.normalize([plugin]));
    return this;
  }
  /**
   * Parses source CSS and returns a {@link LazyResult} Promise proxy.
   * Because some plugins can be asynchronous it doesn’t make
   * any transformations. Transformations will be applied
   * in the {@link LazyResult} methods.
   *
   * @param {string|toString|Result} css String with input CSS or any object
   *                                     with a `toString()` method,
   *                                     like a Buffer. Optionally, send
   *                                     a {@link Result} instance
   *                                     and the processor will take
   *                                     the {@link Root} from it.
   * @param {processOptions} [opts]      Options.
   *
   * @return {LazyResult} Promise proxy.
   *
   * @example
   * processor.process(css, { from: 'a.css', to: 'a.out.css' })
   *   .then(result => {
   *      console.log(result.css)
   *   })
   */
  ;

  _proto.process = function (_process) {
    function process(_x) {
      return _process.apply(this, arguments);
    }

    process.toString = function () {
      return _process.toString();
    };

    return process;
  }(function (css, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (this.plugins.length === 0 && opts.parser === opts.stringifier) {
      if (true) {
        if (typeof console !== 'undefined' && console.warn) {
          console.warn('You did not set any plugins, parser, or stringifier. ' + 'Right now, PostCSS does nothing. Pick plugins for your case ' + 'on https://www.postcss.parts/ and use them in postcss.config.js.');
        }
      }
    }

    return new _lazyResult.default(this, css, opts);
  });

  _proto.normalize = function normalize(plugins) {
    var normalized = [];

    for (var _iterator = _createForOfIteratorHelperLoose(plugins), _step; !(_step = _iterator()).done;) {
      var i = _step.value;

      if (i.postcss === true) {
        var plugin = i();
        throw new Error('PostCSS plugin ' + plugin.postcssPlugin + ' requires PostCSS 8.\n' + 'Migration guide for end-users:\n' + 'https://github.com/postcss/postcss/wiki/PostCSS-8-for-end-users');
      }

      if (i.postcss) i = i.postcss;

      if (typeof i === 'object' && Array.isArray(i.plugins)) {
        normalized = normalized.concat(i.plugins);
      } else if (typeof i === 'function') {
        normalized.push(i);
      } else if (typeof i === 'object' && (i.parse || i.stringify)) {
        if (true) {
          throw new Error('PostCSS syntaxes cannot be used as plugins. Instead, please use ' + 'one of the syntax/parser/stringifier options as outlined ' + 'in your PostCSS runner documentation.');
        }
      } else if (typeof i === 'object' && i.postcssPlugin) {
        throw new Error('PostCSS plugin ' + i.postcssPlugin + ' requires PostCSS 8.\n' + 'Migration guide for end-users:\n' + 'https://github.com/postcss/postcss/wiki/PostCSS-8-for-end-users');
      } else {
        throw new Error(i + ' is not a PostCSS plugin');
      }
    }

    return normalized;
  };

  return Processor;
}();

var _default = Processor;
/**
 * @callback builder
 * @param {string} part          Part of generated CSS connected to this node.
 * @param {Node}   node          AST node.
 * @param {"start"|"end"} [type] Node’s part type.
 */

/**
 * @callback parser
 *
 * @param {string|toString} css   String with input CSS or any object
 *                                with toString() method, like a Buffer.
 * @param {processOptions} [opts] Options with only `from` and `map` keys.
 *
 * @return {Root} PostCSS AST
 */

/**
 * @callback stringifier
 *
 * @param {Node} node       Start node for stringifing. Usually {@link Root}.
 * @param {builder} builder Function to concatenate CSS from node’s parts
 *                          or generate string and source map.
 *
 * @return {void}
 */

/**
 * @typedef {object} syntax
 * @property {parser} parse          Function to generate AST by string.
 * @property {stringifier} stringify Function to generate string by AST.
 */

/**
 * @typedef {object} toString
 * @property {function} toString
 */

/**
 * @callback pluginFunction
 * @param {Root} root     Parsed input CSS.
 * @param {Result} result Result to set warnings or check other plugins.
 */

/**
 * @typedef {object} Plugin
 * @property {function} postcss PostCSS plugin function.
 */

/**
 * @typedef {object} processOptions
 * @property {string} from             The path of the CSS source file.
 *                                     You should always set `from`,
 *                                     because it is used in source map
 *                                     generation and syntax error messages.
 * @property {string} to               The path where you’ll put the output
 *                                     CSS file. You should always set `to`
 *                                     to generate correct source maps.
 * @property {parser} parser           Function to generate AST by string.
 * @property {stringifier} stringifier Class to generate string by AST.
 * @property {syntax} syntax           Object with `parse` and `stringify`.
 * @property {object} map              Source map options.
 * @property {boolean} map.inline                    Does source map should
 *                                                   be embedded in the output
 *                                                   CSS as a base64-encoded
 *                                                   comment.
 * @property {string|object|false|function} map.prev Source map content
 *                                                   from a previous
 *                                                   processing step
 *                                                   (for example, Sass).
 *                                                   PostCSS will try to find
 *                                                   previous map automatically,
 *                                                   so you could disable it by
 *                                                   `false` value.
 * @property {boolean} map.sourcesContent            Does PostCSS should set
 *                                                   the origin content to map.
 * @property {string|false} map.annotation           Does PostCSS should set
 *                                                   annotation comment to map.
 * @property {string} map.from                       Override `from` in map’s
 *                                                   sources`.
 */

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5lczYiXSwibmFtZXMiOlsiUHJvY2Vzc29yIiwicGx1Z2lucyIsInZlcnNpb24iLCJub3JtYWxpemUiLCJ1c2UiLCJwbHVnaW4iLCJjb25jYXQiLCJwcm9jZXNzIiwiY3NzIiwib3B0cyIsImxlbmd0aCIsInBhcnNlciIsInN0cmluZ2lmaWVyIiwiZW52IiwiTk9ERV9FTlYiLCJjb25zb2xlIiwid2FybiIsIkxhenlSZXN1bHQiLCJub3JtYWxpemVkIiwiaSIsInBvc3Rjc3MiLCJFcnJvciIsInBvc3Rjc3NQbHVnaW4iLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwicGFyc2UiLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7O0lBU01BLFM7QUFDSjs7OztBQUlBLHFCQUFhQyxPQUFiLEVBQTJCO0FBQUEsUUFBZEEsT0FBYztBQUFkQSxNQUFBQSxPQUFjLEdBQUosRUFBSTtBQUFBOztBQUN6Qjs7Ozs7Ozs7OztBQVVBLFNBQUtDLE9BQUwsR0FBZSxRQUFmO0FBQ0E7Ozs7Ozs7Ozs7QUFTQSxTQUFLRCxPQUFMLEdBQWUsS0FBS0UsU0FBTCxDQUFlRixPQUFmLENBQWY7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0E2QkFHLEcsR0FBQSxhQUFLQyxNQUFMLEVBQWE7QUFDWCxTQUFLSixPQUFMLEdBQWUsS0FBS0EsT0FBTCxDQUFhSyxNQUFiLENBQW9CLEtBQUtILFNBQUwsQ0FBZSxDQUFDRSxNQUFELENBQWYsQ0FBcEIsQ0FBZjtBQUNBLFdBQU8sSUFBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXNCQUUsTzs7Ozs7Ozs7OztJQUFBLFVBQVNDLEdBQVQsRUFBY0MsSUFBZCxFQUEwQjtBQUFBLFFBQVpBLElBQVk7QUFBWkEsTUFBQUEsSUFBWSxHQUFMLEVBQUs7QUFBQTs7QUFDeEIsUUFBSSxLQUFLUixPQUFMLENBQWFTLE1BQWIsS0FBd0IsQ0FBeEIsSUFBNkJELElBQUksQ0FBQ0UsTUFBTCxLQUFnQkYsSUFBSSxDQUFDRyxXQUF0RCxFQUFtRTtBQUNqRSxVQUFJTCxPQUFPLENBQUNNLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6QyxZQUFJLE9BQU9DLE9BQVAsS0FBbUIsV0FBbkIsSUFBa0NBLE9BQU8sQ0FBQ0MsSUFBOUMsRUFBb0Q7QUFDbERELFVBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUNFLDBEQUNBLDhEQURBLEdBRUEsa0VBSEY7QUFLRDtBQUNGO0FBQ0Y7O0FBQ0QsV0FBTyxJQUFJQyxtQkFBSixDQUFlLElBQWYsRUFBcUJULEdBQXJCLEVBQTBCQyxJQUExQixDQUFQO0FBQ0QsRzs7U0FFRE4sUyxHQUFBLG1CQUFXRixPQUFYLEVBQW9CO0FBQ2xCLFFBQUlpQixVQUFVLEdBQUcsRUFBakI7O0FBQ0EseURBQWNqQixPQUFkLHdDQUF1QjtBQUFBLFVBQWRrQixDQUFjOztBQUNyQixVQUFJQSxDQUFDLENBQUNDLE9BQUYsS0FBYyxJQUFsQixFQUF3QjtBQUN0QixZQUFJZixNQUFNLEdBQUdjLENBQUMsRUFBZDtBQUNBLGNBQU0sSUFBSUUsS0FBSixDQUNKLG9CQUFvQmhCLE1BQU0sQ0FBQ2lCLGFBQTNCLEdBQTJDLHdCQUEzQyxHQUNBLGtDQURBLEdBRUEsaUVBSEksQ0FBTjtBQUtEOztBQUVELFVBQUlILENBQUMsQ0FBQ0MsT0FBTixFQUFlRCxDQUFDLEdBQUdBLENBQUMsQ0FBQ0MsT0FBTjs7QUFFZixVQUFJLE9BQU9ELENBQVAsS0FBYSxRQUFiLElBQXlCSSxLQUFLLENBQUNDLE9BQU4sQ0FBY0wsQ0FBQyxDQUFDbEIsT0FBaEIsQ0FBN0IsRUFBdUQ7QUFDckRpQixRQUFBQSxVQUFVLEdBQUdBLFVBQVUsQ0FBQ1osTUFBWCxDQUFrQmEsQ0FBQyxDQUFDbEIsT0FBcEIsQ0FBYjtBQUNELE9BRkQsTUFFTyxJQUFJLE9BQU9rQixDQUFQLEtBQWEsVUFBakIsRUFBNkI7QUFDbENELFFBQUFBLFVBQVUsQ0FBQ08sSUFBWCxDQUFnQk4sQ0FBaEI7QUFDRCxPQUZNLE1BRUEsSUFBSSxPQUFPQSxDQUFQLEtBQWEsUUFBYixLQUEwQkEsQ0FBQyxDQUFDTyxLQUFGLElBQVdQLENBQUMsQ0FBQ1EsU0FBdkMsQ0FBSixFQUF1RDtBQUM1RCxZQUFJcEIsT0FBTyxDQUFDTSxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekMsZ0JBQU0sSUFBSU8sS0FBSixDQUNKLHFFQUNBLDJEQURBLEdBRUEsdUNBSEksQ0FBTjtBQUtEO0FBQ0YsT0FSTSxNQVFBLElBQUksT0FBT0YsQ0FBUCxLQUFhLFFBQWIsSUFBeUJBLENBQUMsQ0FBQ0csYUFBL0IsRUFBOEM7QUFDbkQsY0FBTSxJQUFJRCxLQUFKLENBQ0osb0JBQW9CRixDQUFDLENBQUNHLGFBQXRCLEdBQXNDLHdCQUF0QyxHQUNBLGtDQURBLEdBRUEsaUVBSEksQ0FBTjtBQUtELE9BTk0sTUFNQTtBQUNMLGNBQU0sSUFBSUQsS0FBSixDQUFVRixDQUFDLEdBQUcsMEJBQWQsQ0FBTjtBQUNEO0FBQ0Y7O0FBQ0QsV0FBT0QsVUFBUDtBQUNELEc7Ozs7O2VBR1lsQixTO0FBRWY7Ozs7Ozs7QUFPQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7O0FBVUE7Ozs7OztBQU1BOzs7OztBQUtBOzs7Ozs7QUFNQTs7Ozs7QUFLQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMYXp5UmVzdWx0IGZyb20gJy4vbGF6eS1yZXN1bHQnXG5cbi8qKlxuICogQ29udGFpbnMgcGx1Z2lucyB0byBwcm9jZXNzIENTUy4gQ3JlYXRlIG9uZSBgUHJvY2Vzc29yYCBpbnN0YW5jZSxcbiAqIGluaXRpYWxpemUgaXRzIHBsdWdpbnMsIGFuZCB0aGVuIHVzZSB0aGF0IGluc3RhbmNlIG9uIG51bWVyb3VzIENTUyBmaWxlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgcHJvY2Vzc29yID0gcG9zdGNzcyhbYXV0b3ByZWZpeGVyLCBwcmVjc3NdKVxuICogcHJvY2Vzc29yLnByb2Nlc3MoY3NzMSkudGhlbihyZXN1bHQgPT4gY29uc29sZS5sb2cocmVzdWx0LmNzcykpXG4gKiBwcm9jZXNzb3IucHJvY2Vzcyhjc3MyKS50aGVuKHJlc3VsdCA9PiBjb25zb2xlLmxvZyhyZXN1bHQuY3NzKSlcbiAqL1xuY2xhc3MgUHJvY2Vzc29yIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7QXJyYXkuPFBsdWdpbnxwbHVnaW5GdW5jdGlvbj58UHJvY2Vzc29yfSBwbHVnaW5zIFBvc3RDU1MgcGx1Z2lucy5cbiAgICogICAgICAgIFNlZSB7QGxpbmsgUHJvY2Vzc29yI3VzZX0gZm9yIHBsdWdpbiBmb3JtYXQuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocGx1Z2lucyA9IFtdKSB7XG4gICAgLyoqXG4gICAgICogQ3VycmVudCBQb3N0Q1NTIHZlcnNpb24uXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpZiAocmVzdWx0LnByb2Nlc3Nvci52ZXJzaW9uLnNwbGl0KCcuJylbMF0gIT09ICc2Jykge1xuICAgICAqICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHBsdWdpbiB3b3JrcyBvbmx5IHdpdGggUG9zdENTUyA2JylcbiAgICAgKiB9XG4gICAgICovXG4gICAgdGhpcy52ZXJzaW9uID0gJzcuMC4zNidcbiAgICAvKipcbiAgICAgKiBQbHVnaW5zIGFkZGVkIHRvIHRoaXMgcHJvY2Vzc29yLlxuICAgICAqXG4gICAgICogQHR5cGUge3BsdWdpbkZ1bmN0aW9uW119XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IHByb2Nlc3NvciA9IHBvc3Rjc3MoW2F1dG9wcmVmaXhlciwgcHJlY3NzXSlcbiAgICAgKiBwcm9jZXNzb3IucGx1Z2lucy5sZW5ndGggLy89PiAyXG4gICAgICovXG4gICAgdGhpcy5wbHVnaW5zID0gdGhpcy5ub3JtYWxpemUocGx1Z2lucylcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgcGx1Z2luIHRvIGJlIHVzZWQgYXMgYSBDU1MgcHJvY2Vzc29yLlxuICAgKlxuICAgKiBQb3N0Q1NTIHBsdWdpbiBjYW4gYmUgaW4gNCBmb3JtYXRzOlxuICAgKiAqIEEgcGx1Z2luIGNyZWF0ZWQgYnkge0BsaW5rIHBvc3Rjc3MucGx1Z2lufSBtZXRob2QuXG4gICAqICogQSBmdW5jdGlvbi4gUG9zdENTUyB3aWxsIHBhc3MgdGhlIGZ1bmN0aW9uIGEgQHtsaW5rIFJvb3R9XG4gICAqICAgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IGFuZCBjdXJyZW50IHtAbGluayBSZXN1bHR9IGluc3RhbmNlXG4gICAqICAgYXMgdGhlIHNlY29uZC5cbiAgICogKiBBbiBvYmplY3Qgd2l0aCBhIGBwb3N0Y3NzYCBtZXRob2QuIFBvc3RDU1Mgd2lsbCB1c2UgdGhhdCBtZXRob2RcbiAgICogICBhcyBkZXNjcmliZWQgaW4gIzIuXG4gICAqICogQW5vdGhlciB7QGxpbmsgUHJvY2Vzc29yfSBpbnN0YW5jZS4gUG9zdENTUyB3aWxsIGNvcHkgcGx1Z2luc1xuICAgKiAgIGZyb20gdGhhdCBpbnN0YW5jZSBpbnRvIHRoaXMgb25lLlxuICAgKlxuICAgKiBQbHVnaW5zIGNhbiBhbHNvIGJlIGFkZGVkIGJ5IHBhc3NpbmcgdGhlbSBhcyBhcmd1bWVudHMgd2hlbiBjcmVhdGluZ1xuICAgKiBhIGBwb3N0Y3NzYCBpbnN0YW5jZSAoc2VlIFtgcG9zdGNzcyhwbHVnaW5zKWBdKS5cbiAgICpcbiAgICogQXN5bmNocm9ub3VzIHBsdWdpbnMgc2hvdWxkIHJldHVybiBhIGBQcm9taXNlYCBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtQbHVnaW58cGx1Z2luRnVuY3Rpb258UHJvY2Vzc29yfSBwbHVnaW4gUG9zdENTUyBwbHVnaW5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3Ige0BsaW5rIFByb2Nlc3Nvcn1cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCBwbHVnaW5zLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBwcm9jZXNzb3IgPSBwb3N0Y3NzKClcbiAgICogICAudXNlKGF1dG9wcmVmaXhlcilcbiAgICogICAudXNlKHByZWNzcylcbiAgICpcbiAgICogQHJldHVybiB7UHJvY2Vzc2VzfSBDdXJyZW50IHByb2Nlc3NvciB0byBtYWtlIG1ldGhvZHMgY2hhaW4uXG4gICAqL1xuICB1c2UgKHBsdWdpbikge1xuICAgIHRoaXMucGx1Z2lucyA9IHRoaXMucGx1Z2lucy5jb25jYXQodGhpcy5ub3JtYWxpemUoW3BsdWdpbl0pKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIHNvdXJjZSBDU1MgYW5kIHJldHVybnMgYSB7QGxpbmsgTGF6eVJlc3VsdH0gUHJvbWlzZSBwcm94eS5cbiAgICogQmVjYXVzZSBzb21lIHBsdWdpbnMgY2FuIGJlIGFzeW5jaHJvbm91cyBpdCBkb2VzbuKAmXQgbWFrZVxuICAgKiBhbnkgdHJhbnNmb3JtYXRpb25zLiBUcmFuc2Zvcm1hdGlvbnMgd2lsbCBiZSBhcHBsaWVkXG4gICAqIGluIHRoZSB7QGxpbmsgTGF6eVJlc3VsdH0gbWV0aG9kcy5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd8dG9TdHJpbmd8UmVzdWx0fSBjc3MgU3RyaW5nIHdpdGggaW5wdXQgQ1NTIG9yIGFueSBvYmplY3RcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCBhIGB0b1N0cmluZygpYCBtZXRob2QsXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpa2UgYSBCdWZmZXIuIE9wdGlvbmFsbHksIHNlbmRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSB7QGxpbmsgUmVzdWx0fSBpbnN0YW5jZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgdGhlIHByb2Nlc3NvciB3aWxsIHRha2VcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHtAbGluayBSb290fSBmcm9tIGl0LlxuICAgKiBAcGFyYW0ge3Byb2Nlc3NPcHRpb25zfSBbb3B0c10gICAgICBPcHRpb25zLlxuICAgKlxuICAgKiBAcmV0dXJuIHtMYXp5UmVzdWx0fSBQcm9taXNlIHByb3h5LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBwcm9jZXNzb3IucHJvY2Vzcyhjc3MsIHsgZnJvbTogJ2EuY3NzJywgdG86ICdhLm91dC5jc3MnIH0pXG4gICAqICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICogICAgICBjb25zb2xlLmxvZyhyZXN1bHQuY3NzKVxuICAgKiAgIH0pXG4gICAqL1xuICBwcm9jZXNzIChjc3MsIG9wdHMgPSB7IH0pIHtcbiAgICBpZiAodGhpcy5wbHVnaW5zLmxlbmd0aCA9PT0gMCAmJiBvcHRzLnBhcnNlciA9PT0gb3B0cy5zdHJpbmdpZmllcikge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAnWW91IGRpZCBub3Qgc2V0IGFueSBwbHVnaW5zLCBwYXJzZXIsIG9yIHN0cmluZ2lmaWVyLiAnICtcbiAgICAgICAgICAgICdSaWdodCBub3csIFBvc3RDU1MgZG9lcyBub3RoaW5nLiBQaWNrIHBsdWdpbnMgZm9yIHlvdXIgY2FzZSAnICtcbiAgICAgICAgICAgICdvbiBodHRwczovL3d3dy5wb3N0Y3NzLnBhcnRzLyBhbmQgdXNlIHRoZW0gaW4gcG9zdGNzcy5jb25maWcuanMuJ1xuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IExhenlSZXN1bHQodGhpcywgY3NzLCBvcHRzKVxuICB9XG5cbiAgbm9ybWFsaXplIChwbHVnaW5zKSB7XG4gICAgbGV0IG5vcm1hbGl6ZWQgPSBbXVxuICAgIGZvciAobGV0IGkgb2YgcGx1Z2lucykge1xuICAgICAgaWYgKGkucG9zdGNzcyA9PT0gdHJ1ZSkge1xuICAgICAgICBsZXQgcGx1Z2luID0gaSgpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnUG9zdENTUyBwbHVnaW4gJyArIHBsdWdpbi5wb3N0Y3NzUGx1Z2luICsgJyByZXF1aXJlcyBQb3N0Q1NTIDguXFxuJyArXG4gICAgICAgICAgJ01pZ3JhdGlvbiBndWlkZSBmb3IgZW5kLXVzZXJzOlxcbicgK1xuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vcG9zdGNzcy9wb3N0Y3NzL3dpa2kvUG9zdENTUy04LWZvci1lbmQtdXNlcnMnXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKGkucG9zdGNzcykgaSA9IGkucG9zdGNzc1xuXG4gICAgICBpZiAodHlwZW9mIGkgPT09ICdvYmplY3QnICYmIEFycmF5LmlzQXJyYXkoaS5wbHVnaW5zKSkge1xuICAgICAgICBub3JtYWxpemVkID0gbm9ybWFsaXplZC5jb25jYXQoaS5wbHVnaW5zKVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBub3JtYWxpemVkLnB1c2goaSlcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGkgPT09ICdvYmplY3QnICYmIChpLnBhcnNlIHx8IGkuc3RyaW5naWZ5KSkge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdQb3N0Q1NTIHN5bnRheGVzIGNhbm5vdCBiZSB1c2VkIGFzIHBsdWdpbnMuIEluc3RlYWQsIHBsZWFzZSB1c2UgJyArXG4gICAgICAgICAgICAnb25lIG9mIHRoZSBzeW50YXgvcGFyc2VyL3N0cmluZ2lmaWVyIG9wdGlvbnMgYXMgb3V0bGluZWQgJyArXG4gICAgICAgICAgICAnaW4geW91ciBQb3N0Q1NTIHJ1bm5lciBkb2N1bWVudGF0aW9uLidcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGkgPT09ICdvYmplY3QnICYmIGkucG9zdGNzc1BsdWdpbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1Bvc3RDU1MgcGx1Z2luICcgKyBpLnBvc3Rjc3NQbHVnaW4gKyAnIHJlcXVpcmVzIFBvc3RDU1MgOC5cXG4nICtcbiAgICAgICAgICAnTWlncmF0aW9uIGd1aWRlIGZvciBlbmQtdXNlcnM6XFxuJyArXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9wb3N0Y3NzL3Bvc3Rjc3Mvd2lraS9Qb3N0Q1NTLTgtZm9yLWVuZC11c2VycydcbiAgICAgICAgKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGkgKyAnIGlzIG5vdCBhIFBvc3RDU1MgcGx1Z2luJylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9jZXNzb3JcblxuLyoqXG4gKiBAY2FsbGJhY2sgYnVpbGRlclxuICogQHBhcmFtIHtzdHJpbmd9IHBhcnQgICAgICAgICAgUGFydCBvZiBnZW5lcmF0ZWQgQ1NTIGNvbm5lY3RlZCB0byB0aGlzIG5vZGUuXG4gKiBAcGFyYW0ge05vZGV9ICAgbm9kZSAgICAgICAgICBBU1Qgbm9kZS5cbiAqIEBwYXJhbSB7XCJzdGFydFwifFwiZW5kXCJ9IFt0eXBlXSBOb2Rl4oCZcyBwYXJ0IHR5cGUuXG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgcGFyc2VyXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8dG9TdHJpbmd9IGNzcyAgIFN0cmluZyB3aXRoIGlucHV0IENTUyBvciBhbnkgb2JqZWN0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCB0b1N0cmluZygpIG1ldGhvZCwgbGlrZSBhIEJ1ZmZlci5cbiAqIEBwYXJhbSB7cHJvY2Vzc09wdGlvbnN9IFtvcHRzXSBPcHRpb25zIHdpdGggb25seSBgZnJvbWAgYW5kIGBtYXBgIGtleXMuXG4gKlxuICogQHJldHVybiB7Um9vdH0gUG9zdENTUyBBU1RcbiAqL1xuXG4vKipcbiAqIEBjYWxsYmFjayBzdHJpbmdpZmllclxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAgICAgICBTdGFydCBub2RlIGZvciBzdHJpbmdpZmluZy4gVXN1YWxseSB7QGxpbmsgUm9vdH0uXG4gKiBAcGFyYW0ge2J1aWxkZXJ9IGJ1aWxkZXIgRnVuY3Rpb24gdG8gY29uY2F0ZW5hdGUgQ1NTIGZyb20gbm9kZeKAmXMgcGFydHNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBvciBnZW5lcmF0ZSBzdHJpbmcgYW5kIHNvdXJjZSBtYXAuXG4gKlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IHN5bnRheFxuICogQHByb3BlcnR5IHtwYXJzZXJ9IHBhcnNlICAgICAgICAgIEZ1bmN0aW9uIHRvIGdlbmVyYXRlIEFTVCBieSBzdHJpbmcuXG4gKiBAcHJvcGVydHkge3N0cmluZ2lmaWVyfSBzdHJpbmdpZnkgRnVuY3Rpb24gdG8gZ2VuZXJhdGUgc3RyaW5nIGJ5IEFTVC5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IHRvU3RyaW5nXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9ufSB0b1N0cmluZ1xuICovXG5cbi8qKlxuICogQGNhbGxiYWNrIHBsdWdpbkZ1bmN0aW9uXG4gKiBAcGFyYW0ge1Jvb3R9IHJvb3QgICAgIFBhcnNlZCBpbnB1dCBDU1MuXG4gKiBAcGFyYW0ge1Jlc3VsdH0gcmVzdWx0IFJlc3VsdCB0byBzZXQgd2FybmluZ3Mgb3IgY2hlY2sgb3RoZXIgcGx1Z2lucy5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IFBsdWdpblxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gcG9zdGNzcyBQb3N0Q1NTIHBsdWdpbiBmdW5jdGlvbi5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IHByb2Nlc3NPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZnJvbSAgICAgICAgICAgICBUaGUgcGF0aCBvZiB0aGUgQ1NTIHNvdXJjZSBmaWxlLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91IHNob3VsZCBhbHdheXMgc2V0IGBmcm9tYCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlY2F1c2UgaXQgaXMgdXNlZCBpbiBzb3VyY2UgbWFwXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0aW9uIGFuZCBzeW50YXggZXJyb3IgbWVzc2FnZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdG8gICAgICAgICAgICAgICBUaGUgcGF0aCB3aGVyZSB5b3XigJlsbCBwdXQgdGhlIG91dHB1dFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ1NTIGZpbGUuIFlvdSBzaG91bGQgYWx3YXlzIHNldCBgdG9gXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byBnZW5lcmF0ZSBjb3JyZWN0IHNvdXJjZSBtYXBzLlxuICogQHByb3BlcnR5IHtwYXJzZXJ9IHBhcnNlciAgICAgICAgICAgRnVuY3Rpb24gdG8gZ2VuZXJhdGUgQVNUIGJ5IHN0cmluZy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5naWZpZXJ9IHN0cmluZ2lmaWVyIENsYXNzIHRvIGdlbmVyYXRlIHN0cmluZyBieSBBU1QuXG4gKiBAcHJvcGVydHkge3N5bnRheH0gc3ludGF4ICAgICAgICAgICBPYmplY3Qgd2l0aCBgcGFyc2VgIGFuZCBgc3RyaW5naWZ5YC5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBtYXAgICAgICAgICAgICAgIFNvdXJjZSBtYXAgb3B0aW9ucy5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gbWFwLmlubGluZSAgICAgICAgICAgICAgICAgICAgRG9lcyBzb3VyY2UgbWFwIHNob3VsZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZSBlbWJlZGRlZCBpbiB0aGUgb3V0cHV0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENTUyBhcyBhIGJhc2U2NC1lbmNvZGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ3xvYmplY3R8ZmFsc2V8ZnVuY3Rpb259IG1hcC5wcmV2IFNvdXJjZSBtYXAgY29udGVudFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIGEgcHJldmlvdXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2luZyBzdGVwXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmb3IgZXhhbXBsZSwgU2FzcykuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBvc3RDU1Mgd2lsbCB0cnkgdG8gZmluZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyBtYXAgYXV0b21hdGljYWxseSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc28geW91IGNvdWxkIGRpc2FibGUgaXQgYnlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGZhbHNlYCB2YWx1ZS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gbWFwLnNvdXJjZXNDb250ZW50ICAgICAgICAgICAgRG9lcyBQb3N0Q1NTIHNob3VsZCBzZXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIG9yaWdpbiBjb250ZW50IHRvIG1hcC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfGZhbHNlfSBtYXAuYW5ub3RhdGlvbiAgICAgICAgICAgRG9lcyBQb3N0Q1NTIHNob3VsZCBzZXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbiBjb21tZW50IHRvIG1hcC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtYXAuZnJvbSAgICAgICAgICAgICAgICAgICAgICAgT3ZlcnJpZGUgYGZyb21gIGluIG1hcOKAmXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlc2AuXG4gKi9cbiJdLCJmaWxlIjoicHJvY2Vzc29yLmpzIn0=


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/result.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/result.js ***!
  \*************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _warning = _interopRequireDefault(__webpack_require__(/*! ./warning */ "./node_modules/@linaria/server/node_modules/postcss/lib/warning.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Provides the result of the PostCSS transformations.
 *
 * A Result instance is returned by {@link LazyResult#then}
 * or {@link Root#toResult} methods.
 *
 * @example
 * postcss([autoprefixer]).process(css).then(result => {
 *  console.log(result.css)
 * })
 *
 * @example
 * const result2 = postcss.parse(css).toResult()
 */
var Result = /*#__PURE__*/function () {
  /**
   * @param {Processor} processor Processor used for this transformation.
   * @param {Root}      root      Root node after all transformations.
   * @param {processOptions} opts Options from the {@link Processor#process}
   *                              or {@link Root#toResult}.
   */
  function Result(processor, root, opts) {
    /**
     * The Processor instance used for this transformation.
     *
     * @type {Processor}
     *
     * @example
     * for (const plugin of result.processor.plugins) {
     *   if (plugin.postcssPlugin === 'postcss-bad') {
     *     throw 'postcss-good is incompatible with postcss-bad'
     *   }
     * })
     */
    this.processor = processor;
    /**
     * Contains messages from plugins (e.g., warnings or custom messages).
     * Each message should have type and plugin properties.
     *
     * @type {Message[]}
     *
     * @example
     * postcss.plugin('postcss-min-browser', () => {
     *   return (root, result) => {
     *     const browsers = detectMinBrowsersByCanIUse(root)
     *     result.messages.push({
     *       type: 'min-browser',
     *       plugin: 'postcss-min-browser',
     *       browsers
     *     })
     *   }
     * })
     */

    this.messages = [];
    /**
     * Root node after all transformations.
     *
     * @type {Root}
     *
     * @example
     * root.toResult().root === root
     */

    this.root = root;
    /**
     * Options from the {@link Processor#process} or {@link Root#toResult} call
     * that produced this Result instance.
     *
     * @type {processOptions}
     *
     * @example
     * root.toResult(opts).opts === opts
     */

    this.opts = opts;
    /**
     * A CSS string representing of {@link Result#root}.
     *
     * @type {string}
     *
     * @example
     * postcss.parse('a{}').toResult().css //=> "a{}"
     */

    this.css = undefined;
    /**
     * An instance of `SourceMapGenerator` class from the `source-map` library,
     * representing changes to the {@link Result#root} instance.
     *
     * @type {SourceMapGenerator}
     *
     * @example
     * result.map.toJSON() //=> { version: 3, file: 'a.css', … }
     *
     * @example
     * if (result.map) {
     *   fs.writeFileSync(result.opts.to + '.map', result.map.toString())
     * }
     */

    this.map = undefined;
  }
  /**
   * Returns for @{link Result#css} content.
   *
   * @example
   * result + '' === result.css
   *
   * @return {string} String representing of {@link Result#root}.
   */


  var _proto = Result.prototype;

  _proto.toString = function toString() {
    return this.css;
  }
  /**
   * Creates an instance of {@link Warning} and adds it
   * to {@link Result#messages}.
   *
   * @param {string} text        Warning message.
   * @param {Object} [opts]      Warning options.
   * @param {Node}   opts.node   CSS node that caused the warning.
   * @param {string} opts.word   Word in CSS source that caused the warning.
   * @param {number} opts.index  Index in CSS node string that caused
   *                             the warning.
   * @param {string} opts.plugin Name of the plugin that created
   *                             this warning. {@link Result#warn} fills
   *                             this property automatically.
   *
   * @return {Warning} Created warning.
   */
  ;

  _proto.warn = function warn(text, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (!opts.plugin) {
      if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
        opts.plugin = this.lastPlugin.postcssPlugin;
      }
    }

    var warning = new _warning.default(text, opts);
    this.messages.push(warning);
    return warning;
  }
  /**
     * Returns warnings from plugins. Filters {@link Warning} instances
     * from {@link Result#messages}.
     *
     * @example
     * result.warnings().forEach(warn => {
     *   console.warn(warn.toString())
     * })
     *
     * @return {Warning[]} Warnings from plugins.
     */
  ;

  _proto.warnings = function warnings() {
    return this.messages.filter(function (i) {
      return i.type === 'warning';
    });
  }
  /**
   * An alias for the {@link Result#css} property.
   * Use it with syntaxes that generate non-CSS output.
   *
   * @type {string}
   *
   * @example
   * result.css === result.content
   */
  ;

  _createClass(Result, [{
    key: "content",
    get: function get() {
      return this.css;
    }
  }]);

  return Result;
}();

var _default = Result;
/**
 * @typedef  {object} Message
 * @property {string} type   Message type.
 * @property {string} plugin Source PostCSS plugin name.
 */

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC5lczYiXSwibmFtZXMiOlsiUmVzdWx0IiwicHJvY2Vzc29yIiwicm9vdCIsIm9wdHMiLCJtZXNzYWdlcyIsImNzcyIsInVuZGVmaW5lZCIsIm1hcCIsInRvU3RyaW5nIiwid2FybiIsInRleHQiLCJwbHVnaW4iLCJsYXN0UGx1Z2luIiwicG9zdGNzc1BsdWdpbiIsIndhcm5pbmciLCJXYXJuaW5nIiwicHVzaCIsIndhcm5pbmdzIiwiZmlsdGVyIiwiaSIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0lBY01BLE07QUFDSjs7Ozs7O0FBTUEsa0JBQWFDLFNBQWIsRUFBd0JDLElBQXhCLEVBQThCQyxJQUE5QixFQUFvQztBQUNsQzs7Ozs7Ozs7Ozs7O0FBWUEsU0FBS0YsU0FBTCxHQUFpQkEsU0FBakI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxTQUFLRyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0E7Ozs7Ozs7OztBQVFBLFNBQUtGLElBQUwsR0FBWUEsSUFBWjtBQUNBOzs7Ozs7Ozs7O0FBU0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0E7Ozs7Ozs7OztBQVFBLFNBQUtFLEdBQUwsR0FBV0MsU0FBWDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUFjQSxTQUFLQyxHQUFMLEdBQVdELFNBQVg7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7U0FRQUUsUSxHQUFBLG9CQUFZO0FBQ1YsV0FBTyxLQUFLSCxHQUFaO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBZ0JBSSxJLEdBQUEsY0FBTUMsSUFBTixFQUFZUCxJQUFaLEVBQXdCO0FBQUEsUUFBWkEsSUFBWTtBQUFaQSxNQUFBQSxJQUFZLEdBQUwsRUFBSztBQUFBOztBQUN0QixRQUFJLENBQUNBLElBQUksQ0FBQ1EsTUFBVixFQUFrQjtBQUNoQixVQUFJLEtBQUtDLFVBQUwsSUFBbUIsS0FBS0EsVUFBTCxDQUFnQkMsYUFBdkMsRUFBc0Q7QUFDcERWLFFBQUFBLElBQUksQ0FBQ1EsTUFBTCxHQUFjLEtBQUtDLFVBQUwsQ0FBZ0JDLGFBQTlCO0FBQ0Q7QUFDRjs7QUFFRCxRQUFJQyxPQUFPLEdBQUcsSUFBSUMsZ0JBQUosQ0FBWUwsSUFBWixFQUFrQlAsSUFBbEIsQ0FBZDtBQUNBLFNBQUtDLFFBQUwsQ0FBY1ksSUFBZCxDQUFtQkYsT0FBbkI7QUFFQSxXQUFPQSxPQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7OztTQVdBRyxRLEdBQUEsb0JBQVk7QUFDVixXQUFPLEtBQUtiLFFBQUwsQ0FBY2MsTUFBZCxDQUFxQixVQUFBQyxDQUFDO0FBQUEsYUFBSUEsQ0FBQyxDQUFDQyxJQUFGLEtBQVcsU0FBZjtBQUFBLEtBQXRCLENBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7O3dCQVNlO0FBQ2IsYUFBTyxLQUFLZixHQUFaO0FBQ0Q7Ozs7OztlQUdZTCxNO0FBRWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2FybmluZyBmcm9tICcuL3dhcm5pbmcnXG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIHJlc3VsdCBvZiB0aGUgUG9zdENTUyB0cmFuc2Zvcm1hdGlvbnMuXG4gKlxuICogQSBSZXN1bHQgaW5zdGFuY2UgaXMgcmV0dXJuZWQgYnkge0BsaW5rIExhenlSZXN1bHQjdGhlbn1cbiAqIG9yIHtAbGluayBSb290I3RvUmVzdWx0fSBtZXRob2RzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBwb3N0Y3NzKFthdXRvcHJlZml4ZXJdKS5wcm9jZXNzKGNzcykudGhlbihyZXN1bHQgPT4ge1xuICogIGNvbnNvbGUubG9nKHJlc3VsdC5jc3MpXG4gKiB9KVxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByZXN1bHQyID0gcG9zdGNzcy5wYXJzZShjc3MpLnRvUmVzdWx0KClcbiAqL1xuY2xhc3MgUmVzdWx0IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7UHJvY2Vzc29yfSBwcm9jZXNzb3IgUHJvY2Vzc29yIHVzZWQgZm9yIHRoaXMgdHJhbnNmb3JtYXRpb24uXG4gICAqIEBwYXJhbSB7Um9vdH0gICAgICByb290ICAgICAgUm9vdCBub2RlIGFmdGVyIGFsbCB0cmFuc2Zvcm1hdGlvbnMuXG4gICAqIEBwYXJhbSB7cHJvY2Vzc09wdGlvbnN9IG9wdHMgT3B0aW9ucyBmcm9tIHRoZSB7QGxpbmsgUHJvY2Vzc29yI3Byb2Nlc3N9XG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3Ige0BsaW5rIFJvb3QjdG9SZXN1bHR9LlxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb2Nlc3Nvciwgcm9vdCwgb3B0cykge1xuICAgIC8qKlxuICAgICAqIFRoZSBQcm9jZXNzb3IgaW5zdGFuY2UgdXNlZCBmb3IgdGhpcyB0cmFuc2Zvcm1hdGlvbi5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtQcm9jZXNzb3J9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGZvciAoY29uc3QgcGx1Z2luIG9mIHJlc3VsdC5wcm9jZXNzb3IucGx1Z2lucykge1xuICAgICAqICAgaWYgKHBsdWdpbi5wb3N0Y3NzUGx1Z2luID09PSAncG9zdGNzcy1iYWQnKSB7XG4gICAgICogICAgIHRocm93ICdwb3N0Y3NzLWdvb2QgaXMgaW5jb21wYXRpYmxlIHdpdGggcG9zdGNzcy1iYWQnXG4gICAgICogICB9XG4gICAgICogfSlcbiAgICAgKi9cbiAgICB0aGlzLnByb2Nlc3NvciA9IHByb2Nlc3NvclxuICAgIC8qKlxuICAgICAqIENvbnRhaW5zIG1lc3NhZ2VzIGZyb20gcGx1Z2lucyAoZS5nLiwgd2FybmluZ3Mgb3IgY3VzdG9tIG1lc3NhZ2VzKS5cbiAgICAgKiBFYWNoIG1lc3NhZ2Ugc2hvdWxkIGhhdmUgdHlwZSBhbmQgcGx1Z2luIHByb3BlcnRpZXMuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7TWVzc2FnZVtdfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBwb3N0Y3NzLnBsdWdpbigncG9zdGNzcy1taW4tYnJvd3NlcicsICgpID0+IHtcbiAgICAgKiAgIHJldHVybiAocm9vdCwgcmVzdWx0KSA9PiB7XG4gICAgICogICAgIGNvbnN0IGJyb3dzZXJzID0gZGV0ZWN0TWluQnJvd3NlcnNCeUNhbklVc2Uocm9vdClcbiAgICAgKiAgICAgcmVzdWx0Lm1lc3NhZ2VzLnB1c2goe1xuICAgICAqICAgICAgIHR5cGU6ICdtaW4tYnJvd3NlcicsXG4gICAgICogICAgICAgcGx1Z2luOiAncG9zdGNzcy1taW4tYnJvd3NlcicsXG4gICAgICogICAgICAgYnJvd3NlcnNcbiAgICAgKiAgICAgfSlcbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqL1xuICAgIHRoaXMubWVzc2FnZXMgPSBbXVxuICAgIC8qKlxuICAgICAqIFJvb3Qgbm9kZSBhZnRlciBhbGwgdHJhbnNmb3JtYXRpb25zLlxuICAgICAqXG4gICAgICogQHR5cGUge1Jvb3R9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHJvb3QudG9SZXN1bHQoKS5yb290ID09PSByb290XG4gICAgICovXG4gICAgdGhpcy5yb290ID0gcm9vdFxuICAgIC8qKlxuICAgICAqIE9wdGlvbnMgZnJvbSB0aGUge0BsaW5rIFByb2Nlc3NvciNwcm9jZXNzfSBvciB7QGxpbmsgUm9vdCN0b1Jlc3VsdH0gY2FsbFxuICAgICAqIHRoYXQgcHJvZHVjZWQgdGhpcyBSZXN1bHQgaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7cHJvY2Vzc09wdGlvbnN9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHJvb3QudG9SZXN1bHQob3B0cykub3B0cyA9PT0gb3B0c1xuICAgICAqL1xuICAgIHRoaXMub3B0cyA9IG9wdHNcbiAgICAvKipcbiAgICAgKiBBIENTUyBzdHJpbmcgcmVwcmVzZW50aW5nIG9mIHtAbGluayBSZXN1bHQjcm9vdH0uXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBwb3N0Y3NzLnBhcnNlKCdhe30nKS50b1Jlc3VsdCgpLmNzcyAvLz0+IFwiYXt9XCJcbiAgICAgKi9cbiAgICB0aGlzLmNzcyA9IHVuZGVmaW5lZFxuICAgIC8qKlxuICAgICAqIEFuIGluc3RhbmNlIG9mIGBTb3VyY2VNYXBHZW5lcmF0b3JgIGNsYXNzIGZyb20gdGhlIGBzb3VyY2UtbWFwYCBsaWJyYXJ5LFxuICAgICAqIHJlcHJlc2VudGluZyBjaGFuZ2VzIHRvIHRoZSB7QGxpbmsgUmVzdWx0I3Jvb3R9IGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHR5cGUge1NvdXJjZU1hcEdlbmVyYXRvcn1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogcmVzdWx0Lm1hcC50b0pTT04oKSAvLz0+IHsgdmVyc2lvbjogMywgZmlsZTogJ2EuY3NzJywg4oCmIH1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogaWYgKHJlc3VsdC5tYXApIHtcbiAgICAgKiAgIGZzLndyaXRlRmlsZVN5bmMocmVzdWx0Lm9wdHMudG8gKyAnLm1hcCcsIHJlc3VsdC5tYXAudG9TdHJpbmcoKSlcbiAgICAgKiB9XG4gICAgICovXG4gICAgdGhpcy5tYXAgPSB1bmRlZmluZWRcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGZvciBAe2xpbmsgUmVzdWx0I2Nzc30gY29udGVudC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcmVzdWx0ICsgJycgPT09IHJlc3VsdC5jc3NcbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nfSBTdHJpbmcgcmVwcmVzZW50aW5nIG9mIHtAbGluayBSZXN1bHQjcm9vdH0uXG4gICAqL1xuICB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3NzXG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB7QGxpbmsgV2FybmluZ30gYW5kIGFkZHMgaXRcbiAgICogdG8ge0BsaW5rIFJlc3VsdCNtZXNzYWdlc30uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0ICAgICAgICBXYXJuaW5nIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0c10gICAgICBXYXJuaW5nIG9wdGlvbnMuXG4gICAqIEBwYXJhbSB7Tm9kZX0gICBvcHRzLm5vZGUgICBDU1Mgbm9kZSB0aGF0IGNhdXNlZCB0aGUgd2FybmluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMud29yZCAgIFdvcmQgaW4gQ1NTIHNvdXJjZSB0aGF0IGNhdXNlZCB0aGUgd2FybmluZy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdHMuaW5kZXggIEluZGV4IGluIENTUyBub2RlIHN0cmluZyB0aGF0IGNhdXNlZFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHdhcm5pbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLnBsdWdpbiBOYW1lIG9mIHRoZSBwbHVnaW4gdGhhdCBjcmVhdGVkXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIHdhcm5pbmcuIHtAbGluayBSZXN1bHQjd2Fybn0gZmlsbHNcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgcHJvcGVydHkgYXV0b21hdGljYWxseS5cbiAgICpcbiAgICogQHJldHVybiB7V2FybmluZ30gQ3JlYXRlZCB3YXJuaW5nLlxuICAgKi9cbiAgd2FybiAodGV4dCwgb3B0cyA9IHsgfSkge1xuICAgIGlmICghb3B0cy5wbHVnaW4pIHtcbiAgICAgIGlmICh0aGlzLmxhc3RQbHVnaW4gJiYgdGhpcy5sYXN0UGx1Z2luLnBvc3Rjc3NQbHVnaW4pIHtcbiAgICAgICAgb3B0cy5wbHVnaW4gPSB0aGlzLmxhc3RQbHVnaW4ucG9zdGNzc1BsdWdpblxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCB3YXJuaW5nID0gbmV3IFdhcm5pbmcodGV4dCwgb3B0cylcbiAgICB0aGlzLm1lc3NhZ2VzLnB1c2god2FybmluZylcblxuICAgIHJldHVybiB3YXJuaW5nXG4gIH1cblxuICAvKipcbiAgICAgKiBSZXR1cm5zIHdhcm5pbmdzIGZyb20gcGx1Z2lucy4gRmlsdGVycyB7QGxpbmsgV2FybmluZ30gaW5zdGFuY2VzXG4gICAgICogZnJvbSB7QGxpbmsgUmVzdWx0I21lc3NhZ2VzfS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogcmVzdWx0Lndhcm5pbmdzKCkuZm9yRWFjaCh3YXJuID0+IHtcbiAgICAgKiAgIGNvbnNvbGUud2Fybih3YXJuLnRvU3RyaW5nKCkpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1dhcm5pbmdbXX0gV2FybmluZ3MgZnJvbSBwbHVnaW5zLlxuICAgICAqL1xuICB3YXJuaW5ncyAoKSB7XG4gICAgcmV0dXJuIHRoaXMubWVzc2FnZXMuZmlsdGVyKGkgPT4gaS50eXBlID09PSAnd2FybmluZycpXG4gIH1cblxuICAvKipcbiAgICogQW4gYWxpYXMgZm9yIHRoZSB7QGxpbmsgUmVzdWx0I2Nzc30gcHJvcGVydHkuXG4gICAqIFVzZSBpdCB3aXRoIHN5bnRheGVzIHRoYXQgZ2VuZXJhdGUgbm9uLUNTUyBvdXRwdXQuXG4gICAqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHJlc3VsdC5jc3MgPT09IHJlc3VsdC5jb250ZW50XG4gICAqL1xuICBnZXQgY29udGVudCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3NzXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVzdWx0XG5cbi8qKlxuICogQHR5cGVkZWYgIHtvYmplY3R9IE1lc3NhZ2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0eXBlICAgTWVzc2FnZSB0eXBlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBsdWdpbiBTb3VyY2UgUG9zdENTUyBwbHVnaW4gbmFtZS5cbiAqL1xuIl0sImZpbGUiOiJyZXN1bHQuanMifQ==


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/root.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/root.js ***!
  \***********************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _container = _interopRequireDefault(__webpack_require__(/*! ./container */ "./node_modules/@linaria/server/node_modules/postcss/lib/container.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Represents a CSS file and contains all its parsed nodes.
 *
 * @extends Container
 *
 * @example
 * const root = postcss.parse('a{color:black} b{z-index:2}')
 * root.type         //=> 'root'
 * root.nodes.length //=> 2
 */
var Root = /*#__PURE__*/function (_Container) {
  _inheritsLoose(Root, _Container);

  function Root(defaults) {
    var _this;

    _this = _Container.call(this, defaults) || this;
    _this.type = 'root';
    if (!_this.nodes) _this.nodes = [];
    return _this;
  }

  var _proto = Root.prototype;

  _proto.removeChild = function removeChild(child, ignore) {
    var index = this.index(child);

    if (!ignore && index === 0 && this.nodes.length > 1) {
      this.nodes[1].raws.before = this.nodes[index].raws.before;
    }

    return _Container.prototype.removeChild.call(this, child);
  };

  _proto.normalize = function normalize(child, sample, type) {
    var nodes = _Container.prototype.normalize.call(this, child);

    if (sample) {
      if (type === 'prepend') {
        if (this.nodes.length > 1) {
          sample.raws.before = this.nodes[1].raws.before;
        } else {
          delete sample.raws.before;
        }
      } else if (this.first !== sample) {
        for (var _iterator = _createForOfIteratorHelperLoose(nodes), _step; !(_step = _iterator()).done;) {
          var node = _step.value;
          node.raws.before = sample.raws.before;
        }
      }
    }

    return nodes;
  }
  /**
   * Returns a {@link Result} instance representing the root’s CSS.
   *
   * @param {processOptions} [opts] Options with only `to` and `map` keys.
   *
   * @return {Result} Result with current root’s CSS.
   *
   * @example
   * const root1 = postcss.parse(css1, { from: 'a.css' })
   * const root2 = postcss.parse(css2, { from: 'b.css' })
   * root1.append(root2)
   * const result = root1.toResult({ to: 'all.css', map: true })
   */
  ;

  _proto.toResult = function toResult(opts) {
    if (opts === void 0) {
      opts = {};
    }

    var LazyResult = __webpack_require__(/*! ./lazy-result */ "./node_modules/@linaria/server/node_modules/postcss/lib/lazy-result.js");

    var Processor = __webpack_require__(/*! ./processor */ "./node_modules/@linaria/server/node_modules/postcss/lib/processor.js");

    var lazy = new LazyResult(new Processor(), this, opts);
    return lazy.stringify();
  }
  /**
   * @memberof Root#
   * @member {object} raws Information to generate byte-to-byte equal
   *                       node string as it was in the origin input.
   *
   * Every parser saves its own properties,
   * but the default CSS parser uses:
   *
   * * `after`: the space symbols after the last child to the end of file.
   * * `semicolon`: is the last child has an (optional) semicolon.
   *
   * @example
   * postcss.parse('a {}\n').raws //=> { after: '\n' }
   * postcss.parse('a {}').raws   //=> { after: '' }
   */
  ;

  return Root;
}(_container.default);

var _default = Root;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvb3QuZXM2Il0sIm5hbWVzIjpbIlJvb3QiLCJkZWZhdWx0cyIsInR5cGUiLCJub2RlcyIsInJlbW92ZUNoaWxkIiwiY2hpbGQiLCJpZ25vcmUiLCJpbmRleCIsImxlbmd0aCIsInJhd3MiLCJiZWZvcmUiLCJub3JtYWxpemUiLCJzYW1wbGUiLCJmaXJzdCIsIm5vZGUiLCJ0b1Jlc3VsdCIsIm9wdHMiLCJMYXp5UmVzdWx0IiwicmVxdWlyZSIsIlByb2Nlc3NvciIsImxhenkiLCJzdHJpbmdpZnkiLCJDb250YWluZXIiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7Ozs7O0lBVU1BLEk7OztBQUNKLGdCQUFhQyxRQUFiLEVBQXVCO0FBQUE7O0FBQ3JCLGtDQUFNQSxRQUFOO0FBQ0EsVUFBS0MsSUFBTCxHQUFZLE1BQVo7QUFDQSxRQUFJLENBQUMsTUFBS0MsS0FBVixFQUFpQixNQUFLQSxLQUFMLEdBQWEsRUFBYjtBQUhJO0FBSXRCOzs7O1NBRURDLFcsR0FBQSxxQkFBYUMsS0FBYixFQUFvQkMsTUFBcEIsRUFBNEI7QUFDMUIsUUFBSUMsS0FBSyxHQUFHLEtBQUtBLEtBQUwsQ0FBV0YsS0FBWCxDQUFaOztBQUVBLFFBQUksQ0FBQ0MsTUFBRCxJQUFXQyxLQUFLLEtBQUssQ0FBckIsSUFBMEIsS0FBS0osS0FBTCxDQUFXSyxNQUFYLEdBQW9CLENBQWxELEVBQXFEO0FBQ25ELFdBQUtMLEtBQUwsQ0FBVyxDQUFYLEVBQWNNLElBQWQsQ0FBbUJDLE1BQW5CLEdBQTRCLEtBQUtQLEtBQUwsQ0FBV0ksS0FBWCxFQUFrQkUsSUFBbEIsQ0FBdUJDLE1BQW5EO0FBQ0Q7O0FBRUQsZ0NBQWFOLFdBQWIsWUFBeUJDLEtBQXpCO0FBQ0QsRzs7U0FFRE0sUyxHQUFBLG1CQUFXTixLQUFYLEVBQWtCTyxNQUFsQixFQUEwQlYsSUFBMUIsRUFBZ0M7QUFDOUIsUUFBSUMsS0FBSyx3QkFBU1EsU0FBVCxZQUFtQk4sS0FBbkIsQ0FBVDs7QUFFQSxRQUFJTyxNQUFKLEVBQVk7QUFDVixVQUFJVixJQUFJLEtBQUssU0FBYixFQUF3QjtBQUN0QixZQUFJLEtBQUtDLEtBQUwsQ0FBV0ssTUFBWCxHQUFvQixDQUF4QixFQUEyQjtBQUN6QkksVUFBQUEsTUFBTSxDQUFDSCxJQUFQLENBQVlDLE1BQVosR0FBcUIsS0FBS1AsS0FBTCxDQUFXLENBQVgsRUFBY00sSUFBZCxDQUFtQkMsTUFBeEM7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBT0UsTUFBTSxDQUFDSCxJQUFQLENBQVlDLE1BQW5CO0FBQ0Q7QUFDRixPQU5ELE1BTU8sSUFBSSxLQUFLRyxLQUFMLEtBQWVELE1BQW5CLEVBQTJCO0FBQ2hDLDZEQUFpQlQsS0FBakIsd0NBQXdCO0FBQUEsY0FBZlcsSUFBZTtBQUN0QkEsVUFBQUEsSUFBSSxDQUFDTCxJQUFMLENBQVVDLE1BQVYsR0FBbUJFLE1BQU0sQ0FBQ0gsSUFBUCxDQUFZQyxNQUEvQjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxXQUFPUCxLQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7Ozs7O1NBYUFZLFEsR0FBQSxrQkFBVUMsSUFBVixFQUFzQjtBQUFBLFFBQVpBLElBQVk7QUFBWkEsTUFBQUEsSUFBWSxHQUFMLEVBQUs7QUFBQTs7QUFDcEIsUUFBSUMsVUFBVSxHQUFHQyxPQUFPLENBQUMsZUFBRCxDQUF4Qjs7QUFDQSxRQUFJQyxTQUFTLEdBQUdELE9BQU8sQ0FBQyxhQUFELENBQXZCOztBQUVBLFFBQUlFLElBQUksR0FBRyxJQUFJSCxVQUFKLENBQWUsSUFBSUUsU0FBSixFQUFmLEVBQWdDLElBQWhDLEVBQXNDSCxJQUF0QyxDQUFYO0FBQ0EsV0FBT0ksSUFBSSxDQUFDQyxTQUFMLEVBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUExRGlCQyxrQjs7ZUEyRUp0QixJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcidcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgQ1NTIGZpbGUgYW5kIGNvbnRhaW5zIGFsbCBpdHMgcGFyc2VkIG5vZGVzLlxuICpcbiAqIEBleHRlbmRzIENvbnRhaW5lclxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYXtjb2xvcjpibGFja30gYnt6LWluZGV4OjJ9JylcbiAqIHJvb3QudHlwZSAgICAgICAgIC8vPT4gJ3Jvb3QnXG4gKiByb290Lm5vZGVzLmxlbmd0aCAvLz0+IDJcbiAqL1xuY2xhc3MgUm9vdCBleHRlbmRzIENvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yIChkZWZhdWx0cykge1xuICAgIHN1cGVyKGRlZmF1bHRzKVxuICAgIHRoaXMudHlwZSA9ICdyb290J1xuICAgIGlmICghdGhpcy5ub2RlcykgdGhpcy5ub2RlcyA9IFtdXG4gIH1cblxuICByZW1vdmVDaGlsZCAoY2hpbGQsIGlnbm9yZSkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuaW5kZXgoY2hpbGQpXG5cbiAgICBpZiAoIWlnbm9yZSAmJiBpbmRleCA9PT0gMCAmJiB0aGlzLm5vZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMubm9kZXNbMV0ucmF3cy5iZWZvcmUgPSB0aGlzLm5vZGVzW2luZGV4XS5yYXdzLmJlZm9yZVxuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5yZW1vdmVDaGlsZChjaGlsZClcbiAgfVxuXG4gIG5vcm1hbGl6ZSAoY2hpbGQsIHNhbXBsZSwgdHlwZSkge1xuICAgIGxldCBub2RlcyA9IHN1cGVyLm5vcm1hbGl6ZShjaGlsZClcblxuICAgIGlmIChzYW1wbGUpIHtcbiAgICAgIGlmICh0eXBlID09PSAncHJlcGVuZCcpIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHNhbXBsZS5yYXdzLmJlZm9yZSA9IHRoaXMubm9kZXNbMV0ucmF3cy5iZWZvcmVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgc2FtcGxlLnJhd3MuYmVmb3JlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5maXJzdCAhPT0gc2FtcGxlKSB7XG4gICAgICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgICBub2RlLnJhd3MuYmVmb3JlID0gc2FtcGxlLnJhd3MuYmVmb3JlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEge0BsaW5rIFJlc3VsdH0gaW5zdGFuY2UgcmVwcmVzZW50aW5nIHRoZSByb2904oCZcyBDU1MuXG4gICAqXG4gICAqIEBwYXJhbSB7cHJvY2Vzc09wdGlvbnN9IFtvcHRzXSBPcHRpb25zIHdpdGggb25seSBgdG9gIGFuZCBgbWFwYCBrZXlzLlxuICAgKlxuICAgKiBAcmV0dXJuIHtSZXN1bHR9IFJlc3VsdCB3aXRoIGN1cnJlbnQgcm9vdOKAmXMgQ1NTLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCByb290MSA9IHBvc3Rjc3MucGFyc2UoY3NzMSwgeyBmcm9tOiAnYS5jc3MnIH0pXG4gICAqIGNvbnN0IHJvb3QyID0gcG9zdGNzcy5wYXJzZShjc3MyLCB7IGZyb206ICdiLmNzcycgfSlcbiAgICogcm9vdDEuYXBwZW5kKHJvb3QyKVxuICAgKiBjb25zdCByZXN1bHQgPSByb290MS50b1Jlc3VsdCh7IHRvOiAnYWxsLmNzcycsIG1hcDogdHJ1ZSB9KVxuICAgKi9cbiAgdG9SZXN1bHQgKG9wdHMgPSB7IH0pIHtcbiAgICBsZXQgTGF6eVJlc3VsdCA9IHJlcXVpcmUoJy4vbGF6eS1yZXN1bHQnKVxuICAgIGxldCBQcm9jZXNzb3IgPSByZXF1aXJlKCcuL3Byb2Nlc3NvcicpXG5cbiAgICBsZXQgbGF6eSA9IG5ldyBMYXp5UmVzdWx0KG5ldyBQcm9jZXNzb3IoKSwgdGhpcywgb3B0cylcbiAgICByZXR1cm4gbGF6eS5zdHJpbmdpZnkoKVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBSb290I1xuICAgKiBAbWVtYmVyIHtvYmplY3R9IHJhd3MgSW5mb3JtYXRpb24gdG8gZ2VuZXJhdGUgYnl0ZS10by1ieXRlIGVxdWFsXG4gICAqICAgICAgICAgICAgICAgICAgICAgICBub2RlIHN0cmluZyBhcyBpdCB3YXMgaW4gdGhlIG9yaWdpbiBpbnB1dC5cbiAgICpcbiAgICogRXZlcnkgcGFyc2VyIHNhdmVzIGl0cyBvd24gcHJvcGVydGllcyxcbiAgICogYnV0IHRoZSBkZWZhdWx0IENTUyBwYXJzZXIgdXNlczpcbiAgICpcbiAgICogKiBgYWZ0ZXJgOiB0aGUgc3BhY2Ugc3ltYm9scyBhZnRlciB0aGUgbGFzdCBjaGlsZCB0byB0aGUgZW5kIG9mIGZpbGUuXG4gICAqICogYHNlbWljb2xvbmA6IGlzIHRoZSBsYXN0IGNoaWxkIGhhcyBhbiAob3B0aW9uYWwpIHNlbWljb2xvbi5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcG9zdGNzcy5wYXJzZSgnYSB7fVxcbicpLnJhd3MgLy89PiB7IGFmdGVyOiAnXFxuJyB9XG4gICAqIHBvc3Rjc3MucGFyc2UoJ2Ege30nKS5yYXdzICAgLy89PiB7IGFmdGVyOiAnJyB9XG4gICAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBSb290XG4iXSwiZmlsZSI6InJvb3QuanMifQ==


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/rule.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/rule.js ***!
  \***********************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _container = _interopRequireDefault(__webpack_require__(/*! ./container */ "./node_modules/@linaria/server/node_modules/postcss/lib/container.js"));

var _list = _interopRequireDefault(__webpack_require__(/*! ./list */ "./node_modules/@linaria/server/node_modules/postcss/lib/list.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Represents a CSS rule: a selector followed by a declaration block.
 *
 * @extends Container
 *
 * @example
 * const root = postcss.parse('a{}')
 * const rule = root.first
 * rule.type       //=> 'rule'
 * rule.toString() //=> 'a{}'
 */
var Rule = /*#__PURE__*/function (_Container) {
  _inheritsLoose(Rule, _Container);

  function Rule(defaults) {
    var _this;

    _this = _Container.call(this, defaults) || this;
    _this.type = 'rule';
    if (!_this.nodes) _this.nodes = [];
    return _this;
  }
  /**
   * An array containing the rule’s individual selectors.
   * Groups of selectors are split at commas.
   *
   * @type {string[]}
   *
   * @example
   * const root = postcss.parse('a, b { }')
   * const rule = root.first
   *
   * rule.selector  //=> 'a, b'
   * rule.selectors //=> ['a', 'b']
   *
   * rule.selectors = ['a', 'strong']
   * rule.selector //=> 'a, strong'
   */


  _createClass(Rule, [{
    key: "selectors",
    get: function get() {
      return _list.default.comma(this.selector);
    },
    set: function set(values) {
      var match = this.selector ? this.selector.match(/,\s*/) : null;
      var sep = match ? match[0] : ',' + this.raw('between', 'beforeOpen');
      this.selector = values.join(sep);
    }
    /**
     * @memberof Rule#
     * @member {string} selector The rule’s full selector represented
     *                           as a string.
     *
     * @example
     * const root = postcss.parse('a, b { }')
     * const rule = root.first
     * rule.selector //=> 'a, b'
     */

    /**
     * @memberof Rule#
     * @member {object} raws Information to generate byte-to-byte equal
     *                       node string as it was in the origin input.
     *
     * Every parser saves its own properties,
     * but the default CSS parser uses:
     *
     * * `before`: the space symbols before the node. It also stores `*`
     *   and `_` symbols before the declaration (IE hack).
     * * `after`: the space symbols after the last child of the node
     *   to the end of the node.
     * * `between`: the symbols between the property and value
     *   for declarations, selector and `{` for rules, or last parameter
     *   and `{` for at-rules.
     * * `semicolon`: contains `true` if the last child has
     *   an (optional) semicolon.
     * * `ownSemicolon`: contains `true` if there is semicolon after rule.
     *
     * PostCSS cleans selectors from comments and extra spaces,
     * but it stores origin content in raws properties.
     * As such, if you don’t change a declaration’s value,
     * PostCSS will use the raw value with comments.
     *
     * @example
     * const root = postcss.parse('a {\n  color:black\n}')
     * root.first.first.raws //=> { before: '', between: ' ', after: '\n' }
     */

  }]);

  return Rule;
}(_container.default);

var _default = Rule;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGUuZXM2Il0sIm5hbWVzIjpbIlJ1bGUiLCJkZWZhdWx0cyIsInR5cGUiLCJub2RlcyIsImxpc3QiLCJjb21tYSIsInNlbGVjdG9yIiwidmFsdWVzIiwibWF0Y2giLCJzZXAiLCJyYXciLCJqb2luIiwiQ29udGFpbmVyIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7O0lBV01BLEk7OztBQUNKLGdCQUFhQyxRQUFiLEVBQXVCO0FBQUE7O0FBQ3JCLGtDQUFNQSxRQUFOO0FBQ0EsVUFBS0MsSUFBTCxHQUFZLE1BQVo7QUFDQSxRQUFJLENBQUMsTUFBS0MsS0FBVixFQUFpQixNQUFLQSxLQUFMLEdBQWEsRUFBYjtBQUhJO0FBSXRCO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQWdCaUI7QUFDZixhQUFPQyxjQUFLQyxLQUFMLENBQVcsS0FBS0MsUUFBaEIsQ0FBUDtBQUNELEs7c0JBRWNDLE0sRUFBUTtBQUNyQixVQUFJQyxLQUFLLEdBQUcsS0FBS0YsUUFBTCxHQUFnQixLQUFLQSxRQUFMLENBQWNFLEtBQWQsQ0FBb0IsTUFBcEIsQ0FBaEIsR0FBOEMsSUFBMUQ7QUFDQSxVQUFJQyxHQUFHLEdBQUdELEtBQUssR0FBR0EsS0FBSyxDQUFDLENBQUQsQ0FBUixHQUFjLE1BQU0sS0FBS0UsR0FBTCxDQUFTLFNBQVQsRUFBb0IsWUFBcEIsQ0FBbkM7QUFDQSxXQUFLSixRQUFMLEdBQWdCQyxNQUFNLENBQUNJLElBQVAsQ0FBWUYsR0FBWixDQUFoQjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBNUNpQkcsa0I7O2VBMEVKWixJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcidcbmltcG9ydCBsaXN0IGZyb20gJy4vbGlzdCdcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgQ1NTIHJ1bGU6IGEgc2VsZWN0b3IgZm9sbG93ZWQgYnkgYSBkZWNsYXJhdGlvbiBibG9jay5cbiAqXG4gKiBAZXh0ZW5kcyBDb250YWluZXJcbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJ2F7fScpXG4gKiBjb25zdCBydWxlID0gcm9vdC5maXJzdFxuICogcnVsZS50eXBlICAgICAgIC8vPT4gJ3J1bGUnXG4gKiBydWxlLnRvU3RyaW5nKCkgLy89PiAnYXt9J1xuICovXG5jbGFzcyBSdWxlIGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IgKGRlZmF1bHRzKSB7XG4gICAgc3VwZXIoZGVmYXVsdHMpXG4gICAgdGhpcy50eXBlID0gJ3J1bGUnXG4gICAgaWYgKCF0aGlzLm5vZGVzKSB0aGlzLm5vZGVzID0gW11cbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBjb250YWluaW5nIHRoZSBydWxl4oCZcyBpbmRpdmlkdWFsIHNlbGVjdG9ycy5cbiAgICogR3JvdXBzIG9mIHNlbGVjdG9ycyBhcmUgc3BsaXQgYXQgY29tbWFzLlxuICAgKlxuICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKCdhLCBiIHsgfScpXG4gICAqIGNvbnN0IHJ1bGUgPSByb290LmZpcnN0XG4gICAqXG4gICAqIHJ1bGUuc2VsZWN0b3IgIC8vPT4gJ2EsIGInXG4gICAqIHJ1bGUuc2VsZWN0b3JzIC8vPT4gWydhJywgJ2InXVxuICAgKlxuICAgKiBydWxlLnNlbGVjdG9ycyA9IFsnYScsICdzdHJvbmcnXVxuICAgKiBydWxlLnNlbGVjdG9yIC8vPT4gJ2EsIHN0cm9uZydcbiAgICovXG4gIGdldCBzZWxlY3RvcnMgKCkge1xuICAgIHJldHVybiBsaXN0LmNvbW1hKHRoaXMuc2VsZWN0b3IpXG4gIH1cblxuICBzZXQgc2VsZWN0b3JzICh2YWx1ZXMpIHtcbiAgICBsZXQgbWF0Y2ggPSB0aGlzLnNlbGVjdG9yID8gdGhpcy5zZWxlY3Rvci5tYXRjaCgvLFxccyovKSA6IG51bGxcbiAgICBsZXQgc2VwID0gbWF0Y2ggPyBtYXRjaFswXSA6ICcsJyArIHRoaXMucmF3KCdiZXR3ZWVuJywgJ2JlZm9yZU9wZW4nKVxuICAgIHRoaXMuc2VsZWN0b3IgPSB2YWx1ZXMuam9pbihzZXApXG4gIH1cblxuICAvKipcbiAgICogQG1lbWJlcm9mIFJ1bGUjXG4gICAqIEBtZW1iZXIge3N0cmluZ30gc2VsZWN0b3IgVGhlIHJ1bGXigJlzIGZ1bGwgc2VsZWN0b3IgcmVwcmVzZW50ZWRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBhcyBhIHN0cmluZy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJ2EsIGIgeyB9JylcbiAgICogY29uc3QgcnVsZSA9IHJvb3QuZmlyc3RcbiAgICogcnVsZS5zZWxlY3RvciAvLz0+ICdhLCBiJ1xuICAgKi9cblxuICAvKipcbiAgICogQG1lbWJlcm9mIFJ1bGUjXG4gICAqIEBtZW1iZXIge29iamVjdH0gcmF3cyBJbmZvcm1hdGlvbiB0byBnZW5lcmF0ZSBieXRlLXRvLWJ5dGUgZXF1YWxcbiAgICogICAgICAgICAgICAgICAgICAgICAgIG5vZGUgc3RyaW5nIGFzIGl0IHdhcyBpbiB0aGUgb3JpZ2luIGlucHV0LlxuICAgKlxuICAgKiBFdmVyeSBwYXJzZXIgc2F2ZXMgaXRzIG93biBwcm9wZXJ0aWVzLFxuICAgKiBidXQgdGhlIGRlZmF1bHQgQ1NTIHBhcnNlciB1c2VzOlxuICAgKlxuICAgKiAqIGBiZWZvcmVgOiB0aGUgc3BhY2Ugc3ltYm9scyBiZWZvcmUgdGhlIG5vZGUuIEl0IGFsc28gc3RvcmVzIGAqYFxuICAgKiAgIGFuZCBgX2Agc3ltYm9scyBiZWZvcmUgdGhlIGRlY2xhcmF0aW9uIChJRSBoYWNrKS5cbiAgICogKiBgYWZ0ZXJgOiB0aGUgc3BhY2Ugc3ltYm9scyBhZnRlciB0aGUgbGFzdCBjaGlsZCBvZiB0aGUgbm9kZVxuICAgKiAgIHRvIHRoZSBlbmQgb2YgdGhlIG5vZGUuXG4gICAqICogYGJldHdlZW5gOiB0aGUgc3ltYm9scyBiZXR3ZWVuIHRoZSBwcm9wZXJ0eSBhbmQgdmFsdWVcbiAgICogICBmb3IgZGVjbGFyYXRpb25zLCBzZWxlY3RvciBhbmQgYHtgIGZvciBydWxlcywgb3IgbGFzdCBwYXJhbWV0ZXJcbiAgICogICBhbmQgYHtgIGZvciBhdC1ydWxlcy5cbiAgICogKiBgc2VtaWNvbG9uYDogY29udGFpbnMgYHRydWVgIGlmIHRoZSBsYXN0IGNoaWxkIGhhc1xuICAgKiAgIGFuIChvcHRpb25hbCkgc2VtaWNvbG9uLlxuICAgKiAqIGBvd25TZW1pY29sb25gOiBjb250YWlucyBgdHJ1ZWAgaWYgdGhlcmUgaXMgc2VtaWNvbG9uIGFmdGVyIHJ1bGUuXG4gICAqXG4gICAqIFBvc3RDU1MgY2xlYW5zIHNlbGVjdG9ycyBmcm9tIGNvbW1lbnRzIGFuZCBleHRyYSBzcGFjZXMsXG4gICAqIGJ1dCBpdCBzdG9yZXMgb3JpZ2luIGNvbnRlbnQgaW4gcmF3cyBwcm9wZXJ0aWVzLlxuICAgKiBBcyBzdWNoLCBpZiB5b3UgZG9u4oCZdCBjaGFuZ2UgYSBkZWNsYXJhdGlvbuKAmXMgdmFsdWUsXG4gICAqIFBvc3RDU1Mgd2lsbCB1c2UgdGhlIHJhdyB2YWx1ZSB3aXRoIGNvbW1lbnRzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSB7XFxuICBjb2xvcjpibGFja1xcbn0nKVxuICAgKiByb290LmZpcnN0LmZpcnN0LnJhd3MgLy89PiB7IGJlZm9yZTogJycsIGJldHdlZW46ICcgJywgYWZ0ZXI6ICdcXG4nIH1cbiAgICovXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJ1bGVcbiJdLCJmaWxlIjoicnVsZS5qcyJ9


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/stringifier.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/stringifier.js ***!
  \******************************************************************************/
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;
var DEFAULT_RAW = {
  colon: ': ',
  indent: '    ',
  beforeDecl: '\n',
  beforeRule: '\n',
  beforeOpen: ' ',
  beforeClose: '\n',
  beforeComment: '\n',
  after: '\n',
  emptyBody: '',
  commentLeft: ' ',
  commentRight: ' ',
  semicolon: false
};

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

var Stringifier = /*#__PURE__*/function () {
  function Stringifier(builder) {
    this.builder = builder;
  }

  var _proto = Stringifier.prototype;

  _proto.stringify = function stringify(node, semicolon) {
    this[node.type](node, semicolon);
  };

  _proto.root = function root(node) {
    this.body(node);
    if (node.raws.after) this.builder(node.raws.after);
  };

  _proto.comment = function comment(node) {
    var left = this.raw(node, 'left', 'commentLeft');
    var right = this.raw(node, 'right', 'commentRight');
    this.builder('/*' + left + node.text + right + '*/', node);
  };

  _proto.decl = function decl(node, semicolon) {
    var between = this.raw(node, 'between', 'colon');
    var string = node.prop + between + this.rawValue(node, 'value');

    if (node.important) {
      string += node.raws.important || ' !important';
    }

    if (semicolon) string += ';';
    this.builder(string, node);
  };

  _proto.rule = function rule(node) {
    this.block(node, this.rawValue(node, 'selector'));

    if (node.raws.ownSemicolon) {
      this.builder(node.raws.ownSemicolon, node, 'end');
    }
  };

  _proto.atrule = function atrule(node, semicolon) {
    var name = '@' + node.name;
    var params = node.params ? this.rawValue(node, 'params') : '';

    if (typeof node.raws.afterName !== 'undefined') {
      name += node.raws.afterName;
    } else if (params) {
      name += ' ';
    }

    if (node.nodes) {
      this.block(node, name + params);
    } else {
      var end = (node.raws.between || '') + (semicolon ? ';' : '');
      this.builder(name + params + end, node);
    }
  };

  _proto.body = function body(node) {
    var last = node.nodes.length - 1;

    while (last > 0) {
      if (node.nodes[last].type !== 'comment') break;
      last -= 1;
    }

    var semicolon = this.raw(node, 'semicolon');

    for (var i = 0; i < node.nodes.length; i++) {
      var child = node.nodes[i];
      var before = this.raw(child, 'before');
      if (before) this.builder(before);
      this.stringify(child, last !== i || semicolon);
    }
  };

  _proto.block = function block(node, start) {
    var between = this.raw(node, 'between', 'beforeOpen');
    this.builder(start + between + '{', node, 'start');
    var after;

    if (node.nodes && node.nodes.length) {
      this.body(node);
      after = this.raw(node, 'after');
    } else {
      after = this.raw(node, 'after', 'emptyBody');
    }

    if (after) this.builder(after);
    this.builder('}', node, 'end');
  };

  _proto.raw = function raw(node, own, detect) {
    var value;
    if (!detect) detect = own; // Already had

    if (own) {
      value = node.raws[own];
      if (typeof value !== 'undefined') return value;
    }

    var parent = node.parent; // Hack for first rule in CSS

    if (detect === 'before') {
      if (!parent || parent.type === 'root' && parent.first === node) {
        return '';
      }
    } // Floating child without parent


    if (!parent) return DEFAULT_RAW[detect]; // Detect style by other nodes

    var root = node.root();
    if (!root.rawCache) root.rawCache = {};

    if (typeof root.rawCache[detect] !== 'undefined') {
      return root.rawCache[detect];
    }

    if (detect === 'before' || detect === 'after') {
      return this.beforeAfter(node, detect);
    } else {
      var method = 'raw' + capitalize(detect);

      if (this[method]) {
        value = this[method](root, node);
      } else {
        root.walk(function (i) {
          value = i.raws[own];
          if (typeof value !== 'undefined') return false;
        });
      }
    }

    if (typeof value === 'undefined') value = DEFAULT_RAW[detect];
    root.rawCache[detect] = value;
    return value;
  };

  _proto.rawSemicolon = function rawSemicolon(root) {
    var value;
    root.walk(function (i) {
      if (i.nodes && i.nodes.length && i.last.type === 'decl') {
        value = i.raws.semicolon;
        if (typeof value !== 'undefined') return false;
      }
    });
    return value;
  };

  _proto.rawEmptyBody = function rawEmptyBody(root) {
    var value;
    root.walk(function (i) {
      if (i.nodes && i.nodes.length === 0) {
        value = i.raws.after;
        if (typeof value !== 'undefined') return false;
      }
    });
    return value;
  };

  _proto.rawIndent = function rawIndent(root) {
    if (root.raws.indent) return root.raws.indent;
    var value;
    root.walk(function (i) {
      var p = i.parent;

      if (p && p !== root && p.parent && p.parent === root) {
        if (typeof i.raws.before !== 'undefined') {
          var parts = i.raws.before.split('\n');
          value = parts[parts.length - 1];
          value = value.replace(/[^\s]/g, '');
          return false;
        }
      }
    });
    return value;
  };

  _proto.rawBeforeComment = function rawBeforeComment(root, node) {
    var value;
    root.walkComments(function (i) {
      if (typeof i.raws.before !== 'undefined') {
        value = i.raws.before;

        if (value.indexOf('\n') !== -1) {
          value = value.replace(/[^\n]+$/, '');
        }

        return false;
      }
    });

    if (typeof value === 'undefined') {
      value = this.raw(node, null, 'beforeDecl');
    } else if (value) {
      value = value.replace(/[^\s]/g, '');
    }

    return value;
  };

  _proto.rawBeforeDecl = function rawBeforeDecl(root, node) {
    var value;
    root.walkDecls(function (i) {
      if (typeof i.raws.before !== 'undefined') {
        value = i.raws.before;

        if (value.indexOf('\n') !== -1) {
          value = value.replace(/[^\n]+$/, '');
        }

        return false;
      }
    });

    if (typeof value === 'undefined') {
      value = this.raw(node, null, 'beforeRule');
    } else if (value) {
      value = value.replace(/[^\s]/g, '');
    }

    return value;
  };

  _proto.rawBeforeRule = function rawBeforeRule(root) {
    var value;
    root.walk(function (i) {
      if (i.nodes && (i.parent !== root || root.first !== i)) {
        if (typeof i.raws.before !== 'undefined') {
          value = i.raws.before;

          if (value.indexOf('\n') !== -1) {
            value = value.replace(/[^\n]+$/, '');
          }

          return false;
        }
      }
    });
    if (value) value = value.replace(/[^\s]/g, '');
    return value;
  };

  _proto.rawBeforeClose = function rawBeforeClose(root) {
    var value;
    root.walk(function (i) {
      if (i.nodes && i.nodes.length > 0) {
        if (typeof i.raws.after !== 'undefined') {
          value = i.raws.after;

          if (value.indexOf('\n') !== -1) {
            value = value.replace(/[^\n]+$/, '');
          }

          return false;
        }
      }
    });
    if (value) value = value.replace(/[^\s]/g, '');
    return value;
  };

  _proto.rawBeforeOpen = function rawBeforeOpen(root) {
    var value;
    root.walk(function (i) {
      if (i.type !== 'decl') {
        value = i.raws.between;
        if (typeof value !== 'undefined') return false;
      }
    });
    return value;
  };

  _proto.rawColon = function rawColon(root) {
    var value;
    root.walkDecls(function (i) {
      if (typeof i.raws.between !== 'undefined') {
        value = i.raws.between.replace(/[^\s:]/g, '');
        return false;
      }
    });
    return value;
  };

  _proto.beforeAfter = function beforeAfter(node, detect) {
    var value;

    if (node.type === 'decl') {
      value = this.raw(node, null, 'beforeDecl');
    } else if (node.type === 'comment') {
      value = this.raw(node, null, 'beforeComment');
    } else if (detect === 'before') {
      value = this.raw(node, null, 'beforeRule');
    } else {
      value = this.raw(node, null, 'beforeClose');
    }

    var buf = node.parent;
    var depth = 0;

    while (buf && buf.type !== 'root') {
      depth += 1;
      buf = buf.parent;
    }

    if (value.indexOf('\n') !== -1) {
      var indent = this.raw(node, null, 'indent');

      if (indent.length) {
        for (var step = 0; step < depth; step++) {
          value += indent;
        }
      }
    }

    return value;
  };

  _proto.rawValue = function rawValue(node, prop) {
    var value = node[prop];
    var raw = node.raws[prop];

    if (raw && raw.value === value) {
      return raw.raw;
    }

    return value;
  };

  return Stringifier;
}();

var _default = Stringifier;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmluZ2lmaWVyLmVzNiJdLCJuYW1lcyI6WyJERUZBVUxUX1JBVyIsImNvbG9uIiwiaW5kZW50IiwiYmVmb3JlRGVjbCIsImJlZm9yZVJ1bGUiLCJiZWZvcmVPcGVuIiwiYmVmb3JlQ2xvc2UiLCJiZWZvcmVDb21tZW50IiwiYWZ0ZXIiLCJlbXB0eUJvZHkiLCJjb21tZW50TGVmdCIsImNvbW1lbnRSaWdodCIsInNlbWljb2xvbiIsImNhcGl0YWxpemUiLCJzdHIiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiU3RyaW5naWZpZXIiLCJidWlsZGVyIiwic3RyaW5naWZ5Iiwibm9kZSIsInR5cGUiLCJyb290IiwiYm9keSIsInJhd3MiLCJjb21tZW50IiwibGVmdCIsInJhdyIsInJpZ2h0IiwidGV4dCIsImRlY2wiLCJiZXR3ZWVuIiwic3RyaW5nIiwicHJvcCIsInJhd1ZhbHVlIiwiaW1wb3J0YW50IiwicnVsZSIsImJsb2NrIiwib3duU2VtaWNvbG9uIiwiYXRydWxlIiwibmFtZSIsInBhcmFtcyIsImFmdGVyTmFtZSIsIm5vZGVzIiwiZW5kIiwibGFzdCIsImxlbmd0aCIsImkiLCJjaGlsZCIsImJlZm9yZSIsInN0YXJ0Iiwib3duIiwiZGV0ZWN0IiwidmFsdWUiLCJwYXJlbnQiLCJmaXJzdCIsInJhd0NhY2hlIiwiYmVmb3JlQWZ0ZXIiLCJtZXRob2QiLCJ3YWxrIiwicmF3U2VtaWNvbG9uIiwicmF3RW1wdHlCb2R5IiwicmF3SW5kZW50IiwicCIsInBhcnRzIiwic3BsaXQiLCJyZXBsYWNlIiwicmF3QmVmb3JlQ29tbWVudCIsIndhbGtDb21tZW50cyIsImluZGV4T2YiLCJyYXdCZWZvcmVEZWNsIiwid2Fsa0RlY2xzIiwicmF3QmVmb3JlUnVsZSIsInJhd0JlZm9yZUNsb3NlIiwicmF3QmVmb3JlT3BlbiIsInJhd0NvbG9uIiwiYnVmIiwiZGVwdGgiLCJzdGVwIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBTUEsV0FBVyxHQUFHO0FBQ2xCQyxFQUFB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QUFDRDs7QUFFRCxRQUFJd0QsR0FBRyxHQUFHeEQsSUFBSSxDQUFDa0MsTUFBZjtBQUNBLFFBQUl1QixLQUFLLEdBQUcsQ0FBWjs7QUFDQSxXQUFPRCxHQUFHLElBQUlBLEdBQUcsQ0FBQ3ZELElBQUosS0FBYSxNQUEzQixFQUFtQztBQUNqQ3dELE1BQUFBLEtBQUssSUFBSSxDQUFUO0FBQ0FELE1BQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDdEIsTUFBVjtBQUNEOztBQUVELFFBQUlELEtBQUssQ0FBQ2dCLE9BQU4sQ0FBYyxJQUFkLE1BQXdCLENBQUMsQ0FBN0IsRUFBZ0M7QUFDOUIsVUFBSW5FLE1BQU0sR0FBRyxLQUFLeUIsR0FBTCxDQUFTUCxJQUFULEVBQWUsSUFBZixFQUFxQixRQUFyQixDQUFiOztBQUNBLFVBQUlsQixNQUFNLENBQUM0QyxNQUFYLEVBQW1CO0FBQ2pCLGFBQUssSUFBSWdDLElBQUksR0FBRyxDQUFoQixFQUFtQkEsSUFBSSxHQUFHRCxLQUExQixFQUFpQ0MsSUFBSSxFQUFyQztBQUF5Q3pCLFVBQUFBLEtBQUssSUFBSW5ELE1BQVQ7QUFBekM7QUFDRDtBQUNGOztBQUVELFdBQU9tRCxLQUFQO0FBQ0QsRzs7U0FFRG5CLFEsR0FBQSxrQkFBVWQsSUFBVixFQUFnQmEsSUFBaEIsRUFBc0I7QUFDcEIsUUFBSW9CLEtBQUssR0FBR2pDLElBQUksQ0FBQ2EsSUFBRCxDQUFoQjtBQUNBLFFBQUlOLEdBQUcsR0FBR1AsSUFBSSxDQUFDSSxJQUFMLENBQVVTLElBQVYsQ0FBVjs7QUFDQSxRQUFJTixHQUFHLElBQUlBLEdBQUcsQ0FBQzBCLEtBQUosS0FBY0EsS0FBekIsRUFBZ0M7QUFDOUIsYUFBTzFCLEdBQUcsQ0FBQ0EsR0FBWDtBQUNEOztBQUVELFdBQU8wQixLQUFQO0FBQ0QsRzs7Ozs7ZUFHWXBDLFciLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBERUZBVUxUX1JBVyA9IHtcbiAgY29sb246ICc6ICcsXG4gIGluZGVudDogJyAgICAnLFxuICBiZWZvcmVEZWNsOiAnXFxuJyxcbiAgYmVmb3JlUnVsZTogJ1xcbicsXG4gIGJlZm9yZU9wZW46ICcgJyxcbiAgYmVmb3JlQ2xvc2U6ICdcXG4nLFxuICBiZWZvcmVDb21tZW50OiAnXFxuJyxcbiAgYWZ0ZXI6ICdcXG4nLFxuICBlbXB0eUJvZHk6ICcnLFxuICBjb21tZW50TGVmdDogJyAnLFxuICBjb21tZW50UmlnaHQ6ICcgJyxcbiAgc2VtaWNvbG9uOiBmYWxzZVxufVxuXG5mdW5jdGlvbiBjYXBpdGFsaXplIChzdHIpIHtcbiAgcmV0dXJuIHN0clswXS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpXG59XG5cbmNsYXNzIFN0cmluZ2lmaWVyIHtcbiAgY29uc3RydWN0b3IgKGJ1aWxkZXIpIHtcbiAgICB0aGlzLmJ1aWxkZXIgPSBidWlsZGVyXG4gIH1cblxuICBzdHJpbmdpZnkgKG5vZGUsIHNlbWljb2xvbikge1xuICAgIHRoaXNbbm9kZS50eXBlXShub2RlLCBzZW1pY29sb24pXG4gIH1cblxuICByb290IChub2RlKSB7XG4gICAgdGhpcy5ib2R5KG5vZGUpXG4gICAgaWYgKG5vZGUucmF3cy5hZnRlcikgdGhpcy5idWlsZGVyKG5vZGUucmF3cy5hZnRlcilcbiAgfVxuXG4gIGNvbW1lbnQgKG5vZGUpIHtcbiAgICBsZXQgbGVmdCA9IHRoaXMucmF3KG5vZGUsICdsZWZ0JywgJ2NvbW1lbnRMZWZ0JylcbiAgICBsZXQgcmlnaHQgPSB0aGlzLnJhdyhub2RlLCAncmlnaHQnLCAnY29tbWVudFJpZ2h0JylcbiAgICB0aGlzLmJ1aWxkZXIoJy8qJyArIGxlZnQgKyBub2RlLnRleHQgKyByaWdodCArICcqLycsIG5vZGUpXG4gIH1cblxuICBkZWNsIChub2RlLCBzZW1pY29sb24pIHtcbiAgICBsZXQgYmV0d2VlbiA9IHRoaXMucmF3KG5vZGUsICdiZXR3ZWVuJywgJ2NvbG9uJylcbiAgICBsZXQgc3RyaW5nID0gbm9kZS5wcm9wICsgYmV0d2VlbiArIHRoaXMucmF3VmFsdWUobm9kZSwgJ3ZhbHVlJylcblxuICAgIGlmIChub2RlLmltcG9ydGFudCkge1xuICAgICAgc3RyaW5nICs9IG5vZGUucmF3cy5pbXBvcnRhbnQgfHwgJyAhaW1wb3J0YW50J1xuICAgIH1cblxuICAgIGlmIChzZW1pY29sb24pIHN0cmluZyArPSAnOydcbiAgICB0aGlzLmJ1aWxkZXIoc3RyaW5nLCBub2RlKVxuICB9XG5cbiAgcnVsZSAobm9kZSkge1xuICAgIHRoaXMuYmxvY2sobm9kZSwgdGhpcy5yYXdWYWx1ZShub2RlLCAnc2VsZWN0b3InKSlcbiAgICBpZiAobm9kZS5yYXdzLm93blNlbWljb2xvbikge1xuICAgICAgdGhpcy5idWlsZGVyKG5vZGUucmF3cy5vd25TZW1pY29sb24sIG5vZGUsICdlbmQnKVxuICAgIH1cbiAgfVxuXG4gIGF0cnVsZSAobm9kZSwgc2VtaWNvbG9uKSB7XG4gICAgbGV0IG5hbWUgPSAnQCcgKyBub2RlLm5hbWVcbiAgICBsZXQgcGFyYW1zID0gbm9kZS5wYXJhbXMgPyB0aGlzLnJhd1ZhbHVlKG5vZGUsICdwYXJhbXMnKSA6ICcnXG5cbiAgICBpZiAodHlwZW9mIG5vZGUucmF3cy5hZnRlck5hbWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBuYW1lICs9IG5vZGUucmF3cy5hZnRlck5hbWVcbiAgICB9IGVsc2UgaWYgKHBhcmFtcykge1xuICAgICAgbmFtZSArPSAnICdcbiAgICB9XG5cbiAgICBpZiAobm9kZS5ub2Rlcykge1xuICAgICAgdGhpcy5ibG9jayhub2RlLCBuYW1lICsgcGFyYW1zKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZW5kID0gKG5vZGUucmF3cy5iZXR3ZWVuIHx8ICcnKSArIChzZW1pY29sb24gPyAnOycgOiAnJylcbiAgICAgIHRoaXMuYnVpbGRlcihuYW1lICsgcGFyYW1zICsgZW5kLCBub2RlKVxuICAgIH1cbiAgfVxuXG4gIGJvZHkgKG5vZGUpIHtcbiAgICBsZXQgbGFzdCA9IG5vZGUubm9kZXMubGVuZ3RoIC0gMVxuICAgIHdoaWxlIChsYXN0ID4gMCkge1xuICAgICAgaWYgKG5vZGUubm9kZXNbbGFzdF0udHlwZSAhPT0gJ2NvbW1lbnQnKSBicmVha1xuICAgICAgbGFzdCAtPSAxXG4gICAgfVxuXG4gICAgbGV0IHNlbWljb2xvbiA9IHRoaXMucmF3KG5vZGUsICdzZW1pY29sb24nKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5ub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNoaWxkID0gbm9kZS5ub2Rlc1tpXVxuICAgICAgbGV0IGJlZm9yZSA9IHRoaXMucmF3KGNoaWxkLCAnYmVmb3JlJylcbiAgICAgIGlmIChiZWZvcmUpIHRoaXMuYnVpbGRlcihiZWZvcmUpXG4gICAgICB0aGlzLnN0cmluZ2lmeShjaGlsZCwgbGFzdCAhPT0gaSB8fCBzZW1pY29sb24pXG4gICAgfVxuICB9XG5cbiAgYmxvY2sgKG5vZGUsIHN0YXJ0KSB7XG4gICAgbGV0IGJldHdlZW4gPSB0aGlzLnJhdyhub2RlLCAnYmV0d2VlbicsICdiZWZvcmVPcGVuJylcbiAgICB0aGlzLmJ1aWxkZXIoc3RhcnQgKyBiZXR3ZWVuICsgJ3snLCBub2RlLCAnc3RhcnQnKVxuXG4gICAgbGV0IGFmdGVyXG4gICAgaWYgKG5vZGUubm9kZXMgJiYgbm9kZS5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuYm9keShub2RlKVxuICAgICAgYWZ0ZXIgPSB0aGlzLnJhdyhub2RlLCAnYWZ0ZXInKVxuICAgIH0gZWxzZSB7XG4gICAgICBhZnRlciA9IHRoaXMucmF3KG5vZGUsICdhZnRlcicsICdlbXB0eUJvZHknKVxuICAgIH1cblxuICAgIGlmIChhZnRlcikgdGhpcy5idWlsZGVyKGFmdGVyKVxuICAgIHRoaXMuYnVpbGRlcignfScsIG5vZGUsICdlbmQnKVxuICB9XG5cbiAgcmF3IChub2RlLCBvd24sIGRldGVjdCkge1xuICAgIGxldCB2YWx1ZVxuICAgIGlmICghZGV0ZWN0KSBkZXRlY3QgPSBvd25cblxuICAgIC8vIEFscmVhZHkgaGFkXG4gICAgaWYgKG93bikge1xuICAgICAgdmFsdWUgPSBub2RlLnJhd3Nbb3duXVxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiB2YWx1ZVxuICAgIH1cblxuICAgIGxldCBwYXJlbnQgPSBub2RlLnBhcmVudFxuXG4gICAgLy8gSGFjayBmb3IgZmlyc3QgcnVsZSBpbiBDU1NcbiAgICBpZiAoZGV0ZWN0ID09PSAnYmVmb3JlJykge1xuICAgICAgaWYgKCFwYXJlbnQgfHwgKHBhcmVudC50eXBlID09PSAncm9vdCcgJiYgcGFyZW50LmZpcnN0ID09PSBub2RlKSkge1xuICAgICAgICByZXR1cm4gJydcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGbG9hdGluZyBjaGlsZCB3aXRob3V0IHBhcmVudFxuICAgIGlmICghcGFyZW50KSByZXR1cm4gREVGQVVMVF9SQVdbZGV0ZWN0XVxuXG4gICAgLy8gRGV0ZWN0IHN0eWxlIGJ5IG90aGVyIG5vZGVzXG4gICAgbGV0IHJvb3QgPSBub2RlLnJvb3QoKVxuICAgIGlmICghcm9vdC5yYXdDYWNoZSkgcm9vdC5yYXdDYWNoZSA9IHsgfVxuICAgIGlmICh0eXBlb2Ygcm9vdC5yYXdDYWNoZVtkZXRlY3RdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHJvb3QucmF3Q2FjaGVbZGV0ZWN0XVxuICAgIH1cblxuICAgIGlmIChkZXRlY3QgPT09ICdiZWZvcmUnIHx8IGRldGVjdCA9PT0gJ2FmdGVyJykge1xuICAgICAgcmV0dXJuIHRoaXMuYmVmb3JlQWZ0ZXIobm9kZSwgZGV0ZWN0KVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbWV0aG9kID0gJ3JhdycgKyBjYXBpdGFsaXplKGRldGVjdClcbiAgICAgIGlmICh0aGlzW21ldGhvZF0pIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzW21ldGhvZF0ocm9vdCwgbm9kZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3Qud2FsayhpID0+IHtcbiAgICAgICAgICB2YWx1ZSA9IGkucmF3c1tvd25dXG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB2YWx1ZSA9IERFRkFVTFRfUkFXW2RldGVjdF1cblxuICAgIHJvb3QucmF3Q2FjaGVbZGV0ZWN0XSA9IHZhbHVlXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdTZW1pY29sb24gKHJvb3QpIHtcbiAgICBsZXQgdmFsdWVcbiAgICByb290LndhbGsoaSA9PiB7XG4gICAgICBpZiAoaS5ub2RlcyAmJiBpLm5vZGVzLmxlbmd0aCAmJiBpLmxhc3QudHlwZSA9PT0gJ2RlY2wnKSB7XG4gICAgICAgIHZhbHVlID0gaS5yYXdzLnNlbWljb2xvblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0VtcHR5Qm9keSAocm9vdCkge1xuICAgIGxldCB2YWx1ZVxuICAgIHJvb3Qud2FsayhpID0+IHtcbiAgICAgIGlmIChpLm5vZGVzICYmIGkubm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhbHVlID0gaS5yYXdzLmFmdGVyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmF3SW5kZW50IChyb290KSB7XG4gICAgaWYgKHJvb3QucmF3cy5pbmRlbnQpIHJldHVybiByb290LnJhd3MuaW5kZW50XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrKGkgPT4ge1xuICAgICAgbGV0IHAgPSBpLnBhcmVudFxuICAgICAgaWYgKHAgJiYgcCAhPT0gcm9vdCAmJiBwLnBhcmVudCAmJiBwLnBhcmVudCA9PT0gcm9vdCkge1xuICAgICAgICBpZiAodHlwZW9mIGkucmF3cy5iZWZvcmUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgbGV0IHBhcnRzID0gaS5yYXdzLmJlZm9yZS5zcGxpdCgnXFxuJylcbiAgICAgICAgICB2YWx1ZSA9IHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdXG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcc10vZywgJycpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmF3QmVmb3JlQ29tbWVudCAocm9vdCwgbm9kZSkge1xuICAgIGxldCB2YWx1ZVxuICAgIHJvb3Qud2Fsa0NvbW1lbnRzKGkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBpLnJhd3MuYmVmb3JlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YWx1ZSA9IGkucmF3cy5iZWZvcmVcbiAgICAgICAgaWYgKHZhbHVlLmluZGV4T2YoJ1xcbicpICE9PSAtMSkge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXG5dKyQvLCAnJylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUsIG51bGwsICdiZWZvcmVEZWNsJylcbiAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxzXS9nLCAnJylcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdCZWZvcmVEZWNsIChyb290LCBub2RlKSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrRGVjbHMoaSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGkucmF3cy5iZWZvcmUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhbHVlID0gaS5yYXdzLmJlZm9yZVxuICAgICAgICBpZiAodmFsdWUuaW5kZXhPZignXFxuJykgIT09IC0xKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcbl0rJC8sICcnKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5yYXcobm9kZSwgbnVsbCwgJ2JlZm9yZVJ1bGUnKVxuICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXHNdL2csICcnKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0JlZm9yZVJ1bGUgKHJvb3QpIHtcbiAgICBsZXQgdmFsdWVcbiAgICByb290LndhbGsoaSA9PiB7XG4gICAgICBpZiAoaS5ub2RlcyAmJiAoaS5wYXJlbnQgIT09IHJvb3QgfHwgcm9vdC5maXJzdCAhPT0gaSkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpLnJhd3MuYmVmb3JlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHZhbHVlID0gaS5yYXdzLmJlZm9yZVxuICAgICAgICAgIGlmICh2YWx1ZS5pbmRleE9mKCdcXG4nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXG5dKyQvLCAnJylcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIGlmICh2YWx1ZSkgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcc10vZywgJycpXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdCZWZvcmVDbG9zZSAocm9vdCkge1xuICAgIGxldCB2YWx1ZVxuICAgIHJvb3Qud2FsayhpID0+IHtcbiAgICAgIGlmIChpLm5vZGVzICYmIGkubm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAodHlwZW9mIGkucmF3cy5hZnRlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB2YWx1ZSA9IGkucmF3cy5hZnRlclxuICAgICAgICAgIGlmICh2YWx1ZS5pbmRleE9mKCdcXG4nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXG5dKyQvLCAnJylcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIGlmICh2YWx1ZSkgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcc10vZywgJycpXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdCZWZvcmVPcGVuIChyb290KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrKGkgPT4ge1xuICAgICAgaWYgKGkudHlwZSAhPT0gJ2RlY2wnKSB7XG4gICAgICAgIHZhbHVlID0gaS5yYXdzLmJldHdlZW5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdDb2xvbiAocm9vdCkge1xuICAgIGxldCB2YWx1ZVxuICAgIHJvb3Qud2Fsa0RlY2xzKGkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBpLnJhd3MuYmV0d2VlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFsdWUgPSBpLnJhd3MuYmV0d2Vlbi5yZXBsYWNlKC9bXlxcczpdL2csICcnKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgYmVmb3JlQWZ0ZXIgKG5vZGUsIGRldGVjdCkge1xuICAgIGxldCB2YWx1ZVxuICAgIGlmIChub2RlLnR5cGUgPT09ICdkZWNsJykge1xuICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlRGVjbCcpXG4gICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdjb21tZW50Jykge1xuICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlQ29tbWVudCcpXG4gICAgfSBlbHNlIGlmIChkZXRlY3QgPT09ICdiZWZvcmUnKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUsIG51bGwsICdiZWZvcmVSdWxlJylcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlQ2xvc2UnKVxuICAgIH1cblxuICAgIGxldCBidWYgPSBub2RlLnBhcmVudFxuICAgIGxldCBkZXB0aCA9IDBcbiAgICB3aGlsZSAoYnVmICYmIGJ1Zi50eXBlICE9PSAncm9vdCcpIHtcbiAgICAgIGRlcHRoICs9IDFcbiAgICAgIGJ1ZiA9IGJ1Zi5wYXJlbnRcbiAgICB9XG5cbiAgICBpZiAodmFsdWUuaW5kZXhPZignXFxuJykgIT09IC0xKSB7XG4gICAgICBsZXQgaW5kZW50ID0gdGhpcy5yYXcobm9kZSwgbnVsbCwgJ2luZGVudCcpXG4gICAgICBpZiAoaW5kZW50Lmxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBzdGVwID0gMDsgc3RlcCA8IGRlcHRoOyBzdGVwKyspIHZhbHVlICs9IGluZGVudFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmF3VmFsdWUgKG5vZGUsIHByb3ApIHtcbiAgICBsZXQgdmFsdWUgPSBub2RlW3Byb3BdXG4gICAgbGV0IHJhdyA9IG5vZGUucmF3c1twcm9wXVxuICAgIGlmIChyYXcgJiYgcmF3LnZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHJhdy5yYXdcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdHJpbmdpZmllclxuIl0sImZpbGUiOiJzdHJpbmdpZmllci5qcyJ9


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/stringify.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/stringify.js ***!
  \****************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _stringifier = _interopRequireDefault(__webpack_require__(/*! ./stringifier */ "./node_modules/@linaria/server/node_modules/postcss/lib/stringifier.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringify(node, builder) {
  var str = new _stringifier.default(builder);
  str.stringify(node);
}

var _default = stringify;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmluZ2lmeS5lczYiXSwibmFtZXMiOlsic3RyaW5naWZ5Iiwibm9kZSIsImJ1aWxkZXIiLCJzdHIiLCJTdHJpbmdpZmllciJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUVBLFNBQVNBLFNBQVQsQ0FBb0JDLElBQXBCLEVBQTBCQyxPQUExQixFQUFtQztBQUNqQyxNQUFJQyxHQUFHLEdBQUcsSUFBSUMsb0JBQUosQ0FBZ0JGLE9BQWhCLENBQVY7QUFDQUMsRUFBQUEsR0FBRyxDQUFDSCxTQUFKLENBQWNDLElBQWQ7QUFDRDs7ZUFFY0QsUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHJpbmdpZmllciBmcm9tICcuL3N0cmluZ2lmaWVyJ1xuXG5mdW5jdGlvbiBzdHJpbmdpZnkgKG5vZGUsIGJ1aWxkZXIpIHtcbiAgbGV0IHN0ciA9IG5ldyBTdHJpbmdpZmllcihidWlsZGVyKVxuICBzdHIuc3RyaW5naWZ5KG5vZGUpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeVxuIl0sImZpbGUiOiJzdHJpbmdpZnkuanMifQ==


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/terminal-highlight.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/terminal-highlight.js ***!
  \*************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _chalk = _interopRequireDefault(__webpack_require__(/*! chalk */ "./node_modules/@linaria/server/node_modules/chalk/index.js"));

var _tokenize = _interopRequireDefault(__webpack_require__(/*! ./tokenize */ "./node_modules/@linaria/server/node_modules/postcss/lib/tokenize.js"));

var _input = _interopRequireDefault(__webpack_require__(/*! ./input */ "./node_modules/@linaria/server/node_modules/postcss/lib/input.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HIGHLIGHT_THEME = {
  'brackets': _chalk.default.cyan,
  'at-word': _chalk.default.cyan,
  'comment': _chalk.default.gray,
  'string': _chalk.default.green,
  'class': _chalk.default.yellow,
  'call': _chalk.default.cyan,
  'hash': _chalk.default.magenta,
  '(': _chalk.default.cyan,
  ')': _chalk.default.cyan,
  '{': _chalk.default.yellow,
  '}': _chalk.default.yellow,
  '[': _chalk.default.yellow,
  ']': _chalk.default.yellow,
  ':': _chalk.default.yellow,
  ';': _chalk.default.yellow
};

function getTokenType(_ref, processor) {
  var type = _ref[0],
      value = _ref[1];

  if (type === 'word') {
    if (value[0] === '.') {
      return 'class';
    }

    if (value[0] === '#') {
      return 'hash';
    }
  }

  if (!processor.endOfFile()) {
    var next = processor.nextToken();
    processor.back(next);
    if (next[0] === 'brackets' || next[0] === '(') return 'call';
  }

  return type;
}

function terminalHighlight(css) {
  var processor = (0, _tokenize.default)(new _input.default(css), {
    ignoreErrors: true
  });
  var result = '';

  var _loop = function _loop() {
    var token = processor.nextToken();
    var color = HIGHLIGHT_THEME[getTokenType(token, processor)];

    if (color) {
      result += token[1].split(/\r?\n/).map(function (i) {
        return color(i);
      }).join('\n');
    } else {
      result += token[1];
    }
  };

  while (!processor.endOfFile()) {
    _loop();
  }

  return result;
}

var _default = terminalHighlight;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlcm1pbmFsLWhpZ2hsaWdodC5lczYiXSwibmFtZXMiOlsiSElHSExJR0hUX1RIRU1FIiwiY2hhbGsiLCJjeWFuIiwiZ3JheSIsImdyZWVuIiwieWVsbG93IiwibWFnZW50YSIsImdldFRva2VuVHlwZSIsInByb2Nlc3NvciIsInR5cGUiLCJ2YWx1ZSIsImVuZE9mRmlsZSIsIm5leHQiLCJuZXh0VG9rZW4iLCJiYWNrIiwidGVybWluYWxIaWdobGlnaHQiLCJjc3MiLCJJbnB1dCIsImlnbm9yZUVycm9ycyIsInJlc3VsdCIsInRva2VuIiwiY29sb3IiLCJzcGxpdCIsIm1hcCIsImkiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOztBQUNBOzs7O0FBRUEsSUFBTUEsZUFBZSxHQUFHO0FBQ3RCLGNBQVlDLGVBQU1DLElBREk7QUFFdEIsYUFBV0QsZUFBTUMsSUFGSztBQUd0QixhQUFXRCxlQUFNRSxJQUhLO0FBSXRCLFlBQVVGLGVBQU1HLEtBSk07QUFLdEIsV0FBU0gsZUFBTUksTUFMTztBQU10QixVQUFRSixlQUFNQyxJQU5RO0FBT3RCLFVBQVFELGVBQU1LLE9BUFE7QUFRdEIsT0FBS0wsZUFBTUMsSUFSVztBQVN0QixPQUFLRCxlQUFNQyxJQVRXO0FBVXRCLE9BQUtELGVBQU1JLE1BVlc7QUFXdEIsT0FBS0osZUFBTUksTUFYVztBQVl0QixPQUFLSixlQUFNSSxNQVpXO0FBYXRCLE9BQUtKLGVBQU1JLE1BYlc7QUFjdEIsT0FBS0osZUFBTUksTUFkVztBQWV0QixPQUFLSixlQUFNSTtBQWZXLENBQXhCOztBQWtCQSxTQUFTRSxZQUFULE9BQXNDQyxTQUF0QyxFQUFpRDtBQUFBLE1BQXpCQyxJQUF5QjtBQUFBLE1BQW5CQyxLQUFtQjs7QUFDL0MsTUFBSUQsSUFBSSxLQUFLLE1BQWIsRUFBcUI7QUFDbkIsUUFBSUMsS0FBSyxDQUFDLENBQUQsQ0FBTCxLQUFhLEdBQWpCLEVBQXNCO0FBQ3BCLGFBQU8sT0FBUDtBQUNEOztBQUNELFFBQUlBLEtBQUssQ0FBQyxDQUFELENBQUwsS0FBYSxHQUFqQixFQUFzQjtBQUNwQixhQUFPLE1BQVA7QUFDRDtBQUNGOztBQUVELE1BQUksQ0FBQ0YsU0FBUyxDQUFDRyxTQUFWLEVBQUwsRUFBNEI7QUFDMUIsUUFBSUMsSUFBSSxHQUFHSixTQUFTLENBQUNLLFNBQVYsRUFBWDtBQUNBTCxJQUFBQSxTQUFTLENBQUNNLElBQVYsQ0FBZUYsSUFBZjtBQUNBLFFBQUlBLElBQUksQ0FBQyxDQUFELENBQUosS0FBWSxVQUFaLElBQTBCQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEtBQVksR0FBMUMsRUFBK0MsT0FBTyxNQUFQO0FBQ2hEOztBQUVELFNBQU9ILElBQVA7QUFDRDs7QUFFRCxTQUFTTSxpQkFBVCxDQUE0QkMsR0FBNUIsRUFBaUM7QUFDL0IsTUFBSVIsU0FBUyxHQUFHLHVCQUFVLElBQUlTLGNBQUosQ0FBVUQsR0FBVixDQUFWLEVBQTBCO0FBQUVFLElBQUFBLFlBQVksRUFBRTtBQUFoQixHQUExQixDQUFoQjtBQUNBLE1BQUlDLE1BQU0sR0FBRyxFQUFiOztBQUYrQjtBQUk3QixRQUFJQyxLQUFLLEdBQUdaLFNBQVMsQ0FBQ0ssU0FBVixFQUFaO0FBQ0EsUUFBSVEsS0FBSyxHQUFHckIsZUFBZSxDQUFDTyxZQUFZLENBQUNhLEtBQUQsRUFBUVosU0FBUixDQUFiLENBQTNCOztBQUNBLFFBQUlhLEtBQUosRUFBVztBQUNURixNQUFBQSxNQUFNLElBQUlDLEtBQUssQ0FBQyxDQUFELENBQUwsQ0FBU0UsS0FBVCxDQUFlLE9BQWYsRUFDUEMsR0FETyxDQUNILFVBQUFDLENBQUM7QUFBQSxlQUFJSCxLQUFLLENBQUNHLENBQUQsQ0FBVDtBQUFBLE9BREUsRUFFUEMsSUFGTyxDQUVGLElBRkUsQ0FBVjtBQUdELEtBSkQsTUFJTztBQUNMTixNQUFBQSxNQUFNLElBQUlDLEtBQUssQ0FBQyxDQUFELENBQWY7QUFDRDtBQVo0Qjs7QUFHL0IsU0FBTyxDQUFDWixTQUFTLENBQUNHLFNBQVYsRUFBUixFQUErQjtBQUFBO0FBVTlCOztBQUNELFNBQU9RLE1BQVA7QUFDRDs7ZUFFY0osaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5cbmltcG9ydCB0b2tlbml6ZXIgZnJvbSAnLi90b2tlbml6ZSdcbmltcG9ydCBJbnB1dCBmcm9tICcuL2lucHV0J1xuXG5jb25zdCBISUdITElHSFRfVEhFTUUgPSB7XG4gICdicmFja2V0cyc6IGNoYWxrLmN5YW4sXG4gICdhdC13b3JkJzogY2hhbGsuY3lhbixcbiAgJ2NvbW1lbnQnOiBjaGFsay5ncmF5LFxuICAnc3RyaW5nJzogY2hhbGsuZ3JlZW4sXG4gICdjbGFzcyc6IGNoYWxrLnllbGxvdyxcbiAgJ2NhbGwnOiBjaGFsay5jeWFuLFxuICAnaGFzaCc6IGNoYWxrLm1hZ2VudGEsXG4gICcoJzogY2hhbGsuY3lhbixcbiAgJyknOiBjaGFsay5jeWFuLFxuICAneyc6IGNoYWxrLnllbGxvdyxcbiAgJ30nOiBjaGFsay55ZWxsb3csXG4gICdbJzogY2hhbGsueWVsbG93LFxuICAnXSc6IGNoYWxrLnllbGxvdyxcbiAgJzonOiBjaGFsay55ZWxsb3csXG4gICc7JzogY2hhbGsueWVsbG93XG59XG5cbmZ1bmN0aW9uIGdldFRva2VuVHlwZSAoW3R5cGUsIHZhbHVlXSwgcHJvY2Vzc29yKSB7XG4gIGlmICh0eXBlID09PSAnd29yZCcpIHtcbiAgICBpZiAodmFsdWVbMF0gPT09ICcuJykge1xuICAgICAgcmV0dXJuICdjbGFzcydcbiAgICB9XG4gICAgaWYgKHZhbHVlWzBdID09PSAnIycpIHtcbiAgICAgIHJldHVybiAnaGFzaCdcbiAgICB9XG4gIH1cblxuICBpZiAoIXByb2Nlc3Nvci5lbmRPZkZpbGUoKSkge1xuICAgIGxldCBuZXh0ID0gcHJvY2Vzc29yLm5leHRUb2tlbigpXG4gICAgcHJvY2Vzc29yLmJhY2sobmV4dClcbiAgICBpZiAobmV4dFswXSA9PT0gJ2JyYWNrZXRzJyB8fCBuZXh0WzBdID09PSAnKCcpIHJldHVybiAnY2FsbCdcbiAgfVxuXG4gIHJldHVybiB0eXBlXG59XG5cbmZ1bmN0aW9uIHRlcm1pbmFsSGlnaGxpZ2h0IChjc3MpIHtcbiAgbGV0IHByb2Nlc3NvciA9IHRva2VuaXplcihuZXcgSW5wdXQoY3NzKSwgeyBpZ25vcmVFcnJvcnM6IHRydWUgfSlcbiAgbGV0IHJlc3VsdCA9ICcnXG4gIHdoaWxlICghcHJvY2Vzc29yLmVuZE9mRmlsZSgpKSB7XG4gICAgbGV0IHRva2VuID0gcHJvY2Vzc29yLm5leHRUb2tlbigpXG4gICAgbGV0IGNvbG9yID0gSElHSExJR0hUX1RIRU1FW2dldFRva2VuVHlwZSh0b2tlbiwgcHJvY2Vzc29yKV1cbiAgICBpZiAoY29sb3IpIHtcbiAgICAgIHJlc3VsdCArPSB0b2tlblsxXS5zcGxpdCgvXFxyP1xcbi8pXG4gICAgICAgIC5tYXAoaSA9PiBjb2xvcihpKSlcbiAgICAgICAgLmpvaW4oJ1xcbicpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCArPSB0b2tlblsxXVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRlcm1pbmFsSGlnaGxpZ2h0XG4iXSwiZmlsZSI6InRlcm1pbmFsLWhpZ2hsaWdodC5qcyJ9


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/tokenize.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/tokenize.js ***!
  \***************************************************************************/
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports.default = tokenizer;
var SINGLE_QUOTE = '\''.charCodeAt(0);
var DOUBLE_QUOTE = '"'.charCodeAt(0);
var BACKSLASH = '\\'.charCodeAt(0);
var SLASH = '/'.charCodeAt(0);
var NEWLINE = '\n'.charCodeAt(0);
var SPACE = ' '.charCodeAt(0);
var FEED = '\f'.charCodeAt(0);
var TAB = '\t'.charCodeAt(0);
var CR = '\r'.charCodeAt(0);
var OPEN_SQUARE = '['.charCodeAt(0);
var CLOSE_SQUARE = ']'.charCodeAt(0);
var OPEN_PARENTHESES = '('.charCodeAt(0);
var CLOSE_PARENTHESES = ')'.charCodeAt(0);
var OPEN_CURLY = '{'.charCodeAt(0);
var CLOSE_CURLY = '}'.charCodeAt(0);
var SEMICOLON = ';'.charCodeAt(0);
var ASTERISK = '*'.charCodeAt(0);
var COLON = ':'.charCodeAt(0);
var AT = '@'.charCodeAt(0);
var RE_AT_END = /[ \n\t\r\f{}()'"\\;/[\]#]/g;
var RE_WORD_END = /[ \n\t\r\f(){}:;@!'"\\\][#]|\/(?=\*)/g;
var RE_BAD_BRACKET = /.[\\/("'\n]/;
var RE_HEX_ESCAPE = /[a-f0-9]/i;

function tokenizer(input, options) {
  if (options === void 0) {
    options = {};
  }

  var css = input.css.valueOf();
  var ignore = options.ignoreErrors;
  var code, next, quote, lines, last, content, escape;
  var nextLine, nextOffset, escaped, escapePos, prev, n, currentToken;
  var length = css.length;
  var offset = -1;
  var line = 1;
  var pos = 0;
  var buffer = [];
  var returned = [];

  function position() {
    return pos;
  }

  function unclosed(what) {
    throw input.error('Unclosed ' + what, line, pos - offset);
  }

  function endOfFile() {
    return returned.length === 0 && pos >= length;
  }

  function nextToken(opts) {
    if (returned.length) return returned.pop();
    if (pos >= length) return;
    var ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
    code = css.charCodeAt(pos);

    if (code === NEWLINE || code === FEED || code === CR && css.charCodeAt(pos + 1) !== NEWLINE) {
      offset = pos;
      line += 1;
    }

    switch (code) {
      case NEWLINE:
      case SPACE:
      case TAB:
      case CR:
      case FEED:
        next = pos;

        do {
          next += 1;
          code = css.charCodeAt(next);

          if (code === NEWLINE) {
            offset = next;
            line += 1;
          }
        } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);

        currentToken = ['space', css.slice(pos, next)];
        pos = next - 1;
        break;

      case OPEN_SQUARE:
      case CLOSE_SQUARE:
      case OPEN_CURLY:
      case CLOSE_CURLY:
      case COLON:
      case SEMICOLON:
      case CLOSE_PARENTHESES:
        var controlChar = String.fromCharCode(code);
        currentToken = [controlChar, controlChar, line, pos - offset];
        break;

      case OPEN_PARENTHESES:
        prev = buffer.length ? buffer.pop()[1] : '';
        n = css.charCodeAt(pos + 1);

        if (prev === 'url' && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
          next = pos;

          do {
            escaped = false;
            next = css.indexOf(')', next + 1);

            if (next === -1) {
              if (ignore || ignoreUnclosed) {
                next = pos;
                break;
              } else {
                unclosed('bracket');
              }
            }

            escapePos = next;

            while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
              escapePos -= 1;
              escaped = !escaped;
            }
          } while (escaped);

          currentToken = ['brackets', css.slice(pos, next + 1), line, pos - offset, line, next - offset];
          pos = next;
        } else {
          next = css.indexOf(')', pos + 1);
          content = css.slice(pos, next + 1);

          if (next === -1 || RE_BAD_BRACKET.test(content)) {
            currentToken = ['(', '(', line, pos - offset];
          } else {
            currentToken = ['brackets', content, line, pos - offset, line, next - offset];
            pos = next;
          }
        }

        break;

      case SINGLE_QUOTE:
      case DOUBLE_QUOTE:
        quote = code === SINGLE_QUOTE ? '\'' : '"';
        next = pos;

        do {
          escaped = false;
          next = css.indexOf(quote, next + 1);

          if (next === -1) {
            if (ignore || ignoreUnclosed) {
              next = pos + 1;
              break;
            } else {
              unclosed('string');
            }
          }

          escapePos = next;

          while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
            escapePos -= 1;
            escaped = !escaped;
          }
        } while (escaped);

        content = css.slice(pos, next + 1);
        lines = content.split('\n');
        last = lines.length - 1;

        if (last > 0) {
          nextLine = line + last;
          nextOffset = next - lines[last].length;
        } else {
          nextLine = line;
          nextOffset = offset;
        }

        currentToken = ['string', css.slice(pos, next + 1), line, pos - offset, nextLine, next - nextOffset];
        offset = nextOffset;
        line = nextLine;
        pos = next;
        break;

      case AT:
        RE_AT_END.lastIndex = pos + 1;
        RE_AT_END.test(css);

        if (RE_AT_END.lastIndex === 0) {
          next = css.length - 1;
        } else {
          next = RE_AT_END.lastIndex - 2;
        }

        currentToken = ['at-word', css.slice(pos, next + 1), line, pos - offset, line, next - offset];
        pos = next;
        break;

      case BACKSLASH:
        next = pos;
        escape = true;

        while (css.charCodeAt(next + 1) === BACKSLASH) {
          next += 1;
          escape = !escape;
        }

        code = css.charCodeAt(next + 1);

        if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
          next += 1;

          if (RE_HEX_ESCAPE.test(css.charAt(next))) {
            while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
              next += 1;
            }

            if (css.charCodeAt(next + 1) === SPACE) {
              next += 1;
            }
          }
        }

        currentToken = ['word', css.slice(pos, next + 1), line, pos - offset, line, next - offset];
        pos = next;
        break;

      default:
        if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
          next = css.indexOf('*/', pos + 2) + 1;

          if (next === 0) {
            if (ignore || ignoreUnclosed) {
              next = css.length;
            } else {
              unclosed('comment');
            }
          }

          content = css.slice(pos, next + 1);
          lines = content.split('\n');
          last = lines.length - 1;

          if (last > 0) {
            nextLine = line + last;
            nextOffset = next - lines[last].length;
          } else {
            nextLine = line;
            nextOffset = offset;
          }

          currentToken = ['comment', content, line, pos - offset, nextLine, next - nextOffset];
          offset = nextOffset;
          line = nextLine;
          pos = next;
        } else {
          RE_WORD_END.lastIndex = pos + 1;
          RE_WORD_END.test(css);

          if (RE_WORD_END.lastIndex === 0) {
            next = css.length - 1;
          } else {
            next = RE_WORD_END.lastIndex - 2;
          }

          currentToken = ['word', css.slice(pos, next + 1), line, pos - offset, line, next - offset];
          buffer.push(currentToken);
          pos = next;
        }

        break;
    }

    pos++;
    return currentToken;
  }

  function back(token) {
    returned.push(token);
  }

  return {
    back: back,
    nextToken: nextToken,
    endOfFile: endOfFile,
    position: position
  };
}

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRva2VuaXplLmVzNiJdLCJuYW1lcyI6WyJTSU5HTEVfUVVPVEUiLCJjaGFyQ29kZUF0IiwiRE9VQkxFX1FVT1RFIiwiQkFDS1NMQVNIIiwiU0xBU0giLCJORVdMSU5FIiwiU1BBQ0UiLCJGRUVEIiwiVEFCIiwiQ1IiLCJPUEVOX1NRVUFSRSIsIkNMT1NFX1NRVUFSRSIsIk9QRU5fUEFSRU5USEVTRVMiLCJDTE9TRV9QQVJFTlRIRVNFUyIsIk9QRU5fQ1VSTFkiLCJDTE9TRV9DVVJMWSIsIlNFTUlDT0xPTiIsIkFTVEVSSVNLIiwiQ09MT04iLCJBVCIsIlJFX0FUX0VORCIsIlJFX1dPUkRfRU5EIiwiUkVfQkFEX0JSQUNLRVQiLCJSRV9IRVhfRVNDQVBFIiwidG9rZW5pemVyIiwiaW5wdXQiLCJvcHRpb25zIiwiY3NzIiwidmFsdWVPZiIsImlnbm9yZSIsImlnbm9yZUVycm9ycyIsImNvZGUiLCJuZXh0IiwicXVvdGUiLCJsaW5lcyIsImxhc3QiLCJjb250ZW50IiwiZXNjYXBlIiwibmV4dExpbmUiLCJuZXh0T2Zmc2V0IiwiZXNjYXBlZCIsImVzY2FwZVBvcyIsInByZXYiLCJuIiwiY3VycmVudFRva2VuIiwibGVuZ3RoIiwib2Zmc2V0IiwibGluZSIsInBvcyIsImJ1ZmZlciIsInJldHVybmVkIiwicG9zaXRpb24iLCJ1bmNsb3NlZCIsIndoYXQiLCJlcnJvciIsImVuZE9mRmlsZSIsIm5leHRUb2tlbiIsIm9wdHMiLCJwb3AiLCJpZ25vcmVVbmNsb3NlZCIsInNsaWNlIiwiY29udHJvbENoYXIiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJpbmRleE9mIiwidGVzdCIsInNwbGl0IiwibGFzdEluZGV4IiwiY2hhckF0IiwicHVzaCIsImJhY2siLCJ0b2tlbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQU1BLFlBQVksR0FBRyxLQUFLQyxVQUFMLENBQWdCLENBQWhCLENBQXJCO0FBQ0EsSUFBTUMsWUFBWSxHQUFHLElBQUlELFVBQUosQ0FBZSxDQUFm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LElBQVQsQ0FBZUMsS0FBZixFQUFzQjtBQUNwQnJCLElBQUFBLFFBQVEsQ0FBQ21CLElBQVQsQ0FBY0UsS0FBZDtBQUNEOztBQUVELFNBQU87QUFDTEQsSUFBQUEsSUFBSSxFQUFKQSxJQURLO0FBRUxkLElBQUFBLFNBQVMsRUFBVEEsU0FGSztBQUdMRCxJQUFBQSxTQUFTLEVBQVRBLFNBSEs7QUFJTEosSUFBQUEsUUFBUSxFQUFSQTtBQUpLLEdBQVA7QUFNRCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFNJTkdMRV9RVU9URSA9ICdcXCcnLmNoYXJDb2RlQXQoMClcbmNvbnN0IERPVUJMRV9RVU9URSA9ICdcIicuY2hhckNvZGVBdCgwKVxuY29uc3QgQkFDS1NMQVNIID0gJ1xcXFwnLmNoYXJDb2RlQXQoMClcbmNvbnN0IFNMQVNIID0gJy8nLmNoYXJDb2RlQXQoMClcbmNvbnN0IE5FV0xJTkUgPSAnXFxuJy5jaGFyQ29kZUF0KDApXG5jb25zdCBTUEFDRSA9ICcgJy5jaGFyQ29kZUF0KDApXG5jb25zdCBGRUVEID0gJ1xcZicuY2hhckNvZGVBdCgwKVxuY29uc3QgVEFCID0gJ1xcdCcuY2hhckNvZGVBdCgwKVxuY29uc3QgQ1IgPSAnXFxyJy5jaGFyQ29kZUF0KDApXG5jb25zdCBPUEVOX1NRVUFSRSA9ICdbJy5jaGFyQ29kZUF0KDApXG5jb25zdCBDTE9TRV9TUVVBUkUgPSAnXScuY2hhckNvZGVBdCgwKVxuY29uc3QgT1BFTl9QQVJFTlRIRVNFUyA9ICcoJy5jaGFyQ29kZUF0KDApXG5jb25zdCBDTE9TRV9QQVJFTlRIRVNFUyA9ICcpJy5jaGFyQ29kZUF0KDApXG5jb25zdCBPUEVOX0NVUkxZID0gJ3snLmNoYXJDb2RlQXQoMClcbmNvbnN0IENMT1NFX0NVUkxZID0gJ30nLmNoYXJDb2RlQXQoMClcbmNvbnN0IFNFTUlDT0xPTiA9ICc7Jy5jaGFyQ29kZUF0KDApXG5jb25zdCBBU1RFUklTSyA9ICcqJy5jaGFyQ29kZUF0KDApXG5jb25zdCBDT0xPTiA9ICc6Jy5jaGFyQ29kZUF0KDApXG5jb25zdCBBVCA9ICdAJy5jaGFyQ29kZUF0KDApXG5cbmNvbnN0IFJFX0FUX0VORCA9IC9bIFxcblxcdFxcclxcZnt9KCknXCJcXFxcOy9bXFxdI10vZ1xuY29uc3QgUkVfV09SRF9FTkQgPSAvWyBcXG5cXHRcXHJcXGYoKXt9OjtAISdcIlxcXFxcXF1bI118XFwvKD89XFwqKS9nXG5jb25zdCBSRV9CQURfQlJBQ0tFVCA9IC8uW1xcXFwvKFwiJ1xcbl0vXG5jb25zdCBSRV9IRVhfRVNDQVBFID0gL1thLWYwLTldL2lcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9rZW5pemVyIChpbnB1dCwgb3B0aW9ucyA9IHt9KSB7XG4gIGxldCBjc3MgPSBpbnB1dC5jc3MudmFsdWVPZigpXG4gIGxldCBpZ25vcmUgPSBvcHRpb25zLmlnbm9yZUVycm9yc1xuXG4gIGxldCBjb2RlLCBuZXh0LCBxdW90ZSwgbGluZXMsIGxhc3QsIGNvbnRlbnQsIGVzY2FwZVxuICBsZXQgbmV4dExpbmUsIG5leHRPZmZzZXQsIGVzY2FwZWQsIGVzY2FwZVBvcywgcHJldiwgbiwgY3VycmVudFRva2VuXG5cbiAgbGV0IGxlbmd0aCA9IGNzcy5sZW5ndGhcbiAgbGV0IG9mZnNldCA9IC0xXG4gIGxldCBsaW5lID0gMVxuICBsZXQgcG9zID0gMFxuICBsZXQgYnVmZmVyID0gW11cbiAgbGV0IHJldHVybmVkID0gW11cblxuICBmdW5jdGlvbiBwb3NpdGlvbiAoKSB7XG4gICAgcmV0dXJuIHBvc1xuICB9XG5cbiAgZnVuY3Rpb24gdW5jbG9zZWQgKHdoYXQpIHtcbiAgICB0aHJvdyBpbnB1dC5lcnJvcignVW5jbG9zZWQgJyArIHdoYXQsIGxpbmUsIHBvcyAtIG9mZnNldClcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZE9mRmlsZSAoKSB7XG4gICAgcmV0dXJuIHJldHVybmVkLmxlbmd0aCA9PT0gMCAmJiBwb3MgPj0gbGVuZ3RoXG4gIH1cblxuICBmdW5jdGlvbiBuZXh0VG9rZW4gKG9wdHMpIHtcbiAgICBpZiAocmV0dXJuZWQubGVuZ3RoKSByZXR1cm4gcmV0dXJuZWQucG9wKClcbiAgICBpZiAocG9zID49IGxlbmd0aCkgcmV0dXJuXG5cbiAgICBsZXQgaWdub3JlVW5jbG9zZWQgPSBvcHRzID8gb3B0cy5pZ25vcmVVbmNsb3NlZCA6IGZhbHNlXG5cbiAgICBjb2RlID0gY3NzLmNoYXJDb2RlQXQocG9zKVxuICAgIGlmIChcbiAgICAgIGNvZGUgPT09IE5FV0xJTkUgfHwgY29kZSA9PT0gRkVFRCB8fFxuICAgICAgKGNvZGUgPT09IENSICYmIGNzcy5jaGFyQ29kZUF0KHBvcyArIDEpICE9PSBORVdMSU5FKVxuICAgICkge1xuICAgICAgb2Zmc2V0ID0gcG9zXG4gICAgICBsaW5lICs9IDFcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgIGNhc2UgTkVXTElORTpcbiAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICBjYXNlIFRBQjpcbiAgICAgIGNhc2UgQ1I6XG4gICAgICBjYXNlIEZFRUQ6XG4gICAgICAgIG5leHQgPSBwb3NcbiAgICAgICAgZG8ge1xuICAgICAgICAgIG5leHQgKz0gMVxuICAgICAgICAgIGNvZGUgPSBjc3MuY2hhckNvZGVBdChuZXh0KVxuICAgICAgICAgIGlmIChjb2RlID09PSBORVdMSU5FKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSBuZXh0XG4gICAgICAgICAgICBsaW5lICs9IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKFxuICAgICAgICAgIGNvZGUgPT09IFNQQUNFIHx8XG4gICAgICAgICAgY29kZSA9PT0gTkVXTElORSB8fFxuICAgICAgICAgIGNvZGUgPT09IFRBQiB8fFxuICAgICAgICAgIGNvZGUgPT09IENSIHx8XG4gICAgICAgICAgY29kZSA9PT0gRkVFRFxuICAgICAgICApXG5cbiAgICAgICAgY3VycmVudFRva2VuID0gWydzcGFjZScsIGNzcy5zbGljZShwb3MsIG5leHQpXVxuICAgICAgICBwb3MgPSBuZXh0IC0gMVxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlIE9QRU5fU1FVQVJFOlxuICAgICAgY2FzZSBDTE9TRV9TUVVBUkU6XG4gICAgICBjYXNlIE9QRU5fQ1VSTFk6XG4gICAgICBjYXNlIENMT1NFX0NVUkxZOlxuICAgICAgY2FzZSBDT0xPTjpcbiAgICAgIGNhc2UgU0VNSUNPTE9OOlxuICAgICAgY2FzZSBDTE9TRV9QQVJFTlRIRVNFUzpcbiAgICAgICAgbGV0IGNvbnRyb2xDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKVxuICAgICAgICBjdXJyZW50VG9rZW4gPSBbY29udHJvbENoYXIsIGNvbnRyb2xDaGFyLCBsaW5lLCBwb3MgLSBvZmZzZXRdXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgT1BFTl9QQVJFTlRIRVNFUzpcbiAgICAgICAgcHJldiA9IGJ1ZmZlci5sZW5ndGggPyBidWZmZXIucG9wKClbMV0gOiAnJ1xuICAgICAgICBuID0gY3NzLmNoYXJDb2RlQXQocG9zICsgMSlcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByZXYgPT09ICd1cmwnICYmXG4gICAgICAgICAgbiAhPT0gU0lOR0xFX1FVT1RFICYmIG4gIT09IERPVUJMRV9RVU9URSAmJlxuICAgICAgICAgIG4gIT09IFNQQUNFICYmIG4gIT09IE5FV0xJTkUgJiYgbiAhPT0gVEFCICYmXG4gICAgICAgICAgbiAhPT0gRkVFRCAmJiBuICE9PSBDUlxuICAgICAgICApIHtcbiAgICAgICAgICBuZXh0ID0gcG9zXG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgZXNjYXBlZCA9IGZhbHNlXG4gICAgICAgICAgICBuZXh0ID0gY3NzLmluZGV4T2YoJyknLCBuZXh0ICsgMSlcbiAgICAgICAgICAgIGlmIChuZXh0ID09PSAtMSkge1xuICAgICAgICAgICAgICBpZiAoaWdub3JlIHx8IGlnbm9yZVVuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgbmV4dCA9IHBvc1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdW5jbG9zZWQoJ2JyYWNrZXQnKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlc2NhcGVQb3MgPSBuZXh0XG4gICAgICAgICAgICB3aGlsZSAoY3NzLmNoYXJDb2RlQXQoZXNjYXBlUG9zIC0gMSkgPT09IEJBQ0tTTEFTSCkge1xuICAgICAgICAgICAgICBlc2NhcGVQb3MgLT0gMVxuICAgICAgICAgICAgICBlc2NhcGVkID0gIWVzY2FwZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IHdoaWxlIChlc2NhcGVkKVxuXG4gICAgICAgICAgY3VycmVudFRva2VuID0gWydicmFja2V0cycsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSxcbiAgICAgICAgICAgIGxpbmUsIHBvcyAtIG9mZnNldCxcbiAgICAgICAgICAgIGxpbmUsIG5leHQgLSBvZmZzZXRcbiAgICAgICAgICBdXG5cbiAgICAgICAgICBwb3MgPSBuZXh0XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV4dCA9IGNzcy5pbmRleE9mKCcpJywgcG9zICsgMSlcbiAgICAgICAgICBjb250ZW50ID0gY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpXG5cbiAgICAgICAgICBpZiAobmV4dCA9PT0gLTEgfHwgUkVfQkFEX0JSQUNLRVQudGVzdChjb250ZW50KSkge1xuICAgICAgICAgICAgY3VycmVudFRva2VuID0gWycoJywgJygnLCBsaW5lLCBwb3MgLSBvZmZzZXRdXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnYnJhY2tldHMnLCBjb250ZW50LFxuICAgICAgICAgICAgICBsaW5lLCBwb3MgLSBvZmZzZXQsXG4gICAgICAgICAgICAgIGxpbmUsIG5leHQgLSBvZmZzZXRcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlIFNJTkdMRV9RVU9URTpcbiAgICAgIGNhc2UgRE9VQkxFX1FVT1RFOlxuICAgICAgICBxdW90ZSA9IGNvZGUgPT09IFNJTkdMRV9RVU9URSA/ICdcXCcnIDogJ1wiJ1xuICAgICAgICBuZXh0ID0gcG9zXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBlc2NhcGVkID0gZmFsc2VcbiAgICAgICAgICBuZXh0ID0gY3NzLmluZGV4T2YocXVvdGUsIG5leHQgKyAxKVxuICAgICAgICAgIGlmIChuZXh0ID09PSAtMSkge1xuICAgICAgICAgICAgaWYgKGlnbm9yZSB8fCBpZ25vcmVVbmNsb3NlZCkge1xuICAgICAgICAgICAgICBuZXh0ID0gcG9zICsgMVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdW5jbG9zZWQoJ3N0cmluZycpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVzY2FwZVBvcyA9IG5leHRcbiAgICAgICAgICB3aGlsZSAoY3NzLmNoYXJDb2RlQXQoZXNjYXBlUG9zIC0gMSkgPT09IEJBQ0tTTEFTSCkge1xuICAgICAgICAgICAgZXNjYXBlUG9zIC09IDFcbiAgICAgICAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZFxuICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoZXNjYXBlZClcblxuICAgICAgICBjb250ZW50ID0gY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpXG4gICAgICAgIGxpbmVzID0gY29udGVudC5zcGxpdCgnXFxuJylcbiAgICAgICAgbGFzdCA9IGxpbmVzLmxlbmd0aCAtIDFcblxuICAgICAgICBpZiAobGFzdCA+IDApIHtcbiAgICAgICAgICBuZXh0TGluZSA9IGxpbmUgKyBsYXN0XG4gICAgICAgICAgbmV4dE9mZnNldCA9IG5leHQgLSBsaW5lc1tsYXN0XS5sZW5ndGhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0TGluZSA9IGxpbmVcbiAgICAgICAgICBuZXh0T2Zmc2V0ID0gb2Zmc2V0XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50VG9rZW4gPSBbJ3N0cmluZycsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSxcbiAgICAgICAgICBsaW5lLCBwb3MgLSBvZmZzZXQsXG4gICAgICAgICAgbmV4dExpbmUsIG5leHQgLSBuZXh0T2Zmc2V0XG4gICAgICAgIF1cblxuICAgICAgICBvZmZzZXQgPSBuZXh0T2Zmc2V0XG4gICAgICAgIGxpbmUgPSBuZXh0TGluZVxuICAgICAgICBwb3MgPSBuZXh0XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgQVQ6XG4gICAgICAgIFJFX0FUX0VORC5sYXN0SW5kZXggPSBwb3MgKyAxXG4gICAgICAgIFJFX0FUX0VORC50ZXN0KGNzcylcbiAgICAgICAgaWYgKFJFX0FUX0VORC5sYXN0SW5kZXggPT09IDApIHtcbiAgICAgICAgICBuZXh0ID0gY3NzLmxlbmd0aCAtIDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0ID0gUkVfQVRfRU5ELmxhc3RJbmRleCAtIDJcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnYXQtd29yZCcsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSxcbiAgICAgICAgICBsaW5lLCBwb3MgLSBvZmZzZXQsXG4gICAgICAgICAgbGluZSwgbmV4dCAtIG9mZnNldFxuICAgICAgICBdXG5cbiAgICAgICAgcG9zID0gbmV4dFxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlIEJBQ0tTTEFTSDpcbiAgICAgICAgbmV4dCA9IHBvc1xuICAgICAgICBlc2NhcGUgPSB0cnVlXG4gICAgICAgIHdoaWxlIChjc3MuY2hhckNvZGVBdChuZXh0ICsgMSkgPT09IEJBQ0tTTEFTSCkge1xuICAgICAgICAgIG5leHQgKz0gMVxuICAgICAgICAgIGVzY2FwZSA9ICFlc2NhcGVcbiAgICAgICAgfVxuICAgICAgICBjb2RlID0gY3NzLmNoYXJDb2RlQXQobmV4dCArIDEpXG4gICAgICAgIGlmIChcbiAgICAgICAgICBlc2NhcGUgJiZcbiAgICAgICAgICBjb2RlICE9PSBTTEFTSCAmJlxuICAgICAgICAgIGNvZGUgIT09IFNQQUNFICYmXG4gICAgICAgICAgY29kZSAhPT0gTkVXTElORSAmJlxuICAgICAgICAgIGNvZGUgIT09IFRBQiAmJlxuICAgICAgICAgIGNvZGUgIT09IENSICYmXG4gICAgICAgICAgY29kZSAhPT0gRkVFRFxuICAgICAgICApIHtcbiAgICAgICAgICBuZXh0ICs9IDFcbiAgICAgICAgICBpZiAoUkVfSEVYX0VTQ0FQRS50ZXN0KGNzcy5jaGFyQXQobmV4dCkpKSB7XG4gICAgICAgICAgICB3aGlsZSAoUkVfSEVYX0VTQ0FQRS50ZXN0KGNzcy5jaGFyQXQobmV4dCArIDEpKSkge1xuICAgICAgICAgICAgICBuZXh0ICs9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjc3MuY2hhckNvZGVBdChuZXh0ICsgMSkgPT09IFNQQUNFKSB7XG4gICAgICAgICAgICAgIG5leHQgKz0gMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnd29yZCcsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSxcbiAgICAgICAgICBsaW5lLCBwb3MgLSBvZmZzZXQsXG4gICAgICAgICAgbGluZSwgbmV4dCAtIG9mZnNldFxuICAgICAgICBdXG5cbiAgICAgICAgcG9zID0gbmV4dFxuICAgICAgICBicmVha1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoY29kZSA9PT0gU0xBU0ggJiYgY3NzLmNoYXJDb2RlQXQocG9zICsgMSkgPT09IEFTVEVSSVNLKSB7XG4gICAgICAgICAgbmV4dCA9IGNzcy5pbmRleE9mKCcqLycsIHBvcyArIDIpICsgMVxuICAgICAgICAgIGlmIChuZXh0ID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoaWdub3JlIHx8IGlnbm9yZVVuY2xvc2VkKSB7XG4gICAgICAgICAgICAgIG5leHQgPSBjc3MubGVuZ3RoXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB1bmNsb3NlZCgnY29tbWVudCcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGVudCA9IGNzcy5zbGljZShwb3MsIG5leHQgKyAxKVxuICAgICAgICAgIGxpbmVzID0gY29udGVudC5zcGxpdCgnXFxuJylcbiAgICAgICAgICBsYXN0ID0gbGluZXMubGVuZ3RoIC0gMVxuXG4gICAgICAgICAgaWYgKGxhc3QgPiAwKSB7XG4gICAgICAgICAgICBuZXh0TGluZSA9IGxpbmUgKyBsYXN0XG4gICAgICAgICAgICBuZXh0T2Zmc2V0ID0gbmV4dCAtIGxpbmVzW2xhc3RdLmxlbmd0aFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0TGluZSA9IGxpbmVcbiAgICAgICAgICAgIG5leHRPZmZzZXQgPSBvZmZzZXRcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjdXJyZW50VG9rZW4gPSBbJ2NvbW1lbnQnLCBjb250ZW50LFxuICAgICAgICAgICAgbGluZSwgcG9zIC0gb2Zmc2V0LFxuICAgICAgICAgICAgbmV4dExpbmUsIG5leHQgLSBuZXh0T2Zmc2V0XG4gICAgICAgICAgXVxuXG4gICAgICAgICAgb2Zmc2V0ID0gbmV4dE9mZnNldFxuICAgICAgICAgIGxpbmUgPSBuZXh0TGluZVxuICAgICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBSRV9XT1JEX0VORC5sYXN0SW5kZXggPSBwb3MgKyAxXG4gICAgICAgICAgUkVfV09SRF9FTkQudGVzdChjc3MpXG4gICAgICAgICAgaWYgKFJFX1dPUkRfRU5ELmxhc3RJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgbmV4dCA9IGNzcy5sZW5ndGggLSAxXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHQgPSBSRV9XT1JEX0VORC5sYXN0SW5kZXggLSAyXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3VycmVudFRva2VuID0gWyd3b3JkJywgY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpLFxuICAgICAgICAgICAgbGluZSwgcG9zIC0gb2Zmc2V0LFxuICAgICAgICAgICAgbGluZSwgbmV4dCAtIG9mZnNldFxuICAgICAgICAgIF1cblxuICAgICAgICAgIGJ1ZmZlci5wdXNoKGN1cnJlbnRUb2tlbilcblxuICAgICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgcG9zKytcbiAgICByZXR1cm4gY3VycmVudFRva2VuXG4gIH1cblxuICBmdW5jdGlvbiBiYWNrICh0b2tlbikge1xuICAgIHJldHVybmVkLnB1c2godG9rZW4pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGJhY2ssXG4gICAgbmV4dFRva2VuLFxuICAgIGVuZE9mRmlsZSxcbiAgICBwb3NpdGlvblxuICB9XG59XG4iXSwiZmlsZSI6InRva2VuaXplLmpzIn0=


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/vendor.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/vendor.js ***!
  \*************************************************************************/
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

/**
 * Contains helpers for working with vendor prefixes.
 *
 * @example
 * const vendor = postcss.vendor
 *
 * @namespace vendor
 */
var vendor = {
  /**
   * Returns the vendor prefix extracted from an input string.
   *
   * @param {string} prop String with or without vendor prefix.
   *
   * @return {string} vendor prefix or empty string
   *
   * @example
   * postcss.vendor.prefix('-moz-tab-size') //=> '-moz-'
   * postcss.vendor.prefix('tab-size')      //=> ''
   */
  prefix: function prefix(prop) {
    var match = prop.match(/^(-\w+-)/);

    if (match) {
      return match[0];
    }

    return '';
  },

  /**
     * Returns the input string stripped of its vendor prefix.
     *
     * @param {string} prop String with or without vendor prefix.
     *
     * @return {string} String name without vendor prefixes.
     *
     * @example
     * postcss.vendor.unprefixed('-moz-tab-size') //=> 'tab-size'
     */
  unprefixed: function unprefixed(prop) {
    return prop.replace(/^-\w+-/, '');
  }
};
var _default = vendor;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlbmRvci5lczYiXSwibmFtZXMiOlsidmVuZG9yIiwicHJlZml4IiwicHJvcCIsIm1hdGNoIiwidW5wcmVmaXhlZCIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7Ozs7O0FBUUEsSUFBSUEsTUFBTSxHQUFHO0FBRVg7Ozs7Ozs7Ozs7O0FBV0FDLEVBQUFBLE1BYlcsa0JBYUhDLElBYkcsRUFhRztBQUNaLFFBQUlDLEtBQUssR0FBR0QsSUFBSSxDQUFDQyxLQUFMLENBQVcsVUFBWCxDQUFaOztBQUNBLFFBQUlBLEtBQUosRUFBVztBQUNULGFBQU9BLEtBQUssQ0FBQyxDQUFELENBQVo7QUFDRDs7QUFFRCxXQUFPLEVBQVA7QUFDRCxHQXBCVTs7QUFzQlg7Ozs7Ozs7Ozs7QUFVQUMsRUFBQUEsVUFoQ1csc0JBZ0NDRixJQWhDRCxFQWdDTztBQUNoQixXQUFPQSxJQUFJLENBQUNHLE9BQUwsQ0FBYSxRQUFiLEVBQXVCLEVBQXZCLENBQVA7QUFDRDtBQWxDVSxDQUFiO2VBc0NlTCxNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb250YWlucyBoZWxwZXJzIGZvciB3b3JraW5nIHdpdGggdmVuZG9yIHByZWZpeGVzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCB2ZW5kb3IgPSBwb3N0Y3NzLnZlbmRvclxuICpcbiAqIEBuYW1lc3BhY2UgdmVuZG9yXG4gKi9cbmxldCB2ZW5kb3IgPSB7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZlbmRvciBwcmVmaXggZXh0cmFjdGVkIGZyb20gYW4gaW5wdXQgc3RyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcCBTdHJpbmcgd2l0aCBvciB3aXRob3V0IHZlbmRvciBwcmVmaXguXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gdmVuZG9yIHByZWZpeCBvciBlbXB0eSBzdHJpbmdcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcG9zdGNzcy52ZW5kb3IucHJlZml4KCctbW96LXRhYi1zaXplJykgLy89PiAnLW1vei0nXG4gICAqIHBvc3Rjc3MudmVuZG9yLnByZWZpeCgndGFiLXNpemUnKSAgICAgIC8vPT4gJydcbiAgICovXG4gIHByZWZpeCAocHJvcCkge1xuICAgIGxldCBtYXRjaCA9IHByb3AubWF0Y2goL14oLVxcdystKS8pXG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICByZXR1cm4gbWF0Y2hbMF1cbiAgICB9XG5cbiAgICByZXR1cm4gJydcbiAgfSxcblxuICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpbnB1dCBzdHJpbmcgc3RyaXBwZWQgb2YgaXRzIHZlbmRvciBwcmVmaXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcCBTdHJpbmcgd2l0aCBvciB3aXRob3V0IHZlbmRvciBwcmVmaXguXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFN0cmluZyBuYW1lIHdpdGhvdXQgdmVuZG9yIHByZWZpeGVzLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBwb3N0Y3NzLnZlbmRvci51bnByZWZpeGVkKCctbW96LXRhYi1zaXplJykgLy89PiAndGFiLXNpemUnXG4gICAgICovXG4gIHVucHJlZml4ZWQgKHByb3ApIHtcbiAgICByZXR1cm4gcHJvcC5yZXBsYWNlKC9eLVxcdystLywgJycpXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCB2ZW5kb3JcbiJdLCJmaWxlIjoidmVuZG9yLmpzIn0=


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/warn-once.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/warn-once.js ***!
  \****************************************************************************/
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports.default = warnOnce;
var printed = {};

function warnOnce(message) {
  if (printed[message]) return;
  printed[message] = true;

  if (typeof console !== 'undefined' && console.warn) {
    console.warn(message);
  }
}

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhcm4tb25jZS5lczYiXSwibmFtZXMiOlsicHJpbnRlZCIsIndhcm5PbmNlIiwibWVzc2FnZSIsImNvbnNvbGUiLCJ3YXJuIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBSUEsT0FBTyxHQUFHLEVBQWQ7O0FBRWUsU0FBU0MsUUFBVCxDQUFtQkMsT0FBbkIsRUFBNEI7QUFDekMsTUFBSUYsT0FBTyxDQUFDRSxPQUFELENBQVgsRUFBc0I7QUFDdEJGLEVBQUFBLE9BQU8sQ0FBQ0UsT0FBRCxDQUFQLEdBQW1CLElBQW5COztBQUVBLE1BQUksT0FBT0MsT0FBUCxLQUFtQixXQUFuQixJQUFrQ0EsT0FBTyxDQUFDQyxJQUE5QyxFQUFvRDtBQUNsREQsSUFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWFGLE9BQWI7QUFDRDtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHByaW50ZWQgPSB7IH1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2Fybk9uY2UgKG1lc3NhZ2UpIHtcbiAgaWYgKHByaW50ZWRbbWVzc2FnZV0pIHJldHVyblxuICBwcmludGVkW21lc3NhZ2VdID0gdHJ1ZVxuXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZS53YXJuKSB7XG4gICAgY29uc29sZS53YXJuKG1lc3NhZ2UpXG4gIH1cbn1cbiJdLCJmaWxlIjoid2Fybi1vbmNlLmpzIn0=


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/postcss/lib/warning.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/postcss/lib/warning.js ***!
  \**************************************************************************/
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports.default = void 0;

/**
 * Represents a plugin’s warning. It can be created using {@link Node#warn}.
 *
 * @example
 * if (decl.important) {
 *   decl.warn(result, 'Avoid !important', { word: '!important' })
 * }
 */
var Warning = /*#__PURE__*/function () {
  /**
   * @param {string} text        Warning message.
   * @param {Object} [opts]      Warning options.
   * @param {Node}   opts.node   CSS node that caused the warning.
   * @param {string} opts.word   Word in CSS source that caused the warning.
   * @param {number} opts.index  Index in CSS node string that caused
   *                             the warning.
   * @param {string} opts.plugin Name of the plugin that created
   *                             this warning. {@link Result#warn} fills
   *                             this property automatically.
   */
  function Warning(text, opts) {
    if (opts === void 0) {
      opts = {};
    }

    /**
     * Type to filter warnings from {@link Result#messages}.
     * Always equal to `"warning"`.
     *
     * @type {string}
     *
     * @example
     * const nonWarning = result.messages.filter(i => i.type !== 'warning')
     */
    this.type = 'warning';
    /**
     * The warning message.
     *
     * @type {string}
     *
     * @example
     * warning.text //=> 'Try to avoid !important'
     */

    this.text = text;

    if (opts.node && opts.node.source) {
      var pos = opts.node.positionBy(opts);
      /**
       * Line in the input file with this warning’s source.
       * @type {number}
       *
       * @example
       * warning.line //=> 5
       */

      this.line = pos.line;
      /**
       * Column in the input file with this warning’s source.
       *
       * @type {number}
       *
       * @example
       * warning.column //=> 6
       */

      this.column = pos.column;
    }

    for (var opt in opts) {
      this[opt] = opts[opt];
    }
  }
  /**
   * Returns a warning position and message.
   *
   * @example
   * warning.toString() //=> 'postcss-lint:a.css:10:14: Avoid !important'
   *
   * @return {string} Warning position and message.
   */


  var _proto = Warning.prototype;

  _proto.toString = function toString() {
    if (this.node) {
      return this.node.error(this.text, {
        plugin: this.plugin,
        index: this.index,
        word: this.word
      }).message;
    }

    if (this.plugin) {
      return this.plugin + ': ' + this.text;
    }

    return this.text;
  }
  /**
   * @memberof Warning#
   * @member {string} plugin The name of the plugin that created
   *                         it will fill this property automatically.
   *                         this warning. When you call {@link Node#warn}
   *
   * @example
   * warning.plugin //=> 'postcss-important'
   */

  /**
   * @memberof Warning#
   * @member {Node} node Contains the CSS node that caused the warning.
   *
   * @example
   * warning.node.toString() //=> 'color: white !important'
   */
  ;

  return Warning;
}();

var _default = Warning;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhcm5pbmcuZXM2Il0sIm5hbWVzIjpbIldhcm5pbmciLCJ0ZXh0Iiwib3B0cyIsInR5cGUiLCJub2RlIiwic291cmNlIiwicG9zIiwicG9zaXRpb25CeSIsImxpbmUiLCJjb2x1bW4iLCJvcHQiLCJ0b1N0cmluZyIsImVycm9yIiwicGx1Z2luIiwiaW5kZXgiLCJ3b3JkIiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7Ozs7Ozs7SUFRTUEsTztBQUNKOzs7Ozs7Ozs7OztBQVdBLG1CQUFhQyxJQUFiLEVBQW1CQyxJQUFuQixFQUErQjtBQUFBLFFBQVpBLElBQVk7QUFBWkEsTUFBQUEsSUFBWSxHQUFMLEVBQUs7QUFBQTs7QUFDN0I7Ozs7Ozs7OztBQVNBLFNBQUtDLElBQUwsR0FBWSxTQUFaO0FBQ0E7Ozs7Ozs7OztBQVFBLFNBQUtGLElBQUwsR0FBWUEsSUFBWjs7QUFFQSxRQUFJQyxJQUFJLENBQUNFLElBQUwsSUFBYUYsSUFBSSxDQUFDRSxJQUFMLENBQVVDLE1BQTNCLEVBQW1DO0FBQ2pDLFVBQUlDLEdBQUcsR0FBR0osSUFBSSxDQUFDRSxJQUFMLENBQVVHLFVBQVYsQ0FBcUJMLElBQXJCLENBQVY7QUFDQTs7Ozs7Ozs7QUFPQSxXQUFLTSxJQUFMLEdBQVlGLEdBQUcsQ0FBQ0UsSUFBaEI7QUFDQTs7Ozs7Ozs7O0FBUUEsV0FBS0MsTUFBTCxHQUFjSCxHQUFHLENBQUNHLE1BQWxCO0FBQ0Q7O0FBRUQsU0FBSyxJQUFJQyxHQUFULElBQWdCUixJQUFoQjtBQUFzQixXQUFLUSxHQUFMLElBQVlSLElBQUksQ0FBQ1EsR0FBRCxDQUFoQjtBQUF0QjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7OztTQVFBQyxRLEdBQUEsb0JBQVk7QUFDVixRQUFJLEtBQUtQLElBQVQsRUFBZTtBQUNiLGFBQU8sS0FBS0EsSUFBTCxDQUFVUSxLQUFWLENBQWdCLEtBQUtYLElBQXJCLEVBQTJCO0FBQ2hDWSxRQUFBQSxNQUFNLEVBQUUsS0FBS0EsTUFEbUI7QUFFaENDLFFBQUFBLEtBQUssRUFBRSxLQUFLQSxLQUZvQjtBQUdoQ0MsUUFBQUEsSUFBSSxFQUFFLEtBQUtBO0FBSHFCLE9BQTNCLEVBSUpDLE9BSkg7QUFLRDs7QUFFRCxRQUFJLEtBQUtILE1BQVQsRUFBaUI7QUFDZixhQUFPLEtBQUtBLE1BQUwsR0FBYyxJQUFkLEdBQXFCLEtBQUtaLElBQWpDO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLQSxJQUFaO0FBQ0Q7QUFFRDs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7Ozs7ZUFTYUQsTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVwcmVzZW50cyBhIHBsdWdpbuKAmXMgd2FybmluZy4gSXQgY2FuIGJlIGNyZWF0ZWQgdXNpbmcge0BsaW5rIE5vZGUjd2Fybn0uXG4gKlxuICogQGV4YW1wbGVcbiAqIGlmIChkZWNsLmltcG9ydGFudCkge1xuICogICBkZWNsLndhcm4ocmVzdWx0LCAnQXZvaWQgIWltcG9ydGFudCcsIHsgd29yZDogJyFpbXBvcnRhbnQnIH0pXG4gKiB9XG4gKi9cbmNsYXNzIFdhcm5pbmcge1xuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgICAgICAgIFdhcm5pbmcgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzXSAgICAgIFdhcm5pbmcgb3B0aW9ucy5cbiAgICogQHBhcmFtIHtOb2RlfSAgIG9wdHMubm9kZSAgIENTUyBub2RlIHRoYXQgY2F1c2VkIHRoZSB3YXJuaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy53b3JkICAgV29yZCBpbiBDU1Mgc291cmNlIHRoYXQgY2F1c2VkIHRoZSB3YXJuaW5nLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0cy5pbmRleCAgSW5kZXggaW4gQ1NTIG5vZGUgc3RyaW5nIHRoYXQgY2F1c2VkXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgd2FybmluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMucGx1Z2luIE5hbWUgb2YgdGhlIHBsdWdpbiB0aGF0IGNyZWF0ZWRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgd2FybmluZy4ge0BsaW5rIFJlc3VsdCN3YXJufSBmaWxsc1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBwcm9wZXJ0eSBhdXRvbWF0aWNhbGx5LlxuICAgKi9cbiAgY29uc3RydWN0b3IgKHRleHQsIG9wdHMgPSB7IH0pIHtcbiAgICAvKipcbiAgICAgKiBUeXBlIHRvIGZpbHRlciB3YXJuaW5ncyBmcm9tIHtAbGluayBSZXN1bHQjbWVzc2FnZXN9LlxuICAgICAqIEFsd2F5cyBlcXVhbCB0byBgXCJ3YXJuaW5nXCJgLlxuICAgICAqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3Qgbm9uV2FybmluZyA9IHJlc3VsdC5tZXNzYWdlcy5maWx0ZXIoaSA9PiBpLnR5cGUgIT09ICd3YXJuaW5nJylcbiAgICAgKi9cbiAgICB0aGlzLnR5cGUgPSAnd2FybmluZydcbiAgICAvKipcbiAgICAgKiBUaGUgd2FybmluZyBtZXNzYWdlLlxuICAgICAqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogd2FybmluZy50ZXh0IC8vPT4gJ1RyeSB0byBhdm9pZCAhaW1wb3J0YW50J1xuICAgICAqL1xuICAgIHRoaXMudGV4dCA9IHRleHRcblxuICAgIGlmIChvcHRzLm5vZGUgJiYgb3B0cy5ub2RlLnNvdXJjZSkge1xuICAgICAgbGV0IHBvcyA9IG9wdHMubm9kZS5wb3NpdGlvbkJ5KG9wdHMpXG4gICAgICAvKipcbiAgICAgICAqIExpbmUgaW4gdGhlIGlucHV0IGZpbGUgd2l0aCB0aGlzIHdhcm5pbmfigJlzIHNvdXJjZS5cbiAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgKlxuICAgICAgICogQGV4YW1wbGVcbiAgICAgICAqIHdhcm5pbmcubGluZSAvLz0+IDVcbiAgICAgICAqL1xuICAgICAgdGhpcy5saW5lID0gcG9zLmxpbmVcbiAgICAgIC8qKlxuICAgICAgICogQ29sdW1uIGluIHRoZSBpbnB1dCBmaWxlIHdpdGggdGhpcyB3YXJuaW5n4oCZcyBzb3VyY2UuXG4gICAgICAgKlxuICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAqXG4gICAgICAgKiBAZXhhbXBsZVxuICAgICAgICogd2FybmluZy5jb2x1bW4gLy89PiA2XG4gICAgICAgKi9cbiAgICAgIHRoaXMuY29sdW1uID0gcG9zLmNvbHVtblxuICAgIH1cblxuICAgIGZvciAobGV0IG9wdCBpbiBvcHRzKSB0aGlzW29wdF0gPSBvcHRzW29wdF1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgd2FybmluZyBwb3NpdGlvbiBhbmQgbWVzc2FnZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogd2FybmluZy50b1N0cmluZygpIC8vPT4gJ3Bvc3Rjc3MtbGludDphLmNzczoxMDoxNDogQXZvaWQgIWltcG9ydGFudCdcbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nfSBXYXJuaW5nIHBvc2l0aW9uIGFuZCBtZXNzYWdlLlxuICAgKi9cbiAgdG9TdHJpbmcgKCkge1xuICAgIGlmICh0aGlzLm5vZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuZXJyb3IodGhpcy50ZXh0LCB7XG4gICAgICAgIHBsdWdpbjogdGhpcy5wbHVnaW4sXG4gICAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxuICAgICAgICB3b3JkOiB0aGlzLndvcmRcbiAgICAgIH0pLm1lc3NhZ2VcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wbHVnaW4pIHtcbiAgICAgIHJldHVybiB0aGlzLnBsdWdpbiArICc6ICcgKyB0aGlzLnRleHRcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy50ZXh0XG4gIH1cblxuICAvKipcbiAgICogQG1lbWJlcm9mIFdhcm5pbmcjXG4gICAqIEBtZW1iZXIge3N0cmluZ30gcGx1Z2luIFRoZSBuYW1lIG9mIHRoZSBwbHVnaW4gdGhhdCBjcmVhdGVkXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgIGl0IHdpbGwgZmlsbCB0aGlzIHByb3BlcnR5IGF1dG9tYXRpY2FsbHkuXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgd2FybmluZy4gV2hlbiB5b3UgY2FsbCB7QGxpbmsgTm9kZSN3YXJufVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiB3YXJuaW5nLnBsdWdpbiAvLz0+ICdwb3N0Y3NzLWltcG9ydGFudCdcbiAgICovXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBXYXJuaW5nI1xuICAgKiBAbWVtYmVyIHtOb2RlfSBub2RlIENvbnRhaW5zIHRoZSBDU1Mgbm9kZSB0aGF0IGNhdXNlZCB0aGUgd2FybmluZy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogd2FybmluZy5ub2RlLnRvU3RyaW5nKCkgLy89PiAnY29sb3I6IHdoaXRlICFpbXBvcnRhbnQnXG4gICAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBXYXJuaW5nXG4iXSwiZmlsZSI6Indhcm5pbmcuanMifQ==


/***/ }),

/***/ "./node_modules/@linaria/server/node_modules/supports-color/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@linaria/server/node_modules/supports-color/index.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const os = __webpack_require__(/*! os */ "os");
const hasFlag = __webpack_require__(/*! has-flag */ "./node_modules/has-flag/index.js");

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}
if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === true || env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === false || env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),

/***/ "./node_modules/escape-string-regexp/index.js":
/*!****************************************************!*\
  !*** ./node_modules/escape-string-regexp/index.js ***!
  \****************************************************/
/***/ ((module) => {

"use strict";


var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};


/***/ }),

/***/ "./node_modules/gatsby-plugin-linaria/gatsby-ssr.js":
/*!**********************************************************!*\
  !*** ./node_modules/gatsby-plugin-linaria/gatsby-ssr.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.onPreRenderHTML = exports.replaceRenderer = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _server = __webpack_require__(/*! react-dom/server */ "react-dom/server");

var _server2 = __webpack_require__(/*! linaria/server */ "./node_modules/linaria/esm/server.js");

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/gatsby-plugin-linaria/utils.js");

let bodyHTML;

const replaceRenderer = ({
  bodyComponent
}) => {
  bodyHTML = (0, _server.renderToString)(bodyComponent);
};

exports.replaceRenderer = replaceRenderer;

const onPreRenderHTML = ({
  pathname,
  getHeadComponents,
  replaceHeadComponents,
  getPostBodyComponents,
  replacePostBodyComponents
}) => {
  const headComponents = getHeadComponents();
  const linariaStyleSheets = [];
  const otherElements = [];

  for (const element of headComponents) {
    if ((0, _utils.isLinariaStyleElement)(element)) {
      linariaStyleSheets.push({
        href: element.props['data-href'],
        text: element.props.dangerouslySetInnerHTML.__html
      });
    } else {
      otherElements.push(element);
    }
  }

  const {
    critical
  } = (0, _server2.collect)(bodyHTML, linariaStyleSheets.map(style => style.text).join('')); // Attach critical CSS into bottom of head

  replaceHeadComponents([...otherElements, /*#__PURE__*/_react.default.createElement("style", {
    key: "linaria-critical-css",
    "data-linaria-critical": pathname,
    dangerouslySetInnerHTML: {
      __html: critical
    }
  })]); // Attach other and critical into bottom of body
  // This also includes critical css because of cache hit

  replacePostBodyComponents([...getPostBodyComponents(), linariaStyleSheets.map(style => style.href).map(href => /*#__PURE__*/_react.default.createElement("link", {
    key: href,
    rel: "stylesheet",
    type: "text/css",
    href: href
  }))]);
};

exports.onPreRenderHTML = onPreRenderHTML;

/***/ }),

/***/ "./node_modules/gatsby-plugin-linaria/utils.js":
/*!*****************************************************!*\
  !*** ./node_modules/gatsby-plugin-linaria/utils.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.isLinariaStyleElement = isLinariaStyleElement;
exports.LINARIA_STYLESHEET_RULE = exports.TS_RULE_TEST = void 0;

var _react = __webpack_require__(/*! react */ "react");

const TS_RULE_TEST = '\\.tsx?$';
exports.TS_RULE_TEST = TS_RULE_TEST;
const LINARIA_STYLESHEET_RULE = /\/linaria\.[\w\d]+\.css$/;
exports.LINARIA_STYLESHEET_RULE = LINARIA_STYLESHEET_RULE;

function isLinariaStyleElement(node) {
  return /*#__PURE__*/(0, _react.isValidElement)(node) && node.type === 'style' && LINARIA_STYLESHEET_RULE.test(node.props['data-href']);
}

/***/ }),

/***/ "./.cache/api-runner-ssr.js":
/*!**********************************!*\
  !*** ./.cache/api-runner-ssr.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apiRunner": () => (/* binding */ apiRunner),
/* harmony export */   "apiRunnerAsync": () => (/* binding */ apiRunnerAsync)
/* harmony export */ });
var plugins = [{
  name: 'gatsby-plugin-linaria',
  plugin: __webpack_require__(/*! ./node_modules/gatsby-plugin-linaria/gatsby-ssr */ "./node_modules/gatsby-plugin-linaria/gatsby-ssr.js"),
  options: {
    "plugins": []
  }
}];
/* global plugins */
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = __webpack_require__(/*! ./api-ssr-docs */ "./.cache/api-ssr-docs.js");

function augmentErrorWithPlugin(plugin, err) {
  if (plugin.name !== `default-site-plugin`) {
    // default-site-plugin is user code and will print proper stack trace,
    // so no point in annotating error message pointing out which plugin is root of the problem
    err.message += ` (from plugin: ${plugin.name})`;
  }

  throw err;
}

function apiRunner(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api);
  }

  const results = [];
  plugins.forEach(plugin => {
    const apiFn = plugin.plugin[api];

    if (!apiFn) {
      return;
    }

    try {
      const result = apiFn(args, plugin.options);

      if (result && argTransform) {
        args = argTransform({
          args,
          result
        });
      } // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4


      if (typeof result !== `undefined`) {
        results.push(result);
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e);
    }
  });
  return results.length ? results : [defaultReturn];
}
async function apiRunnerAsync(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api);
  }

  const results = [];

  for (const plugin of plugins) {
    const apiFn = plugin.plugin[api];

    if (!apiFn) {
      continue;
    }

    try {
      const result = await apiFn(args, plugin.options);

      if (result && argTransform) {
        args = argTransform({
          args,
          result
        });
      } // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4


      if (typeof result !== `undefined`) {
        results.push(result);
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e);
    }
  }

  return results.length ? results : [defaultReturn];
}

/***/ }),

/***/ "./.cache/api-ssr-docs.js":
/*!********************************!*\
  !*** ./.cache/api-ssr-docs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

/**
 * Object containing options defined in `gatsby-config.js`
 * @typedef {object} pluginOptions
 */

/**
 * Replace the default server renderer. This is useful for integration with
 * Redux, css-in-js libraries, etc. that need custom setups for server
 * rendering.
 * @param {object} $0
 * @param {string} $0.pathname The pathname of the page currently being rendered.
 * @param {ReactNode} $0.bodyComponent The React element to be rendered as the page body
 * @param {function} $0.replaceBodyHTMLString Call this with the HTML string
 * you render. **WARNING** if multiple plugins implement this API it's the
 * last plugin that "wins". TODO implement an automated warning against this.
 * @param {function} $0.setHeadComponents Takes an array of components as its
 * first argument which are added to the `headComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setHtmlAttributes Takes an object of props which will
 * spread into the `<html>` component.
 * @param {function} $0.setBodyAttributes Takes an object of props which will
 * spread into the `<body>` component.
 * @param {function} $0.setPreBodyComponents Takes an array of components as its
 * first argument which are added to the `preBodyComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setPostBodyComponents Takes an array of components as its
 * first argument which are added to the `postBodyComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setBodyProps Takes an object of data which
 * is merged with other body props and passed to `html.js` as `bodyProps`.
 * @param {pluginOptions} pluginOptions
 * @example
 * // From gatsby-plugin-glamor
 * const { renderToString } = require("react-dom/server")
 * const inline = require("glamor-inline")
 *
 * exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
 *   const bodyHTML = renderToString(bodyComponent)
 *   const inlinedHTML = inline(bodyHTML)
 *
 *   replaceBodyHTMLString(inlinedHTML)
 * }
 */
exports.replaceRenderer = true;
/**
 * Called after every page Gatsby server renders while building HTML so you can
 * set head and body components to be rendered in your `html.js`.
 *
 * Gatsby does a two-pass render for HTML. It loops through your pages first
 * rendering only the body and then takes the result body HTML string and
 * passes it as the `body` prop to your `html.js` to complete the render.
 *
 * It's often handy to be able to send custom components to your `html.js`.
 * For example, it's a very common pattern for React.js libraries that
 * support server rendering to pull out data generated during the render to
 * add to your HTML.
 *
 * Using this API over [`replaceRenderer`](#replaceRenderer) is preferable as
 * multiple plugins can implement this API where only one plugin can take
 * over server rendering. However, if your plugin requires taking over server
 * rendering then that's the one to
 * use
 * @param {object} $0
 * @param {string} $0.pathname The pathname of the page currently being rendered.
 * @param {function} $0.setHeadComponents Takes an array of components as its
 * first argument which are added to the `headComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setHtmlAttributes Takes an object of props which will
 * spread into the `<html>` component.
 * @param {function} $0.setBodyAttributes Takes an object of props which will
 * spread into the `<body>` component.
 * @param {function} $0.setPreBodyComponents Takes an array of components as its
 * first argument which are added to the `preBodyComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setPostBodyComponents Takes an array of components as its
 * first argument which are added to the `postBodyComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setBodyProps Takes an object of data which
 * is merged with other body props and passed to `html.js` as `bodyProps`.
 * @param {pluginOptions} pluginOptions
 * @example
 * // Import React so that you can use JSX in HeadComponents
 * const React = require("react")
 *
 * const HtmlAttributes = {
 *   lang: "en"
 * }
 *
 * const HeadComponents = [
 *   <script key="my-script" src="https://gatsby.dev/my-script" />
 * ]
 *
 * const BodyAttributes = {
 *   "data-theme": "dark"
 * }
 *
 * exports.onRenderBody = ({
 *   setHeadComponents,
 *   setHtmlAttributes,
 *   setBodyAttributes
 * }, pluginOptions) => {
 *   setHtmlAttributes(HtmlAttributes)
 *   setHeadComponents(HeadComponents)
 *   setBodyAttributes(BodyAttributes)
 * }
 */

exports.onRenderBody = true;
/**
 * Called after every page Gatsby server renders while building HTML so you can
 * replace head components to be rendered in your `html.js`. This is useful if
 * you need to reorder scripts or styles added by other plugins.
 * @param {object} $0
 * @param {string} $0.pathname The pathname of the page currently being rendered.
 * @param {Array<ReactNode>} $0.getHeadComponents Returns the current `headComponents` array.
 * @param {function} $0.replaceHeadComponents Takes an array of components as its
 * first argument which replace the `headComponents` array which is passed
 * to the `html.js` component. **WARNING** if multiple plugins implement this
 * API it's the last plugin that "wins".
 * @param {Array<ReactNode>} $0.getPreBodyComponents Returns the current `preBodyComponents` array.
 *  @param {function} $0.replacePreBodyComponents Takes an array of components as its
 * first argument which replace the `preBodyComponents` array which is passed
 * to the `html.js` component. **WARNING** if multiple plugins implement this
 * API it's the last plugin that "wins".
 * @param {Array<ReactNode>} $0.getPostBodyComponents Returns the current `postBodyComponents` array.
 *  @param {function} $0.replacePostBodyComponents Takes an array of components as its
 * first argument which replace the `postBodyComponents` array which is passed
 * to the `html.js` component. **WARNING** if multiple plugins implement this
 * API it's the last plugin that "wins".
 * @param {pluginOptions} pluginOptions
 * @example
 * // Move Typography.js styles to the top of the head section so they're loaded first.
 * exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
 *   const headComponents = getHeadComponents()
 *   headComponents.sort((x, y) => {
 *     if (x.key === 'TypographyStyle') {
 *       return -1
 *     } else if (y.key === 'TypographyStyle') {
 *       return 1
 *     }
 *     return 0
 *   })
 *   replaceHeadComponents(headComponents)
 * }
 */

exports.onPreRenderHTML = true;
/**
 * Allow a plugin to wrap the page element.
 *
 * This is useful for setting wrapper components around pages that won't get
 * unmounted on page changes. For setting Provider components, use [wrapRootElement](#wrapRootElement).
 *
 * _Note:_
 * There is an equivalent hook in Gatsby's [Browser API](/docs/browser-apis/#wrapPageElement).
 * It is recommended to use both APIs together.
 * For example usage, check out [Using i18n](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-i18n).
 * @param {object} $0
 * @param {ReactNode} $0.element The "Page" React Element built by Gatsby.
 * @param {object} $0.props Props object used by page.
 * @param {pluginOptions} pluginOptions
 * @returns {ReactNode} Wrapped element
 * @example
 * const React = require("react")
 * const Layout = require("./src/components/layout").default
 *
 * exports.wrapPageElement = ({ element, props }) => {
 *   // props provide same data to Layout as Page element will get
 *   // including location, data, etc - you don't need to pass it
 *   return <Layout {...props}>{element}</Layout>
 * }
 */

exports.wrapPageElement = true;
/**
 * Allow a plugin to wrap the root element.
 *
 * This is useful to set up any Provider components that will wrap your application.
 * For setting persistent UI elements around pages use [wrapPageElement](#wrapPageElement).
 *
 * _Note:_
 * There is an equivalent hook in Gatsby's [Browser API](/docs/browser-apis/#wrapRootElement).
 * It is recommended to use both APIs together.
 * For example usage, check out [Using redux](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-redux).
 * @param {object} $0
 * @param {ReactNode} $0.element The "Root" React Element built by Gatsby.
 * @param {pluginOptions} pluginOptions
 * @returns {ReactNode} Wrapped element
 * @example
 * const React = require("react")
 * const { Provider } = require("react-redux")
 *
 * const createStore = require("./src/state/createStore")
 * const store = createStore()
 *
 * exports.wrapRootElement = ({ element }) => {
 *   return (
 *     <Provider store={store}>
 *       {element}
 *     </Provider>
 *   )
 * }
 */

exports.wrapRootElement = true;

/***/ }),

/***/ "./.cache/default-html.js":
/*!********************************!*\
  !*** ./.cache/default-html.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTML)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);


function HTML(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("html", props.htmlAttributes, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("head", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    charSet: "utf-8"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    httpEquiv: "x-ua-compatible",
    content: "ie=edge"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1, shrink-to-fit=no"
  }), props.headComponents), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("body", props.bodyAttributes, props.preBodyComponents, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: `body`,
    id: "___gatsby",
    dangerouslySetInnerHTML: {
      __html: props.body
    }
  }), props.postBodyComponents));
}
HTML.propTypes = {
  htmlAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),
  headComponents: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().array),
  bodyAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),
  preBodyComponents: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().array),
  body: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  postBodyComponents: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().array)
};

/***/ }),

/***/ "./node_modules/has-flag/index.js":
/*!****************************************!*\
  !*** ./node_modules/has-flag/index.js ***!
  \****************************************/
/***/ ((module) => {

"use strict";

module.exports = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),

/***/ "./node_modules/linaria/esm/server.js":
/*!********************************************!*\
  !*** ./node_modules/linaria/esm/server.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "collect": () => (/* reexport safe */ _linaria_server__WEBPACK_IMPORTED_MODULE_0__.collect)
/* harmony export */ });
/* harmony import */ var _linaria_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @linaria/server */ "./node_modules/@linaria/server/esm/index.js");

//# sourceMappingURL=server.js.map

/***/ }),

/***/ "./node_modules/lodash/_Hash.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hashClear = __webpack_require__(/*! ./_hashClear */ "./node_modules/lodash/_hashClear.js"),
    hashDelete = __webpack_require__(/*! ./_hashDelete */ "./node_modules/lodash/_hashDelete.js"),
    hashGet = __webpack_require__(/*! ./_hashGet */ "./node_modules/lodash/_hashGet.js"),
    hashHas = __webpack_require__(/*! ./_hashHas */ "./node_modules/lodash/_hashHas.js"),
    hashSet = __webpack_require__(/*! ./_hashSet */ "./node_modules/lodash/_hashSet.js");

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),

/***/ "./node_modules/lodash/_ListCache.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ "./node_modules/lodash/_listCacheClear.js"),
    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ "./node_modules/lodash/_listCacheDelete.js"),
    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ "./node_modules/lodash/_listCacheGet.js"),
    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ "./node_modules/lodash/_listCacheHas.js"),
    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ "./node_modules/lodash/_listCacheSet.js");

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ "./node_modules/lodash/_MapCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ "./node_modules/lodash/_mapCacheClear.js"),
    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ "./node_modules/lodash/_mapCacheDelete.js"),
    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ "./node_modules/lodash/_mapCacheGet.js"),
    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ "./node_modules/lodash/_mapCacheHas.js"),
    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ "./node_modules/lodash/_mapCacheSet.js");

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),

/***/ "./node_modules/lodash/_Stack.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_Stack.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    stackClear = __webpack_require__(/*! ./_stackClear */ "./node_modules/lodash/_stackClear.js"),
    stackDelete = __webpack_require__(/*! ./_stackDelete */ "./node_modules/lodash/_stackDelete.js"),
    stackGet = __webpack_require__(/*! ./_stackGet */ "./node_modules/lodash/_stackGet.js"),
    stackHas = __webpack_require__(/*! ./_stackHas */ "./node_modules/lodash/_stackHas.js"),
    stackSet = __webpack_require__(/*! ./_stackSet */ "./node_modules/lodash/_stackSet.js");

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_Uint8Array.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_Uint8Array.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_apply.js ***!
  \***************************************/
/***/ ((module) => {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "./node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ "./node_modules/lodash/_assignMergeValue.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_assignMergeValue.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;


/***/ }),

/***/ "./node_modules/lodash/_assignValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_assignValue.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js");

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),

/***/ "./node_modules/lodash/_baseCreate.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseCreate.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),

/***/ "./node_modules/lodash/_baseFor.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseFor.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var createBaseFor = __webpack_require__(/*! ./_createBaseFor */ "./node_modules/lodash/_createBaseFor.js");

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "./node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ "./node_modules/lodash/_baseKeysIn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseKeysIn.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ "./node_modules/lodash/_nativeKeysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_baseMerge.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseMerge.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/lodash/_Stack.js"),
    assignMergeValue = __webpack_require__(/*! ./_assignMergeValue */ "./node_modules/lodash/_assignMergeValue.js"),
    baseFor = __webpack_require__(/*! ./_baseFor */ "./node_modules/lodash/_baseFor.js"),
    baseMergeDeep = __webpack_require__(/*! ./_baseMergeDeep */ "./node_modules/lodash/_baseMergeDeep.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js"),
    safeGet = __webpack_require__(/*! ./_safeGet */ "./node_modules/lodash/_safeGet.js");

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack);
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;


/***/ }),

/***/ "./node_modules/lodash/_baseMergeDeep.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_baseMergeDeep.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assignMergeValue = __webpack_require__(/*! ./_assignMergeValue */ "./node_modules/lodash/_assignMergeValue.js"),
    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ "./node_modules/lodash/_cloneBuffer.js"),
    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ "./node_modules/lodash/_cloneTypedArray.js"),
    copyArray = __webpack_require__(/*! ./_copyArray */ "./node_modules/lodash/_copyArray.js"),
    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ "./node_modules/lodash/_initCloneObject.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ "./node_modules/lodash/isArrayLikeObject.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isPlainObject = __webpack_require__(/*! ./isPlainObject */ "./node_modules/lodash/isPlainObject.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js"),
    safeGet = __webpack_require__(/*! ./_safeGet */ "./node_modules/lodash/_safeGet.js"),
    toPlainObject = __webpack_require__(/*! ./toPlainObject */ "./node_modules/lodash/toPlainObject.js");

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;


/***/ }),

/***/ "./node_modules/lodash/_baseRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseRest.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js"),
    overRest = __webpack_require__(/*! ./_overRest */ "./node_modules/lodash/_overRest.js"),
    setToString = __webpack_require__(/*! ./_setToString */ "./node_modules/lodash/_setToString.js");

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),

/***/ "./node_modules/lodash/_baseSetToString.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseSetToString.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var constant = __webpack_require__(/*! ./constant */ "./node_modules/lodash/constant.js"),
    defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js"),
    identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js");

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "./node_modules/lodash/_cloneArrayBuffer.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_cloneArrayBuffer.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "./node_modules/lodash/_Uint8Array.js");

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),

/***/ "./node_modules/lodash/_cloneBuffer.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneBuffer.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;


/***/ }),

/***/ "./node_modules/lodash/_cloneTypedArray.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_cloneTypedArray.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),

/***/ "./node_modules/lodash/_copyArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),

/***/ "./node_modules/lodash/_copyObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_copyObject.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js");

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "./node_modules/lodash/_createAssigner.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_createAssigner.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ "./node_modules/lodash/_isIterateeCall.js");

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ }),

/***/ "./node_modules/lodash/_createBaseFor.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createBaseFor.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/***/ ((module) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;


/***/ }),

/***/ "./node_modules/lodash/_getMapData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isKeyable = __webpack_require__(/*! ./_isKeyable */ "./node_modules/lodash/_isKeyable.js");

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "./node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "./node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ "./node_modules/lodash/_getPrototype.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getPrototype.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ "./node_modules/lodash/_hashClear.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),

/***/ "./node_modules/lodash/_hashDelete.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
/***/ ((module) => {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),

/***/ "./node_modules/lodash/_hashGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),

/***/ "./node_modules/lodash/_hashHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),

/***/ "./node_modules/lodash/_hashSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),

/***/ "./node_modules/lodash/_initCloneObject.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_initCloneObject.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseCreate = __webpack_require__(/*! ./_baseCreate */ "./node_modules/lodash/_baseCreate.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js");

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ "./node_modules/lodash/_isIterateeCall.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_isIterateeCall.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),

/***/ "./node_modules/lodash/_isKeyable.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "./node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/***/ ((module) => {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheClear.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Hash = __webpack_require__(/*! ./_Hash */ "./node_modules/lodash/_Hash.js"),
    ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js");

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheGet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheSet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),

/***/ "./node_modules/lodash/_nativeCreate.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ "./node_modules/lodash/_nativeKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeKeysIn.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;


/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ "./node_modules/lodash/_overRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_overRest.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var apply = __webpack_require__(/*! ./_apply */ "./node_modules/lodash/_apply.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/_safeGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_safeGet.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

module.exports = safeGet;


/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setToString.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseSetToString = __webpack_require__(/*! ./_baseSetToString */ "./node_modules/lodash/_baseSetToString.js"),
    shortOut = __webpack_require__(/*! ./_shortOut */ "./node_modules/lodash/_shortOut.js");

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),

/***/ "./node_modules/lodash/_shortOut.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_shortOut.js ***!
  \******************************************/
/***/ ((module) => {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),

/***/ "./node_modules/lodash/_stackClear.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_stackClear.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js");

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),

/***/ "./node_modules/lodash/_stackDelete.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_stackDelete.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),

/***/ "./node_modules/lodash/_stackGet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackGet.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),

/***/ "./node_modules/lodash/_stackHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackHas.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),

/***/ "./node_modules/lodash/_stackSet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackSet.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js"),
    MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ "./node_modules/lodash/constant.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/constant.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/***/ ((module) => {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "./node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/***/ ((module) => {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ "./node_modules/lodash/isArrayLikeObject.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/isArrayLikeObject.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "./node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;


/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/isPlainObject.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "./node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ "./node_modules/lodash/keysIn.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/keysIn.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ "./node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),

/***/ "./node_modules/lodash/merge.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/merge.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseMerge = __webpack_require__(/*! ./_baseMerge */ "./node_modules/lodash/_baseMerge.js"),
    createAssigner = __webpack_require__(/*! ./_createAssigner */ "./node_modules/lodash/_createAssigner.js");

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

module.exports = merge;


/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ "./node_modules/lodash/toPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/toPlainObject.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/source-map/lib/array-set.js":
/*!**************************************************!*\
  !*** ./node_modules/source-map/lib/array-set.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ "./node_modules/source-map/lib/util.js");
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

exports.ArraySet = ArraySet;


/***/ }),

/***/ "./node_modules/source-map/lib/base64-vlq.js":
/*!***************************************************!*\
  !*** ./node_modules/source-map/lib/base64-vlq.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var base64 = __webpack_require__(/*! ./base64 */ "./node_modules/source-map/lib/base64.js");

// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
exports.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};


/***/ }),

/***/ "./node_modules/source-map/lib/base64.js":
/*!***********************************************!*\
  !*** ./node_modules/source-map/lib/base64.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
exports.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
exports.decode = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};


/***/ }),

/***/ "./node_modules/source-map/lib/binary-search.js":
/*!******************************************************!*\
  !*** ./node_modules/source-map/lib/binary-search.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  }
  else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  }
  else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};


/***/ }),

/***/ "./node_modules/source-map/lib/mapping-list.js":
/*!*****************************************************!*\
  !*** ./node_modules/source-map/lib/mapping-list.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ "./node_modules/source-map/lib/util.js");

/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

exports.MappingList = MappingList;


/***/ }),

/***/ "./node_modules/source-map/lib/quick-sort.js":
/*!***************************************************!*\
  !*** ./node_modules/source-map/lib/quick-sort.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
exports.quickSort = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};


/***/ }),

/***/ "./node_modules/source-map/lib/source-map-consumer.js":
/*!************************************************************!*\
  !*** ./node_modules/source-map/lib/source-map-consumer.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ "./node_modules/source-map/lib/util.js");
var binarySearch = __webpack_require__(/*! ./binary-search */ "./node_modules/source-map/lib/binary-search.js");
var ArraySet = __webpack_require__(/*! ./array-set */ "./node_modules/source-map/lib/array-set.js").ArraySet;
var base64VLQ = __webpack_require__(/*! ./base64-vlq */ "./node_modules/source-map/lib/base64-vlq.js");
var quickSort = __webpack_require__(/*! ./quick-sort */ "./node_modules/source-map/lib/quick-sort.js").quickSort;

function SourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
}

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;

SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */
SourceMapConsumer.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0)
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

exports.SourceMapConsumer = SourceMapConsumer;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  if (sourceRoot) {
    sourceRoot = util.normalize(sourceRoot);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet.fromArray(names.map(String), true);
  this._sources = ArraySet.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function (s) {
    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort(smc.__originalMappings, util.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._absoluteSources.slice();
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64VLQ.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util.compareByGeneratedPositionsDeflated,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }

    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }

    var url;
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }

    var needle = {
      source: source,
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util.compareByOriginalPositions,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet();
  this._names = new ArraySet();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort(this.__originalMappings, util.compareByOriginalPositions);
  };

exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;


/***/ }),

/***/ "./node_modules/source-map/lib/source-map-generator.js":
/*!*************************************************************!*\
  !*** ./node_modules/source-map/lib/source-map-generator.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ = __webpack_require__(/*! ./base64-vlq */ "./node_modules/source-map/lib/base64-vlq.js");
var util = __webpack_require__(/*! ./util */ "./node_modules/source-map/lib/util.js");
var ArraySet = __webpack_require__(/*! ./array-set */ "./node_modules/source-map/lib/array-set.js").ArraySet;
var MappingList = __webpack_require__(/*! ./mapping-list */ "./node_modules/source-map/lib/mapping-list.js").MappingList;

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util.getArg(aArgs, 'file', null);
  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet();
  this._names = new ArraySet();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var sourceRelative = sourceFile;
      if (sourceRoot !== null) {
        sourceRelative = util.relative(sourceRoot, sourceFile);
      }

      if (!generator._sources.has(sourceRelative)) {
        generator._sources.add(sourceRelative);
      }

      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util.getArg(aArgs, 'generated');
    var original = util.getArg(aArgs, 'original', null);
    var source = util.getArg(aArgs, 'source', null);
    var name = util.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }

    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

/**
 * Set the source content for a source file.
 */
SourceMapGenerator.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
          'or the source map\'s "file" property. Both were omitted.'
        );
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet();
    var newNames = new ArraySet();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util.join(aSourceMapPath, mapping.source)
          }
          if (sourceRoot != null) {
            mapping.source = util.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }

    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = ''

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64VLQ.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64VLQ.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64VLQ.encode(mapping.originalColumn
                                   - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64VLQ.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }

      result += next;
    }

    return result;
  };

SourceMapGenerator.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util.relative(aSourceRoot, source);
      }
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
        ? this._sourcesContents[key]
        : null;
    }, this);
  };

/**
 * Externalize the source map.
 */
SourceMapGenerator.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator.prototype.toString =
  function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };

exports.SourceMapGenerator = SourceMapGenerator;


/***/ }),

/***/ "./node_modules/source-map/lib/source-node.js":
/*!****************************************************!*\
  !*** ./node_modules/source-map/lib/source-node.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator = __webpack_require__(/*! ./source-map-generator */ "./node_modules/source-map/lib/source-map-generator.js").SourceMapGenerator;
var util = __webpack_require__(/*! ./util */ "./node_modules/source-map/lib/util.js");

// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var REGEX_NEWLINE = /(\r?\n)/;

// Newline character code for charCodeAt() comparisons
var NEWLINE_CODE = 10;

// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var isSourceNode = "$$$isSourceNode$$$";

/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */
function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null) this.add(aChunks);
}

/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */
SourceNode.fromStringWithSourceMap =
  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    // The SourceNode we want to fill with the generated code
    // and the SourceMap
    var node = new SourceNode();

    // All even indices of this array are one line of the generated code,
    // while all odd indices are the newlines between two adjacent lines
    // (since `REGEX_NEWLINE` captures its match).
    // Processed fragments are accessed by calling `shiftNextLine`.
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function() {
      var lineContents = getNextLine();
      // The last line of a file might not have a newline.
      var newLine = getNextLine() || "";
      return lineContents + newLine;

      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ?
            remainingLines[remainingLinesIndex++] : undefined;
      }
    };

    // We need to remember the position of "remainingLines"
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

    // The generate SourceNodes we need a code range.
    // To extract it current and last mapping is used.
    // Here we store the last mapping.
    var lastMapping = null;

    aSourceMapConsumer.eachMapping(function (mapping) {
      if (lastMapping !== null) {
        // We add the code from "lastMapping" to "mapping":
        // First check if there is a new line in between.
        if (lastGeneratedLine < mapping.generatedLine) {
          // Associate first line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
          lastGeneratedLine++;
          lastGeneratedColumn = 0;
          // The remaining code is added without mapping
        } else {
          // There is no new line in between.
          // Associate the code between "lastGeneratedColumn" and
          // "mapping.generatedColumn" with "lastMapping"
          var nextLine = remainingLines[remainingLinesIndex] || '';
          var code = nextLine.substr(0, mapping.generatedColumn -
                                        lastGeneratedColumn);
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
                                              lastGeneratedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
          addMappingWithCode(lastMapping, code);
          // No more remaining code, continue
          lastMapping = mapping;
          return;
        }
      }
      // We add the generated code until the first mapping
      // to the SourceNode without any mapping.
      // Each line is added as separate string.
      while (lastGeneratedLine < mapping.generatedLine) {
        node.add(shiftNextLine());
        lastGeneratedLine++;
      }
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex] || '';
        node.add(nextLine.substr(0, mapping.generatedColumn));
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this);
    // We have processed all mappings.
    if (remainingLinesIndex < remainingLines.length) {
      if (lastMapping) {
        // Associate the remaining code in the current line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
      }
      // and add the remaining lines without any mapping
      node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }

    // Copy sourcesContent into SourceNode
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aRelativePath != null) {
          sourceFile = util.join(aRelativePath, sourceFile);
        }
        node.setSourceContent(sourceFile, content);
      }
    });

    return node;

    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === undefined) {
        node.add(code);
      } else {
        var source = aRelativePath
          ? util.join(aRelativePath, mapping.source)
          : mapping.source;
        node.add(new SourceNode(mapping.originalLine,
                                mapping.originalColumn,
                                source,
                                code,
                                mapping.name));
      }
    }
  };

/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function (chunk) {
      this.add(chunk);
    }, this);
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length-1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;
  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];
    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    }
    else {
      if (chunk !== '') {
        aFn(chunk, { source: this.source,
                     line: this.line,
                     column: this.column,
                     name: this.name });
      }
    }
  }
};

/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */
SourceNode.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;
  if (len > 0) {
    newChildren = [];
    for (i = 0; i < len-1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }
    newChildren.push(this.children[i]);
    this.children = newChildren;
  }
  return this;
};

/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */
SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
  var lastChild = this.children[this.children.length - 1];
  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  }
  else if (typeof lastChild === 'string') {
    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
  }
  else {
    this.children.push(''.replace(aPattern, aReplacement));
  }
  return this;
};

/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */
SourceNode.prototype.setSourceContent =
  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  };

/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walkSourceContents =
  function SourceNode_walkSourceContents(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) {
      if (this.children[i][isSourceNode]) {
        this.children[i].walkSourceContents(aFn);
      }
    }

    var sources = Object.keys(this.sourceContents);
    for (var i = 0, len = sources.length; i < len; i++) {
      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    }
  };

/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */
SourceNode.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function (chunk) {
    str += chunk;
  });
  return str;
};

/**
 * Returns the string representation of this source node along with a source
 * map.
 */
SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function (chunk, original) {
    generated.code += chunk;
    if (original.source !== null
        && original.line !== null
        && original.column !== null) {
      if(lastOriginalSource !== original.source
         || lastOriginalLine !== original.line
         || lastOriginalColumn !== original.column
         || lastOriginalName !== original.name) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }
      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }
    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0;
        // Mappings end at eol
        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function (sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });

  return { code: generated.code, map: map };
};

exports.SourceNode = SourceNode;


/***/ }),

/***/ "./node_modules/source-map/lib/util.js":
/*!*********************************************!*\
  !*** ./node_modules/source-map/lib/util.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf('/');
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;


/***/ }),

/***/ "./node_modules/source-map/source-map.js":
/*!***********************************************!*\
  !*** ./node_modules/source-map/source-map.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = __webpack_require__(/*! ./lib/source-map-generator */ "./node_modules/source-map/lib/source-map-generator.js").SourceMapGenerator;
exports.SourceMapConsumer = __webpack_require__(/*! ./lib/source-map-consumer */ "./node_modules/source-map/lib/source-map-consumer.js").SourceMapConsumer;
exports.SourceNode = __webpack_require__(/*! ./lib/source-node */ "./node_modules/source-map/lib/source-node.js").SourceNode;


/***/ }),

/***/ "react-dom/server":
/*!********************************************************************************************!*\
  !*** external "/Users/stassribnyi/pet projects/personal/node_modules/react-dom/server.js" ***!
  \********************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("/Users/stassribnyi/pet projects/personal/node_modules/react-dom/server.js");

/***/ }),

/***/ "react":
/*!***************************************************************************************!*\
  !*** external "/Users/stassribnyi/pet projects/personal/node_modules/react/index.js" ***!
  \***************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("/Users/stassribnyi/pet projects/personal/node_modules/react/index.js");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!****************************************!*\
  !*** ./.cache/develop-static-entry.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/merge */ "./node_modules/lodash/merge.js");
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _api_runner_ssr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api-runner-ssr */ "./.cache/api-runner-ssr.js");


/* global BROWSER_ESM_ONLY */


 // import testRequireError from "./test-require-error"
// For some extremely mysterious reason, webpack adds the above module *after*
// this module so that when this code runs, testRequireError is undefined.
// So in the meantime, we'll just inline it.

const testRequireError = (moduleName, err) => {
  const regex = new RegExp(`Error: Cannot find module\\s.${moduleName}`);
  const firstLine = err.toString().split(`\n`)[0];
  return regex.test(firstLine);
};

let Html;

try {
  Html = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../src/html'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
} catch (err) {
  if (testRequireError(`../src/html`, err)) {
    Html = __webpack_require__(/*! ./default-html */ "./.cache/default-html.js");
  } else {
    console.log(`There was an error requiring "src/html.js"\n\n`, err, `\n\n`);
    process.exit();
  }
}

Html = Html && Html.__esModule ? Html.default : Html;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (({
  pagePath
}) => {
  let headComponents = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("meta", {
    key: "environment",
    name: "note",
    content: "environment=development"
  })];
  let htmlAttributes = {};
  let bodyAttributes = {};
  let preBodyComponents = [];
  let postBodyComponents = [];
  let bodyProps = {};
  let htmlStr;

  const setHeadComponents = components => {
    headComponents = headComponents.concat(components);
  };

  const setHtmlAttributes = attributes => {
    htmlAttributes = lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()(htmlAttributes, attributes);
  };

  const setBodyAttributes = attributes => {
    bodyAttributes = lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()(bodyAttributes, attributes);
  };

  const setPreBodyComponents = components => {
    preBodyComponents = preBodyComponents.concat(components);
  };

  const setPostBodyComponents = components => {
    postBodyComponents = postBodyComponents.concat(components);
  };

  const setBodyProps = props => {
    bodyProps = lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()({}, bodyProps, props);
  };

  const getHeadComponents = () => headComponents;

  const replaceHeadComponents = components => {
    headComponents = components;
  };

  const getPreBodyComponents = () => preBodyComponents;

  const replacePreBodyComponents = components => {
    preBodyComponents = components;
  };

  const getPostBodyComponents = () => postBodyComponents;

  const replacePostBodyComponents = components => {
    postBodyComponents = components;
  };

  (0,_api_runner_ssr__WEBPACK_IMPORTED_MODULE_3__.apiRunner)(`onRenderBody`, {
    setHeadComponents,
    setHtmlAttributes,
    setBodyAttributes,
    setPreBodyComponents,
    setPostBodyComponents,
    setBodyProps,
    pathname: pagePath
  });
  (0,_api_runner_ssr__WEBPACK_IMPORTED_MODULE_3__.apiRunner)(`onPreRenderHTML`, {
    getHeadComponents,
    replaceHeadComponents,
    getPreBodyComponents,
    replacePreBodyComponents,
    getPostBodyComponents,
    replacePostBodyComponents,
    pathname: pagePath
  });
  const htmlElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Html, { ...bodyProps,
    body: ``,
    headComponents: headComponents.concat([/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("script", {
      key: `io`,
      src: "/socket.io/socket.io.js"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("link", {
      key: "styles",
      rel: "stylesheet",
      href: "/commons.css"
    })]),
    htmlAttributes,
    bodyAttributes,
    preBodyComponents,
    postBodyComponents: postBodyComponents.concat([ true && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("script", {
      key: `polyfill`,
      src: "/polyfill.js",
      noModule: true
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("script", {
      key: `framework`,
      src: "/framework.js"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("script", {
      key: `commons`,
      src: "/commons.js"
    })].filter(Boolean))
  });
  htmlStr = (0,react_dom_server__WEBPACK_IMPORTED_MODULE_2__.renderToStaticMarkup)(htmlElement);
  htmlStr = `<!DOCTYPE html>${htmlStr}`;
  return htmlStr;
});
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=render-page.js.map
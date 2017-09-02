/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function isFunction(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? toString.call(value) === '[object Array]' : false;
};

exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      column = undefined;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  try {
    if (loc) {
      this.lineNumber = line;

      // Work around issue under safari where we can't directly set the column value
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(this, 'column', {
          value: column,
          enumerable: true
        });
      } else {
        this.column = column;
      }
    }
  } catch (nop) {
    /* Ignore if the browser is very particular */
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _utils = __webpack_require__(0);

var _exception = __webpack_require__(1);

var _exception2 = _interopRequireDefault(_exception);

var _helpers = __webpack_require__(13);

var _decorators = __webpack_require__(21);

var _logger = __webpack_require__(23);

var _logger2 = _interopRequireDefault(_logger);

var VERSION = '4.0.10';
exports.VERSION = VERSION;
var COMPILER_REVISION = 7;

exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0'
};

exports.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  }
};

var log = _logger2['default'].log;

exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var STRAIGHT_DIRECTIONS = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
var DIAGONAL_DIRECTIONS = [{ x: 1, y: 1 }, { x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: -1 }];
var ALL_DIRECTIONS = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 1 }, { x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: -1 }];
var MOVING_BEHAVIORS = {
    // default: stops at first piece with option to kill an enemy piece
    HITTING: 0,
    // stopping is like hitting but without the option to kill (pawn)
    STOPPING: 1
};

var Piece = function () {
    function Piece(owner, name) {
        _classCallCheck(this, Piece);

        this.owner = owner;
        this._name = name;
        this.hasMoved = false;
    }

    _createClass(Piece, [{
        key: "getPossibleMoves",
        value: function getPossibleMoves(game, x, y) {
            throw "NotImplemented";
        }
    }, {
        key: "getMovesInDirection",
        value: function getMovesInDirection(game, x, y, direction) {
            var maxDistance = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
            var behaviour = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : MOVING_BEHAVIORS.HITTING;

            var pos = { x: x, y: y };
            var moves = [];
            var distance = 0;

            while (true) {
                distance++;
                if (distance > maxDistance) break;

                pos.x += direction.x;
                pos.y += direction.y;
                try {
                    var cell = game.getCell(pos.x, pos.y);
                    if (!cell.tile.passable) break;

                    if (cell.piece) {
                        if (behaviour !== MOVING_BEHAVIORS.STOPPING && cell.piece.owner !== this.owner) moves.push({ x: pos.x, y: pos.y });
                        break;
                    }

                    moves.push({ x: pos.x, y: pos.y });
                } catch (err) {
                    // break if OutsideOfBoard. else its an unexpected error
                    if (err !== "OutsideOfBoard") throw err;
                    break;
                }
            }
            return moves;
        }
    }, {
        key: "getOwnerDirection",
        value: function getOwnerDirection() {
            switch (this.owner.number) {
                case 1:
                    return { x: 0, y: -1 };
                case 2:
                    return { x: 0, y: 1 };
                default:
                    throw 'UnknownOwnerDirection';
            }
        }
    }, {
        key: "name",
        get: function get() {
            return this._name;
        }
    }, {
        key: "class",
        get: function get() {
            throw "NotImplemented";
        }
    }]);

    return Piece;
}();

var BlackWhiteChessPiece = function (_Piece) {
    _inherits(BlackWhiteChessPiece, _Piece);

    function BlackWhiteChessPiece(owner, name, filename) {
        _classCallCheck(this, BlackWhiteChessPiece);

        var _this = _possibleConstructorReturn(this, (BlackWhiteChessPiece.__proto__ || Object.getPrototypeOf(BlackWhiteChessPiece)).call(this, owner, name));

        _this.filename = filename;
        return _this;
    }

    _createClass(BlackWhiteChessPiece, [{
        key: "class",
        get: function get() {
            if (this.owner.number === 1) return "white";
            if (this.owner.number === 2) return "black";
            throw "InvalidOwnerNumber";
        }
    }]);

    return BlackWhiteChessPiece;
}(Piece);

var Pawn = exports.Pawn = function (_BlackWhiteChessPiece) {
    _inherits(Pawn, _BlackWhiteChessPiece);

    function Pawn(owner) {
        _classCallCheck(this, Pawn);

        return _possibleConstructorReturn(this, (Pawn.__proto__ || Object.getPrototypeOf(Pawn)).call(this, owner, "Pawn"));
    }

    _createClass(Pawn, [{
        key: "getPossibleMoves",
        value: function getPossibleMoves(game, x, y) {
            var moves = [];

            // a pawn can move two spaces if it hasn't moved yet
            var distance = this.hasMoved ? 1 : 2;

            // move in front
            Array.prototype.push.apply(moves, this.getMovesInDirection(game, x, y, this.getOwnerDirection(), distance, MOVING_BEHAVIORS.STOPPING));

            // diagonal moves - only available if the move can kill an opposing piece
            var hittingMoves = [{ x: 1, y: this.getOwnerDirection().y }, { x: -1, y: this.getOwnerDirection().y }];
            for (var d = 0; d < hittingMoves.length; d++) {
                var possibleHittingMove = this.getMovesInDirection(game, x, y, hittingMoves[d], 1);
                if (possibleHittingMove.length === 0) continue;
                var possibleMove = possibleHittingMove[0];
                // check for opposing piece
                if (game.getCell(possibleMove).piece) moves.push(possibleMove);
            }

            // TODO: en passent - oder o eifach nid..

            return moves;
        }
    }, {
        key: "class",
        get: function get() {
            return 'piece-pawn-' + _get(Pawn.prototype.__proto__ || Object.getPrototypeOf(Pawn.prototype), "class", this);
        }
    }]);

    return Pawn;
}(BlackWhiteChessPiece);

var God = exports.God = function (_BlackWhiteChessPiece2) {
    _inherits(God, _BlackWhiteChessPiece2);

    function God(owner) {
        _classCallCheck(this, God);

        return _possibleConstructorReturn(this, (God.__proto__ || Object.getPrototypeOf(God)).call(this, owner, "God"));
    }

    _createClass(God, [{
        key: "getPossibleMoves",
        value: function getPossibleMoves(game, x, y) {
            var moves = [];
            for (var _y = 0; _y < game.board.length; _y++) {
                for (var _x3 = 0; _x3 < game.board[_y].length; _x3++) {
                    moves.push({ x: _x3, y: _y });
                }
            }
            return moves;
        }
    }, {
        key: "class",
        get: function get() {
            return 'piece-god-' + _get(God.prototype.__proto__ || Object.getPrototypeOf(God.prototype), "class", this);
        }
    }]);

    return God;
}(BlackWhiteChessPiece);

var Rook = exports.Rook = function (_BlackWhiteChessPiece3) {
    _inherits(Rook, _BlackWhiteChessPiece3);

    function Rook(owner) {
        _classCallCheck(this, Rook);

        return _possibleConstructorReturn(this, (Rook.__proto__ || Object.getPrototypeOf(Rook)).call(this, owner, "Rook"));
    }

    _createClass(Rook, [{
        key: "getPossibleMoves",
        value: function getPossibleMoves(game, x, y) {
            var moves = [];

            for (var d = 0; d < STRAIGHT_DIRECTIONS.length; d++) {
                Array.prototype.push.apply(moves, this.getMovesInDirection(game, x, y, STRAIGHT_DIRECTIONS[d]));
            }

            return moves;
        }
    }, {
        key: "class",
        get: function get() {
            return 'piece-rook-' + _get(Rook.prototype.__proto__ || Object.getPrototypeOf(Rook.prototype), "class", this);
        }
    }]);

    return Rook;
}(BlackWhiteChessPiece);

var Knight = exports.Knight = function (_BlackWhiteChessPiece4) {
    _inherits(Knight, _BlackWhiteChessPiece4);

    function Knight(owner) {
        _classCallCheck(this, Knight);

        return _possibleConstructorReturn(this, (Knight.__proto__ || Object.getPrototypeOf(Knight)).call(this, owner, "Knight"));
    }

    _createClass(Knight, [{
        key: "getPossibleMoves",
        value: function getPossibleMoves(game, x, y) {
            var relativeMoves = [{ x: 2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: 1 }, { x: -2, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: 1, y: -2 }, { x: -1, y: -2 }];
            var moves = [];

            for (var d = 0; d < relativeMoves.length; d++) {
                Array.prototype.push.apply(moves, this.getMovesInDirection(game, x, y, relativeMoves[d], 1));
            }

            return moves;
        }
    }, {
        key: "class",
        get: function get() {
            return 'piece-knight-' + _get(Knight.prototype.__proto__ || Object.getPrototypeOf(Knight.prototype), "class", this);
        }
    }]);

    return Knight;
}(BlackWhiteChessPiece);

var Bishop = exports.Bishop = function (_BlackWhiteChessPiece5) {
    _inherits(Bishop, _BlackWhiteChessPiece5);

    function Bishop(owner) {
        _classCallCheck(this, Bishop);

        return _possibleConstructorReturn(this, (Bishop.__proto__ || Object.getPrototypeOf(Bishop)).call(this, owner, "Bishop"));
    }

    _createClass(Bishop, [{
        key: "getPossibleMoves",
        value: function getPossibleMoves(game, x, y) {
            var moves = [];

            for (var d = 0; d < DIAGONAL_DIRECTIONS.length; d++) {
                Array.prototype.push.apply(moves, this.getMovesInDirection(game, x, y, DIAGONAL_DIRECTIONS[d]));
            }

            return moves;
        }
    }, {
        key: "class",
        get: function get() {
            return 'piece-bishop-' + _get(Bishop.prototype.__proto__ || Object.getPrototypeOf(Bishop.prototype), "class", this);
        }
    }]);

    return Bishop;
}(BlackWhiteChessPiece);

var Queen = exports.Queen = function (_BlackWhiteChessPiece6) {
    _inherits(Queen, _BlackWhiteChessPiece6);

    function Queen(owner) {
        _classCallCheck(this, Queen);

        return _possibleConstructorReturn(this, (Queen.__proto__ || Object.getPrototypeOf(Queen)).call(this, owner, "Queen"));
    }

    _createClass(Queen, [{
        key: "getPossibleMoves",
        value: function getPossibleMoves(game, x, y) {
            var moves = [];

            for (var d = 0; d < ALL_DIRECTIONS.length; d++) {
                Array.prototype.push.apply(moves, this.getMovesInDirection(game, x, y, ALL_DIRECTIONS[d]));
            }

            return moves;
        }
    }, {
        key: "class",
        get: function get() {
            return 'piece-queen-' + _get(Queen.prototype.__proto__ || Object.getPrototypeOf(Queen.prototype), "class", this);
        }
    }]);

    return Queen;
}(BlackWhiteChessPiece);

var King = exports.King = function (_BlackWhiteChessPiece7) {
    _inherits(King, _BlackWhiteChessPiece7);

    function King(owner) {
        _classCallCheck(this, King);

        return _possibleConstructorReturn(this, (King.__proto__ || Object.getPrototypeOf(King)).call(this, owner, "King"));
    }

    _createClass(King, [{
        key: "getPossibleMoves",
        value: function getPossibleMoves(game, x, y) {
            var moves = [];

            for (var d = 0; d < ALL_DIRECTIONS.length; d++) {
                Array.prototype.push.apply(moves, this.getMovesInDirection(game, x, y, ALL_DIRECTIONS[d], 1));
            }

            return moves;
        }
    }, {
        key: "class",
        get: function get() {
            return 'piece-king-' + _get(King.prototype.__proto__ || Object.getPrototypeOf(King.prototype), "class", this);
        }
    }]);

    return King;
}(BlackWhiteChessPiece);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gameserver = __webpack_require__(6);

var _gameserver2 = _interopRequireDefault(_gameserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// express
var express = __webpack_require__(30);
var app = express();
app.use(express.static('public'));

var server = app.listen(3344);

// io
var io = __webpack_require__(31).listen(server);

var gameserver = new _gameserver2.default();

io.on('connection', function (socket) {
    gameserver.connect(socket);
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(7);

var _player2 = _interopRequireDefault(_player);

var _game = __webpack_require__(8);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// server side
var GameServer = function () {
    function GameServer() {
        _classCallCheck(this, GameServer);

        this.players = [];
        this.game = new _game2.default({}, new _player2.default('Mew'), new _player2.default('Mewtwo'));
    }

    _createClass(GameServer, [{
        key: 'connect',
        value: function connect(socket) {
            this.players.push(socket);

            // push game state
            socket.emit('setup game', { rules: {}, player1: this.game.player1.name, player2: this.game.player2.name });
            for (var i = 0; i < this.game.gameLog.length; i++) {
                socket.emit('game action', this.game.gameLog[i]);
            }

            socket.on('game action', function (data) {
                console.log(data);

                try {
                    var result = this.game.execute(data);

                    if (result) {
                        this.distributeActions(result);
                    }
                } catch (err) {
                    console.log(err);
                    socket.emit('error message', err);
                }
            }.bind(this));

            socket.on('disconnect', function () {
                console.log('user disconnected');
                this.players.splice(this.players.indexOf(socket), 1);
            }.bind(this));
        }
    }, {
        key: 'distributeActions',
        value: function distributeActions(actions, player) {
            // no player: distribute to every player
            if (player === undefined) {
                for (var i = 0; i < this.players.length; i++) {
                    this.distributeActions(actions, this.players[i]);
                }
                return;
            }

            if (!Array.isArray(actions)) actions = [actions];

            for (var _i = 0; _i < actions.length; _i++) {
                player.emit('game action', actions[_i]);
            }
        }
    }]);

    return GameServer;
}();

exports.default = GameServer;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function Player(name) {
    _classCallCheck(this, Player);

    this.name = name;
    this.number = -1;
};

exports.default = Player;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cell = __webpack_require__(9);

var _cell2 = _interopRequireDefault(_cell);

var _piece = __webpack_require__(3);

var _tile = __webpack_require__(27);

var _kingdead = __webpack_require__(28);

var _kingdead2 = _interopRequireDefault(_kingdead);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(rules, player1, player2) {
        _classCallCheck(this, Game);

        this.rules = rules;
        // stores all moves of the game
        this.gameLog = [];
        // stores moves of players until every player has submitted
        this.currentMoveCache = [];
        this.player1 = player1;
        this.player1.number = 1;
        this.player2 = player2;
        this.player2.number = 2;
        this.playerCount = 2;

        this.board = this.generateCheckedBoard(8, 8);
        this.height = this.board.length;
        this.width = this.board[0].length;

        for (var x = 0; x < 8; x++) {
            this.board[1][x].piece = new _piece.Pawn(this.player2);
            this.board[6][x].piece = new _piece.Pawn(this.player1);
        }
        this.board[0][0].piece = new _piece.Rook(this.player2);
        this.board[0][7].piece = new _piece.Rook(this.player2);
        this.board[7][0].piece = new _piece.Rook(this.player1);
        this.board[7][7].piece = new _piece.Rook(this.player1);
        this.board[0][1].piece = new _piece.Knight(this.player2);
        this.board[0][6].piece = new _piece.Knight(this.player2);
        this.board[7][1].piece = new _piece.Knight(this.player1);
        this.board[7][6].piece = new _piece.Knight(this.player1);
        this.board[0][2].piece = new _piece.Bishop(this.player2);
        this.board[0][5].piece = new _piece.Bishop(this.player2);
        this.board[7][2].piece = new _piece.Bishop(this.player1);
        this.board[7][5].piece = new _piece.Bishop(this.player1);
        this.board[0][4].piece = new _piece.Queen(this.player2);
        this.board[7][4].piece = new _piece.Queen(this.player1);
        this.board[0][3].piece = new _piece.King(this.player2);
        this.board[7][3].piece = new _piece.King(this.player1);
        this.board[1][0].piece = new _piece.God(this.player2);
        this.board[6][7].piece = new _piece.God(this.player1);

        this.rules.loseConditions = [new _kingdead2.default()];

        // save coords on cell for easier lookup
        for (var y = 0; y < this.board.length; y++) {
            for (var _x = 0; _x < this.board[y].length; _x++) {
                var cell = this.board[y][_x];
                cell.x = _x;
                cell.y = y;
            }
        }
    }

    // generates a logEntry for a move
    // this logEntry can then be executed by all players


    _createClass(Game, [{
        key: 'prepareMove',
        value: function prepareMove(sourceCell, targetCell) {
            if (!sourceCell.piece) throw 'NoPieceToMove';

            var logEntry = {
                action: 'move',
                playerNumber: sourceCell.piece.owner.number,
                movedPieceClass: sourceCell.piece.class,
                source: { x: sourceCell.x, y: sourceCell.y },
                target: { x: targetCell.x, y: targetCell.y },
                destroyed: false // this is set when two pieces collide
            };

            if (targetCell.piece) logEntry.killedPieceClass = targetCell.piece.class;

            return logEntry;
        }

        // checks if a move is valid

    }, {
        key: 'checkMove',
        value: function checkMove(logEntry) {
            // check if the player already made his move
            for (var i = 0; i < this.currentMoveCache.length; i++) {
                if (this.currentMoveCache[i].playerNumber === logEntry.playerNumber) throw 'OutOfSyncError: Player already made his move';
            }var sourceCell = this.getCell(logEntry.source);
            var targetCell = this.getCell(logEntry.target);
            if (!sourceCell.piece) throw 'NoPieceToMove';
            if (sourceCell.piece.class !== logEntry.movedPieceClass) throw 'OutOfSyncError: wrong source piece class';
            if (logEntry.killedPieceClass && logEntry.killedPieceClass !== targetCell.piece.class) throw 'OutOfSyncError: wrong killed piece class';
        }
    }, {
        key: 'execute',
        value: function execute(logEntry) {
            if (logEntry.action === 'move') {
                this.checkMove(logEntry);
                this.currentMoveCache.push(logEntry);

                // wait for other players
                if (this.currentMoveCache.length < this.playerCount) {
                    return {
                        action: 'notification',
                        type: 'PlayerMadeMove',
                        playerNumber: logEntry.playerNumber
                    };
                }

                // build sym move
                var symLogEntry = {
                    action: 'sym move',
                    moves: this.currentMoveCache
                };

                // check and mark colliding piece
                for (var i = 0; i < symLogEntry.moves.length; i++) {
                    for (var j = 0; j < symLogEntry.moves.length; j++) {
                        if (i !== j && symLogEntry.moves[i].target.x === symLogEntry.moves[j].target.x && symLogEntry.moves[i].target.y === symLogEntry.moves[j].target.y) {
                            // a collision!
                            symLogEntry.moves[i].destroyed = true;
                            break;
                        }
                    }
                }

                this.currentMoveCache = [];
                this.execute(symLogEntry);
                console.log(symLogEntry);
                var gameEnd = this.checkWinCondition();
                if (gameEnd) {
                    this.gameLog.push(gameEnd);
                    return [symLogEntry, gameEnd];
                }
                return symLogEntry;
            }
            if (logEntry.action === 'sym move') {
                var pieces = [];

                // pick up pieces
                for (var _i = 0; _i < logEntry.moves.length; _i++) {
                    var sourceCell = this.getCell(logEntry.moves[_i].source);
                    pieces[_i] = sourceCell.piece;
                    delete sourceCell.piece;
                }

                // put piece down
                for (var _j = 0; _j < logEntry.moves.length; _j++) {
                    // do not put piece down if it was destroyed
                    if (logEntry.moves[_j].destroyed) continue;

                    var targetCell = this.getCell(logEntry.moves[_j].target);
                    targetCell.piece = pieces[_j];
                    targetCell.piece.hasMoved = true;
                }

                this.gameLog.push(logEntry);
            }
        }
    }, {
        key: 'getPossibleMoves',
        value: function getPossibleMoves(cell) {
            return cell.piece.getPossibleMoves(this, cell.x, cell.y);
        }
    }, {
        key: 'checkWinCondition',
        value: function checkWinCondition() {
            var playersStillAlive = new Set([this.player1, this.player2]);
            for (var i = 0; i < this.rules.loseConditions.length; i++) {
                var losers = this.rules.loseConditions[i].checkCondition(this);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = losers.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var loser = _step.value;

                        playersStillAlive.delete(loser);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }

            switch (playersStillAlive.size) {
                case 0:
                    return {
                        action: 'gameEnd',
                        winner: 0 // number 0: draw
                    };
                case 1:
                    return {
                        action: 'gameEnd',
                        winner: [].concat(_toConsumableArray(playersStillAlive))[0].number
                    };
            }
        }
    }, {
        key: 'getCell',
        value: function getCell(x, y) {
            // pass only the x param to be handled as object: {x: 1, y: 1}
            if (y === undefined) {
                y = x.y;
                x = x.x;
            }

            if (y < 0 || y >= this.board.length) throw "OutsideOfBoard";
            var row = this.board[y];
            if (x < 0 || x >= row.length) throw "OutsideOfBoard";
            return row[x];
        }
    }, {
        key: 'generateCheckedBoard',
        value: function generateCheckedBoard(width, height) {
            var board = [];
            for (var y = 0; y < height; y++) {
                board[y] = [];
                for (var x = 0; x < width; x++) {
                    board[y][x] = new _cell2.default((x + y) % 2 === 0 ? new _tile.BlackTile() : new _tile.WhiteTile());
                }
            }
            return board;
        }
    }]);

    return Game;
}();

exports.default = Game;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function () {
    function Cell(tile, piece) {
        _classCallCheck(this, Cell);

        this._tile = tile;
        this.piece = piece;
        this.x = -1;
        this.y = -1;
    }

    _createClass(Cell, [{
        key: "render",
        value: function render() {
            var template = __webpack_require__(10);
            var params = { cell: this, classes: this.classes.join(' ') };
            return template(params);
        }
    }, {
        key: "tile",
        get: function get() {
            return this._tile;
        }
    }, {
        key: "classes",
        get: function get() {
            var cls = this.tile.classes;
            if (this.piece) cls.push(this.piece.class);
            return cls;
        }
    }]);

    return Cell;
}();

exports.default = Cell;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(11);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <img src=\""
    + container.escapeExpression(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"image","hash":{},"data":data}) : helper)))
    + "\" />\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda;

  return "<td class=\""
    + alias2(((helper = (helper = helpers.classes || (depth0 != null ? depth0.classes : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"classes","hash":{},"data":data}) : helper)))
    + "\" data-x=\""
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.cell : depth0)) != null ? stack1.x : stack1), depth0))
    + "\" data-y=\""
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.cell : depth0)) != null ? stack1.y : stack1), depth0))
    + "\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.image : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>";
},"useData":true});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = __webpack_require__(12)['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

// istanbul ignore next

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj['default'] = obj;return newObj;
  }
}

var _handlebarsBase = __webpack_require__(2);

var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = __webpack_require__(24);

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = __webpack_require__(1);

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = __webpack_require__(25);

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = __webpack_require__(26);

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _helpersBlockHelperMissing = __webpack_require__(14);

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = __webpack_require__(15);

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = __webpack_require__(16);

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = __webpack_require__(17);

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = __webpack_require__(18);

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = __webpack_require__(19);

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = __webpack_require__(20);

var _helpersWith2 = _interopRequireDefault(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });
};

module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _utils = __webpack_require__(0);

var _exception = __webpack_require__(1);

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = _utils.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && (typeof context === 'undefined' ? 'undefined' : _typeof(context)) === 'object') {
      if (_utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else {
        var priorKey = undefined;

        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey !== undefined) {
          execIteration(priorKey, i - 1, true);
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

module.exports = exports['default'];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _exception = __webpack_require__(1);

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};

module.exports = exports['default'];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
  });
};

module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
        options = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }

    var level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;

    instance.log.apply(instance, args);
  });
};

module.exports = exports['default'];

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('lookup', function (obj, field) {
    return obj && obj[field];
  });
};

module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!_utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};

module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _decoratorsInline = __webpack_require__(22);

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function ret(context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;

    return ret;
  });
};

module.exports = exports['default'];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',

  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },

  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      if (!console[method]) {
        // eslint-disable-line no-console
        method = 'log';
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};

exports['default'] = logger;
module.exports = exports['default'];

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Build out our basic SafeString type


exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

// istanbul ignore next

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj['default'] = obj;return newObj;
  }
}

var _utils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_utils);

var _exception = __webpack_require__(1);

var _exception2 = _interopRequireDefault(_exception);

var _base = __webpack_require__(2);

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _base.COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    }
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + (typeof templateSpec === 'undefined' ? 'undefined' : _typeof(templateSpec)));
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name) {
      if (!(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    merge: function merge(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = container.merge(options.decorators, env.decorators);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var currentDepths = depths;
    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  // Use the current closure context to save the partial-block if this partial
  var currentPartialBlock = options.data && options.data['partial-block'];
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    (function () {
      options.data = _base.createFrame(options.data);
      // Wrapper function to get access to currentPartialBlock from the closure
      var fn = options.fn;
      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // Restore the partial-block from the closure for the execution of the block
        // i.e. the part inside the block of the partial call.
        options.data = _base.createFrame(options.data);
        options.data['partial-block'] = currentPartialBlock;
        return fn(context, options);
      };
      if (fn.partials) {
        options.partials = Utils.extend({}, options.partials, fn.partials);
      }
    })();
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global window */


exports.__esModule = true;

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};

module.exports = exports['default'];

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = function () {
    function Tile() {
        _classCallCheck(this, Tile);

        this.passable = true;
    }

    _createClass(Tile, [{
        key: "classes",
        get: function get() {
            throw "NotImplemented";
        }
    }]);

    return Tile;
}();

exports.default = Tile;

var BlackTile = exports.BlackTile = function (_Tile) {
    _inherits(BlackTile, _Tile);

    function BlackTile() {
        _classCallCheck(this, BlackTile);

        return _possibleConstructorReturn(this, (BlackTile.__proto__ || Object.getPrototypeOf(BlackTile)).apply(this, arguments));
    }

    _createClass(BlackTile, [{
        key: "classes",
        get: function get() {
            return ["tile-black"];
        }
    }]);

    return BlackTile;
}(Tile);

var WhiteTile = exports.WhiteTile = function (_Tile2) {
    _inherits(WhiteTile, _Tile2);

    function WhiteTile() {
        _classCallCheck(this, WhiteTile);

        return _possibleConstructorReturn(this, (WhiteTile.__proto__ || Object.getPrototypeOf(WhiteTile)).apply(this, arguments));
    }

    _createClass(WhiteTile, [{
        key: "classes",
        get: function get() {
            return ["tile-white"];
        }
    }]);

    return WhiteTile;
}(Tile);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _losecondition = __webpack_require__(29);

var _losecondition2 = _interopRequireDefault(_losecondition);

var _piece = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KingDead = function (_LoseCondition) {
    _inherits(KingDead, _LoseCondition);

    function KingDead() {
        _classCallCheck(this, KingDead);

        return _possibleConstructorReturn(this, (KingDead.__proto__ || Object.getPrototypeOf(KingDead)).apply(this, arguments));
    }

    _createClass(KingDead, [{
        key: "checkCondition",
        value: function checkCondition(game) {
            var players = new Set([game.player1, game.player2]);
            for (var y = 0; y < game.board.length; y++) {
                for (var x = 0; x < game.board[y].length; x++) {
                    if (game.board[y][x].piece instanceof _piece.King) players.delete(game.board[y][x].piece.owner);
                }
            }
            return players;
        }
    }]);

    return KingDead;
}(_losecondition2.default);

exports.default = KingDead;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoseCondition = function () {
    function LoseCondition() {
        _classCallCheck(this, LoseCondition);
    }

    _createClass(LoseCondition, [{
        key: 'checkCondition',

        // checks if a player lost according to the condition
        // return an array with all losing players
        value: function checkCondition(game) {
            throw 'NotImplementedError';
        }
    }]);

    return LoseCondition;
}();

exports.default = LoseCondition;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })
/******/ ]);
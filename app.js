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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = guid;
// from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cell = __webpack_require__(11);

var _cell2 = _interopRequireDefault(_cell);

var _tile = __webpack_require__(29);

var _guid = __webpack_require__(2);

var _guid2 = _interopRequireDefault(_guid);

var _pieceregistry = __webpack_require__(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(rules, name, player1, player2, isServer) {
        _classCallCheck(this, Game);

        this.id = (0, _guid2.default)();
        this.name = name;
        this.rules = rules;
        this.created = new Date();
        // stores all moves of the game
        this.gameLog = [];
        // stores moves of players until every player has submitted
        this.currentMoveCache = [];
        this.player1 = player1;
        this.player1.number = 1;
        this.player2 = player2;
        this.player2.number = 2;
        this.playerCount = 2;

        this.board = this.generateCheckedBoard(rules.boardWidth, rules.boardHeight);
        this.height = rules.boardHeight;
        this.width = rules.boardWidth;

        // save coords on cell for easier lookup
        for (var y = 0; y < this.board.length; y++) {
            for (var x = 0; x < this.board[y].length; x++) {
                var cell = this.board[y][x];
                cell.x = x;
                cell.y = y;
            }
        }

        // only do the moves on the server and then push them onto the client
        if (isServer) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = rules.setupMoves()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _logEntry = _step.value;

                    this.execute(_logEntry);
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
    }

    // generates a logEntry for a move
    // this logEntry can then be executed by all players


    _createClass(Game, [{
        key: 'checkMove',


        // checks if a move is valid
        value: function checkMove(logEntry) {
            // check if the player already made his move
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.currentMoveCache[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var move = _step2.value;

                    if (move.playerNumber === logEntry.playerNumber) throw 'OutOfSyncError: Player already made his move';
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            var sourceCell = this.getCell(logEntry.source);
            var targetCell = this.getCell(logEntry.target);
            if (!sourceCell.piece) throw 'NoPieceToMove';
            if (sourceCell.piece.class !== logEntry.movedPieceClass) throw 'OutOfSyncError: wrong source piece class';
            if (logEntry.capturedPieceClass && logEntry.capturedPieceClass !== targetCell.piece.class) throw 'OutOfSyncError: wrong captured piece class';
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

                // do special moves
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = logEntry.moves[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var move = _step3.value;

                        if (move.special === 'en-passant') {
                            var _targetCell = this.getCell(move.target.x, move.source.y);
                            delete _targetCell.piece;
                        }
                        if (move.special === 'promote') {
                            var targetCellFU = this.getCell(move.target.x, move.target.y);
                            var pieceClass = _pieceregistry.PIECE_REGISTRY[move.promotionPieceName];
                            var piece = new pieceClass(targetCellFU.piece.owner);
                            targetCellFU.piece = piece;
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                this.gameLog.push(logEntry);
            }

            if (logEntry.action === 'place piece') {
                var _pieceClass = _pieceregistry.PIECE_REGISTRY[logEntry.pieceName];
                var player = this.getPlayer(logEntry.playerNumber);
                var _piece = new _pieceClass(player);
                var cell = this.getCell(logEntry);
                cell.piece = _piece;
                this.gameLog.push(logEntry);
            }
        }
    }, {
        key: 'getPossibleMoves',
        value: regeneratorRuntime.mark(function getPossibleMoves(cell) {
            return regeneratorRuntime.wrap(function getPossibleMoves$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.delegateYield(cell.piece.getPossibleMoves(this, cell.x, cell.y), 't0', 1);

                        case 1:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, getPossibleMoves, this);
        })
    }, {
        key: 'checkWinCondition',
        value: function checkWinCondition() {
            var playersStillAlive = new Set([this.player1, this.player2]);
            for (var i = 0; i < this.rules.loseConditions.length; i++) {
                var losers = this.rules.loseConditions[i].checkCondition(this);
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = losers.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var loser = _step4.value;

                        playersStillAlive.delete(loser);
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
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
        key: 'getPlayer',
        value: function getPlayer(playerNumber) {
            if (playerNumber === 1) return this.player1;
            if (playerNumber === 2) return this.player2;
            throw "InvalidPlayerNumber";
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
    }], [{
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

            if (targetCell.piece) logEntry.capturedPieceClass = targetCell.piece.class;

            return logEntry;
        }
    }, {
        key: 'preparePlacePiece',
        value: function preparePlacePiece(x, y, playerNumber, pieceName) {
            var logEntry = {
                action: 'place piece',
                pieceName: pieceName,
                playerNumber: playerNumber,
                x: x,
                y: y
            };
            return logEntry;
        }
    }]);

    return Game;
}();

exports.default = Game;

/***/ }),
/* 4 */
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

var _helpers = __webpack_require__(15);

var _decorators = __webpack_require__(23);

var _logger = __webpack_require__(25);

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
        value: regeneratorRuntime.mark(function getMovesInDirection(game, x, y, direction) {
            var maxDistance = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 9999;
            var behaviour = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : MOVING_BEHAVIORS.HITTING;
            var pos, distance, cell;
            return regeneratorRuntime.wrap(function getMovesInDirection$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            pos = { x: x, y: y };
                            distance = 0;

                        case 2:
                            if (false) {
                                _context.next = 28;
                                break;
                            }

                            distance++;

                            if (!(distance > maxDistance)) {
                                _context.next = 6;
                                break;
                            }

                            return _context.abrupt("break", 28);

                        case 6:

                            pos.x += direction.x;
                            pos.y += direction.y;
                            _context.prev = 8;
                            cell = game.getCell(pos.x, pos.y);

                            if (cell.tile.passable) {
                                _context.next = 12;
                                break;
                            }

                            return _context.abrupt("break", 28);

                        case 12:
                            if (!cell.piece) {
                                _context.next = 17;
                                break;
                            }

                            if (!(behaviour !== MOVING_BEHAVIORS.STOPPING && cell.piece.owner !== this.owner)) {
                                _context.next = 16;
                                break;
                            }

                            _context.next = 16;
                            return { x: pos.x, y: pos.y };

                        case 16:
                            return _context.abrupt("break", 28);

                        case 17:
                            _context.next = 19;
                            return { x: pos.x, y: pos.y };

                        case 19:
                            _context.next = 26;
                            break;

                        case 21:
                            _context.prev = 21;
                            _context.t0 = _context["catch"](8);

                            if (!(_context.t0 !== "OutsideOfBoard")) {
                                _context.next = 25;
                                break;
                            }

                            throw _context.t0;

                        case 25:
                            return _context.abrupt("break", 28);

                        case 26:
                            _context.next = 2;
                            break;

                        case 28:
                        case "end":
                            return _context.stop();
                    }
                }
            }, getMovesInDirection, this, [[8, 21]]);
        })
    }, {
        key: "getPassableCell",
        value: function getPassableCell(game, x, y) {
            var cell = game.getCell(x, y);
            if (!cell.tile.passable) throw "CellNotPassable";
            return cell;
        }
    }, {
        key: "getOwnerDirection",
        value: function getOwnerDirection(playerNumber) {
            if (!playerNumber) playerNumber = this.owner.number;

            switch (playerNumber) {
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


        // this marks the promotion moves
        value: regeneratorRuntime.mark(function getPossibleMoves(game, x, y) {
            var possibleMoves, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, move;

            return regeneratorRuntime.wrap(function getPossibleMoves$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            possibleMoves = [].concat(_toConsumableArray(this.getPossibleMovesWithoutPromotion(game, x, y)));
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context2.prev = 4;

                            for (_iterator = possibleMoves[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                move = _step.value;

                                try {
                                    game.getCell(move.x, move.y + this.getOwnerDirection().y);
                                } catch (err) {
                                    // mark as promotion if next step would be outside the board
                                    if (err === "OutsideOfBoard") {
                                        move.special = 'promote';
                                    }
                                }
                            }
                            _context2.next = 12;
                            break;

                        case 8:
                            _context2.prev = 8;
                            _context2.t0 = _context2["catch"](4);
                            _didIteratorError = true;
                            _iteratorError = _context2.t0;

                        case 12:
                            _context2.prev = 12;
                            _context2.prev = 13;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 15:
                            _context2.prev = 15;

                            if (!_didIteratorError) {
                                _context2.next = 18;
                                break;
                            }

                            throw _iteratorError;

                        case 18:
                            return _context2.finish(15);

                        case 19:
                            return _context2.finish(12);

                        case 20:
                            return _context2.delegateYield(possibleMoves, "t1", 21);

                        case 21:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, getPossibleMoves, this, [[4, 8, 12, 20], [13,, 15, 19]]);
        })
    }, {
        key: "getPossibleMovesWithoutPromotion",
        value: regeneratorRuntime.mark(function getPossibleMovesWithoutPromotion(game, x, y) {
            var distance, hittingMoves, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, hittingMove, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, move, cell, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, logEntry;

            return regeneratorRuntime.wrap(function getPossibleMovesWithoutPromotion$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            // a pawn can move two spaces if it hasn't moved yet
                            distance = this.hasMoved ? 1 : 2;

                            // move in front

                            return _context3.delegateYield(this.getMovesInDirection(game, x, y, this.getOwnerDirection(), distance, MOVING_BEHAVIORS.STOPPING), "t0", 2);

                        case 2:

                            // diagonal moves - only available if the move can kill an opposing piece
                            hittingMoves = [{ x: 1, y: this.getOwnerDirection().y }, { x: -1, y: this.getOwnerDirection().y }];
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context3.prev = 6;
                            _iterator2 = hittingMoves[Symbol.iterator]();

                        case 8:
                            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                _context3.next = 75;
                                break;
                            }

                            hittingMove = _step2.value;

                            // move one field diagonal and check
                            _iteratorNormalCompletion3 = true;
                            _didIteratorError3 = false;
                            _iteratorError3 = undefined;
                            _context3.prev = 13;
                            _iterator3 = this.getMovesInDirection(game, x, y, hittingMove, 1)[Symbol.iterator]();

                        case 15:
                            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                _context3.next = 58;
                                break;
                            }

                            move = _step3.value;

                            if (!game.getCell(move).piece) {
                                _context3.next = 20;
                                break;
                            }

                            _context3.next = 20;
                            return move;

                        case 20:
                            _context3.prev = 20;
                            cell = this.getPassableCell(game, x + hittingMove.x, y);

                            if (!(cell.piece && cell.piece.name === "Pawn" && cell.piece.owner !== this.owner)) {
                                _context3.next = 51;
                                break;
                            }

                            // check game history
                            _iteratorNormalCompletion4 = true;
                            _didIteratorError4 = false;
                            _iteratorError4 = undefined;
                            _context3.prev = 26;
                            _iterator4 = this.lastTurnActions(game)[Symbol.iterator]();

                        case 28:
                            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                                _context3.next = 37;
                                break;
                            }

                            logEntry = _step4.value;

                            if (!(logEntry.target.x === x + hittingMove.x && logEntry.target.y === y && logEntry.source.x === x + hittingMove.x && logEntry.source.y === y + -2 * this.getOwnerDirection(cell.piece.owner.number).y)) {
                                _context3.next = 34;
                                break;
                            }

                            move.special = 'en-passant';
                            _context3.next = 34;
                            return move;

                        case 34:
                            _iteratorNormalCompletion4 = true;
                            _context3.next = 28;
                            break;

                        case 37:
                            _context3.next = 43;
                            break;

                        case 39:
                            _context3.prev = 39;
                            _context3.t1 = _context3["catch"](26);
                            _didIteratorError4 = true;
                            _iteratorError4 = _context3.t1;

                        case 43:
                            _context3.prev = 43;
                            _context3.prev = 44;

                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }

                        case 46:
                            _context3.prev = 46;

                            if (!_didIteratorError4) {
                                _context3.next = 49;
                                break;
                            }

                            throw _iteratorError4;

                        case 49:
                            return _context3.finish(46);

                        case 50:
                            return _context3.finish(43);

                        case 51:
                            _context3.next = 55;
                            break;

                        case 53:
                            _context3.prev = 53;
                            _context3.t2 = _context3["catch"](20);

                        case 55:
                            _iteratorNormalCompletion3 = true;
                            _context3.next = 15;
                            break;

                        case 58:
                            _context3.next = 64;
                            break;

                        case 60:
                            _context3.prev = 60;
                            _context3.t3 = _context3["catch"](13);
                            _didIteratorError3 = true;
                            _iteratorError3 = _context3.t3;

                        case 64:
                            _context3.prev = 64;
                            _context3.prev = 65;

                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }

                        case 67:
                            _context3.prev = 67;

                            if (!_didIteratorError3) {
                                _context3.next = 70;
                                break;
                            }

                            throw _iteratorError3;

                        case 70:
                            return _context3.finish(67);

                        case 71:
                            return _context3.finish(64);

                        case 72:
                            _iteratorNormalCompletion2 = true;
                            _context3.next = 8;
                            break;

                        case 75:
                            _context3.next = 81;
                            break;

                        case 77:
                            _context3.prev = 77;
                            _context3.t4 = _context3["catch"](6);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context3.t4;

                        case 81:
                            _context3.prev = 81;
                            _context3.prev = 82;

                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }

                        case 84:
                            _context3.prev = 84;

                            if (!_didIteratorError2) {
                                _context3.next = 87;
                                break;
                            }

                            throw _iteratorError2;

                        case 87:
                            return _context3.finish(84);

                        case 88:
                            return _context3.finish(81);

                        case 89:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, getPossibleMovesWithoutPromotion, this, [[6, 77, 81, 89], [13, 60, 64, 72], [20, 53], [26, 39, 43, 51], [44,, 46, 50], [65,, 67, 71], [82,, 84, 88]]);
        })
    }, {
        key: "lastTurnActions",
        value: function lastTurnActions(game) {
            var logEntry = game.gameLog[game.gameLog.length - 1];
            if (logEntry.action === "sym move") return logEntry.moves;
            if (logEntry.action === "move") return [logEntry];
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
        value: regeneratorRuntime.mark(function getPossibleMoves(game, x, y) {
            var _y, _x3;

            return regeneratorRuntime.wrap(function getPossibleMoves$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _y = 0;

                        case 1:
                            if (!(_y < game.board.length)) {
                                _context4.next = 12;
                                break;
                            }

                            _x3 = 0;

                        case 3:
                            if (!(_x3 < game.board[_y].length)) {
                                _context4.next = 9;
                                break;
                            }

                            _context4.next = 6;
                            return { x: _x3, y: _y };

                        case 6:
                            _x3++;
                            _context4.next = 3;
                            break;

                        case 9:
                            _y++;
                            _context4.next = 1;
                            break;

                        case 12:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, getPossibleMoves, this);
        })
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
        value: regeneratorRuntime.mark(function getPossibleMoves(game, x, y) {
            var d;
            return regeneratorRuntime.wrap(function getPossibleMoves$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            d = 0;

                        case 1:
                            if (!(d < STRAIGHT_DIRECTIONS.length)) {
                                _context5.next = 6;
                                break;
                            }

                            return _context5.delegateYield(this.getMovesInDirection(game, x, y, STRAIGHT_DIRECTIONS[d]), "t0", 3);

                        case 3:
                            d++;
                            _context5.next = 1;
                            break;

                        case 6:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, getPossibleMoves, this);
        })
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
        value: regeneratorRuntime.mark(function getPossibleMoves(game, x, y) {
            var relativeMoves, d;
            return regeneratorRuntime.wrap(function getPossibleMoves$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            relativeMoves = [{ x: 2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: 1 }, { x: -2, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: 1, y: -2 }, { x: -1, y: -2 }];
                            d = 0;

                        case 2:
                            if (!(d < relativeMoves.length)) {
                                _context6.next = 7;
                                break;
                            }

                            return _context6.delegateYield(this.getMovesInDirection(game, x, y, relativeMoves[d], 1), "t0", 4);

                        case 4:
                            d++;
                            _context6.next = 2;
                            break;

                        case 7:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, getPossibleMoves, this);
        })
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
        value: regeneratorRuntime.mark(function getPossibleMoves(game, x, y) {
            var d;
            return regeneratorRuntime.wrap(function getPossibleMoves$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            d = 0;

                        case 1:
                            if (!(d < DIAGONAL_DIRECTIONS.length)) {
                                _context7.next = 6;
                                break;
                            }

                            return _context7.delegateYield(this.getMovesInDirection(game, x, y, DIAGONAL_DIRECTIONS[d]), "t0", 3);

                        case 3:
                            d++;
                            _context7.next = 1;
                            break;

                        case 6:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, getPossibleMoves, this);
        })
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
        value: regeneratorRuntime.mark(function getPossibleMoves(game, x, y) {
            var d;
            return regeneratorRuntime.wrap(function getPossibleMoves$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            d = 0;

                        case 1:
                            if (!(d < ALL_DIRECTIONS.length)) {
                                _context8.next = 6;
                                break;
                            }

                            return _context8.delegateYield(this.getMovesInDirection(game, x, y, ALL_DIRECTIONS[d]), "t0", 3);

                        case 3:
                            d++;
                            _context8.next = 1;
                            break;

                        case 6:
                        case "end":
                            return _context8.stop();
                    }
                }
            }, getPossibleMoves, this);
        })
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
        value: regeneratorRuntime.mark(function getPossibleMoves(game, x, y) {
            var d;
            return regeneratorRuntime.wrap(function getPossibleMoves$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            d = 0;

                        case 1:
                            if (!(d < ALL_DIRECTIONS.length)) {
                                _context9.next = 6;
                                break;
                            }

                            return _context9.delegateYield(this.getMovesInDirection(game, x, y, ALL_DIRECTIONS[d], 1), "t0", 3);

                        case 3:
                            d++;
                            _context9.next = 1;
                            break;

                        case 6:
                        case "end":
                            return _context9.stop();
                    }
                }
            }, getPossibleMoves, this);
        })
    }, {
        key: "class",
        get: function get() {
            return 'piece-king-' + _get(King.prototype.__proto__ || Object.getPrototypeOf(King.prototype), "class", this);
        }
    }]);

    return King;
}(BlackWhiteChessPiece);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7);
module.exports = __webpack_require__(8);


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gameserver = __webpack_require__(9);

var _gameserver2 = _interopRequireDefault(_gameserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// express
var express = __webpack_require__(34);
var app = express();
app.use(express.static('public'));

var server = app.listen(3344);

// io
var io = __webpack_require__(35).listen(server);

var gameserver = new _gameserver2.default();

io.on('connection', function (socket) {
    gameserver.connect(socket);
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _guid = __webpack_require__(2);

var _guid2 = _interopRequireDefault(_guid);

var _rulesets = __webpack_require__(10);

var _player = __webpack_require__(33);

var _player2 = _interopRequireDefault(_player);

var _game = __webpack_require__(3);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// server side
var GameServer = function () {
    function GameServer() {
        _classCallCheck(this, GameServer);

        this.players = {};
        this.games = [];
        this.lobbys = [{
            id: (0, _guid2.default)(),
            created: new Date(),
            ruleset: 'chess',
            name: 'Init Game',
            player: 'root'
        }];
    }

    _createClass(GameServer, [{
        key: "connect",
        value: function connect(socket) {
            var sessionID = (0, _guid2.default)();
            this.players[sessionID] = {
                sessionID: sessionID,
                socket: socket
            };

            socket.emit('list games', {
                games: this.games,
                lobbys: this.lobbys
            });

            socket.on('login', function (username) {
                this.players[sessionID].username = username;
                console.log(username + ' logged in');
            }.bind(this));

            socket.on('create lobby', function (data) {
                data.id = (0, _guid2.default)();
                data.created = new Date();
                this.lobbys.push(data);
                this.refreshMenus();
            }.bind(this));

            socket.on('join game', function (id) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.lobbys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var lobby = _step.value;

                        if (lobby.id === id) {
                            this.lobbys.splice(this.lobbys.indexOf(lobby), 1);
                            var game = new _game2.default(_rulesets.RULE_SETS[lobby.ruleset], lobby.name, new _player2.default(lobby.player), new _player2.default(this.players[sessionID].username), true);
                            this.games.push(game);

                            this.openGame(sessionID, game);
                            this.refreshMenus();
                            break;
                        }
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
            }.bind(this));

            socket.on('open game', function (id) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.games[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var game = _step2.value;

                        if (game.id === id) {
                            this.openGame(sessionID, game);
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }.bind(this));

            socket.on('game action', function (action) {
                console.log(action);
                var game = this.players[sessionID].game;

                try {
                    var result = game.execute(action);

                    if (result) {
                        this.distributeActions(game, result);
                    }
                } catch (err) {
                    console.log(err);
                    socket.emit('error message', err);
                }
            }.bind(this));

            socket.on('disconnect', function () {
                console.log('user disconnected');
                delete this.players[sessionID];
            }.bind(this));
        }
    }, {
        key: "openGame",
        value: function openGame(sessionID, game) {
            this.players[sessionID].game = game;
            var socket = this.players[sessionID].socket;
            socket.emit('setup game', game);

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = game.gameLog[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var action = _step3.value;

                    socket.emit('game action', action);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: "refreshMenus",
        value: function refreshMenus() {
            // refreshes the menus of all connected players (who are in the menu)
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = Object.keys(this.players)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var sessionID = _step4.value;

                    if (!this.players[sessionID].game) {
                        this.players[sessionID].socket.emit('list games', {
                            games: this.games,
                            lobbys: this.lobbys
                        });
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: "distributeActions",
        value: function distributeActions(game, actions, sessionID) {
            // no socket: distribute to every player in this game
            if (sessionID === undefined) {
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = Object.keys(this.players)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var _sessionID = _step5.value;

                        if (this.players[_sessionID].game === game) this.distributeActions(game, actions, _sessionID);
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                return;
            }

            if (!Array.isArray(actions)) actions = [actions];

            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = actions[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var action = _step6.value;

                    this.players[sessionID].socket.emit('game action', action);
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }
        }
    }]);

    return GameServer;
}();

exports.default = GameServer;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RULE_SETS = undefined;

var _game = __webpack_require__(3);

var _game2 = _interopRequireDefault(_game);

var _kingdead = __webpack_require__(31);

var _kingdead2 = _interopRequireDefault(_kingdead);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RULE_SETS = exports.RULE_SETS = {
    'chess': {
        id: 'chess',
        name: "Chess",
        loseConditions: [new _kingdead2.default()],
        boardWidth: 8,
        boardHeight: 8,
        setupMoves: regeneratorRuntime.mark(function setupMoves() {
            var x;
            return regeneratorRuntime.wrap(function setupMoves$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            x = 0;

                        case 1:
                            if (!(x < 8)) {
                                _context.next = 9;
                                break;
                            }

                            _context.next = 4;
                            return _game2.default.preparePlacePiece(x, 1, 2, "Pawn");

                        case 4:
                            _context.next = 6;
                            return _game2.default.preparePlacePiece(x, 6, 1, "Pawn");

                        case 6:
                            x++;
                            _context.next = 1;
                            break;

                        case 9:
                            _context.next = 11;
                            return _game2.default.preparePlacePiece(0, 0, 2, "Rook");

                        case 11:
                            _context.next = 13;
                            return _game2.default.preparePlacePiece(7, 0, 2, "Rook");

                        case 13:
                            _context.next = 15;
                            return _game2.default.preparePlacePiece(0, 7, 1, "Rook");

                        case 15:
                            _context.next = 17;
                            return _game2.default.preparePlacePiece(7, 7, 1, "Rook");

                        case 17:
                            _context.next = 19;
                            return _game2.default.preparePlacePiece(1, 0, 2, "Knight");

                        case 19:
                            _context.next = 21;
                            return _game2.default.preparePlacePiece(6, 0, 2, "Knight");

                        case 21:
                            _context.next = 23;
                            return _game2.default.preparePlacePiece(1, 7, 1, "Knight");

                        case 23:
                            _context.next = 25;
                            return _game2.default.preparePlacePiece(6, 7, 1, "Knight");

                        case 25:
                            _context.next = 27;
                            return _game2.default.preparePlacePiece(2, 0, 2, "Bishop");

                        case 27:
                            _context.next = 29;
                            return _game2.default.preparePlacePiece(5, 0, 2, "Bishop");

                        case 29:
                            _context.next = 31;
                            return _game2.default.preparePlacePiece(2, 7, 1, "Bishop");

                        case 31:
                            _context.next = 33;
                            return _game2.default.preparePlacePiece(5, 7, 1, "Bishop");

                        case 33:
                            _context.next = 35;
                            return _game2.default.preparePlacePiece(4, 0, 2, "Queen");

                        case 35:
                            _context.next = 37;
                            return _game2.default.preparePlacePiece(4, 7, 1, "Queen");

                        case 37:
                            _context.next = 39;
                            return _game2.default.preparePlacePiece(3, 0, 2, "King");

                        case 39:
                            _context.next = 41;
                            return _game2.default.preparePlacePiece(3, 7, 1, "King");

                        case 41:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, setupMoves, this);
        })
    },
    'chess-attack': {
        id: 'chess-attack',
        name: 'Chess Attack',
        loseConditions: [new _kingdead2.default()],
        boardWidth: 5,
        boardHeight: 6,
        setupMoves: regeneratorRuntime.mark(function setupMoves() {
            var x;
            return regeneratorRuntime.wrap(function setupMoves$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            x = 0;

                        case 1:
                            if (!(x < 5)) {
                                _context2.next = 9;
                                break;
                            }

                            _context2.next = 4;
                            return _game2.default.preparePlacePiece(x, 1, 2, "Pawn");

                        case 4:
                            _context2.next = 6;
                            return _game2.default.preparePlacePiece(x, 4, 1, "Pawn");

                        case 6:
                            x++;
                            _context2.next = 1;
                            break;

                        case 9:
                            _context2.next = 11;
                            return _game2.default.preparePlacePiece(0, 0, 2, "Rook");

                        case 11:
                            _context2.next = 13;
                            return _game2.default.preparePlacePiece(0, 5, 1, "Rook");

                        case 13:
                            _context2.next = 15;
                            return _game2.default.preparePlacePiece(1, 0, 2, "Knight");

                        case 15:
                            _context2.next = 17;
                            return _game2.default.preparePlacePiece(1, 5, 1, "Knight");

                        case 17:
                            _context2.next = 19;
                            return _game2.default.preparePlacePiece(2, 0, 2, "Bishop");

                        case 19:
                            _context2.next = 21;
                            return _game2.default.preparePlacePiece(2, 5, 1, "Bishop");

                        case 21:
                            _context2.next = 23;
                            return _game2.default.preparePlacePiece(3, 0, 2, "Queen");

                        case 23:
                            _context2.next = 25;
                            return _game2.default.preparePlacePiece(3, 5, 1, "Queen");

                        case 25:
                            _context2.next = 27;
                            return _game2.default.preparePlacePiece(4, 0, 2, "King");

                        case 27:
                            _context2.next = 29;
                            return _game2.default.preparePlacePiece(4, 5, 1, "King");

                        case 29:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, setupMoves, this);
        })
    }
};

/***/ }),
/* 11 */
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
            var template = __webpack_require__(12);
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(13);
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = __webpack_require__(14)['default'];

/***/ }),
/* 14 */
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

var _handlebarsBase = __webpack_require__(4);

var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = __webpack_require__(26);

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = __webpack_require__(1);

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = __webpack_require__(27);

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = __webpack_require__(28);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _helpersBlockHelperMissing = __webpack_require__(16);

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = __webpack_require__(17);

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = __webpack_require__(18);

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = __webpack_require__(19);

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = __webpack_require__(20);

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = __webpack_require__(21);

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = __webpack_require__(22);

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
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _decoratorsInline = __webpack_require__(24);

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}

/***/ }),
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
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

var _base = __webpack_require__(4);

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
/* 28 */
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
/* 29 */
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PIECE_REGISTRY = undefined;
exports.register = register;

var _piece = __webpack_require__(5);

var PIECE_REGISTRY = exports.PIECE_REGISTRY = {};

function register(piece) {
    PIECE_REGISTRY[piece.name] = piece;
}

register(_piece.God);
register(_piece.Pawn);
register(_piece.Rook);
register(_piece.Knight);
register(_piece.Bishop);
register(_piece.Queen);
register(_piece.King);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _losecondition = __webpack_require__(32);

var _losecondition2 = _interopRequireDefault(_losecondition);

var _piece = __webpack_require__(5);

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
/* 32 */
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
/* 33 */
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
/* 34 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })
/******/ ]);
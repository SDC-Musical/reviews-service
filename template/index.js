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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./database/index.js":
/*!***************************!*\
  !*** ./database/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! pg */ \"pg\"),\n    Client = _require.Client;\n\nvar client = new Client({\n  database: 'product_reviews'\n});\nclient.connect(function (err) {\n  if (err) {\n    console.log('PROBLEM CONNECTING TO DATABASE: ', err.stack);\n  } else {\n    console.log('CONNECTED');\n  }\n}); // const mongoose = require('mongoose');\n// const mongoUri = (process.env.NODE_ENV === 'production')\n//   ? 'mongodb://mongo:27017/reviews-service'\n//   : 'mongodb://localhost/reviews-service';\n// mongoose.connect(mongoUri, {\n//   useNewUrlParser: true,\n//   useUnifiedTopology: true,\n//   useFindAndModify: false,\n//   useCreateIndex: true,\n// });\n// const db = mongoose.connection;\n// db.on('error', () => console.error('Connection Error'));\n// db.once('open', () => console.log('Connected to MongoDB'));\n\n//# sourceURL=webpack:///./database/index.js?");

/***/ }),

/***/ "./database/methods/reviews.js":
/*!*************************************!*\
  !*** ./database/methods/reviews.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! pg */ \"pg\"),\n    Client = _require.Client;\n\nvar client = new Client({\n  database: 'product_reviews'\n});\n\nvar pgConnect = function pgConnect() {\n  return client.connect();\n};\n\nvar addReview = function addReview(review, cb) {\n  // client.connect();\n  client.query('INSERT INTO reviews(id, product_id, username, review_heading, review_text, review_rating, created_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [review.id, review.product_id, review.username, review.review_heading, review.review_text, review.review_rating, review.created_at], function (err, res) {\n    if (err) {\n      console.log('PROBLEM INSERTING REVIEW: ', err);\n      cb(err);\n    } else {\n      console.log('REVIEW ADDED');\n      cb(null, review);\n    }\n  });\n};\n\nvar getReviews = function getReviews(product) {\n  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n  var cb = arguments.length > 2 ? arguments[2] : undefined;\n  // client.connect();\n  client.query(\"SELECT * FROM reviews WHERE product_id = \".concat(product.product_id), function (err, res) {\n    if (err) {\n      console.log('PROBLEM GETTING THE REQUESTED REVIEWS: ', err);\n      cb(err);\n    } else {\n      cb(null, res.rows);\n    }\n  });\n};\n\nvar updateReview = function updateReview(column, info, id, cb) {\n  // client.connect();\n  client.query(\"UPDATE reviews SET \".concat(column, \" = '\").concat(info, \"' WHERE id = \").concat(id, \" RETURNING *\"), function (err, res) {\n    if (err) {\n      console.log('PROBLEM UPDATING THIS REVIEW: ', err);\n      cb(err);\n    } else {\n      cb(null, \"\".concat(column, \" updated to \").concat(info));\n    }\n  });\n};\n\nvar deleteReview = function deleteReview(id, cb) {\n  // client.connect();\n  client.query(\"DELETE FROM reviews WHERE id = \".concat(id), function (err, res) {\n    if (err) {\n      console.log('COULD NOT DELETE REVIEW: ', err);\n      cb(err);\n    } else {\n      cb(null, \"Review \".concat(id, \" deleted from database.\"));\n    }\n  });\n};\n\nvar getProduct = function getProduct(review, cb) {\n  client.query(\"SELECT product_id FROM reviews WHERE id = \".concat(review), function (err, res) {\n    if (err) {\n      console.log('COULD NOT FIND THIS REVIEW: ', err);\n      cb(err);\n    } else {\n      cb(null, res.rows[0].product_id);\n    }\n  });\n};\n\nvar getLast = function getLast(cb) {\n  client.query('SELECT id FROM reviews ORDER BY id DESC LIMIT 1', function (err, res) {\n    if (err) {\n      console.log('DATABASE NOT FOUND');\n      cb(err);\n    } else {\n      cb(null, res.rows[0].id);\n    }\n  });\n};\n\nmodule.exports = {\n  pgConnect: pgConnect,\n  addReview: addReview,\n  getReviews: getReviews,\n  updateReview: updateReview,\n  deleteReview: deleteReview,\n  getProduct: getProduct,\n  getLast: getLast\n};\n\n//# sourceURL=webpack:///./database/methods/reviews.js?");

/***/ }),

/***/ "./database/methods/reviewsummary.js":
/*!*******************************************!*\
  !*** ./database/methods/reviewsummary.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! pg */ \"pg\"),\n    Client = _require.Client;\n\nvar client = new Client({\n  database: 'product_reviews'\n});\n\nvar getReviewSummary = function getReviewSummary(product, cb) {\n  client.connect();\n  var summary = [{\n    rating_1: 0,\n    rating_2: 0,\n    rating_3: 0,\n    rating_4: 0,\n    rating_5: 0,\n    total_reviews: 0\n  }];\n  client.query(\"SELECT * FROM reviews WHERE product_id = \".concat(product), function (err, res) {\n    if (err) {\n      console.log('PROBLEM GETTING THE REQUESTED REVIEWS: ', err);\n    } else {\n      summary[0].total_reviews = res.rows.length;\n      summary[0].rating_1 = res.rows.filter(function (review) {\n        return review.review_rating === 1;\n      }).length;\n      summary[0].rating_2 = res.rows.filter(function (review) {\n        return review.review_rating === 2;\n      }).length;\n      summary[0].rating_3 = res.rows.filter(function (review) {\n        return review.review_rating === 3;\n      }).length;\n      summary[0].rating_4 = res.rows.filter(function (review) {\n        return review.review_rating === 4;\n      }).length;\n      summary[0].rating_5 = res.rows.filter(function (review) {\n        return review.review_rating === 5;\n      }).length;\n      console.log('RETURNED SUMMARY: ', summary);\n      cb(null, summary);\n    }\n  });\n};\n\nmodule.exports = {\n  getReviewSummary: getReviewSummary\n};\n\n//# sourceURL=webpack:///./database/methods/reviewsummary.js?");

/***/ }),

/***/ "./database/models/counter.js":
/*!************************************!*\
  !*** ./database/models/counter.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar counterSchema = new mongoose.Schema({\n  model_name: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  seq: {\n    type: Number,\n    \"default\": 0\n  }\n});\nmodule.exports = mongoose.model('Counter', counterSchema);\n\n//# sourceURL=webpack:///./database/models/counter.js?");

/***/ }),

/***/ "./database/models/reviews.js":
/*!************************************!*\
  !*** ./database/models/reviews.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar reviewSchema = new mongoose.Schema({\n  review_id: {\n    type: Number,\n    required: true,\n    unique: true\n  },\n  product_id: {\n    type: Number,\n    required: true\n  },\n  username: {\n    type: String,\n    required: true\n  },\n  review_heading: String,\n  review_text: String,\n  review_rating: {\n    type: Number,\n    required: true,\n    min: 1,\n    max: 5\n  },\n  created_at: {\n    type: Date,\n    \"default\": Date.now\n  }\n});\nmodule.exports = mongoose.model('Review', reviewSchema);\n\n//# sourceURL=webpack:///./database/models/reviews.js?");

/***/ }),

/***/ "./database/models/reviewsummary.js":
/*!******************************************!*\
  !*** ./database/models/reviewsummary.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar reviewSummarySchema = new mongoose.Schema({\n  product_id: {\n    type: Number,\n    required: true,\n    unique: true\n  },\n  total_reviews: Number,\n  rating_1: {\n    type: Number,\n    \"default\": 0\n  },\n  rating_2: {\n    type: Number,\n    \"default\": 0\n  },\n  rating_3: {\n    type: Number,\n    \"default\": 0\n  },\n  rating_4: {\n    type: Number,\n    \"default\": 0\n  },\n  rating_5: {\n    type: Number,\n    \"default\": 0\n  }\n});\nmodule.exports = mongoose.model('ReviewSummary', reviewSummarySchema);\n\n//# sourceURL=webpack:///./database/models/reviewsummary.js?");

/***/ }),

/***/ "./database/seed/reviewTextData.js":
/*!*****************************************!*\
  !*** ./database/seed/reviewTextData.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = [\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu non odio euismod lacinia at quis. Vel facilisis volutpat est velit egestas dui id ornare arcu. Est lorem ipsum dolor sit amet consectetur adipiscing. Quam lacus suspendisse faucibus interdum posuere. Sem viverra aliquet eget sit amet tellus cras adipiscing enim. Habitasse platea dictumst vestibulum rhoncus. Lacinia quis vel eros donec ac odio tempor orci dapibus. Dignissim enim sit amet venenatis urna cursus eget. Vehicula ipsum a arcu cursus vitae.\\n\\n  Sed augue lacus viverra vitae congue eu consequat. Commodo ullamcorper a lacus vestibulum sed arcu. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Sed libero enim sed faucibus turpis in eu mi. Ultricies integer quis auctor elit sed vulputate mi sit amet. Elementum sagittis vitae et leo. Et odio pellentesque diam volutpat commodo. Consequat mauris nunc congue nisi vitae suscipit tellus mauris. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Sed sed risus pretium quam vulputate dignissim suspendisse in est. Aliquet enim tortor at auctor urna nunc. Ullamcorper velit sed ullamcorper morbi tincidunt ornare. Non blandit massa enim nec dui nunc. Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus. Sit amet aliquam id diam. Rhoncus mattis rhoncus urna neque viverra. Morbi leo urna molestie at elementum eu facilisis sed.\\n\\n  Adipiscing bibendum est ultricies integer quis auctor elit sed. Viverra vitae congue eu consequat. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Tortor consequat id porta nibh venenatis. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent. Mollis aliquam ut porttitor leo. Mollis aliquam ut porttitor leo a diam sollicitudin tempor. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Amet risus nullam eget felis eget nunc lobortis. Eget duis at tellus at urna condimentum.\", 'Error affert percipitur ut sea. Cetero nostrud fabellas eum ea, est in liber erant. No agam theophrastus mei. At accusam evertitur vis, te meliore facilis constituam ius. Ex quem oportere expetendis vix, at primis disputando has.', \"Mel no dico diam delenit, vix assum impedit id, partem intellegat mnesarchum ius ea. Duis commodo facilis vix ea. Oratio nostrum mea an, nonumy salutandi ei sea. Recteque democritum deterruisset usu ea. Malorum conceptam ius id, qui stet consequat te, ut hinc dicunt impedit est.\\n\\n  Munere suscipit vel ne, movet primis probatus vix in, debitis sadipscing comprehensam est ne. Usu mundi intellegebat cu, et laoreet officiis honestatis mei, mei at alii debet mnesarchum. Omnis dicit voluptaria nec ea, ei vim equidem voluptua. Cu mel stet liberavisse, augue soleat vulputate vix eu, id qui libris alterum scriptorem. Aeterno tincidunt quo eu.\", \"Sea ne summo partem mnesarchum, utinam graecis recteque ei vis, sit et tollit tibique delicatissimi. Vitae consul sed ea. Ea tale neglegentur eos, ea assentior neglegentur vim. Ne suavitate iracundia pri. Vim soluta sanctus ad, at adhuc munere sit. Alia utinam inermis te eam, eum essent nominavi consectetuer eu.\\n\\n  Ius ad aperiri aliquid lucilius, sea at natum senserit scribentur. Sit te enim iudico ocurreret. Accumsan consetetur has ei, ex tibique mandamus eum. Ut usu cibo oportere principes, an eam paulo viris everti.\\n\\n  Vivendum menandri theophrastus cum cu. Id nec utroque nominavi offendit, quo ea prompta definitionem. Ad quo animal diceret mentitum. Quot habeo interesset in has, eam no utinam cetero sensibus, ne eum utamur laoreet. Ea solet intellegat pertinacia mel. Ei aperiri fierent salutandi vel, vim in invidunt convenire argumentum, viderer vocibus scripserit eu mei.\", 'Eos eu illum dicit iuvaret, te vim fuisset antiopam, debet erant eruditi quo eu. Eu invenire gubergren sit, eu quo.'];\n\n//# sourceURL=webpack:///./database/seed/reviewTextData.js?");

/***/ }),

/***/ "./database/seed/seedRandomData.js":
/*!*****************************************!*\
  !*** ./database/seed/seedRandomData.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar ReviewModel = __webpack_require__(/*! ../models/reviews.js */ \"./database/models/reviews.js\");\n\nvar ReviewSummaryModel = __webpack_require__(/*! ../models/reviewsummary.js */ \"./database/models/reviewsummary.js\");\n\nvar CounterModel = __webpack_require__(/*! ../models/counter.js */ \"./database/models/counter.js\");\n\nvar text = __webpack_require__(/*! ./reviewTextData.js */ \"./database/seed/reviewTextData.js\");\n\nvar isProd = \"development\" === 'production';\nvar mongoUri = isProd ? 'mongodb://mongo:27017/reviews-service' : 'mongodb://localhost/reviews-service';\nmongoose.connect(mongoUri, {\n  useNewUrlParser: true,\n  useUnifiedTopology: true,\n  useFindAndModify: false,\n  useCreateIndex: true\n});\n\nvar rng = function rng(min, max) {\n  return Math.floor(Math.random() * (max - min) + min);\n};\n\nvar usernames = ['FasterThanFast1', 'BillyBob4', 'NoProblem321', 'Ace', 'WhatThe5', 'GodlyOfGods', 'abc123', 'Shortcake7', 'IHateEverything', '45Minutes', '52Cards', 'HelloKitty5', 'Driller40', 'Muppets', 'Slinky'];\nvar heading = ['I hate this product', 'I love this product', 'idk', 'It\\'s okay', 'Meh'];\nvar reviewDocCount = [];\nvar reviewSummaryDocCount = [];\nvar maxReviewCount = 300;\n\nfor (var i = 1; i <= maxReviewCount; i += 1) {\n  reviewDocCount.push(i);\n}\n\nfor (var _i = 1; _i <= 100; _i += 1) {\n  reviewSummaryDocCount.push(_i);\n}\n\nvar seed = /*#__PURE__*/function () {\n  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {\n    var initReviewSummaries, summaryPromises, reviewPromises;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return ReviewModel.deleteMany({});\n\n          case 2:\n            _context.next = 4;\n            return ReviewSummaryModel.deleteMany({});\n\n          case 4:\n            _context.next = 6;\n            return CounterModel.deleteMany({});\n\n          case 6:\n            initReviewSummaries = reviewSummaryDocCount.map(function (i) {\n              return ReviewSummaryModel.create({\n                product_id: i\n              });\n            });\n            _context.next = 9;\n            return Promise.all(initReviewSummaries).then(function () {\n              return console.log('Successfully initialized ReviewSummaries');\n            })[\"catch\"](function (err) {\n              return console.error('Error initializing ReviewSummaries: ', err.message);\n            });\n\n          case 9:\n            _context.next = 11;\n            return CounterModel.create({\n              model_name: 'review',\n              seq: maxReviewCount\n            }).then(function () {\n              return console.log('Successfully Seeded Counters');\n            })[\"catch\"](function (err) {\n              return console.error('Error Seeding Counters: ', err.message);\n            });\n\n          case 11:\n            summaryPromises = [];\n            reviewPromises = reviewDocCount.map(function (i) {\n              var randMonth = rng(1, 13);\n              var randDay = rng(1, 29);\n              var randHr = rng(1, 25);\n              var randMin = rng(1, 61);\n              var randSec = rng(1, 61);\n              var randRating = rng(1, 6);\n              var randProduct = rng(1, 101);\n              var randUser = usernames[rng(0, 15)];\n              var randHeading = heading[rng(0, 5)];\n              var randText = text[rng(0, 5)];\n              var starKey = {};\n              starKey.$inc = {};\n              starKey.$inc[\"rating_\".concat(randRating)] = 1;\n              starKey.$inc.total_reviews = 1;\n              summaryPromises.push(ReviewSummaryModel.findOneAndUpdate({\n                product_id: randProduct\n              }, starKey, {\n                upsert: true,\n                setDefaultsOnInsert: true\n              }));\n              return ReviewModel.create({\n                review_id: i,\n                product_id: randProduct,\n                username: randUser,\n                review_heading: randHeading,\n                review_text: randText,\n                review_rating: randRating,\n                created_at: new Date(2020, randMonth, randDay, randHr, randMin, randSec).toISOString()\n              });\n            });\n            _context.next = 15;\n            return Promise.all(summaryPromises).then(function () {\n              return console.log('Successfully Seeded ReviewSummaries');\n            })[\"catch\"](function (err) {\n              return console.error('Error Seeding ReviewSummaries: ', err.message);\n            });\n\n          case 15:\n            _context.next = 17;\n            return Promise.all(reviewPromises).then(function () {\n              return console.log('Successfully Seeded Reviews');\n            })[\"catch\"](function (err) {\n              return console.error('Error Seeding Reviews: ', err.message);\n            });\n\n          case 17:\n            if (!isProd) process.exit(0);\n\n          case 18:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function seed() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nseed();\n\n//# sourceURL=webpack:///./database/seed/seedRandomData.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (originalModule) {\n  if (!originalModule.webpackPolyfill) {\n    var module = Object.create(originalModule); // module.parent = undefined by default\n\n    if (!module.children) module.children = [];\n    Object.defineProperty(module, \"loaded\", {\n      enumerable: true,\n      get: function () {\n        return module.l;\n      }\n    });\n    Object.defineProperty(module, \"id\", {\n      enumerable: true,\n      get: function () {\n        return module.i;\n      }\n    });\n    Object.defineProperty(module, \"exports\", {\n      enumerable: true\n    });\n    module.webpackPolyfill = 1;\n  }\n\n  return module;\n};\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ }),

/***/ "./server/app.js":
/*!***********************!*\
  !*** ./server/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {// require('newrelic');\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar reviewRouter = __webpack_require__(/*! ./routes/reviews.js */ \"./server/routes/reviews.js\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar React = __webpack_require__(/*! react */ \"react\");\n\nvar ReactDOMServer = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n\nvar App = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module '../client/components/App'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nvar app = express();\napp.use(function (req, res, next) {\n  res.header('Access-Control-Allow-Origin', '*');\n  next();\n});\napp.use(bodyParser.urlencoded());\napp.get('/', function (req, res) {\n  var app = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(App, null));\n  var indexFile = path.resolve('../public/index.html');\n  fs.readFile(indexFile, 'utf8', function (err, data) {\n    if (err) {\n      console.log('Error Reading File: ', err);\n      return res.status(500).send('Server Error.');\n    }\n\n    return res.send(data.replace('<div id=\"reviews-service\"></div>', \"<div id=\\\"reviews-service\\\">\".concat(app, \"</div>\")));\n  });\n});\napp.use('/api/reviews', reviewRouter);\napp.use(express[\"static\"](path.join(__dirname, '../public')));\napp.use('/:id', express[\"static\"](path.join(__dirname, '../public'))); // app.use('/api/reviews', require('./routes/reviews.js'));\n// app.get('*', (req, res) => {\n//   res.sendFile(path.join(__dirname, '../public/index.html'));\n// });\n\nmodule.exports = app;\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./server/app.js?");

/***/ }),

/***/ "./server/middleware/queryParams.js":
/*!******************************************!*\
  !*** ./server/middleware/queryParams.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var queryReviewRating = function queryReviewRating(req, res, next) {\n  if (req.query.review_rating !== undefined) {\n    if (Number.isNaN(Number(req.query.review_rating)) || req.query.review_rating === '') {\n      res.status(400).send('Bad Request.');\n      return;\n    }\n\n    req.options.review_rating = Number(req.query.review_rating);\n  }\n\n  next();\n};\n\nmodule.exports = {\n  queryReviewRating: queryReviewRating\n};\n\n//# sourceURL=webpack:///./server/middleware/queryParams.js?");

/***/ }),

/***/ "./server/routes/reviews.js":
/*!**********************************!*\
  !*** ./server/routes/reviews.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar _require = __webpack_require__(/*! ../../database/methods/reviews.js */ \"./database/methods/reviews.js\"),\n    pgConnect = _require.pgConnect,\n    getReviews = _require.getReviews,\n    addReview = _require.addReview,\n    updateReview = _require.updateReview,\n    deleteReview = _require.deleteReview,\n    getProduct = _require.getProduct,\n    getLast = _require.getLast;\n\nvar ReviewModel = __webpack_require__(/*! ../../database/models/reviews.js */ \"./database/models/reviews.js\");\n\nvar _require2 = __webpack_require__(/*! ../../database/methods/reviewsummary.js */ \"./database/methods/reviewsummary.js\"),\n    getReviewSummary = _require2.getReviewSummary;\n\nvar _require3 = __webpack_require__(/*! ../middleware/queryParams.js */ \"./server/middleware/queryParams.js\"),\n    queryReviewRating = _require3.queryReviewRating;\n\nvar redis = __webpack_require__(/*! redis */ \"redis\");\n\nvar client = redis.createClient();\nclient.on('error', function (err) {\n  console.error(err);\n});\npgConnect();\nvar router = express.Router();\nrouter.param('product_id', function (req, res, next, product_id) {\n  if (Number.isNaN(Number(product_id))) {\n    res.status(400).send('Bad Request.');\n    return;\n  }\n\n  req.options = {\n    product_id: Number(product_id)\n  };\n  next();\n});\nrouter.route('/:product_id/summary').get( /*#__PURE__*/function () {\n  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {\n    var reviewSummary;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _context.next = 3;\n            return getReviewSummary(req.options.product_id, function (err, data) {\n              if (data.length > 0) res.json(data);else res.status(404).send('Review Summary Not Found.');\n            });\n\n          case 3:\n            reviewSummary = _context.sent;\n            _context.next = 9;\n            break;\n\n          case 6:\n            _context.prev = 6;\n            _context.t0 = _context[\"catch\"](0);\n            res.status(500).send('Internal Server Error.');\n\n          case 9:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 6]]);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}());\nrouter.route('/:product_id').get(queryReviewRating, /*#__PURE__*/function () {\n  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(req, res) {\n    var cache;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            if (!(req.query.limit !== undefined)) {\n              _context3.next = 6;\n              break;\n            }\n\n            if (!(Number.isNaN(Number(req.query.limit)) || req.query.limit === '' || Number(req.query.limit) < 0)) {\n              _context3.next = 4;\n              break;\n            }\n\n            res.status(400).send('Bad Request.');\n            return _context3.abrupt(\"return\");\n\n          case 4:\n            _context3.next = 7;\n            break;\n\n          case 6:\n            req.query.limit = 0;\n\n          case 7:\n            _context3.prev = 7;\n            _context3.next = 10;\n            return client.get(req.options.product_id, function (err, reply) {\n              if (err) {\n                console.log('PROBLEM WITH CACHE: ', err);\n                res.status(500).send('Cache Error.');\n              } else if (reply) {\n                console.log('REDIS REPLY');\n                res.send(reply);\n              } else {\n                getReviews(req.options, req.query.limit, /*#__PURE__*/function () {\n                  var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(err, data) {\n                    var setCache;\n                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n                      while (1) {\n                        switch (_context2.prev = _context2.next) {\n                          case 0:\n                            if (!(data.length > 0)) {\n                              _context2.next = 6;\n                              break;\n                            }\n\n                            _context2.next = 3;\n                            return client.set(\"\".concat(req.options.product_id), JSON.stringify(data), function (err, reply) {\n                              if (err) {\n                                console.log('PROBLEM SETTING CACHE: ', err);\n                                res.status(500).send('Cache Error.');\n                              } else {\n                                res.json(data);\n                              }\n                            });\n\n                          case 3:\n                            setCache = _context2.sent;\n                            _context2.next = 7;\n                            break;\n\n                          case 6:\n                            res.status(404).send('Reviews Not Found.');\n\n                          case 7:\n                          case \"end\":\n                            return _context2.stop();\n                        }\n                      }\n                    }, _callee2);\n                  }));\n\n                  return function (_x5, _x6) {\n                    return _ref3.apply(this, arguments);\n                  };\n                }());\n              }\n            });\n\n          case 10:\n            cache = _context3.sent;\n            _context3.next = 16;\n            break;\n\n          case 13:\n            _context3.prev = 13;\n            _context3.t0 = _context3[\"catch\"](7);\n            res.status(500).send('Internal Server Error.');\n\n          case 16:\n          case \"end\":\n            return _context3.stop();\n        }\n      }\n    }, _callee3, null, [[7, 13]]);\n  }));\n\n  return function (_x3, _x4) {\n    return _ref2.apply(this, arguments);\n  };\n}()).put( /*#__PURE__*/function () {\n  var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(req, res) {\n    var updateProduct;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {\n      while (1) {\n        switch (_context7.prev = _context7.next) {\n          case 0:\n            _context7.prev = 0;\n            _context7.next = 3;\n            return updateReview(req.body.column, req.body.info, req.options.product_id, /*#__PURE__*/function () {\n              var _ref5 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(err, string) {\n                var retrieve;\n                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {\n                  while (1) {\n                    switch (_context6.prev = _context6.next) {\n                      case 0:\n                        if (!err) {\n                          _context6.next = 4;\n                          break;\n                        }\n\n                        res.status(404).send(\"Review \".concat(req.options.product_id, \" not found.\"));\n                        _context6.next = 7;\n                        break;\n\n                      case 4:\n                        _context6.next = 6;\n                        return getProduct(req.options.product_id, function (err, product) {\n                          client.del(\"\".concat(product), /*#__PURE__*/function () {\n                            var _ref6 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(err, value) {\n                              var reset;\n                              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {\n                                while (1) {\n                                  switch (_context5.prev = _context5.next) {\n                                    case 0:\n                                      if (!err) {\n                                        _context5.next = 5;\n                                        break;\n                                      }\n\n                                      console.log('PROBLEM DELETING ENTRY: ', err);\n                                      res.status(500).send('Cache Error.');\n                                      _context5.next = 21;\n                                      break;\n\n                                    case 5:\n                                      if (!(value === 0)) {\n                                        _context5.next = 10;\n                                        break;\n                                      }\n\n                                      console.log('NO DELETIONS');\n                                      res.status(200).send(string);\n                                      _context5.next = 21;\n                                      break;\n\n                                    case 10:\n                                      console.log(\"DELETED \".concat(value));\n\n                                      if (!(req.query.limit !== undefined)) {\n                                        _context5.next = 17;\n                                        break;\n                                      }\n\n                                      if (!(Number.isNaN(Number(req.query.limit)) || req.query.limit === '' || Number(req.query.limit) < 0)) {\n                                        _context5.next = 15;\n                                        break;\n                                      }\n\n                                      res.status(400).send('Bad Request.');\n                                      return _context5.abrupt(\"return\");\n\n                                    case 15:\n                                      _context5.next = 18;\n                                      break;\n\n                                    case 17:\n                                      req.query.limit = 0;\n\n                                    case 18:\n                                      _context5.next = 20;\n                                      return getReviews({\n                                        product_id: product\n                                      }, req.query.limit, /*#__PURE__*/function () {\n                                        var _ref7 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(err, data) {\n                                          var setCache;\n                                          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {\n                                            while (1) {\n                                              switch (_context4.prev = _context4.next) {\n                                                case 0:\n                                                  if (!(data.length > 0)) {\n                                                    _context4.next = 6;\n                                                    break;\n                                                  }\n\n                                                  _context4.next = 3;\n                                                  return client.set(\"\".concat(product), JSON.stringify(data), function (err, reply) {\n                                                    if (err) {\n                                                      console.log('PROBLEM SETTING CACHE: ', err);\n                                                      res.status(500).send('Cache Error.');\n                                                    } else {\n                                                      res.status(200).send(string);\n                                                    }\n                                                  });\n\n                                                case 3:\n                                                  setCache = _context4.sent;\n                                                  _context4.next = 7;\n                                                  break;\n\n                                                case 6:\n                                                  res.status(404).send('Reviews Not Found.');\n\n                                                case 7:\n                                                case \"end\":\n                                                  return _context4.stop();\n                                              }\n                                            }\n                                          }, _callee4);\n                                        }));\n\n                                        return function (_x13, _x14) {\n                                          return _ref7.apply(this, arguments);\n                                        };\n                                      }());\n\n                                    case 20:\n                                      reset = _context5.sent;\n\n                                    case 21:\n                                    case \"end\":\n                                      return _context5.stop();\n                                  }\n                                }\n                              }, _callee5);\n                            }));\n\n                            return function (_x11, _x12) {\n                              return _ref6.apply(this, arguments);\n                            };\n                          }());\n                        });\n\n                      case 6:\n                        retrieve = _context6.sent;\n\n                      case 7:\n                      case \"end\":\n                        return _context6.stop();\n                    }\n                  }\n                }, _callee6);\n              }));\n\n              return function (_x9, _x10) {\n                return _ref5.apply(this, arguments);\n              };\n            }());\n\n          case 3:\n            updateProduct = _context7.sent;\n            _context7.next = 9;\n            break;\n\n          case 6:\n            _context7.prev = 6;\n            _context7.t0 = _context7[\"catch\"](0);\n            res.status(500).send('Internal Server Error.');\n\n          case 9:\n          case \"end\":\n            return _context7.stop();\n        }\n      }\n    }, _callee7, null, [[0, 6]]);\n  }));\n\n  return function (_x7, _x8) {\n    return _ref4.apply(this, arguments);\n  };\n}()).post( /*#__PURE__*/function () {\n  var _ref8 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee11(req, res) {\n    var timestamp, newID;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee11$(_context11) {\n      while (1) {\n        switch (_context11.prev = _context11.next) {\n          case 0:\n            _context11.prev = 0;\n            timestamp = new Date();\n            _context11.next = 4;\n            return getLast( /*#__PURE__*/function () {\n              var _ref9 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee10(err, id) {\n                var newReview;\n                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee10$(_context10) {\n                  while (1) {\n                    switch (_context10.prev = _context10.next) {\n                      case 0:\n                        if (!err) {\n                          _context10.next = 5;\n                          break;\n                        }\n\n                        console.log('PROBLEM GETTING ID');\n                        res.status(500).send('Database Error.');\n                        _context10.next = 8;\n                        break;\n\n                      case 5:\n                        _context10.next = 7;\n                        return addReview({\n                          id: id + 1,\n                          product_id: req.options.product_id,\n                          username: req.body.username,\n                          review_heading: req.body.review_heading,\n                          review_text: req.body.review_text,\n                          review_rating: req.body.review_rating,\n                          created_at: \"\".concat(timestamp.getMonth() + 1, \" \").concat(timestamp.getDate() + 1, \", \").concat(timestamp.getFullYear(), \" \").concat(timestamp.getHours(), \":\").concat(timestamp.getMinutes(), \":\").concat(timestamp.getSeconds())\n                        }, function (err, data) {\n                          if (err) {\n                            console.log('PROBLEM ADDING REVIEW: ', err);\n                            res.status(500).send('Internal Server Error.');\n                          } else {\n                            client.del(\"\".concat(req.options.product_id), /*#__PURE__*/function () {\n                              var _ref10 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee9(err, value) {\n                                var reset;\n                                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee9$(_context9) {\n                                  while (1) {\n                                    switch (_context9.prev = _context9.next) {\n                                      case 0:\n                                        if (!err) {\n                                          _context9.next = 5;\n                                          break;\n                                        }\n\n                                        console.log('PROBLEM DELETING ENTRY: ', err);\n                                        res.status(500).send('Cache Error.');\n                                        _context9.next = 21;\n                                        break;\n\n                                      case 5:\n                                        if (!(value === 0)) {\n                                          _context9.next = 10;\n                                          break;\n                                        }\n\n                                        console.log('NO DELETIONS');\n                                        res.json(data);\n                                        _context9.next = 21;\n                                        break;\n\n                                      case 10:\n                                        console.log(\"DELETED \".concat(value));\n\n                                        if (!(req.query.limit !== undefined)) {\n                                          _context9.next = 17;\n                                          break;\n                                        }\n\n                                        if (!(Number.isNaN(Number(req.query.limit)) || req.query.limit === '' || Number(req.query.limit) < 0)) {\n                                          _context9.next = 15;\n                                          break;\n                                        }\n\n                                        res.status(400).send('Bad Request.');\n                                        return _context9.abrupt(\"return\");\n\n                                      case 15:\n                                        _context9.next = 18;\n                                        break;\n\n                                      case 17:\n                                        req.query.limit = 0;\n\n                                      case 18:\n                                        _context9.next = 20;\n                                        return getReviews(req.options, req.query.limit, /*#__PURE__*/function () {\n                                          var _ref11 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8(err, data) {\n                                            var setCache;\n                                            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8) {\n                                              while (1) {\n                                                switch (_context8.prev = _context8.next) {\n                                                  case 0:\n                                                    if (!(data.length > 0)) {\n                                                      _context8.next = 6;\n                                                      break;\n                                                    }\n\n                                                    _context8.next = 3;\n                                                    return client.set(\"\".concat(req.options.product_id), JSON.stringify(data), function (err, reply) {\n                                                      if (err) {\n                                                        console.log('PROBLEM SETTING CACHE: ', err);\n                                                        res.status(500).send('Cache Error.');\n                                                      } else {\n                                                        res.json(data);\n                                                      }\n                                                    });\n\n                                                  case 3:\n                                                    setCache = _context8.sent;\n                                                    _context8.next = 7;\n                                                    break;\n\n                                                  case 6:\n                                                    res.status(404).send('Reviews Not Found.');\n\n                                                  case 7:\n                                                  case \"end\":\n                                                    return _context8.stop();\n                                                }\n                                              }\n                                            }, _callee8);\n                                          }));\n\n                                          return function (_x21, _x22) {\n                                            return _ref11.apply(this, arguments);\n                                          };\n                                        }());\n\n                                      case 20:\n                                        reset = _context9.sent;\n\n                                      case 21:\n                                      case \"end\":\n                                        return _context9.stop();\n                                    }\n                                  }\n                                }, _callee9);\n                              }));\n\n                              return function (_x19, _x20) {\n                                return _ref10.apply(this, arguments);\n                              };\n                            }());\n                          }\n                        });\n\n                      case 7:\n                        newReview = _context10.sent;\n\n                      case 8:\n                      case \"end\":\n                        return _context10.stop();\n                    }\n                  }\n                }, _callee10);\n              }));\n\n              return function (_x17, _x18) {\n                return _ref9.apply(this, arguments);\n              };\n            }());\n\n          case 4:\n            newID = _context11.sent;\n            _context11.next = 11;\n            break;\n\n          case 7:\n            _context11.prev = 7;\n            _context11.t0 = _context11[\"catch\"](0);\n            console.log('ERROR: ', _context11.t0);\n            res.status(500).send('Internal Server Error.');\n\n          case 11:\n          case \"end\":\n            return _context11.stop();\n        }\n      }\n    }, _callee11, null, [[0, 7]]);\n  }));\n\n  return function (_x15, _x16) {\n    return _ref8.apply(this, arguments);\n  };\n}())[\"delete\"]( /*#__PURE__*/function () {\n  var _ref12 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee15(req, res) {\n    var retrieve;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee15$(_context15) {\n      while (1) {\n        switch (_context15.prev = _context15.next) {\n          case 0:\n            _context15.prev = 0;\n            _context15.next = 3;\n            return getProduct(req.options.product_id, /*#__PURE__*/function () {\n              var _ref13 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee14(err, product) {\n                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee14$(_context14) {\n                  while (1) {\n                    switch (_context14.prev = _context14.next) {\n                      case 0:\n                        _context14.next = 2;\n                        return deleteReview(req.options.product_id, function (err, string) {\n                          if (err) {\n                            res.status(404).send('Review not found.');\n                          } else {\n                            client.del(\"\".concat(product), /*#__PURE__*/function () {\n                              var _ref14 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee13(err, value) {\n                                var reset;\n                                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee13$(_context13) {\n                                  while (1) {\n                                    switch (_context13.prev = _context13.next) {\n                                      case 0:\n                                        if (!err) {\n                                          _context13.next = 5;\n                                          break;\n                                        }\n\n                                        console.log('PROBLEM DELETING ENTRY: ', err);\n                                        res.status(500).send('Cache Error.');\n                                        _context13.next = 21;\n                                        break;\n\n                                      case 5:\n                                        if (!(value === 0)) {\n                                          _context13.next = 10;\n                                          break;\n                                        }\n\n                                        console.log('NO DELETIONS');\n                                        res.status(200).send(string);\n                                        _context13.next = 21;\n                                        break;\n\n                                      case 10:\n                                        console.log(\"DELETED \".concat(value));\n\n                                        if (!(req.query.limit !== undefined)) {\n                                          _context13.next = 17;\n                                          break;\n                                        }\n\n                                        if (!(Number.isNaN(Number(req.query.limit)) || req.query.limit === '' || Number(req.query.limit) < 0)) {\n                                          _context13.next = 15;\n                                          break;\n                                        }\n\n                                        res.status(400).send('Bad Request.');\n                                        return _context13.abrupt(\"return\");\n\n                                      case 15:\n                                        _context13.next = 18;\n                                        break;\n\n                                      case 17:\n                                        req.query.limit = 0;\n\n                                      case 18:\n                                        _context13.next = 20;\n                                        return getReviews({\n                                          product_id: product\n                                        }, req.query.limit, /*#__PURE__*/function () {\n                                          var _ref15 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee12(err, data) {\n                                            var setCache;\n                                            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee12$(_context12) {\n                                              while (1) {\n                                                switch (_context12.prev = _context12.next) {\n                                                  case 0:\n                                                    if (!(data.length > 0)) {\n                                                      _context12.next = 6;\n                                                      break;\n                                                    }\n\n                                                    _context12.next = 3;\n                                                    return client.set(\"\".concat(product), JSON.stringify(data), function (err, reply) {\n                                                      if (err) {\n                                                        console.log('PROBLEM SETTING CACHE: ', err);\n                                                        res.status(500).send('Cache Error.');\n                                                      } else {\n                                                        res.status(200).send(string);\n                                                      }\n                                                    });\n\n                                                  case 3:\n                                                    setCache = _context12.sent;\n                                                    _context12.next = 7;\n                                                    break;\n\n                                                  case 6:\n                                                    res.status(404).send('Reviews Not Found.');\n\n                                                  case 7:\n                                                  case \"end\":\n                                                    return _context12.stop();\n                                                }\n                                              }\n                                            }, _callee12);\n                                          }));\n\n                                          return function (_x29, _x30) {\n                                            return _ref15.apply(this, arguments);\n                                          };\n                                        }());\n\n                                      case 20:\n                                        reset = _context13.sent;\n\n                                      case 21:\n                                      case \"end\":\n                                        return _context13.stop();\n                                    }\n                                  }\n                                }, _callee13);\n                              }));\n\n                              return function (_x27, _x28) {\n                                return _ref14.apply(this, arguments);\n                              };\n                            }());\n                          }\n                        });\n\n                      case 2:\n                      case \"end\":\n                        return _context14.stop();\n                    }\n                  }\n                }, _callee14);\n              }));\n\n              return function (_x25, _x26) {\n                return _ref13.apply(this, arguments);\n              };\n            }());\n\n          case 3:\n            retrieve = _context15.sent;\n            _context15.next = 9;\n            break;\n\n          case 6:\n            _context15.prev = 6;\n            _context15.t0 = _context15[\"catch\"](0);\n            res.status(500).send('Internal Server Error.');\n\n          case 9:\n          case \"end\":\n            return _context15.stop();\n        }\n      }\n    }, _callee15, null, [[0, 6]]);\n  }));\n\n  return function (_x23, _x24) {\n    return _ref12.apply(this, arguments);\n  };\n}());\nmodule.exports = router;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./server/routes/reviews.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../database */ \"./database/index.js\");\n\nvar app = __webpack_require__(/*! ./app.js */ \"./server/app.js\");\n\nvar isProd = \"development\" === 'production';\nvar PORT = 3001;\napp.listen(PORT, function () {\n  console.log(\"listening on port \".concat(PORT));\n  console.log(\"Environment: \".concat(\"development\"));\n});\n\nif (isProd) {\n  setTimeout(function () {\n    // eslint-disable-next-line global-require\n    __webpack_require__(/*! ../database/seed/seedRandomData.js */ \"./database/seed/seedRandomData.js\");\n  }, 5000);\n}\n\n//# sourceURL=webpack:///./server/server.js?");

/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/asyncToGenerator\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/asyncToGenerator%22?");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/regenerator\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/regenerator%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pg\");\n\n//# sourceURL=webpack:///external_%22pg%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redis\");\n\n//# sourceURL=webpack:///external_%22redis%22?");

/***/ })

/******/ });
"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = _interopRequireDefault(require("react-dom/client"));
require("./index.css");
var _App = _interopRequireDefault(require("./App"));
var _reportWebVitals = _interopRequireDefault(require("./reportWebVitals"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const root = _client.default.createRoot(document.getElementById('root'));
root.render(dom(_react.default.StrictMode, null, dom(_reactRouterDom.BrowserRouter, null, dom(_App.default, null))));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, _reportWebVitals.default)();
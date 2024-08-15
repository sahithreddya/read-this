"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _pages = require("./pages");
var _reactRouterDom = require("react-router-dom");
require("./App.scss");
var _react = require("react");
var _client = require("./client");
function App() {
  const [token, setToken] = (0, _react.useState)(false);
  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token));
  }
  (0, _react.useEffect)(() => {
    // getArticles();
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token') || '{}');
      setToken(data);
    }
  }, []);
  async function getArticles() {
    const {
      data
    } = await _client.supabase.from("Articles").select();
    // setArticles(data);
  }
  return dom("div", {
    className: "app--container"
  }, dom(_reactRouterDom.Routes, null, dom(_reactRouterDom.Route, {
    path: "/",
    element: dom(_pages.SignInUser, {
      setToken: setToken
    })
  }), token ? dom(_reactRouterDom.Route, {
    path: "/home",
    element: dom(_pages.HomePage, {
      token: token
    })
  }) : "", dom(_reactRouterDom.Route, {
    path: "/signup",
    element: dom(_pages.SignUpUser, null)
  })));
}
var _default = exports.default = App;
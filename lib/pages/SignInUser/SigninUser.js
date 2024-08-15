"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("./SignInUser.scss");
var _react = require("react");
var _Components = require("../../Components");
var _reactRouterDom = require("react-router-dom");
var _client = require("../../client");
function SignInUser(_ref) {
  let {
    setToken
  } = _ref;
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [loading, setLoading] = (0, _react.useState)(false);
  const [email, setEmail] = (0, _react.useState)('');
  const [password, setPassword] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {
    // signInUser();
    console.log('new email set' + email);
  }, []);
  async function signInUser(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        data,
        error
      } = await _client.supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
      if (error) {
        throw error;
        // switch (error.name) {
        //   case "AuthApiError":
        //     alert("Invalid login credentials. Please try again.")

        // }
        // console.log(JSON.stringify(error))
        console.log(data);
        console.log(error);
      } else {
        console.log(data);
        setToken(data);
        alert('You\'ve successfully signed in.');
        navigate("/home");
      }
    } catch (e) {
      // console.log(JSON.stringify(e))
      alert(e);
    }
    setLoading(false);
  }
  return dom("div", {
    className: "signin__home"
  }, dom("h1", null, "Welcome to ReadThis."), dom("p", null, "Sign in below."), dom("div", {
    className: "signin__component"
  }, dom("form", {
    className: "signin__form",
    onSubmit: signInUser
  }, dom(_Components.FormInput, {
    title: "Email",
    type: "text",
    placeholder: "johndoe@example.com",
    setValue: setEmail
  }), dom(_Components.FormInput, {
    title: "Password",
    type: "password",
    setValue: setPassword
  }), dom(_Components.ButtonPrimary, {
    type: "primary",
    label: "Sign In",
    disabled: loading
  }))), dom("p", null, "Don't have an account? ", dom(_reactRouterDom.Link, {
    to: "/signup"
  }, "Sign up now.")));
}
var _default = exports.default = SignInUser;
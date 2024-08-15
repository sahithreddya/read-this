"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("./SignUpUser.scss");
var _react = require("react");
var _Components = require("../../Components");
var _reactRouterDom = require("react-router-dom");
var _client = require("../../client");
function SignUpUser() {
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [loading, setLoading] = (0, _react.useState)(false);
  const [name, setName] = (0, _react.useState)('');
  const [email, setEmail] = (0, _react.useState)('');
  const [password, setPassword] = (0, _react.useState)('');
  const [newUserData, setNewUserData] = (0, _react.useState)();

  // console.log('new email set' + email);
  // console.log('new name set' + name);
  // console.log('new password set' + password);

  (0, _react.useEffect)(() => {
    addNewUser();
  }, [newUserData]);

  // const handleSignUp = async (event: any) => {
  //   event.preventDefault();
  //   await signUpNewUser();
  //   await addNewUser();
  // }

  async function signUpNewUser(event) {
    event.preventDefault();
    try {
      const {
        data,
        error
      } = await _client.supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: 'http://localhost:3000/',
          data: {
            name: name
          }
        }
      });
      if (error) {
        throw error;
      } else {
        setNewUserData(data);
      }
    } catch (e) {
      console.log("signUpNewUser error is:" + JSON.stringify(e));
      // alert(e);
    }
    setLoading(false);
  }
  async function addNewUser() {
    try {
      const {
        data,
        error
      } = await _client.supabase.from('users').insert({
        user_id: newUserData.user.id,
        user_name: newUserData.user.user_metadata.name,
        email: newUserData.user.user_metadata.email
      }).select();
      console.log(data);
      if (error) {
        console.log("addNewUser error is:" + JSON.stringify(error));
        throw error;
      } else {
        alert("A confirmation message has been sent to your email.");
        navigate("/");
      }
    } catch (e) {
      console.log("addNewUser thrown error is:" + JSON.stringify(e));
      // alert(e);
    }
  }
  return dom("div", {
    className: "signup__home"
  }, dom("h1", null, "Welcome to ReadThis."), dom("p", null, "Sign up for a new account below."), dom("div", {
    className: "signup__component"
  }, dom("form", {
    className: "signup__form",
    onSubmit: signUpNewUser
  }, dom(_Components.FormInput, {
    title: "Name",
    type: "text",
    placeholder: "John Doe",
    setValue: setName
  }), dom(_Components.FormInput, {
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
    label: "Sign Up",
    disabled: loading
  }))), dom("p", null, "Already have an account? ", dom(_reactRouterDom.Link, {
    to: "/"
  }, "Sign in now.")));
}
var _default = exports.default = SignUpUser;
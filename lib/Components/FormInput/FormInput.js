"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("./FormInput.scss");
var _react = require("react");
const FormInput = _ref => {
  let {
    title,
    type,
    placeholder = '',
    setValue
  } = _ref;
  const [userValue, setUserValue = setValue] = (0, _react.useState)('');
  return dom("div", {
    className: "inputContainer"
  }, dom("p", {
    className: "inputTitle"
  }, title), dom("input", {
    className: "inputField",
    type: type,
    placeholder: placeholder,
    value: userValue,
    required: true,
    onChange: e => {
      setUserValue(e.target.value);
      setValue(e.target.value);
    }
  }));
};
var _default = exports.default = FormInput;
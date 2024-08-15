"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("./ButtonPrimary.scss");
// import { useEffect, useState } from "react";

function ButtonPrimary(_ref) {
  let {
    label,
    type,
    disabled = false,
    onClick
  } = _ref;
  // const [userValue, setUserValue=setValue] = useState('')

  return dom("button", {
    className: type == 'primary' ? 'buttonStyle' : 'buttonStyleSecondary',
    disabled: disabled,
    onClick: onClick ? onClick : null
  }, disabled ? dom("span", null, "Loading...") : dom("span", null, label));
}
var _default = exports.default = ButtonPrimary;
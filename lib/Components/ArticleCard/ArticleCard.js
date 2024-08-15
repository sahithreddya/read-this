"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("./ArticleCard.scss");
var _react = require("react");
function ArticleCard(_ref) {
  let {
    article_id,
    imageURL,
    title,
    article_url,
    desc,
    users,
    created_at
  } = _ref;
  // let navigate = useNavigate();
  let date = new Date(created_at).toLocaleDateString('en-us', {
    weekday: "long",
    month: "short",
    day: "numeric"
  });
  console.log(date);
  (0, _react.useEffect)(() => {
    // getOpenGraphdata();
    // handleFetchArticles();
  }, []);
  return dom("div", {
    key: article_id,
    className: "article__container"
  }, dom("img", {
    className: "article__image",
    src: imageURL,
    alt: "article"
  }), dom("div", {
    className: "article__content"
  }, dom("div", {
    className: "article__header"
  }, dom("p", {
    className: "article__title"
  }, title), dom("p", {
    className: "article__url"
  }, article_url)), dom("div", {
    className: "article__description"
  }, dom("p", {
    className: ""
  }, desc)), dom("div", {
    className: "article__user"
  }, dom("p", {
    className: ""
  }, "shared by ", users.user_name, " on ", date))));
}
var _default = exports.default = ArticleCard;
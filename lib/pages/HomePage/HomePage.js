"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _reactRouterDom = require("react-router-dom");
var _Components = require("../../Components");
require("./HomePage.scss");
var _client = require("../../client");
var _axios = _interopRequireDefault(require("axios"));
var _react = require("react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function HomePage(_ref) {
  var _sessionStorage;
  let {
    token
  } = _ref;
  let navigate = (0, _reactRouterDom.useNavigate)();

  // const [loading, setLoading] = useState(false)
  const [articles, setArticles] = (0, _react.useState)([]);
  const [newArticleLink, setNewArticleLink] = (0, _react.useState)();
  const [userData, setUserData] = (0, _react.useState)(JSON.parse(((_sessionStorage = sessionStorage) === null || _sessionStorage === void 0 ? void 0 : _sessionStorage.getItem('token')) || '{}'));
  (0, _react.useEffect)(() => {
    handleFetchArticles();
  }, []);
  function handleLogout(e) {
    sessionStorage.removeItem('token');
    navigate("/");
    alert("You've successfully logged out.");
  }
  function getOpenGraphdata(url) {
    let key = "app_id=41aaee6a-3c4a-4c70-8ce4-c6f264590a7b";
    return _axios.default.get("https://opengraph.io/api/1.1/site/".concat(encodeURIComponent(url), "?").concat(key ? key : ""));
  }
  async function handleAddArticle() {
    var _openGraphdata$data, _openGraphdata$data2, _openGraphdata$data3;
    // let tempData = {
    //   title: "The Psychology of Fonts: How to Choose Fonts That Evoke Emotion",
    //   desc: "Designers have used powerful fonts to give designs a certain mood and feel for decades.If you want to create designs that connect, here's how to use the psychology of fonts to evoke emotion through your work.",
    //   imageURL: "https://blog-frontend.envato.com/cdn-cgi/image/width=1200,quality=75,format=auto,fit=crop,height=630/uploads/sites/2/2023/02/Screen-Shot-2024-02-08-at-8.40.48-am.png",
    // }
    articles.map(article => {
      if (article.url === newArticleLink) {
        alert("Article already exists");
        return;
      } else {
        console.log(newArticleLink);
      }
    });
    const openGraphdata = await getOpenGraphdata(newArticleLink);
    await addNewArticle(openGraphdata === null || openGraphdata === void 0 || (_openGraphdata$data = openGraphdata.data) === null || _openGraphdata$data === void 0 || (_openGraphdata$data = _openGraphdata$data.hybridGraph) === null || _openGraphdata$data === void 0 ? void 0 : _openGraphdata$data.title, openGraphdata === null || openGraphdata === void 0 || (_openGraphdata$data2 = openGraphdata.data) === null || _openGraphdata$data2 === void 0 || (_openGraphdata$data2 = _openGraphdata$data2.hybridGraph) === null || _openGraphdata$data2 === void 0 ? void 0 : _openGraphdata$data2.description, openGraphdata === null || openGraphdata === void 0 || (_openGraphdata$data3 = openGraphdata.data) === null || _openGraphdata$data3 === void 0 || (_openGraphdata$data3 = _openGraphdata$data3.hybridGraph) === null || _openGraphdata$data3 === void 0 ? void 0 : _openGraphdata$data3.image);
    // await addNewArticle(tempData.title, tempData.desc, tempData.imageURL);
  }
  async function addNewArticle(title, desc, imageURL) {
    try {
      if (title && imageURL) {
        const {
          data,
          error
        } = await _client.supabase.from('articles').insert({
          title: title,
          desc: desc,
          imageURL: imageURL,
          article_url: newArticleLink,
          user_id: userData.user.id
        }).select("*,\n            users(user_id, user_name)");
        console.log(data);
        if (error) {
          console.log("addNewArticle error is:" + JSON.stringify(error));
          throw error;
        } else {
          let arrData = [...articles];
          arrData.push(data[0]);
          setArticles(arrData);
          // alert("New article added successfully")
        }
      }
    } catch (e) {
      console.log("addNewUser thrown error is:" + JSON.stringify(e));
    }
  }
  async function handleFetchArticles() {
    const {
      data,
      error
    } = await _client.supabase.from('articles').select("\n        *,\n        users(user_id, user_name)\n        ").order('created_at', {
      ascending: false
    });
    if (error) {
      console.log(JSON.stringify(error));
      console.log(data);
    } else {
      setArticles(data);
      console.log(data);
    }
  }
  return dom("div", {
    className: "home__container"
  }, dom("div", {
    className: "home__navbar"
  }, dom("h1", {
    className: "navbar__logo"
  }, "ReadThis."), dom("div", {
    className: "home__logout"
  }, dom(_Components.ButtonPrimary, {
    label: "Logout",
    type: "secondary",
    onClick: handleLogout
  }))), dom("div", {
    className: "home__body__container"
  }, dom("h1", null, "Hello, ", userData.user.user_metadata.name, "."), dom("div", {
    className: "body__article__container"
  }, articles === null || articles === void 0 ? void 0 : articles.map(article => dom(_Components.ArticleCard, _extends({
    key: article.article_id
  }, article)))), dom("div", {
    className: "home__addNewArticle"
  }, dom(_Components.FormInput, {
    placeholder: "Paste article link",
    type: "text",
    setValue: setNewArticleLink
  }), dom(_Components.ButtonPrimary, {
    label: "Add new article",
    type: "primary",
    onClick: handleAddArticle
  }))));
}
var _default = exports.default = HomePage;
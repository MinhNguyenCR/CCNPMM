import React, { useState } from 'react';

var Button = function Button(_ref) {
  var children = _ref.children,
    onClick = _ref.onClick,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "button" : _ref$type,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    onClick: onClick,
    className: "px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ".concat(className)
  }, children);
};

var InputText = function InputText(_ref) {
  var value = _ref.value,
    _onChange = _ref.onChange,
    placeholder = _ref.placeholder;
  return /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: function onChange(e) {
      return _onChange(e.target.value);
    },
    className: "border px-3 py-2 rounded w-full"
  });
};

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var Cart = function Cart() {
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    items = _useState2[0],
    setItems = _useState2[1];
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    newItem = _useState4[0],
    setNewItem = _useState4[1];
  var addItem = function addItem() {
    if (!newItem.trim()) return;
    setItems([].concat(_toConsumableArray(items), [{
      id: Date.now(),
      name: newItem
    }]));
    setNewItem("");
  };
  var removeItem = function removeItem(id) {
    setItems(items.filter(function (item) {
      return item.id !== id;
    }));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "p-4 border rounded shadow w-96"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-bold mb-3"
  }, "Gi\u1ECF h\xE0ng"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(InputText, {
    value: newItem,
    onChange: setNewItem,
    placeholder: "Nh\u1EADp s\u1EA3n ph\u1EA9m..."
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: addItem
  }, "Th\xEAm")), /*#__PURE__*/React.createElement("ul", null, items.map(function (item) {
    return /*#__PURE__*/React.createElement("li", {
      key: item.id,
      className: "flex justify-between mb-2"
    }, /*#__PURE__*/React.createElement("span", null, item.name), /*#__PURE__*/React.createElement(Button, {
      onClick: function onClick() {
        return removeItem(item.id);
      },
      className: "bg-red-500 hover:bg-red-600"
    }, "X\xF3a"));
  })));
};

export { Button, Cart, InputText };

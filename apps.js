/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * This file is part of Cockpit.
	 *
	 * Copyright (C) 2017 Red Hat, Inc.
	 *
	 * Cockpit is free software; you can redistribute it and/or modify it
	 * under the terms of the GNU Lesser General Public License as published by
	 * the Free Software Foundation; either version 2.1 of the License, or
	 * (at your option) any later version.
	 *
	 * Cockpit is distributed in the hope that it will be useful, but
	 * WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
	 * Lesser General Public License for more details.
	 *
	 * You should have received a copy of the GNU Lesser General Public License
	 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
	 */
	
	"use strict";
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _cockpit = __webpack_require__(2);
	
	var _cockpit2 = _interopRequireDefault(_cockpit);
	
	var _jquery = __webpack_require__(3);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _applicationListJsx = __webpack_require__(5);
	
	var _applicationListJsx2 = _interopRequireDefault(_applicationListJsx);
	
	var _applicationJsx = __webpack_require__(11);
	
	var _applicationJsx2 = _interopRequireDefault(_applicationJsx);
	
	var _appstreamJs = __webpack_require__(13);
	
	var _appstreamJs2 = _interopRequireDefault(_appstreamJs);
	
	__webpack_require__(9);
	
	var metainfo_db = _appstreamJs2["default"].get_metainfo_db();
	
	function render_list() {
	    _react2["default"].render(_react2["default"].createElement(_applicationListJsx2["default"].ApplicationList, { metainfo_db: metainfo_db }), (0, _jquery2["default"])('#list')[0]);
	}
	
	function render_app() {
	    _react2["default"].render(_react2["default"].createElement(_applicationJsx2["default"].Application, { metainfo_db: metainfo_db, id: _cockpit2["default"].location.path[0] }), (0, _jquery2["default"])('#app')[0]);
	}
	
	function navigate() {
	    var path = _cockpit2["default"].location.path;
	
	    if (path.length === 0) {
	        (0, _jquery2["default"])('#list-page').show();
	        (0, _jquery2["default"])('#app-page').hide();
	    } else if (path.length === 1) {
	        render_app();
	        (0, _jquery2["default"])('#list-page').hide();
	        (0, _jquery2["default"])('#app-page').show();
	    } else {
	        /* redirect */
	        console.warn("not a apps location: " + path);
	        _cockpit2["default"].location = '';
	    }
	}
	
	(0, _jquery2["default"])(function () {
	    _cockpit2["default"].translate();
	
	    (0, _jquery2["default"])(metainfo_db).on("changed", render_list);
	    (0, _jquery2["default"])(metainfo_db).on("changed", render_app);
	
	    render_list();
	    (0, _jquery2["default"])(_cockpit2["default"]).on("locationchanged", navigate);
	    navigate();
	
	    (0, _jquery2["default"])('body').show();
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = cockpit;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * react-lite.js v0.15.37
	 * (c) 2017 Jade Gu
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  global.React = factory();
	}(this, function () { 'use strict';
	
	  var HTML_KEY = 'dangerouslySetInnerHTML';
	  var SVGNamespaceURI = 'http://www.w3.org/2000/svg';
	  var COMPONENT_ID = 'liteid';
	  var VELEMENT = 2;
	  var VSTATELESS = 3;
	  var VCOMPONENT = 4;
	  var VCOMMENT = 5;
	  var ELEMENT_NODE_TYPE = 1;
	  var DOC_NODE_TYPE = 9;
	  var DOCUMENT_FRAGMENT_NODE_TYPE = 11;
	
	  /**
	   * current stateful component's refs property
	   * will attach to every vnode created by calling component.render method
	   */
	  var refs = null;
	
	  function createVnode(vtype, type, props, key, ref) {
	      var vnode = {
	          vtype: vtype,
	          type: type,
	          props: props,
	          refs: refs,
	          key: key,
	          ref: ref
	      };
	      if (vtype === VSTATELESS || vtype === VCOMPONENT) {
	          vnode.uid = getUid();
	      }
	      return vnode;
	  }
	
	  function initVnode(vnode, parentContext, namespaceURI) {
	      var vtype = vnode.vtype;
	
	      var node = null;
	      if (!vtype) {
	          // init text
	          node = document.createTextNode(vnode);
	      } else if (vtype === VELEMENT) {
	          // init element
	          node = initVelem(vnode, parentContext, namespaceURI);
	      } else if (vtype === VCOMPONENT) {
	          // init stateful component
	          node = initVcomponent(vnode, parentContext, namespaceURI);
	      } else if (vtype === VSTATELESS) {
	          // init stateless component
	          node = initVstateless(vnode, parentContext, namespaceURI);
	      } else if (vtype === VCOMMENT) {
	          // init comment
	          node = document.createComment('react-text: ' + (vnode.uid || getUid()));
	      }
	      return node;
	  }
	
	  function updateVnode(vnode, newVnode, node, parentContext) {
	      var vtype = vnode.vtype;
	
	      if (vtype === VCOMPONENT) {
	          return updateVcomponent(vnode, newVnode, node, parentContext);
	      }
	
	      if (vtype === VSTATELESS) {
	          return updateVstateless(vnode, newVnode, node, parentContext);
	      }
	
	      // ignore VCOMMENT and other vtypes
	      if (vtype !== VELEMENT) {
	          return node;
	      }
	
	      var oldHtml = vnode.props[HTML_KEY] && vnode.props[HTML_KEY].__html;
	      if (oldHtml != null) {
	          updateVelem(vnode, newVnode, node, parentContext);
	          initVchildren(newVnode, node, parentContext);
	      } else {
	          updateVChildren(vnode, newVnode, node, parentContext);
	          updateVelem(vnode, newVnode, node, parentContext);
	      }
	      return node;
	  }
	
	  function updateVChildren(vnode, newVnode, node, parentContext) {
	      var patches = {
	          removes: [],
	          updates: [],
	          creates: []
	      };
	      diffVchildren(patches, vnode, newVnode, node, parentContext);
	      flatEach(patches.removes, applyDestroy);
	      flatEach(patches.updates, applyUpdate);
	      flatEach(patches.creates, applyCreate);
	  }
	
	  function applyUpdate(data) {
	      if (!data) {
	          return;
	      }
	      var vnode = data.vnode;
	      var newNode = data.node;
	
	      // update
	      if (!data.shouldIgnore) {
	          if (!vnode.vtype) {
	              newNode.replaceData(0, newNode.length, data.newVnode);
	          } else if (vnode.vtype === VELEMENT) {
	              updateVelem(vnode, data.newVnode, newNode, data.parentContext);
	          } else if (vnode.vtype === VSTATELESS) {
	              newNode = updateVstateless(vnode, data.newVnode, newNode, data.parentContext);
	          } else if (vnode.vtype === VCOMPONENT) {
	              newNode = updateVcomponent(vnode, data.newVnode, newNode, data.parentContext);
	          }
	      }
	
	      // re-order
	      var currentNode = newNode.parentNode.childNodes[data.index];
	      if (currentNode !== newNode) {
	          newNode.parentNode.insertBefore(newNode, currentNode);
	      }
	      return newNode;
	  }
	
	  function applyDestroy(data) {
	      destroyVnode(data.vnode, data.node);
	      data.node.parentNode.removeChild(data.node);
	  }
	
	  function applyCreate(data) {
	      var node = initVnode(data.vnode, data.parentContext, data.parentNode.namespaceURI);
	      data.parentNode.insertBefore(node, data.parentNode.childNodes[data.index]);
	  }
	
	  /**
	   * Only vnode which has props.children need to call destroy function
	   * to check whether subTree has component that need to call lify-cycle method and release cache.
	   */
	
	  function destroyVnode(vnode, node) {
	      var vtype = vnode.vtype;
	
	      if (vtype === VELEMENT) {
	          // destroy element
	          destroyVelem(vnode, node);
	      } else if (vtype === VCOMPONENT) {
	          // destroy state component
	          destroyVcomponent(vnode, node);
	      } else if (vtype === VSTATELESS) {
	          // destroy stateless component
	          destroyVstateless(vnode, node);
	      }
	  }
	
	  function initVelem(velem, parentContext, namespaceURI) {
	      var type = velem.type;
	      var props = velem.props;
	
	      var node = null;
	
	      if (type === 'svg' || namespaceURI === SVGNamespaceURI) {
	          node = document.createElementNS(SVGNamespaceURI, type);
	          namespaceURI = SVGNamespaceURI;
	      } else {
	          node = document.createElement(type);
	      }
	
	      initVchildren(velem, node, parentContext);
	
	      var isCustomComponent = type.indexOf('-') >= 0 || props.is != null;
	      setProps(node, props, isCustomComponent);
	
	      if (velem.ref != null) {
	          addItem(pendingRefs, velem);
	          addItem(pendingRefs, node);
	      }
	
	      return node;
	  }
	
	  function initVchildren(velem, node, parentContext) {
	      var vchildren = node.vchildren = getFlattenChildren(velem);
	      var namespaceURI = node.namespaceURI;
	      for (var i = 0, len = vchildren.length; i < len; i++) {
	          node.appendChild(initVnode(vchildren[i], parentContext, namespaceURI));
	      }
	  }
	
	  function getFlattenChildren(vnode) {
	      var children = vnode.props.children;
	
	      var vchildren = [];
	      if (isArr(children)) {
	          flatEach(children, collectChild, vchildren);
	      } else {
	          collectChild(children, vchildren);
	      }
	      return vchildren;
	  }
	
	  function collectChild(child, children) {
	      if (child != null && typeof child !== 'boolean') {
	          if (!child.vtype) {
	              // convert immutablejs data
	              if (child.toJS) {
	                  child = child.toJS();
	                  if (isArr(child)) {
	                      flatEach(child, collectChild, children);
	                  } else {
	                      collectChild(child, children);
	                  }
	                  return;
	              }
	              child = '' + child;
	          }
	          children[children.length] = child;
	      }
	  }
	
	  function diffVchildren(patches, vnode, newVnode, node, parentContext) {
	      if (!node.vchildren) return; // react-lite hasn't seen this DOM node before
	
	      var childNodes = node.childNodes;
	      var vchildren = node.vchildren;
	
	      var newVchildren = node.vchildren = getFlattenChildren(newVnode);
	      var vchildrenLen = vchildren.length;
	      var newVchildrenLen = newVchildren.length;
	
	      if (vchildrenLen === 0) {
	          if (newVchildrenLen > 0) {
	              for (var i = 0; i < newVchildrenLen; i++) {
	                  addItem(patches.creates, {
	                      vnode: newVchildren[i],
	                      parentNode: node,
	                      parentContext: parentContext,
	                      index: i
	                  });
	              }
	          }
	          return;
	      } else if (newVchildrenLen === 0) {
	          for (var i = 0; i < vchildrenLen; i++) {
	              addItem(patches.removes, {
	                  vnode: vchildren[i],
	                  node: childNodes[i]
	              });
	          }
	          return;
	      }
	
	      var updates = Array(newVchildrenLen);
	      var removes = null;
	      var creates = null;
	
	      // isEqual
	      for (var i = 0; i < vchildrenLen; i++) {
	          var _vnode = vchildren[i];
	          for (var j = 0; j < newVchildrenLen; j++) {
	              if (updates[j]) {
	                  continue;
	              }
	              var _newVnode = newVchildren[j];
	              if (_vnode === _newVnode) {
	                  var shouldIgnore = true;
	                  if (parentContext) {
	                      if (_vnode.vtype === VCOMPONENT || _vnode.vtype === VSTATELESS) {
	                          if (_vnode.type.contextTypes) {
	                              shouldIgnore = false;
	                          }
	                      }
	                  }
	                  updates[j] = {
	                      shouldIgnore: shouldIgnore,
	                      vnode: _vnode,
	                      newVnode: _newVnode,
	                      node: childNodes[i],
	                      parentContext: parentContext,
	                      index: j
	                  };
	                  vchildren[i] = null;
	                  break;
	              }
	          }
	      }
	
	      // isSimilar
	      for (var i = 0; i < vchildrenLen; i++) {
	          var _vnode2 = vchildren[i];
	          if (_vnode2 === null) {
	              continue;
	          }
	          var shouldRemove = true;
	          for (var j = 0; j < newVchildrenLen; j++) {
	              if (updates[j]) {
	                  continue;
	              }
	              var _newVnode2 = newVchildren[j];
	              if (_newVnode2.type === _vnode2.type && _newVnode2.key === _vnode2.key && _newVnode2.refs === _vnode2.refs) {
	                  updates[j] = {
	                      vnode: _vnode2,
	                      newVnode: _newVnode2,
	                      node: childNodes[i],
	                      parentContext: parentContext,
	                      index: j
	                  };
	                  shouldRemove = false;
	                  break;
	              }
	          }
	          if (shouldRemove) {
	              if (!removes) {
	                  removes = [];
	              }
	              addItem(removes, {
	                  vnode: _vnode2,
	                  node: childNodes[i]
	              });
	          }
	      }
	
	      for (var i = 0; i < newVchildrenLen; i++) {
	          var item = updates[i];
	          if (!item) {
	              if (!creates) {
	                  creates = [];
	              }
	              addItem(creates, {
	                  vnode: newVchildren[i],
	                  parentNode: node,
	                  parentContext: parentContext,
	                  index: i
	              });
	          } else if (item.vnode.vtype === VELEMENT) {
	              diffVchildren(patches, item.vnode, item.newVnode, item.node, item.parentContext);
	          }
	      }
	
	      if (removes) {
	          addItem(patches.removes, removes);
	      }
	      if (creates) {
	          addItem(patches.creates, creates);
	      }
	      addItem(patches.updates, updates);
	  }
	
	  function updateVelem(velem, newVelem, node) {
	      var isCustomComponent = velem.type.indexOf('-') >= 0 || velem.props.is != null;
	      patchProps(node, velem.props, newVelem.props, isCustomComponent);
	      if (velem.ref !== newVelem.ref) {
	          detachRef(velem.refs, velem.ref, node);
	          attachRef(newVelem.refs, newVelem.ref, node);
	      }
	      return node;
	  }
	
	  function destroyVelem(velem, node) {
	      var props = velem.props;
	      var vchildren = node.vchildren;
	      var childNodes = node.childNodes;
	
	      if (vchildren) {
	          for (var i = 0, len = vchildren.length; i < len; i++) {
	              destroyVnode(vchildren[i], childNodes[i]);
	          }
	      }
	      detachRef(velem.refs, velem.ref, node);
	      node.eventStore = node.vchildren = null;
	  }
	
	  function initVstateless(vstateless, parentContext, namespaceURI) {
	      var vnode = renderVstateless(vstateless, parentContext);
	      var node = initVnode(vnode, parentContext, namespaceURI);
	      node.cache = node.cache || {};
	      node.cache[vstateless.uid] = vnode;
	      return node;
	  }
	
	  function updateVstateless(vstateless, newVstateless, node, parentContext) {
	      var uid = vstateless.uid;
	      var vnode = node.cache[uid];
	      delete node.cache[uid];
	      var newVnode = renderVstateless(newVstateless, parentContext);
	      var newNode = compareTwoVnodes(vnode, newVnode, node, parentContext);
	      newNode.cache = newNode.cache || {};
	      newNode.cache[newVstateless.uid] = newVnode;
	      if (newNode !== node) {
	          syncCache(newNode.cache, node.cache, newNode);
	      }
	      return newNode;
	  }
	
	  function destroyVstateless(vstateless, node) {
	      var uid = vstateless.uid;
	      var vnode = node.cache[uid];
	      delete node.cache[uid];
	      destroyVnode(vnode, node);
	  }
	
	  function renderVstateless(vstateless, parentContext) {
	      var factory = vstateless.type;
	      var props = vstateless.props;
	
	      var componentContext = getContextByTypes(parentContext, factory.contextTypes);
	      var vnode = factory(props, componentContext);
	      if (vnode && vnode.render) {
	          vnode = vnode.render();
	      }
	      if (vnode === null || vnode === false) {
	          vnode = createVnode(VCOMMENT);
	      } else if (!vnode || !vnode.vtype) {
	          throw new Error('@' + factory.name + '#render:You may have returned undefined, an array or some other invalid object');
	      }
	      return vnode;
	  }
	
	  function initVcomponent(vcomponent, parentContext, namespaceURI) {
	      var Component = vcomponent.type;
	      var props = vcomponent.props;
	      var uid = vcomponent.uid;
	
	      var componentContext = getContextByTypes(parentContext, Component.contextTypes);
	      var component = new Component(props, componentContext);
	      var updater = component.$updater;
	      var cache = component.$cache;
	
	      cache.parentContext = parentContext;
	      updater.isPending = true;
	      component.props = component.props || props;
	      component.context = component.context || componentContext;
	      if (component.componentWillMount) {
	          component.componentWillMount();
	          component.state = updater.getState();
	      }
	      var vnode = renderComponent(component);
	      var node = initVnode(vnode, getChildContext(component, parentContext), namespaceURI);
	      node.cache = node.cache || {};
	      node.cache[uid] = component;
	      cache.vnode = vnode;
	      cache.node = node;
	      cache.isMounted = true;
	      addItem(pendingComponents, component);
	
	      if (vcomponent.ref != null) {
	          addItem(pendingRefs, vcomponent);
	          addItem(pendingRefs, component);
	      }
	
	      return node;
	  }
	
	  function updateVcomponent(vcomponent, newVcomponent, node, parentContext) {
	      var uid = vcomponent.uid;
	      var component = node.cache[uid];
	      var updater = component.$updater;
	      var cache = component.$cache;
	      var Component = newVcomponent.type;
	      var nextProps = newVcomponent.props;
	
	      var componentContext = getContextByTypes(parentContext, Component.contextTypes);
	      delete node.cache[uid];
	      node.cache[newVcomponent.uid] = component;
	      cache.parentContext = parentContext;
	      if (component.componentWillReceiveProps) {
	          var needToggleIsPending = !updater.isPending;
	          if (needToggleIsPending) updater.isPending = true;
	          component.componentWillReceiveProps(nextProps, componentContext);
	          if (needToggleIsPending) updater.isPending = false;
	      }
	
	      if (vcomponent.ref !== newVcomponent.ref) {
	          detachRef(vcomponent.refs, vcomponent.ref, component);
	          attachRef(newVcomponent.refs, newVcomponent.ref, component);
	      }
	
	      updater.emitUpdate(nextProps, componentContext);
	
	      return cache.node;
	  }
	
	  function destroyVcomponent(vcomponent, node) {
	      var uid = vcomponent.uid;
	      var component = node.cache[uid];
	      var cache = component.$cache;
	      delete node.cache[uid];
	      detachRef(vcomponent.refs, vcomponent.ref, component);
	      component.setState = component.forceUpdate = noop;
	      if (component.componentWillUnmount) {
	          component.componentWillUnmount();
	      }
	      destroyVnode(cache.vnode, node);
	      delete component.setState;
	      cache.isMounted = false;
	      cache.node = cache.parentContext = cache.vnode = component.refs = component.context = null;
	  }
	
	  function getContextByTypes(curContext, contextTypes) {
	      var context = {};
	      if (!contextTypes || !curContext) {
	          return context;
	      }
	      for (var key in contextTypes) {
	          if (contextTypes.hasOwnProperty(key)) {
	              context[key] = curContext[key];
	          }
	      }
	      return context;
	  }
	
	  function renderComponent(component, parentContext) {
	      refs = component.refs;
	      var vnode = component.render();
	      if (vnode === null || vnode === false) {
	          vnode = createVnode(VCOMMENT);
	      } else if (!vnode || !vnode.vtype) {
	          throw new Error('@' + component.constructor.name + '#render:You may have returned undefined, an array or some other invalid object');
	      }
	      refs = null;
	      return vnode;
	  }
	
	  function getChildContext(component, parentContext) {
	      if (component.getChildContext) {
	          var curContext = component.getChildContext();
	          if (curContext) {
	              parentContext = extend(extend({}, parentContext), curContext);
	          }
	      }
	      return parentContext;
	  }
	
	  var pendingComponents = [];
	  function clearPendingComponents() {
	      var len = pendingComponents.length;
	      if (!len) {
	          return;
	      }
	      var components = pendingComponents;
	      pendingComponents = [];
	      var i = -1;
	      while (len--) {
	          var component = components[++i];
	          var updater = component.$updater;
	          if (component.componentDidMount) {
	              component.componentDidMount();
	          }
	          updater.isPending = false;
	          updater.emitUpdate();
	      }
	  }
	
	  var pendingRefs = [];
	  function clearPendingRefs() {
	      var len = pendingRefs.length;
	      if (!len) {
	          return;
	      }
	      var list = pendingRefs;
	      pendingRefs = [];
	      for (var i = 0; i < len; i += 2) {
	          var vnode = list[i];
	          var refValue = list[i + 1];
	          attachRef(vnode.refs, vnode.ref, refValue);
	      }
	  }
	
	  function clearPending() {
	      clearPendingRefs();
	      clearPendingComponents();
	  }
	
	  function compareTwoVnodes(vnode, newVnode, node, parentContext) {
	      var newNode = node;
	      if (newVnode == null) {
	          // remove
	          destroyVnode(vnode, node);
	          node.parentNode.removeChild(node);
	      } else if (vnode.type !== newVnode.type || vnode.key !== newVnode.key) {
	          // replace
	          destroyVnode(vnode, node);
	          newNode = initVnode(newVnode, parentContext, node.namespaceURI);
	          node.parentNode.replaceChild(newNode, node);
	      } else if (vnode !== newVnode || parentContext) {
	          // same type and same key -> update
	          newNode = updateVnode(vnode, newVnode, node, parentContext);
	      }
	      return newNode;
	  }
	
	  function getDOMNode() {
	      return this;
	  }
	
	  function attachRef(refs, refKey, refValue) {
	      if (refKey == null || !refValue) {
	          return;
	      }
	      if (refValue.nodeName && !refValue.getDOMNode) {
	          // support react v0.13 style: this.refs.myInput.getDOMNode()
	          refValue.getDOMNode = getDOMNode;
	      }
	      if (isFn(refKey)) {
	          refKey(refValue);
	      } else if (refs) {
	          refs[refKey] = refValue;
	      }
	  }
	
	  function detachRef(refs, refKey, refValue) {
	      if (refKey == null) {
	          return;
	      }
	      if (isFn(refKey)) {
	          refKey(null);
	      } else if (refs && refs[refKey] === refValue) {
	          delete refs[refKey];
	      }
	  }
	
	  function syncCache(cache, oldCache, node) {
	      for (var key in oldCache) {
	          if (!oldCache.hasOwnProperty(key)) {
	              continue;
	          }
	          var value = oldCache[key];
	          cache[key] = value;
	
	          // is component, update component.$cache.node
	          if (value.forceUpdate) {
	              value.$cache.node = node;
	          }
	      }
	  }
	
	  var updateQueue = {
	  	updaters: [],
	  	isPending: false,
	  	add: function add(updater) {
	  		addItem(this.updaters, updater);
	  	},
	  	batchUpdate: function batchUpdate() {
	  		if (this.isPending) {
	  			return;
	  		}
	  		this.isPending = true;
	  		/*
	     each updater.update may add new updater to updateQueue
	     clear them with a loop
	     event bubbles from bottom-level to top-level
	     reverse the updater order can merge some props and state and reduce the refresh times
	     see Updater.update method below to know why
	    */
	  		var updaters = this.updaters;
	
	  		var updater = undefined;
	  		while (updater = updaters.pop()) {
	  			updater.updateComponent();
	  		}
	  		this.isPending = false;
	  	}
	  };
	
	  function Updater(instance) {
	  	this.instance = instance;
	  	this.pendingStates = [];
	  	this.pendingCallbacks = [];
	  	this.isPending = false;
	  	this.nextProps = this.nextContext = null;
	  	this.clearCallbacks = this.clearCallbacks.bind(this);
	  }
	
	  Updater.prototype = {
	  	emitUpdate: function emitUpdate(nextProps, nextContext) {
	  		this.nextProps = nextProps;
	  		this.nextContext = nextContext;
	  		// receive nextProps!! should update immediately
	  		nextProps || !updateQueue.isPending ? this.updateComponent() : updateQueue.add(this);
	  	},
	  	updateComponent: function updateComponent() {
	  		var instance = this.instance;
	  		var pendingStates = this.pendingStates;
	  		var nextProps = this.nextProps;
	  		var nextContext = this.nextContext;
	
	  		if (nextProps || pendingStates.length > 0) {
	  			nextProps = nextProps || instance.props;
	  			nextContext = nextContext || instance.context;
	  			this.nextProps = this.nextContext = null;
	  			// merge the nextProps and nextState and update by one time
	  			shouldUpdate(instance, nextProps, this.getState(), nextContext, this.clearCallbacks);
	  		}
	  	},
	  	addState: function addState(nextState) {
	  		if (nextState) {
	  			addItem(this.pendingStates, nextState);
	  			if (!this.isPending) {
	  				this.emitUpdate();
	  			}
	  		}
	  	},
	  	replaceState: function replaceState(nextState) {
	  		var pendingStates = this.pendingStates;
	
	  		pendingStates.pop();
	  		// push special params to point out should replace state
	  		addItem(pendingStates, [nextState]);
	  	},
	  	getState: function getState() {
	  		var instance = this.instance;
	  		var pendingStates = this.pendingStates;
	  		var state = instance.state;
	  		var props = instance.props;
	
	  		if (pendingStates.length) {
	  			state = extend({}, state);
	  			pendingStates.forEach(function (nextState) {
	  				var isReplace = isArr(nextState);
	  				if (isReplace) {
	  					nextState = nextState[0];
	  				}
	  				if (isFn(nextState)) {
	  					nextState = nextState.call(instance, state, props);
	  				}
	  				// replace state
	  				if (isReplace) {
	  					state = extend({}, nextState);
	  				} else {
	  					extend(state, nextState);
	  				}
	  			});
	  			pendingStates.length = 0;
	  		}
	  		return state;
	  	},
	  	clearCallbacks: function clearCallbacks() {
	  		var pendingCallbacks = this.pendingCallbacks;
	  		var instance = this.instance;
	
	  		if (pendingCallbacks.length > 0) {
	  			this.pendingCallbacks = [];
	  			pendingCallbacks.forEach(function (callback) {
	  				return callback.call(instance);
	  			});
	  		}
	  	},
	  	addCallback: function addCallback(callback) {
	  		if (isFn(callback)) {
	  			addItem(this.pendingCallbacks, callback);
	  		}
	  	}
	  };
	  function Component(props, context) {
	  	this.$updater = new Updater(this);
	  	this.$cache = { isMounted: false };
	  	this.props = props;
	  	this.state = {};
	  	this.refs = {};
	  	this.context = context;
	  }
	
	  var ReactComponentSymbol = {};
	
	  Component.prototype = {
	  	constructor: Component,
	  	isReactComponent: ReactComponentSymbol,
	  	// getChildContext: _.noop,
	  	// componentWillUpdate: _.noop,
	  	// componentDidUpdate: _.noop,
	  	// componentWillReceiveProps: _.noop,
	  	// componentWillMount: _.noop,
	  	// componentDidMount: _.noop,
	  	// componentWillUnmount: _.noop,
	  	// shouldComponentUpdate(nextProps, nextState) {
	  	// 	return true
	  	// },
	  	forceUpdate: function forceUpdate(callback) {
	  		var $updater = this.$updater;
	  		var $cache = this.$cache;
	  		var props = this.props;
	  		var state = this.state;
	  		var context = this.context;
	
	  		if (!$cache.isMounted) {
	  			return;
	  		}
	  		// if updater is pending, add state to trigger nexttick update
	  		if ($updater.isPending) {
	  			$updater.addState(state);
	  			return;
	  		}
	  		var nextProps = $cache.props || props;
	  		var nextState = $cache.state || state;
	  		var nextContext = $cache.context || context;
	  		var parentContext = $cache.parentContext;
	  		var node = $cache.node;
	  		var vnode = $cache.vnode;
	  		$cache.props = $cache.state = $cache.context = null;
	  		$updater.isPending = true;
	  		if (this.componentWillUpdate) {
	  			this.componentWillUpdate(nextProps, nextState, nextContext);
	  		}
	  		this.state = nextState;
	  		this.props = nextProps;
	  		this.context = nextContext;
	  		var newVnode = renderComponent(this);
	  		var newNode = compareTwoVnodes(vnode, newVnode, node, getChildContext(this, parentContext));
	  		if (newNode !== node) {
	  			newNode.cache = newNode.cache || {};
	  			syncCache(newNode.cache, node.cache, newNode);
	  		}
	  		$cache.vnode = newVnode;
	  		$cache.node = newNode;
	  		clearPending();
	  		if (this.componentDidUpdate) {
	  			this.componentDidUpdate(props, state, context);
	  		}
	  		if (callback) {
	  			callback.call(this);
	  		}
	  		$updater.isPending = false;
	  		$updater.emitUpdate();
	  	},
	  	setState: function setState(nextState, callback) {
	  		var $updater = this.$updater;
	
	  		$updater.addCallback(callback);
	  		$updater.addState(nextState);
	  	},
	  	replaceState: function replaceState(nextState, callback) {
	  		var $updater = this.$updater;
	
	  		$updater.addCallback(callback);
	  		$updater.replaceState(nextState);
	  	},
	  	getDOMNode: function getDOMNode() {
	  		var node = this.$cache.node;
	  		return node && node.nodeName === '#comment' ? null : node;
	  	},
	  	isMounted: function isMounted() {
	  		return this.$cache.isMounted;
	  	}
	  };
	
	  function shouldUpdate(component, nextProps, nextState, nextContext, callback) {
	  	var shouldComponentUpdate = true;
	  	if (component.shouldComponentUpdate) {
	  		shouldComponentUpdate = component.shouldComponentUpdate(nextProps, nextState, nextContext);
	  	}
	  	if (shouldComponentUpdate === false) {
	  		component.props = nextProps;
	  		component.state = nextState;
	  		component.context = nextContext || {};
	  		return;
	  	}
	  	var cache = component.$cache;
	  	cache.props = nextProps;
	  	cache.state = nextState;
	  	cache.context = nextContext || {};
	  	component.forceUpdate(callback);
	  }
	
	  // event config
	  var unbubbleEvents = {
	      /**
	       * should not bind mousemove in document scope
	       * even though mousemove event can bubble
	       */
	      onmousemove: 1,
	      ontouchmove: 1,
	      onmouseleave: 1,
	      onmouseenter: 1,
	      onload: 1,
	      onunload: 1,
	      onscroll: 1,
	      onfocus: 1,
	      onblur: 1,
	      onrowexit: 1,
	      onbeforeunload: 1,
	      onstop: 1,
	      ondragdrop: 1,
	      ondragenter: 1,
	      ondragexit: 1,
	      ondraggesture: 1,
	      ondragover: 1,
	      oncontextmenu: 1,
	      onerror: 1,
	
	      // media event
	      onabort: 1,
	      oncanplay: 1,
	      oncanplaythrough: 1,
	      ondurationchange: 1,
	      onemptied: 1,
	      onended: 1,
	      onloadeddata: 1,
	      onloadedmetadata: 1,
	      onloadstart: 1,
	      onencrypted: 1,
	      onpause: 1,
	      onplay: 1,
	      onplaying: 1,
	      onprogress: 1,
	      onratechange: 1,
	      onseeking: 1,
	      onseeked: 1,
	      onstalled: 1,
	      onsuspend: 1,
	      ontimeupdate: 1,
	      onvolumechange: 1,
	      onwaiting: 1
	  };
	
	  function getEventName(key) {
	      if (key === 'onDoubleClick') {
	          key = 'ondblclick';
	      } else if (key === 'onTouchTap') {
	          key = 'onclick';
	      }
	
	      return key.toLowerCase();
	  }
	
	  // Mobile Safari does not fire properly bubble click events on
	  // non-interactive elements, which means delegated click listeners do not
	  // fire. The workaround for this bug involves attaching an empty click
	  // listener on the target node.
	  var inMobile = ('ontouchstart' in document);
	  var emptyFunction = function emptyFunction() {};
	  var ON_CLICK_KEY = 'onclick';
	
	  var eventTypes = {};
	
	  function addEvent(elem, eventType, listener) {
	      eventType = getEventName(eventType);
	
	      var eventStore = elem.eventStore || (elem.eventStore = {});
	      eventStore[eventType] = listener;
	
	      if (unbubbleEvents[eventType] === 1) {
	          elem[eventType] = dispatchUnbubbleEvent;
	          return;
	      } else if (!eventTypes[eventType]) {
	          // onclick -> click
	          document.addEventListener(eventType.substr(2), dispatchEvent, false);
	          eventTypes[eventType] = true;
	      }
	
	      if (inMobile && eventType === ON_CLICK_KEY) {
	          elem.addEventListener('click', emptyFunction, false);
	          return;
	      }
	
	      var nodeName = elem.nodeName;
	
	      if (eventType === 'onchange' && supportInputEvent(elem)) {
	          addEvent(elem, 'oninput', listener);
	      }
	  }
	
	  function removeEvent(elem, eventType) {
	      eventType = getEventName(eventType);
	
	      var eventStore = elem.eventStore || (elem.eventStore = {});
	      delete eventStore[eventType];
	
	      if (unbubbleEvents[eventType] === 1) {
	          elem[eventType] = null;
	          return;
	      } else if (inMobile && eventType === ON_CLICK_KEY) {
	          elem.removeEventListener('click', emptyFunction, false);
	          return;
	      }
	
	      var nodeName = elem.nodeName;
	
	      if (eventType === 'onchange' && supportInputEvent(elem)) {
	          delete eventStore['oninput'];
	      }
	  }
	
	  function dispatchEvent(event) {
	      var target = event.target;
	      var type = event.type;
	
	      var eventType = 'on' + type;
	      var syntheticEvent = undefined;
	
	      updateQueue.isPending = true;
	      while (target) {
	          var _target = target;
	          var eventStore = _target.eventStore;
	
	          var listener = eventStore && eventStore[eventType];
	          if (!listener) {
	              target = target.parentNode;
	              continue;
	          }
	          if (!syntheticEvent) {
	              syntheticEvent = createSyntheticEvent(event);
	          }
	          syntheticEvent.currentTarget = target;
	          listener.call(target, syntheticEvent);
	          if (syntheticEvent.$cancelBubble) {
	              break;
	          }
	          target = target.parentNode;
	      }
	      updateQueue.isPending = false;
	      updateQueue.batchUpdate();
	  }
	
	  function dispatchUnbubbleEvent(event) {
	      var target = event.currentTarget || event.target;
	      var eventType = 'on' + event.type;
	      var syntheticEvent = createSyntheticEvent(event);
	
	      syntheticEvent.currentTarget = target;
	      updateQueue.isPending = true;
	
	      var eventStore = target.eventStore;
	
	      var listener = eventStore && eventStore[eventType];
	      if (listener) {
	          listener.call(target, syntheticEvent);
	      }
	
	      updateQueue.isPending = false;
	      updateQueue.batchUpdate();
	  }
	
	  function createSyntheticEvent(nativeEvent) {
	      var syntheticEvent = {};
	      var cancelBubble = function cancelBubble() {
	          return syntheticEvent.$cancelBubble = true;
	      };
	      syntheticEvent.nativeEvent = nativeEvent;
	      syntheticEvent.persist = noop;
	      for (var key in nativeEvent) {
	          if (typeof nativeEvent[key] !== 'function') {
	              syntheticEvent[key] = nativeEvent[key];
	          } else if (key === 'stopPropagation' || key === 'stopImmediatePropagation') {
	              syntheticEvent[key] = cancelBubble;
	          } else {
	              syntheticEvent[key] = nativeEvent[key].bind(nativeEvent);
	          }
	      }
	      return syntheticEvent;
	  }
	
	  function supportInputEvent(elem) {
	      var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
	      return nodeName !== 'select' && !(nodeName === 'input' && elem.type === 'file');
	  }
	
	  function setStyle(elemStyle, styles) {
	      for (var styleName in styles) {
	          if (styles.hasOwnProperty(styleName)) {
	              setStyleValue(elemStyle, styleName, styles[styleName]);
	          }
	      }
	  }
	
	  function removeStyle(elemStyle, styles) {
	      for (var styleName in styles) {
	          if (styles.hasOwnProperty(styleName)) {
	              elemStyle[styleName] = '';
	          }
	      }
	  }
	
	  function patchStyle(elemStyle, style, newStyle) {
	      if (style === newStyle) {
	          return;
	      }
	      if (!newStyle && style) {
	          removeStyle(elemStyle, style);
	          return;
	      } else if (newStyle && !style) {
	          setStyle(elemStyle, newStyle);
	          return;
	      }
	
	      for (var key in style) {
	          if (newStyle.hasOwnProperty(key)) {
	              if (newStyle[key] !== style[key]) {
	                  setStyleValue(elemStyle, key, newStyle[key]);
	              }
	          } else {
	              elemStyle[key] = '';
	          }
	      }
	      for (var key in newStyle) {
	          if (!style.hasOwnProperty(key)) {
	              setStyleValue(elemStyle, key, newStyle[key]);
	          }
	      }
	  }
	
	  /**
	   * CSS properties which accept numbers but are not in units of "px".
	   */
	  var isUnitlessNumber = {
	      animationIterationCount: 1,
	      borderImageOutset: 1,
	      borderImageSlice: 1,
	      borderImageWidth: 1,
	      boxFlex: 1,
	      boxFlexGroup: 1,
	      boxOrdinalGroup: 1,
	      columnCount: 1,
	      flex: 1,
	      flexGrow: 1,
	      flexPositive: 1,
	      flexShrink: 1,
	      flexNegative: 1,
	      flexOrder: 1,
	      gridRow: 1,
	      gridColumn: 1,
	      fontWeight: 1,
	      lineClamp: 1,
	      lineHeight: 1,
	      opacity: 1,
	      order: 1,
	      orphans: 1,
	      tabSize: 1,
	      widows: 1,
	      zIndex: 1,
	      zoom: 1,
	
	      // SVG-related properties
	      fillOpacity: 1,
	      floodOpacity: 1,
	      stopOpacity: 1,
	      strokeDasharray: 1,
	      strokeDashoffset: 1,
	      strokeMiterlimit: 1,
	      strokeOpacity: 1,
	      strokeWidth: 1
	  };
	
	  function prefixKey(prefix, key) {
	      return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	  }
	
	  var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
	
	  Object.keys(isUnitlessNumber).forEach(function (prop) {
	      prefixes.forEach(function (prefix) {
	          isUnitlessNumber[prefixKey(prefix, prop)] = 1;
	      });
	  });
	
	  var RE_NUMBER = /^-?\d+(\.\d+)?$/;
	  function setStyleValue(elemStyle, styleName, styleValue) {
	
	      if (!isUnitlessNumber[styleName] && RE_NUMBER.test(styleValue)) {
	          elemStyle[styleName] = styleValue + 'px';
	          return;
	      }
	
	      if (styleName === 'float') {
	          styleName = 'cssFloat';
	      }
	
	      if (styleValue == null || typeof styleValue === 'boolean') {
	          styleValue = '';
	      }
	
	      elemStyle[styleName] = styleValue;
	  }
	
	  var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
	  var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\uB7\\u0300-\\u036F\\u203F-\\u2040';
	
	  var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');
	
	  var isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));
	  // will merge some data in properties below
	  var properties = {};
	
	  /**
	   * Mapping from normalized, camelcased property names to a configuration that
	   * specifies how the associated DOM property should be accessed or rendered.
	   */
	  var MUST_USE_PROPERTY = 0x1;
	  var HAS_BOOLEAN_VALUE = 0x4;
	  var HAS_NUMERIC_VALUE = 0x8;
	  var HAS_POSITIVE_NUMERIC_VALUE = 0x10 | 0x8;
	  var HAS_OVERLOADED_BOOLEAN_VALUE = 0x20;
	
	  // html config
	  var HTMLDOMPropertyConfig = {
	      props: {
	          /**
	           * Standard Properties
	           */
	          accept: 0,
	          acceptCharset: 0,
	          accessKey: 0,
	          action: 0,
	          allowFullScreen: HAS_BOOLEAN_VALUE,
	          allowTransparency: 0,
	          alt: 0,
	          async: HAS_BOOLEAN_VALUE,
	          autoComplete: 0,
	          autoFocus: HAS_BOOLEAN_VALUE,
	          autoPlay: HAS_BOOLEAN_VALUE,
	          capture: HAS_BOOLEAN_VALUE,
	          cellPadding: 0,
	          cellSpacing: 0,
	          charSet: 0,
	          challenge: 0,
	          checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	          cite: 0,
	          classID: 0,
	          className: 0,
	          cols: HAS_POSITIVE_NUMERIC_VALUE,
	          colSpan: 0,
	          content: 0,
	          contentEditable: 0,
	          contextMenu: 0,
	          controls: HAS_BOOLEAN_VALUE,
	          coords: 0,
	          crossOrigin: 0,
	          data: 0, // For `<object />` acts as `src`.
	          dateTime: 0,
	          'default': HAS_BOOLEAN_VALUE,
	          // not in regular react, they did it in other way
	          defaultValue: MUST_USE_PROPERTY,
	          // not in regular react, they did it in other way
	          defaultChecked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	          defer: HAS_BOOLEAN_VALUE,
	          dir: 0,
	          disabled: HAS_BOOLEAN_VALUE,
	          download: HAS_OVERLOADED_BOOLEAN_VALUE,
	          draggable: 0,
	          encType: 0,
	          form: 0,
	          formAction: 0,
	          formEncType: 0,
	          formMethod: 0,
	          formNoValidate: HAS_BOOLEAN_VALUE,
	          formTarget: 0,
	          frameBorder: 0,
	          headers: 0,
	          height: 0,
	          hidden: HAS_BOOLEAN_VALUE,
	          high: 0,
	          href: 0,
	          hrefLang: 0,
	          htmlFor: 0,
	          httpEquiv: 0,
	          icon: 0,
	          id: 0,
	          inputMode: 0,
	          integrity: 0,
	          is: 0,
	          keyParams: 0,
	          keyType: 0,
	          kind: 0,
	          label: 0,
	          lang: 0,
	          list: 0,
	          loop: HAS_BOOLEAN_VALUE,
	          low: 0,
	          manifest: 0,
	          marginHeight: 0,
	          marginWidth: 0,
	          max: 0,
	          maxLength: 0,
	          media: 0,
	          mediaGroup: 0,
	          method: 0,
	          min: 0,
	          minLength: 0,
	          // Caution; `option.selected` is not updated if `select.multiple` is
	          // disabled with `removeAttribute`.
	          multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	          muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	          name: 0,
	          nonce: 0,
	          noValidate: HAS_BOOLEAN_VALUE,
	          open: HAS_BOOLEAN_VALUE,
	          optimum: 0,
	          pattern: 0,
	          placeholder: 0,
	          poster: 0,
	          preload: 0,
	          profile: 0,
	          radioGroup: 0,
	          readOnly: HAS_BOOLEAN_VALUE,
	          referrerPolicy: 0,
	          rel: 0,
	          required: HAS_BOOLEAN_VALUE,
	          reversed: HAS_BOOLEAN_VALUE,
	          role: 0,
	          rows: HAS_POSITIVE_NUMERIC_VALUE,
	          rowSpan: HAS_NUMERIC_VALUE,
	          sandbox: 0,
	          scope: 0,
	          scoped: HAS_BOOLEAN_VALUE,
	          scrolling: 0,
	          seamless: HAS_BOOLEAN_VALUE,
	          selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	          shape: 0,
	          size: HAS_POSITIVE_NUMERIC_VALUE,
	          sizes: 0,
	          span: HAS_POSITIVE_NUMERIC_VALUE,
	          spellCheck: 0,
	          src: 0,
	          srcDoc: 0,
	          srcLang: 0,
	          srcSet: 0,
	          start: HAS_NUMERIC_VALUE,
	          step: 0,
	          style: 0,
	          summary: 0,
	          tabIndex: 0,
	          target: 0,
	          title: 0,
	          // Setting .type throws on non-<input> tags
	          type: 0,
	          useMap: 0,
	          value: MUST_USE_PROPERTY,
	          width: 0,
	          wmode: 0,
	          wrap: 0,
	
	          /**
	           * RDFa Properties
	           */
	          about: 0,
	          datatype: 0,
	          inlist: 0,
	          prefix: 0,
	          // property is also supported for OpenGraph in meta tags.
	          property: 0,
	          playsInline: HAS_BOOLEAN_VALUE,
	          resource: 0,
	          'typeof': 0,
	          vocab: 0,
	
	          /**
	           * Non-standard Properties
	           */
	          // autoCapitalize and autoCorrect are supported in Mobile Safari for
	          // keyboard hints.
	          autoCapitalize: 0,
	          autoCorrect: 0,
	          // autoSave allows WebKit/Blink to persist values of input fields on page reloads
	          autoSave: 0,
	          // color is for Safari mask-icon link
	          color: 0,
	          // itemProp, itemScope, itemType are for
	          // Microdata support. See http://schema.org/docs/gs.html
	          itemProp: 0,
	          itemScope: HAS_BOOLEAN_VALUE,
	          itemType: 0,
	          // itemID and itemRef are for Microdata support as well but
	          // only specified in the WHATWG spec document. See
	          // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
	          itemID: 0,
	          itemRef: 0,
	          // results show looking glass icon and recent searches on input
	          // search fields in WebKit/Blink
	          results: 0,
	          // IE-only attribute that specifies security restrictions on an iframe
	          // as an alternative to the sandbox attribute on IE<10
	          security: 0,
	          // IE-only attribute that controls focus behavior
	          unselectable: 0
	      },
	      attrNS: {},
	      domAttrs: {
	          acceptCharset: 'accept-charset',
	          className: 'class',
	          htmlFor: 'for',
	          httpEquiv: 'http-equiv'
	      },
	      domProps: {}
	  };
	
	  // svg config
	  var xlink = 'http://www.w3.org/1999/xlink';
	  var xml = 'http://www.w3.org/XML/1998/namespace';
	
	  // We use attributes for everything SVG so let's avoid some duplication and run
	  // code instead.
	  // The following are all specified in the HTML config already so we exclude here.
	  // - class (as className)
	  // - color
	  // - height
	  // - id
	  // - lang
	  // - max
	  // - media
	  // - method
	  // - min
	  // - name
	  // - style
	  // - target
	  // - type
	  // - width
	  var ATTRS = {
	      accentHeight: 'accent-height',
	      accumulate: 0,
	      additive: 0,
	      alignmentBaseline: 'alignment-baseline',
	      allowReorder: 'allowReorder',
	      alphabetic: 0,
	      amplitude: 0,
	      arabicForm: 'arabic-form',
	      ascent: 0,
	      attributeName: 'attributeName',
	      attributeType: 'attributeType',
	      autoReverse: 'autoReverse',
	      azimuth: 0,
	      baseFrequency: 'baseFrequency',
	      baseProfile: 'baseProfile',
	      baselineShift: 'baseline-shift',
	      bbox: 0,
	      begin: 0,
	      bias: 0,
	      by: 0,
	      calcMode: 'calcMode',
	      capHeight: 'cap-height',
	      clip: 0,
	      clipPath: 'clip-path',
	      clipRule: 'clip-rule',
	      clipPathUnits: 'clipPathUnits',
	      colorInterpolation: 'color-interpolation',
	      colorInterpolationFilters: 'color-interpolation-filters',
	      colorProfile: 'color-profile',
	      colorRendering: 'color-rendering',
	      contentScriptType: 'contentScriptType',
	      contentStyleType: 'contentStyleType',
	      cursor: 0,
	      cx: 0,
	      cy: 0,
	      d: 0,
	      decelerate: 0,
	      descent: 0,
	      diffuseConstant: 'diffuseConstant',
	      direction: 0,
	      display: 0,
	      divisor: 0,
	      dominantBaseline: 'dominant-baseline',
	      dur: 0,
	      dx: 0,
	      dy: 0,
	      edgeMode: 'edgeMode',
	      elevation: 0,
	      enableBackground: 'enable-background',
	      end: 0,
	      exponent: 0,
	      externalResourcesRequired: 'externalResourcesRequired',
	      fill: 0,
	      fillOpacity: 'fill-opacity',
	      fillRule: 'fill-rule',
	      filter: 0,
	      filterRes: 'filterRes',
	      filterUnits: 'filterUnits',
	      floodColor: 'flood-color',
	      floodOpacity: 'flood-opacity',
	      focusable: 0,
	      fontFamily: 'font-family',
	      fontSize: 'font-size',
	      fontSizeAdjust: 'font-size-adjust',
	      fontStretch: 'font-stretch',
	      fontStyle: 'font-style',
	      fontVariant: 'font-variant',
	      fontWeight: 'font-weight',
	      format: 0,
	      from: 0,
	      fx: 0,
	      fy: 0,
	      g1: 0,
	      g2: 0,
	      glyphName: 'glyph-name',
	      glyphOrientationHorizontal: 'glyph-orientation-horizontal',
	      glyphOrientationVertical: 'glyph-orientation-vertical',
	      glyphRef: 'glyphRef',
	      gradientTransform: 'gradientTransform',
	      gradientUnits: 'gradientUnits',
	      hanging: 0,
	      horizAdvX: 'horiz-adv-x',
	      horizOriginX: 'horiz-origin-x',
	      ideographic: 0,
	      imageRendering: 'image-rendering',
	      'in': 0,
	      in2: 0,
	      intercept: 0,
	      k: 0,
	      k1: 0,
	      k2: 0,
	      k3: 0,
	      k4: 0,
	      kernelMatrix: 'kernelMatrix',
	      kernelUnitLength: 'kernelUnitLength',
	      kerning: 0,
	      keyPoints: 'keyPoints',
	      keySplines: 'keySplines',
	      keyTimes: 'keyTimes',
	      lengthAdjust: 'lengthAdjust',
	      letterSpacing: 'letter-spacing',
	      lightingColor: 'lighting-color',
	      limitingConeAngle: 'limitingConeAngle',
	      local: 0,
	      markerEnd: 'marker-end',
	      markerMid: 'marker-mid',
	      markerStart: 'marker-start',
	      markerHeight: 'markerHeight',
	      markerUnits: 'markerUnits',
	      markerWidth: 'markerWidth',
	      mask: 0,
	      maskContentUnits: 'maskContentUnits',
	      maskUnits: 'maskUnits',
	      mathematical: 0,
	      mode: 0,
	      numOctaves: 'numOctaves',
	      offset: 0,
	      opacity: 0,
	      operator: 0,
	      order: 0,
	      orient: 0,
	      orientation: 0,
	      origin: 0,
	      overflow: 0,
	      overlinePosition: 'overline-position',
	      overlineThickness: 'overline-thickness',
	      paintOrder: 'paint-order',
	      panose1: 'panose-1',
	      pathLength: 'pathLength',
	      patternContentUnits: 'patternContentUnits',
	      patternTransform: 'patternTransform',
	      patternUnits: 'patternUnits',
	      pointerEvents: 'pointer-events',
	      points: 0,
	      pointsAtX: 'pointsAtX',
	      pointsAtY: 'pointsAtY',
	      pointsAtZ: 'pointsAtZ',
	      preserveAlpha: 'preserveAlpha',
	      preserveAspectRatio: 'preserveAspectRatio',
	      primitiveUnits: 'primitiveUnits',
	      r: 0,
	      radius: 0,
	      refX: 'refX',
	      refY: 'refY',
	      renderingIntent: 'rendering-intent',
	      repeatCount: 'repeatCount',
	      repeatDur: 'repeatDur',
	      requiredExtensions: 'requiredExtensions',
	      requiredFeatures: 'requiredFeatures',
	      restart: 0,
	      result: 0,
	      rotate: 0,
	      rx: 0,
	      ry: 0,
	      scale: 0,
	      seed: 0,
	      shapeRendering: 'shape-rendering',
	      slope: 0,
	      spacing: 0,
	      specularConstant: 'specularConstant',
	      specularExponent: 'specularExponent',
	      speed: 0,
	      spreadMethod: 'spreadMethod',
	      startOffset: 'startOffset',
	      stdDeviation: 'stdDeviation',
	      stemh: 0,
	      stemv: 0,
	      stitchTiles: 'stitchTiles',
	      stopColor: 'stop-color',
	      stopOpacity: 'stop-opacity',
	      strikethroughPosition: 'strikethrough-position',
	      strikethroughThickness: 'strikethrough-thickness',
	      string: 0,
	      stroke: 0,
	      strokeDasharray: 'stroke-dasharray',
	      strokeDashoffset: 'stroke-dashoffset',
	      strokeLinecap: 'stroke-linecap',
	      strokeLinejoin: 'stroke-linejoin',
	      strokeMiterlimit: 'stroke-miterlimit',
	      strokeOpacity: 'stroke-opacity',
	      strokeWidth: 'stroke-width',
	      surfaceScale: 'surfaceScale',
	      systemLanguage: 'systemLanguage',
	      tableValues: 'tableValues',
	      targetX: 'targetX',
	      targetY: 'targetY',
	      textAnchor: 'text-anchor',
	      textDecoration: 'text-decoration',
	      textRendering: 'text-rendering',
	      textLength: 'textLength',
	      to: 0,
	      transform: 0,
	      u1: 0,
	      u2: 0,
	      underlinePosition: 'underline-position',
	      underlineThickness: 'underline-thickness',
	      unicode: 0,
	      unicodeBidi: 'unicode-bidi',
	      unicodeRange: 'unicode-range',
	      unitsPerEm: 'units-per-em',
	      vAlphabetic: 'v-alphabetic',
	      vHanging: 'v-hanging',
	      vIdeographic: 'v-ideographic',
	      vMathematical: 'v-mathematical',
	      values: 0,
	      vectorEffect: 'vector-effect',
	      version: 0,
	      vertAdvY: 'vert-adv-y',
	      vertOriginX: 'vert-origin-x',
	      vertOriginY: 'vert-origin-y',
	      viewBox: 'viewBox',
	      viewTarget: 'viewTarget',
	      visibility: 0,
	      widths: 0,
	      wordSpacing: 'word-spacing',
	      writingMode: 'writing-mode',
	      x: 0,
	      xHeight: 'x-height',
	      x1: 0,
	      x2: 0,
	      xChannelSelector: 'xChannelSelector',
	      xlinkActuate: 'xlink:actuate',
	      xlinkArcrole: 'xlink:arcrole',
	      xlinkHref: 'xlink:href',
	      xlinkRole: 'xlink:role',
	      xlinkShow: 'xlink:show',
	      xlinkTitle: 'xlink:title',
	      xlinkType: 'xlink:type',
	      xmlBase: 'xml:base',
	      xmlns: 0,
	      xmlnsXlink: 'xmlns:xlink',
	      xmlLang: 'xml:lang',
	      xmlSpace: 'xml:space',
	      y: 0,
	      y1: 0,
	      y2: 0,
	      yChannelSelector: 'yChannelSelector',
	      z: 0,
	      zoomAndPan: 'zoomAndPan'
	  };
	
	  var SVGDOMPropertyConfig = {
	      props: {},
	      attrNS: {
	          xlinkActuate: xlink,
	          xlinkArcrole: xlink,
	          xlinkHref: xlink,
	          xlinkRole: xlink,
	          xlinkShow: xlink,
	          xlinkTitle: xlink,
	          xlinkType: xlink,
	          xmlBase: xml,
	          xmlLang: xml,
	          xmlSpace: xml
	      },
	      domAttrs: {},
	      domProps: {}
	  };
	
	  Object.keys(ATTRS).map(function (key) {
	      SVGDOMPropertyConfig.props[key] = 0;
	      if (ATTRS[key]) {
	          SVGDOMPropertyConfig.domAttrs[key] = ATTRS[key];
	      }
	  });
	
	  // merge html and svg config into properties
	  mergeConfigToProperties(HTMLDOMPropertyConfig);
	  mergeConfigToProperties(SVGDOMPropertyConfig);
	
	  function mergeConfigToProperties(config) {
	      var
	      // all react/react-lite supporting property names in here
	      props = config.props;
	      var
	      // attributes namespace in here
	      attrNS = config.attrNS;
	      var
	      // propName in props which should use to be dom-attribute in here
	      domAttrs = config.domAttrs;
	      var
	      // propName in props which should use to be dom-property in here
	      domProps = config.domProps;
	
	      for (var propName in props) {
	          if (!props.hasOwnProperty(propName)) {
	              continue;
	          }
	          var propConfig = props[propName];
	          properties[propName] = {
	              attributeName: domAttrs.hasOwnProperty(propName) ? domAttrs[propName] : propName.toLowerCase(),
	              propertyName: domProps.hasOwnProperty(propName) ? domProps[propName] : propName,
	              attributeNamespace: attrNS.hasOwnProperty(propName) ? attrNS[propName] : null,
	              mustUseProperty: checkMask(propConfig, MUST_USE_PROPERTY),
	              hasBooleanValue: checkMask(propConfig, HAS_BOOLEAN_VALUE),
	              hasNumericValue: checkMask(propConfig, HAS_NUMERIC_VALUE),
	              hasPositiveNumericValue: checkMask(propConfig, HAS_POSITIVE_NUMERIC_VALUE),
	              hasOverloadedBooleanValue: checkMask(propConfig, HAS_OVERLOADED_BOOLEAN_VALUE)
	          };
	      }
	  }
	
	  function checkMask(value, bitmask) {
	      return (value & bitmask) === bitmask;
	  }
	
	  /**
	   * Sets the value for a property on a node.
	   *
	   * @param {DOMElement} node
	   * @param {string} name
	   * @param {*} value
	   */
	
	  function setPropValue(node, name, value) {
	      var propInfo = properties.hasOwnProperty(name) && properties[name];
	      if (propInfo) {
	          // should delete value from dom
	          if (value == null || propInfo.hasBooleanValue && !value || propInfo.hasNumericValue && isNaN(value) || propInfo.hasPositiveNumericValue && value < 1 || propInfo.hasOverloadedBooleanValue && value === false) {
	              removePropValue(node, name);
	          } else if (propInfo.mustUseProperty) {
	              var propName = propInfo.propertyName;
	              // dom.value has side effect
	              if (propName !== 'value' || '' + node[propName] !== '' + value) {
	                  node[propName] = value;
	              }
	          } else {
	              var attributeName = propInfo.attributeName;
	              var namespace = propInfo.attributeNamespace;
	
	              // `setAttribute` with objects becomes only `[object]` in IE8/9,
	              // ('' + value) makes it output the correct toString()-value.
	              if (namespace) {
	                  node.setAttributeNS(namespace, attributeName, '' + value);
	              } else if (propInfo.hasBooleanValue || propInfo.hasOverloadedBooleanValue && value === true) {
	                  node.setAttribute(attributeName, '');
	              } else {
	                  node.setAttribute(attributeName, '' + value);
	              }
	          }
	      } else if (isCustomAttribute(name) && VALID_ATTRIBUTE_NAME_REGEX.test(name)) {
	          if (value == null) {
	              node.removeAttribute(name);
	          } else {
	              node.setAttribute(name, '' + value);
	          }
	      }
	  }
	
	  /**
	   * Deletes the value for a property on a node.
	   *
	   * @param {DOMElement} node
	   * @param {string} name
	   */
	
	  function removePropValue(node, name) {
	      var propInfo = properties.hasOwnProperty(name) && properties[name];
	      if (propInfo) {
	          if (propInfo.mustUseProperty) {
	              var propName = propInfo.propertyName;
	              if (propInfo.hasBooleanValue) {
	                  node[propName] = false;
	              } else {
	                  // dom.value accept string value has side effect
	                  if (propName !== 'value' || '' + node[propName] !== '') {
	                      node[propName] = '';
	                  }
	              }
	          } else {
	              node.removeAttribute(propInfo.attributeName);
	          }
	      } else if (isCustomAttribute(name)) {
	          node.removeAttribute(name);
	      }
	  }
	
	  function isFn(obj) {
	      return typeof obj === 'function';
	  }
	
	  var isArr = Array.isArray;
	
	  function noop() {}
	
	  function identity(obj) {
	      return obj;
	  }
	
	  function pipe(fn1, fn2) {
	      return function () {
	          fn1.apply(this, arguments);
	          return fn2.apply(this, arguments);
	      };
	  }
	
	  function addItem(list, item) {
	      list[list.length] = item;
	  }
	
	  function flatEach(list, iteratee, a) {
	      var len = list.length;
	      var i = -1;
	
	      while (len--) {
	          var item = list[++i];
	          if (isArr(item)) {
	              flatEach(item, iteratee, a);
	          } else {
	              iteratee(item, a);
	          }
	      }
	  }
	
	  function extend(to, from) {
	      if (!from) {
	          return to;
	      }
	      var keys = Object.keys(from);
	      var i = keys.length;
	      while (i--) {
	          to[keys[i]] = from[keys[i]];
	      }
	      return to;
	  }
	
	  var uid = 0;
	
	  function getUid() {
	      return ++uid;
	  }
	
	  var EVENT_KEYS = /^on/i;
	
	  function setProp(elem, key, value, isCustomComponent) {
	      if (EVENT_KEYS.test(key)) {
	          addEvent(elem, key, value);
	      } else if (key === 'style') {
	          setStyle(elem.style, value);
	      } else if (key === HTML_KEY) {
	          if (value && value.__html != null) {
	              elem.innerHTML = value.__html;
	          }
	      } else if (isCustomComponent) {
	          if (value == null) {
	              elem.removeAttribute(key);
	          } else {
	              elem.setAttribute(key, '' + value);
	          }
	      } else {
	          setPropValue(elem, key, value);
	      }
	  }
	
	  function removeProp(elem, key, oldValue, isCustomComponent) {
	      if (EVENT_KEYS.test(key)) {
	          removeEvent(elem, key);
	      } else if (key === 'style') {
	          removeStyle(elem.style, oldValue);
	      } else if (key === HTML_KEY) {
	          elem.innerHTML = '';
	      } else if (isCustomComponent) {
	          elem.removeAttribute(key);
	      } else {
	          removePropValue(elem, key);
	      }
	  }
	
	  function patchProp(elem, key, value, oldValue, isCustomComponent) {
	      if (key === 'value' || key === 'checked') {
	          oldValue = elem[key];
	      }
	      if (value === oldValue) {
	          return;
	      }
	      if (value === undefined) {
	          removeProp(elem, key, oldValue, isCustomComponent);
	          return;
	      }
	      if (key === 'style') {
	          patchStyle(elem.style, oldValue, value);
	      } else {
	          setProp(elem, key, value, isCustomComponent);
	      }
	  }
	
	  function setProps(elem, props, isCustomComponent) {
	      for (var key in props) {
	          if (key !== 'children') {
	              setProp(elem, key, props[key], isCustomComponent);
	          }
	      }
	  }
	
	  function patchProps(elem, props, newProps, isCustomComponent) {
	      for (var key in props) {
	          if (key !== 'children') {
	              if (newProps.hasOwnProperty(key)) {
	                  patchProp(elem, key, newProps[key], props[key], isCustomComponent);
	              } else {
	                  removeProp(elem, key, props[key], isCustomComponent);
	              }
	          }
	      }
	      for (var key in newProps) {
	          if (key !== 'children' && !props.hasOwnProperty(key)) {
	              setProp(elem, key, newProps[key], isCustomComponent);
	          }
	      }
	  }
	
	  if (!Object.freeze) {
	      Object.freeze = identity;
	  }
	
	  function isValidContainer(node) {
	  	return !!(node && (node.nodeType === ELEMENT_NODE_TYPE || node.nodeType === DOC_NODE_TYPE || node.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE));
	  }
	
	  var pendingRendering = {};
	  var vnodeStore = {};
	  function renderTreeIntoContainer(vnode, container, callback, parentContext) {
	  	if (!vnode.vtype) {
	  		throw new Error('cannot render ' + vnode + ' to container');
	  	}
	  	if (!isValidContainer(container)) {
	  		throw new Error('container ' + container + ' is not a DOM element');
	  	}
	  	var id = container[COMPONENT_ID] || (container[COMPONENT_ID] = getUid());
	  	var argsCache = pendingRendering[id];
	
	  	// component lify cycle method maybe call root rendering
	  	// should bundle them and render by only one time
	  	if (argsCache) {
	  		if (argsCache === true) {
	  			pendingRendering[id] = argsCache = { vnode: vnode, callback: callback, parentContext: parentContext };
	  		} else {
	  			argsCache.vnode = vnode;
	  			argsCache.parentContext = parentContext;
	  			argsCache.callback = argsCache.callback ? pipe(argsCache.callback, callback) : callback;
	  		}
	  		return;
	  	}
	
	  	pendingRendering[id] = true;
	  	var oldVnode = null;
	  	var rootNode = null;
	  	if (oldVnode = vnodeStore[id]) {
	  		rootNode = compareTwoVnodes(oldVnode, vnode, container.firstChild, parentContext);
	  	} else {
	  		rootNode = initVnode(vnode, parentContext, container.namespaceURI);
	  		var childNode = null;
	  		while (childNode = container.lastChild) {
	  			container.removeChild(childNode);
	  		}
	  		container.appendChild(rootNode);
	  	}
	  	vnodeStore[id] = vnode;
	  	var isPending = updateQueue.isPending;
	  	updateQueue.isPending = true;
	  	clearPending();
	  	argsCache = pendingRendering[id];
	  	delete pendingRendering[id];
	
	  	var result = null;
	  	if (typeof argsCache === 'object') {
	  		result = renderTreeIntoContainer(argsCache.vnode, container, argsCache.callback, argsCache.parentContext);
	  	} else if (vnode.vtype === VELEMENT) {
	  		result = rootNode;
	  	} else if (vnode.vtype === VCOMPONENT) {
	  		result = rootNode.cache[vnode.uid];
	  	}
	
	  	if (!isPending) {
	  		updateQueue.isPending = false;
	  		updateQueue.batchUpdate();
	  	}
	
	  	if (callback) {
	  		callback.call(result);
	  	}
	
	  	return result;
	  }
	
	  function render(vnode, container, callback) {
	  	return renderTreeIntoContainer(vnode, container, callback);
	  }
	
	  function unstable_renderSubtreeIntoContainer(parentComponent, subVnode, container, callback) {
	  	var context = parentComponent.$cache.parentContext;
	  	return renderTreeIntoContainer(subVnode, container, callback, context);
	  }
	
	  function unmountComponentAtNode(container) {
	  	if (!container.nodeName) {
	  		throw new Error('expect node');
	  	}
	  	var id = container[COMPONENT_ID];
	  	var vnode = null;
	  	if (vnode = vnodeStore[id]) {
	  		destroyVnode(vnode, container.firstChild);
	  		container.removeChild(container.firstChild);
	  		delete vnodeStore[id];
	  		return true;
	  	}
	  	return false;
	  }
	
	  function findDOMNode(node) {
	  	if (node == null) {
	  		return null;
	  	}
	  	if (node.nodeName) {
	  		return node;
	  	}
	  	var component = node;
	  	// if component.node equal to false, component must be unmounted
	  	if (component.getDOMNode && component.$cache.isMounted) {
	  		return component.getDOMNode();
	  	}
	  	throw new Error('findDOMNode can not find Node');
	  }
	
	  var ReactDOM = Object.freeze({
	  	render: render,
	  	unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
	  	unmountComponentAtNode: unmountComponentAtNode,
	  	findDOMNode: findDOMNode
	  });
	
	  function createElement(type, props, children) {
	  	var vtype = null;
	  	if (typeof type === 'string') {
	  		vtype = VELEMENT;
	  	} else if (typeof type === 'function') {
	  		if (type.prototype && type.prototype.isReactComponent) {
	  			vtype = VCOMPONENT;
	  		} else {
	  			vtype = VSTATELESS;
	  		}
	  	} else {
	  		throw new Error('React.createElement: unexpect type [ ' + type + ' ]');
	  	}
	
	  	var key = null;
	  	var ref = null;
	  	var finalProps = {};
	  	if (props != null) {
	  		for (var propKey in props) {
	  			if (!props.hasOwnProperty(propKey)) {
	  				continue;
	  			}
	  			if (propKey === 'key') {
	  				if (props.key !== undefined) {
	  					key = '' + props.key;
	  				}
	  			} else if (propKey === 'ref') {
	  				if (props.ref !== undefined) {
	  					ref = props.ref;
	  				}
	  			} else {
	  				finalProps[propKey] = props[propKey];
	  			}
	  		}
	  	}
	
	  	var defaultProps = type.defaultProps;
	
	  	if (defaultProps) {
	  		for (var propKey in defaultProps) {
	  			if (finalProps[propKey] === undefined) {
	  				finalProps[propKey] = defaultProps[propKey];
	  			}
	  		}
	  	}
	
	  	var argsLen = arguments.length;
	  	var finalChildren = children;
	
	  	if (argsLen > 3) {
	  		finalChildren = Array(argsLen - 2);
	  		for (var i = 2; i < argsLen; i++) {
	  			finalChildren[i - 2] = arguments[i];
	  		}
	  	}
	
	  	if (finalChildren !== undefined) {
	  		finalProps.children = finalChildren;
	  	}
	
	  	return createVnode(vtype, type, finalProps, key, ref);
	  }
	
	  function isValidElement(obj) {
	  	return obj != null && !!obj.vtype;
	  }
	
	  function cloneElement(originElem, props) {
	  	var type = originElem.type;
	  	var key = originElem.key;
	  	var ref = originElem.ref;
	
	  	var newProps = extend(extend({ key: key, ref: ref }, originElem.props), props);
	
	  	for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	  		children[_key - 2] = arguments[_key];
	  	}
	
	  	var vnode = createElement.apply(undefined, [type, newProps].concat(children));
	  	if (vnode.ref === originElem.ref) {
	  		vnode.refs = originElem.refs;
	  	}
	  	return vnode;
	  }
	
	  function createFactory(type) {
	  	var factory = function factory() {
	  		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	  			args[_key2] = arguments[_key2];
	  		}
	
	  		return createElement.apply(undefined, [type].concat(args));
	  	};
	  	factory.type = type;
	  	return factory;
	  }
	
	  var tagNames = 'a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|main|map|mark|menu|menuitem|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr|circle|clipPath|defs|ellipse|g|image|line|linearGradient|mask|path|pattern|polygon|polyline|radialGradient|rect|stop|svg|text|tspan';
	  var DOM = {};
	  tagNames.split('|').forEach(function (tagName) {
	  	DOM[tagName] = createFactory(tagName);
	  });
	
	  var check = function check() {
	      return check;
	  };
	  check.isRequired = check;
	  var PropTypes = {
	      "array": check,
	      "bool": check,
	      "func": check,
	      "number": check,
	      "object": check,
	      "string": check,
	      "any": check,
	      "arrayOf": check,
	      "element": check,
	      "instanceOf": check,
	      "node": check,
	      "objectOf": check,
	      "oneOf": check,
	      "oneOfType": check,
	      "shape": check
	  };
	
	  function only(children) {
	  	if (isValidElement(children)) {
	  		return children;
	  	}
	  	throw new Error('expect only one child');
	  }
	
	  function forEach(children, iteratee, context) {
	  	if (children == null) {
	  		return children;
	  	}
	  	var index = 0;
	  	if (isArr(children)) {
	  		flatEach(children, function (child) {
	  			// from traverseAllChildrenImpl in react
	  			var type = typeof child;
	  			if (type === 'undefined' || type === 'boolean') {
	  				// All of the above are perceived as null.
	  				child = null;
	  			}
	
	  			iteratee.call(context, child, index++);
	  		});
	  	} else {
	  		// from traverseAllChildrenImpl in react
	  		var type = typeof children;
	  		if (type === 'undefined' || type === 'boolean') {
	  			// All of the above are perceived as null.
	  			children = null;
	  		}
	  		iteratee.call(context, children, index);
	  	}
	  }
	
	  function map(children, iteratee, context) {
	  	if (children == null) {
	  		return children;
	  	}
	  	var store = [];
	  	var keyMap = {};
	  	forEach(children, function (child, index) {
	  		var data = {};
	  		data.child = iteratee.call(context, child, index) || child;
	  		data.isEqual = data.child === child;
	  		var key = data.key = getKey(child, index);
	  		if (keyMap.hasOwnProperty(key)) {
	  			keyMap[key] += 1;
	  		} else {
	  			keyMap[key] = 0;
	  		}
	  		data.index = keyMap[key];
	  		addItem(store, data);
	  	});
	  	var result = [];
	  	store.forEach(function (_ref) {
	  		var child = _ref.child;
	  		var key = _ref.key;
	  		var index = _ref.index;
	  		var isEqual = _ref.isEqual;
	
	  		if (child == null || typeof child === 'boolean') {
	  			return;
	  		}
	  		if (!isValidElement(child) || key == null) {
	  			addItem(result, child);
	  			return;
	  		}
	  		if (keyMap[key] !== 0) {
	  			key += ':' + index;
	  		}
	  		if (!isEqual) {
	  			key = escapeUserProvidedKey(child.key || '') + '/' + key;
	  		}
	  		child = cloneElement(child, { key: key });
	  		addItem(result, child);
	  	});
	  	return result;
	  }
	
	  function count(children) {
	  	var count = 0;
	  	forEach(children, function () {
	  		count++;
	  	});
	  	return count;
	  }
	
	  function toArray(children) {
	  	return map(children, identity) || [];
	  }
	
	  function getKey(child, index) {
	  	var key = undefined;
	  	if (isValidElement(child) && typeof child.key === 'string') {
	  		key = '.$' + child.key;
	  	} else {
	  		key = '.' + index.toString(36);
	  	}
	  	return key;
	  }
	
	  var userProvidedKeyEscapeRegex = /\/(?!\/)/g;
	  function escapeUserProvidedKey(text) {
	  	return ('' + text).replace(userProvidedKeyEscapeRegex, '//');
	  }
	
	  var Children = Object.freeze({
	  	only: only,
	  	forEach: forEach,
	  	map: map,
	  	count: count,
	  	toArray: toArray
	  });
	
	  function eachMixin(mixins, iteratee) {
	  	mixins.forEach(function (mixin) {
	  		if (mixin) {
	  			if (isArr(mixin.mixins)) {
	  				eachMixin(mixin.mixins, iteratee);
	  			}
	  			iteratee(mixin);
	  		}
	  	});
	  }
	
	  function combineMixinToProto(proto, mixin) {
	  	for (var key in mixin) {
	  		if (!mixin.hasOwnProperty(key)) {
	  			continue;
	  		}
	  		var value = mixin[key];
	  		if (key === 'getInitialState') {
	  			addItem(proto.$getInitialStates, value);
	  			continue;
	  		}
	  		var curValue = proto[key];
	  		if (isFn(curValue) && isFn(value)) {
	  			proto[key] = pipe(curValue, value);
	  		} else {
	  			proto[key] = value;
	  		}
	  	}
	  }
	
	  function combineMixinToClass(Component, mixin) {
	  	if (mixin.propTypes) {
	  		Component.propTypes = Component.propTypes || {};
	  		extend(Component.propTypes, mixin.propTypes);
	  	}
	  	if (mixin.contextTypes) {
	  		Component.contextTypes = Component.contextTypes || {};
	  		extend(Component.contextTypes, mixin.contextTypes);
	  	}
	  	extend(Component, mixin.statics);
	  	if (isFn(mixin.getDefaultProps)) {
	  		Component.defaultProps = Component.defaultProps || {};
	  		extend(Component.defaultProps, mixin.getDefaultProps());
	  	}
	  }
	
	  function bindContext(obj, source) {
	  	for (var key in source) {
	  		if (source.hasOwnProperty(key)) {
	  			if (isFn(source[key])) {
	  				obj[key] = source[key].bind(obj);
	  			}
	  		}
	  	}
	  }
	
	  var Facade = function Facade() {};
	  Facade.prototype = Component.prototype;
	
	  function getInitialState() {
	  	var _this = this;
	
	  	var state = {};
	  	var setState = this.setState;
	  	this.setState = Facade;
	  	this.$getInitialStates.forEach(function (getInitialState) {
	  		if (isFn(getInitialState)) {
	  			extend(state, getInitialState.call(_this));
	  		}
	  	});
	  	this.setState = setState;
	  	return state;
	  }
	  function createClass(spec) {
	  	if (!isFn(spec.render)) {
	  		throw new Error('createClass: spec.render is not function');
	  	}
	  	var specMixins = spec.mixins || [];
	  	var mixins = specMixins.concat(spec);
	  	spec.mixins = null;
	  	function Klass(props, context) {
	  		Component.call(this, props, context);
	  		this.constructor = Klass;
	  		spec.autobind !== false && bindContext(this, Klass.prototype);
	  		this.state = this.getInitialState() || this.state;
	  	}
	  	Klass.displayName = spec.displayName;
	  	var proto = Klass.prototype = new Facade();
	  	proto.$getInitialStates = [];
	  	eachMixin(mixins, function (mixin) {
	  		combineMixinToProto(proto, mixin);
	  		combineMixinToClass(Klass, mixin);
	  	});
	  	proto.getInitialState = getInitialState;
	  	spec.mixins = specMixins;
	  	return Klass;
	  }
	
	  function shallowEqual(objA, objB) {
	      if (objA === objB) {
	          return true;
	      }
	
	      if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	          return false;
	      }
	
	      var keysA = Object.keys(objA);
	      var keysB = Object.keys(objB);
	
	      if (keysA.length !== keysB.length) {
	          return false;
	      }
	
	      // Test for A's keys different from B.
	      for (var i = 0; i < keysA.length; i++) {
	          if (!objB.hasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	              return false;
	          }
	      }
	
	      return true;
	  }
	
	  function PureComponent(props, context) {
	  	Component.call(this, props, context);
	  }
	
	  PureComponent.prototype = Object.create(Component.prototype);
	  PureComponent.prototype.constructor = PureComponent;
	  PureComponent.prototype.isPureReactComponent = true;
	  PureComponent.prototype.shouldComponentUpdate = shallowCompare;
	
	  function shallowCompare(nextProps, nextState) {
	  	return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
	  }
	
	  var React = extend({
	      version: '0.15.1',
	      cloneElement: cloneElement,
	      isValidElement: isValidElement,
	      createElement: createElement,
	      createFactory: createFactory,
	      Component: Component,
	      PureComponent: PureComponent,
	      createClass: createClass,
	      Children: Children,
	      PropTypes: PropTypes,
	      DOM: DOM
	  }, ReactDOM);
	
	  React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOM;
	
	  return React;
	
	}));

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * This file is part of Cockpit.
	 *
	 * Copyright (C) 2017 Red Hat, Inc.
	 *
	 * Cockpit is free software; you can redistribute it and/or modify it
	 * under the terms of the GNU Lesser General Public License as published by
	 * the Free Software Foundation; either version 2.1 of the License, or
	 * (at your option) any later version.
	 *
	 * Cockpit is distributed in the hope that it will be useful, but
	 * WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
	 * Lesser General Public License for more details.
	 *
	 * You should have received a copy of the GNU Lesser General Public License
	 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
	 */
	
	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _cockpit = __webpack_require__(2);
	
	var _cockpit2 = _interopRequireDefault(_cockpit);
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _packagekit = __webpack_require__(6);
	
	var _packagekit2 = _interopRequireDefault(_packagekit);
	
	var _utilsJsx = __webpack_require__(7);
	
	var _ = _cockpit2["default"].gettext;
	
	var ApplicationRow = (function (_React$Component) {
	    _inherits(ApplicationRow, _React$Component);
	
	    function ApplicationRow() {
	        _classCallCheck(this, ApplicationRow);
	
	        _get(Object.getPrototypeOf(ApplicationRow.prototype), "constructor", this).call(this);
	        this.state = { progress: false };
	    }
	
	    _createClass(ApplicationRow, [{
	        key: "render",
	        value: function render() {
	            var _this = this;
	
	            var self = this;
	            var comp = self.props.comp;
	            var state = self.state;
	
	            function navigate() {
	                _cockpit2["default"].location.go(comp.id);
	            }
	
	            function action(func, arg, progress_title) {
	                self.setState({ progress_title: progress_title });
	                func(arg, function (data) {
	                    return self.setState({ progress: data });
	                }).always(function () {
	                    return self.setState({ progress: false });
	                }).fail(_utilsJsx.show_error);
	            }
	
	            function install() {
	                action(_packagekit2["default"].install, comp.pkgname, _("Installing"));
	            }
	
	            function remove() {
	                action(_packagekit2["default"].remove, comp.file, _("Removing"));
	            }
	
	            function launch() {
	                var i;
	                for (i = 0; i < comp.launchables.length; i++) {
	                    if (comp.launchables[i].type == "cockpit-package") {
	                        _cockpit2["default"].jump([comp.launchables[i].name]);
	                        return;
	                    }
	                }
	            }
	
	            var name, summary_or_progress, button;
	
	            if (comp.installed) {
	                name = _react2["default"].createElement(
	                    "a",
	                    { onClick: (0, _utilsJsx.left_click)(launch) },
	                    comp.name
	                );
	            } else {
	                name = comp.name;
	            }
	
	            if (state.progress) {
	                summary_or_progress = _react2["default"].createElement(_utilsJsx.ProgressBar, { title: state.progress_title, data: state.progress });
	                button = _react2["default"].createElement(_utilsJsx.CancelButton, { data: state.progress });
	            } else {
	                if (state.error) {
	                    summary_or_progress = _react2["default"].createElement(
	                        "div",
	                        null,
	                        comp.summary,
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "alert alert-danger alert-dismissable" },
	                            _react2["default"].createElement(
	                                "button",
	                                { className: "close", "aria-hidden": "true",
	                                    onClick: (0, _utilsJsx.left_click)(function () {
	                                        _this.setState({ error: null });
	                                    }) },
	                                _react2["default"].createElement("span", { className: "pficon pficon-close" })
	                            ),
	                            _react2["default"].createElement("span", { className: "pficon pficon-error-circle-o" }),
	                            state.error
	                        )
	                    );
	                } else {
	                    summary_or_progress = comp.summary;
	                }
	
	                if (comp.installed) {
	                    button = _react2["default"].createElement(
	                        "button",
	                        { className: "btn btn-danger", onClick: (0, _utilsJsx.left_click)(remove) },
	                        _("Remove")
	                    );
	                } else {
	                    button = _react2["default"].createElement(
	                        "button",
	                        { className: "btn btn-default", onClick: (0, _utilsJsx.left_click)(install) },
	                        _("Install")
	                    );
	                }
	            }
	
	            return _react2["default"].createElement(
	                "tr",
	                { onClick: (0, _utilsJsx.left_click)(navigate) },
	                _react2["default"].createElement(
	                    "td",
	                    null,
	                    comp.icon ? _react2["default"].createElement("img", { src: (0, _utilsJsx.icon_url)(comp.icon) }) : _react2["default"].createElement("img", null)
	                ),
	                _react2["default"].createElement(
	                    "td",
	                    null,
	                    name
	                ),
	                _react2["default"].createElement(
	                    "td",
	                    null,
	                    summary_or_progress
	                ),
	                _react2["default"].createElement(
	                    "td",
	                    null,
	                    button
	                )
	            );
	        }
	    }]);
	
	    return ApplicationRow;
	})(_react2["default"].Component);
	
	var ApplicationList = (function (_React$Component2) {
	    _inherits(ApplicationList, _React$Component2);
	
	    function ApplicationList() {
	        _classCallCheck(this, ApplicationList);
	
	        _get(Object.getPrototypeOf(ApplicationList.prototype), "constructor", this).call(this);
	        this.state = { progress: false };
	    }
	
	    _createClass(ApplicationList, [{
	        key: "render",
	        value: function render() {
	            var self = this;
	            var comps = [];
	            for (var id in this.props.metainfo_db.components) comps.push(this.props.metainfo_db.components[id]);
	            comps.sort(function (a, b) {
	                return a.name.localeCompare(b.name);
	            });
	
	            function refresh() {
	                _packagekit2["default"].refresh(self.props.metainfo_db.origin_files, function (data) {
	                    return self.setState({ progress: data });
	                }).always(function () {
	                    return self.setState({ progress: false });
	                }).fail(_utilsJsx.show_error);
	            }
	
	            var refresh_progress, refresh_button, empty_caption, tbody, table_classes;
	            if (this.state.progress) {
	                refresh_progress = _react2["default"].createElement(_utilsJsx.ProgressBar, { title: _("Checking for new applications"), data: this.state.progress });
	                refresh_button = _react2["default"].createElement(_utilsJsx.CancelButton, { data: this.state.progress });
	            } else {
	                refresh_progress = null;
	                refresh_button = _react2["default"].createElement("button", { className: "btn btn-default fa fa-refresh", onClick: (0, _utilsJsx.left_click)(refresh) });
	            }
	
	            table_classes = "table app-list";
	            if (comps.length === 0) {
	                if (this.props.metainfo_db.ready) empty_caption = _("No applications installed or available");else empty_caption = _react2["default"].createElement("div", { className: "spinner spinner-sm" });
	                tbody = _react2["default"].createElement(
	                    "tr",
	                    { className: "app-list-empty" },
	                    _react2["default"].createElement(
	                        "td",
	                        null,
	                        empty_caption
	                    )
	                );
	            } else {
	                table_classes += " table-hover";
	                tbody = comps.map(function (c) {
	                    return _react2["default"].createElement(ApplicationRow, { comp: c });
	                });
	            }
	
	            return _react2["default"].createElement(
	                "table",
	                { className: table_classes },
	                _react2["default"].createElement(
	                    "caption",
	                    null,
	                    _react2["default"].createElement(
	                        "table",
	                        null,
	                        _react2["default"].createElement(
	                            "tr",
	                            null,
	                            _react2["default"].createElement(
	                                "td",
	                                null,
	                                _("Applications")
	                            ),
	                            _react2["default"].createElement(
	                                "td",
	                                null,
	                                refresh_progress
	                            ),
	                            _react2["default"].createElement(
	                                "td",
	                                null,
	                                refresh_button
	                            )
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "tbody",
	                    null,
	                    tbody
	                )
	            );
	        }
	    }]);
	
	    return ApplicationList;
	})(_react2["default"].Component);
	
	module.exports = {
	    ApplicationList: ApplicationList
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*
	 * This file is part of Cockpit.
	 *
	 * Copyright (C) 2017 Red Hat, Inc.
	 *
	 * Cockpit is free software; you can redistribute it and/or modify it
	 * under the terms of the GNU Lesser General Public License as published by
	 * the Free Software Foundation; either version 2.1 of the License, or
	 * (at your option) any later version.
	 *
	 * Cockpit is distributed in the hope that it will be useful, but
	 * WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
	 * Lesser General Public License for more details.
	 *
	 * You should have received a copy of the GNU Lesser General Public License
	 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
	 */
	
	var cockpit = __webpack_require__(2);
	var $ = __webpack_require__(3);
	
	var client = cockpit.dbus("org.freedesktop.PackageKit", { superuser: "try" });
	
	var PK_STATUS_ENUM_WAIT = 1;
	var PK_STATUS_ENUM_WAITING_FOR_LOCK = 30;
	
	var PK_FILTER_INSTALLED   = (1 << 2);
	var PK_FILTER_NEWEST      = (1 << 16);
	var PK_FILTER_ARCH        = (1 << 18);
	var PK_FILTER_NOT_SOURCE  = (1 << 21);
	
	function transaction(method, args, progress_cb, package_cb) {
	    var defer = cockpit.defer();
	
	    client.call("/org/freedesktop/PackageKit", "org.freedesktop.PackageKit", "CreateTransaction", [ ]).
	        done(function(path_result) {
	            var tr = client.proxy("org.freedesktop.PackageKit.Transaction", path_result[0]);
	            var cancelled = false;
	            var allow_wait_status = false;
	
	            function cancel() {
	                tr.Cancel();
	                cancelled = true;
	            }
	
	            function changed() {
	                if (progress_cb && defer.promise().state() == "pending") {
	                    var data = {
	                        waiting: false,
	                        percentage: 0,
	                        cancel: null
	                    };
	
	                    if (allow_wait_status &&
	                        (tr.Status == PK_STATUS_ENUM_WAIT || tr.Status == PK_STATUS_ENUM_WAITING_FOR_LOCK))
	                        data.waiting = true;
	                    if (tr.Percentage !== undefined && tr.Percentage !== 101)
	                        data.percentage = tr.Percentage;
	                    if (tr.AllowCancel)
	                        data.cancel = cancel;
	
	                    progress_cb(data);
	                }
	            }
	
	            changed();
	            $(tr).on("changed", changed);
	            window.setTimeout(function () {
	                allow_wait_status = true;
	                changed();
	            }, 1000);
	
	            $(tr).on("ErrorCode", function (event, code, details) {
	                defer.reject(details, cancelled? "cancelled" : code);
	            });
	            $(tr).on("Package", function (event, info, package_id, summary) {
	                if (package_cb && defer.promise().state() == "pending")
	                    package_cb(info, package_id, summary);
	            });
	            $(tr).on("Finished", function (event, exit, runtime) {
	                defer.resolve(exit);
	            });
	            tr.call(method, args).fail(function (error) {
	                console.log("Error", error);
	                defer.reject(error);
	            });
	        }).
	        fail(function (error) {
	            defer.reject(error);
	        });
	
	    return defer.promise();
	}
	
	function progress_reporter(base, range, callback) {
	    if (callback)
	        return function (data) {
	            if (data.percentage >= 0)
	                data.percentage = base + data.percentage/100*range;
	            callback(data);
	        };
	}
	
	function resolve(method, filter, name, progress_cb) {
	    var defer = cockpit.defer();
	    var ids = [ ];
	
	    function gather_package_cb(info, package_id) {
	        ids.push(package_id);
	    }
	
	    transaction(method, [ filter, [ name ] ], progress_cb, gather_package_cb).
	        done(function () {
	            if (ids.length === 0)
	                defer.reject("Can't resolve package", "not-found");
	            else
	                defer.resolve(ids[0]);
	        }).
	        fail(function (error) {
	            defer.reject(error);
	        });
	
	    return defer.promise();
	}
	
	function reload_bridge_packages() {
	    return cockpit.dbus(null, { bus: "internal" }).call("/packages", "cockpit.Packages", "Reload", [ ]);
	}
	
	function install(name, progress_cb) {
	    return resolve("Resolve", PK_FILTER_ARCH | PK_FILTER_NOT_SOURCE | PK_FILTER_NEWEST, name,
	                   progress_reporter(0, 10, progress_cb)).
	        then(function (pkgid) {
	            return transaction("InstallPackages", [ 0, [ pkgid ] ], progress_reporter(10, 90, progress_cb)).
	                then(reload_bridge_packages);
	        });
	}
	
	function remove(name, progress_cb) {
	    return resolve("SearchFiles", PK_FILTER_INSTALLED, name, progress_reporter(0, 10, progress_cb)).
	        then(function (pkgid) {
	            console.log("remove", name, pkgid);
	            return transaction("RemovePackages", [ 0, [ pkgid ], true, false ], progress_reporter(10, 90, progress_cb)).
	                then(reload_bridge_packages);
	        });
	}
	
	function refresh(origin_files, progress_cb) {
	    var origin_pkgs = { };
	    var update_ids = [ ];
	
	    function gather_origin_cb(info, package_id) {
	        var pkg = package_id.split(";")[0];
	        origin_pkgs[pkg] = true;
	    }
	
	    function gather_update_cb(info, package_id) {
	        var pkg = package_id.split(";")[0];
	        if (pkg in origin_pkgs)
	            update_ids.push(package_id);
	    }
	
	    return transaction("SearchFiles", [ PK_FILTER_INSTALLED, origin_files ],
	                       progress_reporter(0, 5, progress_cb), gather_origin_cb).
	        then(function () {
	            return transaction("RefreshCache", [ true ],
	                               progress_reporter(5, 70, progress_cb)).
	                then (function () {
	                    return transaction("GetUpdates", [ 0 ],
	                                       progress_reporter(75, 5, progress_cb), gather_update_cb).
	                        then(function () {
	                            if (update_ids.length > 0)
	                                return transaction("UpdatePackages", [ 0, update_ids ],
	                                                   progress_reporter(80, 20, progress_cb));
	                        });
	                });
	        });
	}
	
	module.exports = {
	    install: install,
	    remove: remove,
	    refresh: refresh
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * This file is part of Cockpit.
	 *
	 * Copyright (C) 2017 Red Hat, Inc.
	 *
	 * Cockpit is free software; you can redistribute it and/or modify it
	 * under the terms of the GNU Lesser General Public License as published by
	 * the Free Software Foundation; either version 2.1 of the License, or
	 * (at your option) any later version.
	 *
	 * Cockpit is distributed in the hope that it will be useful, but
	 * WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
	 * Lesser General Public License for more details.
	 *
	 * You should have received a copy of the GNU Lesser General Public License
	 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
	 */
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.left_click = left_click;
	exports.icon_url = icon_url;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _cockpit = __webpack_require__(2);
	
	var _cockpit2 = _interopRequireDefault(_cockpit);
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _cockpitComponentsDialogJsx = __webpack_require__(8);
	
	var _ = _cockpit2["default"].gettext;
	
	// Explicitly use React so that jshint doesn't complain.  The conversion to js inserts
	// references to React that jshint doesn't seem to see.
	_react2["default"];
	
	function left_click(fun) {
	    return function (event) {
	        if (!event || event.button !== 0) return;
	        event.stopPropagation();
	        return fun(event);
	    };
	}
	
	function icon_url(path_or_url) {
	    if (path_or_url[0] != '/') return path_or_url;
	
	    var query = window.btoa(JSON.stringify({
	        payload: "fsread1",
	        binary: "raw",
	        path: path_or_url,
	        external: {
	            "content-type": "image/png"
	        }
	    }));
	    return "/cockpit/channel/" + _cockpit2["default"].transport.csrf_token + '?' + query;
	}
	
	var ProgressBar = function ProgressBar(_ref) {
	    var title = _ref.title;
	    var data = _ref.data;
	
	    return _react2["default"].createElement(
	        "div",
	        null,
	        _react2["default"].createElement(
	            "div",
	            { className: "progress-title" },
	            data.waiting ? _("Waiting for other programs to finish using the package manager...") : title
	        ),
	        _react2["default"].createElement(
	            "div",
	            { className: "progress" },
	            _react2["default"].createElement("div", { className: "progress-bar", style: { "width": data.percentage + "%" } })
	        )
	    );
	};
	
	exports.ProgressBar = ProgressBar;
	var CancelButton = function CancelButton(_ref2) {
	    var data = _ref2.data;
	
	    return _react2["default"].createElement(
	        "button",
	        { className: "btn btn-default",
	            disabled: !data.cancel,
	            onClick: left_click(data.cancel) },
	        _("Cancel")
	    );
	};
	
	exports.CancelButton = CancelButton;
	var show_error = function show_error(detail, code) {
	    if (code == "cancelled") return;
	
	    if (code == "not-found") detail = _("No installation package found for this application.  This should not happen, but here we are.");
	
	    (0, _cockpitComponentsDialogJsx.show_modal_dialog)({
	        title: _("Error"),
	        body: _react2["default"].createElement(
	            "div",
	            { className: "modal-body" },
	            _react2["default"].createElement(
	                "p",
	                null,
	                detail
	            )
	        )
	    }, {
	        cancel_caption: _("Close"),
	        actions: []
	    });
	};
	exports.show_error = show_error;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * This file is part of Cockpit.
	 *
	 * Copyright (C) 2016 Red Hat, Inc.
	 *
	 * Cockpit is free software; you can redistribute it and/or modify it
	 * under the terms of the GNU Lesser General Public License as published by
	 * the Free Software Foundation; either version 2.1 of the License, or
	 * (at your option) any later version.
	 *
	 * Cockpit is distributed in the hope that it will be useful, but
	 * WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
	 * Lesser General Public License for more details.
	 *
	 * You should have received a copy of the GNU Lesser General Public License
	 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
	 */
	
	"use strict";
	
	var cockpit = __webpack_require__(2);
	var React = __webpack_require__(4);
	var _ = cockpit.gettext;
	
	__webpack_require__(9);
	
	/*
	 * React template for a Cockpit dialog footer
	 * It can display an error, wait for an action to complete,
	 * has a 'Cancel' button and an action button (defaults to 'OK')
	 * Expected props:
	 *  - cancel_clicked optional
	 *     Callback called when the dialog is canceled
	 *  - cancel_caption optional, defaults to 'Cancel'
	 *  - list of actions, each an object with:
	 *      - clicked
	 *         Callback function that is expected to return a promise.
	 *         parameter: callback to set the progress text (will be displayed next to spinner)
	 *      - caption optional, defaults to 'Ok'
	 *      - disabled optional, defaults to false
	 *      - style defaults to 'default', other options: 'primary', 'danger'
	 *  - static_error optional, always show this error
	 *  - dialog_done optional, callback when dialog is finished (param true if success, false on cancel)
	 */
	var DialogFooter = React.createClass({
	    displayName: "DialogFooter",
	
	    propTypes: {
	        cancel_clicked: React.PropTypes.func,
	        cancel_caption: React.PropTypes.string,
	        actions: React.PropTypes.array,
	        static_error: React.PropTypes.string,
	        dialog_done: React.PropTypes.func
	    },
	    getInitialState: function getInitialState() {
	        return {
	            action_in_progress: false,
	            action_in_progress_promise: null,
	            action_progress_message: '',
	            action_canceled: false,
	            error_message: null
	        };
	    },
	    keyUpHandler: function keyUpHandler(e) {
	        if (e.keyCode == 27) {
	            this.cancel_click();
	            e.stopPropagation();
	        }
	    },
	    componentDidMount: function componentDidMount() {
	        document.body.classList.add("modal-in");
	        document.addEventListener('keyup', this.keyUpHandler.bind(this));
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        document.body.classList.remove("modal-in");
	        document.removeEventListener('keyup', this.keyUpHandler.bind(this));
	    },
	    update_progress: function update_progress(msg) {
	        this.setState({ action_progress_message: msg });
	    },
	    action_click: function action_click(handler, e) {
	        // only consider clicks with the primary button
	        if (e && e.button !== 0) return;
	        var self = this;
	        this.setState({
	            error_message: null,
	            action_progress_message: '',
	            action_in_progress: true,
	            action_canceled: false
	        });
	        this.state.action_in_progress_promise = handler(this.update_progress.bind(this)).done(function () {
	            self.setState({ action_in_progress: false, error_message: null });
	            if (self.props.dialog_done) self.props.dialog_done(true);
	        }).fail(function (error) {
	            if (self.state.action_canceled) {
	                if (self.props.dialog_done) self.props.dialog_done(false);
	            }
	
	            /* Always log global dialog errors for easier debugging */
	            console.warn(error);
	
	            self.setState({ action_in_progress: false, error_message: error });
	        }).progress(this.update_progress.bind(this));
	        if (e) e.stopPropagation();
	    },
	    cancel_click: function cancel_click(e) {
	        // only consider clicks with the primary button
	        if (e && e.button !== 0) return;
	
	        this.setState({ action_canceled: true });
	
	        if (this.props.cancel_clicked) this.props.cancel_clicked();
	
	        // an action might be in progress, let that handler decide what to do if they added a cancel function
	        if (this.state.action_in_progress && 'cancel' in this.state.action_in_progress_promise) {
	            this.state.action_in_progress_promise.cancel();
	            return;
	        }
	
	        if (this.props.dialog_done) this.props.dialog_done(false);
	        if (e) e.stopPropagation();
	    },
	    render: function render() {
	        var cancel_caption;
	        if ('cancel_caption' in this.props) cancel_caption = this.props.cancel_caption;else cancel_caption = _("Cancel");
	
	        // If an action is in progress, show the spinner with its message and disable all actions except cancel
	        var wait_element;
	        var actions_disabled;
	        if (this.state.action_in_progress) {
	            actions_disabled = 'disabled';
	            wait_element = React.createElement(
	                "div",
	                { className: "dialog-wait-ct pull-left" },
	                React.createElement("div", { className: "spinner spinner-sm" }),
	                React.createElement(
	                    "span",
	                    null,
	                    this.state.action_progress_message
	                )
	            );
	        }
	
	        var self = this;
	        var action_buttons = this.props.actions.map(function (action) {
	            var caption;
	            if ('caption' in action) caption = action.caption;else caption = _("Ok");
	
	            var button_style = "btn-default";
	            var button_style_mapping = { 'primary': 'btn-primary', 'danger': 'btn-danger' };
	            if ('style' in action && action.style in button_style_mapping) button_style = button_style_mapping[action.style];
	            button_style = "btn " + button_style + " apply";
	            var action_disabled = actions_disabled || 'disabled' in action && action.disabled;
	            return React.createElement(
	                "button",
	                {
	                    key: caption,
	                    className: button_style,
	                    onClick: self.action_click.bind(self, action.clicked),
	                    disabled: action_disabled
	                },
	                caption
	            );
	        });
	
	        // If we have an error message, display the error
	        var error_element;
	        var error_message;
	        if (this.props.static_error !== undefined && this.props.static_error !== null) error_message = this.props.static_error;else error_message = this.state.error_message;
	        if (error_message) {
	            error_element = React.createElement(
	                "div",
	                { className: "alert alert-danger dialog-error" },
	                React.createElement("span", { className: "fa fa-exclamation-triangle" }),
	                React.createElement(
	                    "span",
	                    null,
	                    error_message
	                )
	            );
	        }
	        return React.createElement(
	            "div",
	            { className: "modal-footer" },
	            error_element,
	            wait_element,
	            React.createElement(
	                "button",
	                {
	                    className: "btn btn-default cancel",
	                    onClick: this.cancel_click.bind(this)
	                },
	                cancel_caption
	            ),
	            action_buttons
	        );
	    }
	});
	
	/*
	 * React template for a Cockpit dialog
	 * The primary action button is disabled while its action is in progress (waiting for promise)
	 * Removes focus on other elements on showing
	 * Expected props:
	 *  - title (string)
	 *  - no_backdrop optional, skip backdrop if true
	 *  - body (react element, top element should be of class modal-body)
	 *      It is recommended for information gathering dialogs to pass references
	 *      to the input components to the controller. That way, the controller can
	 *      extract all necessary information (e.g. for input validation) when an
	 *      action is triggered.
	 *  - footer (react element, top element should be of class modal-footer)
	 *  - id optional, id that is assigned to the top level dialog node, but not the backdrop
	 */
	var Dialog = React.createClass({
	    displayName: "Dialog",
	
	    propTypes: {
	        title: React.PropTypes.string.isRequired,
	        no_backdrop: React.PropTypes.bool,
	        body: React.PropTypes.element.isRequired,
	        footer: React.PropTypes.element.isRequired,
	        id: React.PropTypes.string
	    },
	    componentDidMount: function componentDidMount() {
	        // if we used a button to open this, make sure it's not focused anymore
	        if (document.activeElement) document.activeElement.blur();
	    },
	    render: function render() {
	        var backdrop;
	        if (!this.props.no_backdrop) {
	            backdrop = React.createElement("div", { className: "modal-backdrop fade in" });
	        }
	        return React.createElement(
	            "div",
	            null,
	            backdrop,
	            React.createElement(
	                "div",
	                { className: "modal fade in dialog-ct-visible", tabindex: "-1" },
	                React.createElement(
	                    "div",
	                    { id: this.props.id, className: "modal-dialog" },
	                    React.createElement(
	                        "div",
	                        { className: "modal-content" },
	                        React.createElement(
	                            "div",
	                            { className: "modal-header" },
	                            React.createElement(
	                                "h4",
	                                { className: "modal-title" },
	                                this.props.title
	                            )
	                        ),
	                        this.props.body,
	                        this.props.footer
	                    )
	                )
	            )
	        );
	    }
	});
	
	/* Create and show a dialog
	 * For this, create a containing DOM node at the body level
	 * The returned object has the following methods:
	 *     - setFooterProps replace the current footerProps and render
	 *     - setProps       replace the current props and render
	 *     - render         render again using the stored props
	 * The DOM node and React metadata are freed once the dialog has closed
	 */
	var show_modal_dialog = function show_modal_dialog(props, footerProps) {
	    var dialogName = 'cockpit_modal_dialog';
	    // don't allow nested dialogs
	    if (document.getElementById(dialogName)) {
	        console.warn('Unable to create nested dialog');
	        return;
	    }
	    // create an element to render into
	    var rootElement = document.createElement("div");
	    rootElement.id = dialogName;
	    document.body.appendChild(rootElement);
	
	    // register our own on-close callback
	    var origCallback;
	    var closeCallback = function closeCallback() {
	        if (origCallback) origCallback.apply(this, arguments);
	        React.unmountComponentAtNode(rootElement);
	        rootElement.remove();
	    };
	
	    var dialogObj = {};
	    dialogObj.props = null;
	    dialogObj.footerProps = null;
	    dialogObj.render = function () {
	        dialogObj.props.footer = React.createElement(DialogFooter, dialogObj.footerProps);
	        React.render(React.createElement(Dialog, dialogObj.props), rootElement);
	    };
	    function updateFooterAndRender() {
	        if (dialogObj.props === null || dialogObj.props === undefined) dialogObj.props = {};
	        dialogObj.props.footer = React.createElement(DialogFooter, dialogObj.footerProps);
	        dialogObj.render();
	    }
	    dialogObj.setFooterProps = function (footerProps) {
	        /* Always log error messages to console for easier debugging */
	        if (footerProps.static_error) console.warn(footerProps.static_error);
	        dialogObj.footerProps = footerProps;
	        if (dialogObj.footerProps === null || dialogObj.footerProps === undefined) dialogObj.footerProps = {};
	        if (dialogObj.footerProps.dialog_done != closeCallback) {
	            origCallback = dialogObj.footerProps.dialog_done;
	            dialogObj.footerProps.dialog_done = closeCallback;
	        }
	        updateFooterAndRender();
	    };
	    dialogObj.setProps = function (props) {
	        dialogObj.props = props;
	        updateFooterAndRender();
	    };
	    dialogObj.setFooterProps(footerProps);
	    dialogObj.setProps(props);
	
	    // now actually render
	    dialogObj.render();
	
	    return dialogObj;
	};
	
	module.exports = {
	    Dialog: Dialog,
	    DialogFooter: DialogFooter,
	    show_modal_dialog: show_modal_dialog
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * This file is part of Cockpit.
	 *
	 * Copyright (C) 2017 Red Hat, Inc.
	 *
	 * Cockpit is free software; you can redistribute it and/or modify it
	 * under the terms of the GNU Lesser General Public License as published by
	 * the Free Software Foundation; either version 2.1 of the License, or
	 * (at your option) any later version.
	 *
	 * Cockpit is distributed in the hope that it will be useful, but
	 * WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
	 * Lesser General Public License for more details.
	 *
	 * You should have received a copy of the GNU Lesser General Public License
	 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
	 */
	
	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _cockpit = __webpack_require__(2);
	
	var _cockpit2 = _interopRequireDefault(_cockpit);
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _packagekitJs = __webpack_require__(6);
	
	var _packagekitJs2 = _interopRequireDefault(_packagekitJs);
	
	var _utilsJsx = __webpack_require__(7);
	
	__webpack_require__(12);
	
	var _ = _cockpit2["default"].gettext;
	
	var Application = (function (_React$Component) {
	    _inherits(Application, _React$Component);
	
	    function Application() {
	        _classCallCheck(this, Application);
	
	        _get(Object.getPrototypeOf(Application.prototype), "constructor", this).call(this);
	        this.state = { error: null, progress: false };
	    }
	
	    _createClass(Application, [{
	        key: "render",
	        value: function render() {
	            var self = this;
	            var state = this.state;
	            var metainfo_db = this.props.metainfo_db;
	            var comp;
	
	            if (!this.props.id) return null;
	
	            comp = metainfo_db.components[this.props.id];
	
	            function action(func, arg, progress_title) {
	                self.setState({ progress_title: progress_title });
	                func(arg, function (data) {
	                    return self.setState({ progress: data });
	                }).always(function () {
	                    return self.setState({ progress: false });
	                }).fail(_utilsJsx.show_error);
	            }
	
	            function install() {
	                action(_packagekitJs2["default"].install, comp.pkgname, _("Installing"));
	            }
	
	            function remove() {
	                action(_packagekitJs2["default"].remove, comp.file, _("Removing"));
	            }
	
	            function launch() {
	                var i;
	                for (i = 0; i < comp.launchables.length; i++) {
	                    if (comp.launchables[i].type == "cockpit-package") {
	                        _cockpit2["default"].jump([comp.launchables[i].name]);
	                        return;
	                    }
	                }
	            }
	
	            function render_description(desc) {
	                return desc.map(function (elt) {
	                    if (elt.tag == 'ul') {
	                        return _react2["default"].createElement(
	                            "ul",
	                            null,
	                            elt.items.map(function (item) {
	                                return _react2["default"].createElement(
	                                    "li",
	                                    null,
	                                    item
	                                );
	                            })
	                        );
	                    } else if (elt.tag == 'ol') {
	                        return _react2["default"].createElement(
	                            "ol",
	                            null,
	                            elt.items.map(function (item) {
	                                return _react2["default"].createElement(
	                                    "li",
	                                    null,
	                                    item
	                                );
	                            })
	                        );
	                    } else {
	                        return _react2["default"].createElement(
	                            "p",
	                            null,
	                            elt
	                        );
	                    }
	                });
	            }
	
	            function render_comp() {
	                if (!comp) {
	                    if (metainfo_db.ready) return _react2["default"].createElement(
	                        "div",
	                        null,
	                        _("Unknown Application")
	                    );else return _react2["default"].createElement("div", { className: "spinner" });
	                }
	
	                var progress_or_launch, button;
	                if (state.progress) {
	                    progress_or_launch = _react2["default"].createElement(_utilsJsx.ProgressBar, { title: self.state.progress_title, data: self.state.progress });
	                    button = _react2["default"].createElement(_utilsJsx.CancelButton, { data: self.state.progress });
	                } else if (comp.installed) {
	                    progress_or_launch = _react2["default"].createElement(
	                        "a",
	                        { onClick: (0, _utilsJsx.left_click)(launch) },
	                        _("Go to Application")
	                    );
	                    button = _react2["default"].createElement(
	                        "button",
	                        { className: "btn btn-danger", onClick: (0, _utilsJsx.left_click)(remove) },
	                        _("Remove")
	                    );
	                } else {
	                    progress_or_launch = null;
	                    button = _react2["default"].createElement(
	                        "button",
	                        { className: "btn btn-default", onClick: (0, _utilsJsx.left_click)(install) },
	                        _("Install")
	                    );
	                }
	
	                return _react2["default"].createElement(
	                    "div",
	                    null,
	                    _react2["default"].createElement(
	                        "table",
	                        { className: "table app" },
	                        _react2["default"].createElement(
	                            "tbody",
	                            null,
	                            _react2["default"].createElement(
	                                "tr",
	                                null,
	                                _react2["default"].createElement(
	                                    "td",
	                                    null,
	                                    comp.icon ? _react2["default"].createElement("img", { src: (0, _utilsJsx.icon_url)(comp.icon) }) : null
	                                ),
	                                _react2["default"].createElement(
	                                    "td",
	                                    null,
	                                    comp.summary
	                                ),
	                                _react2["default"].createElement(
	                                    "td",
	                                    null,
	                                    progress_or_launch
	                                ),
	                                _react2["default"].createElement(
	                                    "td",
	                                    null,
	                                    button
	                                )
	                            )
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "app-description" },
	                        render_description(comp.description)
	                    ),
	                    _react2["default"].createElement(
	                        "center",
	                        null,
	                        comp.screenshots.map(function (s) {
	                            return _react2["default"].createElement("img", { className: "app-screenshot", src: s.full });
	                        })
	                    )
	                );
	            }
	
	            function navigate_up() {
	                _cockpit2["default"].location.go("/");
	            }
	
	            return _react2["default"].createElement(
	                "div",
	                null,
	                _react2["default"].createElement(
	                    "ol",
	                    { className: "breadcrumb" },
	                    _react2["default"].createElement(
	                        "li",
	                        null,
	                        _react2["default"].createElement(
	                            "a",
	                            { onClick: (0, _utilsJsx.left_click)(navigate_up) },
	                            _("Applications")
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "li",
	                        { className: "active" },
	                        comp ? comp.name : this.props.id
	                    )
	                ),
	                render_comp()
	            );
	        }
	    }]);
	
	    return Application;
	})(_react2["default"].Component);
	
	module.exports = {
	    Application: Application
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*
	 * This file is part of Cockpit.
	 *
	 * Copyright (C) 2017 Red Hat, Inc.
	 *
	 * Cockpit is free software; you can redistribute it and/or modify it
	 * under the terms of the GNU Lesser General Public License as published by
	 * the Free Software Foundation; either version 2.1 of the License, or
	 * (at your option) any later version.
	 *
	 * Cockpit is distributed in the hope that it will be useful, but
	 * WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
	 * Lesser General Public License for more details.
	 *
	 * You should have received a copy of the GNU Lesser General Public License
	 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
	 */
	
	var cockpit = __webpack_require__(2);
	var $ = __webpack_require__(3);
	
	var watcher_py = __webpack_require__(14);
	var watch_appstream_py = __webpack_require__(15);
	
	var metainfo_db = {
	    ready: false,
	    components: [ ],
	    origin_files: [ ]
	};
	
	var metainfo_db_inited = false;
	
	function get_metainfo_db() {
	    if (!metainfo_db_inited) {
	        metainfo_db_inited = true;
	        var buf = "";
	        cockpit.spawn([ "python", "--", "-" ],
	                      { superuser: "try",
	                        environ: [ "LANGUAGE=" + (cockpit.language || "en") ]
	                      })
	            .input(watcher_py + watch_appstream_py)
	            .stream(function (data) {
	                var lines, metadata;
	
	                buf += data;
	                lines = buf.split("\n");
	                buf = lines[lines.length-1];
	                if (lines.length >= 2) {
	                    metadata = JSON.parse(lines[lines.length-2]);
	                    metainfo_db.components = metadata.components;
	                    metainfo_db.origin_files = metadata.origin_files;
	                    metainfo_db.ready = true;
	                    $(metainfo_db).triggerHandler("changed");
	                }
	            }).
	            fail(function (error) {
	                if (error != "closed") {
	                    console.warn(error);
	                }
	            });
	    }
	
	    return metainfo_db;
	}
	
	module.exports = {
	    get_metainfo_db: get_metainfo_db
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "import os\nimport sys\nimport ctypes\nimport struct\n\n# Our own little abstraction on top of inotify.  This only supports\n# watching directories non-recursively, but it also supports watching\n# directories that come and go into and out of existence.\n#\n# We could use pyinotify for this, but it would only be able to\n# replace the Inotify class; we would still need all the logic in the\n# Watcher class.\n\nIN_CLOSE_WRITE = 0x00000008\nIN_MOVED_FROM  = 0x00000040\nIN_MOVED_TO    = 0x00000080\nIN_CREATE      = 0x00000100\nIN_DELETE      = 0x00000200\nIN_DELETE_SELF = 0x00000400\nIN_MOVE_SELF   = 0x00000800\n\nclass Inotify:\n    def __init__(self):\n        self._libc = ctypes.CDLL(None, use_errno=True)\n        self._get_errno_func = ctypes.get_errno\n\n        self._libc.inotify_init.argtypes = []\n        self._libc.inotify_init.restype = ctypes.c_int\n        self._libc.inotify_add_watch.argtypes = [ctypes.c_int, ctypes.c_char_p,\n                                                 ctypes.c_uint32]\n        self._libc.inotify_add_watch.restype = ctypes.c_int\n        self._libc.inotify_rm_watch.argtypes = [ctypes.c_int, ctypes.c_int]\n        self._libc.inotify_rm_watch.restype = ctypes.c_int\n\n        self.fd = self._libc.inotify_init()\n\n    def add_watch(self, path, mask):\n        path = ctypes.create_string_buffer(path.encode(sys.getfilesystemencoding()))\n        wd = self._libc.inotify_add_watch(self.fd, path, mask)\n        if wd < 0:\n            sys.stderr.write(\"can't add watch for %s: %s\\n\" % (path, os.strerror(self._get_errno_func())))\n        return wd\n\n    def rem_watch(self, wd):\n        if self._libc.inotify_rm_watch(self.fd, wd) < 0:\n            sys.stderr.write(\"can't remove watch: %s\\n\" % (os.strerror(self._get_errno_func())))\n\n    def run(self, callback):\n        while True:\n            buf = os.read(self.fd, 4096) # XXX - handle errors\n            pos = 0\n            while pos < len(buf):\n                (wd, mask, cookie, name_len) = struct.unpack('iIII', buf[pos:pos+16])\n                pos += 16\n                (name,) = struct.unpack('%ds' % name_len, buf[pos:pos + name_len])\n                pos += name_len\n                callback(wd, mask, name.decode().rstrip('\\0'))\n\nclass Watcher:\n\n    def __init__(self):\n        self.inotify = Inotify()\n        self.watches = { } # path -> wd\n        self.handlers = { } # wd -> set of callbacks\n\n    def __add_watch(self, path, mask, handler):\n        if path in self.watches:\n            wd = self.watches[path]\n            self.handlers[wd] = self.handlers[wd] | frozenset([ handler ])\n        else:\n            wd = self.inotify.add_watch(path, mask)\n            if wd >= 0:\n                self.watches[path] = wd\n                self.handlers[wd] = frozenset([ handler ])\n\n    def __rem_watch(self, path, handler):\n        wd = self.watches[path]\n        self.handlers[wd] = self.handlers[wd] - frozenset([ handler ])\n        if len(self.handlers[wd]) == 0:\n            self.inotify.rem_watch(wd)\n            del self.handlers[wd]\n            del self.watches[path]\n\n    def watch_directory(self, path, callback):\n\n        events = (IN_CREATE |\n                  IN_MOVED_TO |\n                  IN_MOVED_FROM |\n                  IN_DELETE_SELF |\n                  IN_CLOSE_WRITE |\n                  IN_DELETE |\n                  IN_MOVE_SELF)\n\n        def handler(mask, name):\n            if ((mask & IN_CREATE or mask & IN_MOVED_TO) and\n                cur_wait and name == cur_wait):\n                reset()\n            elif mask & (IN_DELETE_SELF | IN_MOVE_SELF):\n                reset()\n            elif not cur_wait and len(name) > 0:\n                if mask & (IN_CLOSE_WRITE | IN_MOVED_TO | IN_DELETE | IN_MOVED_FROM):\n                    callback(os.path.join(path, name))\n\n        def reset():\n            self.__rem_watch(cur_path, handler)\n            self.watch_directory(path, callback)\n\n        cur_path = path\n        cur_wait = None\n        while not os.path.exists(cur_path):\n            cur_wait = os.path.basename(cur_path)\n            cur_path = os.path.dirname(cur_path)\n\n        self.__add_watch(cur_path, events, handler)\n\n        if not cur_wait:\n            for f in os.listdir(cur_path):\n                callback(os.path.join(cur_path, f))\n\n    def run(self):\n        def event(wd, mask, name):\n            if wd in self.handlers:\n                for h in self.handlers[wd]:\n                    h(mask, name)\n        self.inotify.run(event)\n"

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "import os\nimport sys\nimport time\n\nimport gzip\nimport xml.etree.ElementTree as ET\nimport json\n\nlang = os.environ.get(\"LANGUAGE\")\n\ndef attr_lang(elt):\n    return elt.attrib.get('{http://www.w3.org/XML/1998/namespace}lang')\n\ndef element(xml, tag):\n    if lang:\n        for elt in xml.iter(tag):\n            if attr_lang(elt) == lang:\n                return elt\n    return xml.find(tag)\n\ndef element_value(xml, tag):\n    elt = element(xml, tag)\n    return elt.text if elt is not None else None\n\ndef convert_description(xml, use_lang = True):\n    if xml is None:\n        return None\n\n    want_lang = lang if use_lang else None\n\n    # Only the following constructs are allowed, and they all appear\n    # at the top level:\n    #\n    # <p>text</p>\n    # <ul><li>text</li>...</ul>\n    # <ol><li>text</li>...</ol>\n\n    # A description can have 'lang' attributes both on the actual\n    # <description> element and on the contained <p>, <ul>, and <ol>\n    # elements, but probably not on the <li> elements.\n\n    def text(xml):\n        return \" \".join(xml.itertext())\n\n    res = [ ]\n    for c in xml:\n        if attr_lang(c) != want_lang:\n            continue\n        if c.tag == 'p':\n            res.append(text(c))\n        elif c.tag == 'ul' or c.tag == 'ol':\n            res.append({ \"tag\": c.tag, \"items\": map(text, list(c.findall('li'))) })\n\n    # If we found nothing that matches lang, fall back to default\n    if lang is not None and len(res) == 0:\n        res = convert_description(xml, False)\n\n    return res\n\ndef convert_cached_icon(dir, origin, xml):\n    if 'width' in xml.attrib and 'height' in xml.attrib:\n        width = xml.attrib['width']\n        height = xml.attrib['height']\n    else:\n        width = \"64\"\n        height = \"64\"\n\n    return os.path.join(dir, \"..\", \"icons\", origin, width+\"x\"+height, xml.text)\n\ndef convert_remote_icon(xml):\n    return xml.text\n\ndef convert_local_icon(xml):\n    return xml.text\n\ndef find_and_convert_icon(dir, origin, xml):\n    if xml is None:\n        return None\n\n    # We want the biggest one that isn't larger than 64x64\n    height = 0\n    icon = None\n    for ic in xml.iter('icon'):\n        h = int(ic.attrib['height'])\n        if h <= 64 and (h > height or icon is None):\n            icon = ic\n            height = h\n\n    if icon is not None:\n        if icon.attrib['type'] == \"cached\":\n            return convert_cached_icon(dir, origin, icon)\n        elif icon.attrib['type'] == \"remote\":\n            return convert_remote_icon(icon)\n        elif icon.attrib['type'] == \"local\":\n            return convert_local_icon(icon)\n\n    return None\n\ndef convert_screenshots(xml):\n    if xml is None:\n        return [ ]\n\n    shots = [ ]\n    for sh in xml.iter('screenshot'):\n        for img in sh.iter('image'):\n            if img.attrib['type'] == \"source\":\n                shots.append({ 'full': img.text })\n\n    return shots\n\ndef convert_launchables(xml):\n    ables = [ ]\n\n    for elt in xml.iter('launchable'):\n        type = elt.attrib['type']\n        if type == \"cockpit-package\":\n            ables.append({ \"name\": elt.text, \"type\": type })\n\n    return ables\n\ndef convert_collection_component(dir, origin, xml):\n    id = element_value(xml, 'id')\n    pkgname = element_value(xml, 'pkgname')\n    launchables = convert_launchables(xml)\n\n    if not id or not pkgname or len(launchables) == 0:\n        return None\n\n    return {\n        \"id\": id,\n        \"pkgname\": pkgname,\n        \"name\": element_value(xml, 'name'),\n        \"summary\": element_value(xml, 'summary'),\n        \"description\": convert_description(element(xml, 'description')),\n        \"icon\": find_and_convert_icon(dir, origin, xml),\n        \"screenshots\": convert_screenshots(element(xml, 'screenshots')),\n        \"launchables\": launchables\n    }\n\ndef convert_upstream_component(file, xml):\n    if xml.tag != \"component\":\n        return None\n\n    launchables = convert_launchables(xml)\n    if len(launchables) ==  0:\n        return None\n\n    return {\n        \"id\": element_value(xml, 'id'),\n        \"name\": element_value(xml, 'name'),\n        \"summary\": element_value(xml, 'summary'),\n        \"description\": convert_description(element(xml, 'description')),\n        \"icon\": find_and_convert_icon(dir, \"\", xml),\n        \"launchables\": launchables,\n        \"installed\": True,\n        \"file\": file\n    }\n\nclass MetainfoDB:\n    def __init__(self):\n        self.dumping = False\n        self.installed_by_file = { }\n        self.available_by_file = { }\n\n    def notice_installed(self, file, xml_root):\n        if xml_root is not None:\n            comp = convert_upstream_component(file, xml_root)\n            if comp is not None:\n                self.installed_by_file[file] = comp;\n        elif file in self.installed_by_file:\n            del self.installed_by_file[file];\n        if self.dumping:\n            self.dump()\n\n    def notice_available(self, file, xml_root):\n        if xml_root is not None:\n            info = { }\n            origin = xml_root.attrib['origin']\n            for xml_comp in xml_root.iter('component'):\n                comp = convert_collection_component(os.path.dirname(file), origin, xml_comp)\n                if comp is not None:\n                    if comp['id'] in info:\n                        pass # warning: duplicate id\n                    else:\n                        info[comp['id']] = comp\n            self.available_by_file[file] = info\n        elif file in self.available_by_file:\n            del self.available_by_file[file]\n        if self.dumping:\n            self.dump()\n\n    def dump(self):\n        comps = { }\n        for file in self.installed_by_file:\n            comp = self.installed_by_file[file]\n            if comp['id'] in comps:\n                pass # warn dup\n            else:\n                comps[comp['id']] = comp;\n        for file in self.available_by_file:\n            for id in self.available_by_file[file]:\n                comp = self.available_by_file[file][id]\n                if not comp['id'] in comps:\n                    comps[comp['id']] = comp;\n                else:\n                    z = comps[comp['id']].copy()\n                    z.update(comp)\n                    comps[comp['id']] = z;\n\n        data = {\n            \"components\": comps,\n            \"origin_files\": list(self.available_by_file.keys())\n        }\n\n        sys.stdout.write(json.dumps(data) + \"\\n\")\n        sys.stdout.flush()\n\n    def start_dumping(self):\n        self.dump()\n        self.dumping = True\n\ndef watch_db():\n    watcher = Watcher()\n\n    db = MetainfoDB()\n\n    def process_file(path, callback):\n        if not os.path.exists(path):\n            callback(path, None)\n        elif path.endswith(\".xml\"):\n            callback(path, ET.parse(path).getroot())\n        elif path.endswith(\".xml.gz\"):\n            callback(path, ET.parse(gzip.open(path)).getroot())\n\n    def installed_callback(path):\n        process_file(path, lambda path, xml: db.notice_installed(path, xml))\n\n    def available_callback(path):\n        process_file(path, lambda path, xml: db.notice_available(path, xml))\n\n    watcher.watch_directory(\"/usr/share/metainfo\",      installed_callback)\n    watcher.watch_directory(\"/usr/share/app-info/xmls\", available_callback)\n    watcher.watch_directory(\"/var/cache/app-info/xmls\", available_callback)\n    db.start_dumping()\n    watcher.run()\n\nwatch_db()\n"

/***/ }
/******/ ]);
//# sourceMappingURL=apps.js.map
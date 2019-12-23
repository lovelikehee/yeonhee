!function() {
    "use strict";
    function r(t) {
        return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        )(t)
    }
    function i(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function n(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    function t(t, e, i) {
        return e && n(t.prototype, e),
        i && n(t, i),
        t
    }
    function s(t, e, i) {
        return e in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = i,
        t
    }
    function l(t, e) {
        return function(t) {
            if (Array.isArray(t))
                return t
        }(t) || function(t, e) {
            var i = []
              , n = !0
              , s = !1
              , o = void 0;
            try {
                for (var a, r = t[Symbol.iterator](); !(n = (a = r.next()).done) && (i.push(a.value),
                !e || i.length !== e); n = !0)
                    ;
            } catch (t) {
                s = !0,
                o = t
            } finally {
                try {
                    n || null == r.return || r.return()
                } finally {
                    if (s)
                        throw o
                }
            }
            return i
        }(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }()
    }
    function c(t) {
        return function(t) {
            if (Array.isArray(t)) {
                for (var e = 0, i = new Array(t.length); e < t.length; e++)
                    i[e] = t[e];
                return i
            }
        }(t) || function(t) {
            if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t))
                return Array.from(t)
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }
    var o = function() {
        function e(t) {
            i(this, e),
            this.mAttr = "data-" + t.dataName,
            this.mCaptureEvents = ["mouseenter", "mouseleave"],
            this.el = t.el
        }
        return t(e, [{
            key: "mInit",
            value: function(t) {
                var e = this;
                this.modules = t,
                this.mCheckEventTarget = this.mCheckEventTarget.bind(this),
                this.events && Object.keys(this.events).forEach(function(t) {
                    return e.mAddEvent(t)
                })
            }
        }, {
            key: "mUpdate",
            value: function(t) {
                this.modules = t
            }
        }, {
            key: "mDestroy",
            value: function() {
                var e = this;
                this.events && Object.keys(this.events).forEach(function(t) {
                    return e.mRemoveEvent(t)
                })
            }
        }, {
            key: "mAddEvent",
            value: function(t) {
                var e = !!this.mCaptureEvents.includes(t);
                this.el.addEventListener(t, this.mCheckEventTarget, e)
            }
        }, {
            key: "mRemoveEvent",
            value: function(t) {
                var e = !!this.mCaptureEvents.includes(t);
                this.el.removeEventListener(t, this.mCheckEventTarget, e)
            }
        }, {
            key: "mCheckEventTarget",
            value: function(t) {
                var e = this.events[t.type];
                if ("string" == typeof e)
                    this[e](t);
                else {
                    var i = "[" + this.mAttr + "]"
                      , n = t.target;
                    if (this.mCaptureEvents.includes(t.type))
                        n.matches(i) && this.mCallEventMethod(t, e, n);
                    else
                        for (; n && n !== document && (!n.matches(i) || "undefined" == this.mCallEventMethod(t, e, n)); )
                            n = n.parentNode
                }
            }
        }, {
            key: "mCallEventMethod",
            value: function(t, e, i) {
                var n = i.getAttribute(this.mAttr);
                if (e.hasOwnProperty(n)) {
                    var s = e[n];
                    Object.defineProperty(t, "currentTarget", {
                        value: i
                    }),
                    Object.defineProperty(t, "curTarget", {
                        value: i
                    }),
                    this[s](t)
                }
            }
        }, {
            key: "$",
            value: function(t, e) {
                var i = [t.indexOf("."), t.indexOf("#"), t.indexOf("[")].filter(function(t) {
                    return -1 != t
                })
                  , n = !1
                  , s = t
                  , o = ""
                  , a = this.el;
                return i.length && (n = Math.min.apply(Math, c(i)),
                s = t.slice(0, n),
                o = t.slice(n)),
                "object" == r(e) && (a = e),
                a.querySelectorAll("[" + this.mAttr + "=" + s + "]" + o)
            }
        }, {
            key: "parent",
            value: function(t, e) {
                for (var i = "[" + this.mAttr + "=" + t + "]", n = e; n && n !== document; ) {
                    if (n.matches(i))
                        return n;
                    n = n.parentNode
                }
            }
        }, {
            key: "getData",
            value: function(t, e) {
                return (e || this.el).getAttribute(this.mAttr + "-" + t)
            }
        }, {
            key: "setData",
            value: function(t, e, i) {
                return (i || this.el).setAttribute(this.mAttr + "-" + t, e)
            }
        }, {
            key: "call",
            value: function(e, i, n, t) {
                var s = this;
                i && !n && (n = i,
                i = !1),
                this.modules[n] && (t ? this.modules[n][t] && this.modules[n][t][e](i) : Object.keys(this.modules[n]).forEach(function(t) {
                    s.modules[n][t][e](i)
                }))
            }
        }, {
            key: "init",
            value: function() {}
        }, {
            key: "destroy",
            value: function() {}
        }]),
        e
    }()
      , e = function() {
        function e(t) {
            i(this, e),
            this.app,
            this.modules = t.modules,
            this.currentModules = {},
            this.activeModules = {},
            this.newModules = {},
            this.moduleId = 0
        }
        return t(e, [{
            key: "init",
            value: function(t, c) {
                var h = this
                  , e = (c || document).querySelectorAll("*");
                t && !this.app && (this.app = t),
                this.activeModules.app = {
                    app: this.app
                },
                e.forEach(function(l) {
                    Array.from(l.attributes).forEach(function(t) {
                        if (t.name.startsWith("data-module")) {
                            var e = !1
                              , i = t.name.split("-").splice(2)
                              , n = h.toCamel(i);
                            if (h.modules[n] ? e = !0 : h.modules[h.toUpper(n)] && (n = h.toUpper(n),
                            e = !0),
                            e) {
                                var s = {
                                    el: l,
                                    name: n,
                                    dataName: i.join("-")
                                }
                                  , o = new h.modules[n](s)
                                  , a = t.value;
                                a || (h.moduleId++,
                                a = "m" + h.moduleId,
                                l.setAttribute(t.name, a)),
                                h.addActiveModule(n, a, o);
                                var r = n + "-" + a;
                                c ? h.newModules[r] = o : h.currentModules[r] = o
                            }
                        }
                    })
                }),
                Object.entries(this.currentModules).forEach(function(t) {
                    var e = l(t, 2)
                      , i = e[0]
                      , n = e[1];
                    if (c) {
                        var s = i.split("-")
                          , o = s.shift()
                          , a = s.pop();
                        h.addActiveModule(o, a, n)
                    } else
                        h.initModule(n)
                })
            }
        }, {
            key: "initModule",
            value: function(t) {
                t.mInit(this.activeModules),
                t.init()
            }
        }, {
            key: "addActiveModule",
            value: function(t, e, i) {
                this.activeModules[t] ? Object.assign(this.activeModules[t], s({}, e, i)) : this.activeModules[t] = s({}, e, i)
            }
        }, {
            key: "update",
            value: function(t) {
                var n = this;
                this.init(this.app, t),
                Object.entries(this.currentModules).forEach(function(t) {
                    var e = l(t, 2);
                    e[0];
                    e[1].mUpdate(n.activeModules)
                }),
                Object.entries(this.newModules).forEach(function(t) {
                    var e = l(t, 2)
                      , i = (e[0],
                    e[1]);
                    n.initModule(i)
                }),
                Object.assign(this.currentModules, this.newModules)
            }
        }, {
            key: "destroy",
            value: function(t) {
                t ? this.destroyScope(t) : this.destroyModules()
            }
        }, {
            key: "destroyScope",
            value: function(t) {
                var o = this;
                t.querySelectorAll("*").forEach(function(t) {
                    Array.from(t.attributes).forEach(function(t) {
                        if (t.name.startsWith("data-module")) {
                            var e = t.value
                              , i = t.name.split("-").splice(2)
                              , n = o.toCamel(i) + "-" + e
                              , s = !1;
                            o.currentModules[n] ? s = !0 : o.currentModules[o.toUpper(n)] && (n = o.toUpper(n),
                            s = !0),
                            s && (o.destroyModule(o.currentModules[n]),
                            delete o.currentModules[n])
                        }
                    })
                }),
                this.activeModules = {},
                this.newModules = {}
            }
        }, {
            key: "destroyModules",
            value: function() {
                var n = this;
                Object.entries(this.currentModules).forEach(function(t) {
                    var e = l(t, 2)
                      , i = (e[0],
                    e[1]);
                    n.destroyModule(i)
                }),
                this.currentModules = []
            }
        }, {
            key: "destroyModule",
            value: function(t) {
                t.mDestroy(),
                t.destroy()
            }
        }, {
            key: "toCamel",
            value: function(t) {
                var i = this;
                return t.reduce(function(t, e) {
                    return t + i.toUpper(e)
                })
            }
        }, {
            key: "toUpper",
            value: function(t) {
                return t.charAt(0).toUpperCase() + t.slice(1)
            }
        }]),
        e
    }();
    function h(t) {
        return (h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        )(t)
    }
    function a(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function u(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    function d(t, e, i) {
        return e && u(t.prototype, e),
        i && u(t, i),
        t
    }
    function f(t, e) {
        if ("function" != typeof e && null !== e)
            throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }),
        e && v(t, e)
    }
    function p(t) {
        return (p = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        }
        )(t)
    }
    function v(t, e) {
        return (v = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    function m(t, e) {
        return !e || "object" != typeof e && "function" != typeof e ? function(t) {
            if (void 0 === t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }(t) : e
    }
    function y(t) {
        return function(t) {
            if (Array.isArray(t)) {
                for (var e = 0, i = new Array(t.length); e < t.length; e++)
                    i[e] = t[e];
                return i
            }
        }(t) || function(t) {
            if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t))
                return Array.from(t)
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }
    function g(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    function b(t, e) {
        return function(t) {
            if (Array.isArray(t))
                return t
        }(t) || function(t, e) {
            var i = []
              , n = !0
              , s = !1
              , o = void 0;
            try {
                for (var a, r = t[Symbol.iterator](); !(n = (a = r.next()).done) && (i.push(a.value),
                !e || i.length !== e); n = !0)
                    ;
            } catch (t) {
                s = !0,
                o = t
            } finally {
                try {
                    n || null == r.return || r.return()
                } finally {
                    if (s)
                        throw o
                }
            }
            return i
        }(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }()
    }
    var w = function() {
        function e(t) {
            !function(t, e) {
                if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this.defaults = {
                name: "load",
                loadingClass: "is-loading",
                loadedClass: "is-loaded",
                readyClass: "is-ready",
                transitionsPrefix: "is-",
                enterDelay: 0,
                exitDelay: 0,
                loadedDelay: 0,
                isLoaded: !1,
                isEntered: !1,
                isUrl: !1,
                transitionContainer: null
            },
            Object.assign(this, this.defaults, t),
            this.options = t,
            this.namespace = "modular",
            this.html = document.documentElement,
            this.href = window.location.href,
            this.container = "data-" + this.name + "-container",
            this.subContainer = !1,
            this.prevTransition = null,
            this.loadAttributes = ["src", "srcset", "style", "href"],
            this.isInserted = !1,
            this.isLoading = !1,
            this.enterTimeout = !1,
            this.controller = new AbortController,
            this.classContainer = this.html,
            this.isChrome = -1 != navigator.userAgent.indexOf("Chrome"),
            this.init()
        }
        var t, i, n;
        return t = e,
        (i = [{
            key: "init",
            value: function() {
                var e = this;
                window.addEventListener("popstate", function(t) {
                    return e.checkState(t)
                }, !1),
                this.html.addEventListener("click", function(t) {
                    return e.checkClick(t)
                }, !1),
                this.loadEls(document)
            }
        }, {
            key: "checkClick",
            value: function(t) {
                if (!t.ctrlKey && !t.metaKey)
                    for (var e = t.target; e && e !== document; ) {
                        if (e.matches("a")) {
                            var i = e.getAttribute("href");
                            i.startsWith("#") || i.startsWith("mailto:") || i.startsWith("tel:") || (t.preventDefault(),
                            this.reset(),
                            this.getClickOptions(e));
                            break
                        }
                        e = e.parentNode
                    }
            }
        }, {
            key: "checkState",
            value: function() {
                this.reset(),
                this.getStateOptions()
            }
        }, {
            key: "reset",
            value: function() {
                this.isLoading && (this.controller.abort(),
                this.isLoading = !1,
                this.controller = new AbortController),
                window.clearTimeout(this.enterTimeout),
                this.isInserted && this.removeContainer(),
                this.classContainer = this.html,
                Object.assign(this, this.defaults, this.options)
            }
        }, {
            key: "getClickOptions",
            value: function(t) {
                this.transition = t.getAttribute("data-" + this.name),
                this.isUrl = t.getAttribute("data-" + this.name + "-url");
                var e = t.getAttribute("href");
                "_blank" != t.getAttribute("target") ? "false" != this.transition ? this.setOptions(e, !0) : window.location = e : window.open(e, "_blank")
            }
        }, {
            key: "getStateOptions",
            value: function() {
                this.transition = history.state;
                var t = window.location.href;
                this.setOptions(t)
            }
        }, {
            key: "goTo",
            value: function(t, e, i) {
                this.reset(),
                this.transition = e,
                this.isUrl = i,
                this.setOptions(t, !0)
            }
        }, {
            key: "setOptions",
            value: function(t, e) {
                var i, n = "[" + this.container + "]";
                this.transition && "true" != this.transition && (this.transitionContainer = "[" + this.container + '="' + this.transition + '"]',
                this.loadingClass = this.transitions[this.transition].loadingClass || this.loadingClass,
                this.loadedClass = this.transitions[this.transition].loadedClass || this.loadedClass,
                this.readyClass = this.transitions[this.transition].readyClass || this.readyClass,
                this.transitionsPrefix = this.transitions[this.transition].transitionsPrefix || this.transitionsPrefix,
                this.enterDelay = this.transitions[this.transition].enterDelay || this.enterDelay,
                this.exitDelay = this.transitions[this.transition].exitDelay || this.exitDelay,
                this.loadedDelay = this.transitions[this.transition].loadedDelay || this.loadedDelay,
                i = document.querySelector(this.transitionContainer)),
                i ? (n = this.transitionContainer,
                this.oldContainer = i,
                this.classContainer = this.oldContainer.parentNode,
                this.subContainer || history.replaceState(this.transition, null, this.href),
                this.subContainer = !0) : (this.oldContainer = document.querySelector(n),
                this.subContainer && history.replaceState(this.prevTransition, null, this.href),
                this.subContainer = !1),
                this.href = t,
                this.parentContainer = this.oldContainer.parentNode,
                "" === this.isUrl || null != this.isUrl && "false" != this.isUrl && 0 != this.isUrl ? history.pushState(this.transition, null, t) : (this.oldContainer.classList.add("is-old"),
                this.setLoading(),
                this.startEnterDelay(),
                this.loadHref(t, n, e))
            }
        }, {
            key: "setLoading",
            value: function() {
                this.classContainer.classList.remove(this.loadedClass, this.readyClass),
                this.classContainer.classList.add(this.loadingClass),
                this.classContainer.classList.remove(this.transitionsPrefix + this.prevTransition),
                this.transition && this.classContainer.classList.add(this.transitionsPrefix + this.transition),
                this.subContainer || (this.prevTransition = this.transition);
                var t = new Event(this.namespace + "loading");
                window.dispatchEvent(t)
            }
        }, {
            key: "startEnterDelay",
            value: function() {
                var t = this;
                this.enterTimeout = window.setTimeout(function() {
                    t.isEntered = !0,
                    t.isLoaded && t.transitionContainers()
                }, this.enterDelay)
            }
        }, {
            key: "loadHref",
            value: function(t, i, e) {
                var n = this;
                this.isLoading = !0;
                var s = this.controller.signal;
                fetch(t, {
                    signal: s
                }).then(function(t) {
                    return t.text()
                }).then(function(t) {
                    var e = new DOMParser;
                    n.data = e.parseFromString(t, "text/html"),
                    n.newContainer = n.data.querySelector(i),
                    n.newContainer.classList.add("is-new"),
                    n.parentNewContainer = n.newContainer.parentNode,
                    n.hideContainer(),
                    n.parentContainer.insertBefore(n.newContainer, n.oldContainer),
                    n.isInserted = !0,
                    n.setSvgs(),
                    n.isLoaded = !0,
                    n.isEntered && n.transitionContainers(),
                    n.loadEls(n.newContainer),
                    n.isLoading = !1
                }).catch(function(t) {
                    console.log(t)
                }),
                e && history.pushState(this.transition, null, t)
            }
        }, {
            key: "transitionContainers",
            value: function() {
                var t = this;
                this.setAttributes(),
                this.showContainer(),
                this.setLoaded(),
                setTimeout(function() {
                    t.removeContainer(),
                    t.setReady()
                }, this.exitDelay)
            }
        }, {
            key: "setSvgs",
            value: function() {
                if (this.isChrome) {
                    var t = this.newContainer.querySelectorAll("use");
                    t.length && t.forEach(function(t) {
                        var e = t.getAttribute("xlink:href");
                        if (e)
                            t.parentNode.innerHTML = '<use xlink:href="' + e + '"></use>';
                        else {
                            var i = t.getAttribute("href");
                            i && (t.parentNode.innerHTML = '<use href="' + i + '"></use>')
                        }
                    })
                }
            }
        }, {
            key: "setAttributes",
            value: function() {
                var s, t, o = this, e = this.data.getElementsByTagName("title")[0], i = this.data.head.querySelector('meta[name="description"]'), n = document.head.querySelector('meta[name="description"]');
                s = this.subContainer ? (t = this.parentNewContainer,
                document.querySelector(this.transitionContainer).parentNode) : (t = this.data.querySelector("html"),
                document.querySelector("html"));
                var a = Object.assign({}, t.dataset);
                e && (document.title = e.innerHTML),
                n && i && n.setAttribute("content", i.getAttribute("content")),
                a && Object.entries(a).forEach(function(t) {
                    var e = b(t, 2)
                      , i = e[0]
                      , n = e[1];
                    s.setAttribute("data-" + o.toDash(i), n)
                })
            }
        }, {
            key: "toDash",
            value: function(t) {
                return t.split(/(?=[A-Z])/).join("-").toLowerCase()
            }
        }, {
            key: "hideContainer",
            value: function() {
                this.newContainer.style.visibility = "hidden",
                this.newContainer.style.height = 0,
                this.newContainer.style.overflow = "hidden"
            }
        }, {
            key: "showContainer",
            value: function() {
                this.newContainer.style.visibility = "",
                this.newContainer.style.height = "",
                this.newContainer.style.overflow = ""
            }
        }, {
            key: "loadEls",
            value: function(e) {
                var i = this
                  , o = [];
                this.loadAttributes.forEach(function(n) {
                    var s = "data-" + i.name + "-" + n
                      , t = e.querySelectorAll("[" + s + "]");
                    t.length && t.forEach(function(e) {
                        var t = e.getAttribute(s);
                        if (e.setAttribute(n, t),
                        "src" == n || "srcset" == n) {
                            var i = new Promise(function(t) {
                                e.onload = function() {
                                    return t(e)
                                }
                            }
                            );
                            o.push(i)
                        }
                    })
                }),
                Promise.all(o).then(function(t) {
                    var e = new Event(i.namespace + "images");
                    window.dispatchEvent(e)
                })
            }
        }, {
            key: "setLoaded",
            value: function() {
                var t = this;
                this.classContainer.classList.remove(this.loadingClass),
                setTimeout(function() {
                    t.classContainer.classList.add(t.loadedClass)
                }, this.loadedDelay);
                var e = new Event(this.namespace + "loaded");
                window.dispatchEvent(e)
            }
        }, {
            key: "removeContainer",
            value: function() {
                this.parentContainer.removeChild(this.oldContainer),
                this.newContainer.classList.remove("is-new"),
                this.isInserted = !1
            }
        }, {
            key: "setReady",
            value: function() {
                this.classContainer.classList.add(this.readyClass);
                var t = new Event(this.namespace + "ready");
                window.dispatchEvent(t)
            }
        }, {
            key: "on",
            value: function(t, e) {
                var i = this;
                window.addEventListener(this.namespace + t, function() {
                    switch (t) {
                    case "loading":
                        return e(i.transition, i.oldContainer);
                    case "loaded":
                        return e(i.transition, i.oldContainer, i.newContainer);
                    case "ready":
                        return e(i.transition, i.newContainer);
                    default:
                        return e()
                    }
                }, !1)
            }
        }]) && g(t.prototype, i),
        n && g(t, n),
        e
    }()
      , k = function(t) {
        function e(t) {
            return a(this, e),
            m(this, p(e).call(this, t))
        }
        return f(e, o),
        d(e, [{
            key: "init",
            value: function() {
                new w
            }
        }]),
        e
    }()
      , T = document.documentElement;
    T.getAttribute("data-debug");
    function E(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function S(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    function C(t, e, i) {
        return e && S(t.prototype, e),
        i && S(t, i),
        t
    }
    function L(e, t) {
        var i = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })),
            i.push.apply(i, n)
        }
        return i
    }
    function O(t, e) {
        if ("function" != typeof e && null !== e)
            throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }),
        e && A(t, e)
    }
    function M(t) {
        return (M = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        }
        )(t)
    }
    function A(t, e) {
        return (A = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    function x(t) {
        if (void 0 === t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }
    function D(t, e) {
        return !e || "object" != typeof e && "function" != typeof e ? x(t) : e
    }
    function j(t, e, i) {
        return (j = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t, e, i) {
            var n = function(t, e) {
                for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = M(t)); )
                    ;
                return t
            }(t, e);
            if (n) {
                var s = Object.getOwnPropertyDescriptor(n, e);
                return s.get ? s.get.call(i) : s.value
            }
        }
        )(t, e, i || t)
    }
    var P = {
        el: document,
        elMobile: document,
        name: "scroll",
        offset: 0,
        repeat: !1,
        smooth: !1,
        smoothMobile: !1,
        direction: "vertical",
        inertia: 1,
        class: "is-inview",
        scrollbarClass: "c-scrollbar",
        scrollingClass: "has-scroll-scrolling",
        draggingClass: "has-scroll-dragging",
        smoothClass: "has-scroll-smooth",
        initClass: "has-scroll-init",
        getSpeed: !1,
        getDirection: !1,
        firefoxMultiplier: 50
    }
      , _ = function() {
        function e() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            E(this, e),
            window.scrollTo(0, 0),
            Object.assign(this, P, t),
            this.namespace = "locomotive",
            this.html = document.documentElement,
            this.windowHeight = window.innerHeight,
            this.windowMiddle = this.windowHeight / 2,
            this.els = [],
            this.hasScrollTicking = !1,
            this.hasCallEventSet = !1,
            this.checkScroll = this.checkScroll.bind(this),
            this.checkResize = this.checkResize.bind(this),
            this.instance = {
                scroll: {
                    x: 0,
                    y: 0
                },
                limit: this.html.offsetHeight
            },
            this.getDirection && (this.instance.direction = null),
            this.getDirection && (this.instance.speed = 0),
            this.html.classList.add(this.initClass),
            window.addEventListener("resize", this.checkResize, !1)
        }
        return C(e, [{
            key: "init",
            value: function() {
                this.initEvents()
            }
        }, {
            key: "checkScroll",
            value: function() {
                this.dispatchScroll()
            }
        }, {
            key: "checkResize",
            value: function() {}
        }, {
            key: "initEvents",
            value: function() {
                var e = this;
                this.scrollToEls = this.el.querySelectorAll("[data-".concat(this.name, "-to]")),
                this.setScrollTo = this.setScrollTo.bind(this),
                this.scrollToEls.forEach(function(t) {
                    t.addEventListener("click", e.setScrollTo, !1)
                })
            }
        }, {
            key: "setScrollTo",
            value: function(t) {
                t.preventDefault(),
                this.scrollTo(t.currentTarget.getAttribute("data-".concat(this.name, "-href")) || t.currentTarget.getAttribute("href"), t.currentTarget.getAttribute("data-".concat(this.name, "-offset")))
            }
        }, {
            key: "addElements",
            value: function() {}
        }, {
            key: "detectElements",
            value: function(i) {
                var n = this
                  , s = this.instance.scroll.y
                  , o = s + this.windowHeight;
                this.els.forEach(function(t, e) {
                    !t || t.inView && !i || o >= t.top && s < t.bottom && n.setInView(t, e),
                    t && t.inView && (o < t.top || s > t.bottom) && n.setOutOfView(t, e)
                }),
                this.els = this.els.filter(function(t, e) {
                    return null !== t
                }),
                this.hasScrollTicking = !1
            }
        }, {
            key: "setInView",
            value: function(t, e) {
                this.els[e].inView = !0,
                t.el.classList.add(t.class),
                t.call && this.hasCallEventSet && (this.dispatchCall(t, "enter"),
                t.repeat || (this.els[e].call = !1)),
                t.repeat || t.speed || t.sticky || (!t.call || t.call && this.hasCallEventSet) && (this.els[e] = null)
            }
        }, {
            key: "setOutOfView",
            value: function(t, e) {
                (t.repeat || void 0 !== t.speed) && (this.els[e].inView = !1),
                t.call && this.hasCallEventSet && this.dispatchCall(t, "exit"),
                t.repeat && t.el.classList.remove(t.class)
            }
        }, {
            key: "dispatchCall",
            value: function(t, e) {
                this.callWay = e,
                this.callValue = t.call.split(",").map(function(t) {
                    return t.trim()
                }),
                this.callObj = t,
                1 == this.callValue.length && (this.callValue = this.callValue[0]);
                var i = new Event(this.namespace + "call");
                this.el.dispatchEvent(i)
            }
        }, {
            key: "dispatchScroll",
            value: function() {
                var t = new Event(this.namespace + "scroll");
                this.el.dispatchEvent(t)
            }
        }, {
            key: "setEvents",
            value: function(t, e) {
                var i = this;
                this.el.addEventListener(this.namespace + t, function() {
                    switch (t) {
                    case "scroll":
                        return e(i.instance);
                    case "call":
                        return e(i.callValue, i.callWay, i.callObj);
                    default:
                        return e()
                    }
                }, !1),
                "call" === t && (this.hasCallEventSet = !0,
                this.detectElements(!0))
            }
        }, {
            key: "startScroll",
            value: function() {}
        }, {
            key: "stopScroll",
            value: function() {}
        }, {
            key: "setScroll",
            value: function(t, e) {
                this.instance.scroll = {
                    x: 0,
                    y: 0
                }
            }
        }, {
            key: "destroy",
            value: function() {
                var e = this;
                window.removeEventListener("resize", this.checkResize, !1),
                this.scrollToEls.forEach(function(t) {
                    t.removeEventListener("click", e.setScrollTo, !1)
                })
            }
        }]),
        e
    }()
      , I = function(t) {
        function i() {
            var t, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            return E(this, i),
            t = D(this, M(i).call(this, e)),
            window.addEventListener("scroll", t.checkScroll, !1),
            t
        }
        return O(i, _),
        C(i, [{
            key: "init",
            value: function() {
                this.instance.scroll.y = window.scrollY,
                this.addElements(),
                this.detectElements(),
                j(M(i.prototype), "init", this).call(this)
            }
        }, {
            key: "checkScroll",
            value: function() {
                var t = this;
                j(M(i.prototype), "checkScroll", this).call(this),
                this.instance.scroll.y = window.scrollY,
                this.els.length && (this.hasScrollTicking || (requestAnimationFrame(function() {
                    t.detectElements()
                }),
                this.hasScrollTicking = !0))
            }
        }, {
            key: "checkResize",
            value: function() {
                var t = this;
                this.els.length && (this.windowHeight = window.innerHeight,
                this.hasScrollTicking || (requestAnimationFrame(function() {
                    t.updateElements()
                }),
                this.hasScrollTicking = !0))
            }
        }, {
            key: "addElements",
            value: function() {
                var l = this;
                this.el.querySelectorAll("[data-" + this.name + "]").forEach(function(t, e) {
                    var i = t.dataset[l.name + "Class"] || l.class
                      , n = t.getBoundingClientRect().top + l.instance.scroll.y
                      , s = n + t.offsetHeight
                      , o = parseInt(t.dataset[l.name + "Offset"]) || parseInt(l.offset)
                      , a = t.dataset[l.name + "Repeat"]
                      , r = t.dataset[l.name + "Call"];
                    a = "false" != a && (null != a || l.repeat),
                    l.els[e] = {
                        el: t,
                        class: i,
                        top: n + o,
                        bottom: s,
                        offset: o,
                        repeat: a,
                        inView: !1,
                        call: r
                    }
                })
            }
        }, {
            key: "updateElements",
            value: function() {
                var s = this;
                this.els.forEach(function(t, e) {
                    var i = t.el.getBoundingClientRect().top + s.instance.scroll.y
                      , n = i + t.el.offsetHeight;
                    s.els[e].top = i + t.offset,
                    s.els[e].bottom = n
                }),
                this.hasScrollTicking = !1
            }
        }, {
            key: "scrollTo",
            value: function(t, e) {
                var i, n = e ? parseInt(e) : 0;
                "string" == typeof t ? "top" === t ? i = this.html : "bottom" === t ? n = this.html.offsetHeight - window.innerHeight : i = document.querySelectorAll(t)[0] : t.target || (i = t),
                i && (n = i.getBoundingClientRect().top + n),
                n += this.instance.scroll.y,
                window.scrollTo({
                    top: n,
                    behavior: "smooth"
                })
            }
        }, {
            key: "update",
            value: function() {
                this.updateElements()
            }
        }, {
            key: "destroy",
            value: function() {
                j(M(i.prototype), "destroy", this).call(this),
                window.removeEventListener("scroll", this.checkScroll, !1)
            }
        }]),
        i
    }()
      , H = Object.getOwnPropertySymbols
      , B = Object.prototype.hasOwnProperty
      , R = Object.prototype.propertyIsEnumerable;
    var N = function() {
        try {
            if (!Object.assign)
                return !1;
            var t = new String("abc");
            if (t[5] = "de",
            "5" === Object.getOwnPropertyNames(t)[0])
                return !1;
            for (var e = {}, i = 0; i < 10; i++)
                e["_" + String.fromCharCode(i)] = i;
            if ("0123456789" !== Object.getOwnPropertyNames(e).map(function(t) {
                return e[t]
            }).join(""))
                return !1;
            var n = {};
            return "abcdefghijklmnopqrst".split("").forEach(function(t) {
                n[t] = t
            }),
            "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("")
        } catch (t) {
            return !1
        }
    }() ? Object.assign : function(t, e) {
        for (var i, n, s = function(t) {
            if (null == t)
                throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(t)
        }(t), o = 1; o < arguments.length; o++) {
            for (var a in i = Object(arguments[o]))
                B.call(i, a) && (s[a] = i[a]);
            if (H) {
                n = H(i);
                for (var r = 0; r < n.length; r++)
                    R.call(i, n[r]) && (s[n[r]] = i[n[r]])
            }
        }
        return s
    }
    ;
    function Y() {}
    Y.prototype = {
        on: function(t, e, i) {
            var n = this.e || (this.e = {});
            return (n[t] || (n[t] = [])).push({
                fn: e,
                ctx: i
            }),
            this
        },
        once: function(t, e, i) {
            var n = this;
            function s() {
                n.off(t, s),
                e.apply(i, arguments)
            }
            return s._ = e,
            this.on(t, s, i)
        },
        emit: function(t) {
            for (var e = [].slice.call(arguments, 1), i = ((this.e || (this.e = {}))[t] || []).slice(), n = 0, s = i.length; n < s; n++)
                i[n].fn.apply(i[n].ctx, e);
            return this
        },
        off: function(t, e) {
            var i = this.e || (this.e = {})
              , n = i[t]
              , s = [];
            if (n && e)
                for (var o = 0, a = n.length; o < a; o++)
                    n[o].fn !== e && n[o].fn._ !== e && s.push(n[o]);
            return s.length ? i[t] = s : delete i[t],
            this
        }
    };
    var W = Y
      , $ = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    var F, X = (function(t, e) {
        (function() {
            (null !== e ? e : this).Lethargy = function() {
                function t(t, e, i, n) {
                    this.stability = null != t ? Math.abs(t) : 8,
                    this.sensitivity = null != e ? 1 + Math.abs(e) : 100,
                    this.tolerance = null != i ? 1 + Math.abs(i) : 1.1,
                    this.delay = null != n ? n : 150,
                    this.lastUpDeltas = function() {
                        var t, e, i;
                        for (i = [],
                        t = 1,
                        e = 2 * this.stability; 1 <= e ? t <= e : e <= t; 1 <= e ? t++ : t--)
                            i.push(null);
                        return i
                    }
                    .call(this),
                    this.lastDownDeltas = function() {
                        var t, e, i;
                        for (i = [],
                        t = 1,
                        e = 2 * this.stability; 1 <= e ? t <= e : e <= t; 1 <= e ? t++ : t--)
                            i.push(null);
                        return i
                    }
                    .call(this),
                    this.deltasTimestamp = function() {
                        var t, e, i;
                        for (i = [],
                        t = 1,
                        e = 2 * this.stability; 1 <= e ? t <= e : e <= t; 1 <= e ? t++ : t--)
                            i.push(null);
                        return i
                    }
                    .call(this)
                }
                return t.prototype.check = function(t) {
                    var e;
                    return null != (t = t.originalEvent || t).wheelDelta ? e = t.wheelDelta : null != t.deltaY ? e = -40 * t.deltaY : null == t.detail && 0 !== t.detail || (e = -40 * t.detail),
                    this.deltasTimestamp.push(Date.now()),
                    this.deltasTimestamp.shift(),
                    0 < e ? (this.lastUpDeltas.push(e),
                    this.lastUpDeltas.shift(),
                    this.isInertia(1)) : (this.lastDownDeltas.push(e),
                    this.lastDownDeltas.shift(),
                    this.isInertia(-1))
                }
                ,
                t.prototype.isInertia = function(t) {
                    var e, i, n, s, o, a, r;
                    return null === (e = -1 === t ? this.lastDownDeltas : this.lastUpDeltas)[0] ? t : !(this.deltasTimestamp[2 * this.stability - 2] + this.delay > Date.now() && e[0] === e[2 * this.stability - 1]) && (n = e.slice(0, this.stability),
                    i = e.slice(this.stability, 2 * this.stability),
                    r = n.reduce(function(t, e) {
                        return t + e
                    }),
                    o = i.reduce(function(t, e) {
                        return t + e
                    }),
                    a = r / n.length,
                    s = o / i.length,
                    Math.abs(a) < Math.abs(s * this.tolerance) && this.sensitivity < Math.abs(s) && t)
                }
                ,
                t.prototype.showLastUpDeltas = function() {
                    return this.lastUpDeltas
                }
                ,
                t.prototype.showLastDownDeltas = function() {
                    return this.lastDownDeltas
                }
                ,
                t
            }()
        }
        ).call($)
    }(F = {
        exports: {}
    }, F.exports),
    F.exports), q = {
        hasWheelEvent: "onwheel"in document,
        hasMouseWheelEvent: "onmousewheel"in document,
        hasTouch: "ontouchstart"in document,
        hasTouchWin: navigator.msMaxTouchPoints && 1 < navigator.msMaxTouchPoints,
        hasPointer: !!window.navigator.msPointerEnabled,
        hasKeyDown: "onkeydown"in document,
        isFirefox: -1 < navigator.userAgent.indexOf("Firefox")
    }, U = Object.prototype.toString, V = Object.prototype.hasOwnProperty;
    function z(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }
    var K = X.Lethargy
      , G = "virtualscroll"
      , Z = nt
      , J = 37
      , Q = 38
      , tt = 39
      , et = 40
      , it = 32;
    function nt(t) {
        !function(t) {
            if (!t)
                return console.warn("bindAll requires at least one argument.");
            var e = Array.prototype.slice.call(arguments, 1);
            if (0 === e.length)
                for (var i in t)
                    V.call(t, i) && "function" == typeof t[i] && "[object Function]" == U.call(t[i]) && e.push(i);
            for (var n = 0; n < e.length; n++) {
                var s = e[n];
                t[s] = z(t[s], t)
            }
        }(this, "_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown"),
        this.el = window,
        t && t.el && (this.el = t.el,
        delete t.el),
        this.options = N({
            mouseMultiplier: 1,
            touchMultiplier: 2,
            firefoxMultiplier: 15,
            keyStep: 120,
            preventTouch: !1,
            unpreventTouchClass: "vs-touchmove-allowed",
            limitInertia: !1,
            useKeyboard: !0,
            useTouch: !0
        }, t),
        this.options.limitInertia && (this._lethargy = new K),
        this._emitter = new W,
        this._event = {
            y: 0,
            x: 0,
            deltaX: 0,
            deltaY: 0
        },
        this.touchStartX = null,
        this.touchStartY = null,
        this.bodyTouchAction = null,
        void 0 !== this.options.passive && (this.listenerOptions = {
            passive: this.options.passive
        })
    }
    function st(t, e, i) {
        return (1 - i) * t + i * e
    }
    function ot(t) {
        var e = {};
        if (window.getComputedStyle) {
            var i = getComputedStyle(t)
              , n = i.transform || i.webkitTransform || i.mozTransform
              , s = n.match(/^matrix3d\((.+)\)$/);
            return s ? parseFloat(s[1].split(", ")[13]) : (s = n.match(/^matrix\((.+)\)$/),
            e.x = s ? parseFloat(s[1].split(", ")[4]) : 0,
            e.y = s ? parseFloat(s[1].split(", ")[5]) : 0,
            e)
        }
    }
    nt.prototype._notify = function(t) {
        var e = this._event;
        e.x += e.deltaX,
        e.y += e.deltaY,
        this._emitter.emit(G, {
            x: e.x,
            y: e.y,
            deltaX: e.deltaX,
            deltaY: e.deltaY,
            originalEvent: t
        })
    }
    ,
    nt.prototype._onWheel = function(t) {
        var e = this.options;
        if (!this._lethargy || !1 !== this._lethargy.check(t)) {
            var i = this._event;
            i.deltaX = t.wheelDeltaX || -1 * t.deltaX,
            i.deltaY = t.wheelDeltaY || -1 * t.deltaY,
            q.isFirefox && 1 == t.deltaMode && (i.deltaX *= e.firefoxMultiplier,
            i.deltaY *= e.firefoxMultiplier),
            i.deltaX *= e.mouseMultiplier,
            i.deltaY *= e.mouseMultiplier,
            this._notify(t)
        }
    }
    ,
    nt.prototype._onMouseWheel = function(t) {
        if (!this.options.limitInertia || !1 !== this._lethargy.check(t)) {
            var e = this._event;
            e.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0,
            e.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta,
            this._notify(t)
        }
    }
    ,
    nt.prototype._onTouchStart = function(t) {
        var e = t.targetTouches ? t.targetTouches[0] : t;
        this.touchStartX = e.pageX,
        this.touchStartY = e.pageY
    }
    ,
    nt.prototype._onTouchMove = function(t) {
        var e = this.options;
        e.preventTouch && !t.target.classList.contains(e.unpreventTouchClass) && t.preventDefault();
        var i = this._event
          , n = t.targetTouches ? t.targetTouches[0] : t;
        i.deltaX = (n.pageX - this.touchStartX) * e.touchMultiplier,
        i.deltaY = (n.pageY - this.touchStartY) * e.touchMultiplier,
        this.touchStartX = n.pageX,
        this.touchStartY = n.pageY,
        this._notify(t)
    }
    ,
    nt.prototype._onKeyDown = function(t) {
        var e = this._event;
        e.deltaX = e.deltaY = 0;
        var i = window.innerHeight - 40;
        switch (t.keyCode) {
        case J:
        case Q:
            e.deltaY = this.options.keyStep;
            break;
        case tt:
        case et:
            e.deltaY = -this.options.keyStep;
            break;
        case t.shiftKey:
            e.deltaY = i;
            break;
        case it:
            e.deltaY = -i;
            break;
        default:
            return
        }
        this._notify(t)
    }
    ,
    nt.prototype._bind = function() {
        q.hasWheelEvent && this.el.addEventListener("wheel", this._onWheel, this.listenerOptions),
        q.hasMouseWheelEvent && this.el.addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions),
        q.hasTouch && this.options.useTouch && (this.el.addEventListener("touchstart", this._onTouchStart, this.listenerOptions),
        this.el.addEventListener("touchmove", this._onTouchMove, this.listenerOptions)),
        q.hasPointer && q.hasTouchWin && (this.bodyTouchAction = document.body.style.msTouchAction,
        document.body.style.msTouchAction = "none",
        this.el.addEventListener("MSPointerDown", this._onTouchStart, !0),
        this.el.addEventListener("MSPointerMove", this._onTouchMove, !0)),
        q.hasKeyDown && this.options.useKeyboard && document.addEventListener("keydown", this._onKeyDown)
    }
    ,
    nt.prototype._unbind = function() {
        q.hasWheelEvent && this.el.removeEventListener("wheel", this._onWheel),
        q.hasMouseWheelEvent && this.el.removeEventListener("mousewheel", this._onMouseWheel),
        q.hasTouch && (this.el.removeEventListener("touchstart", this._onTouchStart),
        this.el.removeEventListener("touchmove", this._onTouchMove)),
        q.hasPointer && q.hasTouchWin && (document.body.style.msTouchAction = this.bodyTouchAction,
        this.el.removeEventListener("MSPointerDown", this._onTouchStart, !0),
        this.el.removeEventListener("MSPointerMove", this._onTouchMove, !0)),
        q.hasKeyDown && this.options.useKeyboard && document.removeEventListener("keydown", this._onKeyDown)
    }
    ,
    nt.prototype.on = function(t, e) {
        this._emitter.on(G, t, e);
        var i = this._emitter.e;
        i && i[G] && 1 === i[G].length && this._bind()
    }
    ,
    nt.prototype.off = function(t, e) {
        this._emitter.off(G, t, e);
        var i = this._emitter.e;
        (!i[G] || i[G].length <= 0) && this._unbind()
    }
    ,
    nt.prototype.reset = function() {
        var t = this._event;
        t.x = 0,
        t.y = 0
    }
    ,
    nt.prototype.destroy = function() {
        this._emitter.off(),
        this._unbind()
    }
    ;
    var at = 38
      , rt = 40
      , lt = 32
      , ct = 9
      , ht = function(t) {
        function s() {
            var t, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            return E(this, s),
            (t = D(this, M(s).call(this, e))).inertia = .1 * t.inertia,
            t.isScrolling = !1,
            t.isDraggingScrollbar = !1,
            t.isTicking = !1,
            t.hasScrollTicking = !1,
            t.parallaxElements = [],
            t.inertiaRatio = 1,
            t.stop = !1,
            t.checkKey = t.checkKey.bind(x(t)),
            window.addEventListener("keydown", t.checkKey, !1),
            t
        }
        return O(s, _),
        C(s, [{
            key: "init",
            value: function() {
                var e = this;
                this.html.classList.add(this.smoothClass),
                this.instance = function(s) {
                    for (var t = 1; t < arguments.length; t++) {
                        var o = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? L(o, !0).forEach(function(t) {
                            var e, i, n;
                            e = s,
                            n = o[i = t],
                            i in e ? Object.defineProperty(e, i, {
                                value: n,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0
                            }) : e[i] = n
                        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(s, Object.getOwnPropertyDescriptors(o)) : L(o).forEach(function(t) {
                            Object.defineProperty(s, t, Object.getOwnPropertyDescriptor(o, t))
                        })
                    }
                    return s
                }({
                    delta: {
                        x: 0,
                        y: 0
                    }
                }, this.instance),
                this.vs = new Z({
                    el: this.el,
                    mouseMultiplier: -1 < navigator.platform.indexOf("Win") ? 1 : .4,
                    touchMultiplier: 4,
                    firefoxMultiplier: this.firefoxMultiplier,
                    useKeyboard: !1,
                    passive: !0
                }),
                this.vs.on(function(t) {
                    e.stop || (e.isTicking || e.isDraggingScrollbar || (requestAnimationFrame(function() {
                        e.isScrolling || e.startScrolling(),
                        e.updateDelta(t)
                    }),
                    e.isTicking = !0),
                    e.isTicking = !1)
                }),
                this.setScrollLimit(),
                this.initScrollBar(),
                this.addSections(),
                this.addElements(),
                this.detectElements(),
                this.transformElements(!0),
                j(M(s.prototype), "init", this).call(this)
            }
        }, {
            key: "setScrollLimit",
            value: function() {
                this.instance.limit = this.el.offsetHeight - this.windowHeight
            }
        }, {
            key: "startScrolling",
            value: function() {
                this.isScrolling = !0,
                this.checkScroll(),
                this.html.classList.add(this.scrollingClass)
            }
        }, {
            key: "stopScrolling",
            value: function() {
                this.isScrolling = !1,
                this.inertiaRatio = 1,
                this.instance.scroll.y = Math.round(this.instance.scroll.y),
                this.html.classList.remove(this.scrollingClass)
            }
        }, {
            key: "checkKey",
            value: function(t) {
                var e = this;
                switch (t.keyCode) {
                case ct:
                    setTimeout(function() {
                        document.documentElement.scrollTop = 0,
                        document.body.scrollTop = 0,
                        document.activeElement instanceof HTMLBodyElement || e.scrollTo(document.activeElement, -window.innerHeight / 2)
                    }, 0);
                    break;
                case at:
                    this.instance.delta.y -= 240;
                    break;
                case rt:
                    this.instance.delta.y += 240;
                    break;
                case lt:
                    document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement || (t.shiftKey ? this.instance.delta.y -= window.innerHeight : this.instance.delta.y += window.innerHeight);
                    break;
                default:
                    return
                }
                this.instance.delta.y < 0 && (this.instance.delta.y = 0),
                this.instance.delta.y > this.instance.limit && (this.instance.delta.y = this.instance.limit),
                this.isScrolling = !0,
                this.checkScroll(),
                this.html.classList.add(this.scrollingClass)
            }
        }, {
            key: "checkScroll",
            value: function() {
                var t = this;
                if (this.isScrolling || this.isDraggingScrollbar) {
                    this.hasScrollTicking || (requestAnimationFrame(function() {
                        return t.checkScroll()
                    }),
                    this.hasScrollTicking = !0);
                    var e = Math.abs(this.instance.delta.y - this.instance.scroll.y);
                    (e < .5 && 0 != this.instance.delta.y || e < .5 && 0 == this.instance.delta.y) && this.stopScrolling(),
                    this.updateScroll();
                    for (var i = this.sections.length - 1; 0 <= i; i--)
                        this.sections[i].persistent || this.instance.scroll.y > this.sections[i].offset && this.instance.scroll.y < this.sections[i].limit ? (this.transform(this.sections[i].el, 0, -this.instance.scroll.y),
                        this.sections[i].el.style.visibility = "visible",
                        this.sections[i].inView = !0) : (this.sections[i].el.style.visibility = "hidden",
                        this.sections[i].inView = !1,
                        this.transform(this.sections[i].el, 0, 0));
                    this.getDirection && this.addDirection(),
                    this.getSpeed && (this.addSpeed(),
                    this.timestamp = Date.now()),
                    this.detectElements(),
                    this.transformElements();
                    var n = this.instance.scroll.y / this.instance.limit * this.scrollBarLimit;
                    this.transform(this.scrollbarThumb, 0, n),
                    j(M(s.prototype), "checkScroll", this).call(this),
                    this.hasScrollTicking = !1
                }
            }
        }, {
            key: "checkResize",
            value: function() {
                this.windowHeight = window.innerHeight,
                this.windowMiddle = this.windowHeight / 2,
                this.update()
            }
        }, {
            key: "updateDelta",
            value: function(t) {
                this.instance.delta.y -= t.deltaY,
                this.instance.delta.y < 0 && (this.instance.delta.y = 0),
                this.instance.delta.y > this.instance.limit && (this.instance.delta.y = this.instance.limit)
            }
        }, {
            key: "updateScroll",
            value: function(t) {
                this.isScrolling || this.isDraggingScrollbar ? this.instance.scroll.y = st(this.instance.scroll.y, this.instance.delta.y, this.inertia * this.inertiaRatio) : this.instance.scroll.y = this.instance.delta.y
            }
        }, {
            key: "addDirection",
            value: function() {
                this.instance.delta.y > this.instance.scroll.y ? "down" !== this.instance.direction && (this.instance.direction = "down") : this.instance.delta.y < this.instance.scroll.y && "up" !== this.instance.direction && (this.instance.direction = "up")
            }
        }, {
            key: "addSpeed",
            value: function() {
                this.instance.delta.y != this.instance.scroll.y ? this.instance.speed = (this.instance.delta.y - this.instance.scroll.y) / (Date.now() - this.timestamp) : this.instance.speed = 0
            }
        }, {
            key: "initScrollBar",
            value: function() {
                this.scrollbar = document.createElement("span"),
                this.scrollbarThumb = document.createElement("span"),
                this.scrollbar.classList.add("".concat(this.scrollbarClass)),
                this.scrollbarThumb.classList.add("".concat(this.scrollbarClass, "_thumb")),
                this.scrollbar.append(this.scrollbarThumb),
                document.body.append(this.scrollbar),
                this.scrollbarThumb.style.height = "".concat(window.innerHeight * window.innerHeight / (this.instance.limit + window.innerHeight), "px"),
                this.scrollBarLimit = window.innerHeight - this.scrollbarThumb.getBoundingClientRect().height,
                this.getScrollBar = this.getScrollBar.bind(this),
                this.releaseScrollBar = this.releaseScrollBar.bind(this),
                this.moveScrollBar = this.moveScrollBar.bind(this),
                this.scrollbarThumb.addEventListener("mousedown", this.getScrollBar),
                window.addEventListener("mouseup", this.releaseScrollBar),
                window.addEventListener("mousemove", this.moveScrollBar)
            }
        }, {
            key: "reinitScrollBar",
            value: function() {
                this.scrollbarThumb.style.height = "".concat(window.innerHeight * window.innerHeight / this.instance.limit, "px"),
                this.scrollBarLimit = window.innerHeight - this.scrollbarThumb.getBoundingClientRect().height
            }
        }, {
            key: "destroyScrollBar",
            value: function() {
                this.scrollbarThumb.removeEventListener("mousedown", this.getScrollBar),
                window.removeEventListener("mouseup", this.releaseScrollBar),
                window.removeEventListener("mousemove", this.moveScrollBar),
                this.scrollbar.remove()
            }
        }, {
            key: "getScrollBar",
            value: function(t) {
                this.isDraggingScrollbar = !0,
                this.checkScroll(),
                this.html.classList.remove(this.scrollingClass),
                this.html.classList.add(this.draggingClass)
            }
        }, {
            key: "releaseScrollBar",
            value: function(t) {
                this.isDraggingScrollbar = !1,
                this.html.classList.add(this.scrollingClass),
                this.html.classList.remove(this.draggingClass)
            }
        }, {
            key: "moveScrollBar",
            value: function(e) {
                var i = this;
                !this.isTicking && this.isDraggingScrollbar && (requestAnimationFrame(function() {
                    var t = 100 * e.clientY / window.innerHeight * i.instance.limit / 100;
                    0 < t && t < i.instance.limit && (i.instance.delta.y = t)
                }),
                this.isTicking = !0),
                this.isTicking = !1
            }
        }, {
            key: "addElements",
            value: function() {
                var w = this;
                this.els = [],
                this.parallaxElements = [];
                var k = 0;
                this.sections.forEach(function(t, b) {
                    w.sections[b].el.querySelectorAll("[data-".concat(w.name, "]")).forEach(function(t, e) {
                        var i, n, s = t.dataset[w.name + "Class"] || w.class, o = t.dataset[w.name + "Repeat"], a = t.dataset[w.name + "Call"], r = t.dataset[w.name + "Position"], l = t.dataset[w.name + "Delay"], c = t.dataset[w.name + "Direction"], h = "string" == typeof t.dataset[w.name + "Sticky"], u = !!t.dataset[w.name + "Speed"] && parseFloat(t.dataset[w.name + "Speed"]) / 10, d = "string" == typeof t.dataset[w.name + "Offset"] && t.dataset[w.name + "Offset"].split(","), f = t.dataset[w.name + "Target"];
                        n = void 0 !== f ? document.querySelector("".concat(f)) : t;
                        var p = (i = w.sections[b].inView ? n.getBoundingClientRect().top + w.instance.scroll.y - ot(n).y : n.getBoundingClientRect().top - ot(w.sections[b].el).y - ot(n).y) + n.offsetHeight
                          , v = (p - i) / 2 + i;
                        if (h) {
                            var m = t.getBoundingClientRect().top - i;
                            v = ((p = (i += window.innerHeight) + n.offsetHeight - window.innerHeight - t.offsetHeight - m) - i) / 2 + i
                        }
                        o = "false" != o && (null != o || w.repeat);
                        var y = [0, 0];
                        if (d)
                            for (e = 0; e < d.length; e++)
                                d[e].includes("%") ? y[e] = parseInt(d[e].replace("%", "") * w.windowHeight / 100) : y[e] = parseInt(d[e]);
                        var g = {
                            el: t,
                            id: k,
                            class: s,
                            top: i + y[0],
                            middle: v,
                            bottom: p - y[1],
                            offset: d,
                            repeat: o,
                            inView: !1,
                            call: a,
                            speed: u,
                            delay: l,
                            position: r,
                            target: n,
                            direction: c,
                            sticky: h
                        };
                        k++,
                        w.els.push(g),
                        (!1 !== u || h) && w.parallaxElements.push(g)
                    })
                })
            }
        }, {
            key: "addSections",
            value: function() {
                var r = this;
                this.sections = [];
                var t = this.el.querySelectorAll("[data-".concat(this.name, "-section]"));
                0 === t.length && (t = [this.el]),
                t.forEach(function(t, e) {
                    var i = t.getBoundingClientRect().top - 1.5 * window.innerHeight - ot(t).y
                      , n = i + t.getBoundingClientRect().height + 2 * window.innerHeight
                      , s = "string" == typeof t.dataset[r.name + "Persistent"]
                      , o = !1;
                    r.instance.scroll.y >= i && r.instance.scroll.y <= n && (o = !0);
                    var a = {
                        el: t,
                        offset: i,
                        limit: n,
                        inView: o,
                        persistent: s
                    };
                    r.sections[e] = a
                })
            }
        }, {
            key: "transform",
            value: function(t, e, i, n) {
                var s;
                if (n) {
                    var o = ot(t)
                      , a = st(o.x, e, n)
                      , r = st(o.y, i, n);
                    s = "matrix(1,0,0,1,".concat(a, ",").concat(r, ")")
                } else
                    s = "matrix(1,0,0,1,".concat(e, ",").concat(i, ")");
                t.style.webkitTransform = s,
                t.style.msTransform = s,
                t.style.transform = s
            }
        }, {
            key: "transformElements",
            value: function(n) {
                var s = this
                  , o = this.instance.scroll.y + this.windowHeight
                  , a = this.instance.scroll.y + this.windowMiddle;
                this.parallaxElements.forEach(function(t, e) {
                    var i = !1;
                    if (n && (i = 0),
                    t.inView)
                        switch (t.position) {
                        case "top":
                            i = s.instance.scroll.y * -t.speed;
                            break;
                        case "elementTop":
                            i = (o - t.top) * -t.speed;
                            break;
                        case "bottom":
                            i = (s.instance.limit - o + s.windowHeight) * t.speed;
                            break;
                        default:
                            i = (a - t.middle) * -t.speed
                        }
                    t.sticky && (i = t.inView ? s.instance.scroll.y - t.top + window.innerHeight : s.instance.scroll.y < t.top - window.innerHeight && s.instance.scroll.y < t.top - window.innerHeight / 2 ? 0 : s.instance.scroll.y > t.bottom && s.instance.scroll.y > t.bottom + 100 && t.bottom - t.top + window.innerHeight),
                    !1 !== i && ("horizontal" === t.direction ? s.transform(t.el, i, 0, !n && t.delay) : s.transform(t.el, 0, i, !n && t.delay))
                })
            }
        }, {
            key: "scrollTo",
            value: function(t, e) {
                var i, n = this, s = e ? parseInt(e) : 0;
                if ("string" == typeof t ? "top" === t ? s = 0 : "bottom" === t ? s = this.instance.limit : i = document.querySelectorAll(t)[0] : t.target || (i = t),
                i) {
                    var o = i.getBoundingClientRect().top + this.instance.scroll.y
                      , a = function(t) {
                        for (var e = []; t && t !== document; t = t.parentNode)
                            e.push(t);
                        return e
                    }(i).find(function(e) {
                        return n.sections.find(function(t) {
                            return t.el == e
                        })
                    })
                      , r = 0;
                    a && (r = ot(a).y),
                    s = o + s - r
                }
                s -= this.instance.scroll.y,
                this.instance.delta.y = Math.min(s, this.instance.limit),
                this.inertiaRatio = Math.min(4e3 / Math.abs(this.instance.delta.y - this.instance.scroll.y), .8),
                this.isScrolling = !0,
                this.checkScroll(),
                this.html.classList.add(this.scrollingClass)
            }
        }, {
            key: "update",
            value: function() {
                this.setScrollLimit(),
                this.addSections(),
                this.addElements(),
                this.detectElements(),
                this.updateScroll(),
                this.transformElements(!0)
            }
        }, {
            key: "startScroll",
            value: function() {
                this.stop = !1
            }
        }, {
            key: "stopScroll",
            value: function() {
                this.stop = !0
            }
        }, {
            key: "setScroll",
            value: function(t, e) {
                this.instance = {
                    scroll: {
                        x: t,
                        y: e
                    },
                    delta: {
                        x: t,
                        y: e
                    }
                }
            }
        }, {
            key: "destroy",
            value: function() {
                j(M(s.prototype), "destroy", this).call(this),
                this.stopScrolling(),
                this.html.classList.remove(this.smoothClass),
                this.vs.destroy(),
                this.destroyScrollBar(),
                window.removeEventListener("keydown", this.checkKey, !1)
            }
        }]),
        s
    }()
      , ut = function() {
        function e() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            E(this, e),
            this.options = t,
            Object.assign(this, P, t),
            this.init()
        }
        return C(e, [{
            key: "init",
            value: function() {
                this.smoothMobile || (this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),
                !0 !== this.smooth || this.isMobile ? this.scroll = new I(this.options) : this.scroll = new ht(this.options),
                this.scroll.init(),
                window.location.hash && this.scroll.scrollTo(window.location.hash)
            }
        }, {
            key: "update",
            value: function() {
                this.scroll.update()
            }
        }, {
            key: "start",
            value: function() {
                this.scroll.startScroll()
            }
        }, {
            key: "stop",
            value: function() {
                this.scroll.stopScroll()
            }
        }, {
            key: "scrollTo",
            value: function(t, e) {
                this.scroll.scrollTo(t, e)
            }
        }, {
            key: "setScroll",
            value: function(t, e) {
                this.scroll.setScroll(t, e)
            }
        }, {
            key: "on",
            value: function(t, e) {
                this.scroll.setEvents(t, e)
            }
        }, {
            key: "destroy",
            value: function() {
                this.scroll.destroy()
            }
        }]),
        e
    }()
      , dt = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    function ft(t, e) {
        return t(e = {
            exports: {}
        }, e.exports),
        e.exports
    }
    var pt = ft(function(t, e) {
        t.exports = {
            polyfill: function() {
                var l = window
                  , c = document;
                if (!("scrollBehavior"in c.documentElement.style && !0 !== l.__forceSmoothScrollPolyfill__)) {
                    var t, e = l.HTMLElement || l.Element, a = 468, h = {
                        scroll: l.scroll || l.scrollTo,
                        scrollBy: l.scrollBy,
                        elementScroll: e.prototype.scroll || d,
                        scrollIntoView: e.prototype.scrollIntoView
                    }, u = l.performance && l.performance.now ? l.performance.now.bind(l.performance) : Date.now, i = (t = l.navigator.userAgent,
                    new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(t) ? 1 : 0);
                    l.scroll = l.scrollTo = function() {
                        void 0 !== arguments[0] && (!0 !== n(arguments[0]) ? r.call(l, c.body, void 0 !== arguments[0].left ? ~~arguments[0].left : l.scrollX || l.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : l.scrollY || l.pageYOffset) : h.scroll.call(l, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : l.scrollX || l.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : l.scrollY || l.pageYOffset))
                    }
                    ,
                    l.scrollBy = function() {
                        void 0 !== arguments[0] && (n(arguments[0]) ? h.scrollBy.call(l, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : r.call(l, c.body, ~~arguments[0].left + (l.scrollX || l.pageXOffset), ~~arguments[0].top + (l.scrollY || l.pageYOffset)))
                    }
                    ,
                    e.prototype.scroll = e.prototype.scrollTo = function() {
                        if (void 0 !== arguments[0])
                            if (!0 !== n(arguments[0])) {
                                var t = arguments[0].left
                                  , e = arguments[0].top;
                                r.call(this, this, void 0 === t ? this.scrollLeft : ~~t, void 0 === e ? this.scrollTop : ~~e)
                            } else {
                                if ("number" == typeof arguments[0] && void 0 === arguments[1])
                                    throw new SyntaxError("Value could not be converted");
                                h.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop)
                            }
                    }
                    ,
                    e.prototype.scrollBy = function() {
                        void 0 !== arguments[0] && (!0 !== n(arguments[0]) ? this.scroll({
                            left: ~~arguments[0].left + this.scrollLeft,
                            top: ~~arguments[0].top + this.scrollTop,
                            behavior: arguments[0].behavior
                        }) : h.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop))
                    }
                    ,
                    e.prototype.scrollIntoView = function() {
                        if (!0 !== n(arguments[0])) {
                            var t = function(t) {
                                for (; t !== c.body && !1 === (i = s(e = t, "Y") && o(e, "Y"),
                                n = s(e, "X") && o(e, "X"),
                                i || n); )
                                    t = t.parentNode || t.host;
                                var e, i, n;
                                return t
                            }(this)
                              , e = t.getBoundingClientRect()
                              , i = this.getBoundingClientRect();
                            t !== c.body ? (r.call(this, t, t.scrollLeft + i.left - e.left, t.scrollTop + i.top - e.top),
                            "fixed" !== l.getComputedStyle(t).position && l.scrollBy({
                                left: e.left,
                                top: e.top,
                                behavior: "smooth"
                            })) : l.scrollBy({
                                left: i.left,
                                top: i.top,
                                behavior: "smooth"
                            })
                        } else
                            h.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0])
                    }
                }
                function d(t, e) {
                    this.scrollLeft = t,
                    this.scrollTop = e
                }
                function n(t) {
                    if (null === t || "object" != typeof t || void 0 === t.behavior || "auto" === t.behavior || "instant" === t.behavior)
                        return !0;
                    if ("object" == typeof t && "smooth" === t.behavior)
                        return !1;
                    throw new TypeError("behavior member of ScrollOptions " + t.behavior + " is not a valid value for enumeration ScrollBehavior.")
                }
                function s(t, e) {
                    return "Y" === e ? t.clientHeight + i < t.scrollHeight : "X" === e ? t.clientWidth + i < t.scrollWidth : void 0
                }
                function o(t, e) {
                    var i = l.getComputedStyle(t, null)["overflow" + e];
                    return "auto" === i || "scroll" === i
                }
                function f(t) {
                    var e, i, n, s, o = (u() - t.startTime) / a;
                    s = o = 1 < o ? 1 : o,
                    e = .5 * (1 - Math.cos(Math.PI * s)),
                    i = t.startX + (t.x - t.startX) * e,
                    n = t.startY + (t.y - t.startY) * e,
                    t.method.call(t.scrollable, i, n),
                    i === t.x && n === t.y || l.requestAnimationFrame(f.bind(l, t))
                }
                function r(t, e, i) {
                    var n, s, o, a, r = u();
                    a = t === c.body ? (s = (n = l).scrollX || l.pageXOffset,
                    o = l.scrollY || l.pageYOffset,
                    h.scroll) : (s = (n = t).scrollLeft,
                    o = t.scrollTop,
                    d),
                    f({
                        scrollable: n,
                        method: a,
                        startTime: r,
                        startX: s,
                        startY: o,
                        x: e,
                        y: i
                    })
                }
            }
        }
    })
      , vt = (pt.polyfill,
    function(t) {
        function e(t) {
            return a(this, e),
            m(this, p(e).call(this, t))
        }
        return f(e, o),
        d(e, [{
            key: "init",
            value: function() {
                var s = this;
                pt.polyfill(),
                setTimeout(function() {
                    s.instance,
                    s.newspaperScale = !1,
                    s.newspaperScalePosition = 0,
                    s.newspaperRotate = !1,
                    s.newspaperRotatePosition = 0,
                    s.newspaperIntro = !1,
                    s.newspaperIntroEl = !1,
                    s.newspaperIntroOffset = 1,
                    s.scroll = new ut({
                        el: s.el,
                        smooth: !0
                    }),
                    T.classList.contains("is-mobile") ? s.scroll.on("call", function(t, e, i) {
                        "accents" == t && ("enter" == e ? s.call("play", "Accents") : s.call("stop", "Accents"))
                    }) : (s.scroll.on("scroll", function(t) {
                        s.instance = t,
                        s.newspaperScale && (s.scaleNewspaper(),
                        1 <= s.newspaperScalePosition && s.scaleNewspaper(1)),
                        s.newspaperRotate && (s.rotateNewspaper(),
                        1 <= s.newspaperRotatePosition && s.rotateNewspaper(1)),
                        !0 === s.newspaperIntro && s.animateIntro(),
                        s.fold && s.moveFold()
                    }),
                    s.scroll.on("call", function(t, e, i) {
                        if ("newspaperScale" == t && "enter" == e ? s.newspaperScale = i : "newspaperRotate" == t && "enter" == e && (s.newspaperRotate = i),
                        "newspaperIntro" == t && "enter" == e && (s.newspaperIntroEl = i.el,
                        s.newspaperIntroEl.style.height = s.newspaperIntroEl.offsetHeight + "px"),
                        "newspaper" == t && ("exit" == e ? s.newspaperIntro = "exit" : "exit" == s.newspaperIntro && (s.newspaperIntro = !0)),
                        "fold" == t && (s.fold = "enter" == e && i),
                        "accents" == t && ("enter" == e ? s.call("play", "Accents") : s.call("stop", "Accents")),
                        "section" == t && "enter" == e) {
                            var n = s.getData("sectionid", i.el);
                            s.call("setCurrent", n, "Nav")
                        }
                    }))
                }, 100)
            }
        }, {
            key: "scaleNewspaper",
            value: function(t) {
                this.newspaperScalePosition = t || this.instance.scroll.y / this.newspaperScale.bottom;
                var e = .25 + .75 * this.newspaperScalePosition
                  , i = 25 + 25 * -this.newspaperScalePosition;
                this.newspaperScale.el.style.transform = "translateY(" + i + "vh) scale(" + e + ")",
                t && (this.newspaperScale = !1)
            }
        }, {
            key: "rotateNewspaper",
            value: function(t) {
                this.newspaperRotatePosition = t || this.instance.scroll.y / this.newspaperRotate.bottom;
                var e = 360 * this.newspaperRotatePosition;
                this.newspaperRotate.el.style.transform = "rotate(" + e + "deg)",
                t && (this.newspaperRotate = !1,
                this.newspaperIntroOffset = this.instance.scroll.y,
                this.newspaperIntro = !0)
            }
        }, {
            key: "animateIntro",
            value: function() {
                var t = (this.instance.scroll.y - this.newspaperIntroOffset - 200) / 1.5;
                100 <= t && t <= 900 && (this.newspaperIntroEl.style.fontWeight = t)
            }
        }, {
            key: "moveFold",
            value: function() {
                this.fold.el.style.transform = "translateY(" + translate + "vh)",
                this.fold.el.style.transform = "translateY(" + translate + "vh)"
            }
        }, {
            key: "scrollTo",
            value: function(t) {
                this.scroll.scrollTo(t)
            }
        }, {
            key: "destroy",
            value: function() {
                this.scroll.destroy()
            }
        }]),
        e
    }())
      , mt = function(t) {
        function i(t) {
            var e;
            return a(this, i),
            (e = m(this, p(i).call(this, t))).events = {
                click: "scrollTo"
            },
            e
        }
        return f(i, o),
        d(i, [{
            key: "scrollTo",
            value: function(t) {
                t.preventDefault();
                var e = this.getData("href", t.currentTarget);
                this.call("scrollTo", e, "Scroll"),
                setTimeout(function() {
                    T.classList.remove("has-nav-open")
                }, 300)
            }
        }]),
        i
    }()
      , yt = function(t) {
        function i(t) {
            var e;
            return a(this, i),
            (e = m(this, p(i).call(this, t))).isTicking = !1,
            e.hasMoved = !1,
            T.classList.contains("is-mobile") || document.addEventListener("mousemove", function(t) {
                return e.moveMouse(t)
            }),
            e
        }
        return f(i, o),
        d(i, [{
            key: "moveMouse",
            value: function(t) {
                var e = this;
                this.isTicking || (requestAnimationFrame(function() {
                    e.moveCursor(t)
                }),
                this.isTicking = !0)
            }
        }, {
            key: "moveCursor",
            value: function(t) {
                var e = this.clientX
                  , i = this.clientY;
                this.el.style.transform = "translate(".concat(e, "px, ").concat(i, "px)"),
                this.isTicking = !1,
                this.hasMoved || T.classList.add("has-moved-cursor")
            }
        }]),
        i
    }()
      , gt = function(t) {
        function i(t) {
            var e;
            return a(this, i),
            (e = m(this, p(i).call(this, t))).events = {
                click: {
                    button: "toggleNav",
                    bg: "closeNav",
                    link: "scrollTo"
                }
            },
            e
        }
        return f(i, o),
        d(i, [{
            key: "toggleNav",
            value: function() {
                T.classList.toggle("has-nav-open")
            }
        }, {
            key: "closeNav",
            value: function() {
                T.classList.remove("has-nav-open")
            }
        }, {
            key: "scrollTo",
            value: function(t) {
                t.preventDefault();
                var e = this.getData("id", t.currentTarget);
                this.setCurrent(e),
                this.call("scrollTo", t, "Scrollto")
            }
        }, {
            key: "setCurrent",
            value: function(t) {
                this.$("link.is-current")[0].classList.remove("is-current"),
                this.$('link[data-nav-id="' + t + '"]')[0].classList.add("is-current")
            }
        }]),
        i
    }()
      , bt = function(t) {
        function e(t) {
            return a(this, e),
            m(this, p(e).call(this, t))
        }
        return f(e, o),
        d(e, [{
            key: "init",
            value: function() {
                this.el.style.paddingBottom = this.el.offsetHeight + 200 + "px"
            }
        }]),
        e
    }()
      , wt = function(t) {
        function i(t) {
            var e;
            return a(this, i),
            (e = m(this, p(i).call(this, t))).events = {
                mousemove: "checkMove"
            },
            e
        }
        return f(i, o),
        d(i, [{
            key: "init",
            value: function() {
                this.$wrap = this.$("wrap")[0],
                this.dimension = this.el.getBoundingClientRect(),
                this.left = this.dimension.left,
                this.right = this.dimension.right,
                this.minWeight = 100,
                this.maxWeight = 900,
                this.minSpacing = -.12,
                this.maxSpacing = -.26,
                this.isTicking = !1
            }
        }, {
            key: "checkMove",
            value: function(t) {
                var e = this;
                this.isTicking || (requestAnimationFrame(function() {
                    e.changeNumber(t)
                }),
                this.isTicking = !0)
            }
        }, {
            key: "changeNumber",
            value: function(t) {
                var e = 100 * (t.clientX - this.left) / (this.right - this.left)
                  , i = (this.maxWeight - this.minWeight) * e / 100 + this.minWeight
                  , n = (this.maxSpacing - this.minSpacing) * e / 100 + this.minSpacing;
                this.$wrap.style.fontWeight = i,
                this.$wrap.style.letterSpacing = n + "em",
                this.isTicking = !1
            }
        }]),
        i
    }();
    function kt(t) {
        return Math.floor(Math.random() * Math.floor(t))
    }
    var Tt = function(t) {
        function i(t) {
            var e;
            return a(this, i),
            (e = m(this, p(i).call(this, t))).events = {
                click: {
                    changeBackground: "changeBackground",
                    changeWeight: "changeWeight",
                    changeText: "changeText",
                    random: "random"
                }
            },
            e.current = {
                one: {
                    background: 0,
                    weight: 0,
                    text: 0
                },
                two: {
                    background: 0,
                    weight: 0,
                    text: 0
                }
            },
            e.data = {
                one: {
                    background: ["assets/images/posters/01/01", "assets/images/posters/01/02", "assets/images/posters/01/03", "assets/images/posters/01/04", "assets/images/posters/01/05", "assets/images/posters/01/06", "assets/images/posters/01/07", "assets/images/posters/01/08", "assets/images/posters/01/09", "assets/images/posters/01/10", "assets/images/posters/01/11", "assets/images/posters/01/12", "assets/images/posters/01/13", "assets/images/posters/01/14", "assets/images/posters/01/15", "assets/images/posters/01/16"],
                    weight: [{
                        name: "thin",
                        label: "Thin <span>◊</span>"
                    }, {
                        name: "ultralight",
                        label: "√ Ultralight"
                    }, {
                        name: "light",
                        label: "↘ Light"
                    }, {
                        name: "regular",
                        label: "Regular <span>OO</span>"
                    }, {
                        name: "medium",
                        label: "® Medium"
                    }, {
                        name: "bold",
                        label: "Bold <span>°</span>"
                    }, {
                        name: "ultrabold",
                        label: "† Ultrabold"
                    }, {
                        name: "heavy",
                        label: "Heavy <span>↗</span>"
                    }],
                    text: ["Reliable", "Fast", "Futuristic", "Safe", "Economical", "Clean", "Classic", "Retro", "Adaptable", "Communicative", "Creative", "Dynamic", "Gracious", "Neat", "Powerful", "Practical", "Thoughtful"]
                },
                two: {
                    background: ["assets/images/posters/02/01", "assets/images/posters/02/02", "assets/images/posters/02/03", "assets/images/posters/02/04", "assets/images/posters/02/05", "assets/images/posters/02/06", "assets/images/posters/02/07", "assets/images/posters/02/08", "assets/images/posters/02/09", "assets/images/posters/02/10", "assets/images/posters/02/11", "assets/images/posters/02/12", "assets/images/posters/02/13", "assets/images/posters/02/14", "assets/images/posters/02/15", "assets/images/posters/02/16"],
                    weight: [{
                        name: "thin",
                        label: "Thin"
                    }, {
                        name: "ultralight",
                        label: "Ultralight"
                    }, {
                        name: "light",
                        label: "Light"
                    }, {
                        name: "regular",
                        label: "Regular"
                    }, {
                        name: "medium",
                        label: "Medium"
                    }, {
                        name: "bold",
                        label: "Bold"
                    }, {
                        name: "ultrabold",
                        label: "Ultrabold"
                    }, {
                        name: "heavy",
                        label: "Heavy"
                    }],
                    text: ["THE FUTURE IS NOW", "THIS FONT IS FOREVER", "MORE THAN COOL", "COWABUNGA DUDE", "BE ALL YOU CAN BE", "SIMPLY FONTASTIC", "IGNITE THE FIRE", "I’M LOVING IT", "KING OF THE FONTS", "WRITE THE RAINBOW", "TRY IT & LOVE IT", "WE BUILT IT STRONG", "TAKE IT HOME NOW", "CATCH THE BUZZ!", "LOVE AT FIRST TYPE", "TODAY’S CHARACTERS"]
                }
            },
            e
        }
        return f(i, o),
        d(i, [{
            key: "init",
            value: function() {
                this.id = this.el.dataset.modulePoster,
                this.random()
            }
        }, {
            key: "changeWeight",
            value: function(t) {
                var e = this.data[this.id].weight.length - 1
                  , i = this.current[this.id].weight;
                if (1 == t) {
                    var n = kt(e);
                    if (n == i)
                        return void this.changeWeight();
                    i = n
                } else
                    i < e ? i++ : i = 0;
                var s = this.data[this.id].weight[i].label;
                this.setData("weight", this.data[this.id].weight[i].name, this.$("main")[0]),
                this.$("weight")[0].innerHTML = s,
                this.current[this.id].weight = i
            }
        }, {
            key: "changeText",
            value: function(t) {
                var e = this.data[this.id].text.length - 1
                  , i = this.current[this.id].text;
                if (1 == t) {
                    var n = kt(e);
                    if (n == i)
                        return void this.changeText();
                    i = n
                } else
                    i < e ? i++ : i = 0;
                var s = this.data[this.id].text[i];
                this.$("text").forEach(function(t) {
                    t.innerHTML = s
                }),
                this.current[this.id].text = i
            }
        }, {
            key: "changeBackground",
            value: function(t) {
                var e = this.data[this.id].background.length - 1
                  , i = this.current[this.id].background;
                if (1 == t) {
                    var n = kt(e);
                    if (n == i)
                        return void this.changeBackground();
                    i = n
                } else
                    i < e ? i++ : i = 0;
                var s = this.data[this.id].background[i];
                this.$("imgw")[0].setAttribute("srcset", s + ".webp"),
                this.$("imgj")[0].setAttribute("srcset", s + ".jpg"),
                this.$("img")[0].setAttribute("src", s + ".jpg"),
                this.current[this.id].background = i
            }
        }, {
            key: "random",
            value: function() {
                this.changeBackground(!0),
                this.changeWeight(!0),
                this.changeText(!0)
            }
        }]),
        i
    }()
      , Et = function(t) {
        function i(t) {
            var e;
            return a(this, i),
            (e = m(this, p(i).call(this, t))).events = {
                click: {
                    menuHeader: "toggleMenu",
                    menuItem: "selectFont"
                },
                mouseenter: {
                    char: "changeChar"
                }
            },
            e
        }
        return f(i, o),
        d(i, [{
            key: "toggleMenu",
            value: function() {
                this.el.classList.toggle("has-menu-open")
            }
        }, {
            key: "selectFont",
            value: function(t) {
                var e = t.currentTarget
                  , i = this.getData("id", e);
                this.$("menuHeader")[0].innerHTML = e.innerHTML,
                this.setData("current", i),
                this.el.classList.remove("has-menu-open")
            }
        }, {
            key: "changeChar",
            value: function(t) {
                var e = t.currentTarget;
                this.$("circle")[0].innerHTML = e.innerHTML
            }
        }]),
        i
    }()
      , St = function() {
        function e(t) {
            a(this, e),
            this.mAttr = "data-" + t.dataName,
            this.mCaptureEvents = ["mouseenter", "mouseleave"],
            this.el = t.el
        }
        return d(e, [{
            key: "mInit",
            value: function(t) {
                var e = this;
                this.modules = t,
                this.mCheckEventTarget = this.mCheckEventTarget.bind(this),
                this.events && Object.keys(this.events).forEach(function(t) {
                    return e.mAddEvent(t)
                })
            }
        }, {
            key: "mUpdate",
            value: function(t) {
                this.modules = t
            }
        }, {
            key: "mDestroy",
            value: function() {
                var e = this;
                this.events && Object.keys(this.events).forEach(function(t) {
                    return e.mRemoveEvent(t)
                })
            }
        }, {
            key: "mAddEvent",
            value: function(t) {
                var e = !!this.mCaptureEvents.includes(t);
                this.el.addEventListener(t, this.mCheckEventTarget, e)
            }
        }, {
            key: "mRemoveEvent",
            value: function(t) {
                var e = !!this.mCaptureEvents.includes(t);
                this.el.removeEventListener(t, this.mCheckEventTarget, e)
            }
        }, {
            key: "mCheckEventTarget",
            value: function(t) {
                var e = this.events[t.type];
                if ("string" == typeof e)
                    this[e](t);
                else {
                    var i = "[" + this.mAttr + "]"
                      , n = t.target;
                    if (this.mCaptureEvents.includes(t.type))
                        n.matches(i) && this.mCallEventMethod(t, e, n);
                    else
                        for (; n && n !== document && (!n.matches(i) || "undefined" == this.mCallEventMethod(t, e, n)); )
                            n = n.parentNode
                }
            }
        }, {
            key: "mCallEventMethod",
            value: function(t, e, i) {
                var n = i.getAttribute(this.mAttr);
                if (e.hasOwnProperty(n)) {
                    var s = e[n];
                    Object.defineProperty(t, "currentTarget", {
                        value: i
                    }),
                    Object.defineProperty(t, "curTarget", {
                        value: i
                    }),
                    this[s](t)
                }
            }
        }, {
            key: "$",
            value: function(t, e) {
                var i = [t.indexOf("."), t.indexOf("#"), t.indexOf("[")].filter(function(t) {
                    return -1 != t
                })
                  , n = !1
                  , s = t
                  , o = ""
                  , a = this.el;
                return i.length && (n = Math.min.apply(Math, y(i)),
                s = t.slice(0, n),
                o = t.slice(n)),
                "object" == h(e) && (a = e),
                a.querySelectorAll("[" + this.mAttr + "=" + s + "]" + o)
            }
        }, {
            key: "parent",
            value: function(t, e) {
                for (var i = "[" + this.mAttr + "=" + t + "]", n = e; n && n !== document; ) {
                    if (n.matches(i))
                        return n;
                    n = n.parentNode
                }
            }
        }, {
            key: "getData",
            value: function(t, e) {
                return (e || this.el).getAttribute(this.mAttr + "-" + t)
            }
        }, {
            key: "setData",
            value: function(t, e, i) {
                return (i || this.el).setAttribute(this.mAttr + "-" + t, e)
            }
        }, {
            key: "call",
            value: function(e, i, n, t) {
                var s = this;
                i && !n && (n = i,
                i = !1),
                this.modules[n] && (t ? this.modules[n][t] && this.modules[n][t][e](i) : Object.keys(this.modules[n]).forEach(function(t) {
                    s.modules[n][t][e](i)
                }))
            }
        }, {
            key: "on",
            value: function(e, i, n) {
                var s = this;
                this.modules[i] && Object.keys(this.modules[i]).forEach(function(t) {
                    s.modules[i][t].el.addEventListener(e, function(t) {
                        n(t)
                    }, !1)
                })
            }
        }, {
            key: "init",
            value: function() {}
        }, {
            key: "destroy",
            value: function() {}
        }]),
        e
    }()
      , Ct = function(t) {
        function i(t) {
            var e;
            return a(this, i),
            (e = m(this, p(i).call(this, t))).events = {
                input: {
                    sizeInput: "changeSize",
                    spacingInput: "changeSpacing",
                    heightInput: "changeHeight"
                }
            },
            e.isChanged = !1,
            e.sizeChanged = !1,
            e.heightChanged = !1,
            e
        }
        return f(i, St),
        d(i, [{
            key: "init",
            value: function() {
                var e = this;
                this.$text = this.$("text")[0],
                this.$sizeLabel = this.$("sizeLabel")[0],
                this.$spacingLabel = this.$("spacingLabel")[0],
                this.$heightLabel = this.$("heightLabel")[0],
                this.on("select", "Select", function(t) {
                    e.changeWeight(t.value)
                })
            }
        }, {
            key: "changeWeight",
            value: function(t) {
                this.setData("weight", t, this.$text)
            }
        }, {
            key: "changeSize",
            value: function(t) {
                var e = t.currentTarget.value;
                this.$text.style.fontSize = e + "px",
                this.$sizeLabel.innerHTML = e + "px",
                this.sizeLabel || (this.sizeLabel = !0,
                this.$sizeLabel.classList.add("is-changed"),
                this.setChanged())
            }
        }, {
            key: "changeSpacing",
            value: function(t) {
                var e = t.currentTarget.value;
                this.$text.style.letterSpacing = e + "px",
                this.$spacingLabel.innerHTML = e + "px",
                this.setChanged()
            }
        }, {
            key: "changeHeight",
            value: function(t) {
                var e = t.currentTarget.value;
                this.$text.style.lineHeight = e + "px",
                this.$heightLabel.innerHTML = e + "px",
                this.heightChanged || (this.heightLabel = !0,
                this.$heightLabel.classList.add("is-changed"),
                this.setChanged())
            }
        }, {
            key: "setChanged",
            value: function() {
                this.isChanged || (this.isChanged = !0,
                this.el.classList.add("is-changed"))
            }
        }]),
        i
    }()
      , Lt = function(t) {
        function i(t) {
            var e;
            return a(this, i),
            (e = m(this, p(i).call(this, t))).currentTitle = 0,
            e.titles = ["This font has a <br>bunch of special characters <br>and cool accents.", "Thîş fõnť hås a <br>būŋch of speciąl charactërs <br>ànd çoöl acčenţs.", "Thís fônt haş a <br>büņch of spéciaĺ chāŗacterś <br>ąnd cōol ačcênts.", "Thïs foñt haš a <br>bųńch őf spęciăl charäcŧers <br>and cøol acċeňts."],
            e.maxTitle = e.titles.length - 1,
            e.$title = e.$("title")[0],
            e.interval,
            e
        }
        return f(i, o),
        d(i, [{
            key: "play",
            value: function() {
                var t = this;
                this.interval = setInterval(function() {
                    t.currentTitle == t.maxTitle ? t.currentTitle = 0 : t.currentTitle++,
                    t.$title.innerHTML = t.titles[t.currentTitle]
                }, 750)
            }
        }, {
            key: "stop",
            value: function() {
                clearInterval(this.interval)
            }
        }]),
        i
    }()
      , Ot = function(t) {
        function i(t) {
            var e;
            return a(this, i),
            (e = m(this, p(i).call(this, t))).events = {
                click: "invertColors"
            },
            e
        }
        return f(i, o),
        d(i, [{
            key: "invertColors",
            value: function() {
                T.classList.toggle("is-invert"),
                document.querySelectorAll("[data-invert-src]").forEach(function(t) {
                    var e = t.getAttribute("src")
                      , i = t.dataset.invertSrc;
                    t.setAttribute("src", i),
                    t.setAttribute("data-invert-src", e)
                })
            }
        }]),
        i
    }()
      , Mt = function(t) {
        function i(t) {
            var e;
            return a(this, i),
            e = m(this, p(i).call(this, t)),
            T.classList.contains("is-mobile") && (e.events = {
                click: {
                    item: "openPanel"
                }
            }),
            e
        }
        return f(i, o),
        d(i, [{
            key: "openPanel",
            value: function(t) {
                var e = t.currentTarget
                  , i = this.$("item.is-open")[0];
                i && i.classList.remove("is-open"),
                e.classList.add("is-open")
            }
        }]),
        i
    }()
      , At = function(t) {
        function i(t) {
            var e;
            return a(this, i),
            (e = m(this, p(i).call(this, t))).events = {
                click: {
                    header: "toggleList",
                    item: "selectItem"
                }
            },
            e.selectEvent = new Event("select"),
            e
        }
        return f(i, St),
        d(i, [{
            key: "toggleList",
            value: function() {
                this.el.classList.toggle("is-open")
            }
        }, {
            key: "closeList",
            value: function() {
                this.el.classList.remove("is-open")
            }
        }, {
            key: "selectItem",
            value: function(t) {
                var e = t.currentTarget
                  , i = e.innerHTML
                  , n = this.getData("value", e)
                  , s = this.$("item.is-selected")[0];
                s && s.classList.remove("is-selected"),
                e.classList.add("is-selected"),
                this.$("header")[0].innerHTML = i,
                this.closeList(),
                this.selectEvent.value = n,
                this.el.dispatchEvent(this.selectEvent)
            }
        }]),
        i
    }()
      , xt = Object.freeze({
        __proto__: null,
        Load: k,
        Scroll: vt,
        Scrollto: mt,
        Cursor: yt,
        Nav: gt,
        Newspaper: bt,
        Numbers: wt,
        Poster: Tt,
        FontBook: Et,
        Playground: Ct,
        Accents: Lt,
        Invert: Ot,
        Panels: Mt,
        Select: At
    })
      , Dt = ft(function(t) {
        var e, i;
        e = dt,
        i = function() {
            function m(t, e, i) {
                if (i) {
                    var n = document.createDocumentFragment()
                      , s = !e.hasAttribute("viewBox") && i.getAttribute("viewBox");
                    s && e.setAttribute("viewBox", s);
                    for (var o = i.cloneNode(!0); o.childNodes.length; )
                        n.appendChild(o.firstChild);
                    t.appendChild(n)
                }
            }
            function y(n) {
                n.onreadystatechange = function() {
                    if (4 === n.readyState) {
                        var i = n._cachedDocument;
                        i || ((i = n._cachedDocument = document.implementation.createHTMLDocument("")).body.innerHTML = n.responseText,
                        n._cachedTarget = {}),
                        n._embeds.splice(0).map(function(t) {
                            var e = n._cachedTarget[t.id];
                            e || (e = n._cachedTarget[t.id] = i.getElementById(t.id)),
                            m(t.parent, t.svg, e)
                        })
                    }
                }
                ,
                n.onreadystatechange()
            }
            function g(t) {
                for (var e = t; "svg" !== e.nodeName.toLowerCase() && (e = e.parentNode); )
                    ;
                return e
            }
            return function(t) {
                var h, u = Object(t), e = window.top !== window.self;
                h = "polyfill"in u ? u.polyfill : /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/.test(navigator.userAgent) || (navigator.userAgent.match(/\bEdge\/12\.(\d+)\b/) || [])[1] < 10547 || (navigator.userAgent.match(/\bAppleWebKit\/(\d+)\b/) || [])[1] < 537 || /\bEdge\/.(\d+)\b/.test(navigator.userAgent) && e;
                var d = {}
                  , f = window.requestAnimationFrame || setTimeout
                  , p = document.getElementsByTagName("use")
                  , v = 0;
                h && function t() {
                    for (var e = 0; e < p.length; ) {
                        var i = p[e]
                          , n = i.parentNode
                          , s = g(n)
                          , o = i.getAttribute("xlink:href") || i.getAttribute("href");
                        if (!o && u.attributeName && (o = i.getAttribute(u.attributeName)),
                        s && o) {
                            if (h)
                                if (!u.validate || u.validate(o, s, i)) {
                                    n.removeChild(i);
                                    var a = o.split("#")
                                      , r = a.shift()
                                      , l = a.join("#");
                                    if (r.length) {
                                        var c = d[r];
                                        c || ((c = d[r] = new XMLHttpRequest).open("GET", r),
                                        c.send(),
                                        c._embeds = []),
                                        c._embeds.push({
                                            parent: n,
                                            svg: s,
                                            id: l
                                        }),
                                        y(c)
                                    } else
                                        m(n, s, document.getElementById(l))
                                } else
                                    ++e,
                                    ++v
                        } else
                            ++e
                    }
                    (!p.length || 0 < p.length - v) && f(t, 67)
                }()
            }
        }
        ,
        t.exports ? t.exports = i() : e.svg4everybody = i()
    });
    var jt = new e({
        modules: xt
    });
    setTimeout(function() {
        !function() {
            Dt(),
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && T.classList.add("is-mobile"),
            /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent) && T.classList.add("is-safari"),
            /edge|msie\s|trident\//i.test(navigator.userAgent) && T.classList.add("is-edge"),
            /Firefox/i.test(navigator.userAgent) && T.classList.add("is-firefox");
            var t = 0
              , e = ["YeonHee | Portfolio", "연희 | 포트폴리오", "YeonHee | Portfolio", "연희 | 포트폴리오", "YeonHee | Portfolio"]
              , i = e.length - 1;
            setInterval(function() {
                t == i ? t = 0 : t++,
                document.title = e[t]
            }, 750)
        }(),
        jt.init(jt),
        setTimeout(function() {
            T.classList.add("is-loaded"),
            T.classList.remove("is-loading")
        }, 1800)
    }, 100)
}();

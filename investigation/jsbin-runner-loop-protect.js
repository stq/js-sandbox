!function (a, b) {
    Array.prototype.indexOf || (Array.prototype.indexOf = function (a) {
        "use strict";
        if (null == this)throw new TypeError;
        var b = Object(this), c = b.length >>> 0;
        if (0 === c)return -1;
        var d = 0;
        if (arguments.length > 0 && (d = Number(arguments[1]), d != d ? d = 0 : 0 != d && 1 / 0 != d && d != -1 / 0 && (d = (d > 0 || -1) * Math.floor(Math.abs(d)))), d >= c)return -1;
        for (var e = d >= 0 ? d : Math.max(c - Math.abs(d), 0); c > e; e++)if (e in b && b[e] === a)return e;
        return -1
    }), Error.captureStackTrace = Error.captureStackTrace || function (a) {
        if (Error.prepareStackTrace) {
            var b = {
                isEval: function () {
                    return !1
                }, getFileName: function () {
                    return "filename"
                }, getLineNumber: function () {
                    return 1
                }, getColumnNumber: function () {
                    return 1
                }, getFunctionName: function () {
                    return "functionName"
                }
            };
            a.stack = Error.prepareStackTrace(a, [b, b, b])
        } else a.stack = a.stack || a.name || "Error"
    }, "function" != typeof Array.prototype.reduce && (Array.prototype.reduce = function (a) {
        "use strict";
        if (null === this || "undefined" == typeof this)throw new TypeError("Array.prototype.reduce called on null or undefined");
        if ("function" != typeof a)throw new TypeError(a + " is not a function");
        var b, c, d = Object(this), e = d.length >>> 0, f = !1;
        for (1 < arguments.length && (c = arguments[1], f = !0), b = 0; e > b; ++b)b in d && (f ? c = a(c, d[b], b, d) : (c = d[b], f = !0));
        if (!f)throw new TypeError("Reduce of empty array with no initial value");
        return c
    }), Array.prototype.forEach || (Array.prototype.forEach = function (a, b) {
        var c, d;
        if (null == this)throw new TypeError(" this is null or not defined");
        var e = Object(this), f = e.length >>> 0;
        if ("[object Function]" != {}.toString.call(a))throw new TypeError(a + " is not a function");
        for (b && (c = b), d = 0; f > d;) {
            var g;
            d in e && (g = e[d], a.call(c, g, d, e)), d++
        }
    }), "".trim || (String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "")
    }), Object.prototype.hasOwnProperty || (Object.prototype.hasOwnProperty = function (a) {
        var b = obj.__proto__ || obj.constructor.prototype;
        return a in this && (!(a in b) || b[a] !== this[a])
    }), Date.now || (Date.now = function () {
        return +new Date
    }), function () {
        for (var b = 0, c = ["ms", "moz", "webkit", "o"], d = 0; d < c.length && !a.requestAnimationFrame; ++d)a.requestAnimationFrame = a[c[d] + "RequestAnimationFrame"], a.cancelAnimationFrame = a[c[d] + "CancelAnimationFrame"] || a[c[d] + "CancelRequestAnimationFrame"];
        a.requestAnimationFrame || (a.requestAnimationFrame = function (c) {
            var d = Date.now(), e = Math.max(0, 16 - (d - b)), f = a.setTimeout(function () {
                c(d + e)
            }, e);
            return b = d + e, f
        }), a.cancelAnimationFrame || (a.cancelAnimationFrame = function (a) {
            clearTimeout(a)
        })
    }(), function () {
        function a() {
        }

        var b = [].slice;
        Function.prototype.bind || (Function.prototype.bind = function (c) {
            var d = this;
            if ("function" != typeof d)throw new TypeError("Function.prototype.bind called on incompatible " + d);
            var e = b.call(arguments, 1), f = function () {
                if (this instanceof f) {
                    var a = d.apply(this, e.concat(b.call(arguments)));
                    return Object(a) === a ? a : this
                }
                return d.apply(c, e.concat(b.call(arguments)))
            };
            return d.prototype && (a.prototype = d.prototype, f.prototype = new a, a.prototype = null), f
        })
    }(), Object.keys || (Object.keys = function () {
        "use strict";
        var a = Object.prototype.hasOwnProperty, b = !{toString: null}.propertyIsEnumerable("toString"), c = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], d = c.length;
        return function (e) {
            if ("object" != typeof e && ("function" != typeof e || null === e))throw new TypeError("Object.keys called on non-object");
            var f, g, h = [];
            for (f in e)a.call(e, f) && h.push(f);
            if (b)for (g = 0; d > g; g++)a.call(e, c[g]) && h.push(c[g]);
            return h
        }
    }()), Array.prototype.map || (Array.prototype.map = function (a) {
        "use strict";
        if (void 0 === this || null === this)throw new TypeError;
        var b = Object(this), c = b.length >>> 0;
        if ("function" != typeof a)throw new TypeError;
        for (var d = new Array(c), e = arguments.length >= 2 ? arguments[1] : void 0, f = 0; c > f; f++)f in b && (d[f] = a.call(e, b[f], f, b));
        return d
    });
    var c = function () {
        var a = function (a, b) {
            return a.toLowerCase() < b.toLowerCase() ? -1 : 1
        }, b = function (a) {
            return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        };
        return function c(d, e, f) {
            var g, h, i = "", j = [];
            if (f = f || "", e = e || [], null === d)return "null";
            if ("undefined" == typeof d)return "undefined";
            try {
                i = {}.toString.call(d)
            } catch (k) {
                i = "[object Object]"
            }
            if ("[object Number]" == i)return "" + d;
            if ("[object Boolean]" == i)return d ? "true" : "false";
            if ("[object Function]" == i)return d.toString().split("\n  ").join("\n" + f);
            if ("[object String]" == i)return '"' + b(d.replace(/"/g, '\\"')) + '"';
            for (h = 0; h < e.length; h++)if (d === e[h])return "[circular " + i.slice(1) + ("outerHTML"in d ? " :\n" + b(d.outerHTML).split("\n").join("\n" + f) : "");
            if (e.push(d), "[object Array]" == i) {
                for (g = 0; g < d.length; g++)j.push(c(d[g], e));
                return "[" + j.join(", ") + "]"
            }
            if (i.match(/Array/))return i;
            var l = i + " ", m = f + "  ";
            if (f.length / 2 < 2) {
                var n = [];
                try {
                    for (g in d)n.push(g)
                } catch (k) {
                }
                for (n.sort(a), g = 0; g < n.length; g++)try {
                    j.push(m + n[g] + ": " + c(d[n[g]], e, m))
                } catch (k) {
                }
            }
            return j.length ? l + "{\n" + j.join(",\n") + "\n" + f + "}" : l + "{ ... }"
        }
    }(), d = function (a, b) {
        a.insertBefore(b, a.firstChild)
    }, e = function (b, c, d) {
        b.addEventListener ? b.addEventListener(c, d, !1) : b.attachEvent("on" + c, function () {
            return d.call(b, a.event)
        })
    };
    a.location.origin || (a.location.origin = a.location.protocol + "//" + a.location.host);
    var f = function (a, b) {
        var c = function () {
            var d = this, e = arguments;
            c.cancel(), c.timer = setTimeout(function () {
                a.apply(d, e)
            }, b)
        };
        return c.cancel = function () {
            clearTimeout(c.timer)
        }, c
    }, g = function (a) {
        return a.contentWindow || a.contentDocument.parentWindow
    };
    !function (a, b) {
        "use strict";
        "function" == typeof define && define.amd ? define(b(a)) : "object" == typeof exports ? module.exports = b(a) : a.loopProtect = b(a)
    }(this, function (a) {
        "use strict";
        function b(a, b) {
            if (0 === a)return !1;
            var c = a, d = 1, e = -1, f = -1;
            do if (c -= 1, e = b[c].indexOf("*/"), f = b[c].indexOf("/*"), -1 !== e && d++, -1 !== f && (d--, 0 === d))return !0; while (0 !== c);
            return !1
        }

        function c(a, b) {
            for (var c; --a > -1;) {
                if (c = b.substr(a, 1), '"' === c || "'" === c || "." === c)return !0;
                if (("/" === c || "*" === c) && (--a, "/" === c))return !0
            }
            return !1
        }

        function d(a, b, c) {
            g.lastIndex = 0, h.lastIndex = 0;
            var d = !1, e = c.slice(b).join("\n").substr(a).replace(h, "");
            return e.replace(g, function (a, b, c) {
                var f = e.substr(0, c).replace(i, "").trim();
                0 === f.length && (d = !0)
            }), d
        }

        var e = null, f = /\b(for|while|do)\b/g, g = /\b(for|while|do)\b/, h = /\b([a-z_]{1}\w+:)/i, i = /(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, j = {};
        return j.counters = {}, j.debug = function (a) {
            e = a ? function () {
                console.log.apply(console, [].slice.apply(arguments))
            } : function () {
            }
        }, j.debug(!1), j.method = "window.runnerWindow.protect", j.rewriteLoops = function (a, e) {
            function g(a, b, c) {
                return b.slice(0, c) + ";" + m + "({ line: " + a + ", reset: true }); " + b.slice(c)
            }

            var i = [], k = a.split("\n"), l = !1, m = j.method, n = {}, o = {}, p = null;
            return e || (e = 0), k.forEach(function (a, j) {
                if (f.lastIndex = 0, h.lastIndex = 0, !l) {
                    -1 !== a.toLowerCase().indexOf("noprotect") && (l = !0);
                    var q = -1, r = -1, s = j, t = j - e + 1, u = "", v = !1, w = !1, x = !1, y = a.match(f) || [], z = y.length ? y[0] : "", A = a.match(h) || [], B = 0, C = 0;
                    if (A.length && (q = a.indexOf(A[1]), c(q, a) || b(j, k) || d(q, j, k) && (p = j)), !n[j]) {
                        if (o[j])return void i.push(a);
                        if (z && 1 === y.length && -1 === a.indexOf("jsbin")) {
                            if (v = "do" === z, r = q = a.indexOf(z), c(q, a))return void i.push(a);
                            if (b(j, k))return void i.push(a);
                            for (q = a.indexOf(z) + z.length, q === a.length && q === a.length && j < k.length - 1 && (i.push(a), j++, a = k[j], n[j] = !0, q = 0); q < a.length;) {
                                if (u = a.substr(q, 1), "(" === u && B++, ")" === u && (B--, 0 === B && x === !1 && (x = q)), "{" === u && C++, "}" === u && C--, 0 === B && (";" === u || "{" === u)) {
                                    if (";" === u)j !== s ? (i[s] = i[s].substring(0, x + 1) + "{\nif (" + m + "({ line: " + t + " })) break;\n" + i[s].substring(x + 1), a += "\n}\n") : a = a.substring(0, x + 1) + "{\nif (" + m + "({ line: " + t + " })) break;\n" + a.substring(x + 1) + "\n}\n"; else if ("{" === u) {
                                        var D = ";\nif (" + m + "({ line: " + t + " })) break;\n";
                                        a = a.substring(0, q + 1) + D + a.substring(q + 1), q += D.length
                                    }
                                    if (j === s && null === p ? (a = g(t, a, r), q += (";" + m + "({ line: " + j + ", reset: true }); ").length) : null === p ? i[s] = g(t, i[s], r) : (void 0 === i[p] && (p--, r = 0), i[p] = g(t, i[p], r), p = null), i.push(a), v) {
                                        for (w = !1; q < a.length;) {
                                            if (u = a.substr(q, 1), "{" === u && C++, "}" === u && C--, w = 0 === C ? !0 : !1, w && -1 !== a.indexOf("while"))return void(o[j] = !0);
                                            q++, q === a.length && j < k.length - 1 && (j++, a = k[j], q = 0)
                                        }
                                        return
                                    }
                                    return
                                }
                                q++, q === a.length && j < k.length - 1 && (i.push(a), j++, a = k[j], n[j] = !0, q = 0)
                            }
                        } else i.push(a)
                    }
                }
            }), l ? a : i.join("\n")
        }, j.protect = function (a) {
            j.counters[a.line] = j.counters[a.line] || {};
            var b = j.counters[a.line], c = (new Date).getTime();
            return a.reset && (b.time = c, b.hit = 0, b.last = 0), b.hit++, c - b.time > 100 ? (j.hit(a.line), !0) : (b.last++, !1)
        }, j.hit = function (b) {
            var c = "Exiting potential infinite loop at line " + b + '. To disable loop protection: add "// noprotect" to your code';
            a.proxyConsole ? a.proxyConsole.error(c) : console.error(c)
        }, j.reset = function () {
            j.counters = {}
        }, j
    });
    var h = function () {
        "use strict";
        var b = !0;
        try {
            a.console.log("d[ o_0 ]b")
        } catch (d) {
            b = !1
        }
        var e = function () {
        }, f = function (a) {
            for (var b, d = [], e = 0, f = a.length; f > e; e++)b = a[e], d.push("undefined" == typeof b ? "undefined" : c(b));
            return d
        }, g = e.prototype.methods = ["debug", "clear", "error", "info", "log", "warn", "dir", "props", "_raw", "group", "groupEnd", "dirxml", "table", "trace", "assert", "count", "markTimeline", "profile", "profileEnd", "time", "timeEnd", "timeStamp", "groupCollapsed"];
        return g.forEach(function (b) {
            e.prototype[b] = function () {
                var c = [].slice.call(arguments), d = f(c);
                k.postMessage("console", {
                    method: "_raw" === b ? c.shift() : b,
                    args: "_raw" === b ? d.slice(1) : d
                }), a.console && (console[b] || (b = "log"), a.console && "_raw" !== b && ("clear" !== b || "clear" === b && console.clear) && console[b].apply(console, c))
            }
        }), new e
    }(), i = function () {
        var a = {};
        return a.blockingMethods = {
            kill: "<script>try{window.open=function(){};window.print=function(){};window.alert=function(){};window.prompt=function(){};window.confirm=function(){};}catch(e){}</script>",
            restore: "<!--jsbin live harness--><script>try{delete window.print;delete window.alert;delete window.prompt;delete window.confirm;delete window.open;}catch(e){}</script>"
        }, a.getDoctype = function () {
            var a = /<!doctype [\s\S]*?>/i;
            return function (b) {
                var c = (b.match(a) || [""])[0], d = b.substr(c.length);
                return {doctype: c, tail: d}
            }
        }(), a.debug = function (a) {
            return "<pre>" + a.replace(/[<>&]/g, function (a) {
                    return "<" == a ? "&lt;" : ">" == a ? "&gt;" : "&" == a ? "&amp;" : void 0
                }) + "</pre>"
        }, a.render = function (b, c) {
            c = c || [], b = b || "";
            var d = [], e = c.requested !== !0, f = c.includeJsInRealtime === !1;
            e && f && (b = b.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")), b = b.replace(/(<.*?\s)(autofocus)/g, "$1");
            var g = a.getDoctype(b), h = g.doctype;
            return b = g.tail, d.push(h), e && c.includeJsInRealtime && d.push(a.blockingMethods.kill), d.push(b), e && c.includeJsInRealtime && d.push(a.blockingMethods.restore), c.debug ? a.debug(d.join("\n")) : d.join("\n")
        }, a
    }();
    "undefined" != typeof exports && (module.exports = i);
    var j = function () {
        var a = {};
        return a.target = null, a.old = null, a.active = null, a.guid = +new Date, a.create = function () {
            var c = b.createElement("iframe");
            return c.setAttribute("sandbox", "allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts"), c.setAttribute("frameBorder", "0"), c.setAttribute("name", "JS Bin Output "), c.id = a.guid++, c
        }, a.use = function (b, c) {
            if (!a.target)throw new Error("Sandbox has no target element.");
            a.old = a.active;
            a.saveState(a.old);
            a.active = b, d(a.target, b), setTimeout(function () {
                c && c();
                for (var b, d = a.target.getElementsByTagName("iframe"), e = d.length, f = 0, g = a.active.id; b = d[f], e > f; f++)b.id !== g && (b.parentNode.removeChild(b), e--)
            }, 0)
        }, a.restoreState = function (a, b) {
            if (!a)return {};
            var c = g(a);
            return c ? void(b.scroll && c.scrollTo(b.scroll.x, b.scroll.y)) : {}
        }, a.saveState = function (a) {
            if (!a)return {};
            var b = g(a);
            return b ? {scroll: {x: b.scrollX, y: b.scrollY}} : {}
        }, a.wrap = function (b, c) {
            b && (c = c || {}, e(b, "resize", f(function () {
                k.postMessage("resize", a.getSizeProperties(b))
            }, 25)), k.postMessage("resize", a.getSizeProperties(b)), e(b, "focus", function () {
                k.postMessage("focus")
            }))
        }, a.getSizeProperties = function (a) {
            return {
                width: a.innerWidth || a.document.documentElement.clientWidth,
                height: a.innerHeight || a.document.documentElement.clientHeight,
                offsetWidth: a.document.documentElement.offsetWidth,
                offsetHeight: a.document.documentElement.offsetHeight
            }
        }, a.eval = function (b) {
            if (!a.active)throw new Error("sandbox.eval: has no active iframe.");
            var c = /(^.|\b)console\.(\S+)/g;
            if (c.test(b)) {
                var d = "window.runnerWindow.proxyConsole.";
                b = b.replace(c, function (a, b, c) {
                    return d + c
                })
            }
            var e = a.active.contentWindow, f = null, g = "log";
            try {
                f = e.eval(b)
            } catch (i) {
                f = i.message, g = "error"
            }
            return h[g](f)
        }, a.injectScript = function (b, c) {
            if (!a.active)throw new Error("sandbox.injectScript: has no active iframe.");
            var d = a.active.contentWindow, e = d.document, f = e.createElement("script");
            f.src = b, f.onload = function () {
                c()
            }, f.onerror = function () {
                c('Failed to load "' + b + '"')
            }, e.body.appendChild(f)
        }, a.injectDOM = function (b, c) {
            if (!a.active)throw new Error("sandbox.injectDOM: has no active iframe.");
            var d = a.active.contentWindow, e = d.document;
            try {
                e.body.innerHTML = b
            } catch (f) {
                c("Failed to load DOM.")
            }
            c()
        }, a
    }(), k = function () {
        "use strict";
        var b = {};
        return loopProtect.hit = function (a) {
            console.warn("Exiting potential infinite loop at line " + a + '. To disable loop protection: add "// noprotect" to your code'), b.postMessage("loopProtectHit", a)
        }, b.parent = {}, b.parent.origin = "*", b.error = function () {
            var b = ["Runner:"].concat([].slice.call(arguments));
            return "console"in a ? void a.console.error.apply(console, b) : alert(b.join(" "))
        }, b.handleMessage = function (a) {
            if (a.origin) {
                var c = a.data;
                try {
                    c = JSON.parse(a.data)
                } catch (d) {
                    return b.error("Error parsing event data:", d.message)
                }
                if ("function" != typeof b[c.type])return b.error("No matching event handler:", c.type);
                b.parent.source = a.source;
                try {
                    b[c.type](c.data)
                } catch (d) {
                    b.error(d.message)
                }
            }
        }, b.postMessage = function (a, c) {
            return b.parent.source ? void b.parent.source.postMessage(JSON.stringify({
                type: a,
                data: c
            }), b.parent.origin) : b.error("No postMessage connection to parent window.")
        }, b.render = function (a) {
            var c = j.create(a.options);
            j.use(c, function () {
                var d = c.contentDocument, e = g(c);
                d || (d = e.document), h.methods.forEach(function (a) {
                    delete h[a]
                });
                var f = i.render(a.source, a.options);
                d.open(), d.write(""), e.runnerWindow = {
                    proxyConsole: h,
                    protect: loopProtect.protect
                }, e.console = h, loopProtect.reset(), e.onerror = function (a, b, c, d, e) {
                    h._raw("error", e && e.stack ? e.stack : a + " (line " + c + ")")
                }, d.write(f), d.close(), b.postMessage("complete"), j.wrap(e, a.options)
            })
        }, b["console:run"] = function (a) {
            j.eval(a)
        }, b["console:load:script"] = function (a) {
            j.injectScript(a, function (c) {
                return c ? b.postMessage("console:load:script:error", c) : void b.postMessage("console:load:script:success", a)
            })
        }, b["console:load:dom"] = function (a) {
            j.injectDOM(a, function (a) {
                return a ? b.postMessage("console:load:dom:error", a) : void b.postMessage("console:load:dom:success")
            })
        }, b
    }();
    a.onload = function () {
        if (!a.postMessage) {
            var c = b.createElement("iframe");
            return c.setAttribute("sandbox", "allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts"), c.setAttribute("frameBorder", "0"), b.body.appendChild(c), void(c.src = a.name)
        }
        j.target = b.getElementById("sandbox-wrapper"), e(a, "message", k.handleMessage)
    }
}(window, document);
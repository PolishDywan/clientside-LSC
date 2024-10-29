(function(e) {
    function t(t) {
        for(var r, c, u = t[0], i = t[1], s = t[2], f = 0, p = []; f < u.length; f++)c = u[f], Object.prototype.hasOwnProperty.call(o, c) && o[c] && p.push(o[c][0]), o[c] = 0;
        for(r in i)Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r]);
        l && l(t);
        while(p.length)p.shift()();
        return a.push.apply(a, s || []), n();
    }
    function n() {
        for(var e, t = 0; t < a.length; t++){
            for(var n = a[t], r = !0, u = 1; u < n.length; u++){
                var i = n[u];
                0 !== o[i] && (r = !1);
            }
            r && (a.splice(t--, 1), e = c(c.s = n[0]));
        }
        return e;
    }
    var r = {}, o = {
        app: 0
    }, a = [];
    function c(t) {
        if (r[t]) return r[t].exports;
        var n = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, c), n.l = !0, n.exports;
    }
    c.m = e, c.c = r, c.d = function(e, t, n) {
        c.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        });
    }, c.r = function(e) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, c.t = function(e, t) {
        if (1 & t && (e = c(e)), 8 & t) return e;
        if (4 & t && "object" === typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (c.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for(var r in e)c.d(n, r, (function(t) {
            return e[t];
        }).bind(null, r));
        return n;
    }, c.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e["default"];
        } : function() {
            return e;
        };
        return c.d(t, "a", t), t;
    }, c.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, c.p = "/";
    var u = window["webpackJsonp"] = window["webpackJsonp"] || [], i = u.push.bind(u);
    u.push = t, u = u.slice();
    for(var s = 0; s < u.length; s++)t(u[s]);
    var l = i;
    a.push([
        0,
        "chunk-vendors"
    ]), n();
})({
    0: function(e, t, n) {
        e.exports = n("56d7");
    },
    "0e21": function(e, t, n) {},
    "225f": function(e, t, n) {},
    "43f7": function(e, t, n) {
        "use strict";
        n("ab55");
    },
    "56d7": function(e, t, n) {
        "use strict";
        n.r(t);
        n("e260"), n("e6cf"), n("cca6"), n("a79d");
        var r = n("7a23");
        function o(e, t, n, o, a, c) {
            var u = Object(r["t"])("Hud"), i = Object(r["t"])("q-responsive");
            return Object(r["o"])(), Object(r["e"])(i, {
                ratio: 1
            }, {
                default: Object(r["v"])(function() {
                    return [
                        Object(r["g"])(u)
                    ];
                }),
                _: 1
            });
        }
        var a = n("b3fe"), c = Object(r["x"])("data-v-15e92907");
        Object(r["q"])("data-v-15e92907");
        var u = {
            class: "hud"
        }, i = {
            class: "hp"
        }, s = Object(r["g"])("span", {
            class: "material-icons"
        }, " favorite ", -1), l = Object(r["g"])("span", {
            class: "material-icons"
        }, " shield ", -1), f = Object(r["g"])("img", {
            src: "https://cdn.discordapp.com/attachments/830844810562240523/863857782787538984/unknown.png"
        }, null, -1);
        Object(r["p"])();
        var p = c(function(e, t, n, o, a, p) {
            var d = Object(r["t"])("q-circular-progress"), b = Object(r["t"])("q-avatar"), v = Object(r["t"])("q-chip");
            return Object(r["o"])(), Object(r["e"])("div", u, [
                Object(r["g"])("div", i, [
                    Object(r["g"])(d, {
                        "show-value": "",
                        "font-size": "20px",
                        class: "q-ma-md",
                        value: a.Health,
                        size: "80px",
                        thickness: .25,
                        color: "red",
                        "track-color": "grey-3"
                    }, {
                        default: c(function() {
                            return [
                                s
                            ];
                        }),
                        _: 1
                    }, 8, [
                        "value",
                        "thickness"
                    ]),
                    Object(r["g"])(d, {
                        "show-value": "",
                        "font-size": "20px",
                        class: "q-ma-md",
                        value: a.Armor,
                        size: "80px",
                        thickness: .25,
                        color: "blue",
                        "track-color": "grey-3"
                    }, {
                        default: c(function() {
                            return [
                                l
                            ];
                        }),
                        _: 1
                    }, 8, [
                        "value",
                        "thickness"
                    ]),
                    Object(r["g"])(v, {
                        id: "CharacterName",
                        size: "lg"
                    }, {
                        default: c(function() {
                            return [
                                Object(r["g"])(b, null, {
                                    default: c(function() {
                                        return [
                                            f
                                        ];
                                    }),
                                    _: 1
                                }),
                                Object(r["f"])(" " + Object(r["u"])(a.CharacterName), 1)
                            ];
                        }),
                        _: 1
                    })
                ])
            ]);
        }), d = {
            name: "Hud",
            data: function() {
                return {
                    Health: 80,
                    Armor: 60,
                    CharacterName: "Morgan Fox"
                };
            }
        }, b = (n("f057"), n("58ea")), v = n("b047"), h = n("cb32"), O = n("93dc"), j = n.n(O);
        d.render = p, d.__scopeId = "data-v-15e92907";
        var g = d;
        j()(d, "components", {
            QCircularProgress: b["a"],
            QChip: v["a"],
            QAvatar: h["a"]
        });
        var m = {
            name: "App",
            components: {
                Hud: g
            },
            mounted: function() {
                "alt" in window && alt.on("Notify", this.Notify), console.log("Test"), this.showNotif();
            },
            methods: {
                Notify: function(e) {
                    console.log(e);
                    var t = Object(a["a"])();
                    t.notify(JSON.parse(e));
                }
            }
        }, y = (n("43f7"), n("0e51"));
        m.render = o;
        var w = m;
        j()(m, "components", {
            QResponsive: y["a"]
        });
        var _ = n("b05d"), x = (n("0e21"), n("7d6e"), n("e54f"), n("2a19")), k = {
            config: {},
            plugins: {
                Notify: x["a"]
            }
        };
        Object(r["d"])(w).use(_["a"], k).mount("#app");
    },
    ab55: function(e, t, n) {},
    f057: function(e, t, n) {
        "use strict";
        n("225f");
    }
}); //# sourceMappingURL=app.6b484c5f.js.map

var app = function () {
    "use strict";

    function t() {}

    function e(t) {
        return t()
    }

    function n() {
        return Object.create(null)
    }

    function o(t) {
        t.forEach(e)
    }

    function s(t) {
        return "function" == typeof t
    }

    function l(t, e) {
        return t != t ? e == e : t !== e || t && "object" == typeof t || "function" == typeof t
    }

    function r(t, e, n, o) {
        return t[1] && o ? function (t, e) {
            for (const n in e) t[n] = e[n];
            return t
        }(n.ctx.slice(), t[1](o(e))) : n.ctx
    }

    function i(t, e) {
        t.appendChild(e)
    }

    function a(t, e, n) {
        t.insertBefore(e, n || null)
    }

    function c(t) {
        t.parentNode.removeChild(t)
    }

    function u(t) {
        return document.createElement(t)
    }

    function d(t) {
        return document.createTextNode(t)
    }

    function f() {
        return d(" ")
    }

    function p(t, e, n, o) {
        return t.addEventListener(e, n, o), () => t.removeEventListener(e, n, o)
    }

    function v(t, e, n) {
        null == n ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n)
    }

    function m(t, e) {
        t.value = null == e ? "" : e
    }

    function $(t, e, n, o) {
        null === n ? t.style.removeProperty(e) : t.style.setProperty(e, n, o ? "important" : "")
    }

    function g(t, e, n) {
        t.classList[n ? "add" : "remove"](e)
    }
    let h;

    function y(t) {
        h = t
    }

    function b(t) {
        (function () {
            if (!h) throw new Error("Function called outside component initialization");
            return h
        })().$$.on_mount.push(t)
    }

    function x(t, e) {
        const n = t.$$.callbacks[e.type];
        n && n.slice().forEach((t => t.call(this, e)))
    }
    const k = [],
        w = [],
        _ = [],
        L = [],
        T = Promise.resolve();
    let E = !1;

    function j(t) {
        _.push(t)
    }

    function N(t) {
        L.push(t)
    }
    const M = new Set;
    let S = 0;

    function C() {
        const t = h;
        do {
            for (; S < k.length;) {
                const t = k[S];
                S++, y(t), A(t.$$)
            }
            for (y(null), k.length = 0, S = 0; w.length;) w.pop()();
            for (let t = 0; t < _.length; t += 1) {
                const e = _[t];
                M.has(e) || (M.add(e), e())
            }
            _.length = 0
        } while (k.length);
        for (; L.length;) L.pop()();
        E = !1, M.clear(), y(t)
    }

    function A(t) {
        if (null !== t.fragment) {
            t.update(), o(t.before_update);
            const e = t.dirty;
            t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(j)
        }
    }
    const q = new Set;

    function H(t, e) {
        t && t.i && (q.delete(t), t.i(e))
    }

    function O(t, e, n, o) {
        if (t && t.o) {
            if (q.has(t)) return;
            q.add(t), undefined.c.push((() => {
                q.delete(t), o && (n && t.d(1), o())
            })), t.o(e)
        } else o && o()
    }

    function B(t, e, n) {
        const o = t.$$.props[e];
        void 0 !== o && (t.$$.bound[o] = n, n(t.$$.ctx[o]))
    }

    function z(t) {
        t && t.c()
    }

    function P(t, n, l, r) {
        const {
            fragment: i,
            after_update: a
        } = t.$$;
        i && i.m(n, l), r || j((() => {
            const n = t.$$.on_mount.map(e).filter(s);
            t.$$.on_destroy ? t.$$.on_destroy.push(...n) : o(n), t.$$.on_mount = []
        })), a.forEach(j)
    }

    function F(t, e) {
        const n = t.$$;
        null !== n.fragment && (o(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = [])
    }

    function V(t, e) {
        -1 === t.$$.dirty[0] && (k.push(t), E || (E = !0, T.then(C)), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31
    }

    function D(e, s, l, r, i, a, u, d = [-1]) {
        const f = h;
        y(e);
        const p = e.$$ = {
            fragment: null,
            ctx: [],
            props: a,
            update: t,
            not_equal: i,
            bound: n(),
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(s.context || (f ? f.$$.context : [])),
            callbacks: n(),
            dirty: d,
            skip_bound: !1,
            root: s.target || f.$$.root
        };
        u && u(p.root);
        let v = !1;
        if (p.ctx = l ? l(e, s.props || {}, ((t, n, ...o) => {
                const s = o.length ? o[0] : n;
                return p.ctx && i(p.ctx[t], p.ctx[t] = s) && (!p.skip_bound && p.bound[t] && p.bound[t](s), v && V(e, t)), n
            })) : [], p.update(), v = !0, o(p.before_update), p.fragment = !!r && r(p.ctx), s.target) {
            if (s.hydrate) {
                const t = function (t) {
                    return Array.from(t.childNodes)
                }(s.target);
                p.fragment && p.fragment.l(t), t.forEach(c)
            } else p.fragment && p.fragment.c();
            s.intro && H(e.$$.fragment), P(e, s.target, s.anchor, s.customElement), C()
        }
        y(f)
    }
    class G {
        $destroy() {
            F(this, 1), this.$destroy = t
        }
        $on(e, n) {
            if (!s(n)) return t;
            const o = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
            return o.push(n), () => {
                const t = o.indexOf(n); - 1 !== t && o.splice(t, 1)
            }
        }
        $set(t) {
            var e;
            this.$$set && (e = t, 0 !== Object.keys(e).length) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1)
        }
    }
    const K = t => {
        if (!t) return "";
        let e = "",
            n = Object.keys(t),
            o = Object.values(t);
        return n.forEach(((t, n) => {
            e += `${t}: ${o[n]};`
        })), e.trim()
    };

    function R(t) {
        let e, n, s, l, i;
        const d = t[5].default,
            f = function (t, e, n, o) {
                if (t) {
                    const s = r(t, e, n, o);
                    return t[0](s)
                }
            }(d, t, t[4], null);
        return {
            c() {
                e = u("button"), f && f.c(), v(e, "style", n = "--hover-bgc: " + t[2] + "; --hover-color: " + t[3] + "; " + K(t[1])), v(e, "type", t[0]), v(e, "class", "svelte-4u6epk"), g(e, "hover-bgc", t[2]), g(e, "hover-color", t[3])
            },
            m(n, o) {
                a(n, e, o), f && f.m(e, null), s = !0, l || (i = [p(e, "click", t[6]), p(e, "focus", t[7]), p(e, "submit", t[8])], l = !0)
            },
            p(t, [o]) {
                f && f.p && (!s || 16 & o) && function (t, e, n, o, s, l) {
                    if (s) {
                        const i = r(e, n, o, l);
                        t.p(i, s)
                    }
                }(f, d, t, t[4], s ? function (t, e, n, o) {
                    if (t[2] && o) {
                        const s = t[2](o(n));
                        if (void 0 === e.dirty) return s;
                        if ("object" == typeof s) {
                            const t = [],
                                n = Math.max(e.dirty.length, s.length);
                            for (let o = 0; o < n; o += 1) t[o] = e.dirty[o] | s[o];
                            return t
                        }
                        return e.dirty | s
                    }
                    return e.dirty
                }(d, t[4], o, null) : function (t) {
                    if (t.ctx.length > 32) {
                        const e = [],
                            n = t.ctx.length / 32;
                        for (let t = 0; t < n; t++) e[t] = -1;
                        return e
                    }
                    return -1
                }(t[4]), null), (!s || 14 & o && n !== (n = "--hover-bgc: " + t[2] + "; --hover-color: " + t[3] + "; " + K(t[1]))) && v(e, "style", n), (!s || 1 & o) && v(e, "type", t[0]), (!s || 4 & o) && g(e, "hover-bgc", t[2]), (!s || 8 & o) && g(e, "hover-color", t[3])
            },
            i(t) {
                s || (H(f, t), s = !0)
            },
            o(t) {
                O(f, t), s = !1
            },
            d(t) {
                t && c(e), f && f.d(t), l = !1, o(i)
            }
        }
    }

    function Y(t, e, n) {
        let {
            $$slots: o = {},
            $$scope: s
        } = e, {
            buttonType: l = "button"
        } = e, {
            style: r = {}
        } = e, {
            hoverBgc: i = ""
        } = e, {
            hoverColor: a = ""
        } = e;
        return t.$$set = t => {
            "buttonType" in t && n(0, l = t.buttonType), "style" in t && n(1, r = t.style), "hoverBgc" in t && n(2, i = t.hoverBgc), "hoverColor" in t && n(3, a = t.hoverColor), "$$scope" in t && n(4, s = t.$$scope)
        }, [l, r, i, a, s, o, function (e) {
            x.call(this, t, e)
        }, function (e) {
            x.call(this, t, e)
        }, function (e) {
            x.call(this, t, e)
        }]
    }
    class I extends G {
        constructor(t) {
            super(), D(this, t, Y, R, l, {
                buttonType: 0,
                style: 1,
                hoverBgc: 2,
                hoverColor: 3
            })
        }
    }
    class J {
        static validate(t) {
            if (!t) return {
                status: !0,
                errorList: []
            };
            const e = [];
            return t.forEach((t => {
                if (!t.status) return e.push(t.message)
            })), {
                status: 0 === e.length,
                errorList: e
            }
        }
    }

    function Q(t) {
        let e, n, o;
        return {
            c() {
                e = u("label"), n = d(t[4]), v(e, "for", t[7]), v(e, "style", o = K(t[2]) + " " + (t[5] ? K({
                    "font-size": "0.7em",
                    top: "-0.1em",
                    left: "0.75em",
                    "background-color": "transparent",
                    ...t[3]
                }) : K())), v(e, "class", "svelte-1d7jvpe")
            },
            m(t, o) {
                a(t, e, o), i(e, n)
            },
            p(t, s) {
                16 & s && function (t, e) {
                    e = "" + e, t.wholeText !== e && (t.data = e)
                }(n, t[4]), 44 & s && o !== (o = K(t[2]) + " " + (t[5] ? K({
                    "font-size": "0.7em",
                    top: "-0.1em",
                    left: "0.75em",
                    "background-color": "transparent",
                    ...t[3]
                }) : K())) && v(e, "style", o)
            },
            d(t) {
                t && c(e)
            }
        }
    }

    function U(e) {
        let n, s, l, r = e[4] && Q(e),
            d = "text" === e[6].type && function (t) {
                let e, n, s, l;
                return {
                    c() {
                        e = u("input"), v(e, "type", "text"), v(e, "id", t[7]), v(e, "name", t[6].name), v(e, "placeholder", t[6].placeholder), e.disabled = t[6].disabled, v(e, "maxlength", t[6].maxlength), v(e, "autocomplete", t[6].autocomplete), v(e, "style", n = K(t[1])), v(e, "class", "svelte-1d7jvpe"), g(e, "disabled", t[6].disabled)
                    },
                    m(n, o) {
                        a(n, e, o), m(e, t[0]), s || (l = [p(e, "input", t[18]), p(e, "click", t[16]), p(e, "keyup", t[17]), p(e, "focus", t[8]), p(e, "focusout", t[9])], s = !0)
                    },
                    p(t, o) {
                        2 & o && n !== (n = K(t[1])) && v(e, "style", n), 1 & o && e.value !== t[0] && m(e, t[0])
                    },
                    d(t) {
                        t && c(e), s = !1, o(l)
                    }
                }
            }(e),
            $ = "password" === e[6].type && function (t) {
                let e, n, s, l;
                return {
                    c() {
                        e = u("input"), v(e, "type", "password"), v(e, "id", t[7]), v(e, "name", t[6].name), v(e, "placeholder", t[6].placeholder), e.disabled = t[6].disabled, v(e, "maxlength", t[6].maxlength), v(e, "style", n = K(t[1])), v(e, "class", "svelte-1d7jvpe"), g(e, "disabled", t[6].disabled)
                    },
                    m(n, o) {
                        a(n, e, o), m(e, t[0]), s || (l = [p(e, "input", t[19]), p(e, "click", t[14]), p(e, "keyup", t[15]), p(e, "focus", t[8]), p(e, "focusout", t[9])], s = !0)
                    },
                    p(t, o) {
                        2 & o && n !== (n = K(t[1])) && v(e, "style", n), 1 & o && e.value !== t[0] && m(e, t[0])
                    },
                    d(t) {
                        t && c(e), s = !1, o(l)
                    }
                }
            }(e);
        return {
            c() {
                n = u("div"), r && r.c(), s = f(), d && d.c(), l = f(), $ && $.c(), v(n, "class", "input-wrapper svelte-1d7jvpe")
            },
            m(t, e) {
                a(t, n, e), r && r.m(n, null), i(n, s), d && d.m(n, null), i(n, l), $ && $.m(n, null)
            },
            p(t, [e]) {
                t[4] ? r ? r.p(t, e) : (r = Q(t), r.c(), r.m(n, s)) : r && (r.d(1), r = null), "text" === t[6].type && d.p(t, e), "password" === t[6].type && $.p(t, e)
            },
            i: t,
            o: t,
            d(t) {
                t && c(n), r && r.d(), d && d.d(), $ && $.d()
            }
        }
    }

    function W(t, e, n) {
        let {
            value: o = ""
        } = e, {
            valid: s = !1
        } = e, {
            errorList: l = []
        } = e, {
            settings: r
        } = e, {
            validations: i = []
        } = e, {
            style: a = {}
        } = e, {
            labelStyle: c = {}
        } = e, {
            labelActiveStyle: u = {}
        } = e, {
            label: d = ""
        } = e, f = Object.assign({
            required: !0,
            type: "text",
            name: "custom-input"
        }, r);
        const p = `${f.name}-${Math.floor(1e5*Math.random())}`;
        let v = !1;
        return t.$$set = t => {
            "value" in t && n(0, o = t.value), "valid" in t && n(10, s = t.valid), "errorList" in t && n(11, l = t.errorList), "settings" in t && n(12, r = t.settings), "validations" in t && n(13, i = t.validations), "style" in t && n(1, a = t.style), "labelStyle" in t && n(2, c = t.labelStyle), "labelActiveStyle" in t && n(3, u = t.labelActiveStyle), "label" in t && n(4, d = t.label)
        }, t.$$.update = () => {
            1 & t.$$.dirty && (t => {
                if (!o) return n(11, l = []), void n(10, s = !1);
                if (f.required && i.length) {
                    let t = J.validate(i);
                    t.status ? (n(10, s = !0), n(11, l = [])) : (n(10, s = !1), n(11, l = t.errorList))
                } else n(10, s = !0), n(11, l = [])
            })()
        }, [o, a, c, u, d, v, f, p, () => {
            d && !v && n(5, v = !0)
        }, () => {
            if (d && v) return o.length ? void 0 : n(5, v = !1)
        }, s, l, r, i, function (e) {
            x.call(this, t, e)
        }, function (e) {
            x.call(this, t, e)
        }, function (e) {
            x.call(this, t, e)
        }, function (e) {
            x.call(this, t, e)
        }, function () {
            o = this.value, n(0, o)
        }, function () {
            o = this.value, n(0, o)
        }]
    }
    class X extends G {
        constructor(t) {
            super(), D(this, t, W, U, l, {
                value: 0,
                valid: 10,
                errorList: 11,
                settings: 12,
                validations: 13,
                style: 1,
                labelStyle: 2,
                labelActiveStyle: 3,
                label: 4
            })
        }
    }

    function Z(t) {
        let e;
        return {
            c() {
                e = u("div"), e.textContent = "Kullanıcı adı veya şifre yanlış.", v(e, "class", "error"), $(e, "color", "red"), $(e, "font-size", "0.8em"), $(e, "margin-top", "1em"), $(e, "text-align", "center")
            },
            m(t, n) {
                a(t, e, n)
            },
            d(t) {
                t && c(e)
            }
        }
    }

    function tt(e) {
        let n, o, s;
        return {
            c() {
                n = u("div"), n.innerHTML = '<span class="material-symbols-outlined svelte-xk7sva">logout</span>', o = f(), s = u("div"), s.textContent = "Giriş Yap", v(n, "class", "icon-box svelte-xk7sva"), v(s, "class", "text-box svelte-xk7sva")
            },
            m(t, e) {
                a(t, n, e), a(t, o, e), a(t, s, e)
            },
            p: t,
            d(t) {
                t && c(n), t && c(o), t && c(s)
            }
        }
    }

    function et(t) {
        let e, n, o, s, l, r, d, m, g, h, y, b, x, k, _, L, T, E, j, M, S, C, A, q, V, D, G, K, R, Y, J = t[0] && Z();

        function Q(e) {
            t[4](e)
        }
        let U = {
            settings: {
                type: "text",
                required: !0,
                autocomplete: "off"
            },
            style: t[2]
        };

        function W(e) {
            t[5](e)
        }
        void 0 !== t[1].userName && (U.value = t[1].userName), _ = new X({
            props: U
        }), w.push((() => B(_, "value", Q)));
        let et = {
            settings: {
                type: "password",
                required: !0
            },
            style: t[2]
        };
        return void 0 !== t[1].password && (et.value = t[1].password), S = new X({
            props: et
        }), w.push((() => B(S, "value", W))), V = new I({
            props: {
                hoverBgc: "#888482",
                buttonType: "submit",
                style: {
                    "background-color": "#c4c4c4",
                    padding: "1.25em 0",
                    color: "#000",
                    display: "grid",
                    "grid-auto-flow": "column",
                    "align-items": "center",
                    "justify-content": "center",
                    "grid-gap": "0.2em",
                    "border-radius": "0.5em",
                    transition: "0.2s"
                },
                $$slots: {
                    default: [tt]
                },
                $$scope: {
                    ctx: t
                }
            }
        }), V.$on("click", t[3]), {
            c() {
                e = u("div"), n = u("div"), o = u("div"), o.innerHTML = '<img src="logo.png" alt="logo" class="svelte-xk7sva"/>', s = f(), l = u("div"), l.innerHTML = '<h3 class="svelte-xk7sva">Lsc Roleplay</h3> \n      <p class="svelte-xk7sva">alt:V Multiplayer</p>', r = f(), d = u("form"), m = u("div"), m.innerHTML = '<p class="svelte-xk7sva"><span class="svelte-xk7sva">Hoş geldin.</span> Oyun bilgilerini girerek oyuna erişebilirsin.</p>', g = f(), J && J.c(), h = f(), y = u("div"), b = u("div"), x = u("div"), x.innerHTML = '<span class="material-symbols-outlined svelte-xk7sva">person</span>', k = f(), z(_.$$.fragment), T = f(), E = u("div"), j = u("div"), j.innerHTML = '<span class="material-symbols-outlined svelte-xk7sva">lock</span>', M = f(), z(S.$$.fragment), A = f(), q = u("div"), z(V.$$.fragment), D = f(), G = u("footer"), G.textContent = "Türkiye'nin ilk alt:V işlemcili, text tabanlı resmi roleplay sunucusu", v(o, "class", "logo svelte-xk7sva"), v(l, "class", "logo-text svelte-xk7sva"), v(m, "class", "title svelte-xk7sva"), v(x, "class", "icon-box svelte-xk7sva"), v(b, "class", "input-box svelte-xk7sva"), v(j, "class", "icon-box svelte-xk7sva"), v(E, "class", "input-box svelte-xk7sva"), v(y, "class", "inputs svelte-xk7sva"), v(q, "class", "button-box svelte-xk7sva"), v(d, "class", "svelte-xk7sva"), v(n, "class", "login-box svelte-xk7sva"), v(e, "class", "login svelte-xk7sva"), $(e, "background-image", "url('bg.png')"), v(G, "class", "svelte-xk7sva")
            },
            m(c, u) {
                var f;
                a(c, e, u), i(e, n), i(n, o), i(n, s), i(n, l), i(n, r), i(n, d), i(d, m), i(d, g), J && J.m(d, null), i(d, h), i(d, y), i(y, b), i(b, x), i(b, k), P(_, b, null), i(y, T), i(y, E), i(E, j), i(E, M), P(S, E, null), i(d, A), i(d, q), P(V, q, null), a(c, D, u), a(c, G, u), K = !0, R || (Y = p(d, "submit", (f = t[3], function (t) {
                    return t.preventDefault(), f.call(this, t)
                })), R = !0)
            },
            p(t, [e]) {
                t[0] ? J || (J = Z(), J.c(), J.m(d, h)) : J && (J.d(1), J = null);
                const n = {};
                !L && 2 & e && (L = !0, n.value = t[1].userName, N((() => L = !1))), _.$set(n);
                const o = {};
                !C && 2 & e && (C = !0, o.value = t[1].password, N((() => C = !1))), S.$set(o);
                const s = {};
                64 & e && (s.$$scope = {
                    dirty: e,
                    ctx: t
                }), V.$set(s)
            },
            i(t) {
                K || (H(_.$$.fragment, t), H(S.$$.fragment, t), H(V.$$.fragment, t), K = !0)
            },
            o(t) {
                O(_.$$.fragment, t), O(S.$$.fragment, t), O(V.$$.fragment, t), K = !1
            },
            d(t) {
                t && c(e), J && J.d(), F(_), F(S), F(V), t && c(D), t && c(G), R = !1, Y()
            }
        }
    }

    function nt(t, e, n) {
        let o = !1;
        let s = {
            userName: "",
            password: ""
        };
        return b((() => {
            alt.on("loginCEF:ShowError", (() => {
                n(0, o = !0), setTimeout((() => n(0, o = !1)), 5e3)
            }))
        })), [o, s, {
            color: "#000",
            "background-color": "#888482",
            padding: "0 0.5em",
            "border-top-right-radius": "0.5em",
            "border-bottom-right-radius": "0.5em",
            "font-weight": "400"
        }, () => {
            s.userName.trim(), s.password.trim(), s.userName && s.password && "alt" in window && alt.emit("login:Attempt", s.userName, s.password)
        }, function (e) {
            t.$$.not_equal(s.userName, e) && (s.userName = e, n(1, s))
        }, function (e) {
            t.$$.not_equal(s.password, e) && (s.password = e, n(1, s))
        }]
    }
    return new class extends G {
        constructor(t) {
            super(), D(this, t, nt, et, l, {})
        }
    }({
        target: document.body,
        props: {
            name: "world"
        }
    })
}();
//# sourceMappingURL=bundle.js.map
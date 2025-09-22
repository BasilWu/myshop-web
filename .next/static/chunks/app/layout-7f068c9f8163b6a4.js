(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [177],
  {
    149: (e) => {
      e.exports = {
        link: 'nav-link_link___P2r4',
        active: 'nav-link_active__2Dd3_',
      };
    },
    677: (e, t, a) => {
      'use strict';
      a.d(t, { _: () => i });
      var r = a(5177);
      let s = (e) => {
          let t,
            a = new Set(),
            r = (e, r) => {
              let s = 'function' == typeof e ? e(t) : e;
              if (!Object.is(s, t)) {
                let e = t;
                ((t = (null != r ? r : 'object' != typeof s || null === s)
                  ? s
                  : Object.assign({}, t, s)),
                  a.forEach((a) => a(t, e)));
              }
            },
            s = () => t,
            n = {
              setState: r,
              getState: s,
              getInitialState: () => i,
              subscribe: (e) => (a.add(e), () => a.delete(e)),
            },
            i = (t = e(r, s, n));
          return n;
        },
        n = (e) => {
          let t = ((e) => (e ? s(e) : s))(e),
            a = (e) =>
              (function (e, t = (e) => e) {
                let a = r.useSyncExternalStore(
                  e.subscribe,
                  r.useCallback(() => t(e.getState()), [e, t]),
                  r.useCallback(() => t(e.getInitialState()), [e, t]),
                );
                return (r.useDebugValue(a), a);
              })(t, e);
          return (Object.assign(a, t), a);
        },
        i = ((e) => (e ? n(e) : n))((e, t) => ({
          items: [],
          add: (a) => {
            let r = t().items;
            r.find((e) => e.id === a.id)
              ? e({
                  items: r.map((e) =>
                    e.id === a.id ? { ...e, qty: e.qty + a.qty } : e,
                  ),
                })
              : e({ items: [...r, a] });
          },
          remove: (a) => e({ items: t().items.filter((e) => e.id !== a) }),
          clear: () => e({ items: [] }),
          total: () => t().items.reduce((e, t) => e + t.price * t.qty, 0),
        }));
    },
    3526: (e, t, a) => {
      (Promise.resolve().then(a.bind(a, 8566)),
        Promise.resolve().then(a.t.bind(a, 4201, 23)),
        Promise.resolve().then(a.t.bind(a, 4131, 23)),
        Promise.resolve().then(a.t.bind(a, 9308, 23)));
    },
    4131: (e) => {
      e.exports = {
        style: {
          fontFamily: "'Geist Mono', 'Geist Mono Fallback'",
          fontStyle: 'normal',
        },
        className: '__className_9a8899',
        variable: '__variable_9a8899',
      };
    },
    4201: (e) => {
      e.exports = {
        style: { fontFamily: "'Geist', 'Geist Fallback'", fontStyle: 'normal' },
        className: '__className_188709',
        variable: '__variable_188709',
      };
    },
    4893: (e) => {
      e.exports = {
        'header-background': 'main-header-background_header-background__EJniX',
      };
    },
    5762: (e, t, a) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        !(function (e, t) {
          for (var a in t)
            Object.defineProperty(e, a, { enumerable: !0, get: t[a] });
        })(t, {
          default: function () {
            return o;
          },
          getImageProps: function () {
            return l;
          },
        }));
      let r = a(6708),
        s = a(6938),
        n = a(3730),
        i = r._(a(6490));
      function l(e) {
        let { props: t } = (0, s.getImgProps)(e, {
          defaultLoader: i.default,
          imgConf: {
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
            path: '/_next/image',
            loader: 'default',
            dangerouslyAllowSVG: !1,
            unoptimized: !1,
          },
        });
        for (let [e, a] of Object.entries(t)) void 0 === a && delete t[e];
        return { props: t };
      }
      let o = n.Image;
    },
    6746: (e) => {
      e.exports = {
        header: 'main-header_header__T4P4x',
        nav: 'main-header_nav__7caAm',
        logo: 'main-header_logo__BaWrz',
      };
    },
    8566: (e, t, a) => {
      'use strict';
      a.d(t, { default: () => p });
      var r = a(8045),
        s = a(4429),
        n = a.n(s),
        i = a(149),
        l = a.n(i),
        o = a(418);
      function c(e) {
        let { href: t, children: a } = e,
          s = (0, o.usePathname)();
        return (0, r.jsx)(n(), {
          href: t,
          className: s.startsWith(t)
            ? ''.concat(l().link, ' ').concat(l().active)
            : l().link,
          children: a,
        });
      }
      a(5762);
      var d = a(4893),
        u = a.n(d);
      function h() {
        return (0, r.jsx)('div', {
          className: u()['header-background'],
          children: (0, r.jsxs)('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 1440 320',
            children: [
              (0, r.jsx)('defs', {
                children: (0, r.jsxs)('linearGradient', {
                  id: 'gradient',
                  x1: '0%',
                  y1: '0%',
                  x2: '100%',
                  y2: '0%',
                  children: [
                    (0, r.jsx)('stop', {
                      offset: '0%',
                      style: { stopColor: '#59453c', stopOpacity: '1' },
                    }),
                    (0, r.jsx)('stop', {
                      offset: '100%',
                      style: { stopColor: '#8f3a09', stopOpacity: '1' },
                    }),
                  ],
                }),
              }),
              (0, r.jsx)('path', {
                fill: 'url(#gradient)',
                d: 'M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,181.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
              }),
            ],
          }),
        });
      }
      var m = a(6746),
        f = a.n(m),
        _ = a(677);
      function p() {
        let { items: e } = (0, _._)(),
          t = e.reduce((e, t) => e + t.qty, 0);
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(h, {}),
            (0, r.jsxs)('header', {
              className: f().header,
              children: [
                (0, r.jsx)(n(), {
                  href: '/',
                  className: f().logo,
                  children: 'B-Shop',
                }),
                (0, r.jsx)('nav', {
                  className: f().nav,
                  children: (0, r.jsxs)('ul', {
                    children: [
                      (0, r.jsx)('li', {
                        children: (0, r.jsx)(c, {
                          href: '/products',
                          children: 'Browse Products',
                        }),
                      }),
                      (0, r.jsx)('li', {
                        children: (0, r.jsx)(c, {
                          href: '/community',
                          children: 'Shopping Community',
                        }),
                      }),
                      (0, r.jsx)('li', {
                        children: (0, r.jsxs)(c, {
                          href: '/cart',
                          children: [
                            '\uD83D\uDED2 Cart ',
                            t > 0 && '('.concat(t, ')'),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        });
      }
    },
    9308: () => {},
  },
  (e) => {
    (e.O(0, [201, 429, 730, 986, 143, 358], () => e((e.s = 3526))),
      (_N_E = e.O()));
  },
]);

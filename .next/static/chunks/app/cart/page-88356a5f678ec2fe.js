(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5],
  {
    677: (e, s, t) => {
      'use strict';
      t.d(s, { _: () => c });
      var i = t(5177);
      let l = (e) => {
          let s,
            t = new Set(),
            i = (e, i) => {
              let l = 'function' == typeof e ? e(s) : e;
              if (!Object.is(l, s)) {
                let e = s;
                ((s = (null != i ? i : 'object' != typeof l || null === l)
                  ? l
                  : Object.assign({}, s, l)),
                  t.forEach((t) => t(s, e)));
              }
            },
            l = () => s,
            n = {
              setState: i,
              getState: l,
              getInitialState: () => c,
              subscribe: (e) => (t.add(e), () => t.delete(e)),
            },
            c = (s = e(i, l, n));
          return n;
        },
        n = (e) => {
          let s = ((e) => (e ? l(e) : l))(e),
            t = (e) =>
              (function (e, s = (e) => e) {
                let t = i.useSyncExternalStore(
                  e.subscribe,
                  i.useCallback(() => s(e.getState()), [e, s]),
                  i.useCallback(() => s(e.getInitialState()), [e, s]),
                );
                return (i.useDebugValue(t), t);
              })(s, e);
          return (Object.assign(t, s), t);
        },
        c = ((e) => (e ? n(e) : n))((e, s) => ({
          items: [],
          add: (t) => {
            let i = s().items;
            i.find((e) => e.id === t.id)
              ? e({
                  items: i.map((e) =>
                    e.id === t.id ? { ...e, qty: e.qty + t.qty } : e,
                  ),
                })
              : e({ items: [...i, t] });
          },
          remove: (t) => e({ items: s().items.filter((e) => e.id !== t) }),
          clear: () => e({ items: [] }),
          total: () => s().items.reduce((e, s) => e + s.price * s.qty, 0),
        }));
    },
    2965: (e, s, t) => {
      'use strict';
      (t.r(s), t.d(s, { default: () => a }));
      var i = t(8045),
        l = t(677),
        n = t(4429),
        c = t.n(n);
      function a() {
        let { items: e, total: s, remove: t, clear: n } = (0, l._)();
        return (0, i.jsxs)('main', {
          className: 'p-6 space-y-4',
          children: [
            (0, i.jsxs)('div', {
              className: 'flex items-center justify-between',
              children: [
                (0, i.jsx)('h1', {
                  className: 'text-xl font-semibold',
                  children: '購物車',
                }),
                (0, i.jsx)(c(), {
                  href: '/products',
                  className: 'text-sm underline',
                  children: '繼續逛逛',
                }),
              ],
            }),
            0 === e.length
              ? (0, i.jsx)('div', {
                  className: 'opacity-70',
                  children: '目前沒有商品',
                })
              : (0, i.jsxs)(i.Fragment, {
                  children: [
                    (0, i.jsx)('ul', {
                      className: 'space-y-2',
                      children: e.map((e) =>
                        (0, i.jsxs)(
                          'li',
                          {
                            className:
                              'flex items-center justify-between border rounded p-3',
                            children: [
                              (0, i.jsxs)('div', {
                                className: 'flex items-center gap-3',
                                children: [
                                  (0, i.jsx)('div', {
                                    className: 'font-medium',
                                    children: e.name,
                                  }),
                                  (0, i.jsxs)('div', {
                                    className: 'text-sm opacity-70',
                                    children: ['\xd7 ', e.qty],
                                  }),
                                ],
                              }),
                              (0, i.jsxs)('div', {
                                className: 'flex items-center gap-4',
                                children: [
                                  (0, i.jsxs)('div', {
                                    children: ['NT$ ', e.price * e.qty],
                                  }),
                                  (0, i.jsx)('button', {
                                    onClick: () => t(e.id),
                                    className: 'text-sm underline',
                                    children: '移除',
                                  }),
                                ],
                              }),
                            ],
                          },
                          e.id,
                        ),
                      ),
                    }),
                    (0, i.jsxs)('div', {
                      className:
                        'flex items-center justify-between pt-3 border-t',
                      children: [
                        (0, i.jsxs)('div', {
                          className: 'font-medium',
                          children: ['總計：NT$ ', s()],
                        }),
                        (0, i.jsxs)('div', {
                          className: 'flex items-center gap-3',
                          children: [
                            (0, i.jsx)('button', {
                              onClick: n,
                              className: 'px-3 py-2 border rounded',
                              children: '清空',
                            }),
                            (0, i.jsx)('button', {
                              className:
                                'px-3 py-2 border rounded bg-black text-white',
                              children: '前往結帳（之後接）',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
          ],
        });
      }
    },
    6420: (e, s, t) => {
      Promise.resolve().then(t.bind(t, 2965));
    },
  },
  (e) => {
    (e.O(0, [429, 986, 143, 358], () => e((e.s = 6420))), (_N_E = e.O()));
  },
]);

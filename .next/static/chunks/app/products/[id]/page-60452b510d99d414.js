(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [403],
  {
    677: (e, t, i) => {
      'use strict';
      i.d(t, { _: () => n });
      var s = i(5177);
      let l = (e) => {
          let t,
            i = new Set(),
            s = (e, s) => {
              let l = 'function' == typeof e ? e(t) : e;
              if (!Object.is(l, t)) {
                let e = t;
                ((t = (null != s ? s : 'object' != typeof l || null === l)
                  ? l
                  : Object.assign({}, t, l)),
                  i.forEach((i) => i(t, e)));
              }
            },
            l = () => t,
            a = {
              setState: s,
              getState: l,
              getInitialState: () => n,
              subscribe: (e) => (i.add(e), () => i.delete(e)),
            },
            n = (t = e(s, l, a));
          return a;
        },
        a = (e) => {
          let t = ((e) => (e ? l(e) : l))(e),
            i = (e) =>
              (function (e, t = (e) => e) {
                let i = s.useSyncExternalStore(
                  e.subscribe,
                  s.useCallback(() => t(e.getState()), [e, t]),
                  s.useCallback(() => t(e.getInitialState()), [e, t]),
                );
                return (s.useDebugValue(i), i);
              })(t, e);
          return (Object.assign(i, t), i);
        },
        n = ((e) => (e ? a(e) : a))((e, t) => ({
          items: [],
          add: (i) => {
            let s = t().items;
            s.find((e) => e.id === i.id)
              ? e({
                  items: s.map((e) =>
                    e.id === i.id ? { ...e, qty: e.qty + i.qty } : e,
                  ),
                })
              : e({ items: [...s, i] });
          },
          remove: (i) => e({ items: t().items.filter((e) => e.id !== i) }),
          clear: () => e({ items: [] }),
          total: () => t().items.reduce((e, t) => e + t.price * t.qty, 0),
        }));
    },
    1296: (e, t, i) => {
      Promise.resolve().then(i.bind(i, 5030));
    },
    5030: (e, t, i) => {
      'use strict';
      i.d(t, { default: () => a });
      var s = i(8045),
        l = i(677);
      function a(e) {
        let { id: t, name: i, price: a } = e,
          n = (0, l._)((e) => e.add);
        return (0, s.jsx)('button', {
          className: 'px-4 py-2 bg-blue-600 text-white rounded',
          onClick: () => {
            (n({ id: t, name: i, price: a, qty: 1 }), alert('加入成功！'));
          },
          children: '加入購物車',
        });
      }
    },
  },
  (e) => {
    (e.O(0, [986, 143, 358], () => e((e.s = 1296))), (_N_E = e.O()));
  },
]);

__wxRoute = 'pages/preview/preview';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/preview/preview.js';
define(
  'pages/preview/preview.js',
  function (
    require,
    module,
    exports,
    window,
    document,
    frames,
    self,
    location,
    navigator,
    localStorage,
    history,
    Caches,
    screen,
    alert,
    confirm,
    prompt,
    XMLHttpRequest,
    WebSocket,
    Reporter,
    webkit,
    WeixinJSCore
  ) {
    'use strict';
    (wx['webpackJsonp'] = wx['webpackJsonp'] || []).push([
      [978],
      {
        9504: function (e, n, a) {
          var t = a(2690),
            r = a(8583),
            i = a(9562),
            o = a.n(i),
            s = a(6690),
            u = a(8249),
            c = a(7608),
            l = a.n(c),
            d = a.p + 'static/images/loading.gif',
            f = a(8219),
            p = a(7458),
            _ = function (e) {
              var n = e.show,
                a = e.className;
              return n
                ? (0, p.jsx)(f.Z, {
                    children: (0, p.jsx)(r.G7, {
                      className: l()(
                        'h-screen w-screen flex items-center justify-center bg-_a_rgba_a_255_a_255_a_255_a_0_a_3_a__a_ z-100 absolute top-0',
                        a
                      ),
                      children: (0, p.jsx)(r.Ee, { src: d, className: 'w-24px h-24px' })
                    })
                  })
                : null;
            },
            g = a(6574),
            h = a(8833),
            x = a(2983),
            v = a(4205),
            m = a(868),
            I = a(1902),
            w = function (e) {
              var n = e.successCb,
                a = e.failureCb,
                t = e.options;
              (0, x.useEffect)(function () {
                var e = function (e) {
                  e.openId ? n(e) : null === a || void 0 === a || a();
                };
                return (
                  m.B.on(I.V.Login, e, (0, v.Z)((0, v.Z)({}, t), {}, { emittedExecute: !0 })),
                  function () {
                    m.B['delete'](I.V.Login, e);
                  }
                );
              }, []);
            },
            j = a(1820),
            b = function () {
              var e = (0, x.useState)(!0),
                n = (0, h.Z)(e, 2),
                a = n[0],
                t = n[1],
                r = (0, x.useState)({}),
                i = (0, h.Z)(r, 2),
                o = i[0],
                s = i[1];
              return (
                w({
                  successCb: function (e) {
                    (s(e), t(!1));
                  },
                  failureCb: function () {
                    (t(!1), j.k.error('login', 'useOnLogin failure'));
                  }
                }),
                { userInfo: o, loading: a, setLoading: t }
              );
            },
            S = a(6513),
            y = function () {
              var e = (0, x.useState)(function () {
                  return (0, S.Qf)() || {};
                }),
                n = (0, h.Z)(e, 2),
                a = n[0],
                t = n[1];
              return (
                (0, i.useDidShow)(function () {
                  var e;
                  (null === (e = (0, S.Qf)()) || void 0 === e ? void 0 : e.template_id) && t((0, S.Qf)() || {});
                }),
                { urlParams: a }
              );
            },
            T = function (e) {
              var n,
                a = e.query,
                t = e.userInfo,
                r = (0, x.useState)(!1),
                s = (0, h.Z)(r, 2),
                u = s[0],
                c = s[1],
                l = t.userType === g.d.agent,
                d = (null === (n = t.activityInfo) || void 0 === n ? void 0 : n.activity_id) || '';
              return (
                (0, x.useEffect)(
                  function () {
                    l ? o().showShareMenu({ withShareTicket: !0 }) : o().hideShareMenu();
                  },
                  [l]
                ),
                (0, x.useEffect)(
                  function () {
                    d &&
                      (c(!0),
                      wx.updateShareMenu({
                        isPrivateMessage: !0,
                        activityId: d,
                        success: function () {
                          c(!1);
                        },
                        fail: function () {
                          c(!1);
                        }
                      }));
                  },
                  [d]
                ),
                (0, i.useShareAppMessage)(function () {
                  var e = (0, v.Z)((0, v.Z)({}, a), {}, { share_id: t.openId }),
                    n = Object.keys(e)
                      .map(function (n) {
                        var a;
                        return ''.concat(n, '=').concat(null !== (a = e[n]) && void 0 !== a ? a : '');
                      })
                      .join('&');
                  return { title: '精选分享', path: '/pages/preview/preview?'.concat(n) };
                }),
                { canShare: l, shareConfigLoading: u }
              );
            },
            k = function () {
              var e = b(),
                n = e.userInfo,
                a = void 0 === n ? {} : n,
                t = y(),
                r = t.urlParams,
                i = a.userType,
                o = r.template_id,
                s = Boolean(a.unionId || a.openId),
                u = Boolean(o),
                c = i === g.d.agent || i === g.d.user,
                l = c && u && s,
                d = l
                  ? ''
                  : (u ? !s && '缺少用户Id' : '缺少templateId') ||
                    (!c && '用户类型异常') ||
                    '未知错误';
              return { isAuth: l, userType: i, illegalReason: d };
            },
            L = 1e3,
            C = 10,
            Z = function () {
              var e = (0, x.useState)(!1),
                n = (0, h.Z)(e, 2),
                a = n[0],
                t = n[1],
                r = k(),
                i = r.illegalReason,
                o = (0, x.useRef)(0),
                s = (0, x.useRef)(),
                u = g.e.loginLogId,
                c = g.e.unionId,
                l = g.e.userType,
                d = function () {
                  (o.current++,
                    o.current >= C && t(!0),
                    s.current && clearTimeout(s.current),
                    (s.current = setTimeout(function () {
                      o.current = 0;
                    }, L)));
                };
              return (
                (0, x.useEffect)(function () {
                  return function () {
                    s.current && clearTimeout(s.current);
                  };
                }, []),
                { showDebugInfo: a, logid: u, unionId: c, userType: l, illegalReason: i, handleClick: d }
              );
            },
            N = function (e) {
              var n = e.children;
              return (0, p.jsx)(r.G7, {
                className: 'mt-10px text-12px text-_a__a_999_a_',
                children: (0, p.jsx)(r.xv, { selectable: !0, userSelect: !0, children: n })
              });
            },
            G = function () {
              var e = Z(),
                n = e.logid,
                a = e.unionId,
                t = e.showDebugInfo,
                i = e.illegalReason,
                o = e.handleClick;
              return (0, p.jsx)(r.G7, {
                className: 'z-1000 absolute bottom-0 right-0',
                children: (0, p.jsx)(r.G7, {
                  onClick: o,
                  className: 'text-center text-16px text-_a__a_333_a_ min-w-100px min-h-60px p-10px',
                  children: t
                    ? (0, p.jsxs)(p.Fragment, {
                        children: [
                          (0, p.jsxs)(N, { children: ['logid: ', n] }),
                          (0, p.jsxs)(N, { children: ['unionId: ', a] }),
                          (0, p.jsxs)(N, { children: ['reason: ', i] })
                        ]
                      })
                    : null
                })
              });
            },
            M = function (e) {
              var n = e.userType;
              return (0, p.jsx)(r.G7, {
                className:
                  'h-screen w-screen flex items-center justify-center bg-_a_rgba_a_255_a_255_a_255_a_0_a_3_a__a_ z-100 absolute top-0',
                children: (0, p.jsxs)(r.G7, {
                  className: 'text-center text-16px text-_a__a_333_a_',
                  children: [
                    n === g.d.illegal_agent
                      ? '暂无权限，请联系管理员开通～'
                      : '商品走丢了，请稍后再试～',
                    (0, p.jsx)(G, {})
                  ]
                })
              });
            },
            R = function (e) {
              var n = e.canShare,
                a = void 0 !== n && n,
                t = e.query,
                i = e.openId,
                o = e.unionId,
                s = e.appId,
                u = e.loginLogId,
                c = void 0 === u ? '' : u,
                l = e.domain,
                d = void 0 === l ? 'sl.csjdeveloper.com' : l,
                f = (0, v.Z)((0, v.Z)({}, t), {}, { wx_open_id: i, wx_union_id: o, wx_appid: s, loginLogId: c }),
                _ = Object.keys(f)
                  .map(function (e) {
                    var n;
                    return ''.concat(e, '=').concat(null !== (n = f[e]) && void 0 !== n ? n : '');
                  })
                  .join('&');
              return (0, p.jsx)(
                r.kh,
                {
                  src: 'https://'.concat(d, '/page/wxReceiveToken?').concat(_, '#wechat_redirect'),
                  children: (0, p.jsx)('share-btn', { canShare: a })
                },
                ''.concat(o || i, '-').concat(t.template_id)
              );
            },
            B = function () {
              var e = y(),
                n = e.urlParams,
                a = b(),
                t = a.userInfo,
                o = void 0 === t ? {} : t,
                c = a.loading,
                l = a.setLoading,
                d = T({ query: n, userInfo: o }),
                f = d.canShare,
                h = d.shareConfigLoading,
                x = k(),
                v = x.isAuth,
                m = x.userType,
                I = o.unionId,
                w = o.openId,
                j = o.wxConfigs,
                S = o.loginLogId,
                L = j || {},
                C = L.webview_domain,
                Z = c || h;
              return (
                (0, i.useDidShow)(function (e) {
                  (g.e.login({
                    shareTicket: null === e || void 0 === e ? void 0 : e.shareTicket,
                    beforeLogin: function () {
                      return l(!0);
                    },
                    afterLogin: function () {
                      return l(!1);
                    }
                  }),
                    (0, s.kX)(s.J9.miniprog_page_show, { page_name: 'preview' }));
                }),
                (0, p.jsxs)(r.G7, {
                  className: 'relative',
                  children: [
                    v && !Z
                      ? (0, p.jsx)(R, {
                          canShare: f,
                          query: n,
                          openId: w,
                          unionId: I,
                          appId: u.G.appId,
                          domain: C,
                          loginLogId: S
                        })
                      : (0, p.jsx)(M, { userType: m }),
                    (0, p.jsx)(_, { className: 'bg-white', show: Z })
                  ]
                })
              );
            },
            E = B,
            P = {
              navigationBarTitleText: '商品预览',
              enableShareAppMessage: !0,
              usingComponents: { 'share-btn': './components/ShareBtn/index' }
            };
          E.enableShareAppMessage = !0;
          Page((0, t.createPageConfig)(E, 'pages/preview/preview', { root: { cn: [] } }, P || {}));
        }
      },
      function (e) {
        var n = function (n) {
          return e((e.s = n));
        };
        e.O(0, [107, 216, 592], function () {
          return n(9504);
        });
        e.O();
      }
    ]);
    //# sourceMappingURL=preview.js.map
  }
);
require('pages/preview/preview.js');

__wxRoute = 'pages/withdraw_auth/index';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/withdraw_auth/index.js';
define(
  'pages/withdraw_auth/index.js',
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
      [41],
      {
        6593: function (n, e, o) {
          var t = o(2690),
            r = o(1697),
            i = o(6079),
            a = o(8833),
            c = o(8583),
            s = o(9562),
            _ = o.n(s),
            l = o(2983),
            m = o(7608),
            u = o.n(m),
            d = o(4205);
          function p(n, e) {
            if (null == n) return {};
            var o,
              t,
              r = {},
              i = Object.keys(n);
            for (t = 0; t < i.length; t++) ((o = i[t]), e.indexOf(o) >= 0 || (r[o] = n[o]));
            return r;
          }
          function f(n, e) {
            if (null == n) return {};
            var o,
              t,
              r = p(n, e);
            if (Object.getOwnPropertySymbols) {
              var i = Object.getOwnPropertySymbols(n);
              for (t = 0; t < i.length; t++)
                ((o = i[t]), e.indexOf(o) >= 0 || (Object.prototype.propertyIsEnumerable.call(n, o) && (r[o] = n[o])));
            }
            return r;
          }
          var x = {
              container: 'index-module__container___SrYk8',
              container_primary: 'index-module__container_primary___sIfxB'
            },
            h = o(7458),
            g = ['children', 'className', 'colorType'],
            j = function (n) {
              var e = n.children,
                o = n.className,
                t = n.colorType,
                r = void 0 === t ? 'default' : t,
                i = f(n, g);
              return (0, h.jsx)(
                c.zx,
                (0, d.Z)(
                  (0, d.Z)({ className: u()(x.container, o, x['container_'.concat(r)]) }, i),
                  {},
                  { children: e }
                )
              );
            },
            w = o(5511),
            k = o(8219),
            b = {
              modal: 'index-module__modal___OHuCR',
              modal_show: 'index-module__modal_show___gsPjt',
              'modal-mask': 'index-module__modal-mask___KYOcM',
              'modal-mask_show': 'index-module__modal-mask_show___g7zZB'
            },
            N = function (n) {
              var e = n.show,
                o = n.children,
                t = n.onShow;
              return (
                (0, l.useEffect)(
                  function () {
                    e && t && t();
                  },
                  [e, t]
                ),
                (0, h.jsx)(k.Z, {
                  children: (0, h.jsx)(c.G7, {
                    className: u()(b.modal, (0, w.Z)({}, b.modal_show, e)),
                    children: (0, h.jsx)(c.G7, {
                      className: u()(b['modal-mask'], (0, w.Z)({}, b['modal-mask_show'], e)),
                      children: (0, h.jsx)(c.G7, { children: o })
                    })
                  })
                })
              );
            },
            v = o(6690),
            y = o.p + 'static/images/cjs.svg',
            G = {
              container: 'index-module__container___tGqkU',
              title: 'index-module__title___J8hwS',
              'title-icon': 'index-module__title-icon___qlLeK',
              'title-text': 'index-module__title-text___fCi30',
              'title-text_bold': 'index-module__title-text_bold___IKMIG',
              'title-text_normal': 'index-module__title-text_normal___seezD',
              desc: 'index-module__desc___SscRL'
            },
            Z = function (n) {
              var e = n.className;
              return (0, h.jsxs)(c.G7, {
                className: u()(G.container, e),
                children: [
                  (0, h.jsxs)(c.G7, {
                    className: G.title,
                    children: [
                      (0, h.jsx)(c.Ee, { className: G['title-icon'], src: y }),
                      (0, h.jsxs)(c.G7, {
                        className: G['title-text'],
                        children: [
                          (0, h.jsx)(c.G7, {
                            className: G['title-text_bold'],
                            children: '\u5317\u4eac\u6296\u6765\u54aa\u53d1'
                          }),
                          (0, h.jsx)(c.G7, { className: G['title-text_normal'], children: '\u7533\u8bf7\u4f7f\u7528' })
                        ]
                      })
                    ]
                  }),
                  (0, h.jsx)(c.G7, {
                    className: G.desc,
                    children:
                      '\u83b7\u53d6\u4f60\u7684\u516c\u5f00\u4fe1\u606f(\u6635\u79f0\u3001\u5934\u50cf\u7b49)\u63d0\u4f9b\u670d\u52a1'
                  })
                ]
              });
            },
            J = {
              container: 'index-module__container___lKIkY',
              btn: 'index-module__btn___JysGx',
              'btn-primary': 'index-module__btn-primary___SZk_g',
              'btn-reject': 'index-module__btn-reject___IQYEW',
              desc: 'index-module__desc___pBlFW',
              'confirm-modal': 'index-module__confirm-modal___uOl8Q',
              'confirm-modal-content': 'index-module__confirm-modal-content___sdpNH',
              'confirm-modal-operation': 'index-module__confirm-modal-operation___DaA_0',
              'confirm-modal-operation-btn': 'index-module__confirm-modal-operation-btn___MwG7K',
              'confirm-modal-operation-btn_confirm': 'index-module__confirm-modal-operation-btn_confirm___orQBs'
            },
            O = function () {
              var n = (0, l.useState)(''),
                e = (0, a.Z)(n, 2),
                o = e[0],
                t = e[1],
                m = (0, l.useState)(!1),
                d = (0, a.Z)(m, 2),
                p = d[0],
                f = d[1],
                x = (function () {
                  var n = (0, i.Z)(
                    (0, r.Z)().mark(function n() {
                      return (0, r.Z)().wrap(function (n) {
                        while (1)
                          switch ((n.prev = n.next)) {
                            case 0:
                              _().login({
                                success: function (n) {
                                  n.code
                                    ? t('?scene=permit&code='.concat(n.code))
                                    : (0, v.kX)(v.J9.authorization_status, {
                                        authorization_result: 1,
                                        error_message: n.errMsg
                                      });
                                },
                                fail: function (n) {
                                  (0, v.kX)(v.J9.authorization_status, {
                                    authorization_result: 1,
                                    error_message: n.errMsg
                                  });
                                }
                              });
                            case 1:
                            case 'end':
                              return n.stop();
                          }
                      }, n);
                    })
                  );
                  return function () {
                    return n.apply(this, arguments);
                  };
                })(),
                g = (function () {
                  var n = (0, i.Z)(
                    (0, r.Z)().mark(function n(e) {
                      return (0, r.Z)().wrap(function (n) {
                        while (1)
                          switch ((n.prev = n.next)) {
                            case 0:
                              (0, v.kX)(v.J9.miniprog_launch_app_status, { result: 'success', scene: e });
                            case 1:
                            case 'end':
                              return n.stop();
                          }
                      }, n);
                    })
                  );
                  return function (e) {
                    return n.apply(this, arguments);
                  };
                })(),
                w = function (n, e) {
                  var o;
                  ((0, v.kX)(v.J9.miniprog_launch_app_status, {
                    result: null === n || void 0 === n || null === (o = n.detail) || void 0 === o ? void 0 : o.errMsg,
                    scene: e
                  }),
                    _().showToast({
                      title: '\u8df3\u8f6c\u5931\u8d25\uff0c\u8bf7\u8fd4\u56de\u5e94\u7528\u540e\u91cd\u8bd5~',
                      icon: 'none'
                    }));
                },
                k = function () {
                  (0, v.kX)(v.J9.miniprog_page_click, { page_btn_name: 'agree' });
                },
                b = (function () {
                  var n = (0, i.Z)(
                    (0, r.Z)().mark(function n() {
                      return (0, r.Z)().wrap(function (n) {
                        while (1)
                          switch ((n.prev = n.next)) {
                            case 0:
                              ((0, v.kX)(v.J9.miniprog_page_click, { page_btn_name: 'reject' }), f(!0));
                            case 2:
                            case 'end':
                              return n.stop();
                          }
                      }, n);
                    })
                  );
                  return function () {
                    return n.apply(this, arguments);
                  };
                })(),
                y = function () {
                  ((0, v.kX)(v.J9.miniprog_popup_click, { popup_name: 'confirm_popup', popup_btn_name: 'cancel' }),
                    f(!1));
                },
                G = function () {
                  (0, v.kX)(v.J9.miniprog_popup_click, { popup_name: 'confirm_popup', popup_btn_name: 'confirm' });
                };
              return (
                (0, l.useLayoutEffect)(function () {
                  _().setNavigationBarTitle({ title: '\u6388\u6743' });
                }, []),
                (0, l.useEffect)(function () {
                  x();
                }, []),
                (0, s.useDidShow)(function () {
                  (0, v.kX)(v.J9.miniprog_page_show, { page_name: 'withdraw_auth' });
                }),
                (0, h.jsxs)(c.G7, {
                  className: J.container,
                  children: [
                    (0, h.jsx)(N, {
                      show: p,
                      onShow: function () {
                        return (0, v.kX)(v.J9.miniprog_popup_show, { popup_name: 'confirm_popup' });
                      },
                      children: (0, h.jsxs)(c.G7, {
                        className: J['confirm-modal'],
                        children: [
                          (0, h.jsx)(c.G7, {
                            className: J['confirm-modal-content'],
                            children:
                              '\u62d2\u7edd\u6388\u6743\u540e\u5c06\u65e0\u6cd5\u6b63\u5e38\u63d0\u4f9b\u670d\u52a1 \u5e76\u76f4\u63a5\u8df3\u8f6c\u56de\u5e94\u7528'
                          }),
                          (0, h.jsxs)(c.G7, {
                            className: J['confirm-modal-operation'],
                            children: [
                              (0, h.jsx)(c.zx, {
                                className: J['confirm-modal-operation-btn'],
                                onClick: y,
                                children: '\u53d6\u6d88'
                              }),
                              (0, h.jsx)(c.zx, {
                                className: u()(
                                  J['confirm-modal-operation-btn'],
                                  J['confirm-modal-operation-btn_confirm']
                                ),
                                openType: 'launchApp',
                                appParameter: '?scene=confirm_popup',
                                onClick: G,
                                onLaunchApp: function () {
                                  return g('confirm_popup');
                                },
                                onError: function (n) {
                                  return w(n, 'confirm_popup');
                                },
                                children: '\u786e\u5b9a'
                              })
                            ]
                          })
                        ]
                      })
                    }),
                    (0, h.jsx)(Z, {}),
                    (0, h.jsxs)(c.G7, {
                      children: [
                        (0, h.jsxs)(c.G7, {
                          className: J.btn,
                          children: [
                            (0, h.jsx)(j, {
                              openType: 'launchApp',
                              appParameter: o,
                              className: J['btn-primary'],
                              colorType: 'primary',
                              onClick: k,
                              onLaunchApp: function () {
                                return g('permit');
                              },
                              onError: function (n) {
                                return w(n, 'permit');
                              },
                              children: '\u5141\u8bb8'
                            }),
                            (0, h.jsx)(j, { onClick: b, className: J['btn-reject'], children: '\u62d2\u7edd' })
                          ]
                        }),
                        (0, h.jsx)(c.G7, {
                          className: J.desc,
                          children:
                            '\u7528\u6237\u5141\u8bb8\u6388\u6743\u540e\u5c06\u81ea\u52a8\u8df3\u8f6c\u5e94\u7528'
                        })
                      ]
                    })
                  ]
                })
              );
            },
            S = O,
            X = {};
          Page((0, t.createPageConfig)(S, 'pages/withdraw_auth/index', { root: { cn: [] } }, X || {}));
        }
      },
      function (n) {
        var e = function (e) {
          return n((n.s = e));
        };
        n.O(0, [107, 216, 592], function () {
          return e(6593);
        });
        n.O();
      }
    ]);
    //# sourceMappingURL=index.js.map
  }
);
require('pages/withdraw_auth/index.js');
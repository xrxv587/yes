__wxRoute = 'pages/index/index';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/index/index.js';
define(
  'pages/index/index.js',
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
      [539],
      {
        4552: function (e, s, a) {
          var o = a(2690),
            c = a(8583),
            n = a(9562),
            r = a.n(n),
            i = a(2983),
            d = a(982),
            l = a(6690),
            h = a(7458),
            t = function (e) {
              var s = e.item,
                a = s.skuId,
                o = s.skuImage,
                n = s.spuName,
                i = s.price,
                d = s.discountPrice,
                l = d || i,
                t = Boolean(d && d !== i);
              return (0, h.jsxs)(c.G7, {
                className: 'goods-card',
                hoverClass: 'goods-card--active',
                hoverStayTime: 100,
                onClick: function () {
                  return r().navigateTo({ url: '/pages/goods-detail/index?skuId='.concat(a) });
                },
                children: [
                  (0, h.jsxs)(c.G7, {
                    className: 'goods-card__image-wrap',
                    children: [
                      o && (0, h.jsx)(c.Ee, { src: o, webp: !0, mode: 'aspectFill', className: 'goods-card__image' }),
                      t && (0, h.jsx)(c.G7, { className: 'goods-card__badge', children: '\u9650\u65f6\u4ef7' })
                    ]
                  }),
                  (0, h.jsxs)(c.G7, {
                    className: 'goods-card__body',
                    children: [
                      (0, h.jsx)(c.G7, { className: 'goods-card__name', children: n }),
                      (0, h.jsxs)(c.G7, {
                        className: 'goods-card__price-row',
                        children: [
                          (0, h.jsxs)(c.G7, {
                            className: 'goods-card__price',
                            children: [
                              (0, h.jsx)(c.G7, { className: 'goods-card__currency', children: '\xa5' }),
                              (0, h.jsx)(c.G7, { children: l })
                            ]
                          }),
                          t && (0, h.jsxs)(c.G7, { className: 'goods-card__original', children: ['\xa5', i] })
                        ]
                      })
                    ]
                  })
                ]
              });
            },
            m = function () {
              var e = (0, d.Q)();
              return (
                (0, n.useDidShow)(function () {
                  (0, l.kX)(l.J9.miniprog_page_show, { page_name: 'home' });
                }),
                (0, i.useEffect)(function () {
                  r().hideShareMenu();
                }, []),
                (0, h.jsxs)(c.G7, {
                  className: 'home-page',
                  children: [
                    (0, h.jsxs)(c.G7, {
                      className: 'home-hero',
                      children: [
                        (0, h.jsx)(c.G7, { className: 'home-hero__eyebrow', children: 'SELECTED GOODS' }),
                        (0, h.jsx)(c.G7, { className: 'home-hero__title', children: '\u597d\u7269\u653e\u6620\u5ba4' }),
                        (0, h.jsx)(c.G7, {
                          className: 'home-hero__subtitle',
                          children: '\u628a\u7075\u611f\u548c\u559c\u6b22\uff0c\u5e26\u8fdb\u65e5\u5e38'
                        }),
                        (0, h.jsx)(c.G7, { className: 'home-hero__decoration home-hero__decoration--one' }),
                        (0, h.jsx)(c.G7, { className: 'home-hero__decoration home-hero__decoration--two' })
                      ]
                    }),
                    (0, h.jsxs)(c.G7, {
                      className: 'home-section-heading',
                      children: [
                        (0, h.jsxs)(c.G7, {
                          children: [
                            (0, h.jsx)(c.G7, {
                              className: 'home-section-heading__title',
                              children: '\u4eca\u65e5\u7cbe\u9009'
                            }),
                            (0, h.jsx)(c.G7, {
                              className: 'home-section-heading__subtitle',
                              children: '\u6bcf\u4e00\u4ef6\u90fd\u6709\u5b83\u7684\u6545\u4e8b'
                            })
                          ]
                        }),
                        (0, h.jsxs)(c.G7, {
                          className: 'home-section-heading__count',
                          children: [e.length, ' \u4ef6\u597d\u7269']
                        })
                      ]
                    }),
                    (0, h.jsx)(c.G7, {
                      className: 'home-goods-list',
                      children: e.map(function (e) {
                        return (0, h.jsx)(t, { item: e }, e.skuId);
                      })
                    })
                  ]
                })
              );
            },
            _ = m,
            g = { navigationBarTitleText: '\u81ea\u8425\u5468\u8fb9' };
          Page((0, o.createPageConfig)(_, 'pages/index/index', { root: { cn: [] } }, g || {}));
        }
      },
      function (e) {
        var s = function (s) {
          return e((e.s = s));
        };
        e.O(0, [107, 216, 592], function () {
          return s(4552);
        });
        e.O();
      }
    ]);
    //# sourceMappingURL=index.js.map
  }
);
require('pages/index/index.js');
__wxRoute = 'pages/goods-detail/index';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/goods-detail/index.js';
define(
  'pages/goods-detail/index.js',
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
      [8],
      {
        8963: function (s, e, a) {
          var o = a(2690),
            l = a(8583),
            i = a(9562),
            d = a.n(i),
            c = a(982),
            t = a(6690),
            n = a(7458),
            r = function () {
              var s = (0, i.useRouter)(),
                e = (0, c.Q)().find(function (e) {
                  return e.skuId === s.params.skuId;
                });
              if (
                ((0, i.useDidShow)(function () {
                  (0, t.kX)(t.J9.miniprog_page_show, { page_name: 'goods_detail' });
                }),
                !e)
              )
                return (0, n.jsxs)(l.G7, {
                  className: 'goods-detail goods-detail--empty',
                  children: [
                    (0, n.jsx)(l.G7, { className: 'goods-detail__empty-mark', children: '?' }),
                    (0, n.jsx)(l.G7, {
                      className: 'goods-detail__empty-title',
                      children: '\u5546\u54c1\u4e0d\u5b58\u5728'
                    }),
                    (0, n.jsx)(l.G7, {
                      className: 'goods-detail__empty-action',
                      onClick: function () {
                        return d().navigateBack();
                      },
                      children: '\u8fd4\u56de\u901b\u901b'
                    })
                  ]
                });
              var a = e.skuImage,
                o = e.spuName,
                r = e.price,
                _ = e.discountPrice,
                g = e.stock,
                m = _ || r,
                u = Boolean(_ && _ !== r),
                x = function () {
                  d().showToast({
                    title: '\u5546\u54c1\u552e\u7f44\uff0c\u6b63\u5728\u8865\u8d27\u4e2d',
                    icon: 'none',
                    duration: 2200
                  });
                };
              return (0, n.jsxs)(l.G7, {
                className: 'goods-detail',
                children: [
                  (0, n.jsxs)(l.G7, {
                    className: 'goods-detail__image-card',
                    children: [
                      (0, n.jsx)(l.Ee, { src: a, webp: !0, mode: 'aspectFill', className: 'goods-detail__image' }),
                      (0, n.jsx)(l.G7, { className: 'goods-detail__image-label', children: 'CURATED SELECTION' })
                    ]
                  }),
                  (0, n.jsxs)(l.G7, {
                    className: 'goods-detail__content',
                    children: [
                      (0, n.jsx)(l.G7, { className: 'goods-detail__name', children: o }),
                      (0, n.jsxs)(l.G7, {
                        className: 'goods-detail__price-row',
                        children: [
                          (0, n.jsxs)(l.G7, {
                            children: [
                              (0, n.jsx)(l.G7, {
                                className: 'goods-detail__meta-label',
                                children: '\u6298\u6263\u4ef7'
                              }),
                              (0, n.jsxs)(l.G7, {
                                className: 'goods-detail__price',
                                children: [
                                  (0, n.jsx)(l.G7, { className: 'goods-detail__currency', children: '\xa5' }),
                                  (0, n.jsx)(l.G7, { children: m })
                                ]
                              })
                            ]
                          }),
                          (0, n.jsxs)(l.G7, {
                            className: 'goods-detail__original-wrap',
                            children: [
                              (0, n.jsx)(l.G7, { className: 'goods-detail__meta-label', children: '\u539f\u4ef7' }),
                              (0, n.jsxs)(l.G7, {
                                className: 'goods-detail__original '.concat(
                                  u ? 'goods-detail__original--discounted' : ''
                                ),
                                children: ['\xa5', r]
                              })
                            ]
                          }),
                          u &&
                            (0, n.jsxs)(l.G7, {
                              className: 'goods-detail__discount-tag',
                              children: ['\u5df2\u4f18\u60e0 \xa5', (Number(r) - Number(m)).toFixed(2)]
                            })
                        ]
                      }),
                      (0, n.jsxs)(l.G7, {
                        className: 'goods-detail__stock-row',
                        children: [
                          (0, n.jsx)(l.G7, {
                            className: 'goods-detail__stock-icon',
                            children: (0, n.jsx)(l.G7, { className: 'goods-detail__stock-dot' })
                          }),
                          (0, n.jsxs)(l.G7, {
                            className: 'goods-detail__stock-copy',
                            children: [
                              (0, n.jsx)(l.G7, {
                                className: 'goods-detail__stock-title',
                                children: '\u5e93\u5b58\u5145\u8db3'
                              }),
                              (0, n.jsxs)(l.G7, {
                                className: 'goods-detail__stock-subtitle',
                                children: ['\u5f53\u524d\u5269\u4f59 ', g, ' \u4ef6']
                              })
                            ]
                          }),
                          (0, n.jsx)(l.G7, { className: 'goods-detail__stock-value', children: '\u73b0\u8d27' })
                        ]
                      })
                    ]
                  }),
                  (0, n.jsxs)(l.G7, {
                    className: 'goods-detail__footer',
                    children: [
                      (0, n.jsxs)(l.G7, {
                        className: 'goods-detail__footer-copy',
                        children: [
                          (0, n.jsx)(l.G7, {
                            className: 'goods-detail__footer-label',
                            children: '\u5e94\u4ed8\u91d1\u989d'
                          }),
                          (0, n.jsxs)(l.G7, { className: 'goods-detail__footer-price', children: ['\xa5', m] })
                        ]
                      }),
                      (0, n.jsxs)(l.G7, {
                        className: 'goods-detail__buy-button',
                        hoverClass: 'goods-detail__buy-button--active',
                        onClick: x,
                        children: [
                          '\u7acb\u5373\u8d2d\u4e70',
                          (0, n.jsx)(l.G7, { className: 'goods-detail__buy-arrow', children: '\u2192' })
                        ]
                      })
                    ]
                  })
                ]
              });
            },
            _ = r,
            g = {
              navigationBarTitleText: '\u5546\u54c1\u8be6\u60c5',
              navigationBarBackgroundColor: '#f5f4ef',
              navigationBarTextStyle: 'black'
            };
          Page((0, o.createPageConfig)(_, 'pages/goods-detail/index', { root: { cn: [] } }, g || {}));
        }
      },
      function (s) {
        var e = function (e) {
          return s((s.s = e));
        };
        s.O(0, [107, 216, 592], function () {
          return e(8963);
        });
        s.O();
      }
    ]);
    //# sourceMappingURL=index.js.map
  }
);
require('pages/goods-detail/index.js');
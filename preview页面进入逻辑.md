# Preview 页面（商品预览）进入逻辑梳理

> 代码来源：反编译的微信小程序（Taro 3 + React 编译产物）
> 页面路由：`pages/preview/preview`，页面标题：**商品预览**

## 1. 涉及的关键文件

| 文件 | 作用 |
|---|---|
| [app.json](file:///workspace/decompiled/app.json) | 小程序页面注册（index / goods-detail / withdraw_auth / preview） |
| [preview.js](file:///workspace/decompiled/pages/preview/preview.js) | preview 页面全部逻辑（编译后） |
| [ShareBtn/index.js](file:///workspace/decompiled/pages/preview/components/ShareBtn/index.js) | 页面内 `share-btn` 原生转发按钮组件 |
| [app-service.pretty.js](file:///workspace/decompiled/app-service.pretty.js) | 公共模块：用户登录 Store、事件总线、埋点、请求封装、App 入口 |

---

## 2. 页面入口

preview 页面**没有站内跳转入口**（其他页面无 `navigateTo('/pages/preview/preview')`），进入方式：

1. **分享卡片（主入口）**：本页 `useShareAppMessage` 生成的分享路径
   `/pages/preview/preview?template_id=xxx&share_id=分享者openId&...`
2. **直接打开**：扫码 / URL scheme 等冷启动直达。

### 关键入参

| 参数 | 来源 | 说明 |
|---|---|---|
| `template_id` | URL query | 商品模板 ID，**权限校验必需** |
| `share_id` | URL query | 分享者的 openId，用于 shareTicket 校验兜底 |
| `traffic_label` | URL query | 环境标签，请求拦截器转成 `x-tt-env` 请求头 |
| `shareTicket` | 微信注入（非 URL 参数） | 经"私密消息"分享卡片进入时，出现在 `useDidShow` 回调参数中，是区分 agent / user 身份的关键 |

---

## 3. App 全局启动（先于页面执行）

App 根组件 `useLaunch`（[app-service.pretty.js:29778-29795](file:///workspace/decompiled/app-service.pretty.js#L29778-L29795)）：

1. `Taro.hideShareMenu()` — 全局隐藏右上角转发菜单；
2. 初始化前端监控（Sentry），带上启动 query / path / scene / appId；
3. 调用全局 `login({ shareTicket })`（注意：**不带** beforeLogin / afterLogin）；
4. 登录完成后向监控 `config` 写入 openId / unionId / userType。

> 全局登录与 preview 页面登录共用同一个 `UserStore` 单例，且登录结果有 **30 分钟缓存**（`J = 18e5 ms`）+ `_isProcessing` 并发锁。因此页面 `useDidShow` 里再次调 `login` 时，若全局登录已完成且未过期，会**直接短路返回**。

---

## 4. 页面挂载：Hook 执行顺序

主组件 `B`（导出名 `E`，[preview.js:291-343](file:///workspace/decompiled/pages/preview/preview.js#L291-L343)）每次渲染按以下顺序执行：

| # | Hook | 位置 | 作用 |
|---|---|---|---|
| 1 | `useUrlParams` (`y`) | L105-119 | `useState` 惰性初始化读取 `Taro.getCurrentInstance().router.params`；`useDidShow` 时若存在 `template_id` 则重新读取（适配热启动参数变化） |
| 2 | `useUserInfo` (`b`) | L83-103 | `loading=true`、`userInfo={}` 初始值 |
| 3 | `useOnLogin` (`w`) | L66-81 | `useEffect` 向**事件总线**订阅 `Login` 事件，`emittedExecute: true`（若登录事件早已发出，注册时立即补发回调）。回调里 `openId` 存在 → `setUserInfo` + 关 loading；否则关 loading 并打错误日志 |
| 4 | `useShare` (`T`) | L120-165 | 见下文"分享链路" |
| 5 | `useAuth` (`k`) | L167-185 | 计算 `isAuth` 与 `illegalReason`，见下文"权限校验" |
| 6 | `useDebugInfo` (`Z`) | L188-216 | 1 秒内连点 10 次右下角区域，显示调试浮层（logid / unionId / illegalReason） |
| 7 | `useDidShow` | L313-324 | **页面每次显示时**：① 调 `login({ shareTicket, beforeLogin: 开loading, afterLogin: 关loading })`；② 埋点 `miniprog_page_show { page_name: 'preview' }` |
| 8 | 渲染分支 | L325-341 | 见下文"渲染结果" |

### 分享链路（useShare, L120-165）

- `userType === agent` → `showShareMenu({ withShareTicket: true })`；否则 `hideShareMenu()`（**user 身份不可转发**，形成裂变闭环：user 转发的卡片进入后仍是 user）；
- 存在 `activity_id` → `wx.updateShareMenu({ isPrivateMessage: true, activityId })`（开启私密消息分享，使被分享者进入时携带 shareTicket，用于校验裂变关系）；
- `useShareAppMessage`：返回 `{ title: '精选分享', path: '/pages/preview/preview?' + 当前query + share_id=openId }`。

### 权限校验（useAuth, L167-185）

```
isAuth = (userType === agent || userType === user)   // 身份合法
      && Boolean(template_id)                        // 模板参数存在
      && Boolean(unionId || openId)                  // 用户身份存在
```

`illegalReason` 优先级：`缺少templateId` → `缺少用户Id` → `用户类型异常` → `未知错误`。

### 渲染结果（L325-341）

```
isAuth && !(loginLoading || shareConfigLoading)
  → <Webview R>（正常商品页）
否则
  → <错误页 M>：
      userType === illegal_agent → "暂无权限，请联系管理员开通～"
      其他                       → "商品走丢了，请稍后再试～"
      （右下角均带调试信息入口 G）
任意时刻 loading 为 true → loading.gif 全屏遮罩（组件 _，L45-59）
```

---

## 5. 登录流程详解（核心）

`UserStore.login()`（[app-service.pretty.js:10832-10888](file:///workspace/decompiled/app-service.pretty.js#L10832-L10888)）→ `_login()`（[L10711-10830](file:///workspace/decompiled/app-service.pretty.js#L10711-L10830)）：

```
login({ shareTicket, beforeLogin, afterLogin })
 ├─ 防抖：_isProcessing 为 true，或已登录且距上次登录 < 30min → 直接 return
 ├─ _lastLoginTimeStamp = now；_isProcessing = true
 ├─ beforeLogin()                    // 页面 loading = true
 ├─ _login({ shareTicket }):
 │   ├─ 读取全部 URL 参数 (Qf)
 │   ├─ POST https://sl.csjdeveloper.com/pangle/wx_api/cps/query_user_info
 │   │    ├─ interceptorConfig.useLoginInterceptor = true
 │   │    │    → 请求拦截器先调 wx.login 拿 code，
 │   │    │      注入 common_wechat_param: { code_id: code, mini_app_id: appId }
 │   │    ├─ 入参：{ template_id, query: URL参数序列化, need_activity_id: !shareTicket }
 │   │    └─ 响应：logid、wechat_user_info(union_id/open_id)、
 │   │              activity_info(status/activity_id)、wechat_configs(webview_domain)
 │   ├─ 成功 → 暂存 logid 与三块数据；失败 → 仅记日志（后续字段为空 → 错误页）
 │   ├─ userType 判定：
 │   │    ├─ 有 shareTicket（从私密分享卡片进入）：
 │   │    │    wx.authPrivateMessage({ shareTicket }) 校验
 │   │    │      valid → user(4)；invalid → illegal_user(3)
 │   │    │    兜底：URL 参数 share_id === 返回的 open_id 也视为 valid
 │   │    └─ 无 shareTicket（直接打开）：
 │   │         activity_info.status === normal && activity_id 存在 → agent(2)
 │   │         否则 → illegal_agent(1)
 │   ├─ 事件总线 emit Login 事件（unionId/openId/userType/shareTicket/
 │   │    loginLogId/activityInfo/wxConfigs）
 │   └─ 埋点 login_result
 └─ finally：_isProcessing = false；afterLogin()   // 页面 loading = false
```

### 事件驱动的 UI 更新

`Login` 事件 → `useOnLogin` 回调 → `setUserInfo` → 组件重渲染 → `useAuth` 重算 `isAuth` → Webview / 错误页切换。
`emittedExecute: true` 保证了：即使登录在 `useEffect` 订阅之前就完成（如全局登录先于页面挂载），页面也能拿到结果。

---

## 6. Webview 组件（R, L264-289）

```
src = https://{domain}/page/wxReceiveToken?{urlParams
       + wx_open_id + wx_union_id + wx_appid + loginLogId}#wechat_redirect
```

- `domain`：`userInfo.wxConfigs.webview_domain || 'sl.csjdeveloper.com'`（服务端可下发）；
- `key = `${unionId || openId}-${template_id}`：身份或模板变化时**强制销毁重建** webview，避免串数据；
- 子节点渲染原生组件 `share-btn`（`Component` 封装，仅一个 `canShare` 布尔属性，控制转发按钮显隐），覆盖在 `web-view` 之上。

> 即：H5 侧拿到 URL 上的身份参数（wxReceiveToken）后自行完成 token 置换与页面渲染，小程序侧只负责鉴权与传参。

---

## 7. 用户类型与页面表现对照

| userType | 枚举值 | 判定条件 | 页面表现 |
|---|---|---|---|
| unknown | 0 | 默认值 / 接口失败 | 错误页"商品走丢了" |
| illegal_agent | 1 | 无 shareTicket 且活动状态异常 | "暂无权限，请联系管理员开通～" |
| agent | 2 | 无 shareTicket 且活动正常（分销员本人） | Webview + **可转发**（带 shareTicket 私密分享） |
| illegal_user | 3 | 有 shareTicket 但校验失败 | 错误页"商品走丢了" |
| user | 4 | 有 shareTicket 且校验通过（被分享者） | Webview + 不可转发 |

---

## 8. 完整时序

```
用户点击分享卡片
  └─ 微信拉起小程序
      ├─ App.useLaunch：hideShareMenu → 监控初始化 → 全局 login(shareTicket)
      └─ preview 页面创建
          ├─ Hooks 初始化：读 URL 参数 / 订阅 Login 事件（emittedExecute）
          ├─ useDidShow：页面级 login（通常被 30min 缓存短路）→ 埋点 page_show
          ├─ Login 事件触发（全局或页面）
          │    └─ setUserInfo → 重渲染 → isAuth 判定
          └─ 渲染：isAuth 且非 loading → Webview(wxReceiveToken)
                    否则            → 错误页（含调试入口）
```

---

## 9. 关键代码位置速查

| 逻辑 | 文件:行号 |
|---|---|
| 页面注册 | [app.json:7](file:///workspace/decompiled/app.json#L7) |
| App 启动（useLaunch / 全局登录） | [app-service.pretty.js:29775-29798](file:///workspace/decompiled/app-service.pretty.js#L29775-L29798) |
| URL 参数读取 `Qf` | [app-service.pretty.js:10980-10993](file:///workspace/decompiled/app-service.pretty.js#L10980-L10993) |
| 用户类型枚举 `W` | [app-service.pretty.js:10574-10583](file:///workspace/decompiled/app-service.pretty.js#L10574-L10583) |
| query_user_info 接口 `D` | [app-service.pretty.js:10555-10560](file:///workspace/decompiled/app-service.pretty.js#L10555-L10560) |
| shareTicket 校验 `checkShareTicket` | [app-service.pretty.js:10648-10709](file:///workspace/decompiled/app-service.pretty.js#L10648-L10709) |
| 登录主流程 `_login` | [app-service.pretty.js:10711-10830](file:///workspace/decompiled/app-service.pretty.js#L10711-L10830) |
| 登录入口（防抖/30min 缓存）`login` | [app-service.pretty.js:10832-10888](file:///workspace/decompiled/app-service.pretty.js#L10832-L10888) |
| 埋点 `kX` / 事件枚举 `J9` | [app-service.pretty.js:11292-11320](file:///workspace/decompiled/app-service.pretty.js#L11292-L11320) |
| useOnLogin 事件订阅 | [preview.js:66-81](file:///workspace/decompiled/pages/preview/preview.js#L66-L81) |
| useUrlParams | [preview.js:105-119](file:///workspace/decompiled/pages/preview/preview.js#L105-L119) |
| useShare（分享菜单/私密消息/分享路径） | [preview.js:120-165](file:///workspace/decompiled/pages/preview/preview.js#L120-L165) |
| useAuth 权限校验 | [preview.js:167-185](file:///workspace/decompiled/pages/preview/preview.js#L167-L185) |
| Webview 组件 R | [preview.js:264-289](file:///workspace/decompiled/pages/preview/preview.js#L264-L289) |
| 主组件 B（useDidShow + 渲染分支） | [preview.js:291-343](file:///workspace/decompiled/pages/preview/preview.js#L291-L343) |
| share-btn 组件 | [ShareBtn/index.js:33](file:///workspace/decompiled/pages/preview/components/ShareBtn/index.js#L33) |

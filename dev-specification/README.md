# 代码规范

#### version-logs

```
ver.20250306-01 / Jason Feng <solidzoro@live.com> / init
```

## \_\_代码规范-通用\_\_

### prettier

遵循 `.prettierrc.cjs`（注意是 `.cjs`，避免项目 `package.json` 申明
`"type": "module"` 时 `.js` 被忽略）

```js
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
};
```

### eslint

项目不同，有不同的配置，尽可能统一，如因团队人员出现分歧，以 [airbnb](https://github.com/airbnb/javascript)
的约定为准，保持深思熟虑。团队磨合达到 stable 稳定后，在这个项目的 sample 里维护一份。

config 不做 `extends`， 不做 `file-sharing`，需要手动 copy config 到项目使用。

eslint config sample
文件在这里： [eslint.config.mjs](_config-sample/eslint.config.mjs) 。

### 类型 types

#### 全局 types

放在 `/types` 里，命名例子 `global-type.d.ts`,

#### 局部 types

使用 匈牙利命名法（Hungarian Notation），对于 interface 和 type 需要在命名前面加 `I`，除此之外别的例如 enum 不需要加。

例子：

```ts
interface IAbc {
};

type IXyz = {};

enum OrderStatus {
  pending = 1,
  error = -1,
}
```

- 没有复用

  types 跟随组件代码

  ```tsx
  import React from 'react';
  
  interface IProps {
    a?: boolean;
    b?: number;
  }
  
  export const SampleComp: React.FC<IProps> = (props) => {
    return (<div>SAMPLE-TEXT</div>)
  }
  ```

- 有复用

  types 放在组件代码同文件, 文件名叫 _types.ts

  ```ts
  // 注意命名一定包含组件名字
  export interface ISampleCompProps {
    a?: boolean;
    b?: number;
  }
  ```

  ```tsx
  import React from 'react';
  import { ISampleCompProps } from './_types';
  
  export const SampleComp: React.FC<ISampleCompProps> = (props) => {
    return (<div>SAMPLE-TEXT</div>)
  }
  ```

### 环境变量 dotenv

统一使用 dotenv，一般来说，只有 3 个 .env 文件

- .env.example
- .env.development
- .env

git 项目只同步 `.env.example` 文件，其他一律不得同步（必须仔细检查，避免 key 泄漏）。

如 .env 文件有任何变化，请同步字段到 `.env.example` 并做好详细注释。

env 字段必须使用框架名开头，比如 `VITE_`，确保只有此开头的字段会 build 到 prod 产物，如有不想暴露的字段，请在前面加入 `SECRET_`， 变成 `SECRET_VITE_`，在 build prod 产物的时候，再次确保 key 没有被打包在任意文件里。

### Git 提交规范

请参考 https://github.com/streamich/git-cz ，并学习使用。

在配置好的情况下，可以在终端输入 `cz`，按 UI 提示完成 git 提交流程。

提交规范我们使用 `@commitlint/config-conventional` 详见：[commitlint.config.js](_config-sample/commitlint.config.js) ，BTW，我们不使用 emoji。

### Git 提交校验

请使用 [hysky](https://github.com/typicode/husky) 和 [lint-staged](https://github.com/lint-staged/lint-staged)，具体看教程，这里不再赘述。

### 版本号 version

如果发版，想办法生成一个版本号信息，在 prod 环境要能看到，无论是 UI 或是 console 下。所有日志都有版本号信息，发现 bug 先看版本号。

```json
{
  "version": {
    "PKG_NAME": "prod-name",
    "AUTHOR": "Jason Feng <solidzoro[#]live.com>",
    "VERSION": "3.4.5",
    "BUILD_NUMBER": 3004005,
    "BUILD_TIME": "20250207-203542",
    "COMMIT_HASH": "0fa9"
  }
}
```

## 代码规范-API

### mysql

所有 db 和 table 请使用 `utf8mb4_unicode_ci`，避免  `emoji 😊` 问题，避免 `'ü' = 'u'` 问题，注意是 `unicode` 不是 `general`。


-------------------------------------

# 技术栈

## 技术栈-通用部分

### types

```
__如果是对接 后台 api 的，直接使用脚本转换后的 types，脚本一键生成__
```

### 技术栈-目录约定

```
.\
  \docs --------------------- // 文档
  \script ------------------- // 脚本
  \src
    \assets
      \images
      \fonts
    \consts ----------------- // 放常量，名字直接能体现什么常量
      url.const.ts
      antd.const.ts
    \components ------------- // UI 组件目录
      \SampleComp ----------- // 组件 SampleComp
        SampleComp.tsx
        styles.module.scss
        index.ts // 只负责导出
    \page-components -------- // 页面组件目录
      \account
        \AccountIndex
        \AccountHeader
    \libs ------------------- // 需要 copy 过来的 lib，不方便 npm 安装
    \utils ------------------ // 工具，名字直接能体现什么常量
      dom.util.ts
    \configs
      app.config.ts
    ...
    ...
    ... 对于 api 下面补充一些
    ...
    ...
    \modules ---------------- // 模块拆分了放这里
      user.module.ts
    \dbs -------------------- // 放数据库 model，不叫 model 是容易 module 搞混
      user.scheme.ts
```

## 技术栈-小程序 (weapp / 原生)

- lib: __原生__
- dev-tools: __小程序IDE__
- UI: __[vant-weapp](https://github.com/youzan/vant-weapp)__
- fetch: __内置??__
- router: __内置??__
- state: __内置??__
- router: __内置??__
- icon: __svg??__
- style: __scss (css modules)__

## 技术栈-Admin (admin / React)

- lib: __[React](https://react.dev/)__
- dev-tools: __[vite](https://vite.dev/)__
- UI: __[antd](https://github.com/ant-design/ant-design)__
- router: __[react-router](https://github.com/remix-run/react-router)__
- fetch: __[axios](https://github.com/axios/axios)__ + __[react-query](https://github.com/TanStack/query)__
- state: __[zustand](https://github.com/pmndrs/zustand)__
- icon: __[react-icons](https://github.com/react-icons/react-icons)__
- style: __scss (css modules)__

## 技术栈-API (api / hono.js)

- lib: __[hono.js](https://hono.dev/) + docker__
- db: __mysql__
- orm: __[drizzle](https://orm.drizzle.team/)__
- doc: __直接使用 [postman](https://www.postman.com/)__
- fetch: __如果有 request 外站需求，建议内置的 fetch__
- validation: __[zod](https://zod.dev/) + @hono/zod-validator__



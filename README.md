<div align="center">
	<h1>fs-web</h1>
让树懒也能象闪电一样工作
</div>
<br />

## 简介

flash-sloth（闪电树懒）是一个立志于简化开发工作，让开发人员集中尽力

## 特性

- **前沿技术应用**：采用 Vue3, Vite5, TypeScript, Pinia 和 UnoCSS 等最新流行的技术栈。
- **参考优秀前端框架**：参考 fast-crud，vben-admin，Soybean-admin-antd等优秀前端框架的设计思想
- **清晰的项目架构**：采用 pnpm monorepo 架构，结构清晰，优雅易懂。
- **严格的代码规范**：遵循 [SoybeanJS 规范](https://docs.soybeanjs.cn/zh/standard)，集成了eslint, prettier 和 simple-git-hooks，保证代码的规范性。
- **TypeScript**： 支持严格的类型检查，提高代码的可维护性。
- **丰富的主题配置**：内置多样的主题配置，与 UnoCSS 完美结合。
- **内置国际化方案**：轻松实现多语言支持。
- **自动化文件路由系统**：自动生成路由导入、声明和类型。更多细节请查看 [Elegant Router](https://github.com/soybeanjs/elegant-router)。
- **灵活的权限路由**：同时支持前端静态路由和后端动态路由。
- **丰富的页面组件**：内置多样页面和组件，包括403、404、500页面，以及布局组件、标签组件、主题配置组件等。
- **命令行工具**：内置高效的命令行工具，git提交、删除文件、发布等。
- **移动端适配**：完美支持移动端，实现自适应布局。

## 使用

**环境准备**

确保你的环境满足以下要求：

- **git**: 你需要git来克隆和管理项目版本。
- **NodeJS**: >=18.0.0，推荐 18.19.0 或更高。
  > 你可以使用 [fnm](https://github.com/Schniz/fnm) 来管理你的NodeJS版本，[安装教程](https://juejin.cn/post/7113462239734022158)。
  >
- **pnpm**: >= 8.0.0，推荐 8.14.0 或更高。

**克隆项目**

```bash
git clone https://github.com/flash-sloth/fs-web.git
```

**安装依赖**

```bash
pnpm i
```

> 由于本项目采用了 pnpm monorepo 的管理方式，因此请不要使用 npm 或 yarn 来安装依赖。

**启动项目**

```bash
pnpm dev
```

**构建项目**

```bash
pnpm build
```

## Git 提交规范

本项目已内置 `commit` 命令，您可以通过执行 `pnpm commit` 来生成符合 [Conventional Commits](conventionalcommits) 规范的提交信息。在提交PR时，请务必使用 `commit` 命令来创建提交信息，以确保信息的规范性。

## 浏览器支持

推荐使用最新版的 Chrome 浏览器进行开发，以获得更好的体验。


| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt="IE" width="24px" height="24px"  />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| not support                                                                                                                                                                                                                             | last 2 versions                                                                                                                                                                               | last 2 versions                                                                                                                                                                                       | last 2 versions                                                                                                                                                                                    | last 2 versions                                                                                                                                                                                    |

## 开源作者

## 开源协议

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE) ![](https://img.shields.io/github/stars/soybeanjs/soybean-admin) ![](https://img.shields.io/github/forks/soybeanjs/soybean-admin)

> [!NOTE]
> If you think `Soybean Admin` is helpful to you, or you like our project, please give us a ⭐️ on GitHub. Your support is the driving force for us to continue to improve and add new features! Thank you for your support!

## Introduction

[`Soybean Admin`](https://github.com/soybeanjs/soybean-admin) is a clean, elegant, beautiful and powerful admin template, based on the latest front-end technology stack, including Vue3, Vite5, TypeScript, Pinia and UnoCSS. It has built-in rich theme configuration and components, strict code specifications, and an automated file routing system. In addition, it also uses the online mock data solution based on ApiFox. `Soybean Admin` provides you with a one-stop admin solution, no additional configuration, and out of the box. It is also a best practice for learning cutting-edge technologies quickly.

## Features

- **Cutting-edge technology application**: using the latest popular technology stack such as Vue3, Vite5, TypeScript, Pinia and UnoCSS.
- **Clear project architecture**: using pnpm monorepo architecture, clear structure, elegant and easy to understand.
- **Strict code specifications**: follow the [SoybeanJS specification](https://docs.soybeanjs.cn/standard), integrate eslint, prettier and simple-git-hooks to ensure the code is standardized.
- **TypeScript**: support strict type checking to improve code maintainability.
- **Rich theme configuration**: built-in a variety of theme configurations, perfectly integrated with UnoCSS.
- **Built-in internationalization solution**: easily realize multi-language support.
- **Automated file routing system**: automatically generate route import, declaration and type. For more details, please refer to [Elegant Router](https://github.com/soybeanjs/elegant-router).
- **Flexible permission routing**: support both front-end static routing and back-end dynamic routing.
- **Rich page components**: built-in a variety of pages and components, including 403, 404, 500 pages, as well as layout components, tag components, theme configuration components, etc.
- **Command line tool**: built-in efficient command line tool, git commit, delete file, release, etc.
- **Mobile adaptation**: perfectly support mobile terminal to realize adaptive layout.

## Version

- **NaiveUI Version:**

  - [Preview Link](https://naive.soybeanjs.cn/)
  - [Github Repository](https://github.com/soybeanjs/soybean-admin)
  - [Gitee Repository](https://gitee.com/honghuangdc/soybean-admin)
- **AntDesignVue Version:**

  - [Preview Link](https://antd.soybeanjs.cn/)
  - [Github Repository](https://github.com/soybeanjs/soybean-admin-antd)
  - [Gitee Repository](https://gitee.com/honghuangdc/soybean-admin-antd)
- **Legacy Version:**

  - [Preview Link](https://legacy.soybeanjs.cn/)
  - [Github Repository](https://github.com/soybeanjs/soybean-admin/tree/legacy)

## Documentation

- [Link](https://docs.soybeanjs.cn)
- [Legacy Docs](https://legacy-docs.soybeanjs.cn)

## Example Images

![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-01.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-02.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-03.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-04.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-05.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-06.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-07.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-08.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-09.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-10.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-mobile.png)

## Usage

**Environment Preparation**

Make sure your environment meets the following requirements:

- **git**: you need git to clone and manage project versions.
- **NodeJS**: >=18.0.0, recommended 18.19.0 or higher.
  > You can use [fnm](https://github.com/Schniz/fnm) to manage your NodeJS version, [installation tutorial](https://juejin.cn/post/7113462239734022158).
  >
- **pnpm**: >= 8.0.0, recommended 8.14.0 or higher.

**Clone Project**

```bash
git clone https://github.com/soybeanjs/soybean-admin.git
```

**Install Dependencies**

```bash
pnpm i
```

> Since this project uses the pnpm monorepo management method, please do not use npm or yarn to install dependencies.

**Start Project**

```bash
pnpm dev
```

**Build Project**

```bash
pnpm build
```

## How to Contribute

We warmly welcome and appreciate all forms of contributions. If you have any ideas or suggestions, please feel free to share them by submitting [pull requests](https://github.com/soybeanjs/soybean-admin/pulls) or creating GitHub [issue](https://github.com/soybeanjs/soybean-admin/issues/new).

## Git Commit Guidelines

This project has built-in `commit` command, you can execute `pnpm commit` to generate commit information that conforms to [Conventional Commits](conventionalcommits) specification. When submitting PR, please be sure to use `commit` command to create commit information to ensure the standardization of information.

## Browser Support

It is recommended to use the latest version of Chrome in development for a better experience.


| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt="IE" width="24px" height="24px"  />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| not support                                                                                                                                                                                                                             | last 2 versions                                                                                                                                                                               | last 2 versions                                                                                                                                                                                       | last 2 versions                                                                                                                                                                                    | last 2 versions                                                                                                                                                                                    |

## OpenSource Author

[Soybean](https://github.com/honghuangdc)

## Contributors

Thanks the following people for their contributions. If you want to contribute to this project, please refer to [How to Contribute](#how-to-contribute).

<a href="https://github.com/soybeanjs/soybean-admin/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=soybeanjs/soybean-admin" />
</a>

## Star Trend

[![Star History Chart](https://api.star-history.com/svg?repos=soybeanjs/soybean-admin&type=Date)](https://star-history.com/#soybeanjs/soybean-admin&Date)

## License

This project is based on the [MIT © 2021 Soybean](./LICENSE) protocol, for learning purposes only, please retain the author's copyright information for commercial use, the author does not guarantee and is not responsible for the software.

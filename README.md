# NGX Scroll locker

> Angular module for Page Scroll locking

[![Dependency Status](https://david-dm.org/willmendesneto/ngx-scroll-lock.svg)](https://david-dm.org/willmendesneto/ngx-scroll-lock)
[![npm](https://img.shields.io/badge/stackblitz-online-orange.svg)](https://stackblitz.com/edit/ngx-scroll-lock-sample)

[![NPM](https://nodei.co/npm/ngx-scroll-lock.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/ngx-scroll-lock)
[![NPM](https://nodei.co/npm-dl/ngx-scroll-lock.png?height=3&months=3)](https://npmjs.org/ngx-scroll-lock)

[![Build Status](https://circleci.com/gh/willmendesneto/ngx-scroll-lock.svg?style=shield)](https://circleci.com/gh/willmendesneto/ngx-scroll-lock)
[![Coverage Status](https://coveralls.io/repos/willmendesneto/ngx-scroll-lock/badge.svg?branch=master)](https://coveralls.io/r/willmendesneto/ngx-scroll-lock?branch=master)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-scroll-lock.svg)](https://bundlephobia.com/result?p=ngx-scroll-lock)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

![ngx-scroll-lock in action](https://user-images.githubusercontent.com/1252570/50392356-e1be8780-07a1-11e9-879c-35bc1158e1d1.gif)

## Why scroll lock?

The idea of this component is make the process of locking the page scroll transparent and easier. So the main point is integrate this component with other tooling process, such as:

- When open a modal component
- Open a hamburguer menu
- Any other that you like :)

It's totally transparent for you and you can integrate easier in your application, improving your user experience 🎉

- [Demo](#demo)
- [Install](#install)
- [Setup](#setup)
- [Development](#development)
- [Contribute](#contribute)

## Demo

Try out our [demo on Stackblitz](https://ngx-scroll-lock-sample.stackblitz.io)!

## Install

You can get it on NPM installing `ngx-scroll-lock` module as a project dependency.

```shell
npm install ngx-scroll-lock --save
```

## Setup

You'll need to add `NgxScrollLockModule` to your application module. So that, the `<ngx-scroll-lock>` components will be accessible in your application.

```typescript
...
import { NgxScrollLockModule } from 'ngx-scroll-lock';
...
@NgModule({
  declarations: [
    YourAppComponent
  ],
  imports: [
    ...
    NgxScrollLockModule,
    ...
  ],
  providers: [],
  bootstrap: [YourAppComponent]
})

export class YourAppComponent {}

```

After that, you can use the `ngx-scroll-lock` component in your templates, passing the `target` element into the component itself and/or .

- `target`: DOM element to be locked. Default: `document.body`;
- `lock`: Boolean to be changed in case a scroll lock is needed from outside `ngx-scroll-lock` component;

```js
import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  lock = false;
  target = "#my-element-with-scroll";
}
```

```html
<ngx-scroll-lock [lock]="lock" [target]="target"></ngx-scroll-lock>
<div id="my-element-with-scroll"></div>
```

> Please make sure you have the `target` element available when using it.

## Development

### Run demo locally

1. This project uses [Angular CLI](https://cli.angular.io/) as base. That means you just need to run `npm start` and access the link `http://localhost:4200` in your browser

### Run tests

1. Run `npm test` for run tests. In case you want to test using watch, please use `npm run tdd`

### Publish

this project is using `np` package to publish, which makes things straightforward. EX: `np <patch|minor|major> --contents=dist/ngx-scroll-lock`

> For more details, [please check np package on npmjs.com](https://www.npmjs.com/package/np)

## Contribute

For any type of contribution, please follow the instructions in [CONTRIBUTING.md](https://github.com/willmendesneto/ngx-scroll-lock/blob/master/CONTRIBUTING.md) and read [CODE_OF_CONDUCT.md](https://github.com/willmendesneto/ngx-scroll-lock/blob/master/CODE_OF_CONDUCT.md) files.

## Author

**Wilson Mendes (willmendesneto)**

- <https://twitter.com/willmendesneto>
- <http://github.com/willmendesneto>

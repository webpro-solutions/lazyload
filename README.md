# Lazy Load Modules
![version](https://img.shields.io/badge/Version-1.0.0-green.svg)

  This is a simple lazy load module that can be used to dynamically lazy load and import other javascript modules.
  It uses an intersection observer to observe and load modules. It also uses a mutation observer to identify any newly
  loaded submodules that need to be added to the intersection observer for loading.

# Getting Started

## Installation
``
npm intall @webpro/lazyload
``

## Use
 Import or add the Lazy Load Modules script into your website.
### Import
```javascript
import { LazyLoad } from '@webpro/LazyLoad';
const lazyload = new LazyLoad(options);
lazyload.init();
```
### Or Add Script Tag
```html
<script src="/node_modules/@webpro/lazyload/dist/loader.js"></script>
```

### Add Data Attributes
Add the data attributes to your element that will load the module.
```html
<!-- yourModule = /loader/directory/yourModule.js -->
<div data-module="yourModule" data-option1="" data-option2=""></div>
```

### Setup Loader File
```javascript
// Example Loader File: yourModule.js
import Module from "location/of/the/module";

export default (element, options) => {
  const module = new Module(element, options);
  // Do whatever you need to do with your module
};
```

## Options
| Options    | Description                                                                     | Default               |
|:-----------|:--------------------------------------------------------------------------------|:----------------------|
| attribute  | Data attribute name used to identify the app (i.e. data-module)                 | module                |
| loaderPath | Path to the location of your loader files                                       | ./components/loaders/ |
| observer   | Mutation observer element selector                                              | body                  |
| root       | Element that is used as the viewport for checking visibility of the target      | null (browser)        |
| rootMargin | Margin around root. Unit-less values not allowed (intersection observer option) | 0px                   |
| threshold  | Visible amount of item shown in relation to root (intersection observer option) | 0.05                  |

# Local Development
1. To launch a local dev instance: run `npm start`
   1. Edit index.html template withing the `/dev/` directory to test the application.
2. To compile assets: run `npm run dev` or `npm run prod`
3. To execute unit tests: run `npm run test`

# Request-example

This is a simple project for request & request-promise-native.

Before start, you should know that request is the basic module for sending HTTP request.

And there are three different modules for extending Promise to request.

* [request-promise](https://github.com/request/request-promise)
* [request-promise-native](https://github.com/request/request-promise-native)
* [request-promise-any](https://github.com/request/request-promise-any)

The difference between these three modules is that **request-promise** provides promise based on Bluebird, **request-promise-native** provides promise based on Node.js native and **request-promise-any** provides promise based on the libirary you choose.

And in this project, I use **request-promise-native**.

# Installation

Because request-promise-native is a **upper module based on request**, you need to install request first, then install request-promise-native.
```=bash
yarn add request
// or
npm install request --save

yarn add request-promise-native
// or
npm install request-promise-native --save
```

export { Request, NextFunction, Response } from "express";

interface IRegister {
  path: string;
  stack: Function[];
}

import http from "http";
function MiniExpress() {
  return {
    routes: {
      all: [],
      get: [],
      post: [],
      put: [],
    } as any,

    // 中间件注册函数
    register: function (path) {
      const info: IRegister = {
        path: "",
        stack: [], // 中间价数组
      };
      // 如果第一个参数是路由
      if (typeof path === "string") {
        info.path = path;
        info.stack = Array.prototype.slice.call(arguments, 1) as Function[];
      } else {
        // 如果第一个参数不是路由，则默认是根路由，则全部路由都会执行
        info.path = "/";
        info.stack = Array.from(arguments);
      }

      return info;
    },

    match(method, url) {
      let stack: Function[] = [];
      if (url === "/favicon.ico") {
        return stack;
      }

      let curRoutes: IRegister[] = [];

      curRoutes = curRoutes.concat(this.routes.all);
      curRoutes = curRoutes.concat(this.routes[method]);

      curRoutes.forEach((route) => {
        if (url.indexOf(route.path) === 0) {
          stack = stack.concat(route.stack);
        }
      });

      return stack;
    },

    next: function () {
      console.log("next");
    },

    use: function (fn) {
      // @ts-ignore
      const info = this.register.apply(this, arguments);
      this.routes.all.push(info);
    },

    get: function (path, ...fn) {
      // @ts-ignore
      const info = this.register.apply(this, arguments);
      this.routes.get.push(info);
    },

    callback() {
      return (req, res) => {
        res.json = (data) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(data));
        };

        res.send = (data) => {
          res.setHeader("Content-Type", "text/html");
          res.end(JSON.stringify(data));
        };

        const { url } = req;
        const method = req.method.toLowerCase();
        const stack = this.match(method, url);

        let index = 0;
        const next = () => {
          const fn = stack[index++];
          if (fn) {
            fn(req, res, next);
          }
        };
        next();
      };
    },

    listen: function (...args) {
      const server = http.createServer(this.callback());
      server.listen(...args);
    },
  };
}

export default MiniExpress;

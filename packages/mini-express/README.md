# mini-express

## 思路 & 实现

1. 调用app.get等方法时，其实是往中间件对象中添加 path和stack 的对象。
2. next() 函数就是把之前存储的对象按照path 匹配后，执行对应的stack函数，调用一次next()就执行下一个中间件函数。

## [参考链接](https://juejin.cn/post/6884592895911788552)

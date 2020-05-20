# cookie-porter

## 简介
学习编写chrome插件的玩具.  
用于操作页面cookie,可以将一个页面的cookie选择,复制之后,将复制的cookie设置给另一个页面.  

## 构建
1. git pull
2. cd cookie-porter && yarn
3. npm run build
4. 打开chrome扩展程序面板,打开开发者模式开关
5. 点击加载已解压的扩展程序,定位到项目内的dist.

## 使用
1. 在A页面打开插件,勾选要复制的cookie,点击搬运
2. 打开B页面,打开插件,选择覆写选项卡.
3. 将内容复制到文本域,点击覆盖.

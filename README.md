<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-08-07 14:27:50
 -->
# Design-Patterns
自学设计模式

## 闭包

### 命令模式
- 

## 高阶函数

## 单例模式
- 实现简单的单例
    + index index2
- 透明的单例模式
    + index3
- 用代理实现单例模式
    + index4
- JavaScript中的单例模式
    + 传统类的单例在JavaScript中不适用。
- 惰性单例

## 策略模式
- 定义一系列的算法，并封装，而且可以一一互换。

### 使用策略模式计算奖金
### 使用策略模式实现缓动动画
- index3
### 更广义的“算法”
### 表单校验

## 代理模式

### 虚拟代理实现图片预加载

## 迭代器模式
实现一个 next current 方法。
javaScript 内部已经封装，了解即可

## 发布-订阅模式
- 最后一个例子没看懂。
- 统一发布，各自订阅，减少耦合。

## 命令模式
- 已经融入到了javaScript之中，因为函数式一等公民。
所以直接作为参数来传递函数，就能简单的实现命令模式。

## 组合模式
- 把所有的类都提供一个统一的接口，在调用的时候不区分是叶还是根，做到整体的方便调用

## 模板方法模式
- Coffee or Tea
- 父类完成顺序的方法，调用，子类交出控制权，只做细节的处理。
用高阶函数更符合JavaScript的编程方法

## 享元模式
- 节省内存，用时间换空间的做法。

## 职责链模式
- 解耦请求者和接收者，在条件分之多，且容易发生变化的时候很有用。
- 缺点是如果职责链太长，可能会有性能问题。

## 中介者模式
- 在错综复杂的对象引用时，加入中介者，可以减少对象之间的紧耦合。
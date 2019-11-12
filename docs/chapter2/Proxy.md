# 代理模式
- 代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。

## 第一个例子--小明追MM的故事
- 在四月一个晴朗的早晨，小明遇见了他的百分百女孩，我们暂且称呼小明的女神为A。
两天之后，小明决定给A送一束花来表白。刚好小明打听到A和他有一个共同的朋友B，
于是内向的小明决定让B来替代自己完成送花这件事情。

- 小明直接送花
```javaScript
// 小明直接送花给A
var Flower = function(){};

var xiaoming = {
    sendFlower: function( target ){
        var flower = new Flower();
        target.receiveFlower( flower );
    }
};

var A = {
    receiveFlower: function( flower ){
        console.log( '收到花' + flower );
    }
}

xiaoming.sendFlower( A );
```

- 小明通过B给A送花
```javaScript
// 小明通过B送花给A
var Flower = function(){};

var xiaoming = {
    sendFlower: function( target ){
        var flower = new Flower();
        target.receiveFlower( flower );
    }
};

var B = {
    receiveFlower: function( flower ){
        A.receiveFlower( flower );
    }
}

var A = {
    receiveFlower: function( flower ){
        console.log( '收到花' + flower );
    }
}

xiaoming.sendFlower( B );
```

- 看了这2段代码，感觉通过B送花反而变得更复杂了，但是达到的效果确实一样的。在这里的确是这样。
- 现在我们改变故事的背景设定，假设当A心情好的时候收到花，小明表白的成功率是60%，而当A心情查的时候
收到花，小明表白的几率趋近于0。
- 小明和A刚刚认识，无法辨别A什么时候心情好。如果直接送花，失败的可能性非常大。
- 但是A的朋友B却很了解A，所以小明只管把花交给B，B会监听A的心情变化，然后选择A心情好的时候把花交给A。

```javaScript
// 小明通过B送花给A
var Flower = function(){};

var xiaoming = {
    sendFlower: function( target ){
        var flower = new Flower();
        target.receiveFlower( flower );
    }
};

var B = {
    receiveFlower: function( flower ){
        A.listenGoodMood(function(){
            A.receiveFlower( flower );
        });
    }
}

var A = {
    receiveFlower: function( flower ){
        console.log( '收到花' + flower );
    },
    listenGoodMood: function( fn ){
        setTimeout(function(){ // 假设10秒之后A的心情变好
            fn();
        }, 10000);
    }
}

xiaoming.sendFlower( B );
```

## 保护代理和虚拟代理
1. 保护代理
我们可以从中找到2中代理模式的身影。代理B可以帮助A过滤掉一些请求，比如送花人中年龄太大或者没有宝马，这种请求可以直接在代理B处被拒绝掉。这种代理叫保护代理。A和B一个充当白脸，一个充当黑脸。白脸A继续保持良好的女神形象，不希望直接拒绝任何人，于是找了黑脸B来控制对A的访问。

2. 虚拟代理
假设现实中的花价格不菲，导致在程序世界里，new Flower也是一个代价昂贵的操作，那么我们可以把new Flower的操作交给B去执行，代理B会选择在A心情好时再执行new Flower，这是代理的另一种形式，叫做虚拟代理。
```javaScript
var B = {
    receiveFlower: function( flower ){
        A.listenGoodMood(function(){   // 监听A的好心情
            var flower = new Flower(); // 延迟创建flower对象
            A.receiveFlower( flower );
        });
    }
}
```

- 在javaScript不容易实现代码保护，我们更多的是使用虚拟代理。

## 虚拟代理实现图片预加载
- 先来一段普通的代码,通过这段代码可以看到，在图片加载完成之前由于带宽的问题网页有一段时间是空白
```javaScript
var myImage = (function(){
    var imgNode = document.createElement( 'img' );
    document.body.appendChild( imgNode );

    return {
        setSrc: function( src ){
            imgNode.src = src;
        }
    }
})();

myImage.setSrc( 'http://imgcache.qq.com/qzone/v6/portal/gy/upload/upfile_1034445_1495513359.jpg' );
```

- 通过代理来改善这个问题,在图片加载完之前，先显示一段请等待的信息。
```javaScript
import temp from './Images/bf1847b80c8aaa32b2ec70419ffdbc01.jpg';

var myImage = (function(){
    var imgNode = document.createElement( 'img' );
    document.body.appendChild( imgNode );

    return {
        setSrc: function( src ){
            imgNode.src = src;
        }
    }
})();

var proxyImage = (function(){
    var img = new Image();
    img.onload = function(){
        // myImage.setSrc( this.src );
    }
    return {
        setSrc: function( src ){
            myImage.setSrc(temp);
            img.src = src;
        }
    }
})();

proxyImage.setSrc( 'http://imgcache.qq.com/qzone/v6/portal/gy/upload/upfile_1034445_1495513359.jpg' );
```

## 代理的意义
- 不过就是实现一个小小的图片预加载能能，即使不用代理也可以实现。
```javaScript
import temp from './Images/bf1847b80c8aaa32b2ec70419ffdbc01.jpg';

var MyImage = (function(){
    var imgNode = document.createElement( 'img' );
    document.body.appendChild( imgNode );
    var img = new Image();

    img.onload = function(){
        // imgNode.src = img.src;
    };

    return {
        setSrc: function( src ){
            imgNode.src = temp;
            img.src = src;
        }
    }
})();

MyImage.setSrc( 'http://imgcache.qq.com/qzone/v6/portal/gy/upload/upfile_1034445_1495513359.jpg' );
```
- 要说明代理的意义，要引入一个面向对象的设计原则--单一职责原则
- 网上有很多说明。

## 代理和本体接口的一致性
- 代理一般是与本体的接口是一致的，有2个好处
    + 用户可以放心地请求代理，他只关心是否能得到想要的结果
    + 在任何使用本体的地方都可以替换成使用代理

## 虚拟代理合并HTTP请求
- 场景：
    + 每周我们都要写一份工作周报，周报要交给总监批阅。总监手下管理着150个员工，如果我们每个人直接把周报发给总监，那总监把一周的时间都花在查看邮件上面。
    + 现在我们把周报发给各自的组长，组长作为代理，把组内成员的周报合并提炼成一份后一次性地发给总监。这样一来，总监的邮箱清净多了。

- html用Checkbox模拟每个人发周报
```javaScript
    <input type="checkbox" id="1"/>1
    <input type="checkbox" id="2"/>2
    <input type="checkbox" id="3"/>3
    <input type="checkbox" id="4"/>4
    <input type="checkbox" id="5"/>5
    <input type="checkbox" id="6"/>6
    <input type="checkbox" id="7"/>7
    <input type="checkbox" id="8"/>8
    <input type="checkbox" id="9"/>9
```

- 不使用代理的情况
```javaScript
var synchronousFile = function( id ){
    console.log( '开始同步文件，id为：' + id);
};

var checkbox = document.getElementsByTagName('input');

for (let i = 0; i < checkbox.length; i++) {
    const c = checkbox[i];
    c.onclick = function(){
        if (this.checked === true) {
            synchronousFile( this.id );
        }
    }
}
```

- 使用代理的情况
```javaScript
var synchronousFile = function( id ){
    console.log( '开始同步文件，id为：' + id);
};

var proxySynchronousFile = (function(){
    var cache = [], // 保存一段时间内需要同步的ID
        timer; // 定时器
    
    return function( id ){
        cache.push( id );
        if ( timer ) { // 保证不会覆盖已经启动的定时器
            return;
        }

        timer = setTimeout(function(){
            synchronousFile( cache.join( ',' ) ); // 2秒后向本体发送需要同步的ID集合
        }, 2000);
    }
})();

var checkbox = document.getElementsByTagName('input');

for (let i = 0; i < checkbox.length; i++) {
    const c = checkbox[i];
    c.onclick = function(){
        if (this.checked === true) {
            proxySynchronousFile( this.id );
        }
    }
}
```

## 虚拟代理在惰性加载中的应用

## 缓存代理
### 计算乘积
### 缓存代理用于ajax异步请求数据

## 用高阶函数动态创建代理

## 其他代理模式
- 简单介绍下，不说明了
    + 防火墙代理：控制网络资源的访问，保护主机不让“坏人”接近。
    + 远程代理：为一个对象在不同的地址空间提供局部代表，在Java中，远程代理可以使另一个虚拟机中的对象。
    + 保护代理：用于对象应该有不同访问权限的情况
    + 智能引用代理：取代了简单的指针，它在访问对象执行一些附加操作，比如计算一个对象被引用的次数
    + 写时复制代理：通常用于复制一个庞大对象的情况。写时复制代理延迟了复制的过程，当对象被真正修改时，才对它进行复制操作。写时复制代理是虚拟代理的一种变体，DLL（操作系统中的动态链接库）是其典型运用场景。
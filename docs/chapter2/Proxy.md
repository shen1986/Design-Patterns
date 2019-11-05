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
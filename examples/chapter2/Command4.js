var tween = {
    linear: function(t, b, c, d) {
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d) {
        return c * ( t /= d ) * t + b;
    },
    strongEaseIn: function(t, b, c, d) {
        return c * ( t /= d ) * t * t * t * t + b;
    },
    strongEaseOut: function(t, b, c, d) {
        return c * ( ( t = t / d - 1 ) * t * t * t * t + 1 ) + b;
    },
    sineaseIn: function(t, b, c, d) {
        return c * ( t / d ) * t * t + b;
    },
    sineaseOut: function(t, b, c, d) {
        return c * ( ( t = t / d -1 ) * t * t + 1 ) + b;
    }
}

var Animate = function( dom ) {
    this.dom = dom;             // 进行运动的dom节点
    this.startTime = 0;         // 动画开始时间
    this.startPos = 0;          // 动画开始时，dom节点的位置，即dom的初始位置
    this.endPos = 0;            // 动画结束是，dom节点的位置，即dom的目标位置
    this.propertyName = null;   // dom节点需要被改变的CSS属性名
    this.easing = null;         // 缓动算法
    this.duration = null;       // 动画持续时间
}

/**
 * 启动这个动画
 */
Animate.prototype.start = function( propertyName, endPos, duration, easing ) {
    this.startTime = +new Date; // 动画的启动时间
    this.startPos = this.dom.getBoundingClientRect()[ propertyName ]; // dom节点初始位置
    this.propertyName = propertyName; // dom节点需要被改变的CSS属性名
    this.endPos = endPos; // dom节点的目标位置
    this.duration = duration; // 动画的持续时间
    this.easing = tween[ easing ]; // 缓动算法

    var self = this;
    var timeId = setInterval(function(){ // 启动定时器，开始执行动画
        if (self.step() == false) {      // 如果动画已经结束，则清除定时器
            clearInterval(timeId);
        }
    }, 19 );
}

/**
 * 每一帧要做的事情
 */
Animate.prototype.step = function() {
    var t = +new Date;      // 取得当前时间
    if (t >= this.startTime + this.duration) {      // (1)
        this.update( this.endPos );     // 更新小球的CSS属性值
        return false;
    }
    var pos = this.easing( t - this.startTime, this.startPos,
        this.endPos - this.startPos, this.duration );
    // pos为小球当前位置
    this.update( pos );     // 更新小球的CSS属性值
}

/**
 * 跟新小球的CSS
 */
Animate.prototype.update = function( pos ) {
    this.dom.style[ this.propertyName ] = pos + 'px';
};

var ball = document.getElementById( 'ball' );
var pos = document.getElementById( 'pos' );
var moveBtn = document.getElementById( 'moveBtn' );
var cancelBtn = document.getElementById( 'cancelBtn' );

// ****** 命令模式 ***********
var MoveCommand = function( receiver, pos ){
    this.receiver = receiver;
    this.pos = pos;
    this.oldPos = null;
}

MoveCommand.prototype.execute = function(){
    this.receiver.start( 'left', this.pos, 1000, 'strongEaseOut' );
    this.oldPos = this.receiver.dom.getBoundingClientRect()[ this.receiver.propertyName ];
    // 记录小球开始移动前的位置
}

MoveCommand.prototype.undo = function(){
    this.receiver.start( 'left', this.oldPos, 1000, 'strongEaseOut' );
    // 回到小球移动前记录的位置
}

var moveCommand;

moveBtn.onclick = function(){
    var animate = new Animate( ball );
    moveCommand = new MoveCommand( animate, pos.value );
    moveCommand.execute();
};

cancelBtn.onclick = function(){
    moveCommand.undo();   // 撤销命令
}
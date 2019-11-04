/** 校验规则 */
var strategies = {
    isNonEmpty: function( value, errorMsg ) { // 不为空
        if ( value === '' ) {
            return errorMsg;
        }
    },
    minLength: function( value, length, errorMsg ) { // 限制最小长度
        if ( value.length < length ) {
            return errorMsg;
        }
    },
    isMobile: function( value, errorMsg ) { // 手机号码格式
        if ( !/(^1[3|5|8][0-9]{9}$)/.test( value ) ) {
            return errorMsg;
        }
    }
}

/**Validator类 */
var Validator = function(){
    this.cache = []; // 保存校验规则
}

Validator.prototype.add = function( dom, rules ) {

    var self = this;

    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        (function( rule ) {
            var strategyAry = rule.strategy.split(':');
            var errorMsg = rule.errorMsg;

            self.cache.push(function(){
                var strategy = strategyAry.shift();
                strategyAry.unshift( dom.value );
                strategyAry.push( errorMsg );
                return strategies[ strategy ].apply( dom, strategyAry );
            })
        })( rule );
    }
};

Validator.prototype.start = function(){
    for (let i = 0; i < this.cache.length; i++) {
        const  validataFunc = this.cache[i];
        var msg = validataFunc(); // 开始校验，并取得校验后的返回信息
        if ( msg ) { // 如果有确切的返回值，说明校验没有通过
            return msg;
        }
    }
};


/** 客户端调用代码 */
var validataFunc = function(){
    var validator = new Validator();

    /** 添加一些校验规则 **/
    validator.add( registerForm.userName, [{
        strategy: 'isNonEmpty',
        errorMsg: '用户名不能为空'
    }, {
        strategy: 'minLength:10',
        errorMsg: '用户名长度不能小于10'
    }]);
    validator.add( registerForm.password, [{
        strategy: 'minLength:6',
        errorMsg: '密码长度不能少于6位'
    }]);
    validator.add( registerForm.phoneNumber, [{
        strategy: 'isMobile',
        errorMsg: '手机号码格式不正确'
    }]);

    var errorMsg = validator.start(); // 获得校验结果
    return errorMsg;
}

var registerForm = document.getElementById( 'registerForm' );
registerForm.onsubmit = function(){
    var errorMsg = validataFunc(); // 如果errorMsg有确切的返回值，说明未通过校验
    if (errorMsg) {
        alert( errorMsg );
        return false; // 阻止表单提交
    }
};
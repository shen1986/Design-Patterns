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

var validataFunc = function(){
    var validator = new Validator();

    /** 添加一些校验规则 **/
    validator.add( registerForm.userName, 'isNonEmpty', '用户名不能为空' );
    validator.add( registerForm.password, 'minLength:6', '密码长度不能少于6位');
    validator.add( registerForm.phoneNumber, 'isMobile', '手机号码格式不正确');

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

var Validator = function(){
    this.cache = []; // 保存校验规则
}

Validator.prototype.add = function( dom, rule, errorMsg ) {
    var ary = rule.split(':'); // 把strategy和参数分开
    console.log(ary);
    this.cache.push(function(){ // 把校验的步骤用空函数包装起来，并且放入cache
        var strategy = ary.shift(); // 用户挑选的strategy
        ary.unshift( dom.value ); // 把input的value添加进参数列表
        ary.push( errorMsg ); // 把errorMsg添加进参数列表
        return strategies[ strategy ].apply( dom, ary );
    });
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
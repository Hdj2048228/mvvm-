/*
* UI层
**/
var elems = [document.getElementById('el'), document.getElementById('input'),document.getElementById('el1'), document.getElementById('input1')];
/*
* 数据层
* */
var data = {
    value: 'hello!',
    test:'test1'
};
/*
* UI层修改
* */
var command = {
    text :function (str) {
        this.innerHTML = str;
    },
    value :function (str) {
        this.setAttribute('value',str);
    }

}
/*UI层节点扫描处理*/
var scan = function(elems) {

    for (var i = 0, len = elems.length; i < len; i++) {
       /*
       *  当前节点
       *  */
        var elem = elems[i];
        /*节点指令*/
        elem.command = {};

        // 节点属性遍历
        for (var j = 0, len1 = elem.attributes.length; j < len1; j++) {
            var attr = elem.attributes[j];

            // 事件属性获取
            if (attr.nodeName.indexOf('dj-event') >= 0) {

                // 获取dj-bind属性
                var dataKey = elem.getAttribute('dj-bind') || undefined;

                // 注册到节点指令
                command[attr.nodeValue].call(elem, data[dataKey]);

                // 获取节点指令对应的值
                elem.command[attr.nodeValue] = data[dataKey];
            }
        }
    }
}
/*
* 脏检查机制
*/
var digest = function (elems) {
//     节点遍历

    for (var i = 0, len = elems.length; i < len; i++) {
        // 当前节点
        var elem = elems[i];

        // 节点属性遍历
        for (var j = 0, len1 = elem.attributes.length; j < len1; j++) {
            var attr = elem.attributes[j];

            // 事件属性获取
            if (attr.nodeName.indexOf('dj-event') >= 0) {

                // ;获取dj-bind属性的值
                var dataKey = elem.getAttribute('dj-bind') || undefined;

                // 节点指令注册
                if(elem.command[attr.nodeValue] !== data[dataKey]){

                    command[attr.nodeValue].call(elem, data[dataKey]);
                    elem.command[attr.nodeValue] = data[dataKey];
                }
            }
        }

}
}
/*
 * 遍历节点初始化指令
*/
    scan(elems);
/*
* 数据劫持监听
* */
function $digest(value){
    var list = document.querySelectorAll('[dj-bind='+ value + ']');
    digest(list);
}
/*
* UI层事件注册
* */
if(document.addEventListener){
    elems[1].addEventListener('keyup', function(e) {
        data.value = e.target.value;
        $digest(e.target.getAttribute('dj-bind'));
    }, false);
    elems[3].addEventListener('keyup', function(e) {
        data.value = e.target.value;
        $digest(e.target.getAttribute('dj-bind'));
    }, false);
}else{
    elems[1].attachEvent('onkeyup', function(e) {
        data.value = e.target.value;
        $digest(e.target.getAttribute('dj-bind'));
    }, false);
    elems[3].attachEvent('onkeyup', function(e) {
        data.value = e.target.value;
        $digest(e.target.getAttribute('dj-bind'));
    }, false);
}
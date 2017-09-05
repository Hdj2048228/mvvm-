/*
* UI层
**/
var elems = [document.getElementById('el'), document.getElementById('input')];

/*
* 数据层
* */
var data = {
    value: 'hello!'
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
/*
* 节点扫描数据绑定处理
* */
var scan = function () {
    for(var i=0,len = elems.length;i<len;i++){
    //   当前元素节点

        var elem = elems[i];
        elem.command = [];
    //    元素节点属性处理
        for(var j=0,len1 = elem.attributes.length;j<len1;j++){
            var attr = elem.attributes[j];
        //    属性值修改
            if(attr.nodeName.indexOf('dj-') >= 0){
                command[attr.nodeName.slice(3)].call(elem,data[attr.nodeValue]);

                elem.command.push(attr.nodeName.slice(3));
            }

        }

    }
}
/*
* 从数据层到UI层
* */
function  djMvvmSet(key,value) {
    data[key] = value;
    scan();
}
/*
* UI事件监听
* */
elems[1].addEventListener('keyup',function (e) {
   djMvvmSet('value',e.target.value) ;
},false);
/*
* 开始扫描
* */
scan();
/*
* 定时修改数据层
* */
var count = 0;
setInterval(function () {
    djMvvmSet("value","hello world!" + (++count))
},1000)
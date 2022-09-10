function backTop(obj, target, callback) {
    // callback=function(){}
    clearInterval(obj.timer) //先清除原来的定时器，只保留当前的
    obj.timer = setInterval(function () {
        var step = (target - window.pageYOffset) / 5; //缓动效果实现
        step = step > 0 ? Math.ceil(step) : Math.floor(step); // 取整
        if (window.pageYOffset == target) { // 避免var 申请内存空间，将timer作为对象的属性
            clearInterval(obj.timer)
            // 回调
            /* if (callback) {
            callback();
            } */
            callback && callback(); //短路 左右都为true执行
        } else {
            // obj.style.left = obj.offsetLeft + left + 'px';
            // obj.style.left = window.pageYOffset + step + 'px'
            window.scroll(0, window.pageYOffset + step) //(0,-y) 向上滚动
        }
    }, 50)
}
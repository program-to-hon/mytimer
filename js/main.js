(function(){
    'use strict';

    //pcでもスマホでもボタン操作動くように変数定義
    var EVENTNAME_TOUCHSTART, EVENTNAME_TOUCHEND;

    if ('ontouchend' in document) {
        EVENTNAME_TOUCHSTART = 'touchstart';
        EVENTNAME_TOUCHEND = 'touchend';
    }else{
        EVENTNAME_TOUCHSTART = 'mousedown';
        EVENTNAME_TOUCHEND = 'mouseup';
    }

    //変数定義
    var start = document.getElementById('start');
    var stop = document.getElementById('stop');
    var result = document.getElementById('result');
    var message = document.getElementById('message');
    var startTime;
    var isStrated = false;

    start.addEventListener(EVENTNAME_TOUCHSTART, function() {
        //最初のクリックのみ有効にする
        if(isStrated === true) {
            return;
        }

        isStrated = true;
        startTime = Date.now();
        this.className = 'pushed';
        stop.className = ' ';
        result.textContent = '0.000';
        result.className = 'stanby';
        message.textContent = ' ';
    });

    stop.addEventListener(EVENTNAME_TOUCHSTART, function() {
        //stopボタンから押しても無効にする
        if(isStrated === false) {
            return;
        }

        isStrated = false;
        var elapsedTime;
        var diff;
        //elapsedTime = 5.000;
        elapsedTime = (Date.now() - startTime) / 1000;
        //result.textContent = elapsedTime;
        result.textContent = elapsedTime.toFixed(3);   //丁度整数のときも小数点以下3ケタ表示にする
        this.className = 'pushed';
        start.className = ' ';
        result.className = ' ';

        diff = elapsedTime - 5.000;
        if(diff < -3.000) {
            message.textContent = 'ぜんぜんダメ';
        }else if(diff > -2.000 && diff < -1.000) {
            message.textContent = 'もうちょい';
        }else if(diff < 1.000 && diff > -1.000 && diff != 0.000) {
            result.className = 'perfect';
            message.textContent = 'おしい';
        }else if(diff == 0.000) {
            result.className = 'perfect';
            message.textContent = 'すばらしい！';
        }
    });



})();

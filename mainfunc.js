String.prototype.times = function (n) {
    //String 乘法
    return Array.prototype.join.call({
        length: n + 1
    }, this);
};
var difficulty = [5000, 10000];
var unlisted = true; //未在词频表里的单词是否挖空

function go() {
    var slider = document.getElementById('vocabslider');
    var difficulty = slider.noUiSlider.get();
    var raw = document.getElementById("inputta").innerHTML + " ";
    var l = raw.length;
    console.log(l, difficulty);

    var r = ""; //result
    var word = "";
    var answer = "";
    while (raw.length >= 1) {
        var nextchar = raw.substr(0, 1);
        raw = raw.substring(1);
        //var noWords = /[^a-zA-Z]/;
        if (!((nextchar >= 'A' && nextchar <= 'Z') || (nextchar >= 'a' && nextchar <= 'z'))) {
            //下一个字符是非字母
            if (word !== "") {
                //一个词语结束，Word 加入结果并清空。
                if (difficult(word)) {
                    r += (word.substr(0, 1) + "_".times(word.length - 1));
                    answer += word;
                } else {
                    r += word;
                }
                r += nextchar;
                word = "";
            } else {
                //不是一个词语结束
                r += nextchar;
            }
        } else {
            //下一个字符是字母
            word += nextchar;
        }
    }
    console.log(r);
    document.getElementById("resultshow").innerHTML = r;

    function difficult(w) {
        var rank = v10k.indexOf(w.toLowerCase());
        //console.log(rank);
        if (rank == -1) {
            return unlisted;
        }
        return (rank >= difficulty[0] && rank <= difficulty[1]);
    }


    var instance = M.Modal.getInstance(document.getElementById('resultdialog'));
    instance.open();
}
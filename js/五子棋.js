//坐标
function Point(row, col) {
    this.row = row;
    this.col = col;
}


//黑棋
function BlackQi(point, el) {
    this.Point = point;//坐标
    this.Element = el;//黑棋的div
    this.draw = function () {

        this.Element.style.backgroundColor = "gray";
    }
}

//白棋
function WhiteQi(point, el) {
    this.Point = point;//坐标
    this.Element = el;//白棋的div
    this.draw = function () {
        // todo
        this.Element.style.backgroundColor = "red";
    }
}


//棋盘
function QiPan(el, row, col, width, callback) {
    this.element = el;//用于画图的div
    //this.element.addEventListener('click', this.onMyClick);//绑定点击事件
    this.row = row;//表示行数
    this.column = col;//列数
    this.width = width;//每个格子的宽度与高度
    this.xiaQiZhe = true;//true表示白，false表示黑
    this.callback = callback;
    this.Qis = [];//表示已经下棋的总个数

    this.geZis = [];//保存所有格子
    this.clear = function () {//清除地图
        this.Qis = [];//表示已经下棋的总个数
    }
    _this = this;//全局_this属性
    //点击棋盘事件，用于添加棋子
    this.onMyClick = function (ev) {
        //onMyClick函数作为事件执行时，this指向处理事件的对象
        //计算用户点击的格子位置
        //判断当前棋手
        //变更棋手 白->黑 黑->白
        //保存棋子
        var row = 0;//格子的行
        var col = 0;//格子的列

        var gezi = ev.target;//获取用户点击的格子
        var i = 0;
        for (; i < _this.geZis.length; i++) {
            if (_this.geZis[i] == gezi) {
                //i = row * 15 + col
                row = parseInt(i / _this.row);//计算出
                col = i % _this.row;//求第几列
                break;//如果两个对象相等
            }
        }

        //判断是否已经有棋子
        for (var j = 0; j < _this.Qis.length; j++) {
            if (_this.Qis[j].Point.row == row
                && _this.Qis[j].Point.col == col) {
                return;
            }
        }

        //添加黑棋还是白旗
        var qi = null;
        var point = new Point(row, col);
        if (_this.xiaQiZhe) {
            qi = new WhiteQi(point, _this.geZis[i]);
        } else {
            qi = new BlackQi(point, _this.geZis[i]);
        }
        qi.draw();//绘制棋子


        _this.add(qi);//保存棋子
        _this.xiaQiZhe = !_this.xiaQiZhe;//简化代码
        if (_this.isWin(qi)) {//结束游戏
            _this.callback(!_this.xiaQiZhe);
        } else {
            if (_this.xiaQiZhe) {
                _this.callback("白旗下棋");//调用回调函数
            } else {
                _this.callback("黑棋下棋");
            }
        }
    }

    this.add = function (qizi) {
        this.Qis.push(qizi);//新增一个棋子
    }

    this.back = function () {
        //悔棋 todo
    }

    this.containsQi = function (row, col) {

        for (var i = 0; i < this.Qis.length; i++) {
            if (this.Qis[i].Point.row == row
                && this.Qis[i].Point.col == col) {
                return this.Qis[i];//存在返回棋子
            }
        }

        return null;//不存在返回null
    }


    this.isWin = function (curQi) {

        //是否知道curQi是白旗还是黑棋
        var count = 1;//相同棋子的总数

        //向上找
        var row = curQi.Point.row;//行
        var col = curQi.Point.col;//列
        while (count < 5) {
            row--;
            if (row < 0) {//表示到边界
                break;
            }
            var qizi = this.containsQi(row, col);
            if (qizi == null) {
                break;//跳出循环
            }

            if (curQi instanceof BlackQi && qizi instanceof BlackQi) {
                count++;//两个都是黑棋
                continue;
            }
            if (curQi instanceof WhiteQi && qizi instanceof WhiteQi) {
                count++;//两个都是白旗
                continue;
            }
            break;
        }

        if (count == 5) {
            return true;
        }
        //往下找
        row = curQi.Point.row;//行
        col = curQi.Point.col;//列
        while (count < 5) {
            row++;
            if (row >= this.row) {//表示到边界
                break;
            }
            var qizi = this.containsQi(row, col);
            if (qizi == null) {
                break;//跳出循环
            }

            if (curQi instanceof BlackQi && qizi instanceof BlackQi) {
                count++;//两个都是黑棋
                continue;
            }
            if (curQi instanceof WhiteQi && qizi instanceof WhiteQi) {
                count++;//两个都是白旗
                continue;
            }
            break;
        }
        if (count == 5) {
            return true;
        }


        count = 1;//相同棋子的总数

        //向左找
        row = curQi.Point.row;//行
        col = curQi.Point.col;//列
        while (count < 5) {
            col--;
            if (col < 0) {//表示到边界
                break;
            }
            var qizi = this.containsQi(row, col);
            if (qizi == null) {
                break;//跳出循环
            }

            if (curQi instanceof BlackQi && qizi instanceof BlackQi) {
                count++;//两个都是黑棋
                continue;
            }
            if (curQi instanceof WhiteQi && qizi instanceof WhiteQi) {
                count++;//两个都是白旗
                continue;
            }
            break;
        }

        if (count == 5) {
            return true;
        }
        //往右找
        row = curQi.Point.row;//行
        col = curQi.Point.col;//列
        while (count < 5) {
            col++;
            if (col >= this.column) {//表示到边界
                break;
            }
            var qizi = this.containsQi(row, col);
            if (qizi == null) {
                break;//跳出循环
            }

            if (curQi instanceof BlackQi && qizi instanceof BlackQi) {
                count++;//两个都是黑棋
                continue;
            }
            if (curQi instanceof WhiteQi && qizi instanceof WhiteQi) {
                count++;//两个都是白旗
                continue;
            }
            break;
        }
        if (count == 5) {
            return true;
        }

        count = 1;//相同棋子的总数

        //向左上找
        row = curQi.Point.row;//行
        col = curQi.Point.col;//列
        while (count < 5) {
            row--;
            col--;
            if (col < 0 || row < 0) {//表示到边界
                break;
            }
            var qizi = this.containsQi(row, col);
            if (qizi == null) {
                break;//跳出循环
            }

            if (curQi instanceof BlackQi && qizi instanceof BlackQi) {
                count++;//两个都是黑棋
                continue;
            }
            if (curQi instanceof WhiteQi && qizi instanceof WhiteQi) {
                count++;//两个都是白旗
                continue;
            }
            break;
        }

        if (count == 5) {
            return true;
        }
        //往右下找
        row = curQi.Point.row;//行
        col = curQi.Point.col;//列
        while (count < 5) {
            row++;
            col++;
            if (col >= this.column && row >= this.row) {//表示到边界
                break;
            }
            var qizi = this.containsQi(row, col);
            if (qizi == null) {
                break;//跳出循环
            }

            if (curQi instanceof BlackQi && qizi instanceof BlackQi) {
                count++;//两个都是黑棋
                continue;
            }
            if (curQi instanceof WhiteQi && qizi instanceof WhiteQi) {
                count++;//两个都是白旗
                continue;
            }
            break;
        }
        if (count == 5) {
            return true;
        }

        count = 1;//相同棋子的总数

        //向右上找
        row = curQi.Point.row;//行
        col = curQi.Point.col;//列
        while (count < 5) {
            row--;
            col++;
            if (col >= this.column || row < 0) {//表示到边界
                break;
            }
            var qizi = this.containsQi(row, col);
            if (qizi == null) {
                break;//跳出循环
            }

            if (curQi instanceof BlackQi && qizi instanceof BlackQi) {
                count++;//两个都是黑棋
                continue;
            }
            if (curQi instanceof WhiteQi && qizi instanceof WhiteQi) {
                count++;//两个都是白旗
                continue;
            }
            break;
        }

        if (count == 5) {
            return true;
        }
        //往左下找
        row = curQi.Point.row;//行
        col = curQi.Point.col;//列
        while (count < 5) {
            row++;
            col--;
            if (col < 0 && row >= this.row) {//表示到边界
                break;
            }
            var qizi = this.containsQi(row, col);
            if (qizi == null) {
                break;//跳出循环
            }

            if (curQi instanceof BlackQi && qizi instanceof BlackQi) {
                count++;//两个都是黑棋
                continue;
            }
            if (curQi instanceof WhiteQi && qizi instanceof WhiteQi) {
                count++;//两个都是白旗
                continue;
            }
            break;
        }
        if (count == 5) {
            return true;
        }

        return false;
    }

//创建格子
    this.createDiv = function () {
        this.xiaQiZhe = true;
        var w = getComputedStyle(this.element).width;
        w = parseInt(w);
        this.width = parseInt(w / this.row);//得到每一个格子的宽度

        for (var i = 0; i < this.row; i++) {//创建行

            for (var j = 0; j < this.column; j++) {//创建列

                var div = document.createElement("div");
                div.className = "gezi";
                div.style.width = this.width + "px";
                div.style.height = this.width + "px";
                div.style.border = "1px solid black";
                div.style.boxSizing = "border-box";
                div.style.float = 'left';
                this.element.appendChild(div);
                this.geZis.push(div);//同时记录格子的总数
            }
        }

    }
}

//五子棋类
function WuZiQi(el, row, col, width, callback) {
    this.element = el;//用于存储棋盘的div
    this.qipan = null;
    this.row = row;
    this.col = col;
    this.width = width;


    this.start = function () {
        //开始游戏
        this.qipan = new QiPan(this.element,
            this.row, this.col, this.width, callback);
        this.qipan.createDiv();
        this.element.addEventListener('click', this.qipan.onMyClick);

    }
    this.end = function () {
        this.element.removeEventListener('click', this.qipan.onMyClick);
    }
    this.xiaQi = function () {
        //todo
    }

    this.isWin = function () {
        if (this.qipan != null) {
            return this.qipan.isWin();//调用棋盘的是否赢的方法
        }
    }

}

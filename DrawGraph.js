var GraphDrawer = /** @class */ (function () {
    function GraphDrawer() {
        this.sumCount = 0;
    }
    // グラフの初期化
    GraphDrawer.prototype.InitializeGraph = function (_reciprocalOfProb, _contextId) {
        var ctx = document.getElementById(_contextId);
        var data = {
            datasets: [{
                    radius: 0,
                    label: "期待値",
                    data: [],
                    showLine: true,
                    fill: false,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgb(255, 99, 132)'
                }, {
                    radius: 0,
                    label: "試行回数の平均",
                    data: [],
                    showLine: true,
                    fill: false,
                    borderColor: 'rgb(99, 255, 132)',
                    backgroundColor: 'rgb(99, 255, 132)'
                }, {
                    radius: 0,
                    label: "1回の試行回数",
                    data: [],
                    showLine: true,
                    fill: false,
                    borderColor: 'rgb(132, 99, 255)',
                    backgroundColor: 'rgb(132, 99, 255)',
                    steppedLine: "middle",
                    borderWidth: 1
                }]
        };
        var config = {
            animation: {
                duration: 1
            },
            scales: {
                xAxes: [{
                        ticks: {
                            min: 1
                        }
                    }],
                yAxes: [{
                        ticks: {
                            min: 1,
                            max: _reciprocalOfProb * 2
                        }
                    }]
            },
            tooltips: {
                enabled: false
            },
            legend: {
                position: 'bottom'
            },
            events: []
        };
        var plugins = {
            type: 'scatter',
            data: data,
            options: config
        };
        this.chart = new Chart(ctx, plugins);
        this.probability = 1 / _reciprocalOfProb;
    };
    // シミュレーションをしてグラフに値をプロットする
    GraphDrawer.prototype.Plot = function (_reciprocalOfProb, _interval) {
        var _this = this;
        this.plotTimerId = setInterval(function () {
            _this.AppendPlot();
        }, _interval);
        this.updateTimerId = setInterval(function () {
            _this.chart.update();
        }, 10);
    };
    // グラフの描画を停止する
    GraphDrawer.prototype.Stop = function () {
        clearInterval(this.plotTimerId);
        clearInterval(this.updateTimerId);
    };
    // 一回分シミュレーションしてその結果をグラフに設定する
    GraphDrawer.prototype.AppendPlot = function () {
        if (!this.chart.data.datasets) {
            this.chart.data.datasets = [];
        }
        if (!this.chart.data.datasets[0].data) {
            this.chart.data.datasets[0].data = [];
        }
        var plotNum = this.chart.data.datasets[0].data.length + 1;
        var tryCount = this.TryOnece();
        this.sumCount += tryCount;
        this.chart.data.datasets[0].data.push({ x: plotNum, y: 1 / this.probability });
        this.chart.data.datasets[1].data.push({ x: plotNum, y: this.sumCount / plotNum });
        this.chart.data.datasets[2].data.push({ x: plotNum, y: tryCount });
        var expectationElem = document.getElementById('averageTryCount');
        if (expectationElem)
            expectationElem.innerText = (this.sumCount / plotNum).toFixed(2);
    };
    // 1/Xが1回当たるまで繰り返す試行を一回を行う
    GraphDrawer.prototype.TryOnece = function () {
        var count = 0;
        while (true) {
            count++;
            if (Math.random() <= this.probability) {
                break;
            }
        }
        return count;
    };
    return GraphDrawer;
}());

var GraphDrawer = /** @class */ (function () {
    function GraphDrawer() {
        this.sumCount = 0;
    }
    GraphDrawer.prototype.InitializeGraph = function (_contextId) {
        var ctx = document.getElementById(_contextId);
        var data = {
            datasets: [{
                    radius: 0,
                    label: "1回の試行回数",
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
                    label: "期待値",
                    data: [],
                    showLine: true,
                    fill: false,
                    borderColor: 'rgb(132, 99, 255)',
                    backgroundColor: 'rgb(132, 99, 255)'
                }]
        };
        var config = {};
        var plugins = {
            type: 'scatter',
            data: data,
            options: config
        };
        this.chart = new Chart(ctx, plugins);
    };
    GraphDrawer.prototype.Plot = function (_probability, _interval) {
        var _this = this;
        setInterval(function () {
            _this.AppendPlot(_probability);
            _this.chart.update();
        }, _interval);
    };
    GraphDrawer.prototype.AppendPlot = function (_probability) {
        if (!this.chart.data.datasets) {
            this.chart.data.datasets = [];
        }
        if (!this.chart.data.datasets[0].data) {
            this.chart.data.datasets[0].data = [];
        }
        var plotNum = this.chart.data.datasets[0].data.length + 1;
        var tryCount = this.TryOnece(_probability);
        this.sumCount += tryCount;
        this.chart.data.datasets[0].data.push({ x: plotNum, y: tryCount });
        this.chart.data.datasets[1].data.push({ x: plotNum, y: this.sumCount / plotNum });
        this.chart.data.datasets[2].data.push({ x: plotNum, y: 1 / _probability });
    };
    GraphDrawer.prototype.TryOnece = function (_probability) {
        var count = 0;
        while (true) {
            count++;
            if (Math.random() <= _probability) {
                break;
            }
        }
        return count;
    };
    return GraphDrawer;
}());

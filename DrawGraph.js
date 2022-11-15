var GraphDrawer = /** @class */ (function () {
    function GraphDrawer() {
    }
    GraphDrawer.prototype.InitializeGraph = function (_contextId) {
        var ctx = document.getElementById(_contextId);
        var data = {
            datasets: [{
                    radius: 0,
                    label: "フーリエ関数",
                    data: [],
                    showLine: true,
                    fill: false,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgb(255, 99, 132)'
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
        var plotNum = this.chart.data.datasets[0].data.length;
        this.chart.data.datasets[0].data.push({ x: plotNum, y: this.TryOnece(_probability) });
        console.log(this.chart.data.datasets[0].data);
        console.log("Interval type1");
    };
    GraphDrawer.prototype.TryOnece = function (_probability) {
        var count = 0;
        var rand = function (min, max) {
            return (Math.floor(Math.random() * (max - min + 1)) + min);
        };
        while (true) {
            count++;
            if (rand(0, 1) <= _probability)
                break;
        }
        return count;
    };
    return GraphDrawer;
}());

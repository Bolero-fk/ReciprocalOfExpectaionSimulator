var GraphDrawer = /** @class */ (function () {
    function GraphDrawer() {
    }
    GraphDrawer.prototype.InitializeGraph = function (contextId) {
        var ctx = document.getElementById(contextId);
        var data = {
            datasets: [{
                    radius: 0,
                    label: "フーリエ関数",
                    data: [{ x: 0, y: 0 }, { x: 0, y: 1 },],
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
    GraphDrawer.prototype.Plot = function (interval) {
        var _this = this;
        setInterval(function () {
            _this.AppendPlot();
            _this.chart.update();
        }, interval);
    };
    GraphDrawer.prototype.AppendPlot = function () {
        if (!this.chart.data.datasets) {
            this.chart.data.datasets = [];
        }
        if (!this.chart.data.datasets[0].data) {
            this.chart.data.datasets[0].data = [];
        }
        var plotNum = this.chart.data.datasets[0].data.length;
        this.chart.data.datasets[0].data.push({ x: plotNum + 1, y: 1 });
        console.log(this.chart.data.datasets[0].data);
        console.log("Interval type1");
    };
    return GraphDrawer;
}());

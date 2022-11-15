class GraphDrawer {
    chart: Chart;
    sumCount: number = 0;

    InitializeGraph(_contextId: string) {
        const ctx: any = document.getElementById(_contextId);

        const data = {
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
            }],
        };

        var config = {
        };

        var plugins = {
            type: 'scatter',
            data: data,
            options: config
        };

        this.chart = new Chart(ctx, plugins);
    }

    public Plot(_probability: number, _interval: number): void {
        setInterval(() => {
            this.AppendPlot(_probability);
            this.chart.update();
        }, _interval);
    }

    private AppendPlot(_probability: number): void {
        if (!this.chart.data.datasets) {
            this.chart.data.datasets = [];
        }

        if (!this.chart.data.datasets[0].data) {
            this.chart.data.datasets[0].data = [];
        }

        var plotNum: number = this.chart.data.datasets[0].data.length + 1;
        var tryCount: number = this.TryOnece(_probability);
        this.sumCount += tryCount;

        (this.chart.data.datasets[0].data as {}[]).push({ x: plotNum, y: tryCount });
        (this.chart.data.datasets[1].data as {}[]).push({ x: plotNum, y: this.sumCount / plotNum });
    }

    private TryOnece(_probability: number): number {
        var count: number = 0;

        while (true) {
            count++;
            if (Math.random() <= _probability) {
                break;
            }
        }

        return count;
    }

}
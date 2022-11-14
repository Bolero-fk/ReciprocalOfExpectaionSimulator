class GraphDrawer {
    chart: Chart;

    InitializeGraph(contextId: string) {
        const ctx: any = document.getElementById(contextId);

        const data = {
            datasets: [{
                radius: 0,
                label: "フーリエ関数",
                data: [{ x: 0, y: 0 }, { x: 0, y: 1 },],
                showLine: true,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(255, 99, 132)'
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

    public Plot(interval: number): void {
        setInterval(() => {
            this.AppendPlot();
            this.chart.update();
        }, interval);
    }

    private AppendPlot(): void {
        if (!this.chart.data.datasets) {
            this.chart.data.datasets = [];
        }

        if (!this.chart.data.datasets[0].data) {
            this.chart.data.datasets[0].data = [];
        }

        var plotNum: number = this.chart.data.datasets[0].data.length;
        (this.chart.data.datasets[0].data as {}[]).push({ x: plotNum + 1, y: 1 });
        console.log(this.chart.data.datasets[0].data);
        console.log("Interval type1");
    }
}
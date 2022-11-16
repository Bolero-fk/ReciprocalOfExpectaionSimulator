class GraphDrawer {
    chart: Chart;
    sumCount: number = 0;
    plotTimerId: number;
    updateTimerId: number;
    probability: number;

    // グラフの初期化
    InitializeGraph(_reciprocalOfProb: number, _contextId: string) {
        const ctx: any = document.getElementById(_contextId);

        const data = {
            datasets: [{
                radius: 0,
                label: "期待値",
                data: [],
                showLine: true,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(255, 99, 132)',
            }, {
                radius: 0,
                label: "試行回数の平均",
                data: [],
                showLine: true,
                fill: false,
                borderColor: 'rgb(99, 255, 132)',
                backgroundColor: 'rgb(99, 255, 132)',
            }, {
                radius: 0,
                label: "1回の試行回数",
                data: [],
                showLine: true,
                fill: false,
                borderColor: 'rgb(132, 99, 255)',
                backgroundColor: 'rgb(132, 99, 255)',
                steppedLine: <'middle'>"middle",
                borderWidth: 1,
            }],
        };

        var config = {
            animation: {
                duration: 1
            },
            scales: {
                xAxes: [{
                    ticks: {
                        min: 1,
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 1,
                        max: _reciprocalOfProb * 2,
                    }
                }],
            },
            tooltips: {
                enabled: false,
            },
            legend: {
                position: <'bottom'>'bottom'
            },
            events: [],
        };

        var plugins = {
            type: 'scatter',
            data: data,
            options: config
        };

        this.chart = new Chart(ctx, plugins);
        this.probability = 1 / _reciprocalOfProb;
    }

    // シミュレーションをしてグラフに値をプロットする
    public Plot(_reciprocalOfProb: number, _interval: number): void {
        this.plotTimerId = setInterval(() => {
            this.AppendPlot();
        }, _interval);

        this.updateTimerId = setInterval(() => {
            this.chart.update();
        }, 10);
    }

    // グラフの描画を停止する
    public Stop(): void {
        clearInterval(this.plotTimerId);
        clearInterval(this.updateTimerId);
    }

    // 一回分シミュレーションしてその結果をグラフに設定する
    private AppendPlot(): void {
        if (!this.chart.data.datasets) {
            this.chart.data.datasets = [];
        }

        if (!this.chart.data.datasets[0].data) {
            this.chart.data.datasets[0].data = [];
        }

        var plotNum: number = this.chart.data.datasets[0].data.length + 1;
        var tryCount: number = this.TryOnece();
        this.sumCount += tryCount;

        (this.chart.data.datasets[0].data as {}[]).push({ x: plotNum, y: 1 / this.probability });
        (this.chart.data.datasets[1].data as {}[]).push({ x: plotNum, y: this.sumCount / plotNum });
        (this.chart.data.datasets[2].data as {}[]).push({ x: plotNum, y: tryCount });

        const expectationElem = document.getElementById('averageTryCount');
        if (expectationElem)
            expectationElem.innerText = (this.sumCount / plotNum).toFixed(2);
    }

    // 1/Xが1回当たるまで繰り返す試行を一回を行う
    private TryOnece(): number {
        var count: number = 0;

        while (true) {
            count++;
            if (Math.random() <= this.probability) {
                break;
            }
        }

        return count;
    }

}
chart: Chart;
function InitializeGraph() {
    var ctx = document.getElementById('ex_chart');
    var data = {
        datasets: [{
                radius: 0,
                label: "フーリエ関数",
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
    new Chart(ctx, plugins);
}

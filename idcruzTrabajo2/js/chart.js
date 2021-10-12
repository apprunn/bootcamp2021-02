//CHARTS POKEMON STATS
let myChart;
const chartStats=(stats=[])=>{
    var datas= [];
    var labels= [];
    stats.map((a)=>{ 
        datas.push(a.base_stat)
        labels.push(a.stat.name)
    });
    var ctx = document.getElementById('myChart').getContext('2d');
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stats',
                data: datas,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "white"
                    }
                },
                x: {
                    ticks: {
                        color: "white"
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            scaleFontColor: "#FFFFFF"
        }
    });
}
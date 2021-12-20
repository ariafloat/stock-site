var chartLabels = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021']
var datasets = {
  netSales: [684, 28, 228, 153, 145, 705, 1419, 744, 1702, 1107, 2798],
  operatingProfit: [-1916, -2636, -2137, -2183, -1864, -759, -150, -1075, -15, -486, 707],
  ordinaryProfit: [-1906, -2891, -1819, -2116, -1795, -720, -80, -1064, 21, -527, 848],
  netProfit: [-1916, -2905, -1108, -638, -1854, -728, -58, -1104, 5, -606, 750]
}
var color = Chart.helpers.color;
var chartColor = {
  red: 'rgba(255, 99, 132)',
  blue: 'rgba(54, 162, 235)',
  orange: 'rgba(255, 159, 64)',
  green: 'rgba(75, 192, 192)'
};
var chartBackgroundColor = {
  netSales: [],
  operatingProfit: [],
  ordinaryProfit: [],
  netProfit: []
}
for (var i = 0; i < chartLabels.length - 1; i++) {
  chartBackgroundColor.netSales.push(color(chartColor.red).alpha(0.5).rgbString());
  chartBackgroundColor.operatingProfit.push(color(chartColor.blue).alpha(0.5).rgbString());
  chartBackgroundColor.ordinaryProfit.push(color(chartColor.orange).alpha(0.5).rgbString());
  chartBackgroundColor.netProfit.push(color(chartColor.green).alpha(0.5).rgbString());
}
chartBackgroundColor.netSales.push(color(chartColor.red).alpha(0.1).rgbString());
chartBackgroundColor.operatingProfit.push(color(chartColor.blue).alpha(0.1).rgbString());
chartBackgroundColor.ordinaryProfit.push(color(chartColor.orange).alpha(0.1).rgbString());
chartBackgroundColor.netProfit.push(color(chartColor.green).alpha(0.1).rgbString());

var chartData = function(netSalesLabel, operatingProfitLabel, ordinaryProfitLabel, netProfitLabel, forecastLabel) {
  var labels = chartLabels.concat();
  labels[labels.length - 1] = labels[labels.length - 1] + ' ' + forecastLabel;
  this.data = {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: netSalesLabel,
        backgroundColor: chartBackgroundColor.netSales,
        borderColor: color(chartColor.red).alpha(1).rgbString(),
        borderWidth: 1,
        data: datasets.netSales
      }, {
        label: operatingProfitLabel,
        backgroundColor: chartBackgroundColor.operatingProfit,
        borderColor: color(chartColor.blue).alpha(1).rgbString(),
        borderWidth: 1,
        data: datasets.operatingProfit
      }, {
        label: ordinaryProfitLabel,
        backgroundColor: chartBackgroundColor.ordinaryProfit,
        borderColor: color(chartColor.orange).alpha(1).rgbString(),
        borderWidth: 1,
        data: datasets.ordinaryProfit
      }, {
        label: netProfitLabel,
        backgroundColor: chartBackgroundColor.netProfit,
        borderColor: color(chartColor.green).alpha(1).rgbString(),
        borderWidth: 1,
        data: datasets.netProfit
      }]
    },
    options: {
      responsive: true,
      legend: {
        position: 'top'
      },
      tooltips: {
        mode: 'index',
        intersect: true
      },
    }
  };
}

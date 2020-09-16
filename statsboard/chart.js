window.addEventListener("DOMContentLoaded", draw);

function draw() {
  fetch('./data.json')
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      // drawChart fn to be created...see below
      drawChart(json);
    }).catch(function(error) {
      console.error(error);
    });
}

function drawChart(jsonData) {

  // Some global options
  Chart.defaults.global.defaultFontFamily = 'Raleway';
  Chart.defaults.global.defaultFontSize = 16;
  Chart.defaults.global.defaultFontColor = '#777';
  Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
      min: 0
    }
  });

  jsonData.jsonarray.shift();

  //get graphData and graphLabels
  var graphData = jsonData.jsonarray.map(e => e.Files);
  var graphLabelsRaw = jsonData.jsonarray.map(e => e.Date);

  let graphLabelsDate = graphLabelsRaw.map(e => moment(e, 'YYYY-MM-DD'))

  let graphLabels = graphLabelsDate.sort((a,b) => a.valueOf() - b.valueOf())

  let graphLabelsString = graphLabels.map(e => e.format('DD-MM-YYYY'))

  /* 1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // HISTOGRAM DISPLAYING UPLOADS/DAY FOR THE PAST SEVEN DAYS
  /*********************************************************************/

  if (graphData.length > 7) {

    dailyData = graphData.slice(-7);
    dailyLabels = graphLabelsString.slice(-7);

  } else {

    dailyData = graphData;
    dailyLabels = graphLabelsString;

  }

  var dailyHist = document.getElementById('dailyHist').getContext('2d');

  var dailyUploadsChart = new Chart(dailyHist, {
    type: 'bar', // bar, horizontal, pie, line, doughnut, radar, polarArea
    data: {
      //labels:graphLabels.slice(-7),
      labels: dailyLabels,
      datasets: [{
        label: 'Uploads',
        data: dailyData,
        //data:graphData.slice(-7),
        backgroundColor: 'lightsalmon',
        //backgroundColor: []
        borderWidth: 1,
        borderColor: 'salmon',
        hoverBorderWidth: 2,
        hoverBorderBackground: 'salmon',
        hoverBorderColor: 'tomato',
      }]
    },
    options: {
      title: {
        display: true,
        fontFamily: 'Poiret One',
        text: 'Uploads/Tag der letzten sieben Tage',
        fontSize: 25,
        fontColor: 'grey'
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
          fontColor: 'black'
        }
      },
      layout: {
        padding: {
          left: 50,
          right: 0,
          bottom: 0,
          top: 0
        }
      },
      tooltips: {
        enabled: true
      }
    }
  });

  /*2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // LINE CHART DISPLAYING CUMULATIVE DAILY UPLOADS */

  var cumulativeDailyData = graphData.reduce(function(r, a) {
    if (r.length > 0)
      a += r[r.length - 1];
    r.push(a);
    return r;
  }, []);

  var dailyCumulativeChart = document.getElementById('dailyCumulativeChart').getContext('2d');

  var dailyCumulativeUploadsChart = new Chart(dailyCumulativeChart, {
    type: 'line', // bar, horizontal, pie, line, doughnut, radar, polarArea
    data: {
      labels: graphLabelsString,
      datasets: [{
        label: 'Cumulative uploads',
        data: cumulativeDailyData,
        backgroundColor: 'lightsalmon',
        //backgroundColor: []
        borderWidth: 1,
        borderColor: 'salmon',
        hoverBorderWidth: 2,
        hoverBorderBackground: 'salmon',
        hoverBorderColor: 'tomato',
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Uploads/Tag seit Projektbeginn, kumuliert',
        fontSize: 25,
        fontFamily: 'Poiret One',
        fontColor: 'grey'
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
          fontColor: 'black'
        }
      },
      layout: {
        padding: {
          left: 50,
          right: 0,
          bottom: 0,
          top: 0
        }
      },
      tooltips: {
        enabled: true
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 14,
            autoskip: true,
            autoSkipPadding: 50
          },
          display: true
        }]
      }
    }
  });

  /* 3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // HISTOGRAM DISPLAYING WEEKLY UPLOADS
  // ********************************************************************
  // Transform daily data to weekly data.
  // --> need to be aware of the fact that the first and last week may
  //     be shorter as the first data point was probably not sent on a
  //     Monday and the last day data has been received was probably
  //     not a Sunday.

  // Array in which # of uploads per week will be stored
  var weeklyData = [];

  // Array in which labels for weeks will be stored, e.g.
  // 'Mon, 27th of May, 2019 - Sun, 2nd of June, 2019'
  var weeklyLabels = [];

  // Helper variable for accumulating weekly upload data
  var accumulator = 0;

  // Helper variable for storing beginnings of weeks
  var startOfWeek_temp = "";

  // Helper variable for storing ends of weeks
  var endOfWeek_temp = "";

  // Here comes the loop, looping over our daily data and condensing it into
  // weekly data
  for (i = 0; i < graphData.length; i++) {

    console.log(graphLabels[i].isoWeekday());

    switch (graphLabels[i].isoWeekday()) {

      case 1: // Monday

        accumulator += graphData[i];
        startOfWeek_temp = graphLabels[i].format('DD-MM-YY');

        break;

      case 7: // Sunday

        accumulator += graphData[i];
        endOfWeek_temp = graphLabels[i].format('DD-MM-YY');

        weeklyData.push(accumulator);
        accumulator = 0;

        weeklyLabels.push(startOfWeek_temp.concat(' - ', endOfWeek_temp));

        startOfWeek_temp = "";
        endOfWeek_temp = "";

        break;

      default: // All other weekdays

        accumulator += graphData[i];

        // Here we're taking care of the case in which the first data datapoint
        // in the data set wasn't a Monday
        if (i == 0) {

          startOfWeek_temp = graphLabels[i].format('DD-MM-YY');

        }

        // Here we're taking care of the case in which the last data datapoint
        // in the data set wasn't a Sunday

        if (i == (graphData.length - 1)) {

          endOfWeek_temp = graphLabels[i].format('DD-MM-YY');

          weeklyData.push(accumulator);
          accumulator = 0; // superfluous, but neat

          weeklyLabels.push(startOfWeek_temp.concat(' - ', endOfWeek_temp));

          startOfWeek_temp = ""; // superfluous, but neat
          endOfWeek_temp = ""; // superfluous, but neat

          break;

        }

    }

  }

  var weeklyHist = document.getElementById('weeklyHist').getContext('2d');

  var weeklyUploadsChart = new Chart(weeklyHist, {
    type: 'bar', // bar, horizontal, pie, line, doughnut, radar, polarArea
    data: {
      //labels:graphLabels.slice(-7),
      labels: weeklyLabels,
      datasets: [{
        label: 'Uploads',
        data: weeklyData,
        //data:graphData.slice(-7),
        backgroundColor: 'lightsalmon',
        //backgroundColor: []
        borderWidth: 1,
        borderColor: 'salmon',
        hoverBorderWidth: 2,
        hoverBorderBackground: 'salmon',
        hoverBorderColor: 'tomato',
      }]
    },
    options: {
      title: {
        display: true,
        fontFamily: 'Poiret One',
        text: 'Uploads/Woche seit Projektbeginn',
        fontSize: 25,
        fontColor: 'grey'
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
          fontColor: 'black'
        }
      },
      layout: {
        padding: {
          left: 50,
          right: 0,
          bottom: 0,
          top: 0
        }
      },
      tooltips: {
        enabled: true
      }
    }
  });

  /* 4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // LINE CHART DISPLAYING CUMULATIVE WEEKLY UPLOADS */
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  var cumulativeWeeklyData = weeklyData.reduce(function(r, a) {
    if (r.length > 0)
      a += r[r.length - 1];
    r.push(a);
    return r;
  }, []);

  var weeklyCumulativeChart = document.getElementById('weeklyCumulativeChart').getContext('2d');

  var weeklyCumulativeUploadsChart = new Chart(weeklyCumulativeChart, {
    type: 'line', // bar, horizontal, pie, line, doughnut, radar, polarArea
    data: {
      labels: weeklyLabels,
      datasets: [{
        label: 'Uploads',
        data: cumulativeWeeklyData,
        backgroundColor: 'lightsalmon',
        //backgroundColor: []
        borderWidth: 1,
        borderColor: 'salmon',
        hoverBorderWidth: 2,
        hoverBorderBackground: 'salmon',
        hoverBorderColor: 'tomato',
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Uploads/Woche seit Projektbeginn, kumuliert',
        fontSize: 25,
        fontFamily: 'Poiret One',
        fontColor: 'grey'
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
          fontColor: 'black'
        }
      },
      layout: {
        padding: {
          left: 50,
          right: 0,
          bottom: 0,
          top: 0
        }
      },
      tooltips: {
        enabled: true
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 14,
            userCallback: function(item, index) {
              if (index % 2) return "";
              return item;
            },
            autoSkip: false
          },
          display: true
        }]
      }
    }
  });

  /* 5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5-5
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // HISTOGRAM DISPLAYING MONTHLY UPLOADS
  // ********************************************************************
  // Transform daily data to monthly data.
  // --> need to be aware of (...)

  // Array in which # of uploads per month will be stored
  var monthlyData = [];

  // Array in which labels for months will be stored, e.g.
  // 'April 2019'
  var monthlyLabels = [];

  // Helper variable for accumulating monthly upload data
  var accumulator = 0;

  // Here comes the loop, looping over our daily data and condensing it into
  // monthly data
  for (i = 0; i < graphData.length; i++) {

    //console.log(moment(graphLabels[i], 'ddd, MMMM Do YYYY').isoWeekday());

    // As the function is based on comparing the current data point's month with
    // the previous data points', we firstly have to take care of the case in which
    // the current data point is the first one in the data

    switch (i) {

      case 0:

        accumulator += graphData[i];

        break;

      case (graphData.length - 1):

        monthlyLabels.push(graphLabels[i].format('MMMM').concat(' ',
          graphLabels[i].format('YYYY')));

        monthlyData.push(accumulator);
        accumulator = 0;

        break;

      default:

        if (graphLabels[i].month() ==
          graphLabels[i - 1].month()) {

          accumulator += graphData[i];

        } else {

          monthlyLabels.push(graphLabels[i - 1].format('MMMM').concat(' ',
            graphLabels[i - 1].format('YYYY')));

          monthlyData.push(accumulator);
          accumulator = 0;

        }

        break;

    }

  }

  // Create JSONarray

  var obj = {
    jsonarray: []
  };

  // Combine the data and label arrays into on JSON file

  for (i = 0; i < monthlyData.length; i++) {

    var month_year = monthlyLabels[i];

    var files = monthlyData[i];

    obj.jsonarray.push({
      Date: month_year,
      Files: files
    });

  }

  var monthlyHist = document.getElementById('monthlyHist').getContext('2d');

  var monthlyUploadsChart = new Chart(monthlyHist, {
    type: 'bar', // bar, horizontal, pie, line, doughnut, radar, polarArea
    data: {
      //labels:graphLabels.slice(-7),
      labels: monthlyLabels,
      datasets: [{
        label: 'Uploads',
        data: monthlyData,
        //data:graphData.slice(-7),
        backgroundColor: 'lightsalmon',
        //backgroundColor: []
        borderWidth: 1,
        borderColor: 'salmon',
        hoverBorderWidth: 2,
        hoverBorderBackground: 'salmon',
        hoverBorderColor: 'tomato',
      }]
    },
    options: {
      title: {
        display: true,
        fontFamily: 'Poiret One',
        text: 'Uploads/Monat seit Projektbeginn',
        fontSize: 25,
        fontColor: 'grey'
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
          fontColor: 'black'
        }
      },
      layout: {
        padding: {
          left: 50,
          right: 0,
          bottom: 0,
          top: 0
        }
      },
      tooltips: {
        enabled: true
      }
    }
  });

  /* 6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // LINE CHART DISPLAYING CUMULATIVE MONTHLY UPLOADS */
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  var cumulativeMonthlyData = monthlyData.reduce(function(r, a) {
    if (r.length > 0)
      a += r[r.length - 1];
    r.push(a);
    return r;
  }, []);

  var monthlyCumulativeChart = document.getElementById('monthlyCumulativeChart').getContext('2d');

  var monthlyCumulativeUploadsChart = new Chart(monthlyCumulativeChart, {
    type: 'line', // bar, horizontal, pie, line, doughnut, radar, polarArea
    data: {
      labels: monthlyLabels,
      datasets: [{
        label: 'Uploads',
        data: cumulativeMonthlyData,
        backgroundColor: 'lightsalmon',
        //backgroundColor: []
        borderWidth: 1,
        borderColor: 'salmon',
        hoverBorderWidth: 2,
        hoverBorderBackground: 'salmon',
        hoverBorderColor: 'tomato',
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Uploads/Monat seit Projektbeginn, kumuliert',
        fontSize: 25,
        fontFamily: 'Poiret One',
        fontColor: 'grey'
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
          fontColor: 'black'
        }
      },
      layout: {
        padding: {
          left: 50,
          right: 0,
          bottom: 0,
          top: 0
        }
      },
      tooltips: {
        enabled: true
      }
      /**,
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 14,
            userCallback: function(item, index) {
              if (index % 2) return "";
              return item;
            },
            autoSkip: false
          },
          display: true
        }]
      }*/
    }
  });

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  function updateData(chart, labels, mydata) {
    //if(labels) chart.data.labels = labels;
    //chart.data.datasets.forEach((dataset) => {
    //    dataset.data[0]++; // Or you can cheng data like this
    //});
    chart.update();
  }

  setInterval(function() {
    myData[0]++;
    updateData(myChart, null, myData);
  }, 1000);
}

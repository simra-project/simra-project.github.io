window.addEventListener("DOMContentLoaded", draw);

// Define data files as  a global variable

let rideData;

// Define arrays which will contain data aggregated over all regions as  global variables

let aggregatedRides;

// Grab the select-region menu from the DOM

let selectMenu = document.getElementById("select-region");

function draw() {

  // Load the data files, compute the aggregations over all regions
  // and draw charts using the aggregated data

  // (a) RIDES

  async function loadData() {

    const response = await fetch('./rideData.json');

    return await response.json();

  }

  loadData().then((data) => {

    rideData = data;

    aggregatedRides = computeAggregation(data);

    console.log(aggregatedRides);

    // Populate the options menu with available regions
    Object.keys(rideData).forEach((key) => {
    var opt = document.createElement("option");
    opt.value = key;
    opt.innerHTML = key;
    selectMenu.appendChild(opt);
    })

    // Add an event listener to enable redrawing the charts
    // with data for a specific region upon selection

    selectMenu.addEventListener("change", selectOpt);

    drawChart(aggregatedRides.map(e => e.Files), aggregatedRides.map(e => e.Date));

  })


}

// Aggregate data for all regions

function computeAggregation(json) {

  let newArr = []

  Object.values(json).forEach((val) => { newArr = newArr.concat(JSON.parse(JSON.stringify(val))) })

  console.log(newArr);

  let result = newArr.reduce(function(res, obj) {
    if (!(obj.Date in res))
        res.__array.push(res[obj.Date] = obj);
    else {
        res[obj.Date].Files += obj.Files;
    }
    return res;
  }, {__array:[]}).__array
                .sort(function(a,b) { return (new Date(a.Date) - new Date(b.Date)); });

  console.log(result);

  return result;

}

function transparentize(color, opacity) {
  var alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return Color(color).alpha(alpha).rgbString();
}


function selectOpt() {

  let selection = selectMenu.value;

  let cols = document.getElementsByClassName('col-md');
  
  for (let col of cols) {
    let oldCanv = col.removeChild(col.getElementsByTagName("canvas")[0]);
    let newCanv = document.createElement('canvas');
    newCanv.id = oldCanv.id;
    col.appendChild(newCanv);
  }
  
  if (selection == "Region auswählen") {

    drawChart(aggregatedRides.map(e => e.Files), aggregatedRides.map(e => e.Date));

  }

  else {

    let regionRides = rideData[selection];

    drawChart(regionRides.map(e => e.Files), regionRides.map(e => e.Date));

  }

}

function drawChart(graphData, graphLabelsRaw) {

  // Some global options
  Chart.defaults.global.defaultFontFamily = 'Raleway';
  Chart.defaults.global.defaultFontSize = 16;
  Chart.defaults.global.defaultFontColor = '#777';
  Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
      min: 0
    }
  });

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

  let dailyHist = document.getElementById(`dailyHist_Rides`).getContext('2d');

  new Chart(dailyHist, {
    type: 'bar', // bar, horizontal, pie, line, doughnut, radar, polarArea
    data: {
      labels: dailyLabels,
      datasets: [{
        label: 'Uploads',
        data: dailyData,
        backgroundColor: 'lightsalmon',
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
        fontFamily: 'Palatino',
        text: "Fahrten/Tag der letzten 7 Tage",
        fontSize: 18,
        fontColor: 'dimgray'
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
          fontColor: 'dimgray',
          fontFamily: 'Palatino'
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
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function(value) {if (value % 1 === 0) {return value;}}
          }
        }]
      }
    }
  });

  /* 2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // LINE CHART DISPLAYING DAILY UPLOADS PER REGION */
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  let lastMonth_allRegions = document.getElementById(`lastMonth_Rides_AllRegions`).getContext('2d');
  
  new Chart(lastMonth_allRegions, {
    type: 'line', // bar, horizontal, pie, line, doughnut, radar, polarArea
    data: {
      labels: dailyLabels,
      datasets: [{
        label: 'Gesamt',
        data: aggregatedRides.map(e => e.Files).slice(-7),
        backgroundColor: transparentize('red'),
        borderColor: 'red',
        hidden: false,
        fill: 0,
      }, {
        label: 'Augsburg',
        data: rideData['Augsburg'].map(e => e.Files).slice(-7),
        backgroundColor: transparentize('gold'),
        borderColor: 'gold',
        hidden: false,
        fill: 1,
      }, {
        label: 'Berlin',
        data: rideData['Berlin'].map(e => e.Files).slice(-7),
        backgroundColor: transparentize('green'),
        borderColor: 'green',
        hidden: false,
        fill: 2,
      }, {
        label: 'Bern',
        data: rideData['Bern'].map(e => e.Files).slice(-7),
        backgroundColor: transparentize('blue'),
        borderColor: 'blue',
        hidden: false,
        fill: 3,
      }, {
        label: 'Bielefeld',
        data: rideData['Bielefeld'].map(e => e.Files).slice(-7),
        backgroundColor: transparentize('darkviolet'),
        borderColor: 'darkviolet',
        hidden: false,
        fill: 4,
      }, {
        label: 'Düsseldorf',
        data: rideData['Düsseldorf'].map(e => e.Files).slice(-7),
        backgroundColor: transparentize('deeppink'),
        borderColor: 'deeppink',
        hidden: false,
        fill: 5,
      }, {
        label: 'Eichwalde',
        data: rideData['Eichwalde'].map(e => e.Files).slice(-7),
        backgroundColor: transparentize('lightskyblue'),
        borderColor: 'lightskyblue',
        hidden: false,
        fill: 6,
      }, {
        label: 'Hannover',
        data: rideData['Hannover'].map(e => e.Files).slice(-7),
        backgroundColor: transparentize('darkcyan'),
        borderColor: 'darkcyan',
        hidden: false,
        fill: 7,
      }, {
        label: 'Leipzig',
        data: rideData['Leipzig'].map(e => e.Files).slice(-7),
        backgroundColor: transparentize('darkgreen'),
        borderColor: 'darkgreen',
        hidden: false,
        fill: 8,
      }, {
        label: 'München',
        data: rideData['München'].map(e => e.Files).slice(-7),
        backgroundColor: transparentize('orange'),
        borderColor: 'orange',
        hidden: false,
        fill: 9,
      }, {
        label: 'Pforzheim',
        data: rideData['Pforzheim'].map(e => e.Files).slice(-7),
        backgroundColor: transparentize('dodgerblue'),
        borderColor: 'dodgerblue',
        hidden: false,
        fill: 10,
      }, {
        label: 'Ruhrgebiet',
        data: rideData['Ruhrgebiet'].map(e => e.Files).slice(-7),
        backgroundColor: transparentize('mediumvioletred'),
        borderColor: 'mediumvioletred',
        hidden: false,
        fill: 11,
      }, {
        label: 'Stuttgart',
        data: rideData['Stuttgart'].map(e => e.Files).slice(-7),
        backgroundColor: transparentize('mediumseagreen'),
        borderColor: 'mediumseagreen',
        hidden: false,
        fill: 12,
      }, {
        label: 'Wuppertal',
        data: rideData['Wuppertal'].map(e => e.Files).slice(-7),
        backgroundColor: transparentize('midnightblue'),
        borderColor: 'midnightblue',
        hidden: false,
        fill: 13,
      }]
    },
    options: {
      title: {
        display: true,
        fontFamily: 'Palatino',
        text: "Fahrten/Tag der letzten 7 Tage",
        fontSize: 18,
        fontColor: 'dimgray'
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          fontColor: 'dimgray',
          fontFamily: 'Palatino'
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
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function(value) {if (value % 1 === 0) {return value;}}
          }
        }]
      }
    }
  });

  /* 3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3-3
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // LINE CHART DISPLAYING CUMULATIVE MONTHLY UPLOADS */
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  // Array in which # of uploads per month will be stored
  let monthlyData = [];

  // Array in which labels for months will be stored, e.g.
  // 'April 2019'
  let monthlyLabels = [];

  // Helper variable for accumulating monthly upload data
  let accumulator = 0;

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

        monthlyLabels.push(graphLabels[i].format('MM').concat(' ',
          graphLabels[i].format('YYYY')));

        accumulator += graphData[i];

        monthlyData.push(accumulator);

        break;

      default:

        if (graphLabels[i].month() ==
          graphLabels[i - 1].month()) {

          accumulator += graphData[i];

        } else {

          monthlyLabels.push(graphLabels[i - 1].format('MM').concat(' ',
            graphLabels[i - 1].format('YYYY')));

          monthlyData.push(accumulator);
          accumulator = graphData[i];

        }

        break;

    }

  }

  // Create JSONarray

  var obj = {
    jsonarray: []
  };

  // Combine the data and label arrays into one JSON file

  for (i = 0; i < monthlyData.length; i++) {

    var month_year = monthlyLabels[i];

    var files = monthlyData[i];

    obj.jsonarray.push({
      Date: month_year,
      Files: files
    });

  }

  let monthlyRidesChart = document.getElementById(`monthly_Rides`).getContext('2d');

  new Chart(monthlyRidesChart, {
    type: 'line', // bar, horizontal, pie, line, doughnut, radar, polarArea
    data: {
      labels: monthlyLabels,
      datasets: [{
        label: 'Uploads',
        data: monthlyData,
        backgroundColor: 'lightsalmon',
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
        text: `Rides/Monat seit Projektbeginn`,
        fontSize: 18,
        fontFamily: 'Palatino',
        fontColor: 'dimgrey'
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
          fontFamily: 'Palatino',
        fontColor: 'dimgrey'
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
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          display: true,
          ticks: {
            //fontSize: 14,
            userCallback: function(item, index) {
              if (index % 3) return "";
              return item;
            },
            maxRotation: 0,
            minRotation: 0,
            autoSkip: false
            // stepSize: 6
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function(value) {if (value % 1 === 0) {return value;}}
          }
        }]
      }
    }
  });

/* 4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// LINE CHART DISPLAYING CUMULATIVE MONTHLY UPLOADS */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  let cumulativeMonthlyData = monthlyData.reduce(function(r, a) {
    if (r.length > 0)
      a += r[r.length - 1];
    r.push(a);
    return r;
  }, []);

  let monthlyCumulativeChart = document.getElementById(`monthlyCumulative_Rides`).getContext('2d');

  //let monthlyCumulativeUploadsChart = 

  new Chart(monthlyCumulativeChart, {
    type: 'line', // bar, horizontal, pie, line, doughnut, radar, polarArea
    data: {
      labels: monthlyLabels,
      datasets: [{
        label: 'Uploads',
        data: cumulativeMonthlyData,
        backgroundColor: 'lightsalmon',
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
        text: `Rides/Monat seit Projektbeginn, kumuliert`,
        fontSize: 18,
        fontFamily: 'Palatino',
        fontColor: 'dimgrey'
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
          fontFamily: 'Palatino',
        fontColor: 'dimgrey'
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
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          display: true,
          ticks: {
            //fontSize: 14,
            userCallback: function(item, index) {
              if (index % 3) return "";
              return item;
            },
            maxRotation: 0,
            minRotation: 0,
            autoSkip: false
            // stepSize: 6
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function(value) {if (value % 1 === 0) {return value;}}
          }
        }]
      }
    }
  });

}

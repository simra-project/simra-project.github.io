window.addEventListener("DOMContentLoaded", draw);

// Define data files as  a global variable

let rideData;

let profileData;

// Define arrays which will contain data aggregated over all regions as  global variables

let aggregatedRides;

let aggregatedProfiles;

// Grab the select-region menu from the DOM

let selectMenu = document.getElementById("select-region");

function draw() {

  // Load the data files, compute the aggregations over all regions
  // and draw charts using the aggregated data

  // (a) RIDES

  async function loadData() {

    const rides = fetch('./rideData.json').then((response) => response.json());
    const profiles = fetch('./profileData.json').then((response) => response.json());

    const res = await Promise.all([rides, profiles]);

    return res

  }

  loadData().then((dataArr) => {

    rideData = dataArr[0];
    profileData = dataArr[1];
    aggregatedRides= computeAggregation(Array.from(rideData));
    aggregatedProfiles= computeAggregation(Array.from(profileData));

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

    drawChart(aggregatedRides.map(e => e.Files), aggregatedRides.map(e => e.Date), 'Rides');

    drawChart(aggregatedProfiles.map(e => e.Files), aggregatedProfiles.map(e => e.Date), 'Profiles');


  })


}

// Aggregate data for all regions

function computeAggregation(json) {

  let newArr = []

  Object.values(json).forEach((val) => { newArr = newArr.concat(JSON.parse(JSON.stringify(val))) })

  let result = newArr.reduce(function(res, obj) {
    if (!(obj.Date in res))
        res.__array.push(res[obj.Date] = obj);
    else {
        res[obj.Date].Files += obj.Files;
    }
    return res;
  }, {__array:[]}).__array
                .sort(function(a,b) { return b.Date - a.Date; });

  return result;

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

    drawChart(aggregatedRides.map(e => e.Files), aggregatedRides.map(e => e.Date), 'Rides');
    drawChart(aggregatedProfiles.map(e => e.Files), aggregatedProfiles.map(e => e.Date), 'Profiles');

  }

  else {

    let regionRides = rideData[selection];
    let regionProfiles = profileData[selection];

    // regionRides.shift();
    // regionProfiles.shift();

    drawChart(regionRides.map(e => e.Files), regionRides.map(e => e.Date), 'Rides');
    drawChart(regionProfiles.map(e => e.Files), regionProfiles.map(e => e.Date), 'Profiles');

  }

}

function drawChart(graphData, graphLabelsRaw, dataCat) {

  let labels = (dataCat == 'Rides') ? ["Fahrten/Tag der letzten 7 Tage", "Fahrten/Monat seit Projektbeginn, kumuliert"] 
                                    : ["Profilaktivität/Tag der letzten 7 Tage", "Profilaktivität/Monat seit Projektbeginn"] 

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

  var dailyHist = document.getElementById(`dailyHist_${dataCat}`).getContext('2d');

  var dailyUploadsChart = new Chart(dailyHist, {
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
        //text: `${dataCat}/Tag der letzten sieben Tage`,
        text: labels[0],
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
  // LINE CHART DISPLAYING CUMULATIVE MONTHLY UPLOADS */
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

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
  
          monthlyLabels.push(graphLabels[i].format('MM').concat(' ',
            graphLabels[i].format('YYYY')));
  
          monthlyData.push(accumulator);
          accumulator = 0;
  
          break;
  
        default:
  
          if (graphLabels[i].month() ==
            graphLabels[i - 1].month()) {
  
            accumulator += graphData[i];
  
          } else {
  
            monthlyLabels.push(graphLabels[i - 1].format('MM').concat(' ',
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
  
  if (dataCat == 'Rides') {

    monthlyData = monthlyData.reduce(function(r, a) {
      if (r.length > 0)
        a += r[r.length - 1];
      r.push(a);
      return r;
    }, []);

  }

  var monthlyCumulativeChart = document.getElementById(`monthlyCumulative_${dataCat}`).getContext('2d');

  var monthlyCumulativeUploadsChart = new Chart(monthlyCumulativeChart, {
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
        //text: `${dataCat}/Monat seit Projektbeginn, kumuliert`,
        text: labels[1],
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

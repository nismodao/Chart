$(() => {
  var data2015, data2016, month, index, display, currentMonth;
  var model = {};
  const temp = (min, max) => {
    var arr = [];
    const getRandomArbitrary = (min, max) => {
      return Math.random() * (max - min) + min;
    }
    for (var i = 0; i < 29; i++) {
      var day = getRandomArbitrary(min, max);
      arr.push(day);
    }
    return arr;
  };
  data2015 = temp(50,80);
  data2016 = temp(60,90);
  month = ["January 2016", "February 2016", "March 2016", "April 2016", "May 2016",
    "June 2016", "July 2016", "August 2016", "September 2016", "October 2016", "November 2016", "December 2016"];
  index = 0;
  display = 'Temperature (F)';
  currentMonth = month[index];

  $(".left").click(() => {
    if (index === 0) {
      index = month.length - 1;
    } else {
      index--;
    }
    var currentMonth = month[index];
    data2015 = temp(50,80);
    data2016 = temp(60,90);
    $(".month").text(currentMonth);
    graph(display, data2015, data2016);
  });

  $(".right").click(() => {
   if (index === month.length - 1) {
     index = 0;
   } else {
     index++;
   }
    var currentMonth = month[index];
    data2015 = temp(50,80);
    data2016 = temp(60,90);
    $(".month").text(currentMonth);
    graph(display, data2015, data2016);
  });

  const changeUnit = (display, data2015, data2016) => {
    if (display === "Temperature (F)") {
      data2015 = data2015.map(function (element) {
        return (element - 32) * (5/9);      
      });
      data2016 = data2016.map(function (element) {
        return (element - 32) * (5/9);      
      });
    display = "Temperature (C)"
    } else {
      data2015 = data2015.map(function (element) {
        return (element * (9/5) + 32);
      });
      data2016 = data2016.map(function (element) {
        return (element * (9/5) + 32);
      });
      display = "Temperature (F)"; 
    }
    graph(display, data2015, data2016);
  }


  const graph = (display, data2015, data2016) => {
    $('#container').highcharts({
      chart: {
        type: 'areaspline',
        fontfamily: "Helvetica",
        color: "white",
        backgroundColor: null
      },
      title: {
          text: ""
      },
      legend: {
          enabled: false
      },
      xAxis: {
        categories: ["A","","","","","","","B","","","","","","",
        "C","","","","","","", "D","","","","","","", "E"],
        tickInterval: 7,
          plotLines: [{
              value: 0,
              width: 1,
              color: 'white'
          }, {
              value: 7,
              width: 1,
              color: 'white'
          }, {
              value: 14,
              width: 1,
              color: 'white'
          }, {
              value: 21,
              width: 1,
              color: 'white'
          }, {
              value: 28,
              width: 1,
              color: 'white'
          }],
          labels: {
            style: {
              color: 'white',
              fontSize: '15px'
            }
          }
      },
      yAxis: {
        labels: {
          style: {
            color: 'white',
            fontSize: '15px'
          }
        },
        title: {
          text: display,
          style: {
            color: "white",
            fontFamily: "Helvetica",
            letterSpacking: "2px",
            fontSize: "15px"
          }
        },
        gridLineWidth: 0,
        minorGridLineWidth: 0
      },
      tooltip: {
        enabled: false
      },
      credits: {
          enabled: false
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.4,
          color: '#9b59b6'
        }
     },
      series: [{
          name: '',
          data: data2015,
      },
       {
          name: '',
          data: data2016
      }],
        exporting: {
          buttons: {
            contextButton: {
              enabled: false
            },  
            buttonUnit: {
              x: -5,
              y: -10,
              symbol: "circle",
              onclick: () => {
                changeUnit(display, data2015, data2016);
              }
            }     
          }
        }
    });
  }
  graph(display, data2015, data2016);
});
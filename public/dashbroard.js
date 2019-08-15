/*eslint-disable*/
var accessToken=""
gapi.analytics.ready(async function() {

  /*
   * AJAX 통신을 통해 api 서버로부터 엑세스 토큰을 받아온다.
   */
  httpRequest = new XMLHttpRequest()
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
      accessToken = JSON.parse(httpRequest.responseText)
    }
  }
  httpRequest.open("GET", "http://localhost:5000/gapi/token/access", false)
  await httpRequest.send()

//   console.info(accessToken)
  /**
   * Authorize the user with an access token obtained server side.
   */
  gapi.analytics.auth.authorize({
    'serverAuth': {
      'access_token': accessToken
    }
  });


  /**
   * Creates a new DataChart instance showing sessions over the past 30 days.
   * It will be rendered inside an element with the id "chart-1-container".
   */
  var dataChart1 = new gapi.analytics.googleCharts.DataChart({
    query: {
      'ids': 'ga:199226457', // <-- Replace with the ids value for your view.
      'start-date': '10daysAgo',
      'end-date': 'today',
      'metrics': 'ga:sessions,ga:users',
      'dimensions': 'ga:date'
    },
    chart: {
      'container': 'chart-1-container',
      'type': 'LINE',
      'options': {
        'width': '100%'
      }
    }
  });
  dataChart1.execute();


  /**
   * Creates a new DataChart instance showing top 5 most popular demos/tools
   * amongst returning users only.
   * It will be rendered inside an element with the id "chart-3-container".
   */
  var dataChart2 = new gapi.analytics.googleCharts.DataChart({
    query: {
      'ids': 'ga:199226457', // <-- Replace with the ids value for your view.
      'start-date': '30daysAgo',
      'end-date': 'yesterday',
      'metrics': 'ga:pageviews',
      'dimensions': 'ga:pagePathLevel1',
      'sort': '-ga:pageviews',
      'filters': 'ga:pagePathLevel1!=/',
      'max-results': 7
    },
    chart: {
      'container': 'chart-2-container',
      'type': 'PIE',
      'options': {
        'width': '100%',
        'pieHole': 4/9,
      }
    }
  });
  dataChart2.execute();

  var dataChart3 = new gapi.analytics.googleCharts.DataChart({
    query: {
        'start-date': "30daysAgo",
        'end-date': "yesterday",
        'ids': "ga:199226457",
        'dimensions': "ga:city",
        metrics: [
        "ga:sessions",
        "ga:pageviews"
        ],
        'start-index': 1,
        'max-results': 1000
        },
    chart: {
      'container': 'chart-3-container',
      'type': 'PIE',
      'options': {
        'width': '100%',
        'pieHole': 4/9,
      }
    }
  });
  dataChart3.execute();

});

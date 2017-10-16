
var app = angular.module('resultPizza',[]);
  
app.config(['$locationProvider', function($locationProvider){
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
}])

app.controller('pizzaCtrl',function($scope,$http,$location){ 

  var url_param = null;

  //Check URL for poll
  if ($location.search()['poll']) {
    url_param = $location.search()['poll'];
  }
  
  if(url_param==null){

    //no poll set in URI
    console.log('no poll paramater found.');
    $('#app').html('<div class="alert alert-danger"><p><strong>Oops!</strong> No poll was specified.</p><a class="alert-link" target="_self" href="index.html">Click here to return home.</a></div>');

  }else{
   
    //poll set in URI 
    console.log('poll set to: ' + url_param);

    $http.get('app/pizza_api.php?poll=' + url_param)
    .then(function(pollresponse) {

        if(!pollresponse.data.url){
          //poll cant be found by API...

          console.log('API could not find poll.');
          $('#app').html('<div class="alert alert-danger"><p><strong>Oops!</strong> This poll doesn\'t exist...</p><a class="alert-link" target="_self" href="index.html">Click here to return home.</a></div>');

        }else{
          //poll data exists!

          $scope.title = pollresponse.data.title;
          $scope.question = pollresponse.data.question;
          
          $scope.poll_id = pollresponse.data.poll_id;
          $scope.url = pollresponse.data.url;
          $scope.creator = pollresponse.data.creator;
          $scope.poll_timestamp = pollresponse.data.poll_timestamp;

          $http.get('app/pizza_api.php?votes=' + url_param)
          .then(function(resultsresponse) {

              if(!resultsresponse.data[0]){
                //votes cant be found by API...

                console.log('API could not find any poll votes.');

                //no results can be found
                $('#pieChart').remove();
                $('#resultArea').html('<div class="alert alert-warning"><p><strong>Whoa!</strong> This poll doesn\'t have any votes yet... <a class="alert-link" target="_self" href="vote.html?poll='+url_param+'">Click here to vote now!</a></p></div>');

              }else{
                //poll votes exists!

                console.log('API found poll results.');

                var option_1Count = 0;
                var option_2Count = 0;
                var option_3Count = 0;
                var option_4Count = 0;

                for (var i=0; i<resultsresponse.data.length; i++) {

                  if (resultsresponse.data[i].vote == '1'){
                    option_1Count += 1;
                  }
                  if (resultsresponse.data[i].vote == '2'){
                    option_2Count += 1;
                  }
                  if (resultsresponse.data[i].vote == '3'){
                    option_3Count += 1;
                  }
                  if (resultsresponse.data[i].vote == '4'){
                    option_4Count += 1;
                  }

                }

                var chartData = [];
                var chartLabels = [];

                if(pollresponse.data.option_1){ chartData.push(option_1Count); chartLabels.push('A. '+pollresponse.data.option_1); }
                if(pollresponse.data.option_2){ chartData.push(option_2Count); chartLabels.push('B. '+pollresponse.data.option_2); }
                if(pollresponse.data.option_3){ chartData.push(option_3Count); chartLabels.push('C. '+pollresponse.data.option_3); }
                if(pollresponse.data.option_4){ chartData.push(option_4Count); chartLabels.push('D. '+pollresponse.data.option_4); }

                $(document).ready(function() {
                  
                  //Create Pie Chart
                  var ctx = $('#pieChart');
                  var pieChart = new Chart(ctx,{
                    type: 'pie',
                    data: {
                      datasets: [{
                          data: chartData,
                          backgroundColor: [
                            'rgba(247,207,109, 0.9)',
                            'rgba(196,81,54, 0.9)',
                            'rgba(106,160,76, 0.9)',
                            'rgba(196,135,66, 0.9)'
                          ]
                        }],
                      labels: chartLabels,
                    },
                    options: {
                      pieceLabel: {
                        render: 'percentage',
                        fontColor: 'white',
                        precision: 2,
                      },
                      tooltips: {
                        enabled: false,
                      },
                      legend: {
                        display: false,
                        position: 'bottom',
                        labels: {
                          usePointStyle: true
                        }
                      }
                    }
                  });

                  //Create Custom Legend
                  //Modified from https://embed.plnkr.co/5nuGS2KEV6hvESwGrOse/
                  var legendData = chartData.slice(0);
                  $('#pieLegend').append(pieChart.generateLegend());
                  $('#pieLegend ul').each(function () {
                    $(this).addClass('list-group list-group-flush');
                  });
                  $('#pieLegend li').each(function () {
                    $(this).addClass('list-group-item text-muted');
                    $(this).append(' (<b>' + legendData[$(this).index()] + '</b>)')
                  });
                  $('#pieLegend').on('click', 'li', function () {
                    pieChart.data.datasets[0].data[$(this).index()] = legendData[$(this).index()] !== pieChart.data.datasets[0].data[$(this).index()] ? legendData[$(this).index()] : 0;
                    pieChart.update();
                    $(this).toggleClass('striked');
                  });

                  //Create Data Table
                  $('#resultsTable').DataTable( {
                    "language": {
                      "processing": "<div class=\"progress-bar bg-warning progress-bar-indeterminate\" role=\"progressbar\"></div>",
                      "lengthMenu": "Display _MENU_",
                      "paginate": {
                        "first":      "First",
                        "last":       "Last",
                        "next":       "&raquo;",
                        "previous":   "&laquo;"
                      }
                    },
                    "lengthMenu": [[5, 10, 25], [5, 10, 25]],
                    "processing": true,
                    "ajax" : {
                      "url" : 'app/pizza_api.php?votes='+url_param,
                      dataSrc : ''
                    },
                    "columns" : [{
                      "data" : "vote",
                      "render": function ( data, type, row ) {
                        if(data==1){return 'A ';}else if(data==2){return 'B';}else if(data==3){return 'C';}else if(data==4){return 'D';}else{return 'N/A';}
                      }
                    }, {
                      "data" : "voter"
                    }, {
                      "data" : "vote_timestamp"
                    }]
                  });

                  //$.fn.DataTable.ext.pager.numbers_length = 5;
                  //limit pages shown to 5 (must be odd number and above 5 to work)

                  $('#goVote').html('<div class="card mt-3"><div class="card-body"><a target="_self" href="vote.html?poll='+url_param+'" class="btn btn-secondary btn-lg btn-block">Vote Now</button></div></div>');

                });

              }

          });

        }

    });  

  }
    
});

//Safari Mobile Web Standalone Link Redirect
if(("standalone" in window.navigator) && window.navigator.standalone){
  var noddy, remotes = false;
  document.addEventListener('click', function(event) {
  noddy = event.target;
  while(noddy.nodeName !== "A" && noddy.nodeName !== "HTML") {
  noddy = noddy.parentNode;
  }
  if('href' in noddy && noddy.href.indexOf('http') !== -1 && (noddy.href.indexOf(document.location.host) !== -1 || remotes))
  {
  event.preventDefault();
  document.location.href = noddy.href;
  }
  },false);
}
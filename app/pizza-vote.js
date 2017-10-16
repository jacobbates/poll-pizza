
var app = angular.module('votePizza',[]);

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
            $scope.option_1 = pollresponse.data.option_1;
            $scope.option_2 = pollresponse.data.option_2;

            if(pollresponse.data.option_3){
              $scope.option_3 = pollresponse.data.option_3;
            }else{
              $('#option_3').remove();
            }

            if(pollresponse.data.option_4){
              $scope.option_4 = pollresponse.data.option_4;
            }else{
              $('#option_4').remove();
            }
            
            $scope.poll_id = pollresponse.data.poll_id;
            $scope.url = pollresponse.data.url;
            $scope.creator = pollresponse.data.creator;
            $scope.poll_timestamp = pollresponse.data.poll_timestamp;

            //create insertData function (only inside the scope of a poll existing)
            $scope.insertData=function(){      
              $http.post('app/pizza_api.php?create_vote', {
                'vote':$scope.vote,
                'voter':$scope.voter,
                'poll_id':pollresponse.data.poll_id
              }).then(function(voteresponse){
                        
                if (voteresponse.data.success) {
                  //success
                  $scope.alertClass = 'alert alert-success';
                  $scope.result = voteresponse.data.result;
                  $('#voteForm').remove();
                  $('#goResult').html('<div class="card"><div class="card-body"><a target="_self" href="result.html?poll='+url_param+'" class="btn btn-secondary btn-lg btn-block">View Results</button></div></div>');

                }
                else {
                  //failed
                  $scope.alertClass = 'alert alert-warning';
                  $scope.result = voteresponse.data.result + voteresponse.data.errors.vote;
                }

              },function(error){
                        
                console.error(error);

              });
            }

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
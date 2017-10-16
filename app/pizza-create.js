var app = angular.module('createPizza',[]);

app.controller('pizzaCtrl',function($scope,$http){    
  $scope.insertData=function(){      
    $http.post("app/pizza_api.php?create_poll", {
        'title':$scope.title,
        'question':$scope.question,
        'creator':$scope.creator,
        'url':$scope.url,
        'poll_ip':$scope.poll_ip,
        'option_1':$scope.option_1,
        'option_2':$scope.option_2,
        'option_3':$scope.option_3,
        'option_4':$scope.option_4
    }).then(function(response){
            
          if (response.data.success == true) {
            //success
            $scope.alertClass = 'alert alert-success';
            $scope.result = response.data.result;
            $('#createForm').html('<div class="card mb-3"><div class="card-body"><a target="_self" href="vote.html?poll='+$scope.url+'" class="btn btn-primary btn-lg btn-block">Vote Now</button></div></div><div class="card mb-3"><div class="card-body"><a target="_self" href="result.html?poll='+$scope.url+'" class="btn btn-secondary btn-lg btn-block">View Results</button></div></div>');

          }
          else {
            //failed
            $scope.alertClass = 'alert alert-warning';
            $scope.result = response.data.result;
            if(response.data.errors.title!=null){
              $scope.titleClass = 'is-invalid';
              $scope.titleError = response.data.errors.title;
              }else{ $scope.titleClass = 'is-valid';
            }
            if(response.data.errors.question!=null){
              $scope.questionClass = 'is-invalid';
              $scope.questionError = response.data.errors.question;
              }else{ $scope.questionClass = 'is-valid';
            }
            if(response.data.errors.url!=null){
              $scope.urlClass = 'is-invalid';
              $scope.urlError = response.data.errors.url;
              }else{ $scope.urlClass = 'is-valid';
            }
            if(response.data.errors.creator!=null){
              $scope.creatorClass = 'is-invalid';
              $scope.creatorError = response.data.errors.creator;
              }else{ $scope.creatorClass = 'is-valid';
            }
            if(response.data.errors.option_1!=null){
              $scope.option_1Class = 'is-invalid';
              $scope.option_1Error = response.data.errors.option_1;
              }else{ $scope.option_1Class = 'is-valid';
            }
            if(response.data.errors.option_2!=null){
              $scope.option_2Class = 'is-invalid';
              $scope.option_2Error = response.data.errors.option_2;
              }else{ $scope.option_2Class = 'is-valid';
            }
            if(response.data.errors.option_3!=null){
              $scope.option_3Class = 'is-invalid';
              $scope.option_3Error = response.data.errors.option_3;
              }else{ $scope.option_3Class = 'is-valid';
            }
            if(response.data.errors.option_4!=null){
              $scope.option_4Class = 'is-invalid';
              $scope.option_4Error = response.data.errors.option_4;
              }else{ $scope.option_4Class = 'is-valid';
            }
          }

        },function(error){
            
            console.error(error);

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
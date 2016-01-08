'use strict';

class ActivityListResultsController {
  constructor($scope, $state, $stateParams, $http, $mdToast) {
    $scope.activity = $stateParams.activity;
    
    $scope.goTo = (stateName) => {
      $state.go(stateName, {activity: $stateParams.activity});
    };

    $scope.getSmallResultImage = (result) => {
      let prefix2image = {
        'starwars': 'assets/darth-vader_sm.jpg',
        'got': 'assets/daenerys-targaryen_sm.jpg',
        'matrix': 'assets/neo_sm.jpg',
        'himym': 'assets/barney-stinson_sm.jpg',
        'bttf': 'assets/marty-mcfly_sm.jpg'
      };
      return prefix2image[result.team];
    };

    $scope.getResultScore = (result) => {
      let score = result.score + ' tableaux';
      if (result.score === 0) {
        score = 'Aucun tableau';
      } else if (result.score === 1) {
        score = '1 tableau';
      }

      let date = new Date(result.createdAt);
      date = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

      return score + ' (' + date + ')';
    };

    $scope.delete = (result) => {
      $http.delete('/api/v1.0/activities/' + $stateParams.activity + '/results/' + result._id).then((response) => {
        $scope.errorMessage = undefined;
        $http.get('/api/v1.0/activities/' + $stateParams.activity + '/results?all=true').then((response) => {
          $scope.results = response.data;
        });
      }, (response) => {
        let message = 'Vous n\'avez pas l\'authorisation nécessaire';
        if (response.status === 400) {
          message = 'Oops il y a eu un soucis avec le serveur';
        }
        $mdToast.show($mdToast.simple().textContent(message).position('bottom right').hideDelay(3000));
      });
    };

    $http.get('/api/v1.0/activities/' + $stateParams.activity + '/results?all=true').then((response) => {
      $scope.results = response.data;
    });
  }
}

let activityListResultsControllerName = 'ActivityListResultsController';
let activityListResultsControllerDeclaration = [
  '$scope',
  '$state',
  '$stateParams',
  '$http',
  '$mdToast',
  ActivityListResultsController
];

export {activityListResultsControllerName, activityListResultsControllerDeclaration};

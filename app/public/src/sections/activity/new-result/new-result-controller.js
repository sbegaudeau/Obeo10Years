'use strict';

class ActivityNewResultController {
  constructor($scope, $state, $stateParams, $http, $mdToast) {
    $scope.activity = $stateParams.activity;

    $scope.goTo = (stateName) => {
      $state.go(stateName, {activity: $stateParams.activity});
    };

    $scope.teams = [{
      id: 'bttf',
      label: 'Back to the future'
    }, {
      id: 'got',
      label: 'Game of Thrones'
    }, {
      id: 'himym',
      label: 'How I met your mother'
    }, {
      id: 'matrix',
      label: 'Matrix'
    }, {
      id: 'starwars',
      label: 'Star Wars'
    }];

    $scope.user = {};
    $scope.user.team = $scope.teams[0].id;
    $scope.user.result = 0;

    $scope.submitResult = () => {
      let result = {
        team: $scope.user.team,
        score: $scope.user.result
      };
      $http.post('/api/v1.0/activities/' + $stateParams.activity + '/results', result).then((response) => {
        $state.go('activityViewAllResults', {activity: $stateParams.activity});
      }, (response) => {
        let message = 'Vous n\'avez pas l\'authorisation nécessaire';
        if (response.status === 400) {
          message = 'Oops il y a eu un soucis avec le serveur';
        }
        $mdToast.show($mdToast.simple().textContent(message).position('bottom right').hideDelay(3000));
      });
    };
  }
}

let activityNewResultControllerName = 'ActivityNewResultController';
let activityNewResultControllerDeclaration = [
  '$scope',
  '$state',
  '$stateParams',
  '$http',
  '$mdToast',
  ActivityNewResultController
];

export {activityNewResultControllerName, activityNewResultControllerDeclaration};

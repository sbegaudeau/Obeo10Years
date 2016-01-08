'use strict';

class ActivityViewAllResultsController {
  constructor($scope, $state, $stateParams, $http) {
    $scope.activity = $stateParams.activity;

    $scope.goTo = (stateName) => {
      $state.go(stateName, {activity: $stateParams.activity});
    };

    $http.get('/api/v1.0/activities/' + $stateParams.activity + '/results').then((response) => {
      let data = response.data;
      if (response.status === 200 && data.length > 1) {
        let first = data[0];
        let others = [];

        for (let i = 1; i < data.length; i = i + 1) {
          others.push(data[i]);
        }

        $scope.first = first;
        $scope.others = others;
      }
    });
  }
}

let activityViewAllResultsControllerName = 'ActivityViewAllResultsController';
let activityViewAllResultsControllerDeclaration = [
  '$scope',
  '$state',
  '$stateParams',
  '$http',
  ActivityViewAllResultsController
];

export {activityViewAllResultsControllerName, activityViewAllResultsControllerDeclaration};

'use strict';

class ActivityViewAllResultsController {
  constructor($scope, $state, $stateParams, $http, $cookies, $timeout) {
    $scope.activity = $stateParams.activity;
    $scope.rotation = $stateParams.rotation;

    $scope.goTo = (stateName) => {
      $state.go(stateName, {activity: $stateParams.activity});
    };

    $scope.hasAPIKey = () => {
      return $cookies.get('OBEO_10YEARS_API_KEY') !== undefined;
    };

    let update = () => {
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
    };

    update();

    if ($stateParams.rotation) {
      let activity = $stateParams.activity;

      let newActivity = undefined;
      if (activity === 'mario') {
        newActivity = 'cocktail';
      } else if (activity === 'cocktail') {
        newActivity = 'quizz';
      } else if (activity === 'quizz') {
        newActivity = 'babyfoot';
      } else if (activity === 'babyfoot') {
        newActivity = 'lego';
      } else if (activity === 'lego') {
        newActivity = 'robots';
      } else if (activity === 'robots') {
        // nothing to go to the leaderboard
      }

      if (newActivity !== undefined) {
        let timer = $timeout(() => {
          $state.go('activityViewAllResults', {activity: newActivity, rotation: 'true'});
        }, 10000);
        $scope.$on('$destroy', (event) => {
          $timeout.cancel(timer);
        });
      } else {
        let timer = $timeout(() => {
          $state.go('leaderboard', {rotation: 'true'});
        }, 10000);
        $scope.$on('$destroy', (event) => {
          $timeout.cancel(timer);
        });
      }
    }
  }
}

let activityViewAllResultsControllerName = 'ActivityViewAllResultsController';
let activityViewAllResultsControllerDeclaration = [
  '$scope',
  '$state',
  '$stateParams',
  '$http',
  '$cookies',
  '$timeout',
  ActivityViewAllResultsController
];

export {activityViewAllResultsControllerName, activityViewAllResultsControllerDeclaration};

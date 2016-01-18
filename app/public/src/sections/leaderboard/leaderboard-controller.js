'use strict';

class LeaderboardController {
  constructor($scope, $state, $http, $timeout, $stateParams) {
    $scope.goTo = (stateName) => {
      $state.go(stateName);
    };

    let update = () => {
      $http.get('/api/v1.0/results').then((response) => {
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

    let socket = io.connect('http://localhost:3000');
    socket.on('results_updated', function(msg) {
      console.log('refreshing the results');
      update();
      $scope.$apply();
    });

    $scope.$on("$destroy", function() {
      console.log('shutting down the connection');
      socket.disconnect();
    });

    if ($stateParams.rotation) {
      $timeout(() => {
        $state.go('activityViewAllResults', {activity: 'mario', rotation: 'true'});
      }, 10000);
    }
  }
}

let leaderboardControllerName = 'LeaderboardController';
let leaderboardControllerDeclaration = [
  '$scope',
  '$state',
  '$http',
  '$timeout',
  '$stateParams',
  LeaderboardController
];

export {leaderboardControllerName, leaderboardControllerDeclaration};

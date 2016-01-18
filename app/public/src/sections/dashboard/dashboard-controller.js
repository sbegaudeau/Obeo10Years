'use strict';

class DashboardController {
  constructor($scope, $state) {
    $scope.goTo = (stateName, activityName) => {
      if (stateName === 'leaderboard') {
        $state.go(stateName, {rotation: 'true'});
      } else if (activityName === undefined) {
        $state.go(stateName);
      } else {
        $state.go(stateName, {activity: activityName});
      }
    };
  }
}

let dashboardControllerName = 'DashboardController';
let dashboardControllerDeclaration = [
  '$scope',
  '$state',
  DashboardController
];

export {dashboardControllerName, dashboardControllerDeclaration};

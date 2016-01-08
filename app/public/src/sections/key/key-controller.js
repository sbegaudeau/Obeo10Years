'use strict';

class KeyController {
  constructor($scope, $state, $cookies) {
    $scope.goTo = (stateName) => {
      $state.go(stateName);
    };

    let currentKey = $cookies.get('OBEO_10YEARS_API_KEY');
    if (currentKey !== undefined && currentKey.length > 0) {
      $scope.key = currentKey;
    }

    $scope.save = (key) => {
      $cookies.put('OBEO_10YEARS_API_KEY', key);
      $state.go('dashboard');
    };
  }
}

let keyControllerName = 'KeyController';
let keyControllerDeclaration = [
  '$scope',
  '$state',
  '$cookies',
  KeyController
];

export {keyControllerName, keyControllerDeclaration};

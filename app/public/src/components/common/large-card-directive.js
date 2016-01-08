'use strict';

let LargeCardDirective = () => {
  let directive = {};
  directive.template = '<md-card>' +
                       '  <a ui-sref="leaderboard"><img ng-src="{{image}}" class="md-card-image" alt="{{name}}"></a>' +
                       '  <md-card-title>' +
                       '    <md-card-title-text>' +
                       '      <span class="md-headline">{{name}}</span> {{score}}' +
                       '    </md-card-title-text>' +
                       '  </md-card-title>' +
                       '  <md-card-content>' +
                       '  </md-card-content>' +
                       '</md-card>';

  class LargeCardDirectiveController {
    constructor ($scope) {
      let prefix2name = {
        'starwars': 'Star Wars',
        'got': 'Game of Thrones',
        'matrix': 'Matrix',
        'himym': 'How I met your mother',
        'bttf': 'Back to the future'
      };

      let prefix2image = {
        'starwars': 'assets/darth-vader_lg.jpg',
        'got': 'assets/daenerys-targaryen_lg.jpg',
        'matrix': 'assets/neo_lg.jpg',
        'himym': 'assets/barney-stinson_lg.jpg',
        'bttf': 'assets/marty-mcfly_lg.jpg'
      };

      $scope.$watch('result', (newValue) => {
        if (newValue !== undefined) {
          $scope.name = prefix2name[$scope.result.team];

          if ($scope.result.score === 0) {
            $scope.score = '0 point';
          } else if ($scope.result.score === 1) {
            $scope.score = '1 point';
          } else {
            $scope.score = $scope.result.score + ' points';
          }

          $scope.image = prefix2image[$scope.result.team];
        }
      });
    }
  };

  directive.scope = {
    result: '='
  };
  directive.controller = ['$scope', LargeCardDirectiveController];
  return directive;
};

let largeCardDirectiveName = 'largeCard';
let largeCardDirectiveDeclaration = [
  LargeCardDirective
];

export {largeCardDirectiveName, largeCardDirectiveDeclaration};

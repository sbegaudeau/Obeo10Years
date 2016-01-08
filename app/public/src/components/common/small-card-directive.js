'use strict';

let SmallCardDirective = () => {
  let directive = {};
  directive.template = '<md-card>' +
                       '  <md-card-title>' +
                       '    <md-card-title-text>' +
                       '      <span class="md-headline">{{name}}</span> {{score}}' +
                       '    </md-card-title-text>' +
                       '    <md-card-title-media>' +
                       '      <div class="md-media-sm card-media">' +
                       '        <img ng-src="{{image}}">' +
                       '      </div>' +
                       '    </md-card-title-media>' +
                       '  </md-card-title>' +
                       '</md-card>';

  class SmallCardDirectiveController {
    constructor ($scope) {
      let prefix2name = {
        'starwars': 'Star Wars',
        'got': 'Game of Thrones',
        'matrix': 'Matrix',
        'himym': 'How I met your mother',
        'bttf': 'Back to the future'
      };

      $scope.name = prefix2name[$scope.result.team];

      if ($scope.result.score === 0) {
        $scope.score = '0 point';
      } else if ($scope.result.score === 1) {
        $scope.score = '1 point';
      } else {
        $scope.score = $scope.result.score + ' points';
      }

      let prefix2image = {
        'starwars': 'assets/darth-vader_sm.jpg',
        'got': 'assets/daenerys-targaryen_sm.jpg',
        'matrix': 'assets/neo_sm.jpg',
        'himym': 'assets/barney-stinson_sm.jpg',
        'bttf': 'assets/marty-mcfly_sm.jpg'
      };

      $scope.image = prefix2image[$scope.result.team];
    }
  };

  directive.scope = {
    result: '='
  };
  directive.controller = ['$scope', SmallCardDirectiveController];
  return directive;
};

let smallCardDirectiveName = 'smallCard';
let smallCardDirectiveDeclaration = [
  SmallCardDirective
];

export {smallCardDirectiveName, smallCardDirectiveDeclaration};

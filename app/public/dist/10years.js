(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _componentsCommonConfiguration = require('./components/common/configuration');

var _componentsCommonHttpInterceptorService = require('./components/common/http-interceptor-service');

var _componentsCommonSmallCardDirective = require('./components/common/small-card-directive');

var _componentsCommonLargeCardDirective = require('./components/common/large-card-directive');

var _sectionsDashboardDashboardModule = require('./sections/dashboard/dashboard-module');

var _sectionsLeaderboardLeaderboardModule = require('./sections/leaderboard/leaderboard-module');

var _sectionsActivityActivityModule = require('./sections/activity/activity-module');

var _sectionsKeyKeyModule = require('./sections/key/key-module');

'use strict';

var moduleName = '10years';

/**
 * Creates the main Angular module using the child modules imported.
 */
angular.module(moduleName, ['ui.router', 'ngMaterial', 'ngMessages', 'ngCookies', _sectionsDashboardDashboardModule.dashboardModuleName, _sectionsLeaderboardLeaderboardModule.leaderboardModuleName, _sectionsActivityActivityModule.activityModuleName, _sectionsKeyKeyModule.keyModuleName]);

// Import the configuration and prepare the module.
angular.module(moduleName).config(_componentsCommonConfiguration.moduleConfiguration);

// Import the card directives
angular.module(moduleName).service(_componentsCommonHttpInterceptorService.httpInterceptorServiceName, _componentsCommonHttpInterceptorService.httpInterceptorServiceDeclaration);
angular.module(moduleName).directive(_componentsCommonSmallCardDirective.smallCardDirectiveName, _componentsCommonSmallCardDirective.smallCardDirectiveDeclaration);
angular.module(moduleName).directive(_componentsCommonLargeCardDirective.largeCardDirectiveName, _componentsCommonLargeCardDirective.largeCardDirectiveDeclaration);

},{"./components/common/configuration":2,"./components/common/http-interceptor-service":3,"./components/common/large-card-directive":4,"./components/common/small-card-directive":5,"./sections/activity/activity-module":6,"./sections/dashboard/dashboard-module":11,"./sections/key/key-module":13,"./sections/leaderboard/leaderboard-module":15}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var moduleConfiguration = function moduleConfiguration($httpProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider) {
  $httpProvider.interceptors.push('HTTPInterceptor');

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('dashboard', {
    url: '/',
    templateUrl: 'src/sections/dashboard/dashboard.html',
    controller: 'DashboardController'
  }).state('leaderboard', {
    url: '/leaderboard?rotation',
    templateUrl: 'src/sections/leaderboard/leaderboard.html',
    controller: 'LeaderboardController'
  }).state('activityViewAllResults', {
    url: '/activities/:activity?rotation',
    templateUrl: 'src/sections/activity/view-all-results/view-all-results.html',
    controller: 'ActivityViewAllResultsController'
  }).state('activityNewResult', {
    url: '/activities/:activity/newresult?name',
    templateUrl: 'src/sections/activity/new-result/new-result.html',
    controller: 'ActivityNewResultController'
  }).state('activityListResults', {
    url: '/activities/:activity/listresults',
    templateUrl: 'src/sections/activity/list-results/list-results.html',
    controller: 'ActivityListResultsController'
  }).state('key', {
    url: '/apikey',
    templateUrl: 'src/sections/key/key.html',
    controller: 'KeyController'
  });

  $mdThemingProvider.theme('default').primaryPalette('teal').accentPalette('red');

  $mdThemingProvider.theme('mario').primaryPalette('orange', { 'default': '800' }).accentPalette('red');
  $mdThemingProvider.theme('cocktail').primaryPalette('deep-purple', { 'default': '700' }).accentPalette('red');
  $mdThemingProvider.theme('babyfoot').primaryPalette('green', { 'default': '800' }).accentPalette('red');
  $mdThemingProvider.theme('lego').primaryPalette('cyan', { 'default': '700' }).accentPalette('red');
  $mdThemingProvider.theme('robots').primaryPalette('blue-grey', { 'default': '600' }).accentPalette('red');
  $mdThemingProvider.theme('quizz').primaryPalette('blue', { 'default': '800' }).accentPalette('red');
};

exports.moduleConfiguration = moduleConfiguration;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var httpInterceptor = function httpInterceptor($cookies) {
  var service = {};

  service.request = function (config) {
    var key = $cookies.get('OBEO_10YEARS_API_KEY');
    if (key !== undefined) {
      config.headers.X_OBEO_10YEARS_API_KEY = key;
    }
    return config;
  };

  return service;
};

var httpInterceptorServiceName = 'HTTPInterceptor';
var httpInterceptorServiceDeclaration = ['$cookies', httpInterceptor];

exports.httpInterceptorServiceName = httpInterceptorServiceName;
exports.httpInterceptorServiceDeclaration = httpInterceptorServiceDeclaration;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var LargeCardDirective = function LargeCardDirective() {
  var directive = {};
  directive.template = '<md-card>' + '  <a ui-sref="leaderboard"><img ng-src="{{image}}" class="md-card-image" alt="{{name}}"></a>' + '  <md-card-title>' + '    <md-card-title-text>' + '      <span class="md-headline">{{name}}</span> {{score}}' + '    </md-card-title-text>' + '  </md-card-title>' + '  <md-card-content>' + '  </md-card-content>' + '</md-card>';

  var LargeCardDirectiveController = function LargeCardDirectiveController($scope) {
    _classCallCheck(this, LargeCardDirectiveController);

    var prefix2name = {
      'starwars': 'Star Wars',
      'got': 'Game of Thrones',
      'matrix': 'Matrix',
      'himym': 'How I met your mother',
      'bttf': 'Back to the future'
    };

    var prefix2image = {
      'starwars': 'assets/darth-vader_lg.jpg',
      'got': 'assets/daenerys-targaryen_lg.jpg',
      'matrix': 'assets/neo_lg.jpg',
      'himym': 'assets/barney-stinson_lg.jpg',
      'bttf': 'assets/marty-mcfly_lg.jpg'
    };

    $scope.$watch('result', function (newValue) {
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
  };

  ;

  directive.scope = {
    result: '='
  };
  directive.controller = ['$scope', LargeCardDirectiveController];
  return directive;
};

var largeCardDirectiveName = 'largeCard';
var largeCardDirectiveDeclaration = [LargeCardDirective];

exports.largeCardDirectiveName = largeCardDirectiveName;
exports.largeCardDirectiveDeclaration = largeCardDirectiveDeclaration;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SmallCardDirective = function SmallCardDirective() {
  var directive = {};
  directive.template = '<md-card>' + '  <md-card-title>' + '    <md-card-title-text>' + '      <span class="md-headline">{{name}}</span> {{score}}' + '    </md-card-title-text>' + '    <md-card-title-media>' + '      <div class="md-media-sm card-media">' + '        <img ng-src="{{image}}">' + '      </div>' + '    </md-card-title-media>' + '  </md-card-title>' + '</md-card>';

  var SmallCardDirectiveController = function SmallCardDirectiveController($scope) {
    _classCallCheck(this, SmallCardDirectiveController);

    var prefix2name = {
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

    var prefix2image = {
      'starwars': 'assets/darth-vader_sm.jpg',
      'got': 'assets/daenerys-targaryen_sm.jpg',
      'matrix': 'assets/neo_sm.jpg',
      'himym': 'assets/barney-stinson_sm.jpg',
      'bttf': 'assets/marty-mcfly_sm.jpg'
    };

    $scope.image = prefix2image[$scope.result.team];
  };

  ;

  directive.scope = {
    result: '='
  };
  directive.controller = ['$scope', SmallCardDirectiveController];
  return directive;
};

var smallCardDirectiveName = 'smallCard';
var smallCardDirectiveDeclaration = [SmallCardDirective];

exports.smallCardDirectiveName = smallCardDirectiveName;
exports.smallCardDirectiveDeclaration = smallCardDirectiveDeclaration;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _listResultsListResultsController = require('./list-results/list-results-controller');

var _newResultNewResultController = require('./new-result/new-result-controller');

var _viewAllResultsViewAllResultsController = require('./view-all-results/view-all-results-controller');

var activityModuleName = 'activity';

angular.module(activityModuleName, []);
angular.module(activityModuleName).controller(_listResultsListResultsController.activityListResultsControllerName, _listResultsListResultsController.activityListResultsControllerDeclaration);
angular.module(activityModuleName).controller(_newResultNewResultController.activityNewResultControllerName, _newResultNewResultController.activityNewResultControllerDeclaration);
angular.module(activityModuleName).controller(_viewAllResultsViewAllResultsController.activityViewAllResultsControllerName, _viewAllResultsViewAllResultsController.activityViewAllResultsControllerDeclaration);

exports.activityModuleName = activityModuleName;

},{"./list-results/list-results-controller":7,"./new-result/new-result-controller":8,"./view-all-results/view-all-results-controller":9}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ActivityListResultsController = function ActivityListResultsController($scope, $state, $stateParams, $http, $mdToast) {
  _classCallCheck(this, ActivityListResultsController);

  $scope.activity = $stateParams.activity;

  $scope.goTo = function (stateName) {
    $state.go(stateName, { activity: $stateParams.activity });
  };

  $scope.getSmallResultImage = function (result) {
    var prefix2image = {
      'starwars': 'assets/darth-vader_sm.jpg',
      'got': 'assets/daenerys-targaryen_sm.jpg',
      'matrix': 'assets/neo_sm.jpg',
      'himym': 'assets/barney-stinson_sm.jpg',
      'bttf': 'assets/marty-mcfly_sm.jpg'
    };
    return prefix2image[result.team];
  };

  $scope.getResultScore = function (result) {
    var score = result.score;

    var date = new Date(result.createdAt);
    date = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    return score + ' (' + date + ')';
  };

  $scope['delete'] = function (result) {
    $http['delete']('/api/v1.0/activities/' + $stateParams.activity + '/results/' + result._id).then(function (response) {
      $scope.errorMessage = undefined;
      $http.get('/api/v1.0/activities/' + $stateParams.activity + '/results?all=true').then(function (response) {
        $scope.results = response.data;
      });
    }, function (response) {
      var message = 'Vous n\'avez pas l\'authorisation nécessaire';
      if (response.status === 400) {
        message = 'Oops il y a eu un soucis avec le serveur';
      }
      $mdToast.show($mdToast.simple().textContent(message).position('bottom right').hideDelay(3000));
    });
  };

  $http.get('/api/v1.0/activities/' + $stateParams.activity + '/results?all=true').then(function (response) {
    $scope.results = response.data;
  });
};

var activityListResultsControllerName = 'ActivityListResultsController';
var activityListResultsControllerDeclaration = ['$scope', '$state', '$stateParams', '$http', '$mdToast', ActivityListResultsController];

exports.activityListResultsControllerName = activityListResultsControllerName;
exports.activityListResultsControllerDeclaration = activityListResultsControllerDeclaration;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ActivityNewResultController = function ActivityNewResultController($scope, $state, $stateParams, $http, $mdToast) {
  _classCallCheck(this, ActivityNewResultController);

  $scope.activity = $stateParams.activity;

  $scope.goTo = function (stateName) {
    $state.go(stateName, { activity: $stateParams.activity });
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

  $scope.submitResult = function () {
    var result = {
      team: $scope.user.team,
      score: $scope.user.result
    };
    $http.post('/api/v1.0/activities/' + $stateParams.activity + '/results', result).then(function (response) {
      $state.go('activityViewAllResults', { activity: $stateParams.activity });
    }, function (response) {
      var message = 'Vous n\'avez pas l\'authorisation nécessaire';
      if (response.status === 400) {
        message = 'Oops il y a eu un soucis avec le serveur';
      }
      $mdToast.show($mdToast.simple().textContent(message).position('bottom right').hideDelay(3000));
    });
  };
};

var activityNewResultControllerName = 'ActivityNewResultController';
var activityNewResultControllerDeclaration = ['$scope', '$state', '$stateParams', '$http', '$mdToast', ActivityNewResultController];

exports.activityNewResultControllerName = activityNewResultControllerName;
exports.activityNewResultControllerDeclaration = activityNewResultControllerDeclaration;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ActivityViewAllResultsController = function ActivityViewAllResultsController($scope, $state, $stateParams, $http, $cookies, $timeout) {
  _classCallCheck(this, ActivityViewAllResultsController);

  $scope.activity = $stateParams.activity;

  $scope.goTo = function (stateName) {
    $state.go(stateName, { activity: $stateParams.activity });
  };

  $scope.hasAPIKey = function () {
    return $cookies.get('OBEO_10YEARS_API_KEY') !== undefined;
  };

  var update = function update() {
    $http.get('/api/v1.0/activities/' + $stateParams.activity + '/results').then(function (response) {
      var data = response.data;
      if (response.status === 200 && data.length > 1) {
        var first = data[0];
        var others = [];

        for (var i = 1; i < data.length; i = i + 1) {
          others.push(data[i]);
        }

        $scope.first = first;
        $scope.others = others;
      }
    });
  };

  update();

  if ($stateParams.rotation) {
    (function () {
      var activity = $stateParams.activity;

      var newActivity = undefined;
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
        (function () {
          var timer = $timeout(function () {
            $state.go('activityViewAllResults', { activity: newActivity, rotation: 'true' });
          }, 10000);
          $scope.$on('$destroy', function (event) {
            $timeout.cancel(timer);
          });
        })();
      } else {
        (function () {
          var timer = $timeout(function () {
            $state.go('leaderboard', { rotation: 'true' });
          }, 10000);
          $scope.$on('$destroy', function (event) {
            $timeout.cancel(timer);
          });
        })();
      }
    })();
  }
};

var activityViewAllResultsControllerName = 'ActivityViewAllResultsController';
var activityViewAllResultsControllerDeclaration = ['$scope', '$state', '$stateParams', '$http', '$cookies', '$timeout', ActivityViewAllResultsController];

exports.activityViewAllResultsControllerName = activityViewAllResultsControllerName;
exports.activityViewAllResultsControllerDeclaration = activityViewAllResultsControllerDeclaration;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DashboardController = function DashboardController($scope, $state) {
  _classCallCheck(this, DashboardController);

  $scope.goTo = function (stateName, activityName) {
    if (activityName === undefined) {
      $state.go(stateName);
    } else {
      $state.go(stateName, { activity: activityName });
    }
  };
};

var dashboardControllerName = 'DashboardController';
var dashboardControllerDeclaration = ['$scope', '$state', DashboardController];

exports.dashboardControllerName = dashboardControllerName;
exports.dashboardControllerDeclaration = dashboardControllerDeclaration;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _dashboardController = require('./dashboard-controller');

var dashboardModuleName = 'dashboard';

angular.module(dashboardModuleName, []);
angular.module(dashboardModuleName).controller(_dashboardController.dashboardControllerName, _dashboardController.dashboardControllerDeclaration);

exports.dashboardModuleName = dashboardModuleName;

},{"./dashboard-controller":10}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var KeyController = function KeyController($scope, $state, $cookies) {
  _classCallCheck(this, KeyController);

  $scope.goTo = function (stateName) {
    $state.go(stateName);
  };

  var currentKey = $cookies.get('OBEO_10YEARS_API_KEY');
  if (currentKey !== undefined && currentKey.length > 0) {
    $scope.key = currentKey;
  }

  $scope.save = function (key) {
    $cookies.put('OBEO_10YEARS_API_KEY', key);
    $state.go('dashboard');
  };
};

var keyControllerName = 'KeyController';
var keyControllerDeclaration = ['$scope', '$state', '$cookies', KeyController];

exports.keyControllerName = keyControllerName;
exports.keyControllerDeclaration = keyControllerDeclaration;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _keyController = require('./key-controller');

var keyModuleName = 'key';

angular.module(keyModuleName, []);
angular.module(keyModuleName).controller(_keyController.keyControllerName, _keyController.keyControllerDeclaration);

exports.keyModuleName = keyModuleName;

},{"./key-controller":12}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var LeaderboardController = function LeaderboardController($scope, $state, $http, $timeout, $stateParams) {
  _classCallCheck(this, LeaderboardController);

  $scope.goTo = function (stateName) {
    $state.go(stateName);
  };

  var update = function update() {
    $http.get('/api/v1.0/results').then(function (response) {
      var data = response.data;
      if (response.status === 200 && data.length > 1) {
        var first = data[0];
        var others = [];

        for (var i = 1; i < data.length; i = i + 1) {
          others.push(data[i]);
        }

        $scope.first = first;
        $scope.others = others;
      }
    });
  };

  update();

  if ($stateParams.rotation) {
    (function () {
      var timer = $timeout(function () {
        $state.go('activityViewAllResults', { activity: 'mario', rotation: 'true' });
      }, 10000);

      $scope.$on('$destroy', function (event) {
        $timeout.cancel(timer);
      });
    })();
  }
};

var leaderboardControllerName = 'LeaderboardController';
var leaderboardControllerDeclaration = ['$scope', '$state', '$http', '$timeout', '$stateParams', LeaderboardController];

exports.leaderboardControllerName = leaderboardControllerName;
exports.leaderboardControllerDeclaration = leaderboardControllerDeclaration;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _leaderboardController = require('./leaderboard-controller');

var leaderboardModuleName = 'leaderboard';

angular.module(leaderboardModuleName, []);
angular.module(leaderboardModuleName).controller(_leaderboardController.leaderboardControllerName, _leaderboardController.leaderboardControllerDeclaration);

exports.leaderboardModuleName = leaderboardModuleName;

},{"./leaderboard-controller":14}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjLzEweWVhcnMuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL2NvbXBvbmVudHMvY29tbW9uL2NvbmZpZ3VyYXRpb24uanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL2NvbXBvbmVudHMvY29tbW9uL2h0dHAtaW50ZXJjZXB0b3Itc2VydmljZS5qcyIsIi9Vc2Vycy9zYmVnYXVkZWF1L0RvY3VtZW50cy9Qcm9qZWN0cy8xMCBZZWFycy9Db2RlL05vZGVTZXJ2ZXIvYXBwL3B1YmxpYy9zcmMvY29tcG9uZW50cy9jb21tb24vbGFyZ2UtY2FyZC1kaXJlY3RpdmUuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL2NvbXBvbmVudHMvY29tbW9uL3NtYWxsLWNhcmQtZGlyZWN0aXZlLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9hY3Rpdml0eS9hY3Rpdml0eS1tb2R1bGUuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL3NlY3Rpb25zL2FjdGl2aXR5L2xpc3QtcmVzdWx0cy9saXN0LXJlc3VsdHMtY29udHJvbGxlci5qcyIsIi9Vc2Vycy9zYmVnYXVkZWF1L0RvY3VtZW50cy9Qcm9qZWN0cy8xMCBZZWFycy9Db2RlL05vZGVTZXJ2ZXIvYXBwL3B1YmxpYy9zcmMvc2VjdGlvbnMvYWN0aXZpdHkvbmV3LXJlc3VsdC9uZXctcmVzdWx0LWNvbnRyb2xsZXIuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL3NlY3Rpb25zL2FjdGl2aXR5L3ZpZXctYWxsLXJlc3VsdHMvdmlldy1hbGwtcmVzdWx0cy1jb250cm9sbGVyLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9kYXNoYm9hcmQvZGFzaGJvYXJkLWNvbnRyb2xsZXIuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL3NlY3Rpb25zL2Rhc2hib2FyZC9kYXNoYm9hcmQtbW9kdWxlLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9rZXkva2V5LWNvbnRyb2xsZXIuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL3NlY3Rpb25zL2tleS9rZXktbW9kdWxlLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9sZWFkZXJib2FyZC9sZWFkZXJib2FyZC1jb250cm9sbGVyLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9sZWFkZXJib2FyZC9sZWFkZXJib2FyZC1tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs2Q0NBa0MsbUNBQW1DOztzREFFTyw4Q0FBOEM7O2tEQUN0RCwwQ0FBMEM7O2tEQUMxQywwQ0FBMEM7O2dEQUU1RSx1Q0FBdUM7O29EQUNyQywyQ0FBMkM7OzhDQUM5QyxxQ0FBcUM7O29DQUMxQywyQkFBMkI7O0FBR3ZELFlBQVksQ0FBQzs7QUFFYixJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUM7Ozs7O0FBSzNCLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQ3pCLFdBQVcsRUFDWCxZQUFZLEVBQ1osWUFBWSxFQUNaLFdBQVcsOE1BS1osQ0FBQyxDQUFDOzs7QUFHSCxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sb0RBQXFCLENBQUM7OztBQUd2RCxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sK0lBQStELENBQUM7QUFDbEcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLCtIQUF1RCxDQUFDO0FBQzVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUywrSEFBdUQsQ0FBQzs7O0FDcEM1RixZQUFZLENBQUM7Ozs7O0FBRWIsSUFBSSxtQkFBbUIsR0FBRyxTQUF0QixtQkFBbUIsQ0FBSSxhQUFhLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFLO0FBQ25HLGVBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7O0FBRW5ELG9CQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFbEMsZ0JBQWMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFHO0FBQ2pDLE9BQUcsRUFBRSxHQUFHO0FBQ1IsZUFBVyxFQUFF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Ozs7QUNqRG5FLFlBQVksQ0FBQzs7Ozs7O3FDQUU2RCwwQkFBMEI7O0FBRXBHLElBQUkscUJBQXFCLEdBQUcsYUFBYSxDQUFDOztBQUUxQyxPQUFPLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzFDLE9BQU8sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxVQUFVLDJHQUE2RCxDQUFDOztRQUV0RyxxQkFBcUIsR0FBckIscUJBQXFCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7bW9kdWxlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi9jb21wb25lbnRzL2NvbW1vbi9jb25maWd1cmF0aW9uJztcblxuaW1wb3J0IHtodHRwSW50ZXJjZXB0b3JTZXJ2aWNlTmFtZSwgaHR0cEludGVyY2VwdG9yU2VydmljZURlY2xhcmF0aW9ufSBmcm9tICcuL2NvbXBvbmVudHMvY29tbW9uL2h0dHAtaW50ZXJjZXB0b3Itc2VydmljZSc7XG5pbXBvcnQge3NtYWxsQ2FyZERpcmVjdGl2ZU5hbWUsIHNtYWxsQ2FyZERpcmVjdGl2ZURlY2xhcmF0aW9ufSBmcm9tICcuL2NvbXBvbmVudHMvY29tbW9uL3NtYWxsLWNhcmQtZGlyZWN0aXZlJztcbmltcG9ydCB7bGFyZ2VDYXJkRGlyZWN0aXZlTmFtZSwgbGFyZ2VDYXJkRGlyZWN0aXZlRGVjbGFyYXRpb259IGZyb20gJy4vY29tcG9uZW50cy9jb21tb24vbGFyZ2UtY2FyZC1kaXJlY3RpdmUnO1xuXG5pbXBvcnQge2Rhc2hib2FyZE1vZHVsZU5hbWV9IGZyb20gJy4vc2VjdGlvbnMvZGFzaGJvYXJkL2Rhc2hib2FyZC1tb2R1bGUnO1xuaW1wb3J0IHtsZWFkZXJib2FyZE1vZHVsZU5hbWV9IGZyb20gJy4vc2VjdGlvbnMvbGVhZGVyYm9hcmQvbGVhZGVyYm9hcmQtbW9kdWxlJztcbmltcG9ydCB7YWN0aXZpdHlNb2R1bGVOYW1lfSBmcm9tICcuL3NlY3Rpb25zL2FjdGl2aXR5L2FjdGl2aXR5LW1vZHVsZSc7XG5pbXBvcnQge2tleU1vZHVsZU5hbWV9IGZyb20gJy4vc2VjdGlvbnMva2V5L2tleS1tb2R1bGUnO1xuXG5cbid1c2Ugc3RyaWN0JztcblxubGV0IG1vZHVsZU5hbWUgPSAnMTB5ZWFycyc7XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgbWFpbiBBbmd1bGFyIG1vZHVsZSB1c2luZyB0aGUgY2hpbGQgbW9kdWxlcyBpbXBvcnRlZC5cbiAqL1xuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xuICAndWkucm91dGVyJyxcbiAgJ25nTWF0ZXJpYWwnLFxuICAnbmdNZXNzYWdlcycsXG4gICduZ0Nvb2tpZXMnLFxuICBkYXNoYm9hcmRNb2R1bGVOYW1lLFxuICBsZWFkZXJib2FyZE1vZHVsZU5hbWUsXG4gIGFjdGl2aXR5TW9kdWxlTmFtZSxcbiAga2V5TW9kdWxlTmFtZVxuXSk7XG5cbi8vIEltcG9ydCB0aGUgY29uZmlndXJhdGlvbiBhbmQgcHJlcGFyZSB0aGUgbW9kdWxlLlxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSkuY29uZmlnKG1vZHVsZUNvbmZpZ3VyYXRpb24pO1xuXG4vLyBJbXBvcnQgdGhlIGNhcmQgZGlyZWN0aXZlc1xuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSkuc2VydmljZShodHRwSW50ZXJjZXB0b3JTZXJ2aWNlTmFtZSwgaHR0cEludGVyY2VwdG9yU2VydmljZURlY2xhcmF0aW9uKTtcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUpLmRpcmVjdGl2ZShzbWFsbENhcmREaXJlY3RpdmVOYW1lLCBzbWFsbENhcmREaXJlY3RpdmVEZWNsYXJhdGlvbik7XG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lKS5kaXJlY3RpdmUobGFyZ2VDYXJkRGlyZWN0aXZlTmFtZSwgbGFyZ2VDYXJkRGlyZWN0aXZlRGVjbGFyYXRpb24pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgbW9kdWxlQ29uZmlndXJhdGlvbiA9ICgkaHR0cFByb3ZpZGVyLCAkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbWRUaGVtaW5nUHJvdmlkZXIpID0+IHtcbiAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnSFRUUEludGVyY2VwdG9yJyk7XG5cbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdkYXNoYm9hcmQnLCAge1xuICAgIHVybDogJy8nLFxuICAgIHRlbXBsYXRlVXJsOiAnc3JjL3NlY3Rpb25zL2Rhc2hib2FyZC9kYXNoYm9hcmQuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ0Rhc2hib2FyZENvbnRyb2xsZXInXG4gIH0pLnN0YXRlKCdsZWFkZXJib2FyZCcsICB7XG4gICAgdXJsOiAnL2xlYWRlcmJvYXJkP3JvdGF0aW9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NyYy9zZWN0aW9ucy9sZWFkZXJib2FyZC9sZWFkZXJib2FyZC5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnTGVhZGVyYm9hcmRDb250cm9sbGVyJ1xuICB9KS5zdGF0ZSgnYWN0aXZpdHlWaWV3QWxsUmVzdWx0cycsICB7XG4gICAgdXJsOiAnL2FjdGl2aXRpZXMvOmFjdGl2aXR5P3JvdGF0aW9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NyYy9zZWN0aW9ucy9hY3Rpdml0eS92aWV3LWFsbC1yZXN1bHRzL3ZpZXctYWxsLXJlc3VsdHMuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ0FjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyJ1xuICB9KS5zdGF0ZSgnYWN0aXZpdHlOZXdSZXN1bHQnLCAge1xuICAgIHVybDogJy9hY3Rpdml0aWVzLzphY3Rpdml0eS9uZXdyZXN1bHQ/bmFtZScsXG4gICAgdGVtcGxhdGVVcmw6ICdzcmMvc2VjdGlvbnMvYWN0aXZpdHkvbmV3LXJlc3VsdC9uZXctcmVzdWx0Lmh0bWwnLFxuICAgIGNvbnRyb2xsZXI6ICdBY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXInXG4gIH0pLnN0YXRlKCdhY3Rpdml0eUxpc3RSZXN1bHRzJywgIHtcbiAgICB1cmw6ICcvYWN0aXZpdGllcy86YWN0aXZpdHkvbGlzdHJlc3VsdHMnLFxuICAgIHRlbXBsYXRlVXJsOiAnc3JjL3NlY3Rpb25zL2FjdGl2aXR5L2xpc3QtcmVzdWx0cy9saXN0LXJlc3VsdHMuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ0FjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyJ1xuICB9KS5zdGF0ZSgna2V5JywgIHtcbiAgICB1cmw6ICcvYXBpa2V5JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NyYy9zZWN0aW9ucy9rZXkva2V5Lmh0bWwnLFxuICAgIGNvbnRyb2xsZXI6ICdLZXlDb250cm9sbGVyJ1xuICB9KTtcblxuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKS5wcmltYXJ5UGFsZXR0ZSgndGVhbCcpLmFjY2VudFBhbGV0dGUoJ3JlZCcpO1xuXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnbWFyaW8nKS5wcmltYXJ5UGFsZXR0ZSgnb3JhbmdlJywge2RlZmF1bHQ6ICc4MDAnfSkuYWNjZW50UGFsZXR0ZSgncmVkJyk7XG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnY29ja3RhaWwnKS5wcmltYXJ5UGFsZXR0ZSgnZGVlcC1wdXJwbGUnLCB7ZGVmYXVsdDogJzcwMCd9KS5hY2NlbnRQYWxldHRlKCdyZWQnKTtcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdiYWJ5Zm9vdCcpLnByaW1hcnlQYWxldHRlKCdncmVlbicsIHtkZWZhdWx0OiAnODAwJ30pLmFjY2VudFBhbGV0dGUoJ3JlZCcpO1xuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2xlZ28nKS5wcmltYXJ5UGFsZXR0ZSgnY3lhbicsIHtkZWZhdWx0OiAnNzAwJ30pLmFjY2VudFBhbGV0dGUoJ3JlZCcpO1xuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ3JvYm90cycpLnByaW1hcnlQYWxldHRlKCdibHVlLWdyZXknLCB7ZGVmYXVsdDogJzYwMCd9KS5hY2NlbnRQYWxldHRlKCdyZWQnKTtcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdxdWl6eicpLnByaW1hcnlQYWxldHRlKCdibHVlJywge2RlZmF1bHQ6ICc4MDAnfSkuYWNjZW50UGFsZXR0ZSgncmVkJyk7XG59O1xuXG5leHBvcnQge21vZHVsZUNvbmZpZ3VyYXRpb259O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgaHR0cEludGVyY2VwdG9yID0gKCRjb29raWVzKSA9PiB7XG4gIGxldCBzZXJ2aWNlID0ge307XG5cbiAgc2VydmljZS5yZXF1ZXN0ID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgICBsZXQga2V5ID0gJGNvb2tpZXMuZ2V0KCdPQkVPXzEwWUVBUlNfQVBJX0tFWScpO1xuICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uZmlnLmhlYWRlcnMuWF9PQkVPXzEwWUVBUlNfQVBJX0tFWSA9IGtleTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb25maWc7XG4gIH07XG5cbiAgcmV0dXJuIHNlcnZpY2U7XG59O1xuXG5sZXQgaHR0cEludGVyY2VwdG9yU2VydmljZU5hbWUgPSAnSFRUUEludGVyY2VwdG9yJztcbmxldCBodHRwSW50ZXJjZXB0b3JTZXJ2aWNlRGVjbGFyYXRpb24gPSBbXG4gICckY29va2llcycsXG4gIGh0dHBJbnRlcmNlcHRvclxuXTtcblxuZXhwb3J0IHtodHRwSW50ZXJjZXB0b3JTZXJ2aWNlTmFtZSwgaHR0cEludGVyY2VwdG9yU2VydmljZURlY2xhcmF0aW9ufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubGV0IExhcmdlQ2FyZERpcmVjdGl2ZSA9ICgpID0+IHtcbiAgbGV0IGRpcmVjdGl2ZSA9IHt9O1xuICBkaXJlY3RpdmUudGVtcGxhdGUgPSAnPG1kLWNhcmQ+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgIDxhIHVpLXNyZWY9XCJsZWFkZXJib2FyZFwiPjxpbWcgbmctc3JjPVwie3tpbWFnZX19XCIgY2xhc3M9XCJtZC1jYXJkLWltYWdlXCIgYWx0PVwie3tuYW1lfX1cIj48L2E+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgIDxtZC1jYXJkLXRpdGxlPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICAgIDxtZC1jYXJkLXRpdGxlLXRleHQ+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgICAgICA8c3BhbiBjbGFzcz1cIm1kLWhlYWRsaW5lXCI+e3tuYW1lfX08L3NwYW4+IHt7c2NvcmV9fScgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICAgIDwvbWQtY2FyZC10aXRsZS10ZXh0PicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICA8L21kLWNhcmQtdGl0bGU+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgIDxtZC1jYXJkLWNvbnRlbnQ+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgIDwvbWQtY2FyZC1jb250ZW50PicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnPC9tZC1jYXJkPic7XG5cbiAgY2xhc3MgTGFyZ2VDYXJkRGlyZWN0aXZlQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IgKCRzY29wZSkge1xuICAgICAgbGV0IHByZWZpeDJuYW1lID0ge1xuICAgICAgICAnc3RhcndhcnMnOiAnU3RhciBXYXJzJyxcbiAgICAgICAgJ2dvdCc6ICdHYW1lIG9mIFRocm9uZXMnLFxuICAgICAgICAnbWF0cml4JzogJ01hdHJpeCcsXG4gICAgICAgICdoaW15bSc6ICdIb3cgSSBtZXQgeW91ciBtb3RoZXInLFxuICAgICAgICAnYnR0Zic6ICdCYWNrIHRvIHRoZSBmdXR1cmUnXG4gICAgICB9O1xuXG4gICAgICBsZXQgcHJlZml4MmltYWdlID0ge1xuICAgICAgICAnc3RhcndhcnMnOiAnYXNzZXRzL2RhcnRoLXZhZGVyX2xnLmpwZycsXG4gICAgICAgICdnb3QnOiAnYXNzZXRzL2RhZW5lcnlzLXRhcmdhcnllbl9sZy5qcGcnLFxuICAgICAgICAnbWF0cml4JzogJ2Fzc2V0cy9uZW9fbGcuanBnJyxcbiAgICAgICAgJ2hpbXltJzogJ2Fzc2V0cy9iYXJuZXktc3RpbnNvbl9sZy5qcGcnLFxuICAgICAgICAnYnR0Zic6ICdhc3NldHMvbWFydHktbWNmbHlfbGcuanBnJ1xuICAgICAgfTtcblxuICAgICAgJHNjb3BlLiR3YXRjaCgncmVzdWx0JywgKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgJHNjb3BlLm5hbWUgPSBwcmVmaXgybmFtZVskc2NvcGUucmVzdWx0LnRlYW1dO1xuXG4gICAgICAgICAgaWYgKCRzY29wZS5yZXN1bHQuc2NvcmUgPT09IDApIHtcbiAgICAgICAgICAgICRzY29wZS5zY29yZSA9ICcwIHBvaW50JztcbiAgICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS5yZXN1bHQuc2NvcmUgPT09IDEpIHtcbiAgICAgICAgICAgICRzY29wZS5zY29yZSA9ICcxIHBvaW50JztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHNjb3BlLnNjb3JlID0gJHNjb3BlLnJlc3VsdC5zY29yZSArICcgcG9pbnRzJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkc2NvcGUuaW1hZ2UgPSBwcmVmaXgyaW1hZ2VbJHNjb3BlLnJlc3VsdC50ZWFtXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGRpcmVjdGl2ZS5zY29wZSA9IHtcbiAgICByZXN1bHQ6ICc9J1xuICB9O1xuICBkaXJlY3RpdmUuY29udHJvbGxlciA9IFsnJHNjb3BlJywgTGFyZ2VDYXJkRGlyZWN0aXZlQ29udHJvbGxlcl07XG4gIHJldHVybiBkaXJlY3RpdmU7XG59O1xuXG5sZXQgbGFyZ2VDYXJkRGlyZWN0aXZlTmFtZSA9ICdsYXJnZUNhcmQnO1xubGV0IGxhcmdlQ2FyZERpcmVjdGl2ZURlY2xhcmF0aW9uID0gW1xuICBMYXJnZUNhcmREaXJlY3RpdmVcbl07XG5cbmV4cG9ydCB7bGFyZ2VDYXJkRGlyZWN0aXZlTmFtZSwgbGFyZ2VDYXJkRGlyZWN0aXZlRGVjbGFyYXRpb259O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgU21hbGxDYXJkRGlyZWN0aXZlID0gKCkgPT4ge1xuICBsZXQgZGlyZWN0aXZlID0ge307XG4gIGRpcmVjdGl2ZS50ZW1wbGF0ZSA9ICc8bWQtY2FyZD4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgPG1kLWNhcmQtdGl0bGU+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgICAgPG1kLWNhcmQtdGl0bGUtdGV4dD4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICAgIDxzcGFuIGNsYXNzPVwibWQtaGVhZGxpbmVcIj57e25hbWV9fTwvc3Bhbj4ge3tzY29yZX19JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgICAgPC9tZC1jYXJkLXRpdGxlLXRleHQ+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgICAgPG1kLWNhcmQtdGl0bGUtbWVkaWE+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgICAgICA8ZGl2IGNsYXNzPVwibWQtbWVkaWEtc20gY2FyZC1tZWRpYVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICAgICAgICA8aW1nIG5nLXNyYz1cInt7aW1hZ2V9fVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICAgICAgPC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgICAgPC9tZC1jYXJkLXRpdGxlLW1lZGlhPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICA8L21kLWNhcmQtdGl0bGU+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICc8L21kLWNhcmQ+JztcblxuICBjbGFzcyBTbWFsbENhcmREaXJlY3RpdmVDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvciAoJHNjb3BlKSB7XG4gICAgICBsZXQgcHJlZml4Mm5hbWUgPSB7XG4gICAgICAgICdzdGFyd2Fycyc6ICdTdGFyIFdhcnMnLFxuICAgICAgICAnZ290JzogJ0dhbWUgb2YgVGhyb25lcycsXG4gICAgICAgICdtYXRyaXgnOiAnTWF0cml4JyxcbiAgICAgICAgJ2hpbXltJzogJ0hvdyBJIG1ldCB5b3VyIG1vdGhlcicsXG4gICAgICAgICdidHRmJzogJ0JhY2sgdG8gdGhlIGZ1dHVyZSdcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5uYW1lID0gcHJlZml4Mm5hbWVbJHNjb3BlLnJlc3VsdC50ZWFtXTtcblxuICAgICAgaWYgKCRzY29wZS5yZXN1bHQuc2NvcmUgPT09IDApIHtcbiAgICAgICAgJHNjb3BlLnNjb3JlID0gJzAgcG9pbnQnO1xuICAgICAgfSBlbHNlIGlmICgkc2NvcGUucmVzdWx0LnNjb3JlID09PSAxKSB7XG4gICAgICAgICRzY29wZS5zY29yZSA9ICcxIHBvaW50JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRzY29wZS5zY29yZSA9ICRzY29wZS5yZXN1bHQuc2NvcmUgKyAnIHBvaW50cyc7XG4gICAgICB9XG5cbiAgICAgIGxldCBwcmVmaXgyaW1hZ2UgPSB7XG4gICAgICAgICdzdGFyd2Fycyc6ICdhc3NldHMvZGFydGgtdmFkZXJfc20uanBnJyxcbiAgICAgICAgJ2dvdCc6ICdhc3NldHMvZGFlbmVyeXMtdGFyZ2FyeWVuX3NtLmpwZycsXG4gICAgICAgICdtYXRyaXgnOiAnYXNzZXRzL25lb19zbS5qcGcnLFxuICAgICAgICAnaGlteW0nOiAnYXNzZXRzL2Jhcm5leS1zdGluc29uX3NtLmpwZycsXG4gICAgICAgICdidHRmJzogJ2Fzc2V0cy9tYXJ0eS1tY2ZseV9zbS5qcGcnXG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuaW1hZ2UgPSBwcmVmaXgyaW1hZ2VbJHNjb3BlLnJlc3VsdC50ZWFtXTtcbiAgICB9XG4gIH07XG5cbiAgZGlyZWN0aXZlLnNjb3BlID0ge1xuICAgIHJlc3VsdDogJz0nXG4gIH07XG4gIGRpcmVjdGl2ZS5jb250cm9sbGVyID0gWyckc2NvcGUnLCBTbWFsbENhcmREaXJlY3RpdmVDb250cm9sbGVyXTtcbiAgcmV0dXJuIGRpcmVjdGl2ZTtcbn07XG5cbmxldCBzbWFsbENhcmREaXJlY3RpdmVOYW1lID0gJ3NtYWxsQ2FyZCc7XG5sZXQgc21hbGxDYXJkRGlyZWN0aXZlRGVjbGFyYXRpb24gPSBbXG4gIFNtYWxsQ2FyZERpcmVjdGl2ZVxuXTtcblxuZXhwb3J0IHtzbWFsbENhcmREaXJlY3RpdmVOYW1lLCBzbWFsbENhcmREaXJlY3RpdmVEZWNsYXJhdGlvbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7YWN0aXZpdHlMaXN0UmVzdWx0c0NvbnRyb2xsZXJOYW1lLCBhY3Rpdml0eUxpc3RSZXN1bHRzQ29udHJvbGxlckRlY2xhcmF0aW9ufSBmcm9tICcuL2xpc3QtcmVzdWx0cy9saXN0LXJlc3VsdHMtY29udHJvbGxlcic7XG5pbXBvcnQge2FjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlck5hbWUsIGFjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlckRlY2xhcmF0aW9ufSBmcm9tICcuL25ldy1yZXN1bHQvbmV3LXJlc3VsdC1jb250cm9sbGVyJztcbmltcG9ydCB7YWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXJOYW1lLCBhY3Rpdml0eVZpZXdBbGxSZXN1bHRzQ29udHJvbGxlckRlY2xhcmF0aW9ufSBmcm9tICcuL3ZpZXctYWxsLXJlc3VsdHMvdmlldy1hbGwtcmVzdWx0cy1jb250cm9sbGVyJztcblxubGV0IGFjdGl2aXR5TW9kdWxlTmFtZSA9ICdhY3Rpdml0eSc7XG5cbmFuZ3VsYXIubW9kdWxlKGFjdGl2aXR5TW9kdWxlTmFtZSwgW10pO1xuYW5ndWxhci5tb2R1bGUoYWN0aXZpdHlNb2R1bGVOYW1lKS5jb250cm9sbGVyKGFjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyTmFtZSwgYWN0aXZpdHlMaXN0UmVzdWx0c0NvbnRyb2xsZXJEZWNsYXJhdGlvbik7XG5hbmd1bGFyLm1vZHVsZShhY3Rpdml0eU1vZHVsZU5hbWUpLmNvbnRyb2xsZXIoYWN0aXZpdHlOZXdSZXN1bHRDb250cm9sbGVyTmFtZSwgYWN0aXZpdHlOZXdSZXN1bHRDb250cm9sbGVyRGVjbGFyYXRpb24pO1xuYW5ndWxhci5tb2R1bGUoYWN0aXZpdHlNb2R1bGVOYW1lKS5jb250cm9sbGVyKGFjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyTmFtZSwgYWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXJEZWNsYXJhdGlvbik7XG5cbmV4cG9ydCB7YWN0aXZpdHlNb2R1bGVOYW1lfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgQWN0aXZpdHlMaXN0UmVzdWx0c0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgJG1kVG9hc3QpIHtcbiAgICAkc2NvcGUuYWN0aXZpdHkgPSAkc3RhdGVQYXJhbXMuYWN0aXZpdHk7XG5cbiAgICAkc2NvcGUuZ29UbyA9IChzdGF0ZU5hbWUpID0+IHtcbiAgICAgICRzdGF0ZS5nbyhzdGF0ZU5hbWUsIHthY3Rpdml0eTogJHN0YXRlUGFyYW1zLmFjdGl2aXR5fSk7XG4gICAgfTtcblxuICAgICRzY29wZS5nZXRTbWFsbFJlc3VsdEltYWdlID0gKHJlc3VsdCkgPT4ge1xuICAgICAgbGV0IHByZWZpeDJpbWFnZSA9IHtcbiAgICAgICAgJ3N0YXJ3YXJzJzogJ2Fzc2V0cy9kYXJ0aC12YWRlcl9zbS5qcGcnLFxuICAgICAgICAnZ290JzogJ2Fzc2V0cy9kYWVuZXJ5cy10YXJnYXJ5ZW5fc20uanBnJyxcbiAgICAgICAgJ21hdHJpeCc6ICdhc3NldHMvbmVvX3NtLmpwZycsXG4gICAgICAgICdoaW15bSc6ICdhc3NldHMvYmFybmV5LXN0aW5zb25fc20uanBnJyxcbiAgICAgICAgJ2J0dGYnOiAnYXNzZXRzL21hcnR5LW1jZmx5X3NtLmpwZydcbiAgICAgIH07XG4gICAgICByZXR1cm4gcHJlZml4MmltYWdlW3Jlc3VsdC50ZWFtXTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmdldFJlc3VsdFNjb3JlID0gKHJlc3VsdCkgPT4ge1xuICAgICAgbGV0IHNjb3JlID0gcmVzdWx0LnNjb3JlO1xuXG4gICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHJlc3VsdC5jcmVhdGVkQXQpO1xuICAgICAgZGF0ZSA9IGRhdGUuZ2V0SG91cnMoKSArICc6JyArIGRhdGUuZ2V0TWludXRlcygpICsgJzonICsgZGF0ZS5nZXRTZWNvbmRzKCk7XG5cbiAgICAgIHJldHVybiBzY29yZSArICcgKCcgKyBkYXRlICsgJyknO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZGVsZXRlID0gKHJlc3VsdCkgPT4ge1xuICAgICAgJGh0dHAuZGVsZXRlKCcvYXBpL3YxLjAvYWN0aXZpdGllcy8nICsgJHN0YXRlUGFyYW1zLmFjdGl2aXR5ICsgJy9yZXN1bHRzLycgKyByZXN1bHQuX2lkKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gdW5kZWZpbmVkO1xuICAgICAgICAkaHR0cC5nZXQoJy9hcGkvdjEuMC9hY3Rpdml0aWVzLycgKyAkc3RhdGVQYXJhbXMuYWN0aXZpdHkgKyAnL3Jlc3VsdHM/YWxsPXRydWUnKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICRzY29wZS5yZXN1bHRzID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgfSk7XG4gICAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSAnVm91cyBuXFwnYXZleiBwYXMgbFxcJ2F1dGhvcmlzYXRpb24gbsOpY2Vzc2FpcmUnO1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDApIHtcbiAgICAgICAgICBtZXNzYWdlID0gJ09vcHMgaWwgeSBhIGV1IHVuIHNvdWNpcyBhdmVjIGxlIHNlcnZldXInO1xuICAgICAgICB9XG4gICAgICAgICRtZFRvYXN0LnNob3coJG1kVG9hc3Quc2ltcGxlKCkudGV4dENvbnRlbnQobWVzc2FnZSkucG9zaXRpb24oJ2JvdHRvbSByaWdodCcpLmhpZGVEZWxheSgzMDAwKSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgJGh0dHAuZ2V0KCcvYXBpL3YxLjAvYWN0aXZpdGllcy8nICsgJHN0YXRlUGFyYW1zLmFjdGl2aXR5ICsgJy9yZXN1bHRzP2FsbD10cnVlJykudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICRzY29wZS5yZXN1bHRzID0gcmVzcG9uc2UuZGF0YTtcbiAgICB9KTtcbiAgfVxufVxuXG5sZXQgYWN0aXZpdHlMaXN0UmVzdWx0c0NvbnRyb2xsZXJOYW1lID0gJ0FjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyJztcbmxldCBhY3Rpdml0eUxpc3RSZXN1bHRzQ29udHJvbGxlckRlY2xhcmF0aW9uID0gW1xuICAnJHNjb3BlJyxcbiAgJyRzdGF0ZScsXG4gICckc3RhdGVQYXJhbXMnLFxuICAnJGh0dHAnLFxuICAnJG1kVG9hc3QnLFxuICBBY3Rpdml0eUxpc3RSZXN1bHRzQ29udHJvbGxlclxuXTtcblxuZXhwb3J0IHthY3Rpdml0eUxpc3RSZXN1bHRzQ29udHJvbGxlck5hbWUsIGFjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyRGVjbGFyYXRpb259O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBBY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgJG1kVG9hc3QpIHtcbiAgICAkc2NvcGUuYWN0aXZpdHkgPSAkc3RhdGVQYXJhbXMuYWN0aXZpdHk7XG5cbiAgICAkc2NvcGUuZ29UbyA9IChzdGF0ZU5hbWUpID0+IHtcbiAgICAgICRzdGF0ZS5nbyhzdGF0ZU5hbWUsIHthY3Rpdml0eTogJHN0YXRlUGFyYW1zLmFjdGl2aXR5fSk7XG4gICAgfTtcblxuICAgICRzY29wZS50ZWFtcyA9IFt7XG4gICAgICBpZDogJ2J0dGYnLFxuICAgICAgbGFiZWw6ICdCYWNrIHRvIHRoZSBmdXR1cmUnXG4gICAgfSwge1xuICAgICAgaWQ6ICdnb3QnLFxuICAgICAgbGFiZWw6ICdHYW1lIG9mIFRocm9uZXMnXG4gICAgfSwge1xuICAgICAgaWQ6ICdoaW15bScsXG4gICAgICBsYWJlbDogJ0hvdyBJIG1ldCB5b3VyIG1vdGhlcidcbiAgICB9LCB7XG4gICAgICBpZDogJ21hdHJpeCcsXG4gICAgICBsYWJlbDogJ01hdHJpeCdcbiAgICB9LCB7XG4gICAgICBpZDogJ3N0YXJ3YXJzJyxcbiAgICAgIGxhYmVsOiAnU3RhciBXYXJzJ1xuICAgIH1dO1xuXG4gICAgJHNjb3BlLnVzZXIgPSB7fTtcbiAgICAkc2NvcGUudXNlci50ZWFtID0gJHNjb3BlLnRlYW1zWzBdLmlkO1xuICAgICRzY29wZS51c2VyLnJlc3VsdCA9IDA7XG5cbiAgICAkc2NvcGUuc3VibWl0UmVzdWx0ID0gKCkgPT4ge1xuICAgICAgbGV0IHJlc3VsdCA9IHtcbiAgICAgICAgdGVhbTogJHNjb3BlLnVzZXIudGVhbSxcbiAgICAgICAgc2NvcmU6ICRzY29wZS51c2VyLnJlc3VsdFxuICAgICAgfTtcbiAgICAgICRodHRwLnBvc3QoJy9hcGkvdjEuMC9hY3Rpdml0aWVzLycgKyAkc3RhdGVQYXJhbXMuYWN0aXZpdHkgKyAnL3Jlc3VsdHMnLCByZXN1bHQpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICRzdGF0ZS5nbygnYWN0aXZpdHlWaWV3QWxsUmVzdWx0cycsIHthY3Rpdml0eTogJHN0YXRlUGFyYW1zLmFjdGl2aXR5fSk7XG4gICAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSAnVm91cyBuXFwnYXZleiBwYXMgbFxcJ2F1dGhvcmlzYXRpb24gbsOpY2Vzc2FpcmUnO1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDApIHtcbiAgICAgICAgICBtZXNzYWdlID0gJ09vcHMgaWwgeSBhIGV1IHVuIHNvdWNpcyBhdmVjIGxlIHNlcnZldXInO1xuICAgICAgICB9XG4gICAgICAgICRtZFRvYXN0LnNob3coJG1kVG9hc3Quc2ltcGxlKCkudGV4dENvbnRlbnQobWVzc2FnZSkucG9zaXRpb24oJ2JvdHRvbSByaWdodCcpLmhpZGVEZWxheSgzMDAwKSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG5cbmxldCBhY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXJOYW1lID0gJ0FjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlcic7XG5sZXQgYWN0aXZpdHlOZXdSZXN1bHRDb250cm9sbGVyRGVjbGFyYXRpb24gPSBbXG4gICckc2NvcGUnLFxuICAnJHN0YXRlJyxcbiAgJyRzdGF0ZVBhcmFtcycsXG4gICckaHR0cCcsXG4gICckbWRUb2FzdCcsXG4gIEFjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlclxuXTtcblxuZXhwb3J0IHthY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXJOYW1lLCBhY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXJEZWNsYXJhdGlvbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEFjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsICRjb29raWVzLCAkdGltZW91dCkge1xuICAgICRzY29wZS5hY3Rpdml0eSA9ICRzdGF0ZVBhcmFtcy5hY3Rpdml0eTtcblxuICAgICRzY29wZS5nb1RvID0gKHN0YXRlTmFtZSkgPT4ge1xuICAgICAgJHN0YXRlLmdvKHN0YXRlTmFtZSwge2FjdGl2aXR5OiAkc3RhdGVQYXJhbXMuYWN0aXZpdHl9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmhhc0FQSUtleSA9ICgpID0+IHtcbiAgICAgIHJldHVybiAkY29va2llcy5nZXQoJ09CRU9fMTBZRUFSU19BUElfS0VZJykgIT09IHVuZGVmaW5lZDtcbiAgICB9O1xuXG4gICAgbGV0IHVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICRodHRwLmdldCgnL2FwaS92MS4wL2FjdGl2aXRpZXMvJyArICRzdGF0ZVBhcmFtcy5hY3Rpdml0eSArICcvcmVzdWx0cycpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwICYmIGRhdGEubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGxldCBmaXJzdCA9IGRhdGFbMF07XG4gICAgICAgICAgbGV0IG90aGVycyA9IFtdO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBkYXRhLmxlbmd0aDsgaSA9IGkgKyAxKSB7XG4gICAgICAgICAgICBvdGhlcnMucHVzaChkYXRhW2ldKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkc2NvcGUuZmlyc3QgPSBmaXJzdDtcbiAgICAgICAgICAkc2NvcGUub3RoZXJzID0gb3RoZXJzO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdXBkYXRlKCk7XG5cbiAgICBpZiAoJHN0YXRlUGFyYW1zLnJvdGF0aW9uKSB7XG4gICAgICBsZXQgYWN0aXZpdHkgPSAkc3RhdGVQYXJhbXMuYWN0aXZpdHk7XG5cbiAgICAgIGxldCBuZXdBY3Rpdml0eSA9IHVuZGVmaW5lZDtcbiAgICAgIGlmIChhY3Rpdml0eSA9PT0gJ21hcmlvJykge1xuICAgICAgICBuZXdBY3Rpdml0eSA9ICdjb2NrdGFpbCc7XG4gICAgICB9IGVsc2UgaWYgKGFjdGl2aXR5ID09PSAnY29ja3RhaWwnKSB7XG4gICAgICAgIG5ld0FjdGl2aXR5ID0gJ3F1aXp6JztcbiAgICAgIH0gZWxzZSBpZiAoYWN0aXZpdHkgPT09ICdxdWl6eicpIHtcbiAgICAgICAgbmV3QWN0aXZpdHkgPSAnYmFieWZvb3QnO1xuICAgICAgfSBlbHNlIGlmIChhY3Rpdml0eSA9PT0gJ2JhYnlmb290Jykge1xuICAgICAgICBuZXdBY3Rpdml0eSA9ICdsZWdvJztcbiAgICAgIH0gZWxzZSBpZiAoYWN0aXZpdHkgPT09ICdsZWdvJykge1xuICAgICAgICBuZXdBY3Rpdml0eSA9ICdyb2JvdHMnO1xuICAgICAgfSBlbHNlIGlmIChhY3Rpdml0eSA9PT0gJ3JvYm90cycpIHtcbiAgICAgICAgLy8gbm90aGluZyB0byBnbyB0byB0aGUgbGVhZGVyYm9hcmRcbiAgICAgIH1cblxuICAgICAgaWYgKG5ld0FjdGl2aXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGV0IHRpbWVyID0gJHRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICRzdGF0ZS5nbygnYWN0aXZpdHlWaWV3QWxsUmVzdWx0cycsIHthY3Rpdml0eTogbmV3QWN0aXZpdHksIHJvdGF0aW9uOiAndHJ1ZSd9KTtcbiAgICAgICAgfSwgMTAwMDApO1xuICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsIChldmVudCkgPT4ge1xuICAgICAgICAgICR0aW1lb3V0LmNhbmNlbCh0aW1lcik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRpbWVyID0gJHRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICRzdGF0ZS5nbygnbGVhZGVyYm9hcmQnLCB7cm90YXRpb246ICd0cnVlJ30pO1xuICAgICAgICB9LCAxMDAwMCk7XG4gICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgJHRpbWVvdXQuY2FuY2VsKHRpbWVyKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmxldCBhY3Rpdml0eVZpZXdBbGxSZXN1bHRzQ29udHJvbGxlck5hbWUgPSAnQWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXInO1xubGV0IGFjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyRGVjbGFyYXRpb24gPSBbXG4gICckc2NvcGUnLFxuICAnJHN0YXRlJyxcbiAgJyRzdGF0ZVBhcmFtcycsXG4gICckaHR0cCcsXG4gICckY29va2llcycsXG4gICckdGltZW91dCcsXG4gIEFjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyXG5dO1xuXG5leHBvcnQge2FjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyTmFtZSwgYWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXJEZWNsYXJhdGlvbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIERhc2hib2FyZENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRzdGF0ZSkge1xuICAgICRzY29wZS5nb1RvID0gKHN0YXRlTmFtZSwgYWN0aXZpdHlOYW1lKSA9PiB7XG4gICAgICBpZiAoYWN0aXZpdHlOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgJHN0YXRlLmdvKHN0YXRlTmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc3RhdGUuZ28oc3RhdGVOYW1lLCB7YWN0aXZpdHk6IGFjdGl2aXR5TmFtZX0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxubGV0IGRhc2hib2FyZENvbnRyb2xsZXJOYW1lID0gJ0Rhc2hib2FyZENvbnRyb2xsZXInO1xubGV0IGRhc2hib2FyZENvbnRyb2xsZXJEZWNsYXJhdGlvbiA9IFtcbiAgJyRzY29wZScsXG4gICckc3RhdGUnLFxuICBEYXNoYm9hcmRDb250cm9sbGVyXG5dO1xuXG5leHBvcnQge2Rhc2hib2FyZENvbnRyb2xsZXJOYW1lLCBkYXNoYm9hcmRDb250cm9sbGVyRGVjbGFyYXRpb259O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2Rhc2hib2FyZENvbnRyb2xsZXJOYW1lLCBkYXNoYm9hcmRDb250cm9sbGVyRGVjbGFyYXRpb259IGZyb20gJy4vZGFzaGJvYXJkLWNvbnRyb2xsZXInO1xuXG5sZXQgZGFzaGJvYXJkTW9kdWxlTmFtZSA9ICdkYXNoYm9hcmQnO1xuXG5hbmd1bGFyLm1vZHVsZShkYXNoYm9hcmRNb2R1bGVOYW1lLCBbXSk7XG5hbmd1bGFyLm1vZHVsZShkYXNoYm9hcmRNb2R1bGVOYW1lKS5jb250cm9sbGVyKGRhc2hib2FyZENvbnRyb2xsZXJOYW1lLCBkYXNoYm9hcmRDb250cm9sbGVyRGVjbGFyYXRpb24pO1xuXG5leHBvcnQge2Rhc2hib2FyZE1vZHVsZU5hbWV9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBLZXlDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkc3RhdGUsICRjb29raWVzKSB7XG4gICAgJHNjb3BlLmdvVG8gPSAoc3RhdGVOYW1lKSA9PiB7XG4gICAgICAkc3RhdGUuZ28oc3RhdGVOYW1lKTtcbiAgICB9O1xuXG4gICAgbGV0IGN1cnJlbnRLZXkgPSAkY29va2llcy5nZXQoJ09CRU9fMTBZRUFSU19BUElfS0VZJyk7XG4gICAgaWYgKGN1cnJlbnRLZXkgIT09IHVuZGVmaW5lZCAmJiBjdXJyZW50S2V5Lmxlbmd0aCA+IDApIHtcbiAgICAgICRzY29wZS5rZXkgPSBjdXJyZW50S2V5O1xuICAgIH1cblxuICAgICRzY29wZS5zYXZlID0gKGtleSkgPT4ge1xuICAgICAgJGNvb2tpZXMucHV0KCdPQkVPXzEwWUVBUlNfQVBJX0tFWScsIGtleSk7XG4gICAgICAkc3RhdGUuZ28oJ2Rhc2hib2FyZCcpO1xuICAgIH07XG4gIH1cbn1cblxubGV0IGtleUNvbnRyb2xsZXJOYW1lID0gJ0tleUNvbnRyb2xsZXInO1xubGV0IGtleUNvbnRyb2xsZXJEZWNsYXJhdGlvbiA9IFtcbiAgJyRzY29wZScsXG4gICckc3RhdGUnLFxuICAnJGNvb2tpZXMnLFxuICBLZXlDb250cm9sbGVyXG5dO1xuXG5leHBvcnQge2tleUNvbnRyb2xsZXJOYW1lLCBrZXlDb250cm9sbGVyRGVjbGFyYXRpb259O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2tleUNvbnRyb2xsZXJOYW1lLCBrZXlDb250cm9sbGVyRGVjbGFyYXRpb259IGZyb20gJy4va2V5LWNvbnRyb2xsZXInO1xuXG5sZXQga2V5TW9kdWxlTmFtZSA9ICdrZXknO1xuXG5hbmd1bGFyLm1vZHVsZShrZXlNb2R1bGVOYW1lLCBbXSk7XG5hbmd1bGFyLm1vZHVsZShrZXlNb2R1bGVOYW1lKS5jb250cm9sbGVyKGtleUNvbnRyb2xsZXJOYW1lLCBrZXlDb250cm9sbGVyRGVjbGFyYXRpb24pO1xuXG5leHBvcnQge2tleU1vZHVsZU5hbWV9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBMZWFkZXJib2FyZENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRzdGF0ZSwgJGh0dHAsICR0aW1lb3V0LCAkc3RhdGVQYXJhbXMpIHtcbiAgICAkc2NvcGUuZ29UbyA9IChzdGF0ZU5hbWUpID0+IHtcbiAgICAgICRzdGF0ZS5nbyhzdGF0ZU5hbWUpO1xuICAgIH07XG5cbiAgICBsZXQgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgJGh0dHAuZ2V0KCcvYXBpL3YxLjAvcmVzdWx0cycpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwICYmIGRhdGEubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGxldCBmaXJzdCA9IGRhdGFbMF07XG4gICAgICAgICAgbGV0IG90aGVycyA9IFtdO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBkYXRhLmxlbmd0aDsgaSA9IGkgKyAxKSB7XG4gICAgICAgICAgICBvdGhlcnMucHVzaChkYXRhW2ldKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkc2NvcGUuZmlyc3QgPSBmaXJzdDtcbiAgICAgICAgICAkc2NvcGUub3RoZXJzID0gb3RoZXJzO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdXBkYXRlKCk7XG5cbiAgICBpZiAoJHN0YXRlUGFyYW1zLnJvdGF0aW9uKSB7XG4gICAgICBsZXQgdGltZXIgPSAkdGltZW91dCgoKSA9PiB7XG4gICAgICAgICRzdGF0ZS5nbygnYWN0aXZpdHlWaWV3QWxsUmVzdWx0cycsIHthY3Rpdml0eTogJ21hcmlvJywgcm90YXRpb246ICd0cnVlJ30pO1xuICAgICAgfSwgMTAwMDApO1xuXG4gICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsIChldmVudCkgPT4ge1xuICAgICAgICAkdGltZW91dC5jYW5jZWwodGltZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmxldCBsZWFkZXJib2FyZENvbnRyb2xsZXJOYW1lID0gJ0xlYWRlcmJvYXJkQ29udHJvbGxlcic7XG5sZXQgbGVhZGVyYm9hcmRDb250cm9sbGVyRGVjbGFyYXRpb24gPSBbXG4gICckc2NvcGUnLFxuICAnJHN0YXRlJyxcbiAgJyRodHRwJyxcbiAgJyR0aW1lb3V0JyxcbiAgJyRzdGF0ZVBhcmFtcycsXG4gIExlYWRlcmJvYXJkQ29udHJvbGxlclxuXTtcblxuZXhwb3J0IHtsZWFkZXJib2FyZENvbnRyb2xsZXJOYW1lLCBsZWFkZXJib2FyZENvbnRyb2xsZXJEZWNsYXJhdGlvbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7bGVhZGVyYm9hcmRDb250cm9sbGVyTmFtZSwgbGVhZGVyYm9hcmRDb250cm9sbGVyRGVjbGFyYXRpb259IGZyb20gJy4vbGVhZGVyYm9hcmQtY29udHJvbGxlcic7XG5cbmxldCBsZWFkZXJib2FyZE1vZHVsZU5hbWUgPSAnbGVhZGVyYm9hcmQnO1xuXG5hbmd1bGFyLm1vZHVsZShsZWFkZXJib2FyZE1vZHVsZU5hbWUsIFtdKTtcbmFuZ3VsYXIubW9kdWxlKGxlYWRlcmJvYXJkTW9kdWxlTmFtZSkuY29udHJvbGxlcihsZWFkZXJib2FyZENvbnRyb2xsZXJOYW1lLCBsZWFkZXJib2FyZENvbnRyb2xsZXJEZWNsYXJhdGlvbik7XG5cbmV4cG9ydCB7bGVhZGVyYm9hcmRNb2R1bGVOYW1lfTtcbiJdfQ==

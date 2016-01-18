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
        $timeout(function () {
          $state.go('activityViewAllResults', { activity: newActivity, rotation: 'true' });
        }, 10000);
      } else {
        $timeout(function () {
          $state.go('leaderboard', { rotation: 'true' });
        }, 10000);
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
    if (stateName === 'leaderboard') {
      $state.go(stateName, { rotation: 'true' });
    } else if (activityName === undefined) {
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

  var socket = io.connect('http://localhost:3000');
  socket.on('results_updated', function (msg) {
    console.log('refreshing the results');
    update();
    $scope.$apply();
  });

  $scope.$on("$destroy", function () {
    console.log('shutting down the connection');
    socket.disconnect();
  });

  if ($stateParams.rotation) {
    $timeout(function () {
      $state.go('activityViewAllResults', { activity: 'mario', rotation: 'true' });
    }, 10000);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjLzEweWVhcnMuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL2NvbXBvbmVudHMvY29tbW9uL2NvbmZpZ3VyYXRpb24uanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL2NvbXBvbmVudHMvY29tbW9uL2h0dHAtaW50ZXJjZXB0b3Itc2VydmljZS5qcyIsIi9Vc2Vycy9zYmVnYXVkZWF1L0RvY3VtZW50cy9Qcm9qZWN0cy8xMCBZZWFycy9Db2RlL05vZGVTZXJ2ZXIvYXBwL3B1YmxpYy9zcmMvY29tcG9uZW50cy9jb21tb24vbGFyZ2UtY2FyZC1kaXJlY3RpdmUuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL2NvbXBvbmVudHMvY29tbW9uL3NtYWxsLWNhcmQtZGlyZWN0aXZlLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9hY3Rpdml0eS9hY3Rpdml0eS1tb2R1bGUuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL3NlY3Rpb25zL2FjdGl2aXR5L2xpc3QtcmVzdWx0cy9saXN0LXJlc3VsdHMtY29udHJvbGxlci5qcyIsIi9Vc2Vycy9zYmVnYXVkZWF1L0RvY3VtZW50cy9Qcm9qZWN0cy8xMCBZZWFycy9Db2RlL05vZGVTZXJ2ZXIvYXBwL3B1YmxpYy9zcmMvc2VjdGlvbnMvYWN0aXZpdHkvbmV3LXJlc3VsdC9uZXctcmVzdWx0LWNvbnRyb2xsZXIuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL3NlY3Rpb25zL2FjdGl2aXR5L3ZpZXctYWxsLXJlc3VsdHMvdmlldy1hbGwtcmVzdWx0cy1jb250cm9sbGVyLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9kYXNoYm9hcmQvZGFzaGJvYXJkLWNvbnRyb2xsZXIuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL3NlY3Rpb25zL2Rhc2hib2FyZC9kYXNoYm9hcmQtbW9kdWxlLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9rZXkva2V5LWNvbnRyb2xsZXIuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL3NlY3Rpb25zL2tleS9rZXktbW9kdWxlLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9sZWFkZXJib2FyZC9sZWFkZXJib2FyZC1jb250cm9sbGVyLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9sZWFkZXJib2FyZC9sZWFkZXJib2FyZC1tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs2Q0NBa0MsbUNBQW1DOztzREFFTyw4Q0FBOEM7O2tEQUN0RCwwQ0FBMEM7O2tEQUMxQywwQ0FBMEM7O2dEQUU1RSx1Q0FBdUM7O29EQUNyQywyQ0FBMkM7OzhDQUM5QyxxQ0FBcUM7O29DQUMxQywyQkFBMkI7O0FBR3ZELFlBQVksQ0FBQzs7QUFFYixJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUM7Ozs7O0FBSzNCLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQ3pCLFdBQVcsRUFDWCxZQUFZLEVBQ1osWUFBWSxFQUNaLFdBQVcsOE1BS1osQ0FBQyxDQUFDOzs7QUFHSCxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sb0RBQXFCLENBQUM7OztBQUd2RCxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sK0lBQStELENBQUM7QUFDbEcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLCtIQUF1RCxDQUFDO0FBQzVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUywrSEFBdUQsQ0FBQzs7O0FDcEM1RixZQUFZLENBQUM7Ozs7O0FBRWIsSUFBSSxtQkFBbUIsR0FBRyxTQUF0QixtQkFBbUIsQ0FBSSxhQUFhLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFLO0FBQ25HLGVBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7O0FBRW5ELG9CQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFbEMsZ0JBQWMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFHO0FBQ2pDLE9BQUcsRUFBRSxHQUFHO0FBQ1IsZUFBVyxFQUFF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VixjQUFjLEVBQ2QscUJBQXFCLENBQ3RCLENBQUM7O1FBRU0seUJBQXlCLEdBQXpCLHlCQUF5QjtRQUFFLGdDQUFnQyxHQUFoQyxnQ0FBZ0M7OztBQ3pEbkUsWUFBWSxDQUFDOzs7Ozs7cUNBRTZELDBCQUEwQjs7QUFFcEcsSUFBSSxxQkFBcUIsR0FBRyxhQUFhLENBQUM7O0FBRTFDLE9BQU8sQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFVBQVUsMkdBQTZELENBQUM7O1FBRXRHLHFCQUFxQixHQUFyQixxQkFBcUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHttb2R1bGVDb25maWd1cmF0aW9ufSBmcm9tICcuL2NvbXBvbmVudHMvY29tbW9uL2NvbmZpZ3VyYXRpb24nO1xuXG5pbXBvcnQge2h0dHBJbnRlcmNlcHRvclNlcnZpY2VOYW1lLCBodHRwSW50ZXJjZXB0b3JTZXJ2aWNlRGVjbGFyYXRpb259IGZyb20gJy4vY29tcG9uZW50cy9jb21tb24vaHR0cC1pbnRlcmNlcHRvci1zZXJ2aWNlJztcbmltcG9ydCB7c21hbGxDYXJkRGlyZWN0aXZlTmFtZSwgc21hbGxDYXJkRGlyZWN0aXZlRGVjbGFyYXRpb259IGZyb20gJy4vY29tcG9uZW50cy9jb21tb24vc21hbGwtY2FyZC1kaXJlY3RpdmUnO1xuaW1wb3J0IHtsYXJnZUNhcmREaXJlY3RpdmVOYW1lLCBsYXJnZUNhcmREaXJlY3RpdmVEZWNsYXJhdGlvbn0gZnJvbSAnLi9jb21wb25lbnRzL2NvbW1vbi9sYXJnZS1jYXJkLWRpcmVjdGl2ZSc7XG5cbmltcG9ydCB7ZGFzaGJvYXJkTW9kdWxlTmFtZX0gZnJvbSAnLi9zZWN0aW9ucy9kYXNoYm9hcmQvZGFzaGJvYXJkLW1vZHVsZSc7XG5pbXBvcnQge2xlYWRlcmJvYXJkTW9kdWxlTmFtZX0gZnJvbSAnLi9zZWN0aW9ucy9sZWFkZXJib2FyZC9sZWFkZXJib2FyZC1tb2R1bGUnO1xuaW1wb3J0IHthY3Rpdml0eU1vZHVsZU5hbWV9IGZyb20gJy4vc2VjdGlvbnMvYWN0aXZpdHkvYWN0aXZpdHktbW9kdWxlJztcbmltcG9ydCB7a2V5TW9kdWxlTmFtZX0gZnJvbSAnLi9zZWN0aW9ucy9rZXkva2V5LW1vZHVsZSc7XG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5sZXQgbW9kdWxlTmFtZSA9ICcxMHllYXJzJztcblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBtYWluIEFuZ3VsYXIgbW9kdWxlIHVzaW5nIHRoZSBjaGlsZCBtb2R1bGVzIGltcG9ydGVkLlxuICovXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXG4gICd1aS5yb3V0ZXInLFxuICAnbmdNYXRlcmlhbCcsXG4gICduZ01lc3NhZ2VzJyxcbiAgJ25nQ29va2llcycsXG4gIGRhc2hib2FyZE1vZHVsZU5hbWUsXG4gIGxlYWRlcmJvYXJkTW9kdWxlTmFtZSxcbiAgYWN0aXZpdHlNb2R1bGVOYW1lLFxuICBrZXlNb2R1bGVOYW1lXG5dKTtcblxuLy8gSW1wb3J0IHRoZSBjb25maWd1cmF0aW9uIGFuZCBwcmVwYXJlIHRoZSBtb2R1bGUuXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lKS5jb25maWcobW9kdWxlQ29uZmlndXJhdGlvbik7XG5cbi8vIEltcG9ydCB0aGUgY2FyZCBkaXJlY3RpdmVzXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lKS5zZXJ2aWNlKGh0dHBJbnRlcmNlcHRvclNlcnZpY2VOYW1lLCBodHRwSW50ZXJjZXB0b3JTZXJ2aWNlRGVjbGFyYXRpb24pO1xuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSkuZGlyZWN0aXZlKHNtYWxsQ2FyZERpcmVjdGl2ZU5hbWUsIHNtYWxsQ2FyZERpcmVjdGl2ZURlY2xhcmF0aW9uKTtcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUpLmRpcmVjdGl2ZShsYXJnZUNhcmREaXJlY3RpdmVOYW1lLCBsYXJnZUNhcmREaXJlY3RpdmVEZWNsYXJhdGlvbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbmxldCBtb2R1bGVDb25maWd1cmF0aW9uID0gKCRodHRwUHJvdmlkZXIsICRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlcikgPT4ge1xuICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdIVFRQSW50ZXJjZXB0b3InKTtcblxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2Rhc2hib2FyZCcsICB7XG4gICAgdXJsOiAnLycsXG4gICAgdGVtcGxhdGVVcmw6ICdzcmMvc2VjdGlvbnMvZGFzaGJvYXJkL2Rhc2hib2FyZC5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnRGFzaGJvYXJkQ29udHJvbGxlcidcbiAgfSkuc3RhdGUoJ2xlYWRlcmJvYXJkJywgIHtcbiAgICB1cmw6ICcvbGVhZGVyYm9hcmQ/cm90YXRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnc3JjL3NlY3Rpb25zL2xlYWRlcmJvYXJkL2xlYWRlcmJvYXJkLmh0bWwnLFxuICAgIGNvbnRyb2xsZXI6ICdMZWFkZXJib2FyZENvbnRyb2xsZXInXG4gIH0pLnN0YXRlKCdhY3Rpdml0eVZpZXdBbGxSZXN1bHRzJywgIHtcbiAgICB1cmw6ICcvYWN0aXZpdGllcy86YWN0aXZpdHk/cm90YXRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnc3JjL3NlY3Rpb25zL2FjdGl2aXR5L3ZpZXctYWxsLXJlc3VsdHMvdmlldy1hbGwtcmVzdWx0cy5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnQWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXInXG4gIH0pLnN0YXRlKCdhY3Rpdml0eU5ld1Jlc3VsdCcsICB7XG4gICAgdXJsOiAnL2FjdGl2aXRpZXMvOmFjdGl2aXR5L25ld3Jlc3VsdD9uYW1lJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NyYy9zZWN0aW9ucy9hY3Rpdml0eS9uZXctcmVzdWx0L25ldy1yZXN1bHQuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ0FjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlcidcbiAgfSkuc3RhdGUoJ2FjdGl2aXR5TGlzdFJlc3VsdHMnLCAge1xuICAgIHVybDogJy9hY3Rpdml0aWVzLzphY3Rpdml0eS9saXN0cmVzdWx0cycsXG4gICAgdGVtcGxhdGVVcmw6ICdzcmMvc2VjdGlvbnMvYWN0aXZpdHkvbGlzdC1yZXN1bHRzL2xpc3QtcmVzdWx0cy5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnQWN0aXZpdHlMaXN0UmVzdWx0c0NvbnRyb2xsZXInXG4gIH0pLnN0YXRlKCdrZXknLCAge1xuICAgIHVybDogJy9hcGlrZXknLFxuICAgIHRlbXBsYXRlVXJsOiAnc3JjL3NlY3Rpb25zL2tleS9rZXkuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ0tleUNvbnRyb2xsZXInXG4gIH0pO1xuXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpLnByaW1hcnlQYWxldHRlKCd0ZWFsJykuYWNjZW50UGFsZXR0ZSgncmVkJyk7XG5cbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdtYXJpbycpLnByaW1hcnlQYWxldHRlKCdvcmFuZ2UnLCB7ZGVmYXVsdDogJzgwMCd9KS5hY2NlbnRQYWxldHRlKCdyZWQnKTtcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdjb2NrdGFpbCcpLnByaW1hcnlQYWxldHRlKCdkZWVwLXB1cnBsZScsIHtkZWZhdWx0OiAnNzAwJ30pLmFjY2VudFBhbGV0dGUoJ3JlZCcpO1xuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2JhYnlmb290JykucHJpbWFyeVBhbGV0dGUoJ2dyZWVuJywge2RlZmF1bHQ6ICc4MDAnfSkuYWNjZW50UGFsZXR0ZSgncmVkJyk7XG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnbGVnbycpLnByaW1hcnlQYWxldHRlKCdjeWFuJywge2RlZmF1bHQ6ICc3MDAnfSkuYWNjZW50UGFsZXR0ZSgncmVkJyk7XG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgncm9ib3RzJykucHJpbWFyeVBhbGV0dGUoJ2JsdWUtZ3JleScsIHtkZWZhdWx0OiAnNjAwJ30pLmFjY2VudFBhbGV0dGUoJ3JlZCcpO1xuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ3F1aXp6JykucHJpbWFyeVBhbGV0dGUoJ2JsdWUnLCB7ZGVmYXVsdDogJzgwMCd9KS5hY2NlbnRQYWxldHRlKCdyZWQnKTtcbn07XG5cbmV4cG9ydCB7bW9kdWxlQ29uZmlndXJhdGlvbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmxldCBodHRwSW50ZXJjZXB0b3IgPSAoJGNvb2tpZXMpID0+IHtcbiAgbGV0IHNlcnZpY2UgPSB7fTtcblxuICBzZXJ2aWNlLnJlcXVlc3QgPSBmdW5jdGlvbihjb25maWcpIHtcbiAgICAgIGxldCBrZXkgPSAkY29va2llcy5nZXQoJ09CRU9fMTBZRUFSU19BUElfS0VZJyk7XG4gICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25maWcuaGVhZGVycy5YX09CRU9fMTBZRUFSU19BUElfS0VZID0ga2V5O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbmZpZztcbiAgfTtcblxuICByZXR1cm4gc2VydmljZTtcbn07XG5cbmxldCBodHRwSW50ZXJjZXB0b3JTZXJ2aWNlTmFtZSA9ICdIVFRQSW50ZXJjZXB0b3InO1xubGV0IGh0dHBJbnRlcmNlcHRvclNlcnZpY2VEZWNsYXJhdGlvbiA9IFtcbiAgJyRjb29raWVzJyxcbiAgaHR0cEludGVyY2VwdG9yXG5dO1xuXG5leHBvcnQge2h0dHBJbnRlcmNlcHRvclNlcnZpY2VOYW1lLCBodHRwSW50ZXJjZXB0b3JTZXJ2aWNlRGVjbGFyYXRpb259O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgTGFyZ2VDYXJkRGlyZWN0aXZlID0gKCkgPT4ge1xuICBsZXQgZGlyZWN0aXZlID0ge307XG4gIGRpcmVjdGl2ZS50ZW1wbGF0ZSA9ICc8bWQtY2FyZD4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgPGEgdWktc3JlZj1cImxlYWRlcmJvYXJkXCI+PGltZyBuZy1zcmM9XCJ7e2ltYWdlfX1cIiBjbGFzcz1cIm1kLWNhcmQtaW1hZ2VcIiBhbHQ9XCJ7e25hbWV9fVwiPjwvYT4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgPG1kLWNhcmQtdGl0bGU+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgICAgPG1kLWNhcmQtdGl0bGUtdGV4dD4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICAgIDxzcGFuIGNsYXNzPVwibWQtaGVhZGxpbmVcIj57e25hbWV9fTwvc3Bhbj4ge3tzY29yZX19JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgICAgPC9tZC1jYXJkLXRpdGxlLXRleHQ+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgIDwvbWQtY2FyZC10aXRsZT4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgPG1kLWNhcmQtY29udGVudD4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgPC9tZC1jYXJkLWNvbnRlbnQ+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICc8L21kLWNhcmQ+JztcblxuICBjbGFzcyBMYXJnZUNhcmREaXJlY3RpdmVDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvciAoJHNjb3BlKSB7XG4gICAgICBsZXQgcHJlZml4Mm5hbWUgPSB7XG4gICAgICAgICdzdGFyd2Fycyc6ICdTdGFyIFdhcnMnLFxuICAgICAgICAnZ290JzogJ0dhbWUgb2YgVGhyb25lcycsXG4gICAgICAgICdtYXRyaXgnOiAnTWF0cml4JyxcbiAgICAgICAgJ2hpbXltJzogJ0hvdyBJIG1ldCB5b3VyIG1vdGhlcicsXG4gICAgICAgICdidHRmJzogJ0JhY2sgdG8gdGhlIGZ1dHVyZSdcbiAgICAgIH07XG5cbiAgICAgIGxldCBwcmVmaXgyaW1hZ2UgPSB7XG4gICAgICAgICdzdGFyd2Fycyc6ICdhc3NldHMvZGFydGgtdmFkZXJfbGcuanBnJyxcbiAgICAgICAgJ2dvdCc6ICdhc3NldHMvZGFlbmVyeXMtdGFyZ2FyeWVuX2xnLmpwZycsXG4gICAgICAgICdtYXRyaXgnOiAnYXNzZXRzL25lb19sZy5qcGcnLFxuICAgICAgICAnaGlteW0nOiAnYXNzZXRzL2Jhcm5leS1zdGluc29uX2xnLmpwZycsXG4gICAgICAgICdidHRmJzogJ2Fzc2V0cy9tYXJ0eS1tY2ZseV9sZy5qcGcnXG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuJHdhdGNoKCdyZXN1bHQnLCAobmV3VmFsdWUpID0+IHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAkc2NvcGUubmFtZSA9IHByZWZpeDJuYW1lWyRzY29wZS5yZXN1bHQudGVhbV07XG5cbiAgICAgICAgICBpZiAoJHNjb3BlLnJlc3VsdC5zY29yZSA9PT0gMCkge1xuICAgICAgICAgICAgJHNjb3BlLnNjb3JlID0gJzAgcG9pbnQnO1xuICAgICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLnJlc3VsdC5zY29yZSA9PT0gMSkge1xuICAgICAgICAgICAgJHNjb3BlLnNjb3JlID0gJzEgcG9pbnQnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkc2NvcGUuc2NvcmUgPSAkc2NvcGUucmVzdWx0LnNjb3JlICsgJyBwb2ludHMnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRzY29wZS5pbWFnZSA9IHByZWZpeDJpbWFnZVskc2NvcGUucmVzdWx0LnRlYW1dO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZGlyZWN0aXZlLnNjb3BlID0ge1xuICAgIHJlc3VsdDogJz0nXG4gIH07XG4gIGRpcmVjdGl2ZS5jb250cm9sbGVyID0gWyckc2NvcGUnLCBMYXJnZUNhcmREaXJlY3RpdmVDb250cm9sbGVyXTtcbiAgcmV0dXJuIGRpcmVjdGl2ZTtcbn07XG5cbmxldCBsYXJnZUNhcmREaXJlY3RpdmVOYW1lID0gJ2xhcmdlQ2FyZCc7XG5sZXQgbGFyZ2VDYXJkRGlyZWN0aXZlRGVjbGFyYXRpb24gPSBbXG4gIExhcmdlQ2FyZERpcmVjdGl2ZVxuXTtcblxuZXhwb3J0IHtsYXJnZUNhcmREaXJlY3RpdmVOYW1lLCBsYXJnZUNhcmREaXJlY3RpdmVEZWNsYXJhdGlvbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmxldCBTbWFsbENhcmREaXJlY3RpdmUgPSAoKSA9PiB7XG4gIGxldCBkaXJlY3RpdmUgPSB7fTtcbiAgZGlyZWN0aXZlLnRlbXBsYXRlID0gJzxtZC1jYXJkPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICA8bWQtY2FyZC10aXRsZT4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICA8bWQtY2FyZC10aXRsZS10ZXh0PicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICAgICAgPHNwYW4gY2xhc3M9XCJtZC1oZWFkbGluZVwiPnt7bmFtZX19PC9zcGFuPiB7e3Njb3JlfX0nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICA8L21kLWNhcmQtdGl0bGUtdGV4dD4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICA8bWQtY2FyZC10aXRsZS1tZWRpYT4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICAgIDxkaXYgY2xhc3M9XCJtZC1tZWRpYS1zbSBjYXJkLW1lZGlhXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgICAgICAgIDxpbWcgbmctc3JjPVwie3tpbWFnZX19XCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgICAgICA8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICA8L21kLWNhcmQtdGl0bGUtbWVkaWE+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgIDwvbWQtY2FyZC10aXRsZT4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJzwvbWQtY2FyZD4nO1xuXG4gIGNsYXNzIFNtYWxsQ2FyZERpcmVjdGl2ZUNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yICgkc2NvcGUpIHtcbiAgICAgIGxldCBwcmVmaXgybmFtZSA9IHtcbiAgICAgICAgJ3N0YXJ3YXJzJzogJ1N0YXIgV2FycycsXG4gICAgICAgICdnb3QnOiAnR2FtZSBvZiBUaHJvbmVzJyxcbiAgICAgICAgJ21hdHJpeCc6ICdNYXRyaXgnLFxuICAgICAgICAnaGlteW0nOiAnSG93IEkgbWV0IHlvdXIgbW90aGVyJyxcbiAgICAgICAgJ2J0dGYnOiAnQmFjayB0byB0aGUgZnV0dXJlJ1xuICAgICAgfTtcblxuICAgICAgJHNjb3BlLm5hbWUgPSBwcmVmaXgybmFtZVskc2NvcGUucmVzdWx0LnRlYW1dO1xuXG4gICAgICBpZiAoJHNjb3BlLnJlc3VsdC5zY29yZSA9PT0gMCkge1xuICAgICAgICAkc2NvcGUuc2NvcmUgPSAnMCBwb2ludCc7XG4gICAgICB9IGVsc2UgaWYgKCRzY29wZS5yZXN1bHQuc2NvcmUgPT09IDEpIHtcbiAgICAgICAgJHNjb3BlLnNjb3JlID0gJzEgcG9pbnQnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHNjb3BlLnNjb3JlID0gJHNjb3BlLnJlc3VsdC5zY29yZSArICcgcG9pbnRzJztcbiAgICAgIH1cblxuICAgICAgbGV0IHByZWZpeDJpbWFnZSA9IHtcbiAgICAgICAgJ3N0YXJ3YXJzJzogJ2Fzc2V0cy9kYXJ0aC12YWRlcl9zbS5qcGcnLFxuICAgICAgICAnZ290JzogJ2Fzc2V0cy9kYWVuZXJ5cy10YXJnYXJ5ZW5fc20uanBnJyxcbiAgICAgICAgJ21hdHJpeCc6ICdhc3NldHMvbmVvX3NtLmpwZycsXG4gICAgICAgICdoaW15bSc6ICdhc3NldHMvYmFybmV5LXN0aW5zb25fc20uanBnJyxcbiAgICAgICAgJ2J0dGYnOiAnYXNzZXRzL21hcnR5LW1jZmx5X3NtLmpwZydcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5pbWFnZSA9IHByZWZpeDJpbWFnZVskc2NvcGUucmVzdWx0LnRlYW1dO1xuICAgIH1cbiAgfTtcblxuICBkaXJlY3RpdmUuc2NvcGUgPSB7XG4gICAgcmVzdWx0OiAnPSdcbiAgfTtcbiAgZGlyZWN0aXZlLmNvbnRyb2xsZXIgPSBbJyRzY29wZScsIFNtYWxsQ2FyZERpcmVjdGl2ZUNvbnRyb2xsZXJdO1xuICByZXR1cm4gZGlyZWN0aXZlO1xufTtcblxubGV0IHNtYWxsQ2FyZERpcmVjdGl2ZU5hbWUgPSAnc21hbGxDYXJkJztcbmxldCBzbWFsbENhcmREaXJlY3RpdmVEZWNsYXJhdGlvbiA9IFtcbiAgU21hbGxDYXJkRGlyZWN0aXZlXG5dO1xuXG5leHBvcnQge3NtYWxsQ2FyZERpcmVjdGl2ZU5hbWUsIHNtYWxsQ2FyZERpcmVjdGl2ZURlY2xhcmF0aW9ufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHthY3Rpdml0eUxpc3RSZXN1bHRzQ29udHJvbGxlck5hbWUsIGFjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyRGVjbGFyYXRpb259IGZyb20gJy4vbGlzdC1yZXN1bHRzL2xpc3QtcmVzdWx0cy1jb250cm9sbGVyJztcbmltcG9ydCB7YWN0aXZpdHlOZXdSZXN1bHRDb250cm9sbGVyTmFtZSwgYWN0aXZpdHlOZXdSZXN1bHRDb250cm9sbGVyRGVjbGFyYXRpb259IGZyb20gJy4vbmV3LXJlc3VsdC9uZXctcmVzdWx0LWNvbnRyb2xsZXInO1xuaW1wb3J0IHthY3Rpdml0eVZpZXdBbGxSZXN1bHRzQ29udHJvbGxlck5hbWUsIGFjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyRGVjbGFyYXRpb259IGZyb20gJy4vdmlldy1hbGwtcmVzdWx0cy92aWV3LWFsbC1yZXN1bHRzLWNvbnRyb2xsZXInO1xuXG5sZXQgYWN0aXZpdHlNb2R1bGVOYW1lID0gJ2FjdGl2aXR5JztcblxuYW5ndWxhci5tb2R1bGUoYWN0aXZpdHlNb2R1bGVOYW1lLCBbXSk7XG5hbmd1bGFyLm1vZHVsZShhY3Rpdml0eU1vZHVsZU5hbWUpLmNvbnRyb2xsZXIoYWN0aXZpdHlMaXN0UmVzdWx0c0NvbnRyb2xsZXJOYW1lLCBhY3Rpdml0eUxpc3RSZXN1bHRzQ29udHJvbGxlckRlY2xhcmF0aW9uKTtcbmFuZ3VsYXIubW9kdWxlKGFjdGl2aXR5TW9kdWxlTmFtZSkuY29udHJvbGxlcihhY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXJOYW1lLCBhY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXJEZWNsYXJhdGlvbik7XG5hbmd1bGFyLm1vZHVsZShhY3Rpdml0eU1vZHVsZU5hbWUpLmNvbnRyb2xsZXIoYWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXJOYW1lLCBhY3Rpdml0eVZpZXdBbGxSZXN1bHRzQ29udHJvbGxlckRlY2xhcmF0aW9uKTtcblxuZXhwb3J0IHthY3Rpdml0eU1vZHVsZU5hbWV9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBBY3Rpdml0eUxpc3RSZXN1bHRzQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRodHRwLCAkbWRUb2FzdCkge1xuICAgICRzY29wZS5hY3Rpdml0eSA9ICRzdGF0ZVBhcmFtcy5hY3Rpdml0eTtcblxuICAgICRzY29wZS5nb1RvID0gKHN0YXRlTmFtZSkgPT4ge1xuICAgICAgJHN0YXRlLmdvKHN0YXRlTmFtZSwge2FjdGl2aXR5OiAkc3RhdGVQYXJhbXMuYWN0aXZpdHl9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmdldFNtYWxsUmVzdWx0SW1hZ2UgPSAocmVzdWx0KSA9PiB7XG4gICAgICBsZXQgcHJlZml4MmltYWdlID0ge1xuICAgICAgICAnc3RhcndhcnMnOiAnYXNzZXRzL2RhcnRoLXZhZGVyX3NtLmpwZycsXG4gICAgICAgICdnb3QnOiAnYXNzZXRzL2RhZW5lcnlzLXRhcmdhcnllbl9zbS5qcGcnLFxuICAgICAgICAnbWF0cml4JzogJ2Fzc2V0cy9uZW9fc20uanBnJyxcbiAgICAgICAgJ2hpbXltJzogJ2Fzc2V0cy9iYXJuZXktc3RpbnNvbl9zbS5qcGcnLFxuICAgICAgICAnYnR0Zic6ICdhc3NldHMvbWFydHktbWNmbHlfc20uanBnJ1xuICAgICAgfTtcbiAgICAgIHJldHVybiBwcmVmaXgyaW1hZ2VbcmVzdWx0LnRlYW1dO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0UmVzdWx0U2NvcmUgPSAocmVzdWx0KSA9PiB7XG4gICAgICBsZXQgc2NvcmUgPSByZXN1bHQuc2NvcmU7XG5cbiAgICAgIGxldCBkYXRlID0gbmV3IERhdGUocmVzdWx0LmNyZWF0ZWRBdCk7XG4gICAgICBkYXRlID0gZGF0ZS5nZXRIb3VycygpICsgJzonICsgZGF0ZS5nZXRNaW51dGVzKCkgKyAnOicgKyBkYXRlLmdldFNlY29uZHMoKTtcblxuICAgICAgcmV0dXJuIHNjb3JlICsgJyAoJyArIGRhdGUgKyAnKSc7XG4gICAgfTtcblxuICAgICRzY29wZS5kZWxldGUgPSAocmVzdWx0KSA9PiB7XG4gICAgICAkaHR0cC5kZWxldGUoJy9hcGkvdjEuMC9hY3Rpdml0aWVzLycgKyAkc3RhdGVQYXJhbXMuYWN0aXZpdHkgKyAnL3Jlc3VsdHMvJyArIHJlc3VsdC5faWQpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICRodHRwLmdldCgnL2FwaS92MS4wL2FjdGl2aXRpZXMvJyArICRzdGF0ZVBhcmFtcy5hY3Rpdml0eSArICcvcmVzdWx0cz9hbGw9dHJ1ZScpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICB9KTtcbiAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgbWVzc2FnZSA9ICdWb3VzIG5cXCdhdmV6IHBhcyBsXFwnYXV0aG9yaXNhdGlvbiBuw6ljZXNzYWlyZSc7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMCkge1xuICAgICAgICAgIG1lc3NhZ2UgPSAnT29wcyBpbCB5IGEgZXUgdW4gc291Y2lzIGF2ZWMgbGUgc2VydmV1cic7XG4gICAgICAgIH1cbiAgICAgICAgJG1kVG9hc3Quc2hvdygkbWRUb2FzdC5zaW1wbGUoKS50ZXh0Q29udGVudChtZXNzYWdlKS5wb3NpdGlvbignYm90dG9tIHJpZ2h0JykuaGlkZURlbGF5KDMwMDApKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkaHR0cC5nZXQoJy9hcGkvdjEuMC9hY3Rpdml0aWVzLycgKyAkc3RhdGVQYXJhbXMuYWN0aXZpdHkgKyAnL3Jlc3VsdHM/YWxsPXRydWUnKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgJHNjb3BlLnJlc3VsdHMgPSByZXNwb25zZS5kYXRhO1xuICAgIH0pO1xuICB9XG59XG5cbmxldCBhY3Rpdml0eUxpc3RSZXN1bHRzQ29udHJvbGxlck5hbWUgPSAnQWN0aXZpdHlMaXN0UmVzdWx0c0NvbnRyb2xsZXInO1xubGV0IGFjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyRGVjbGFyYXRpb24gPSBbXG4gICckc2NvcGUnLFxuICAnJHN0YXRlJyxcbiAgJyRzdGF0ZVBhcmFtcycsXG4gICckaHR0cCcsXG4gICckbWRUb2FzdCcsXG4gIEFjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyXG5dO1xuXG5leHBvcnQge2FjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyTmFtZSwgYWN0aXZpdHlMaXN0UmVzdWx0c0NvbnRyb2xsZXJEZWNsYXJhdGlvbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEFjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRodHRwLCAkbWRUb2FzdCkge1xuICAgICRzY29wZS5hY3Rpdml0eSA9ICRzdGF0ZVBhcmFtcy5hY3Rpdml0eTtcblxuICAgICRzY29wZS5nb1RvID0gKHN0YXRlTmFtZSkgPT4ge1xuICAgICAgJHN0YXRlLmdvKHN0YXRlTmFtZSwge2FjdGl2aXR5OiAkc3RhdGVQYXJhbXMuYWN0aXZpdHl9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnRlYW1zID0gW3tcbiAgICAgIGlkOiAnYnR0ZicsXG4gICAgICBsYWJlbDogJ0JhY2sgdG8gdGhlIGZ1dHVyZSdcbiAgICB9LCB7XG4gICAgICBpZDogJ2dvdCcsXG4gICAgICBsYWJlbDogJ0dhbWUgb2YgVGhyb25lcydcbiAgICB9LCB7XG4gICAgICBpZDogJ2hpbXltJyxcbiAgICAgIGxhYmVsOiAnSG93IEkgbWV0IHlvdXIgbW90aGVyJ1xuICAgIH0sIHtcbiAgICAgIGlkOiAnbWF0cml4JyxcbiAgICAgIGxhYmVsOiAnTWF0cml4J1xuICAgIH0sIHtcbiAgICAgIGlkOiAnc3RhcndhcnMnLFxuICAgICAgbGFiZWw6ICdTdGFyIFdhcnMnXG4gICAgfV07XG5cbiAgICAkc2NvcGUudXNlciA9IHt9O1xuICAgICRzY29wZS51c2VyLnRlYW0gPSAkc2NvcGUudGVhbXNbMF0uaWQ7XG4gICAgJHNjb3BlLnVzZXIucmVzdWx0ID0gMDtcblxuICAgICRzY29wZS5zdWJtaXRSZXN1bHQgPSAoKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgICB0ZWFtOiAkc2NvcGUudXNlci50ZWFtLFxuICAgICAgICBzY29yZTogJHNjb3BlLnVzZXIucmVzdWx0XG4gICAgICB9O1xuICAgICAgJGh0dHAucG9zdCgnL2FwaS92MS4wL2FjdGl2aXRpZXMvJyArICRzdGF0ZVBhcmFtcy5hY3Rpdml0eSArICcvcmVzdWx0cycsIHJlc3VsdCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCdhY3Rpdml0eVZpZXdBbGxSZXN1bHRzJywge2FjdGl2aXR5OiAkc3RhdGVQYXJhbXMuYWN0aXZpdHl9KTtcbiAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgbWVzc2FnZSA9ICdWb3VzIG5cXCdhdmV6IHBhcyBsXFwnYXV0aG9yaXNhdGlvbiBuw6ljZXNzYWlyZSc7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMCkge1xuICAgICAgICAgIG1lc3NhZ2UgPSAnT29wcyBpbCB5IGEgZXUgdW4gc291Y2lzIGF2ZWMgbGUgc2VydmV1cic7XG4gICAgICAgIH1cbiAgICAgICAgJG1kVG9hc3Quc2hvdygkbWRUb2FzdC5zaW1wbGUoKS50ZXh0Q29udGVudChtZXNzYWdlKS5wb3NpdGlvbignYm90dG9tIHJpZ2h0JykuaGlkZURlbGF5KDMwMDApKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cblxubGV0IGFjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlck5hbWUgPSAnQWN0aXZpdHlOZXdSZXN1bHRDb250cm9sbGVyJztcbmxldCBhY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXJEZWNsYXJhdGlvbiA9IFtcbiAgJyRzY29wZScsXG4gICckc3RhdGUnLFxuICAnJHN0YXRlUGFyYW1zJyxcbiAgJyRodHRwJyxcbiAgJyRtZFRvYXN0JyxcbiAgQWN0aXZpdHlOZXdSZXN1bHRDb250cm9sbGVyXG5dO1xuXG5leHBvcnQge2FjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlck5hbWUsIGFjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlckRlY2xhcmF0aW9ufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgQWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgJGNvb2tpZXMsICR0aW1lb3V0KSB7XG4gICAgJHNjb3BlLmFjdGl2aXR5ID0gJHN0YXRlUGFyYW1zLmFjdGl2aXR5O1xuXG4gICAgJHNjb3BlLmdvVG8gPSAoc3RhdGVOYW1lKSA9PiB7XG4gICAgICAkc3RhdGUuZ28oc3RhdGVOYW1lLCB7YWN0aXZpdHk6ICRzdGF0ZVBhcmFtcy5hY3Rpdml0eX0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUuaGFzQVBJS2V5ID0gKCkgPT4ge1xuICAgICAgcmV0dXJuICRjb29raWVzLmdldCgnT0JFT18xMFlFQVJTX0FQSV9LRVknKSAhPT0gdW5kZWZpbmVkO1xuICAgIH07XG5cbiAgICBsZXQgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgJGh0dHAuZ2V0KCcvYXBpL3YxLjAvYWN0aXZpdGllcy8nICsgJHN0YXRlUGFyYW1zLmFjdGl2aXR5ICsgJy9yZXN1bHRzJykudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDAgJiYgZGF0YS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgbGV0IGZpcnN0ID0gZGF0YVswXTtcbiAgICAgICAgICBsZXQgb3RoZXJzID0gW107XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGRhdGEubGVuZ3RoOyBpID0gaSArIDEpIHtcbiAgICAgICAgICAgIG90aGVycy5wdXNoKGRhdGFbaV0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRzY29wZS5maXJzdCA9IGZpcnN0O1xuICAgICAgICAgICRzY29wZS5vdGhlcnMgPSBvdGhlcnM7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB1cGRhdGUoKTtcblxuICAgIGlmICgkc3RhdGVQYXJhbXMucm90YXRpb24pIHtcbiAgICAgIGxldCBhY3Rpdml0eSA9ICRzdGF0ZVBhcmFtcy5hY3Rpdml0eTtcblxuICAgICAgbGV0IG5ld0FjdGl2aXR5ID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKGFjdGl2aXR5ID09PSAnbWFyaW8nKSB7XG4gICAgICAgIG5ld0FjdGl2aXR5ID0gJ2NvY2t0YWlsJztcbiAgICAgIH0gZWxzZSBpZiAoYWN0aXZpdHkgPT09ICdjb2NrdGFpbCcpIHtcbiAgICAgICAgbmV3QWN0aXZpdHkgPSAncXVpenonO1xuICAgICAgfSBlbHNlIGlmIChhY3Rpdml0eSA9PT0gJ3F1aXp6Jykge1xuICAgICAgICBuZXdBY3Rpdml0eSA9ICdiYWJ5Zm9vdCc7XG4gICAgICB9IGVsc2UgaWYgKGFjdGl2aXR5ID09PSAnYmFieWZvb3QnKSB7XG4gICAgICAgIG5ld0FjdGl2aXR5ID0gJ2xlZ28nO1xuICAgICAgfSBlbHNlIGlmIChhY3Rpdml0eSA9PT0gJ2xlZ28nKSB7XG4gICAgICAgIG5ld0FjdGl2aXR5ID0gJ3JvYm90cyc7XG4gICAgICB9IGVsc2UgaWYgKGFjdGl2aXR5ID09PSAncm9ib3RzJykge1xuICAgICAgICAvLyBub3RoaW5nIHRvIGdvIHRvIHRoZSBsZWFkZXJib2FyZFxuICAgICAgfVxuXG4gICAgICBpZiAobmV3QWN0aXZpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAkdGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgJHN0YXRlLmdvKCdhY3Rpdml0eVZpZXdBbGxSZXN1bHRzJywge2FjdGl2aXR5OiBuZXdBY3Rpdml0eSwgcm90YXRpb246ICd0cnVlJ30pO1xuICAgICAgICB9LCAxMDAwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkdGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgJHN0YXRlLmdvKCdsZWFkZXJib2FyZCcsIHtyb3RhdGlvbjogJ3RydWUnfSk7XG4gICAgICAgIH0sIDEwMDAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubGV0IGFjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyTmFtZSA9ICdBY3Rpdml0eVZpZXdBbGxSZXN1bHRzQ29udHJvbGxlcic7XG5sZXQgYWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXJEZWNsYXJhdGlvbiA9IFtcbiAgJyRzY29wZScsXG4gICckc3RhdGUnLFxuICAnJHN0YXRlUGFyYW1zJyxcbiAgJyRodHRwJyxcbiAgJyRjb29raWVzJyxcbiAgJyR0aW1lb3V0JyxcbiAgQWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXJcbl07XG5cbmV4cG9ydCB7YWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXJOYW1lLCBhY3Rpdml0eVZpZXdBbGxSZXN1bHRzQ29udHJvbGxlckRlY2xhcmF0aW9ufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgRGFzaGJvYXJkQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJHN0YXRlKSB7XG4gICAgJHNjb3BlLmdvVG8gPSAoc3RhdGVOYW1lLCBhY3Rpdml0eU5hbWUpID0+IHtcbiAgICAgIGlmIChzdGF0ZU5hbWUgPT09ICdsZWFkZXJib2FyZCcpIHtcbiAgICAgICAgJHN0YXRlLmdvKHN0YXRlTmFtZSwge3JvdGF0aW9uOiAndHJ1ZSd9KTtcbiAgICAgIH0gZWxzZSBpZiAoYWN0aXZpdHlOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgJHN0YXRlLmdvKHN0YXRlTmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc3RhdGUuZ28oc3RhdGVOYW1lLCB7YWN0aXZpdHk6IGFjdGl2aXR5TmFtZX0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxubGV0IGRhc2hib2FyZENvbnRyb2xsZXJOYW1lID0gJ0Rhc2hib2FyZENvbnRyb2xsZXInO1xubGV0IGRhc2hib2FyZENvbnRyb2xsZXJEZWNsYXJhdGlvbiA9IFtcbiAgJyRzY29wZScsXG4gICckc3RhdGUnLFxuICBEYXNoYm9hcmRDb250cm9sbGVyXG5dO1xuXG5leHBvcnQge2Rhc2hib2FyZENvbnRyb2xsZXJOYW1lLCBkYXNoYm9hcmRDb250cm9sbGVyRGVjbGFyYXRpb259O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2Rhc2hib2FyZENvbnRyb2xsZXJOYW1lLCBkYXNoYm9hcmRDb250cm9sbGVyRGVjbGFyYXRpb259IGZyb20gJy4vZGFzaGJvYXJkLWNvbnRyb2xsZXInO1xuXG5sZXQgZGFzaGJvYXJkTW9kdWxlTmFtZSA9ICdkYXNoYm9hcmQnO1xuXG5hbmd1bGFyLm1vZHVsZShkYXNoYm9hcmRNb2R1bGVOYW1lLCBbXSk7XG5hbmd1bGFyLm1vZHVsZShkYXNoYm9hcmRNb2R1bGVOYW1lKS5jb250cm9sbGVyKGRhc2hib2FyZENvbnRyb2xsZXJOYW1lLCBkYXNoYm9hcmRDb250cm9sbGVyRGVjbGFyYXRpb24pO1xuXG5leHBvcnQge2Rhc2hib2FyZE1vZHVsZU5hbWV9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBLZXlDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkc3RhdGUsICRjb29raWVzKSB7XG4gICAgJHNjb3BlLmdvVG8gPSAoc3RhdGVOYW1lKSA9PiB7XG4gICAgICAkc3RhdGUuZ28oc3RhdGVOYW1lKTtcbiAgICB9O1xuXG4gICAgbGV0IGN1cnJlbnRLZXkgPSAkY29va2llcy5nZXQoJ09CRU9fMTBZRUFSU19BUElfS0VZJyk7XG4gICAgaWYgKGN1cnJlbnRLZXkgIT09IHVuZGVmaW5lZCAmJiBjdXJyZW50S2V5Lmxlbmd0aCA+IDApIHtcbiAgICAgICRzY29wZS5rZXkgPSBjdXJyZW50S2V5O1xuICAgIH1cblxuICAgICRzY29wZS5zYXZlID0gKGtleSkgPT4ge1xuICAgICAgJGNvb2tpZXMucHV0KCdPQkVPXzEwWUVBUlNfQVBJX0tFWScsIGtleSk7XG4gICAgICAkc3RhdGUuZ28oJ2Rhc2hib2FyZCcpO1xuICAgIH07XG4gIH1cbn1cblxubGV0IGtleUNvbnRyb2xsZXJOYW1lID0gJ0tleUNvbnRyb2xsZXInO1xubGV0IGtleUNvbnRyb2xsZXJEZWNsYXJhdGlvbiA9IFtcbiAgJyRzY29wZScsXG4gICckc3RhdGUnLFxuICAnJGNvb2tpZXMnLFxuICBLZXlDb250cm9sbGVyXG5dO1xuXG5leHBvcnQge2tleUNvbnRyb2xsZXJOYW1lLCBrZXlDb250cm9sbGVyRGVjbGFyYXRpb259O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2tleUNvbnRyb2xsZXJOYW1lLCBrZXlDb250cm9sbGVyRGVjbGFyYXRpb259IGZyb20gJy4va2V5LWNvbnRyb2xsZXInO1xuXG5sZXQga2V5TW9kdWxlTmFtZSA9ICdrZXknO1xuXG5hbmd1bGFyLm1vZHVsZShrZXlNb2R1bGVOYW1lLCBbXSk7XG5hbmd1bGFyLm1vZHVsZShrZXlNb2R1bGVOYW1lKS5jb250cm9sbGVyKGtleUNvbnRyb2xsZXJOYW1lLCBrZXlDb250cm9sbGVyRGVjbGFyYXRpb24pO1xuXG5leHBvcnQge2tleU1vZHVsZU5hbWV9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBMZWFkZXJib2FyZENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRzdGF0ZSwgJGh0dHAsICR0aW1lb3V0LCAkc3RhdGVQYXJhbXMpIHtcbiAgICAkc2NvcGUuZ29UbyA9IChzdGF0ZU5hbWUpID0+IHtcbiAgICAgICRzdGF0ZS5nbyhzdGF0ZU5hbWUpO1xuICAgIH07XG5cbiAgICBsZXQgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgJGh0dHAuZ2V0KCcvYXBpL3YxLjAvcmVzdWx0cycpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwICYmIGRhdGEubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGxldCBmaXJzdCA9IGRhdGFbMF07XG4gICAgICAgICAgbGV0IG90aGVycyA9IFtdO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBkYXRhLmxlbmd0aDsgaSA9IGkgKyAxKSB7XG4gICAgICAgICAgICBvdGhlcnMucHVzaChkYXRhW2ldKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkc2NvcGUuZmlyc3QgPSBmaXJzdDtcbiAgICAgICAgICAkc2NvcGUub3RoZXJzID0gb3RoZXJzO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdXBkYXRlKCk7XG5cbiAgICBsZXQgc29ja2V0ID0gaW8uY29ubmVjdCgnaHR0cDovL2xvY2FsaG9zdDozMDAwJyk7XG4gICAgc29ja2V0Lm9uKCdyZXN1bHRzX3VwZGF0ZWQnLCBmdW5jdGlvbihtc2cpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdyZWZyZXNoaW5nIHRoZSByZXN1bHRzJyk7XG4gICAgICB1cGRhdGUoKTtcbiAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICB9KTtcblxuICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzaHV0dGluZyBkb3duIHRoZSBjb25uZWN0aW9uJyk7XG4gICAgICBzb2NrZXQuZGlzY29ubmVjdCgpO1xuICAgIH0pO1xuXG4gICAgaWYgKCRzdGF0ZVBhcmFtcy5yb3RhdGlvbikge1xuICAgICAgJHRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ2FjdGl2aXR5Vmlld0FsbFJlc3VsdHMnLCB7YWN0aXZpdHk6ICdtYXJpbycsIHJvdGF0aW9uOiAndHJ1ZSd9KTtcbiAgICAgIH0sIDEwMDAwKTtcbiAgICB9XG4gIH1cbn1cblxubGV0IGxlYWRlcmJvYXJkQ29udHJvbGxlck5hbWUgPSAnTGVhZGVyYm9hcmRDb250cm9sbGVyJztcbmxldCBsZWFkZXJib2FyZENvbnRyb2xsZXJEZWNsYXJhdGlvbiA9IFtcbiAgJyRzY29wZScsXG4gICckc3RhdGUnLFxuICAnJGh0dHAnLFxuICAnJHRpbWVvdXQnLFxuICAnJHN0YXRlUGFyYW1zJyxcbiAgTGVhZGVyYm9hcmRDb250cm9sbGVyXG5dO1xuXG5leHBvcnQge2xlYWRlcmJvYXJkQ29udHJvbGxlck5hbWUsIGxlYWRlcmJvYXJkQ29udHJvbGxlckRlY2xhcmF0aW9ufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtsZWFkZXJib2FyZENvbnRyb2xsZXJOYW1lLCBsZWFkZXJib2FyZENvbnRyb2xsZXJEZWNsYXJhdGlvbn0gZnJvbSAnLi9sZWFkZXJib2FyZC1jb250cm9sbGVyJztcblxubGV0IGxlYWRlcmJvYXJkTW9kdWxlTmFtZSA9ICdsZWFkZXJib2FyZCc7XG5cbmFuZ3VsYXIubW9kdWxlKGxlYWRlcmJvYXJkTW9kdWxlTmFtZSwgW10pO1xuYW5ndWxhci5tb2R1bGUobGVhZGVyYm9hcmRNb2R1bGVOYW1lKS5jb250cm9sbGVyKGxlYWRlcmJvYXJkQ29udHJvbGxlck5hbWUsIGxlYWRlcmJvYXJkQ29udHJvbGxlckRlY2xhcmF0aW9uKTtcblxuZXhwb3J0IHtsZWFkZXJib2FyZE1vZHVsZU5hbWV9O1xuIl19

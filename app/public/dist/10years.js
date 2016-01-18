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
    url: '/leaderboard',
    templateUrl: 'src/sections/leaderboard/leaderboard.html',
    controller: 'LeaderboardController'
  }).state('activityViewAllResults', {
    url: '/activities/:activity',
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
  $mdThemingProvider.theme('quizz').primaryPalette('cyan', { 'default': '800' }).accentPalette('red');
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

var ActivityViewAllResultsController = function ActivityViewAllResultsController($scope, $state, $stateParams, $http, $cookies) {
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
};

var activityViewAllResultsControllerName = 'ActivityViewAllResultsController';
var activityViewAllResultsControllerDeclaration = ['$scope', '$state', '$stateParams', '$http', '$cookies', ActivityViewAllResultsController];

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

var LeaderboardController = function LeaderboardController($scope, $state, $http) {
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
};

var leaderboardControllerName = 'LeaderboardController';
var leaderboardControllerDeclaration = ['$scope', '$state', '$http', LeaderboardController];

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjLzEweWVhcnMuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL2NvbXBvbmVudHMvY29tbW9uL2NvbmZpZ3VyYXRpb24uanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL2NvbXBvbmVudHMvY29tbW9uL2h0dHAtaW50ZXJjZXB0b3Itc2VydmljZS5qcyIsIi9Vc2Vycy9zYmVnYXVkZWF1L0RvY3VtZW50cy9Qcm9qZWN0cy8xMCBZZWFycy9Db2RlL05vZGVTZXJ2ZXIvYXBwL3B1YmxpYy9zcmMvY29tcG9uZW50cy9jb21tb24vbGFyZ2UtY2FyZC1kaXJlY3RpdmUuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL2NvbXBvbmVudHMvY29tbW9uL3NtYWxsLWNhcmQtZGlyZWN0aXZlLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9hY3Rpdml0eS9hY3Rpdml0eS1tb2R1bGUuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL3NlY3Rpb25zL2FjdGl2aXR5L2xpc3QtcmVzdWx0cy9saXN0LXJlc3VsdHMtY29udHJvbGxlci5qcyIsIi9Vc2Vycy9zYmVnYXVkZWF1L0RvY3VtZW50cy9Qcm9qZWN0cy8xMCBZZWFycy9Db2RlL05vZGVTZXJ2ZXIvYXBwL3B1YmxpYy9zcmMvc2VjdGlvbnMvYWN0aXZpdHkvbmV3LXJlc3VsdC9uZXctcmVzdWx0LWNvbnRyb2xsZXIuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL3NlY3Rpb25zL2FjdGl2aXR5L3ZpZXctYWxsLXJlc3VsdHMvdmlldy1hbGwtcmVzdWx0cy1jb250cm9sbGVyLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9kYXNoYm9hcmQvZGFzaGJvYXJkLWNvbnRyb2xsZXIuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL3NlY3Rpb25zL2Rhc2hib2FyZC9kYXNoYm9hcmQtbW9kdWxlLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9rZXkva2V5LWNvbnRyb2xsZXIuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL3NlY3Rpb25zL2tleS9rZXktbW9kdWxlLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9sZWFkZXJib2FyZC9sZWFkZXJib2FyZC1jb250cm9sbGVyLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9sZWFkZXJib2FyZC9sZWFkZXJib2FyZC1tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs2Q0NBa0MsbUNBQW1DOztzREFFTyw4Q0FBOEM7O2tEQUN0RCwwQ0FBMEM7O2tEQUMxQywwQ0FBMEM7O2dEQUU1RSx1Q0FBdUM7O29EQUNyQywyQ0FBMkM7OzhDQUM5QyxxQ0FBcUM7O29DQUMxQywyQkFBMkI7O0FBR3ZELFlBQVksQ0FBQzs7QUFFYixJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUM7Ozs7O0FBSzNCLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQ3pCLFdBQVcsRUFDWCxZQUFZLEVBQ1osWUFBWSxFQUNaLFdBQVcsOE1BS1osQ0FBQyxDQUFDOzs7QUFHSCxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sb0RBQXFCLENBQUM7OztBQUd2RCxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sK0lBQStELENBQUM7QUFDbEcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLCtIQUF1RCxDQUFDO0FBQzVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUywrSEFBdUQsQ0FBQzs7O0FDcEM1RixZQUFZLENBQUM7Ozs7O0FBRWIsSUFBSSxtQkFBbUIsR0FBRyxTQUF0QixtQkFBbUIsQ0FBSSxhQUFhLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFLO0FBQ25HLGVBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7O0FBRW5ELG9CQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFbEMsZ0JBQWMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFHO0FBQ2pDLE9BQUcsRUFBRSxHQUFHO0FBQ1IsZUFBVyxFQUFF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T0FBTyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFVBQVUsMkdBQTZELENBQUM7O1FBRXRHLHFCQUFxQixHQUFyQixxQkFBcUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHttb2R1bGVDb25maWd1cmF0aW9ufSBmcm9tICcuL2NvbXBvbmVudHMvY29tbW9uL2NvbmZpZ3VyYXRpb24nO1xuXG5pbXBvcnQge2h0dHBJbnRlcmNlcHRvclNlcnZpY2VOYW1lLCBodHRwSW50ZXJjZXB0b3JTZXJ2aWNlRGVjbGFyYXRpb259IGZyb20gJy4vY29tcG9uZW50cy9jb21tb24vaHR0cC1pbnRlcmNlcHRvci1zZXJ2aWNlJztcbmltcG9ydCB7c21hbGxDYXJkRGlyZWN0aXZlTmFtZSwgc21hbGxDYXJkRGlyZWN0aXZlRGVjbGFyYXRpb259IGZyb20gJy4vY29tcG9uZW50cy9jb21tb24vc21hbGwtY2FyZC1kaXJlY3RpdmUnO1xuaW1wb3J0IHtsYXJnZUNhcmREaXJlY3RpdmVOYW1lLCBsYXJnZUNhcmREaXJlY3RpdmVEZWNsYXJhdGlvbn0gZnJvbSAnLi9jb21wb25lbnRzL2NvbW1vbi9sYXJnZS1jYXJkLWRpcmVjdGl2ZSc7XG5cbmltcG9ydCB7ZGFzaGJvYXJkTW9kdWxlTmFtZX0gZnJvbSAnLi9zZWN0aW9ucy9kYXNoYm9hcmQvZGFzaGJvYXJkLW1vZHVsZSc7XG5pbXBvcnQge2xlYWRlcmJvYXJkTW9kdWxlTmFtZX0gZnJvbSAnLi9zZWN0aW9ucy9sZWFkZXJib2FyZC9sZWFkZXJib2FyZC1tb2R1bGUnO1xuaW1wb3J0IHthY3Rpdml0eU1vZHVsZU5hbWV9IGZyb20gJy4vc2VjdGlvbnMvYWN0aXZpdHkvYWN0aXZpdHktbW9kdWxlJztcbmltcG9ydCB7a2V5TW9kdWxlTmFtZX0gZnJvbSAnLi9zZWN0aW9ucy9rZXkva2V5LW1vZHVsZSc7XG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5sZXQgbW9kdWxlTmFtZSA9ICcxMHllYXJzJztcblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBtYWluIEFuZ3VsYXIgbW9kdWxlIHVzaW5nIHRoZSBjaGlsZCBtb2R1bGVzIGltcG9ydGVkLlxuICovXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXG4gICd1aS5yb3V0ZXInLFxuICAnbmdNYXRlcmlhbCcsXG4gICduZ01lc3NhZ2VzJyxcbiAgJ25nQ29va2llcycsXG4gIGRhc2hib2FyZE1vZHVsZU5hbWUsXG4gIGxlYWRlcmJvYXJkTW9kdWxlTmFtZSxcbiAgYWN0aXZpdHlNb2R1bGVOYW1lLFxuICBrZXlNb2R1bGVOYW1lXG5dKTtcblxuLy8gSW1wb3J0IHRoZSBjb25maWd1cmF0aW9uIGFuZCBwcmVwYXJlIHRoZSBtb2R1bGUuXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lKS5jb25maWcobW9kdWxlQ29uZmlndXJhdGlvbik7XG5cbi8vIEltcG9ydCB0aGUgY2FyZCBkaXJlY3RpdmVzXG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lKS5zZXJ2aWNlKGh0dHBJbnRlcmNlcHRvclNlcnZpY2VOYW1lLCBodHRwSW50ZXJjZXB0b3JTZXJ2aWNlRGVjbGFyYXRpb24pO1xuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSkuZGlyZWN0aXZlKHNtYWxsQ2FyZERpcmVjdGl2ZU5hbWUsIHNtYWxsQ2FyZERpcmVjdGl2ZURlY2xhcmF0aW9uKTtcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUpLmRpcmVjdGl2ZShsYXJnZUNhcmREaXJlY3RpdmVOYW1lLCBsYXJnZUNhcmREaXJlY3RpdmVEZWNsYXJhdGlvbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbmxldCBtb2R1bGVDb25maWd1cmF0aW9uID0gKCRodHRwUHJvdmlkZXIsICRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlcikgPT4ge1xuICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdIVFRQSW50ZXJjZXB0b3InKTtcblxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2Rhc2hib2FyZCcsICB7XG4gICAgdXJsOiAnLycsXG4gICAgdGVtcGxhdGVVcmw6ICdzcmMvc2VjdGlvbnMvZGFzaGJvYXJkL2Rhc2hib2FyZC5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnRGFzaGJvYXJkQ29udHJvbGxlcidcbiAgfSkuc3RhdGUoJ2xlYWRlcmJvYXJkJywgIHtcbiAgICB1cmw6ICcvbGVhZGVyYm9hcmQnLFxuICAgIHRlbXBsYXRlVXJsOiAnc3JjL3NlY3Rpb25zL2xlYWRlcmJvYXJkL2xlYWRlcmJvYXJkLmh0bWwnLFxuICAgIGNvbnRyb2xsZXI6ICdMZWFkZXJib2FyZENvbnRyb2xsZXInXG4gIH0pLnN0YXRlKCdhY3Rpdml0eVZpZXdBbGxSZXN1bHRzJywgIHtcbiAgICB1cmw6ICcvYWN0aXZpdGllcy86YWN0aXZpdHknLFxuICAgIHRlbXBsYXRlVXJsOiAnc3JjL3NlY3Rpb25zL2FjdGl2aXR5L3ZpZXctYWxsLXJlc3VsdHMvdmlldy1hbGwtcmVzdWx0cy5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnQWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXInXG4gIH0pLnN0YXRlKCdhY3Rpdml0eU5ld1Jlc3VsdCcsICB7XG4gICAgdXJsOiAnL2FjdGl2aXRpZXMvOmFjdGl2aXR5L25ld3Jlc3VsdD9uYW1lJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NyYy9zZWN0aW9ucy9hY3Rpdml0eS9uZXctcmVzdWx0L25ldy1yZXN1bHQuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ0FjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlcidcbiAgfSkuc3RhdGUoJ2FjdGl2aXR5TGlzdFJlc3VsdHMnLCAge1xuICAgIHVybDogJy9hY3Rpdml0aWVzLzphY3Rpdml0eS9saXN0cmVzdWx0cycsXG4gICAgdGVtcGxhdGVVcmw6ICdzcmMvc2VjdGlvbnMvYWN0aXZpdHkvbGlzdC1yZXN1bHRzL2xpc3QtcmVzdWx0cy5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnQWN0aXZpdHlMaXN0UmVzdWx0c0NvbnRyb2xsZXInXG4gIH0pLnN0YXRlKCdrZXknLCAge1xuICAgIHVybDogJy9hcGlrZXknLFxuICAgIHRlbXBsYXRlVXJsOiAnc3JjL3NlY3Rpb25zL2tleS9rZXkuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ0tleUNvbnRyb2xsZXInXG4gIH0pO1xuXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpLnByaW1hcnlQYWxldHRlKCd0ZWFsJykuYWNjZW50UGFsZXR0ZSgncmVkJyk7XG5cbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdtYXJpbycpLnByaW1hcnlQYWxldHRlKCdvcmFuZ2UnLCB7ZGVmYXVsdDogJzgwMCd9KS5hY2NlbnRQYWxldHRlKCdyZWQnKTtcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdjb2NrdGFpbCcpLnByaW1hcnlQYWxldHRlKCdkZWVwLXB1cnBsZScsIHtkZWZhdWx0OiAnNzAwJ30pLmFjY2VudFBhbGV0dGUoJ3JlZCcpO1xuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2JhYnlmb290JykucHJpbWFyeVBhbGV0dGUoJ2dyZWVuJywge2RlZmF1bHQ6ICc4MDAnfSkuYWNjZW50UGFsZXR0ZSgncmVkJyk7XG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnbGVnbycpLnByaW1hcnlQYWxldHRlKCdjeWFuJywge2RlZmF1bHQ6ICc3MDAnfSkuYWNjZW50UGFsZXR0ZSgncmVkJyk7XG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgncm9ib3RzJykucHJpbWFyeVBhbGV0dGUoJ2JsdWUtZ3JleScsIHtkZWZhdWx0OiAnNjAwJ30pLmFjY2VudFBhbGV0dGUoJ3JlZCcpO1xuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ3F1aXp6JykucHJpbWFyeVBhbGV0dGUoJ2N5YW4nLCB7ZGVmYXVsdDogJzgwMCd9KS5hY2NlbnRQYWxldHRlKCdyZWQnKTtcbn07XG5cbmV4cG9ydCB7bW9kdWxlQ29uZmlndXJhdGlvbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmxldCBodHRwSW50ZXJjZXB0b3IgPSAoJGNvb2tpZXMpID0+IHtcbiAgbGV0IHNlcnZpY2UgPSB7fTtcblxuICBzZXJ2aWNlLnJlcXVlc3QgPSBmdW5jdGlvbihjb25maWcpIHtcbiAgICAgIGxldCBrZXkgPSAkY29va2llcy5nZXQoJ09CRU9fMTBZRUFSU19BUElfS0VZJyk7XG4gICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25maWcuaGVhZGVycy5YX09CRU9fMTBZRUFSU19BUElfS0VZID0ga2V5O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbmZpZztcbiAgfTtcblxuICByZXR1cm4gc2VydmljZTtcbn07XG5cbmxldCBodHRwSW50ZXJjZXB0b3JTZXJ2aWNlTmFtZSA9ICdIVFRQSW50ZXJjZXB0b3InO1xubGV0IGh0dHBJbnRlcmNlcHRvclNlcnZpY2VEZWNsYXJhdGlvbiA9IFtcbiAgJyRjb29raWVzJyxcbiAgaHR0cEludGVyY2VwdG9yXG5dO1xuXG5leHBvcnQge2h0dHBJbnRlcmNlcHRvclNlcnZpY2VOYW1lLCBodHRwSW50ZXJjZXB0b3JTZXJ2aWNlRGVjbGFyYXRpb259O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgTGFyZ2VDYXJkRGlyZWN0aXZlID0gKCkgPT4ge1xuICBsZXQgZGlyZWN0aXZlID0ge307XG4gIGRpcmVjdGl2ZS50ZW1wbGF0ZSA9ICc8bWQtY2FyZD4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgPGEgdWktc3JlZj1cImxlYWRlcmJvYXJkXCI+PGltZyBuZy1zcmM9XCJ7e2ltYWdlfX1cIiBjbGFzcz1cIm1kLWNhcmQtaW1hZ2VcIiBhbHQ9XCJ7e25hbWV9fVwiPjwvYT4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgPG1kLWNhcmQtdGl0bGU+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgICAgPG1kLWNhcmQtdGl0bGUtdGV4dD4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICAgIDxzcGFuIGNsYXNzPVwibWQtaGVhZGxpbmVcIj57e25hbWV9fTwvc3Bhbj4ge3tzY29yZX19JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgICAgPC9tZC1jYXJkLXRpdGxlLXRleHQ+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgIDwvbWQtY2FyZC10aXRsZT4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgPG1kLWNhcmQtY29udGVudD4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgPC9tZC1jYXJkLWNvbnRlbnQ+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICc8L21kLWNhcmQ+JztcblxuICBjbGFzcyBMYXJnZUNhcmREaXJlY3RpdmVDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvciAoJHNjb3BlKSB7XG4gICAgICBsZXQgcHJlZml4Mm5hbWUgPSB7XG4gICAgICAgICdzdGFyd2Fycyc6ICdTdGFyIFdhcnMnLFxuICAgICAgICAnZ290JzogJ0dhbWUgb2YgVGhyb25lcycsXG4gICAgICAgICdtYXRyaXgnOiAnTWF0cml4JyxcbiAgICAgICAgJ2hpbXltJzogJ0hvdyBJIG1ldCB5b3VyIG1vdGhlcicsXG4gICAgICAgICdidHRmJzogJ0JhY2sgdG8gdGhlIGZ1dHVyZSdcbiAgICAgIH07XG5cbiAgICAgIGxldCBwcmVmaXgyaW1hZ2UgPSB7XG4gICAgICAgICdzdGFyd2Fycyc6ICdhc3NldHMvZGFydGgtdmFkZXJfbGcuanBnJyxcbiAgICAgICAgJ2dvdCc6ICdhc3NldHMvZGFlbmVyeXMtdGFyZ2FyeWVuX2xnLmpwZycsXG4gICAgICAgICdtYXRyaXgnOiAnYXNzZXRzL25lb19sZy5qcGcnLFxuICAgICAgICAnaGlteW0nOiAnYXNzZXRzL2Jhcm5leS1zdGluc29uX2xnLmpwZycsXG4gICAgICAgICdidHRmJzogJ2Fzc2V0cy9tYXJ0eS1tY2ZseV9sZy5qcGcnXG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuJHdhdGNoKCdyZXN1bHQnLCAobmV3VmFsdWUpID0+IHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAkc2NvcGUubmFtZSA9IHByZWZpeDJuYW1lWyRzY29wZS5yZXN1bHQudGVhbV07XG5cbiAgICAgICAgICBpZiAoJHNjb3BlLnJlc3VsdC5zY29yZSA9PT0gMCkge1xuICAgICAgICAgICAgJHNjb3BlLnNjb3JlID0gJzAgcG9pbnQnO1xuICAgICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLnJlc3VsdC5zY29yZSA9PT0gMSkge1xuICAgICAgICAgICAgJHNjb3BlLnNjb3JlID0gJzEgcG9pbnQnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkc2NvcGUuc2NvcmUgPSAkc2NvcGUucmVzdWx0LnNjb3JlICsgJyBwb2ludHMnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRzY29wZS5pbWFnZSA9IHByZWZpeDJpbWFnZVskc2NvcGUucmVzdWx0LnRlYW1dO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZGlyZWN0aXZlLnNjb3BlID0ge1xuICAgIHJlc3VsdDogJz0nXG4gIH07XG4gIGRpcmVjdGl2ZS5jb250cm9sbGVyID0gWyckc2NvcGUnLCBMYXJnZUNhcmREaXJlY3RpdmVDb250cm9sbGVyXTtcbiAgcmV0dXJuIGRpcmVjdGl2ZTtcbn07XG5cbmxldCBsYXJnZUNhcmREaXJlY3RpdmVOYW1lID0gJ2xhcmdlQ2FyZCc7XG5sZXQgbGFyZ2VDYXJkRGlyZWN0aXZlRGVjbGFyYXRpb24gPSBbXG4gIExhcmdlQ2FyZERpcmVjdGl2ZVxuXTtcblxuZXhwb3J0IHtsYXJnZUNhcmREaXJlY3RpdmVOYW1lLCBsYXJnZUNhcmREaXJlY3RpdmVEZWNsYXJhdGlvbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmxldCBTbWFsbENhcmREaXJlY3RpdmUgPSAoKSA9PiB7XG4gIGxldCBkaXJlY3RpdmUgPSB7fTtcbiAgZGlyZWN0aXZlLnRlbXBsYXRlID0gJzxtZC1jYXJkPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICA8bWQtY2FyZC10aXRsZT4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICA8bWQtY2FyZC10aXRsZS10ZXh0PicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICAgICAgPHNwYW4gY2xhc3M9XCJtZC1oZWFkbGluZVwiPnt7bmFtZX19PC9zcGFuPiB7e3Njb3JlfX0nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICA8L21kLWNhcmQtdGl0bGUtdGV4dD4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICA8bWQtY2FyZC10aXRsZS1tZWRpYT4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICAgIDxkaXYgY2xhc3M9XCJtZC1tZWRpYS1zbSBjYXJkLW1lZGlhXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgICAgICAgIDxpbWcgbmctc3JjPVwie3tpbWFnZX19XCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgICAgICA8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICA8L21kLWNhcmQtdGl0bGUtbWVkaWE+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgIDwvbWQtY2FyZC10aXRsZT4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJzwvbWQtY2FyZD4nO1xuXG4gIGNsYXNzIFNtYWxsQ2FyZERpcmVjdGl2ZUNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yICgkc2NvcGUpIHtcbiAgICAgIGxldCBwcmVmaXgybmFtZSA9IHtcbiAgICAgICAgJ3N0YXJ3YXJzJzogJ1N0YXIgV2FycycsXG4gICAgICAgICdnb3QnOiAnR2FtZSBvZiBUaHJvbmVzJyxcbiAgICAgICAgJ21hdHJpeCc6ICdNYXRyaXgnLFxuICAgICAgICAnaGlteW0nOiAnSG93IEkgbWV0IHlvdXIgbW90aGVyJyxcbiAgICAgICAgJ2J0dGYnOiAnQmFjayB0byB0aGUgZnV0dXJlJ1xuICAgICAgfTtcblxuICAgICAgJHNjb3BlLm5hbWUgPSBwcmVmaXgybmFtZVskc2NvcGUucmVzdWx0LnRlYW1dO1xuXG4gICAgICBpZiAoJHNjb3BlLnJlc3VsdC5zY29yZSA9PT0gMCkge1xuICAgICAgICAkc2NvcGUuc2NvcmUgPSAnMCBwb2ludCc7XG4gICAgICB9IGVsc2UgaWYgKCRzY29wZS5yZXN1bHQuc2NvcmUgPT09IDEpIHtcbiAgICAgICAgJHNjb3BlLnNjb3JlID0gJzEgcG9pbnQnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHNjb3BlLnNjb3JlID0gJHNjb3BlLnJlc3VsdC5zY29yZSArICcgcG9pbnRzJztcbiAgICAgIH1cblxuICAgICAgbGV0IHByZWZpeDJpbWFnZSA9IHtcbiAgICAgICAgJ3N0YXJ3YXJzJzogJ2Fzc2V0cy9kYXJ0aC12YWRlcl9zbS5qcGcnLFxuICAgICAgICAnZ290JzogJ2Fzc2V0cy9kYWVuZXJ5cy10YXJnYXJ5ZW5fc20uanBnJyxcbiAgICAgICAgJ21hdHJpeCc6ICdhc3NldHMvbmVvX3NtLmpwZycsXG4gICAgICAgICdoaW15bSc6ICdhc3NldHMvYmFybmV5LXN0aW5zb25fc20uanBnJyxcbiAgICAgICAgJ2J0dGYnOiAnYXNzZXRzL21hcnR5LW1jZmx5X3NtLmpwZydcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5pbWFnZSA9IHByZWZpeDJpbWFnZVskc2NvcGUucmVzdWx0LnRlYW1dO1xuICAgIH1cbiAgfTtcblxuICBkaXJlY3RpdmUuc2NvcGUgPSB7XG4gICAgcmVzdWx0OiAnPSdcbiAgfTtcbiAgZGlyZWN0aXZlLmNvbnRyb2xsZXIgPSBbJyRzY29wZScsIFNtYWxsQ2FyZERpcmVjdGl2ZUNvbnRyb2xsZXJdO1xuICByZXR1cm4gZGlyZWN0aXZlO1xufTtcblxubGV0IHNtYWxsQ2FyZERpcmVjdGl2ZU5hbWUgPSAnc21hbGxDYXJkJztcbmxldCBzbWFsbENhcmREaXJlY3RpdmVEZWNsYXJhdGlvbiA9IFtcbiAgU21hbGxDYXJkRGlyZWN0aXZlXG5dO1xuXG5leHBvcnQge3NtYWxsQ2FyZERpcmVjdGl2ZU5hbWUsIHNtYWxsQ2FyZERpcmVjdGl2ZURlY2xhcmF0aW9ufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHthY3Rpdml0eUxpc3RSZXN1bHRzQ29udHJvbGxlck5hbWUsIGFjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyRGVjbGFyYXRpb259IGZyb20gJy4vbGlzdC1yZXN1bHRzL2xpc3QtcmVzdWx0cy1jb250cm9sbGVyJztcbmltcG9ydCB7YWN0aXZpdHlOZXdSZXN1bHRDb250cm9sbGVyTmFtZSwgYWN0aXZpdHlOZXdSZXN1bHRDb250cm9sbGVyRGVjbGFyYXRpb259IGZyb20gJy4vbmV3LXJlc3VsdC9uZXctcmVzdWx0LWNvbnRyb2xsZXInO1xuaW1wb3J0IHthY3Rpdml0eVZpZXdBbGxSZXN1bHRzQ29udHJvbGxlck5hbWUsIGFjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyRGVjbGFyYXRpb259IGZyb20gJy4vdmlldy1hbGwtcmVzdWx0cy92aWV3LWFsbC1yZXN1bHRzLWNvbnRyb2xsZXInO1xuXG5sZXQgYWN0aXZpdHlNb2R1bGVOYW1lID0gJ2FjdGl2aXR5JztcblxuYW5ndWxhci5tb2R1bGUoYWN0aXZpdHlNb2R1bGVOYW1lLCBbXSk7XG5hbmd1bGFyLm1vZHVsZShhY3Rpdml0eU1vZHVsZU5hbWUpLmNvbnRyb2xsZXIoYWN0aXZpdHlMaXN0UmVzdWx0c0NvbnRyb2xsZXJOYW1lLCBhY3Rpdml0eUxpc3RSZXN1bHRzQ29udHJvbGxlckRlY2xhcmF0aW9uKTtcbmFuZ3VsYXIubW9kdWxlKGFjdGl2aXR5TW9kdWxlTmFtZSkuY29udHJvbGxlcihhY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXJOYW1lLCBhY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXJEZWNsYXJhdGlvbik7XG5hbmd1bGFyLm1vZHVsZShhY3Rpdml0eU1vZHVsZU5hbWUpLmNvbnRyb2xsZXIoYWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXJOYW1lLCBhY3Rpdml0eVZpZXdBbGxSZXN1bHRzQ29udHJvbGxlckRlY2xhcmF0aW9uKTtcblxuZXhwb3J0IHthY3Rpdml0eU1vZHVsZU5hbWV9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBBY3Rpdml0eUxpc3RSZXN1bHRzQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRodHRwLCAkbWRUb2FzdCkge1xuICAgICRzY29wZS5hY3Rpdml0eSA9ICRzdGF0ZVBhcmFtcy5hY3Rpdml0eTtcblxuICAgICRzY29wZS5nb1RvID0gKHN0YXRlTmFtZSkgPT4ge1xuICAgICAgJHN0YXRlLmdvKHN0YXRlTmFtZSwge2FjdGl2aXR5OiAkc3RhdGVQYXJhbXMuYWN0aXZpdHl9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmdldFNtYWxsUmVzdWx0SW1hZ2UgPSAocmVzdWx0KSA9PiB7XG4gICAgICBsZXQgcHJlZml4MmltYWdlID0ge1xuICAgICAgICAnc3RhcndhcnMnOiAnYXNzZXRzL2RhcnRoLXZhZGVyX3NtLmpwZycsXG4gICAgICAgICdnb3QnOiAnYXNzZXRzL2RhZW5lcnlzLXRhcmdhcnllbl9zbS5qcGcnLFxuICAgICAgICAnbWF0cml4JzogJ2Fzc2V0cy9uZW9fc20uanBnJyxcbiAgICAgICAgJ2hpbXltJzogJ2Fzc2V0cy9iYXJuZXktc3RpbnNvbl9zbS5qcGcnLFxuICAgICAgICAnYnR0Zic6ICdhc3NldHMvbWFydHktbWNmbHlfc20uanBnJ1xuICAgICAgfTtcbiAgICAgIHJldHVybiBwcmVmaXgyaW1hZ2VbcmVzdWx0LnRlYW1dO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0UmVzdWx0U2NvcmUgPSAocmVzdWx0KSA9PiB7XG4gICAgICBsZXQgc2NvcmUgPSByZXN1bHQuc2NvcmU7XG5cbiAgICAgIGxldCBkYXRlID0gbmV3IERhdGUocmVzdWx0LmNyZWF0ZWRBdCk7XG4gICAgICBkYXRlID0gZGF0ZS5nZXRIb3VycygpICsgJzonICsgZGF0ZS5nZXRNaW51dGVzKCkgKyAnOicgKyBkYXRlLmdldFNlY29uZHMoKTtcblxuICAgICAgcmV0dXJuIHNjb3JlICsgJyAoJyArIGRhdGUgKyAnKSc7XG4gICAgfTtcblxuICAgICRzY29wZS5kZWxldGUgPSAocmVzdWx0KSA9PiB7XG4gICAgICAkaHR0cC5kZWxldGUoJy9hcGkvdjEuMC9hY3Rpdml0aWVzLycgKyAkc3RhdGVQYXJhbXMuYWN0aXZpdHkgKyAnL3Jlc3VsdHMvJyArIHJlc3VsdC5faWQpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICRodHRwLmdldCgnL2FwaS92MS4wL2FjdGl2aXRpZXMvJyArICRzdGF0ZVBhcmFtcy5hY3Rpdml0eSArICcvcmVzdWx0cz9hbGw9dHJ1ZScpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICB9KTtcbiAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgbWVzc2FnZSA9ICdWb3VzIG5cXCdhdmV6IHBhcyBsXFwnYXV0aG9yaXNhdGlvbiBuw6ljZXNzYWlyZSc7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMCkge1xuICAgICAgICAgIG1lc3NhZ2UgPSAnT29wcyBpbCB5IGEgZXUgdW4gc291Y2lzIGF2ZWMgbGUgc2VydmV1cic7XG4gICAgICAgIH1cbiAgICAgICAgJG1kVG9hc3Quc2hvdygkbWRUb2FzdC5zaW1wbGUoKS50ZXh0Q29udGVudChtZXNzYWdlKS5wb3NpdGlvbignYm90dG9tIHJpZ2h0JykuaGlkZURlbGF5KDMwMDApKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkaHR0cC5nZXQoJy9hcGkvdjEuMC9hY3Rpdml0aWVzLycgKyAkc3RhdGVQYXJhbXMuYWN0aXZpdHkgKyAnL3Jlc3VsdHM/YWxsPXRydWUnKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgJHNjb3BlLnJlc3VsdHMgPSByZXNwb25zZS5kYXRhO1xuICAgIH0pO1xuICB9XG59XG5cbmxldCBhY3Rpdml0eUxpc3RSZXN1bHRzQ29udHJvbGxlck5hbWUgPSAnQWN0aXZpdHlMaXN0UmVzdWx0c0NvbnRyb2xsZXInO1xubGV0IGFjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyRGVjbGFyYXRpb24gPSBbXG4gICckc2NvcGUnLFxuICAnJHN0YXRlJyxcbiAgJyRzdGF0ZVBhcmFtcycsXG4gICckaHR0cCcsXG4gICckbWRUb2FzdCcsXG4gIEFjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyXG5dO1xuXG5leHBvcnQge2FjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyTmFtZSwgYWN0aXZpdHlMaXN0UmVzdWx0c0NvbnRyb2xsZXJEZWNsYXJhdGlvbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEFjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRodHRwLCAkbWRUb2FzdCkge1xuICAgICRzY29wZS5hY3Rpdml0eSA9ICRzdGF0ZVBhcmFtcy5hY3Rpdml0eTtcblxuICAgICRzY29wZS5nb1RvID0gKHN0YXRlTmFtZSkgPT4ge1xuICAgICAgJHN0YXRlLmdvKHN0YXRlTmFtZSwge2FjdGl2aXR5OiAkc3RhdGVQYXJhbXMuYWN0aXZpdHl9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnRlYW1zID0gW3tcbiAgICAgIGlkOiAnYnR0ZicsXG4gICAgICBsYWJlbDogJ0JhY2sgdG8gdGhlIGZ1dHVyZSdcbiAgICB9LCB7XG4gICAgICBpZDogJ2dvdCcsXG4gICAgICBsYWJlbDogJ0dhbWUgb2YgVGhyb25lcydcbiAgICB9LCB7XG4gICAgICBpZDogJ2hpbXltJyxcbiAgICAgIGxhYmVsOiAnSG93IEkgbWV0IHlvdXIgbW90aGVyJ1xuICAgIH0sIHtcbiAgICAgIGlkOiAnbWF0cml4JyxcbiAgICAgIGxhYmVsOiAnTWF0cml4J1xuICAgIH0sIHtcbiAgICAgIGlkOiAnc3RhcndhcnMnLFxuICAgICAgbGFiZWw6ICdTdGFyIFdhcnMnXG4gICAgfV07XG5cbiAgICAkc2NvcGUudXNlciA9IHt9O1xuICAgICRzY29wZS51c2VyLnRlYW0gPSAkc2NvcGUudGVhbXNbMF0uaWQ7XG4gICAgJHNjb3BlLnVzZXIucmVzdWx0ID0gMDtcblxuICAgICRzY29wZS5zdWJtaXRSZXN1bHQgPSAoKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgICB0ZWFtOiAkc2NvcGUudXNlci50ZWFtLFxuICAgICAgICBzY29yZTogJHNjb3BlLnVzZXIucmVzdWx0XG4gICAgICB9O1xuICAgICAgJGh0dHAucG9zdCgnL2FwaS92MS4wL2FjdGl2aXRpZXMvJyArICRzdGF0ZVBhcmFtcy5hY3Rpdml0eSArICcvcmVzdWx0cycsIHJlc3VsdCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCdhY3Rpdml0eVZpZXdBbGxSZXN1bHRzJywge2FjdGl2aXR5OiAkc3RhdGVQYXJhbXMuYWN0aXZpdHl9KTtcbiAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgbWVzc2FnZSA9ICdWb3VzIG5cXCdhdmV6IHBhcyBsXFwnYXV0aG9yaXNhdGlvbiBuw6ljZXNzYWlyZSc7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMCkge1xuICAgICAgICAgIG1lc3NhZ2UgPSAnT29wcyBpbCB5IGEgZXUgdW4gc291Y2lzIGF2ZWMgbGUgc2VydmV1cic7XG4gICAgICAgIH1cbiAgICAgICAgJG1kVG9hc3Quc2hvdygkbWRUb2FzdC5zaW1wbGUoKS50ZXh0Q29udGVudChtZXNzYWdlKS5wb3NpdGlvbignYm90dG9tIHJpZ2h0JykuaGlkZURlbGF5KDMwMDApKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cblxubGV0IGFjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlck5hbWUgPSAnQWN0aXZpdHlOZXdSZXN1bHRDb250cm9sbGVyJztcbmxldCBhY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXJEZWNsYXJhdGlvbiA9IFtcbiAgJyRzY29wZScsXG4gICckc3RhdGUnLFxuICAnJHN0YXRlUGFyYW1zJyxcbiAgJyRodHRwJyxcbiAgJyRtZFRvYXN0JyxcbiAgQWN0aXZpdHlOZXdSZXN1bHRDb250cm9sbGVyXG5dO1xuXG5leHBvcnQge2FjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlck5hbWUsIGFjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlckRlY2xhcmF0aW9ufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgQWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgJGNvb2tpZXMpIHtcbiAgICAkc2NvcGUuYWN0aXZpdHkgPSAkc3RhdGVQYXJhbXMuYWN0aXZpdHk7XG5cbiAgICAkc2NvcGUuZ29UbyA9IChzdGF0ZU5hbWUpID0+IHtcbiAgICAgICRzdGF0ZS5nbyhzdGF0ZU5hbWUsIHthY3Rpdml0eTogJHN0YXRlUGFyYW1zLmFjdGl2aXR5fSk7XG4gICAgfTtcblxuICAgICRzY29wZS5oYXNBUElLZXkgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gJGNvb2tpZXMuZ2V0KCdPQkVPXzEwWUVBUlNfQVBJX0tFWScpICE9PSB1bmRlZmluZWQ7XG4gICAgfTtcblxuICAgIGxldCB1cGRhdGUgPSAoKSA9PiB7XG4gICAgICAkaHR0cC5nZXQoJy9hcGkvdjEuMC9hY3Rpdml0aWVzLycgKyAkc3RhdGVQYXJhbXMuYWN0aXZpdHkgKyAnL3Jlc3VsdHMnKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCAmJiBkYXRhLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBsZXQgZmlyc3QgPSBkYXRhWzBdO1xuICAgICAgICAgIGxldCBvdGhlcnMgPSBbXTtcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgZGF0YS5sZW5ndGg7IGkgPSBpICsgMSkge1xuICAgICAgICAgICAgb3RoZXJzLnB1c2goZGF0YVtpXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJHNjb3BlLmZpcnN0ID0gZmlyc3Q7XG4gICAgICAgICAgJHNjb3BlLm90aGVycyA9IG90aGVycztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHVwZGF0ZSgpO1xuICB9XG59XG5cbmxldCBhY3Rpdml0eVZpZXdBbGxSZXN1bHRzQ29udHJvbGxlck5hbWUgPSAnQWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXInO1xubGV0IGFjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyRGVjbGFyYXRpb24gPSBbXG4gICckc2NvcGUnLFxuICAnJHN0YXRlJyxcbiAgJyRzdGF0ZVBhcmFtcycsXG4gICckaHR0cCcsXG4gICckY29va2llcycsXG4gIEFjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyXG5dO1xuXG5leHBvcnQge2FjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyTmFtZSwgYWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXJEZWNsYXJhdGlvbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIERhc2hib2FyZENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRzdGF0ZSkge1xuICAgICRzY29wZS5nb1RvID0gKHN0YXRlTmFtZSwgYWN0aXZpdHlOYW1lKSA9PiB7XG4gICAgICBpZiAoYWN0aXZpdHlOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgJHN0YXRlLmdvKHN0YXRlTmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc3RhdGUuZ28oc3RhdGVOYW1lLCB7YWN0aXZpdHk6IGFjdGl2aXR5TmFtZX0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxubGV0IGRhc2hib2FyZENvbnRyb2xsZXJOYW1lID0gJ0Rhc2hib2FyZENvbnRyb2xsZXInO1xubGV0IGRhc2hib2FyZENvbnRyb2xsZXJEZWNsYXJhdGlvbiA9IFtcbiAgJyRzY29wZScsXG4gICckc3RhdGUnLFxuICBEYXNoYm9hcmRDb250cm9sbGVyXG5dO1xuXG5leHBvcnQge2Rhc2hib2FyZENvbnRyb2xsZXJOYW1lLCBkYXNoYm9hcmRDb250cm9sbGVyRGVjbGFyYXRpb259O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2Rhc2hib2FyZENvbnRyb2xsZXJOYW1lLCBkYXNoYm9hcmRDb250cm9sbGVyRGVjbGFyYXRpb259IGZyb20gJy4vZGFzaGJvYXJkLWNvbnRyb2xsZXInO1xuXG5sZXQgZGFzaGJvYXJkTW9kdWxlTmFtZSA9ICdkYXNoYm9hcmQnO1xuXG5hbmd1bGFyLm1vZHVsZShkYXNoYm9hcmRNb2R1bGVOYW1lLCBbXSk7XG5hbmd1bGFyLm1vZHVsZShkYXNoYm9hcmRNb2R1bGVOYW1lKS5jb250cm9sbGVyKGRhc2hib2FyZENvbnRyb2xsZXJOYW1lLCBkYXNoYm9hcmRDb250cm9sbGVyRGVjbGFyYXRpb24pO1xuXG5leHBvcnQge2Rhc2hib2FyZE1vZHVsZU5hbWV9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBLZXlDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkc3RhdGUsICRjb29raWVzKSB7XG4gICAgJHNjb3BlLmdvVG8gPSAoc3RhdGVOYW1lKSA9PiB7XG4gICAgICAkc3RhdGUuZ28oc3RhdGVOYW1lKTtcbiAgICB9O1xuXG4gICAgbGV0IGN1cnJlbnRLZXkgPSAkY29va2llcy5nZXQoJ09CRU9fMTBZRUFSU19BUElfS0VZJyk7XG4gICAgaWYgKGN1cnJlbnRLZXkgIT09IHVuZGVmaW5lZCAmJiBjdXJyZW50S2V5Lmxlbmd0aCA+IDApIHtcbiAgICAgICRzY29wZS5rZXkgPSBjdXJyZW50S2V5O1xuICAgIH1cblxuICAgICRzY29wZS5zYXZlID0gKGtleSkgPT4ge1xuICAgICAgJGNvb2tpZXMucHV0KCdPQkVPXzEwWUVBUlNfQVBJX0tFWScsIGtleSk7XG4gICAgICAkc3RhdGUuZ28oJ2Rhc2hib2FyZCcpO1xuICAgIH07XG4gIH1cbn1cblxubGV0IGtleUNvbnRyb2xsZXJOYW1lID0gJ0tleUNvbnRyb2xsZXInO1xubGV0IGtleUNvbnRyb2xsZXJEZWNsYXJhdGlvbiA9IFtcbiAgJyRzY29wZScsXG4gICckc3RhdGUnLFxuICAnJGNvb2tpZXMnLFxuICBLZXlDb250cm9sbGVyXG5dO1xuXG5leHBvcnQge2tleUNvbnRyb2xsZXJOYW1lLCBrZXlDb250cm9sbGVyRGVjbGFyYXRpb259O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2tleUNvbnRyb2xsZXJOYW1lLCBrZXlDb250cm9sbGVyRGVjbGFyYXRpb259IGZyb20gJy4va2V5LWNvbnRyb2xsZXInO1xuXG5sZXQga2V5TW9kdWxlTmFtZSA9ICdrZXknO1xuXG5hbmd1bGFyLm1vZHVsZShrZXlNb2R1bGVOYW1lLCBbXSk7XG5hbmd1bGFyLm1vZHVsZShrZXlNb2R1bGVOYW1lKS5jb250cm9sbGVyKGtleUNvbnRyb2xsZXJOYW1lLCBrZXlDb250cm9sbGVyRGVjbGFyYXRpb24pO1xuXG5leHBvcnQge2tleU1vZHVsZU5hbWV9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBMZWFkZXJib2FyZENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRzdGF0ZSwgJGh0dHApIHtcbiAgICAkc2NvcGUuZ29UbyA9IChzdGF0ZU5hbWUpID0+IHtcbiAgICAgICRzdGF0ZS5nbyhzdGF0ZU5hbWUpO1xuICAgIH07XG5cbiAgICBsZXQgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgJGh0dHAuZ2V0KCcvYXBpL3YxLjAvcmVzdWx0cycpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwICYmIGRhdGEubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGxldCBmaXJzdCA9IGRhdGFbMF07XG4gICAgICAgICAgbGV0IG90aGVycyA9IFtdO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBkYXRhLmxlbmd0aDsgaSA9IGkgKyAxKSB7XG4gICAgICAgICAgICBvdGhlcnMucHVzaChkYXRhW2ldKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkc2NvcGUuZmlyc3QgPSBmaXJzdDtcbiAgICAgICAgICAkc2NvcGUub3RoZXJzID0gb3RoZXJzO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdXBkYXRlKCk7XG5cbiAgICBsZXQgc29ja2V0ID0gaW8uY29ubmVjdCgnaHR0cDovL2xvY2FsaG9zdDozMDAwJyk7XG4gICAgc29ja2V0Lm9uKCdyZXN1bHRzX3VwZGF0ZWQnLCBmdW5jdGlvbihtc2cpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdyZWZyZXNoaW5nIHRoZSByZXN1bHRzJyk7XG4gICAgICB1cGRhdGUoKTtcbiAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICB9KTtcblxuICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzaHV0dGluZyBkb3duIHRoZSBjb25uZWN0aW9uJyk7XG4gICAgICBzb2NrZXQuZGlzY29ubmVjdCgpO1xuICAgIH0pO1xuICB9XG59XG5cbmxldCBsZWFkZXJib2FyZENvbnRyb2xsZXJOYW1lID0gJ0xlYWRlcmJvYXJkQ29udHJvbGxlcic7XG5sZXQgbGVhZGVyYm9hcmRDb250cm9sbGVyRGVjbGFyYXRpb24gPSBbXG4gICckc2NvcGUnLFxuICAnJHN0YXRlJyxcbiAgJyRodHRwJyxcbiAgTGVhZGVyYm9hcmRDb250cm9sbGVyXG5dO1xuXG5leHBvcnQge2xlYWRlcmJvYXJkQ29udHJvbGxlck5hbWUsIGxlYWRlcmJvYXJkQ29udHJvbGxlckRlY2xhcmF0aW9ufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtsZWFkZXJib2FyZENvbnRyb2xsZXJOYW1lLCBsZWFkZXJib2FyZENvbnRyb2xsZXJEZWNsYXJhdGlvbn0gZnJvbSAnLi9sZWFkZXJib2FyZC1jb250cm9sbGVyJztcblxubGV0IGxlYWRlcmJvYXJkTW9kdWxlTmFtZSA9ICdsZWFkZXJib2FyZCc7XG5cbmFuZ3VsYXIubW9kdWxlKGxlYWRlcmJvYXJkTW9kdWxlTmFtZSwgW10pO1xuYW5ndWxhci5tb2R1bGUobGVhZGVyYm9hcmRNb2R1bGVOYW1lKS5jb250cm9sbGVyKGxlYWRlcmJvYXJkQ29udHJvbGxlck5hbWUsIGxlYWRlcmJvYXJkQ29udHJvbGxlckRlY2xhcmF0aW9uKTtcblxuZXhwb3J0IHtsZWFkZXJib2FyZE1vZHVsZU5hbWV9O1xuIl19

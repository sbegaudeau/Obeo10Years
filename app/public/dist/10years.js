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
  directive.template = '<md-card>' + '  <a ui-sref="leaderboard"><img ng-src="{{image}}" class="md-card-image" alt="Washed Out"></a>' + '  <md-card-title>' + '    <md-card-title-text>' + '      <span class="md-headline">{{name}}</span> {{score}}' + '    </md-card-title-text>' + '  </md-card-title>' + '  <md-card-content>' + '  </md-card-content>' + '</md-card>';

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
    var score = result.score + ' tableaux';
    if (result.score === 0) {
      score = 'Aucun tableau';
    } else if (result.score === 1) {
      score = '1 tableau';
    }

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

var ActivityViewAllResultsController = function ActivityViewAllResultsController($scope, $state, $stateParams, $http) {
  _classCallCheck(this, ActivityViewAllResultsController);

  $scope.activity = $stateParams.activity;

  $scope.goTo = function (stateName) {
    $state.go(stateName, { activity: $stateParams.activity });
  };

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

var activityViewAllResultsControllerName = 'ActivityViewAllResultsController';
var activityViewAllResultsControllerDeclaration = ['$scope', '$state', '$stateParams', '$http', ActivityViewAllResultsController];

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
  if (currentKey !== undefined || currentKey.length > 0) {
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjLzEweWVhcnMuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL2NvbXBvbmVudHMvY29tbW9uL2NvbmZpZ3VyYXRpb24uanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL2NvbXBvbmVudHMvY29tbW9uL2h0dHAtaW50ZXJjZXB0b3Itc2VydmljZS5qcyIsIi9Vc2Vycy9zYmVnYXVkZWF1L0RvY3VtZW50cy9Qcm9qZWN0cy8xMCBZZWFycy9Db2RlL05vZGVTZXJ2ZXIvYXBwL3B1YmxpYy9zcmMvY29tcG9uZW50cy9jb21tb24vbGFyZ2UtY2FyZC1kaXJlY3RpdmUuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL2NvbXBvbmVudHMvY29tbW9uL3NtYWxsLWNhcmQtZGlyZWN0aXZlLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9hY3Rpdml0eS9hY3Rpdml0eS1tb2R1bGUuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL3NlY3Rpb25zL2FjdGl2aXR5L2xpc3QtcmVzdWx0cy9saXN0LXJlc3VsdHMtY29udHJvbGxlci5qcyIsIi9Vc2Vycy9zYmVnYXVkZWF1L0RvY3VtZW50cy9Qcm9qZWN0cy8xMCBZZWFycy9Db2RlL05vZGVTZXJ2ZXIvYXBwL3B1YmxpYy9zcmMvc2VjdGlvbnMvYWN0aXZpdHkvbmV3LXJlc3VsdC9uZXctcmVzdWx0LWNvbnRyb2xsZXIuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL3NlY3Rpb25zL2FjdGl2aXR5L3ZpZXctYWxsLXJlc3VsdHMvdmlldy1hbGwtcmVzdWx0cy1jb250cm9sbGVyLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9kYXNoYm9hcmQvZGFzaGJvYXJkLWNvbnRyb2xsZXIuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL3NlY3Rpb25zL2Rhc2hib2FyZC9kYXNoYm9hcmQtbW9kdWxlLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9rZXkva2V5LWNvbnRyb2xsZXIuanMiLCIvVXNlcnMvc2JlZ2F1ZGVhdS9Eb2N1bWVudHMvUHJvamVjdHMvMTAgWWVhcnMvQ29kZS9Ob2RlU2VydmVyL2FwcC9wdWJsaWMvc3JjL3NlY3Rpb25zL2tleS9rZXktbW9kdWxlLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9sZWFkZXJib2FyZC9sZWFkZXJib2FyZC1jb250cm9sbGVyLmpzIiwiL1VzZXJzL3NiZWdhdWRlYXUvRG9jdW1lbnRzL1Byb2plY3RzLzEwIFllYXJzL0NvZGUvTm9kZVNlcnZlci9hcHAvcHVibGljL3NyYy9zZWN0aW9ucy9sZWFkZXJib2FyZC9sZWFkZXJib2FyZC1tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs2Q0NBa0MsbUNBQW1DOztzREFFTyw4Q0FBOEM7O2tEQUN0RCwwQ0FBMEM7O2tEQUMxQywwQ0FBMEM7O2dEQUU1RSx1Q0FBdUM7O29EQUNyQywyQ0FBMkM7OzhDQUM5QyxxQ0FBcUM7O29DQUMxQywyQkFBMkI7O0FBR3ZELFlBQVksQ0FBQzs7QUFFYixJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUM7Ozs7O0FBSzNCLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQ3pCLFdBQVcsRUFDWCxZQUFZLEVBQ1osWUFBWSxFQUNaLFdBQVcsOE1BS1osQ0FBQyxDQUFDOzs7QUFHSCxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sb0RBQXFCLENBQUM7OztBQUd2RCxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sK0lBQStELENBQUM7QUFDbEcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLCtIQUF1RCxDQUFDO0FBQzVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUywrSEFBdUQsQ0FBQzs7O0FDcEM1RixZQUFZLENBQUM7Ozs7O0FBRWIsSUFBSSxtQkFBbUIsR0FBRyxTQUF0QixtQkFBbUIsQ0FBSSxhQUFhLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFLO0FBQ25HLGVBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7O0FBRW5ELG9CQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFbEMsZ0JBQWMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFHO0FBQ2pDLE9BQUcsRUFBRSxHQUFHO0FBQ1IsZUFBVyxFQUFF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TSxDQUFDO0tBQ3hCO0dBQ0YsQ0FBQyxDQUFDO0NBQ0o7O0FBR0gsSUFBSSx5QkFBeUIsR0FBRyx1QkFBdUIsQ0FBQztBQUN4RCxJQUFJLGdDQUFnQyxHQUFHLENBQ3JDLFFBQVEsRUFDUixRQUFRLEVBQ1IsT0FBTyxFQUNQLHFCQUFxQixDQUN0QixDQUFDOztRQUVNLHlCQUF5QixHQUF6Qix5QkFBeUI7UUFBRSxnQ0FBZ0MsR0FBaEMsZ0NBQWdDOzs7QUNqQ25FLFlBQVksQ0FBQzs7Ozs7O3FDQUU2RCwwQkFBMEI7O0FBRXBHLElBQUkscUJBQXFCLEdBQUcsYUFBYSxDQUFDOztBQUUxQyxPQUFPLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzFDLE9BQU8sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxVQUFVLDJHQUE2RCxDQUFDOztRQUV0RyxxQkFBcUIsR0FBckIscUJBQXFCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7bW9kdWxlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi9jb21wb25lbnRzL2NvbW1vbi9jb25maWd1cmF0aW9uJztcblxuaW1wb3J0IHtodHRwSW50ZXJjZXB0b3JTZXJ2aWNlTmFtZSwgaHR0cEludGVyY2VwdG9yU2VydmljZURlY2xhcmF0aW9ufSBmcm9tICcuL2NvbXBvbmVudHMvY29tbW9uL2h0dHAtaW50ZXJjZXB0b3Itc2VydmljZSc7XG5pbXBvcnQge3NtYWxsQ2FyZERpcmVjdGl2ZU5hbWUsIHNtYWxsQ2FyZERpcmVjdGl2ZURlY2xhcmF0aW9ufSBmcm9tICcuL2NvbXBvbmVudHMvY29tbW9uL3NtYWxsLWNhcmQtZGlyZWN0aXZlJztcbmltcG9ydCB7bGFyZ2VDYXJkRGlyZWN0aXZlTmFtZSwgbGFyZ2VDYXJkRGlyZWN0aXZlRGVjbGFyYXRpb259IGZyb20gJy4vY29tcG9uZW50cy9jb21tb24vbGFyZ2UtY2FyZC1kaXJlY3RpdmUnO1xuXG5pbXBvcnQge2Rhc2hib2FyZE1vZHVsZU5hbWV9IGZyb20gJy4vc2VjdGlvbnMvZGFzaGJvYXJkL2Rhc2hib2FyZC1tb2R1bGUnO1xuaW1wb3J0IHtsZWFkZXJib2FyZE1vZHVsZU5hbWV9IGZyb20gJy4vc2VjdGlvbnMvbGVhZGVyYm9hcmQvbGVhZGVyYm9hcmQtbW9kdWxlJztcbmltcG9ydCB7YWN0aXZpdHlNb2R1bGVOYW1lfSBmcm9tICcuL3NlY3Rpb25zL2FjdGl2aXR5L2FjdGl2aXR5LW1vZHVsZSc7XG5pbXBvcnQge2tleU1vZHVsZU5hbWV9IGZyb20gJy4vc2VjdGlvbnMva2V5L2tleS1tb2R1bGUnO1xuXG5cbid1c2Ugc3RyaWN0JztcblxubGV0IG1vZHVsZU5hbWUgPSAnMTB5ZWFycyc7XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgbWFpbiBBbmd1bGFyIG1vZHVsZSB1c2luZyB0aGUgY2hpbGQgbW9kdWxlcyBpbXBvcnRlZC5cbiAqL1xuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xuICAndWkucm91dGVyJyxcbiAgJ25nTWF0ZXJpYWwnLFxuICAnbmdNZXNzYWdlcycsXG4gICduZ0Nvb2tpZXMnLFxuICBkYXNoYm9hcmRNb2R1bGVOYW1lLFxuICBsZWFkZXJib2FyZE1vZHVsZU5hbWUsXG4gIGFjdGl2aXR5TW9kdWxlTmFtZSxcbiAga2V5TW9kdWxlTmFtZVxuXSk7XG5cbi8vIEltcG9ydCB0aGUgY29uZmlndXJhdGlvbiBhbmQgcHJlcGFyZSB0aGUgbW9kdWxlLlxuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSkuY29uZmlnKG1vZHVsZUNvbmZpZ3VyYXRpb24pO1xuXG4vLyBJbXBvcnQgdGhlIGNhcmQgZGlyZWN0aXZlc1xuYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSkuc2VydmljZShodHRwSW50ZXJjZXB0b3JTZXJ2aWNlTmFtZSwgaHR0cEludGVyY2VwdG9yU2VydmljZURlY2xhcmF0aW9uKTtcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUpLmRpcmVjdGl2ZShzbWFsbENhcmREaXJlY3RpdmVOYW1lLCBzbWFsbENhcmREaXJlY3RpdmVEZWNsYXJhdGlvbik7XG5hbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lKS5kaXJlY3RpdmUobGFyZ2VDYXJkRGlyZWN0aXZlTmFtZSwgbGFyZ2VDYXJkRGlyZWN0aXZlRGVjbGFyYXRpb24pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgbW9kdWxlQ29uZmlndXJhdGlvbiA9ICgkaHR0cFByb3ZpZGVyLCAkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbWRUaGVtaW5nUHJvdmlkZXIpID0+IHtcbiAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnSFRUUEludGVyY2VwdG9yJyk7XG5cbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdkYXNoYm9hcmQnLCAge1xuICAgIHVybDogJy8nLFxuICAgIHRlbXBsYXRlVXJsOiAnc3JjL3NlY3Rpb25zL2Rhc2hib2FyZC9kYXNoYm9hcmQuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ0Rhc2hib2FyZENvbnRyb2xsZXInXG4gIH0pLnN0YXRlKCdsZWFkZXJib2FyZCcsICB7XG4gICAgdXJsOiAnL2xlYWRlcmJvYXJkJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NyYy9zZWN0aW9ucy9sZWFkZXJib2FyZC9sZWFkZXJib2FyZC5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnTGVhZGVyYm9hcmRDb250cm9sbGVyJ1xuICB9KS5zdGF0ZSgnYWN0aXZpdHlWaWV3QWxsUmVzdWx0cycsICB7XG4gICAgdXJsOiAnL2FjdGl2aXRpZXMvOmFjdGl2aXR5JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NyYy9zZWN0aW9ucy9hY3Rpdml0eS92aWV3LWFsbC1yZXN1bHRzL3ZpZXctYWxsLXJlc3VsdHMuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ0FjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyJ1xuICB9KS5zdGF0ZSgnYWN0aXZpdHlOZXdSZXN1bHQnLCAge1xuICAgIHVybDogJy9hY3Rpdml0aWVzLzphY3Rpdml0eS9uZXdyZXN1bHQ/bmFtZScsXG4gICAgdGVtcGxhdGVVcmw6ICdzcmMvc2VjdGlvbnMvYWN0aXZpdHkvbmV3LXJlc3VsdC9uZXctcmVzdWx0Lmh0bWwnLFxuICAgIGNvbnRyb2xsZXI6ICdBY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXInXG4gIH0pLnN0YXRlKCdhY3Rpdml0eUxpc3RSZXN1bHRzJywgIHtcbiAgICB1cmw6ICcvYWN0aXZpdGllcy86YWN0aXZpdHkvbGlzdHJlc3VsdHMnLFxuICAgIHRlbXBsYXRlVXJsOiAnc3JjL3NlY3Rpb25zL2FjdGl2aXR5L2xpc3QtcmVzdWx0cy9saXN0LXJlc3VsdHMuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ0FjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyJ1xuICB9KS5zdGF0ZSgna2V5JywgIHtcbiAgICB1cmw6ICcvYXBpa2V5JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NyYy9zZWN0aW9ucy9rZXkva2V5Lmh0bWwnLFxuICAgIGNvbnRyb2xsZXI6ICdLZXlDb250cm9sbGVyJ1xuICB9KTtcblxuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKS5wcmltYXJ5UGFsZXR0ZSgndGVhbCcpLmFjY2VudFBhbGV0dGUoJ3JlZCcpO1xuXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnbWFyaW8nKS5wcmltYXJ5UGFsZXR0ZSgnb3JhbmdlJywge2RlZmF1bHQ6ICc4MDAnfSkuYWNjZW50UGFsZXR0ZSgncmVkJyk7XG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnY29ja3RhaWwnKS5wcmltYXJ5UGFsZXR0ZSgnZGVlcC1wdXJwbGUnLCB7ZGVmYXVsdDogJzcwMCd9KS5hY2NlbnRQYWxldHRlKCdyZWQnKTtcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdiYWJ5Zm9vdCcpLnByaW1hcnlQYWxldHRlKCdncmVlbicsIHtkZWZhdWx0OiAnODAwJ30pLmFjY2VudFBhbGV0dGUoJ3JlZCcpO1xuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2xlZ28nKS5wcmltYXJ5UGFsZXR0ZSgnY3lhbicsIHtkZWZhdWx0OiAnNzAwJ30pLmFjY2VudFBhbGV0dGUoJ3JlZCcpO1xuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ3JvYm90cycpLnByaW1hcnlQYWxldHRlKCdibHVlLWdyZXknLCB7ZGVmYXVsdDogJzYwMCd9KS5hY2NlbnRQYWxldHRlKCdyZWQnKTtcbn07XG5cbmV4cG9ydCB7bW9kdWxlQ29uZmlndXJhdGlvbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmxldCBodHRwSW50ZXJjZXB0b3IgPSAoJGNvb2tpZXMpID0+IHtcbiAgbGV0IHNlcnZpY2UgPSB7fTtcblxuICBzZXJ2aWNlLnJlcXVlc3QgPSBmdW5jdGlvbihjb25maWcpIHtcbiAgICAgIGxldCBrZXkgPSAkY29va2llcy5nZXQoJ09CRU9fMTBZRUFSU19BUElfS0VZJyk7XG4gICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25maWcuaGVhZGVycy5YX09CRU9fMTBZRUFSU19BUElfS0VZID0ga2V5O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbmZpZztcbiAgfTtcblxuICByZXR1cm4gc2VydmljZTtcbn07XG5cbmxldCBodHRwSW50ZXJjZXB0b3JTZXJ2aWNlTmFtZSA9ICdIVFRQSW50ZXJjZXB0b3InO1xubGV0IGh0dHBJbnRlcmNlcHRvclNlcnZpY2VEZWNsYXJhdGlvbiA9IFtcbiAgJyRjb29raWVzJyxcbiAgaHR0cEludGVyY2VwdG9yXG5dO1xuXG5leHBvcnQge2h0dHBJbnRlcmNlcHRvclNlcnZpY2VOYW1lLCBodHRwSW50ZXJjZXB0b3JTZXJ2aWNlRGVjbGFyYXRpb259O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgTGFyZ2VDYXJkRGlyZWN0aXZlID0gKCkgPT4ge1xuICBsZXQgZGlyZWN0aXZlID0ge307XG4gIGRpcmVjdGl2ZS50ZW1wbGF0ZSA9ICc8bWQtY2FyZD4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgPGEgdWktc3JlZj1cImxlYWRlcmJvYXJkXCI+PGltZyBuZy1zcmM9XCJ7e2ltYWdlfX1cIiBjbGFzcz1cIm1kLWNhcmQtaW1hZ2VcIiBhbHQ9XCJXYXNoZWQgT3V0XCI+PC9hPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICA8bWQtY2FyZC10aXRsZT4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICA8bWQtY2FyZC10aXRsZS10ZXh0PicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICAgICAgPHNwYW4gY2xhc3M9XCJtZC1oZWFkbGluZVwiPnt7bmFtZX19PC9zcGFuPiB7e3Njb3JlfX0nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICA8L21kLWNhcmQtdGl0bGUtdGV4dD4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgPC9tZC1jYXJkLXRpdGxlPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICA8bWQtY2FyZC1jb250ZW50PicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICA8L21kLWNhcmQtY29udGVudD4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJzwvbWQtY2FyZD4nO1xuXG4gIGNsYXNzIExhcmdlQ2FyZERpcmVjdGl2ZUNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yICgkc2NvcGUpIHtcbiAgICAgIGxldCBwcmVmaXgybmFtZSA9IHtcbiAgICAgICAgJ3N0YXJ3YXJzJzogJ1N0YXIgV2FycycsXG4gICAgICAgICdnb3QnOiAnR2FtZSBvZiBUaHJvbmVzJyxcbiAgICAgICAgJ21hdHJpeCc6ICdNYXRyaXgnLFxuICAgICAgICAnaGlteW0nOiAnSG93IEkgbWV0IHlvdXIgbW90aGVyJyxcbiAgICAgICAgJ2J0dGYnOiAnQmFjayB0byB0aGUgZnV0dXJlJ1xuICAgICAgfTtcblxuICAgICAgbGV0IHByZWZpeDJpbWFnZSA9IHtcbiAgICAgICAgJ3N0YXJ3YXJzJzogJ2Fzc2V0cy9kYXJ0aC12YWRlcl9sZy5qcGcnLFxuICAgICAgICAnZ290JzogJ2Fzc2V0cy9kYWVuZXJ5cy10YXJnYXJ5ZW5fbGcuanBnJyxcbiAgICAgICAgJ21hdHJpeCc6ICdhc3NldHMvbmVvX2xnLmpwZycsXG4gICAgICAgICdoaW15bSc6ICdhc3NldHMvYmFybmV5LXN0aW5zb25fbGcuanBnJyxcbiAgICAgICAgJ2J0dGYnOiAnYXNzZXRzL21hcnR5LW1jZmx5X2xnLmpwZydcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS4kd2F0Y2goJ3Jlc3VsdCcsIChuZXdWYWx1ZSkgPT4ge1xuICAgICAgICBpZiAobmV3VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICRzY29wZS5uYW1lID0gcHJlZml4Mm5hbWVbJHNjb3BlLnJlc3VsdC50ZWFtXTtcblxuICAgICAgICAgIGlmICgkc2NvcGUucmVzdWx0LnNjb3JlID09PSAwKSB7XG4gICAgICAgICAgICAkc2NvcGUuc2NvcmUgPSAnMCBwb2ludCc7XG4gICAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUucmVzdWx0LnNjb3JlID09PSAxKSB7XG4gICAgICAgICAgICAkc2NvcGUuc2NvcmUgPSAnMSBwb2ludCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRzY29wZS5zY29yZSA9ICRzY29wZS5yZXN1bHQuc2NvcmUgKyAnIHBvaW50cyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJHNjb3BlLmltYWdlID0gcHJlZml4MmltYWdlWyRzY29wZS5yZXN1bHQudGVhbV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBkaXJlY3RpdmUuc2NvcGUgPSB7XG4gICAgcmVzdWx0OiAnPSdcbiAgfTtcbiAgZGlyZWN0aXZlLmNvbnRyb2xsZXIgPSBbJyRzY29wZScsIExhcmdlQ2FyZERpcmVjdGl2ZUNvbnRyb2xsZXJdO1xuICByZXR1cm4gZGlyZWN0aXZlO1xufTtcblxubGV0IGxhcmdlQ2FyZERpcmVjdGl2ZU5hbWUgPSAnbGFyZ2VDYXJkJztcbmxldCBsYXJnZUNhcmREaXJlY3RpdmVEZWNsYXJhdGlvbiA9IFtcbiAgTGFyZ2VDYXJkRGlyZWN0aXZlXG5dO1xuXG5leHBvcnQge2xhcmdlQ2FyZERpcmVjdGl2ZU5hbWUsIGxhcmdlQ2FyZERpcmVjdGl2ZURlY2xhcmF0aW9ufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubGV0IFNtYWxsQ2FyZERpcmVjdGl2ZSA9ICgpID0+IHtcbiAgbGV0IGRpcmVjdGl2ZSA9IHt9O1xuICBkaXJlY3RpdmUudGVtcGxhdGUgPSAnPG1kLWNhcmQ+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgIDxtZC1jYXJkLXRpdGxlPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICAgIDxtZC1jYXJkLXRpdGxlLXRleHQ+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgICAgICA8c3BhbiBjbGFzcz1cIm1kLWhlYWRsaW5lXCI+e3tuYW1lfX08L3NwYW4+IHt7c2NvcmV9fScgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICAgIDwvbWQtY2FyZC10aXRsZS10ZXh0PicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICAgIDxtZC1jYXJkLXRpdGxlLW1lZGlhPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICAgICAgPGRpdiBjbGFzcz1cIm1kLW1lZGlhLXNtIGNhcmQtbWVkaWFcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICAgICAgPGltZyBuZy1zcmM9XCJ7e2ltYWdlfX1cIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICAgIDwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICAgIDwvbWQtY2FyZC10aXRsZS1tZWRpYT4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgPC9tZC1jYXJkLXRpdGxlPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnPC9tZC1jYXJkPic7XG5cbiAgY2xhc3MgU21hbGxDYXJkRGlyZWN0aXZlQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IgKCRzY29wZSkge1xuICAgICAgbGV0IHByZWZpeDJuYW1lID0ge1xuICAgICAgICAnc3RhcndhcnMnOiAnU3RhciBXYXJzJyxcbiAgICAgICAgJ2dvdCc6ICdHYW1lIG9mIFRocm9uZXMnLFxuICAgICAgICAnbWF0cml4JzogJ01hdHJpeCcsXG4gICAgICAgICdoaW15bSc6ICdIb3cgSSBtZXQgeW91ciBtb3RoZXInLFxuICAgICAgICAnYnR0Zic6ICdCYWNrIHRvIHRoZSBmdXR1cmUnXG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUubmFtZSA9IHByZWZpeDJuYW1lWyRzY29wZS5yZXN1bHQudGVhbV07XG5cbiAgICAgIGlmICgkc2NvcGUucmVzdWx0LnNjb3JlID09PSAwKSB7XG4gICAgICAgICRzY29wZS5zY29yZSA9ICcwIHBvaW50JztcbiAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLnJlc3VsdC5zY29yZSA9PT0gMSkge1xuICAgICAgICAkc2NvcGUuc2NvcmUgPSAnMSBwb2ludCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc2NvcGUuc2NvcmUgPSAkc2NvcGUucmVzdWx0LnNjb3JlICsgJyBwb2ludHMnO1xuICAgICAgfVxuXG4gICAgICBsZXQgcHJlZml4MmltYWdlID0ge1xuICAgICAgICAnc3RhcndhcnMnOiAnYXNzZXRzL2RhcnRoLXZhZGVyX3NtLmpwZycsXG4gICAgICAgICdnb3QnOiAnYXNzZXRzL2RhZW5lcnlzLXRhcmdhcnllbl9zbS5qcGcnLFxuICAgICAgICAnbWF0cml4JzogJ2Fzc2V0cy9uZW9fc20uanBnJyxcbiAgICAgICAgJ2hpbXltJzogJ2Fzc2V0cy9iYXJuZXktc3RpbnNvbl9zbS5qcGcnLFxuICAgICAgICAnYnR0Zic6ICdhc3NldHMvbWFydHktbWNmbHlfc20uanBnJ1xuICAgICAgfTtcblxuICAgICAgJHNjb3BlLmltYWdlID0gcHJlZml4MmltYWdlWyRzY29wZS5yZXN1bHQudGVhbV07XG4gICAgfVxuICB9O1xuXG4gIGRpcmVjdGl2ZS5zY29wZSA9IHtcbiAgICByZXN1bHQ6ICc9J1xuICB9O1xuICBkaXJlY3RpdmUuY29udHJvbGxlciA9IFsnJHNjb3BlJywgU21hbGxDYXJkRGlyZWN0aXZlQ29udHJvbGxlcl07XG4gIHJldHVybiBkaXJlY3RpdmU7XG59O1xuXG5sZXQgc21hbGxDYXJkRGlyZWN0aXZlTmFtZSA9ICdzbWFsbENhcmQnO1xubGV0IHNtYWxsQ2FyZERpcmVjdGl2ZURlY2xhcmF0aW9uID0gW1xuICBTbWFsbENhcmREaXJlY3RpdmVcbl07XG5cbmV4cG9ydCB7c21hbGxDYXJkRGlyZWN0aXZlTmFtZSwgc21hbGxDYXJkRGlyZWN0aXZlRGVjbGFyYXRpb259O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2FjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyTmFtZSwgYWN0aXZpdHlMaXN0UmVzdWx0c0NvbnRyb2xsZXJEZWNsYXJhdGlvbn0gZnJvbSAnLi9saXN0LXJlc3VsdHMvbGlzdC1yZXN1bHRzLWNvbnRyb2xsZXInO1xuaW1wb3J0IHthY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXJOYW1lLCBhY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXJEZWNsYXJhdGlvbn0gZnJvbSAnLi9uZXctcmVzdWx0L25ldy1yZXN1bHQtY29udHJvbGxlcic7XG5pbXBvcnQge2FjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyTmFtZSwgYWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXJEZWNsYXJhdGlvbn0gZnJvbSAnLi92aWV3LWFsbC1yZXN1bHRzL3ZpZXctYWxsLXJlc3VsdHMtY29udHJvbGxlcic7XG5cbmxldCBhY3Rpdml0eU1vZHVsZU5hbWUgPSAnYWN0aXZpdHknO1xuXG5hbmd1bGFyLm1vZHVsZShhY3Rpdml0eU1vZHVsZU5hbWUsIFtdKTtcbmFuZ3VsYXIubW9kdWxlKGFjdGl2aXR5TW9kdWxlTmFtZSkuY29udHJvbGxlcihhY3Rpdml0eUxpc3RSZXN1bHRzQ29udHJvbGxlck5hbWUsIGFjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyRGVjbGFyYXRpb24pO1xuYW5ndWxhci5tb2R1bGUoYWN0aXZpdHlNb2R1bGVOYW1lKS5jb250cm9sbGVyKGFjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlck5hbWUsIGFjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlckRlY2xhcmF0aW9uKTtcbmFuZ3VsYXIubW9kdWxlKGFjdGl2aXR5TW9kdWxlTmFtZSkuY29udHJvbGxlcihhY3Rpdml0eVZpZXdBbGxSZXN1bHRzQ29udHJvbGxlck5hbWUsIGFjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyRGVjbGFyYXRpb24pO1xuXG5leHBvcnQge2FjdGl2aXR5TW9kdWxlTmFtZX07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEFjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsICRtZFRvYXN0KSB7XG4gICAgJHNjb3BlLmFjdGl2aXR5ID0gJHN0YXRlUGFyYW1zLmFjdGl2aXR5O1xuICAgIFxuICAgICRzY29wZS5nb1RvID0gKHN0YXRlTmFtZSkgPT4ge1xuICAgICAgJHN0YXRlLmdvKHN0YXRlTmFtZSwge2FjdGl2aXR5OiAkc3RhdGVQYXJhbXMuYWN0aXZpdHl9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmdldFNtYWxsUmVzdWx0SW1hZ2UgPSAocmVzdWx0KSA9PiB7XG4gICAgICBsZXQgcHJlZml4MmltYWdlID0ge1xuICAgICAgICAnc3RhcndhcnMnOiAnYXNzZXRzL2RhcnRoLXZhZGVyX3NtLmpwZycsXG4gICAgICAgICdnb3QnOiAnYXNzZXRzL2RhZW5lcnlzLXRhcmdhcnllbl9zbS5qcGcnLFxuICAgICAgICAnbWF0cml4JzogJ2Fzc2V0cy9uZW9fc20uanBnJyxcbiAgICAgICAgJ2hpbXltJzogJ2Fzc2V0cy9iYXJuZXktc3RpbnNvbl9zbS5qcGcnLFxuICAgICAgICAnYnR0Zic6ICdhc3NldHMvbWFydHktbWNmbHlfc20uanBnJ1xuICAgICAgfTtcbiAgICAgIHJldHVybiBwcmVmaXgyaW1hZ2VbcmVzdWx0LnRlYW1dO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0UmVzdWx0U2NvcmUgPSAocmVzdWx0KSA9PiB7XG4gICAgICBsZXQgc2NvcmUgPSByZXN1bHQuc2NvcmUgKyAnIHRhYmxlYXV4JztcbiAgICAgIGlmIChyZXN1bHQuc2NvcmUgPT09IDApIHtcbiAgICAgICAgc2NvcmUgPSAnQXVjdW4gdGFibGVhdSc7XG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdC5zY29yZSA9PT0gMSkge1xuICAgICAgICBzY29yZSA9ICcxIHRhYmxlYXUnO1xuICAgICAgfVxuXG4gICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHJlc3VsdC5jcmVhdGVkQXQpO1xuICAgICAgZGF0ZSA9IGRhdGUuZ2V0SG91cnMoKSArICc6JyArIGRhdGUuZ2V0TWludXRlcygpICsgJzonICsgZGF0ZS5nZXRTZWNvbmRzKCk7XG5cbiAgICAgIHJldHVybiBzY29yZSArICcgKCcgKyBkYXRlICsgJyknO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZGVsZXRlID0gKHJlc3VsdCkgPT4ge1xuICAgICAgJGh0dHAuZGVsZXRlKCcvYXBpL3YxLjAvYWN0aXZpdGllcy8nICsgJHN0YXRlUGFyYW1zLmFjdGl2aXR5ICsgJy9yZXN1bHRzLycgKyByZXN1bHQuX2lkKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gdW5kZWZpbmVkO1xuICAgICAgICAkaHR0cC5nZXQoJy9hcGkvdjEuMC9hY3Rpdml0aWVzLycgKyAkc3RhdGVQYXJhbXMuYWN0aXZpdHkgKyAnL3Jlc3VsdHM/YWxsPXRydWUnKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICRzY29wZS5yZXN1bHRzID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgfSk7XG4gICAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSAnVm91cyBuXFwnYXZleiBwYXMgbFxcJ2F1dGhvcmlzYXRpb24gbsOpY2Vzc2FpcmUnO1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDApIHtcbiAgICAgICAgICBtZXNzYWdlID0gJ09vcHMgaWwgeSBhIGV1IHVuIHNvdWNpcyBhdmVjIGxlIHNlcnZldXInO1xuICAgICAgICB9XG4gICAgICAgICRtZFRvYXN0LnNob3coJG1kVG9hc3Quc2ltcGxlKCkudGV4dENvbnRlbnQobWVzc2FnZSkucG9zaXRpb24oJ2JvdHRvbSByaWdodCcpLmhpZGVEZWxheSgzMDAwKSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgJGh0dHAuZ2V0KCcvYXBpL3YxLjAvYWN0aXZpdGllcy8nICsgJHN0YXRlUGFyYW1zLmFjdGl2aXR5ICsgJy9yZXN1bHRzP2FsbD10cnVlJykudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICRzY29wZS5yZXN1bHRzID0gcmVzcG9uc2UuZGF0YTtcbiAgICB9KTtcbiAgfVxufVxuXG5sZXQgYWN0aXZpdHlMaXN0UmVzdWx0c0NvbnRyb2xsZXJOYW1lID0gJ0FjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyJztcbmxldCBhY3Rpdml0eUxpc3RSZXN1bHRzQ29udHJvbGxlckRlY2xhcmF0aW9uID0gW1xuICAnJHNjb3BlJyxcbiAgJyRzdGF0ZScsXG4gICckc3RhdGVQYXJhbXMnLFxuICAnJGh0dHAnLFxuICAnJG1kVG9hc3QnLFxuICBBY3Rpdml0eUxpc3RSZXN1bHRzQ29udHJvbGxlclxuXTtcblxuZXhwb3J0IHthY3Rpdml0eUxpc3RSZXN1bHRzQ29udHJvbGxlck5hbWUsIGFjdGl2aXR5TGlzdFJlc3VsdHNDb250cm9sbGVyRGVjbGFyYXRpb259O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBBY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgJG1kVG9hc3QpIHtcbiAgICAkc2NvcGUuYWN0aXZpdHkgPSAkc3RhdGVQYXJhbXMuYWN0aXZpdHk7XG5cbiAgICAkc2NvcGUuZ29UbyA9IChzdGF0ZU5hbWUpID0+IHtcbiAgICAgICRzdGF0ZS5nbyhzdGF0ZU5hbWUsIHthY3Rpdml0eTogJHN0YXRlUGFyYW1zLmFjdGl2aXR5fSk7XG4gICAgfTtcblxuICAgICRzY29wZS50ZWFtcyA9IFt7XG4gICAgICBpZDogJ2J0dGYnLFxuICAgICAgbGFiZWw6ICdCYWNrIHRvIHRoZSBmdXR1cmUnXG4gICAgfSwge1xuICAgICAgaWQ6ICdnb3QnLFxuICAgICAgbGFiZWw6ICdHYW1lIG9mIFRocm9uZXMnXG4gICAgfSwge1xuICAgICAgaWQ6ICdoaW15bScsXG4gICAgICBsYWJlbDogJ0hvdyBJIG1ldCB5b3VyIG1vdGhlcidcbiAgICB9LCB7XG4gICAgICBpZDogJ21hdHJpeCcsXG4gICAgICBsYWJlbDogJ01hdHJpeCdcbiAgICB9LCB7XG4gICAgICBpZDogJ3N0YXJ3YXJzJyxcbiAgICAgIGxhYmVsOiAnU3RhciBXYXJzJ1xuICAgIH1dO1xuXG4gICAgJHNjb3BlLnVzZXIgPSB7fTtcbiAgICAkc2NvcGUudXNlci50ZWFtID0gJHNjb3BlLnRlYW1zWzBdLmlkO1xuICAgICRzY29wZS51c2VyLnJlc3VsdCA9IDA7XG5cbiAgICAkc2NvcGUuc3VibWl0UmVzdWx0ID0gKCkgPT4ge1xuICAgICAgbGV0IHJlc3VsdCA9IHtcbiAgICAgICAgdGVhbTogJHNjb3BlLnVzZXIudGVhbSxcbiAgICAgICAgc2NvcmU6ICRzY29wZS51c2VyLnJlc3VsdFxuICAgICAgfTtcbiAgICAgICRodHRwLnBvc3QoJy9hcGkvdjEuMC9hY3Rpdml0aWVzLycgKyAkc3RhdGVQYXJhbXMuYWN0aXZpdHkgKyAnL3Jlc3VsdHMnLCByZXN1bHQpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICRzdGF0ZS5nbygnYWN0aXZpdHlWaWV3QWxsUmVzdWx0cycsIHthY3Rpdml0eTogJHN0YXRlUGFyYW1zLmFjdGl2aXR5fSk7XG4gICAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSAnVm91cyBuXFwnYXZleiBwYXMgbFxcJ2F1dGhvcmlzYXRpb24gbsOpY2Vzc2FpcmUnO1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDApIHtcbiAgICAgICAgICBtZXNzYWdlID0gJ09vcHMgaWwgeSBhIGV1IHVuIHNvdWNpcyBhdmVjIGxlIHNlcnZldXInO1xuICAgICAgICB9XG4gICAgICAgICRtZFRvYXN0LnNob3coJG1kVG9hc3Quc2ltcGxlKCkudGV4dENvbnRlbnQobWVzc2FnZSkucG9zaXRpb24oJ2JvdHRvbSByaWdodCcpLmhpZGVEZWxheSgzMDAwKSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG5cbmxldCBhY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXJOYW1lID0gJ0FjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlcic7XG5sZXQgYWN0aXZpdHlOZXdSZXN1bHRDb250cm9sbGVyRGVjbGFyYXRpb24gPSBbXG4gICckc2NvcGUnLFxuICAnJHN0YXRlJyxcbiAgJyRzdGF0ZVBhcmFtcycsXG4gICckaHR0cCcsXG4gICckbWRUb2FzdCcsXG4gIEFjdGl2aXR5TmV3UmVzdWx0Q29udHJvbGxlclxuXTtcblxuZXhwb3J0IHthY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXJOYW1lLCBhY3Rpdml0eU5ld1Jlc3VsdENvbnRyb2xsZXJEZWNsYXJhdGlvbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEFjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHApIHtcbiAgICAkc2NvcGUuYWN0aXZpdHkgPSAkc3RhdGVQYXJhbXMuYWN0aXZpdHk7XG5cbiAgICAkc2NvcGUuZ29UbyA9IChzdGF0ZU5hbWUpID0+IHtcbiAgICAgICRzdGF0ZS5nbyhzdGF0ZU5hbWUsIHthY3Rpdml0eTogJHN0YXRlUGFyYW1zLmFjdGl2aXR5fSk7XG4gICAgfTtcblxuICAgICRodHRwLmdldCgnL2FwaS92MS4wL2FjdGl2aXRpZXMvJyArICRzdGF0ZVBhcmFtcy5hY3Rpdml0eSArICcvcmVzdWx0cycpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDAgJiYgZGF0YS5sZW5ndGggPiAxKSB7XG4gICAgICAgIGxldCBmaXJzdCA9IGRhdGFbMF07XG4gICAgICAgIGxldCBvdGhlcnMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGRhdGEubGVuZ3RoOyBpID0gaSArIDEpIHtcbiAgICAgICAgICBvdGhlcnMucHVzaChkYXRhW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5maXJzdCA9IGZpcnN0O1xuICAgICAgICAkc2NvcGUub3RoZXJzID0gb3RoZXJzO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmxldCBhY3Rpdml0eVZpZXdBbGxSZXN1bHRzQ29udHJvbGxlck5hbWUgPSAnQWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXInO1xubGV0IGFjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyRGVjbGFyYXRpb24gPSBbXG4gICckc2NvcGUnLFxuICAnJHN0YXRlJyxcbiAgJyRzdGF0ZVBhcmFtcycsXG4gICckaHR0cCcsXG4gIEFjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyXG5dO1xuXG5leHBvcnQge2FjdGl2aXR5Vmlld0FsbFJlc3VsdHNDb250cm9sbGVyTmFtZSwgYWN0aXZpdHlWaWV3QWxsUmVzdWx0c0NvbnRyb2xsZXJEZWNsYXJhdGlvbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIERhc2hib2FyZENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRzdGF0ZSkge1xuICAgICRzY29wZS5nb1RvID0gKHN0YXRlTmFtZSwgYWN0aXZpdHlOYW1lKSA9PiB7XG4gICAgICBpZiAoYWN0aXZpdHlOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgJHN0YXRlLmdvKHN0YXRlTmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc3RhdGUuZ28oc3RhdGVOYW1lLCB7YWN0aXZpdHk6IGFjdGl2aXR5TmFtZX0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxubGV0IGRhc2hib2FyZENvbnRyb2xsZXJOYW1lID0gJ0Rhc2hib2FyZENvbnRyb2xsZXInO1xubGV0IGRhc2hib2FyZENvbnRyb2xsZXJEZWNsYXJhdGlvbiA9IFtcbiAgJyRzY29wZScsXG4gICckc3RhdGUnLFxuICBEYXNoYm9hcmRDb250cm9sbGVyXG5dO1xuXG5leHBvcnQge2Rhc2hib2FyZENvbnRyb2xsZXJOYW1lLCBkYXNoYm9hcmRDb250cm9sbGVyRGVjbGFyYXRpb259O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2Rhc2hib2FyZENvbnRyb2xsZXJOYW1lLCBkYXNoYm9hcmRDb250cm9sbGVyRGVjbGFyYXRpb259IGZyb20gJy4vZGFzaGJvYXJkLWNvbnRyb2xsZXInO1xuXG5sZXQgZGFzaGJvYXJkTW9kdWxlTmFtZSA9ICdkYXNoYm9hcmQnO1xuXG5hbmd1bGFyLm1vZHVsZShkYXNoYm9hcmRNb2R1bGVOYW1lLCBbXSk7XG5hbmd1bGFyLm1vZHVsZShkYXNoYm9hcmRNb2R1bGVOYW1lKS5jb250cm9sbGVyKGRhc2hib2FyZENvbnRyb2xsZXJOYW1lLCBkYXNoYm9hcmRDb250cm9sbGVyRGVjbGFyYXRpb24pO1xuXG5leHBvcnQge2Rhc2hib2FyZE1vZHVsZU5hbWV9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBLZXlDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkc3RhdGUsICRjb29raWVzKSB7XG4gICAgJHNjb3BlLmdvVG8gPSAoc3RhdGVOYW1lKSA9PiB7XG4gICAgICAkc3RhdGUuZ28oc3RhdGVOYW1lKTtcbiAgICB9O1xuXG4gICAgbGV0IGN1cnJlbnRLZXkgPSAkY29va2llcy5nZXQoJ09CRU9fMTBZRUFSU19BUElfS0VZJyk7XG4gICAgaWYgKGN1cnJlbnRLZXkgIT09IHVuZGVmaW5lZCB8fCBjdXJyZW50S2V5Lmxlbmd0aCA+IDApIHtcbiAgICAgICRzY29wZS5rZXkgPSBjdXJyZW50S2V5O1xuICAgIH1cblxuICAgICRzY29wZS5zYXZlID0gKGtleSkgPT4ge1xuICAgICAgJGNvb2tpZXMucHV0KCdPQkVPXzEwWUVBUlNfQVBJX0tFWScsIGtleSk7XG4gICAgICAkc3RhdGUuZ28oJ2Rhc2hib2FyZCcpO1xuICAgIH07XG4gIH1cbn1cblxubGV0IGtleUNvbnRyb2xsZXJOYW1lID0gJ0tleUNvbnRyb2xsZXInO1xubGV0IGtleUNvbnRyb2xsZXJEZWNsYXJhdGlvbiA9IFtcbiAgJyRzY29wZScsXG4gICckc3RhdGUnLFxuICAnJGNvb2tpZXMnLFxuICBLZXlDb250cm9sbGVyXG5dO1xuXG5leHBvcnQge2tleUNvbnRyb2xsZXJOYW1lLCBrZXlDb250cm9sbGVyRGVjbGFyYXRpb259O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2tleUNvbnRyb2xsZXJOYW1lLCBrZXlDb250cm9sbGVyRGVjbGFyYXRpb259IGZyb20gJy4va2V5LWNvbnRyb2xsZXInO1xuXG5sZXQga2V5TW9kdWxlTmFtZSA9ICdrZXknO1xuXG5hbmd1bGFyLm1vZHVsZShrZXlNb2R1bGVOYW1lLCBbXSk7XG5hbmd1bGFyLm1vZHVsZShrZXlNb2R1bGVOYW1lKS5jb250cm9sbGVyKGtleUNvbnRyb2xsZXJOYW1lLCBrZXlDb250cm9sbGVyRGVjbGFyYXRpb24pO1xuXG5leHBvcnQge2tleU1vZHVsZU5hbWV9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBMZWFkZXJib2FyZENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRzdGF0ZSwgJGh0dHApIHtcbiAgICAkc2NvcGUuZ29UbyA9IChzdGF0ZU5hbWUpID0+IHtcbiAgICAgICRzdGF0ZS5nbyhzdGF0ZU5hbWUpO1xuICAgIH07XG5cbiAgICAkaHR0cC5nZXQoJy9hcGkvdjEuMC9yZXN1bHRzJykudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCAmJiBkYXRhLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgbGV0IGZpcnN0ID0gZGF0YVswXTtcbiAgICAgICAgbGV0IG90aGVycyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgZGF0YS5sZW5ndGg7IGkgPSBpICsgMSkge1xuICAgICAgICAgIG90aGVycy5wdXNoKGRhdGFbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZpcnN0ID0gZmlyc3Q7XG4gICAgICAgICRzY29wZS5vdGhlcnMgPSBvdGhlcnM7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxubGV0IGxlYWRlcmJvYXJkQ29udHJvbGxlck5hbWUgPSAnTGVhZGVyYm9hcmRDb250cm9sbGVyJztcbmxldCBsZWFkZXJib2FyZENvbnRyb2xsZXJEZWNsYXJhdGlvbiA9IFtcbiAgJyRzY29wZScsXG4gICckc3RhdGUnLFxuICAnJGh0dHAnLFxuICBMZWFkZXJib2FyZENvbnRyb2xsZXJcbl07XG5cbmV4cG9ydCB7bGVhZGVyYm9hcmRDb250cm9sbGVyTmFtZSwgbGVhZGVyYm9hcmRDb250cm9sbGVyRGVjbGFyYXRpb259O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2xlYWRlcmJvYXJkQ29udHJvbGxlck5hbWUsIGxlYWRlcmJvYXJkQ29udHJvbGxlckRlY2xhcmF0aW9ufSBmcm9tICcuL2xlYWRlcmJvYXJkLWNvbnRyb2xsZXInO1xuXG5sZXQgbGVhZGVyYm9hcmRNb2R1bGVOYW1lID0gJ2xlYWRlcmJvYXJkJztcblxuYW5ndWxhci5tb2R1bGUobGVhZGVyYm9hcmRNb2R1bGVOYW1lLCBbXSk7XG5hbmd1bGFyLm1vZHVsZShsZWFkZXJib2FyZE1vZHVsZU5hbWUpLmNvbnRyb2xsZXIobGVhZGVyYm9hcmRDb250cm9sbGVyTmFtZSwgbGVhZGVyYm9hcmRDb250cm9sbGVyRGVjbGFyYXRpb24pO1xuXG5leHBvcnQge2xlYWRlcmJvYXJkTW9kdWxlTmFtZX07XG4iXX0=

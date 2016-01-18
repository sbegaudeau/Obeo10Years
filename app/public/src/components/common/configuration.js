'use strict';

let moduleConfiguration = ($httpProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider) => {
  $httpProvider.interceptors.push('HTTPInterceptor');

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('dashboard',  {
    url: '/',
    templateUrl: 'src/sections/dashboard/dashboard.html',
    controller: 'DashboardController'
  }).state('leaderboard',  {
    url: '/leaderboard',
    templateUrl: 'src/sections/leaderboard/leaderboard.html',
    controller: 'LeaderboardController'
  }).state('activityViewAllResults',  {
    url: '/activities/:activity',
    templateUrl: 'src/sections/activity/view-all-results/view-all-results.html',
    controller: 'ActivityViewAllResultsController'
  }).state('activityNewResult',  {
    url: '/activities/:activity/newresult?name',
    templateUrl: 'src/sections/activity/new-result/new-result.html',
    controller: 'ActivityNewResultController'
  }).state('activityListResults',  {
    url: '/activities/:activity/listresults',
    templateUrl: 'src/sections/activity/list-results/list-results.html',
    controller: 'ActivityListResultsController'
  }).state('key',  {
    url: '/apikey',
    templateUrl: 'src/sections/key/key.html',
    controller: 'KeyController'
  });

  $mdThemingProvider.theme('default').primaryPalette('teal').accentPalette('red');

  $mdThemingProvider.theme('mario').primaryPalette('orange', {default: '800'}).accentPalette('red');
  $mdThemingProvider.theme('cocktail').primaryPalette('deep-purple', {default: '700'}).accentPalette('red');
  $mdThemingProvider.theme('babyfoot').primaryPalette('green', {default: '800'}).accentPalette('red');
  $mdThemingProvider.theme('lego').primaryPalette('cyan', {default: '700'}).accentPalette('red');
  $mdThemingProvider.theme('robots').primaryPalette('blue-grey', {default: '600'}).accentPalette('red');
  $mdThemingProvider.theme('quizz').primaryPalette('blue', {default: '800'}).accentPalette('red');
};

export {moduleConfiguration};

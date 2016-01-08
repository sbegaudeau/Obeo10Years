import {moduleConfiguration} from './components/common/configuration';

import {httpInterceptorServiceName, httpInterceptorServiceDeclaration} from './components/common/http-interceptor-service';
import {smallCardDirectiveName, smallCardDirectiveDeclaration} from './components/common/small-card-directive';
import {largeCardDirectiveName, largeCardDirectiveDeclaration} from './components/common/large-card-directive';

import {dashboardModuleName} from './sections/dashboard/dashboard-module';
import {leaderboardModuleName} from './sections/leaderboard/leaderboard-module';
import {activityModuleName} from './sections/activity/activity-module';
import {keyModuleName} from './sections/key/key-module';


'use strict';

let moduleName = '10years';

/**
 * Creates the main Angular module using the child modules imported.
 */
angular.module(moduleName, [
  'ui.router',
  'ngMaterial',
  'ngMessages',
  'ngCookies',
  dashboardModuleName,
  leaderboardModuleName,
  activityModuleName,
  keyModuleName
]);

// Import the configuration and prepare the module.
angular.module(moduleName).config(moduleConfiguration);

// Import the card directives
angular.module(moduleName).service(httpInterceptorServiceName, httpInterceptorServiceDeclaration);
angular.module(moduleName).directive(smallCardDirectiveName, smallCardDirectiveDeclaration);
angular.module(moduleName).directive(largeCardDirectiveName, largeCardDirectiveDeclaration);

'use strict';

import {dashboardControllerName, dashboardControllerDeclaration} from './dashboard-controller';

let dashboardModuleName = 'dashboard';

angular.module(dashboardModuleName, []);
angular.module(dashboardModuleName).controller(dashboardControllerName, dashboardControllerDeclaration);

export {dashboardModuleName};

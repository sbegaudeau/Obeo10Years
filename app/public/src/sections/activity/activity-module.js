'use strict';

import {activityListResultsControllerName, activityListResultsControllerDeclaration} from './list-results/list-results-controller';
import {activityNewResultControllerName, activityNewResultControllerDeclaration} from './new-result/new-result-controller';
import {activityViewAllResultsControllerName, activityViewAllResultsControllerDeclaration} from './view-all-results/view-all-results-controller';

let activityModuleName = 'activity';

angular.module(activityModuleName, []);
angular.module(activityModuleName).controller(activityListResultsControllerName, activityListResultsControllerDeclaration);
angular.module(activityModuleName).controller(activityNewResultControllerName, activityNewResultControllerDeclaration);
angular.module(activityModuleName).controller(activityViewAllResultsControllerName, activityViewAllResultsControllerDeclaration);

export {activityModuleName};

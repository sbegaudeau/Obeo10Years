'use strict';

import {leaderboardControllerName, leaderboardControllerDeclaration} from './leaderboard-controller';

let leaderboardModuleName = 'leaderboard';

angular.module(leaderboardModuleName, []);
angular.module(leaderboardModuleName).controller(leaderboardControllerName, leaderboardControllerDeclaration);

export {leaderboardModuleName};

'use strict';

import {keyControllerName, keyControllerDeclaration} from './key-controller';

let keyModuleName = 'key';

angular.module(keyModuleName, []);
angular.module(keyModuleName).controller(keyControllerName, keyControllerDeclaration);

export {keyModuleName};

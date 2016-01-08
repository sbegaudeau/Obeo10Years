'use strict';

let httpInterceptor = ($cookies) => {
  let service = {};

  service.request = function(config) {
      let key = $cookies.get('OBEO_10YEARS_API_KEY');
      if (key !== undefined) {
          config.headers.X_OBEO_10YEARS_API_KEY = key;
      }
      return config;
  };

  return service;
};

let httpInterceptorServiceName = 'HTTPInterceptor';
let httpInterceptorServiceDeclaration = [
  '$cookies',
  httpInterceptor
];

export {httpInterceptorServiceName, httpInterceptorServiceDeclaration};

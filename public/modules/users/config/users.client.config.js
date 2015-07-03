'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
    $httpProvider.interceptors.push(function($q, $location) {
      return {
        responseError: function(response) {
          if( $location.path() !== '/users/me' ){

            console.log('intercepted rejection of ', response.config.url, response.status);
            if (response.status === 401) {
              // save the current location so that login can redirect back
              $location.nextAfterLogin = $location.path();
              $location.path('/signin');
            }else if(response.status === 403){
              $location.path('/access_denied');
            }

          }
          return $q.reject(response);
        }
      };
    });
}]);

angular
	.module('app')
	.run(function ($rootScope, $templateCache, $state, $location, authService) {

		$rootScope.$state = $state;
		
		$rootScope.$on('$stateChangeSuccess', function () {
			window.scrollTo(0, 0);
		});
		// set default header
		authService.initToken();
	})
	.config(config)
	.factory('XSRFInterceptor', function() {
		var XSRFInterceptor = {
			request: function(config) {
				var token = readCookie('XSRF-TOKEN');
				if (token) {
					config.headers['X-XSRF-TOKEN'] = token;
				}
				return config;
			}
		};
		return XSRFInterceptor;
	})
	.factory('httpResponseInterceptor', function httpResponseInterceptor($q, $window, $location, $injector) {

		var responseInterceptor = {

			response: function (response) {
				//console.log('response:', response.data);
				var deferred = $q.defer();
				if (response.status === 200) {
					deferred.resolve(response);
				}

				return deferred.promise;
			},
			responseError: function (rejection) {
				if (rejection.status === 401) {
					var authService = $injector.get('authService');
					authService.clearCredential();
					$location.url('/login');
				} else if (rejection.status === 403) {
					// work around for handle unauthorized
					$location.url('/customer/accessdenied');
				}
				return $q.reject(rejection);
			}
		};
		return responseInterceptor;
	});
function configureTemplateFactory($provide) {
	// Set a suffix outside the decorator function 
	var cacheBuster = Date.now().toString();

	function templateFactoryDecorator($delegate) {
		var fromUrl = angular.bind($delegate, $delegate.fromUrl);
		
		$delegate.fromUrl = function (url, params) {
			if (url !== null && angular.isDefined(url)) {
				if (typeof url == 'function') {
					url = url.call(url, params);
				}
				if (angular.isString(url)) {
					url += (url.indexOf("?") === -1 ? "?" : "&");
					url += "v=" + Date.now().toString();
				}
			}
			return fromUrl(url, params);
		};

		return $delegate;
	}
	$provide.decorator('$templateFactory', ['$delegate', templateFactoryDecorator]);

}
angular.module('app').config(['$provide', configureTemplateFactory]);

function config($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, toastrConfig) {

	angular.extend(toastrConfig, {
		timeOut: 1500,
		positionClass: 'toast-bottom-right'
	});

	$httpProvider.interceptors.push('XSRFInterceptor');
	$httpProvider.interceptors.push('httpResponseInterceptor');

	//disable IE ajax request caching
    $httpProvider.defaults.headers.common['If-Modified-Since'] = 'Sun, 25 Jul 2019 11:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.common['Pragma'] = 'no-cache';

	$urlRouterProvider.otherwise("/login");

	$stateProvider
		// Sign in
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html'
		})
		.state('preview', {
			url: '/preview/:p?m',
			templateUrl: 'views/preview.html'
		})
		// Main user portal
		.state('portal', {
			abstract: true,
			url: "/portal",
			templateUrl: "views/layout.html"
		})
		.state('portal.dashboard', {
			url: "/dashboard",
			templateUrl: 'views/dashboard.html'
		})
		.state('portal.news', {
			url: "/news",
			templateUrl: 'views/news/list.html'
		})
		.state('portal.editnews', {
			url: "/editnews",
			params: { obj: null },
			templateUrl: 'views/news/edit.html'
		})
		.state('portal.newscategory', {
			url: "/newscategory",
			templateUrl: 'views/news/category.html'
		})
		.state('portal.download', {
			url: "/download",
			templateUrl: 'views/download/list.html'
		})
		.state('portal.downloadcategory', {
			url: "/downloadcategory",
			templateUrl: 'views/download/category.html'
		})
		.state('portal.downloadsubcategory', {
			url: "/downloadsubcategory",
			params: { obj: null },
			templateUrl: 'views/download/category_sub.html'
		})
		.state('portal.editdoc', {
			url: "/editdoc",
			params: { obj: null },
			templateUrl: 'views/download/edit.html'
		})
		.state('portal.aboutcategory', {
			url: "/aboutcategory",
			templateUrl: 'views/about/category.html'
		})
		.state('portal.appcategory', {
			url: "/appcategory",
			templateUrl: 'views/application/category.html'
		})
		.state('portal.policycategory', {
			url: "/policycategory",
			templateUrl: 'views/policy/category.html'
		})
		.state('portal.aboutcontent', {
			url: "/aboutcontent",
			params: { obj: null },
			templateUrl: 'views/about/edit.html'
		})
		.state('portal.applications', {
			url: "/applications",
			templateUrl: 'views/application/list.html'
		})
		.state('portal.editapplication', {
			url: "/editapplication",
			params: { obj: null },
			templateUrl: 'views/application/edit.html'
		})
		.state('portal.policies', {
			url: "/policies",
			templateUrl: 'views/policy/list.html'
		})
		.state('portal.editpolicy', {
			url: "/editpolicy",
			params: { obj: null },
			templateUrl: 'views/policy/edit.html'
		})
		.state('portal.contact', {
			url: "/contact",
			templateUrl: 'views/contact/list.html'
		})
		.state('portal.contactresp', {
			url: "/response",
			params: { obj: null },
			templateUrl: 'views/contact/response.html'
		})
		.state('portal.faqs', {
			url: "/faqs",
			templateUrl: 'views/faqs/list.html'
		})
		.state('portal.editfaqs', {
			url: "/editfaqs",
			params: { obj: null },
			templateUrl: 'views/faqs/edit.html'
		})
		.state('portal.groups', {
			url: "/groups",
			templateUrl: 'views/user/user-group.html'
		})
		.state('portal.editgroup', {
			url: "/editgroup",
			params: { obj: null },
			templateUrl: 'views/user/edit-group.html'
		})
		.state('portal.adminusers', {
			url: "/adminusers",
			templateUrl: 'views/user/admin-user.html'
		})
		.state('portal.frontusers', {
			url: "/frontusers",
			templateUrl: 'views/user/frontend-user.html'
		})
		.state('portal.addaduser', {
			url: "/addaduser",
			templateUrl: 'views/user/add-admin.html'
		})
		.state('portal.editaduser', {
			url: "/editaduser",
			params: { obj: null },
			templateUrl: 'views/user/edit-admin.html'
		})
		.state('portal.addfeuser', {
			url: "/addfeuser",
			templateUrl: 'views/user/add-frontend-user.html'
		})
		.state('portal.editfeuser', {
			url: "/editfeuser",
			params: { obj: null },
			templateUrl: 'views/user/edit-frontend-user.html'
		})
		.state('portal.activitylog', {
			url: "/activitylog",
			templateUrl: 'views/logs/activity-log.html'
		})
		.state('portal.usagelog', {
			url: "/usagelog",
			templateUrl: 'views/logs/usage-log.html'
		})
	//$locationProvider.html5Mode(true);
}
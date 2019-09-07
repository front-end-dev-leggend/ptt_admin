angular
    .module('app')
    .factory('authService', authService)
    .factory('storageService', storageService)
    .factory('newsService', newsService)
    .factory('dashboardService', dashboardService)
    .factory('downloadService', downloadService)
    .factory('aboutService', aboutService)
    .factory('categoryService', categoryService)
    .factory('applicationService', applicationService)
    .factory('policyService', policyService)
    .factory('contactService', contactService)
    .factory('faqsService', faqsService)
    .factory('previewService', previewService)
    .factory('userService', userService)
    .factory('mediaService', mediaService)
    .factory('logService', logService)

authService.$inject = ['$q', '$http', '$window', 'appSetting', '$http', '$cookies', 'storageService'];

function authService($q, $http, $window, appSetting, $http, $cookies, storageService) {
    var service = {};

    service.authenticate = function (username, password) {
        var deferred = $q.defer();
        
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/auth/token',
            data: {
                Username: username,
                Password: password
            },
            headers: {
                'Content-Type': 'application/json',
                //'X-XSRF-Token': angular.element('input[name="__RequestVerificationToken"]').attr('value')
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };

    service.winauthenicate = function(){
        var deferred = $q.defer();
        
        $http({
            method: 'GET',
            url: appSetting.apiWinauthBaseUrl + '/api/auth/winadminlogin',
            withCredentials :true
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    service.initToken = function (token) {
        //var t = token || $cookies.get('token');
        var t = token || storageService.getVal('token');
        if (t !== undefined)
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + (token || storageService.getVal('token'));//(token || $cookies.get('token'));
        else
            $http.defaults.headers.common['Authorization'] = undefined;

        //$http.defaults.headers.common['X-XSRF-Token'] = angular.element('input[name="__RequestVerificationToken"]').attr('value');
    }

    service.getUserInfo = function () {
        var deferred = $q.defer();
        
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/auth/getUserProfile'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    service.isAuthenticated = function () {
        //return $cookies.get('token');
        return storageService.getVal('token');
    }

    service.clearCredential = function () {
        //console.log('debug token', $cookies.get('token'));
        if ($cookies.get('token') !== undefined) {
            $cookies.remove('token');
            $http.defaults.headers.common['Authorization'] = undefined;
            //console.log('debug removed token', $cookies.get('token'));
        }
        if (storageService.getVal('token') !== undefined) {
            $window.localStorage.clear();
            $http.defaults.headers.common['Authorization'] = undefined;
        }
    }

    service.getUserPermissions = function(){
        var deferred = $q.defer();
        
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/auth/getUserPermissions'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    service.isGranted = function(permissionName){
        var granted = false;

        var myPermission = storageService.getData('permission');
        if (permissionName == "view_about") {
            return myPermission.view_about == 'Y' ? true : false;
        }
        else if (permissionName == "modify_about") {
            return myPermission.modify_about == 'Y' ? true : false;
        }
        else if (permissionName == "view_category_applications"){
            return myPermission.view_category_applications == 'Y' ? true : false;
        }
        else if (permissionName == "modify_category_applications"){
            return myPermission.modify_category_applications == 'Y' ? true : false;
        }
        else if (permissionName == "view_applications"){
            return myPermission.view_applications == 'Y' ? true : false;
        }
        else if (permissionName == "modify_applications"){
            return myPermission.modify_applications == 'Y' ? true : false;
        }
        else if (permissionName == "view_category_news"){
            return myPermission.view_category_news == 'Y' ? true : false;
        }
        else if (permissionName == "modify_category_news"){
            return myPermission.modify_category_news == 'Y' ? true : false;
        }
        else if (permissionName == "view_news"){
            return myPermission.view_news == 'Y' ? true : false;
        }
        else if (permissionName == "modify_news"){
            return myPermission.modify_news == 'Y' ? true : false;
        }

        else if (permissionName == "view_category_policy"){
            return myPermission.view_category_policy == 'Y' ? true : false;
        }
        else if (permissionName == "modify_category_policy"){
            return myPermission.modify_category_policy == 'Y' ? true : false;
        }
        else if (permissionName == "view_policy"){
            return myPermission.view_policy == 'Y' ? true : false;
        }
        else if (permissionName == "modify_policy"){
            return myPermission.modify_policy == 'Y' ? true : false;
        }

        else if (permissionName == "view_category_download"){
            return myPermission.view_category_download == 'Y' ? true : false;
        }
        else if (permissionName == "modify_category_download"){
            return myPermission.modify_category_download == 'Y' ? true : false;
        }
        else if (permissionName == "view_download"){
            return myPermission.view_download == 'Y' ? true : false;
        }
        else if (permissionName == "modify_download"){
            return myPermission.modify_download == 'Y' ? true : false;
        }

        else if (permissionName == "view_contactlist"){
            return myPermission.view_contactlist == 'Y' ? true : false;
        }
        else if (permissionName == "modify_contactlist"){
            return myPermission.modify_contactlist == 'Y' ? true : false;
        }

        else if (permissionName == "view_faqs"){
            return myPermission.view_faqs == 'Y' ? true : false;
        }
        else if (permissionName == "modify_faqs"){
            return myPermission.modify_faqs == 'Y' ? true : false;
        }

        else if (permissionName == "view_usergroup"){
            return myPermission.view_usergroup == 'Y' ? true : false;
        }
        else if (permissionName == "modify_usergroup"){
            return myPermission.modify_usergroup == 'Y' ? true : false;
        }
        else if (permissionName == "view_adminuser"){
            return myPermission.view_adminuser == 'Y' ? true : false;
        }
        else if (permissionName == "modify_adminuser"){
            return myPermission.modify_adminuser == 'Y' ? true : false;
        }
        else if (permissionName == "view_frontenduser"){
            return myPermission.view_frontenduser == 'Y' ? true : false;
        }
        else if (permissionName == "modify_frontenduser"){
            return myPermission.modify_frontenduser == 'Y' ? true : false;
        }

        else if (permissionName == "view_activity_log"){
            return myPermission.view_activity_log == 'Y' ? true : false;
        }
        else if (permissionName == "view_usage_log"){
            return myPermission.view_usage_log == 'Y' ? true : false;
        }
        else if (permissionName == "modify_activity_log"){
            return myPermission.modify_activity_log == 'Y' ? true : false;
        }
        else if (permissionName == "modify_usage_log"){
            return myPermission.modify_usage_log == 'Y' ? true : false;
        }

        return granted;
    }

    return service;
}

storageService.$inject = ['$window'];
function storageService($window) {
    return {
        setData: function (key, val) {
            $window.localStorage && $window.localStorage.setItem(key, JSON.stringify(val));
            return this;
        },
        getData: function (key) {
            return $window.localStorage && JSON.parse($window.localStorage.getItem(key));
        },
        setVal: function (key, val){
            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        },
        getVal: function (key) {
            return $window.localStorage && $window.localStorage.getItem(key);
        }
    };
}

newsService.$inject = ['$q', '$http', 'appSetting'];
function newsService($q, $http, appSetting) {
    var service = {};

    service.getNewsSearchCriteria = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/news/getNewsSearchCriteria'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.searchNews = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/news/searchNews',
            data: {
                topic: obj.topic,
                categoryID: obj.selectedCategory.id,
                documentDateFrom: obj.dateFrom,
                documentDateTo: obj.dateTo,
                status: obj.selectedStatus,
                accessGroupID: obj.selectedPermission.id,
                pageSize: obj.pageSize,
                pageNumber: obj.pageNumber,
                sortingOrder: obj.sortingOrder,
                reverse: obj.reverse ? "desc" : "asc"
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.updateNewsPriority = function (newsID, priority) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/news/updateNewsPriority',
            data: {
                id: newsID,
                priority: priority
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.updateNewsStatus = function (newsID, status) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/news/updateNewsStatus',
            data: {
                id: newsID,
                status: status
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.deleteNews = function (ids) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/news/deleteNews',
            data: {
                newsIDs: ids
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.deleteNewsImages = function (ids) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/news/deleteNewImages',
            data: {
                id: ids
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getNewsMaster = function (ids) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/news/getNewsMaster'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getEditNewsByID = function (newsID) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/news/getEditNewsByID',
            data: {
                id: newsID
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.saveNews = function (fd) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/news/saveNews',
            data: obj
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    
    return service;
}

downloadService.$inject = ['$q', '$http', 'appSetting'];
function downloadService($q, $http, appSetting) {
    var service = {};

    service.getDocumentSearchCriteria = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/download/getDocumentSearchCriteria'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.searchDocuments = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/download/searchDocuments',
            data: {
                topic: obj.topic,
                categoryID: obj.selectedCategory.id,
                documentDateFrom: obj.dateFrom,
                documentDateTo: obj.dateTo,
                status: obj.selectedStatus,
                documentStatus: obj.selectedSyncStatus,
                accessGroupID: obj.selectedPermission.id,
                pageSize: obj.pageSize,
                pageNumber: obj.pageNumber,
                sortingOrder: obj.sortingOrder,
                reverse: obj.reverse ? "desc" : "asc"
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.updateDocumentPriority = function (newsID, priority) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/download/updateDocumentPriority',
            data: {
                id: newsID,
                priority: priority
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.updateDocumentStatus = function (newsID, status) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/download/updateDocumentStatus',
            data: {
                id: newsID,
                status: status
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.deleteDocuments = function (ids) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/download/deleteDocuments',
            data: {
                documentIDs: ids
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getDocumentMaster = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/download/getDocumentMaster'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getEditDocumentByID = function (documentID) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/download/getEditDocumentByID',
            data: {
                id: documentID
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.saveDocument = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/download/saveDocument',
            data: obj
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    
    service.deleteDocumentFiles = function (ids) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/download/deleteDocumentFiles',
            data: {
                id: ids
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    return service;
}

dashboardService.$inject = ['$q', '$http', 'appSetting'];
function dashboardService($q, $http, appSetting) {
    var service = {};

    service.getDashboardSummary = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/dashboard/getDashboardSummary'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    return service;
}

categoryService.$inject = ['$q', '$http', 'appSetting'];
function categoryService($q, $http, appSetting) {
    var service = {};
    service.getCategoryTypes = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/category/getCategoryTypes'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getAboutCategories = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/about/getAboutCategories'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getApplicationCategories = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/category/getCategories/Applications'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getPolicyCategories = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/category/getCategories/Policy And Target'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getNewsCategories = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/category/getCategories/News'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getDownloadCategories = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/category/getCategories/Download'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.updateCategoryStatus = function (categoryID, status) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/category/updateCategoryStatus',
            data: {
                categoryID: categoryID,
                status: status
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.deleteCategory = function (objs) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/category/deleteCategory',
            data: {
                deleteObjs: objs
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.updateCategoryPriority = function (categoryID, priority) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/category/updateCategoryPriority',
            data: {
                categoryID: categoryID,
                priority: priority
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getSubCategories = function (categoryID) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/category/getSubCategories/' + categoryID
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.updateSubCategoryStatus = function (subCategoryID, status) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/category/updateSubCategoryStatus',
            data: {
                subCategoryID: subCategoryID,
                status: status
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.updateSubCategoryPriority = function (subCategoryID, priority) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/category/updateSubCategoryPriority',
            data: {
                subCategoryID: subCategoryID,
                priority: priority
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.saveSubCategory = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/category/saveSubCategory',
            data: obj
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.deleteSubCategory = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/category/deleteSubCategory',
            data: {
                deleteObjs: obj
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    return service;
}

aboutService.$inject = ['$q', '$http', 'appSetting'];
function aboutService($q, $http, appSetting) {
    var service = {};
    
    service.getAboutMaster = function (categoryID) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/about/getAboutMaster'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getAboutContent = function (categoryID) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/about/getAboutContent/' + categoryID
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.updateAboutContent = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/about/updateAboutContent',
            data: obj
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.deleteAboutContent = function (categoryID) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/about/deleteAboutContent/' + categoryID
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.deleteAboutContents = function (categoryIDs) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/about/deleteAboutContents',
            data: {
                CategoryIDs: categoryIDs
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    return service;
}

applicationService.$inject = ['$q', '$http', 'appSetting'];
function applicationService($q, $http, appSetting) {
    var service = {};
    service.getApplicationSearchCriteria = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/application/getApplicationSearchCriteria'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.searchApplications = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/application/searchApplications',
            data: {
                applicationName: obj.applicationName,
                categoryID: obj.selectedCategory.id,
                status: obj.selectedStatus,
                accessGroupID: obj.selectedPermission.id,
                pageSize: obj.pageSize,
                pageNumber: obj.pageNumber,
                sortingOrder: obj.sortingOrder,
                reverse: obj.reverse ? "desc" : "asc"
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.updateApplicationPriority = function (applicationID, priority) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/application/updateApplicationPriority',
            data: {
                id: applicationID,
                priority: priority
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.deleteApplications = function (ids) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/application/deleteApplications',
            data: {
                ApplicationIDs: ids
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    
    service.getApplicationMaster = function (ids) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/application/getApplicationMaster'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getEditApplicationsByID = function (applicationID) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/application/getEditApplicationsByID/' + applicationID
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.saveApplications = function(postObj){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/application/saveApplications',
            data: postObj
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
    return service;
}

policyService.$inject = ['$q', '$http', 'appSetting'];
function policyService($q, $http, appSetting) {
    var service = {};
    service.getPolicySearchCriteria = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/policy/getPolicySearchCriteria'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.searchPolicies = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/policy/searchPolicy',
            data: {
                topic: obj.topic,
                categoryID: obj.selectedCategory.id,
                status: obj.selectedStatus,
                accessGroupID: obj.selectedPermission.id,
                pageSize: obj.pageSize,
                pageNumber: obj.pageNumber,
                documentDateFrom: obj.dateFrom,
                documentDateTo: obj.dateTo,
                sortingOrder: obj.sortingOrder,
                reverse: obj.reverse ? "desc" : "asc"
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.updatePolicyPriority = function (policyID, priority) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/policy/updatePolicyPriority',
            data: {
                id: policyID,
                priority: priority
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.deletePolicies = function (ids) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/policy/deletePolicies',
            data: {
                policyIDs: ids
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    
    service.getPolicyMaster = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/policy/getPolicyMaster'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getEditPolicyByID = function (policyID) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/policy/getEditPolicyByID',
            data: {
                id: policyID
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.savePolicy = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/policy/savePolicy',
            data: obj
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    return service;
}

contactService.$inject = ['$q', '$http', 'appSetting'];
function contactService($q, $http, appSetting) {
    var service = {};

    service.searchContactList = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/contact/searchContactList',
            data: {
                fullName: obj.fullName,
                pageSize: obj.pageSize,
                pageNumber: obj.pageNumber,
                sortingOrder: obj.sortingOrder,
                reverse: obj.reverse ? "desc" : "asc"
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.deleteContacts = function (ids) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/contact/deleteContacts',
            data: {
                contactIDs: ids
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.saveContactResponse = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/contact/saveContactResponse',
            data: obj
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getContactByID = function (id) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/contact/getContact/' + id
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    return service;
}

faqsService.$inject = ['$q', '$http', 'appSetting'];
function faqsService($q, $http, appSetting) {
    var service = {};

    service.getFAQSearchCriteria = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/faqs/getFAQSearchCriteria'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.searchFAQs = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/faqs/searchFAQ',
            data: {
                question: obj.question,
                status: obj.selectedStatus,
                accessGroupID: obj.selectedPermission.id,
                pageSize: obj.pageSize,
                pageNumber: obj.pageNumber,
                sortingOrder: obj.sortingOrder,
                reverse: obj.reverse ? "desc" : "asc"
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.updateFAQPriority = function (id, priority) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/faqs/updateFAQPriority',
            data: {
                id: id,
                priority: priority
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.updateFAQStatus = function (id, status) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/faqs/updateFAQStatus',
            data: {
                id: id,
                status: status
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.deleteFAQs = function (ids) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/faqs/deleteFAQs',
            data: {
                fAQIDs: ids
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getFAQMaster = function (ids) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/faqs/getFAQMaster'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getEditFAQByID = function (id) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/faqs/getEditFAQByID',
            data: {
                id: id
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.saveFAQs = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/faqs/saveFAQs',
            data: obj
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    
    return service;
}

previewService.$inject = ['$q', '$http', 'appSetting'];
function previewService($q, $http, appSetting) {
    var service = {};
    service.getNewsById = function (id) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/preview/getNewsById/'+id
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    return service;
}

userService.$inject = ['$q', '$http', 'appSetting'];
function userService($q, $http, appSetting) {
    var service = {};

    service.searchUserGroup = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/permission/searchGroup',
            data: {
                groupName: obj.groupName,
                pageSize: obj.pageSize,
                pageNumber: obj.pageNumber,
                sortingOrder: obj.sortingOrder,
                reverse: obj.reverse ? "desc" : "asc"
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.deleteUserGroups = function(ids){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/permission/deleteGroup',
            data: {
                GroupIDs: ids
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    service.getEditGroupById = function (id) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/permission/getGroupById/'+id
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.saveGroup = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/permission/saveGroup',
            data: obj
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.searchAdminUser = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/permission/searchAdminUser',
            data: {
                username: obj.username,
                fullName: obj.fullName,
                pageSize: obj.pageSize,
                pageNumber: obj.pageNumber,
                sortingOrder: obj.sortingOrder,
                reverse: obj.reverse ? "desc" : "asc"
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.deleteAdminUsers = function(ids){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/permission/deleteAdminUsers',
            data: {
                UserIDs: ids
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
    service.updateAdminUserStatus = function(userId, status){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/permission/updateAdminUserStatus',
            data: {
                id: userId,
                status: status
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
    service.searchFrontendUser = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/permission/searchFrontendUser',
            data: {
                username: obj.username,
                fullName: obj.fullName,
                pageSize: obj.pageSize,
                pageNumber: obj.pageNumber,
                sortingOrder: obj.sortingOrder,
                reverse: obj.reverse ? "desc" : "asc"
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.deleteFrontendUsers = function(ids){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/permission/deleteFrontendUsers',
            data: {
                UserIDs: ids
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
    service.updateFrontendUserStatus = function(userId, status){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/permission/updateFrontendUserStatus',
            data: {
                id: userId,
                status: status
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
    // service.searchWebServiceUser = function(userId){
    //     var deferred = $q.defer();
    //     $http({
    //         method: 'POST',
    //         url: appSetting.apiBaseUrl + '/api/permission/searchWebServiceUser',
    //         data: {
    //             userID: userId
    //         }
    //     }).then(function successCallback(response) {
    //         deferred.resolve(response.data);
    //     }, function errorCallback(response) {
    //         deferred.reject(response);
    //     });
    //     return deferred.promise;
    // }
    service.searchWebServiceUser = function(userId){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/permission/findPisUser',
            data: {
                userID: userId
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
    service.addWebServiceUser = function(obj){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/permission/addWebServiceUser',
            data: obj
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
    service.anyWebServiceUser = function (userId) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/permission/anyWebServiceUser/'+userId
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getUserGroups = function(){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/permission/getUserGroups'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getAdminUserData = function(id){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/permission/getAdminUserData/' + id
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
    service.saveAdminUserData = function(obj){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/permission/saveAdminUserData',
            data: obj
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
    service.getFrontEndUserMaster = function(id){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/permission/getFrontEndUserMaster'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
    service.addFrontEndUser = function(obj){
        var deferred = $q.defer();
        
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/permission/addFrontEndUser',
            data: obj
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
    service.editFrontEndUser = function(obj){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/permission/editFrontEndUser',
            data: obj
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
    service.getFrontEndUser = function(id){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: appSetting.apiBaseUrl + '/api/permission/getFrontEndUser/' + id
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
    return service;
}

mediaService.$inject = ['$q', '$http', 'appSetting'];
function mediaService($q, $http, appSetting) {
    var service = {};

    service.searchMediaFile = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/media/searchMediaFile',
            data: {
                pageSize: obj.pageSize,
                pageNumber: obj.pageNumber
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.deleteMedias = function(ids){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/media/deleteMediaFiles',
            data: {
                mediaFileIDs: ids
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
    return service;
}

logService.$inject = ['$q', '$http', 'appSetting'];
function logService($q, $http, appSetting) {
    var service = {};

    service.searchActivityLog = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/log/searchActivityLog',
            data: {
                userId: obj.userId,
                dateFrom: obj.dateFrom,
                dateTo: obj.dateTo,
                pageSize: obj.pageSize,
                pageNumber: obj.pageNumber
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };

    service.searchUsageLog = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/log/searchUsageLog',
            data: {
                userId: obj.userId,
                dateFrom: obj.dateFrom,
                dateTo: obj.dateTo,
                pageSize: obj.pageSize,
                pageNumber: obj.pageNumber
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };

    service.exportActivityLog = function (obj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: appSetting.apiBaseUrl + '/api/log/exportActivityLog',
            data: {
                userId: obj.userId,
                dateFrom: obj.dateFrom,
                dateTo: obj.dateTo,
                pageSize: obj.pageSize,
                pageNumber: obj.pageNumber
            },
            responseType: 'arraybuffer'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    return service;
}

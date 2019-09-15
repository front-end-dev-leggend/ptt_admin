var app = undefined;
(function () {
	app = angular.module('app', [
		'ngAnimate',
		'ui.router',
		'ui.bootstrap',
		'toastr',
		'ngCookies',
		'ngSanitize',
		'ngTextTruncate',
		'ui.tinymce',
		'ngMessages',
		'uiCropper',
		'ngFileUpload',
		'angularBootstrapFileinput',
		'angular-clipboard',
		'ngFileSaver'
	])
	/* develop */
	.constant("appSetting", {
		apiBaseUrl: "http://localhost:57348",
		//apiBaseUrl: "https://pttgwebtest3.pttgrp.com/PTT-SMPortal_test/admin/service",
		hostUrl: 'http://localhost:5000/#!',
		documentBaseURL: 'https://pttgwebtest3.pttgrp.com/PTT-SMPortal_test',
		apiWinauthBaseUrl: "http://localhost:54416"
	})
	/* uat */
	// .constant("appSetting", {
	// 	apiBaseUrl: "https://pttgwebtest3.pttgrp.com/PTT-SMPortal_test/admin/service",
	// 	hostUrl: 'https://pttgwebtest3.pttgrp.com/PTT-SMPortal_test/admin/#!',
	// 	documentBaseURL: 'https://pttgwebtest3.pttgrp.com/PTT-SMPortal_test',
	// 	apiWinauthBaseUrl: "https://pttgwebtest3.pttgrp.com/winauth",
	// })
})();

var loading = '<div class="sk-circle">'
					+' <div class="sk-circle1 sk-child"></div>'
					+' <div class="sk-circle2 sk-child"></div>'
					+' <div class="sk-circle3 sk-child"></div>'
					+' <div class="sk-circle4 sk-child"></div>'
					+' <div class="sk-circle5 sk-child"></div>'
					+' <div class="sk-circle6 sk-child"></div>'
					+' <div class="sk-circle7 sk-child"></div>'
					+' <div class="sk-circle8 sk-child"></div>'
					+' <div class="sk-circle9 sk-child"></div>'
					+' <div class="sk-circle10 sk-child"></div>'
					+' <div class="sk-circle11 sk-child"></div>'
					+' <div class="sk-circle12 sk-child"></div>'
					+' </div>';


function parseISOString(s) {
	var b = s.split(/\D+/);
	return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}
function parseISOStringToDateStr(s){
	var today = new Date(s);
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = dd + '/' + mm + '/' + yyyy;
	return today;
}
function getCurrentDateStr(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = dd + '/' + mm + '/' + yyyy;
	return today;
}
function checkTime(i) {
	return (i < 10) ? "0" + i : i;
}
function getCurrentDateFileNameStr(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	var h = checkTime(today.getHours());
	var m = checkTime(today.getMinutes());
	var s = checkTime(today.getSeconds());

	today = yyyy + '' + mm + '' + dd + '' + h + '' + m;
	return today;
}

angular.module("app").filter('utcToLocal', Filter);
function Filter($filter) {
	return function (utcDateString, format) {
		// return if input date is null or undefined
		if (!utcDateString) {
			return;
		}

		// append 'Z' to the date string to indicate UTC time if the timezone isn't already specified
		if (utcDateString.indexOf('Z') === -1 && utcDateString.indexOf('+') === -1) {
			utcDateString += 'Z';
		}

		// convert and format date using the built in angularjs date filter
		return $filter('date')(utcDateString, format);
	};
}
angular.module("app").filter('slice', Slice);
function Slice($filter) {
  return function(arr, start, end) {
    return arr.slice(start, end);
  };
}
angular.module("app").directive('changeOnBlur', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elm, attrs, ngModelCtrl) {
			if (attrs.type === 'radio' || attrs.type === 'checkbox') 
				return;

			var expressionToCall = attrs.changeOnBlur;

			var oldValue = null;
			elm.bind('focus',function() {
				scope.$apply(function() {
					oldValue = elm.val();
					//console.log(oldValue);
				});
			})
			elm.bind('blur', function() {
				scope.$apply(function() {
					var newValue = elm.val();
					//console.log(newValue);
					if (newValue !== oldValue){
						scope.$eval(expressionToCall);
					}
						//alert('changed ' + oldValue);
				});         
			});
		}
	};
});
angular.module('app').directive('numOnly', numOnly);
function numOnly() {
	var directive = {
		restrict: 'A',
		scope: {
			ngModel: '=ngModel'
		},
		link: link
	};

	return directive;

	function link(scope, element, attrs) {
		scope.$watch('ngModel', function (newVal, oldVal) {
			var arr = String(newVal).split('');
			if (arr.length === 0) return;
			if (arr.length === 1 && (arr[0] === '-' || arr[0] === '.')) return;
			if (isNaN(newVal)) {
				scope.ngModel = oldVal;
			}
		});
	}
}
angular.module('app').directive("limitTo", [function() {
	return {
		restrict: "A",
		link: function(scope, elem, attrs) {
			var limit = parseInt(attrs.limitTo);
			angular.element(elem).on("keypress", function(e) {//keypress
				if (this.value.length > limit) e.preventDefault();
			});
		}
	}
}]);
angular.module('app').directive("datepicker", function () {
	return {
	  restrict: "A",
	  require: "ngModel",
	  link: function (scope, elem, attrs, ngModelCtrl) {
		var updateModel = function (dateText) {
		  scope.$apply(function () {
			ngModelCtrl.$setViewValue(dateText);
		  });
		};
		var options = {
		  dateFormat: "dd/mm/yy",
		  onSelect: function (dateText) {
			updateModel(dateText);
		  }
		};
		elem.datepicker(options);
	  }
	}
  });
  angular.module("app").filter('thousandSuffix', function () {
    return function (input, decimals) {
      var exp, rounded,
        suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

      if(window.isNaN(input)) {
        return null;
      }

      if(input < 1000) {
        return input;
      }

      exp = Math.floor(Math.log(input) / Math.log(1000));

      return (input / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
    };
  });
  angular.module("app").directive("selectNgFiles", function() {
	return {
	  require: "ngModel",
	  link: function postLink(scope,elem,attrs,ngModel) {
		elem.on("change", function(e) {
		  var files = elem[0].files;
		  ngModel.$setViewValue(files);
		})
	  }
	}
  });

  function initPreviewAnnouncement(){
	  $('#thumbs').carouFredSel({
            responsive: true,
            circular: false,
            infinite: false,
            auto: false,
            prev: '#prev',
            next: '#next',
            items: {
                visible: {
                    min: 5
                    //max: 4 
                },
                //width: 100,
                height: '40%'
            }
        });
  }
  function initPreviewActivity(){
	$('#carousel').carouFredSel({
		responsive: true,
		circular: false,
		auto: false,
		items: {
			visible: 1,
			//						width: 200,
			height: '50%'
		},
		scroll: {
			fx: 'crossfade'  //kk  Possible values: "none", "scroll", "directscroll", "fade", "crossfade", "cover", "cover-fade", "uncover" or "uncover-fade".
		}
	});
	$('#thumbs').carouFredSel({
		responsive: true,
		circular: false,
		infinite: false,
		auto: false,
		prev: '#prev',
		next: '#next',
		items: {
			visible: {
				min: 4
				//max: 4 
			},
			//							width: 100,
			height: '80%'
		}
	});

	$('#thumbs a').click(function () {
		$('#carousel').trigger('slideTo', '#' + this.href.split('#').pop());
		$('#thumbs a').removeClass('selected');
		$(this).addClass('selected');
		return false;
	});
  }
  function initPreviewAward(){
	$('#thumbs').carouFredSel({
		responsive: true,
		circular: false,
		infinite: false,
		auto: false,
		prev: '#prev',
		next: '#next',
		items: {
			visible: {
				min:5 
				//max: 4 
			},
//							width: 100,
			height: '80%',
			margin:10
		}
	});
  }
  function clearFileUpload(){
	$('#file-upload').fileinput('clear');
  }
  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
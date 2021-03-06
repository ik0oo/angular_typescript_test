module App {
    'use strict';

    angular
        .module(Module)
        .directive('onFinishRender', directive);

    function directive($timeout: ng.ITimeoutService):ng.IDirective {
        return {
            link (scope: any, element: any, attrs: any) {
                if (scope.$last === true) {
                    $timeout(function () {

                        scope.$emit(attrs.onFinishRender)
                    });
                }
            }
        }
    }
}

module App {
    'use strict';

    angular
        .module(App.Module)
        .config(['$provide', ($provide) => {

            $provide.decorator('datepickerPopupDirective', ['$delegate', '$parse', ($delegate: ng.ISCEDelegateService) => {
                const directive = $delegate[0];
                const compile = directive.compile;

                directive.compile = function (
                    tElement: any,
                    tAttrs: any) {

                    const link = compile.apply(this, arguments);

                    return function (scope, elem, attrs, ngModel) {
                        link.apply(this, arguments);

                        const close: any = scope.close;
                        const dateSelection: any = scope.dateSelection;
                        let currentDate: any;
                        let closeByOk: boolean = false;

                        scope.$watch('isOpen', val => {
                            if (val) {
                                currentDate = scope.date;
                            } else {
                                if (closeByOk) {
                                    scope.dateSelection(scope.date);
                                } else {
                                    scope.dateSelection(currentDate);
                                }
                            }
                        });

                        scope.dateSelection = function (dt) {
                            dateSelection(dt);
                            closeByOk = false;
                        };

                        scope.close = () => {
                            close();
                            closeByOk = true;
                        };

                        scope.select = () => {
                            close();
                            closeByOk = false;
                        }

                    }
                };

                return $delegate;
            }])
        }]);
}
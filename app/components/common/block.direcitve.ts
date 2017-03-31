module BlockComponent {
    'use strict';

    angular
        .module(App.Module)
        .directive('blockDirective', directive);

    class controller {
        private header: string;
        private lastChild: boolean;
        private counter: any;

        constructor () {
            const $ctrl = this;
        }
    }

    function directive (): ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            template: `
                <div ng-class="{'block': true, 'block--noborder': $ctrl.lastChild}">
                    <header class="block__header">
                        <div>
                            <span ng-bind="$ctrl.header"></span>
                            <span
                                    class="block__header-counter"
                                    ng-bind="$ctrl.counter && '(' + $ctrl.counter.selected + '/' + $ctrl.counter.from + ')'"></span>
                        </div>

                        <div ng-transclude="buttonField"></div>
                    </header>


                    <div ng-transclude="contentField"></div>
                </div>
            `,
            scope: {
                header: '<',
                lastChild: '<',
                counter: '<'
            },
            transclude: {
                buttonField: '?buttonField',
                contentField : '?contentField'
            },
            bindToController: true,
            controllerAs: '$ctrl',
            controller
        }
    }
}
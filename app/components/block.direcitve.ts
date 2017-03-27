module App {
    'use strict';

    angular
        .module(Module)
        .directive('blockDirective', directive);

    class controller {
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
                    <header class="block__header" ng-bind="$ctrl.header"></header>

                    <div ng-transclude="contentField"></div>
                </div>
            `,
            scope: {
                header: '<',
                lastChild: '<'
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
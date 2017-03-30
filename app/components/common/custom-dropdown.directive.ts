module CustomDropdownComponent {
    'use strict';

    angular
        .module(App.Module)
        .directive('customDropdownDirective', directive);

    class controller {
        constructor() {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {

            });
        }
    }

    function directive():ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            template: `
                <div
                        class="btn-group custom-dropdown"
                        dropdown
                        is-open="$ctrl.isOpenDropdown">

                    <button
                            type="button"
                            class="btn btn-success btn-sm custom-dropdown__button"
                            ng-disabled="$ctrl.isDisabled"
                            dropdown-toggle>

                        <span class="{{$ctrl.icon + ' custom-dropdown__icon'}}"></span>
                        <span class="caret custom-dropdown__caret"></span>
                    </button>
                    <ul
                            class="dropdown-menu custom-dropdown__list"
                            dropdown-menu
                            role="menu"
                            aria-labelledby="single-button">

                        <li
                                class="custom-dropdown__list-item"
                                ng-click="menuItem.action()"
                                ng-repeat="menuItem in $ctrl.list">
                            <span class="{{menuItem.icon}}"></span>
                            <span ng-bind="menuItem.name"></span>
                        </li>
                    </ul>
                </div>
            `,
            scope: {
                list: '<',
                icon: '@',
                isDisabled: '<'
            },
            controllerAs: '$ctrl',
            bindToController: true,
            controller
        }
    }
}
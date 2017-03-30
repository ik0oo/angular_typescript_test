module AutocompleteComponent {
    'use strict';

    angular
        .module(App.Module)
        .directive('autocompleteDirective', directive);

    class controller {
        constructor() {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {});
        }
    }

    function directive():ng.IDirective {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            template: `
                <div class="form-group autocomplete">
                    <div class="input-group autocomplete__input">
                        <ng-transclude></ng-transclude>

                        <span
                                ng-if="$ctrl.result"
                                ng-click="$ctrl.onClear()"
                                class="glyphicon glyphicon-remove-circle autocomplete__clear-button text-danger"></span>

                        <span class="input-group-btn">
                            <button type="button" class="btn btn-sm btn-secondary">
                                <span class="{{$ctrl.icon}}"></span>
                            </button>
                        </span>

                    </div>
                    <span
                            class="error text-danger"
                            ng-if="$ctrl.noResults && $ctrl.result"
                            ng-bind="$ctrl.noResultsText"></span>
                </div>
            `,
            scope: {
                onClear: '&',
                result: '<',
                noResults: '<',
                noResultsText: '<',
                icon: '@'
            },
            controllerAs: '$ctrl',
            bindToController: true,
            controller
        }
    }
}
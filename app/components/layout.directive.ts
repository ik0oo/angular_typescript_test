module LayoutComponent {
    'use strict';

    angular
        .module(App.Module)
        .directive('layoutDirective', directive);

    function directive (): ng.IDirective {
        return {
            restrict: 'E',
            template: `
                <div class="layout">
                    <sidebar-directive></sidebar-directive>
                    <calendar-directive></calendar-directive>
                </div>
            `,
            scope: {}
        }
    }
}
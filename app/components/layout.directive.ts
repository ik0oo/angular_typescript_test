module App {
    'use strict';

    angular
        .module(Module)
        .directive('layoutDirective', directive);

    function directive (): ng.IDirective {
        return {
            restrict: 'E',
            template: `
                <div>
                    <sidebar-directive></sidebar-directive>
                    <calendar-directive></calendar-directive>
                </div>
            `
        }
    }
}
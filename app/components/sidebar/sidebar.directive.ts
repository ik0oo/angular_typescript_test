module App {
    'use strict';

    angular
        .module(Module)
        .directive('sidebarDirective', directive);

    function directive (): ng.IDirective {
        return {
            restrict: 'E',
            template: `
                <div>sidebar</div>
            `
        }
    }
}
module App {
    'use strict';

    angular
        .module(Module)
        .directive('sidebarDirective', directive);

    function directive (): ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            template: `
                <div class="sidebar">
                    <patient-directive></patient-directive>
                    <recording-date-directive></recording-date-directive>
                    <specialist-block-directive></specialist-block-directive>
                </div>
            `,
            scope: {}
        }
    }
}
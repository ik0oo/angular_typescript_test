module App {
    'use strict';

    angular
        .module(Module)
        .directive('sidebarDirective', directive);

    class controller {
        constructor () {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {
                specialistsList: []
            });
        }

        private handleSpecialistsList (data) {
            this.specialistsList = data;
            console.log(this.specialistsList);
        }
    }

    function directive (): ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            template: `
                <div class="sidebar">
                    <patient-directive></patient-directive>
                    <recording-date-directive></recording-date-directive>
                    <specialist-block-directive
                        handler="$ctrl.handleSpecialistsList($data)"></specialist-block-directive>
                </div>
            `,
            scope: {},
            controllerAs: '$ctrl',
            bindToController: true,
            controller
        }
    }
}
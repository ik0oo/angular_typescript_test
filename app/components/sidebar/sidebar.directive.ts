module App {
    'use strict';

    angular
        .module(Module)
        .directive('sidebarDirective', directive);

    class controller {
        constructor (private dataFactory: Services.IDataFactory) {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {

            });

            $ctrl.onInit();
        }

        private onInit () {
            const $ctrl = this;

            $ctrl.dataFactory
                .getPatients()
                .then(patients => {
                    $ctrl.patientsList = patients.data;
                })
        }

        private handleSpecialistsList (specialists) {
            this.selectedSpecialists = specialists;
            console.log(arguments);
        }

        private handlePatient (patient) {
            this.selectedPatient = patient;
            console.log(arguments);
        }
    }

    function directive (): ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            template: `
                <div class="sidebar">
                    <patient-directive
                        handler="$ctrl.handlePatient($patient)"
                        patients-list="$ctrl.patientsList"></patient-directive>

                    <recording-date-directive></recording-date-directive>
                    <specialist-block-directive
                        handler="$ctrl.handleSpecialistsList($specialists)"></specialist-block-directive>
                </div>
            `,
            scope: {},
            controllerAs: '$ctrl',
            bindToController: true,
            controller
        }
    }
}
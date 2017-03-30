module SidebarComponent {
    'use strict';

    angular
        .module(App.Module)
        .directive('sidebarDirective', directive);

    interface ISidebarController {
        onInit: () => void;
        handleSpecialistsList: (specialists: number[]) => void;
        handlePatient: (patient: number) => void;
    }

    class controller implements ISidebarController {
        private isActiveDatepicker: boolean;
        private patientsList: any[];
        private selectedSpecialists: number[];
        private selectedPatient: number;

        constructor (private dataFactory: Services.IDataFactory) {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {

            });

            $ctrl.onInit();
        }

        public onInit () {
            const $ctrl = this;

            $ctrl.dataFactory
                .getPatients()
                .then(patients => {
                    $ctrl.patientsList = patients.data;
                })
        }

        public handleSpecialistsList (specialists) {
            this.selectedSpecialists = specialists;
            this.isActiveDatepicker = !!specialists.length;
            console.log(arguments);
        }

        public handlePatient (patient) {
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

                    <recording-date-directive
                            is-active="$ctrl.isActiveDatepicker"></recording-date-directive>
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
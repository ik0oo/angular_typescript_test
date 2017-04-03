module SidebarComponent {
    'use strict';

    angular
        .module(App.Module)
        .directive('sidebarDirective', directive);

    interface ISidebarController {
        onInit: () => void;
        handleSpecialistsList: (specialists: number[]) => void;
        handlePatient: (patient: number) => void;
        handleDatepicker: (selectedDate: any) => void;
    }

    class controller implements ISidebarController {
        private isActiveDatepicker: boolean;
        private patientsList: any[];
        private selectedSpecialists: number[];
        private selectedPatient: number;
        private selectedDate: any;

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
                .then(patients => $ctrl.patientsList = patients);
        }

        public handleSpecialistsList (specialists: number[]) {
            this.selectedSpecialists = specialists;
            this.isActiveDatepicker = !!specialists.length;
            console.log(arguments);
        }

        public handlePatient (patient: number) {
            this.selectedPatient = patient;
            console.log(arguments);
        }

        public handleDatepicker (selectedDate) {
            if (this.toDate(this.selectedDate) != this.toDate(selectedDate)) {
                this.selectedDate = selectedDate;

                console.log(this.selectedDate);
            }
        }

        private toDate (date) {
            return new Date(date).getTime();
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
                            selected-specialists="$ctrl.selectedSpecialists"
                            handler="$ctrl.handleDatepicker($selectedDate)"
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
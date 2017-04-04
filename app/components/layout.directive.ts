module LayoutComponent {
    'use strict';

    angular
        .module(App.Module)
        .directive('layoutDirective', directive);

    interface ILayoutController {
        onInit: () => void;
        handleSpecialistsList: (specialists: number[]) => void;
        handlePatient: (patient: number) => void;
        handleDatepicker: (selectedDate: any) => void;
    }

    class controller implements ILayoutController {
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
        }

        public handlePatient (patient: number) {
            this.selectedPatient = patient;
        }

        public handleDatepicker (selectedDate) {
            if (this.toDate(this.selectedDate) != this.toDate(selectedDate)) {
                this.selectedDate = selectedDate;
            }
        }

        private toDate (date) {
            return new Date(date).getTime();
        }
    }

    function directive (): ng.IDirective {
        return {
            restrict: 'E',
            template: `
                <div class="layout">
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

                    <calendar-directive
                            date="$ctrl.selectedDate"
                            specialists="$ctrl.selectedSpecialists"></calendar-directive>
                </div>
            `,
            scope: {},
            controllerAs: '$ctrl',
            bindToController: true,
            controller
        }
    }
}
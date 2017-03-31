module RecordingDateComponent {
    'use strict';

    angular
        .module(App.Module)
        .directive('recordingDateDirective', directive);

    interface IRecordingDateController {
        openPicker(): void;
    }

    class controller implements IRecordingDateController {
        private isOpenPicker: boolean;
        private header: string;
        private pickerPlaceholder: string;
        private pickerFormat: string;
        private tooltipText: string;
        private pickerOptions: any;
        private datepicker: any;
        private selectedSpecialists: string[];
        private handler: (data: any) => void;

        constructor (
            private $scope: ng.IScope,
            private dateFactory: Services.IDateFactory) {

            const $ctrl = this;

            (<any>Object).assign($ctrl, {
                header: 'Дата Записи',
                pickerPlaceholder: 'ДД.ММ.ГГГГ',
                pickerFormat: 'dd.MM.yyyy',
                datepicker: '',
                tooltipText: 'Выберите доступный ресурс',
                pickerOptions: {
                    startingDay: 1,
                    minDate: $ctrl.dateFactory.getMinDate()
                }
            });

            $scope.$watch('$ctrl.datepicker', (newVal) => $ctrl.handler({$selectedDate: newVal}));
        }

        private getDayClass (date, mode) {
            const $ctrl = this;
            const events = $ctrl.dateFactory.getEvents($ctrl.selectedSpecialists);
            const dayToCheck = new Date(date).setHours(0,0,0,0);
            let currentDay;

            for (let i=0;i<events.length;i++){
                currentDay = new Date(events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return events[i].status;
                }
            }

            return '';
        }

        public openPicker () {
            this.isOpenPicker = true;
        }
    }

    function directive (): ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            template: `
                <div>
                    <block-directive
                            header="$ctrl.header">

                        <content-field class="input-group datepicker">
                            <input
                                    type="text"
                                    class="form-control input-sm"
                                    ng-model="$ctrl.datepicker"
                                    min-date="$ctrl.pickerOptions.minDate"
                                    custom-class="$ctrl.getDayClass(date, mode)"
                                    show-weeks="false"
                                    max-mode="'day'"
                                    is-open="$ctrl.isOpenPicker"
                                    datepicker-popup="{{$ctrl.pickerFormat}}"
                                    datepicker-options="$ctrl.pickerOptions"
                                    placeholder="{{$ctrl.pickerPlaceholder}}" />

                            <span class="input-group-btn">
                                <span
                                        tooltip-enable="!$ctrl.isActive"
                                        tooltip="{{$ctrl.tooltipText}}"
                                        tooltip-placement="top">
                                    <button
                                            ng-disabled="!$ctrl.isActive"
                                            type="button"
                                            ng-click="$ctrl.openPicker()"
                                            class="btn btn-sm btn-secondary">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                        <span class="caret"></span>
                                    </button>
                                </span>
                            </span>
                        </content-field>
                    </block-directive>
                </div>
            `,
            scope: {
                isActive: '<',
                selectedSpecialists: '<',
                handler: '&'
            },
            controllerAs: '$ctrl',
            bindToController: true,
            controller
        }
    }
}
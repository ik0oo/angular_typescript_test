module RecordingDateComponents {
    'use strict';

    angular
        .module(App.Module)
        .directive('recordingDateDirective', directive);

    interface IRecordingDateController {
        openPicker: () => void;
    }

    class controller implements IRecordingDateController {
        private isOpenPicker: boolean;
        private header: string;
        private pickerPlaceholder: string;
        private pickerFormat: string;

        constructor () {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {
                header: 'Дата Записи',
                pickerPlaceholder: 'ДД.ММ.ГГГГ',
                pickerFormat: 'DD.MM.YYYY'
            });
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

                        <content-field class="input-group">
                            <input
                                    type="text"
                                    class="form-control input-sm"
                                    ng-model="$ctrl.datepicker"
                                    is-open="$ctrl.isOpenPicker"
                                    datepicker-popup="{{$ctrl.pickerFormat}}"
                                    placeholder="{{$ctrl.pickerPlaceholder}}" />

                            <span class="input-group-btn">
                                <button
                                        ng-disabled="!$ctrl.isActive"
                                        type="button"
                                        ng-click="$ctrl.openPicker()"
                                        class="btn btn-sm btn-secondary">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                    <span class="caret"></span>
                                </button>
                            </span>
                        </content-field>
                    </block-directive>
                </div>
            `,
            scope: {
                isActive: '<'
            },
            controllerAs: '$ctrl',
            bindToController: true,
            controller
        }
    }
}
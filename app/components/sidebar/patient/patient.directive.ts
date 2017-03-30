module PatientComponent {
    'use strict';

    angular
        .module(App.Module)
        .directive('patientDirective', directive);

    interface IPatientController {
        clearPatientField: () => void;
        searchOnSelect: (item: any, model: any, label: any, event: any) => void;
        clearSearch: () => void;
    }

    class controller implements IPatientController {
        private header: string;
        private searchText: string;
        private searchMinLength: number;
        private searchNoResultsText: string;
        private PATIENT_MENU_LIST: any[];
        private searchNoResults: boolean;
        private search: any;
        private selectedSearch: any;
        private patientsList: any[];
        private handler: (data: any) => void;

        constructor () {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {
                header: 'Пациент',
                searchText: 'Введите текст для поиска',
                searchMinLength: 4,
                searchNoResultsText: 'Совпадений не найдено',
                PATIENT_MENU_LIST: [{
                    action: $ctrl.clearPatientField.bind($ctrl),
                    name: 'Завершить работу с пациентом',
                    icon: 'glyphicon glyphicon-ok-sign'
                }]
            });
        }

        public clearPatientField () {
            this.clearSearch();
            this.selectedSearch = '';
        }

        public searchOnSelect (item, model, label, event) {
            this.selectedSearch = item;
            this.handler({$patient: item.id});
        }

        public clearSearch () {
            const $ctrl = this;

            $ctrl.search = '';
            $ctrl.searchNoResults = false;
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

                        <button-field>
                            <custom-dropdown-directive
                                    icon="glyphicon glyphicon-user"
                                    is-disabled="!$ctrl.search"
                                    list="$ctrl.PATIENT_MENU_LIST"></custom-dropdown-directive>
                        </button-field>

                        <content-field>
                            <autocomplete-directive
                                    ng-if="!$ctrl.selectedSearch"
                                    icon="glyphicon glyphicon-search"
                                    result="$ctrl.search"
                                    no-results="$ctrl.searchNoResults"
                                    no-results-text="$ctrl.searchNoResultsText"
                                    on-clear="$ctrl.clearSearch()">

                                <input
                                    type="text"
                                    class="form-control input-sm"
                                    ng-model="$ctrl.search"
                                    typeahead-min-length="$ctrl.searchMinLength"
                                    typeahead-no-results="$ctrl.searchNoResults"
                                    typeahead-on-select="$ctrl.searchOnSelect($item, $model, $label, $event)"
                                    typeahead="item as item.name for item in $ctrl.patientsList | filter:$viewValue"
                                    typeahead="item as item.insurancePolicy for item in $ctrl.patientsList | filter:$viewValue"
                                    typeahead-template-url="components/sidebar/patient/patient-autocomplete.template.html"
                                    placeholder="{{$ctrl.searchText}}" />
                            </autocomplete-directive>

                            <div
                                    class="patient"
                                    ng-if="$ctrl.selectedSearch">

                                    <div class="patient__item">
                                        <span>ФИО: </span>
                                        <span ng-bind="$ctrl.selectedSearch.name"></span>
                                    </div>
                                    <div class="patient__item">
                                        <span>Дата рождения: </span>
                                        <span ng-bind="$ctrl.selectedSearch.birthday"></span>
                                    </div>
                                    <div class="patient__item">
                                        <span>Полис ОМС: </span>
                                        <span ng-bind="$ctrl.selectedSearch.insurancePolicy"></span>
                                    </div>
                            </div>

                        </content-field>
                    </block-directive>
                </div>
            `,
            scope: {
                patientsList: '<',
                handler: '&'
            },
            controllerAs: '$ctrl',
            bindToController: true,
            controller
        }
    }
}




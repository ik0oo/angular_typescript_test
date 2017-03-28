module App {
    'use strict';

    angular
        .module(Module)
        .directive('specialistBlockDirective', directive);

    class controller {
        /*@ngInject*/
        constructor (
            private SPECIALISTS_BUTTONS_GROUP,
            private SPECIALTY_TYPES,
            private dataFactory: Services.IDataFactory) {

            const $ctrl = this;

            (<any>Object).assign($ctrl, {
                header: 'Специалисты',
                searchText: 'Введите текст для поиска',
                radioModel: SPECIALTY_TYPES.SPECIALTY,
                SPECIALISTS_BUTTONS_GROUP,
                counting: {
                    selected: 0,
                    from: 0
                }
            });

            $ctrl.onInit();
        }

        onInit () {
            const $ctrl = this;

            $ctrl.dataFactory
                .getSpecialists()
                .then(specList => {
                    $ctrl.specialistsList =  specList.data;
                    $ctrl.counting.from = $ctrl.specialistsList.length;
                });
        }

        onChangeInList (newVal) {
            const $ctrl = this;
            let counter = 0;

            for (let item in newVal) {
                newVal[item] && counter++;
            }

            $ctrl.counting.selected = counter;
        }
    }

    function directive (): ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            template: `
                <div>
                    <block-directive
                            header="$ctrl.header"
                            counter="$ctrl.counting"
                            last-child="true">

                        <content-field class="specialists">
                            <div class="input-group specialists__input">
                                <input
                                        type="text"
                                        class="form-control input-sm"
                                        placeholder="{{$ctrl.searchText}}" />
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-sm btn-secondary">
                                        <span class="glyphicon glyphicon-search"></span>
                                    </button>
                                </span>
                            </div>

                            <div class="btn-group specialists__button-group">
                                <label
                                        ng-repeat="button in $ctrl.SPECIALISTS_BUTTONS_GROUP"
                                        class="btn btn-default btn-sm specialists__button-group-item"
                                        ng-model="$ctrl.radioModel"
                                        btn-radio="button.type"
                                        ng-bind="button.name"></label>
                            </div>

                            <specialist-list-directive
                                    on-change="$ctrl.onChangeInList($newVal)"
                                    list="$ctrl.specialistsList"
                                    filter-type="$ctrl.radioModel"></specialist-list-directive>
                        </content-field>
                    </block-directive>
                </div>
            `,
            scope: {},
            controllerAs: '$ctrl',
            bindToController: true,
            controller
        }
    }
}
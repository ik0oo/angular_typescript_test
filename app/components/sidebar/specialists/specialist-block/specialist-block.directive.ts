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
                searchNoResultsText: 'Совпадений не найдено',
                searchMinLength: 4,
                SPECIALISTS_MENU_LIST: [{
                    action: $ctrl.selectAll.bind($ctrl),
                    name: 'Выбрать все',
                    icon: 'glyphicon glyphicon-ok'
                }, {
                    action: $ctrl.cancelAll.bind($ctrl),
                    name: 'Отменить все выбранные',
                    icon: 'glyphicon glyphicon-remove'
                }],
                radioModel: SPECIALTY_TYPES.SPECIALTY,
                SPECIALISTS_BUTTONS_GROUP,
                counting: {
                    selected: 0,
                    from: 0
                }
            });

            $ctrl.onInit();
        }

        private onInit () {
            const $ctrl = this;

            $ctrl.dataFactory
                .getSpecialists()
                .then(specList => {
                    $ctrl.specialistsList =  specList.data;
                    $ctrl.counting.from = $ctrl.specialistsList.length;
                });
        }

        private selectAll () {
            const $ctrl = this;

            $ctrl.searchSelected = $ctrl.specialistsList.map(({id}) => {
                return {id, value: true};
            });
        }

        private cancelAll () {
            const $ctrl = this;

            $ctrl.searchSelected = $ctrl.specialistsList.map(({id}) => {
                return {id, value: false};
            });
        }

        private onChangeInList (newVal) {
            const $ctrl = this;
            let counter = 0;
            let arr = [];

            for (let key in newVal) {
                if (newVal[key]) {
                    counter++;
                    arr.push(key);
                }
            }

            $ctrl.counting.selected = counter;
            $ctrl.handler({$data: arr});
        }

        private clearSearch () {
            const $ctrl = this;

            $ctrl.search = '';
            $ctrl.searchNoResults = false;
        }

        private searchOnSelect (item, model, label, event) {
            const $ctrl = this;

            $ctrl.searchSelected = item.id;
        }
    }

    function directive (): ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'components/sidebar/specialists/specialist-block/specialist-block.directive.template.html',
            scope: {
                handler: '&'
            },
            controllerAs: '$ctrl',
            bindToController: true,
            controller
        }
    }
}
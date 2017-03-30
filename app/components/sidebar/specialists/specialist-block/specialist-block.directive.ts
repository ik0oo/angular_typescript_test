module SpecialistBlockComponent {
    'use strict';

    angular
        .module(App.Module)
        .directive('specialistBlockDirective', directive);

    interface ISpecialistBlockController {
        onInit: () => void;
        selectAll: () => void;
        cancelAll: () => void;
        onChangeInList: (newVal: any) => void;
        clearSearch: () => void;
        searchOnSelect: (item: any, model: any, label: any, event: any) => void;
    }

    class controller implements ISpecialistBlockController {
        private header: string;
        private searchText: string;
        private searchNoResultsText: string;
        private searchMinLength: number;
        private SPECIALISTS_MENU_LIST: any;
        private radioModel: string;
        private counting: any;
        private specialistsList: any;
        private searchSelected: any;
        private handler: (data: any) => void;
        private search: any;
        private searchNoResults: boolean;

        /*@ngInject*/
        constructor (
            private SPECIALISTS_BUTTONS_GROUP: any,
            private SPECIALTY_TYPES: any,
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

        public onInit () {
            const $ctrl = this;

            $ctrl.dataFactory
                .getSpecialists()
                .then(specList => {
                    $ctrl.specialistsList =  specList.data;
                    $ctrl.counting.from = $ctrl.specialistsList.length;
                });
        }

        public selectAll () {
            const $ctrl = this;

            $ctrl.searchSelected = $ctrl.specialistsList.map(({id}) => {
                return {id, value: true};
            });
        }

        public cancelAll () {
            const $ctrl = this;

            $ctrl.searchSelected = $ctrl.specialistsList.map(({id}) => {
                return {id, value: false};
            });
        }

        public onChangeInList (newVal) {
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
            $ctrl.handler({$specialists: arr});
        }

        public clearSearch () {
            const $ctrl = this;

            $ctrl.search = '';
            $ctrl.searchNoResults = false;
        }

        public searchOnSelect (item, model, label, event) {
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
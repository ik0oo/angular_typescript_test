module SpecialistListComponent {
    'use strict';

    angular
        .module(App.Module)
        .directive('specialistListDirective', directive);

    interface ISpecialistListController {
        onSelectByParent: (newVal: any) => void;
        onChangeSpecialty: (key: number, specialty: any[]) => void;
        filterBySpecialists: (list: any) => any;
        filterByAlphabet: (list: any) => any;
        filter: (type: string, list: any) => any;
    }

    class controller implements ISpecialistListController {
        private currentType: string;
        private byAlphabet: any[];
        private bySpecialists: any;
        private models: any;
        private specialtyModels: any;
        private templates: any;
        private list: any[];
        private filterType: string;
        private onChange: (data: any) => void;
        private selected: any;

        constructor (
            private $scope: ng.IScope,
            private SPECIALTY_TYPES: any) {

            const $ctrl = this;

            (<any>Object).assign($ctrl, {
                currentType: '',
                byAlphabet: [],
                bySpecialist: [],
                models: {},
                specialtyModels: {},
                SPECIALTY_TYPES,
                templates: {
                    [SPECIALTY_TYPES.SPECIALTY]: "components/sidebar/specialists/specialists-list/byspecialist.template.html",
                    [SPECIALTY_TYPES.ALPHABET]:  "components/sidebar/specialists/specialists-list/byalphabet.template.html"
                }
            });

            $scope.$watch('$ctrl.models', newVal => $ctrl.onChange({$newVal: newVal}), true);
            $scope.$watch('$ctrl.selected', $ctrl.onSelectByParent.bind($ctrl))
        }

        public onSelectByParent (newVal: any) {
            const $ctrl = this;

            if (newVal == null) return false;

            if (Object.prototype.toString.call(newVal) === '[object Array]')
                return newVal.forEach(item => $ctrl.models[item.id] = item.value);

            $ctrl.models[newVal] = true;
        }

        public onChangeSpecialty (key: number, specialty: any[]) {
            const $ctrl = this;
            const state = $ctrl.specialtyModels[key];

            specialty.forEach(item => {
                $ctrl.models[item.id] = state;
            });
        }

        public filterBySpecialists (list: any) {
            const specList = {};

            list.forEach(({specialty, name, room, id}): void => {
                typeof specList[specialty] !== 'object' && (specList[specialty] = []);

                specList[specialty].push({
                    name,
                    room,
                    id
                });
            });

            return specList;
        }

        public filterByAlphabet (list: any) {
            return list.map(({specialty, name, room, id}): any => {
                return {
                    specialty,
                    name,
                    room,
                    id
                }
            });
        }

        public filter (type: string, list: any[]) {
            const $ctrl = this;

            if (!list) return;

            switch (type) {
                case $ctrl.SPECIALTY_TYPES.SPECIALTY:
                    if (type !== $ctrl.currentType) $ctrl.bySpecialists = $ctrl.filterBySpecialists(list);
                    $ctrl.currentType = type;
                    return $ctrl.bySpecialists;

                case $ctrl.SPECIALTY_TYPES.ALPHABET:
                    if (type !== $ctrl.currentType) $ctrl.byAlphabet = $ctrl.filterByAlphabet(list);
                    $ctrl.currentType = type;
                    return $ctrl.byAlphabet;
            }
        }
    }

    function directive():ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            template: `
                <div class="specialists__list">
                    <div
                        ng-repeat="(specialtyKey, specialty) in $ctrl.filter($ctrl.filterType ,$ctrl.list)">

                        <ng-include
                                src="$ctrl.templates[$ctrl.currentType]"></ng-include>

                    </div>
                </div>
            `,
            scope: {
                list: '<',
                filterType: '<',
                onChange: '&',
                selected: '<'
            },
            controllerAs: '$ctrl',
            bindToController: true,
            controller
        }
    }
}
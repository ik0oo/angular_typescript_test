module App {
    'use strict';

    angular
        .module(Module)
        .directive('specialistListDirective', directive);

    class controller {
        constructor (private $scope: ng.IScope, private SPECIALTY_TYPES) {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {
                currentType: null,
                byAlphabet: null,
                bySpecialist: null,
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

        private onSelectByParent (newVal) {
            const $ctrl = this;

            if (newVal == null) return false;

            if (Object.prototype.toString.call(newVal) === '[object Array]')
                return newVal.forEach(item => $ctrl.models[item.id] = item.value);

            $ctrl.models[newVal] = true;
        }

        private onChangeSpecialty (key, specialty) {
            const $ctrl = this;
            const state = $ctrl.specialtyModels[key];

            specialty.forEach(item => {
                $ctrl.models[item.id] = state;
            });
        }

        private filterBySpecialists (list: any) {
            const specList = {};

            list.forEach(({specialty, name, room, id}) => {
                typeof specList[specialty] !== 'object' && (specList[specialty] = []);

                specList[specialty].push({
                    name,
                    room,
                    id
                });
            });

            return specList;
        }

        private filterByAlphabet (list: any) {
            return list.map(({specialty, name, room, id}) => {
                return {
                    specialty,
                    name,
                    room,
                    id
                }
            });
        }

        private filter (type, list) {
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
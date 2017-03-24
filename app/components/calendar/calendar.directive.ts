module App {
    'use strict';

    const BUTTONS_GROUP = [{
        id: 1,
        name: '1 день'
    }, {
        id: 2,
        name: '2 дня'
    }, {
        id: 3,
        name: 'Неделя'
    }];

    angular
        .module(Module)
        .directive('calendarDirective', directive);


    class controller {
        constructor (private $scope: ng.IScope) {
            const $ctrl = this;

            $scope.$watch('$ctrl.radioModel', value => console.log(value));

            (<any>Object).assign($ctrl, {
                radioModel: BUTTONS_GROUP[0].id,
                BUTTONS_GROUP
            });
        }
    }

    function directive (): ng.IDirective {
        return {
            restrict: 'E',
            template: `
                <div>
                    <header class="row">
                        <div class="col-xs-9">
                            <h2>Расписание специалистов</h2>
                        </div>

                        <div class="col-xs-3">
                            <div class="btn-group">
                                <label
                                        ng-repeat="button in $ctrl.BUTTONS_GROUP"
                                        class="btn btn-success btn-sm"
                                        ng-model="$ctrl.radioModel"
                                        btn-radio="button.id"
                                        ng-bind="button.name"></label>
                            </div>
                        </div>
                    </header>
                <div>
            `,
            controllerAs: '$ctrl',
            bindToController: true,
            link () {},
            controller
        }
    }
}
module App {
    'use strict';

    angular
        .module(Module)
        .directive('calendarDirective', directive);


    class testCtrl {
        constructor (private $scope: ng.IScope, private CALENDAR_BUTTONS_GROUP) {
            const $ctrl = this;
            //
            //$scope.$watch('$ctrl.radioModel', value => console.log(value));

            (<any>Object).assign($ctrl, {
                radioModel: CALENDAR_BUTTONS_GROUP[0].id,
                CALENDAR_BUTTONS_GROUP
            });
        }
    }

    function directive (): ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            template: `
                <div class="calendar">
                    <header class="calendar__header block">
                        <h2>Расписание специалистов</h2>

                        <div class="btn-group">
                            <label
                                    ng-repeat="button in $ctrl.CALENDAR_BUTTONS_GROUP"
                                    class="btn btn-success btn-sm"
                                    ng-model="$ctrl.radioModel"
                                    btn-radio="button.id"
                                    ng-bind="button.name"></label>
                        </div>
                    </header>
                <div>
            `,
            scope: {},
            controllerAs: '$ctrl',
            bindToController: true,
            controller: testCtrl
        }
    }
}
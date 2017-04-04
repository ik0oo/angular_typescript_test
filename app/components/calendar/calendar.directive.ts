module CalendarComponent {
    'use strict';

    angular
        .module(App.Module)
        .directive('calendarDirective', directive);


    class testCtrl {
        private specialists: any[];
        private date: any;
        private radioModel: number;
        private daysList: any[];

        constructor (
            private $scope: ng.IScope,
            private CALENDAR_BUTTONS_GROUP: any,
            private dateFactory: Services.IDateFactory
        ) {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {
                radioModel: CALENDAR_BUTTONS_GROUP[0].count,
                CALENDAR_BUTTONS_GROUP,
                daysList: []
            });

            $scope.$watch('$ctrl.date', () => this.update());
            $scope.$watch('$ctrl.radioModel', () => this.update());
        }

        private update () {
            if (!this.date) return;

            this.daysList = this.dateFactory.createFullSchedule(this.specialists, this.radioModel, this.date);
            console.log(this.daysList);
        }
    }

    function directive (): ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            template: `
                <div class="calendar">
                    <header class="calendar__header block">
                        <h3 class="calendar__header-headline">Расписание специалистов</h3>

                        <div class="btn-group">
                            <label
                                    ng-repeat="button in $ctrl.CALENDAR_BUTTONS_GROUP"
                                    class="btn btn-success btn-sm"
                                    ng-model="$ctrl.radioModel"
                                    btn-radio="button.count"
                                    ng-bind="button.name"></label>
                        </div>
                    </header>

                    <div class="calendar__main">
                        <date-item-directive
                                class="date-item"
                                ng-if="$ctrl.daysList.length"
                                ng-repeat="day in $ctrl.daysList"
                                day="day"></date-item-directive>

                        <div ng-if="!$ctrl.daysList.length">
                            Расписане не доступно
                        </div>
                    </div>
                <div>
            `,
            scope: {
                date: '<',
                specialists: '<'
            },
            controllerAs: '$ctrl',
            bindToController: true,
            controller: testCtrl
        }
    }
}
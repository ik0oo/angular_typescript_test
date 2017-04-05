module CalendarComponent {
    'use strict';

    angular
        .module(App.Module)
        .directive('calendarDirective', directive);


    class controller {
        private specialists: any[];
        private date: any;
        private radioModel: number;
        private daysList: any[];

        constructor (
            private $scope: ng.IScope,
            private CALENDAR_BUTTONS_GROUP: any,
            private dateFactory: Services.IDateFactory,
            private scheduleFactory: Services.ISchedule
        ) {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {
                radioModel: CALENDAR_BUTTONS_GROUP[0].count,
                CALENDAR_BUTTONS_GROUP,
                daysList: []
            });

            $scope.$watch('$ctrl.date', () => this.update());
            $scope.$watch('$ctrl.specialists', () => {
                if ($ctrl.date) this.update();
            });
            $scope.$watch('$ctrl.radioModel', () => this.update());
            $scope.$watch('$ctrl.daysList', () => this.scheduleFactory.clear());
            $scope.$on('ngRepeatFinished', () => this.scheduleFactory.update())
        }

        private update () {
            if (!this.date) return;

            this.daysList = this.dateFactory
                .createFullSchedule(this.specialists, this.radioModel, this.date)
                .map(item => (<any>Object).assign({}, item, {
                    key: `_${Math.random().toString(36).substr(2,9)}`
                }));
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
                        <div class="calendar__list" scrollbar="$ctrl.daysList.length">
                            <div
                                    class="date-item"
                                    ng-if="$ctrl.daysList.length"
                                    ng-repeat="day in $ctrl.daysList | orderBy: 'date' as filteredResult track by day.key"
                                    on-finish-render="ngRepeatFinished"
                                    >
                                <date-item-directive
                                        day="day"></date-item-directive>
                            </div>
                        </div>


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
            controller
        }
    }
}
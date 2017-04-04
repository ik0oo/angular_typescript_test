module App {
    'use strict';

    angular
        .module(Module)
        .directive('dateItemDirective', directive);

    interface IDateItemController {

    }

    class controller {
        private day: any;

        constructor(private dateFactory: Services.IDateFactory) {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {});
        }

        private getDayInfo (date, range) {
            if (!date || !range) return [];

            const info = this.dateFactory.hasInfoForDay(date, range);

            if (info.length) {
                return info.map(item => `${item.start}-${item.end}`);
            }

            return [];
        }

        private getTimeRange (range, key) {
            const dayInfo = this.dateFactory.hasInfoForDay(this.day.date, range);
            const list = [];

            dayInfo.forEach(item => {
                let splitStart = item.start.split(':');
                let splitEnd = item.end.split(':');
                let start = {
                    hours: parseInt(splitStart[0]),
                    minutes: parseInt(splitStart[1])
                };
                let end = {
                    hours: parseInt(splitEnd[0]),
                    minutes: parseInt(splitEnd[1])
                };

                list.push(
                    ...this.dateFactory.createTimeSchedule(start, end, this.day.step, key)
                );
            });

            return list;
        }

        private getTimeSchedule (spec) {
            const ranges = this.day.ranges;
            const list = [];

            for (let key in ranges) {
                if (ranges[key]) {
                    list.push(
                        ...this.getTimeRange(ranges[key], key)
                    );
                }
            }


            //const splitStart = spec.schedule.hours.start.split(':');
            //const splitEnd = spec.schedule.hours.end.split(':');
            //const start = {
            //    hours: parseInt(splitStart[0]),
            //    minutes: parseInt(splitStart[1])
            //};
            //const end = {
            //    hours: parseInt(splitEnd[0]),
            //    minutes: parseInt(splitEnd[1])
            //};

            //return this.dateFactory.createTimeSchedule(start, end, spec.step);

            return list || [];
        }
    }

    function directive():ng.IDirective {
        return {
            restrict: 'E',
            template: `
                <div>
                    <div
                            class="date-item__row date-item__date"
                            ng-bind="$ctrl.day.date">Пн. 16 сен</div>

                    <div
                            class="date-item__row date-item__name"
                            ng-bind="$ctrl.day.name"></div>

                    <div
                            class="date-item__row date-item__specialty"
                            ng-bind="$ctrl.day.specialty"></div>
                    <div
                            class="date-item__row date-item__mu"
                            ng-bind="$ctrl.day.mu + '(к.' + $ctrl.day.room + ')'"></div>

                    <div class="date-item__row date-item__info">
                        <span ng-bind="$ctrl.day.schedule.hours.start + '-' + $ctrl.day.schedule.hours.end"></span>

                        <span
                                ng-if="$ctrl.day.ranges.free"
                                ng-repeat="freeTime in $ctrl.getDayInfo($ctrl.day.date, $ctrl.day.ranges.free)"
                                ng-bind="'Врач не работает(' + freeTime + ')'"></span>

                        <span
                                ng-if="$ctrl.day.ranges.learning"
                                ng-repeat="learningTime in $ctrl.getDayInfo($ctrl.day.date, $ctrl.day.ranges.learning)"
                                ng-bind="'Обучение(' + learningTime + ')'"></span>

                        <span
                                ng-if="$ctrl.day.ranges.documents"
                                ng-repeat="documentsTime in $ctrl.getDayInfo($ctrl.day.date, $ctrl.day.ranges.documents)"
                                ng-bind="'Работа с документами(' + documentsTime + ')'"></span>
                    </div>

                    <div class="date-item__schedule">
                        <div class="date-item__schedule-item"
                                ng-repeat="date in $ctrl.getTimeSchedule($ctrl.day)"
                                ng-bind="date.string + ' ' date.className">
                        </div>

                        <!--<div class="date-item__schedule-item date-item__schedule-item&#45;&#45;busy">-->
                            <!--Работа с документами-->
                        <!--</div>-->
                    </div>
                </div>
            `,
            scope: {
                day: '<'
            },
            controllerAs: '$ctrl',
            bindToController: true,
            controller
        }
    }
}
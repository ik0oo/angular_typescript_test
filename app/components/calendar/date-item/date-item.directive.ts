module App {
    'use strict';

    angular
        .module(Module)
        .directive('dateItemDirective', directive);

    interface IDateItemController {

    }

    class controller {
        private day: any;
        private timeSchedule: any[];

        constructor(
            private $scope: ng.IScope,
            private dateFactory: Services.IDateFactory) {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {});

            $scope.$watch('$ctrl.day', () => this.getTimeSchedule())
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

            dayInfo && dayInfo.forEach(item => {
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

        private getTimeSchedule () {
            const ranges = this.day.ranges;
            let list = this.getTimeRange({
                defaultDays: [this.day.schedule.hours]
            }, 'default');

            for (let key in ranges) {
                if (ranges[key]) {
                    let timing = this.getTimeRange(ranges[key], key);

                    list = list.map(item => {
                        let redefinedTime = timing.filter(time => time.time === item.time)[0];

                        if (redefinedTime) return redefinedTime;
                        return item;
                    }).filter((item, index, array) => {
                        if (index > 0) {
                            let prevItem = array[index - 1];

                            if (
                                item.className !== 'appointment' &&
                                prevItem.className === item.className
                            ) {
                                return false;
                            }
                        }
                        return true;
                    });
                }
            }

            this.timeSchedule = list || [];
        }

        private render (date: any) {
            switch (date.className) {
                case 'free':
                case 'default':
                    return 'Врач не принимает';

                case 'documents':
                    return 'Работа с документами';

                case 'learning':
                    return 'Обучение';

                default:
                    return date.string;
            }
        }
    }

    function directive(scheduleFactory: Services.ISchedule):ng.IDirective {
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
                                ng-repeat="date in $ctrl.timeSchedule"
                                ng-class="{'date-item__schedule-item--busy': date.className !== 'appointment'}"
                                ng-bind="$ctrl.render(date)">
                        </div>
                    </div>
                </div>
            `,
            scope: {
                day: '<'
            },
            link (scope, element, attrs) {
                scheduleFactory.add(element.find('.date-item__schedule'));
            },
            controllerAs: '$ctrl',
            bindToController: true,
            controller
        }
    }
}
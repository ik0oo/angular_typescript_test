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
            private dateFactory: Services.IDateFactory,
            private dataFactory: Services.IDataFactory,
            private $modal: any
        ) {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {});

            $scope.$watch('$ctrl.day', () => this.getTimeSchedule());
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

            this.timeSchedule = list.map(item => {
                let patients = this.day.patients;
                let result = (<any>Object).assign({}, item);

                if (patients) {
                    patients.forEach(patient => {
                        let patientDate = this.dateFactory.createDateNullHours(patient.date);

                        if (this.day.date.getTime() === patientDate) {

                            if (patient.time === item.string) {
                                result.hasAppointment = true;

                                !result.appointment && (result.appointment = []);
                                result.appointment.push(this.dataFactory.getPatientById(patient.id));
                            }
                        }
                    });
                }

                return result;
            }) || [];
        }

        private createShortName (name) {
            const arr = name.split(' ');
            return `${arr[0]} ${arr[1].slice(0, 1)}. ${arr[2].slice(0, 1)}.`
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
                    if (date.hasAppointment) {
                        let names = date.appointment.map(item => this.createShortName(item.name));
                        return date.string + ' ' + names.join(', ');
                    }

                    return date.string;
            }
        }

        private showAppointment (date: any) {
            const $ctrl = this;

            const modal = this.$modal.open({
                animation: true,
                template: `
                    <div class="custom-modal">
                        <h3 class="custom-modal__item">Информация о записи</h3>

                        <div ng-repeat="item in $ctrl.date.appointment" class="custom-modal__item">
                            <div ng-bind="item.name"></div>

                            <div>
                                <span>Полис ОМС:</span>
                                <span ng-bind="item.insurancePolicy"></span>
                            </div>
                        </div>
                        <div class="custom-modal__item">
                            <span>Дата:</span>
                            <span ng-bind="$ctrl.getDate($ctrl.currentDay)"></span>
                        </div>
                        <div class="custom-modal__item">
                            <span>Врач:</span>
                            <span ng-bind="$ctrl.specialist"></span>
                        </div>
                        <div class="custom-modal__item">
                            <span>Кабинет:</span>
                            <span ng-bind="$ctrl.room"></span>
                        </div>
                    </div>
                `,
                controller: ['dateFactory', 'date', 'specialist', 'currentDay', 'room', ShowAppointmentModal.Controller],
                controllerAs: '$ctrl',
                bindToController: true,
                resolve: {
                    date: () => date,
                    specialist: () => $ctrl.day.name,
                    currentDay: () => $ctrl.day.date,
                    room: () => $ctrl.day.room
                }
            });

            modal.result.then(() => {}, () => {});
        }

        private createAppointment (date: any) {
            const $ctrl = this;

            const modal = this.$modal.open({
                animation: true,
                template: `
                    <div class="custom-modal">
                        <h3 class="custom-modal__item text-success">Запись создана</h3>
                    </div>
                `,
                controller: ['date', '$timeout', CreateAppointmentModal.Controller],
                controllerAs: '$ctrl',
                bindToController: true,
                resolve: {
                    date: () => date
                }
            });

            const fn = () => {
                const updatePatients = $ctrl.dataFactory
                    .createAppointment($ctrl.day.id, $ctrl.day.date, date.string)
                    .patients;

                $ctrl.day = (<any>Object).assign({}, $ctrl.day, {
                    patients: updatePatients
                });
            };

            modal.result.then(fn,fn);
        }

        private cancelAppointment (date: any) {
            const $ctrl = this;

            const modal = this.$modal.open({
                animation: true,
                template: `
                    <div class="custom-modal">
                        <h3 class="custom-modal__item">Отмена записи</h3>

                        <p class="custom-modal__item">Врач и пациент будут уведомлены об отмене записи</p>

                        <button
                                ng-click="$ctrl.cancel()"
                                class="custom-modal__item btn btn-danger btn-lg">Отменить</button>

                        <div>
                            <a href="#" ng-click="$ctrl.$close()">Вернуться к расписанию</a>
                        </div>
                    </div>
                `,
                controller: ['date', RemoveAppointmentModal.Controller],
                controllerAs: '$ctrl',
                bindToController: true,
                resolve: {
                    date: () => date,
                }
            });

            modal.result.then(data => {
                if (!data) return false;

                const updatePatients = $ctrl.dataFactory
                    .removeAppointment($ctrl.day.id, $ctrl.day.date, data)
                    .patients;

                $ctrl.day = (<any>Object).assign({}, $ctrl.day, {
                    patients: updatePatients
                });
            }, () => {});
        }

        private isCreate (date) {
            if (date.hasAppointment) {
                if (date.appointment && date.appointment.length >= 2) {
                    return true;
                }
            }

            return false;
        }
    }

    function directive(scheduleFactory: Services.ISchedule):ng.IDirective {
        return {
            restrict: 'E',
            templateUrl: 'components/calendar/date-item/date-item.template.html',
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
module Services {
    'use strict';

    angular
        .module(App.Module)
        .factory('dateFactory', ['dataFactory', (dataFactory: Services.IDataFactory) => new Factory(dataFactory)]);

    export interface IDateFactory {
        getMinDate(): number;
        getEvents(schedule: any): any[];
        createFullSchedule(schedule: any, period: number, startDate: any): any[];
        hasInfoForDay(date: any, range: any): any[];
        createTimeSchedule(start: any, end: any, step: number, className: string): any;
    }

    class Factory implements IDateFactory {
        private defaultWeekCounter: number;
        private twoWeeks: number;
        private dayKeys: any;

        /*@ngInject*/
        constructor (private dataFactory: Services.IDataFactory) {
            this.defaultWeekCounter = 2;
            this.twoWeeks = 12096e5;
            this.dayKeys = {
                sunday   : 0,
                monday   : 1,
                tuesday  : 2,
                wednesday: 3,
                thursday : 4,
                friday   : 5,
                saturday : 6
            };
        }

        public getMinDate () {
            return +new Date;
        }

        private getMaxDate () {
            return +new Date(+new Date + this.twoWeeks);
        }

        public hasInfoForDay (date: any, range: any) {
            let day = date.getDay();

            if (Object.keys(range).length === 1) {
                if (range.defaultDays) return range.defaultDays;
            }

            for (let item in range) {
                if (this.dayKeys[item] === day) return range[item];
            }

            return range.defaultDays || [];
        }

        public getEvents (schedule: any) {
            const $ctrl = this;
            let hasDateNow = false;

            const events = this.filterDays(schedule).map(day => {
                let status = 'full';

                if (day.getTime() === $ctrl.createDateNullHours()) {
                    hasDateNow = true;
                    status+= ' start-date';
                }

                return {
                    date: day,
                    status
                }
            });

            if (!hasDateNow) {
                events.unshift({
                    date: new Date($ctrl.createDateNullHours()),
                    status: 'start-date'
                });
            }

            return events;
        }

        public createFullSchedule (schedule: any, period: number, startDate: any) {
            const $ctrl = this;
            const maxDate: any = this.getMaxDate();
            const events: any[] = this.filterDays(schedule, period / 7, startDate);
            const filteredToMaxDate: any[] = events.filter(day => {
                return day.getTime() <= maxDate;
            });
            let list: any[] = [];

            schedule.forEach(id => {
                let spec = $ctrl.dataFactory.getSpecialistById(id);

                list.push(
                    ...filteredToMaxDate
                        .filter(day => spec.schedule.defaultDays.some(item => item.id === day.getDay()))
                        .map(day => {

                            console.log(day);
                            return (<any>Object).assign(spec, {
                                date: day
                            })

                        })
                    );
                });

            console.log(list);

            return list;
        }

        private filterDays (schedule: any, weeks: number = this.defaultWeekCounter, startDate: any = undefined) {
            // return array of active days for selected specialists

            const nextWeeks: any[] = this.createNextWeeks(weeks, startDate);
            const activeDays: any[] = this.getActiveDays(schedule);

            return nextWeeks.filter(currentDay => {
                let day = currentDay.getDay();

                return activeDays.some(activeDay => {
                    return activeDay.schedule.defaultDays.some(item => item.id === day);
                })
            });
        }

        private createDateNullHours (date?: any) {
            return date ? new Date(date).setHours(0,0,0,0) : new Date().setHours(0,0,0,0);
        }

        public createTimeSchedule (start: any, end: any, step: number, className: string) {
            const endTime = new Date().setHours(end.hours, end.minutes, 0, 0);
            let counter = start.minutes;
            const list = [];
            list.push(
                new Date().setHours(start.hours, counter, 0, 0)
            );

            while (list[list.length - 1] <= endTime) {
                counter += step;
                list.push(
                    new Date().setHours(start.hours, counter, 0, 0)
                );
            }

            return list.map(item => {
                let hours = new Date(item).getHours();
                let minutes = new Date(item).getMinutes();

                if (hours < 10) hours = '0' + hours;
                if (minutes < 10) minutes = '0' + minutes;

                return {
                    string: `${hours}:${minutes}`,
                    time: item,
                    className
                };
            });
        }

        private createNextWeeks (weeks: number, startDate: any = new Date) {
            // create array of day objects for @weeks

            const days: number = weeks * 7;
            let counter: number = 0;
            const dates: any[] = [];
            const step = (step): any => startDate.getDate() + step;
            const setDate = (day): any => this.createDateNullHours(new Date().setDate(day));

            while (counter <= days) {
                dates.push(new Date(
                    setDate(
                        step(counter)
                    )
                ));
                counter++;
            }

            return dates;
        }

        private getActiveDays (schedule: any) {
            // filter for expired schedules

            const $ctrl = this;
            return schedule
                .map($ctrl.dataFactory.getSpecialistById.bind($ctrl.dataFactory))
                .filter((item: any) => {
                    let exp = item.schedule.expiryDate;
                    if (exp === null) return true;
                    return +new Date(exp) > +new Date;
                });
        }
    }
}
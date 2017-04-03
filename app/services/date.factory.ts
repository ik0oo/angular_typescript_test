module Services {
    'use strict';

    angular
        .module(App.Module)
        .factory('dateFactory', ['dataFactory', (dataFactory: Services.IDataFactory) => new Factory(dataFactory)]);

    export interface IDateFactory {
        getMinDate(): number;
        getEvents(schedule: any): any[];
    }

    class Factory implements IDateFactory {
        private defaultWeekCounter: number;

        /*@ngInject*/
        constructor (private dataFactory: Services.IDataFactory) {
            this.defaultWeekCounter = 2;
        }

        public getMinDate () {
            return +new Date;
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

        public createFullSchedule (schedule, period) {

        }

        private filterDays (schedule: any) {
            // return array of active days for selected specialists

            const nextWeeks: any[] = this.createNextWeeks(this.defaultWeekCounter);
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

        private createNextWeeks (weeks: number) {
            // create array of day objects for @weeks

            const days: number = weeks * 7;
            let counter: number = 0;
            const dates: any[] = [];
            const step = (step): any => new Date().getDate() + step;
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
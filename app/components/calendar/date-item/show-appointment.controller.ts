module ShowAppointmentModal {
    'use strict';

    export class Controller {

        constructor (
            private dateFactory: Services.IDateFactory,
            private date: any,
            private specialist: any,
            private currentDay: any,
            private room: any) {
        }

        private getDate (date) {
            return this.dateFactory.parseDate(date);
        }
    }
}
module CreateAppointmentModal {
    'use strict';

    export class Controller {
        $close: (data: any) => void;

        constructor (private date: any, $timeout: ng.ITimeoutService) {

            $timeout(() => this.$close(date.time), 3000)
        }
    }
}
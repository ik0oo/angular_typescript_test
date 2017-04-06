module RemoveAppointmentModal {
    'use strict';

    export class Controller {
        $close: (data: any) => void;

        constructor (
            private date: any) {

        }

        private cancel () {
            this.$close(this.date.string);
        }
    }
}
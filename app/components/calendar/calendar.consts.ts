module CalendarConstants {
    'use strict';

    const CALENDAR_BUTTONS_GROUP = [{
        id: 1,
        name: '1 день'
    }, {
        id: 2,
        name: '2 дня'
    }, {
        id: 3,
        name: 'Неделя'
    }];

    angular
        .module(App.Module)
        .constant('CALENDAR_BUTTONS_GROUP', CALENDAR_BUTTONS_GROUP);
}
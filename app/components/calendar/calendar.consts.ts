module CalendarConstants {
    'use strict';

    const CALENDAR_BUTTONS_GROUP = [{
        count: 0,
        name: '1 день'
    }, {
        count: 1,
        name: '2 дня'
    }, {
        count: 6,
        name: 'Неделя'
    }];

    angular
        .module(App.Module)
        .constant('CALENDAR_BUTTONS_GROUP', CALENDAR_BUTTONS_GROUP);
}
module App {
    'use strict';

    const SPECIALISTS_BUTTONS_GROUP = [{
        name: 'По специальностям',
        id: 1
    }, {
        name: 'По алфавиту',
        id: 2
    }];

    angular
        .module(Module)
        .constant('SPECIALISTS_BUTTONS_GROUP', SPECIALISTS_BUTTONS_GROUP);
}
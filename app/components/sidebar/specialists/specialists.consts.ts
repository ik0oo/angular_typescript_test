module App {
    'use strict';

    const SPECIALTY_TYPES = {
        SPECIALTY: "SPECIALTY",
        ALPHABET: "ALPHABET"
    };

    const SPECIALISTS_BUTTONS_GROUP = [{
        name: 'По специальностям',
        type: SPECIALTY_TYPES.SPECIALTY
    }, {
        name: 'По алфавиту',
        type: SPECIALTY_TYPES.ALPHABET
    }];

    angular
        .module(Module)
        .constant('SPECIALISTS_BUTTONS_GROUP', SPECIALISTS_BUTTONS_GROUP)
        .constant('SPECIALTY_TYPES', SPECIALTY_TYPES);
}
module App {
    'use strict';

    angular
        .module(Module)
        .directive('specialistListDirective', directive);

    const userList = [{
        name: 'Григорьева Г.Г.',
        specialty: 'Терапевт',
        mu: 'ГП №128',
        room: 'к.110',
        step: 30,
        schedule: {
            hours: [{
                start: '10:00',
                end: '20:00'
            }],
            days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
        },
        ranges: {
            appointment: {
                hours: [{
                    start: '10:00',
                    end: '14:00'
                }, {
                    start: '15:00',
                    end: '20:00'
                }]
            },
            free: {
                hours: [{
                    start: '14:00',
                    end: '15:00'
                }]
            },
            learning: {}
        },
        patients: [{
            id: 1,
            date: '28.03.2017',
            time: '10:00'
        }, {
            id: 2,
            date: '28.03.2017',
            time: '10:00'
        }, {
            id: 3,
            date: '28.03.2017',
            time: '10:30'
        }]
    }];

    class controller {
        constructor() {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {});
        }
    }

    function directive():ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            template: `
                <div>

                </div>
            `,
            scope: {},
            controllerAs: '$ctrl',
            bindToController: true,
            controller
        }
    }
}
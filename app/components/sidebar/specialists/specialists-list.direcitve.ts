module App {
    'use strict';

    angular
        .module(Module)
        .directive('specialistListDirective', directive);

    class controller {
        constructor(private dataFactory) {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {});

            dataFactory.getSpecialists().then(data => console.log(data));
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
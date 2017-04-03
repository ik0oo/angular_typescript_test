module App {
    'use strict';

    angular
        .module(Module)
        .directive('dateItemDirective', directive);

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
                <div class="date-item">
                    <div class="date-item__row date-item__date">Пн. 16 сен</div>
                    <div class="date-item__row date-item__name">Елисеева Е.Е.</div>
                    <div class="date-item__row date-item__specialty">офтальмолог</div>
                    <div class="date-item__row date-item__mu">ГП №128 (к.130)</div>
                    <div class="date-item__row date-item__info">
                        <span>08:00-18:00</span>
                        <span>Работа с документами(14:30-14:55)</span>
                        <span>Работа с документами(16:20-16:40)</span>
                        <span>Врач не работает(10:00-15:00)</span>
                        <span>Обучение(14:30-16:30)</span>
                    </div>
                    <div class="date-item__schedule">
                        <div class="date-item__schedule-item"
                                ng-repeat="time in ['10:00', '11:00', '12:00', '13:00', '14:00']"
                                ng-bind="time">
                        </div>

                        <div class="date-item__schedule-item date-item__schedule-item--busy">
                            Работа с документами
                        </div>
                    </div>
                </div>
            `,
            scope: {
                day: '<'
            },
            controllerAs: '$ctrl',
            bindToController: true,
            controller
        }
    }
}
module App {
    'use strict';

    angular
        .module(Module)
        .directive('recordingDateDirective', directive);

    class controller {
        constructor () {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {
                header: 'Дата Записи'
            });
        }
    }

    function directive (): ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            template: `
                <div>
                    <block-directive
                            header="$ctrl.header">

                        <content-field class="input-group">
                            <input type="text" class="form-control input-sm" />
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-sm btn-secondary">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                    <span class="caret"></span>
                                </button>
                            </span>
                        </content-field>
                    </block-directive>
                </div>
            `,
            scope: {},
            controllerAs: '$ctrl',
            bindToController: true,
            controller
        }
    }
}
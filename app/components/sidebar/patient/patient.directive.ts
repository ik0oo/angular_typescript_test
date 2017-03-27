module App {
    'use strict';

    angular
        .module(Module)
        .directive('patientDirective', directive);

    class controller {
        constructor () {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {
                header: 'Пациент',
                searchText: 'Введите текст для поиска'
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
                            <input type="text" class="form-control input-sm" placeholder="{{$ctrl.searchText}}" />
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-sm btn-secondary">
                                    <span class="glyphicon glyphicon-search"></span>
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
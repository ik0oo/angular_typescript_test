module App {
    'use strict';

    angular
        .module(Module)
        .directive('specialistBlockDirective', directive);

    class controller {
        constructor (private SPECIALISTS_BUTTONS_GROUP) {
            const $ctrl = this;

            (<any>Object).assign($ctrl, {
                header: 'Специалисты',
                searchText: 'Введите текст для поиска',
                radioModel: SPECIALISTS_BUTTONS_GROUP[0].id,
                SPECIALISTS_BUTTONS_GROUP
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
                            header="$ctrl.header"
                            last-child="true">

                        <content-field class="specialists">
                            <div class="input-group specialists__input">
                                <input
                                        type="text"
                                        class="form-control input-sm"
                                        placeholder="{{$ctrl.searchText}}" />
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-sm btn-secondary">
                                        <span class="glyphicon glyphicon-search"></span>
                                    </button>
                                </span>
                            </div>

                            <div class="btn-group specialists__button-group">
                                <label
                                        ng-repeat="button in $ctrl.SPECIALISTS_BUTTONS_GROUP"
                                        class="btn btn-default btn-sm specialists__button-group-item"
                                        ng-model="$ctrl.radioModel"
                                        btn-radio="button.id"
                                        ng-bind="button.name"></label>
                            </div>

                            <specialist-list-directive></specialist-list-directive>
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
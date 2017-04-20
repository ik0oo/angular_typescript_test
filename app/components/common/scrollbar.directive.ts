module App {
    'use strict';

    angular
        .module(Module)
        .directive('scrollbar', directive);

    /*@ngInject*/
    function directive($parse):ng.IDirective {
        return {
            scope: {
                scrollbar: '<'
            },
            link (scope: any, element: any, attrs: any) {
                element.css({
                    position: 'relative'
                });

                element.perfectScrollbar({
                    maxScrollbarLength: 50
                });

               scope.$watch('scrollbar', newVal => {
                   if (newVal != null) element.perfectScrollbar('update');
               });
            }
        }
    }
}

module Services {
    'use strict';

    angular
        .module(App.Module)
        .factory('scheduleFactory', () => new Factory);

    export interface ISchedule {
        clear(): void;
        add(element: any): void;
        update(): void;
    }

    class Factory implements ISchedule{
        private list: any[];

        constructor () {
            this.list = [];
        }

        public clear () {
            this.list = [];
        }

        public add (element: any) {
            this.list.push(element);
        }

        public update () {
            let maxOffset: number = 0;

            this.list.forEach(item => {
                let offset = $(item).position().top;
                if (offset > maxOffset) maxOffset = offset;
            });

            this.list.forEach(item => {
                let $item = $(item);
                let marginTop = maxOffset - $item.position().top;

                $item.css({
                    marginTop
                });
            });
        }
    }
}
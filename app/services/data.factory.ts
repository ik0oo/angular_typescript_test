module Services {
    'use strict';

    angular
        .module(App.Module)
        .factory('dataFactory', ['$http', ($http) => new factory($http)]);

    export interface IDataFactory {

    }

    class factory implements IDataFactory {

        /*@ngInject*/
        constructor (private $http: ng.IHttpService) {}

        private getData (fileName: string) {
            return this.$http
                .get(`/assets/data/${fileName}.json`)
                .then(data => data)
                .catch(err => err)
        }

        public getSpecialists () {
            return this.getData('specialists');
        }

        public getPatients () {
            return this.getData('patients');
        }
    }
}
module Services {
    'use strict';

    angular
        .module(App.Module)
        .factory('dataFactory', ['$http', '$q', ($http, $q) => new Factory($http, $q)]);

    export interface IDataFactory {
        getSpecialists(): ng.IPromise<any>;
        getPatients(): ng.IPromise<any>;
        getSpecialistById(id: number): any;
    }

    class Factory implements IDataFactory {
        private speclialists: any;
        private patients: any;

        /*@ngInject*/
        constructor (private $http: ng.IHttpService, private $q: ng.IQService) {
            this.speclialists = {};
            this.patients = {};
        }

        private getData (fileName: string) {
            return this.$http
                .get(`/data/${fileName}.json`)
                .then(data => data)
                .catch(err => err)
        }

        public getSpecialists () {
            const $ctrl = this;

            return $ctrl.speclialists.promise || $ctrl.getData('specialists').then(list => {
                $ctrl.speclialists.promise = $ctrl.$q.resolve(list.data);
                $ctrl.speclialists.data = list.data;
                return $ctrl.speclialists.promise;
            });
        }

        public getSpecialistById (id: number) {
            const $ctrl = this;

            if (!$ctrl.speclialists.data) return null;

            return $ctrl.speclialists.data.filter(spec => spec.id == id)[0];
        }

        public getPatients () {
            const $ctrl = this;

            return $ctrl.patients.promise || $ctrl.getData('patients').then(list => {
                $ctrl.patients.promise = $ctrl.$q.resolve(list.data);
                $ctrl.patients.data = list.data;
                return $ctrl.patients.promise;
            })
        }
    }
}
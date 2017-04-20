module Services {
    'use strict';

    angular
        .module(App.Module)
        .factory('dataFactory', ['$http', '$q', ($http, $q, dateFactory) => new Factory($http, $q)]);

    export interface IDataFactory {
        getSpecialists(): ng.IPromise<any>;
        getPatients(): ng.IPromise<any>;
        getSpecialistById(id: number): any;
        getPatientById(id: number): any;
        removeAppointment(id: number, date: any, time: string): any;
        createAppointment (id: number, date: any, time: string): any;
    }

    class Factory implements IDataFactory {
        private speclialists: any;
        private patients: any;

        /*@ngInject*/
        constructor (private $http: ng.IHttpService, private $q: any) {
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

        public removeAppointment (id: number, date: any, time: string) {
            const spec = this.getSpecialistById(id);
            const nullHoursDate = (date) => new Date(date).setHours(0, 0, 0, 0);

            spec.patients = spec.patients.filter(item => {

                if (date.getTime() === nullHoursDate(item.date)) return item.time !== time;

                return true;
            });

            this.speclialists.data = this.speclialists.data.map(item => {
                if (item.id === spec.id) {
                    return (<any>Object).assign({}, item, {
                        patients: spec.patients
                    });
                }

                return item;
            });

            return spec;
        }

        private parseDate (date) {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            if (day < 10) day = '0' + day;
            if (month < 10) month = '0' + month;

            return `${month}.${day}.${year}`;
        }

        public createAppointment (id: number, date: any, time: string) {
            const spec = this.getSpecialistById(id);
            const generateId: any = () :number => {
              return parseInt(String(Math.random() * (5 - 1) + 1));
            };

            if (spec.patients === null) spec.patients = [];

            spec.patients.push({
                id: generateId(),
                date: this.parseDate(date),
                time
            });

            this.speclialists.data = this.speclialists.data.map(item => {
                if (item.id === spec.id) return (<any>Object).assign({}, item, {
                    patients: spec.patients
                });

                return item;
            });

            return spec;
        }

        public getPatients () {
            const $ctrl = this;

            return $ctrl.patients.promise || $ctrl.getData('patients').then(list => {
                $ctrl.patients.promise = $ctrl.$q.resolve(list.data);
                $ctrl.patients.data = list.data;
                return $ctrl.patients.promise;
            })
        }

        public getPatientById (id: number) {
            const $ctrl = this;

            if (!$ctrl.patients.data) return null;

            return $ctrl.patients.data.filter(spec => spec.id == id)[0];
        }
    }
}

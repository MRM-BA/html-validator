'use strict';

/**
 * @module validatorService
 * @memberOf validatorController
 */
angular.module('validatorService', ['mrmConfiguration'])

    .factory('ValidatorService', function($http, serverConfiguration) {
        var publicApiPath = serverConfiguration.getPublicApiPath().replace(/:([^:]*)$/, '\:$1');


        /**
         * @constructor ValidatorService
         */

        var ValidatorService = function() {

            /**
             * @function fileUpload
             * @memberOf mrmValidate.ValidatorService
             * @param dto
             * @returns {Object}
             */

            this.fileUpload = function(dto) {

                var servicePath = 'validation';
                var url = publicApiPath + servicePath;
                var fileUploadPromise = $http({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity,
                    data: dto,
                    withCredentials: true
                }).then(function(res) {
                    return  res.data.messages;
                });
                return fileUploadPromise;

            };

        }

        return new ValidatorService();
    })

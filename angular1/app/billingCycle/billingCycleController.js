(function () {
    angular.module('primeiraApp').controller('BillingCycleCrl', [
        '$http',
        BillingCycleController
    ])
    function BillingCycleController($http) {
        const vm = this
        const url = 'http://localhost:3003/api/billingCyles'

        vm.refresh = function(){
          
        }

        vm.create = function () {
            $http.post(url, vm.billingCycle).then(function (response) {
                vm.billingCycle = {}
                console.log('Success')
            }).catch(function(response){
              console.log(response.data.errors)
            })
        }
    }
})()

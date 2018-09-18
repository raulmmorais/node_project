(function () {
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http',
        'msgs',
        BillingCycleController
    ])
    function BillingCycleController($http, msgs) {
        const vm = this
        const url = 'http://localhost:3003/api/billingCycles'

        vm.refresh = function(){
            vm.billingCycle = {}
        }

        vm.create = function () {
          $http.post(url, vm.billingCycle).then(function(response){
            refresh()
            msgs.addSuccess("Operação Realizada com Sucesso")
          }).catch(function(response){
            msgs.addError(response.data.errors)
          })
        }
    }
})()

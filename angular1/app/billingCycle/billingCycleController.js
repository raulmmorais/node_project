(function () {
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http',
        'msgs',
        'tabs',
        BillingCycleController
    ])
    function BillingCycleController($http, msgs, tabs) {
        const vm = this
        const url = 'http://localhost:3003/api/billingCycles'

        vm.refresh = function(){
          $http.get(url).then(function(response){
            vm.billingCycle = {}
            vm.billingCycles = response.data
            tabs.show(vm, {tabList: true, tabCreate: true})
          }).catch(function(response) {
            console.log(response.data)
            msgs.addError(response.data.errors)
          })
        }

        vm.create = function () {
          $http.post(url, vm.billingCycle).then(function(response){
            msgs.addSuccess("Operação Realizada com Sucesso")
            vm.refresh()
          }).catch(function(response){
            console.log(response)
            msgs.addError(response.data.errors)
          })
        }

        vm.update = function(){
           const updateURL = `${url}/${vm.billingCycle._id}`
          $http.put(updateURL, vm.billingCycle).then(function(response){
            msgs.addSuccess("Ciclo Atualizado Com Sucesso")
            vm.refresh()
          })
        }

        vm.delete = function(){
          const deleteUrl = `${url}/${vm.billingCycle._id}`
          $http.delete(deleteUrl, vm.billingCycle).then(function(response){
            msgs.addSuccess("Ciclo Deletado Com Sucesso")
            vm.refresh()
          })
        }

        vm.showTabUpdate = function(billingCycle){
          vm.billingCycle = billingCycle
          tabs.show(vm, {tabUpdate: true})
        }

        vm.showTabDelete = function(billingCycle){
          vm.billingCycle = billingCycle
          tabs.show(vm, {tabDelete: true})
        }

        vm.refresh()
    }
})()

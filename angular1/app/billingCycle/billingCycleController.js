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
            vm.billingCycle = {credits: [{}], debts:[{}]}
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
          }).catch(function (response) {
              msgs.addError(response.data.errors)
          })
        }

        vm.delete = function(){
          const deleteUrl = `${url}/${vm.billingCycle._id}`
          $http.delete(deleteUrl, vm.billingCycle).then(function(response){
            msgs.addSuccess("Ciclo Deletado Com Sucesso")
            vm.refresh()
          }).catch(function (response) {
              msgs.addError(response.data.errors)
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

        vm.addCredit = function(index){
          vm.billingCycle.credits.splice(index + 1, 0, {})
        }

        vm.cloneCredit = function(index, {name, value}){
          vm.billingCycle.credits.splice(index + 1, 0, {name, value})
        }

        vm.deleteCredit = function(index){
          if (vm.billingCycle.credits.lenght > 1) {
            vm.billingCycle.credits.splice(index, 1)
          }
        }

        vm.addDebt = function(index){
          vm.billingCycle.debts.splice(index + 1, 0, {})
        }

        vm.cloneDebt = function(index, {name, value}){
          vm.billingCycle.debts.splice(index + 1, 0, {name, value, status})
        }

        vm.deleteDebt = function(index){
          if (vm.billingCycle.debts.lenght > 1) {
            vm.billingCycle.debts.splice(index, 1)
          }
        }

        vm.refresh()
    }
})()

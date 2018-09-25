(function () {
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http',
        '$location',
        'msgs',
        'tabs',
        BillingCycleController
    ])
    function BillingCycleController($http, $location, msgs, tabs) {
        const vm = this
        const url = 'http://localhost:3003/api/billingCycles'

        vm.refresh = function(){
          const page = parseInt($location.search().page) || 1
          $http.get(`${url}?skip=${(page - 1) * 5}&limit=5`).then(function(response){
            vm.billingCycle = {credits: [{}], debits:[{}]}
            vm.billingCycles = response.data
            vm.calcularValores()
            tabs.show(vm, {tabList: true, tabCreate: true})

            $http.get(`${url}/count`).then(function(response){
              vm.pages = Math.ceil(response.data.value/5)
            }).catch(function(response){
              msgs.addError(response.data.errors)
            })

          }).catch(function(response) {
            msgs.addError(response.data.errors)
          })
        }

        vm.create = function () {
          $http.post(url, vm.billingCycle).then(function(response){
            msgs.addSuccess("Operação Realizada com Sucesso")
            vm.refresh()
          }).catch(function(response){
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
          vm.calcularValores()
          /*if (vm.billingCycle.credits == null || (vm.billingCycle.credits.lenght==1 && vm.billingCycle.credits[0].value == null)) {
            vm.billingCycle.credits = [{'name':'', 'value':''}]
          }
          if (vm.billingCycle.debits == null || vm.billingCycle.debits.value == null) {
            vm.billingCycle.debits = [{'name':'', 'value':''}]
          }*/
          tabs.show(vm, {tabUpdate: true})
        }

        vm.showTabDelete = function(billingCycle){
          vm.billingCycle = billingCycle
          vm.calcularValores()
          tabs.show(vm, {tabDelete: true})
        }

        vm.addCredit = function(index){
          vm.billingCycle.credits.splice(index + 1, 0, {})
        }

        vm.cloneCredit = function(index, {name, value}){
          vm.billingCycle.credits.splice(index + 1, 0, {name, value})
          vm.calcularValores()
        }

        vm.deleteCredit = function(index){
          if (vm.billingCycle.credits.lenght > 1) {
            vm.billingCycle.credits.splice(index, 1)
            vm.calcularValores()
          }
        }

        vm.addDebt = function(index){
          vm.billingCycle.debits.splice(index + 1, 0, {})
        }

        vm.cloneDebt = function(index, {name, value, status}){
          vm.billingCycle.debits.splice(index + 1, 0, {name, value, status})
          vm.calcularValores()
        }

        vm.deleteDebt = function(index){
          if (vm.billingCycle.debits.lenght > 1) {
            vm.billingCycle.debits.splice(index, 1)
            vm.calcularValores()
          }
        }

        vm.calcularValores = function(){
          vm.credit = 0
          vm.debit = 0

          if(vm.billingCycle){
            vm.billingCycle.credits.forEach(function({value}){
              vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
            })
            vm.billingCycle.debits.forEach(function({value}){
              vm.debit += !value || isNaN(value) ? 0: parseFloat (value)
            })
          }
          vm.total = vm.credit - vm.debit
        }

        vm.refresh()
    }
})()

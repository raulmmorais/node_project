(function () {
    angular.module("primeiraApp").controller('BillingCycleCrl', [
        '$http',
        BillingCycleController
    ])
    function BillingCycleController() {
        const vm = this

        vm.create = function () {
            const url = 'http://localhost:3003/api/billingSummary'

            $http({
                method: 'POST',
                url : url,
                data: vm.billingCycle,
            }).then(function (response) {
                vm.billingCycle = {}
                console.log('Success')
            })
        }
    }
})()
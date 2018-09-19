(function(){
  angular.module('primeiraApp').factory('tabs', [TabsFactpry])

  function TabsFactpry(){
    function show(owner, {
      tabList = false,
      tabCreate = false,
      tabUpdate = false,
      tabDelete = false
    }){
      owner.tabList = tabList
      owner.tabCreate = tabCreate
      owner.tabUpdate = tabUpdate
      owner.tabDelete = tabDelete
    }
    return {show}
  }
})()

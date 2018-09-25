(function () {
  angular.module('primeiraApp').component('paginator',{
    bindings:{
      url:'@',
      nPages:'@',
      tss:'@',
    },
    controller: [
      '$location',
      function($location){
        this.$onInit = function(){
          const pages = parseInt(this.nPages) || 1
          this.pagesArray = Array(pages).fill(0).map((e, i) => i + 1)
          this.current = parseInt($location.search().page) || 1
          this.needPagination = this.nPages > 1
          this.hasPrev = this.current > 1
          this.hasNext = this.current < this.nPages

          console.log("nPages: " + this.nPages)
          console.log("tss: " + this.tss)
          console.log("current: " + this.current)
          console.log("needPagination: " + this.needPagination)
          console.log("hasPrev: " + this.hasPrev)
          console.log("hasNext: " + this.hasNext)
          console.log("url: " + this.url)

          this.isCurrent = function(i){
            return this.current == 1
          }
        }
      }
    ],
    template: `
    <ul ng-if="$ctrl.needPagination" class="pagination pagination-sm no-margin pull-right">
      <li ng-if="$ctrl.hasPrev">
        <a href="{{ $ctrl.url }}?page={{ $ctrl.current - 1 }}">Anterior</a>
      </li>
      <li ng-class="active: $ctrl.isCurrent(index)" ng-repeat="index in $ctrl.pagesArray">
        <a href="{{ $ctrl.url }}?page={{ index }}">{{ index }}</a>
      </li>
      <li ng-if="$ctrl.hasNext">
        <a href="{{ $ctrl.url }}?page={{ $ctrl.current + 1 }}">Próximo</a>
      </li>
    `
  })
})()

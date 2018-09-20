(function () {
   angular.module('primeiraApp').component('field', {
       bindings:{
           grid: '@',
           inputId: '@',
           label: '@',
           placeholder: '@',
           type:'@',
           model: '=',
           readonly: '<',
       },
       controller:[
           'gridSystem',
           function(gridSystem){
               this.$onInit = function () {
                   this.gridClasses = gridSystem.toCssClasses(this.grid)
               }
           }
       ],
       template:`
        <div class="{{$ctrl.gridClasses}}">
            <div class="form-group">
                <label for="{{$ctrl.inputId}}">{{$ctrl.label}}</label>
                <input id="{{$ctrl.inputId}}" type="{{$ctrl.type}}" class="form-control" placeholder="{{$ctrl.placeholder}}"
                ng-model="$ctrl.model" ng-readonly="$ctrl.readonly">
            </div>
        </div>
       `
   })
})()

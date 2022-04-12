
angular.

  module('NarrowItDownApp').

  component('founditems', {  // This name is what AngularJS uses to match to the `founditems` element.
    template:  '<table ><tr ng-repeat="item in $ctrl.foundItems2">' +
            '<td>{{item.name}}</td>' +
            '<td>{{item.short_name}}</td>' +
            '<td>{{item.description}}</td>' +
            '<td><button  class="btn btn-default" ng-click="removeItem($index)">' +
            '<span class="glyphicon glyphicon-remove"></span> Don&apos;t want this one! </button>' +
          '</tr>' +
        '</table>',
        styleUrls: ['./css/style.css'],

    controller: function componentController($scope,MenuSearchService,) {
      this.foundItems2=MenuSearchService.foundItems;
      this.message2=MenuSearchService.message;

      $scope.removeItem = function (anindex) {
             
             console.log(anindex);
             MenuSearchService.removeIt(anindex);

        }

      }

  });
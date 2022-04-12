    
(function() { //iife 
    var app=angular.module("NarrowItDownApp", []); 



  



  app.factory('MenuSearchService', function($http) {
  
    var svc = {

      foundItems: [],

      
      message:{msg:""},

      getItems: function() {
   
         return this.foundItems;
      },


      getMatchedMenuItems: function(searchTerm) {
        const url="https://davids-restaurant.herokuapp.com/menu_items.json";
        //const promise = this.httpClient.get(url).toPromise();


        temp=[];
        this.foundItems.length=0;//clear array
        this.message["msg"]="";
        
        
        const promise=$http({method: 'GET',url,Accept: 'application/json'}); //http returns a promise
        console.log(promise);  
          
                                
        promise.then((data)=>{
           console.log("Promise resolved with: " + data);
           
           
           //console.log(Object.keys(data));
           datadict=data["data"];
           items=datadict["menu_items"];
           console.log(items);
           for(var i=0; i<items.length; i++) {
             anitem=items[i];
             //console.log("item="+anitem);
             desc=anitem["description"];
             //console.log("description="+desc);
             stranitem=JSON.stringify(anitem);
             console.log(stranitem);
             if (desc.includes(searchTerm)){
                this.foundItems.push(anitem);
             }
             
           }
           if (this.foundItems.length==0){
             this.message["msg"]="Nothing Found";
           }
          
 
           //console.log(test);

        }, (error)=>{
           console.log("Promise rejected with " + JSON.stringify(error));
        })
         


        //this.foundItems=temp;
        console.log("printout of foundItems");
        console.log(this.foundItems);
        
      },

      removeIt: function(anindex) {
          this.foundItems.splice(anindex,1);

      }
 

    };//end of var serivce

    return svc;
  });

    app.controller("NarrowItDownController", function($scope, MenuSearchService) {
        //$scope.lunchitems = ["Milk", "Bread", "Cheese"];
        var c1=this;
        //$scope.foundItem2 = MenuSearchService.foundItems;
       $scope.message=MenuSearchService.message;
       //this.$scope.detectChanges();
  
        $scope.foundItems = function () {
             var searchTerm=$scope.searchTerm;
             console.log(searchTerm);
             MenuSearchService.getMatchedMenuItems(searchTerm);

        }

            
    });


   




}());


'use strict';

angular.module('myController', ["ngResource"])


.controller('ProductsCtrl', ['$scope', 'productsService',
  function($scope, productsService) {



    //--------------  
     var lastId = 0;  
     var limit = 10;   
     $scope.noMoreItemsAvailable = true;
 
     console.log('xxxxxxx');
     var products = productsService.search({'limit':limit,'lastId': lastId},function(products){
      console.log('yyyyyyyy');
      lastId = products[products.length-1]._id;
      //console.log("prod_id" + $scope.lastId );
      $scope.products = products;

     });

    $scope.loadMore = function(){   
          productsService.search({'limit':limit,'lastId': lastId} ,function(products){

          console.log('ccccc' + products.length);
          var mys = products.length > 0 ? products.length-1 : 0;
          if (mys == 0){
              $scope.noMoreItemsAvailable = false;
          }
          else{
            lastId = products[mys]._id;
            console.log("prod_idLoadMore" + lastId );
            
            $scope.$broadcast('scroll.infiniteScrollComplete');  
            $scope.products = $scope.products.concat(products);
          }
          

     }); 
           
    } 
      
  }])



.controller('UpdateCtrl', ['$scope', '$stateParams','productsService', '$location', '$resource',
  function($scope, $stateParams, productsService, $location, $resource) {
      var key = $stateParams.Im;

      //var product1 = $resource("http://localhost:3000/api/products/:Im", {Im: "@id" });
      
        var product = productsService.get({'Im': key});



        console.log('UpdateCtrl....key...' + key);

        $scope.product = product; 
 
        $scope.submit = function() {
          console.log ('update...' + product.title);
          product.$save();
          $location.path('/p/list');
          
        } 

    }])

.controller('insertController', ['$scope', 'productsService', '$location',
  function($scope, productsService, $location) {

        $scope.submit = function() {
          console.log ('......' + $scope.product.title);
          var p = new productsService ({title: $scope.product.title, description: $scope.product.description});
          //console.log ('ppp......' + p.title);
          p.$save();
          console.log ('insert...' + p)
          $location.path('/p/list');
          
        }

    }]);



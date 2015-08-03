angular.module("myApiService", ["ngResource"])

 // Products Resource
.factory("productsService", function ($resource) {
    return $resource(
        "https://still-tor-1383.herokuapp.com/api/products/:Im", {Im: "@_id" } ,
        { 
	        search: {
	            method: 'GET',
	            isArray: 'true',
	            params: {
	                limit: "@limit",
	                lastId: '@lastId' 
	            }
	        }
    	}
    );
}); 
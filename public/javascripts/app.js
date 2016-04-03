var app = angular.module('peertapp', ['ui.router', 'ngResource']);

app.config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function config($stateProvider, $urlRouterProvider, $locationProvider) {
    console.log('config');
    //this allows us to use routes without hash params!
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    // for any unmatched URL redirect to /
    $urlRouterProvider.otherwise("/");

     $stateProvider
      .state('home', {
        url: "/",
        controller: 'HomeController',
        controllerAs: 'home',
        templateUrl: "templates/home.html"
      })

      // .state('about', {
      //   url: "/about",
      //   controller: 'HomeController',
      //   controllerAs: 'home',
      //   templateUrl: "templates/about.html"
      // 	})

      //  .state('show', {
      //   url: "/shoes/:id",
      //   controller: 'HomeController',
      //   controllerAs: 'home',
      //   templateUrl: "templates/shoeshow.html"
      // 	})

      // .state('contact', {
      //   url: "/contact",
      //   controller: 'HomeController',
      //   controllerAs: 'home',
      //   templateUrl: "templates/contact.html"
      // 	});
  }



app.controller('HomeController', HomeController);

app.service('Beer', function($resource) {
  return $resource('http://localhost:3000/api/beers/:id', { id: '@_id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
});

app.service('Comment', function($resource) {
  return $resource('http://localhost:3000/api/comments/:id', { id: '@_id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
});

	function HomeController(Beer, Comment, $scope) {
		this.newBeer = {};
    this.beers = Beer.query();
    this.createBeer = createBeer;
    this.updateBeer = updateBeer;
    this.deleteBeer = deleteBeer;
    this.incrementUpvotes = incrementUpvotes;
    this.newBeer ={};
    this.comments = Comment.query();
    this.createComment = createComment;

	function updateBeer(beer) {
		console.log('updating3');
	    Beer.update({id: beer._id}, beer);
	    this.displayEditForm = false;
  	}

  function incrementUpvotes(beer){
      console.log('incrementing');
      beer.upvotes += 1;
      Beer.update({id: beer._id}, beer);
    }

	 function createBeer(){
	 	console.log('incrementing2');
	      Beer.save(this.newBeer);
	      this.beers.push(this.newBeer);
	      this.newBeer = {};
	      console.log('saved');
	 }

  	function deleteBeer(beer) {
	  	console.log("deleting", beer._id);
	    Beer.remove({id:beer._id});
	    var beersIndex = this.beers.indexOf(beer);
	    this.beers.splice(beersIndex, 1);
  	}

    function createComment(beer) {
      this.newComment.beerId = beer._id;
      Comment.save(this.newComment);
      this.comments.push(this.newComment);
      this.newComment = {};
      console.log('saved comment');
    }
}	
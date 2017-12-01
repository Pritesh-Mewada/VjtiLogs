var app = angular.module('vlog',['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller:'home-fetch'
        })

        // nested list with custom controller
        .state('contact', {
            url: '/contact',
            templateUrl: 'contact.html'

        }).state('post', {
            url: '/post',
            templateUrl: 'post.html',
            controller:'post_info'
        }).state('about', {
            url: '/about',
            templateUrl: 'about.html'
        })

});



app.controller("post_info",function ($scope,$http) {
    $scope.pritesh="i am working"
    $scope.user={};

    $scope.user.name ="";
    $scope.user.email="";
    //validate email

    $scope.user.number="";
    // validate number
    $scope.user.message="";

    $scope.submit = function () {

        console.log(JSON.stringify($scope.user));

        $http.post('/postdata',$scope.user).then(function (response) {
            console.log("data sent "+response.data);
        },function (error){
            console.log("error");
        })

    }



});


app.controller("home-fetch",function ($scope,$http) {

    $http.get("/getmessage").then(function (res) {

        $scope.messages = res.data;

    },function (err) {

    });

})
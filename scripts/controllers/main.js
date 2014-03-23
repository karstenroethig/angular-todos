'use strict';

angular.module( 'mytodoApp' ).controller( 'MainController', function( $scope ) {

	$scope.newTodo = '';

	if( typeof( Storage )!== "undefined" ) {
		var todosInStore = localStorage.getItem( 'todos' );
	} else {
		console.log( 'Sorry! No Web Storage support..' );
	}

	$scope.todos = todosInStore && todosInStore.split( '\n' ) || [];

	$scope.$watchCollection( 'todos', function( newCollection, oldCollection, scope ) {

		if( typeof( Storage )!== "undefined" ) {
			localStorage.setItem( 'todos', $scope.todos.join( '\n' ) );
		}
	});

	$scope.addTodo = function() {

		if( $scope.newTodo.trim().length < 1 ) {
			return;
		}

		if( $scope.todos.indexOf( $scope.newTodo ) >= 0 ) {
			$scope.newTodo = '';
			return;
		}

		$scope.todos.push( $scope.newTodo );
		$scope.newTodo = '';
	};

	$scope.removeTodo = function( index ) {
		$scope.todos.splice( index, 1 );
	};

	$scope.moveUpTodo = function( index ) {

		if( index == 0 ) {
			return;
		}

		var item = $scope.todos.splice( index, 1 );
		$scope.todos.splice( index - 1, 0, item );
	};

	$scope.moveDownTodo = function( index ) {
		var item = $scope.todos.splice( index, 1 );
		$scope.todos.splice( index + 1, 0, item );
	};
});
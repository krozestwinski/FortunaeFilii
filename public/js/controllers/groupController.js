function GroupController($scope, chatService) {
	$scope.messages = [];
	$scope.message = '';

	$scope.showMessage = function (user, message) {
		$scope.$apply(function () {
			$scope.messages.push({user : user, message : message});
		});
	};

	$scope.sendMessage = function() {
		chatService.sendMessage($scope.message);		
		$scope.message = '';
	};
	
	chatService.connect(function (user, message) {		
		$scope.showMessage(user, message);
	});
}

GroupController.$inject = ['$scope', 'chatService'];

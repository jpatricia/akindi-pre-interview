var app = angular.module('app', []);
app
	.controller('mainController', function($scope) {
		$.getJSON('data.json', function(res) {
			var counter = 0;
			$scope.data = res.tableData.map(function(row) {
				row.status = row.activeStatus ? 'Active' : 'Inactive';
				var d = new Date(row.lastSeen);
				row.lastActive = d.toDateString();
				return row;
			});
			$scope.$apply();
		});

		$scope.changeActiveStatus = function(row) {
			var cloneData = _.cloneDeep(row);
			cloneData.activeStatus = !cloneData.activeStatus;
			cloneData.status = cloneData.activeStatus ? 'Active' : 'Inactive';
		};

		$scope.addClass = function(status) {
			if(status) return 'active';
			return 'inactive';
		};

		$scope.rowClass = function(status) {
			if(status) return '';
			return 'nonactive';
		};

		$scope.changeSorting = function(colName) {
			$scope.data = _.sortBy($scope.data,[colName]);
		};
	});
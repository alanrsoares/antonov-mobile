angular.module('antonov.services', [])

.factory('metricManager', function() {

	var tiles = [{
		id: 1,
		header: "Revenue",
		body: "$143,450",
		style: "mint"
	}, {
		id: 2,
		header: "Sales",
		body: "3,423",
		style: "grass"
	}, {
		id: 3,
		header: "Avg. Ticket",
		body: "$132.45",
		style: "sunflower"
	}, {
		id: 4,
		header: "Payments",
		body: "28%",
		footer: "MasterCard",
		style: "bittersweet"
	}, {
		id: 5,
		header: "Order Status",
		body: "8%",
		footer: "Approved",
		style: "grapefruit"
	}, {
		id: 6,
		header: "TRO",
		body: "28%",
		style: "grass"
	}];

	var tile = function(tileId) {
		return _.find(tiles, {
			'id': parseInt(tileId)
		});
	};

	return {
		tiles: tiles,
		tile: tile
	};
})

.factory('tileBuilder', function() {

	var buildRows = function(tilesData, maxColumns) {

		maxColumns = maxColumns || 2;

		var tilesLength = tilesData.length;

		var rowsLength = Math.ceil(tilesLength / maxColumns);

		var rows = [];

		for (var i = 0; i < rowsLength; i++) {
			var row = [];
			for (var k = 0; k < maxColumns; k++) {
				if (tilesData.length > 0)
					row.push(tilesData.shift());
			}
			rows.push(row);
		};

		return rows;
	}

	return {
		buildRows: buildRows
	};
})
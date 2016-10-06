
var util = require('../../utils/util.js')
Page({
	data: {
	  chessboardDatas: [
	      [0,0,0,0],
	      [0,0,0,0],
	      [0,0,0,0],
	      [0,0,0,0]
	   ]  
	},
	getChessboardCellNum: function(index){
		var loopCount = 0;
		for (var i = 0; i < this.data.chessboardDatas.length; i++) {
			for (var j = 0; j < this.data.chessboardDatas[i].length; j++) {
				if (index == loopCount++) {
					cell = this.data.chessboardDatas[i][j];
				}
			}
		}
		return cell;
	},
	setChessboardCellNum: function(index,num){
		var loopCount = 0;
		for (var i = 0; i < this.data.chessboardDatas.length; i++) {
			for (var j = 0; j < this.data.chessboardDatas[i].length; j++) {
				if (index == loopCount++) {
					this.data.chessboardDatas[i][j] = num;
				}
			}
		}
	},
	onLoad: function(options) {
		var num = util.getRandomNum(0,15);
		console.log(num);
		this.setChessboardCellNum(num,2);

		num = util.getRandomNum(0,15);
		console.log(num);
		this.setChessboardCellNum(num,4);

		console.log(this.data.chessboardDatas);
	},
})
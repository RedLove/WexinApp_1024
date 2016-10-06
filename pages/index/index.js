
var util = require('../../utils/util.js')
Page({
	data: {
	  chessboardDatas: [
	      [2,0,2,0],
	      [0,2,0,0],
	      [2,4,2,0],
	      [0,0,2,4]
	   ]  
	},
	reset: function(){
		var chessDefaultDatas = [
		      [0,0,0,0],
		      [0,0,0,0],
		      [0,0,0,0],
		      [0,0,0,0]
		   ] ;

		var maxInitNum = util.getRandomNum(1,8);
		while(maxInitNum>0){
			var num = util.getRandomNum(0,15);
			this.setChessboardCellNum(chessDefaultDatas,num,2);
			maxInitNum--;
		}

		this.setData({
			chessboardDatas: chessDefaultDatas
		});
	},
	getChessboardCellNum: function(array,index){
		var loopCount = 0;
		var cell;
		for (var i = 0; i < array.length; i++) {
			for (var j = 0; j < array[i].length; j++) {
				if (index == loopCount++) {
					cell = array[i][j];
				}
			}
		}
		return cell;
	},
	setChessboardCellNum: function(array,index,num){
		var loopCount = 0;
		for (var i = 0; i < array.length; i++) {
			for (var j = 0; j < array[i].length; j++) {
				if (index == loopCount++) {
					array[i][j] = num;
				}
			}
		}
	},
	generateNewCellNum: function(chessboardDatas){
		// 1.求出所有剩余空元素
		var remainNullCellNum = 0;
		for (var i = 0; i < chessboardDatas.length; i++) {
			for (var j = 0; j < chessboardDatas[i].length; j++) {
				if (chessboardDatas[i][j]==0) {
					remainNullCellNum++;
				}
			}
		}
		// 2.随机位置产生一个数
		var newCellNumIndex = util.getRandomNum(0,remainNullCellNum);
		var count = 0;
		for (var i = chessboardDatas.length-1; i >= 0; i--) {
			for (var j = chessboardDatas[i].length-1 ; j >= 0; j--) {
				if (chessboardDatas[i][j]!=0) {
					continue;
				}
				count++;
				if (newCellNumIndex == count) {
					chessboardDatas[i][j] = 2;
				}
			}
		}
	},
	onLoad: function(options) {
		// wx.onAccelerometerChange(function (res) {
		//   console.log(res.x)
		//   console.log(res.y)
		//   console.log(res.z)
		// })
	},
	turnEnd: function(chessboardDatas){
		this.generateNewCellNum(chessboardDatas);
        this.setData({
        	chessboardDatas:chessboardDatas
      	})
        util.scan_array(this.data.chessboardDatas);
	},
	// FIXME: 不在一起的时候不会合并
	turnUp: function(){
		var chessboardDatas = this.data.chessboardDatas;
		for (var i = 0; i < chessboardDatas.length-1; i++) {
			for (var j = 0; j < chessboardDatas[i].length; j++) {
				if(chessboardDatas[i][j] == chessboardDatas[i+1][j]){
					chessboardDatas[i][j]=chessboardDatas[i][j]+chessboardDatas[i+1][j];  
	                chessboardDatas[i+1][j]=0;  
	                this.reorder_up(chessboardDatas); 
				}
			}
		}
		this.turnEnd(chessboardDatas);
	},
	turnDown: function(){
		var chessboardDatas = this.data.chessboardDatas;
		for (var i = chessboardDatas.length-1; i >= 1; i--) {
			for (var j = chessboardDatas[i].length-1 ; j >= 0; j--) {
				if(chessboardDatas[i][j] == chessboardDatas[i-1][j]){
					chessboardDatas[i][j]=chessboardDatas[i][j]+chessboardDatas[i-1][j];  
	                chessboardDatas[i-1][j]=0;  
	                this.reorder_down(chessboardDatas); 
				}
			}
		}
		this.turnEnd(chessboardDatas);
	},
	turnLeft: function(){var chessboardDatas = this.data.chessboardDatas;
		for (var j = 0; j < chessboardDatas.length - 1; j++) {
			for (var i = 0; i < chessboardDatas.length ; i++) {
				if(chessboardDatas[i][j] == chessboardDatas[i][j+1]){
					chessboardDatas[i][j]=chessboardDatas[i][j]+chessboardDatas[i][j+1];  
	                chessboardDatas[i][j+1]=0;  
	                this.reorder_left(chessboardDatas); 
				}
			}
		}
		this.turnEnd(chessboardDatas);
	},
	turnRight: function(){
		var chessboardDatas = this.data.chessboardDatas;
		for (var j = chessboardDatas.length-1 ; j >= 0; j--) {
			for (var i = chessboardDatas.length-1; i >= 1; i--) {
				if(chessboardDatas[i][j] == chessboardDatas[i][j-1]){
					chessboardDatas[i][j]=chessboardDatas[i][j]+chessboardDatas[i][j-1];  
	                chessboardDatas[i][j-1]=0;  
	                this.reorder_right(chessboardDatas); 
				}
			}
		}
		this.turnEnd(chessboardDatas);
	},
	reorder_up: function(chessboardDatas){
		for (var i = 0; i < chessboardDatas.length; i++) {
			for (var j = 0; j < chessboardDatas[i].length; j++) {
				var rowIndex = i;
				while(rowIndex - 1 >=0 && chessboardDatas[rowIndex-1][j]==0){
					chessboardDatas[rowIndex-1][j] = chessboardDatas[rowIndex][j];
					chessboardDatas[rowIndex][j] = 0;
					rowIndex--;
				}
			}
		}
	},
	reorder_down: function(chessboardDatas){
		for (var i = chessboardDatas.length - 2; i >= 0; i-- ) {
			for (var j = chessboardDatas[i].length - 1; j >= 0; j--) {
				var rowIndex = i;
				while(rowIndex + 1 <= chessboardDatas.length - 1 && chessboardDatas[rowIndex+1][j]==0){
					chessboardDatas[rowIndex+1][j] = chessboardDatas[rowIndex][j];
					chessboardDatas[rowIndex][j] = 0;
					rowIndex++;
				}
			}
		}
	},
	reorder_left: function(chessboardDatas){
		for (var j = 0; j < chessboardDatas.length ; j++) {
			for (var i = 0; i <chessboardDatas[j].length; i++) {
				var rowIndex = j;
				while(rowIndex - 1 >=0 && chessboardDatas[i][rowIndex-1]==0){
					chessboardDatas[i][rowIndex-1] = chessboardDatas[i][rowIndex];
					chessboardDatas[i][rowIndex] = 0;
					rowIndex--;
				}
			}
		}
	},
	reorder_right: function(chessboardDatas){
		for (var j = chessboardDatas.length - 2; j >= 0; j--) {
			for (var i = chessboardDatas.length - 1; i >= 0; i-- ) {
				var rowIndex = j;
				while(rowIndex + 1 <= chessboardDatas.length - 1 && chessboardDatas[i][rowIndex+1]==0){
					chessboardDatas[i][rowIndex+1] = chessboardDatas[i][rowIndex];
					chessboardDatas[i][rowIndex] = 0;
					rowIndex++;
				}
			}
		}
	}
})
function Box() {
	var self = this;
	// 方块图形
	self.box1 = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0]
	];
	self.box2 = [
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0]
	];
	self.box3 = [
		[0, 0, 0, 0],
		[1, 1, 1, 0],
		[0, 1, 0, 0],
		[0, 0, 0, 0]
	];
	self.box4 = [
		[0, 1, 1, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 0, 0]
	];
	self.box5 = [
		[0, 1, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 0]
	];
	self.box6 = [
		[0, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 1, 0],
		[0, 0, 1, 0]
	];
	self.box7 = [
		[0, 0, 0, 0],
		[0, 0, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 0, 0]
	];
	self.box = [self.box1, self.box2, self.box3, self.box3, self.box4, self.box5, self.box6, self.box7];
}
Box.prototype = {
	getBox: function () {
		var self = this;
		var num = 7 * Math.random();
		//[0,7] 随机取一个形状
		var index = parseInt(num);
		var result = [];
		//[1,4]
		var colorIndex = 1 + Math.floor(Math.random() * 4);
		var i, j;
		for (i = 0; i < 4; i++) {
			var child = [];
			for (j = 0; j < 4; j++) {
				// 为该形状随机设置一个颜色值
				child[j] = self.box[index][i][j] * colorIndex;
			}
			result[i] = child;
		}
		// 返回随机形状
		return result;
	}
}
function Box(){
    var self = this;
    self.box1=[
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
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
    getBox:function(){
        var self = this;
        // 随机获取一个box数据
        var num = 7 * Math.random();
        var index = parseInt(num);
        var result = [];
        // 随机获取一个1-4之间的数字
        var colorIndex = 1 + Math.floor(Math.random() * 4);
        // 把box中的 1 变成数字 colorIndex
        var i,j;
        for(i=0;i<4;i++){
            var child = [];
            for(j=0;j<4;j++){
                child[j] = self.box[index][i][j] * colorIndex;
            }
            result[i] = child;
		}
		return result;
    }
}
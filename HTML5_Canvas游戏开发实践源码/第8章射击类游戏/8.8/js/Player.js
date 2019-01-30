/**
 * 自机类
 * */
function Player(x,y,shootX,shootY,bitmapData,hp){
	base(this,Plain,[x,y,shootX,shootY,bitmapData,hp]);
	var self = this;
	// 为了区分敌机，我机，设置我机的belong属性为self
	self.belong = "self";
	// 记录鼠标按下时发觉的位置
	self.downX = self.downY = 0;
	self.bulletBitmapData=new LBitmapData(imglist["bullet01"]);
}

/**
 * 循环
 * */
Player.prototype.onframe = function (){
	var self = this;
	self.callParent("onframe",arguments);
	
	if(self.hp <= 0){
		gameOver();
	}
};
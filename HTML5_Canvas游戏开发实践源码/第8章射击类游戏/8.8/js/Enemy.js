/**
 * 敌机类
 * */
function Enemy(x,y,shootX,shootY,bitmapData,hp){
	base(this,Plain,[x,y,shootX,shootY,bitmapData,hp]);
	var self = this;
	self.belong = "enemy";
	self.bulletBitmapData=new LBitmapData(imglist["bullet02"]);
}

/**
 * 循环
 * */
Enemy.prototype.onframe = function (){
	var self = this;
	self.callParent("onframe",arguments);
	var isOut = false;
	if(self.x < -self.getWidth() || self.x > LGlobal.width || 
		self.y < -self.getHeight() || self.y > LGlobal.height){
		isOut = true;
	}
	if(isOut)self.whenOut();
	if(self.isdie || self.hp <= 0){
		plainLayer.removeChild(self);
		// 将两个对象看作圆来检测碰撞
	}else if(LGlobal.hitTestArc(self,player)){
		player.hp--;
		if(player.x < self.x){
			player.x -= player.getWidth();
		}else{
			player.x += player.getWidth();
		}
	}
};

Enemy.prototype.whenOut = function (){
	// move数组的前两个元素决定了飞机自动移动的x、y轴的速度
	// 当敌机移除游戏屏幕时，将敌机move数组中的前两个元素删除
	// 如果改变后的move数组长度是0，则将敌机的isdie属性设置为true，表示可以从画面中移除
	// 如果不为0，则敌机就会根据move数组中前两个新元素的值来进行移动
	var self = this;
	if(self.move.length > 0)self.move.splice(0,2);
	if(self.move.length == 0)self.isdie = true;
};
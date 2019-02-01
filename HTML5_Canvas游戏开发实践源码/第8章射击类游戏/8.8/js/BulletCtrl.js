/**
 * 弹药类 
 * */
function BulletCtrl(params){
	base(this,LSprite,[]);
	var self = this;
	//出现位置
	self.x = params.x;
	self.y = params.y;
	//xy轴速度
	self.xspeed = params.xspeed;
	self.yspeed = params.yspeed;
	self.bulletIndex = params.bulletIndex;
	self.bitmap = new LBitmap(params.bitmapData);
	//显示
	self.addChild(self.bitmap);
}

/**
 * 循环
 * */
BulletCtrl.prototype.onframe = function (){
	var self = this;
	//移动
	self.x += self.xspeed;
	self.y += self.yspeed;
	//位置检测
	if(self.x < 0 || self.x > LGlobal.width || self.y < 0 || self.y > LGlobal.height){
		//从屏幕移除
		bulletCtrlLayer.removeChild(self);
	}
	// 发射碰撞时，将我机的子弹序号设定为弹药库中所保存的子弹序号，然后将弹药从游戏画面中移除
	// 我机与弹药发生碰撞时，我机所发射的子弹会根据弹药中的子弹序号而发生变化
	if(LGlobal.hitTestArc(self,player)){
		player.setBullet(self.bulletIndex);
		self.parent.removeChild(self);
	}
};
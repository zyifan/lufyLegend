/**
 * 子弹类 
 * */
function Bullet(params){
	base(this,LSprite,[]);
	var self = this;
	//出现位置
	self.x = params.x;
	self.y = params.y;
	//xy轴速度
	self.xspeed = params.xspeed;
	self.yspeed = params.yspeed;
	// 区分子弹是敌机的还是我机发出的
	self.belong = params.belong;
	// 子弹是否可以从屏幕移除
	self.isdie = false;
	//子弹图片
	self.bitmap = new LBitmap(params.bitmapData);
	//显示
	self.addChild(self.bitmap);
}

/**
 * 循环
 * */
Bullet.prototype.onframe = function (){
	var self = this;
	if(self.isdie){
		self.removeRun();
		return;
	}
	//子弹移动
	self.x += self.xspeed;
	self.y += self.yspeed;
	//子弹位置检测
	if(self.x < 0 || self.x > LGlobal.width || self.y < 0 || self.y > LGlobal.height){
		//从屏幕移除
		bulletLayer.removeChild(self);
	}
	var key,plain;
	// 自己的子弹跟敌机相撞
	if(self.belong == player.belong){
		for(key in plainLayer.childList){
			plain = plainLayer.childList[key];
			if(player.objectindex != plain.objectindex && LGlobal.hitTestArc(self,plain)){
				plain.hp--;
				self.isdie=true;
				self.bitmap.bitmapData = new LBitmapData(imglist["remove"]);//替换为爆炸图片
				self.bitmap.x = -self.bitmap.getWidth() * 0.5;
				self.bitmap.y = -self.bitmap.getHeight() * 0.5;
			}
		}
	}else{
		// 子弹跟我机相撞
		if(LGlobal.hitTestArc(self,player)){
			player.hp--;
			self.isdie=true;
			self.bitmap.bitmapData = new LBitmapData(imglist["remove"]);
			self.bitmap.x = -self.bitmap.getWidth() * 0.5;
			self.bitmap.y = -self.bitmap.getHeight() * 0.5;
		}
	}
};

Bullet.prototype.removeRun = function (){
	// 将爆炸图片逐渐变大，逐渐变淡，当图片透明度为0时，将爆炸子弹移除
	var self = this;
	if(self.alpha <= 0){
		bulletLayer.removeChild(self);
		return;	
	}
	self.bitmap.scaleX+=0.1;
	self.bitmap.scaleY+=0.1;
	self.bitmap.x = -self.bitmap.getWidth() * 0.5;
	self.bitmap.y = -self.bitmap.getHeight() * 0.5;
	self.alpha-=0.1;
}
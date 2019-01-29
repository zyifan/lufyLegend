function Chara(){
	base(this,LSprite,[]);
	var self = this;
	var list = LGlobal.divideCoordinate(960,50,1,24);	
	var data = new LBitmapData(imglist["hero"],0,0,40,50);
	self.moveType = null;
	self._charaOld = self.y;
	self.hp = 3;//当前生命值
	self.maxHp = 3;//初始生命值
	self.hpCtrl = 0;
	self.isJump = true;
	self.index = 0;
	self.speed = 0;
	self.anime = new LAnimation(self,data,[
		[list[0][0]],
		[list[0][1]],
		[list[0][2],list[0][3],list[0][4],list[0][5],list[0][6],list[0][7],list[0][8],list[0][9],list[0][10],list[0][11],list[0][12]],
		[list[0][13],list[0][14],list[0][15],list[0][16],list[0][17],list[0][18],list[0][19],list[0][20],list[0][21],list[0][22],list[0][23]]
	]);
}

Chara.prototype.onframe = function (){
	var self = this;
	self._charaOld = self.y;
	// 向下移动
	self.y += self.speed;
	// speed增加
	self.speed += g;
	if(self.speed>20)self.speed=20;

	// y轴边界处理
	if(self.y > LGlobal.height){
		self.hp = 0;
	}else if(self.y < 10){
		self.hp--;
		self.y += 20;
		if(self.speed < 0)self.speed=0;
	}

	// 移动类型
	if(self.moveType == "left"){
		self.x -= MOVE_STEP;
	}else if(self.moveType == "right"){
		self.x += MOVE_STEP;
	}

	// x轴边界处理
	if(self.x  < -10){
		self.x = -10;
	}else if(self.x > LGlobal.width - 30){
		self.x = LGlobal.width - 30;
	}

	// 生命值处理
	self.addHp();

	// 每10帧切换一下人物动作动画
	if(self.index-- > 0){
		return;
	}
	self.index = 10;
	self.anime.onframe();
};
Chara.prototype.addHp = function(){
	var self = this;
	// 如果生命值减少了
	if(self.hp < self.maxHp){
		// hpCtrl 加上STAGE_STEP
		self.hpCtrl += STAGE_STEP;
		// 如果hpCtrl的值大于等于两倍的高度，则增加生命值
		if(self.hpCtrl >= LGlobal.height*2){
			self.hpCtrl= 0;
			self.hp++;
		}
	}
}
Chara.prototype.changeAction = function(){
	var self = this;
	if(self.moveType == "left"){
		hero.anime.setAction(3);
	}else if(self.moveType == "right"){
		hero.anime.setAction(2);
	}else if(hero.isJump){
		hero.anime.setAction(1,0);
	}else{
		hero.anime.setAction(0,0);
	}
}

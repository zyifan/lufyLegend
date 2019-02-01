/**
 * Main
 * */
//设定游戏速度，屏幕大小，回调函数
init(20,"mylegend",800,400,main);

/**层变量*/
//显示进度条所用层
var loadingLayer;
//游戏层
var gameLayer,plainLayer,bulletLayer,bulletCtrlLayer;
var textLayer,hpText;
//图片path数组
var imgData = new Array(
	{name:"bullet01",path:"./images/bullet01.png"},
	{name:"bullet02",path:"./images/bullet02.png"},
	{name:"item1",path:"./images/item01.png"},
	{name:"item2",path:"./images/item02.png"},
	{name:"player",path:"./images/player.png"},
	{name:"remove",path:"./images/remove.png"},
	{name:"enemy1",path:"./images/enemy1.png"},
	{name:"enemy2",path:"./images/enemy2.png"},
	{name:"enemy3",path:"./images/enemy3.png"}
);
//读取完的图片数组
var imglist;
//子弹速度数组
var barrageSpeed = 10;

var player;
// 添加敌机以及控制敌机出现事件
// ctrlList 出现在画面中的敌机列表， frames控制敌机出现的时间，bullet子弹在bulletLIst中的序号
// move控制敌机 移动的数组，img敌机图片，x/y敌机坐标，hp生命值，isboss是否是敌机的boss
var ctrlIndex = 0;
var ctrlList=[
{"frames":10,"bullet":4,"move":[-1,1,-1,-1],img:"enemy1",x:800,y:0,hp:3,isboss:false},
{"frames":15,"bullet":4,"move":[-1,1,-1,-1],img:"enemy1",x:800,y:0,hp:3,isboss:false},
{"frames":20,"bullet":4,"move":[-1,1,-1,-1],img:"enemy1",x:800,y:0,hp:3,isboss:false},
{"frames":25,"bullet":4,"move":[-1,1,-1,-1],img:"enemy1",x:800,y:0,hp:3,isboss:false},
{"frames":30,"bullet":4,"move":[-1,1,-1,-1],img:"enemy1",x:800,y:0,hp:3,isboss:false},
{"frames":50,"bullet":5,"move":[0,-1,-1,1],img:"enemy2",x:600,y:400,hp:5,isboss:false},
{"frames":55,"bullet":5,"move":[0,-1,-1,1],img:"enemy2",x:600,y:400,hp:5,isboss:false},
{"frames":60,"bullet":5,"move":[0,-1,-1,1],img:"enemy2",x:600,y:400,hp:5,isboss:false},
{"frames":65,"bullet":5,"move":[0,-1,-1,1],img:"enemy2",x:600,y:400,hp:5,isboss:false},
{"frames":70,"bullet":5,"move":[0,-1,-1,1],img:"enemy2",x:600,y:400,hp:5,isboss:false},
{"frames":90,"bullet":4,"move":[-1,-1,-1,1],img:"enemy1",x:800,y:400,hp:3,isboss:false},
{"frames":95,"bullet":4,"move":[-1,-1,-1,1],img:"enemy1",x:800,y:400,hp:3,isboss:false},
{"frames":100,"bullet":4,"move":[-1,-1,-1,1],img:"enemy1",x:800,y:400,hp:3,isboss:false},
{"frames":105,"bullet":4,"move":[-1,-1,-1,1],img:"enemy1",x:800,y:400,hp:3,isboss:false},
{"frames":110,"bullet":4,"move":[-1,-1,-1,1],img:"enemy1",x:800,y:400,hp:3,isboss:false},
{"frames":130,"bullet":5,"move":[0,1,-1,-1],img:"enemy2",x:600,y:0,hp:5,isboss:false},
{"frames":135,"bullet":5,"move":[0,1,-1,-1],img:"enemy2",x:600,y:0,hp:5,isboss:false},
{"frames":140,"bullet":5,"move":[0,1,-1,-1],img:"enemy2",x:600,y:0,hp:5,isboss:false},
{"frames":145,"bullet":5,"move":[0,1,-1,-1],img:"enemy2",x:600,y:0,hp:5,isboss:false},
{"frames":150,"bullet":5,"move":[0,1,-1,-1],img:"enemy2",x:600,y:0,hp:5,isboss:false},
{"frames":180,"bullet":3,"move":[-1,0],img:"enemy3",x:800,y:180,hp:100,isboss:true},
{"frames":200,"bullet":4,"move":[-1,1,-1,-1],img:"enemy1",x:800,y:0,hp:3,isboss:false},
{"frames":220,"bullet":5,"move":[0,1,-1,-1],img:"enemy2",x:600,y:0,hp:5,isboss:false},
{"frames":230,"bullet":4,"move":[-1,1,-1,-1],img:"enemy1",x:800,y:0,hp:3,isboss:false},
{"frames":250,"bullet":4,"move":[-1,1,-1,-1],img:"enemy1",x:800,y:0,hp:3,isboss:false}
];
var frame = 0;
var frames = 0;
/**
 * 子弹类型数组
 * 【开始角度，增加角度，子弹速度，角度加速度，子弹总数，发动频率，枪口旋转】
 * */
var bulletList = new Array(
		{startAngle:0,angle:20,step:10,speed:5,count:1},//1发
		{startAngle:-20,angle:20,step:10,speed:5,count:3},//3发
		{startAngle:-40,angle:20,step:10,speed:5,count:5},//5发
		{startAngle:0,angle:20,step:10,speed:5,count:18},//环发
		{startAngle:180,angle:20,step:50,speed:5,count:1},//1发
		{startAngle:160,angle:20,step:50,speed:5,count:3},//3发
		{startAngle:140,angle:20,step:50,speed:5,count:5}//5发
);
function main(){
	loadingLayer = new LoadingSample3();
	addChild(loadingLayer);	
	LLoadManage.load(
		imgData,
		function(progress){
			loadingLayer.setProgress(progress);
		},
		gameInit
	);
}
function gameInit(result){
	LGlobal.setDebug(true);
	imglist = result;
	removeChild(loadingLayer);
	loadingLayer = null;
	
	//游戏底层实例化
	gameLayer = new LSprite();
	addChild(gameLayer);
	gameLayer.graphics.drawRect(1,"#000000",[0,0,800,400],true,"#000000");
	
	plainLayer = new LSprite();
	gameLayer.addChild(plainLayer);
	bulletLayer = new LSprite();
	gameLayer.addChild(bulletLayer);
	bulletCtrlLayer = new LSprite();
	gameLayer.addChild(bulletCtrlLayer);
	textLayer = new LSprite();
	gameLayer.addChild(textLayer);
	hpText = new LTextField();
	hpText.color="#ffffff";
	hpText.x = hpText.y = 10;
	textLayer.addChild(hpText);
	
	// 初始化一架飞机，并添加到飞机层上
	var bitmapData = new LBitmapData(imglist["player"]);
	player = new Player(100,150,bitmapData.width,bitmapData.height*0.5,bitmapData,30);
	plainLayer.addChild(player);
	player.setBullet(0);
	
	
	gameLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
	gameLayer.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
	gameLayer.addEventListener(LMouseEvent.MOUSE_MOVE,onmove);
	gameLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
}
/**
 * 循环
 * */
function onframe(){
	var key;
	// 循环飞机层上的所有飞机，调用飞机的帧方法
	for(key in plainLayer.childList){
		plainLayer.childList[key].onframe();
	}
	for(key in bulletLayer.childList){
		bulletLayer.childList[key].onframe();
	}
	for(key in bulletCtrlLayer.childList){
		bulletCtrlLayer.childList[key].onframe();
	}
	
	setObject();
	showText();
	
	// 判断是否是射击状态
	if(!player.canshoot)return;
	// 飞机向左移动
	if(player.x - player.downX > mouseNowX - mouseStartX){
		player.x -= MOVE_STEP;
		// 如果飞机移动距离MOVE_STEP大于鼠标移动距离，则飞机移动距离等于鼠标移动距离
		if(player.x - player.downX < mouseNowX - mouseStartX){
			player.x = mouseNowX - mouseStartX + player.downX;
		}
	// 飞机向右移动
	}else if(player.x - player.downX < mouseNowX - mouseStartX){
		player.x += MOVE_STEP;
		// 如果飞机移动距离MOVE_STEP大于鼠标移动距离，则飞机移动距离等于鼠标移动距离
		if(player.x - player.downX > mouseNowX - mouseStartX){
			player.x = mouseNowX - mouseStartX + player.downX;
		}
	}
	// 向上移动
	if(player.y - player.downY > mouseNowY - mouseStartY){
		player.y -= MOVE_STEP;
		if(player.y - player.downY < mouseNowY - mouseStartY){
			player.y = mouseNowY - mouseStartY + player.downY;
		}
	// 向下移动
	}else if(player.y - player.downY < mouseNowY - mouseStartY){
		player.y += MOVE_STEP;
		if(player.y - player.downY > mouseNowY - mouseStartY){
			player.y = mouseNowY - mouseStartY + player.downY;
		}
	}
	// 飞机边界判断，超出边界则重置位置，并存储鼠标的起始坐标、存储飞机的起始坐标
	if(player.x < 0){
		player.x = 0;
		setCoordinate(mouseNowX,mouseNowY);
	}else if(player.x + player.getWidth() > LGlobal.width){
		player.x = LGlobal.width - player.getWidth();
		setCoordinate(mouseNowX,mouseNowY);
	}
	if(player.y < 0){
		player.y = 0;
		setCoordinate(mouseNowX,mouseNowY);
	}else if(player.y + player.getHeight() > LGlobal.height){
		player.y = LGlobal.height - player.getHeight();
		setCoordinate(mouseNowX,mouseNowY);
	}
}
function showText(){
	hpText.text = "";
	for(var i=0;i<player.hp;i++){
		hpText.text += "■";
	}
}
function gameClear(){
	gameLayer.die();
	gameLayer.graphics.drawRect(1,"#000000",[0,0,800,400],true,"#000000");
	var overLayer = new LSprite();
	gameLayer.addChild(overLayer);
	overLayer.graphics.drawRect(4,'#ff8800',[0,0,200,100],true,'#ffffff');
	overLayer.x = (LGlobal.width - overLayer.getWidth())*0.5;
	overLayer.y = (LGlobal.height - overLayer.getHeight())*0.5;
	
	txt = new LTextField();
	txt.text = "游戏通关！！";
	txt.size = 20;
	txt.x = 20;
	txt.y = 40;
	overLayer.addChild(txt);
}
function gameOver(){
	gameLayer.die();
	gameLayer.graphics.drawRect(1,"#000000",[0,0,800,400],true,"#000000");
	var overLayer = new LSprite();
	gameLayer.addChild(overLayer);
	overLayer.graphics.drawRect(4,'#ff8800',[0,0,200,100],true,'#ffffff');
	overLayer.x = (LGlobal.width - overLayer.getWidth())*0.5;
	overLayer.y = (LGlobal.height - overLayer.getHeight())*0.5;
	
	txt = new LTextField();
	txt.text = "游戏结束！！";
	txt.size = 20;
	txt.x = 20;
	txt.y = 40;
	overLayer.addChild(txt);
}

function setObject(){
	// 每10帧执行一次
	if(frame++ < 10)return;
	frame = 0;
	frames++;
	// 每50帧，就往bulletCtrlLayer添加一个弹药1或2
	if(frames % 50 == 0){
		var bulletIndex = Math.random()>0.5?1:2;//1、2
		var obj = new BulletCtrl({
			x:790,y:100+Math.random()*200,xspeed:-1,yspeed:0,
			bulletIndex:bulletIndex,
			bitmapData:new LBitmapData(imglist["item"+bulletIndex])
		});
		bulletCtrlLayer.addChild(obj);
	}
	var ctrlObject = ctrlList[ctrlIndex];
	// 只有当frames与当前取得的敌机出现的时间一致，才能进行添加敌机的操作
	if(ctrlObject["frames"] == frames){
		ctrlIndex++;
		
		bitmapData = new LBitmapData(imglist[ctrlObject.img]);
		var enemy;
		if(ctrlObject.isboss){
			enemy = new Boss(ctrlObject.x,ctrlObject.y,0,bitmapData.height*0.5,bitmapData,ctrlObject["hp"]);
		}else{
			enemy = new Enemy(ctrlObject.x,ctrlObject.y,0,bitmapData.height*0.5,bitmapData,ctrlObject["hp"]);
		}
		plainLayer.addChild(enemy);
		enemy.setBullet(ctrlObject.bullet);
		enemy.move = ctrlObject.move;
		enemy.canshoot = true;
	}
}
var mouseStartX,mouseStartY,mouseNowX,mouseNowY;
var MOVE_STEP = 5;

// 鼠标按下事件
function ondown(event){
	// 开始射击
	player.canshoot=true;
	setCoordinate(event.offsetX,event.offsetY);
}
// 鼠标按下时存储鼠标的起始坐标、存储飞机的起始坐标
function setCoordinate(x,y){
	mouseStartX = mouseNowX = x;
	mouseStartY = mouseNowY = y;
	player.downX = player.x;
	player.downY = player.y;
}
// 首先判断是否可移动，如果为true，则存储当前坐标
function onmove(event){
	if(!player.canshoot)return;
	mouseNowX=event.offsetX;
	mouseNowY = event.offsetY;
}
// 鼠标弹起时，停止射击和移动
function onup(event){
	player.canshoot=false;
}

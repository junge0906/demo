import { ui } from "../ui/layaMaxUI";
import { Box } from "laya/ui/Box";
import { List } from "laya/ui/List";
import { Laya } from "Laya";
import { Handler } from "laya/utils/Handler";
import { Image } from "laya/ui/Image";
import { EMessageType, EGameStatue } from "../GameEnum";
import { StatUI } from "laya/utils/StatUI";
import GameUI from "./GameUI";
import  GameConfig, { GameBaseConfig, LevelConfig } from "./Config";
import { Button } from "laya/ui/Button";
import SceneHelper from "./SceneHelper";
import { Color } from "laya/d3/math/Color";
import { Sprite } from "laya/display/Sprite";
import { Beizer, BeizerUserPoint, BeizerPoint } from "./Beizer";
import { Vector2 } from "laya/d3/math/Vector2";
import { Vector3 } from "laya/d3/math/Vector3";
import { Vector4 } from "laya/d3/math/Vector4";
import { Tween } from "laya/utils/Tween";
import { Bezier } from "laya/maths/Bezier";
import MusicCtrl from "./MusicCtrl";
import { MusicConfig } from "./MusicConfig";

/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class UIOptScene extends ui.test.UIOptSceneUI {

	msgConfig={[EGameStatue.SHAPE]:["让图框中充满陶泥","尽快完成泥胎的制作"],
				[EGameStatue.ADDCOLOR]:["给你的作品上颜色吧","尽快完成瓷器的上色"],
				[EGameStatue.ADDTEXTURE]:["选择漂亮的花纹","拍卖你的作品吧"]
}
    constructor() {
		super();
		GameUI.msgDipatcher.on(EMessageType.CHANGESTATE,this,this.changeState)
		GameUI.msgDipatcher.on(EMessageType.PROGRESS_ADDCOLOR,this,this.progressAddColor)
		GameUI.msgDipatcher.on(EMessageType.PROGRESS_POLISH,this,this.progressPolish)
		GameUI.msgDipatcher.on(EMessageType.PROGRESS_SHAP,this,this.progressShap)
		GameUI.msgDipatcher.on(EMessageType.ADDTEXTURE_FISNISH,null,this.addTexutreFinish)
		
		this.btnGoHome.on("click",this,()=>{
			console.log(">>>>  go home")
			GameUI.msgDipatcher.event(EMessageType.GOHOME)
			this.visible=false;
		});
		this.btnCuihuo.on("click",this,()=>{
			GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, {status:EGameStatue.FIRESHAPE});
		});
		this.btnAuction.on("click",this,()=>{
			console.log(">>>> 进入拍卖");
			// GameUI.msgDipatcher.event(EMessageType.CHANGESTATE,EGameStatue.Auction);
			GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, {status:EGameStatue.EXHIBITION});
		})

		this.btnPolishFinish.on("click",this,()=>{
			// this.btnPolishAddColor.visible=true;
			// this.btnPolishAuction.visible=true;
			this.btnPolishFinish.visible=false;
			GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, {status:EGameStatue.ADDTEXTURE});
		})
		this.btnPlishFinishAdvance.on("click",this,()=>{
			this.btnPolishAddColor.visible=true;
			this.btnPolishAuction.visible=true;
			this.btnPlishFinishAdvance.visible=false;
		})
		
		this.btnaddColorNext.on("click",this,()=>{
			console.log(">>>> 进入印花");
			GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, {status:EGameStatue.ADDTEXTURE});
		})
		this.btnPolishAddColor.on("click",this,()=>{
			console.log(">>>> 进入上色");
			GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, {status:EGameStatue.ADDCOLOR});
		})
		this.btnPolishAuction.on("click",this,()=>{
			console.log(">>>> 进入拍卖");
			GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, {status:EGameStatue.EXHIBITION});
		})
		this.reset();
	}


	public reset()
	{
		console.log(">>>>>  重置 ");
		this.btnCuihuo.visible=false;
		this.btnPolishFinish.visible=false;
		this.btnPlishFinishAdvance.visible=false;
		this.btnPolishAddColor.visible=false;
		this.btnPolishAuction.visible=false;
		this.addTextureArrow.visible=false;
		this.isShapBtnAnim=false;
		this.isScaleStarAnim = false;
		this.scaleAnim.stop();
		this.btnCuihuo.scale(1,1);
		this.resetProgress();
		this.nodearrow.visible=false;
	}

	private  isScaleStarAnim=false;
	private  isShapBtnAnim=false;
	private  isShapArrowAnim=false;
	private progressShap(progress:number)
	{
		let config:number[] = GameBaseConfig.shapLevelConfig;
		let config0:number =config[0];
		let config1:number =config[1];
		let config2:number =config[2];
		let lvseProgress = progress<= config0?progress: config0;
		let fenseProgress = progress<=config1?progress: config1;
		let ziseProgress = progress<= config2?progress: config2;
		let maskLength =420;
		this.maskLvse.width =lvseProgress*maskLength;
		this.maskFen.width =fenseProgress*maskLength;
		this.maskZise.width =ziseProgress*maskLength;
		
		// this.imgGood.visible = progress>config0
		// this.imgPerfect.visible = progress>config1
		// this.imgGood.pos(config0*maskLength+((config1-config0)*maskLength-60)/2,0)
		// this.imgPerfect.pos(config1*maskLength+((config2-config1)*maskLength-80)/2,0)
		// this.msgtip.text = this.msgConfig[EGameStatue.SHAPE][1];
		if(progress>=1)
		{
			this.nodeStar.visible=true;
		}
		if(progress >= config0)
		{
			this.btnCuihuo.visible=true;
		}
		this.nodeStar.visible=progress>config1;
		if(progress>config1)
		{
			if(this.isScaleStarAnim == false)
			{
				this.isScaleStarAnim = true;
				this.scaleStar.play();
			}
		}
		else
		{
			if(this.isScaleStarAnim == true)
			{
				this.scaleStar.stop();
				this.nodeStar.scale(1,1);
			}
			this.isScaleStarAnim = false;
		}
		SceneHelper.Instance.setStar(EGameStatue.SHAPE,progress>config1)
		if(progress>config0)
		{
			if(this.isShapBtnAnim==false)
			{
				this.isShapBtnAnim=true;
				this.scaleAnim.play();
			}
		}
		else
		{
			if(this.isShapBtnAnim==true)
			{
				this.isShapBtnAnim=false;
				this.scaleAnim.stop();
				this.btnCuihuo.scale(1,1);
			}
		}
		this.nodearrow.visible =progress>config1;
		if(progress>config1)
		{
			if(this.isShapArrowAnim==false)
			{
				this.isShapArrowAnim=true;
				this.arrowAnim.play();
			}
		}
		else
		{
			if(this.isShapArrowAnim==true)
			{
				this.isShapArrowAnim=false;
				this.arrowAnim.stop();
			}
		}
		
	}


	private progressAddColor(progress:number)
	{
		return;
	}
	private progressPolish(progress:number)
	{
		let config:number[] = GameBaseConfig.polishLevelConfig;
		let config0:number =config[0];
		let config1:number =config[1];
		let config2:number =config[2];
		let lvseProgress = progress<= config0?progress: config0;
		let fenseProgress = progress<=config1?progress: config1;
		let ziseProgress = progress<= config2?progress: config2;
		let maskLength =420;
		this.maskLvse.width =lvseProgress*maskLength;
		this.maskFen.width =fenseProgress*maskLength;
		this.maskZise.width =ziseProgress*maskLength;

		// this.imgGood.visible = progress>config0
		// this.imgPerfect.visible = progress>config1
		// this.imgGood.pos(config0*maskLength+((config1-config0)*maskLength-60)/2,0)
		// this.imgPerfect.pos(config1*maskLength+((config2-config1)*maskLength-80)/2,0)
		if(progress>config0)
		{
			if(SceneHelper.Instance.isHighLevel())
			{
				if(this.btnPolishAddColor.visible==false)
				{
					this.btnPlishFinishAdvance.visible=true;
				}
			}
			else
			{
				this.btnPolishFinish.visible=true;
			}
		}
		this.nodeStar.visible=progress>config1;
		if(progress>config1)
		{
			if(this.isScaleStarAnim == false)
			{
				this.isScaleStarAnim = true;
				this.scaleStar.play();
			}
		}
		else
		{
			if(this.isScaleStarAnim == true)
			{
				this.scaleStar.stop();
				this.nodeStar.scale(1,1);
			}
			this.isScaleStarAnim = false;
		}
		SceneHelper.Instance.setStar(EGameStatue.POLISH,progress>config1)	
	}
	private resetProgress()
	{
		console.log(">>>>>>   清理  清理 ")
		// this.maskFen.size(0,29) ;
		// this.maskLvse.size(0,29) ;
		// this.maskZise.size(0,29) ;
		this.maskFen.width =0.01;
		this.maskLvse.width =0.01;
	 	this.maskZise.width =0.01;
		this.imgGood.visible=false;
		this.imgPerfect.visible=false;
	}
	changeState(params:any)
	{
	
		let statue:EGameStatue =params.status;
		this.btnGoHome.visible= statue ==EGameStatue.ADDCOLOR ||statue ==EGameStatue.ADDTEXTURE ||statue ==EGameStatue.SHAPE;
		let haveProgress =statue ==EGameStatue.POLISH ||statue ==EGameStatue.SHAPE;
		this.progressBarParent.visible=haveProgress;
		if(haveProgress==true)
		{
			setTimeout(()=>{},100)
		}
		if(statue ==EGameStatue.ADDCOLOR)
		{
			// this.msgtip.text = this.msgConfig[EGameStatue.ADDTEXTURE][0];
		}
		if(statue ==EGameStatue.SHAPE)
		{
			// this.msgtip.text = this.msgConfig[EGameStatue.SHAPE][0];
		}
		if(statue ==EGameStatue.POLISH)
		{
			// this.msgtip.text = this.msgConfig[EGameStatue.SHAPE][0];
			this.progressPolish(0.004);
		}
		this.lineParent.visible=statue==EGameStatue.SHAPE;
		if(statue!=EGameStatue.ADDTEXTURE)
		{
			this.btnAuction.visible=false;
		}
		this.nodeShap.visible=statue==EGameStatue.SHAPE;
		this.nodeAddColor.visible=statue==EGameStatue.ADDCOLOR;
		this.nodeAddTexuture.visible=statue==EGameStatue.ADDTEXTURE;
		this.nodePolish.visible =statue ==EGameStatue.POLISH;
		this.nodeStar.visible=false;
		if(statue==EGameStatue.ADDCOLOR)
		{
			this.creatOptColor();
		}

		if(statue ==EGameStatue.ADDTEXTURE)
		{
			this.creatAddTexture();
		}
	}

	private lines:Image[]=[];

	public createLine()
	{
		for (let index = 0; index < this.lines.length; index++) {
			const element = this.lines[index];
			element.destroy();
		}
		this.lines=[];
		let planeParent = this.line.parent;
		let nodeP=this.line;
		let level_config =SceneHelper.Instance.levelDT.m_config 
		let beizerString = level_config	.beizer;
		// let beizer =new Beizer(JSON.parse(beizerString));
		let points:BeizerPoint[] = SceneHelper.Instance.translatePoints(beizerString);
		let scrLength =points.length;
		for (let index = scrLength-1; index >=0; index--) {
			const element = points[index];
			console.log(">>> element ",element);
			let tmpPoint:BeizerPoint =new BeizerPoint();
			if(element.out!=null)
			{
				tmpPoint.in =new Vector2( element.out.x,element.out.y)
				tmpPoint.in.x=-tmpPoint.in.x;
			}
			if(element.in!=null)
			{
				tmpPoint.out =new Vector2( element.in.x,element.in.y)
				tmpPoint.out.x=-tmpPoint.out.x;
			}
			tmpPoint.pos =new Vector2( element.pos.x,element.pos.y)
			tmpPoint.pos.x=-element.pos.x;
			points.push(tmpPoint);
			
		}
		//第一条线 末尾点
		let lastPoint = points[scrLength-1];
		//第二条线 起始点
		let startPoint = points[scrLength];
		let endPoint = points[points.length-1];

		lastPoint.out =new Vector2(startPoint.pos.x,lastPoint.pos.y)
		startPoint.in =new Vector2(lastPoint.pos.x,startPoint.pos.y	)

		console.log(">>> lastPoint startPoint ",lastPoint,startPoint);
		// lastPoint.out.y =lastPoint.pos.y+0.3;
		// lastPoint.out.x =startPoint.pos.x;
		// startPoint.in.y =startPoint.pos.y+0.3;
		// startPoint.in.x =lastPoint.pos.x;
		// {
		// 	let firstPoint =points[0];
		// 	//首位闭合点
		// 	let tmpPoint:BeizerPoint =new BeizerPoint();
		// 	tmpPoint.pos =new Vector2( firstPoint.pos.x,firstPoint.pos.y)
		// 	tmpPoint.in =new Vector2(-tmpPoint.pos.x,tmpPoint.pos.y)
		// 	points.push(tmpPoint);
			
		// }

		console.log(">>> 2 ",points)
		let beizer =new Beizer(points);

		let beizer_user_point: BeizerUserPoint = beizer.getFirstPoint();
		let distance = beizer_user_point.beizer.getLenth() /  GameBaseConfig.AUXILIARYL_LINE;
		while(true)
		{
			let point =beizer_user_point.point.clone() as Vector2;
			let createPos = new Vector3(point.x,point.y);
			let outPos:Vector4=new Vector4();
			SceneHelper.Instance.camera.worldToViewportPoint(new Vector3(point.x,point.y,0),outPos);
			let tempLine =new Image(this.line.skin);
			planeParent.addChild(tempLine);
			tempLine.x=outPos.x;
			tempLine.y=outPos.y;
			tempLine.width=this.line.width;
			tempLine.height=this.line.height;
			
			tempLine.pivotX=this.line.pivotX;
			tempLine.pivotY=this.line.pivotY;
			let angle =beizer_user_point.getDirection();
			tempLine.rotation=angle-90;//180*angle/Math.PI;
			this.lines.push(tempLine);
			if (beizer_user_point.is_end) break;
			beizer_user_point.toNextPoint(distance)
		}
		this.line.visible=false;
	}
	private addTexutreFinish()
	{
		// this.msgtip.text = this.msgConfig[EGameStatue.ADDTEXTURE][1];

	}

	private colors:{[key:number]:{}} =[]
	private colorConfig :any[]=[];
	private creatOptColor()
	{
		this.listColors.visible=true;
		let config:LevelConfig= SceneHelper.Instance.getLevelConfig();
		console.log(">>>>config",config);
		let colorConfig:any[]=[];
		for (let index = 0; index < config.colors.length; index++) {
			const path:string = config.colors[index].icon;
			const color:Color = config.colors[index].color;
			const indexTmp =index;
			colorConfig.push({color:color,path:path,index:indexTmp});
		}
		this.colorConfig= colorConfig;
		this.listColors.vScrollBarSkin = '';
		this.listColors.repeatX =4;
		this.listColors.array = colorConfig;
		this.listColors.renderHandler = new Laya.Handler(this, this.onListColorRender);
		this.listColors.selectHandler = new Laya.Handler(this, this.onListColorSelected);
		setTimeout(() => {
			//GameUI.msgDipatcher.event(EMessageType.CHANGESTATE,EGameStatue.ADDTEXTURE)
			this.listColors.selectedIndex = 0;
		}, 10);
	}

	
	arrColorsItem:{[key:number]:Box}={};
	/**
	 * 
	 */
	private onListColorRender(cell: Box, index: number): void {
		if (index > this.colorConfig.length) {
			return;
		}
		this.arrColorsItem[index]=cell;
		var data: any = this.colorConfig[index];
		var btn: Button = cell.getChildByName("btnColor") as Button;
		btn.on("click",cell,()=>{
			this.listColors.selectedIndex=index;
		});
		btn.skin =this.colorConfig[index].path;
	}
	/**
	 * 
	 */
	private onListColorSelected(index: number): void {
		console.log(">>>..onListColorSelected ",index)
		let keys =Object.keys(this.arrColorsItem);
		GameUI.msgDipatcher.event(EMessageType.CHANGECOLOR,index)
		keys.forEach(element => {
			let flag =element ==(index.toString());
			{
				let tmp =this.arrColorsItem[element];
				var selected: Image = tmp.getChildByName("selected") as Image ;
				selected.visible=flag;
			}
		});
	}

	private resetAddTexture=false;
	private textureConfig :any[]=[];
	private creatAddTexture()
	{
		this.resetAddTexture=true;
		this.listAddTexture.visible=true;
		let config:LevelConfig= SceneHelper.Instance.getLevelConfig();
		let textureConfig:any[]=[];
		for (let index = 0; index < config.textureIconPath.length; index++) {
			const path:string = config.textureIconPath[index];
			const indexTmp =index;
			textureConfig.push({path:path,index:indexTmp});
		}
		console.log(">>.config ",textureConfig);
		this.textureConfig= textureConfig;
		this.listAddTexture.hScrollBarSkin = '';
		this.listAddTexture.repeatX =textureConfig.length;
		this.listAddTexture._selectedIndex=-1;
		// this.listAddTexture.selectedIndex=-1;
		this.listAddTexture.elasticEnabled=true;
		this.listAddTexture.array = textureConfig;
		this.listAddTexture.renderHandler = new Laya.Handler(this, this.onListTextrueRender);
		this.listAddTexture.selectHandler = new Laya.Handler(this, this.onListTextureSelected);
		this.listAddTexture.renderHandler.run();
		// setTimeout(() => {
		// 	this.listAddTexture.selectedIndex=0;
		// }, 100);

	}

	arrTextureItem:{[key:number]:Box}={};
	/**
	 * 
	 */
	private onListTextrueRender(cell: Box, index: number): void {
		if (cell ==null ||index > this.textureConfig.length) {
			return;
		}
		console.log(">>> teset ",cell,index)
		if(this.resetAddTexture==true)
		{
			var selected: Image = cell.getChildByName("selected") as Image ;
			selected.visible=false;
		}
		this.arrTextureItem[index]=cell;
		var btn: Button = cell.getChildByName("btnTeture") as Button;
		btn.offAll("click")
		btn.on("click",cell,()=>{
			this.listAddTexture.selectedIndex=index;
		});
		btn.skin =this.textureConfig[index].path;
		console.log(">>>>onListTextrueRender ",this.textureConfig[index].path)
	}
	/**
	 * 
	 */
	private onListTextureSelected(index: number): void {
		this.resetAddTexture=false;
		console.log(">>>..onListTextureSelected ",index)
		let keys =Object.keys(this.arrTextureItem);
		GameUI.msgDipatcher.event(EMessageType.CHANGETEXTURE,index)
		this.btnAuction.visible=true;
		keys.forEach(element => {
			let flag =element ==(index.toString());
			{
				let tmp =this.arrTextureItem[element];
				var selected: Image = tmp.getChildByName("selected") as Image ;
				selected.visible=flag;
			}
		});
		this.addTextureArrow.visible=true;
		this.addTextureArrowAnim.play();
	}


}

class Item extends Box {
	public static WID: number = 373;
	public static HEI: number = 85;
	private img: Image;
	constructor(){
		super();
		this.size(Item.WID, Item.HEI);
		this.img = new Image();
		this.addChild(this.img);
	}
	public setImg(src: string): void {
		this.img.skin = src;
	}
}
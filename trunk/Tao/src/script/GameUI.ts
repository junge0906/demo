import { ui } from "./../ui/layaMaxUI";
import { BlinnPhongMaterial } from "laya/d3/core/material/BlinnPhongMaterial";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Laya3D } from "Laya3D";
import { Laya } from "Laya";
import { Stage } from "laya/display/Stage";
import { Stat } from "laya/utils/Stat";
import { Camera, CameraClearFlags } from "laya/d3/core/Camera";
import { Vector3 } from "laya/d3/math/Vector3";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { PrimitiveMesh } from "laya/d3/resource/models/PrimitiveMesh";
import { Texture2D } from "laya/resource/Texture2D";
import { Handler } from "laya/utils/Handler";
import { PhysicsCollider } from "laya/d3/physics/PhysicsCollider";
import { BoxColliderShape } from "laya/d3/physics/shape/BoxColliderShape";
import { Rigidbody3D } from "laya/d3/physics/Rigidbody3D";
import { Quaternion } from "laya/d3/math/Quaternion";
import { VertexDeclaration } from "laya/d3/graphics/VertexDeclaration";
import { VertexMesh } from "laya/d3/graphics/Vertex/VertexMesh";
import { Mesh } from "laya/d3/resource/models/Mesh";
import { PBRMetallicSmoothnessSource, PBRStandardMaterial } from "laya/d3/core/material/PBRStandardMaterial";
import { Beizer, BeizerUserPoint, BeizerAction, BeizerPoint } from "./Beizer";
import { Vector2 } from "laya/d3/math/Vector2";
import { Vector3Keyframe } from "laya/d3/core/Vector3Keyframe";
import { Ray } from "laya/d3/math/Ray";
import { HitResult } from "laya/d3/physics/HitResult";
import { Sprite3D } from "laya/d3/core/Sprite3D";
import BoxControlScript from "./UpdateScript";
import { Vector4 } from "laya/d3/math/Vector4";
import { PBRSpecularMaterial } from "laya/d3/core/material/PBRSpecularMaterial";
import { Material } from "laya/d3/core/material/Material";
import { ExtendTerrainMaterial } from "laya/d3/core/material/ExtendTerrainMaterial";
import { UnlitMaterial } from "laya/d3/core/material/UnlitMaterial";
import { SkinnedMeshSprite3D } from "laya/d3/core/SkinnedMeshSprite3D";
import { TextureFormat } from "laya/resource/TextureFormat";
import { FilterMode } from "laya/resource/FilterMode";
import { stackBlurCanvasRGBA } from "./stackBur";
import { HTMLCanvas } from "laya/resource/HTMLCanvas";
import { Texture } from "laya/resource/Texture";
import { Sprite } from "laya/display/Sprite";
import { LightSprite } from "laya/d3/core/light/LightSprite";
import { Tween } from "laya/utils/Tween";
import { ConeColliderShape } from "laya/d3/physics/shape/ConeColliderShape";
import { Scene } from "laya/display/Scene";
import { View } from "laya/ui/View";
import { EGameStatue, EMessageType } from "../GameEnum";
import { EventDispatcher } from "laya/events/EventDispatcher";
import SceneHelper from "./SceneHelper";
import GameConfig, { GameBaseConfig } from "./Config";
import UIOptScene from "./UIOptScene";
import LinghtANimSceneUI from "../LinghtANimSceneUI";
import MusicCtrl from "./MusicCtrl";
import { MusicConfig } from "./MusicConfig";
import {Animation} from "../../libs/laya/display/Animation"
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends ui.test.MainSceneUI {

	public static msgDipatcher:EventDispatcher=new EventDispatcher();
	private uiGameStart:ui.test.UIGameStartUI=null;
	private uiOpt:UIOptScene=null;
	private uiAuction:ui.test.UIAuctionUI=null;
	private uiLightAnim:LinghtANimSceneUI=null;
	private uiresult:ui.test.resuletUI=null;
	private uiExhibition:ui.test.UIExhibitionUI=null;
	private  roleAni:Animation; 
    constructor() {
		super();
		// let clipFrame :ClipFrame =new ClipFrame(this.clip);
		// clipFrame.playFrame(0,20,1000,true);

		  //创建动画实例
		  
		  this.roleAni = new Animation()
  		// 加载动画图集,加载成功后执行回调方法
  		this.roleAni.loadAtlas("res/effect/guochang.atlas",Laya.Handler.create(this,this.onLoaded));
		Laya.stage.frameRate = "slow"
		GameUI.msgDipatcher.on(EMessageType.CHANGESTATE,this,this.changeState)
		GameUI.msgDipatcher.on(EMessageType.GOHOME,this,()=>{
			this.changeState({status:EGameStatue.HOME});
		});
		// 颜色选择变化
		GameUI.msgDipatcher.on(EMessageType.CHANGECOLOR, this, (index) => {
			SceneHelper.Instance.onSelectColorChange(index);
		})

		GameUI.msgDipatcher.on(EMessageType.CHANGETEXTURE, this, (index) =>{
			SceneHelper.Instance.onSelectTietuChange(index);
		})

		GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, {status:EGameStatue.HOME})
	}
	private  onLoaded():void
	{
		//添加到舞台

	}
	private curGameState:EGameStatue=EGameStatue.NONE;


	private changeState(params:any)
	{
		let statue:EGameStatue =params.status;
		console.log(`changeState---------------- ${EGameStatue[this.curGameState]}  -> ${EGameStatue[statue]} ${params}`)
		if(this.curGameState==statue) return;
		this.curGameState=statue;
		switch (this.curGameState) {
			case EGameStatue.HOME:
				this.OpenGamSartUI();
				break;
			case EGameStatue.SHAPE:
				this.GameStart();
				break;
			case EGameStatue.FIRESHAPE:
				this.LightingAnim();
				break;
			case EGameStatue.EXHIBITION:
				this.Exhibition();
				break;
			case EGameStatue.Auction:
				this.GameAution();
				break;
			case EGameStatue.Settlement:
				this.GameResult();
			default:
				break;
		}
		/** 状态变化 */

		if(statue==EGameStatue.SHAPE)
		{
			SceneHelper.Instance.onGameStateChange(statue,params.highLevel);

		}
		else
		{
		SceneHelper.Instance.onGameStateChange(statue);

		}
	}

	private  OpenGamSartUI()
	{
		let This = this;
		if(SceneHelper.Instance.Scene==null && this.uiGameStart==null)
		{
			Scene.load("test/UIGameStart.scene",Laya.Handler.create(this, (rScen: Scene) => {
				Scene3D.load("res/u3d/LayaScene_gameScene/Conventional/gameScene.ls", Laya.Handler.create(this, (content) => {
					// 初始化3D数据
					let scene = content as Scene3D;			
					SceneHelper.Instance.Scene = scene;
					// 显示初始界面
					let ui = rScen as ui.test.UIGameStartUI;
					this.uiGameStart=ui;
					Laya.stage.addChild(rScen);
					this.setStartUI(this.uiGameStart);
					Stat.show();
					return;				
				}));	
				 }));  
		}
		else
		{
			this.uiGameStart.visible=true;
			this.setStartUI(this.uiGameStart);
		}
	}

	private loadStartMeshFinish:boolean=false;
	private bPlayBgMusic:boolean=false;
	private setStartUI(ui: ui.test.UIGameStartUI)
	{
		this.loadStartMeshFinish=false;
		GameUI.msgDipatcher.on(EMessageType.SHOW_LOAD_SUCC,this,()=>{
			this.loadStartMeshFinish=true;
		});
		SceneHelper.Instance.startShow();
		if(this.uiOpt!=null)
		{
			this.uiOpt.visible=false;
		}
		SceneHelper.Instance.SetBoxUp(false,GameBaseConfig.startUIRootPos,true);
		SceneHelper.Instance.setCameraSize(GameBaseConfig.CAMERA_SIZE_STARTUI);
		ui.btnAdvanced.visible =true;// SceneHelper.Instance.isHighLevel();
		ui.btnGamStart.offAll("click");
		ui.btnGamStart.on("click", this, () => {
			if(this.loadStartMeshFinish==false) return;
			console.log(">>>>.,EMessageType.CHANGESTATE) ")
			if(this.bPlayBgMusic==false)
			{
				MusicCtrl.instance.PlayBgMusic()
				this.bPlayBgMusic =true;
			}
			GameUI.msgDipatcher.event(EMessageType.CHANGESTATE,   {status:EGameStatue.SHAPE,highLevel:false})
			ui.visible=false;
		
		});
		ui.btnAdvanced.offAll("click");
		ui.btnAdvanced.on("click", this, () => {
			if(this.loadStartMeshFinish==false) return;
			console.log(">>>>.,EMessageType.CHANGESTATE) ")
			if(this.bPlayBgMusic==false)
			{
				MusicCtrl.instance.PlayBgMusic()
				this.bPlayBgMusic =true;
			}
			GameUI.msgDipatcher.event(EMessageType.CHANGESTATE,   {status:EGameStatue.SHAPE,highLevel:true})
			ui.visible=false;
		
		});
	}

	private GameStart()
	{
		if(this.uiOpt==null)
		{

			Scene.load("test/UIOptScene.scene",Laya.Handler.create(this, (rScen: Scene) => {
				let ui = rScen as UIOptScene;
				GameUI.msgDipatcher.event(EMessageType.CHANGESTATE,{status:this.curGameState});
				SceneHelper.Instance.SetBoxUp(true,GameBaseConfig.normalRootPos,true);
				SceneHelper.Instance.setCameraSize(GameBaseConfig.CAMERA_SIZE_SHAP);
				Laya.stage.addChild(ui);
				this.uiOpt=ui;
				setTimeout(()=>{
					ui.createLine();
				},500)
			})); 
		} 
		else
		{
			this.uiOpt.visible=true;
			this.uiOpt.reset();
			SceneHelper.Instance.SetBoxUp(true,GameBaseConfig.normalRootPos,true);
			SceneHelper.Instance.setCameraSize(GameBaseConfig.CAMERA_SIZE_SHAP);
			Laya.stage.addChild(this.uiOpt);
			setTimeout(()=>{
				this.uiOpt.createLine();
			},500)
		}
	}

	private GameAution()
	{
		if(this.uiAuction==null)
		{
			Scene.load("test/UIAuction.scene",Laya.Handler.create(this, (rScen: Scene) => {
				let ui = rScen as ui.test.UIAuctionUI;
				this.uiAuction=ui;
				Laya.stage.addChild(ui);
				this.setAuction(this.uiAuction)
			}));  
		}
		else
		{
			this.uiAuction.visible=true;
			Laya.stage.addChild(this.uiAuction);
			this.setAuction(this.uiAuction)
		}

	}

	curAuctionIndex=0;
	private auctionData:any;
	private setAuction(ui:ui.test.UIAuctionUI)
	{
		this.curAuctionIndex=0;
		this.uiExhibition.visible=false;
		let randomMoney :number[]=[];
		let max =0;
		for (let index = 0; index <3; index++) {
			let random =Math.floor(Math.random()*(GameBaseConfig.AuctionCoin_Max-GameBaseConfig.AuctionCoin_Min))+GameBaseConfig.AuctionCoin_Min;
			randomMoney.push(random)
			max=random>max?random:max;
		}
		let config =[{
			title:"ui/sale_1.png",
			money:`${randomMoney[0]}`,
			maxMoney:`${max}`,
			showNext:true,
			showMax:false,
		},{
			title:"ui/sale_2.png",
			money:`${randomMoney[1]}`,
			maxMoney:`${max}`,
			showNext:true,
			showMax:false,
		},{
			title:"ui/sale_3.png",
			money:`${randomMoney[2]}`,
			maxMoney:`${max}`,
			showNext:false,
			showMax:true,
		}]
		let arrSaler=[];
		arrSaler.push(ui.saler1);
		arrSaler.push(ui.saler2);
		arrSaler.push(ui.saler3);
		let funcFresh=(index)=>{
			ui.maxMoney.text = config[index].maxMoney;
			ui.money.text = config[index].money;
			ui.title.skin = config[index].title;
			ui.btnNext.visible=config[index].showNext;
			ui.btnmaxMoney.visible=config[index].showMax;
			for (let tmpIndex = 0; tmpIndex < arrSaler.length; tmpIndex++) {
				const element = arrSaler[tmpIndex];
				element.visible=(index==tmpIndex);
			}
		}
		funcFresh(this.curAuctionIndex);
		ui.btnsale.offAll("click")
		ui.btnsale.on("click",this,()=>{
			this.auctionData =config[this.curAuctionIndex];
			this.auctionData.getMoney = config[this.curAuctionIndex].money;
			MusicCtrl.instance.PlaySound(MusicConfig.auction);
			GameUI.msgDipatcher.event(EMessageType.CHANGESTATE,{status:EGameStatue.Settlement});
			ui.visible=false;
		})
		
		ui.btnmaxMoney.offAll("click")
		ui.btnmaxMoney.on("click",this,()=>{
			this.auctionData =config[this.curAuctionIndex];
			this.auctionData.getMoney = config[this.curAuctionIndex].maxMoney;
			MusicCtrl.instance.PlaySound(MusicConfig.auction);
			GameUI.msgDipatcher.event(EMessageType.CHANGESTATE,{status:EGameStatue.Settlement});
			ui.visible=false;
		});
		ui.btnNext.offAll("click")
		ui.btnNext.on("click",this,()=>{
			this.curAuctionIndex=this.curAuctionIndex+1;
			funcFresh(this.curAuctionIndex);
		});
	}

	private GameResult()
	{
		if(this.uiresult==null)
		{
			Scene.load("test/resulet.scene",Laya.Handler.create(this, (rScen: Scene) => {
				let ui = rScen as ui.test.resuletUI;
				this.uiresult=ui;
				Laya.stage.addChild(ui);
				this.setResultUI(this.uiresult)


			}))
		}
		else
		{
			this.uiresult.visible=true;
			Laya.stage.addChild(this.uiresult);
			this.setResultUI(this.uiresult)
		}
	}

	private setResultUI(ui:ui.test.resuletUI)
	{
		let config ={
			score:SceneHelper.Instance.getTotalScore(),
			coinget:this.auctionData.getMoney,
			star:SceneHelper.Instance.getStar()
		}
		let scoreConfig = GameBaseConfig.resultConfig;
		console.log(">>>> 结算 结果 ",config);
		for (let index = 0; index < scoreConfig.length; index++) {
			const element = scoreConfig[index];
			if(config.score<element.value)
			{
				console.log(`----->${ui.score}  ${config}`)
				ui.score.text=""+config.score;
				ui.scoreType.skin= element.msg;
				ui.getMoney.text= ""+config.coinget;
				break;
			}
		}
		ui.star1.visible=config.star>=1;
		ui.star2.visible=config.star>=2;
		ui.star3.visible=config.star>=3;
		ui.btnget.offAll("click");
		ui.btnget.on("click",this,()=>{
			GameUI.msgDipatcher.event(EMessageType.CHANGESTATE,{status:EGameStatue.HOME});
			ui.visible=false;
			MusicCtrl.instance.PlaySound(MusicConfig.getCoin);

		})
		ui.btndoubleGet.offAll("click");
		ui.btndoubleGet.on("click",this,()=>{
			MusicCtrl.instance.PlaySound(MusicConfig.getCoin);
			SceneHelper.Instance.SetBoxUp(false,GameBaseConfig.startUIRootPos,false);
		})
		SceneHelper.Instance.SetBoxUp(false,GameBaseConfig.resultUIRootPos,false);
		SceneHelper.Instance.setCameraSize(GameBaseConfig.CAMERA_SIZE_RESULT);
	}

	private LightingAnim()
	{

		if(this.uiLightAnim==null)
		{
			Scene.load("test/lightAnimScene.scene",Laya.Handler.create(this, (sprite: Scene) => {
				console.log(">>>>>>",sprite);
			   let lightAnimScene:LinghtANimSceneUI = sprite as LinghtANimSceneUI;
			   this.uiLightAnim =lightAnimScene;
			   Laya.stage.addChild(sprite);
			   lightAnimScene.visible=false;
				this.PlayGuoChangAnim();
			   
		   }));
		}
		else
		{
			Laya.stage.addChild(this.uiLightAnim);
			this.uiLightAnim.initUI();
			this.PlayGuoChangAnim();
		}
		
		
	}
	private PlayGuoChangAnim()
	{
		Laya.stage.addChild(this.roleAni);
		this.roleAni.scale(Laya.stage.width/256,Laya.stage.height/512);
		this.roleAni.play(0,false);
		let timeTmp = setTimeout(() => {
			this.uiLightAnim.visible=true;
		}, 0.8);
	}

	private Exhibition()
	{
		if(this.uiExhibition==null)
		{
			Scene.load("test/UIExhibition.scene",Laya.Handler.create(this, (sprite: Scene) => {
				console.log(">>>>>>",sprite);
			   let uiExhibition: ui.test.UIExhibitionUI= sprite as ui.test.UIExhibitionUI;
			   this.uiExhibition =uiExhibition;
				this.uiExhibition.btnsale.offAll("click");
				this.uiExhibition.btnsale.on("click",this,()=>{
					// this.auctionData={}
					// this.auctionData.getMoney=Math.floor(Math.random()*(GameBaseConfig.AuctionCoin_Max-GameBaseConfig.AuctionCoin_Min))+GameBaseConfig.AuctionCoin_Min;
				   	GameUI.msgDipatcher.event(EMessageType.CHANGESTATE,{status:EGameStatue.Auction});
			   });
			   this.InitExhibition();
		   }));
			
		}
		else
		{
			this.InitExhibition();
		}
	}
	private InitExhibition()
	{
		Laya.stage.addChild( this.uiExhibition);
		this.uiExhibition.visible=true;
		SceneHelper.Instance.SetBoxUp(false,GameBaseConfig.exhibitionUIPos,true)
		SceneHelper.Instance.setCameraSize(GameBaseConfig.CAMERA_SIZE_EXHIBITION);

	}
}
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Camera } from "laya/d3/core/Camera";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { Beizer, BeizerUserPoint, BeizerAction, BeizerPoint } from "./Beizer";
import { Vector2 } from "laya/d3/math/Vector2";
import GameConfig, { LevelConfig, e_Textures, GameBaseConfig } from "./Config";
import BoxControlScript, { MyTask } from "./UpdateScript";
import { Laya } from "Laya";
import { HitResult } from "laya/d3/physics/HitResult";
import { Vector3 } from "laya/d3/math/Vector3";
import { Ray } from "laya/d3/math/Ray";
import Helper from "./Helper";
import { BlinnPhongMaterial } from "laya/d3/core/material/BlinnPhongMaterial";
import { Texture2D } from "laya/resource/Texture2D";
import { TextureFormat } from "laya/resource/TextureFormat";
import { EGameStatue, EMessageType } from "../GameEnum";
import { MeshColliderShape } from "laya/d3/physics/shape/MeshColliderShape";
import { PhysicsCollider } from "laya/d3/physics/PhysicsCollider";
import { Matrix4x4 } from "laya/d3/math/Matrix4x4";
import TextureManager, { OneMap } from "./TextureManager";
import { Color } from "laya/d3/math/Color";
import { stackBlurCanvasRGBA } from "./stackBur";
import { Vector4 } from "laya/d3/math/Vector4";
import { BoxColliderShape } from "laya/d3/physics/shape/BoxColliderShape";
import GameUI from "./GameUI";
import { Sprite3D } from "laya/d3/core/Sprite3D";
import { Utils } from "laya/utils/Utils";
import MusicCtrl from "./MusicCtrl";
import LevelCtrl from "./LevelCtrl";
/** 法线贴图长宽 */
const NORMAL_WIDTH_HEIGHT = 1024;
/** 反射贴图长宽 */
const ALDBE_WIDTH_HEIGTH= 1024;
/**
 * 第一步, 展示配置的		startShow() OK
 * 第二步, 塑形(缺少对比图)
 */
class LevelData{
	public m_targetBeizer : Beizer;
    public m_beizer : Beizer;
	public m_beizerAction: BeizerAction = new BeizerAction();
	public m_verticesConstant: Float32Array = null;//初始的
    public m_vertices: Float32Array = null; 	// 变化的   
    public m_config : LevelConfig = null;
    public m_lastX: number;
    public m_mouseDownX: number;
    public m_mouseDownY: number;
    public m_lastY: number;
    public m_moveToN: number;
    public m_moveDistance: number;
    public m_RayY: number;
	public m_nearestBeizerPoint: any;

	public m_maxHeight:number=4;
	public m_minHeight:number=0;

	/** 多层法线贴图数据 */
	public normal_maps : OneMap[] = [];
	// 生成的贴图
	public dstNormalMap: OneMap;

    /** 多层贴图数据 */
    public maps : OneMap[] = [];
    // 生成的贴图
	public dstMap : OneMap; 
	
	public state : EGameStatue;
	y_values: Vector2[];
	/** 模型匹配度 */
	magicProgress : number = 0;
	// 上色进度
	addColorProgress: number = 0;
	// 抛光进度
	paoguangProgresss : number = 0;
	// 烘焙积分
	hongpeiProgress: number = 0;
	// 贴图积分
	tietuProgress : number = 0;

	/** 当前选中的颜色 */
	selectColor: Color;

	isTouch : boolean = false;
	
}

export class MergeTask extends MyTask {
	private maps : OneMap[];
	private dst_map : OneMap;
	private maps_index = 0;
	private map_start = 0;
	private callback : Function
	constructor(dst_map : OneMap, maps : OneMap[], callback : Function){
		super();
		this.callback = callback;
		this.dst_map = dst_map;
		this.maps = maps;
	}

	protected doThings() {
		let start = this.map_start;
		if(start >= this.dst_map.width) {
			this.maps_index ++;
			this.map_start = 0;
			start = 0;
			if(this.maps_index >= this.maps.length) return true;
		}

		let one_map = this.maps[this.maps_index];
		Helper.blendTextureEx(this.dst_map.width, this.dst_map.height, this.dst_map.pixels, one_map.width, one_map.height, one_map.pixels, 0, start, start+10); 
		this.map_start += 10;
		return false;
	}
    protected onComplete(){
		super.onComplete();
		if(this.callback) this.callback();
	}	
}

/** 场景帮助 */
export default class SceneHelper {
	/** 单例 */
	public static Instance = new SceneHelper();
	albedo1: Uint8Array;
	albedo2: Uint8Array;
	erase_effect: Sprite3D;

	/** 场景 */
	set Scene(scene: Scene3D) {
		this.scene = scene;
		this.camera = scene.getChildByName("cameraNode").getChildByName("Main Camera") as Camera;
		console.log(`this.camera size ${this.camera.orthographicVerticalSize}`)
		this.root = scene.getChildByName("root") as MeshSprite3D;
		this.root.addComponent(BoxControlScript);
		//this.eff_mopi = scene.getChildByName("effect_mopi") as MeshSprite3D;
		// this.eff_mopi.active=false;
		this.cylinder = this.root.getChildByName("box").getChildByName("pPipe1_0") as MeshSprite3D;;
		this.material = this.cylinder.meshRenderer.material as BlinnPhongMaterial
		this.texture = this.material.albedoTexture as Texture2D;
		this.normalTexture = this.material.normalTexture as Texture2D;
		this.shuzi = scene.getChildByName("nodeBrush").getChildByName("brush") as MeshSprite3D;
		this.shuzi.active = false;
		
		this.eraser = scene.getChildByName("nodePolish").getChildByName("PolishingStone") as MeshSprite3D;
		this.eraser.active = false;
		this.erase_effect = this.eraser.getChildByName("effect_mopi") as Sprite3D
		this.erase_effect.active = false;
		(this.scene.getChildByName("root").getChildByName("floor") as MeshSprite3D).transform.localScale =new Vector3(GameBaseConfig.FLOOR_SCALE,GameBaseConfig.FLOOR_SCALE,GameBaseConfig.FLOOR_SCALE);
		// 碰撞体
		var ray_plane = scene.addChild(new MeshSprite3D(/*PrimitiveMesh.createPlane(10, 10, 10, 10)*/)) as MeshSprite3D;
		this.ray_plane = ray_plane;
		this.ray_plane.active = false;
		var planeMat = new BlinnPhongMaterial();
		//设置纹理平铺和偏移
		var tilingOffset = planeMat.tilingOffset;
		tilingOffset.setValue(5, 5, 0, 0);
		planeMat.tilingOffset = tilingOffset;
		//设置材质
		ray_plane.meshRenderer.material = planeMat;

		ray_plane.meshRenderer.materials

		ray_plane.transform.localPosition = new Vector3(0, 1, 0)
		ray_plane.transform.localRotationEuler = new Vector3(-90, 0, 0);
		//平面添加物理碰撞体组件
		var planeStaticCollider = ray_plane.addComponent(PhysicsCollider);
		//创建盒子形状碰撞器
		var planeShape = new BoxColliderShape(100, 0, 100);
		//物理碰撞体设置形状
		planeStaticCollider.colliderShape = planeShape;
		//物理碰撞体设置摩擦力
		planeStaticCollider.friction = 2;

		planeStaticCollider.restitution = 0.3;
	}
	get Scene(): Scene3D { return this.scene; }


//------------------------------------ 事件回调 【BEG】----------------------------------

	/**
	 * 当选择的颜色变化时调用
	 * @param index 
	 */
	public onSelectColorChange(index : number) {
		// 修改刷子的颜色
		this.levelDT.selectColor = this.levelDT.m_config.colors[index].color;

		// 修改刷子颜色
		let This = this;
		Texture2D.load(this.levelDT.m_config.colors[index].albdo, Laya.Handler.create(this, (texture: Texture2D) => {
			let material = (This.shuzi.getChildByName("node").getChildByName("brush").getChildByName("Mesh_Brush") as MeshSprite3D).meshRenderer.material as BlinnPhongMaterial;
			if(material.albedoTexture) material.albedoTexture.destroy();
			material.albedoTexture = texture;
			// 这里是为了节约一点内存，改了源码，默认是保存贴图数据在内存中，这里用不上，就销毁掉
			texture._pixels = null;
		}));
	}

	/**
	 * 当状态变化时调用 
	 */
	public onGameStateChange(state : EGameStatue, is_hide? : boolean) {
		// 停掉触摸事件
		Laya.stage.offAll(Laya.Event.MOUSE_DOWN)
		Laya.stage.offAll(Laya.Event.MOUSE_UP)
		Laya.stage.offAll(Laya.Event.MOUSE_MOVE)

		switch (state) {
			// 主界面
			case EGameStatue.HOME:
				//this.startShow();
				BoxControlScript.setSpeed(BoxControlScript.DEFAULT_SPEED);
				return;
			// 朔形
			case EGameStatue.SHAPE:
				BoxControlScript.setSpeed(BoxControlScript.DEFAULT_SPEED);
				BoxControlScript.setStart(true);
				if (is_hide)
					this.startLevel(LevelCtrl.getHideLevel());
				else
					this.startLevel(LevelCtrl.GetLevel());
				break;
			// 炼制
			case EGameStatue.FIRESHAPE:				
				BoxControlScript.setSpeed(0.5);
				this.addTouchMoveListener();				
				this.startHongpei();
				break;

			// 抛光
			case EGameStatue.POLISH:
				BoxControlScript.setSpeed(BoxControlScript.DEFAULT_SPEED);
				BoxControlScript.setStart(true);				
				this.startPaoguang();
				break;

			// 上色
			case EGameStatue.ADDCOLOR:
				BoxControlScript.setSpeed(BoxControlScript.DEFAULT_SPEED);
				BoxControlScript.setStart(true);				
				this.startShangse();
				break;

			case EGameStatue.ADDTEXTURE:
				BoxControlScript.setSpeed(BoxControlScript.DEFAULT_SPEED);
				BoxControlScript.setStart(true);				
				this.startTietu();
			break;

			case EGameStatue.EXHIBITION:
				BoxControlScript.setStart(true);	
				BoxControlScript.setSpeed(0.5);
				this.addTouchMoveListener();	
				break;
			case EGameStatue.Settlement:
				BoxControlScript.setStart(true);	
				BoxControlScript.setSpeed(0.5);
				this.addTouchMoveListener();				
			default:
				break;
		}		
		this.levelDT.state = state;
		if(state!=EGameStatue.ADDCOLOR)
		{
			this.shuzi.active=false;
		}
		if(state!=EGameStatue.POLISH)
		{
			this.eraser.active=false;
		}
	}

	public onUpdate() {
		let state = this.levelDT.state;
		switch (state) {
			case EGameStatue.ADDCOLOR:
				this.onUpdateForColor();
				break;
			case EGameStatue.POLISH:
				this.onUpdateForPaoguang();
				break;
			default:
				break;
		}
	}

//------------------------------------ 事件回调 【END】----------------------------------

//------------------------------------ 游戏主流程 【BEG】----------------------------------
    /** 展示开始的场景 */
    public startShow() {
		`
			第一层贴图为配置中的几种颜色
			第二层贴图为配置中的贴图
		`
		this.eraser.active = false;
		this.shuzi.active = false;
		let levelDT = this.initLevelData(-1);
		let level_config = levelDT.m_config;

		// 初始化贝塞尔曲线
		levelDT.m_beizerAction.points = this.translatePoints(level_config.beizer);
		levelDT.m_maxHeight = 4;
		levelDT.m_minHeight = GameBaseConfig.SHAP_Min_HEIGHT;
		levelDT.m_beizer = new Beizer(levelDT.m_beizerAction.points);

		// 初始化贴图数据
		levelDT.dstMap = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH);        
		levelDT.dstNormalMap = new OneMap(NORMAL_WIDTH_HEIGHT, NORMAL_WIDTH_HEIGHT);        
		(this.cylinder.meshRenderer.material as BlinnPhongMaterial).normalTexture = this.normalTexture;
        // 上色(上层贴图，底层纯色)
		// let color_map = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH);
        // this.levelDT.maps.push(color_map)

        // 计算最底层的颜色值
        // let color_num = levelDT.m_config.colors.length;
		// for (let height = 0; height < ALDBE_WIDTH_HEIGTH; height++) {
		// 	let color_index = Math.floor(color_num * height / ALDBE_WIDTH_HEIGTH);
        //     let color = levelDT.m_config.colors[color_index].color;
		// 	for (let width = 0; width < ALDBE_WIDTH_HEIGTH; width++) {            
		// 		let pos = height * ALDBE_WIDTH_HEIGTH + width;   
        //         pos *= 4;             
        //         color_map.pixels[pos++] = color.r
        //         color_map.pixels[pos++] = color.g
        //         color_map.pixels[pos++] = color.b
        //         color_map.pixels[pos++] = color.a
        //     }
		// }

		let This = this;
		this.cylinder.active = false;
		Texture2D.load(level_config.texturePath[0], Laya.Handler.create(this, (texture: Texture2D) => {
			let one_map1 = new OneMap(1024, 1024, texture.getPixels().slice(0) as Uint8Array);
			This.levelDT.maps.push(one_map1);
			this.updateAldbeMap(false);		
			this.cylinder.active = true;

			GameUI.msgDipatcher.event(EMessageType.SHOW_LOAD_SUCC)
		}));
		
		// 更新模型
		this.updateCylinder();

		TextureManager.Instance.loadTexture(e_Textures.E_POLISH1, (map : OneMap)=>{
			This.normal1 = map.pixels;
		})
		TextureManager.Instance.loadTexture(e_Textures.E_POLISH2, (map: OneMap) => {
			This.normal2 = map.pixels;
		})		

		TextureManager.Instance.loadTexture(e_Textures.E_POLISH3, (map: OneMap) => {
			This.albedo1 = map.pixels;
		})
		TextureManager.Instance.loadTexture(e_Textures.E_POLISH4, (map: OneMap) => {
			This.albedo2 = map.pixels;
		})				

		// TODO::加上上层的贴图
        // TextureManager.Instance.loadTexture(this.levelDt.m_config.pic, (one_map1 : OneMap)=>{
        //     this.levelDt.maps.push(one_map1);
        //     // 更新贴图
        //     this.updateAldbeMap();
        // })
	}
	private normal1 : Uint8Array;
	private normal2: Uint8Array;
	private shuzi : MeshSprite3D;
	private eraser : MeshSprite3D;

	public translatePoints(beizerConfig:string):BeizerPoint[]
	{
		let ret:BeizerPoint[]=JSON.parse(beizerConfig);
		let length = ret.length;
		for(let index =0;index<length;index++)
		{
			let element = ret[index];
			if(element.in!=null)
			{
				element.in.x /=100;
				element.in.y /=100;
			}
			if(element.out!=null)
			{
				element.out.x /=100;
				element.out.y /=100;
			}
			if(element.pos!=null)
			{
				element.pos.x /=100;
				element.pos.y /=100;
			}
			if(index>0)
			{
				element.last=ret[index-1];
			}
			if(index<length-1)
			{
				element.next = ret[index+1]
			}
		}
		return ret;
	}
	public GetDefaultPoints():BeizerPoint[]
	{
		let ret:BeizerPoint[]=[];
		let defaultX =GameBaseConfig.DEFAULT_SHAP_RADIUS;
		let startY=0;
		let count =GameBaseConfig.DEFAULT_SHAP_CTRL_POINT;
		let addY =GameBaseConfig.DEFAULT_SHAP_HEIGHT/count;
		for(let index =0;index<count;index++)
		{
			let element = new BeizerPoint();
			element.pos =new Vector2(defaultX,startY+index * addY)
			if(index!=0)
			{
				element.in=new Vector2(element.pos.x,element.pos.y-addY/2)
			}
			if(index!=count-1)
			{
				element.out=new Vector2(element.pos.x,element.pos.y+addY/2)
			}
			ret.push(element);
		}
		let length = ret.length;
		for(let index =0;index<length;index++)
		{
			let element = ret[index];
			if(index>0)
			{
				element.last=ret[index-1];
			}
			if(index<length-1)
			{
				element.next = ret[index+1]
			}
		}
		return ret;
	}
    // 开始关卡(塑形)
    public startLevel(level : number) {
		Laya.stage.offAllCaller(this);
		let levelDT = this.initLevelData(level);
		
		levelDT.m_beizerAction.points = this.GetDefaultPoints();
		levelDT.m_maxHeight = 4;
		levelDT.m_minHeight = GameBaseConfig.SHAP_Min_HEIGHT;
		levelDT.m_beizer = new Beizer(levelDT.m_beizerAction.points);
		levelDT.m_targetBeizer = new Beizer(this.translatePoints(this.levelDT.m_config.beizer))

		this.updateCylinder();
		let material = this.cylinder.meshRenderer.material as BlinnPhongMaterial;
		material.albedoTexture = this.texture;
		material.normalTexture = this.normalTexture;

		// 初始化参照图
		let level_config = levelDT.m_config;

		// 监听回调
		this.addShuoxingListener();
		this.ray_plane.active = true;

		// 重算匹配度
		levelDT.magicProgress = Beizer.getSimilarity(levelDT.m_beizer, levelDT.m_targetBeizer);
		GameUI.msgDipatcher.event(EMessageType.PROGRESS_SHAP, levelDT.magicProgress)		

		// 生成参照图
    }
    
    // 开始烘焙(烧制)
    public startHongpei() {
		// 烘焙时模型已经定了，可以添加碰撞体
		this.addColliderShape();
		this.ray_plane.active = false;

		// 两层都是纯色
		let color_map = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH, this.normal1.slice(0));
		this.levelDT.normal_maps.push(color_map)
		let color_map2 = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH, this.normal2.slice(0))
		this.levelDT.normal_maps.push(color_map2)

		color_map = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH, this.albedo1.slice(0));
		this.levelDT.maps.push(color_map)
		color_map2 = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH, this.albedo2.slice(0))
		this.levelDT.maps.push(color_map2)		
		this.updateNormalMap();
		this.updateAldbeMap();		
    }

	// 开始抛光
	public startPaoguang() {
		// 初始化法线贴图
		this.material.albedoColor = new Vector4(1,1,1,1);
		Laya.stage.offAllCaller(this);
		Laya.stage.on(Laya.Event.MOUSE_UP, this, function (e) {
			this.shuzi.transform.localPosition = Vector3._ZERO;
			this.shuzi.transform.rotationEuler = Vector3._ZERO;
			this.eraser.transform.localPosition = Vector3._ZERO;
			this.eraser.transform.rotationEuler = Vector3._ZERO;
		});
		
		this.addColorListener();
		this.ray_plane.active = false;
		this.eraser.active = true;

	}

    // 开始上色(上色)
    public startShangse() {
		this.ray_plane.active = false;
		this.shuzi.active = true;
		this.eraser.active = false;
		this.levelDT.maps = []
        // 两层都是纯色
		let color_map = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH, this.albedo1.slice(0));
		this.levelDT.maps.push(color_map)
		let color_map2 = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH, new Uint8Array(ALDBE_WIDTH_HEIGTH * ALDBE_WIDTH_HEIGTH * 4))
		this.levelDT.maps.push(color_map2)
		color_map2.pixels.fill(0);
		this.levelDT.dstMap = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH, new Uint8Array(ALDBE_WIDTH_HEIGTH * ALDBE_WIDTH_HEIGTH * 4))
		this.onSelectColorChange(0);
		this.addColorListener();
		this.updateAldbeMap();
    }

    // 开始贴图(贴图)
    public startTietu() {
		this.shuzi.active = false;
		this.eraser.active = false;
		let map0 = this.levelDT.maps[0]
		this.levelDT.maps = []
		this.levelDT.maps.push(this.levelDT.dstMap);
		this.levelDT.dstMap = map0; 	// 第一层使用上色的结果值
    }

//------------------------------------ 游戏主流程 【END】----------------------------------
//------------------------------------ 游戏流程辅助 【BEG】----------------------------------
	private initLevelData(level: number) : LevelData {
		let level_config = GameConfig.levels[level];

		let old_level_dt = this.levelDT;
		this.levelDT = new LevelData();
		let levelDT = this.levelDT;

		levelDT.m_config = level_config;

		// 初始化模型顶点
		if (old_level_dt) {
			levelDT.m_verticesConstant = old_level_dt.m_verticesConstant;
		} else {
			let vertices = this.cylinder.meshFilter.sharedMesh.getVertices();
			levelDT.m_verticesConstant = new Float32Array(vertices);
		}
		levelDT.m_vertices = levelDT.m_verticesConstant.slice(0);
		levelDT.dstMap = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH);  
		levelDT.dstNormalMap = new OneMap(NORMAL_WIDTH_HEIGHT, NORMAL_WIDTH_HEIGHT);
		return levelDT;
	}
//------------------------------------ 游戏流程辅助 【END】----------------------------------
    
    // 模型变化
    private updateCylinder() {
        let levelDT = this.levelDT;
        let beizer = levelDT.m_beizer;

		SceneHelper.Instance.levelDT.m_config

        let const_slice = 800;
		let beizer_user_point: BeizerUserPoint = beizer.getFirstPoint();
		let distance = beizer_user_point.beizer.getLenth() / const_slice;
		let y_values: Vector2[] = [];
		while (true) {
			y_values.push(beizer_user_point.point.clone())
			if (beizer_user_point.is_end) break;
			beizer_user_point.toNextPoint(distance)
		}
		levelDT.y_values = y_values;
		let constant_vertices = levelDT.m_verticesConstant;
		let vertices = constant_vertices.slice(0);
		
		let radius = 1; // 半径
		let height = 6; // 高度
		let max = -99;
		let min = 99;
		let max_x = -99;
		let min_x = 99;

		for (let i = 0; i < constant_vertices.byteLength/4; i+=12) {
			let x_pos = i+0;
			let y_pos = i+1;
			let z_pos = i+2;
			let normal_x_pos = i+3;
			let normal_y_pos = i+4;
			let normal_z_pos = i+5;
			let tangent_x_pos = i+8;
			let tangent_z_pos = i+10;
	
			let x = constant_vertices[x_pos];
			let y = constant_vertices[y_pos];
            let z = constant_vertices[z_pos];

			let beizer_index = Math.floor(const_slice / height * (y + 2.9));
			if (beizer_index > const_slice) beizer_index = const_slice;
			if (beizer_index < 0) beizer_index = 0;

			if (max < y) max = y;
			if (min > y) min = y;		
			if(max_x < x) max_x = x;
			if(min_x > x) min_x = x;

			let this_radis = y_values[beizer_index].x;
			let this_height = y_values[beizer_index].y;

			x = x * this_radis;
			z = z * this_radis;
			y = this_height;
	

			vertices[x_pos] = x;
			vertices[y_pos] = y;
			vertices[z_pos] = z;
			// vertices[normal_x_pos] = x;
			// vertices[normal_z_pos] = z;

			// vertices[tangent_x_pos] = constant_vertices[tangent_x_pos] > 0? Math.abs(z) : -Math.abs(z);
			// vertices[tangent_z_pos] = constant_vertices[tangent_z_pos] > 0 ? Math.abs(x) : -Math.abs(x);		
		}
		
		this.cylinder.meshFilter.sharedMesh.setVertices(vertices.buffer);
		this.cylinder.meshFilter.sharedMesh.calculateBounds();       
	}
	/*
	public createLine()
	{
		let planeParent:Sprite3D = this.scene.getChildByName("planeParent") as Sprite3D;
		let nodeP=planeParent.getChildByName("node") as Sprite3D;
		let level_config = GameConfig.levels[-1]
		let beizerString = level_config	.beizer;
		let beizer =new Beizer(this.translatePoints(beizerString));
		let beizer_user_point: BeizerUserPoint = beizer.getFirstPoint();
		let distance = beizer_user_point.beizer.getLenth() / 20;
		while(true)
		{
			if (beizer_user_point.is_end) break;
			let point =beizer_user_point.point.clone() as Vector2;
			let createPos = new Vector3(point.x,point.y);
			beizer_user_point.toNextPoint(distance)
			let _3point = createPos;
			// 转换为屏幕坐标
			let v4 = new Vector4();
			this.camera.worldToViewportPoint(_3point, v4);
			

			let createNode =Sprite3D.instantiate(nodeP);
			planeParent.addChild(createNode);
			createNode.transform.localPosition = createPos;
			let angle =beizer_user_point.getDirection();
			createNode.transform.rotationEuler = new Vector3(0, 0, angle-90)

		}
	}
	*/

	//  添加碰撞体
	public addColliderShape() {
		let collider_shap : MeshColliderShape = new MeshColliderShape();
		collider_shap.mesh = this.cylinder.meshFilter.sharedMesh.clone();

		var planeStaticCollider = this.cylinder.getComponent(PhysicsCollider) as PhysicsCollider;
		if(!planeStaticCollider) {
			planeStaticCollider = this.cylinder.addComponent(PhysicsCollider) as PhysicsCollider;
		}
		planeStaticCollider.colliderShape = collider_shap
	}
	
    // 更新漫反射贴图
    public updateAldbeMap(is_mohu : boolean = true) {
		let dst_map = this.levelDT.dstMap;		
        dst_map.pixels.fill(255);
        for(let i=0; i<this.levelDT.maps.length; i++) {
            let one_map = this.levelDT.maps[i];
            Helper.blendTexture(dst_map.width, dst_map.height, dst_map.pixels, one_map.width, one_map.height, one_map.pixels, 0);    
		}
		if (is_mohu)
			stackBlurCanvasRGBA(dst_map.width, dst_map.height, dst_map.pixels, 5);
		this.updateAldbeMapEx();

		// if(!is_mohu) {
		// 	stackBlurCanvasRGBA(dst_map.width, dst_map.height, dst_map.pixels, 5);
		// 	this.updateAldbeMapEx();
		// }
			

	}
	
	// 更新漫反射贴图(不更新数据，只更新贴图)
	private tmp_texture:Texture2D;
	public updateAldbeMapEx() {
		//if(!this.texture) {
		if (this.tmp_texture) {
			this.tmp_texture.destroy();
		}
		this.tmp_texture = new Texture2D(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH, TextureFormat.R8G8B8A8, false);
		//}
		let dst_map = this.levelDT.dstMap;
		this.tmp_texture.setPixels(dst_map.pixels);
		let material = this.cylinder.meshRenderer.material as BlinnPhongMaterial;
		material.albedoTexture = this.tmp_texture
	}

	// 更新漫反射贴图
	public updateNormalMap() {
		let dst_map = this.levelDT.dstNormalMap;
		dst_map.pixels.fill(255);
		for (let i = 0; i < this.levelDT.maps.length; i++) {
			let one_map = this.levelDT.maps[i];
			Helper.blendTexture(dst_map.width, dst_map.height, dst_map.pixels, one_map.width, one_map.height, one_map.pixels, 0);
		}
		//stackBlurCanvasRGBA(dst_map.width, dst_map.height, dst_map.pixels, 5);
		this.updateNormalMapEx();
	}

	// 更新漫反射贴图(不更新数据，只更新贴图)
	private tmp_normal_texture: Texture2D;
	public updateNormalMapEx() {
		if (this.tmp_normal_texture) {
			this.tmp_normal_texture.destroy();
		}
		this.tmp_normal_texture = new Texture2D(NORMAL_WIDTH_HEIGHT, NORMAL_WIDTH_HEIGHT, TextureFormat.R8G8B8A8, false);
		//}
		let dst_map = this.levelDT.dstNormalMap;
		this.tmp_normal_texture.setPixels(dst_map.pixels);
		let material = this.cylinder.meshRenderer.material as BlinnPhongMaterial;
		material.normalTexture = this.tmp_normal_texture
	}



	// 塑形时的事件
	public addShuoxingListener() {
		this.material.albedoColor =GameBaseConfig.SHAP_ALBEDOCOLOR;
		Laya.stage.offAllCaller(this);
        let This = this;
        let levelDt = this.levelDT;
		Laya.stage.on(Laya.Event.MOUSE_DOWN, this, function (e) {
			levelDt.m_mouseDownX = Laya.stage.mouseX;
			levelDt.m_mouseDownY = Laya.stage.mouseY;
			levelDt.m_lastX = Laya.stage.mouseX;
			levelDt.m_lastY = Laya.stage.mouseY;
			levelDt.m_moveToN = 0;
			levelDt.m_moveDistance = 0;
			let hit: HitResult = this.hit;
			let ray = this.ray;

			this.camera.viewportPointToRay(new Vector2(Laya.stage.mouseX, Laya.stage.mouseY), ray);
			if (this.scene.physicsSimulation.rayCast(ray, hit)) {
				let hit_point: Vector3 = hit.point;
				levelDt.m_RayY = hit_point.y;

				let nearest = null;
				let distance = 0
				levelDt.m_beizerAction.points.forEach(element => {
					let this_distance = Math.abs(element.pos.y - levelDt.m_RayY);
					if (!nearest || this_distance < distance) {
						nearest = element;
						distance = this_distance;
					}
				});
				levelDt.m_nearestBeizerPoint = nearest
			}
		});

		Laya.stage.on(Laya.Event.MOUSE_UP, this, function (e) {
			levelDt.m_nearestBeizerPoint = null;
		});

		Laya.stage.on(Laya.Event.MOUSE_MOVE, this, function (e) {

			if (!levelDt.m_nearestBeizerPoint) return;

			if (levelDt.m_moveToN == 0) {
				if (Vector2.scalarLength(new Vector2(levelDt.m_lastX - Laya.stage.mouseX, levelDt.m_lastY - Laya.stage.mouseY)) < 10) {
					return;
				}
				if (Math.abs(levelDt.m_lastX - Laya.stage.mouseX) *2 > Math.abs(levelDt.m_lastY - Laya.stage.mouseY)) {
					levelDt.m_moveToN = 1
				} else {
					levelDt.m_moveToN = 2
				}
			}

			let move_distance = 0;
			if (levelDt.m_moveToN == 1) {
				let direction =levelDt.m_mouseDownX > Laya.stage.width/2 ?1:-1;
				let scaleX = 0.02;
				let lastX = levelDt.m_lastX;
				let thisX = Laya.stage.mouseX
				move_distance = lastX > thisX ? -scaleX : scaleX;
				if ((Math.abs(levelDt.m_nearestBeizerPoint.pos.x) < GameBaseConfig.shapMinX && direction*move_distance < 0 )
					|| (Math.abs(levelDt.m_nearestBeizerPoint.pos.x) > GameBaseConfig.shapMaxX) && direction*move_distance >0 ) return;
				levelDt.m_beizerAction.moveToX(levelDt.m_nearestBeizerPoint, direction*move_distance*GameBaseConfig.shapScaleX)
				levelDt.m_moveDistance = levelDt.m_moveDistance + move_distance;

			}
			else {
				let scaleY = 0.02;
				let lastY = levelDt.m_lastY;
				let thisY = Laya.stage.mouseY
				move_distance = lastY > thisY ? scaleY : -scaleY;
				if ((levelDt.m_nearestBeizerPoint.pos.y < GameBaseConfig.shapMinY && move_distance < 0)
					|| (levelDt.m_nearestBeizerPoint.pos.y > GameBaseConfig.shapMaxY && move_distance > 0)) return;
				levelDt.m_beizerAction.moveToY(move_distance*GameBaseConfig.shapScaleY,levelDt.m_minHeight,levelDt.m_maxHeight)
				levelDt.m_moveDistance = levelDt.m_moveDistance + move_distance;
			}
			levelDt.m_lastX = Laya.stage.mouseX;
			levelDt.m_lastY = Laya.stage.mouseY;

			levelDt.m_beizer = new Beizer(levelDt.m_beizerAction.points);
			This.updateCylinder();

			levelDt.magicProgress = Beizer.getSimilarity(levelDt.m_beizer, levelDt.m_targetBeizer);

			GameUI.msgDipatcher.event(EMessageType.PROGRESS_SHAP, levelDt.magicProgress)

		});	        		
	}


	// 着色时的事件
	public addColorListener() {
        let This = this;
		let levelDt = this.levelDT;
		levelDt.isTouch = false;
		Laya.stage.on(Laya.Event.MOUSE_DOWN, this, function (e) {
			switch(levelDt.state) {
				case EGameStatue.POLISH:
					MusicCtrl.instance.PlayPolish();
				break;
				case EGameStatue.ADDCOLOR:
					MusicCtrl.instance.PlayAddColor();
				break;
			}
			levelDt.isTouch = true;
		 });

		Laya.stage.on(Laya.Event.MOUSE_UP, this, function (e) {
			levelDt.isTouch = false;
			this.shuzi.transform.localPosition = Vector3._ZERO;
			this.shuzi.transform.rotationEuler = Vector3._ZERO;
			this.eraser.transform.localPosition = Vector3._ZERO;
			this.eraser.transform.rotationEuler = Vector3._ZERO;

			switch(levelDt.state) {
				case EGameStatue.POLISH:
					MusicCtrl.instance.stopPolish();
				break;
				case EGameStatue.ADDCOLOR:
					MusicCtrl.instance.stopAddColor();
				break;
			}			
		});

		Laya.stage.on(Laya.Event.MOUSE_MOVE, this, function (e) {
			
		});	        		
	}

	// 拍卖时的事件
	public addTouchMoveListener() {
        let This = this;
		let levelDt = this.levelDT;
		levelDt.isTouch = false;
		Laya.stage.on(Laya.Event.MOUSE_DOWN, this, function (e) {
			levelDt.isTouch = true;
			BoxControlScript.setStart(false);
			levelDt.m_lastX = Laya.stage.mouseX;
		 });

		Laya.stage.on(Laya.Event.MOUSE_UP, this, function (e) {
			levelDt.isTouch = false;
			BoxControlScript.setStart(true);
		});

		Laya.stage.on(Laya.Event.MOUSE_MOVE, this, function (e) {
			
			let x =  Laya.stage.mouseX;
			BoxControlScript.rotate(x - levelDt.m_lastX);
			levelDt.m_lastX = Laya.stage.mouseX;
		});	        		
	}

	private hit : HitResult = new HitResult();
	private ray : Ray = new Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
	private mouseVector : Vector2 = new Vector2();
	/**
	 * 射线检测
	 */
	private checkRay() : HitResult|null {
		let hit: HitResult = this.hit;
		let ray: Ray = this.ray;
		let mouseVector = this.mouseVector;
		mouseVector.x = Laya.stage.mouseX;
		mouseVector.y = Laya.stage.mouseY - 30;

		// 计算起始点与射线的方向
		this.camera.viewportPointToRay(mouseVector, ray);

		// 射线检测
		if (this.scene.physicsSimulation.rayCast(ray, hit, 10000)) {
			return hit;	
		}
		return null;
	}

	/**
	 * 设置最终的贴图
	 * @param index 贴图文件
	 */
	public onSelectTietuChange(index : number) {
		let This = this;
		let tietu_src= this.levelDT.m_config.texturePath[index];
		Texture2D.load(tietu_src, Laya.Handler.create(this, (texture: Texture2D) => {
			if (!texture) {
				console.log("加载贴图error", index, tietu_src)
				return;
			}
			let one_map1 = new OneMap(texture.width, texture.height, texture.getPixels().slice(0) as Uint8Array);
			This.levelDT.maps[1] = one_map1;
			let dst_map = this.levelDT.dstMap;		
			dst_map.pixels = this.levelDT.maps[0].pixels.slice(0);
			let task = new MergeTask(dst_map, This.levelDT.maps, ()=>{
				This.updateAldbeMapEx();
				BoxControlScript.SetTask(null as MyTask);
			})	
			BoxControlScript.SetTask(task);
			This.levelDT.tietuProgress = 1;
		}));	
	}

	public setHongpeiScore(score : number) {
		this.levelDT.hongpeiProgress = score;
		
	}

	public getTotalScore() : number {
		let ret = 0;
		ret += this.levelDT.magicProgress * GameBaseConfig.SCORE_SHUOXIN;
		ret += this.levelDT.hongpeiProgress * GameBaseConfig.SCORE_HONGPEI / 100;
		ret += this.levelDT.paoguangProgresss * GameBaseConfig.SCORE_PAOGUANG / NORMAL_WIDTH_HEIGHT / NORMAL_WIDTH_HEIGHT;
		
		if(!this.levelDT.m_config.is_hide) {
			ret += GameBaseConfig.SCORE_SHANGSE
			ret += this.levelDT.tietuProgress * GameBaseConfig.SCORE_TIETU;
		} else {
			ret += this.levelDT.addColorProgress * GameBaseConfig.SCORE_SHANGSE / ALDBE_WIDTH_HEIGTH / ALDBE_WIDTH_HEIGTH;
			ret += GameBaseConfig.SCORE_TIETU
		}
		return Math.ceil(ret);
		//第一阶段的塑性进度满值为100,第二阶段的烧制满值为100（一个火苗25），第三阶段的打磨值结果满值为100；第五阶段的添加印花后的值为50；（要求可配） 
		//3、评价规则：0 - 225为差；226 - 250为水货；251 - 285为高仿；286 - 310为精品；311 - 335极品；336 - 350为传奇；（要求可配） 
	}


	private CheckMousePosition(is_normal : boolean = false) : Vector2 | null {
		if (!this.levelDT.isTouch) {
			this.erase_effect.active = false;
			return;
		}
		// 进行射线检测
		let hit: HitResult = this.checkRay();

		if (!hit) {
			this.erase_effect.active = false;
			return 
		}

		// 碰撞点
		let hit_point: Vector3 = hit.point;

		//计算V坐标（竖向）
		// 查找最近的点
		let y_value = hit_point.y;
		let y_values = this.levelDT.y_values;
		let index;
		
		// 计算法线
		for (let i = 1; i < y_values.length; i++) {
			if (y_values[i].y >= y_value && y_values[i - 1].y <= y_value) {
				index = i;
				break;
			}
		}
		if(!index) return;
		if(!y_values[index]) return;
		let v = 1 - index / y_values.length
	
		let direct = new Vector2(y_values[index ].x - y_values[index-1].x, y_values[index].y - y_values[index-1].y)
		let angle = 90 - Helper.calcAngleByVector(direct.x, direct.y);

		//计算U坐标（横向角度）
		this.cylinder.transform.worldMatrix.invert(this.invertMatrix);
		Vector3.transformCoordinate(hit.point, this.invertMatrix, this.localPosition);

		let angel = (90 + Helper.calcAngleByVector(this.localPosition.x, this.localPosition.z)) % 360;
		let u = 1 - angel / 360;

		// 修改此值附近的贴图数据
		let map_x = Math.floor(is_normal ? u * NORMAL_WIDTH_HEIGHT : u * ALDBE_WIDTH_HEIGTH);
		let map_y = Math.floor(is_normal ? v * NORMAL_WIDTH_HEIGHT : v * ALDBE_WIDTH_HEIGTH);
		if (!is_normal) {
			// 更新刷子位置
			this.shuzi.transform.position = new Vector3(hit_point.x, hit_point.y, hit_point.z);
			this.shuzi.transform.rotationEuler = new Vector3(0, 180 - Helper.calcAngleByVector(hit_point.x, hit_point.z), angle);
		} else {
			this.eraser.transform.position = new Vector3(hit_point.x, hit_point.y, hit_point.z);
			this.eraser.transform.rotationEuler = new Vector3(-15, 180 - Helper.calcAngleByVector(hit_point.x, hit_point.z), angle);
			this.erase_effect.active = true;
		}
		return new Vector2(map_x, map_y);
	}

	/**
	 * 上色阶段帧更新
	 */
	private onUpdateForColor() {
		let vec2 = this.CheckMousePosition();
		if (!vec2) return;
		let map_x = vec2.x;
		let map_y = vec2.y;

		let pixels_dst = this.levelDT.dstMap.pixels;
		let pixels_0 = this.levelDT.maps[0].pixels;
		let pixels_1 = this.levelDT.maps[1].pixels;
		let levelDT = this.levelDT;
		let radius : number = 20;

		let color = this.levelDT.selectColor;
		if(color==null) return;
		for (let x = -radius; x <= radius; x++) {
			for (let y = -radius *4; y <= radius*4; y++) {
				if (x * x + y * y < 16 * radius * radius) {
					let x_pos = map_x + x;
					let y_pos = map_y + y;
					if (y_pos >= 0 && y_pos < ALDBE_WIDTH_HEIGTH) {
						x_pos = (x_pos + ALDBE_WIDTH_HEIGTH) % ALDBE_WIDTH_HEIGTH;
						let index = y_pos * ALDBE_WIDTH_HEIGTH + x_pos;
						index *= 4;

						// 原来是透明的，则添加进度
						if (pixels_1[index + 3] <= 0) {
							levelDT.addColorProgress++;
						}
						
						// 计算透明度
						let a = 255;
						let x_mohu = 19;
						let y_mohu = 50 ;
						if (radius - Math.abs(x) <= x_mohu) {
							a = 255 * (radius - Math.abs(x)) / x_mohu
						}
						if (4 * radius - Math.abs(y) <= y_mohu) {
							let a_y = 255 * (4 * radius - Math.abs(y)) / y_mohu
							if (a_y < a) a = a_y
						}
						a = Math.ceil(a);

						if (a == 255) {
							pixels_1[index] = color.r; pixels_dst[index] = color.r; index++
							pixels_1[index] = color.g; pixels_dst[index] = color.g; index++
							pixels_1[index] = color.b; pixels_dst[index] = color.b; index++
							pixels_1[index] = 255; pixels_dst[index] = 255; 							
						}else if (pixels_1[index + 3] == 255) {
							let old_perc = (255 - a) / 255;
							let new_Perc = 1 - old_perc
							// 只混合颜色
							pixels_1[index] = Math.floor((pixels_1[index] * old_perc + new_Perc * color.r)); pixels_dst[index] = pixels_1[index]; index++
							pixels_1[index] = Math.floor((pixels_1[index] * old_perc + new_Perc * color.g)); pixels_dst[index] = pixels_1[index]; index++
							pixels_1[index] = Math.floor((pixels_1[index] * old_perc + new_Perc * color.b)); pixels_dst[index] = pixels_1[index]; index++
						} else if (a > 0) {
							//混合透明度
							let b = pixels_1[index + 3];
							let old_perc = b / (a + b);
							let new_Perc = a / (a + b);
							pixels_1[index] = Math.floor((pixels_1[index] * old_perc + new_Perc * color.r)); pixels_dst[index] = pixels_1[index]; index++
							pixels_1[index] = Math.floor((pixels_1[index] * old_perc + new_Perc * color.g)); pixels_dst[index] = pixels_1[index]; index++
							pixels_1[index] = Math.floor((pixels_1[index] * old_perc + new_Perc * color.b)); pixels_dst[index] = pixels_1[index]; index++
							pixels_1[index] = Math.floor((pixels_1[index] * old_perc + new_Perc * color.a)); pixels_dst[index] = pixels_1[index]; index++
						}
					}
				}
			}
		}
		this.updateAldbeMapEx();

		let progress = levelDT.addColorProgress / ALDBE_WIDTH_HEIGTH / ALDBE_WIDTH_HEIGTH
		GameUI.msgDipatcher.event(EMessageType.PROGRESS_ADDCOLOR, progress )

	}

	/**
	 * 抛光阶段帧更新
	 */
	private onUpdateForPaoguang() {
		let vec2 = this.CheckMousePosition(true);
		if (!vec2) return;
		let map_x = vec2.x;
		let map_y = vec2.y;

		let normal_pixels_dst = this.levelDT.dstNormalMap.pixels;
		let normal_pixels_0 = this.levelDT.normal_maps[0].pixels;
		let normal_pixels_1 = this.levelDT.normal_maps[1].pixels;
		let pixels_dst = this.levelDT.dstMap.pixels;
		let pixels_0 = this.levelDT.maps[0].pixels;
		let pixels_1 = this.levelDT.maps[1].pixels;		
		let levelDT = this.levelDT;
		let radius: number = 30;

		for (let y = -4 * radius; y <= 4 * radius; y++) {
			for (let x = - (radius-5); x <= radius+5; x++) {
				if (x * x + y * y < 16 * radius * radius) {
					let x_pos = map_x + x;
					let y_pos = map_y + y;
					if (y_pos >= 0 && y_pos < NORMAL_WIDTH_HEIGHT) {
						x_pos = (x_pos + NORMAL_WIDTH_HEIGHT) % NORMAL_WIDTH_HEIGHT;
						let index = y_pos * NORMAL_WIDTH_HEIGHT + x_pos;
						index *= 4;
						if (normal_pixels_1[index + 3] > 0) {
							levelDT.paoguangProgresss++;
						}
						normal_pixels_1[index + 3] = 0; pixels_1[index + 3] = 0;
						normal_pixels_dst[index] = normal_pixels_0[index]; pixels_dst[index] = pixels_0[index]; index++
						normal_pixels_dst[index] = normal_pixels_0[index]; pixels_dst[index] = pixels_0[index]; index++
						normal_pixels_dst[index] = normal_pixels_0[index]; pixels_dst[index] = pixels_0[index]; index++
					}
				}
			}
		}
		this.updateNormalMapEx();
		this.updateAldbeMapEx();

		let progress = levelDT.paoguangProgresss / NORMAL_WIDTH_HEIGHT / NORMAL_WIDTH_HEIGHT
		GameUI.msgDipatcher.event(EMessageType.PROGRESS_POLISH, progress)
	}

    //场景
    private scene : Scene3D;
	public camera : Camera;
	private ray_plane : MeshSprite3D;


    // 模型(永远使用)
	private cylinder: MeshSprite3D;
	// 原始材质
	private material : BlinnPhongMaterial;
	// 原始贴图
	private texture : Texture2D;
	private normalTexture: Texture2D;

    private root : MeshSprite3D;
    public boxContrl : BoxControlScript;
    public box : Sprite3D;
    // 关卡数据
	public levelDT : LevelData;
	private eff_mopi:MeshSprite3D=null;
	public getLevelConfig():LevelConfig
	{
		return this.levelDT.m_config;
	}
	public isHighLevel():boolean
	{
		return this.levelDT.m_config.is_hide;
	}

	// 以下数据为临时变量，减少内存分配
	private invertMatrix: Matrix4x4 = new Matrix4x4();
	private localPosition: Vector3 = new Vector3();	

	public SetBoxUp(showFloor:boolean,Pos:Vector3,rotate:boolean=false)
	{
		let floor =this.scene.getChildByName("root").getChildByName("floor") as Sprite3D;
		floor.active=showFloor;
		console.log(">>>>..set  box up ",Pos);
		this.camera.transform.localPosition=Pos;
		BoxControlScript.setStart(rotate);
		Laya.stage.addChild(this.scene);
		
	}

	private starCache:any={};

	public setStar(statue:EGameStatue,star:boolean)
	{
		this.starCache[statue]=star?1:0;
	}
	public getStar()
	{
		let keys = Object.keys(this.starCache);
		let star = 0;
		if(keys!=null)
		{
			keys.forEach(element => {
				star+=this.starCache[element];
			});
			return star;
		}
		else
		{
			return 0;
		}
	}
	public resetStar()
	{
		this.starCache={};
	}

	public setCameraSize(size:number)
	{
		this.camera.orthographicVerticalSize = size * (Laya.stage.height /Laya.stage.width /(1560/720));
		console.log(">>>当前 摄像机 size ",size);
	}
	
}
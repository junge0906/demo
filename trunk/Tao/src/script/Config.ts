import { Vector4 } from "laya/d3/math/Vector4";
import { Color } from "laya/d3/math/Color";
import { Vector3 } from "laya/d3/math/Vector3";

export enum e_Textures {
    E_001 = "res/texture/t1.jpg",
    E_002 = "res/texture/t2.jpg",
    E_003 = "res/texture/t3.jpg",
	E_004 = "res/texture/t4.jpg",
	E_005 = "res/texture/t5.jpg",
	E_006 = "res/texture/t6.jpg",
	E_007 = "res/texture/t7.jpg",
    


    /** 抛光前的法线贴图 */
    E_POLISH2 = "res/texture/normal_shaozhi.jpg",
    /** 抛光完后的法线贴图 */
    E_POLISH1 = "res/texture/normal_paoguang.jpg",

    /** 抛光前的贴图 */
    E_POLISH3 = "res/texture/shaozhi.jpg",
    /** 抛光完后的贴图 */
    E_POLISH4 = "res/texture/paoguang.jpg",    
}

class ShangseConfig {
	constructor(color : Color, icon : string, albdo : string) {
		this.color = color;
		this.icon = icon;
		this.albdo = albdo;
	}
	color : Color;
	icon : string;
	albdo : string;
}

class Colors {
	public static readonly RED: ShangseConfig = new ShangseConfig(new Color(222, 38, 47, 255), "ui/color_1.png", "res/colors/red.jpg");
	public static readonly BLUE: ShangseConfig = new ShangseConfig(new Color(97, 204, 239, 255), "ui/color_2.png", "res/colors/blue.jpg");
	public static readonly WHITE: ShangseConfig = new ShangseConfig(new Color(255, 255, 255, 255), "ui/color_3.png", "res/colors/white.jpg");
	public static readonly YELLOW: ShangseConfig = new ShangseConfig(new Color(237, 230, 47, 255), "ui/color_4.png", "res/colors/yellow.jpg");
	public static readonly GREEN: ShangseConfig = new ShangseConfig(new Color(33, 200, 108, 255), "ui/color_5.png", "res/colors/green.jpg");
	public static readonly PURPLE: ShangseConfig = new ShangseConfig(new Color(167, 50, 234, 255), "ui/color_6.png", "res/colors/purple.jpg");
	public static readonly BLACK: ShangseConfig = new ShangseConfig(new Color(0, 0, 0, 255), "ui/color_7.png", "res/colors/black.jpg");
	public static readonly ORANGE: ShangseConfig = new ShangseConfig(new Color(255, 125, 10, 255), "ui/color_8.png", "res/colors/orange.jpg");
}

let beizer_default = `[
	{
		"pos": {
			"x": 100,
			"y": 0
		},
		"out": {
			"x": 100,
			"y": 10
		}
	},
	{
		"in": {
			"x": 100,
			"y": 10
		},
		"pos": {
			"x": 100,
			"y": 20
		},
		"out": {
			"x": 100,
			"y": 30
		}
	},
	{
		"in": {
			"x": 100,
			"y": 30
		},
		"pos": {
			"x": 100,
			"y": 40
		},
		"out": {
			"x": 100,
			"y": 50
		}
	},
	{
		"in": {
			"x": 100,
			"y": 50
		},
		"pos": {
			"x": 100,
			"y": 60
		},
		"out": {
			"x": 100,
			"y": 70
		}
	},
	{
		"in": {
			"x": 100,
			"y": 70
		},
		"pos": {
			"x": 100,
			"y": 80
		},
		"out": {
			"x": 100,
			"y": 90
		}
	},
	{
		"in": {
			"x": 100,
			"y": 90
		},
		"pos": {
			"x": 100,
			"y": 100
		},
		"out": {
			"x": 100,
			"y": 110
		}
	},
	{
		"in": {
			"x": 100,
			"y": 110
		},
		"pos": {
			"x": 100,
			"y": 120
		},
		"out": {
			"x": 100,
			"y": 130
		}
	},
	{
		"in": {
			"x": 100,
			"y": 130
		},
		"pos": {
			"x": 100,
			"y": 140
		},
		"out": {
			"x": 100,
			"y": 150
		}
	},
	{
		"in": {
			"x": 100,
			"y": 150
		},
		"pos": {
			"x": 100,
			"y": 160
		},
		"out": {
			"x": 100,
			"y": 170
		}
	},
	{
		"in": {
			"x": 100,
			"y": 170
		},
		"pos": {
			"x": 100,
			"y": 180
		},
		"out": {
			"x": 100,
			"y": 190
		}
	},
	{
		"in": {
			"x": 100,
			"y": 190
		},
		"pos": {
			"x": 100,
			"y": 200
		},
		"out": {
			"x": 100,
			"y": 210
		}
	},
	{
		"in": {
			"x": 100,
			"y": 210
		},
		"pos": {
			"x": 100,
			"y": 220
		},
		"out": {
			"x": 100,
			"y": 230
		}
	},
	{
		"in": {
			"x": 100,
			"y": 230
		},
		"pos": {
			"x": 100,
			"y": 240
		},
		"out": {
			"x": 100,
			"y": 250
		}
	},
	{
		"in": {
			"x": 100,
			"y": 250
		},
		"pos": {
			"x": 100,
			"y": 260
		},
		"out": {
			"x": 100,
			"y": 270
		}
	},
	{
		"in": {
			"x": 100,
			"y": 270
		},
		"pos": {
			"x": 100,
			"y": 280
		},
		"out": {
			"x": 100,
			"y": 290
		}
	},
	{
		"in": {
			"x": 100,
			"y": 290
		},
		"pos": {
			"x": 100,
			"y": 300
		}
	}
]`
let bezer01 = `[{"pos":{"x":76,"y":-1},"out":{"x":10,"y":87}},{"in":{"x":120,"y":134},"pos":{"x":126,"y":204},"out":{"x":118,"y":270}},{"in":{"x":84,"y":266},"pos":{"x":58,"y":288},"out":{"x":42,"y":383}},{"pos":{"x":78,"y":392},"in":{"x":92,"y":355}}]`
let bezer02 = `[{"pos":{"x":90,"y":2},"out":{"x":93,"y":0}},{"in":{"x":185.385109473038,"y":113.98073055151792},"pos":{"x":184,"y":168},"out":{"x":182,"y":246}},{"in":{"x":130,"y":236},"pos":{"x":88,"y":251},"out":{"x":46,"y":266}},{"pos":{"x":112,"y":346},"in":{"x":102.4,"y":327.7}}]`;
let bezer03 = `[{"pos":{"x":49,"y":0},"out":{"x":145,"y":15}},{"in":{"x":158,"y":84},"pos":{"x":137,"y":132},"out":{"x":123.19646042067352,"y":163.5509476098891}},{"in":{"x":69,"y":208},"pos":{"x":66,"y":282}}]`
// 某一关卡的配置
class LevelConfig {
    // 样式
    public beizer :string;
    // 贴图
    public pic : e_Textures;
    // 颜色(等分)
	public colors: ShangseConfig[]; 
    // 贴图选项路径
    public textureIconPath : string[]; 
    // 贴图路径
	public texturePath : string[]; 
	// 是否隐藏关卡
	public is_hide : boolean;
}

export default class GameConfig {
    public static defaultBeizer : string = beizer_default;
    // 关卡配置
    public static levels :  {[index:number]: LevelConfig} = {
        // 开始
        [-1] : {
            beizer : bezer01,
            pic : e_Textures.E_002,
			// colors: [],
			colors: [Colors.RED, Colors.BLUE, Colors.WHITE, Colors.YELLOW, Colors.GREEN, Colors.PURPLE, Colors.BLACK, Colors.ORANGE],
            textureIconPath : ["ui/texture_1.png"]   ,
			texturePath: [e_Textures.E_003] ,
			is_hide :false
        },
        // 第一关
        [1] : {
            beizer : bezer03,
            pic : e_Textures.E_002,
			colors: [Colors.RED, Colors.BLUE, Colors.WHITE, Colors.YELLOW, Colors.GREEN, Colors.PURPLE, Colors.BLACK, Colors.ORANGE],
			textureIconPath: ["ui/texture_5.png","ui/texture_6.png","ui/texture_7.png","ui/texture_1.png","ui/texture_2.png","ui/texture_3.png","ui/texture_4.png"]  ,
			texturePath: [e_Textures.E_005, e_Textures.E_006, e_Textures.E_007, e_Textures.E_001, e_Textures.E_002, e_Textures.E_003, e_Textures.E_004],
			is_hide : false
			
		},

        // 第一关
        [100001] : {
            beizer : bezer03,
            pic : e_Textures.E_002,
			colors: [Colors.RED, Colors.BLUE, Colors.WHITE, Colors.YELLOW, Colors.GREEN, Colors.PURPLE, Colors.BLACK, Colors.ORANGE],
			textureIconPath: ["ui/texture_5.png","ui/texture_6.png","ui/texture_7.png","ui/texture_1.png","ui/texture_2.png","ui/texture_3.png","ui/texture_4.png"]  ,
			texturePath: [e_Textures.E_005, e_Textures.E_006, e_Textures.E_007, e_Textures.E_001, e_Textures.E_002, e_Textures.E_003, e_Textures.E_004],
			is_hide : true
			
        }		
    };
}

class GameBaseConfig
{
   
	/**拍卖最高价  */
	public static AuctionCoin_Max =200;
	/**拍卖最低价  */
	public static AuctionCoin_Min =100;
    
    /** 烧制 指针的速度 50毫秒 多少度 */
    public static firePointSpeed=4;
    /** 烧制 冷去时间 */
    public static fireBtnCoolingTime=1;
        /** 烧制 指针的有效区域 30度 */
    public static fireGoodRatate=30;
    /** 烧制 出炉最小的 火焰数量  */
    public static fireFinishMinCount=3;
    public static shapScaleX=0.7;
	public static shapScaleY=0.5;
	/* X轴最大半径 */
	public static shapMaxX =2;
	/* X轴最小半径 */
	public static shapMinX =0.2;

	/* Y轴最大高度 */
	public static shapMaxY =4;
	/* Y轴最小高度 */
	public static shapMinY =1.5;	
    /**
     * 0-40为差；41-80为水货；81-130为高仿；131-190为精品；191-250极品；251-300为传奇；
    */
    public static resultConfig:any[]=[{value:40,msg:"ui/差.png"},{value:80,msg:"ui/水货.png"},{value:130,msg:"ui/高仿.png"},{value:190,msg:"ui/精品.png"},{value:250,msg:"ui/极品.png"},{value:10000000000,msg:"ui/传奇.png"}]

    /** 打磨
     * 进度条整体值设置为100；
	0~75进度为绿色，76~90进度为黄色，91~100进度为红色；
	模型整体区域设为100%，每“打磨”1%时上方的进度条增加1；
	进度条达到“红色”区域后获得一颗星星；
 */
    public static polishLevelConfig:number[]=[0.8,0.9,1]
      /** 塑型
     * 进度条整体值设置为100；
	0~70进度为绿色，71~90进度为黄色，91~100进度为红色；
 */
    public static shapLevelConfig:number[]=[0.8,0.9,1]


    /** 五个阶段的积分 */
    public static SCORE_SHUOXIN : number = 100;
    public static SCORE_HONGPEI: number = 100;
    public static SCORE_PAOGUANG: number = 100;
    public static SCORE_SHANGSE: number = 100;
    public static SCORE_TIETU: number = 50;

	/** 游戏中心的 模型的位置 y 越大越下 */
	public static normalRootPos:Vector3=new Vector3(0,1.5,-7.62);
	/** 开始界面 模型的位置 y 越大越下 */
	public static startUIRootPos:Vector3=new Vector3(0,1.1,-7.62);
	/** 烧制界面 模型的位置 y 越大越下 */
	public static fireShapUIRootPos:Vector3=new Vector3(0,1.1,-7.62);
	/** 结算的 模型的位置 y 越大越下 */
	public static resultUIRootPos:Vector3=new Vector3(0,0,-7.62);
	/** 展示 模型的位置 y 越大越下 */
	public static exhibitionUIPos:Vector3=new Vector3(0,0.5,-7.62);
	/* 游戏中心的 摄像机视角大小 */
	public static CAMERA_SIZE_SHAP :number =10;
	/* 开始的 摄像机视角大小 */
	public static CAMERA_SIZE_STARTUI :number =10;
	/*结算的 摄像机视角大小 */
	public static CAMERA_SIZE_RESULT :number =20;
	/*结算的 摄像机视角大小 */
	public static CAMERA_SIZE_FIRESHAP :number =10;
	/*展示 摄像机视角大小 */
	public static CAMERA_SIZE_EXHIBITION :number =10;
	/** 辅助线 线段数量 */
	public static  AUXILIARYL_LINE :number =30;
	/** 地板的缩放 */
	public static  FLOOR_SCALE :number =0.5;

	/**初始磨具 半径  */
	public static DEFAULT_SHAP_RADIUS:number=0.5;
	/**初始磨具 高度  */
	public static DEFAULT_SHAP_HEIGHT:number=1;
	/**初始磨具 控制点  不要大于30*/
	public static DEFAULT_SHAP_CTRL_POINT:number=10;
	/**塑形 的 最小高度  */
	public static SHAP_Min_HEIGHT:number=0.4;
	/* 塑型 的颜色 */
	public static SHAP_ALBEDOCOLOR =new Vector4(1,1,1,1);// new Vector4(156/255,73/255,57/255,255/255)
}
export {GameBaseConfig,LevelConfig}

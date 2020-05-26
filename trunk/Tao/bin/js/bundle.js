window.Laya=window.Laya||{};

(function (Laya) {
	'use strict';

	var REG = Laya.ClassUtils.regClass;
	var ui;
	(function (ui) {
	    class animMoveUI extends Laya.EffectAnimation {
	        constructor() {
	            super();
	            this.referenceClass = [Laya.FrameAnimation, Laya.EffectAnimation, Laya.View, Laya.Image];
	            this.effectData = ui.animMoveUI.uiView;
	        }
	    }
	    animMoveUI.uiView = { "type": "View", "props": {}, "compId": 2, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/箭头.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3 }], "animations": [{ "nodes": [{ "target": 3, "keyframes": { "y": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "y", "index": 0 }, { "value": 15, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "y", "index": 5 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "y", "index": 10 }], "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "x", "index": 0 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }], "loadList": ["ui/箭头.png"], "loadList3D": [] };
	    ui.animMoveUI = animMoveUI;
	    REG("ui.animMoveUI", animMoveUI);
	    class scaleBtnUI extends Laya.EffectAnimation {
	        constructor() {
	            super();
	            this.referenceClass = [Laya.FrameAnimation, Laya.EffectAnimation, Laya.View, Laya.Image];
	            this.effectData = ui.scaleBtnUI.uiView;
	        }
	    }
	    scaleBtnUI.uiView = { "type": "View", "props": {}, "compId": 2, "child": [{ "type": "Image", "props": { "y": -1, "x": -1, "width": 241, "skin": "ui/烧制.png", "height": 187, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 4 }], "animations": [{ "nodes": [{ "target": 4, "keyframes": { "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 0 }, { "value": 1.2, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 10 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 20 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 0 }, { "value": 1.2, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 10 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 20 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }], "loadList": ["ui/烧制.png"], "loadList3D": [] };
	    ui.scaleBtnUI = scaleBtnUI;
	    REG("ui.scaleBtnUI", scaleBtnUI);
	    class scaleStarUI extends Laya.EffectAnimation {
	        constructor() {
	            super();
	            this.referenceClass = [Laya.FrameAnimation, Laya.Image, Laya.EffectAnimation, Laya.View];
	            this.effectData = ui.scaleStarUI.uiView;
	        }
	    }
	    scaleStarUI.uiView = { "type": "View", "props": {}, "compId": 2, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "star", "skin": "ui/星星-黄色.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3 }], "animations": [{ "nodes": [{ "target": 3, "keyframes": { "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 0 }, { "value": 1.3, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 15 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 30 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 0 }, { "value": 1.3, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 15 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 30 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }], "loadList": ["ui/星星-黄色.png"], "loadList3D": [] };
	    ui.scaleStarUI = scaleStarUI;
	    REG("ui.scaleStarUI", scaleStarUI);
	})(ui || (ui = {}));
	(function (ui) {
	    var test;
	    (function (test) {
	        class lightAnimSceneUI extends Laya.View {
	            constructor() {
	                super();
	                this.referenceClass = [Laya.Image, Laya.Button, Laya.View, Laya.Sprite, Laya.Label,
	                ];
	            }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("test/lightAnimScene");
	            }
	        }
	        test.lightAnimSceneUI = lightAnimSceneUI;
	        REG("ui.test.lightAnimSceneUI", lightAnimSceneUI);
	        class MainSceneUI extends Laya.View {
	            constructor() {
	                super();
	                this.referenceClass = [Laya.View, Laya.Image];
	            }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("test/MainScene");
	            }
	        }
	        test.MainSceneUI = MainSceneUI;
	        REG("ui.test.MainSceneUI", MainSceneUI);
	        class RankListUI extends Laya.View {
	            constructor() {
	                super();
	                this.referenceClass = [Laya.List, Laya.Clip, Laya.View, Laya.Sprite, Laya.Image,
	                    Laya.Box, Laya.Label];
	            }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("test/RankList");
	            }
	        }
	        test.RankListUI = RankListUI;
	        REG("ui.test.RankListUI", RankListUI);
	        class resuletUI extends Laya.View {
	            constructor() {
	                super();
	                this.referenceClass = [Laya.Sprite, Laya.Label, Laya.Button, Laya.Image, Laya.View,
	                    Laya.Box];
	            }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("test/resulet");
	            }
	        }
	        test.resuletUI = resuletUI;
	        REG("ui.test.resuletUI", resuletUI);
	        class UIAuctionUI extends Laya.View {
	            constructor() {
	                super();
	                this.referenceClass = [Laya.Sprite, Laya.Label, Laya.Button, Laya.Image, Laya.View,
	                    Laya.Box];
	            }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("test/UIAuction");
	            }
	        }
	        test.UIAuctionUI = UIAuctionUI;
	        REG("ui.test.UIAuctionUI", UIAuctionUI);
	        class UIExhibitionUI extends Laya.View {
	            constructor() {
	                super();
	                this.referenceClass = [Laya.Button, Laya.View, Laya.Image, Laya.Box];
	            }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("test/UIExhibition");
	            }
	        }
	        test.UIExhibitionUI = UIExhibitionUI;
	        REG("ui.test.UIExhibitionUI", UIExhibitionUI);
	        class UIGameStartUI extends Laya.View {
	            constructor() {
	                super();
	                this.referenceClass = [Laya.Button, Laya.View, Laya.Image];
	            }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("test/UIGameStart");
	            }
	        }
	        test.UIGameStartUI = UIGameStartUI;
	        REG("ui.test.UIGameStartUI", UIGameStartUI);
	        class UIOptSceneUI extends Laya.View {
	            constructor() {
	                super();
	                this.referenceClass = [Laya.Box, Laya.Image, Laya.Button, Laya.List, Laya.Label,
	                    Laya.View, Laya.Sprite];
	            }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("test/UIOptScene");
	            }
	        }
	        test.UIOptSceneUI = UIOptSceneUI;
	        REG("ui.test.UIOptSceneUI", UIOptSceneUI);
	    })(test = ui.test || (ui.test = {}));
	})(ui || (ui = {}));

	var e_Textures;
	(function (e_Textures) {
	    e_Textures["E_001"] = "res/texture/t1.jpg";
	    e_Textures["E_002"] = "res/texture/t2.jpg";
	    e_Textures["E_003"] = "res/texture/t3.jpg";
	    e_Textures["E_004"] = "res/texture/t4.jpg";
	    e_Textures["E_005"] = "res/texture/t5.jpg";
	    e_Textures["E_006"] = "res/texture/t6.jpg";
	    e_Textures["E_007"] = "res/texture/t7.jpg";
	    e_Textures["E_POLISH2"] = "res/texture/normal_shaozhi.jpg";
	    e_Textures["E_POLISH1"] = "res/texture/normal_paoguang.jpg";
	    e_Textures["E_POLISH3"] = "res/texture/shaozhi.jpg";
	    e_Textures["E_POLISH4"] = "res/texture/paoguang.jpg";
	})(e_Textures || (e_Textures = {}));
	class ShangseConfig {
	    constructor(color, icon, albdo) {
	        this.color = color;
	        this.icon = icon;
	        this.albdo = albdo;
	    }
	}
	class Colors {
	}
	Colors.RED = new ShangseConfig(new Laya.Color(222, 38, 47, 255), "ui/color_1.png", "res/colors/red.jpg");
	Colors.BLUE = new ShangseConfig(new Laya.Color(97, 204, 239, 255), "ui/color_2.png", "res/colors/blue.jpg");
	Colors.WHITE = new ShangseConfig(new Laya.Color(255, 255, 255, 255), "ui/color_3.png", "res/colors/white.jpg");
	Colors.YELLOW = new ShangseConfig(new Laya.Color(237, 230, 47, 255), "ui/color_4.png", "res/colors/yellow.jpg");
	Colors.GREEN = new ShangseConfig(new Laya.Color(33, 200, 108, 255), "ui/color_5.png", "res/colors/green.jpg");
	Colors.PURPLE = new ShangseConfig(new Laya.Color(167, 50, 234, 255), "ui/color_6.png", "res/colors/purple.jpg");
	Colors.BLACK = new ShangseConfig(new Laya.Color(0, 0, 0, 255), "ui/color_7.png", "res/colors/black.jpg");
	Colors.ORANGE = new ShangseConfig(new Laya.Color(255, 125, 10, 255), "ui/color_8.png", "res/colors/orange.jpg");
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
]`;
	let bezer01 = `[{"pos":{"x":76,"y":-1},"out":{"x":10,"y":87}},{"in":{"x":120,"y":134},"pos":{"x":126,"y":204},"out":{"x":118,"y":270}},{"in":{"x":84,"y":266},"pos":{"x":58,"y":288},"out":{"x":42,"y":383}},{"pos":{"x":78,"y":392},"in":{"x":92,"y":355}}]`;
	let bezer02 = `[{"pos":{"x":90,"y":2},"out":{"x":93,"y":0}},{"in":{"x":185.385109473038,"y":113.98073055151792},"pos":{"x":184,"y":168},"out":{"x":182,"y":246}},{"in":{"x":130,"y":236},"pos":{"x":88,"y":251},"out":{"x":46,"y":266}},{"pos":{"x":112,"y":346},"in":{"x":102.4,"y":327.7}}]`;
	let bezer03 = `[{"pos":{"x":49,"y":0},"out":{"x":145,"y":15}},{"in":{"x":158,"y":84},"pos":{"x":137,"y":132},"out":{"x":123.19646042067352,"y":163.5509476098891}},{"in":{"x":69,"y":208},"pos":{"x":66,"y":282}}]`;
	class LevelConfig {
	}
	class GameConfig {
	}
	GameConfig.defaultBeizer = beizer_default;
	GameConfig.levels = {
	    [-1]: {
	        beizer: bezer01,
	        pic: e_Textures.E_002,
	        colors: [Colors.RED, Colors.BLUE, Colors.WHITE, Colors.YELLOW, Colors.GREEN, Colors.PURPLE, Colors.BLACK, Colors.ORANGE],
	        textureIconPath: ["ui/texture_1.png"],
	        texturePath: [e_Textures.E_003],
	        is_hide: false
	    },
	    [1]: {
	        beizer: bezer03,
	        pic: e_Textures.E_002,
	        colors: [Colors.RED, Colors.BLUE, Colors.WHITE, Colors.YELLOW, Colors.GREEN, Colors.PURPLE, Colors.BLACK, Colors.ORANGE],
	        textureIconPath: ["ui/texture_5.png", "ui/texture_6.png", "ui/texture_7.png", "ui/texture_1.png", "ui/texture_2.png", "ui/texture_3.png", "ui/texture_4.png"],
	        texturePath: [e_Textures.E_005, e_Textures.E_006, e_Textures.E_007, e_Textures.E_001, e_Textures.E_002, e_Textures.E_003, e_Textures.E_004],
	        is_hide: false
	    },
	    [100001]: {
	        beizer: bezer03,
	        pic: e_Textures.E_002,
	        colors: [Colors.RED, Colors.BLUE, Colors.WHITE, Colors.YELLOW, Colors.GREEN, Colors.PURPLE, Colors.BLACK, Colors.ORANGE],
	        textureIconPath: ["ui/texture_5.png", "ui/texture_6.png", "ui/texture_7.png", "ui/texture_1.png", "ui/texture_2.png", "ui/texture_3.png", "ui/texture_4.png"],
	        texturePath: [e_Textures.E_005, e_Textures.E_006, e_Textures.E_007, e_Textures.E_001, e_Textures.E_002, e_Textures.E_003, e_Textures.E_004],
	        is_hide: true
	    }
	};
	class GameBaseConfig {
	}
	GameBaseConfig.AuctionCoin_Max = 200;
	GameBaseConfig.AuctionCoin_Min = 100;
	GameBaseConfig.firePointSpeed = 4;
	GameBaseConfig.fireBtnCoolingTime = 1;
	GameBaseConfig.fireGoodRatate = 30;
	GameBaseConfig.fireFinishMinCount = 3;
	GameBaseConfig.shapScaleX = 0.7;
	GameBaseConfig.shapScaleY = 0.5;
	GameBaseConfig.shapMaxX = 2;
	GameBaseConfig.shapMinX = 0.2;
	GameBaseConfig.shapMaxY = 4;
	GameBaseConfig.shapMinY = 1.5;
	GameBaseConfig.resultConfig = [{ value: 40, msg: "ui/差.png" }, { value: 80, msg: "ui/水货.png" }, { value: 130, msg: "ui/高仿.png" }, { value: 190, msg: "ui/精品.png" }, { value: 250, msg: "ui/极品.png" }, { value: 10000000000, msg: "ui/传奇.png" }];
	GameBaseConfig.polishLevelConfig = [0.8, 0.9, 1];
	GameBaseConfig.shapLevelConfig = [0.8, 0.9, 1];
	GameBaseConfig.SCORE_SHUOXIN = 100;
	GameBaseConfig.SCORE_HONGPEI = 100;
	GameBaseConfig.SCORE_PAOGUANG = 100;
	GameBaseConfig.SCORE_SHANGSE = 100;
	GameBaseConfig.SCORE_TIETU = 50;
	GameBaseConfig.normalRootPos = new Laya.Vector3(0, 1.5, -7.62);
	GameBaseConfig.startUIRootPos = new Laya.Vector3(0, 1.1, -7.62);
	GameBaseConfig.fireShapUIRootPos = new Laya.Vector3(0, 1.1, -7.62);
	GameBaseConfig.resultUIRootPos = new Laya.Vector3(0, 0, -7.62);
	GameBaseConfig.exhibitionUIPos = new Laya.Vector3(0, 0.5, -7.62);
	GameBaseConfig.CAMERA_SIZE_SHAP = 10;
	GameBaseConfig.CAMERA_SIZE_STARTUI = 10;
	GameBaseConfig.CAMERA_SIZE_RESULT = 20;
	GameBaseConfig.CAMERA_SIZE_FIRESHAP = 10;
	GameBaseConfig.CAMERA_SIZE_EXHIBITION = 10;
	GameBaseConfig.AUXILIARYL_LINE = 30;
	GameBaseConfig.FLOOR_SCALE = 0.5;
	GameBaseConfig.DEFAULT_SHAP_RADIUS = 0.5;
	GameBaseConfig.DEFAULT_SHAP_HEIGHT = 1;
	GameBaseConfig.DEFAULT_SHAP_CTRL_POINT = 10;
	GameBaseConfig.SHAP_Min_HEIGHT = 0.4;
	GameBaseConfig.SHAP_ALBEDOCOLOR = new Laya.Vector4(1, 1, 1, 1);

	var EGameStatue;
	(function (EGameStatue) {
	    EGameStatue[EGameStatue["NONE"] = 0] = "NONE";
	    EGameStatue[EGameStatue["HOME"] = 1] = "HOME";
	    EGameStatue[EGameStatue["SHAPE"] = 2] = "SHAPE";
	    EGameStatue[EGameStatue["FIRESHAPE"] = 3] = "FIRESHAPE";
	    EGameStatue[EGameStatue["POLISH"] = 4] = "POLISH";
	    EGameStatue[EGameStatue["ADDCOLOR"] = 5] = "ADDCOLOR";
	    EGameStatue[EGameStatue["ADDTEXTURE"] = 6] = "ADDTEXTURE";
	    EGameStatue[EGameStatue["EXHIBITION"] = 7] = "EXHIBITION";
	    EGameStatue[EGameStatue["Auction"] = 8] = "Auction";
	    EGameStatue[EGameStatue["Settlement"] = 9] = "Settlement";
	})(EGameStatue || (EGameStatue = {}));
	var EMessageType;
	(function (EMessageType) {
	    EMessageType["SHOW_LOAD_SUCC"] = "show_load_suc";
	    EMessageType["GOHOME"] = "gohome";
	    EMessageType["CHANGESTATE"] = "changestuate";
	    EMessageType["PROGRESS_SHAP"] = "shap_progress";
	    EMessageType["PROGRESS_ADDCOLOR"] = "addcolor_progress";
	    EMessageType["PROGRESS_POLISH"] = "polish_progress";
	    EMessageType["ADDTEXTURE_FISNISH"] = "addtexture_finish";
	    EMessageType["HIDEBORDER"] = "HIDEBORDER";
	    EMessageType["RESET"] = "reset";
	    EMessageType["CHANGECOLOR"] = "changeColor";
	    EMessageType["CHANGETEXTURE"] = "changetexture";
	    EMessageType["GAMELEVELTYPE"] = "gamelevelType";
	})(EMessageType || (EMessageType = {}));

	class Helper {
	    static blendTexture(bgWidth, bgHeight, bgArr, blendWidth, blendHeight, blendTExutreArr, startHeight) {
	        let width1 = bgWidth;
	        let height1 = bgHeight;
	        let width2 = blendWidth;
	        let height2 = blendHeight;
	        for (let width = 0; width < width1; width++)
	            for (let height = startHeight; height < startHeight + blendHeight; height++) {
	                let start1 = width * 4 + height * width1 * 4;
	                let start2 = (width % width2) * 4 + (height % height2) * width2 * 4;
	                let aplpha2 = blendTExutreArr[start2 + 3] / 255;
	                let aplpha1 = 1 - blendTExutreArr[start2 + 3] / 255;
	                bgArr[start1] = Math.floor(aplpha1 * bgArr[start1] + aplpha2 * blendTExutreArr[start2]);
	                start2++;
	                start1++;
	                bgArr[start1] = Math.floor(aplpha1 * bgArr[start1] + aplpha2 * blendTExutreArr[start2]);
	                start2++;
	                start1++;
	                bgArr[start1] = Math.floor(aplpha1 * bgArr[start1] + aplpha2 * blendTExutreArr[start2]);
	                start2++;
	                start1++;
	            }
	        return bgArr;
	    }
	    static blendTextureEx(bgWidth, bgHeight, bgArr, blendWidth, blendHeight, blendTExutreArr, startHeight, start_width, end_width) {
	        let width1 = bgWidth;
	        let height1 = bgHeight;
	        let width2 = blendWidth;
	        let height2 = blendHeight;
	        for (let width = start_width; width < Math.min(end_width, width1); width++)
	            for (let height = startHeight; height < startHeight + blendHeight; height++) {
	                let start1 = width * 4 + height * width1 * 4;
	                let start2 = (width % width2) * 4 + (height % height2) * width2 * 4;
	                let aplpha2 = blendTExutreArr[start2 + 3] / 255;
	                let aplpha1 = 1 - blendTExutreArr[start2 + 3] / 255;
	                bgArr[start1] = Math.floor(aplpha1 * bgArr[start1] + aplpha2 * blendTExutreArr[start2]);
	                start2++;
	                start1++;
	                bgArr[start1] = Math.floor(aplpha1 * bgArr[start1] + aplpha2 * blendTExutreArr[start2]);
	                start2++;
	                start1++;
	                bgArr[start1] = Math.floor(aplpha1 * bgArr[start1] + aplpha2 * blendTExutreArr[start2]);
	                start2++;
	                start1++;
	            }
	        return bgArr;
	    }
	    static calcAngleByVector(x, y) {
	        return ((Math.atan2(y, x) + 2 * Math.PI) * 360 / (2 * Math.PI)) % 360;
	    }
	    static fillWithColor(pixels, color, start = null, length = null) {
	        if (!start)
	            start = 0;
	        if (!length)
	            length = pixels.length;
	        if (length % 4 != 0)
	            length = length - length % 4;
	        for (let i = start; i < start + length; i += 4) {
	            let pos = i;
	            pixels[pos++] = color.r;
	            pixels[pos++] = color.g;
	            pixels[pos++] = color.b;
	            pixels[pos++] = color.a;
	        }
	    }
	}

	class BeizerPoint {
	    constructor() { }
	}
	class BeizerUnit {
	    constructor(start_point, end_point) {
	        this.getPoint = function (t) {
	            let x = this.bezierAt(this.start.x, this.startCtrlPoint.x, this.endCtrlPoint.x, this.end.x, t);
	            let y = this.bezierAt(this.start.y, this.startCtrlPoint.y, this.endCtrlPoint.y, this.end.y, t);
	            return new Laya.Vector2(x, y);
	        };
	        this.__arcLengthDivisions = 200;
	        this.cacheArcLengths = null;
	        this.getPointAt = function (u) {
	            let t = this.getUtoTmapping(u);
	            return this.getPoint(t);
	        };
	        this.start = start_point.pos;
	        this.startCtrlPoint = start_point.out;
	        this.end = end_point.pos;
	        this.endCtrlPoint = end_point.in;
	    }
	    getLength() {
	        let lengths = this.getLengths(null);
	        return lengths[lengths.length - 1];
	    }
	    ;
	    bezierAt(C1, C2, C3, C4, t) {
	        let t1 = 1 - t;
	        return C1 * t1 * t1 * t1 +
	            C2 * 3 * t1 * t1 * t +
	            C3 * 3 * t1 * t * t +
	            C4 * t * t * t;
	    }
	    getLengths(divisions) {
	        if (!divisions)
	            divisions = (this.__arcLengthDivisions) ? (this.__arcLengthDivisions) : 200;
	        if (this.cacheArcLengths
	            && (this.cacheArcLengths.length === divisions + 1)) {
	            return this.cacheArcLengths;
	        }
	        let cache = [];
	        let current, last = this.getPoint(0);
	        let p, sum = 0;
	        cache.push(0);
	        for (p = 1; p <= divisions; p++) {
	            current = this.getPoint(p / divisions);
	            let lenth_vec = new Laya.Vector2(current.x - last.x, current.y - last.y);
	            sum += Laya.Vector2.scalarLength(lenth_vec);
	            cache.push(sum);
	            last = current;
	        }
	        this.cacheArcLengths = cache;
	        return cache;
	    }
	    getUtoTmapping(u, distance) {
	        let arcLengths = this.getLengths(null);
	        let i = 0, il = arcLengths.length;
	        let targetArcLength;
	        if (distance) {
	            targetArcLength = distance;
	        }
	        else {
	            targetArcLength = u * arcLengths[il - 1];
	        }
	        let low = 0, high = il - 1, comparison;
	        while (low <= high) {
	            i = Math.floor(low + (high - low) / 2);
	            comparison = arcLengths[i] - targetArcLength;
	            if (comparison < 0) {
	                low = i + 1;
	                continue;
	            }
	            else if (comparison > 0) {
	                high = i - 1;
	                continue;
	            }
	            else {
	                high = i;
	                break;
	            }
	        }
	        i = high;
	        if (arcLengths[i] == targetArcLength) {
	            let t = i / (il - 1);
	            return t;
	        }
	        let lengthBefore = arcLengths[i];
	        let lengthAfter = arcLengths[i + 1];
	        let segmentLength = lengthAfter - lengthBefore;
	        let segmentFraction = (targetArcLength - lengthBefore) / segmentLength;
	        let t = (i + segmentFraction) / (il - 1);
	        return t;
	    }
	}
	class Beizer {
	    constructor(points) {
	        this.points = null;
	        this.beziers = [];
	        this.ratios = [];
	        this.progresses = [];
	        this.length = 0;
	        this.m_begPoint = null;
	        this.m_endPoind = null;
	        this.points = points;
	        this.initBeziers();
	    }
	    initBeziers() {
	        this.ratios.length = 0;
	        this.progresses.length = 0;
	        this.length = 0;
	        for (let i = 1; i < this.points.length; i++) {
	            let startPoint = this.points[i - 1];
	            let endPoint = this.points[i];
	            let bezier = new BeizerUnit(startPoint, endPoint);
	            this.beziers.push(bezier);
	            this.length += bezier.getLength();
	        }
	        let current = 0;
	        for (let i = 0; i < this.beziers.length; i++) {
	            let bezier = this.beziers[i];
	            this.ratios[i] = bezier.getLength() / this.length;
	            this.progresses[i] = current = current + this.ratios[i];
	        }
	        this.m_begPoint = this.getFirstPoint();
	        this.m_begPoint = this.getFirstPoint();
	        this.m_endPoind = this.getFirstPoint();
	        while (!this.m_endPoind.is_end) {
	            this.m_endPoind.toNextPoint(1);
	        }
	    }
	    GetDirectOfUnitEnd(unit_index) {
	        let start_point = this.getFirstPoint();
	        start_point.toNextPoint(this.progresses[unit_index] * this.length);
	        return start_point.getDirection();
	    }
	    toNextPoint(now_point, distance) {
	        now_point.bezierProgress += distance / this.length;
	        if (distance <= 0) {
	            if (now_point.bezierProgress <= 0) {
	                let start = this.beziers[0].start;
	                now_point.bezierProgress = 0;
	                now_point.bezierIndex = 0;
	                now_point.distance = 0;
	                now_point.point.x = start.x;
	                now_point.point.y = start.y;
	                return;
	            }
	            while (now_point.bezierIndex > 0 && now_point.bezierProgress < this.progresses[now_point.bezierIndex - 1]) {
	                now_point.bezierIndex--;
	            }
	        }
	        while (distance > 0 && now_point.bezierProgress > this.progresses[now_point.bezierIndex]) {
	            if (now_point.bezierIndex >= this.progresses.length - 1) {
	                now_point.is_end = true;
	                let end = this.beziers[now_point.bezierIndex].end;
	                now_point.point.x = end.x;
	                now_point.point.y = end.y;
	                now_point.distance = this.length * now_point.bezierProgress;
	                return;
	            }
	            else {
	                now_point.bezierIndex++;
	            }
	        }
	        let realProgress = (now_point.bezierProgress -
	            (now_point.bezierIndex > 0 ? this.progresses[now_point.bezierIndex - 1] : 0)) / this.ratios[now_point.bezierIndex];
	        let pos = this.beziers[now_point.bezierIndex].getPointAt(realProgress);
	        now_point.point = pos;
	        now_point.distance = this.length * now_point.bezierProgress;
	    }
	    splitToNumPoint(const_slice) {
	        let beizer_user_point = this.getFirstPoint();
	        let distance = beizer_user_point.beizer.getLenth() / const_slice;
	        let y_values = [];
	        while (true) {
	            y_values.push(beizer_user_point.point.clone());
	            if (beizer_user_point.is_end)
	                break;
	            beizer_user_point.toNextPoint(distance);
	        }
	        return y_values;
	    }
	    static splitByYPos(beizer, split) {
	        let max_height = beizer.getLastPosition().y;
	        let const_slice = 800;
	        let beizer_user_point1 = beizer.getFirstPoint();
	        let distance1 = beizer_user_point1.beizer.getLenth() / const_slice;
	        let x_values1 = [];
	        let index1 = 0;
	        while (index1 * split < max_height) {
	            if (beizer_user_point1.point.y > index1 * split) {
	                x_values1.push(beizer_user_point1.point.x);
	                index1++;
	            }
	            else {
	                if (beizer_user_point1.is_end)
	                    break;
	                beizer_user_point1.toNextPoint(distance1);
	            }
	        }
	        return x_values1;
	    }
	    static getSimilarity(beizer1, beizer2) {
	        let heigth1 = beizer1.getLastPosition().y;
	        let height2 = beizer2.getLastPosition().y;
	        let similarity = heigth1 / height2;
	        if (similarity > 1)
	            similarity = 1 / similarity;
	        let max_height = height2 < heigth1 ? heigth1 : height2;
	        let split = max_height / 20;
	        let x_values1 = Beizer.splitByYPos(beizer1, split);
	        let x_values2 = Beizer.splitByYPos(beizer2, split);
	        let x_similarity = 0;
	        for (let i = 0; i < Math.min(x_values1.length, x_values2.length); i++) {
	            let x1 = x_values1[i];
	            let x2 = x_values2[i];
	            let sim = 0;
	            if (x1 > x2) {
	                sim = x2 / x1;
	            }
	            else {
	                sim = x1 / x2;
	            }
	            x_similarity += sim;
	        }
	        return similarity * x_similarity / Math.min(x_values1.length, x_values2.length);
	    }
	    getFirstPoint() {
	        let now_point = new BeizerUserPoint(this);
	        let start = this.beziers[0].start;
	        now_point.point.x = start.x;
	        now_point.point.y = start.y;
	        return now_point;
	    }
	    getLastPosition() {
	        return this.beziers[this.beziers.length - 1].end;
	    }
	    getLastDirect() {
	        let end_unit = this.beziers[this.beziers.length - 1];
	        return Laya.Utils.getAngleOrPoints(end_unit.end, end_unit.endCtrlPoint);
	        return 0;
	    }
	    getLenth() {
	        return this.length;
	    }
	}
	class BeizerUserPoint {
	    constructor(beizer) {
	        this.bezierIndex = 0;
	        this.bezierProgress = 0;
	        this.distance = 0;
	        this.beizer = null;
	        this.point = new Laya.Vector2();
	        this.layer = 1;
	        this.is_end = false;
	        this.beizer = beizer;
	    }
	    toNextPoint(distance) {
	        this.beizer.toNextPoint(this, distance);
	    }
	    copy() {
	        let new_point = new BeizerUserPoint(this.beizer);
	        new_point.bezierIndex = this.bezierIndex;
	        new_point.bezierProgress = this.bezierProgress;
	        new_point.point = this.point.clone();
	        new_point.layer = this.layer;
	        new_point.is_end = this.is_end;
	        new_point.distance = this.distance;
	        return new_point;
	    }
	    getDirection() {
	        if (this.is_end) {
	            return this.beizer.getLastDirect();
	        }
	        let new_point = this.copy();
	        new_point.toNextPoint(0.01);
	        if (new_point.point.x != this.point.x || new_point.point.y != this.point.y) {
	            return Helper.calcAngleByVector(new_point.point.x - this.point.x, new_point.point.y - this.point.y);
	        }
	        else {
	            return 0;
	        }
	    }
	}
	class BeizerAction {
	    constructor() {
	        this.points = null;
	    }
	    moveToX(movePoint, moveDis, checkLeft = true, checkRight = true) {
	        movePoint.pos.x = movePoint.pos.x + moveDis;
	        if (movePoint.in)
	            movePoint.in.x = movePoint.in.x + moveDis;
	        if (movePoint.out)
	            movePoint.out.x = movePoint.out.x + moveDis;
	        let last = movePoint.last;
	        let next = movePoint.next;
	        if (last != null) {
	            if (checkLeft == true && this.needMoveNext(movePoint, moveDis, last)) {
	                this.moveToX(last, this.getNextMoveDis(movePoint, moveDis, last), true, false);
	            }
	        }
	        if (next != null) {
	            if (checkRight == true && this.needMoveNext(movePoint, moveDis, next)) {
	                this.moveToX(next, this.getNextMoveDis(movePoint, moveDis, next), false, true);
	            }
	        }
	        if (last != null && next != null) {
	            if (movePoint.pos.x >= last.pos.x && movePoint.pos.x >= next.pos.x) {
	                movePoint.in.x = movePoint.pos.x;
	                movePoint.in.y = (movePoint.pos.y + last.pos.y) / 2;
	                movePoint.out.x = movePoint.pos.x;
	                movePoint.out.y = (movePoint.pos.y + next.pos.y) / 2;
	            }
	            else {
	                movePoint.in.x = (last.pos.x + movePoint.pos.x) / 2;
	                movePoint.in.y = (last.pos.y + movePoint.pos.y) / 2;
	                movePoint.out.x = (next.pos.x + movePoint.pos.x) / 2;
	                movePoint.out.y = (next.pos.y + movePoint.pos.y) / 2;
	            }
	        }
	        return new Beizer(this.points);
	    }
	    getMirrorVector(startPos, mirrorPos) {
	        return new Laya.Vector2(mirrorPos.x * 2 - startPos.x, mirrorPos.y * 2 - startPos.y);
	    }
	    needMoveNext(movePoint, moveDis, curPoint) {
	        if (Math.abs(movePoint.pos.x - curPoint.pos.x) > 0.2) {
	            if (movePoint.pos.x > curPoint.pos.x && moveDis > 0)
	                return true;
	            if (movePoint.pos.x < curPoint.pos.x && moveDis < 0)
	                return true;
	        }
	        return false;
	    }
	    getNextMoveDis(movePoint, moveDis, curPoint) {
	        let lastMoveDis = moveDis * 0.3;
	        return lastMoveDis;
	    }
	    moveToY(moveDis, minHeight, maxHeight) {
	        let curmaxHeight = this.getMaxHeight();
	        let length = this.points.length;
	        let move = moveDis / length;
	        let moveTmp = 0;
	        if ((moveDis + curmaxHeight) > maxHeight || (moveDis + curmaxHeight) < minHeight) {
	            console.log(">>> 不过");
	            return;
	        }
	        this.points.forEach(element => {
	            element.pos.y = element.pos.y + moveTmp;
	            if (element.in)
	                element.in.y = element.in.y + moveTmp;
	            if (element.out)
	                element.out.y = element.out.y + moveTmp;
	            moveTmp = move + moveTmp;
	        });
	    }
	    getMaxHeight() {
	        let y = 0;
	        this.points.forEach(element => {
	            if (element.pos.y > y) {
	                y = element.pos.y;
	            }
	        });
	        return y;
	    }
	}

	let tLitmit = 25;
	class MyTask {
	    constructor() {
	        this.st = new Date().getTime();
	        this.curIdx = 0;
	        this.MAX_COUNT = 9999;
	        this.finish = false;
	    }
	    onFrame() {
	        if (this.finish)
	            return;
	        this.st = new Date().getTime();
	        for (let i = this.curIdx; i < this.MAX_COUNT; i++) {
	            if (new Date().getTime() - this.st > tLitmit) {
	                this.curIdx = i;
	                return;
	            }
	            if (this.doThings())
	                break;
	        }
	        this.finish = true;
	        this.onComplete();
	    }
	    doThings() {
	        return true;
	    }
	    onComplete() {
	    }
	}
	class BoxControlScript extends Laya.Script3D {
	    constructor() {
	        super();
	        this._rotation = new Laya.Vector3(0, 2, 0);
	        BoxControlScript.script = this;
	    }
	    onAwake() {
	        this.box = this.owner;
	    }
	    static setStart(start) {
	        BoxControlScript.s_Start = start;
	    }
	    static setSpeed(speed) {
	        BoxControlScript.s_Speed = speed;
	    }
	    static rotate(value) {
	        BoxControlScript.script._rotation.y = value;
	        BoxControlScript.script.box.transform.rotate(BoxControlScript.script._rotation, false, false);
	    }
	    static getSpeed() {
	        return BoxControlScript.s_Speed;
	    }
	    onStart() {
	    }
	    onUpdate() {
	        if (BoxControlScript.s_Start == true) {
	            this._rotation.y = BoxControlScript.s_Speed;
	            this.box.transform.rotate(this._rotation, false, false);
	        }
	        SceneHelper.Instance.onUpdate();
	        if (BoxControlScript.m_task)
	            BoxControlScript.m_task.onFrame();
	    }
	    static SetTask(task) {
	        BoxControlScript.m_task = task;
	    }
	    onDisable() {
	        console.log("组件设置为不可用");
	    }
	}
	BoxControlScript.s_Start = true;
	BoxControlScript.DEFAULT_SPEED = 2;
	BoxControlScript.s_Speed = 2;

	class OneMap {
	    constructor(height, width, pixels = null) {
	        this.height = height;
	        this.width = width;
	        if (pixels) {
	            this.pixels = new Uint8Array(pixels);
	        }
	        else {
	            this.pixels = new Uint8Array(height * width * 4);
	        }
	    }
	}
	class TextureManager {
	    constructor() {
	        this.textures = {};
	    }
	    loadTexture(src, callback) {
	        if (this.textures.hasOwnProperty(src)) {
	            callback(this.textures[src]);
	            return;
	        }
	        Laya.Texture2D.load(src, Laya.Laya.Handler.create(this, (texture) => {
	            let one_info = new OneMap(texture.height, texture.width, texture.getPixels());
	            this.textures[src] = one_info;
	            callback(this.textures[src]);
	        }));
	    }
	    loadTextures(src, callback) {
	        Laya.Laya.loader.create(src, Laya.Laya.Handler.create(this, () => {
	            for (let i = 0; i < src.length; i++) {
	                if (!this.textures.hasOwnProperty(src[i])) {
	                    let texture = Laya.Laya.Loader.getRes(src[i]);
	                    this.textures[src[i]] = new OneMap(texture.height, texture.width, texture.getPixels());
	                }
	            }
	            let result = [];
	            for (let i = 0; i < src.length; i++) {
	                result.push(this.textures[src[i]]);
	            }
	            callback(result);
	        }));
	    }
	}
	TextureManager.Instance = new TextureManager();

	var mul_table = [
	    512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512,
	    454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512,
	    482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456,
	    437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512,
	    497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328,
	    320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456,
	    446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335,
	    329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512,
	    505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405,
	    399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328,
	    324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271,
	    268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456,
	    451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388,
	    385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335,
	    332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292,
	    289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259
	];
	var shg_table = [
	    9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
	    17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
	    19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
	    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
	    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
	    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
	    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
	    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
	    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
	    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
	    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
	    23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
	    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
	    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
	    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
	    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24
	];
	function stackBlurCanvasRGBA(width, height, pixels, radius) {
	    if (isNaN(radius) || radius < 1)
	        return;
	    radius |= 0;
	    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;
	    var div = radius + radius + 1;
	    var w4 = width << 2;
	    var widthMinus1 = width - 1;
	    var heightMinus1 = height - 1;
	    var radiusPlus1 = radius + 1;
	    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
	    var stackStart = new BlurStack();
	    var stack = stackStart;
	    for (i = 1; i < div; i++) {
	        stack = stack.next = new BlurStack();
	        if (i == radiusPlus1)
	            var stackEnd = stack;
	    }
	    stack.next = stackStart;
	    var stackIn = null;
	    var stackOut = null;
	    yw = yi = 0;
	    var mul_sum = mul_table[radius];
	    var shg_sum = shg_table[radius];
	    for (y = 0; y < height; y++) {
	        r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
	        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
	        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
	        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
	        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
	        r_sum += sumFactor * pr;
	        g_sum += sumFactor * pg;
	        b_sum += sumFactor * pb;
	        a_sum += sumFactor * pa;
	        stack = stackStart;
	        for (i = 0; i < radiusPlus1; i++) {
	            stack.r = pr;
	            stack.g = pg;
	            stack.b = pb;
	            stack.a = pa;
	            stack = stack.next;
	        }
	        for (i = 1; i < radiusPlus1; i++) {
	            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
	            r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
	            g_sum += (stack.g = (pg = pixels[p + 1])) * rbs;
	            b_sum += (stack.b = (pb = pixels[p + 2])) * rbs;
	            a_sum += (stack.a = (pa = pixels[p + 3])) * rbs;
	            r_in_sum += pr;
	            g_in_sum += pg;
	            b_in_sum += pb;
	            a_in_sum += pa;
	            stack = stack.next;
	        }
	        stackIn = stackStart;
	        stackOut = stackEnd;
	        for (x = 0; x < width; x++) {
	            pixels[yi + 3] = pa = (a_sum * mul_sum) >> shg_sum;
	            if (pa != 0) {
	                pa = 255 / pa;
	                pixels[yi] = ((r_sum * mul_sum) >> shg_sum) * pa;
	                pixels[yi + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
	                pixels[yi + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
	            }
	            else {
	                pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
	            }
	            r_sum -= r_out_sum;
	            g_sum -= g_out_sum;
	            b_sum -= b_out_sum;
	            a_sum -= a_out_sum;
	            r_out_sum -= stackIn.r;
	            g_out_sum -= stackIn.g;
	            b_out_sum -= stackIn.b;
	            a_out_sum -= stackIn.a;
	            p = (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;
	            r_in_sum += (stackIn.r = pixels[p]);
	            g_in_sum += (stackIn.g = pixels[p + 1]);
	            b_in_sum += (stackIn.b = pixels[p + 2]);
	            a_in_sum += (stackIn.a = pixels[p + 3]);
	            r_sum += r_in_sum;
	            g_sum += g_in_sum;
	            b_sum += b_in_sum;
	            a_sum += a_in_sum;
	            stackIn = stackIn.next;
	            r_out_sum += (pr = stackOut.r);
	            g_out_sum += (pg = stackOut.g);
	            b_out_sum += (pb = stackOut.b);
	            a_out_sum += (pa = stackOut.a);
	            r_in_sum -= pr;
	            g_in_sum -= pg;
	            b_in_sum -= pb;
	            a_in_sum -= pa;
	            stackOut = stackOut.next;
	            yi += 4;
	        }
	        yw += width;
	    }
	    for (x = 0; x < width; x++) {
	        g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
	        yi = x << 2;
	        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
	        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
	        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
	        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
	        r_sum += sumFactor * pr;
	        g_sum += sumFactor * pg;
	        b_sum += sumFactor * pb;
	        a_sum += sumFactor * pa;
	        stack = stackStart;
	        for (i = 0; i < radiusPlus1; i++) {
	            stack.r = pr;
	            stack.g = pg;
	            stack.b = pb;
	            stack.a = pa;
	            stack = stack.next;
	        }
	        yp = width;
	        for (i = 1; i <= radius; i++) {
	            yi = (yp + x) << 2;
	            r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
	            g_sum += (stack.g = (pg = pixels[yi + 1])) * rbs;
	            b_sum += (stack.b = (pb = pixels[yi + 2])) * rbs;
	            a_sum += (stack.a = (pa = pixels[yi + 3])) * rbs;
	            r_in_sum += pr;
	            g_in_sum += pg;
	            b_in_sum += pb;
	            a_in_sum += pa;
	            stack = stack.next;
	            if (i < heightMinus1) {
	                yp += width;
	            }
	        }
	        yi = x;
	        stackIn = stackStart;
	        stackOut = stackEnd;
	        for (y = 0; y < height; y++) {
	            p = yi << 2;
	            pixels[p + 3] = pa = (a_sum * mul_sum) >> shg_sum;
	            if (pa > 0) {
	                pa = 255 / pa;
	                pixels[p] = ((r_sum * mul_sum) >> shg_sum) * pa;
	                pixels[p + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
	                pixels[p + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
	            }
	            else {
	                pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
	            }
	            r_sum -= r_out_sum;
	            g_sum -= g_out_sum;
	            b_sum -= b_out_sum;
	            a_sum -= a_out_sum;
	            r_out_sum -= stackIn.r;
	            g_out_sum -= stackIn.g;
	            b_out_sum -= stackIn.b;
	            a_out_sum -= stackIn.a;
	            p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;
	            r_sum += (r_in_sum += (stackIn.r = pixels[p]));
	            g_sum += (g_in_sum += (stackIn.g = pixels[p + 1]));
	            b_sum += (b_in_sum += (stackIn.b = pixels[p + 2]));
	            a_sum += (a_in_sum += (stackIn.a = pixels[p + 3]));
	            stackIn = stackIn.next;
	            r_out_sum += (pr = stackOut.r);
	            g_out_sum += (pg = stackOut.g);
	            b_out_sum += (pb = stackOut.b);
	            a_out_sum += (pa = stackOut.a);
	            r_in_sum -= pr;
	            g_in_sum -= pg;
	            b_in_sum -= pb;
	            a_in_sum -= pa;
	            stackOut = stackOut.next;
	            yi += width;
	        }
	    }
	}
	function BlurStack() {
	    this.r = 0;
	    this.g = 0;
	    this.b = 0;
	    this.a = 0;
	    this.next = null;
	}

	class MusicConfig {
	}
	MusicConfig.bgMusic = "res/music/bg.mp3";
	MusicConfig.polish = "res/music/dm.mp3";
	MusicConfig.FireSucceed = "res/music/jr.mp3";
	MusicConfig.FireNoSucceed = "res/music/jw.mp3";
	MusicConfig.getCoin = "res/music/coinget.mp3";
	MusicConfig.auction = "res/music/pm.mp3";
	MusicConfig.addcolor = "res/music/ss.mp3";

	class MusicCtrl {
	    constructor() {
	        this._MusicVolume = 1;
	    }
	    static get instance() {
	        if (MusicCtrl._instance == null) {
	            MusicCtrl._instance = new MusicCtrl();
	            MusicCtrl._instance.Init();
	        }
	        return MusicCtrl._instance;
	    }
	    Init() {
	        Laya.Laya.LocalStorage.removeItem("volum");
	        let musicCache = parseFloat(Laya.Laya.LocalStorage.getItem("volum"));
	        if (!musicCache) {
	            this.MusicVolume = 1;
	            console.log(">>>>MusicCtrl>>>>>>. ");
	        }
	        else {
	            this.MusicVolume = musicCache;
	        }
	        console.log(">>>>MusicCtrl>>>>>>. ", Laya.Laya.LocalStorage.getItem("Vibrate"), this._MusicVolume);
	    }
	    OnEnterScene() {
	    }
	    PlayMusic(r_path) {
	        Laya.Laya.SoundManager.playMusic(r_path, 0.1);
	    }
	    PlaySound(r_path, loop = 1) {
	        Laya.Laya.SoundManager.playSound(r_path, loop);
	    }
	    get MusicVolume() {
	        return this._MusicVolume;
	    }
	    set MusicVolume(v) {
	        this._MusicVolume = v;
	        console.log(">>>>> MusicVolume  ", v);
	        Laya.Laya.SoundManager.setMusicVolume(this._MusicVolume / 2);
	        Laya.Laya.SoundManager.setSoundVolume(this._MusicVolume);
	        Laya.Laya.LocalStorage.setItem("volum", this._MusicVolume.toString());
	    }
	    OnMusic() {
	        console.log(">>>>OnMusic>>>>>>. ");
	        this.MusicVolume = 1;
	    }
	    OffMusic() {
	        console.log(">>>>OffMusic>>>>>>. ");
	        this.MusicVolume = 0;
	    }
	    PlayBgMusic() {
	        if (this.MusicVolume > 0) {
	            console.log("player bg music ", this.MusicVolume);
	            this.PlayMusic(MusicConfig.bgMusic);
	        }
	    }
	    StopBgMusic() {
	        Laya.Laya.SoundManager.stopMusic();
	    }
	    PlayOnClick() {
	        if (this.MusicVolume > 0) {
	            console.log("player bg music ");
	            this.PlaySound("res/Music/click.mp3");
	        }
	    }
	    PlayPolish() {
	        this.PlaySound(MusicConfig.polish, 0.1);
	    }
	    stopPolish() {
	        Laya.Laya.SoundManager.stopSound(MusicConfig.polish);
	    }
	    PlayAddColor() {
	        this.PlaySound(MusicConfig.addcolor, 0.1);
	    }
	    stopAddColor() {
	        Laya.Laya.SoundManager.stopSound(MusicConfig.addcolor);
	    }
	}
	MusicCtrl._instance = null;

	class LevelCtrl {
	    static GetLevel() {
	        return LevelCtrl.level;
	    }
	    static SaveLevel(level) {
	        LevelCtrl.level = level;
	    }
	    static getHideLevel() {
	        return LevelCtrl.hide_Level;
	    }
	    static saveHideLevel() {
	        LevelCtrl.hide_Level = this.hide_Level;
	    }
	}
	LevelCtrl.level = 1;
	LevelCtrl.hide_Level = 100001;

	const NORMAL_WIDTH_HEIGHT = 1024;
	const ALDBE_WIDTH_HEIGTH = 1024;
	class LevelData {
	    constructor() {
	        this.m_beizerAction = new BeizerAction();
	        this.m_verticesConstant = null;
	        this.m_vertices = null;
	        this.m_config = null;
	        this.m_maxHeight = 4;
	        this.m_minHeight = 0;
	        this.normal_maps = [];
	        this.maps = [];
	        this.magicProgress = 0;
	        this.addColorProgress = 0;
	        this.paoguangProgresss = 0;
	        this.hongpeiProgress = 0;
	        this.tietuProgress = 0;
	        this.isTouch = false;
	    }
	}
	class MergeTask extends MyTask {
	    constructor(dst_map, maps, callback) {
	        super();
	        this.maps_index = 0;
	        this.map_start = 0;
	        this.callback = callback;
	        this.dst_map = dst_map;
	        this.maps = maps;
	    }
	    doThings() {
	        let start = this.map_start;
	        if (start >= this.dst_map.width) {
	            this.maps_index++;
	            this.map_start = 0;
	            start = 0;
	            if (this.maps_index >= this.maps.length)
	                return true;
	        }
	        let one_map = this.maps[this.maps_index];
	        Helper.blendTextureEx(this.dst_map.width, this.dst_map.height, this.dst_map.pixels, one_map.width, one_map.height, one_map.pixels, 0, start, start + 10);
	        this.map_start += 10;
	        return false;
	    }
	    onComplete() {
	        super.onComplete();
	        if (this.callback)
	            this.callback();
	    }
	}
	class SceneHelper {
	    constructor() {
	        this.hit = new Laya.HitResult();
	        this.ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
	        this.mouseVector = new Laya.Vector2();
	        this.eff_mopi = null;
	        this.invertMatrix = new Laya.Matrix4x4();
	        this.localPosition = new Laya.Vector3();
	        this.starCache = {};
	    }
	    set Scene(scene) {
	        this.scene = scene;
	        this.camera = scene.getChildByName("cameraNode").getChildByName("Main Camera");
	        console.log(`this.camera size ${this.camera.orthographicVerticalSize}`);
	        this.root = scene.getChildByName("root");
	        this.root.addComponent(BoxControlScript);
	        this.cylinder = this.root.getChildByName("box").getChildByName("pPipe1_0");
	        ;
	        this.material = this.cylinder.meshRenderer.material;
	        this.texture = this.material.albedoTexture;
	        this.normalTexture = this.material.normalTexture;
	        this.shuzi = scene.getChildByName("nodeBrush").getChildByName("brush");
	        this.shuzi.active = false;
	        this.eraser = scene.getChildByName("nodePolish").getChildByName("PolishingStone");
	        this.eraser.active = false;
	        this.erase_effect = this.eraser.getChildByName("effect_mopi");
	        this.erase_effect.active = false;
	        this.scene.getChildByName("root").getChildByName("floor").transform.localScale = new Laya.Vector3(GameBaseConfig.FLOOR_SCALE, GameBaseConfig.FLOOR_SCALE, GameBaseConfig.FLOOR_SCALE);
	        var ray_plane = scene.addChild(new Laya.MeshSprite3D());
	        this.ray_plane = ray_plane;
	        this.ray_plane.active = false;
	        var planeMat = new Laya.BlinnPhongMaterial();
	        var tilingOffset = planeMat.tilingOffset;
	        tilingOffset.setValue(5, 5, 0, 0);
	        planeMat.tilingOffset = tilingOffset;
	        ray_plane.meshRenderer.material = planeMat;
	        ray_plane.meshRenderer.materials;
	        ray_plane.transform.localPosition = new Laya.Vector3(0, 1, 0);
	        ray_plane.transform.localRotationEuler = new Laya.Vector3(-90, 0, 0);
	        var planeStaticCollider = ray_plane.addComponent(Laya.PhysicsCollider);
	        var planeShape = new Laya.BoxColliderShape(100, 0, 100);
	        planeStaticCollider.colliderShape = planeShape;
	        planeStaticCollider.friction = 2;
	        planeStaticCollider.restitution = 0.3;
	    }
	    get Scene() { return this.scene; }
	    onSelectColorChange(index) {
	        this.levelDT.selectColor = this.levelDT.m_config.colors[index].color;
	        let This = this;
	        Laya.Texture2D.load(this.levelDT.m_config.colors[index].albdo, Laya.Laya.Handler.create(this, (texture) => {
	            let material = This.shuzi.getChildByName("node").getChildByName("brush").getChildByName("Mesh_Brush").meshRenderer.material;
	            if (material.albedoTexture)
	                material.albedoTexture.destroy();
	            material.albedoTexture = texture;
	            texture._pixels = null;
	        }));
	    }
	    onGameStateChange(state, is_hide) {
	        Laya.Laya.stage.offAll(Laya.Laya.Event.MOUSE_DOWN);
	        Laya.Laya.stage.offAll(Laya.Laya.Event.MOUSE_UP);
	        Laya.Laya.stage.offAll(Laya.Laya.Event.MOUSE_MOVE);
	        switch (state) {
	            case EGameStatue.HOME:
	                BoxControlScript.setSpeed(BoxControlScript.DEFAULT_SPEED);
	                return;
	            case EGameStatue.SHAPE:
	                BoxControlScript.setSpeed(BoxControlScript.DEFAULT_SPEED);
	                BoxControlScript.setStart(true);
	                if (is_hide)
	                    this.startLevel(LevelCtrl.getHideLevel());
	                else
	                    this.startLevel(LevelCtrl.GetLevel());
	                break;
	            case EGameStatue.FIRESHAPE:
	                BoxControlScript.setSpeed(0.5);
	                this.addTouchMoveListener();
	                this.startHongpei();
	                break;
	            case EGameStatue.POLISH:
	                BoxControlScript.setSpeed(BoxControlScript.DEFAULT_SPEED);
	                BoxControlScript.setStart(true);
	                this.startPaoguang();
	                break;
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
	        if (state != EGameStatue.ADDCOLOR) {
	            this.shuzi.active = false;
	        }
	        if (state != EGameStatue.POLISH) {
	            this.eraser.active = false;
	        }
	    }
	    onUpdate() {
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
	    startShow() {
	        `
			第一层贴图为配置中的几种颜色
			第二层贴图为配置中的贴图
		`;
	        this.eraser.active = false;
	        this.shuzi.active = false;
	        let levelDT = this.initLevelData(-1);
	        let level_config = levelDT.m_config;
	        levelDT.m_beizerAction.points = this.translatePoints(level_config.beizer);
	        levelDT.m_maxHeight = 4;
	        levelDT.m_minHeight = GameBaseConfig.SHAP_Min_HEIGHT;
	        levelDT.m_beizer = new Beizer(levelDT.m_beizerAction.points);
	        levelDT.dstMap = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH);
	        levelDT.dstNormalMap = new OneMap(NORMAL_WIDTH_HEIGHT, NORMAL_WIDTH_HEIGHT);
	        this.cylinder.meshRenderer.material.normalTexture = this.normalTexture;
	        let This = this;
	        this.cylinder.active = false;
	        Laya.Texture2D.load(level_config.texturePath[0], Laya.Laya.Handler.create(this, (texture) => {
	            let one_map1 = new OneMap(1024, 1024, texture.getPixels().slice(0));
	            This.levelDT.maps.push(one_map1);
	            this.updateAldbeMap(false);
	            this.cylinder.active = true;
	            GameUI.msgDipatcher.event(EMessageType.SHOW_LOAD_SUCC);
	        }));
	        this.updateCylinder();
	        TextureManager.Instance.loadTexture(e_Textures.E_POLISH1, (map) => {
	            This.normal1 = map.pixels;
	        });
	        TextureManager.Instance.loadTexture(e_Textures.E_POLISH2, (map) => {
	            This.normal2 = map.pixels;
	        });
	        TextureManager.Instance.loadTexture(e_Textures.E_POLISH3, (map) => {
	            This.albedo1 = map.pixels;
	        });
	        TextureManager.Instance.loadTexture(e_Textures.E_POLISH4, (map) => {
	            This.albedo2 = map.pixels;
	        });
	    }
	    translatePoints(beizerConfig) {
	        let ret = JSON.parse(beizerConfig);
	        let length = ret.length;
	        for (let index = 0; index < length; index++) {
	            let element = ret[index];
	            if (element.in != null) {
	                element.in.x /= 100;
	                element.in.y /= 100;
	            }
	            if (element.out != null) {
	                element.out.x /= 100;
	                element.out.y /= 100;
	            }
	            if (element.pos != null) {
	                element.pos.x /= 100;
	                element.pos.y /= 100;
	            }
	            if (index > 0) {
	                element.last = ret[index - 1];
	            }
	            if (index < length - 1) {
	                element.next = ret[index + 1];
	            }
	        }
	        return ret;
	    }
	    GetDefaultPoints() {
	        let ret = [];
	        let defaultX = GameBaseConfig.DEFAULT_SHAP_RADIUS;
	        let startY = 0;
	        let count = GameBaseConfig.DEFAULT_SHAP_CTRL_POINT;
	        let addY = GameBaseConfig.DEFAULT_SHAP_HEIGHT / count;
	        for (let index = 0; index < count; index++) {
	            let element = new BeizerPoint();
	            element.pos = new Laya.Vector2(defaultX, startY + index * addY);
	            if (index != 0) {
	                element.in = new Laya.Vector2(element.pos.x, element.pos.y - addY / 2);
	            }
	            if (index != count - 1) {
	                element.out = new Laya.Vector2(element.pos.x, element.pos.y + addY / 2);
	            }
	            ret.push(element);
	        }
	        let length = ret.length;
	        for (let index = 0; index < length; index++) {
	            let element = ret[index];
	            if (index > 0) {
	                element.last = ret[index - 1];
	            }
	            if (index < length - 1) {
	                element.next = ret[index + 1];
	            }
	        }
	        return ret;
	    }
	    startLevel(level) {
	        Laya.Laya.stage.offAllCaller(this);
	        let levelDT = this.initLevelData(level);
	        levelDT.m_beizerAction.points = this.GetDefaultPoints();
	        levelDT.m_maxHeight = 4;
	        levelDT.m_minHeight = GameBaseConfig.SHAP_Min_HEIGHT;
	        levelDT.m_beizer = new Beizer(levelDT.m_beizerAction.points);
	        levelDT.m_targetBeizer = new Beizer(this.translatePoints(this.levelDT.m_config.beizer));
	        this.updateCylinder();
	        let material = this.cylinder.meshRenderer.material;
	        material.albedoTexture = this.texture;
	        material.normalTexture = this.normalTexture;
	        let level_config = levelDT.m_config;
	        this.addShuoxingListener();
	        this.ray_plane.active = true;
	        levelDT.magicProgress = Beizer.getSimilarity(levelDT.m_beizer, levelDT.m_targetBeizer);
	        GameUI.msgDipatcher.event(EMessageType.PROGRESS_SHAP, levelDT.magicProgress);
	    }
	    startHongpei() {
	        this.addColliderShape();
	        this.ray_plane.active = false;
	        let color_map = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH, this.normal1.slice(0));
	        this.levelDT.normal_maps.push(color_map);
	        let color_map2 = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH, this.normal2.slice(0));
	        this.levelDT.normal_maps.push(color_map2);
	        color_map = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH, this.albedo1.slice(0));
	        this.levelDT.maps.push(color_map);
	        color_map2 = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH, this.albedo2.slice(0));
	        this.levelDT.maps.push(color_map2);
	        this.updateNormalMap();
	        this.updateAldbeMap();
	    }
	    startPaoguang() {
	        this.material.albedoColor = new Laya.Vector4(1, 1, 1, 1);
	        Laya.Laya.stage.offAllCaller(this);
	        Laya.Laya.stage.on(Laya.Laya.Event.MOUSE_UP, this, function (e) {
	            this.shuzi.transform.localPosition = Laya.Vector3._ZERO;
	            this.shuzi.transform.rotationEuler = Laya.Vector3._ZERO;
	            this.eraser.transform.localPosition = Laya.Vector3._ZERO;
	            this.eraser.transform.rotationEuler = Laya.Vector3._ZERO;
	        });
	        this.addColorListener();
	        this.ray_plane.active = false;
	        this.eraser.active = true;
	    }
	    startShangse() {
	        this.ray_plane.active = false;
	        this.shuzi.active = true;
	        this.eraser.active = false;
	        this.levelDT.maps = [];
	        let color_map = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH, this.albedo1.slice(0));
	        this.levelDT.maps.push(color_map);
	        let color_map2 = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH, new Uint8Array(ALDBE_WIDTH_HEIGTH * ALDBE_WIDTH_HEIGTH * 4));
	        this.levelDT.maps.push(color_map2);
	        color_map2.pixels.fill(0);
	        this.levelDT.dstMap = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH, new Uint8Array(ALDBE_WIDTH_HEIGTH * ALDBE_WIDTH_HEIGTH * 4));
	        this.onSelectColorChange(0);
	        this.addColorListener();
	        this.updateAldbeMap();
	    }
	    startTietu() {
	        this.shuzi.active = false;
	        this.eraser.active = false;
	        let map0 = this.levelDT.maps[0];
	        this.levelDT.maps = [];
	        this.levelDT.maps.push(this.levelDT.dstMap);
	        this.levelDT.dstMap = map0;
	    }
	    initLevelData(level) {
	        let level_config = GameConfig.levels[level];
	        let old_level_dt = this.levelDT;
	        this.levelDT = new LevelData();
	        let levelDT = this.levelDT;
	        levelDT.m_config = level_config;
	        if (old_level_dt) {
	            levelDT.m_verticesConstant = old_level_dt.m_verticesConstant;
	        }
	        else {
	            let vertices = this.cylinder.meshFilter.sharedMesh.getVertices();
	            levelDT.m_verticesConstant = new Float32Array(vertices);
	        }
	        levelDT.m_vertices = levelDT.m_verticesConstant.slice(0);
	        levelDT.dstMap = new OneMap(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH);
	        levelDT.dstNormalMap = new OneMap(NORMAL_WIDTH_HEIGHT, NORMAL_WIDTH_HEIGHT);
	        return levelDT;
	    }
	    updateCylinder() {
	        let levelDT = this.levelDT;
	        let beizer = levelDT.m_beizer;
	        SceneHelper.Instance.levelDT.m_config;
	        let const_slice = 800;
	        let beizer_user_point = beizer.getFirstPoint();
	        let distance = beizer_user_point.beizer.getLenth() / const_slice;
	        let y_values = [];
	        while (true) {
	            y_values.push(beizer_user_point.point.clone());
	            if (beizer_user_point.is_end)
	                break;
	            beizer_user_point.toNextPoint(distance);
	        }
	        levelDT.y_values = y_values;
	        let constant_vertices = levelDT.m_verticesConstant;
	        let vertices = constant_vertices.slice(0);
	        let radius = 1;
	        let height = 6;
	        let max = -99;
	        let min = 99;
	        let max_x = -99;
	        let min_x = 99;
	        for (let i = 0; i < constant_vertices.byteLength / 4; i += 12) {
	            let x_pos = i + 0;
	            let y_pos = i + 1;
	            let z_pos = i + 2;
	            let normal_x_pos = i + 3;
	            let normal_y_pos = i + 4;
	            let normal_z_pos = i + 5;
	            let tangent_x_pos = i + 8;
	            let tangent_z_pos = i + 10;
	            let x = constant_vertices[x_pos];
	            let y = constant_vertices[y_pos];
	            let z = constant_vertices[z_pos];
	            let beizer_index = Math.floor(const_slice / height * (y + 2.9));
	            if (beizer_index > const_slice)
	                beizer_index = const_slice;
	            if (beizer_index < 0)
	                beizer_index = 0;
	            if (max < y)
	                max = y;
	            if (min > y)
	                min = y;
	            if (max_x < x)
	                max_x = x;
	            if (min_x > x)
	                min_x = x;
	            let this_radis = y_values[beizer_index].x;
	            let this_height = y_values[beizer_index].y;
	            x = x * this_radis;
	            z = z * this_radis;
	            y = this_height;
	            vertices[x_pos] = x;
	            vertices[y_pos] = y;
	            vertices[z_pos] = z;
	        }
	        this.cylinder.meshFilter.sharedMesh.setVertices(vertices.buffer);
	        this.cylinder.meshFilter.sharedMesh.calculateBounds();
	    }
	    addColliderShape() {
	        let collider_shap = new Laya.MeshColliderShape();
	        collider_shap.mesh = this.cylinder.meshFilter.sharedMesh.clone();
	        var planeStaticCollider = this.cylinder.getComponent(Laya.PhysicsCollider);
	        if (!planeStaticCollider) {
	            planeStaticCollider = this.cylinder.addComponent(Laya.PhysicsCollider);
	        }
	        planeStaticCollider.colliderShape = collider_shap;
	    }
	    updateAldbeMap(is_mohu = true) {
	        let dst_map = this.levelDT.dstMap;
	        dst_map.pixels.fill(255);
	        for (let i = 0; i < this.levelDT.maps.length; i++) {
	            let one_map = this.levelDT.maps[i];
	            Helper.blendTexture(dst_map.width, dst_map.height, dst_map.pixels, one_map.width, one_map.height, one_map.pixels, 0);
	        }
	        if (is_mohu)
	            stackBlurCanvasRGBA(dst_map.width, dst_map.height, dst_map.pixels, 5);
	        this.updateAldbeMapEx();
	    }
	    updateAldbeMapEx() {
	        if (this.tmp_texture) {
	            this.tmp_texture.destroy();
	        }
	        this.tmp_texture = new Laya.Texture2D(ALDBE_WIDTH_HEIGTH, ALDBE_WIDTH_HEIGTH, Laya.TextureFormat.R8G8B8A8, false);
	        let dst_map = this.levelDT.dstMap;
	        this.tmp_texture.setPixels(dst_map.pixels);
	        let material = this.cylinder.meshRenderer.material;
	        material.albedoTexture = this.tmp_texture;
	    }
	    updateNormalMap() {
	        let dst_map = this.levelDT.dstNormalMap;
	        dst_map.pixels.fill(255);
	        for (let i = 0; i < this.levelDT.maps.length; i++) {
	            let one_map = this.levelDT.maps[i];
	            Helper.blendTexture(dst_map.width, dst_map.height, dst_map.pixels, one_map.width, one_map.height, one_map.pixels, 0);
	        }
	        this.updateNormalMapEx();
	    }
	    updateNormalMapEx() {
	        if (this.tmp_normal_texture) {
	            this.tmp_normal_texture.destroy();
	        }
	        this.tmp_normal_texture = new Laya.Texture2D(NORMAL_WIDTH_HEIGHT, NORMAL_WIDTH_HEIGHT, Laya.TextureFormat.R8G8B8A8, false);
	        let dst_map = this.levelDT.dstNormalMap;
	        this.tmp_normal_texture.setPixels(dst_map.pixels);
	        let material = this.cylinder.meshRenderer.material;
	        material.normalTexture = this.tmp_normal_texture;
	    }
	    addShuoxingListener() {
	        this.material.albedoColor = GameBaseConfig.SHAP_ALBEDOCOLOR;
	        Laya.Laya.stage.offAllCaller(this);
	        let This = this;
	        let levelDt = this.levelDT;
	        Laya.Laya.stage.on(Laya.Laya.Event.MOUSE_DOWN, this, function (e) {
	            levelDt.m_mouseDownX = Laya.Laya.stage.mouseX;
	            levelDt.m_mouseDownY = Laya.Laya.stage.mouseY;
	            levelDt.m_lastX = Laya.Laya.stage.mouseX;
	            levelDt.m_lastY = Laya.Laya.stage.mouseY;
	            levelDt.m_moveToN = 0;
	            levelDt.m_moveDistance = 0;
	            let hit = this.hit;
	            let ray = this.ray;
	            this.camera.viewportPointToRay(new Laya.Vector2(Laya.Laya.stage.mouseX, Laya.Laya.stage.mouseY), ray);
	            if (this.scene.physicsSimulation.rayCast(ray, hit)) {
	                let hit_point = hit.point;
	                levelDt.m_RayY = hit_point.y;
	                let nearest = null;
	                let distance = 0;
	                levelDt.m_beizerAction.points.forEach(element => {
	                    let this_distance = Math.abs(element.pos.y - levelDt.m_RayY);
	                    if (!nearest || this_distance < distance) {
	                        nearest = element;
	                        distance = this_distance;
	                    }
	                });
	                levelDt.m_nearestBeizerPoint = nearest;
	            }
	        });
	        Laya.Laya.stage.on(Laya.Laya.Event.MOUSE_UP, this, function (e) {
	            levelDt.m_nearestBeizerPoint = null;
	        });
	        Laya.Laya.stage.on(Laya.Laya.Event.MOUSE_MOVE, this, function (e) {
	            if (!levelDt.m_nearestBeizerPoint)
	                return;
	            if (levelDt.m_moveToN == 0) {
	                if (Laya.Vector2.scalarLength(new Laya.Vector2(levelDt.m_lastX - Laya.Laya.stage.mouseX, levelDt.m_lastY - Laya.Laya.stage.mouseY)) < 10) {
	                    return;
	                }
	                if (Math.abs(levelDt.m_lastX - Laya.Laya.stage.mouseX) * 2 > Math.abs(levelDt.m_lastY - Laya.Laya.stage.mouseY)) {
	                    levelDt.m_moveToN = 1;
	                }
	                else {
	                    levelDt.m_moveToN = 2;
	                }
	            }
	            let move_distance = 0;
	            if (levelDt.m_moveToN == 1) {
	                let direction = levelDt.m_mouseDownX > Laya.Laya.stage.width / 2 ? 1 : -1;
	                let scaleX = 0.02;
	                let lastX = levelDt.m_lastX;
	                let thisX = Laya.Laya.stage.mouseX;
	                move_distance = lastX > thisX ? -scaleX : scaleX;
	                if ((Math.abs(levelDt.m_nearestBeizerPoint.pos.x) < GameBaseConfig.shapMinX && direction * move_distance < 0)
	                    || (Math.abs(levelDt.m_nearestBeizerPoint.pos.x) > GameBaseConfig.shapMaxX) && direction * move_distance > 0)
	                    return;
	                levelDt.m_beizerAction.moveToX(levelDt.m_nearestBeizerPoint, direction * move_distance * GameBaseConfig.shapScaleX);
	                levelDt.m_moveDistance = levelDt.m_moveDistance + move_distance;
	            }
	            else {
	                let scaleY = 0.02;
	                let lastY = levelDt.m_lastY;
	                let thisY = Laya.Laya.stage.mouseY;
	                move_distance = lastY > thisY ? scaleY : -scaleY;
	                if ((levelDt.m_nearestBeizerPoint.pos.y < GameBaseConfig.shapMinY && move_distance < 0)
	                    || (levelDt.m_nearestBeizerPoint.pos.y > GameBaseConfig.shapMaxY && move_distance > 0))
	                    return;
	                levelDt.m_beizerAction.moveToY(move_distance * GameBaseConfig.shapScaleY, levelDt.m_minHeight, levelDt.m_maxHeight);
	                levelDt.m_moveDistance = levelDt.m_moveDistance + move_distance;
	            }
	            levelDt.m_lastX = Laya.Laya.stage.mouseX;
	            levelDt.m_lastY = Laya.Laya.stage.mouseY;
	            levelDt.m_beizer = new Beizer(levelDt.m_beizerAction.points);
	            This.updateCylinder();
	            levelDt.magicProgress = Beizer.getSimilarity(levelDt.m_beizer, levelDt.m_targetBeizer);
	            GameUI.msgDipatcher.event(EMessageType.PROGRESS_SHAP, levelDt.magicProgress);
	        });
	    }
	    addColorListener() {
	        let This = this;
	        let levelDt = this.levelDT;
	        levelDt.isTouch = false;
	        Laya.Laya.stage.on(Laya.Laya.Event.MOUSE_DOWN, this, function (e) {
	            switch (levelDt.state) {
	                case EGameStatue.POLISH:
	                    MusicCtrl.instance.PlayPolish();
	                    break;
	                case EGameStatue.ADDCOLOR:
	                    MusicCtrl.instance.PlayAddColor();
	                    break;
	            }
	            levelDt.isTouch = true;
	        });
	        Laya.Laya.stage.on(Laya.Laya.Event.MOUSE_UP, this, function (e) {
	            levelDt.isTouch = false;
	            this.shuzi.transform.localPosition = Laya.Vector3._ZERO;
	            this.shuzi.transform.rotationEuler = Laya.Vector3._ZERO;
	            this.eraser.transform.localPosition = Laya.Vector3._ZERO;
	            this.eraser.transform.rotationEuler = Laya.Vector3._ZERO;
	            switch (levelDt.state) {
	                case EGameStatue.POLISH:
	                    MusicCtrl.instance.stopPolish();
	                    break;
	                case EGameStatue.ADDCOLOR:
	                    MusicCtrl.instance.stopAddColor();
	                    break;
	            }
	        });
	        Laya.Laya.stage.on(Laya.Laya.Event.MOUSE_MOVE, this, function (e) {
	        });
	    }
	    addTouchMoveListener() {
	        let This = this;
	        let levelDt = this.levelDT;
	        levelDt.isTouch = false;
	        Laya.Laya.stage.on(Laya.Laya.Event.MOUSE_DOWN, this, function (e) {
	            levelDt.isTouch = true;
	            BoxControlScript.setStart(false);
	            levelDt.m_lastX = Laya.Laya.stage.mouseX;
	        });
	        Laya.Laya.stage.on(Laya.Laya.Event.MOUSE_UP, this, function (e) {
	            levelDt.isTouch = false;
	            BoxControlScript.setStart(true);
	        });
	        Laya.Laya.stage.on(Laya.Laya.Event.MOUSE_MOVE, this, function (e) {
	            let x = Laya.Laya.stage.mouseX;
	            BoxControlScript.rotate(x - levelDt.m_lastX);
	            levelDt.m_lastX = Laya.Laya.stage.mouseX;
	        });
	    }
	    checkRay() {
	        let hit = this.hit;
	        let ray = this.ray;
	        let mouseVector = this.mouseVector;
	        mouseVector.x = Laya.Laya.stage.mouseX;
	        mouseVector.y = Laya.Laya.stage.mouseY - 30;
	        this.camera.viewportPointToRay(mouseVector, ray);
	        if (this.scene.physicsSimulation.rayCast(ray, hit, 10000)) {
	            return hit;
	        }
	        return null;
	    }
	    onSelectTietuChange(index) {
	        let This = this;
	        let tietu_src = this.levelDT.m_config.texturePath[index];
	        Laya.Texture2D.load(tietu_src, Laya.Laya.Handler.create(this, (texture) => {
	            if (!texture) {
	                console.log("加载贴图error", index, tietu_src);
	                return;
	            }
	            let one_map1 = new OneMap(texture.width, texture.height, texture.getPixels().slice(0));
	            This.levelDT.maps[1] = one_map1;
	            let dst_map = this.levelDT.dstMap;
	            dst_map.pixels = this.levelDT.maps[0].pixels.slice(0);
	            let task = new MergeTask(dst_map, This.levelDT.maps, () => {
	                This.updateAldbeMapEx();
	                BoxControlScript.SetTask(null);
	            });
	            BoxControlScript.SetTask(task);
	            This.levelDT.tietuProgress = 1;
	        }));
	    }
	    setHongpeiScore(score) {
	        this.levelDT.hongpeiProgress = score;
	    }
	    getTotalScore() {
	        let ret = 0;
	        ret += this.levelDT.magicProgress * GameBaseConfig.SCORE_SHUOXIN;
	        ret += this.levelDT.hongpeiProgress * GameBaseConfig.SCORE_HONGPEI / 100;
	        ret += this.levelDT.paoguangProgresss * GameBaseConfig.SCORE_PAOGUANG / NORMAL_WIDTH_HEIGHT / NORMAL_WIDTH_HEIGHT;
	        if (!this.levelDT.m_config.is_hide) {
	            ret += GameBaseConfig.SCORE_SHANGSE;
	            ret += this.levelDT.tietuProgress * GameBaseConfig.SCORE_TIETU;
	        }
	        else {
	            ret += this.levelDT.addColorProgress * GameBaseConfig.SCORE_SHANGSE / ALDBE_WIDTH_HEIGTH / ALDBE_WIDTH_HEIGTH;
	            ret += GameBaseConfig.SCORE_TIETU;
	        }
	        return Math.ceil(ret);
	    }
	    CheckMousePosition(is_normal = false) {
	        if (!this.levelDT.isTouch) {
	            this.erase_effect.active = false;
	            return;
	        }
	        let hit = this.checkRay();
	        if (!hit) {
	            this.erase_effect.active = false;
	            return;
	        }
	        let hit_point = hit.point;
	        let y_value = hit_point.y;
	        let y_values = this.levelDT.y_values;
	        let index;
	        for (let i = 1; i < y_values.length; i++) {
	            if (y_values[i].y >= y_value && y_values[i - 1].y <= y_value) {
	                index = i;
	                break;
	            }
	        }
	        if (!index)
	            return;
	        if (!y_values[index])
	            return;
	        let v = 1 - index / y_values.length;
	        let direct = new Laya.Vector2(y_values[index].x - y_values[index - 1].x, y_values[index].y - y_values[index - 1].y);
	        let angle = 90 - Helper.calcAngleByVector(direct.x, direct.y);
	        this.cylinder.transform.worldMatrix.invert(this.invertMatrix);
	        Laya.Vector3.transformCoordinate(hit.point, this.invertMatrix, this.localPosition);
	        let angel = (90 + Helper.calcAngleByVector(this.localPosition.x, this.localPosition.z)) % 360;
	        let u = 1 - angel / 360;
	        let map_x = Math.floor(is_normal ? u * NORMAL_WIDTH_HEIGHT : u * ALDBE_WIDTH_HEIGTH);
	        let map_y = Math.floor(is_normal ? v * NORMAL_WIDTH_HEIGHT : v * ALDBE_WIDTH_HEIGTH);
	        if (!is_normal) {
	            this.shuzi.transform.position = new Laya.Vector3(hit_point.x, hit_point.y, hit_point.z);
	            this.shuzi.transform.rotationEuler = new Laya.Vector3(0, 180 - Helper.calcAngleByVector(hit_point.x, hit_point.z), angle);
	        }
	        else {
	            this.eraser.transform.position = new Laya.Vector3(hit_point.x, hit_point.y, hit_point.z);
	            this.eraser.transform.rotationEuler = new Laya.Vector3(-15, 180 - Helper.calcAngleByVector(hit_point.x, hit_point.z), angle);
	            this.erase_effect.active = true;
	        }
	        return new Laya.Vector2(map_x, map_y);
	    }
	    onUpdateForColor() {
	        let vec2 = this.CheckMousePosition();
	        if (!vec2)
	            return;
	        let map_x = vec2.x;
	        let map_y = vec2.y;
	        let pixels_dst = this.levelDT.dstMap.pixels;
	        let pixels_0 = this.levelDT.maps[0].pixels;
	        let pixels_1 = this.levelDT.maps[1].pixels;
	        let levelDT = this.levelDT;
	        let radius = 20;
	        let color = this.levelDT.selectColor;
	        if (color == null)
	            return;
	        for (let x = -radius; x <= radius; x++) {
	            for (let y = -radius * 4; y <= radius * 4; y++) {
	                if (x * x + y * y < 16 * radius * radius) {
	                    let x_pos = map_x + x;
	                    let y_pos = map_y + y;
	                    if (y_pos >= 0 && y_pos < ALDBE_WIDTH_HEIGTH) {
	                        x_pos = (x_pos + ALDBE_WIDTH_HEIGTH) % ALDBE_WIDTH_HEIGTH;
	                        let index = y_pos * ALDBE_WIDTH_HEIGTH + x_pos;
	                        index *= 4;
	                        if (pixels_1[index + 3] <= 0) {
	                            levelDT.addColorProgress++;
	                        }
	                        let a = 255;
	                        let x_mohu = 19;
	                        let y_mohu = 50;
	                        if (radius - Math.abs(x) <= x_mohu) {
	                            a = 255 * (radius - Math.abs(x)) / x_mohu;
	                        }
	                        if (4 * radius - Math.abs(y) <= y_mohu) {
	                            let a_y = 255 * (4 * radius - Math.abs(y)) / y_mohu;
	                            if (a_y < a)
	                                a = a_y;
	                        }
	                        a = Math.ceil(a);
	                        if (a == 255) {
	                            pixels_1[index] = color.r;
	                            pixels_dst[index] = color.r;
	                            index++;
	                            pixels_1[index] = color.g;
	                            pixels_dst[index] = color.g;
	                            index++;
	                            pixels_1[index] = color.b;
	                            pixels_dst[index] = color.b;
	                            index++;
	                            pixels_1[index] = 255;
	                            pixels_dst[index] = 255;
	                        }
	                        else if (pixels_1[index + 3] == 255) {
	                            let old_perc = (255 - a) / 255;
	                            let new_Perc = 1 - old_perc;
	                            pixels_1[index] = Math.floor((pixels_1[index] * old_perc + new_Perc * color.r));
	                            pixels_dst[index] = pixels_1[index];
	                            index++;
	                            pixels_1[index] = Math.floor((pixels_1[index] * old_perc + new_Perc * color.g));
	                            pixels_dst[index] = pixels_1[index];
	                            index++;
	                            pixels_1[index] = Math.floor((pixels_1[index] * old_perc + new_Perc * color.b));
	                            pixels_dst[index] = pixels_1[index];
	                            index++;
	                        }
	                        else if (a > 0) {
	                            let b = pixels_1[index + 3];
	                            let old_perc = b / (a + b);
	                            let new_Perc = a / (a + b);
	                            pixels_1[index] = Math.floor((pixels_1[index] * old_perc + new_Perc * color.r));
	                            pixels_dst[index] = pixels_1[index];
	                            index++;
	                            pixels_1[index] = Math.floor((pixels_1[index] * old_perc + new_Perc * color.g));
	                            pixels_dst[index] = pixels_1[index];
	                            index++;
	                            pixels_1[index] = Math.floor((pixels_1[index] * old_perc + new_Perc * color.b));
	                            pixels_dst[index] = pixels_1[index];
	                            index++;
	                            pixels_1[index] = Math.floor((pixels_1[index] * old_perc + new_Perc * color.a));
	                            pixels_dst[index] = pixels_1[index];
	                            index++;
	                        }
	                    }
	                }
	            }
	        }
	        this.updateAldbeMapEx();
	        let progress = levelDT.addColorProgress / ALDBE_WIDTH_HEIGTH / ALDBE_WIDTH_HEIGTH;
	        GameUI.msgDipatcher.event(EMessageType.PROGRESS_ADDCOLOR, progress);
	    }
	    onUpdateForPaoguang() {
	        let vec2 = this.CheckMousePosition(true);
	        if (!vec2)
	            return;
	        let map_x = vec2.x;
	        let map_y = vec2.y;
	        let normal_pixels_dst = this.levelDT.dstNormalMap.pixels;
	        let normal_pixels_0 = this.levelDT.normal_maps[0].pixels;
	        let normal_pixels_1 = this.levelDT.normal_maps[1].pixels;
	        let pixels_dst = this.levelDT.dstMap.pixels;
	        let pixels_0 = this.levelDT.maps[0].pixels;
	        let pixels_1 = this.levelDT.maps[1].pixels;
	        let levelDT = this.levelDT;
	        let radius = 30;
	        for (let y = -4 * radius; y <= 4 * radius; y++) {
	            for (let x = -(radius - 5); x <= radius + 5; x++) {
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
	                        normal_pixels_1[index + 3] = 0;
	                        pixels_1[index + 3] = 0;
	                        normal_pixels_dst[index] = normal_pixels_0[index];
	                        pixels_dst[index] = pixels_0[index];
	                        index++;
	                        normal_pixels_dst[index] = normal_pixels_0[index];
	                        pixels_dst[index] = pixels_0[index];
	                        index++;
	                        normal_pixels_dst[index] = normal_pixels_0[index];
	                        pixels_dst[index] = pixels_0[index];
	                        index++;
	                    }
	                }
	            }
	        }
	        this.updateNormalMapEx();
	        this.updateAldbeMapEx();
	        let progress = levelDT.paoguangProgresss / NORMAL_WIDTH_HEIGHT / NORMAL_WIDTH_HEIGHT;
	        GameUI.msgDipatcher.event(EMessageType.PROGRESS_POLISH, progress);
	    }
	    getLevelConfig() {
	        return this.levelDT.m_config;
	    }
	    isHighLevel() {
	        return this.levelDT.m_config.is_hide;
	    }
	    SetBoxUp(showFloor, Pos, rotate = false) {
	        let floor = this.scene.getChildByName("root").getChildByName("floor");
	        floor.active = showFloor;
	        console.log(">>>>..set  box up ", Pos);
	        this.camera.transform.localPosition = Pos;
	        BoxControlScript.setStart(rotate);
	        Laya.Laya.stage.addChild(this.scene);
	    }
	    setStar(statue, star) {
	        this.starCache[statue] = star ? 1 : 0;
	    }
	    getStar() {
	        let keys = Object.keys(this.starCache);
	        let star = 0;
	        if (keys != null) {
	            keys.forEach(element => {
	                star += this.starCache[element];
	            });
	            return star;
	        }
	        else {
	            return 0;
	        }
	    }
	    resetStar() {
	        this.starCache = {};
	    }
	    setCameraSize(size) {
	        this.camera.orthographicVerticalSize = size * (Laya.Laya.stage.height / Laya.Laya.stage.width / (1560 / 720));
	        console.log(">>>当前 摄像机 size ", size);
	    }
	}
	SceneHelper.Instance = new SceneHelper();

	class GameUI extends ui.test.MainSceneUI {
	    constructor() {
	        super();
	        this.uiGameStart = null;
	        this.uiOpt = null;
	        this.uiAuction = null;
	        this.uiLightAnim = null;
	        this.uiresult = null;
	        this.uiExhibition = null;
	        this.curGameState = EGameStatue.NONE;
	        this.loadStartMeshFinish = false;
	        this.bPlayBgMusic = false;
	        this.curAuctionIndex = 0;
	        this.roleAni = new Laya.Animation();
	        this.roleAni.loadAtlas("res/effect/guochang.atlas", Laya.Laya.Handler.create(this, this.onLoaded));
	        Laya.Laya.stage.frameRate = "slow";
	        GameUI.msgDipatcher.on(EMessageType.CHANGESTATE, this, this.changeState);
	        GameUI.msgDipatcher.on(EMessageType.GOHOME, this, () => {
	            this.changeState({ status: EGameStatue.HOME });
	        });
	        GameUI.msgDipatcher.on(EMessageType.CHANGECOLOR, this, (index) => {
	            SceneHelper.Instance.onSelectColorChange(index);
	        });
	        GameUI.msgDipatcher.on(EMessageType.CHANGETEXTURE, this, (index) => {
	            SceneHelper.Instance.onSelectTietuChange(index);
	        });
	        GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, { status: EGameStatue.HOME });
	    }
	    onLoaded() {
	    }
	    changeState(params) {
	        let statue = params.status;
	        console.log(`changeState---------------- ${EGameStatue[this.curGameState]}  -> ${EGameStatue[statue]} ${params}`);
	        if (this.curGameState == statue)
	            return;
	        this.curGameState = statue;
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
	        if (statue == EGameStatue.SHAPE) {
	            SceneHelper.Instance.onGameStateChange(statue, params.highLevel);
	        }
	        else {
	            SceneHelper.Instance.onGameStateChange(statue);
	        }
	    }
	    OpenGamSartUI() {
	        let This = this;
	        if (SceneHelper.Instance.Scene == null && this.uiGameStart == null) {
	            Laya.Scene.load("test/UIGameStart.scene", Laya.Laya.Handler.create(this, (rScen) => {
	                Laya.Scene3D.load("res/u3d/LayaScene_gameScene/Conventional/gameScene.ls", Laya.Laya.Handler.create(this, (content) => {
	                    let scene = content;
	                    SceneHelper.Instance.Scene = scene;
	                    let ui = rScen;
	                    this.uiGameStart = ui;
	                    Laya.Laya.stage.addChild(rScen);
	                    this.setStartUI(this.uiGameStart);
	                    Laya.Stat.show();
	                    return;
	                }));
	            }));
	        }
	        else {
	            this.uiGameStart.visible = true;
	            this.setStartUI(this.uiGameStart);
	        }
	    }
	    setStartUI(ui) {
	        this.loadStartMeshFinish = false;
	        GameUI.msgDipatcher.on(EMessageType.SHOW_LOAD_SUCC, this, () => {
	            this.loadStartMeshFinish = true;
	        });
	        SceneHelper.Instance.startShow();
	        if (this.uiOpt != null) {
	            this.uiOpt.visible = false;
	        }
	        SceneHelper.Instance.SetBoxUp(false, GameBaseConfig.startUIRootPos, true);
	        SceneHelper.Instance.setCameraSize(GameBaseConfig.CAMERA_SIZE_STARTUI);
	        ui.btnAdvanced.visible = true;
	        ui.btnGamStart.offAll("click");
	        ui.btnGamStart.on("click", this, () => {
	            if (this.loadStartMeshFinish == false)
	                return;
	            console.log(">>>>.,EMessageType.CHANGESTATE) ");
	            if (this.bPlayBgMusic == false) {
	                MusicCtrl.instance.PlayBgMusic();
	                this.bPlayBgMusic = true;
	            }
	            GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, { status: EGameStatue.SHAPE, highLevel: false });
	            ui.visible = false;
	        });
	        ui.btnAdvanced.offAll("click");
	        ui.btnAdvanced.on("click", this, () => {
	            if (this.loadStartMeshFinish == false)
	                return;
	            console.log(">>>>.,EMessageType.CHANGESTATE) ");
	            if (this.bPlayBgMusic == false) {
	                MusicCtrl.instance.PlayBgMusic();
	                this.bPlayBgMusic = true;
	            }
	            GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, { status: EGameStatue.SHAPE, highLevel: true });
	            ui.visible = false;
	        });
	    }
	    GameStart() {
	        if (this.uiOpt == null) {
	            Laya.Scene.load("test/UIOptScene.scene", Laya.Laya.Handler.create(this, (rScen) => {
	                let ui = rScen;
	                GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, { status: this.curGameState });
	                SceneHelper.Instance.SetBoxUp(true, GameBaseConfig.normalRootPos, true);
	                SceneHelper.Instance.setCameraSize(GameBaseConfig.CAMERA_SIZE_SHAP);
	                Laya.Laya.stage.addChild(ui);
	                this.uiOpt = ui;
	                setTimeout(() => {
	                    ui.createLine();
	                }, 500);
	            }));
	        }
	        else {
	            this.uiOpt.visible = true;
	            this.uiOpt.reset();
	            SceneHelper.Instance.SetBoxUp(true, GameBaseConfig.normalRootPos, true);
	            SceneHelper.Instance.setCameraSize(GameBaseConfig.CAMERA_SIZE_SHAP);
	            Laya.Laya.stage.addChild(this.uiOpt);
	            setTimeout(() => {
	                this.uiOpt.createLine();
	            }, 500);
	        }
	    }
	    GameAution() {
	        if (this.uiAuction == null) {
	            Laya.Scene.load("test/UIAuction.scene", Laya.Laya.Handler.create(this, (rScen) => {
	                let ui = rScen;
	                this.uiAuction = ui;
	                Laya.Laya.stage.addChild(ui);
	                this.setAuction(this.uiAuction);
	            }));
	        }
	        else {
	            this.uiAuction.visible = true;
	            Laya.Laya.stage.addChild(this.uiAuction);
	            this.setAuction(this.uiAuction);
	        }
	    }
	    setAuction(ui) {
	        this.curAuctionIndex = 0;
	        this.uiExhibition.visible = false;
	        let randomMoney = [];
	        let max = 0;
	        for (let index = 0; index < 3; index++) {
	            let random = Math.floor(Math.random() * (GameBaseConfig.AuctionCoin_Max - GameBaseConfig.AuctionCoin_Min)) + GameBaseConfig.AuctionCoin_Min;
	            randomMoney.push(random);
	            max = random > max ? random : max;
	        }
	        let config = [{
	                title: "ui/sale_1.png",
	                money: `${randomMoney[0]}`,
	                maxMoney: `${max}`,
	                showNext: true,
	                showMax: false,
	            }, {
	                title: "ui/sale_2.png",
	                money: `${randomMoney[1]}`,
	                maxMoney: `${max}`,
	                showNext: true,
	                showMax: false,
	            }, {
	                title: "ui/sale_3.png",
	                money: `${randomMoney[2]}`,
	                maxMoney: `${max}`,
	                showNext: false,
	                showMax: true,
	            }];
	        let arrSaler = [];
	        arrSaler.push(ui.saler1);
	        arrSaler.push(ui.saler2);
	        arrSaler.push(ui.saler3);
	        let funcFresh = (index) => {
	            ui.maxMoney.text = config[index].maxMoney;
	            ui.money.text = config[index].money;
	            ui.title.skin = config[index].title;
	            ui.btnNext.visible = config[index].showNext;
	            ui.btnmaxMoney.visible = config[index].showMax;
	            for (let tmpIndex = 0; tmpIndex < arrSaler.length; tmpIndex++) {
	                const element = arrSaler[tmpIndex];
	                element.visible = (index == tmpIndex);
	            }
	        };
	        funcFresh(this.curAuctionIndex);
	        ui.btnsale.offAll("click");
	        ui.btnsale.on("click", this, () => {
	            this.auctionData = config[this.curAuctionIndex];
	            this.auctionData.getMoney = config[this.curAuctionIndex].money;
	            MusicCtrl.instance.PlaySound(MusicConfig.auction);
	            GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, { status: EGameStatue.Settlement });
	            ui.visible = false;
	        });
	        ui.btnmaxMoney.offAll("click");
	        ui.btnmaxMoney.on("click", this, () => {
	            this.auctionData = config[this.curAuctionIndex];
	            this.auctionData.getMoney = config[this.curAuctionIndex].maxMoney;
	            MusicCtrl.instance.PlaySound(MusicConfig.auction);
	            GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, { status: EGameStatue.Settlement });
	            ui.visible = false;
	        });
	        ui.btnNext.offAll("click");
	        ui.btnNext.on("click", this, () => {
	            this.curAuctionIndex = this.curAuctionIndex + 1;
	            funcFresh(this.curAuctionIndex);
	        });
	    }
	    GameResult() {
	        if (this.uiresult == null) {
	            Laya.Scene.load("test/resulet.scene", Laya.Laya.Handler.create(this, (rScen) => {
	                let ui = rScen;
	                this.uiresult = ui;
	                Laya.Laya.stage.addChild(ui);
	                this.setResultUI(this.uiresult);
	            }));
	        }
	        else {
	            this.uiresult.visible = true;
	            Laya.Laya.stage.addChild(this.uiresult);
	            this.setResultUI(this.uiresult);
	        }
	    }
	    setResultUI(ui) {
	        let config = {
	            score: SceneHelper.Instance.getTotalScore(),
	            coinget: this.auctionData.getMoney,
	            star: SceneHelper.Instance.getStar()
	        };
	        let scoreConfig = GameBaseConfig.resultConfig;
	        console.log(">>>> 结算 结果 ", config);
	        for (let index = 0; index < scoreConfig.length; index++) {
	            const element = scoreConfig[index];
	            if (config.score < element.value) {
	                console.log(`----->${ui.score}  ${config}`);
	                ui.score.text = "" + config.score;
	                ui.scoreType.skin = element.msg;
	                ui.getMoney.text = "" + config.coinget;
	                break;
	            }
	        }
	        ui.star1.visible = config.star >= 1;
	        ui.star2.visible = config.star >= 2;
	        ui.star3.visible = config.star >= 3;
	        ui.btnget.offAll("click");
	        ui.btnget.on("click", this, () => {
	            GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, { status: EGameStatue.HOME });
	            ui.visible = false;
	            MusicCtrl.instance.PlaySound(MusicConfig.getCoin);
	        });
	        ui.btndoubleGet.offAll("click");
	        ui.btndoubleGet.on("click", this, () => {
	            MusicCtrl.instance.PlaySound(MusicConfig.getCoin);
	            SceneHelper.Instance.SetBoxUp(false, GameBaseConfig.startUIRootPos, false);
	        });
	        SceneHelper.Instance.SetBoxUp(false, GameBaseConfig.resultUIRootPos, false);
	        SceneHelper.Instance.setCameraSize(GameBaseConfig.CAMERA_SIZE_RESULT);
	    }
	    LightingAnim() {
	        if (this.uiLightAnim == null) {
	            Laya.Scene.load("test/lightAnimScene.scene", Laya.Laya.Handler.create(this, (sprite) => {
	                console.log(">>>>>>", sprite);
	                let lightAnimScene = sprite;
	                this.uiLightAnim = lightAnimScene;
	                Laya.Laya.stage.addChild(sprite);
	                lightAnimScene.visible = false;
	                this.PlayGuoChangAnim();
	            }));
	        }
	        else {
	            Laya.Laya.stage.addChild(this.uiLightAnim);
	            this.uiLightAnim.initUI();
	            this.PlayGuoChangAnim();
	        }
	    }
	    PlayGuoChangAnim() {
	        Laya.Laya.stage.addChild(this.roleAni);
	        this.roleAni.scale(Laya.Laya.stage.width / 256, Laya.Laya.stage.height / 512);
	        this.roleAni.play(0, false);
	        let timeTmp = setTimeout(() => {
	            this.uiLightAnim.visible = true;
	        }, 0.8);
	    }
	    Exhibition() {
	        if (this.uiExhibition == null) {
	            Laya.Scene.load("test/UIExhibition.scene", Laya.Laya.Handler.create(this, (sprite) => {
	                console.log(">>>>>>", sprite);
	                let uiExhibition = sprite;
	                this.uiExhibition = uiExhibition;
	                this.uiExhibition.btnsale.offAll("click");
	                this.uiExhibition.btnsale.on("click", this, () => {
	                    GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, { status: EGameStatue.Auction });
	                });
	                this.InitExhibition();
	            }));
	        }
	        else {
	            this.InitExhibition();
	        }
	    }
	    InitExhibition() {
	        Laya.Laya.stage.addChild(this.uiExhibition);
	        this.uiExhibition.visible = true;
	        SceneHelper.Instance.SetBoxUp(false, GameBaseConfig.exhibitionUIPos, true);
	        SceneHelper.Instance.setCameraSize(GameBaseConfig.CAMERA_SIZE_EXHIBITION);
	    }
	}
	GameUI.msgDipatcher = new Laya.EventDispatcher();

	class LinghtANimSceneUI extends ui.test.lightAnimSceneUI {
	    constructor() {
	        super();
	        this.curOpenFireIndex = -1;
	        this.minRotate = 0;
	        this.maxRotate = 0;
	        this.checkTime = 0;
	        this.loopTimer = -1;
	        this.btnChulu.on("click", this, () => {
	            clearInterval(this.loopTimer);
	            GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, { status: EGameStatue.POLISH });
	            SceneHelper.Instance.SetBoxUp(true, GameBaseConfig.normalRootPos, true);
	            SceneHelper.Instance.setCameraSize(GameBaseConfig.CAMERA_SIZE_SHAP);
	            this.visible = false;
	            SceneHelper.Instance.setHongpeiScore((this.curOpenFireIndex + 1) * 25);
	            if (this.curOpenFireIndex >= 3) {
	                SceneHelper.Instance.setStar(EGameStatue.FIRESHAPE, true);
	            }
	        });
	        this.btnChuLuFourStar.on("click", this, () => {
	            clearInterval(this.loopTimer);
	            GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, { status: EGameStatue.POLISH });
	            SceneHelper.Instance.SetBoxUp(true, GameBaseConfig.normalRootPos, true);
	            SceneHelper.Instance.setCameraSize(GameBaseConfig.CAMERA_SIZE_SHAP);
	            this.visible = false;
	            SceneHelper.Instance.setHongpeiScore((this.curOpenFireIndex + 1) * 25);
	            if (this.curOpenFireIndex >= 3) {
	                SceneHelper.Instance.setStar(EGameStatue.FIRESHAPE, true);
	            }
	        });
	        this.btnHeat.on("click", this, () => {
	            if (this.checkTime < Laya.Timer.gSysTimer.currTimer) {
	                let fireCount = this.fireArr.length;
	                let nodepointRotate = this.nodepointer.rotation + 90;
	                if (nodepointRotate >= this.minRotate && nodepointRotate <= this.maxRotate) {
	                    console.log(">>> 有效", nodepointRotate, this.minRotate, this.maxRotate);
	                    if (this.curOpenFireIndex < fireCount - 1) {
	                        this.curOpenFireIndex++;
	                        this.fireArr[this.curOpenFireIndex].visible = true;
	                    }
	                    if (this.curOpenFireIndex >= fireCount - 1) {
	                        this.btnHeat.visible = false;
	                        this.btnChulu.visible = false;
	                        this.btnChuLuFourStar.visible = true;
	                    }
	                    MusicCtrl.instance.PlaySound(MusicConfig.FireSucceed);
	                }
	                else {
	                    console.log(">>> 无效", nodepointRotate, this.minRotate, this.maxRotate);
	                    if (this.curOpenFireIndex >= 0) {
	                        this.fireArr[this.curOpenFireIndex].visible = false;
	                        this.curOpenFireIndex--;
	                    }
	                    MusicCtrl.instance.PlaySound(MusicConfig.FireNoSucceed);
	                }
	                this.starNode.visible = (this.curOpenFireIndex >= fireCount - 1);
	                this.freshUI();
	                this.checkTime = Laya.Timer.gSysTimer.currTimer + GameBaseConfig.fireBtnCoolingTime;
	                this.randomRotate();
	            }
	        });
	        this.fireArr = new Array();
	        this.fireArr.push(this.fire1);
	        this.fireArr.push(this.fire2);
	        this.fireArr.push(this.fire3);
	        this.fireArr.push(this.fire4);
	        this.initUI();
	    }
	    initUI() {
	        this.curOpenFireIndex = -1;
	        this.minRotate = 0;
	        this.maxRotate = 0;
	        this.fireArr.forEach(element => {
	            element.visible = false;
	        });
	        this.starNode.visible = false;
	        this.btnHeat.visible = true;
	        this.btnChuLuFourStar.visible = false;
	        this.center.visible = true;
	        this.startRotate();
	        this.randomRotate();
	        this.freshUI();
	    }
	    freshUI() {
	        this.btnChu_anse.visible = (this.curOpenFireIndex + 1 < GameBaseConfig.fireFinishMinCount);
	        this.btnChulu.visible = (this.curOpenFireIndex + 1 == GameBaseConfig.fireFinishMinCount);
	        this.btnChuLuFourStar.visible = (this.curOpenFireIndex == 3);
	        if (this.curOpenFireIndex == 3) {
	            this.center.visible = false;
	            SceneHelper.Instance.SetBoxUp(true, GameBaseConfig.fireShapUIRootPos, true);
	            SceneHelper.Instance.setCameraSize(GameBaseConfig.CAMERA_SIZE_FIRESHAP);
	        }
	    }
	    randomRotate() {
	        let rotate = Math.floor(Math.random() * (180 - GameBaseConfig.fireGoodRatate));
	        this.minRotate = rotate;
	        this.maxRotate = rotate + GameBaseConfig.fireGoodRatate;
	        this.greenMask.rotation = GameBaseConfig.fireGoodRatate - 180;
	        this.greenNode.rotation = rotate;
	        console.log(">>> 随机教的", this.minRotate, this.maxRotate);
	    }
	    startRotate() {
	        let timeinterval = 50;
	        let left = -90;
	        let right = 90;
	        let speed = 1;
	        let rotate = 0;
	        clearInterval(this.loopTimer);
	        this.loopTimer = setInterval(() => {
	            if (rotate >= right) {
	                speed = -1;
	            }
	            else if (rotate <= left) {
	                speed = 1;
	            }
	            rotate += speed * GameBaseConfig.firePointSpeed;
	            this.nodepointer.rotation = rotate;
	            {
	            }
	        }, timeinterval);
	    }
	    stopRotate() {
	        clearInterval(this.loopTimer);
	    }
	}

	class ClipFrame {
	    constructor(clip) {
	        this.frames = null;
	        this.frame_Loop = true;
	        this._index = 0;
	        this._toIndex = 0;
	        this.img = clip;
	        this.roleAni = new Laya.Animation();
	        this.roleAni.loadAtlas("res/effect/guochang.atlas", Laya.Laya.Handler.create(this, this.onLoaded));
	    }
	    onLoaded() {
	        console.log(`onLoaded---------------- `);
	        this.frames = this.roleAni.frames;
	    }
	    playFrame(from, to, interval, rloop = true) {
	        this._index = from;
	        this._toIndex = to;
	        this._index++;
	        this.frame_Loop = rloop;
	        Laya.ILaya.timer.loop(interval, this, this._framLoop);
	    }
	    _framLoop() {
	        console.log(">>>> _framLoop ");
	        if (this.frames != null && this.img._visible) {
	            this._index++;
	            if (this.frame_Loop == false) {
	                if (this._index > this._toIndex)
	                    Laya.ILaya.timer.clear(this, this._framLoop);
	                else {
	                    this.img.texture = this.frames[this._index]._one.texture.url;
	                }
	            }
	            else if (this._index > this._toIndex) {
	                this._index = 0;
	            }
	            this.img.texture = this.frames[this._index]._one.texture.url;
	        }
	    }
	}

	class ListTest extends ui.test.RankListUI {
	    constructor() {
	        super();
	        let dataSource = [];
	        for (let i = 0; i < 20; i++) {
	            let data = null;
	            data = {
	                msgTxt: { text: ">>" + i },
	            };
	            dataSource.push(data);
	        }
	        this.mlist.array = dataSource;
	        this.mlist.vScrollBarSkin = '';
	        let clipFrame = new ClipFrame(this.testClip);
	        clipFrame.playFrame(0, 7, 100, true);
	    }
	}

	class UIOptScene extends ui.test.UIOptSceneUI {
	    constructor() {
	        super();
	        this.msgConfig = { [EGameStatue.SHAPE]: ["让图框中充满陶泥", "尽快完成泥胎的制作"],
	            [EGameStatue.ADDCOLOR]: ["给你的作品上颜色吧", "尽快完成瓷器的上色"],
	            [EGameStatue.ADDTEXTURE]: ["选择漂亮的花纹", "拍卖你的作品吧"]
	        };
	        this.isScaleStarAnim = false;
	        this.isShapBtnAnim = false;
	        this.isShapArrowAnim = false;
	        this.lines = [];
	        this.colors = [];
	        this.colorConfig = [];
	        this.arrColorsItem = {};
	        this.resetAddTexture = false;
	        this.textureConfig = [];
	        this.arrTextureItem = {};
	        GameUI.msgDipatcher.on(EMessageType.CHANGESTATE, this, this.changeState);
	        GameUI.msgDipatcher.on(EMessageType.PROGRESS_ADDCOLOR, this, this.progressAddColor);
	        GameUI.msgDipatcher.on(EMessageType.PROGRESS_POLISH, this, this.progressPolish);
	        GameUI.msgDipatcher.on(EMessageType.PROGRESS_SHAP, this, this.progressShap);
	        GameUI.msgDipatcher.on(EMessageType.ADDTEXTURE_FISNISH, null, this.addTexutreFinish);
	        this.btnGoHome.on("click", this, () => {
	            console.log(">>>>  go home");
	            GameUI.msgDipatcher.event(EMessageType.GOHOME);
	            this.visible = false;
	        });
	        this.btnCuihuo.on("click", this, () => {
	            GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, { status: EGameStatue.FIRESHAPE });
	        });
	        this.btnAuction.on("click", this, () => {
	            console.log(">>>> 进入拍卖");
	            GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, { status: EGameStatue.EXHIBITION });
	        });
	        this.btnPolishFinish.on("click", this, () => {
	            this.btnPolishFinish.visible = false;
	            GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, { status: EGameStatue.ADDTEXTURE });
	        });
	        this.btnPlishFinishAdvance.on("click", this, () => {
	            this.btnPolishAddColor.visible = true;
	            this.btnPolishAuction.visible = true;
	            this.btnPlishFinishAdvance.visible = false;
	        });
	        this.btnaddColorNext.on("click", this, () => {
	            console.log(">>>> 进入印花");
	            GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, { status: EGameStatue.ADDTEXTURE });
	        });
	        this.btnPolishAddColor.on("click", this, () => {
	            console.log(">>>> 进入上色");
	            GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, { status: EGameStatue.ADDCOLOR });
	        });
	        this.btnPolishAuction.on("click", this, () => {
	            console.log(">>>> 进入拍卖");
	            GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, { status: EGameStatue.EXHIBITION });
	        });
	        this.reset();
	    }
	    reset() {
	        console.log(">>>>>  重置 ");
	        this.btnCuihuo.visible = false;
	        this.btnPolishFinish.visible = false;
	        this.btnPlishFinishAdvance.visible = false;
	        this.btnPolishAddColor.visible = false;
	        this.btnPolishAuction.visible = false;
	        this.addTextureArrow.visible = false;
	        this.isShapBtnAnim = false;
	        this.isScaleStarAnim = false;
	        this.scaleAnim.stop();
	        this.btnCuihuo.scale(1, 1);
	        this.resetProgress();
	        this.nodearrow.visible = false;
	    }
	    progressShap(progress) {
	        let config = GameBaseConfig.shapLevelConfig;
	        let config0 = config[0];
	        let config1 = config[1];
	        let config2 = config[2];
	        let lvseProgress = progress <= config0 ? progress : config0;
	        let fenseProgress = progress <= config1 ? progress : config1;
	        let ziseProgress = progress <= config2 ? progress : config2;
	        let maskLength = 420;
	        this.maskLvse.width = lvseProgress * maskLength;
	        this.maskFen.width = fenseProgress * maskLength;
	        this.maskZise.width = ziseProgress * maskLength;
	        if (progress >= 1) {
	            this.nodeStar.visible = true;
	        }
	        if (progress >= config0) {
	            this.btnCuihuo.visible = true;
	        }
	        this.nodeStar.visible = progress > config1;
	        if (progress > config1) {
	            if (this.isScaleStarAnim == false) {
	                this.isScaleStarAnim = true;
	                this.scaleStar.play();
	            }
	        }
	        else {
	            if (this.isScaleStarAnim == true) {
	                this.scaleStar.stop();
	                this.nodeStar.scale(1, 1);
	            }
	            this.isScaleStarAnim = false;
	        }
	        SceneHelper.Instance.setStar(EGameStatue.SHAPE, progress > config1);
	        if (progress > config0) {
	            if (this.isShapBtnAnim == false) {
	                this.isShapBtnAnim = true;
	                this.scaleAnim.play();
	            }
	        }
	        else {
	            if (this.isShapBtnAnim == true) {
	                this.isShapBtnAnim = false;
	                this.scaleAnim.stop();
	                this.btnCuihuo.scale(1, 1);
	            }
	        }
	        this.nodearrow.visible = progress > config1;
	        if (progress > config1) {
	            if (this.isShapArrowAnim == false) {
	                this.isShapArrowAnim = true;
	                this.arrowAnim.play();
	            }
	        }
	        else {
	            if (this.isShapArrowAnim == true) {
	                this.isShapArrowAnim = false;
	                this.arrowAnim.stop();
	            }
	        }
	    }
	    progressAddColor(progress) {
	        return;
	    }
	    progressPolish(progress) {
	        let config = GameBaseConfig.polishLevelConfig;
	        let config0 = config[0];
	        let config1 = config[1];
	        let config2 = config[2];
	        let lvseProgress = progress <= config0 ? progress : config0;
	        let fenseProgress = progress <= config1 ? progress : config1;
	        let ziseProgress = progress <= config2 ? progress : config2;
	        let maskLength = 420;
	        this.maskLvse.width = lvseProgress * maskLength;
	        this.maskFen.width = fenseProgress * maskLength;
	        this.maskZise.width = ziseProgress * maskLength;
	        if (progress > config0) {
	            if (SceneHelper.Instance.isHighLevel()) {
	                if (this.btnPolishAddColor.visible == false) {
	                    this.btnPlishFinishAdvance.visible = true;
	                }
	            }
	            else {
	                this.btnPolishFinish.visible = true;
	            }
	        }
	        this.nodeStar.visible = progress > config1;
	        if (progress > config1) {
	            if (this.isScaleStarAnim == false) {
	                this.isScaleStarAnim = true;
	                this.scaleStar.play();
	            }
	        }
	        else {
	            if (this.isScaleStarAnim == true) {
	                this.scaleStar.stop();
	                this.nodeStar.scale(1, 1);
	            }
	            this.isScaleStarAnim = false;
	        }
	        SceneHelper.Instance.setStar(EGameStatue.POLISH, progress > config1);
	    }
	    resetProgress() {
	        console.log(">>>>>>   清理  清理 ");
	        this.maskFen.width = 0.01;
	        this.maskLvse.width = 0.01;
	        this.maskZise.width = 0.01;
	        this.imgGood.visible = false;
	        this.imgPerfect.visible = false;
	    }
	    changeState(params) {
	        let statue = params.status;
	        this.btnGoHome.visible = statue == EGameStatue.ADDCOLOR || statue == EGameStatue.ADDTEXTURE || statue == EGameStatue.SHAPE;
	        let haveProgress = statue == EGameStatue.POLISH || statue == EGameStatue.SHAPE;
	        this.progressBarParent.visible = haveProgress;
	        if (haveProgress == true) {
	            setTimeout(() => { }, 100);
	        }
	        if (statue == EGameStatue.ADDCOLOR) {
	        }
	        if (statue == EGameStatue.SHAPE) {
	        }
	        if (statue == EGameStatue.POLISH) {
	            this.progressPolish(0.004);
	        }
	        this.lineParent.visible = statue == EGameStatue.SHAPE;
	        if (statue != EGameStatue.ADDTEXTURE) {
	            this.btnAuction.visible = false;
	        }
	        this.nodeShap.visible = statue == EGameStatue.SHAPE;
	        this.nodeAddColor.visible = statue == EGameStatue.ADDCOLOR;
	        this.nodeAddTexuture.visible = statue == EGameStatue.ADDTEXTURE;
	        this.nodePolish.visible = statue == EGameStatue.POLISH;
	        this.nodeStar.visible = false;
	        if (statue == EGameStatue.ADDCOLOR) {
	            this.creatOptColor();
	        }
	        if (statue == EGameStatue.ADDTEXTURE) {
	            this.creatAddTexture();
	        }
	    }
	    createLine() {
	        for (let index = 0; index < this.lines.length; index++) {
	            const element = this.lines[index];
	            element.destroy();
	        }
	        this.lines = [];
	        let planeParent = this.line.parent;
	        let nodeP = this.line;
	        let level_config = SceneHelper.Instance.levelDT.m_config;
	        let beizerString = level_config.beizer;
	        let points = SceneHelper.Instance.translatePoints(beizerString);
	        let scrLength = points.length;
	        for (let index = scrLength - 1; index >= 0; index--) {
	            const element = points[index];
	            console.log(">>> element ", element);
	            let tmpPoint = new BeizerPoint();
	            if (element.out != null) {
	                tmpPoint.in = new Laya.Vector2(element.out.x, element.out.y);
	                tmpPoint.in.x = -tmpPoint.in.x;
	            }
	            if (element.in != null) {
	                tmpPoint.out = new Laya.Vector2(element.in.x, element.in.y);
	                tmpPoint.out.x = -tmpPoint.out.x;
	            }
	            tmpPoint.pos = new Laya.Vector2(element.pos.x, element.pos.y);
	            tmpPoint.pos.x = -element.pos.x;
	            points.push(tmpPoint);
	        }
	        let lastPoint = points[scrLength - 1];
	        let startPoint = points[scrLength];
	        let endPoint = points[points.length - 1];
	        lastPoint.out = new Laya.Vector2(startPoint.pos.x, lastPoint.pos.y);
	        startPoint.in = new Laya.Vector2(lastPoint.pos.x, startPoint.pos.y);
	        console.log(">>> lastPoint startPoint ", lastPoint, startPoint);
	        console.log(">>> 2 ", points);
	        let beizer = new Beizer(points);
	        let beizer_user_point = beizer.getFirstPoint();
	        let distance = beizer_user_point.beizer.getLenth() / GameBaseConfig.AUXILIARYL_LINE;
	        while (true) {
	            let point = beizer_user_point.point.clone();
	            let createPos = new Laya.Vector3(point.x, point.y);
	            let outPos = new Laya.Vector4();
	            SceneHelper.Instance.camera.worldToViewportPoint(new Laya.Vector3(point.x, point.y, 0), outPos);
	            let tempLine = new Laya.Image(this.line.skin);
	            planeParent.addChild(tempLine);
	            tempLine.x = outPos.x;
	            tempLine.y = outPos.y;
	            tempLine.width = this.line.width;
	            tempLine.height = this.line.height;
	            tempLine.pivotX = this.line.pivotX;
	            tempLine.pivotY = this.line.pivotY;
	            let angle = beizer_user_point.getDirection();
	            tempLine.rotation = angle - 90;
	            this.lines.push(tempLine);
	            if (beizer_user_point.is_end)
	                break;
	            beizer_user_point.toNextPoint(distance);
	        }
	        this.line.visible = false;
	    }
	    addTexutreFinish() {
	    }
	    creatOptColor() {
	        this.listColors.visible = true;
	        let config = SceneHelper.Instance.getLevelConfig();
	        console.log(">>>>config", config);
	        let colorConfig = [];
	        for (let index = 0; index < config.colors.length; index++) {
	            const path = config.colors[index].icon;
	            const color = config.colors[index].color;
	            const indexTmp = index;
	            colorConfig.push({ color: color, path: path, index: indexTmp });
	        }
	        this.colorConfig = colorConfig;
	        this.listColors.vScrollBarSkin = '';
	        this.listColors.repeatX = 4;
	        this.listColors.array = colorConfig;
	        this.listColors.renderHandler = new Laya.Laya.Handler(this, this.onListColorRender);
	        this.listColors.selectHandler = new Laya.Laya.Handler(this, this.onListColorSelected);
	        setTimeout(() => {
	            this.listColors.selectedIndex = 0;
	        }, 10);
	    }
	    onListColorRender(cell, index) {
	        if (index > this.colorConfig.length) {
	            return;
	        }
	        this.arrColorsItem[index] = cell;
	        var data = this.colorConfig[index];
	        var btn = cell.getChildByName("btnColor");
	        btn.on("click", cell, () => {
	            this.listColors.selectedIndex = index;
	        });
	        btn.skin = this.colorConfig[index].path;
	    }
	    onListColorSelected(index) {
	        console.log(">>>..onListColorSelected ", index);
	        let keys = Object.keys(this.arrColorsItem);
	        GameUI.msgDipatcher.event(EMessageType.CHANGECOLOR, index);
	        keys.forEach(element => {
	            let flag = element == (index.toString());
	            {
	                let tmp = this.arrColorsItem[element];
	                var selected = tmp.getChildByName("selected");
	                selected.visible = flag;
	            }
	        });
	    }
	    creatAddTexture() {
	        this.resetAddTexture = true;
	        this.listAddTexture.visible = true;
	        let config = SceneHelper.Instance.getLevelConfig();
	        let textureConfig = [];
	        for (let index = 0; index < config.textureIconPath.length; index++) {
	            const path = config.textureIconPath[index];
	            const indexTmp = index;
	            textureConfig.push({ path: path, index: indexTmp });
	        }
	        console.log(">>.config ", textureConfig);
	        this.textureConfig = textureConfig;
	        this.listAddTexture.hScrollBarSkin = '';
	        this.listAddTexture.repeatX = textureConfig.length;
	        this.listAddTexture._selectedIndex = -1;
	        this.listAddTexture.elasticEnabled = true;
	        this.listAddTexture.array = textureConfig;
	        this.listAddTexture.renderHandler = new Laya.Laya.Handler(this, this.onListTextrueRender);
	        this.listAddTexture.selectHandler = new Laya.Laya.Handler(this, this.onListTextureSelected);
	        this.listAddTexture.renderHandler.run();
	    }
	    onListTextrueRender(cell, index) {
	        if (cell == null || index > this.textureConfig.length) {
	            return;
	        }
	        console.log(">>> teset ", cell, index);
	        if (this.resetAddTexture == true) {
	            var selected = cell.getChildByName("selected");
	            selected.visible = false;
	        }
	        this.arrTextureItem[index] = cell;
	        var btn = cell.getChildByName("btnTeture");
	        btn.offAll("click");
	        btn.on("click", cell, () => {
	            this.listAddTexture.selectedIndex = index;
	        });
	        btn.skin = this.textureConfig[index].path;
	        console.log(">>>>onListTextrueRender ", this.textureConfig[index].path);
	    }
	    onListTextureSelected(index) {
	        this.resetAddTexture = false;
	        console.log(">>>..onListTextureSelected ", index);
	        let keys = Object.keys(this.arrTextureItem);
	        GameUI.msgDipatcher.event(EMessageType.CHANGETEXTURE, index);
	        this.btnAuction.visible = true;
	        keys.forEach(element => {
	            let flag = element == (index.toString());
	            {
	                let tmp = this.arrTextureItem[element];
	                var selected = tmp.getChildByName("selected");
	                selected.visible = flag;
	            }
	        });
	        this.addTextureArrow.visible = true;
	        this.addTextureArrowAnim.play();
	    }
	}
	class Item extends Laya.Box {
	    constructor() {
	        super();
	        this.size(Item.WID, Item.HEI);
	        this.img = new Laya.Image();
	        this.addChild(this.img);
	    }
	    setImg(src) {
	        this.img.skin = src;
	    }
	}
	Item.WID = 373;
	Item.HEI = 85;

	class GameConfig$1 {
	    constructor() {
	    }
	    static init() {
	        var reg = Laya.ClassUtils.regClass;
	        reg("ui", ui);
	        reg("LinghtANimSceneUI.ts", LinghtANimSceneUI);
	        reg("script/GameUI.ts", GameUI);
	        reg("ListTest.ts", ListTest);
	        reg("script/UIOptScene.ts", UIOptScene);
	        reg("laya.display.EffectAnimation", Laya.EffectAnimation);
	    }
	}
	GameConfig$1.width = 640;
	GameConfig$1.height = 1136;
	GameConfig$1.scaleMode = "fixedwidth";
	GameConfig$1.screenMode = "none";
	GameConfig$1.alignV = "top";
	GameConfig$1.alignH = "left";
	GameConfig$1.startScene = "test/MainScene.scene";
	GameConfig$1.sceneRoot = "";
	GameConfig$1.debug = false;
	GameConfig$1.stat = false;
	GameConfig$1.physicsDebug = false;
	GameConfig$1.exportSceneToJson = true;
	GameConfig$1.init();

	class Main {
	    constructor() {
	        this.referenceClass = [Laya.Laya3D];
	        if (window["Laya3D"])
	            window["Laya3D"].init(GameConfig$1.width, GameConfig$1.height);
	        else
	            Laya.Laya.init(GameConfig$1.width, GameConfig$1.height, Laya.WebGL);
	        Laya.Laya["DebugPanel"] && Laya.Laya["DebugPanel"].enable();
	        Laya.Laya.stage.scaleMode = GameConfig$1.scaleMode;
	        Laya.Laya.stage.screenMode = GameConfig$1.screenMode;
	        Laya.Laya.stage.alignV = GameConfig$1.alignV;
	        Laya.Laya.stage.alignH = GameConfig$1.alignH;
	        Laya.URL.exportSceneToJson = GameConfig$1.exportSceneToJson;
	        if (GameConfig$1.debug || Laya.Utils.getQueryString("debug") == "true")
	            Laya.Laya.enableDebugPanel();
	        if (GameConfig$1.physicsDebug)
	            Laya.PhysicsDebugDraw.enable();
	        if (GameConfig$1.stat)
	            Laya.Stat.show();
	        Laya.Laya.alertGlobalError = true;
	        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	    }
	    onVersionLoaded() {
	        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	    }
	    onConfigLoaded() {
	        GameConfig$1.startScene && Laya.Scene.open(GameConfig$1.startScene);
	    }
	}
	new Main();

}(Laya));

import { ui } from "./../ui/layaMaxUI";
import { BlinnPhongMaterial } from "laya/d3/core/material/BlinnPhongMaterial";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Laya } from "Laya";
import { Camera } from "laya/d3/core/Camera";
import { Vector3 } from "laya/d3/math/Vector3";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { PrimitiveMesh } from "laya/d3/resource/models/PrimitiveMesh";
import { Texture2D } from "laya/resource/Texture2D";
import { Handler } from "laya/utils/Handler";
import { PhysicsCollider } from "laya/d3/physics/PhysicsCollider";
import { BoxColliderShape } from "laya/d3/physics/shape/BoxColliderShape";
import { Quaternion } from "laya/d3/math/Quaternion";
import { VertexMesh } from "laya/d3/graphics/Vertex/VertexMesh";
import { PBRStandardMaterial } from "laya/d3/core/material/PBRStandardMaterial";
import { Beizer, BeizerAction } from "./Beizer";
import { Vector2 } from "laya/d3/math/Vector2";
import { Ray } from "laya/d3/math/Ray";
import { HitResult } from "laya/d3/physics/HitResult";
import BoxControlScript from "./UpdateScript";
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends ui.test.TestSceneUI {
    constructor() {
        super();
        this.m_beizerAction = new BeizerAction();
        this.m_h_slices = 200;
        this.m_l_slices = 32;
        this.m_mesh = null;
        this.m_vertexDeclaration = null;
        this.m_vertices = null;
        this.m_indices = null;
        this.m_lastX = 0;
        this.m_lastY = 0;
        this.m_mouseDownX = 0;
        this.m_mouseDownY = 0;
        this.m_nearestBeizerPoint = null;
        this.m_box = null;
        this.m_RayY = 0;
        this.newScene = Laya.stage.addChild(new Scene3D());
        //初始化照相机
        var camera = this.newScene.addChild(new Camera(0, 0.1, 100));
        camera.transform.translate(new Vector3(0, 6, 9.5));
        camera.transform.rotate(new Vector3(-15, 0, 0), true, false);
        this.camera = camera;
        {
            var ray_plane = this.newScene.addChild(new MeshSprite3D());
            var planeMat = new BlinnPhongMaterial();
            //设置纹理平铺和偏移
            var tilingOffset = planeMat.tilingOffset;
            tilingOffset.setValue(5, 5, 0, 0);
            planeMat.tilingOffset = tilingOffset;
            //设置材质
            ray_plane.meshRenderer.material = planeMat;
            ray_plane.transform.localPosition = new Vector3(0, 1, 0);
            ray_plane.transform.localRotationEuler = new Vector3(90, 0, 0);
            //平面添加物理碰撞体组件
            var planeStaticCollider = ray_plane.addComponent(PhysicsCollider);
            //创建盒子形状碰撞器
            var planeShape = new BoxColliderShape(100, 0, 100);
            //物理碰撞体设置形状
            planeStaticCollider.colliderShape = planeShape;
            //物理碰撞体设置摩擦力
            planeStaticCollider.friction = 2;
            //物理碰撞体设置弹力
            planeStaticCollider.restitution = 0.3;
        }
        //方向光
        var directionLight = new DirectionLight();
        this.newScene.addChild(directionLight);
        directionLight.color = new Vector3(0.6, 0.6, 0.6);
        //设置平行光的方向
        var mat = directionLight.transform.worldMatrix;
        mat.setForward(new Vector3(-0.5, -1.0, -0.5));
        directionLight.transform.worldMatrix = mat;
        //平面
        var plane = this.newScene.addChild(new MeshSprite3D(PrimitiveMesh.createPlane(10, 10, 10, 10)));
        var planeMat = new BlinnPhongMaterial();
        Texture2D.load("res/grass.png", Handler.create(this, function (tex) {
            planeMat.albedoTexture = tex;
        }));
        //设置纹理平铺和偏移
        var tilingOffset = planeMat.tilingOffset;
        tilingOffset.setValue(5, 5, 0, 0);
        planeMat.tilingOffset = tilingOffset;
        //设置材质
        plane.meshRenderer.material = planeMat;
        this.mat1 = new PBRStandardMaterial();
        //加载纹理资源
        Texture2D.load("res/wood.jpg", Handler.create(this, function (tex) {
            let This = this;
            This.mat1.albedoTexture = tex;
            //添加一个球体
            Laya.timer.once(100, this, function () {
                this.addBox();
            });
        }));
        this.root = this.newScene.addChild(new MeshSprite3D());
        this.root.addComponent(BoxControlScript);
    }
    addBox() {
        let config = `[{
	"pos": {
		"x": 0.8,
		"y": 0
	},
	"out": {
		"x": 0.8,
		"y": 0.5
	}
}, {
	"in": {
		"x": 1.5,
		"y": 0.5
	},
	"pos": {
		"x": 1.5,
		"y": 1
	},
	"out": {
		"x": 1.5,
		"y": 1.5
	}
}, {
	"in": {
		"x": 1,
		"y": 1.5
	},
	"pos": {
		"x": 1,
		"y": 2
	},
	"out": {
		"x": 1,
		"y": 2.5
	}
}, {
	"pos": {
		"x": 1.3,
		"y": 3
	},
	"in": {
		"x": 1.3,
		"y": 2.5
	}
}]`;
        this.m_beizerAction.points = JSON.parse(config);
        this.m_beizer = new Beizer(this.m_beizerAction.points);
        this.height = 2;
        var box = this.root.addChild(new MeshSprite3D(this.createMyCylinder()));
        this.m_box = box;
        //设置材质
        box.meshRenderer.material = this.mat1;
        var transform = box.transform;
        var pos = transform.position;
        pos.setValue(0, 0.1, 0);
        transform.position = pos;
        transform.localRotation = new Quaternion(0, 0, 0, 0);
        let This = this;
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, function (e) {
            This.m_mouseDownX = Laya.stage.mouseX;
            This.m_mouseDownY = Laya.stage.mouseY;
            This.m_lastX = Laya.stage.mouseX;
            This.m_lastY = Laya.stage.mouseY;
            let hit = new HitResult();
            let ray = new Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
            This.camera.viewportPointToRay(new Vector2(Laya.stage.mouseX, Laya.stage.mouseY), ray);
            if (This.newScene.physicsSimulation.rayCast(ray, hit)) {
                let hit_point = hit.point;
                This.m_RayY = hit_point.y;
                let nearest = null;
                let distance = 0;
                This.m_beizerAction.points.forEach(element => {
                    let this_distance = Math.abs(element.pos.y - This.m_RayY);
                    if (!nearest || this_distance < distance) {
                        nearest = element;
                        distance = this_distance;
                    }
                });
                This.m_nearestBeizerPoint = nearest;
                console.log("raaaaaaaaaaaaaaaaaaay", hit_point);
            }
        });
        Laya.stage.on(Laya.Event.MOUSE_MOVE, null, function (e) {
            let lastX = This.m_lastX;
            let thisX = Laya.stage.mouseX;
            This.m_lastX = Laya.stage.mouseX;
            This.m_lastY = Laya.stage.mouseY;
            if (!This.m_nearestBeizerPoint)
                return;
            let move_distance = lastX > thisX ? -0.02 : 0.02;
            if (This.m_nearestBeizerPoint.pos.x < 0.5 || This.m_nearestBeizerPoint.pos.x > 3)
                return;
            This.m_nearestBeizerPoint.pos.x;
            This.m_beizerAction.moveToX(This.m_nearestBeizerPoint, move_distance);
            This.m_beizer = new Beizer(This.m_beizerAction.points);
            let mesh = This.updateMyCylinder();
            This.m_box.destroy();
            var box = This.root.addChild(new MeshSprite3D(mesh));
            This.m_box = box;
            //设置材质
            box.meshRenderer.material = This.mat1;
            var transform = box.transform;
            var pos = transform.position;
            pos.setValue(0, 0.1, 0);
            transform.position = pos;
            transform.localRotation = new Quaternion(0, 0, 0, 0);
        });
        return;
    }
    OnMouseMove(screen_x, screen_y) {
    }
    /**
     * 创建一个圆柱体模型(中空)
     * @param radius 半径
     * @param height 高度
     * @param h_slices 垂直层数
     * @param l_slices 	水平切分数
     * 最终的点的数量为 :水平层数*垂直层数*2(内部)，以不超过1万面为目标，点数为5千，水平25，垂直200
     * 总点数=水平层数*垂直层数*2
     */
    createMyCylinder() {
        let h_slices = this.m_h_slices;
        let slices = this.m_l_slices;
        //(this._released) || (dispose());//如果已存在，则释放资源
        let Y = h_slices + 1;
        let X = slices + 1;
        var vertexCount = X * Y * 2; // + (X + 1);
        var indexCount = 3 * 2 * h_slices * slices * 2; //  + 3 * slices;
        //定义顶点数据结构
        var vertexDeclaration = VertexMesh.getVertexDeclaration("POSITION,NORMAL,UV");
        //单个顶点数据个数,总共字节数/单个字节数
        var vertexFloatStride = vertexDeclaration.vertexStride / 4;
        //顶点
        var vertices = new Float32Array(vertexCount * vertexFloatStride);
        //顶点索引
        var indices = new Uint16Array(indexCount);
        this.m_vertexDeclaration = vertexDeclaration;
        this.m_vertices = vertices;
        this.m_indices = indices;
        return this.updateMyCylinder();
    }
    updateMyCylinder() {
        let h_slices = this.m_h_slices;
        let slices = this.m_l_slices;
        //(this._released) || (dispose());//如果已存在，则释放资源
        let Y = h_slices + 1;
        let X = slices + 1;
        var vertexCount = X * Y * 2; // + (X + 1);
        var indexCount = 3 * 2 * h_slices * slices * 2; //  + 3 * slices;
        //定义顶点数据结构
        var vertexDeclaration = this.m_vertexDeclaration;
        //顶点
        var vertices = this.m_vertices;
        //顶点索引
        var indices = this.m_indices;
        var sliceAngle = (Math.PI * 2.0) / slices;
        var curAngle = 0;
        var verticeCount = 0;
        var posX = 0;
        var posY = 0;
        var posZ = 0;
        var vc = 0;
        var ic = 0;
        //----------------------------- 侧面---------------------------------
        let beizer_user_point = this.m_beizer.getFirstPoint();
        let distance = beizer_user_point.beizer.getLenth() / h_slices;
        let y_values = [];
        while (true) {
            y_values.push(beizer_user_point.point.clone());
            if (beizer_user_point.is_end)
                break;
            beizer_user_point.toNextPoint(distance);
        }
        for (let l_index = 0; l_index <= slices; l_index++) {
            curAngle = l_index * sliceAngle;
            let cos_value = Math.cos(curAngle);
            let sin_value = Math.sin(curAngle);
            //h位置
            for (let h_index = 0; h_index <= h_slices; h_index++) {
                let beizer_point = y_values[h_index];
                posY = beizer_point.y;
                posX = beizer_point.x * cos_value;
                posZ = beizer_point.x * sin_value;
                // 画顶点
                //pos(X,Y,Z)
                vertices[vc++] = posX;
                vertices[vc++] = posY;
                vertices[vc++] = posZ;
                //normal(法线)
                vertices[vc++] = posX;
                vertices[vc++] = 0;
                vertices[vc++] = posZ;
                //uv    (x,y)
                vertices[vc++] = l_index * 1 / slices;
                vertices[vc++] = h_index / h_slices;
            }
        }
        for (let l_index = 0; l_index < slices; l_index++) {
            //h位置
            for (let h_index = 0; h_index < h_slices; h_index++) {
                indices[ic++] = verticeCount + l_index * Y + h_index; //(x,y)
                indices[ic++] = verticeCount + (1 + l_index) * Y + h_index + 1; //(x+1, y+1)
                indices[ic++] = verticeCount + l_index * Y + h_index + 1; //(x, y+1)
                indices[ic++] = verticeCount + l_index * Y + h_index; //(x, y)
                indices[ic++] = verticeCount + (1 + l_index) * Y + h_index; //(x+1, y)
                indices[ic++] = verticeCount + (1 + l_index) * Y + h_index + 1; //(x+1, y+1)	
                indices[ic++] = verticeCount + l_index * Y + h_index; //(x,y)
                indices[ic++] = verticeCount + l_index * Y + h_index + 1; //(x, y+1)
                indices[ic++] = verticeCount + (1 + l_index) * Y + h_index + 1; //(x+1, y+1)
                indices[ic++] = verticeCount + l_index * Y + h_index; //(x, y)
                indices[ic++] = verticeCount + (1 + l_index) * Y + h_index + 1; //(x+1, y+1)	
                indices[ic++] = verticeCount + (1 + l_index) * Y + h_index; //(x+1, y)
            }
        }
        verticeCount += X * Y * 2;
        this.m_mesh = PrimitiveMesh._createMesh(vertexDeclaration, vertices, indices);
        return this.m_mesh;
    }
}

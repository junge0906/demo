import { Script3D } from "laya/d3/component/Script3D";
import { Vector3 } from "laya/d3/math/Vector3";
export default class BoxControlScript extends Script3D {
    constructor() {
        super();
        this._rotation = new Vector3(0, 2, 0);
    }
    /**
     * 覆写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
     */
    onAwake() {
        //得到3D对象
        this.box = this.owner;
    }
    static setSpeed(speed) {
        BoxControlScript.s_Speed = speed;
    }
    static getSpeed() {
        return BoxControlScript.s_Speed;
    }
    onStart() {
        //得到3D对象的材质
    }
    /**
     * 覆写组件更新方法（相当于帧循环）
     */
    onUpdate() {
        this._rotation.y = BoxControlScript.s_Speed;
        //所属脚本对象旋转更新
        this.box.transform.rotate(this._rotation, false, false);
    }
    onDisable() {
        console.log("组件设置为不可用");
    }
}
BoxControlScript.s_Speed = 2;

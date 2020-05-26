import { Script3D } from "laya/d3/component/Script3D";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { Vector3 } from "laya/d3/math/Vector3";
import SceneHelper from "./SceneHelper";
import { Laya } from "Laya";

let tLitmit = 25;
export class MyTask {
    private st = new Date().getTime();
    private curIdx = 0;
    private MAX_COUNT = 9999;
    private finish = false;
    public onFrame():void{
        if(this.finish) return;
        this.st = new Date().getTime();
    　　for(let i = this.curIdx; i < this.MAX_COUNT; i++){
    　　　　//到达时限时，余下script不在当前帧运行
    　　　　if(new Date().getTime() - this.st > tLitmit){
    　　　　　　 this.curIdx = i;
    　　　　　　return;
    　　　　}
    　　　　if (this.doThings()) break;
    　　}
    
        this.finish = true;
    　  this.onComplete();
    }
    
    protected doThings() : boolean{
        return true;
    }
    
    protected onComplete(){
    }
}

export default class BoxControlScript extends Script3D {
    private box: MeshSprite3D;
    private _rotation = new Vector3(0, 2, 0);
    static script : BoxControlScript;
    constructor() {
        super();
        BoxControlScript.script = this;
    }

	/**
	 * 覆写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
	 */
    public onAwake(): void {
        //得到3D对象
        this.box = this.owner as MeshSprite3D;
    }
    private static s_Start: boolean = true;
    public static setStart(start: boolean) {
        BoxControlScript.s_Start = start;
    }
    public static readonly DEFAULT_SPEED= 2;
    private static s_Speed: number = 2;
    public static setSpeed(speed: number) {
        BoxControlScript.s_Speed = speed;
    }

    public static rotate(value) {
        BoxControlScript.script._rotation.y = value;
        //所属脚本对象旋转更新
        BoxControlScript.script.box.transform.rotate(BoxControlScript.script._rotation, false, false);
    }

    public static getSpeed(): number {
        return BoxControlScript.s_Speed;
    }

    public onStart(): void {
        //得到3D对象的材质
    }

	/**
	 * 覆写组件更新方法（相当于帧循环）
	 */
    public onUpdate(): void {
        if( BoxControlScript.s_Start ==true)
        {
            this._rotation.y = BoxControlScript.s_Speed;
            //所属脚本对象旋转更新
            this.box.transform.rotate(this._rotation, false, false);
        }

        SceneHelper.Instance.onUpdate();

        if(BoxControlScript.m_task) BoxControlScript.m_task.onFrame();
    }

    public static SetTask(task : MyTask) {
        BoxControlScript.m_task = task;
    }
     private static m_task :MyTask;

    public onDisable() {
        console.log("组件设置为不可用");
    }
}
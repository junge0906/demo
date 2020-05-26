import { ui } from "./ui/layaMaxUI";
import GameConfig, { GameBaseConfig } from "./script/Config";
import { Timer } from "laya/utils/Timer";
import { Image } from "laya/ui/Image";
import GameUI from "./script/GameUI";
import { EMessageType, EGameStatue } from "./GameEnum";
import SceneHelper from "./script/SceneHelper";
import MusicCtrl from "./script/MusicCtrl";
import { MusicConfig } from "./script/MusicConfig";

export default class LinghtANimSceneUI extends ui.test.lightAnimSceneUI 
{
    fireArr:Array<Image>;
    curOpenFireIndex=-1;
    minRotate=0;
    maxRotate=0;
    constructor()
    {
        super();
        this.btnChulu.on("click",this,()=>{
                clearInterval(this.loopTimer);
               GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, {status:EGameStatue.POLISH})
               SceneHelper.Instance.SetBoxUp(true,GameBaseConfig.normalRootPos,true)
               SceneHelper.Instance.setCameraSize(GameBaseConfig.CAMERA_SIZE_SHAP)
               this.visible=false;
               SceneHelper.Instance.setHongpeiScore((this.curOpenFireIndex+1)*25);
               if(this.curOpenFireIndex>=3)
               {
                    SceneHelper.Instance.setStar(EGameStatue.FIRESHAPE,true);
               }
        });
        this.btnChuLuFourStar.on("click",this,()=>{
            clearInterval(this.loopTimer);
            GameUI.msgDipatcher.event(EMessageType.CHANGESTATE, {status:EGameStatue.POLISH})
            SceneHelper.Instance.SetBoxUp(true,GameBaseConfig.normalRootPos,true)
            SceneHelper.Instance.setCameraSize(GameBaseConfig.CAMERA_SIZE_SHAP)
            this.visible=false;
            SceneHelper.Instance.setHongpeiScore((this.curOpenFireIndex+1)*25);
            if(this.curOpenFireIndex>=3)
            {
                    SceneHelper.Instance.setStar(EGameStatue.FIRESHAPE,true);
            }
        });
        this.btnHeat.on("click",this,()=>{
            if( this.checkTime < Timer.gSysTimer.currTimer)
            {
                let fireCount = this.fireArr.length;
                let nodepointRotate =this.nodepointer.rotation+90;
                if(nodepointRotate >=this.minRotate && nodepointRotate<=this.maxRotate)
                {//有效
                    console.log(">>> 有效",nodepointRotate,this.minRotate,this.maxRotate)
                    if(this.curOpenFireIndex<fireCount-1)
                    {
                        this.curOpenFireIndex++;
                        this.fireArr[this.curOpenFireIndex].visible=true;
                    }
                    if(this.curOpenFireIndex>=fireCount-1)
                    {
                        //this.stopRotate();
                        this.btnHeat.visible=false;
                        this.btnChulu.visible=false;
                        this.btnChuLuFourStar.visible=true;
                    }
                    MusicCtrl.instance.PlaySound(MusicConfig.FireSucceed)
                }
                else
                {//无效
                    console.log(">>> 无效",nodepointRotate,this.minRotate,this.maxRotate)
                    if(this.curOpenFireIndex>=0)
                    {
                        this.fireArr[this.curOpenFireIndex].visible=false;
                        this.curOpenFireIndex--;
                    }
                    MusicCtrl.instance.PlaySound(MusicConfig.FireNoSucceed)
                }
                this.starNode.visible = (this.curOpenFireIndex>=fireCount-1);
                this.freshUI();
                this.checkTime =Timer.gSysTimer.currTimer+GameBaseConfig.fireBtnCoolingTime;
                this.randomRotate();
            }
        })
        this.fireArr =new Array();
        this.fireArr.push(this.fire1);
        this.fireArr.push(this.fire2);
        this.fireArr.push(this.fire3);
        this.fireArr.push(this.fire4);
        this.initUI();
    }

    public initUI()
    {
        this.curOpenFireIndex=-1;
        this.minRotate=0;
        this.maxRotate=0;
        this.fireArr.forEach(element => {
            element.visible=false;
        });
        this.starNode.visible=false;
        this.btnHeat.visible=true;
        this.btnChuLuFourStar.visible=false;
        this.center.visible=true;
        this.startRotate();
        this.randomRotate();
        this.freshUI();
    }

    private freshUI()
    {
        this.btnChu_anse.visible=(this.curOpenFireIndex+1 < GameBaseConfig.fireFinishMinCount);
        this.btnChulu.visible=(this.curOpenFireIndex+1 ==GameBaseConfig.fireFinishMinCount);
        this.btnChuLuFourStar.visible=(this.curOpenFireIndex ==3);
        if(this.curOpenFireIndex ==3)
        {
            this.center.visible=false;
            SceneHelper.Instance.SetBoxUp(true,GameBaseConfig.fireShapUIRootPos,true)
            SceneHelper.Instance.setCameraSize(GameBaseConfig.CAMERA_SIZE_FIRESHAP)
        }
    }
    private randomRotate()
    {
        //0 -150
        let rotate =Math.floor(Math.random() *(180-GameBaseConfig.fireGoodRatate)) 
        this.minRotate = rotate;
        this.maxRotate = rotate+GameBaseConfig.fireGoodRatate;
        this.greenMask.rotation =GameBaseConfig.fireGoodRatate-180;
        this.greenNode.rotation =rotate;
        console.log(">>> 随机教的",this.minRotate,this.maxRotate)
    }

    checkTime=0;
    loopTimer =-1;
    private startRotate()
    {
        let timeinterval =50;
        let left=-90;
        let right =90;
        let speed =1;
        let rotate =0;
        clearInterval(this.loopTimer);
        this.loopTimer=setInterval(()=>{
            if(rotate >= right)
            {
                speed=-1;
            }
            else if(rotate<=left)
            {
                speed=1;
            }
            rotate +=speed * GameBaseConfig.firePointSpeed;
            this.nodepointer.rotation = rotate;
           {

           }
       },timeinterval);  
    }
    private stopRotate()
    {
        clearInterval(this.loopTimer);
    }

}
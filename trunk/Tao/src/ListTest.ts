import { ui } from "./ui/layaMaxUI";
import { ILaya } from "ILaya";
import { ClipFrame } from "./script/ClipFrame";

export default class ListTest extends ui.test.RankListUI {

    constructor()
    {
        super()
        let dataSource = []
        for(let i=0;i<20;i++){
            let data = null;
            data = {
                msgTxt:{text:">>"+i},
            }
            dataSource.push(data)
        }
        this.mlist.array =dataSource;
        this.mlist.vScrollBarSkin='';

        // this.testClip.interval=1000;
        // let index =0;
        // ILaya.timer.loop(2000,this,()=>{
        //     console.log(">>>>>> ",index);
        //     this.testClip.index=index;
        //     index++;
        // });
        // this.testClip.playFrame(0,7,true);
        // this.testClip.play(0,-1);
        let clipFrame:ClipFrame =new ClipFrame(this.testClip)
        clipFrame.playFrame(0,7,100,true);
    }
}
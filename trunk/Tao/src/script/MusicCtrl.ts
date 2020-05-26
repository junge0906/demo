import { Laya } from "Laya";
import { MusicConfig } from "./MusicConfig";


/**
 * 功能：音乐播放与声音控制器
 * 作者：黄超
 * 时间：2018-07-31
 */
export default class MusicCtrl  
 {
    public static _instance:MusicCtrl=null;

    public static get instance():MusicCtrl
    {
        if(MusicCtrl._instance==null)
        {
            MusicCtrl._instance =new MusicCtrl();
            MusicCtrl._instance.Init();
        }
        return MusicCtrl._instance;
    }
    /** 初始化 */
    private Init() {
       
        Laya.LocalStorage.removeItem("volum")
        let musicCache:number = parseFloat(Laya.LocalStorage.getItem("volum"));
        if( !musicCache)
        {
            this.MusicVolume=1;
            console.log(">>>>MusicCtrl>>>>>>. " );
        }
        else
        {
            this.MusicVolume=musicCache;
        }

        console.log(">>>>MusicCtrl>>>>>>. ",Laya.LocalStorage.getItem("Vibrate"), this._MusicVolume);

        // await DY.File.LoadSync("res/Music/bg.mp3");
 
    }

    /** 进入场景调用 */
    public OnEnterScene() {
        
    }
    private PlayMusic(r_path:string)
    {
        Laya.SoundManager.playMusic(r_path, 0.1 );
    }
    public PlaySound(r_path:string,loop:number=1)
    {
        Laya.SoundManager.playSound(r_path, loop);
    }

    private _MusicVolume:number=1;
    public get MusicVolume() : number {
        return this._MusicVolume;
    }
    public set MusicVolume(v : number) {
        this._MusicVolume =v;
        console.log(">>>>> MusicVolume  ",v);
        Laya.SoundManager.setMusicVolume(this._MusicVolume/2);
        Laya.SoundManager.setSoundVolume(this._MusicVolume);
        Laya.LocalStorage.setItem("volum",this._MusicVolume.toString());
    }

    public OnMusic()
    {
        console.log(">>>>OnMusic>>>>>>. " );
        this.MusicVolume=1;
    }
    public OffMusic()
    {
        console.log(">>>>OffMusic>>>>>>. " );
        this.MusicVolume=0;
    }

    public PlayBgMusic()
    {
        if(this.MusicVolume>0)
        {
            console.log("player bg music ",this.MusicVolume);
            this.PlayMusic(MusicConfig.bgMusic);
        }
        
    }
    public StopBgMusic()
    {
        Laya.SoundManager.stopMusic();
    }
    public PlayOnClick()
    {
        if(this.MusicVolume>0)
        {
            console.log("player bg music ");
            this.PlaySound("res/Music/click.mp3");
        }
        
    }
    public PlayPolish()
    {
        this.PlaySound(MusicConfig.polish,0.1);
    }
    public stopPolish()
    {
        Laya.SoundManager.stopSound(MusicConfig.polish);

    }
    public PlayAddColor()
    {
        this.PlaySound(MusicConfig.addcolor,0.1);
    }
    public stopAddColor()
    {
        Laya.SoundManager.stopSound(MusicConfig.addcolor);

    }
}
export { MusicCtrl }

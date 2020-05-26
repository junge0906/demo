import { ILaya } from "ILaya";
import { Clip } from "laya/ui/Clip";

/**
 *         let clipFrame:ClipFrame =new ClipFrame(this.testClip)
        clipFrame.playFrame(0,7,100,true);
 */
class ClipFrame
{
	private _clip:Clip;
	constructor(clip:Clip)
	{
		this._clip=clip;
		this._clip.autoPlay=false;
		this._clip.isPlaying=false
	}
	private frame_Loop:boolean=true;
	private _index:number=0;
	private _toIndex:number=0;
	/**
	   * 播放动画。
	   * @param	from	开始索引 0 开始
	   * @param	to		结束索引 包含
	   * @param	interval		多少毫秒切换一次
	   * @param	rloop		是否循环
	   */
	  playFrame(from: number , to: number,interval:number,rloop:boolean=true): void {
		  this._index = from;
		  this._toIndex = to;
		  this._index++;
		  this.frame_Loop = rloop;
		  ILaya.timer.loop(interval, this, this._framLoop);
	  }
  
	  /**
	   * @private
	   */
	  protected _framLoop(): void {
		  console.log(">>>> _framLoop ")
		  if (this._clip._visible ) {
			  this._index++;
			  if (this.frame_Loop==false)
			  {
				  if(this._index>this._toIndex)
				  ILaya.timer.clear( this, this._framLoop);
				  else
				  this._clip.index = this._index;
			  }
			  else if (this._index > this._toIndex) 
			  {
				  this._index = 0;
			  }
			  this._clip.index = this._index;
		  }
	  }
}

export{ClipFrame}
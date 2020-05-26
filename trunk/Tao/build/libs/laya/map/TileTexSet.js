import { ILaya } from "../../ILaya";
/**
 * 此类是子纹理类，也包括同类动画的管理
 * TiledMap会把纹理分割成无数子纹理，也可以把其中的某块子纹理替换成一个动画序列
 * 本类的实现就是如果发现子纹理被替换成一个动画序列，animationKey会被设为true
 * 即animationKey为true,就使用TileAniSprite来做显示，把动画序列根据时间画到TileAniSprite上
 * @author ...
 */
export class TileTexSet {
    constructor() {
        /**唯一标识*/
        this.gid = -1;
        /**纹理显示时的坐标偏移X*/
        this.offX = 0;
        /**纹理显示时的坐标偏移Y*/
        this.offY = 0;
        //下面是动画支持需要的
        /**当前要播放动画的纹理序列*/
        this.textureArray = null;
        /** 当前动画每帧的时间间隔*/
        this.durationTimeArray = null;
        /** 动画播放的总时间 */
        this.animationTotalTime = 0;
        /**true表示当前纹理，是一组动画，false表示当前只有一个纹理*/
        this.isAnimation = false;
        this._spriteNum = 0; //当前动画有多少个显示对象
        this._aniDic = null; //通过显示对象的唯一名字，去保存显示显示对象
        this._frameIndex = 0; //当前动画播放到第几帧
        this._time = 0; //距离上次动画刷新，过了多少长时间
        this._interval = 0; //每帧刷新的时间间隔
        this._preFrameTime = 0; //上一帧刷新的时间戳
    }
    /**
     * 加入一个动画显示对象到此动画中
     * @param	aniName	//显示对象的名字
     * @param	sprite	//显示对象
     */
    addAniSprite(aniName, sprite) {
        if (this.animationTotalTime == 0) {
            return;
        }
        if (this._aniDic == null) {
            this._aniDic = {};
        }
        if (this._spriteNum == 0) {
            //每3帧刷新一下吧，每帧刷新可能太耗了
            ILaya.timer.frameLoop(3, this, this.animate);
            this._preFrameTime = ILaya.Browser.now();
            this._frameIndex = 0;
            this._time = 0;
            this._interval = 0;
        }
        this._spriteNum++;
        this._aniDic[aniName] = sprite;
        if (this.textureArray && this._frameIndex < this.textureArray.length) {
            var tTileTextureSet = this.textureArray[this._frameIndex];
            this.drawTexture(sprite, tTileTextureSet);
        }
    }
    /**
     * 把动画画到所有注册的SPRITE上
     */
    animate() {
        if (this.textureArray && this.textureArray.length > 0 && this.durationTimeArray && this.durationTimeArray.length > 0) {
            var tNow = ILaya.Browser.now();
            this._interval = tNow - this._preFrameTime;
            this._preFrameTime = tNow;
            if (this._interval > this.animationTotalTime) {
                this._interval = this._interval % this.animationTotalTime;
            }
            this._time += this._interval;
            var tTime = this.durationTimeArray[this._frameIndex];
            while (this._time > tTime) {
                this._time -= tTime;
                this._frameIndex++;
                if (this._frameIndex >= this.durationTimeArray.length || this._frameIndex >= this.textureArray.length) {
                    this._frameIndex = 0;
                }
                var tTileTextureSet = this.textureArray[this._frameIndex];
                var tSprite;
                for (var p in this._aniDic) {
                    tSprite = this._aniDic[p];
                    this.drawTexture(tSprite, tTileTextureSet);
                }
                tTime = this.durationTimeArray[this._frameIndex];
            }
        }
    }
    drawTexture(sprite, tileTextSet) {
        sprite.graphics.clear(true);
        //sprite.graphics.drawImage(tileTextSet.texture, tileTextSet.offX, tileTextSet.offY, tileTextSet.texture.width, tileTextSet.texture.height);
        sprite.graphics.drawImage(tileTextSet.texture, tileTextSet.offX, tileTextSet.offY);
    }
    /**
     * 移除不需要更新的SPRITE
     * @param	_name
     */
    removeAniSprite(_name) {
        if (this._aniDic && this._aniDic[_name]) {
            delete this._aniDic[_name];
            this._spriteNum--;
            if (this._spriteNum == 0) {
                ILaya.timer.clear(this, this.animate);
            }
        }
    }
    /**
     * 显示当前动画的使用情况
     */
    showDebugInfo() {
        var tInfo = null;
        if (this._spriteNum > 0) {
            tInfo = "TileTextureSet::gid:" + this.gid.toString() + " 动画数:" + this._spriteNum.toString();
        }
        return tInfo;
    }
    /**
     * 清理
     */
    clearAll() {
        this.gid = -1; //唯一标识
        if (this.texture) {
            this.texture.destroy();
            this.texture = null;
        }
        this.offX = 0;
        this.offY = 0;
        this.textureArray = null;
        this.durationTimeArray = null;
        this.isAnimation = false;
        this._spriteNum = 0;
        this._aniDic = null;
        this._frameIndex = 0;
        this._preFrameTime = 0;
        this._time = 0;
        this._interval = 0;
    }
}

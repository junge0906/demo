import { Texture2D } from "laya/resource/Texture2D";
import { Laya } from "Laya";
import { Loader } from "laya/net/Loader";

/** 一层贴图数据 */
export class OneMap {
    constructor(height : number, width : number, pixels : Uint8Array | null = null) {
        this.height = height;
        this.width = width;
        if(pixels) {
            this.pixels = new Uint8Array(pixels);
        } else {
            this.pixels = new Uint8Array(height * width * 4);
        }
    }

    height : number;
    width : number;
    pixels : Uint8Array;
}

export default class TextureManager{
    public static Instance = new TextureManager();

    public loadTexture(src : string, callback) {
        if (this.textures.hasOwnProperty(src)) {
            callback(this.textures[src])
            return;
        }
        Texture2D.load(src, Laya.Handler.create(this, (texture: Texture2D) => {
            let one_info = new OneMap(texture.height, texture.width, texture.getPixels() as Uint8Array)
            this.textures[src] = one_info
            callback(this.textures[src])
        }));
    }

    public loadTextures(src : string[], callback) {
        Laya.loader.create(src, Laya.Handler.create(this, ()=>{
            for (let i=0; i<src.length; i++) {
                if(!this.textures.hasOwnProperty(src[i])) {
                    let texture = Laya.Loader.getRes(src[i]);
                    this.textures[src[i]] = new OneMap(texture.height, texture.width, texture.getPixels());
                }
            }

            let result: OneMap[] = [];
            for(let i=0; i<src.length; i++) {
                result.push(this.textures[src[i]]);
            }
            callback(result);
        }));
    }

    private textures : Object  = {}; 
}
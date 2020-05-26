import { Color } from "laya/d3/math/Color";


export default class Helper {
    /**
     * 合并图片到另外一个图片
     * @param bgWidth 背景宽
     * @param bgHeight 背景高
     * @param bgArr 背景数据
     * @param blendWidth 被合并数据宽
     * @param blendHeight 被合并数据高
     * @param blendTExutreArr 被合并数据
     * @param startHeight 从多少高度开始
     */
    public static blendTexture(bgWidth:number,bgHeight:number,bgArr:Uint8Array,blendWidth:number,blendHeight:number,blendTExutreArr:Uint8Array,startHeight:number):Uint8Array
	{
		let width1 =bgWidth;
		let height1 = bgHeight;
		let width2 = blendWidth;
		let height2 = blendHeight;
		for (let width = 0; width < width1; width++)
			for (let height = startHeight; height < startHeight+blendHeight; height++) {
				let start1 = width * 4 + height * width1 * 4
				let start2 = (width % width2) * 4 + (height % height2) * width2 * 4

				let aplpha2 = blendTExutreArr[start2 + 3] / 255
				let aplpha1 = 1 - blendTExutreArr[start2 + 3] / 255
				bgArr[start1] = Math.floor(aplpha1 * bgArr[start1] + aplpha2 * blendTExutreArr[start2]); start2++; start1++;
				bgArr[start1] = Math.floor(aplpha1 * bgArr[start1] + aplpha2 * blendTExutreArr[start2]); start2++; start1++;
				bgArr[start1] = Math.floor(aplpha1 * bgArr[start1] + aplpha2 * blendTExutreArr[start2]); start2++; start1++;
			}
		return bgArr;
	}

    /**
     * 合并图片到另外一个图片
     * @param bgWidth 背景宽
     * @param bgHeight 背景高
     * @param bgArr 背景数据
     * @param blendWidth 被合并数据宽
     * @param blendHeight 被合并数据高
     * @param blendTExutreArr 被合并数据
     * @param startHeight 从多少高度开始
     */
    public static blendTextureEx(bgWidth:number,bgHeight:number,bgArr:Uint8Array,blendWidth:number,blendHeight:number,blendTExutreArr:Uint8Array,startHeight:number, start_width : number, end_width :number):Uint8Array
	{
		let width1 =bgWidth;
		let height1 = bgHeight;
		let width2 = blendWidth;
		let height2 = blendHeight;
		for (let width = start_width; width < Math.min(end_width, width1); width++)
			for (let height = startHeight; height < startHeight+blendHeight; height++) {
				let start1 = width * 4 + height * width1 * 4
				let start2 = (width % width2) * 4 + (height % height2) * width2 * 4

				let aplpha2 = blendTExutreArr[start2 + 3] / 255
				let aplpha1 = 1 - blendTExutreArr[start2 + 3] / 255
				bgArr[start1] = Math.floor(aplpha1 * bgArr[start1] + aplpha2 * blendTExutreArr[start2]); start2++; start1++;
				bgArr[start1] = Math.floor(aplpha1 * bgArr[start1] + aplpha2 * blendTExutreArr[start2]); start2++; start1++;
				bgArr[start1] = Math.floor(aplpha1 * bgArr[start1] + aplpha2 * blendTExutreArr[start2]); start2++; start1++;
			}
		return bgArr;
	}


	/**
	 * 通过向量坐标计算向量与x轴的角度(范围[0, 360) )
	 * @param x 
	 * @param y 
	 */
	public static calcAngleByVector(x : number, y : number) : number {
		return ((Math.atan2(y, x) + 2 * Math.PI) * 360 / (2 * Math.PI)) % 360;
	}

	/**
	 * 用指定颜色填充
	 * @param pixel 
	 * @param color 
	 */
	public static fillWithColor(pixels: Uint8Array, color : Color, start : number|null= null, length : number|null = null) {
		if(!start) start = 0;
		if(!length)length = pixels.length;
		if(length % 4 != 0) length = length - length % 4;
		for (let i = start; i<start + length; i+=4) {
			let pos = i;
			pixels[pos++] = color.r
			pixels[pos++] = color.g
			pixels[pos++] = color.b
			pixels[pos++] = color.a
		}
	}
}
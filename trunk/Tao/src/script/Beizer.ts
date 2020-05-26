import { Vector2 } from "laya/d3/math/Vector2";
import { Emission } from "laya/d3/core/particleShuriKen/module/Emission";
import { Bezier } from "laya/maths/Bezier";
import { Utils } from "laya/utils/Utils";
import Helper from "./Helper";


class BeizerPoint {
    constructor(){}
    pos: Vector2;    //坐标 
    in: Vector2;  //进入控制
    out: Vector2; //出控制

    next: BeizerPoint;
    last: BeizerPoint;
}

/** 
 * 一个贝塞尔曲线的一段
 */
class BeizerUnit {
    start : Vector2;
    end: Vector2;
    startCtrlPoint: Vector2;
    endCtrlPoint: Vector2;

    /**构造函数 */
    constructor(start_point: BeizerPoint, end_point: BeizerPoint)
    {
        this.start =start_point.pos;
        this.startCtrlPoint = start_point.out;
        this.end = end_point.pos;
        this.endCtrlPoint =end_point.in;
    }

    public getLength(): number {

        let lengths = this.getLengths(null);
        return lengths[lengths.length - 1];

    };

    private bezierAt(C1, C2, C3, C4, t) {
        let t1 = 1 - t;
        return C1 * t1 * t1 * t1 +
            C2 * 3 * t1 * t1 * t +
            C3 * 3 * t1 * t * t +
            C4 * t * t * t;
    }

    private getPoint = function (t) :Vector2 {
        let x = this.bezierAt(this.start.x, this.startCtrlPoint.x, this.endCtrlPoint.x, this.end.x, t);
        let y = this.bezierAt(this.start.y, this.startCtrlPoint.y, this.endCtrlPoint.y, this.end.y, t);

        return new Vector2(x, y);
    };

    private __arcLengthDivisions : number = 200;
    private cacheArcLengths : any = null;
    public getLengths(divisions : number|null) : number[] {

        if (!divisions) divisions = (this.__arcLengthDivisions) ? (this.__arcLengthDivisions) : 200;

        if (this.cacheArcLengths
            && (this.cacheArcLengths.length === divisions + 1)) {
            return this.cacheArcLengths;
        }

        let cache = [];
        let current : Vector2, last : Vector2 = this.getPoint(0);
        let p, sum = 0;

        cache.push(0);

        for (p = 1; p <= divisions; p++) {
            
            current = this.getPoint(p / divisions);
            let lenth_vec = new Vector2(current.x-last.x ,current.y-last.y)
            sum += Vector2.scalarLength(lenth_vec);
            cache.push(sum);
            last = current;
        }

        this.cacheArcLengths = cache;
        return cache; // { sums: cache, sum:sum }; Sum is in the last element.
    }

    getUtoTmapping(u, distance) {

        let arcLengths = this.getLengths(null);

        let i = 0, il = arcLengths.length;

        let targetArcLength; // The targeted u distance value to get

        if (distance) {
            targetArcLength = distance;
        } else {
            targetArcLength = u * arcLengths[il - 1];
        }

        //let time = Date.now();

        // binary search for the index with largest value smaller than target u distance

        let low = 0, high = il - 1, comparison;

        while (low <= high) {

            i = Math.floor(low + (high - low) / 2); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats

            comparison = arcLengths[i] - targetArcLength;

            if (comparison < 0) {

                low = i + 1;
                continue;

            } else if (comparison > 0) {

                high = i - 1;
                continue;

            } else {

                high = i;
                break;

                // DONE

            }

        }

        i = high;

        //console.log('b' , i, low, high, Date.now()- time);

        if (arcLengths[i] == targetArcLength) {

            let t = i / (il - 1);
            return t;
        }

        // we could get finer grain at lengths, or use simple interpolatation between two points

        let lengthBefore = arcLengths[i];
        let lengthAfter = arcLengths[i + 1];

        let segmentLength = lengthAfter - lengthBefore;

        // determine where we are between the 'before' and 'after' points

        let segmentFraction = (targetArcLength - lengthBefore) / segmentLength;

        // add that fractional amount to t

        let t = (i + segmentFraction) / (il - 1);

        return t;

    }    

    getPointAt = function (u : number) : Vector2 {
        let t = this.getUtoTmapping(u);
        return this.getPoint(t);
    }    
}

/**
 * 贝塞尔曲线
 */
class Beizer {

    public points: BeizerPoint[] = null;
    public beziers: BeizerUnit[] = []; 
    private ratios: any[] = []; 
    private progresses: any[] = []; 
    private length : number = 0;

    public m_begPoint : BeizerUserPoint = null;
    public m_endPoind : BeizerUserPoint = null;

    /**构造函数 */
    constructor(points: BeizerPoint[]){
        this.points = points;
        this.initBeziers();
    }

    /**初始化贝塞尔曲线的数据 */
    private initBeziers() {
        this.ratios.length = 0;
        this.progresses.length = 0;
        this.length = 0;

        for (let i = 1; i < this.points.length; i++) {
            let startPoint = this.points[i - 1];
            let endPoint = this.points[i];
            let bezier = new BeizerUnit(startPoint, endPoint);
            this.beziers.push(bezier);
            this.length += bezier.getLength();
        }

        let current = 0;
        for (let i = 0; i < this.beziers.length; i++) {
            let bezier = this.beziers[i];
            this.ratios[i] = bezier.getLength() / this.length;
            this.progresses[i] = current = current + this.ratios[i];
        }

        this.m_begPoint = this.getFirstPoint();
        this.m_begPoint = this.getFirstPoint();
        this.m_endPoind = this.getFirstPoint();
        while(!this.m_endPoind.is_end) 
        {
            this.m_endPoind.toNextPoint(1);
        }
    }

    /**获取某个单元结束点的切线 */
    public GetDirectOfUnitEnd(unit_index : number)
    {
        let start_point = this.getFirstPoint();
        start_point.toNextPoint(this.progresses[unit_index] * this.length);
        return start_point.getDirection();
    }

    /**
     * 到下一个点
     * @param now_point 当前点的配置
     * @param distance  移动的距离
     */
    public toNextPoint(now_point: BeizerUserPoint, distance : number) {
        //if (distance<= 0.0001) return;

        now_point.bezierProgress += distance/this.length;

        if (distance <=0) {
            //回到原点
            if (now_point.bezierProgress <= 0) {
                let start = this.beziers[0].start;
                now_point.bezierProgress = 0;
                now_point.bezierIndex = 0;
                now_point.distance = 0;     //已经运行的距离
                now_point.point.x = start.x;
                now_point.point.y = start.y;
                return;
            }

            //往回退一段
            while (now_point.bezierIndex > 0 && now_point.bezierProgress < this.progresses[now_point.bezierIndex-1]) {
                now_point.bezierIndex--;
            }
        }

        //向前移动，如果到了下一段进行处理
        while (distance > 0 && now_point.bezierProgress > this.progresses[now_point.bezierIndex]) {
            if (now_point.bezierIndex >= this.progresses.length-1) {
                //已经到最后面了，则设置为最后一个点
                now_point.is_end = true;
                let end: Vector2 = this.beziers[now_point.bezierIndex].end
                now_point.point.x = end.x;
                now_point.point.y = end.y;
                now_point.distance = this.length * now_point.bezierProgress;
                return ;
            } else {
                //还有下一段，在下一段计算坐标点
                now_point.bezierIndex++;
            }
        }

        let realProgress = (now_point.bezierProgress - 
            (now_point.bezierIndex > 0 ? this.progresses[now_point.bezierIndex - 1] : 0)) / this.ratios[now_point.bezierIndex];
        
        let pos = this.beziers[now_point.bezierIndex].getPointAt(realProgress); 
        now_point.point = pos;   
        now_point.distance = this.length *now_point.bezierProgress;
     }

    /**
     * 将曲线平均分成N段
     * @param const_slice 分割成多少段，最终的点数为const_slice + 1
     */
    public splitToNumPoint(const_slice : number) : Vector2[] {
        let beizer_user_point: BeizerUserPoint = this.getFirstPoint();
        let distance = beizer_user_point.beizer.getLenth() / const_slice;
        let y_values: Vector2[] = [];
        while (true) {
            y_values.push(beizer_user_point.point.clone())
            if (beizer_user_point.is_end) break;
            beizer_user_point.toNextPoint(distance)
        }
        return y_values;
    }

    public static splitByYPos(beizer : Beizer, split : number) : number[] {
        let max_height = beizer.getLastPosition().y;
        let const_slice = 800;
        let beizer_user_point1: BeizerUserPoint = beizer.getFirstPoint();
        let distance1 = beizer_user_point1.beizer.getLenth() / const_slice;
        let x_values1 = [];
        let index1 = 0;
        while (index1 * split < max_height) {
            if (beizer_user_point1.point.y > index1 * split) {
                x_values1.push(beizer_user_point1.point.x);
                index1++;
            } else {
                if (beizer_user_point1.is_end) break;
                beizer_user_point1.toNextPoint(distance1)
            }
        }
        return x_values1;  
    }

    /**判断两个曲线的近似度 */
    public static getSimilarity(beizer1: Beizer, beizer2: Beizer) : number {
        // 高度 
        let heigth1 = beizer1.getLastPosition().y;
        let height2 = beizer2.getLastPosition().y;

        let similarity = heigth1 / height2
        if (similarity > 1) similarity = 1 / similarity
        //similarity *= similarity
        

        let max_height = height2 < heigth1 ? heigth1 : height2;
        let split = max_height / 20;
        let x_values1 = Beizer.splitByYPos(beizer1, split);
        let x_values2 = Beizer.splitByYPos(beizer2, split);
        let x_similarity = 0

        for(let i=0; i< Math.min(x_values1.length, x_values2.length); i++) {
            let x1 = x_values1[i];
            let x2 = x_values2[i];
            let sim = 0;
            if (x1 > x2) {
                sim =  x2 / x1;
            } else {
                sim =  x1 / x2;
            }
            // sim *= 1.1;
            // if (sim > 1) sim = 1;
            x_similarity += sim;
        }
        return similarity * x_similarity / Math.min(x_values1.length, x_values2.length);
    }

    /**
     * 获取第一个点的配置对象
     */
    public getFirstPoint(): BeizerUserPoint {
        let now_point : BeizerUserPoint = new BeizerUserPoint(this);
        let start = this.beziers[0].start;
        now_point.point.x = start.x;
        now_point.point.y = start.y;   
        return now_point;    
    }

    /**获取最后一个点的坐标 */
    public getLastPosition() : Vector2 {
        return this.beziers[this.beziers.length-1].end;
    }
    public getLastDirect() : number {
        let end_unit = this.beziers[this.beziers.length - 1];
        return Utils.getAngleOrPoints(end_unit.end, end_unit.endCtrlPoint);
        return 0;
    }

    /**获取总长度 */
    public getLenth()
    {
        return this.length;
    }
}

/**
 * 贝塞尔曲线用户对象
 */
class BeizerUserPoint {
    public bezierIndex : number = 0;
    public bezierProgress: number = 0;  //相对原点移动的比例
    public distance :number = 0;
    public beizer : Beizer= null;
    public point : Vector2 = new Vector2();
    public layer : number = 1;
    public is_end : boolean = false;
    constructor(beizer: Beizer) {
        this.beizer = beizer;
    }

    public toNextPoint(distance : number) {
        this.beizer.toNextPoint(this, distance);
    }

    public copy() :BeizerUserPoint {
        let new_point = new BeizerUserPoint(this.beizer);
        new_point.bezierIndex = this.bezierIndex;
        new_point.bezierProgress = this.bezierProgress;
        new_point.point = this.point.clone();
        new_point.layer = this.layer;
        new_point.is_end = this.is_end;
        new_point.distance = this.distance;
        
        return new_point;
    }

    /**获取当前点的切线的角度 */
    public getDirection() : number 
    {
        if (this.is_end) {
            return this.beizer.getLastDirect();
        } 

        let new_point = this.copy();
        new_point.toNextPoint(0.01);
        if (new_point.point.x != this.point.x || new_point.point.y != this.point.y)
        {
            return Helper.calcAngleByVector(new_point.point.x - this.point.x,new_point.point.y - this.point.y)
        }
        else
        {
            return 0;
        }
    }
}

class BeizerAction
{
    public points: BeizerPoint[] = null;
    /**
     * X 轴 移动
     */
    public moveToX(movePoint: BeizerPoint, moveDis: number,checkLeft:boolean=true,checkRight:boolean=true) :Beizer {
        movePoint.pos.x= movePoint.pos.x + moveDis;
        if (movePoint.in)
            movePoint.in.x = movePoint.in.x + moveDis;
        if (movePoint.out)
            movePoint.out.x  = movePoint.out.x + moveDis;

        let last = movePoint.last;
        let next = movePoint.next;
        if(last!=null)
        {
           
            if (checkLeft==true && this.needMoveNext(movePoint, moveDis, last))
            {//上一个 控制的 也要移动
                this.moveToX(last, this.getNextMoveDis(movePoint, moveDis, last),true,false);
            }
        }
        if(next!=null)
        {
            if (checkRight ==true && this.needMoveNext(movePoint, moveDis, next))
             {//下一个 控制的 也要移动
                this.moveToX(next, this.getNextMoveDis(movePoint, moveDis, next),false,true);
            }
        }
        if(last!=null && next!=null)
        {
            if(movePoint.pos.x >= last.pos.x && movePoint.pos.x >= next.pos.x)
            {//凸起位置
                movePoint.in.x = movePoint.pos.x;
                movePoint.in.y = (movePoint.pos.y + last.pos.y)/2
                movePoint.out.x = movePoint.pos.x;
                movePoint.out.y =  (movePoint.pos.y + next.pos.y)/2
                // element.out.y = (element.pos.y + next.pos.y)///2
            }
            else
            {
                movePoint.in.x = (last.pos.x + movePoint.pos.x)/2
                movePoint.in.y = (last.pos.y + movePoint.pos.y)/2
                movePoint.out.x = (next.pos.x + movePoint.pos.x)/2
                movePoint.out.y = (next.pos.y + movePoint.pos.y)/2
            }
        }


/*

        this.points.forEach((element)=>{
            let last = element.last;
            let next = element.next;

            if(last!=null && next!=null)
            {
                if(element.pos.x >= last.pos.x && element.pos.x >= next.pos.x)
                {//凸起位置
                    element.in.x = element.pos.x;
                    element.in.y = last.pos.y
                    element.out.x = element.pos.x;
                    element.out.y =  next.pos.y
                    // element.out.y = (element.pos.y + next.pos.y)///2
                }
                else
                {
                    element.in.x = (last.pos.x + element.pos.x)/2
                    element.in.y = (last.pos.y + element.pos.y)/2
                    element.out.x = (next.pos.x + element.pos.x)/2
                    element.out.y = (next.pos.y + element.pos.y)/2
                }
            }
        })
*/

        return new Beizer(this.points);
    }
    private getMirrorVector(startPos:Vector2,mirrorPos:Vector2):Vector2
    {
        return new Vector2(mirrorPos.x *  2- startPos.x,mirrorPos.y * 2 -startPos.y);
    }
       /**相邻控制的 是否需要移动 */
    private needMoveNext(movePoint: BeizerPoint, moveDis: number, curPoint: BeizerPoint): boolean {
        if(Math.abs(movePoint.pos.x -curPoint.pos.x) > 0.2)
        {
            if(movePoint.pos.x > curPoint.pos.x  && moveDis > 0)
                return true;
            if(movePoint.pos.x < curPoint.pos.x  && moveDis < 0)
            return true;
        }
        return false;
    }
    /**相邻控制的 移动的距离  */
    private getNextMoveDis(movePoint: BeizerPoint, moveDis: number, curPoint: BeizerPoint): number {
        let lastMoveDis: number = moveDis *0.3;
        return lastMoveDis;
    }
    /**
    * Y 轴 移动
    */
    public moveToY(moveDis: number,minHeight:number,maxHeight:number): Beizer{
        let curmaxHeight = this.getMaxHeight() ;
        let length = this.points.length;
        // let scale =moveDis/curmaxHeight;
        let move =moveDis/length ;
        let moveTmp = 0;
        // console.log(">>>>>>>> ",moveDis,curmaxHeight,moveDis +curmaxHeight ,maxHeight,minHeight)
        if((moveDis +curmaxHeight) > maxHeight || (moveDis +curmaxHeight) <minHeight  )
        {
            console.log(">>> 不过");
            return;
        }
        this.points.forEach(element => {
            element.pos.y = element.pos.y + moveTmp;
            if (element.in)
                element.in.y = element.in.y + moveTmp;
            if (element.out)
                element.out.y = element.out.y + moveTmp;
            moveTmp = move+moveTmp;
        });
        // console.log(">>>>>>>>add  ",moveTmp)
    }
    public getMaxHeight() {
        let y =0;
        this.points.forEach(element=> {
            if(element.pos.y>y)
            {
                y = element.pos.y;
            }
        });
        return y;
    }
}

export { Beizer, BeizerUserPoint, BeizerUnit, BeizerAction, BeizerPoint };
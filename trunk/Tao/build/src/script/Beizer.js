import { Vector2 } from "laya/d3/math/Vector2";
class BeizerPoint {
}
/**
 * 一个贝塞尔曲线的一段
 */
class BeizerUnit {
    /**构造函数 */
    constructor(start_point, end_point) {
        this.getPoint = function (t) {
            let x = this.bezierAt(this.start.x, this.startCtrlPoint.x, this.endCtrlPoint.x, this.end.x, t);
            let y = this.bezierAt(this.start.y, this.startCtrlPoint.y, this.endCtrlPoint.y, this.end.y, t);
            return new Vector2(x, y);
        };
        this.__arcLengthDivisions = 200;
        this.cacheArcLengths = null;
        this.getPointAt = function (u) {
            let t = this.getUtoTmapping(u);
            return this.getPoint(t);
        };
        this.start = start_point.pos;
        this.startCtrlPoint = start_point.out;
        this.end = end_point.pos;
        this.endCtrlPoint = end_point.in;
    }
    getLength() {
        let lengths = this.getLengths(null);
        return lengths[lengths.length - 1];
    }
    ;
    bezierAt(C1, C2, C3, C4, t) {
        let t1 = 1 - t;
        return C1 * t1 * t1 * t1 +
            C2 * 3 * t1 * t1 * t +
            C3 * 3 * t1 * t * t +
            C4 * t * t * t;
    }
    getLengths(divisions) {
        if (!divisions)
            divisions = (this.__arcLengthDivisions) ? (this.__arcLengthDivisions) : 200;
        if (this.cacheArcLengths
            && (this.cacheArcLengths.length === divisions + 1)) {
            return this.cacheArcLengths;
        }
        let cache = [];
        let current, last = this.getPoint(0);
        let p, sum = 0;
        cache.push(0);
        for (p = 1; p <= divisions; p++) {
            current = this.getPoint(p / divisions);
            let lenth_vec = new Vector2(current.x - last.x, current.y - last.y);
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
        }
        else {
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
            }
            else if (comparison > 0) {
                high = i - 1;
                continue;
            }
            else {
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
}
/**
 * 贝塞尔曲线
 */
class Beizer {
    /**构造函数 */
    constructor(points) {
        this.points = null;
        this.beziers = [];
        this.ratios = [];
        this.progresses = [];
        this.length = 0;
        this.m_begPoint = null;
        this.m_endPoind = null;
        this.points = points;
        this.initBeziers();
    }
    /**初始化贝塞尔曲线的数据 */
    initBeziers() {
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
        while (!this.m_endPoind.is_end) {
            this.m_endPoind.toNextPoint(1);
        }
    }
    /**获取某个单元结束点的切线 */
    GetDirectOfUnitEnd(unit_index) {
        let start_point = this.getFirstPoint();
        start_point.toNextPoint(this.progresses[unit_index] * this.length);
        return start_point.getDirection();
    }
    /**
     * 到下一个点
     * @param now_point 当前点的配置
     * @param distance  移动的距离
     */
    toNextPoint(now_point, distance) {
        //if (distance<= 0.0001) return;
        now_point.bezierProgress += distance / this.length;
        if (distance <= 0) {
            //回到原点
            if (now_point.bezierProgress <= 0) {
                let start = this.beziers[0].start;
                now_point.bezierProgress = 0;
                now_point.bezierIndex = 0;
                now_point.distance = 0; //已经运行的距离
                now_point.point.x = start.x;
                now_point.point.y = start.y;
                return;
            }
            //往回退一段
            while (now_point.bezierIndex > 0 && now_point.bezierProgress < this.progresses[now_point.bezierIndex - 1]) {
                now_point.bezierIndex--;
            }
        }
        //向前移动，如果到了下一段进行处理
        while (distance > 0 && now_point.bezierProgress > this.progresses[now_point.bezierIndex]) {
            if (now_point.bezierIndex >= this.progresses.length - 1) {
                //已经到最后面了，则设置为最后一个点
                now_point.is_end = true;
                let end = this.beziers[now_point.bezierIndex].end;
                now_point.point.x = end.x;
                now_point.point.y = end.y;
                now_point.distance = this.length * now_point.bezierProgress;
                return;
            }
            else {
                //还有下一段，在下一段计算坐标点
                now_point.bezierIndex++;
            }
        }
        let realProgress = (now_point.bezierProgress -
            (now_point.bezierIndex > 0 ? this.progresses[now_point.bezierIndex - 1] : 0)) / this.ratios[now_point.bezierIndex];
        let pos = this.beziers[now_point.bezierIndex].getPointAt(realProgress);
        now_point.point = pos;
        now_point.distance = this.length * now_point.bezierProgress;
    }
    /**
     * 获取第一个点的配置对象
     */
    getFirstPoint() {
        let now_point = new BeizerUserPoint(this);
        let start = this.beziers[0].start;
        now_point.point.x = start.x;
        now_point.point.y = start.y;
        return now_point;
    }
    /**获取最后一个点的坐标 */
    getLastPosition() {
        return this.beziers[this.beziers.length - 1].end.clone();
    }
    getLastDirect() {
        //let end_unit = this.beziers[this.beziers.length - 1];
        //return Utils.getAngleOrPoints(end_unit.end, end_unit.endCtrlPoint);
        return 0;
    }
    /**获取总长度 */
    getLenth() {
        return this.length;
    }
}
/**
 * 贝塞尔曲线用户对象
 */
class BeizerUserPoint {
    constructor(beizer) {
        this.bezierIndex = 0;
        this.bezierProgress = 0; //相对原点移动的比例
        this.distance = 0;
        this.beizer = null;
        this.point = new Vector2();
        this.layer = 1;
        this.is_end = false;
        this.beizer = beizer;
    }
    toNextPoint(distance) {
        this.beizer.toNextPoint(this, distance);
    }
    copy() {
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
    getDirection() {
        if (this.is_end) {
            return this.beizer.getLastDirect();
        }
        let direct = 0;
        let new_point = this.copy();
        new_point.toNextPoint(0.01);
        if (new_point.point.x != this.point.x && new_point.point.y != this.point.y) {
            return 0;
            // return Utils.getAngleOrPoints(this.point, new_point.point);
        }
        else {
            return 0;
        }
    }
}
class BeizerAction {
    constructor() {
        this.points = null;
    }
    /**
     * X 轴 移动
     */
    moveToX(movePoint, moveDis) {
        movePoint.pos.x = movePoint.pos.x + moveDis;
        if (movePoint.in)
            movePoint.in.x = movePoint.in.x + moveDis;
        if (movePoint.out)
            movePoint.out.x = movePoint.out.x + moveDis;
        if (movePoint.last != null) {
            if (this.needMove(movePoint, moveDis, movePoint.last)) { //上一个 控制的 也要移动
                this.moveToX(movePoint.last, this.getNextMoveDis(movePoint, moveDis, movePoint.last));
            }
        }
        if (movePoint.next != null) {
            if (this.needMove(movePoint, moveDis, movePoint.next)) { //下一个 控制的 也要移动
                this.moveToX(movePoint.next, this.getNextMoveDis(movePoint, moveDis, movePoint.next));
            }
        }
        return new Beizer(this.points);
    }
    /**相邻控制的 是否需要移动 */
    needMove(movePoint, moveDis, curPoint) {
        return false;
    }
    /**相邻控制的 移动的距离  */
    getNextMoveDis(movePoint, moveDis, curPoint) {
        let lastMoveDis = moveDis / 2;
        return lastMoveDis;
    }
    /**
    * Y 轴 移动
    */
    moveToY(movePoint, moveDis) {
        return new Beizer(this.points);
    }
}
export { Beizer, BeizerUserPoint, BeizerUnit, BeizerAction, BeizerPoint };

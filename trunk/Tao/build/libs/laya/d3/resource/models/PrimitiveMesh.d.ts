import { VertexDeclaration } from "../../graphics/VertexDeclaration";
import { Mesh } from "./Mesh";
/**
 * <code>PrimitiveMesh</code> 类用于创建简单网格。
 */
export declare class PrimitiveMesh {
    static __init__(): void;
    /**
     * @internal
     */
    static _createMesh(vertexDeclaration: VertexDeclaration, vertices: Float32Array, indices: Uint16Array): Mesh;
    /**
     * 创建Box网格。
     * @param long 半径
     * @param height 垂直层数
     * @param width 水平层数
     * @return
     */
    static createBox(long?: number, height?: number, width?: number): Mesh;
    /**
     * 创建一个胶囊体模型
     * @param radius 半径
     * @param height 高度
     * @param stacks 水平层数,一般设为垂直层数的一半
     * @param slices 垂直层数
     */
    static createCapsule(radius?: number, height?: number, stacks?: number, slices?: number): Mesh;
    /**
     * 创建一个圆锥体模型
     * @param radius 半径
     * @param height 高度
     * @param slices 分段数
     */
    static createCone(radius?: number, height?: number, slices?: number): Mesh;
    /**
     * 创建一个圆柱体模型
     * @param radius 半径
     * @param height 高度
     * @param slices 垂直层数
     */
    static createCylinder(radius?: number, height?: number, slices?: number): Mesh;
    /**
     * 创建一个圆柱体模型(中空)
     * @param radius 半径
     * @param height 高度
     * @param h_slices 垂直层数
     * @param l_slices 	水平切分数
     * 最终的点的数量为 :水平层数*垂直层数*2(内部)，以不超过1万面为目标，点数为5千，水平25，垂直200
     * 总点数=水平层数*垂直层数*2
     */
    static createMyCylinder(radius?: number, height?: number, h_slices?: number, slices?: number): Mesh;
    /**
     * 创建一个平面模型
     * @param long  长
     * @param width 宽
     */
    static createPlane(long?: number, width?: number, stacks?: number, slices?: number): Mesh;
    /**
     * 创建一个四边形模型
     * @param long  长
     * @param width 宽
     */
    static createQuad(long?: number, width?: number): Mesh;
    /**
     * 创建一个球体模型
     * @param radius 半径
     * @param stacks 水平层数
     * @param slices 垂直层数
     */
    static createSphere(radius?: number, stacks?: number, slices?: number): Mesh;
}

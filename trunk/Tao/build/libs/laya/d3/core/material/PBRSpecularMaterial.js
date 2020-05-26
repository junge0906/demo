import { Vector4 } from "../../math/Vector4";
import PBRPS from "../../shader/files/PBRSpecular.fs";
import PBRVS from "../../shader/files/PBRSpecular.vs";
import { Shader3D } from "../../shader/Shader3D";
import { SubShader } from "../../shader/SubShader";
import { PBRMaterial } from "./PBRMaterial";
import { VertexMesh } from "../../graphics/Vertex/VertexMesh";
/**
 * 光滑度数据源。
 */
export var PBRSpecularSmoothnessSource;
(function (PBRSpecularSmoothnessSource) {
    /**金属度贴图的Alpha通道。*/
    PBRSpecularSmoothnessSource[PBRSpecularSmoothnessSource["SpecularTextureAlpha"] = 0] = "SpecularTextureAlpha";
    /**反射率贴图的Alpha通道。*/
    PBRSpecularSmoothnessSource[PBRSpecularSmoothnessSource["AlbedoTextureAlpha"] = 1] = "AlbedoTextureAlpha";
})(PBRSpecularSmoothnessSource || (PBRSpecularSmoothnessSource = {}));
/**
 * <code>PBRSpecularMaterial</code> 类用于实现PBR(Specular)材质。
 */
export class PBRSpecularMaterial extends PBRMaterial {
    /**
     * 创建一个 <code>PBRSpecularMaterial</code> 实例。
     */
    constructor() {
        super();
        this.setShaderName("PBRSpecular");
        this._shaderValues.setVector(PBRSpecularMaterial.SPECULARCOLOR, new Vector4(0.2, 0.2, 0.2, 1.0));
    }
    /**
     * @internal
     */
    static __init__() {
        PBRSpecularMaterial.SHADERDEFINE_SPECULARGLOSSTEXTURE = Shader3D.getDefineByName("SPECULARGLOSSTEXTURE");
        PBRSpecularMaterial.SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA = Shader3D.getDefineByName("SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA");
        var attributeMap = {
            'a_Position': VertexMesh.MESH_POSITION0,
            'a_Normal': VertexMesh.MESH_NORMAL0,
            'a_Tangent0': VertexMesh.MESH_TANGENT0,
            'a_Texcoord0': VertexMesh.MESH_TEXTURECOORDINATE0,
            'a_Texcoord1': VertexMesh.MESH_TEXTURECOORDINATE1,
            'a_BoneWeights': VertexMesh.MESH_BLENDWEIGHT0,
            'a_BoneIndices': VertexMesh.MESH_BLENDINDICES0,
            'a_MvpMatrix': VertexMesh.MESH_MVPMATRIX_ROW0,
            'a_WorldMat': VertexMesh.MESH_WORLDMATRIX_ROW0
        };
        var uniformMap = {
            'u_Bones': Shader3D.PERIOD_CUSTOM,
            'u_MvpMatrix': Shader3D.PERIOD_SPRITE,
            'u_WorldMat': Shader3D.PERIOD_SPRITE,
            'u_LightmapScaleOffset': Shader3D.PERIOD_SPRITE,
            'u_LightMap': Shader3D.PERIOD_SPRITE,
            'u_CameraPos': Shader3D.PERIOD_CAMERA,
            'u_View': Shader3D.PERIOD_CAMERA,
            'u_ProjectionParams': Shader3D.PERIOD_CAMERA,
            'u_Viewport': Shader3D.PERIOD_CAMERA,
            'u_AlphaTestValue': Shader3D.PERIOD_MATERIAL,
            'u_AlbedoColor': Shader3D.PERIOD_MATERIAL,
            'u_EmissionColor': Shader3D.PERIOD_MATERIAL,
            'u_AlbedoTexture': Shader3D.PERIOD_MATERIAL,
            'u_NormalTexture': Shader3D.PERIOD_MATERIAL,
            'u_ParallaxTexture': Shader3D.PERIOD_MATERIAL,
            'u_OcclusionTexture': Shader3D.PERIOD_MATERIAL,
            'u_EmissionTexture': Shader3D.PERIOD_MATERIAL,
            'u_Smoothness': Shader3D.PERIOD_MATERIAL,
            'u_SmoothnessScale': Shader3D.PERIOD_MATERIAL,
            'u_occlusionStrength': Shader3D.PERIOD_MATERIAL,
            'u_NormalScale': Shader3D.PERIOD_MATERIAL,
            'u_ParallaxScale': Shader3D.PERIOD_MATERIAL,
            'u_TilingOffset': Shader3D.PERIOD_MATERIAL,
            'u_SpecGlossTexture': Shader3D.PERIOD_MATERIAL,
            'u_SpecularColor': Shader3D.PERIOD_MATERIAL,
            'u_ReflectTexture': Shader3D.PERIOD_SCENE,
            'u_ReflectIntensity': Shader3D.PERIOD_SCENE,
            'u_AmbientColor': Shader3D.PERIOD_SCENE,
            'u_FogStart': Shader3D.PERIOD_SCENE,
            'u_FogRange': Shader3D.PERIOD_SCENE,
            'u_FogColor': Shader3D.PERIOD_SCENE,
            'u_DirationLightCount': Shader3D.PERIOD_SCENE,
            'u_LightBuffer': Shader3D.PERIOD_SCENE,
            'u_LightClusterBuffer': Shader3D.PERIOD_SCENE,
            //Shadow
            'u_shadowMap1': Shader3D.PERIOD_SCENE,
            'u_shadowMap2': Shader3D.PERIOD_SCENE,
            'u_shadowMap3': Shader3D.PERIOD_SCENE,
            'u_shadowPSSMDistance': Shader3D.PERIOD_SCENE,
            'u_lightShadowVP': Shader3D.PERIOD_SCENE,
            'u_shadowPCFoffset': Shader3D.PERIOD_SCENE,
            //PBRGI
            'u_AmbientSHAr': Shader3D.PERIOD_SCENE,
            'u_AmbientSHAg': Shader3D.PERIOD_SCENE,
            'u_AmbientSHAb': Shader3D.PERIOD_SCENE,
            'u_AmbientSHBr': Shader3D.PERIOD_SCENE,
            'u_AmbientSHBg': Shader3D.PERIOD_SCENE,
            'u_AmbientSHBb': Shader3D.PERIOD_SCENE,
            'u_AmbientSHC': Shader3D.PERIOD_SCENE,
            'u_ReflectionProbe': Shader3D.PERIOD_SCENE,
            'u_ReflectCubeHDRParams': Shader3D.PERIOD_SCENE,
            //legacy lighting
            'u_DirectionLight.direction': Shader3D.PERIOD_SCENE,
            'u_DirectionLight.color': Shader3D.PERIOD_SCENE,
            'u_PointLight.position': Shader3D.PERIOD_SCENE,
            'u_PointLight.range': Shader3D.PERIOD_SCENE,
            'u_PointLight.color': Shader3D.PERIOD_SCENE,
            'u_SpotLight.position': Shader3D.PERIOD_SCENE,
            'u_SpotLight.direction': Shader3D.PERIOD_SCENE,
            'u_SpotLight.range': Shader3D.PERIOD_SCENE,
            'u_SpotLight.spot': Shader3D.PERIOD_SCENE,
            'u_SpotLight.color': Shader3D.PERIOD_SCENE
        };
        var stateMap = {
            's_Cull': Shader3D.RENDER_STATE_CULL,
            's_Blend': Shader3D.RENDER_STATE_BLEND,
            's_BlendSrc': Shader3D.RENDER_STATE_BLEND_SRC,
            's_BlendDst': Shader3D.RENDER_STATE_BLEND_DST,
            's_DepthTest': Shader3D.RENDER_STATE_DEPTH_TEST,
            's_DepthWrite': Shader3D.RENDER_STATE_DEPTH_WRITE
        };
        var shader = Shader3D.add("PBRSpecular");
        var subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(PBRVS, PBRPS, stateMap);
    }
    /**
     * 高光贴图。
     */
    get specularTexture() {
        return this._shaderValues.getTexture(PBRSpecularMaterial.SPECULARTEXTURE);
    }
    set specularTexture(value) {
        if (value)
            this._shaderValues.addDefine(PBRSpecularMaterial.SHADERDEFINE_SPECULARGLOSSTEXTURE);
        else
            this._shaderValues.removeDefine(PBRSpecularMaterial.SHADERDEFINE_SPECULARGLOSSTEXTURE);
        this._shaderValues.setTexture(PBRSpecularMaterial.SPECULARTEXTURE, value);
    }
    /**
     * 高光颜色。
     */
    get specularColor() {
        return this._shaderValues.getVector(PBRSpecularMaterial.SPECULARCOLOR);
    }
    set specularColor(value) {
        this._shaderValues.setVector(PBRSpecularMaterial.SPECULARCOLOR, value);
    }
    /**
     * 克隆。
     * @return	 克隆副本。
     * @override
     */
    clone() {
        var dest = new PBRSpecularMaterial();
        this.cloneTo(dest);
        return dest;
    }
}
/** @internal */
PBRSpecularMaterial.SPECULARTEXTURE = Shader3D.propertyNameToID("u_SpecularTexture");
/** @internal */
PBRSpecularMaterial.SPECULARCOLOR = Shader3D.propertyNameToID("u_SpecularColor");

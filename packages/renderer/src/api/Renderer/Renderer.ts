import {
    defQuadModel,
    defShader,
    defTexture,
    draw,
    ModelSpec,
    PASSTHROUGH_VS_UV,
    ShaderSpec,
    Texture,
    TextureFilter,
    defFBO,
    compileModel
} from '@thi.ng/webgl';
import { Context, Layer } from '@usealma/types';

import { RenderDisposer, RenderSequence } from './Renderer.types';

const createShaderSpec = (context: Context, textures?: [string, Texture][]): ShaderSpec => {
    const textureUniforms = textures?.reduce((acc, [key], index) => {
        return { ...acc, [key]: ['sampler2D', index] };
    }, {});

    return {
        vs: PASSTHROUGH_VS_UV,
        fs: context,
        uniforms: {
            uResolution: ['vec2', [0, 0]],
            uTime: ['float', 0],
            uMouse: ['vec4', [0, 0, 0, 0]],
            ...textureUniforms
        },
        attribs: { position: 'vec2', uv: 'vec2' },
        varying: { v_uv: 'vec2' }
    };
};

const createModel = (gl: WebGL2RenderingContext, shaderSpec: ShaderSpec, textures: Texture[]): ModelSpec => {
    return compileModel(gl, {
        ...defQuadModel({ uv: true }),
        shader: defShader(gl, shaderSpec),
        textures
    });
};

export const render = (
    gl: WebGL2RenderingContext,
    layers: Layer[]
): { sequence: RenderSequence; dispose: RenderDisposer } => {
    const { sequence } = layers.reduce<{ sequence: RenderSequence; previousLayerTexture: Texture | undefined }>(
        (
            { sequence, previousLayerTexture }: { sequence: RenderSequence; previousLayerTexture: Texture | undefined },
            currentLayer: Layer,
            index: number
        ): { sequence: RenderSequence; previousLayerTexture: Texture | undefined } => {
            const shouldRenderToCanvas = index === layers.length - 1;

            const renderTarget = shouldRenderToCanvas
                ? gl.canvas
                : defTexture(gl, {
                      width: gl.drawingBufferWidth,
                      height: gl.drawingBufferHeight,
                      filter: TextureFilter.LINEAR,
                      image: null
                  });

            const shaderSpec = createShaderSpec(
                currentLayer.context,
                previousLayerTexture ? [['uPreviousTexture', previousLayerTexture]] : undefined
            );

            const model = createModel(gl, shaderSpec, previousLayerTexture ? [previousLayerTexture] : []);

            const fbo = renderTarget instanceof Texture ? defFBO(gl, { tex: [renderTarget] }) : undefined;

            return {
                sequence: [...sequence, { model, fbo }],
                previousLayerTexture: renderTarget instanceof Texture ? renderTarget : undefined
            };
        },
        { sequence: [], previousLayerTexture: undefined }
    );

    let animationFrame: number;

    const update = () => {
        animationFrame = requestAnimationFrame(update);

        for (const { model, fbo } of sequence) {
            fbo?.bind();
            draw(model);
            fbo?.unbind();
        }
    };

    animationFrame = requestAnimationFrame(update);

    return {
        sequence,
        dispose: () => {
            cancelAnimationFrame(animationFrame);
        }
    };
};

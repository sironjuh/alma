import { float, Prim, sign } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLNodeType } from '../../../types';
import { ISignNodeInputs, ISignNodeOutputs, ISignNodeProps } from './SignNode.types';

export class SignNode extends PolymorphicNode {
    static icon = 'turn_sharp_right';
    static description =
        'Returns -1.0 if input is less than 0.0, 0.0 if input is equal to 0.0, and +1.0 if input is greater than 0.0.';

    static nodeName = 'Sign';
    type = WebGLNodeType.SIGN;

    inputs: ISignNodeInputs;
    outputs: ISignNodeOutputs;

    constructor(circuit: Circuit, props: ISignNodeProps = {}) {
        defaultsDeep(props, {
            data: {
                type: {
                    selected: 'float',
                    options: ['float', 'vec2', 'vec3', 'vec4']
                }
            }
        });

        super(circuit, props);

        this.inputs = {
            input: new Input(
                this,
                defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.input, {
                    name: 'Input',
                    type: 'float',
                    defaultValue: float(0)
                })
            )
        };

        this.outputs = {
            output: new Output(
                this,
                defaults<Partial<IOutputProps<Prim>> | undefined, IOutputProps<Prim>>(props.outputs?.output, {
                    name: 'Output',
                    type: 'float',
                    value: () => {
                        return sign(this.resolveValue(this.inputs.input.value));
                    }
                })
            )
        };
    }
}

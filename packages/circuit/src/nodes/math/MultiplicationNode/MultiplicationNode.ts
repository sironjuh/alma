import { float, mul } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { Circuit } from '../../../models/Circuit/Circuit';
import { WebGLNodeType } from '../../../types';
import {
    IMultiplicationNodeInputs,
    IMultiplicationNodeOutputs,
    IMultiplicationNodeProps
} from './MultiplicationNode.types';

export class MultiplicationNode extends PolymorphicNode {
    static icon = 'close';
    static description = 'Performs multiplication on the inputs.';

    static nodeName = 'Multiplication';
    type = WebGLNodeType.MULTIPLICATION;

    inputs: IMultiplicationNodeInputs;
    outputs: IMultiplicationNodeOutputs;

    constructor(circuit: Circuit, props: IMultiplicationNodeProps = {}) {
        defaultsDeep(props, {
            data: {
                type: {
                    selected: 'float',
                    options: ['float', 'int', 'vec2', 'vec3', 'vec4', 'mat2', 'mat3', 'mat4']
                }
            }
        });

        super(circuit, props);

        this.inputs = {
            a: new Input(
                this,
                defaults<Partial<IInputProps<'float'>> | undefined, IInputProps<'float'>>(props.inputs?.a, {
                    name: 'A',
                    type: 'float',
                    defaultValue: float(0)
                })
            ),
            b: new Input(
                this,
                defaults<Partial<IInputProps<'float'>> | undefined, IInputProps<'float'>>(props.inputs?.b, {
                    name: 'B',
                    type: 'float',
                    defaultValue: float(0)
                })
            )
        };

        this.outputs = {
            result: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.result, {
                    name: 'Result',
                    type: 'float',
                    value: () => {
                        return mul<'float', 'float'>(
                            this.resolveValue(this.inputs.a.value),
                            this.resolveValue(this.inputs.b.value)
                        );
                    }
                })
            )
        };
    }
}

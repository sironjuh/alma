import {
    AddOutlined,
    AllInclusiveOutlined,
    ArrowDownwardOutlined,
    ArrowUpwardOutlined,
    BoltOutlined,
    BorderVerticalOutlined,
    CallMadeOutlined,
    CallMissedOutgoingOutlined,
    CameraOutlined,
    CloseOutlined,
    DeblurOutlined,
    DeviceHubOutlined,
    DonutLargeOutlined,
    FiberManualRecordOutlined,
    FileDownloadDoneOutlined,
    GrainOutlined,
    GridOnOutlined,
    HorizontalRuleOutlined,
    KeyboardDoubleArrowDownOutlined,
    MonitorHeartOutlined,
    MultipleStopOutlined,
    OpenInFullOutlined,
    PanoramaOutlined,
    PercentOutlined,
    PieChartOutline,
    PolylineOutlined,
    RemoveOutlined,
    ReplyAllOutlined,
    ShowChartOutlined,
    ShuffleOutlined,
    StackedLineChartOutlined,
    SwapCallsOutlined,
    TextSnippetOutlined,
    TextureOutlined,
    TimerOutlined,
    TonalityOutlined,
    TurnSharpRightOutlined,
    UnfoldLessOutlined,
    VerticalAlignBottomOutlined,
    VerticalAlignTopOutlined
} from '@mui/icons-material';
import { WebGLNodeType } from '@usealma/webgl';

export const NODE_ICON_RESOLVER_MAP: { [key in WebGLNodeType]: typeof TonalityOutlined } = {
    [WebGLNodeType.WEBGL_CONTEXT]: DeblurOutlined,
    [WebGLNodeType.SIMPLEX_NOISE]: GrainOutlined,
    [WebGLNodeType.CAMERA]: CameraOutlined,
    [WebGLNodeType.SINE]: AllInclusiveOutlined,
    [WebGLNodeType.ARCSINE]: AllInclusiveOutlined,
    [WebGLNodeType.ARCCOSINE]: AllInclusiveOutlined,
    [WebGLNodeType.COSINE]: AllInclusiveOutlined,
    [WebGLNodeType.ADDITION]: AddOutlined,
    [WebGLNodeType.SUBTRACTION]: RemoveOutlined,
    [WebGLNodeType.MULTIPLICATION]: CloseOutlined,
    [WebGLNodeType.DIVISION]: ShowChartOutlined,
    [WebGLNodeType.FRACTIONAL]: StackedLineChartOutlined,
    [WebGLNodeType.MINIMUM]: ArrowDownwardOutlined,
    [WebGLNodeType.MAXIMUM]: ArrowUpwardOutlined,
    [WebGLNodeType.ABSOLUTE]: CallMissedOutgoingOutlined,
    [WebGLNodeType.SIGN]: TurnSharpRightOutlined,
    [WebGLNodeType.FLOOR]: VerticalAlignBottomOutlined,
    [WebGLNodeType.CEIL]: VerticalAlignTopOutlined,
    [WebGLNodeType.LENGTH]: CallMadeOutlined,
    [WebGLNodeType.DISTANCE]: OpenInFullOutlined,
    [WebGLNodeType.CROSS_PRODUCT]: ShuffleOutlined,
    [WebGLNodeType.DOT_PRODUCT]: MultipleStopOutlined,
    [WebGLNodeType.POWER]: BoltOutlined,
    [WebGLNodeType.SQUARE_ROOT]: FileDownloadDoneOutlined,
    [WebGLNodeType.INVERSE_SQUARE_ROOT]: FileDownloadDoneOutlined,
    [WebGLNodeType.NORMALIZE]: KeyboardDoubleArrowDownOutlined,
    [WebGLNodeType.TANGENT]: SwapCallsOutlined,
    [WebGLNodeType.ARCTANGENT]: AllInclusiveOutlined,
    [WebGLNodeType.RADIANS]: PieChartOutline,
    [WebGLNodeType.DEGREES]: FiberManualRecordOutlined,
    [WebGLNodeType.EXPONENTIATION]: MonitorHeartOutlined,
    [WebGLNodeType.LOGARITHM]: ReplyAllOutlined,
    [WebGLNodeType.GLSL]: TextSnippetOutlined,
    [WebGLNodeType.MODULO]: PercentOutlined,
    [WebGLNodeType.TEXTURE]: TextureOutlined,
    [WebGLNodeType.TIME]: TimerOutlined,
    [WebGLNodeType.SWIZZLE]: DeviceHubOutlined,
    [WebGLNodeType.CLAMP]: UnfoldLessOutlined,
    [WebGLNodeType.MIX]: TonalityOutlined,
    [WebGLNodeType.STEP]: HorizontalRuleOutlined,
    [WebGLNodeType.SMOOTHSTEP]: BorderVerticalOutlined,
    [WebGLNodeType.UV]: GridOnOutlined,
    [WebGLNodeType.VECTOR_2]: PolylineOutlined,
    [WebGLNodeType.VECTOR_3]: PolylineOutlined,
    [WebGLNodeType.VECTOR_4]: PolylineOutlined,
    [WebGLNodeType.PI]: DonutLargeOutlined,
    [WebGLNodeType.RESOLUTION]: PanoramaOutlined
};

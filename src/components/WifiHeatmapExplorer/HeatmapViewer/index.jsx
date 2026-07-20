import { useRef, useEffect } from 'react';
import { CELL_TYPE, CELL_CONFIGS } from '../lib/CellTypes.js';
import { drawOuterBorder, drawRouter } from '../lib/CanvasUtils.js';
import GenerationSelector from './GenerationSelector.jsx';

// ---------------------------------------------------------------------------
// Signal: color
// Dark Blue = no signal, red = weak, yellow = medium, green = strong
// ---------------------------------------------------------------------------

const COLOR_STOPS = [
    [239, 68,  68],  // red:        weak   (0.0)
    [234, 179,  8],  // yellow:     medium (0.5)
    [ 34, 197, 94],  // green:      strong (1.0)
];

function signalToColor(value) {
    if (value <= 0) return '#0f172a'; // no signal

    const t = Math.max(0, Math.min(1, value));
    const [a, b, f] = t <= 0.5
        ? [COLOR_STOPS[0], COLOR_STOPS[1], t / 0.5]
        : [COLOR_STOPS[1], COLOR_STOPS[2], (t - 0.5) / 0.5];

    return `rgb(${Math.round(a[0]+(b[0]-a[0])*f)},${Math.round(a[1]+(b[1]-a[1])*f)},${Math.round(a[2]+(b[2]-a[2])*f)})`;
}

// ---------------------------------------------------------------------------
// Canvas draw
// ---------------------------------------------------------------------------

function drawHeatmap(ctx, state, cellSize, heatmap) {
    const { grid, gridWidth, gridHeight, router } = state;
    const W = gridWidth  * cellSize;
    const H = gridHeight * cellSize;

    ctx.clearRect(0, 0, W, H);

    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            ctx.fillStyle = signalToColor(heatmap[y * gridWidth + x]);
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

    ctx.save();
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const cellType = grid[y * gridWidth + x];
            if (cellType === CELL_TYPE.EMPTY) continue;
            const config = CELL_CONFIGS[cellType];
            ctx.globalAlpha = 0.55;
            ctx.fillStyle   = config.color;
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = config.edgeColor;
            ctx.lineWidth   = 0.5;
            ctx.strokeRect(x * cellSize + 0.5, y * cellSize + 0.5, cellSize - 1, cellSize - 1);
        }
    }
    ctx.restore();

    // Reusable canvas helpers
    drawOuterBorder(ctx, W, H);
    drawRouter(ctx, router, cellSize, '#ffffff', '#0f172a');
}

// ---------------------------------------------------------------------------
// Legend
// ---------------------------------------------------------------------------

const LEGEND = [
    { label: 'No signal', color: '#0d1b2e',                            border: true },
    { label: 'Weak',      color: `rgb(${COLOR_STOPS[0].join(',')})`,  border: false },
    { label: 'Medium',    color: `rgb(${COLOR_STOPS[1].join(',')})`,  border: false },
    { label: 'Strong',    color: `rgb(${COLOR_STOPS[2].join(',')})`,  border: false },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeatmapViewer({ state, dispatch, cellSize, generations }) {
    const canvasRef = useRef(null);
    const { activeGeneration, heatmaps } = state;
    const heatmap    = heatmaps[activeGeneration];
    const generation = generations[activeGeneration];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !heatmap) return;
        drawHeatmap(canvas.getContext('2d'), state, cellSize, heatmap);
    }, [state, cellSize, heatmap]);

    return (
        <div className="flex flex-col gap-3 w-full">

            <GenerationSelector
                activeIndex={activeGeneration}
                generations={generations}
                onSelect={(index) => dispatch({ type: 'SET_GENERATION', index })}
            />

            <canvas
                ref={canvasRef}
                width={state.gridWidth  * cellSize}
                height={state.gridHeight * cellSize}
                className="block border border-border rounded-sm w-full h-auto aspect-4/3"
            />

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {LEGEND.map(({ label, color, border }) => (
                    <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span
                            className="inline-block w-3 h-3 rounded-sm shrink-0"
                            style={{
                                backgroundColor: color,
                                border: border ? '1px solid #1e293b' : '1px solid transparent',
                            }}
                        />
                        {label}
                    </div>
                ))}
            </div>

            {/* Generation summary */}
            {generation?.description && (
                <p className="text-sm text-muted-foreground border-l-2 border-border pl-3 leading-relaxed">
                    {generation.description}
                </p>
            )}

        </div>
    );
}
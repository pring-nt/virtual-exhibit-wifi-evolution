import { useRef, useEffect, useState } from 'react';
import { CELL_CONFIGS } from '../lib/CellTypes.js';
import MaterialToolbar from './MaterialToolbar.jsx';
import RouterMarker from './RouterMarker.jsx';

// ---------------------------------------------------------------------------
// Drawing constants
// ---------------------------------------------------------------------------

const GRID_LINE_COLOR = '#e2e8f0';
const ROUTER_COLOR    = '#2563eb';
const ROUTER_SELECTED = '#f59e0b';
const ROUTER_OUTLINE  = '#ffffff';

// ---------------------------------------------------------------------------
// Canvas draw — called via useEffect, not during render
// ---------------------------------------------------------------------------

/**
 * Redraws the entire floor plan onto the canvas.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {object} state
 * @param {number} cellSize
 * @param {boolean} isRouterSelected
 */
function drawFloorplan(ctx, state, cellSize, isRouterSelected) {
    const { grid, gridWidth, gridHeight, router } = state;
    const W = gridWidth  * cellSize;
    const H = gridHeight * cellSize;

    ctx.clearRect(0, 0, W, H);

    // --- Cells ---
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const config = CELL_CONFIGS[grid[y * gridWidth + x]];
            ctx.fillStyle = config.color;
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

    // --- Grid lines (batched into one path for performance) ---
    ctx.beginPath();
    for (let x = 0; x <= gridWidth; x++) {
        ctx.moveTo(x * cellSize + 0.5, 0);
        ctx.lineTo(x * cellSize + 0.5, H);
    }
    for (let y = 0; y <= gridHeight; y++) {
        ctx.moveTo(0,  y * cellSize + 0.5);
        ctx.lineTo(W, y * cellSize + 0.5);
    }
    ctx.strokeStyle = GRID_LINE_COLOR;
    ctx.lineWidth   = 0.5;
    ctx.stroke();

    // --- Outer border ---
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth   = 1;
    ctx.strokeRect(0.5, 0.5, W - 1, H - 1);

    // --- Router ---
    const cx = router.x * cellSize + cellSize / 2;
    const cy = router.y * cellSize + cellSize / 2;
    const r  = cellSize * 0.36;

    ctx.fillStyle   = isRouterSelected ? ROUTER_SELECTED : ROUTER_COLOR;
    ctx.strokeStyle = ROUTER_OUTLINE;
    ctx.lineWidth   = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * @param {{ state: object, dispatch: Function, cellSize: number }} props
 */
export default function FloorplanEditor({ state, dispatch, cellSize }) {
    const canvasRef = useRef(null);

    // Router selection is local UI state: no need to put it in the reducer
    const [isRouterSelected, setIsRouterSelected] = useState(false);

    // isDragging tracks click-drag painting; a ref avoids triggering re-renders on mousemove
    const isDragging = useRef(false);

    // Redraw whenever grid, router position, or router selection changes
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        drawFloorplan(ctx, state, cellSize, isRouterSelected);
    }, [state, cellSize, isRouterSelected]);

    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------

    function getCellCoords(e) {
        const rect = canvasRef.current.getBoundingClientRect();
        return {
            x: Math.floor((e.clientX - rect.left) / cellSize),
            y: Math.floor((e.clientY - rect.top)  / cellSize),
        };
    }

    function inBounds(x, y) {
        return x >= 0 && x < state.gridWidth && y >= 0 && y < state.gridHeight;
    }

    // ---------------------------------------------------------------------------
    // Mouse handlers
    // ---------------------------------------------------------------------------

    function handleMouseDown(e) {
        const { x, y } = getCellCoords(e);
        if (!inBounds(x, y)) return;

        // Clicked the router → select it for placement
        if (x === state.router.x && y === state.router.y) {
            setIsRouterSelected(true);
            return;
        }

        // Router is selected: move it to the clicked cell (reducer validates wall constraint)
        if (isRouterSelected) {
            dispatch({ type: 'MOVE_ROUTER', x, y });
            setIsRouterSelected(false);
            return;
        }

        // Otherwise → start painting
        isDragging.current = true;
        dispatch({ type: 'PAINT_CELL', x, y });
    }

    function handleMouseMove(e) {
        if (!isDragging.current) return;
        const { x, y } = getCellCoords(e);
        if (!inBounds(x, y)) return;
        dispatch({ type: 'PAINT_CELL', x, y });
    }

    function handleMouseUp() {
        isDragging.current = false;
    }

    function handleMouseLeave() {
        isDragging.current = false;
    }

    // ---------------------------------------------------------------------------
    // Render
    // ---------------------------------------------------------------------------

    const cursorClass = isRouterSelected ? 'cursor-cell' : 'cursor-crosshair';

    return (
        <div className="flex flex-col gap-3">

            <MaterialToolbar state={state} dispatch={dispatch} />

            <canvas
                ref={canvasRef}
                width={state.gridWidth  * cellSize}
                height={state.gridHeight * cellSize}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                className={`block border border-slate-200 rounded-sm select-none ${cursorClass}`}
            />

            <RouterMarker
                router={state.router}
                isRouterSelected={isRouterSelected}
                onDeselect={() => setIsRouterSelected(false)}
            />

        </div>
    );
}
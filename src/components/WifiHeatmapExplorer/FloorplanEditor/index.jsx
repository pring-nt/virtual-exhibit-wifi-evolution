import { useRef, useEffect, useState } from 'react';
import { CELL_CONFIGS } from '../lib/CellTypes.js';
import MaterialToolbar from './MaterialToolbar.jsx';
import RouterMarker from './RouterMarker.jsx';

// ---------------------------------------------------------------------------
// Drawing constants
// ---------------------------------------------------------------------------

const ROUTER_COLOR    = '#38bdf8';
const ROUTER_SELECTED = '#f59e0b';
const ROUTER_OUTLINE  = '#0f172a';
const GRID_LINE_COLOR = '#1e293b';

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

    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            ctx.fillStyle = CELL_CONFIGS[grid[y * gridWidth + x]].color;
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

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
 * @param {{
 *   state: object,
 *   dispatch: Function,
 *   cellSize: number,
 *   onViewHeatmap?: () => void
 * }} props
 */
export default function FloorplanEditor({ state, dispatch, cellSize, onViewHeatmap }) {
    const canvasRef = useRef(null);
    const [isRouterSelected, setIsRouterSelected] = useState(false);
    const isDragging = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        drawFloorplan(canvas.getContext('2d'), state, cellSize, isRouterSelected);
    }, [state, cellSize, isRouterSelected]);

    // Update cursor directly on canvas DOM node — avoids re-renders on every mouse move
    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.style.cursor = isRouterSelected ? 'cell' : 'crosshair';
        }
    }, [isRouterSelected]);

    /**
     * Normalizes both mouse and touch coordinates to internal grid cells,
     * accounting for any CSS scaling applied to the canvas.
     */
    function getCellCoords(e) {
        const canvas = canvasRef.current;
        if (!canvas) return { x: -1, y: -1 };

        const rect = canvas.getBoundingClientRect();

        // Extract coordinates from either mouse or touch events
        const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;

        // Calculate scale ratios (e.g., internal 640px width vs rendered 350px width)
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const canvasX = (clientX - rect.left) * scaleX;
        const canvasY = (clientY - rect.top)  * scaleY;

        return {
            x: Math.floor(canvasX / cellSize),
            y: Math.floor(canvasY / cellSize),
        };
    }

    function inBounds(x, y) {
        return x >= 0 && x < state.gridWidth && y >= 0 && y < state.gridHeight;
    }

    function handleStart(e) {
        if (e.cancelable) e.preventDefault();

        const { x, y } = getCellCoords(e);
        if (!inBounds(x, y)) return;

        if (x === state.router.x && y === state.router.y) {
            setIsRouterSelected(true);
            return;
        }
        if (isRouterSelected) {
            dispatch({ type: 'MOVE_ROUTER', x, y });
            setIsRouterSelected(false);
            return;
        }
        isDragging.current = true;
        dispatch({ type: 'PAINT_CELL', x, y });
    }

    function handleMove(e) {
        if (e.cancelable) e.preventDefault();
        const { x, y } = getCellCoords(e);

        // Update cursor when hovering over the router cell (only applicable for mouse)
        if (canvasRef.current && !isRouterSelected && !e.touches) {
            const overRouter = x === state.router.x && y === state.router.y;
            canvasRef.current.style.cursor = overRouter ? 'pointer' : 'crosshair';
        }

        if (!isDragging.current) return;
        if (!inBounds(x, y)) return;
        dispatch({ type: 'PAINT_CELL', x, y });
    }

    function handleEnd(e) {
        if (e && e.cancelable) e.preventDefault();
        isDragging.current = false;
    }

    return (
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <MaterialToolbar
                state={state}
                dispatch={dispatch}
                isRouterSelected={isRouterSelected}
                onMoveRouter={() => setIsRouterSelected(true)}
                onClearAll={() => dispatch({ type: 'CLEAR_GRID' })}
                onViewHeatmap={onViewHeatmap}
            />

            <canvas
                ref={canvasRef}
                width={state.gridWidth  * cellSize}
                height={state.gridHeight * cellSize}
                onMouseDown={handleStart}
                onMouseMove={handleMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
                onTouchCancel={handleEnd}
                className="block border border-border rounded-sm select-none w-full h-auto aspect-[4/3] touch-none"
            />

            <RouterMarker
                router={state.router}
                isRouterSelected={isRouterSelected}
                onDeselect={() => setIsRouterSelected(false)}
            />
        </div>
    );
}
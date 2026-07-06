import { useReducer } from 'react';
import { Button } from '@/components/ui/button';

import { CELL_TYPE } from './lib/CellTypes.js';
import { GENERATIONS } from './lib/Generations.js';
import { computeAllHeatmaps } from './lib/Propagation.js';

import FloorplanEditor from './FloorplanEditor/index.jsx';
import HeatmapViewer from './HeatmapViewer/index.jsx';

// ---------------------------------------------------------------------------
// Grid config
// ---------------------------------------------------------------------------

const GRID_WIDTH  = 40;
const GRID_HEIGHT = 30;
const CELL_SIZE   = 16;
const CANVAS_W    = GRID_WIDTH  * CELL_SIZE; // 640 — drives all container widths

// ---------------------------------------------------------------------------
// Preset floor plan
// Gives new users something interesting to look at immediately.
// ---------------------------------------------------------------------------

function createPresetGrid(gridWidth, gridHeight) {
    const grid = new Uint8Array(gridWidth * gridHeight);

    const set = (x, y, type) => {
        if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight)
            grid[y * gridWidth + x] = type;
    };
    const hLine = (y, x1, x2, type) => { for (let x = x1; x <= x2; x++) set(x, y, type); };
    const vLine = (x, y1, y2, type) => { for (let y = y1; y <= y2; y++) set(x, y, type); };

    hLine(0,              0, gridWidth - 1,  CELL_TYPE.CONCRETE);
    hLine(gridHeight - 1, 0, gridWidth - 1,  CELL_TYPE.CONCRETE);
    vLine(0,              0, gridHeight - 1, CELL_TYPE.CONCRETE);
    vLine(gridWidth - 1,  0, gridHeight - 1, CELL_TYPE.CONCRETE);

    hLine(14, 1, 4,   CELL_TYPE.CONCRETE);
    hLine(14, 7, 11,  CELL_TYPE.CONCRETE);
    hLine(14, 12, 17, CELL_TYPE.DRYWALL);

    hLine(14, 20, 31, CELL_TYPE.DRYWALL);

    hLine(14, 34, gridWidth - 2, CELL_TYPE.DRYWALL);

    vLine(11, 1, 13, CELL_TYPE.CONCRETE);

    vLine(3, 3, 10, CELL_TYPE.METAL);
    vLine(5, 3, 10, CELL_TYPE.METAL);
    vLine(7, 3, 10, CELL_TYPE.METAL);
    vLine(9, 3, 10, CELL_TYPE.METAL);


    vLine(25, 1, 13, CELL_TYPE.DRYWALL);

    set(25, 5, 0);
    set(25, 6, 0);


    hLine(7, 15, 21, CELL_TYPE.METAL);
    hLine(8, 15, 21, CELL_TYPE.METAL);


    hLine(6, 26, gridWidth - 2, CELL_TYPE.DRYWALL);

    set(30, 6, 0);
    set(31, 6, 0);

    set(36, 2, CELL_TYPE.METAL);
    set(37, 2, CELL_TYPE.METAL);
    set(37, 3, CELL_TYPE.METAL);

    vLine(18, 15, gridHeight - 2, CELL_TYPE.DRYWALL);

    set(18, 19, 0);
    set(18, 20, 0);

    hLine(26, 2, 8, CELL_TYPE.METAL);
    vLine(2, 21, 25, CELL_TYPE.METAL);

    set(6,  17, CELL_TYPE.METAL);
    set(12, 17, CELL_TYPE.METAL);
    set(12, 22, CELL_TYPE.METAL);

    hLine(17, 21, 24, CELL_TYPE.METAL);
    hLine(17, 29, 34, CELL_TYPE.METAL);

    hLine(21, 26, gridWidth - 2, CELL_TYPE.CONCRETE);
    vLine(26, 21, gridHeight - 2, CELL_TYPE.CONCRETE);

    set(26, 24, 0);
    set(26, 25, 0);

    hLine(24, 30, 34, CELL_TYPE.METAL);
    hLine(25, 30, 34, CELL_TYPE.METAL);
    hLine(26, 30, 34, CELL_TYPE.METAL);

    return grid;
}

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function createInitialState() {
    return {
        mode:             'floorplan',
        gridWidth:        GRID_WIDTH,
        gridHeight:       GRID_HEIGHT,
        grid:             createPresetGrid(GRID_WIDTH, GRID_HEIGHT),
        router:           { x: 10, y: 7 },
        activeMaterial:   CELL_TYPE.DRYWALL,
        activeGeneration: 0,
        heatmaps:         [],
    };
}

function reducer(state, action) {
    switch (action.type) {

        case 'SET_MODE': {
            if (action.mode === state.mode) return state;
            if (action.mode === 'heatmap') {
                const heatmaps = computeAllHeatmaps(
                    state.grid, state.gridWidth, state.gridHeight,
                    state.router, GENERATIONS,
                );
                return { ...state, mode: 'heatmap', heatmaps };
            }
            return { ...state, mode: 'floorplan', heatmaps: [] };
        }

        case 'PAINT_CELL': {
            const { x, y } = action;
            if (x === state.router.x && y === state.router.y) return state;
            const idx = y * state.gridWidth + x;
            if (state.grid[idx] === state.activeMaterial) return state;
            const newGrid = state.grid.slice();
            newGrid[idx] = state.activeMaterial;
            return { ...state, grid: newGrid };
        }

        case 'SET_MATERIAL':
            return { ...state, activeMaterial: action.material };

        case 'MOVE_ROUTER': {
            const { x, y } = action;
            if (state.grid[y * state.gridWidth + x] !== CELL_TYPE.EMPTY) return state;
            return { ...state, router: { x, y } };
        }

        case 'SET_GENERATION':
            return { ...state, activeGeneration: action.index };

        case 'CLEAR_GRID':
            return { ...state, grid: new Uint8Array(state.gridWidth * state.gridHeight) };

        default:
            return state;
    }
}

// ---------------------------------------------------------------------------
// Root component
// ---------------------------------------------------------------------------

export default function WifiHeatmapExplorer() {
    const [state, dispatch] = useReducer(reducer, null, createInitialState);

    const isHeatmap = state.mode === 'heatmap';

    return (
        <div className="wifi-explorer flex flex-col gap-3 w-fit">

            {/* Mode toggle — fixed to canvas width so it never jumps */}
            <div
                className="flex items-center gap-2"
                style={{ width: CANVAS_W }}
            >
                <Button
                    variant={isHeatmap ? 'outline' : 'default'}
                    size="sm"
                    onClick={() => dispatch({ type: 'SET_MODE', mode: 'floorplan' })}
                >
                    Edit Floor Plan
                </Button>
                <Button
                    variant={isHeatmap ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => dispatch({ type: 'SET_MODE', mode: 'heatmap' })}
                >
                    View Heatmap
                </Button>
            </div>

            {/* Active mode — constrained to canvas width so both modes are the same size */}
            <div style={{ width: CANVAS_W }}>
                {isHeatmap ? (
                    <HeatmapViewer
                        state={state}
                        dispatch={dispatch}
                        cellSize={CELL_SIZE}
                        generations={GENERATIONS}
                    />
                ) : (
                    <FloorplanEditor
                        state={state}
                        dispatch={dispatch}
                        cellSize={CELL_SIZE}
                    />
                )}
            </div>

        </div>
    );
}
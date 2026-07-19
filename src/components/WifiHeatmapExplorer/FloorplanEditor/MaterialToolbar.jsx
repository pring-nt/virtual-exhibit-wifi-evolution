import { Trash2, Move, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CELL_TYPE, CELL_CONFIGS } from '../lib/CellTypes.js';

const MATERIALS = [
    CELL_CONFIGS[CELL_TYPE.EMPTY],
    CELL_CONFIGS[CELL_TYPE.DRYWALL],
    CELL_CONFIGS[CELL_TYPE.CONCRETE],
    CELL_CONFIGS[CELL_TYPE.METAL],
];

/**
 * @param {{
 *   state: object,
 *   dispatch: Function,
 *   isRouterSelected: boolean,
 *   onMoveRouter: () => void,
 *   onClearAll: () => void,
 *   onViewHeatmap?: () => void,
 * }} props
 */
export default function MaterialToolbar({
                                            state,
                                            dispatch,
                                            isRouterSelected,
                                            onMoveRouter,
                                            onClearAll,
                                            onViewHeatmap
                                        }) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-2 w-full min-w-0">

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto min-w-0">
                {MATERIALS.map((config) => {
                    const isActive = state.activeMaterial === config.type && !isRouterSelected;
                    return (
                        <Button
                            key={config.key}
                            variant={isActive ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => dispatch({ type: 'SET_MATERIAL', material: config.type })}
                            className="gap-1.5 flex-1 sm:flex-initial min-w-[70px] text-xs px-2"
                        >
                            <span
                                className="inline-block w-3 h-3 rounded-sm border border-border shrink-0"
                                style={{ backgroundColor: config.color }}
                            />
                            {config.type === CELL_TYPE.EMPTY ? 'Eraser' : config.label}
                        </Button>
                    );
                })}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto min-w-0">
                <Button
                    variant={isRouterSelected ? 'default' : 'outline'}
                    size="sm"
                    onClick={onMoveRouter}
                    className="gap-1.5 flex-initial text-xs whitespace-nowrap"
                >
                    <Move size={14} className="shrink-0" />
                    Router
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={onClearAll}
                    className="gap-1.5 flex-initial text-xs whitespace-nowrap"
                >
                    <Trash2 size={14} className="shrink-0" />
                    Clear
                </Button>

                {onViewHeatmap && (
                    <Button
                        variant="default"
                        size="sm"
                        onClick={onViewHeatmap}
                        className="gap-1.5 flex-initial text-xs whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                    >
                        <Eye size={14} className="shrink-0" />
                        View Heatmap
                    </Button>
                )}
            </div>

        </div>
    );
}
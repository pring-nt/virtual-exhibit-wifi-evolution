import { Trash2, Move } from 'lucide-react';
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
 * }} props
 */
export default function MaterialToolbar({ state, dispatch, isRouterSelected, onMoveRouter, onClearAll }) {
    return (
        <div className="flex items-center justify-between gap-2 w-full">

            {/* Wall material brushes */}
            <div className="flex items-center gap-1.5">
                {MATERIALS.map((config) => {
                    const isActive = state.activeMaterial === config.type && !isRouterSelected;
                    return (
                        <Button
                            key={config.key}
                            variant={isActive ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => dispatch({ type: 'SET_MATERIAL', material: config.type })}
                            className="gap-1.5"
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

            {/* Action buttons */}
            <div className="flex items-center gap-1.5">
                <Button
                    variant={isRouterSelected ? 'default' : 'outline'}
                    size="sm"
                    onClick={onMoveRouter}
                    className="gap-1.5"
                >
                    <Move size={14} />
                    Router
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onClearAll}
                    className="gap-1.5"
                >
                    <Trash2 size={14} />
                    Clear
                </Button>
            </div>

        </div>
    );
}
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
 *   onDeselect?: () => void,
 *   onClearAll: () => void,
 * }} props
 */
export default function MaterialToolbar({
                                            state,
                                            dispatch,
                                            isRouterSelected,
                                            onMoveRouter,
                                            onDeselect,
                                            onClearAll,
                                        }) {
    // Switches tool & exits router mode
    const handleMaterialSelect = (materialType) => {
        dispatch({ type: 'SET_MATERIAL', material: materialType });
        if (isRouterSelected && onDeselect) {
            onDeselect();
        }
    };

    // Toggles router mode on/off
    const handleRouterClick = () => {
        if (isRouterSelected && onDeselect) {
            onDeselect();
        } else {
            onMoveRouter();
        }
    };

    return (
        <div className="flex flex-col gap-3 w-full min-w-0 sm:flex-row sm:items-center sm:justify-between sm:gap-2">

            {/* Material Selector Grid */}
            <div className="grid grid-cols-2 gap-1.5 w-full min-w-0 xs:grid-cols-4 sm:flex sm:items-center sm:w-auto">
                {MATERIALS.map((config) => {
                    const isActive = state.activeMaterial === config.type && !isRouterSelected;
                    return (
                        <Button
                            key={config.type}
                            variant={isActive ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleMaterialSelect(config.type)}
                            className="gap-1.5 w-full justify-center text-xs px-2 h-9 sm:w-auto sm:min-w-[75px]"
                        >
                            <span
                                className="inline-block w-3 h-3 rounded-sm border border-border shrink-0"
                                style={{ backgroundColor: config.color }}
                            />
                            <span className="truncate">
                                {config.type === CELL_TYPE.EMPTY ? 'Eraser' : config.label}
                            </span>
                        </Button>
                    );
                })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 w-full min-w-0 sm:w-auto">
                <Button
                    variant={isRouterSelected ? 'default' : 'outline'}
                    size="sm"
                    onClick={handleRouterClick}
                    className="gap-1.5 flex-1 justify-center text-xs whitespace-nowrap h-9 sm:flex-initial"
                >
                    <Move size={14} className="shrink-0" />
                    <span>Router</span>
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={onClearAll}
                    className="gap-1.5 flex-1 justify-center text-xs whitespace-nowrap h-9 sm:flex-initial"
                >
                    <Trash2 size={14} className="shrink-0" />
                    <span>Clear</span>
                </Button>
            </div>

        </div>
    );
}
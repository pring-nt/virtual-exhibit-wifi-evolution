import { Button } from '@/components/ui/button';

/**
 * RouterMarker
 * Status bar beneath the canvas. Shows router position normally;
 * shows a prominent placement prompt when router is selected.
 */
export default function RouterMarker({ router, isRouterSelected, onDeselect }) {
    if (isRouterSelected) {
        return (
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 px-3 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-sm shadow-sm transition-all">
                <div className="flex items-center gap-2 py-0.5">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 animate-pulse" />
                    <span className="text-amber-200 font-medium leading-snug">
                        Tap or click any empty cell to place the router
                    </span>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onDeselect}
                    className="h-7 px-2.5 text-xs font-semibold border-amber-500/40 bg-amber-500/20 hover:bg-amber-500/30 !text-amber-200 hover:!text-amber-100 shrink-0"
                >
                    Cancel
                </Button>
            </div>
        );
    }

    return (
        <div className="flex items-start sm:items-center gap-2 text-xs px-1 min-h-9 py-1 leading-relaxed">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0 mt-1 sm:mt-0" />
            <span className="text-muted-foreground">
                Router at ({router.x}, {router.y}); tap the router or use the Router button to move it
            </span>
        </div>
    );
}
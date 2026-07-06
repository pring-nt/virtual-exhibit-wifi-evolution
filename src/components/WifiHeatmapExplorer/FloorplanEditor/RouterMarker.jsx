/**
 * RouterMarker
 * Status bar beneath the canvas. Shows router position normally;
 * shows a prominent placement prompt when router is selected.
 */
export default function RouterMarker({ router, isRouterSelected, onDeselect }) {
    if (isRouterSelected) {
        return (
            <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-sm bg-amber-50 border border-amber-200 text-sm">
                <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                    <span className="text-amber-800 font-medium">
            Click any empty cell to place the router
          </span>
                </div>
                <button
                    onClick={onDeselect}
                    className="text-amber-500 hover:text-amber-700 text-xs underline shrink-0"
                >
                    Cancel
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 text-xs text-muted-foreground px-0.5 h-9">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
            <span>Router at ({router.x}, {router.y}); click the router or use the Router button to move it</span>
        </div>
    );
}
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * GenerationSelector
 *
 * Renders a tab strip for switching between WiFi generations.
 * The canvas content is controlled by the parent — no TabsContent needed here.
 *
 * @param {{
 *   activeIndex: number,
 *   generations: import('../lib/Generations.js').Generation[],
 *   onSelect: (index: number) => void,
 * }} props
 */
export default function GenerationSelector({ activeIndex, generations, onSelect }) {
    const active = generations[activeIndex];

    return (
        <div className="flex flex-col gap-2">

            <Tabs value={String(activeIndex)} onValueChange={(v) => onSelect(Number(v))}>
                <TabsList className="w-full flex flex-wrap h-auto p-1 gap-1">
                    {generations.map((gen, i) => (
                        <TabsTrigger
                            key={gen.id}
                            value={String(i)}
                            className="flex-1 min-w-[70px] py-1.5 text-xs"
                        >
                            {gen.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            {/* Detail row for the active generation — added flex-wrap to prevent overflow */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground px-0.5">
                <span className="font-mono font-medium text-foreground">{active.standard}</span>
                <span>·</span>
                <span>{active.year}</span>
                <span>·</span>
                <span>{active.frequencyBand}</span>
            </div>

        </div>
    );
}
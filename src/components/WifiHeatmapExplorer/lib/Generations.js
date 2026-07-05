/**
 * generations.js
 * Per-generation WiFi router specs that feed into the propagation model.
 *
 * maxStrength:     Starting signal budget (higher = stronger router, more range).
 *                  Open-space range ≈ maxStrength / distanceCostPerCell.
 *
 * frequencyBand:   Affects per-step distance falloff.
 *                  2.4 GHz travels further; 5 GHz drops off faster but has higher throughput.
 *                  See DISTANCE_COST in propagation.js.
 *
 * wallPenetration: Multiplier applied to each wall's attenuation value.
 *                  < 1.0 = better penetration (walls hurt less).
 *                  > 1.0 = worse penetration (walls hurt more, typical of 5 GHz early gen).
 *
 * @typedef {Object} Generation
 * @property {string} id
 * @property {string} label           - Short display name, e.g. "WiFi 4"
 * @property {string} standard        - IEEE standard, e.g. "802.11n"
 * @property {string} year            - Year of introduction
 * @property {number} maxStrength
 * @property {'2.4GHz'|'5GHz'|'dual'} frequencyBand
 * @property {number} wallPenetration
 */

/** @type {Generation[]} */
export const GENERATIONS = [
    {
        id:              'wifi1',
        label:           'WiFi 1',
        standard:        '802.11b',
        year:            '1999',
        maxStrength:     60,
        frequencyBand:   '2.4GHz',
        wallPenetration: 1.0,
        // Open-space range ≈ 30 cells (2.4 GHz falloff = 2.0/cell)
    },
    {
        id:              'wifi2',
        label:           'WiFi 2',
        standard:        '802.11a',
        year:            '1999',
        maxStrength:     55,
        frequencyBand:   '5GHz',
        wallPenetration: 1.4,
        // 5 GHz: shorter range (~16 cells) and worse wall penetration
        // Demonstrates the core 5 GHz vs 2.4 GHz tradeoff
    },
    {
        id:              'wifi3',
        label:           'WiFi 3',
        standard:        '802.11g',
        year:            '2003',
        maxStrength:     70,
        frequencyBand:   '2.4GHz',
        wallPenetration: 1.0,
        // Stronger than 802.11b at the same frequency, range ≈ 35 cells
    },
    {
        id:              'wifi4',
        label:           'WiFi 4',
        standard:        '802.11n',
        year:            '2009',
        maxStrength:     85,
        frequencyBand:   'dual',
        wallPenetration: 0.85,
        // MIMO introduced — first generation with meaningfully better wall penetration
    },
    {
        id:              'wifi5',
        label:           'WiFi 5',
        standard:        '802.11ac',
        year:            '2013',
        maxStrength:     95,
        frequencyBand:   '5GHz',
        wallPenetration: 1.1,
        // 5 GHz only, high throughput but range (~27 cells) limited by frequency
    },
    {
        id:              'wifi6',
        label:           'WiFi 6',
        standard:        '802.11ax',
        year:            '2019',
        maxStrength:     110,
        frequencyBand:   'dual',
        wallPenetration: 0.7,
        // OFDMA + BSS coloring — significantly better wall penetration, range ≈ 44 cells
    },
    {
        id:              'wifi6e',
        label:           'WiFi 6E',
        standard:        '802.11ax (6 GHz)',
        year:            '2021',
        maxStrength:     120,
        frequencyBand:   'dual',
        wallPenetration: 0.6,
        // 6 GHz band unlocked — strongest overall, best penetration, range ≈ 48 cells
    },
];
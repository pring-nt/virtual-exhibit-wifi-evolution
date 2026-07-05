# [The Evolution of Wi-Fi]([https://docs.google.com/document/d/1PpgzTTaoYTDf0LYQLVLaEKhknVlml7rv/edit](https://docs.google.com/document/d/1PpgzTTaoYTDf0LYQLVLaEKhknVlml7rv/edit?usp=sharing&ouid=118258009009741865506&rtpof=true&sd=true))

**CSARCH2 | 3rd Term 2025–2026 | S01 |Group No. 6**

> *A Hardware/Software Deep-Dive exhibit tracing the history of Wi-Fi standards from 802.11b to Wi-Fi 7.*

**Submitted by:**
- Joshua Nacasabog
- Jaica Pascual
- Nathan Trinidad
- Enzo Rosas
- Jann Miro Quilantang

---

## Table of Contents

- [Topic Theme](#-topic-theme)
- [Background Overview](#-background-overview)
- [Theme Overview](#-theme-overview)
  - [Wi-Fi Generations](#wi-fi-generations)
- [Key Content Areas](#-key-content-areas)
- [Tech Stack](#-tech-stack)
  - [Core Technologies](#core-technologies)
  - [Interactive Elements](#interactive-elements)
- [Style Guide](#-style-guide)
  - [Layout & Spacing](#layout--spacing)
  - [UI Components & Tone](#ui-components--tone)
- [Design Mockups](#-design-mockups)

---

## Topic Theme

**Theme:** Hardware/Software Deep-Dive

**Chosen Topic:** The Evolution of Wi-Fi

---

## Background Overview

The history of Wi-Fi technology is long and varied, depending on who you ask.

Dating back to 1980 in IBM's Rueschlikon Laboratory, Zurich, Switzerland, research on the early conceptions of the wireless local area network (WLAN) using IR technology for manufacturing floors was conducted in order to beat the then-popular wired local area networks (LAN). By 1985, the Federal Communications Commission (FCC) opened ISM frequency bands for unlicensed industrial usage with restrictions on having to use spread spectrums, laying the groundwork for the wireless communications we've come to know. In 1997, the IEEE released its first legacy 802.11 standard, and by 1999, the Wi-Fi Alliance was established, and IEEE 802.11b was released, with a 2.4 GHz band, being the first version released worldwide for commercial use. From there, each new generation of the standard brought better reliability, speeds, and range — from 11 Mbps of the 802.11b to the multi-gigabit capabilities of Wi-Fi 7 today.

Regardless of its origins, it may not be hyperbolic to say that Wi-Fi and the advent of wireless technology have helped shape our world into a more interconnected and communicative one.

---

## Theme Overview

The exhibit covers the evolution of Wi-Fi standards over the decades, from the original 802.11b in 1999 to the latest Wi-Fi 7. The exhibit aims to highlight how each generation of technology gradually improved its speed, range, and reliability in everyday environments.

### Wi-Fi Generations

| Standard | Year | Also Known As | Key Highlights |
|---|---|---|---|
| 802.11b | 1999 | Wi-Fi 1 | 2.4 GHz, 11 Mbps max, CCK modulation |
| 802.11a | 1999 | — | 5 GHz, 54 Mbps, OFDM |
| 802.11g | 2003 | — | 2.4 GHz, 54 Mbps, OFDM, backward compatible with 802.11b |
| 802.11n | 2009 | Wi-Fi 4 | Dual-band (2.4 + 5 GHz), MIMO introduced |
| 802.11ac | 2013 | Wi-Fi 5 | 5 GHz, gigabit speeds, MU-MIMO |
| 802.11ax | 2020 | Wi-Fi 6/6E | Dual-band, reduced subcarrier spacing, scheduled resource allocation |
| 802.11be | Present | Wi-Fi 7 | Up to 46 Gbps, 320 MHz channels, Multi-Link Operation |

#### <mark>802.11b (1999)</mark>
<mark>Also known as Wi-Fi 1, it operates on an unlicensed ISM frequency with a channel bandwidth of 22 MHz, with a maximum theoretical output of 11 Mbps and a fallback of 1–2 Mbps. It used complex M-Ary orthogonal coding known as Complementary Code Keying (CCK). It was considered ineffective because other wireless methods of the time shared the same range and caused interference in the Wi-Fi signals.</mark>

#### <mark>802.11a (1999)</mark>
<mark>Unlike the 802.11b, this one operated on the 5 GHz band using OFDM (Orthogonal Frequency Division Multiplexing), offering speeds up to 54 Mbps. Although faster than 802.11b, it has a shorter range and less wall penetration.</mark>

#### <mark>802.11g (2003)</mark>
<mark>Used the same OFDM tech as 802.11a, but combined both of the better qualities of 802.11a and 802.11b, offering higher speeds with broader range and backward compatibility with 802.11b.</mark>

#### <mark>802.11n (2009)</mark>
<mark>First one to be actually considered good enough for commercial use. It combined both the 2.4 GHz and 5 GHz bands of 802.11a and 802.11b while introducing MIMO (Multiple Input Multiple Output).</mark>

#### <mark>802.11ac (2013)</mark>
<mark>First Wi-Fi standard to provide gigabit speeds per second. Operated on the 5 GHz band and introduced wider channels and multi-user MIMO.</mark>

#### <mark>802.11ax (2020)</mark>
<mark>Also known as Wi-Fi 6E, it was the one that introduced dual-band support across both 2.4 GHz and 5 GHz, reduced subcarrier spacing (78.125 kHz), and schedule-based resource allocation.</mark>

#### <mark>802.11be (Present)</mark>
<mark>Also known as Wi-Fi 7, it is backwards compatible with Wi-Fi 6E, uses OFDMA, and operates in both 2.4 and 5.6 GHz, supports up to 46 Gbps, introduces 320 MHz channels, and Multi-Link Operation.</mark>

---

## Key Content Areas

The exhibit will cover the following content areas:

- **Frequency Bands** and what they mean
- **How Wi-Fi shaped the information age**
- **Per-generation comparison:** 802.11b to 802.11be
- **Real World vs. Theoretical Performance**

---

## Tech Stack

### Core Technologies

| Category | Technology |
|---|---|
| Framework | Astro 6 |
| Runtime | Node.js 26 |
| Content Format | `.mdx` (Markdown Extended) |
| Component Language | React (`.jsx` / `.tsx`) |
| Version Control | GitHub (forked from provided template) |
| CSS Framework | TailwindCSS v4 |
| UI Components | Shadcn/ui |
| Icons | Lucide Icons |
| State Management | Zustand |

### Interactive Elements

#### Wi-Fi Floor Plan Simulator

A drag-and-drop 2D floor plan builder where users construct a room, place a router, and toggle a signal strength heatmap. The heatmap behavior updates when the user switches between Wi-Fi generations, visually demonstrating how different standards handle range, frequency, and obstacle penetration differently.

**The Grid**

The floor plan is a tile-based rectangular grid (e.g., 20×15 cells) rendered top-down. Each cell represents a unit of space. Users interact with the grid by dragging blocks from a side palette and dropping them onto cells.

**Placeable Blocks**

| Block Type | Signal Effect |
|---|---|
| Empty space | No attenuation |
| Interior wall | Moderate signal reduction |
| Concrete/exterior wall | Heavy signal reduction |
| Wooden furniture | Minor reduction |
| Metal appliance | Strong reduction/reflection |

**Router Placement**

A router token can be freely dragged and dropped anywhere on the grid. It acts as the signal origin point for the heatmap calculation.

**Heatmap Toggle**

A "Show Heatmap" button overlays a canvas layer on top of the grid using radial gradient painting that propagates outward from the router tile. Signal strength drops as it passes through obstacle tiles based on each block's attenuation value.

| Color | Signal Strength |
|---|---|
| Deep Crimson / Vibrant Red | Strong Signal (Peak Intensity) |
| Fiery Orange / Golden Orange | Moderate Signal |
| Warm Yellow / Light Yellow | Weak Signal |
| Light Gray | Dead Zone (Zero Signal / No Access) |

The canvas redraws in real time whenever blocks are moved, the router is repositioned, or the Wi-Fi generation is switched.

**Wi-Fi Generation Switcher**

A tab/strip selector above the floor plan lets users cycle through generations:

```
802.11b → 802.11g → 802.11n → 802.11ac → 802.11ax → 802.11be
```

Selecting a generation updates both of its sub-views:

<mark>

- **Information Tab:** Displays a card outlining the generation's core specifications (e.g. frequency band, max theoretical vs. real-world throughput, modulation techniques like CCK/DSSS, and historical context).
- **Simulator Tab:** Adjusts the heatmap model — e.g., 2.4 GHz generations show wider range but worse interference handling; 5 GHz generations show faster speeds but shorter range and weaker wall penetration.

</mark>

---

## Style Guide

### Layout & Spacing

<mark>The exhibit will use a clean and organized layout with the Wi-Fi workspace as the main focus of the page. The workspace will feature a two-tab interface centered on the page, defaulting to the Information tab while allowing users to switch to the Simulator tab. The control buttons, such as "Place Router," "Reset," and "Show Heatmap," will be grouped near the floor plan within the Simulator tab for easy access. A heatmap legend will be placed beside or below the simulator to help users understand the signal strength colors. Proper spacing will be used between the buttons, legend, floor plan, and information cards to keep the interface readable and not overcrowded.</mark>

### UI Components & Tone

<mark>The main UI component of the exhibit will be an interactive Wi-Fi workspace driven by a generation selector, which defaults to a pre-selected Wi-Fi generation upon loading. The workspace is split into two primary views, with the Information tab displayed by default:

- **Information Tab:** The initial active view, which displays a dedicated technical breakdown and history card for the currently selected Wi-Fi generation, outlining its specific frequency bands, throughput limits, modulation techniques, and real-world context.

- **Simulator Tab:** <mark>Features a draggable router sprite that users can place anywhere on the floor plan grid. Once the router is placed, the signal strength heatmap will update depending on the router's position and the surrounding obstacles, such as walls, furniture, concrete barriers, metal appliances, and other interference sources. The heatmap will visually show how the Wi-Fi signal spreads across the room, with colors indicating excellent, strong, moderate, fair, weak, or very weak/dead-zone areas. Users will also be able to customize their own floor plans by placing or removing objects on the grid, allowing them to experiment with how different layouts affect Wi-Fi coverage.</mark>

<mark>Additional UI components within the Simulator tab will include a reset button, a router placement mode, a floor plan editing toolbar, and a heatmap toggle button.</mark> A side palette from the floor plan editing toolbar may be used to let users drag and drop different objects, such as interior walls, concrete walls, wooden furniture, metal appliances, and interference sources. A Wi-Fi generation selector is included above the workspace so users can compare how different Wi-Fi standards affect signal range, speed, and obstacle penetration. To make the simulator easier to understand, the interface will include a color legend for the heatmap and an information card that updates based on the selected Wi-Fi generation.

---

## Design Mockups

### Figure 1 — Information Tab (802.11b)

![Information Tab Mockup](./assets/InformationTab.png)

> *Mockup of the Information tab displaying the technical breakdown and history card for 802.11b.*

---

### Figure 2 — Simulator Tab (802.11b)

![Simulator Tab Mockup](./assets/InteractiveElement.png)

> *Mockup of the Simulator tab showing the floor plan grid, router placement, and heatmap overlay for 802.11b.*

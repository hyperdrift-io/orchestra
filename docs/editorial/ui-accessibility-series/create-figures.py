"""Editable, deterministic figures for the UI and accessibility series.

One visual system across the six pieces: cream is the person, teal is the app,
program or agent, gold is the work itself, coral is a break or a closed door.
Geometry never encodes speed or performance; the only measured values are
WebAIM's, drawn to scale.

From the app root:
  python3 docs/editorial/ui-accessibility-series/create-figures.py
  bash docs/editorial/ui-accessibility-series/render-figures.sh
"""
from pathlib import Path
from html import escape

OUT = Path('public/articles/ui-accessibility')

INK = '#14120e'; INK2 = '#1b1813'; ELEV = '#221e18'; SOFT = '#2b261f'
CREAM = '#f6eee1'; CREAM3 = '#c8beae'; DIM = '#8f8576'; HAIR = '#3a342b'
GOLD = '#e3a857'; GOLDL = '#f4cd92'; GOLDD = '#b98038'; GOLDBG = '#2a2112'; BAND = '#1e1a13'
TEAL = '#90c5b8'; TEALD = '#2c4a43'; TEALT = '#d6efe8'
RED = '#e8a18a'; REDBG = '#22160f'; REDD = '#3b211a'

# Classes are prefixed: inline SVG <style> is global to the page. The article CSS maps
# them onto the site's loaded font variables; these stacks serve standalone files.
STYLE = (
    "<style>"
    ".x-d{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500}"
    ".x-i{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-style:italic}"
    ".x-s{font-family:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif}"
    ".x-m{font-family:'IBM Plex Mono',Menlo,monospace;letter-spacing:.06em}"
    "</style>"
)


# Title and long description per figure: the SVG <title>/<desc>, the page's figure
# label and its written explanation all come from here.
TEXT = {
    'routes': ('Who does the work?',
            'One job in five stages — want, find, do, check, fix — across five ways to direct an app. With direct controls the person carries every stage. With an API or CLI a program runs the steps the person defines. With WebMCP, voice over an app and the proposed voice through MCP, the app or agent finds and does the steps; checking happens in a view the person shares, and fixing stays with the person. Voice through MCP forks across two apps. Conceptual: who carries each stage, not how fast. The routes coexist.'),
    'access': ('The scan checks the front door',
            'WebAIM detected WCAG failures on 95.9% of one million home pages in February 2026, with 56.1 detected errors per page on average. Each square is one percentage point; the 96th is 90% filled. The remaining 4.1% had no detected failures, which is unknown rather than accessible. A home-page scan covers the first stop of an illustrative booking journey; finding a date, comparing places, checking an access need, fixing details and saving the booking are not measured by it.'),
    'webmcp': ('Stop making agents hunt for buttons',
            'Inside the Radar Explore page, a founder clicks Keep while a browser agent calls a tool the page declares through WebMCP: search_items, read_item, propose_founder_profile, suggest_item, set_aside_items, read_workspace or draft_brief. Without declared tools, an agent wanders across the screen guessing which button does what. The button and the tool reach the same shared workspace functions and change the same shortlist. Outside the page, an assistant reaches a service through an MCP server: no open page, a different scope with its own checks.'),
    'cargo': ('A spoken promise is not a completed action',
            'From the recorded Cargo sandbox take. The captain says “Cargo.” The First Officer reports it stopped answering a minute ago and offers options. The captain says “Bring it back.” The officer accepts the order while the service is still recovering, probes Cargo from outside, and only after it answers twice replies: “Captain, Cargo answers again. Checked twice, 75 milliseconds.” Sequence, not to scale.'),
    'mcp': ('One sentence, two scopes, no send',
            'Illustrative request: “Find the release blockers and prepare a note for the team.” An assistant interprets it and keeps every source. The first part goes to a project tracker MCP server with a read-blockers scope; the second to a writing workspace with a create-draft scope. Each server checks its own permission. Sending to the team was not asked for and stays closed: delivery is the person’s decision. A correction, “use the mobile release, not the web release”, must replace the selection and revise the same draft. Proposed experiment, not yet run.'),
    'continuity': ('Change the input, keep the work',
            'A proposed scenario: a person speaks criteria and gets three grants with evidence, drops one by keyboard, hears the comparison through a screen reader, loses the voice session, then returns later. When the work lives in the conversation, each switch can mean starting again. When it lives in the task, the two remaining grants, the decision and the evidence survive every switch. A design goal, not an observed result.'),
}
SLUGS = {
    'routes': ('is-ui-holding-us-back', 'routes'),
    'access': ('web-accessibility-can-people-finish', 'accessibility'),
    'webmcp': ('webmcp-actions-on-the-page', 'webmcp'),
    'cargo': ('hands-free-app-control', 'cargo'),
    'mcp': ('voice-through-mcp', 'mcp'),
    'continuity': ('future-ui-keep-your-place', 'continuity'),
}


# ── primitives ──────────────────────────────────────────────────────────────

def t(x, y, value, size=20, fill=CREAM, cls='s', anchor='start'):
    """Text. `value` may carry tspans; plain strings must be escaped by the caller."""
    return (f'<text x="{x:g}" y="{y:g}" class="x-{cls}" font-size="{size}" fill="{fill}" '
            f'text-anchor="{anchor}">{value}</text>')


def lines(x, y, rows, size=20, fill=CREAM, cls='s', anchor='start', lead=1.32):
    return ''.join(t(x, y + i * size * lead, escape(r), size, fill, cls, anchor) for i, r in enumerate(rows))


def span(value, fill, cls=None):
    c = f' class="x-{cls}"' if cls else ''
    return f'<tspan fill="{fill}"{c}>{escape(value)}</tspan>'


def em(value):
    """Gold italic emphasis inside a display line, as the site's h1 em."""
    return span(value, GOLDL, 'i')


def path(d, stroke=GOLD, width=2, dash=None, fill='none'):
    dash_attr = f' stroke-dasharray="{dash}"' if dash else ''
    return (f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{width}" '
            f'stroke-linecap="round" stroke-linejoin="round"{dash_attr}/>')


def line(x, y, xx, yy, stroke=HAIR, width=1.5, dash=None):
    return path(f'M{x:g} {y:g}L{xx:g} {yy:g}', stroke, width, dash)


def circle(x, y, r, fill=INK, stroke=None, width=2, dash=None):
    s = f' stroke="{stroke}" stroke-width="{width}"' if stroke else ''
    d = f' stroke-dasharray="{dash}"' if dash else ''
    return f'<circle cx="{x:g}" cy="{y:g}" r="{r:g}" fill="{fill}"{s}{d}/>'


def rect(x, y, w, h, fill=INK2, stroke=None, r=8, width=1.5, dash=None):
    s = f' stroke="{stroke}" stroke-width="{width}"' if stroke else ''
    d = f' stroke-dasharray="{dash}"' if dash else ''
    return f'<rect x="{x:g}" y="{y:g}" width="{w:g}" height="{h:g}" rx="{r}" fill="{fill}"{s}{d}/>'


def pill(x, y, label, fill, ink=INK, size=13, anchor='start'):
    """Mono capsule; (x, y) is the text baseline at the anchored edge."""
    w = len(label) * size * .66 + 24
    left = x - w / 2 if anchor == 'middle' else (x - w if anchor == 'end' else x)
    return rect(left, y - size - 6, w, size + 13, fill, r=(size + 13) / 2) + t(left + w / 2, y, escape(label), size, ink, 'm', 'middle')


def check(x, y, s=1, stroke=TEAL, width=2.4):
    return path(f'M{x - 6 * s:g} {y:g}l{4 * s:g} {4.5 * s:g}l{8 * s:g} {-9 * s:g}', stroke, width)


def cross(x, y, s=1, stroke=RED, width=2.4):
    return path(f'M{x - 5 * s:g} {y - 5 * s:g}l{10 * s:g} {10 * s:g}M{x + 5 * s:g} {y - 5 * s:g}l{-10 * s:g} {10 * s:g}', stroke, width)


def head(x, y, direction, fill=GOLD, size=9):
    """Solid arrowhead with its tip at (x, y)."""
    s = size
    pts = {'r': f'{x},{y} {x - s},{y - s * .6} {x - s},{y + s * .6}',
           'l': f'{x},{y} {x + s},{y - s * .6} {x + s},{y + s * .6}',
           'd': f'{x},{y} {x - s * .6},{y - s} {x + s * .6},{y - s}',
           'u': f'{x},{y} {x - s * .6},{y + s} {x + s * .6},{y + s}'}[direction]
    return f'<polygon points="{pts}" fill="{fill}"/>'


def smooth(points):
    """Cubic through points with horizontal tangents: a calm handover between levels."""
    d = f'M{points[0][0]:g} {points[0][1]:g}'
    for (x0, y0), (x1, y1) in zip(points, points[1:]):
        mx = (x0 + x1) / 2
        d += f'C{mx:g} {y0:g} {mx:g} {y1:g} {x1:g} {y1:g}'
    return d


def frame(name, w, h, part, title_rows, deck_rows, body, evidence, slug, label, mobile=False):
    """Shared header, stacked footer and accessible name for every figure."""
    s = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" '
         f'role="img" aria-labelledby="{name}-title {name}-desc">'
         f'<title id="{name}-title">{escape(label[0])}</title><desc id="{name}-desc">{escape(label[1])}</desc>'
         f'{STYLE}<rect width="{w}" height="{h}" fill="{INK}"/>')
    x = 32 if mobile else 56
    s += t(x, 54, f'PART {part} OF 6 · UI &amp; ACCESSIBILITY', 14 if mobile else 13, GOLD, 'm')
    size = 46 if mobile else 54
    y = 54 + size * 1.25
    for row in title_rows:
        s += t(x, y, row, size, CREAM, 'd')
        y += size * 1.02
    s += lines(x, y + 6, deck_rows, 22 if mobile else 20, CREAM3, 's', lead=1.4)
    s += body
    foot = h - (92 if mobile else 88)
    s += line(x, foot, w - x, foot, HAIR, 1)
    s += t(x, foot + 30, escape(evidence), 14 if mobile else 13, CREAM3, 'm')
    s += t(x, foot + 58, escape(f'ai.hyperdrift.io/articles/{slug}'), 14 if mobile else 13, GOLD, 'm')
    return s + '</svg>'


def save(name, svg):
    (OUT / f'{name}.svg').write_text(svg + '\n')


# ── 1 · Who does the work? ─────────────────────────────────────────────────
# One job in five stages, passing between the person and the machine.
# Levels: 0 = person, 1 = shared view, 2 = app, program or agent.

STAGES = ['Want', 'Find', 'Do', 'Check', 'Fix']
ROUTES = [
    ('controls', 'Direct controls', 'You operate every step', [0, 0, 0, 0, 0], {}),
    ('api-cli', 'API / CLI', 'A program runs the steps you define', [0, 0, 2, 0, 0], {2: 'script runs'}),
    ('webmcp', 'WebMCP', 'The page declares its own tools', [0, 2, 2, 1, 0], {1: 'page tool', 3: 'shared page'}),
    ('voice-app', 'Voice over an app', 'Speech starts the work', [0, 2, 2, 1, 0], {2: 'app acts', 3: 'checked twice'}),
    ('voice-mcp', 'Voice through MCP', 'Proposed: one sentence, many apps', [0, 2, 2, 1, 0], {3: 'with sources'}),
]


def node(x, y, level, r=10):
    if level == 0:
        return circle(x, y, r, CREAM)
    if level == 2:
        return circle(x, y, r, TEAL)
    return circle(x, y, r, TEAL) + f'<path d="M{x:g} {y - r:g}A{r} {r} 0 0 0 {x:g} {y + r:g}Z" fill="{CREAM}"/>'


def route_row(route_id, levels, notes, xs, top, gap, mobile):
    ys = [top + level * gap / 2 for level in levels]
    note_size = 15
    if route_id == 'voice-mcp':
        # The sentence forks across two services at Do, then rejoins for review.
        fork = 13 if mobile else 12
        a = smooth([(xs[0], ys[0]), (xs[1], ys[1]), (xs[2], ys[2] - fork), (xs[3], ys[3]), (xs[4], ys[4])])
        b = smooth([(xs[1], ys[1]), (xs[2], ys[2] + fork), (xs[3], ys[3])])
        body = path(a, GOLD, 3, '2 8') + path(b, GOLD, 3, '2 8')
        body += ''.join([node(xs[0], ys[0], 0), node(xs[1], ys[1], 2), node(xs[2], ys[2] - fork, 2, 8),
                         node(xs[2], ys[2] + fork, 2, 8), node(xs[3], ys[3], 1), node(xs[4], ys[4], 0)])
        body += t(xs[2], ys[2] + fork + 26, 'two apps', note_size, TEAL, 's', 'middle')
    else:
        # pathLength lets the page draw the selected route in, stage by stage.
        trace = path(smooth(list(zip(xs, ys))), GOLD, 3).replace('<path ', '<path pathLength="1" ', 1)
        body = f'<g data-trace="">{trace}</g>'
        body += ''.join(node(x, y, lv) for x, y, lv in zip(xs, ys, levels))
    for i, note in notes.items():
        ny = ys[i] + (24 if levels[i] > 0 else -18)
        body += t(xs[i], ny, escape(note), note_size, TEAL if levels[i] == 2 else CREAM3, 's', 'middle')
    return body


def figure_routes(mobile):
    if mobile:
        w, h = 600, 1500
        xs = [80, 195, 310, 425, 540]
        stage_y, band_top, band_bottom = 252, 228, 1226
        row0, step = 330, 175
    else:
        w, h = 1000, 1060
        xs = [372, 486, 600, 772, 886]
        stage_y, band_top, band_bottom = 246, 222, 884
        row0, step = 316, 106
    bx0 = (xs[2] + xs[3]) / 2 + 8
    bx1 = w - (20 if mobile else 40)
    b = rect(bx0, band_top, bx1 - bx0, band_bottom - band_top, BAND, GOLDD, 10, 1, '3 6')
    for i, (x, stage) in enumerate(zip(xs, STAGES)):
        b += t(x, stage_y, f'0{i + 1}', 13 if mobile else 12, DIM, 'm', 'middle')
        b += t(x, stage_y + 24, stage.upper(), 16, CREAM, 'm', 'middle')
    for i, (route_id, label, sub, levels, notes) in enumerate(ROUTES):
        top = row0 + i * step
        colour = GOLDL if route_id == 'voice-mcp' else CREAM
        if mobile:
            g = t(32, top, escape(label), 27, colour, 'd') + t(32, top + 22, escape(sub), 15, CREAM3)
            lane, gap = top + 56, 58
        else:
            g = t(56, top + 8, escape(label), 27, colour, 'd') + t(56, top + 33, escape(sub), 16, CREAM3)
            lane, gap = top - 4, 56
        g += line(xs[0] - 22, lane, xs[-1] + 22, lane, '#2f2a22', 1, '1 5')
        g += line(xs[0] - 22, lane + gap, xs[-1] + 22, lane + gap, TEALD, 1, '1 5')
        g += route_row(route_id, levels, notes, xs, lane, gap, mobile)
        b += f'<g data-route="{route_id}">{g}</g>'
    # What moves, and what stays.
    by = band_bottom - 36
    b += path(f'M{xs[1] - 22} {by - 8}V{by}H{xs[2] + 22}V{by - 8}', TEAL, 1.5)
    b += t((xs[1] + xs[2]) / 2, by + 22, 'THE STEPS MOVE', 13, TEAL, 'm', 'middle')
    b += t((bx0 + bx1) / 2, by + 22, 'JUDGEMENT' if mobile else 'JUDGEMENT STAYS WITH YOU', 13, GOLD, 'm', 'middle')
    if mobile:
        ly = 1276
        b += node(40, ly - 5, 0, 8) + t(56, ly, 'You', 16, CREAM3)
        b += node(122, ly - 5, 2, 8) + t(138, ly, 'App, program or agent', 16, CREAM3)
        b += node(352, ly - 5, 1, 8) + t(368, ly, 'Shared view', 16, CREAM3)
        b += t(32, 1340, 'The steps move.', 34, CREAM, 'd')
        b += t(32, 1380, 'The judgement stays with ' + em('you') + '.', 34, CREAM, 'd')
    else:
        b += node(64, 245, 0, 7) + t(78, 250, 'You', 15, CREAM3)
        b += node(128, 245, 2, 7) + t(142, 250, 'App, program or agent', 15, CREAM3)
        b += node(64, 271, 1, 7) + t(78, 276, 'Shared view', 15, CREAM3)
        b += t(56, 942, 'The steps move. The judgement stays with ' + em('you') + '.', 36, CREAM, 'd')
    return frame('routes' + ('-m' if mobile else ''), w, h, 1,
                 ['Who does the ' + em('work') + '?'],
                 ['One job, five ways to direct an app.'] if not mobile else ['One job, five ways to direct', 'an app.'],
                 b, 'CONCEPTUAL · WHO, NOT HOW FAST · ROUTES COEXIST', 'is-ui-holding-us-back', TEXT['routes'], mobile)


# ── 2 · The scan checks the front door ─────────────────────────────────────

JOURNEY = ['Home page', 'Find a date', 'Compare places', 'Check access', 'Fix details', 'Save booking']


def waffle(x0, y0, pitch, cell):
    b = ''
    for i in range(100):
        x = x0 + (i % 10) * pitch
        y = y0 + (i // 10) * pitch
        if i < 95:
            b += rect(x, y, cell, cell, GOLD, r=3)
        elif i == 95:
            # 95.9%: the 96th cell is 90% filled, not rounded up.
            b += rect(x, y, cell, cell, INK, GOLDD, 3, 1) + rect(x, y, cell * .9, cell, GOLD, r=3)
        else:
            b += rect(x, y, cell, cell, INK, CREAM3, 3, 1.2, '3 3')
            b += t(x + cell / 2, y + cell * .7, '?', round(cell * .55), CREAM3, 's', 'middle')
    return b


def figure_accessibility(mobile):
    b = ''
    if mobile:
        w, h = 600, 1570
        b += t(32, 330, '95.9%', 104, GOLD, 'd')
        b += lines(32, 400, ['of one million home pages had', 'detected WCAG failures'], 21, CREAM)
        b += t(32, 516, '56.1', 54, CREAM, 'd') + lines(150, 494, ['detected errors per', 'home page, on average'], 18, CREAM3)
        b += waffle(70, 560, 47, 38)
        b += lines(32, 1056, ['? = 4.1% with no detected failures.', 'Unknown is not the same as accessible.'], 18, CREAM3)
        b += t(32, 1140, 'WHAT A PERSON NEEDS TO FINISH', 14, GOLD, 'm')
        ys = [1186 + i * 46 for i in range(6)]
        b += line(52, ys[0], 52, ys[-1], HAIR, 2)
        for i, (y, stop) in enumerate(zip(ys, JOURNEY)):
            b += circle(52, y, 11, GOLD) if i == 0 else circle(52, y, 9, INK, CREAM3, 1.5, '3 3')
            b += t(78, y + 7, escape(stop), 20, CREAM if i == 0 else CREAM3)
        b += t(250, ys[0] + 7, '← the scan stops here', 17, GOLD)
        b += lines(250, ys[2] + 7, ['the rest is unmeasured:', 'test it with people'], 17, CREAM3)
        b += pill(32, 1468, 'ILLUSTRATIVE BOOKING', SOFT, CREAM3, 12)
    else:
        w, h = 1000, 990
        b += t(56, 312, '95.9%', 120, GOLD, 'd')
        b += lines(60, 392, ['of one million home pages had', 'detected WCAG failures'], 21, CREAM)
        b += t(56, 512, '56.1', 60, CREAM, 'd') + lines(186, 490, ['detected errors per', 'home page, on average'], 18, CREAM3)
        b += waffle(560, 206, 38, 31)
        b += lines(560, 618, ['? = 4.1% with no detected failures.', 'Unknown is not the same as accessible.'], 17, CREAM3)
        b += rect(40, 676, w - 80, 186, INK2, HAIR, 12, 1)
        b += t(64, 710, 'WHAT A PERSON NEEDS TO FINISH', 14, GOLD, 'm')
        b += t(w - 64, 710, 'ILLUSTRATIVE BOOKING', 13, DIM, 'm', 'end')
        xs = [140 + i * 144 for i in range(6)]
        y = 786
        b += rect(xs[0] - 72, 734, 144, 108, 'none', GOLD, 10, 1.5)
        b += t(xs[0], 756, 'THE SCAN', 13, GOLD, 'm', 'middle')
        b += t((xs[1] + xs[-1]) / 2, 756, 'UNMEASURED BY A HOME-PAGE SCAN · TEST IT WITH PEOPLE', 13, CREAM3, 'm', 'middle')
        b += line(xs[0], y, xs[-1], y, HAIR, 2) + line(xs[0], y, xs[0] + 72, y, GOLD, 3)
        for i, (x, stop) in enumerate(zip(xs, JOURNEY)):
            b += circle(x, y, 12, GOLD) if i == 0 else circle(x, y, 10, INK2, CREAM3, 1.5, '3 3')
            b += t(x, y + 39, escape(stop), 17, CREAM if i == 0 else CREAM3, 's', 'middle')
    return frame('access' + ('-m' if mobile else ''), w, h, 2,
                 ['The scan checks the ' + em('front door') + '.'] if not mobile else ['The scan checks', 'the ' + em('front door') + '.'],
                 ['People need the whole journey to work.'],
                 b, 'WEBAIM MILLION · FEB 2026 · 1,000,000 HOME PAGES · AUTOMATED', 'web-accessibility-can-people-finish', TEXT['access'], mobile)


# ── 3 · Stop making agents hunt for buttons ────────────────────────────────

TOOLS = ['search_items', 'read_item', 'propose_founder_profile', 'suggest_item', 'set_aside_items', 'read_workspace', 'draft_brief']
ITEMS = [('Innovate UK smart grant', True), ('AI skills fund', False), ('R&D tax relief guidance', True)]


def page_mock(x, y, w, mobile):
    """Radar Explore, reduced to what both routes act on. Returns markup and the last Keep button's centre."""
    chip_w, chip_step, row_h, row_step, size = (94, 104, 48, 58, 17) if mobile else (86, 96, 42, 52, 16)
    b = ''
    for i, chip in enumerate(['grants', 'deadline', 'source']):
        b += rect(x + i * chip_step, y, chip_w, 26, SOFT, r=13)
        b += t(x + i * chip_step + chip_w / 2, y + 18, chip, size - 2, CREAM3, 's', 'middle')
    bw, bh = (72, 30) if mobile else (60, 24)
    for i, (item, kept) in enumerate(ITEMS):
        ry = y + 46 + i * row_step
        b += rect(x, ry, w, row_h, ELEV, r=6)
        b += t(x + 14, ry + row_h / 2 + size * .35, escape(item), size, CREAM)
        bx, by = x + w - bw - 14, ry + (row_h - bh) / 2
        b += rect(bx, by, bw, bh, GOLD if kept else 'none', None if kept else CREAM3, bh / 2, 1)
        b += t(bx + bw / 2, by + bh / 2 + 5, 'Keep' if kept else 'Drop', size - 2, INK if kept else CREAM3, 's', 'middle')
    return b, (bx + bw / 2, by + bh)


def tool_list(x, y, w, step, size, mobile):
    b = ''
    for i, tool in enumerate(TOOLS):
        b += rect(x, y + i * step, w, 32, TEALD, r=6) + t(x + 14, y + i * step + 21, tool, size, TEALT, 'm')
    return b


def legend_hunt(x, y, size):
    b = path(f'M{x} {y - 5}c8 -10 14 10 22 0s14 10 22 0', RED, 1.8, '4 4')
    b += t(x + 56, y, 'guessing from the screen', size, CREAM3)
    b += line(x, y + 23, x + 44, y + 23, TEAL, 2) + head(x + 46, y + 23, 'r', TEAL, 7)
    b += t(x + 56, y + 28, 'calling a declared tool', size, CREAM3)
    return b


def figure_webmcp(mobile):
    b = ''
    if mobile:
        w, h = 600, 1510
        fx, fy, fw, fh = 24, 284, 552, 900
    else:
        w, h = 1000, 1060
        fx, fy, fw, fh = 56, 214, 888, 576
    b += rect(fx, fy, fw, fh, INK2, HAIR, 14, 1.5)
    b += ''.join(circle(fx + 22 + 16 * i, fy + 22, 5, HAIR) for i in range(3))
    b += rect(fx + 76, fy + 10, 300, 24, ELEV, r=12) + t(fx + 92, fy + 27, 'radar.hyperdrift.io/explore', 13, CREAM3, 'm')
    b += line(fx, fy + 44, fx + fw, fy + 44, HAIR, 1)
    if mobile:
        b += t(fx + 24, fy + 82, 'THE PAGE THE FOUNDER SEES', 13, CREAM3, 'm')
        mock, (kx, ky) = page_mock(fx + 24, fy + 100, fw - 48, True)
        b += mock
        # You, under the control you use.
        b += head(kx, ky + 4, 'u', CREAM, 8) + line(kx, ky + 12, kx, ky + 22, CREAM, 2)
        b += t(kx, ky + 50, 'You', 24, CREAM, 'd', 'middle') + t(kx, ky + 70, 'click Keep', 14, CREAM3, 's', 'middle')
        b += legend_hunt(fx + 24, fy + 404, 16)
        ty = fy + 492
        b += t(fx + 24, ty - 20, 'THE PAGE DECLARES · WEBMCP', 13, TEAL, 'm')
        b += tool_list(fx + 24, ty, 300, 40, 15, True)
        # The agent names suggest_item.
        b += t(fx + 360, ty + 112, 'Agent', 26, TEAL, 'd') + lines(fx + 360, ty + 138, ['calls a tool', 'by name'], 15, CREAM3)
        b += path(f'M{fx + 356} {ty + 128}C{fx + 342} {ty + 128} {fx + 342} {ty + 136} {fx + 334} {ty + 136}', TEAL, 2)
        b += head(fx + 330, ty + 136, 'l', TEAL, 8)
        # Both routes reach the same functions.
        sy = fy + 812
        b += line(kx, ky + 82, kx, sy - 12, CREAM, 2) + head(kx, sy - 4, 'd', CREAM, 8)
        b += line(fx + 174, ty + 6 * 40 + 34, fx + 174, sy - 12, TEAL, 2) + head(fx + 174, sy - 4, 'd', TEAL, 8)
        b += rect(fx + 24, sy, fw - 48, 64, GOLDBG, GOLD, 10, 1.5)
        b += t(fx + fw / 2, sy + 29, 'Shared workspace functions', 21, GOLDL, 'd', 'middle')
        b += t(fx + fw / 2, sy + 51, 'a button and a tool change the same shortlist', 14, CREAM3, 's', 'middle')
        oy = fy + fh + 30
        b += rect(24, oy, 552, 150, 'none', DIM, 14, 1.2, '6 6')
        b += t(48, oy + 34, 'OUTSIDE THE PAGE · MCP', 13, CREAM3, 'm')
        b += t(48, oy + 74, 'Assistant → MCP server → service', 21, CREAM)
        b += lines(48, oy + 108, ['No open page. A different scope,', 'with its own checks.'], 17, CREAM3)
    else:
        b += t(fx + 28, fy + 80, 'THE PAGE THE FOUNDER SEES', 13, CREAM3, 'm')
        mock, (kx, ky) = page_mock(fx + 28, fy + 98, 400, False)
        b += mock
        tx, ty = fx + 520, fy + 98
        b += line(tx - 30, fy + 64, tx - 30, fy + 404, HAIR, 1, '2 6')
        b += t(tx, fy + 80, 'THE PAGE DECLARES · WEBMCP', 13, TEAL, 'm')
        b += tool_list(tx, ty, 256, 40, 15, False)
        # The agent: one hunting route across the pixels, one call by name.
        ax = fx + fw - 40
        b += t(ax, fy + 186, 'Agent', 26, TEAL, 'd', 'middle')
        b += t(ax, fy + 209, 'calls by', 15, CREAM3, 's', 'middle') + t(ax, fy + 228, 'name', 15, CREAM3, 's', 'middle')
        b += path(f'M{ax - 20} {fy + 240}C{ax - 26} {fy + 250} {ax - 40} {fy + 250} {tx + 268} {fy + 250}', TEAL, 2)
        b += head(tx + 262, fy + 250, 'l', TEAL, 8)
        hunt = smooth([(fx + 470, fy + 58), (fx + 250, fy + 132), (fx + 300, fy + 170), (fx + 150, fy + 196),
                       (fx + 330, fy + 228), (kx - 74, fy + 217)])
        b += path(f'M{ax} {fy + 160}C{ax} {fy + 58} {ax - 60} {fy + 58} {fx + 470} {fy + 58}', RED, 1.8, '4 4')
        b += path(hunt, RED, 1.8, '4 4')
        b += circle(kx - 62, fy + 217, 11, REDBG, RED, 1.5) + t(kx - 62, fy + 222, '?', 14, RED, 's', 'middle')
        # You, under the control you use.
        b += head(kx, ky + 4, 'u', CREAM, 8) + line(kx, ky + 12, kx, ky + 18, CREAM, 2)
        b += t(kx, ky + 42, 'You', 24, CREAM, 'd', 'middle') + t(kx, ky + 61, 'click Keep', 15, CREAM3, 's', 'middle')
        b += legend_hunt(fx + 28, fy + 394, 16)
        # Both routes reach the same functions.
        sy = fy + 500
        b += path(f'M{kx} {ky + 72}V{sy - 10}', CREAM, 2) + head(kx, sy - 2, 'd', CREAM, 8)
        b += path(f'M{tx + 124} {ty + 6 * 40 + 40}C{tx + 124} {sy - 60} {fx + 520} {sy - 60} {fx + 520} {sy - 10}', TEAL, 2)
        b += head(fx + 520, sy - 2, 'd', TEAL, 8)
        b += rect(fx + 214, sy, 460, 58, GOLDBG, GOLD, 10, 1.5)
        b += t(fx + 444, sy + 26, 'Shared workspace functions', 20, GOLDL, 'd', 'middle')
        b += t(fx + 444, sy + 46, 'a button and a tool change the same shortlist', 14, CREAM3, 's', 'middle')
        oy = fy + fh + 30
        b += rect(56, oy, 888, 96, 'none', DIM, 14, 1.2, '6 6')
        b += t(80, oy + 34, 'OUTSIDE THE PAGE · MCP', 13, CREAM3, 'm')
        b += t(80, oy + 70, 'Assistant  →  MCP server  →  service', 21, CREAM)
        b += t(920, oy + 70, 'No open page. A different scope, with its own checks.', 17, CREAM3, 's', 'end')
    return frame('webmcp' + ('-m' if mobile else ''), w, h, 3,
                 ['Stop making agents ' + em('hunt') + ' for buttons.'] if not mobile else ['Stop making agents', em('hunt') + ' for buttons.'],
                 ['The page says what it can do. You and the agent change the same work.'] if not mobile else ['The page says what it can do. You and', 'the agent change the same work.'],
                 b, 'RADAR WEBMCP IMPLEMENTATION · TOOL NAMES AS REGISTERED', 'webmcp-actions-on-the-page', TEXT['webmcp'], mobile)


# ── 4 · A spoken promise is not a completed action ─────────────────────────
# Dialogue from the retained log of the recorded take (src/data/articles.json).

def bubble(x, y, w, rows, who, size=15):
    fill, ink, stroke = (ELEV, CREAM, CREAM3) if who == 'captain' else (GOLDBG, GOLDL, GOLDD)
    h = 22 + len(rows) * size * 1.35
    return rect(x, y, w, h, fill, stroke, 12, 1) + lines(x + 14, y + 11 + size, rows, size, ink, 's', lead=1.35)


def figure_cargo(mobile):
    b = ''
    if mobile:
        w, h = 600, 1390
        o = 300
        rx = 556
        b += t(32, o, 'CAPTAIN', 12, CREAM3, 'm') + t(150, o, 'FIRST OFFICER', 12, GOLD, 'm') + t(rx, o, 'CARGO', 12, TEAL, 'm', 'middle')
        accepted, answering, bottom = o + 446, o + 680, o + 920
        b += rect(rx - 6, o + 20, 12, accepted - o - 20, REDD, r=6) + rect(rx - 6, accepted, 12, answering - accepted, '#2c2a20', r=6)
        b += rect(rx - 6, answering, 12, bottom - answering, TEAL, r=6)
        b += t(rx - 18, o + 50, 'down', 14, RED, 's', 'end') + t(rx - 18, accepted + 30, 'recovering', 14, CREAM3, 's', 'end')
        b += t(rx - 18, o + 910, 'answering', 14, TEAL, 's', 'end')
        b += bubble(32, o + 20, 120, ['“Cargo.”'], 'captain', 18)
        b += bubble(110, o + 86, 400, ['“Cargo stopped answering 1 minute', 'ago. Bring it online, park it,', 'or hear why?”'], 'officer', 18)
        b += bubble(32, o + 226, 190, ['“Bring it back.”'], 'captain', 18)
        b += bubble(110, o + 292, 330, ['“On it. Helm is bringing', 'Cargo back online.”'], 'officer', 18)
        b += pill(110, o + 424, 'ORDER ACCEPTED', GOLD, INK, 13)
        b += line(92, o + 446, 92, o + 740, GOLD, 2, '2 6')
        b += lines(110, o + 492, ['A reply here would only mean', 'the order was received.'], 19, CREAM3)
        b += lines(110, o + 580, ['The officer waits for', 'evidence instead.'], 19, GOLDL)
        for i, py in enumerate([o + 700, o + 756]):
            b += line(170, py, rx - 14, py, TEAL, 1.5, '4 4') + head(rx - 10, py, 'r', TEAL, 8)
            b += circle(150, py, 14, TEALD) + check(150, py, .9, TEAL)
            b += t(176, py - 10, f'probe {i + 1}: answers', 15, TEAL)
        b += bubble(110, o + 792, 420, ['“Captain, Cargo answers again.', 'Checked twice, 75 milliseconds.”'], 'officer', 18)
        b += pill(110, o + 910, 'RESULT VERIFIED', TEAL, INK, 13)
    else:
        w, h = 1000, 1000
        cap, off, cargo = 330, 500, 680
        for name, y, colour in [('CAPTAIN', cap, CREAM3), ('FIRST OFFICER', off, GOLD), ('CARGO SANDBOX', cargo, TEAL)]:
            b += t(56, y + 5, name, 13, colour, 'm') + line(200, y, 944, y, HAIR, 1, '1 6')
        b += rect(200, cargo - 16, 356, 32, REDD, r=16) + t(214, cargo + 5, 'not answering', 15, RED)
        b += rect(556, cargo - 16, 222, 32, '#2c2a20', r=16) + t(570, cargo + 5, 'recovering', 15, CREAM3)
        b += rect(778, cargo - 16, 166, 32, TEALD, r=16) + t(792, cargo + 5, 'answering', 15, TEALT)
        b += bubble(200, cap - 23, 104, ['“Cargo.”'], 'captain', 16)
        b += bubble(230, off - 43, 312, ['“Cargo stopped answering 1 minute', 'ago. Bring it online, park it,', 'or hear why?”'], 'officer', 16)
        b += bubble(430, cap - 23, 150, ['“Bring it back.”'], 'captain', 16)
        b += bubble(556, off - 32, 232, ['“On it. Helm is bringing', 'Cargo back online.”'], 'officer', 16)
        b += pill(556, 562, 'ORDER ACCEPTED', GOLD, INK, 13)
        b += line(663, 572, 663, cargo - 24, GOLD, 2) + head(663, cargo - 18, 'd', GOLD, 8)
        # The probes, and the reply they earn.
        for px in (818, 878):
            b += line(px, cargo - 18, px, 446, TEAL, 2, '4 4') + head(px, 440, 'u', TEAL, 8)
            b += circle(px, 590, 14, TEALD) + check(px, 590, .9, TEAL)
        b += t(798, 596, '2 probes', 15, TEAL, 's', 'end')
        b += bubble(644, 370, 300, ['“Captain, Cargo answers again.', 'Checked twice, 75 milliseconds.”'], 'officer', 16)
        b += pill(944, 356, 'RESULT VERIFIED', TEAL, INK, 13, 'end')
        b += path(f'M663 {cargo + 30}V{cargo + 46}H930V{cargo + 30}', GOLD, 1.5)
        b += t(796, cargo + 72, 'the officer waits for evidence', 17, GOLDL, 's', 'middle')
        b += t(56, 836, 'An accepted order is not a recovered service.', 30, CREAM, 'd')
        b += t(56, 872, 'The reply waits until Cargo has answered twice.', 30, GOLDL, 'i')
    return frame('cargo' + ('-m' if mobile else ''), w, h, 4,
                 ['A spoken promise is ' + em('not'), 'a completed action.'],
                 ['First Officer reports recovery only after Cargo answers twice.'] if not mobile else ['First Officer reports recovery only', 'after Cargo answers twice.'],
                 b, 'RECORDED CARGO TAKE · SANDBOX · SEQUENCE NOT TO SCALE', 'hands-free-app-control', TEXT['cargo'], mobile)


# ── 5 · One sentence, separate permissions ─────────────────────────────────

def gate(x, y, open_):
    colour = TEAL if open_ else RED
    return rect(x - 4, y - 26, 8, 52, colour, r=4) + (check(x + 22, y, 1, TEAL) if open_ else cross(x + 22, y, 1, RED))


SERVICES = [('1', 'Project tracker', 'READ: BLOCKERS', True, TEAL),
            ('2', 'Writing workspace', 'CREATE: DRAFT', True, GOLD),
            ('?', 'Team channel', 'SEND: NOT ASKED', False, RED)]


def service_card(x, y, w, h, num, name, scope, ok, colour, size):
    b = rect(x, y, w, h, INK2 if ok else REDBG, colour, 12, 1.5, None if ok else '5 5')
    b += t(x + 22, y + 34, f'MCP · {num}', 12, colour, 'm') + t(x + 22, y + 68, name, size, CREAM if ok else CREAM3, 'd')
    return b + pill(x + 22, y + h - 24, scope, TEALD if ok else REDD, TEALT if ok else RED, 13)


def figure_mcp(mobile):
    read, write = span('Find the release blockers', TEAL), span('prepare a note', GOLDL)
    b = ''
    if mobile:
        w, h = 600, 1560
        b += t(32, 296, '“' + read, 36, CREAM, 'i') + t(32, 338, 'and ' + write + ' for', 36, CREAM, 'i')
        b += t(32, 380, 'the team.”', 36, CREAM, 'i')
        b += t(32, 452, 'Assistant', 26, CREAM, 'd') + t(32, 478, 'interprets the sentence, keeps every source', 16, CREAM3)
        for i, (num, name, scope, ok, colour) in enumerate(SERVICES):
            y = 520 + i * 186
            b += line(48, 496, 48, y + 75, HAIR, 2) + line(48, y + 75, 80, y + 75, colour if ok else RED, 2, None if ok else '4 6')
            b += service_card(80, y, 400, 150, num, name, scope, ok, colour, 26)
            b += gate(512, y + 75, ok)
        b += lines(32, 1092, ['Each server checks its own scope. Nothing in', 'the request authorises delivery.'], 18, CREAM3)
        b += rect(32, 1160, 536, 210, BAND, GOLDD, 12, 1, '3 6')
        b += t(56, 1198, 'CORRECTION', 13, GOLD, 'm')
        b += t(56, 1242, '“Use the mobile release,', 26, CREAM, 'i') + t(56, 1274, 'not the web release.”', 26, CREAM, 'i')
        b += lines(56, 1318, ['Replace the selection, withdraw the old', 'findings, revise the same draft.'], 17, CREAM3)
    else:
        w, h = 1000, 1020
        b += t(56, 284, '“' + read + ' and ' + write + ' for the team.”', 38, CREAM, 'i')
        b += line(64, 296, 398, 296, TEAL, 3) + line(468, 296, 632, 296, GOLD, 3)
        b += t(231, 324, '1 · READ', 13, TEAL, 'm', 'middle') + t(550, 324, '2 · WRITE', 13, GOLD, 'm', 'middle')
        b += t(800, 324, 'SEND? NOT ASKED', 13, RED, 'm', 'middle')
        b += rect(300, 366, 400, 78, ELEV, CREAM3, 12, 1.2)
        b += t(500, 400, 'Assistant', 26, CREAM, 'd', 'middle') + t(500, 428, 'interprets the sentence, keeps every source', 15, CREAM3, 's', 'middle')
        for i, (num, name, scope, ok, colour) in enumerate(SERVICES):
            x = 56 + i * 314
            cx = x + 130
            b += path(f'M500 444C500 480 {cx} 470 {cx} 512', colour if ok else RED, 2, None if ok else '4 6')
            b += gate(cx, 540, ok)
            b += service_card(x, 584, 260, 136, num, name, scope, ok, colour, 25)
        b += t(56, 762, 'Each server checks its own scope. Nothing in the request authorises delivery.', 17, CREAM3)
        b += rect(56, 786, 888, 96, BAND, GOLDD, 12, 1, '3 6')
        b += t(80, 820, 'CORRECTION', 13, GOLD, 'm')
        b += t(80, 856, '“Use the mobile release, not the web release.”', 26, CREAM, 'i')
        b += t(920, 856, 'replace the selection · revise the draft', 16, CREAM3, 's', 'end')
    return frame('mcp' + ('-m' if mobile else ''), w, h, 5,
                 ['One sentence. Two scopes. ' + em('No send') + '.'] if not mobile else ['One sentence.', 'Two scopes. ' + em('No send') + '.'],
                 ['Your sentence can cross apps. Your permission should not grow on the way.'] if not mobile else ['Your sentence can cross apps. Your', 'permission should not grow on the way.'],
                 b, 'PROPOSED EXPERIMENT · ILLUSTRATIVE REQUEST · NOT YET RUN', 'voice-through-mcp', TEXT['mcp'], mobile)


# ── 6 · Change the input, keep the work ────────────────────────────────────

MOMENTS = [('Speak', 'three grants'), ('Keyboard', 'drop one'), ('Screen reader', 'hear the comparison'),
           ('Session drops', ''), ('Return later', 'same shortlist')]
# What the task holds after each moment: (grants, decisions, evidence).
IN_CONVERSATION = [(3, 0, 3), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0)]
IN_TASK = [(3, 0, 3), (2, 1, 2), (2, 1, 2), (2, 1, 2), (2, 1, 2)]


def kept(x, y, grants, decisions, evidence, s=1):
    """The task, as things you can point at: grants (gold), decisions (cream ticks), evidence (teal)."""
    b = ''.join(rect(x + i * 18 * s, y, 13 * s, 18 * s, GOLD, r=2) for i in range(grants))
    b += ''.join(check(x + 6 * s + i * 18 * s, y + 32 * s, .8 * s, CREAM, 2) for i in range(decisions))
    return b + ''.join(circle(x + 6 * s + i * 18 * s, y + 50 * s, 4.5 * s, TEAL) for i in range(evidence))


def legend_kept(x, y, size, gaps):
    b = rect(x, y - 14, 12, 16, GOLD, r=2) + t(x + 20, y, 'grant on the shortlist', size, CREAM3)
    b += check(x + gaps[0] + 6, y - 6, .8, CREAM, 2) + t(x + gaps[0] + 22, y, 'your decision', size, CREAM3)
    return b + circle(x + gaps[1] + 4, y - 6, 4.5, TEAL) + t(x + gaps[1] + 16, y, 'its evidence', size, CREAM3)


def figure_continuity(mobile):
    b = ''
    if mobile:
        w, h = 600, 1490
        top, step = 380, 182
        cols = [(236, 'THE CONVERSATION', RED, IN_CONVERSATION), (416, 'THE TASK', GOLD, IN_TASK)]
        ys = [top + i * step for i in range(5)]
        for x, name, colour, states in cols:
            b += t(x, top - 64, 'WORK LIVES IN', 12, CREAM3, 'm') + t(x, top - 44, name, 13, colour, 'm')
            if colour == GOLD:
                b += line(x, ys[0] - 14, x, ys[-1] + 40, GOLD, 3)
            else:
                for y0, y1 in zip(ys, ys[1:]):
                    b += line(x, y0 + 48, x, y1 - 20, RED, 2, '2 6') + cross(x, (y0 + y1) / 2 + 14, .8, RED, 2)
            for y, state in zip(ys, states):
                b += kept(x + 18, y - 14, *state, s=1.15) if sum(state) else t(x + 18, y + 8, 'start again', 17, RED)
        for i, (y, (mode, note)) in enumerate(zip(ys, MOMENTS)):
            drop = mode == 'Session drops'
            b += t(32, y + 4, mode, 24, RED if drop else CREAM, 'd')
            if note:
                b += t(32, y + 30, escape(note), 15, CREAM3)
        b += t(32, 1310, 'Changing how you work should', 30, CREAM, 'd')
        b += t(32, 1346, 'not mean ' + em('starting again') + '.', 30, CREAM, 'd')
        b += legend_kept(32, 1390, 15, (196, 340))
    else:
        w, h = 1000, 900
        xs = [292 + i * 146 for i in range(5)]
        b += t(56, 258, 'INPUT', 13, CREAM3, 'm')
        for x, (mode, note) in zip(xs, MOMENTS):
            drop = mode == 'Session drops'
            b += rect(x - 70, 228, 140, 46, REDD if drop else ELEV, RED if drop else None, 23, 1)
            b += t(x, 257, mode, 16, RED if drop else CREAM, 's', 'middle')
            if note:
                b += t(x, 298, escape(note), 15, CREAM3, 's', 'middle')
        rows = [('THE CONVERSATION', 384, IN_CONVERSATION, RED), ('THE TASK', 554, IN_TASK, GOLD)]
        for name, y, states, colour in rows:
            b += rect(40, y - 52, 920, 140, INK2 if colour == RED else BAND, HAIR if colour == RED else GOLDD, 12, 1)
            b += t(56, y - 18, 'WORK LIVES IN', 13, CREAM3, 'm') + t(56, y + 3, name, 14, colour, 'm')
            if colour == RED:
                for x0, x1 in zip(xs, xs[1:]):
                    b += line(x0 + 40, y + 60, x1 - 40, y + 60, RED, 2, '2 6') + cross((x0 + x1) / 2, y + 60, .8, RED, 2)
            else:
                b += line(xs[0] - 40, y + 60, xs[-1] + 50, y + 60, GOLD, 3)
            for x, state in zip(xs, states):
                b += kept(x - 24, y - 20, *state) if sum(state) else t(x, y + 16, 'start again', 16, RED, 's', 'middle')
        b += t(56, 744, 'Changing how you work should not mean ' + em('starting again') + '.', 32, CREAM, 'd')
        b += legend_kept(56, 786, 15, (216, 362))
    return frame('continuity' + ('-m' if mobile else ''), w, h, 6,
                 ['Change the input. ' + em('Keep') + ' the work.'] if not mobile else ['Change the input.', em('Keep') + ' the work.'],
                 ['A grant shortlist through speech, keyboard, a screen reader and a dropped session.'] if not mobile else ['A grant shortlist through speech, keyboard,', 'a screen reader and a dropped session.'],
                 b, 'DESIGN GOAL · PROPOSED SCENARIO · NOT AN OBSERVED RESULT', 'future-ui-keep-your-place', TEXT['continuity'], mobile)


FIGURES = {
    'routes': figure_routes,
    'accessibility': figure_accessibility,
    'webmcp': figure_webmcp,
    'cargo': figure_cargo,
    'mcp': figure_mcp,
    'continuity': figure_continuity,
}

if __name__ == '__main__':
    import json
    for name, build in FIGURES.items():
        save(name, build(False))
        save(f'{name}-mobile', build(True))
    data = {slug: {'asset': asset, 'title': TEXT[key][0], 'description': TEXT[key][1]} for key, (slug, asset) in SLUGS.items()}
    Path('src/data/ui-accessibility-figures.json').write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n')
    print('wrote', ', '.join(FIGURES), '+ src/data/ui-accessibility-figures.json')

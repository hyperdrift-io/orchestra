"""Editable, deterministic figures. No measured performance is implied by route geometry."""
from pathlib import Path
from html import escape
import textwrap

OUT=Path('public/articles/ui-accessibility')
INK='#14120e'; CREAM='#f6eee1'; GOLD='#e3a857'; TEAL='#90c5b8'; MUTED='#c7bba8'; LINE='#75654d'

def text(x,y,value,size=28,colour=CREAM,anchor='start',serif=False):
    return f'<text x="{x}" y="{y}" fill="{colour}" font-size="{size}" text-anchor="{anchor}" font-family="{("Georgia,serif" if serif else "Arial,sans-serif")}">{escape(str(value))}</text>'
def wrap(x,y,value,width,size=28,colour=CREAM,serif=False):
    return ''.join(text(x,y+i*size*1.35,s,size,colour,serif=serif) for i,s in enumerate(textwrap.wrap(value,max(12,int(width/(size*.51))))))
def line(x,y,xx,yy,colour=LINE,dash=False):
    return f'<path d="M{x} {y}L{xx} {yy}" fill="none" stroke="{colour}" stroke-width="2"'+(' stroke-dasharray="8 8"' if dash else '')+'/>'
def curve(x,y,xx,yy,colour=GOLD,dash=False):
    return f'<path d="M{x} {y}C{x} {(y+yy)/2} {xx} {(y+yy)/2} {xx} {yy}" fill="none" stroke="{colour}" stroke-width="3"'+(' stroke-dasharray="8 8"' if dash else '')+'/>'
def circle(x,y,r,colour=GOLD,fill=INK):
    return f'<circle cx="{x}" cy="{y}" r="{r}" stroke="{colour}" stroke-width="2" fill="{fill}"/>'
def rect(x,y,w,h,stroke=LINE,fill=INK,dash=False):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="{fill}" stroke="{stroke}"'+(' stroke-dasharray="8 8"' if dash else '')+'/>'
def save(name,title,body,mobile=False,sub='Conceptual comparison · No performance ranking',height=None):
    w=600 if mobile else 1100; h=height or (980 if mobile else 790)
    s=f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img"><title>{escape(title)}</title><rect width="{w}" height="{h}" fill="{INK}"/>'
    s+=text(38,46,'ORCHESTRA / UI & ACCESSIBILITY',18,GOLD)
    s+=wrap(38,108,title,w-76,42 if mobile else 50,serif=True)
    s+=body
    s+=line(38,h-108,w-38,h-108)+wrap(38,h-78,sub,w-76,19,MUTED)+text(38,h-20,'ai.hyperdrift.io/articles',18,GOLD)
    (OUT/f'{name}{"-mobile" if mobile else ""}.svg').write_text(s+'</svg>')

routes=[
 ('controls','Direct controls',['Person chooses','UI event','App action','Person checks'],'Navigation stays with the person.'),
 ('api-cli','API / CLI',['Defined command','Adapter','App action','Inspect result'],'A person or program specifies the operations.'),
 ('webmcp','WebMCP',['Browser agent','Page tool','App action','Shared page'],'The page declares actions an agent can call.'),
 ('voice-app','Voice over an app',['Spoken request','Voice integration','App action','Feedback'],'Speech supplies the request; the integration acts.'),
 ('voice-mcp','Voice through MCP',['Spoken request','Assistant + MCP','Service tools','Review result'],'Proposed cross-app path; permission is checked per service.'),
]
for mobile in [False,True]:
    for route_id,label,nodes,note in routes:
        if mobile:
            b=text(38,205,label,28,GOLD)
            for i,n in enumerate(nodes):
                y=280+i*125
                if i<3: b+=line(77,y+20,77,y+105,GOLD)
                b+=circle(77,y,19)+text(77,y+8,i+1,23,GOLD,'middle')+text(122,y+9,n,29)
            b+=wrap(38,797,note,520,25,MUTED)
        else:
            b=text(38,212,label,30,GOLD)
            for i,n in enumerate(nodes):
                x=135+i*275
                if i<3: b+=line(x+31,355,x+244,355,GOLD)
                b+=circle(x,355,30)+text(x,365,i+1,27,GOLD,'middle')+text(x,427,n,27,CREAM,'middle')
            b+=wrap(38,540,note,990,30,MUTED)
            b+=text(38,615,'The outcome is the same. Responsibility changes.',30,CREAM)
        save('route-'+route_id,'Who does the work?',b,mobile)
    # Snapshot of detection, with a partial unit for 95.9 instead of rounding to 96.
    b=text(38,240,'95.9%',88,GOLD,serif=True)+wrap(38,290,'of sampled home pages had detected WCAG failures',490 if mobile else 450,30)
    gx=45 if mobile else 625; gy=410 if mobile else 210; pitch=48 if mobile else 36; cell=34 if mobile else 25
    for i in range(100):
        x=gx+(i%10)*pitch; y=gy+(i//10)*pitch
        b+=rect(x,y,cell,cell,LINE,INK)
        if i<95: b+=rect(x,y,cell,cell,GOLD,GOLD)
        elif i==95: b+=f'<rect x="{x}" y="{y}" width="{cell*.9}" height="{cell}" fill="{GOLD}"/>'
    if mobile:
        b+=wrap(38,940,'4.1% had no detected failures. That does not establish accessibility.',520,25,MUTED)
    else:
        b+=wrap(38,480,'4.1% had no detected failures. That does not establish accessibility.',470,28,MUTED)
    save('accessibility','The scan is only the beginning.',b,mobile,'WebAIM Million · February 2026 · 1,000,000 home pages',height=1150 if mobile else 790)
    # Boundaries, not a timeline.
    w=600 if mobile else 1100
    b=rect(38,208,w-76,310,GOLD)+text(65,251,'OPEN WEB PAGE',23,GOLD)
    if mobile:
        b+=text(80,316,'Person → controls',27)+text(80,369,'Browser agent → WebMCP',27)+text(80,468,'Shared app actions + visible state',25,TEAL)
        b+=line(130,389,130,435,TEAL)+line(330,389,330,435,TEAL)
    else:
        b+=text(80,333,'Person',30)+text(345,333,'Controls',30)+line(192,323,316,323)
        b+=text(80,417,'Browser agent',30)+text(345,417,'WebMCP tools',30)+line(280,407,316,407)
        b+=curve(560,324,830,364,TEAL)+curve(560,410,830,364,TEAL)+text(790,337,'App actions',30,TEAL)+text(790,411,'Visible state',25,MUTED)
    b+=rect(38,567,w-76,270 if mobile else 200,LINE)+text(65,610,'SERVICE CONNECTION',23,GOLD)
    b+=wrap(65,670,'Assistant → MCP server → service API',w-130,30)+wrap(65,768 if mobile else 721,'An open page is not required for this route.',w-130,23,MUTED)
    save('boundaries','Choose where the work belongs.',b,mobile,'Conceptual boundaries · Routes may coexist',height=1020 if mobile else 910)
    # Cargo: one directional sequence, checked outcome on the return.
    b=''; steps=[('Request','Bring Cargo back'),('Execute','Recovery action runs'),('Verify','Cargo answers twice'),('Report','Result returns to the person')]
    for i,(a,c) in enumerate(steps):
        y=250+i*(137 if mobile else 103)
        if i<3:b+=line(65,y+18,65,y+(119 if mobile else 85),TEAL)
        b+=circle(65,y,14,TEAL)+text(105,y+9,a,33,CREAM,serif=True)+wrap(105,y+52,c,(425 if mobile else 870),25,MUTED)
    save('cargo','A result earns its reply.',b,mobile,'Recorded Cargo workflow · Sandbox only',height=990 if mobile else 850)
    # Proposed MCP route: a fork to separately authorised services; no path to send.
    w=600 if mobile else 1100
    b=text(w/2,227,'PERSON: prepare a release note',27,CREAM,'middle')+line(w/2,248,w/2,289,GOLD)
    b+=rect(w/2-195,290,390,78,GOLD)+text(w/2,339,'Assistant',33,CREAM,'middle')
    if mobile:
        b+=line(300,368,300,389,GOLD,True)+line(300,389,44,389,GOLD,True)+line(44,389,44,638,GOLD,True)+line(44,466,60,466,GOLD,True)+rect(60,410,480,126,TEAL)+text(86,456,'MCP → project tracker',28)+text(86,500,'Permission: read blockers',23,TEAL)
        b+=line(44,638,60,638,GOLD,True)+rect(60,582,480,126,TEAL)+text(86,628,'MCP → draft workspace',28)+text(86,672,'Permission: create a draft',23,TEAL)
        b+=text(300,793,'Sending needs a separate decision.',26,MUTED,'middle')
    else:
        b+=curve(550,368,300,452,GOLD,True)+curve(550,368,820,452,GOLD,True)
        b+=rect(60,452,470,141,TEAL)+text(90,505,'MCP → project tracker',31)+text(90,556,'Permission: read blockers',25,TEAL)
        b+=rect(570,452,470,141,TEAL)+text(600,505,'MCP → draft workspace',31)+text(600,556,'Permission: create a draft',25,TEAL)
        b+=text(550,664,'Sending needs a separate decision.',30,MUTED,'middle')
    save('mcp','One request. Separate permissions.',b,mobile,'Proposed experiment · No cross-app run claimed',height=950 if mobile else 850)
    # A persistent centre with multiple ways to inspect/correct it.
    cx=300 if mobile else 550; cy=498 if mobile else 442
    b=circle(cx,cy,130,GOLD)+circle(cx,cy,144,LINE)
    b+=text(cx,cy-33,'THE TASK',22,GOLD,'middle')+text(cx,cy+7,'Shortlist + evidence',25,CREAM,'middle')+text(cx,cy+48,'Your decisions',24,CREAM,'middle')
    points=[(145,270,'Speech'),(455,270,'Keyboard'),(145,758,'Screen reader'),(455,758,'Direct controls')] if mobile else [(150,290,'Speech'),(940,290,'Keyboard'),(150,602,'Screen reader'),(940,602,'Direct controls')]
    for x,y,label in points:
        endx=cx+(x-cx)*.38; endy=cy+(y-cy)*.45
        b+=curve(x,y,endx,endy,TEAL)+circle(x,y,13,TEAL)+text(x,y+(52 if y>cy else -32),label,28,CREAM,'middle')
    save('continuity','Change the input. Keep the work.',b,mobile,'Design goal · Continuity must be implemented and tested',height=1010 if mobile else 850)

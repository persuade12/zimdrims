from pathlib import Path
import re

path = Path(r"c:\Users\persu\Desktop\Persuade\zimdrims\lib\concept\rich-modules.ts")
text = path.read_text(encoding="utf-8")

if "mapStories" not in text:
    text = text.replace(
        "} from '@/lib/concept-data'\n",
        "} from '@/lib/concept-data'\nimport { mapStories } from '@/lib/concept/map-stories'\n",
    )

title_to_story = {
    "National Situation Map": "neoc",
    "Multi-Hazard Alert Map": "earlyWarning",
    "Composite Risk Map": "risk",
    "Explorer Map": "risk",
    "Impact Footprint": "impact",
    "Shelter & Evacuation Map": "shelters",
    "Damage Concentration": "damage",
}

for title, key in title_to_story.items():
    pattern = re.compile(
        rf"map:\s*\{{[^\}}]*?title:\s*'{re.escape(title)}'[^\}}]*?\}},",
        re.DOTALL,
    )
    # nested braces possible for markers arrays - use a more robust approach
    idx = text.find(f"title: '{title}'")
    if idx < 0:
        print(f"WARN: title not found: {title}")
        continue
    # walk back to 'map:'
    map_start = text.rfind("map:", 0, idx)
    if map_start < 0:
        print(f"WARN: map: not found before {title}")
        continue
    # find matching closing }; from map_start
    i = text.find("{", map_start)
    depth = 0
    end = None
    for j in range(i, len(text)):
        if text[j] == "{":
            depth += 1
        elif text[j] == "}":
            depth -= 1
            if depth == 0:
                end = j + 1
                # include trailing comma if present
                if end < len(text) and text[end] == ",":
                    end += 1
                break
    if end is None:
        print(f"WARN: could not close map for {title}")
        continue
    text = text[:map_start] + f"map: mapStories.{key}," + text[end:]
    print(f"replaced '{title}' -> mapStories.{key}")

inject_after_config = {
    "needsAssessmentConfig": "needs",
    "anticipationOverviewConfig": "anticipation",
    "triggerMonitorConfig": "trigger",
    "anticipatoryFinancingConfig": "financing",
    "incidentCommandConfig": "incidentCommand",
    "coordinationOverviewConfig": "coordination",
    "governmentCoordinationConfig": "government",
    "sadcCoordinationConfig": "sadc",
    "recoveryOverviewConfig": "recovery",
    "recoveryProgressConfig": "recovery",
    "buildBackBetterConfig": "bbb",
    "resilienceConfig": "resilience",
    "iksConfig": "iks",
    "analyticsConfig": "analytics",
}

for cfg, key in inject_after_config.items():
    m = re.search(rf"export const {cfg}: RichModuleConfig = \{{", text)
    if not m:
        print(f"WARN: config {cfg} not found")
        continue
    start = m.end()
    n = re.search(r"\nexport const |\nexport function ", text[start:])
    end = start + n.start() if n else len(text)
    block = text[start:end]
    if re.search(r"\nmap:", block):
        print(f"skip {cfg} (already has map)")
        continue
    km = re.search(r"kpis:\s*\[[\s\S]*?\],", block)
    if not km:
        print(f"WARN: no kpis in {cfg}")
        continue
    insert_at = start + km.end()
    text = text[:insert_at] + f"\n  map: mapStories.{key}," + text[insert_at:]
    print(f"injected mapStories.{key} into {cfg}")

# Upgrade hazard early warning and anticipation template maps with stories
# hazardEarlyWarningConfig map block
old_hew = """    map: {
      title: `${hazard} Risk Map`,
      provinceColors: riskMapColors,
      markers: incidentMarkers.slice(0, 3),
      legend: riskLegend,
    },"""
new_hew = """    map: {
      ...mapStories.earlyWarning,
      title: `${hazard} Risk Map`,
      story: {
        headline: `${hazard} monitoring story — watch thresholds and districts under elevated attention.`,
        beats: [
          `Active ${hazard.toLowerCase()} signals are overlaid on the national multi-hazard picture.`,
          'Hotspots and lead times guide SOP activation and public messaging.',
          'Tap a province for the local exposure story.',
        ],
      },
    },"""
if old_hew in text:
    text = text.replace(old_hew, new_hew)
    print("upgraded hazardEarlyWarningConfig map")
else:
    print("WARN: hazardEarlyWarningConfig map pattern not found")

old_ha = """    map: {
      title: `${hazard} Anticipation Map`,
      provinceColors: riskMapColors,
      legend: riskLegend,
    },"""
new_ha = """    map: {
      ...mapStories.anticipation,
      title: `${hazard} Anticipation Map`,
      story: {
        headline: `${hazard} anticipation — where lead time still allows action before peak impact.`,
        beats: [
          `Forecast confidence and AA readiness are highest in priority ${hazard.toLowerCase()} districts.`,
          'Finance windows and SOPs are linked to these geographies.',
          'Select a province to see local readiness context.',
        ],
      },
    },"""
if old_ha in text:
    text = text.replace(old_ha, new_ha)
    print("upgraded hazardAnticipationConfig map")
else:
    print("WARN: hazardAnticipationConfig map pattern not found")

path.write_text(text, encoding="utf-8")
print("done")

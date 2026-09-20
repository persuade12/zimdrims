from pathlib import Path
import re

root = Path(r"c:\Users\persu\Desktop\Persuade\zimdrims\components\dare\pages")

patches = {
    "response-overview.tsx": ("response", True),
    "emergency-operations.tsx": ("emergency", True),
    "logistics-resources.tsx": ("logistics", True),
    "search-rescue.tsx": ("searchRescue", True),
    "call-centre.tsx": ("callCentre", True),
    "partners-stakeholders.tsx": ("partners", True),
    "coordination-5w.tsx": ("fiveW", True),
    "drought-anticipation.tsx": ("drought", True),
}

for fname, (key, _) in patches.items():
    path = root / fname
    text = path.read_text(encoding="utf-8")
    if "mapStories" not in text:
        # add import after SituationMap import
        text = text.replace(
            "import { SituationMap } from '@/components/dare/dashboard/situation-map'\n",
            "import { SituationMap } from '@/components/dare/dashboard/situation-map'\n"
            "import { mapStories } from '@/lib/concept/map-stories'\n",
        )
    # Replace SituationMap opening props block heuristically:
    # Find <SituationMap ... /> and inject story props if missing
    if "story={mapStories" in text or "story={mapStories." in text:
        print(f"skip {fname}")
        continue

    def inject(m):
        block = m.group(0)
        if "story=" in block:
            return block
        # insert before closing /> or >
        if block.rstrip().endswith("/>"):
            return block[:-2] + f"\n          story={{mapStories.{key}.story}}\n          provinceStories={{mapStories.{key}.provinceStories}}\n        />"
        return block

    new, n = re.subn(
        r"<SituationMap\b[\s\S]*?/>",
        inject,
        text,
        count=1,
    )
    if n:
        path.write_text(new, encoding="utf-8")
        print(f"patched {fname}")
    else:
        print(f"WARN: SituationMap not found in {fname}")

# anticipatory-action: add map at top
aa = root / "anticipatory-action.tsx"
aat = aa.read_text(encoding="utf-8")
if "SituationMap" not in aat:
    aat = aat.replace(
        "import { aaActions, anticipatoryKpis, riskColors } from '@/lib/concept-data'\n",
        "import { SituationMap } from '@/components/dare/dashboard/situation-map'\n"
        "import { mapStories } from '@/lib/concept/map-stories'\n"
        "import { aaActions, anticipatoryKpis, riskColors } from '@/lib/concept-data'\n",
    )
    aat = aat.replace(
        "      kpis={anticipatoryKpis}\n    >\n      <div className=\"grid gap-4 xl:grid-cols-[1.5fr_1fr]\">",
        "      kpis={anticipatoryKpis}\n    >\n      <SituationMap\n"
        "        title={mapStories.anticipatoryAction.title}\n"
        "        provinceColors={mapStories.anticipatoryAction.provinceColors}\n"
        "        markers={mapStories.anticipatoryAction.markers}\n"
        "        legend={mapStories.anticipatoryAction.legend}\n"
        "        story={mapStories.anticipatoryAction.story}\n"
        "        provinceStories={mapStories.anticipatoryAction.provinceStories}\n"
        "        heightClassName=\"min-h-[18rem] h-[min(42vh,26rem)]\"\n"
        "      />\n      <div className=\"grid gap-4 xl:grid-cols-[1.5fr_1fr]\">",
    )
    aa.write_text(aat, encoding="utf-8")
    print("patched anticipatory-action.tsx")
else:
    print("skip anticipatory-action")

print("done")

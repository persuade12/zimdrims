from pathlib import Path
import re

root = Path(r"c:\Users\persu\Desktop\Persuade\zimdrims")

pattern = re.compile(r"""(href\s*[:=]\s*)(['"])(/[^'"]*)\2""")

public_files = ("public-dashboard", "public-shell", "ops-login")

# In ops files, keep these as public-site destinations (no /ops prefix)
keep_public = {"/", "/alerts", "/risk-map", "/situation", "/statistics", "/preparedness", "/report-incident", "/resources", "/ops/login"}


def should_prefix(path: str, is_public_file: bool) -> bool:
    if path.startswith(("/ops", "/api", "http", "mailto", "tel", "#")):
        return False
    if is_public_file:
        return False
    # Allow explicit public-site links from ops (e.g. Public Site home)
    if path in keep_public:
        return False
    return True


changed = []
files = list(root.glob("lib/**/*.ts")) + list(root.glob("components/dare/**/*.tsx"))

for f in files:
    text = f.read_text(encoding="utf-8")
    rel = str(f.relative_to(root)).replace("\\", "/")
    is_public_file = any(p in rel for p in public_files)

    def repl(m, _is_public=is_public_file):
        prefix, quote, path = m.group(1), m.group(2), m.group(3)
        if should_prefix(path, _is_public):
            return f"{prefix}{quote}/ops{path}{quote}"
        return m.group(0)

    new = pattern.sub(repl, text)

    if not is_public_file:
        # Home breadcrumbs '/' -> '/ops'
        new = re.sub(r"(href:\s*)(['\"])/\2", r"\1\2/ops\2", new)
        new = new.replace("/ops/ops", "/ops")

    if new != text:
        f.write_text(new, encoding="utf-8")
        changed.append(rel)

print(f"updated {len(changed)} files")
for c in changed:
    print(c)

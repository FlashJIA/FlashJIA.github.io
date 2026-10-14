#!/bin/bash
# Build the website CVs from the real resumes, with the phone number removed.
# Edit only resume.tex / resume_en.tex; run this, then commit and push.
set -euo pipefail

SITE="$(cd "$(dirname "$0")/.." && pwd)"
RESUMES="$HOME/Desktop/duke/简历"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

build() {  # $1 = source .tex, $2 = sed expression, $3 = output pdf
  local src="$1" dir
  dir="$(dirname "$src")"
  sed -E "$2" "$src" > "$dir/_web.tex"
  if grep -Eq '[0-9]{3}[- ]?[0-9]{3,4}[- ]?[0-9]{4}' "$dir/_web.tex"; then
    echo "Phone number still in $(basename "$src"), aborting." >&2; rm -f "$dir/_web.tex"; exit 1
  fi
  (cd "$dir" && xelatex -interaction=nonstopmode -halt-on-error -output-directory="$TMP" _web.tex >/dev/null \
               && xelatex -interaction=nonstopmode -halt-on-error -output-directory="$TMP" _web.tex >/dev/null) \
    || { echo "LaTeX failed for $(basename "$src"), see $TMP/_web.log" >&2; rm -f "$dir/_web.tex"; trap - EXIT; exit 1; }
  rm -f "$dir/_web.tex"
  cp "$TMP/_web.pdf" "$SITE/files/$3"
  echo "Built files/$3"
}

build "$RESUMES/中文简历/latex/resume.tex"   's/\| 电话：[0-9]+ //'                          Shucheng_Jia_CV_zh.pdf
build "$RESUMES/英文简历/latex/resume_en.tex" 's/[0-9]{3}-[0-9]{3}-[0-9]{4} \\ \| \\$//'   Shucheng_Jia_CV.pdf

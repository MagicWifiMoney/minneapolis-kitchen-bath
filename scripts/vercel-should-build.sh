#!/usr/bin/env bash
# Vercel ignoreCommand helper — exit 0 = SKIP build, exit 1 = PROCEED with build
# Docs: https://vercel.com/docs/project-configuration/vercel-json#ignorecommand
set -euo pipefail

msg="${VERCEL_GIT_COMMIT_MESSAGE:-}"

# Explicit override — agents append [deploy] when a build is required after docs-only work
if echo "$msg" | grep -qiE '\[(force )?deploy\]'; then
  echo "✓ [deploy] in commit message — building"
  exit 1
fi

# Resolve diff range (Vercel shallow clone usually has HEAD^)
if git rev-parse --verify HEAD^ >/dev/null 2>&1; then
  range="HEAD^..HEAD"
else
  echo "⚠ No HEAD^ — building to be safe"
  exit 1
fi

changed="$(git diff --name-only "$range" 2>/dev/null || true)"
if [ -z "$changed" ]; then
  echo "✓ No file changes — skipping build"
  exit 0
fi

# Paths that always require a production build when touched
is_build_worthy() {
  local f="$1"
  case "$f" in
    app/*|components/*|lib/*|pages/*|src/*|public/*|styles/*|hooks/*|utils/*)
      return 0 ;;
    content/*|data/*|prisma/*|supabase/*|migrations/*|scripts/*)
      return 0 ;;
    package.json|package-lock.json|pnpm-lock.yaml|yarn.lock|bun.lockb)
      return 0 ;;
    next.config.*|vercel.json|tsconfig*.json|tailwind.config.*|postcss.config.*|middleware.*|.env.example)
      return 0 ;;
    *.tsx|*.ts|*.jsx|*.js|*.mjs|*.cjs|*.vue|*.svelte|*.css|*.scss)
      return 0 ;;
  esac
  return 1
}

while IFS= read -r file; do
  [ -z "$file" ] && continue
  if is_build_worthy "$file"; then
    echo "✓ Build-worthy change: $file — building"
    exit 1
  fi
done <<EOF
$changed
EOF

echo "✓ Only non-build files changed — skipping:"
echo "$changed" | sed 's/^/  /'
exit 0

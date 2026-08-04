echo "=== Checking usage of components/dashboard/* ==="
UNUSED_DASHBOARD=()
for f in ATSHeroCard ATSRing DashboardHeader InsightTimeline OverviewCards QuickStats ScoreBreakdown SkillsBars; do
  count=$(grep -rl "$f" src/pages src/components --include="*.jsx" 2>/dev/null | grep -v "src/components/dashboard/$f.jsx" | wc -l)
  if [ "$count" -eq 0 ]; then
    echo "  UNUSED: components/dashboard/$f.jsx"
    UNUSED_DASHBOARD+=("src/components/dashboard/$f.jsx")
  else
    echo "  USED:   components/dashboard/$f.jsx  (found in $count file(s) — NOT deleting, check manually)"
  fi
done

echo ""
echo "=== Checking usage of components/ui/* ==="
for f in Button Card PageTitle SectionTitle StatCard; do
  count=$(grep -rl "$f" src/pages src/components --include="*.jsx" 2>/dev/null | grep -v "src/components/ui/$f.jsx" | wc -l)
  if [ "$count" -eq 0 ]; then
    echo "  UNUSED: components/ui/$f.jsx  (kept — decide manually whether to delete or start using it)"
  else
    echo "  USED:   components/ui/$f.jsx  (found in $count file(s))"
  fi
done

echo ""
if [ ${#UNUSED_DASHBOARD[@]} -eq 0 ]; then
  echo "Nothing to delete — all dashboard/* components are referenced somewhere."
else
  echo "=== Files that will be deleted ==="
  printf '%s\n' "${UNUSED_DASHBOARD[@]}"
  read -p "Delete these files? (y/n) " confirm
  if [ "$confirm" = "y" ]; then
    rm "${UNUSED_DASHBOARD[@]}"
    echo "Deleted."
  else
    echo "Skipped — no files deleted."
  fi
fi

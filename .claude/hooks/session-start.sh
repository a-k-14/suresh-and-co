#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-/home/user/suresh-and-co}"

echo "[session-start] Checking npm dependencies..."

if [ -d node_modules ] && [ "$(ls node_modules | wc -l)" -gt 10 ]; then
  echo "[session-start] node_modules already populated, skipping install."
  exit 0
fi

echo "[session-start] Running npm install..."
npm install --no-audit --no-fund --legacy-peer-deps

echo "[session-start] Dependencies installed successfully."

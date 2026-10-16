#!/usr/bin/env bash
# Launches the Google Search Console MCP server declared in .mcp.json.
# When the GSC_SERVICE_ACCOUNT_JSON environment secret is set (raw JSON or
# base64), it is first written to the key file the server reads.
# stdout carries the MCP protocol, so diagnostics go to stderr only.
set -euo pipefail

export GSC_CREDENTIALS_PATH="${GSC_CREDENTIALS_PATH:-$HOME/.config/gsc/service-account.json}"

if [ -n "${GSC_SERVICE_ACCOUNT_JSON:-}" ]; then
  mkdir -p "$(dirname "$GSC_CREDENTIALS_PATH")"
  (
    umask 077
    case "$GSC_SERVICE_ACCOUNT_JSON" in
      *'{'*) printf '%s' "$GSC_SERVICE_ACCOUNT_JSON" > "$GSC_CREDENTIALS_PATH" ;;
      *) printf '%s' "$GSC_SERVICE_ACCOUNT_JSON" | base64 -d > "$GSC_CREDENTIALS_PATH" ;;
    esac
  ) || true
  if ! python3 -c 'import json, sys; json.load(open(sys.argv[1]))' "$GSC_CREDENTIALS_PATH" 2>/dev/null; then
    rm -f "$GSC_CREDENTIALS_PATH"
    echo "gsc-mcp: GSC_SERVICE_ACCOUNT_JSON is not valid JSON or base64-encoded JSON; ignoring it." >&2
  fi
fi
unset GSC_SERVICE_ACCOUNT_JSON

export GSC_SKIP_OAUTH=true
export GSC_ALLOW_DESTRUCTIVE=false
exec uvx mcp-search-console==0.4.1

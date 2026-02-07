---
"@astro-api/n8n-nodes-astrology": patch
---

Relax n8n-workflow peer dependency to accept any version

Changed `peerDependencies.n8n-workflow` from fixed `1.120.7` to `*` wildcard, allowing the package to be installed alongside any version of n8n-workflow without peer dependency conflicts.

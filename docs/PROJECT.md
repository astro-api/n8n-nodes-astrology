# n8n-nodes-astrology - Project Roadmap

## API Coverage

| Resource | Status | Endpoints | Priority |
|----------|--------|-----------|----------|
| Data | ✅ Complete | 9/9 | |
| Horoscope | ✅ Complete | 17/17 | |
| Charts | ✅ Complete | 11/11 | |
| Human Design | ✅ Complete | 8/8 | |
| Numerology | ✅ Complete | 3/3 | |
| Tarot | ✅ Complete | 19/19 | |
| Lunar | ⬜ Not started | 0/5 | 🟠 Medium |
| Vedic | ⬜ Not started | 0/22 | 🟠 Medium |
| Analysis | ⬜ Not started | 0/24 | 🟡 Low |
| Render/SVG | ⬜ Not started | 0/8 | 🟡 Low |
| Insights | ⬜ Not started | 0/31 | 🟢 On demand |
| Traditional | ⬜ Not started | 0/10 | 🟢 On demand |
| Astrocartography | ⬜ Not started | 0/13 | 🟢 On demand |
| Chinese | ⬜ Not started | 0/8 | 🔵 Future |
| Kabbalah | ⬜ Not started | 0/7 | 🔵 Future |
| Horary | ⬜ Not started | 0/6 | 🔵 Future |
| Fengshui | ⬜ Not started | 0/4 | 🔵 Future |
| Fixed Stars | ⬜ Not started | 0/4 | 🔵 Future |
| Enhanced | ⬜ Not started | 0/4 | 🔵 Future |
| PDF | ⬜ Not started | 0/4 | 🔵 Future |
| Glossary | ⬜ Not started | 0/14 | 🔵 Future |
| Eclipses | ⬜ Not started | 0/3 | 🔵 Future |
| Ziwei | ⬜ Not started | 0/1 | 🔵 Future |
| **Total** | | **67/237** | |

### Priority Legend

- 🔴 **High** - Top market demand (Human Design trend, Numerology often requested with astrology)
- 🟠 **Medium** - Strong market presence (Vedic for India market, Tarot for esoteric audience, Lunar cycles)
- 🟡 **Low** - Useful for AI agents (Analysis reports, Chart visualization)
- 🟢 **On demand** - B2B/niche features (Business insights, Traditional astrology, Astrocartography)
- 🔵 **Future** - Specialized markets (Chinese, Kabbalah, Horary, etc.)

---

## Technical Details

### Project Structure

```
n8n-nodes-astrology/
├── credentials/
│   └── AstrologyApi.credentials.ts    # API credentials
├── nodes/Astrology/
│   ├── Astrology.node.ts              # Main node (router pattern)
│   ├── astrology.svg                  # Node icon
│   ├── interfaces/                    # TypeScript types
│   ├── shared/                        # Reusable field creators
│   ├── operations/                    # UI parameter definitions
│   │   ├── resource.options.ts
│   │   ├── data.operation.ts
│   │   ├── horoscope.operation.ts
│   │   ├── charts.operation.ts
│   │   ├── humanDesign.operation.ts
│   │   ├── numerology.operation.ts
│   │   └── tarot.operation.ts
│   └── handlers/                      # Execute logic
│       ├── data.handler.ts
│       ├── horoscope.handler.ts
│       ├── charts.handler.ts
│       ├── humanDesign.handler.ts
│       ├── numerology.handler.ts
│       └── tarot.handler.ts
├── examples/                          # Workflow examples
├── docker/                            # Test environment
└── dist/                              # Compiled output
```

### Adding New Resources

1. Create `operations/{resource}.operation.ts` - UI parameters
2. Create `handlers/{resource}.handler.ts` - Execute logic
3. Add resource to `operations/resource.options.ts`
4. Export from barrel files
5. Add handler to `resourceHandlers` map in `Astrology.node.ts`

### Build & Test

```bash
npm run build                    # Compile TypeScript
npm run lint                     # Check code quality
cd docker && docker compose up   # Start test n8n at http://localhost:5678
```

### API Documentation

- **Base URL:** `https://api.astrology-api.io`
- **Auth:** Bearer token
- **Full docs:** https://api.astrology-api.io/rapidoc

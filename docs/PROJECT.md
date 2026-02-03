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
| Lunar | ✅ Complete | 5/5 | |
| Vedic | ✅ Complete | 22/22 | |
| Analysis | ✅ Complete | 24/24 | |
| Render | ✅ Complete | 4/4 | |
| Insights | ✅ Complete | 31/31 | |
| Traditional | ✅ Complete | 10/10 | |
| Astrocartography | ✅ Complete | 13/13 | |
| Chinese | ✅ Complete | 8/8 | |
| Kabbalah | ✅ Complete | 7/7 | |
| Horary | ⬜ Not started | 0/6 | 🔵 Future |
| Fengshui | ⬜ Not started | 0/4 | 🔵 Future |
| Fixed Stars | ⬜ Not started | 0/4 | 🔵 Future |
| Enhanced | ⬜ Not started | 0/4 | 🔵 Future |
| PDF | ⬜ Not started | 0/4 | 🔵 Future |
| Glossary | ⬜ Not started | 0/14 | 🔵 Future |
| Eclipses | ⬜ Not started | 0/3 | 🔵 Future |
| Ziwei | ⬜ Not started | 0/1 | 🔵 Future |
| **Total** | | **191/233** | |

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
│   │   ├── tarot.operation.ts
│   │   ├── lunar.operation.ts
│   │   ├── vedic.operation.ts
│   │   ├── analysis.operation.ts
│   │   ├── render.operation.ts
│   │   ├── insights.operation.ts
│   │   ├── traditional.operation.ts
│   │   ├── astrocartography.operation.ts
│   │   ├── chinese.operation.ts
│   │   └── kabbalah.operation.ts
│   └── handlers/                      # Execute logic
│       ├── data.handler.ts
│       ├── horoscope.handler.ts
│       ├── charts.handler.ts
│       ├── humanDesign.handler.ts
│       ├── numerology.handler.ts
│       ├── tarot.handler.ts
│       ├── lunar.handler.ts
│       ├── vedic.handler.ts
│       ├── analysis.handler.ts
│       ├── render.handler.ts
│       ├── insights.handler.ts
│       ├── traditional.handler.ts
│       ├── astrocartography.handler.ts
│       ├── chinese.handler.ts
│       └── kabbalah.handler.ts
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

export interface CVSection {
  title: string;
  items: CVItem[];
}

export interface CVItem {
  heading: string;
  subheading?: string;
  period?: string;
  bullets: string[];
  extended?: string[];
}

export const cvPublic: CVSection[] = [
  {
    title: "EXPERIENCE",
    items: [
      {
        heading: "Co-Founder",
        subheading: "Datex",
        period: "2024 – Present",
        bullets: [
          "Building data infrastructure and analytics products",
          "Full-stack development: React, TypeScript, Node.js",
        ],
      },
      {
        heading: "Data Engineer",
        subheading: "Swiss Re",
        period: "2023 – 2024",
        bullets: [
          "Enterprise data engineering on Palantir Foundry",
          "PySpark pipelines processing large-scale reinsurance data",
        ],
      },
      {
        heading: "Intern — Asset Management",
        subheading: "Swiss Life Asset Managers",
        period: "2022",
        bullets: [
          "Quantitative analysis and portfolio support",
        ],
      },
    ],
  },
  {
    title: "EDUCATION",
    items: [
      {
        heading: "BSc Investment & Financial Risk Management",
        subheading: "Bayes Business School (City, University of London)",
        period: "2021 – 2024",
        bullets: [
          "Top Decile — First Class Honours",
          "Modules: Derivatives, ML for Finance, Econometrics, Commodities",
        ],
      },
    ],
  },
  {
    title: "SKILLS",
    items: [
      {
        heading: "Languages & Frameworks",
        bullets: [
          "Python, C++, TypeScript, SQL, React, Node.js, PySpark",
        ],
      },
      {
        heading: "Domains",
        bullets: [
          "Derivatives pricing, volatility modeling, systematic trading",
          "Data engineering, full-stack web development",
        ],
      },
    ],
  },
];

export const cvExtended: CVSection[] = [
  {
    title: "EXPERIENCE",
    items: [
      {
        heading: "Co-Founder",
        subheading: "Datex",
        period: "2024 – Present",
        bullets: [
          "Building data infrastructure and analytics products for institutional clients",
          "Full-stack development: React, TypeScript, Node.js, PostgreSQL",
          "Designing and shipping production APIs (FastAPI, Redis caching)",
        ],
        extended: [
          "Architected the HKJC racing data API — live/historical data pipeline serving real-time odds, race cards, and results via REST endpoints",
          "Built the Datex web platform frontend with React and deployed on Vercel",
          "Responsible for product direction, technical architecture, and client relationships",
          "Exploring data products in sports analytics, prediction markets, and alternative data",
        ],
      },
      {
        heading: "Data Engineer",
        subheading: "Swiss Re",
        period: "2023 – 2024",
        bullets: [
          "Enterprise data engineering on Palantir Foundry for one of the world's largest reinsurers",
          "PySpark pipelines processing large-scale reinsurance datasets",
          "Worked across treaty accounting and claims data domains",
        ],
        extended: [
          "Built and maintained production PySpark ETL pipelines on Palantir Foundry, processing millions of reinsurance contract records",
          "Developed data quality frameworks and automated validation checks for treaty and claims data",
          "Collaborated with actuarial teams to deliver clean, queryable datasets for risk modeling",
          "Gained deep exposure to enterprise data governance, lineage tracking, and reproducible analytics",
          "Operated in a regulated environment with strict data controls — learned to build robust, auditable pipelines",
        ],
      },
      {
        heading: "Intern — Asset Management",
        subheading: "Swiss Life Asset Managers",
        period: "2022",
        bullets: [
          "Quantitative analysis and portfolio support for a major European insurer's investment arm",
        ],
        extended: [
          "Supported portfolio managers with quantitative analysis on fixed income and multi-asset portfolios",
          "Built reporting tools and performance attribution dashboards",
          "Exposure to institutional asset allocation and liability-driven investment frameworks",
          "First professional experience in the intersection of technology and investment management",
        ],
      },
    ],
  },
  {
    title: "EDUCATION",
    items: [
      {
        heading: "BSc Investment & Financial Risk Management",
        subheading: "Bayes Business School (City, University of London)",
        period: "2021 – 2024",
        bullets: [
          "First Class Honours — Top Decile of graduating class",
        ],
        extended: [
          "Specialized in derivatives pricing, quantitative methods, and financial econometrics",
          "Key modules: Derivatives (IF2209), ML for Finance, Advanced Econometrics & Financial Forecasting (FR3103), Energy & Commodities (FR3213), Real Estate (FR3214)",
          "Developed pysvi (published on PyPI) as independent research — SVI volatility surface calibration",
          "Active in trading competitions and quantitative finance societies",
          "Self-taught C++ and systems programming alongside the finance curriculum",
        ],
      },
    ],
  },
  {
    title: "SKILLS",
    items: [
      {
        heading: "Programming Languages",
        bullets: [
          "Python (advanced): NumPy, pandas, SciPy, scikit-learn, PySpark, FastAPI, Numba",
          "C++ (intermediate): STL, performance-critical option pricing implementations",
          "TypeScript/JavaScript (advanced): React, Next.js, Node.js, Express",
          "SQL (advanced): PostgreSQL, analytical queries, window functions",
        ],
      },
      {
        heading: "Quantitative Finance",
        bullets: [
          "Volatility surface calibration (SVI, SANOS), options Greeks, exotic pricing",
          "Systematic strategy research: factor models, momentum, mean-reversion",
          "Risk measurement: VaR, CVaR, GARCH, Extreme Value Theory",
          "Market microstructure: order book dynamics, market making, execution",
        ],
      },
      {
        heading: "Infrastructure & Tools",
        bullets: [
          "Palantir Foundry, PySpark, Redis, Docker, Vercel, Git",
          "Data pipeline design: ETL, streaming, data quality frameworks",
          "API design: RESTful services, caching strategies, rate limiting",
        ],
      },
    ],
  },
  {
    title: "PROJECTS & RESEARCH",
    items: [
      {
        heading: "Open Source & Research (37 public repositories)",
        bullets: [
          "pysvi — SVI volatility surface calibration library (PyPI)",
          "ndx-0dte-gamma-imbalance — Gamma arbitrage in NASDAQ-100 0DTE options",
          "option-pricer-cpp — C++ port of advanced option pricing models",
          "polymarket-bot — Algorithmic trading on prediction markets",
          "sysls — Multi-asset systematic long-short framework",
          "See 'repos' command for the complete catalogue",
        ],
      },
    ],
  },
];

export interface Repo {
  name: string;
  description: string;
  detail: string;
  language: string;
  stars: number;
  url: string;
  tags: string[];
  featured?: boolean;
}

export const repos: Repo[] = [
  {
    name: "pysvi",
    description: "SVI parametrization library for implied volatility surface calibration",
    detail:
      "A Python library (published on PyPI) implementing the Stochastic Volatility Inspired (SVI) parametrization of the implied volatility smile. Provides tools for calibrating volatility surfaces from market options data — useful for derivatives pricing, risk management, and volatility arbitrage research. Implements Gatheral's original SVI formulation with robust optimization routines.",
    language: "Python",
    stars: 1,
    url: "https://github.com/marwinsteiner/pysvi",
    tags: ["volatility", "derivatives", "quantitative-finance", "PyPI"],
    featured: true,
  },
  {
    name: "ndx-0dte-gamma-imbalance",
    description: "Gamma volatility arbitrage strategy for NDX options",
    detail:
      "A research project exploring gamma imbalance signals in NASDAQ-100 index options with zero days to expiry. Analyzes the relationship between dealer gamma positioning and intraday price dynamics. The strategy identifies exploitable dislocations when aggregate market-maker gamma exposure flips sign, creating predictable hedging flows that can be monetized with short-dated directional trades.",
    language: "Python",
    stars: 2,
    url: "https://github.com/marwinsteiner/ndx-0dte-gamma-imbalance",
    tags: ["options", "gamma", "0DTE", "volatility-arb"],
    featured: true,
  },
  {
    name: "polymarket-bot",
    description: "Algorithmic trading framework for Polymarket prediction markets",
    detail:
      "An automated trading system built for Polymarket, the leading crypto-native prediction market platform. Implements signal generation, order management, and position tracking for event-driven contracts. Explores the intersection of prediction markets and quantitative strategies — applying traditional systematic trading concepts to a novel asset class where pricing inefficiencies remain abundant.",
    language: "Python",
    stars: 2,
    url: "https://github.com/marwinsteiner/polymarket-bot",
    tags: ["prediction-markets", "algo-trading", "crypto", "event-driven"],
    featured: true,
  },
  {
    name: "option-pricer-cpp",
    description: "C++ port of Artur Sepp's Numba-accelerated Python volatility model",
    detail:
      "A high-performance C++ implementation of advanced option pricing models, ported from Artur Sepp's original Numba-accelerated Python code. Targets latency-sensitive applications where pure Python becomes a bottleneck. Demonstrates fluency in both Python prototyping and production C++ — the kind of dual-language capability essential in quantitative finance.",
    language: "C++",
    stars: 2,
    url: "https://github.com/marwinsteiner/option-pricer-cpp",
    tags: ["C++", "options-pricing", "performance", "volatility"],
    featured: true,
  },
  {
    name: "sysls",
    description: "Systematic multi-asset long-short strategy framework",
    detail:
      "A comprehensive framework for constructing, backtesting, and analyzing systematic long-short strategies across multiple asset classes. Implements factor-based signal generation, portfolio construction with risk budgeting, and realistic transaction cost modeling. Designed as a modular research platform for exploring cross-sectional and time-series momentum strategies.",
    language: "Python",
    stars: 0,
    url: "https://github.com/marwinsteiner/sysls",
    tags: ["systematic-trading", "multi-asset", "long-short", "backtesting"],
    featured: true,
  },
  {
    name: "hkjc-prediction",
    description: "Hong Kong Jockey Club horse racing prediction",
    detail:
      "Machine learning models for predicting Hong Kong horse racing outcomes using historical HKJC data. Explores feature engineering from race cards, track conditions, jockey/trainer statistics, and betting market signals. A fun side-project that applies the same quantitative discipline used in financial markets to a different domain where edge extraction and bankroll management matter just as much.",
    language: "Python",
    stars: 0,
    url: "https://github.com/marwinsteiner/hkjc-prediction",
    tags: ["machine-learning", "prediction", "horse-racing", "analytics"],
  },
  {
    name: "poker-cli",
    description: "CLI poker application",
    detail:
      "A command-line poker game built in TypeScript. Because sometimes you want to play cards in the terminal. Features hand evaluation, pot management, and AI opponents — a clean exercise in game logic, state machines, and building polished CLI experiences.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/marwinsteiner/poker-cli",
    tags: ["TypeScript", "CLI", "games", "poker"],
  },
  {
    name: "atm-vol-strategy",
    description: "Using at-the-money vols for systematic equity long-short",
    detail:
      "Research into using ATM implied volatility levels and term structure slopes as alpha signals for a systematic equity long-short strategy. Explores the idea that options markets price in forward-looking information about equity returns — stocks with elevated implied vol relative to realized may be pricing in upcoming moves that can be captured directionally.",
    language: "Python",
    stars: 0,
    url: "https://github.com/marwinsteiner/atm-vol-strategy",
    tags: ["volatility", "equity", "systematic-trading", "research"],
  },
  {
    name: "sanos-american-options",
    description: "SANOS surface fitting applied to American-style options",
    detail:
      "Implementation of the Smooth strictly Arbitrage-free Non-parametric Option Surface (SANOS) methodology for American-style options. Addresses the challenge that American options with early exercise premiums can violate standard European-calibrated surface fitting. Produces arbitrage-free implied volatility surfaces suitable for exotic pricing and risk management.",
    language: "Python",
    stars: 0,
    url: "https://github.com/marwinsteiner/sanos-american-options",
    tags: ["options", "volatility-surface", "American-options", "arbitrage-free"],
  },
  {
    name: "polygon-options-puller",
    description: "Download Polygon OPRA flat files from S3, store as compressed Parquet",
    detail:
      "A data engineering utility for pulling massive US options market data (OPRA feed) from Polygon.io's S3 buckets and converting them into efficient compressed Parquet format. Handles the unglamorous but essential plumbing of quantitative research — getting tick-level options data into a queryable format without blowing up your storage budget.",
    language: "Python",
    stars: 0,
    url: "https://github.com/marwinsteiner/polygon-options-puller",
    tags: ["data-engineering", "options-data", "Parquet", "Polygon"],
  },
  {
    name: "garch-gpd-estimation",
    description: "99% VaR estimation using GARCH with skewed-t and GPD tails",
    detail:
      "Estimates 99% Value at Risk using a univariate GARCH model with a skewed-t innovation distribution and Generalized Pareto Distribution (GPD) tails via Extreme Value Theory. Combines volatility clustering modeling with heavy-tail estimation — the kind of risk measurement that matters when your concern is the 1-in-100 day, not the average day.",
    language: "Jupyter Notebook",
    stars: 0,
    url: "https://github.com/marwinsteiner/garch-gpd-estimation",
    tags: ["risk-management", "VaR", "GARCH", "extreme-value-theory"],
  },
  {
    name: "hyperopter",
    description: "Hyperparameter optimization for algorithmic trading CI/CD",
    detail:
      "A hyperparameter optimization workflow designed to plug into a trading strategy CI/CD pipeline. Automates the process of tuning strategy parameters — lookback windows, threshold levels, position sizing — using Bayesian optimization. Treats strategy development as a proper software engineering discipline with automated testing and deployment.",
    language: "Python",
    stars: 2,
    url: "https://github.com/marwinsteiner/hyperopter",
    tags: ["hyperparameter-optimization", "CI/CD", "algo-trading", "Bayesian"],
  },
  {
    name: "perp-dashboard",
    description: "Perpetual futures arbitrage/reverse carry dashboard",
    detail:
      "A real-time dashboard for monitoring perpetual futures funding rate arbitrage opportunities. Tracks the spread between perp funding rates and spot yields across exchanges, visualizing when the 'reverse carry' trade becomes attractive. Built with TypeScript for a responsive, live-updating interface.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/marwinsteiner/perp-dashboard",
    tags: ["crypto", "arbitrage", "perpetual-futures", "dashboard"],
  },
  {
    name: "oex-market-maker",
    description: "S&P100 (OEX) futures market making simulation",
    detail:
      "A market making simulation for OEX (S&P 100) futures. Models the mechanics of providing liquidity — managing inventory risk, setting bid-ask spreads dynamically based on volatility and position, and handling adverse selection. Built in TypeScript as an educational tool for understanding how market makers actually operate.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/marwinsteiner/oex-market-maker",
    tags: ["market-making", "simulation", "futures", "TypeScript"],
  },
  {
    name: "greyhound-racing",
    description: "Predicting greyhound race finisher positions using ML",
    detail:
      "Machine learning models for predicting greyhound racing outcomes. Another application of quantitative methods to parimutuel betting markets — exploring whether historical race data, trap statistics, and form metrics contain enough signal to generate positive expected value against the tote pool.",
    language: "Jupyter Notebook",
    stars: 1,
    url: "https://github.com/marwinsteiner/greyhound-racing",
    tags: ["machine-learning", "prediction", "greyhound-racing", "betting"],
  },
  {
    name: "cutting-stock",
    description: "Streamlit app solving the cutting stock problem for a carpentry shop",
    detail:
      "A practical Streamlit application that solves the classic cutting stock optimization problem for a small carpentry shop. Minimizes material waste when cutting standard-length boards into custom pieces. A nice example of applying operations research to a real-world small business problem — not everything has to be about derivatives.",
    language: "Python",
    stars: 0,
    url: "https://github.com/marwinsteiner/cutting-stock",
    tags: ["optimization", "operations-research", "Streamlit", "practical"],
  },
  {
    name: "signal_processing_labs",
    description: "Jupyter notebooks for signal processing",
    detail:
      "A collection of Jupyter notebooks exploring signal processing fundamentals — Fourier transforms, filtering, spectral analysis. The mathematical foundations here connect directly to time-series analysis in quantitative finance: the same tools used to decompose audio signals can extract cyclical components from price data.",
    language: "Jupyter Notebook",
    stars: 1,
    url: "https://github.com/marwinsteiner/signal_processing_labs",
    tags: ["signal-processing", "Fourier", "Jupyter", "education"],
  },
  {
    name: "montecarlo",
    description: "Monte Carlo simulation from first principles",
    detail:
      "Monte Carlo methods implemented from scratch — no black-box libraries, just the raw mathematics. Covers random sampling, variance reduction techniques, and applications to option pricing and risk measurement. Understanding simulation at this level is foundational for anyone pricing complex derivatives or running scenario analysis.",
    language: "Jupyter Notebook",
    stars: 0,
    url: "https://github.com/marwinsteiner/montecarlo",
    tags: ["Monte-Carlo", "simulation", "first-principles", "education"],
  },
  {
    name: "pyfactor_model",
    description: "Multi-factor model implementation in Python",
    detail:
      "A from-scratch implementation of multi-factor equity models in Python. Constructs factor portfolios (value, momentum, quality, etc.), estimates factor exposures, and decomposes returns into systematic and idiosyncratic components. The workhorse of quantitative equity investing, implemented as a learning exercise.",
    language: "Python",
    stars: 0,
    url: "https://github.com/marwinsteiner/pyfactor_model",
    tags: ["factor-models", "equity", "quantitative-finance", "Python"],
  },
  {
    name: "draughts-nn",
    description: "Training a neural network to play draughts (checkers)",
    detail:
      "Training a neural network to play draughts from self-play. An exercise in reinforcement learning and game AI — teaching an agent to develop strategy through experience rather than hard-coded rules. Part of a broader interest in how machines can learn complex decision-making.",
    language: "Jupyter Notebook",
    stars: 0,
    url: "https://github.com/marwinsteiner/draughts-nn",
    tags: ["reinforcement-learning", "neural-network", "games", "AI"],
  },
  {
    name: "tqqq_rebalancing",
    description: "Systematic investment strategy around TQQQ (3x leveraged QQQ)",
    detail:
      "Research into systematic rebalancing strategies for TQQQ, the triple-leveraged NASDAQ-100 ETF. Explores how volatility drag, rebalancing frequency, and regime detection can be combined to improve risk-adjusted returns when holding leveraged products. Addresses the real question retail investors face: can you actually hold leveraged ETFs long-term if you're smart about it?",
    language: "Jupyter Notebook",
    stars: 0,
    url: "https://github.com/marwinsteiner/tqqq_rebalancing",
    tags: ["leveraged-ETF", "rebalancing", "systematic", "TQQQ"],
  },
  {
    name: "tqqq_d1_intraday",
    description: "An intraday D1 strategy for TQQQ",
    detail:
      "An intraday mean-reversion strategy targeting TQQQ using daily (D1) signals. Exploits the tendency of leveraged ETFs to exhibit predictable intraday patterns driven by rebalancing flows and retail sentiment shifts.",
    language: "Jupyter Notebook",
    stars: 0,
    url: "https://github.com/marwinsteiner/tqqq_d1_intraday",
    tags: ["intraday", "mean-reversion", "TQQQ", "strategy"],
  },
  {
    name: "zero-dte-butterflies",
    description: "Backtesting zero DTE butterflies around the expected move",
    detail:
      "Backtesting butterfly spread strategies using zero days-to-expiry options, centered around the market's expected move. Explores whether selling premium at the expected move boundaries via butterfly structures offers a systematic edge in 0DTE options — one of the hottest areas in modern retail and institutional options trading.",
    language: "Python",
    stars: 0,
    url: "https://github.com/marwinsteiner/zero-dte-butterflies",
    tags: ["0DTE", "butterflies", "options", "backtesting"],
  },
  {
    name: "trade-accounting",
    description: "Trade accounting system using RegEx on tastytrade fill confirms",
    detail:
      "A scrappy trade accounting system that parses tastytrade fill confirmations using regular expressions to track P&L, positions, and trade history. The kind of practical tool you build when you're actually trading and need to reconcile your book without paying for expensive portfolio management software.",
    language: "Python",
    stars: 0,
    url: "https://github.com/marwinsteiner/trade-accounting",
    tags: ["trade-accounting", "RegEx", "tastytrade", "portfolio"],
  },
  {
    name: "brute-force",
    description: "Experiments with brute-forcing in Python",
    detail:
      "A small experiment exploring brute-force search techniques in Python. Educational exploration of computational complexity, search spaces, and why we need smarter algorithms — sometimes the best way to appreciate optimization is to see what happens without it.",
    language: "Jupyter Notebook",
    stars: 0,
    url: "https://github.com/marwinsteiner/brute-force",
    tags: ["algorithms", "brute-force", "education", "Python"],
  },
  {
    name: "dsa_in_python",
    description: "Data Structures & Algorithms in Python (DataCamp)",
    detail:
      "Coursework and exercises from the DataCamp Data Structures & Algorithms in Python course. Covers the foundational CS knowledge — trees, graphs, sorting, searching — that underpins everything from database internals to order book matching engines.",
    language: "Python",
    stars: 0,
    url: "https://github.com/marwinsteiner/dsa_in_python",
    tags: ["DSA", "algorithms", "data-structures", "education"],
  },
  {
    name: "ml_for_finance",
    description: "Machine Learning for Finance — Bayes Business School",
    detail:
      "Coursework from the Machine Learning for Finance module at Bayes Business School (Finance Cluster, UG Stage 2). Covers supervised and unsupervised learning techniques applied to financial data — classification of credit risk, prediction of returns, and clustering of market regimes.",
    language: "Jupyter Notebook",
    stars: 0,
    url: "https://github.com/marwinsteiner/ml_for_finance",
    tags: ["machine-learning", "finance", "Bayes", "education"],
  },
  {
    name: "swe-with-llms",
    description: "Software engineering workflow with IDE-integrated LLMs",
    detail:
      "Documentation of a software engineering workflow that integrates LLMs directly into the development process — using IDE-integrated AI for code generation alongside external validation models for review. An early exploration of how AI pair-programming changes the development feedback loop.",
    language: "Markdown",
    stars: 1,
    url: "https://github.com/marwinsteiner/swe-with-llms",
    tags: ["LLM", "software-engineering", "workflow", "AI"],
  },
  {
    name: "options-cheatsheet",
    description: "Comprehensive options pricing formula collection",
    detail:
      "A comprehensive formula reference for Dr. Franus' IF2209 Derivatives module — covering Black-Scholes, Greeks, put-call parity, binomial models, and exotic option pricing. The kind of reference sheet that saves you during exam season and remains useful on a trading desk.",
    language: "LaTeX",
    stars: 0,
    url: "https://github.com/marwinsteiner/options-cheatsheet",
    tags: ["options", "derivatives", "cheatsheet", "education"],
  },
  {
    name: "financial-ratios-cheatsheet",
    description: "Financial ratios cheat sheet with limitations",
    detail:
      "A reference sheet of key financial ratios — profitability, liquidity, solvency, efficiency — along with honest discussion of their limitations. Because knowing when a ratio is misleading is more valuable than memorizing the formula.",
    language: "Markdown",
    stars: 0,
    url: "https://github.com/marwinsteiner/financial-ratios-cheatsheet",
    tags: ["finance", "ratios", "fundamentals", "education"],
  },
  {
    name: "lendflow",
    description: "A new way to lend",
    detail:
      "An exploration of alternative lending models — rethinking how credit can be extended using technology and data. Early-stage project exploring the intersection of fintech and credit markets.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/marwinsteiner/lendflow",
    tags: ["fintech", "lending", "credit", "innovation"],
  },
  {
    name: "dorks",
    description: "Information is free",
    detail:
      "A collection of search engine dorks and OSINT techniques. Because information wants to be free, and knowing how to find it is a skill in itself. A nod to the hacker ethos that underpins good security research.",
    language: "Text",
    stars: 0,
    url: "https://github.com/marwinsteiner/dorks",
    tags: ["OSINT", "security", "search", "hacking"],
  },
  {
    name: "pulse",
    description: "Developer productivity tool for individuals, teams, and organizations",
    detail:
      "A developer productivity measurement tool designed to give individuals, teams, and organizations visibility into engineering output. Tracks meaningful metrics beyond lines of code — review turnaround, deployment frequency, and focus time.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/marwinsteiner/pulse",
    tags: ["developer-tools", "productivity", "engineering", "metrics"],
  },
  {
    name: "adv_financial_forecasting_notes",
    description: "Notes for FR3103 Advanced Econometrics & Financial Forecasting",
    detail:
      "Lecture notes and study materials for the Advanced Econometrics & Financial Forecasting module (FR3103) taught by Dr. Malvina Marchese at Bayes Business School. Covers time-series econometrics, cointegration, VAR models, and forecasting methodologies used in quantitative finance.",
    language: "Markdown",
    stars: 0,
    url: "https://github.com/marwinsteiner/adv_financial_forecasting_notes",
    tags: ["econometrics", "forecasting", "time-series", "education"],
  },
  {
    name: "energy-and-commodities",
    description: "FR3213 Energy & Commodities — Prof. Michael Tamvakis",
    detail:
      "Course materials for the Energy & Commodities module under Prof. Michael Tamvakis. Covers commodity market microstructure, energy derivatives, storage economics, and the physical-financial commodity nexus.",
    language: "Markdown",
    stars: 0,
    url: "https://github.com/marwinsteiner/energy-and-commodities",
    tags: ["commodities", "energy", "derivatives", "education"],
  },
  {
    name: "real-estate-principles-and-practice",
    description: "FR3214 Real Estate under Prof. Sotiris Tsolacos",
    detail:
      "Materials for the Real Estate Principles and Practice module taught by Prof. Sotiris Tsolacos. Covers property valuation, real estate investment analysis, REITs, and the role of real estate in multi-asset portfolios.",
    language: "Markdown",
    stars: 0,
    url: "https://github.com/marwinsteiner/real-estate-principles-and-practice",
    tags: ["real-estate", "investment", "valuation", "education"],
  },
];

export const repoCategories = {
  "Derivatives & Volatility": [
    "pysvi",
    "ndx-0dte-gamma-imbalance",
    "option-pricer-cpp",
    "sanos-american-options",
    "zero-dte-butterflies",
    "garch-gpd-estimation",
    "atm-vol-strategy",
    "montecarlo",
  ],
  "Systematic Trading": [
    "sysls",
    "hyperopter",
    "tqqq_rebalancing",
    "tqqq_d1_intraday",
    "pyfactor_model",
    "trade-accounting",
  ],
  "Prediction & Event Markets": [
    "polymarket-bot",
    "hkjc-prediction",
    "greyhound-racing",
  ],
  "Infrastructure & Tools": [
    "polygon-options-puller",
    "perp-dashboard",
    "oex-market-maker",
    "cutting-stock",
    "pulse",
    "poker-cli",
  ],
  "Research & Education": [
    "signal_processing_labs",
    "ml_for_finance",
    "dsa_in_python",
    "options-cheatsheet",
    "financial-ratios-cheatsheet",
    "adv_financial_forecasting_notes",
    "energy-and-commodities",
    "real-estate-principles-and-practice",
    "draughts-nn",
    "brute-force",
  ],
  "Other": [
    "swe-with-llms",
    "lendflow",
    "dorks",
  ],
};

// Authority source library for YMYL blog posts.
// Each cluster maps to 4-6 primary sources cited inline. Linking out to
// .gov / .edu / established orgs is a core E-E-A-T signal — Google's
// Helpful Content classifier penalizes long-form YMYL content with no
// outbound authority links.

export interface ExternalSource {
  name: string;
  url: string;
  description: string;
}

export const SOURCE_CLUSTERS: Record<string, ExternalSource[]> = {
  tax: [
    { name: 'IRS — About Form W-2', url: 'https://www.irs.gov/forms-pubs/about-form-w-2', description: 'Official IRS reference for W-2 wage and tax statements, with current-year instructions.' },
    { name: 'IRS — Publication 17 (Your Federal Income Tax)', url: 'https://www.irs.gov/publications/p17', description: 'Comprehensive guide to filing individual federal income taxes.' },
    { name: 'IRS — Tax Withholding Estimator', url: 'https://www.irs.gov/individuals/tax-withholding-estimator', description: 'Official tool for verifying paycheck withholding accuracy.' },
    { name: 'IRS — Tax Topic 409 (Capital Gains and Losses)', url: 'https://www.irs.gov/taxtopics/tc409', description: 'Authoritative source for short-term and long-term capital gains tax treatment.' },
    { name: 'CFPB — Filing Your Taxes', url: 'https://www.consumerfinance.gov/consumer-tools/educator-tools/youth-financial-education/teach/topic/filing-your-taxes/', description: 'Consumer Financial Protection Bureau guidance on tax-filing essentials.' },
  ],

  retirement: [
    { name: 'IRS — 401(k) Contribution Limits', url: 'https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits', description: 'Annual 401(k) contribution and catch-up limits set by the IRS.' },
    { name: 'IRS — IRAs', url: 'https://www.irs.gov/retirement-plans/individual-retirement-arrangements-iras', description: 'Traditional vs Roth IRA rules, contribution limits, and distribution requirements.' },
    { name: 'Social Security Administration', url: 'https://www.ssa.gov/benefits/retirement/', description: 'Official source for Social Security retirement benefit calculations and claiming strategies.' },
    { name: 'DOL — Employee Retirement Income Security Act (ERISA)', url: 'https://www.dol.gov/general/topic/retirement/erisa', description: 'Federal regulations governing employer-sponsored retirement plans.' },
    { name: 'SEC — Investor.gov: Retirement Toolkit', url: 'https://www.investor.gov/financial-tools-calculators/calculators/retirement-savings-toolkit', description: 'SEC-published retirement planning calculators and educational materials.' },
  ],

  mortgage: [
    { name: 'CFPB — Owning a Home', url: 'https://www.consumerfinance.gov/owning-a-home/', description: 'Official CFPB guide to home buying, mortgage shopping, and closing.' },
    { name: 'Freddie Mac — Primary Mortgage Market Survey (PMMS)', url: 'https://www.freddiemac.com/pmms', description: 'Weekly national average mortgage rates for 30-year and 15-year fixed loans.' },
    { name: 'HUD — FHA Loan Limits', url: 'https://www.hud.gov/program_offices/housing/sfh/lender/origination/mortgage_limits', description: 'Annual FHA loan limits by county and property type.' },
    { name: 'CFPB — Closing Disclosure Explainer', url: 'https://www.consumerfinance.gov/owning-a-home/closing-disclosure/', description: 'Line-by-line guide to the standard mortgage closing disclosure form.' },
    { name: 'Fannie Mae — Mortgage Calculators & Tools', url: 'https://www.fanniemae.com/here-help-renters/calculators-tools', description: 'Government-sponsored enterprise resources for affordability and refinance analysis.' },
  ],

  credit: [
    { name: 'CFPB — Credit Reports and Scores', url: 'https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/', description: 'Official CFPB guide to checking, understanding, and disputing credit reports.' },
    { name: 'FTC — Free Credit Reports (annualcreditreport.com)', url: 'https://www.consumer.ftc.gov/articles/free-credit-reports', description: 'The only federally authorized source for free annual credit reports.' },
    { name: 'CFPB — Improving Your Credit Score', url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-get-and-keep-a-good-credit-score-en-318/', description: 'Evidence-based guidance on building and maintaining credit scores.' },
    { name: 'FICO — How Credit Scores Are Calculated', url: 'https://www.myfico.com/credit-education/whats-in-your-credit-score', description: 'Direct explanation of FICO score factors from the company that creates the score.' },
  ],

  insurance: [
    { name: 'NAIC — Consumer Information', url: 'https://content.naic.org/consumer.htm', description: 'National Association of Insurance Commissioners guidance for consumers.' },
    { name: 'CFPB — Insurance Topics', url: 'https://www.consumerfinance.gov/ask-cfpb/category-insurance/', description: 'Federal consumer-protection guidance on insurance products and disputes.' },
    { name: 'HealthCare.gov', url: 'https://www.healthcare.gov/', description: 'Official federal marketplace for ACA-compliant health insurance plans.' },
    { name: 'Medicare.gov', url: 'https://www.medicare.gov/', description: 'Official source for Medicare eligibility, enrollment, and coverage rules.' },
    { name: 'III — Insurance Information Institute', url: 'https://www.iii.org/', description: 'Industry-funded research on auto, home, life, and health insurance trends.' },
  ],

  debt: [
    { name: 'CFPB — Debt Collection', url: 'https://www.consumerfinance.gov/consumer-tools/debt-collection/', description: 'Federal rules and consumer rights under the Fair Debt Collection Practices Act.' },
    { name: 'FTC — Coping with Debt', url: 'https://consumer.ftc.gov/articles/coping-debt', description: 'Federal Trade Commission guidance on debt management options and warning signs of scams.' },
    { name: 'CFPB — Student Loans', url: 'https://www.consumerfinance.gov/consumer-tools/student-loans/', description: 'Guidance on federal and private student loan repayment, deferment, and forgiveness.' },
    { name: 'StudentAid.gov — Repayment Plans', url: 'https://studentaid.gov/manage-loans/repayment/plans', description: 'Official Department of Education portal for federal student loan repayment options.' },
  ],

  budgeting: [
    { name: 'CFPB — Money Topics for Adults', url: 'https://www.consumerfinance.gov/consumer-tools/educator-tools/adult-financial-education/', description: 'Federally vetted budgeting and saving guides for adults.' },
    { name: 'BLS — Consumer Expenditure Surveys', url: 'https://www.bls.gov/cex/', description: 'Bureau of Labor Statistics data on average household spending by category.' },
    { name: 'FDIC — Money Smart Curriculum', url: 'https://www.fdic.gov/resources/consumers/money-smart/', description: 'FDIC financial-education curriculum used by community organizations nationwide.' },
    { name: 'CFPB — Emergency Fund Guide', url: 'https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/', description: 'CFPB framework for sizing and building a household emergency fund.' },
  ],

  investing: [
    { name: 'SEC — Investor.gov', url: 'https://www.investor.gov/', description: 'SEC investor education hub covering stocks, bonds, mutual funds, and ETFs.' },
    { name: 'FINRA — Investor Education', url: 'https://www.finra.org/investors', description: 'Industry self-regulator guidance on broker selection, fees, and risk.' },
    { name: 'SEC — Mutual Funds and ETFs Guide', url: 'https://www.sec.gov/files/ib_mutualfunds.pdf', description: 'Official SEC investor bulletin comparing mutual funds and ETFs.' },
    { name: 'Federal Reserve — Survey of Consumer Finances', url: 'https://www.federalreserve.gov/econres/scfindex.htm', description: 'Triennial Federal Reserve survey of US household income, assets, and net worth.' },
  ],

  health: [
    { name: 'CDC — Healthy Weight & BMI', url: 'https://www.cdc.gov/healthyweight/assessing/bmi/index.html', description: 'CDC guidance on adult and child BMI calculation and interpretation.' },
    { name: 'NIH — Office of Dietary Supplements', url: 'https://ods.od.nih.gov/', description: 'NIH evidence-based information on vitamins, minerals, and supplements.' },
    { name: 'WHO — Body Mass Index', url: 'https://www.who.int/data/gho/data/themes/topics/topic-details/GHO/body-mass-index', description: 'WHO standard BMI classification cutoffs used internationally.' },
    { name: 'USDA — Dietary Guidelines for Americans', url: 'https://www.dietaryguidelines.gov/', description: 'Official USDA/HHS dietary recommendations updated every five years.' },
    { name: 'AHA — American Heart Association', url: 'https://www.heart.org/en/healthy-living', description: 'Evidence-based guidance on cardiovascular health, exercise, and nutrition.' },
  ],

  pregnancy: [
    { name: 'ACOG — American College of Obstetricians and Gynecologists', url: 'https://www.acog.org/womens-health', description: 'Authoritative clinical guidance on pregnancy, prenatal care, and women\'s health.' },
    { name: 'CDC — Pregnancy', url: 'https://www.cdc.gov/pregnancy/', description: 'CDC public-health guidance on pregnancy planning, care, and complications.' },
    { name: 'NIH — National Institute of Child Health and Human Development', url: 'https://www.nichd.nih.gov/health/topics/pregnancy', description: 'NIH research-based information on pregnancy and fetal development.' },
    { name: 'Mayo Clinic — Pregnancy Week by Week', url: 'https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/basics/pregnancy/hlv-20049471', description: 'Clinically reviewed week-by-week pregnancy reference from Mayo Clinic physicians.' },
  ],

  smallbiz: [
    { name: 'SBA — Small Business Administration', url: 'https://www.sba.gov/', description: 'Federal agency resources for starting, financing, and growing a small business.' },
    { name: 'IRS — Self-Employed Individuals Tax Center', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center', description: 'Official IRS hub for self-employment tax, estimated payments, and Schedule C.' },
    { name: 'SCORE — Mentors for Small Business', url: 'https://www.score.org/', description: 'SBA-affiliated mentorship and business-planning resources.' },
    { name: 'IRS — LLC vs S-Corp Tax Treatment', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/s-corporations', description: 'Official IRS reference on S-corporation election and tax treatment.' },
  ],
};

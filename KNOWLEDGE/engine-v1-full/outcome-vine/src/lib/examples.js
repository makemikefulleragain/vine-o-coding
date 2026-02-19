export const grantsHubExample = {
  step1: {
    projectName: 'Community Grants Hub',
    whatItDoes: 'Helps small nonprofits track their grant spending and produce acquittal reports.',
    whoItsFor: 'Volunteer treasurers at small Australian community organisations.',
    problemItSolves: 'Treasurers spend hours in Excel matching receipts to budgets. Some orgs avoid applying for grants because the reporting is too hard.',
  },
  step2: {
    primaryUserName: 'Sandra',
    primaryUserSituation: 'Volunteer treasurer at a neighbourhood house. She has 3 hours on Saturday to do the books. She uses Excel and a paper folder of receipts.',
    secondaryUser: 'Grant managers at larger nonprofits who handle multiple small grants.',
  },
  step3: {
    whatItsNot: 'Not accounting software (use Xero for that). Not a grant discovery tool (use GrantConnect). Not a grant application writer (use SmartyGrants).',
    harmConsiderations: 'Handles financial data — needs disclaimer that it\'s not financial advice. Failed acquittals can blacklist orgs from future grants.',
  },
  step4: {
    phase1Goal: 'Make It Real — move data from browser storage to a real database so it doesn\'t disappear.',
    phase2Goal: 'Make It Useful — let users manage multiple grants, import bank statements, export data.',
    phase3Goal: 'Make It Trustworthy — about page, privacy policy, FAQ, data deletion.',
  },
  step5: {
    deploymentChoice: 'netlify',
    hasDatabase: true,
    techNotes: 'Needs to handle financial data securely. Integration with Xero/MYOB would be nice eventually.',
  },
}

export const recipeRemixExample = {
  step1: {
    projectName: 'Recipe Remix',
    whatItDoes: 'A place for our cooking club to share recipes, rate them, and plan what to cook next.',
    whoItsFor: 'Maya\'s school cooking club — 12 members, years 9-10.',
    problemItSolves: 'Recipes are scattered across group chats, screenshots, and random websites. Nobody can find anything when it\'s time to cook.',
  },
  step2: {
    primaryUserName: 'Anika',
    primaryUserSituation: 'Year 10, runs the cooking club WhatsApp group. She plans each session and picks the recipe. She\'s on her phone, usually during lunch.',
    secondaryUser: 'Club members who want to browse recipes and add their own.',
  },
  step3: {
    whatItsNot: 'Not a social media app. Not a meal delivery service. Not a calorie counter.',
    harmConsiderations: 'Food allergies — should show allergen warnings on recipes. School-age users — no personal info beyond first names.',
  },
  step4: {
    phase1Goal: 'Show a list of recipes with photos and ingredient lists. Anyone in the club can browse.',
    phase2Goal: 'Let members add new recipes with a simple form. Rate and comment on recipes.',
    phase3Goal: 'Plan next session — vote on which recipe to cook, generate a shopping list.',
  },
  step5: {
    deploymentChoice: 'netlify',
    hasDatabase: false,
    techNotes: 'Need image uploads for recipe photos.',
  },
}

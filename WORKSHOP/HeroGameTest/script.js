// --- CONFIGURATION ---
const HERO_PROJECTS_TO_WIN = 3;
const GRUMP_METER_MAX = 10;
const HERO_STARTING_ENERGY = 3;
const HERO_ENERGY_GAIN_PER_TURN = 2;
const GRUMP_STARTING_TOKENS = 3;
const GRUMP_TOKEN_GAIN_PER_TURN = 1;
const MAX_ENERGY_COMMIT = 3;
const MAX_HERO_HELPER_CARDS = 2; // Max cards a hero can hold
const MAX_GRUMP_CARDS = 3;

// --- GAME DATA DEFINITIONS ---
let gameState = {};
const HERO_NAMES = ["Leo the Leader 🦁", "Pip the Planner ✏️", "Rosie the Builder 🔨", "Sam the Fixer 🔧"];

const ALL_PROJECT_CARDS = [
    {
        id: "p1", title: "Build a Treehouse! 🌳🏠",
        steps: [
            { id: "p1s1", text: "Gather Wood 🪵", energyCommitted: 0, completed: false, difficultyMod: 0 },
            { id: "p1s2", text: "Draw Cool Plans 🗺️", energyCommitted: 0, completed: false, difficultyMod: 0 },
            { id: "p1s3", text: "Build it High! 🔨", energyCommitted: 0, completed: false, difficultyMod: 0 }
        ]
    },
    {
        id: "p2", title: "Plant a Rainbow Garden! 🌈",
        steps: [
            { id: "p2s1", text: "Dig the Soil 🌱", energyCommitted: 0, completed: false, difficultyMod: 0 },
            { id: "p2s2", text: "Plant Colorful Flowers 🌷", energyCommitted: 0, completed: false, difficultyMod: 0 },
            { id: "p2s3", text: "Water Everything 💧", energyCommitted: 0, completed: false, difficultyMod: 0 }
        ]
    },
    {
        id: "p3", title: "Neighborhood Party! 🎉",
        steps: [
            { id: "p3s1", text: "Send Invitations 💌", energyCommitted: 0, completed: false, difficultyMod: 0 },
            { id: "p3s2", text: "Bake Yummy Snacks 🍪", energyCommitted: 0, completed: false, difficultyMod: 0 },
            { id: "p3s3", text: "Decorate with Balloons 🎈", energyCommitted: 0, completed: false, difficultyMod: 0 }
        ]
    }
];

const ALL_HELPER_CARDS = [
    { id: "h1", name: "Extra Energy! ✨", text: "Get +1 Energy Token now.", action: (gs, heroId) => { const hero = gs.heroes.find(h=>h.id === heroId); if(hero) hero.energy++; logEvent(`${hero.name} gets +1 Energy from a Helper Card!`);} },
    { id: "h2", name: "Teamwork! 🤝", text: "You and another Hero each get +1 Energy.", action: (gs, heroId) => {
        const currentHero = gs.heroes.find(h=>h.id === heroId);
        if(currentHero) currentHero.energy++;
        const otherHeroes = gs.heroes.filter(h => h.id !== heroId);
        if(otherHeroes.length > 0){
            const randomOtherHero = otherHeroes[Math.floor(Math.random() * otherHeroes.length)];
            randomOtherHero.energy++;
            logEvent(`${currentHero.name} and ${randomOtherHero.name} each get +1 Energy from Teamwork!`);
        } else if (currentHero) {
            logEvent(`${currentHero.name} gets +1 Energy (no other heroes to share with).`);
        }
     }},
    { id: "h3", name: "Good Luck Charm! 🍀", text: "Add +1 to your next die roll.", effectType: "roll_boost", value: 1 },
    { id: "h4", name: "Super Speedy! 🚀", text: "One step is easier: -1 from die roll needed (min 1).", effectType: "step_easier", value: 1 }
];

const ALL_GRUMP_CARDS = [
    { id: "g1", name: "Oops, Dropped It! 💥", text: "One Hero loses 1 Energy Token.", cost: 1, action: (gs) => { if(gs.heroes.length > 0) { const targetHero = gs.heroes[Math.floor(Math.random()*gs.heroes.length)]; targetHero.energy = Math.max(0, targetHero.energy-1); logEvent(`${targetHero.name} loses 1 Energy due to a Grumpy Trick!`); } } },
    { id: "g2", name: "Extra Hard! 🚧", text: "Make one Project Step harder (+1 to beat).", cost: 1, target: "step", action: (gs, stepId) => { if (!gs.currentProject) return; const step = gs.currentProject.steps.find(s=>s.id === stepId && !s.completed); if(step) {step.difficultyMod = (step.difficultyMod || 0) + 1; logEvent(`Step "${step.text}" is now harder for heroes!`);} } },
    { id: "g3", name: "So Tiring! 😩", text: "Next Hero to play gets 1 less Energy.", cost: 2, effectType: "next_hero_less_energy" },
    { id: "g4", name: "Grump Power! 😠", text: "Add +1 to the Grump Meter.", cost: 0, action: (gs) => { gs.grump.meter = Math.min(GRUMP_METER_MAX, gs.grump.meter + 1); logEvent("Baron Von Grump adds +1 to the Grump Meter!"); } }
];

const DOMElements = {
    roundIndicator: document.getElementById('round-indicator'),
    turnIndicator: document.getElementById('turn-indicator'),
    phaseIndicator: document.getElementById('phase-indicator'),
    passTurnOverlay: document.getElementById('pass-turn-overlay'),
    passTurnMessage: document.getElementById('pass-turn-message'),
    confirmNextPlayerButton: document.getElementById('confirm-next-player'),
    gameLog: document.getElementById('game-log'),
    guideText: document.getElementById('guide-text'),

    projectDeckCount: document.getElementById('project-deck-count'),
    helperDeckCount: document.getElementById('helper-deck-count'),
    grumpDeckCount: document.getElementById('grump-deck-count'),

    projectsCompletedCount: document.getElementById('projects-completed-count'),
    grumpMeterValue: document.getElementById('grump-meter-value'),

    projectTitle: document.getElementById('project-title'),
    projectGoalDisplay: document.getElementById('project-goal-display'),
    projectStepsTableau: document.getElementById('project-steps-tableau'),

    grumpStatusCompact: document.getElementById('grump-status-compact'),
    grumpTokensCompact: document.getElementById('grump-tokens-compact'),
    currentHeroDetail: document.getElementById('current-hero-detail'),
    allHeroesEnergyDisplay: document.getElementById('all-heroes-energy-display'),


    grumpCardHandDisplay: document.getElementById('grump-card-hand-display'),
    heroHelperCardHandDisplay: document.getElementById('hero-helper-card-hand-display'),

    grumpActionsDisplay: document.getElementById('grump-actions-display'),
    playGrumpCardButton: document.getElementById('play-grump-card-button'),
    heroActionsDisplay: document.getElementById('hero-actions-display'),
    playHelperCardButton: document.getElementById('play-helper-card-button'),
    energyCommitmentArea: document.getElementById('energy-commitment-area'),
    energyToCommit: document.getElementById('energy-to-commit'),
    commitEnergyAndRollButton: document.getElementById('commit-energy-and-roll-button'),

    nextPhaseButton: document.getElementById('next-phase-button'),
    diceResultDisplay: document.getElementById('dice-result-display'),
    diceResult: document.getElementById('dice-result'),
    // Simpler version might not use all of these, but good to have them defined
    scrambleOptions: document.getElementById('scramble-options'),
    globalBenefitsList: document.getElementById('global-benefits-list'),
    efficiencyUpgradesList: document.getElementById('efficiency-upgrades-list'),
    gameContainer: document.getElementById('game-container'), // For class toggling
};

// --- UTILITY FUNCTIONS ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function logEvent(message, type = "info") {
    const p = document.createElement('p');
    p.innerHTML = `[R${gameState.currentRound || 0}] ${message}`;
    if (type === "error") p.style.color = "#C0392B";
    if (type === "success") p.style.color = "#27AE60"; // Brighter green
    DOMElements.gameLog.prepend(p);
    if (DOMElements.gameLog.children.length > 30) {
        DOMElements.gameLog.removeChild(DOMElements.gameLog.lastChild);
    }
    DOMElements.gameLog.scrollTop = 0;
}

// --- INITIALIZATION ---
function initializeGame() {
    logEvent("Starting 'Neighborhood Heroes vs. Baron Von Grump!'");
    let heroes = [];
    for (let i = 0; i < 4; i++) {
        heroes.push({
            id: `hero${i+1}`,
            name: HERO_NAMES[i % HERO_NAMES.length],
            energy: HERO_STARTING_ENERGY,
            helperHand: [],
            activeEffects: []
        });
    }

    gameState = {
        currentRound: 1,
        currentPlayerIndex: 0,
        allPlayers: [...heroes.map(h => h.id), 'grump'],
        currentPhase: "SETUP",
        projectsCompleted: 0,
        heroes: heroes,
        grump: {
            id: "grump", name: "Baron Von Grump",
            grumpTokens: GRUMP_STARTING_TOKENS, grumpHand: [], meter: 0, activeEffects: []
        },
        decks: {
            project: shuffleArray([...ALL_PROJECT_CARDS]),
            helper: shuffleArray([...ALL_HELPER_CARDS]),
            grump: shuffleArray([...ALL_GRUMP_CARDS]),
        },
        currentProject: null, selectedStepId: null, gameMessage: "", gameOver: false
    };

    drawNewProjectCard();
    for (let i = 0; i < 2; i++) drawGrumpCard(true); // Silent draw
    gameState.heroes.forEach(h => drawHelperCard(h.id, true)); // Silent draw

    DOMElements.nextPhaseButton.textContent = "Start Game!";
    DOMElements.nextPhaseButton.onclick = () => {
        gameState.currentPhase = "NEW_ROUND_START";
        advanceGame();
    };
    DOMElements.nextPhaseButton.disabled = false;
    renderFullUI();
}

// --- DECK & CARD FUNCTIONS ---
function drawNewProjectCard() {
    if (gameState.decks.project.length > 0) {
        gameState.currentProject = JSON.parse(JSON.stringify(gameState.decks.project.pop()));
        gameState.currentProject.steps.forEach(step => {
            step.energyCommitted = 0; step.completed = false; step.difficultyMod = 0;
        });
        logEvent(`New Project: ${gameState.currentProject.title}!`);
    } else {
        logEvent("Oh no! No more projects! Baron Von Grump might win if you haven't completed enough!", "error");
        gameState.currentProject = null;
        checkWinConditions(true);
    }
}
function drawHelperCard(heroId, silent = false) {
    const hero = gameState.heroes.find(h => h.id === heroId);
    if (hero && gameState.decks.helper.length > 0 && hero.helperHand.length < MAX_HERO_HELPER_CARDS) {
        hero.helperHand.push(gameState.decks.helper.pop());
        if (!silent) logEvent(`${hero.name} drew a Helper Card!`);
    } else if (hero && hero.helperHand.length >= MAX_HERO_HELPER_CARDS && !silent) {
        logEvent(`${hero.name}'s hand is full of Helper Cards.`);
    }
}
function drawGrumpCard(silent = false) {
    if (gameState.decks.grump.length > 0 && gameState.grump.grumpHand.length < MAX_GRUMP_CARDS) {
        gameState.grump.grumpHand.push(gameState.decks.grump.pop());
        if (!silent) logEvent(`Baron Von Grump drew a Grumpy Trick Card!`);
    } else if (!silent) {
        logEvent(`Baron Von Grump's hand is full of Grumpy Tricks.`);
    }
}

// --- UI RENDERING & GUIDE ---
function updateGuideText() {
    const currentPlayerId = gameState.allPlayers[gameState.currentPlayerIndex];
    const hero = gameState.heroes.find(h => h.id === currentPlayerId);
    let text = "";

    if (gameState.gameOver) {
        if (gameState.projectsCompleted >= HERO_PROJECTS_TO_WIN) {
            text = "YAAY! The Neighborhood Heroes won! You made everything super fun! 🥳 Refresh to play again!";
        } else {
            text = "Oh dear! Baron Von Grump won this time. 🙁 Try again? Refresh the page!";
        }
    } else {
        switch (gameState.currentPhase) {
            case "SETUP": text = "Welcome! Let's make our neighborhood super fun! Click 'Start Game' when you're ready!"; break;
            case "HERO_TURN_START":
            case "HERO_TURN":
                if (hero) {
                    text = `Okay, ${hero.name}! It's your turn to help! You have ${hero.energy} Energy. ✨ `;
                    if (!gameState.selectedStepId) {
                        text += "Look at the Project Steps and click one you want to work on!";
                    } else {
                        const step = gameState.currentProject.steps.find(s => s.id === gameState.selectedStepId);
                        text += `You chose "${step.text}". How much Energy (1-${MAX_ENERGY_COMMIT}) will you use? Then click 'Do it!' to roll the die! 🎲`;
                    }
                    text += " You can also play one Helper Card from your hand first!";
                }
                break;
            case "HERO_ACTION_RESULT":
                text = `Great job, ${hero.name}! Check the game log to see what happened. Ready for the next thing? Click 'Next Action / End Turn'.`;
                break;
            case "GRUMP_TURN_START":
            case "GRUMP_TURN":
                text = "Uh oh! It's Baron Von Grump's turn! 😠 He's looking at his Grumpy Trick cards. He'll try to make things difficult!";
                break;
            default: text = "Let's see what happens next...";
        }
    }
    DOMElements.guideText.innerHTML = text;
}

function renderFullUI() {
    const currentPlayerId = gameState.allPlayers[gameState.currentPlayerIndex];
    const currentPlayerObject = currentPlayerId === 'grump' ? gameState.grump : gameState.heroes.find(h => h.id === currentPlayerId);

    DOMElements.roundIndicator.textContent = `Round: ${gameState.currentRound}`;
    DOMElements.phaseIndicator.textContent = `Phase: ${gameState.currentPhase.replace(/_/g, ' ')}`;
    DOMElements.turnIndicator.textContent = `Turn: ${currentPlayerObject ? currentPlayerObject.name : 'System'}`;

    DOMElements.projectDeckCount.textContent = gameState.decks.project.length;
    DOMElements.helperDeckCount.textContent = gameState.decks.helper.length;
    DOMElements.grumpDeckCount.textContent = gameState.decks.grump.length;

    DOMElements.projectsCompletedCount.textContent = `${gameState.projectsCompleted} / ${HERO_PROJECTS_TO_WIN}`;
    DOMElements.grumpMeterValue.textContent = `${gameState.grump.meter} / ${GRUMP_METER_MAX}`;

    renderCurrentProjectTableau();
    renderPlayerStatusCompact(currentPlayerObject);
    renderPlayerHandAndActions(currentPlayerObject);
    updateGuideText();

    DOMElements.diceResultDisplay.style.display = gameState.currentPhase === "HERO_ACTION_RESULT" ? 'block' : 'none';
    DOMElements.grumpActionsDisplay.style.display = currentPlayerId === 'grump' && gameState.currentPhase === "GRUMP_TURN" ? 'block' : 'none';
    DOMElements.heroActionsDisplay.style.display = currentPlayerId !== 'grump' && gameState.currentPhase === "HERO_TURN" ? 'block' : 'none';
    DOMElements.energyCommitmentArea.style.display = (currentPlayerId !== 'grump' && gameState.currentPhase === "HERO_TURN" && gameState.selectedStepId) ? 'block' : 'none';

    if (DOMElements.energyToCommit && currentPlayerObject && currentPlayerObject.id !== 'grump') {
        DOMElements.energyToCommit.max = Math.min(MAX_ENERGY_COMMIT, currentPlayerObject.energy);
    }


    if (currentPlayerId === 'grump' || gameState.gameOver) {
        DOMElements.gameContainer.classList.remove('grump-info-hidden');
    } else {
        DOMElements.gameContainer.classList.add('grump-info-hidden');
    }
}

function renderCurrentProjectTableau() {
    DOMElements.projectStepsTableau.innerHTML = '';
    if (gameState.currentProject) {
        DOMElements.projectTitle.textContent = gameState.currentProject.title;
        gameState.currentProject.steps.forEach(step => {
            const stepDiv = document.createElement('div');
            stepDiv.className = `project-step ${step.completed ? 'completed' : ''}`;
            let difficultyText = step.difficultyMod > 0 ? ` (Harder! Need to beat by ${step.difficultyMod})` : '';
            stepDiv.innerHTML = `<h4>${step.text}</h4>
                                 <p>Energy put: ${step.energyCommitted}${difficultyText}</p>`;
            if (!step.completed && gameState.currentPhase === "HERO_TURN" && gameState.allPlayers[gameState.currentPlayerIndex] !== 'grump') {
                const attemptButton = document.createElement('button');
                attemptButton.textContent = "Choose this Step";
                attemptButton.onclick = () => { gameState.selectedStepId = step.id; renderFullUI(); };
                if(gameState.selectedStepId === step.id) attemptButton.classList.add('selected-step-action');
                stepDiv.appendChild(attemptButton);
            }
            DOMElements.projectStepsTableau.appendChild(stepDiv);
        });
    } else {
        DOMElements.projectTitle.textContent = "No Project!";
        DOMElements.projectStepsTableau.innerHTML = "<p>Waiting for a new project... or maybe the game is over?</p>";
    }
}

function renderPlayerStatusCompact(currentPlayerObject) {
    DOMElements.grumpStatusCompact.style.display = 'block';
    DOMElements.grumpTokensCompact.textContent = gameState.grump.grumpTokens;

    DOMElements.currentHeroDetail.innerHTML = '';
    DOMElements.currentHeroDetail.style.display = 'none';

    if (currentPlayerObject && currentPlayerObject.id !== 'grump') {
        DOMElements.currentHeroDetail.style.display = 'block';
        DOMElements.currentHeroDetail.innerHTML = `
            <strong>Current Hero: ${currentPlayerObject.name}</strong>
            <p>Energy Tokens: ${currentPlayerObject.energy}</p>
        `;
    }
    // Overview of all heroes' energy
    DOMElements.allHeroesEnergyDisplay.innerHTML = '';
    gameState.heroes.forEach(hero => {
        const p = document.createElement('p');
        p.textContent = `${hero.name}: ${hero.energy} Energy`;
        DOMElements.allHeroesEnergyDisplay.appendChild(p);
    });
}

function renderPlayerHandAndActions(currentPlayerObject) {
    DOMElements.grumpCardHandDisplay.style.display = 'none';
    DOMElements.heroHelperCardHandDisplay.style.display = 'none';
    DOMElements.playGrumpCardButton.disabled = true;
    DOMElements.playHelperCardButton.disabled = true;

    if (currentPlayerObject.id === 'grump') {
        DOMElements.grumpCardHandDisplay.style.display = 'flex';
        DOMElements.grumpCardHandDisplay.innerHTML = '';
        gameState.grump.grumpHand.forEach((card, index) => {
            const cardDiv = document.createElement('div');
            cardDiv.className = `card grump-card ${index === gameState.grump.selectedCardIndex ? 'selected' : ''}`;
            cardDiv.innerHTML = `<h4>${card.name}</h4><p>${card.text}</p><small>Cost: ${card.cost} GT</small>`;
            if (gameState.grump.grumpTokens >= card.cost) {
                cardDiv.onclick = () => { gameState.grump.selectedCardIndex = index; DOMElements.playGrumpCardButton.disabled = false; renderPlayerHandAndActions(currentPlayerObject);};
            } else { cardDiv.style.opacity = "0.5"; }
            DOMElements.grumpCardHandDisplay.appendChild(cardDiv);
        });
        if(gameState.grump.grumpHand.length === 0) DOMElements.grumpCardHandDisplay.innerHTML = "<p>No Grumpy Tricks!</p>";
    } else { // Hero's turn
        DOMElements.heroHelperCardHandDisplay.style.display = 'flex';
        DOMElements.heroHelperCardHandDisplay.innerHTML = '';
        currentPlayerObject.helperHand.forEach((card, index) => {
            const cardDiv = document.createElement('div');
            cardDiv.className = `card helper-card ${index === currentPlayerObject.selectedCardIndex ? 'selected' : ''}`;
            cardDiv.innerHTML = `<h4>${card.name}</h4><p>${card.text}</p>`;
            cardDiv.onclick = () => { currentPlayerObject.selectedCardIndex = index; DOMElements.playHelperCardButton.disabled = false; renderPlayerHandAndActions(currentPlayerObject);};
            DOMElements.heroHelperCardHandDisplay.appendChild(cardDiv);
        });
        if(currentPlayerObject.helperHand.length === 0) DOMElements.heroHelperCardHandDisplay.innerHTML = "<p>No Helper Cards!</p>";
    }
}


// --- GAME LOGIC (Simplified) ---
function advanceGame() {
    if (gameState.gameOver) { renderFullUI(); return; }

    DOMElements.nextPhaseButton.disabled = true;

    switch (gameState.currentPhase) {
        case "NEW_ROUND_START":
            if (gameState.currentRound > 1 || gameState.allPlayers[gameState.currentPlayerIndex] === 'grump') { // Don't advance round if it's still first round setup
                gameState.currentRound++;
            }
            gameState.heroes.forEach(hero => { hero.activeEffects = []; drawHelperCard(hero.id, true); });
            gameState.grump.activeEffects = [];
            logEvent(`Starting Round ${gameState.currentRound}!`);
            gameState.currentPlayerIndex = 0; // First hero
            gameState.currentPhase = "HERO_TURN_START";
            // Fall through
        case "HERO_TURN_START":
            const currentHero = gameState.heroes[gameState.currentPlayerIndex];
            startPlayerTurn(currentHero.id);
            let energyGain = HERO_ENERGY_GAIN_PER_TURN;
            const lessEnergyEffectIdx = gameState.grump.activeEffects.findIndex(eff => eff.type === "next_hero_less_energy");
            if (lessEnergyEffectIdx !== -1) {
                energyGain = Math.max(0, energyGain - 1);
                gameState.grump.activeEffects.splice(lessEnergyEffectIdx, 1);
                logEvent(`${currentHero.name} gets 1 less Energy due to Grump's trick!`);
            }
            currentHero.energy += energyGain;
            logEvent(`${currentHero.name}'s turn. Gains ${energyGain} Energy (Total: ${currentHero.energy}).`);
            gameState.selectedStepId = null;
            if(currentHero.selectedCardIndex !== undefined) currentHero.selectedCardIndex = -1;
            gameState.currentPhase = "HERO_TURN";
            DOMElements.nextPhaseButton.textContent = "End My Turn";
            DOMElements.nextPhaseButton.disabled = false;
            break;
        case "HERO_TURN": // Waiting for hero action
            DOMElements.nextPhaseButton.textContent = "End My Turn";
            DOMElements.nextPhaseButton.disabled = false;
            break;
        case "HERO_ACTION_RESULT": // After dice roll or card play
            checkProjectCompletion();
            if (gameState.gameOver) { renderFullUI(); return; }
            DOMElements.nextPhaseButton.textContent = "End My Turn";
            DOMElements.nextPhaseButton.disabled = false;
            break;
        case "END_HERO_TURN":
            gameState.currentPlayerIndex++;
            if (gameState.currentPlayerIndex >= gameState.heroes.length) {
                gameState.currentPhase = "GRUMP_TURN_START";
            } else {
                gameState.currentPhase = "HERO_TURN_START";
            }
            advanceGame(); // Recursive call to next state
            break;
        case "GRUMP_TURN_START":
            startPlayerTurn(gameState.grump.id);
            gameState.grump.grumpTokens += GRUMP_TOKEN_GAIN_PER_TURN;
            drawGrumpCard();
            logEvent(`Baron Von Grump's turn. Gains ${GRUMP_TOKEN_GAIN_PER_TURN} Grump Token (Total: ${gameState.grump.grumpTokens}).`);
            if(gameState.grump.selectedCardIndex !== undefined) gameState.grump.selectedCardIndex = -1;
            gameState.currentPhase = "GRUMP_TURN";
            DOMElements.nextPhaseButton.textContent = "End Grump's Turn";
            DOMElements.nextPhaseButton.disabled = false;
            break;
        case "GRUMP_TURN": // Waiting for grump action
            DOMElements.nextPhaseButton.textContent = "End Grump's Turn";
            DOMElements.nextPhaseButton.disabled = false;
            break;
        case "END_GRUMP_TURN":
            checkWinConditions();
            if (gameState.gameOver) { renderFullUI(); return; }
            gameState.currentPhase = "NEW_ROUND_START";
            advanceGame(); // Loop back
            break;
    }
    renderFullUI();
}

function commitEnergyAndRoll() {
    const hero = gameState.heroes[gameState.currentPlayerIndex];
    if (!gameState.currentProject || !gameState.selectedStepId) { logEvent("Please select a project step first!"); return; }
    const step = gameState.currentProject.steps.find(s => s.id === gameState.selectedStepId);
    const energyCommitted = parseInt(DOMElements.energyToCommit.value);

    if (!step || step.completed) { logEvent("Invalid step or already completed."); return; }
    if (isNaN(energyCommitted) || energyCommitted < 1 || energyCommitted > Math.min(MAX_ENERGY_COMMIT, hero.energy) ) {
        logEvent(`Invalid energy. Use 1-${Math.min(MAX_ENERGY_COMMIT, hero.energy)} available Energy.`); return;
    }

    hero.energy -= energyCommitted;
    step.energyCommitted = energyCommitted; // Store on step for this attempt
    logEvent(`${hero.name} commits ${energyCommitted} Energy to "${step.text}".`);

    let dieRoll = Math.floor(Math.random() * 6) + 1;
    let success = false;
    let rollBoost = 0;
    const rollBoostEffectIndex = hero.activeEffects.findIndex(eff => eff.type === "roll_boost");
    if (rollBoostEffectIndex !== -1) {
        rollBoost = hero.activeEffects[rollBoostEffectIndex].value;
        hero.activeEffects.splice(rollBoostEffectIndex, 1);
        logEvent(`${hero.name} used a Good Luck Charm! +${rollBoost} to roll!`);
    }
    let effectiveDieRoll = dieRoll + rollBoost; // Boost helps the roll

    let targetNumber = energyCommitted;
    const stepEasierEffectIndex = hero.activeEffects.findIndex(eff => eff.type === "step_easier");
    if (stepEasierEffectIndex !== -1) {
        targetNumber += hero.activeEffects[stepEasierEffectIndex].value; // Makes target easier to hit
        hero.activeEffects.splice(stepEasierEffectIndex, 1);
        logEvent(`${hero.name} used Super Speedy! Step is easier!`);
    }
    targetNumber -= (step.difficultyMod || 0); // Grump makes it harder

    success = effectiveDieRoll <= targetNumber;

    DOMElements.diceResult.textContent = `${effectiveDieRoll} (Need ≤${targetNumber})`;
    logEvent(`Rolled ${dieRoll} (Boosted: ${effectiveDieRoll}). Target was ${targetNumber} or less. Success: ${success}.`, success ? "success" : "error");

    if (success) {
        step.completed = true;
        gameState.grump.meter = Math.max(0, gameState.grump.meter - 1);
        logEvent(`Step "${step.text}" SUCCESSFUL! Grump Meter down!`, "success");
    } else {
        gameState.grump.meter = Math.min(GRUMP_METER_MAX, gameState.grump.meter + 1);
        logEvent(`Step "${step.text}" FAILED! Grump Meter up!`, "error");
    }
    gameState.selectedStepId = null;
    DOMElements.energyToCommit.value = 1; // Reset input
    gameState.currentPhase = "HERO_ACTION_RESULT";
    checkWinConditions(); // Check immediately after a step that could end project
    advanceGame();
}

function playHeroHelperCard() {
    const hero = gameState.heroes[gameState.currentPlayerIndex];
    if (hero.selectedCardIndex === undefined || hero.selectedCardIndex < 0 || hero.selectedCardIndex >= hero.helperHand.length) {
        logEvent("No Helper Card selected."); return;
    }
    const card = hero.helperHand.splice(hero.selectedCardIndex, 1)[0];
    logEvent(`${hero.name} plays Helper Card: ${card.name}! (${card.text})`);
    if (card.action) {
        card.action(gameState, hero.id);
    } else if (card.effectType) {
        hero.activeEffects.push({ type: card.effectType, value: card.value });
        logEvent(`${card.name} effect will apply soon!`);
    }
    hero.selectedCardIndex = -1;
    renderFullUI();
}

function playGrumpTrickCard() {
    if (gameState.grump.selectedCardIndex === undefined || gameState.grump.selectedCardIndex < 0 || gameState.grump.selectedCardIndex >= gameState.grump.grumpHand.length) {
        logEvent("No Grump Card selected."); return;
    }
    const card = gameState.grump.grumpHand[gameState.grump.selectedCardIndex];
    if (gameState.grump.grumpTokens < card.cost) {
        logEvent("Not enough Grump Tokens to play this card!"); return;
    }
    gameState.grump.grumpTokens -= card.cost;
    gameState.grump.grumpHand.splice(gameState.grump.selectedCardIndex, 1);
    logEvent(`Baron Von Grump plays: ${card.name}! (${card.text})`);
    if (card.action) {
        if (card.target === "step" && gameState.currentProject) {
            const targetStep = gameState.currentProject.steps.find(s => !s.completed); // Target first uncompleted
            if (targetStep) card.action(gameState, targetStep.id);
            else logEvent("No uncompleted steps to target for Grump Card.");
        } else { card.action(gameState); }
    } else if (card.effectType) {
        gameState.grump.activeEffects.push({type: card.effectType});
        logEvent(`${card.name} effect will apply when the next hero plays!`);
    }
    gameState.grump.selectedCardIndex = -1;
    checkWinConditions(); // Some Grump cards might affect win conditions directly
    renderFullUI();
}

function checkProjectCompletion() {
    if (gameState.currentProject && gameState.currentProject.steps.every(step => step.completed)) {
        logEvent(`PROJECT "${gameState.currentProject.title}" COMPLETED! Hooray! 🎉`, "success");
        gameState.projectsCompleted++;
        gameState.grump.meter = Math.max(0, gameState.grump.meter - 2); // Big reduction for project completion
        logEvent(`Grump Meter greatly reduced to ${gameState.grump.meter}!`);
        checkWinConditions(true); // Force check because this could win game
        if (!gameState.gameOver) {
            drawNewProjectCard();
        }
    }
}

function checkWinConditions(forceCheck = false) {
    if (gameState.gameOver && !forceCheck) return;
    if (gameState.projectsCompleted >= HERO_PROJECTS_TO_WIN) {
        logEvent("🎉 HEROES WIN! They completed all projects! 🎉", "success");
        gameState.gameOver = true;
    } else if (gameState.grump.meter >= GRUMP_METER_MAX) {
        logEvent("Oh no! Baron Von Grump's Grump Meter is full! GRUMP WINS! 😠", "error");
        gameState.gameOver = true;
    } else if (!gameState.currentProject && gameState.decks.project.length === 0) {
        logEvent("Uh oh! No more projects. If Heroes didn't win, GRUMP WINS! 🙁", "error");
        gameState.gameOver = true;
    }
    if (gameState.gameOver) {
        DOMElements.nextPhaseButton.textContent = "Game Over!";
        DOMElements.nextPhaseButton.disabled = true;
        DOMElements.passTurnOverlay.style.display = 'none';
        document.querySelectorAll('button').forEach(b => { if(b.id !== DOMElements.nextPhaseButton.id) b.disabled = true; });
        DOMElements.nextPhaseButton.onclick = () => { alert("Game has ended. Refresh the page to play again!"); };
    }
}
// --- PLAY AND PASS MECHANIC ---
function startPlayerTurn(playerId) {
    const playerObject = playerId === 'grump' ? gameState.grump : gameState.heroes.find(h => h.id === playerId);
    DOMElements.turnIndicator.textContent = `Turn: ${playerObject.name}`; // Update immediately
    if (playerId && !gameState.gameOver) {
        DOMElements.passTurnMessage.textContent = `Okay, ${playerObject.name}, your turn!`;
        DOMElements.passTurnOverlay.style.display = 'flex';
        DOMElements.confirmNextPlayerButton.onclick = () => {
            DOMElements.passTurnOverlay.style.display = 'none';
            logEvent(`${playerObject.name}'s turn starts now!`);
            renderFullUI(); // Update UI for the confirmed player
        };
    } else {
        if (!playerId) logEvent(`System processing...`);
        renderFullUI();
    }
}

// --- EVENT LISTENERS & START GAME ---
document.addEventListener('DOMContentLoaded', () => {
    initializeGame(); // Sets up initial state and "Start Game" button for nextPhaseButton
    DOMElements.commitEnergyAndRollButton.onclick = commitEnergyAndRoll;
    DOMElements.playHelperCardButton.onclick = playHeroHelperCard;
    DOMElements.playGrumpCardButton.onclick = playGrumpTrickCard;

    // nextPhaseButton's primary role is to end current player's turn or advance simple phases
    DOMElements.nextPhaseButton.onclick = () => {
        const currentPlayerId = gameState.allPlayers[gameState.currentPlayerIndex];
        if (gameState.currentPhase === "HERO_TURN" || gameState.currentPhase === "HERO_ACTION_RESULT") {
            gameState.currentPhase = "END_HERO_TURN";
        } else if (gameState.currentPhase === "GRUMP_TURN") {
            gameState.currentPhase = "END_GRUMP_TURN";
        } else if (gameState.currentPhase === "SETUP") { // Initial "Start Game" click
             gameState.currentPhase = "NEW_ROUND_START";
        }
        advanceGame();
    };
});
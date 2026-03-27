// ============================================================
// translations.js — All game text (EN + ES) — Copilot Edition
// ============================================================

const TRANSLATIONS = {
  en: {
    // Menu
    title: "Ferpilot: The Frontier Shift",
    startGame: "Start Game",
    language: "Language",
    credits: "A thinking game about human judgment + Copilot",

    // Metrics labels (short for HUD)
    clarity: "Clarity",
    timeSaved: "Time Saved",
    decisionQuality: "Decisions",
    humanAI: "Human-Copilot",
    frontierLevel: "Frontier Lv",

    // Intro
    introLines: [
      "The year is 2025...",
      "A corporate office has been infected by an 'Anti-Productivity Virus'.",
      "The virus didn't just break workflows — it damaged how people THINK.",
      "Chaotic emails... endless meetings... decisions by committee.",
      "The company had Copilot... but the virus pushed everything back to the 1990s.",
      "Manual work everywhere. No ownership. No clarity. No judgment.",
      "You are Ferpilot — a guide who transforms broken companies into Frontier Firms.",
      "Copilot is your tool. But YOUR thinking is the weapon.",
      "This is NOT about prompts. This is about LEADING transformation.",
      "Let's go."
    ],

    // Lobby
    lobbyTitle: "Office Lobby",
    lobbyHint: "Arrow keys to move. SPACE to interact.",
    npcReceptionist: "Receptionist",
    npcReceptionistLines: [
      "Welcome to GlobalCorp! Things went downhill since the virus hit.",
      "People forgot how to prioritize and delegate. Total chaos.",
      "The Outlook Abyss is through the door on the right. Good luck."
    ],
    npcITGuy: "IT Support",
    npcITGuyLines: [
      "Email server is smoking. But tech isn't the real problem.",
      "People reply-all to EVERYTHING. No one owns anything.",
      "We need someone to fix the SYSTEM, not just the server."
    ],
    enterWorld1: "Press SPACE to enter the Outlook Abyss",

    // ============================================
    // WORLD 1: OUTLOOK ABYSS
    // ============================================

    world1Title: "World 1: Outlook Abyss",
    world1Intro: "Email overload, zero ownership. Diagnose, fix, redesign.",

    // Phase transitions
    phaseTransitionReady: "PHASE",
    transitionPhase1: "EXPLORE & DIAGNOSE",
    transitionPhase2: "INBOX SURGERY",
    transitionPhase3: "COPILOT DRAFT REVIEW",
    transitionPhase4: "SYSTEM REDESIGN",
    transitionPhase45: "WORKFLOW BUILDER",
    transitionPhase5: "BOSS BATTLE",

    // Feedback
    correctLabel: "CORRECT",
    incorrectLabel: "WRONG",
    streakLabel: "STREAK",

    // Phase 1 — NPCs (3 lines each + Copilot/Outlook mentions)
    npcMarketing: "Marketing Lead",
    npcMarketingLines: [
      "300 emails/day. Half are reply-all chains. I can't find the signal.",
      "Copilot in Outlook could summarize threads — but nobody uses it right.",
      "The virus made us forget: clarity is a HUMAN skill, not a tech fix."
    ],
    npcManager: "Department Manager",
    npcManagerLines: [
      "My team spends 3 hours/day on email. We tried Copilot summaries...",
      "...but nobody reviews them. They trust blindly. Zero oversight.",
      "Unsupervised Copilot is almost as bad as no Copilot at all."
    ],
    npcIntern: "Overwhelmed Intern",
    npcInternLines: [
      "47 CC'd emails today. Boss said 'just use Copilot to handle it.'",
      "But HOW? Copilot drafts and summarizes, but I don't know what matters.",
      "Someone needs to teach us to THINK about email, not just sort it."
    ],
    npcCFO: "CFO",
    npcCFOLines: [
      "A $2M approval got lost in a reply-all chain last week.",
      "Copilot can summarize, but it can't decide what's a $2M risk.",
      "Fix the triage, fix ownership. Then Copilot becomes powerful."
    ],

    // Diagnosis gate
    diagnosisPrompt: "What's the ROOT problem here?",
    diagnosisOptions: [
      { text: "People don't know how to use Outlook tools", feedback: "Partial. Tools are secondary — the THINKING is broken.", effect: { clarity: 3, timeSaved: 0, decision: -3, humanAI: 0 } },
      { text: "No system for prioritization and ownership", feedback: "Good diagnosis. Without structure, neither humans nor Copilot can help.", effect: { clarity: 8, timeSaved: 3, decision: 8, humanAI: 5 } },
      { text: "They need more Copilot to handle the volume", feedback: "Careful — more Copilot without judgment creates new chaos.", effect: { clarity: -3, timeSaved: 5, decision: -5, humanAI: -3 } },
      { text: "People lack skills AND the system lacks structure", feedback: "Excellent! Both the human AND system problem. Frontier thinking.", effect: { clarity: 12, timeSaved: 5, decision: 12, humanAI: 8 } }
    ],
    diagnosisComplete: "Diagnosis locked in. Time to operate.",

    // Phase 2 — Inbox Surgery
    triageTitle: "Inbox Surgery",
    triageInstructions: "Sort each email correctly. Not everything needs Copilot. Think: what needs HUMAN judgment?",
    triageComplete: "Inbox Surgery complete!",

    triageCategories: ["Ignore", "Copilot Summary", "Reply Personally", "Escalate", "Automate Rule"],
    trigCatShort: ["IGN", "COP", "REPLY", "ESC", "AUTO"],

    triageEmails: [
      {
        subject: "RE:RE:RE: Q3 Deck Font Colors (47 recipients)",
        preview: "47 people debating Calibri vs. Arial.",
        correct: 0,
        feedback_good: "Pure noise. No action needed.",
        feedback_bad_ai: "Copilot shouldn't waste cycles on this. Spotting noise IS a skill.",
        feedback_bad_reply: "Replying feeds chaos. Know when NOT to engage.",
        feedback_bad_escalate: "Doesn't need escalation — needs a mute button.",
        feedback_bad_auto: "One-off thread. Just ignore.",
        copilotTip: "In Outlook, mute threads to auto-archive future replies.",
        effect_correct: { clarity: 8, timeSaved: 8, decision: 5, humanAI: 3 },
        effect_wrong: { clarity: -3, timeSaved: -3, decision: -3, humanAI: 0 }
      },
      {
        subject: "URGENT: Server down — sales team blocked",
        preview: "IT reports critical outage affecting revenue.",
        correct: 3,
        feedback_good: "Right. Human escalation NOW.",
        feedback_bad_ai: "Copilot can't decide urgency. This needs human judgment.",
        feedback_bad_reply: "A reply isn't enough — reach the decision-maker.",
        feedback_bad_ignore: "Ignoring a revenue issue? That's the virus talking.",
        feedback_bad_auto: "Can't automate crisis response.",
        copilotTip: "After you escalate, ask Copilot to draft a status update.",
        effect_correct: { clarity: 8, timeSaved: 5, decision: 12, humanAI: 5 },
        effect_wrong: { clarity: -5, timeSaved: -3, decision: -8, humanAI: -3 }
      },
      {
        subject: "Weekly newsletter: Office Snacks Rotation",
        preview: "Karen from HR shares the snack schedule.",
        correct: 4,
        feedback_good: "Systematic! Set a filter once, save time forever.",
        feedback_bad_ai: "Copilot for snack emails? Overengineering noise.",
        feedback_bad_reply: "Zero-value time sink.",
        feedback_bad_escalate: "Please don't escalate the snack rotation.",
        feedback_bad_ignore: "Works once, but it's back next week. Automate the pattern.",
        copilotTip: "Create Outlook rules to auto-sort recurring newsletters.",
        effect_correct: { clarity: 5, timeSaved: 12, decision: 8, humanAI: 5 },
        effect_wrong: { clarity: -2, timeSaved: -5, decision: -2, humanAI: 0 }
      },
      {
        subject: "Client proposal — needs your input by EOD",
        preview: "VP of Sales needs your take on a $500K proposal.",
        correct: 2,
        feedback_good: "High-stakes human work. YOUR judgment, YOUR words.",
        feedback_bad_ai: "Copilot can help draft, but YOUR voice is needed here.",
        feedback_bad_ignore: "Ignoring $500K? That's avoidance, not prioritization.",
        feedback_bad_escalate: "They asked YOU. Own it.",
        feedback_bad_auto: "Can't automate judgment on high-stakes deals.",
        copilotTip: "Ask Copilot to summarize the proposal first, then write YOUR take.",
        effect_correct: { clarity: 5, timeSaved: 0, decision: 12, humanAI: 3 },
        effect_wrong: { clarity: -3, timeSaved: 0, decision: -10, humanAI: -5 }
      },
      {
        subject: "FYI: Updated travel policy (12 pages)",
        preview: "HR sends the updated corporate travel policy.",
        correct: 1,
        feedback_good: "Smart! Copilot extracts what matters, YOU decide.",
        feedback_bad_reply: "Just let Copilot summarize and file it.",
        feedback_bad_ignore: "Policies affect you. Ignoring is risky.",
        feedback_bad_escalate: "No escalation needed. Efficient processing.",
        feedback_bad_auto: "One-time doc, not a pattern. Copilot summary wins.",
        copilotTip: "In Outlook, select the attachment and ask Copilot to summarize key changes.",
        effect_correct: { clarity: 8, timeSaved: 10, decision: 5, humanAI: 10 },
        effect_wrong: { clarity: -2, timeSaved: -5, decision: -2, humanAI: -3 }
      },
      {
        subject: "Meeting notes: Alpha standup (you weren't there)",
        preview: "Colleague shares notes from a meeting you missed.",
        correct: 1,
        feedback_good: "Let Copilot catch you up. Then decide what needs your input.",
        feedback_bad_reply: "Reply with what? Get caught up first.",
        feedback_bad_ignore: "You might miss action items assigned to you.",
        feedback_bad_escalate: "No escalation — just efficient catch-up.",
        feedback_bad_auto: "Meeting notes vary too much. Copilot summary is the move.",
        copilotTip: "Ask Copilot: 'What action items are assigned to me?' on any thread.",
        effect_correct: { clarity: 8, timeSaved: 8, decision: 5, humanAI: 10 },
        effect_wrong: { clarity: -2, timeSaved: -5, decision: -3, humanAI: -3 }
      },
      {
        subject: "Daily report: Server Logs (200 recipients)",
        preview: "Automated report blasted to everyone, every morning.",
        correct: 4,
        feedback_good: "Perfect. Recurring noise → one automation rule.",
        feedback_bad_ai: "Copilot every day? Band-aid. Rule for anomalies only.",
        feedback_bad_reply: "Replying to an automated report? Nobody's listening.",
        feedback_bad_escalate: "Problem isn't content — it's distribution.",
        feedback_bad_ignore: "You'll drown. One rule saves 365 days of noise.",
        copilotTip: "Use Outlook rules + Copilot to surface only anomalies.",
        effect_correct: { clarity: 8, timeSaved: 12, decision: 8, humanAI: 5 },
        effect_wrong: { clarity: -3, timeSaved: -5, decision: -3, humanAI: 0 }
      },
      {
        subject: "Sensitive: Employee complaint about team lead",
        preview: "An employee reports concerns about a manager.",
        correct: 3,
        feedback_good: "Right. Human sensitivity + authority. NEVER delegate this.",
        feedback_bad_ai: "NEVER let Copilot handle sensitive HR matters.",
        feedback_bad_reply: "Escalate properly, don't reply informally.",
        feedback_bad_ignore: "Ignoring complaints destroys trust.",
        feedback_bad_auto: "Automating human complaints? Worst instinct.",
        copilotTip: "Some things require only human judgment. Know the boundary.",
        effect_correct: { clarity: 5, timeSaved: 0, decision: 15, humanAI: 8 },
        effect_wrong: { clarity: -5, timeSaved: 0, decision: -12, humanAI: -8 }
      }
    ],

    // Phase 3 — Draft Review
    draftReviewTitle: "Copilot Draft Review",
    draftReviewIntro: "Copilot drafted a reply. Find the problems. Copilot drafts — humans supervise.",
    draftReviewContext: "VP of Sales wrote: 'We lost the Meridian account. Client said we were slow and impersonal. Need a plan by Friday.'",
    draftReviewDraft: [
      "Hi,",
      "",
      "Thank you for flagging this. Here is a recovery plan:",
      "",
      "1. Send an apology email to the client.",
      "2. Offer a 10% discount on the next contract.",
      "3. Schedule a follow-up call for next week.",
      "",
      "Let me know if this works.",
      "",
      "Best regards"
    ],
    draftReviewIssues: [
      { id: 'tone', lineIndex: 2, fix: "'I take full accountability for this loss.'", label: "Too casual for a lost account", effect: { clarity: 8, timeSaved: 0, decision: 8, humanAI: 8 } },
      { id: 'empathy', lineIndex: 4, fix: "'I'll call the client directly to understand.'", label: "Should be personal outreach", effect: { clarity: 8, timeSaved: 0, decision: 8, humanAI: 8 } },
      { id: 'discount', lineIndex: 5, fix: "'Dedicated account manager, not a discount.'", label: "Discount = desperation", effect: { clarity: 5, timeSaved: 0, decision: 8, humanAI: 5 } },
      { id: 'timeline', lineIndex: 6, fix: "'Call within 48h — they said we're slow.'", label: "Timeline too slow", effect: { clarity: 5, timeSaved: 3, decision: 10, humanAI: 5 } },
      { id: 'ownership', lineIndex: 8, fix: "'I'll lead recovery. Daily updates.'", label: "No ownership", effect: { clarity: 5, timeSaved: 0, decision: 10, humanAI: 5 } }
    ],
    draftReviewInstructions: "Click lines that need fixing. Find at least 3.",
    draftReviewCorrect: "Sharp eye! Copilot drafted well — your edits made it great.",
    draftReviewMissed: "Missed some. Always review Copilot output carefully.",
    draftReviewComplete: "Copilot saves time. Human supervision ensures quality.",
    draftReviewFixPrompt: "Better revision:",
    draftReviewKeepOriginal: "Keep Copilot's version",
    draftReviewApplyFix: "Apply human fix",
    draftReviewGoodFix: "Good call. Copilot got close — you made it right.",
    draftReviewBadKeep: "Copilot was close but missed the human element.",

    // Phase 4 — System Fix
    systemFixTitle: "System Redesign",
    systemFixIntro: "You fixed emails one by one. Now fix the SYSTEM. Pick 3 improvements.",
    systemFixComplete: "System upgraded! Frontier thinking: fix the system, not the symptom.",

    systemFixOptions: [
      { text: "Inbox triage rules (urgent / FYI / action required)", effect: { clarity: 12, timeSaved: 8, decision: 5, humanAI: 3 }, feedback: "Structural clarity. Everyone knows what needs attention." },
      { text: "Clear escalation criteria for critical issues", effect: { clarity: 8, timeSaved: 5, decision: 12, humanAI: 3 }, feedback: "Decision quality improves with clear paths." },
      { text: "Enable Copilot thread summaries for bulk emails", effect: { clarity: 8, timeSaved: 12, decision: 3, humanAI: 8 }, feedback: "Copilot compresses noise — humans focus on signal." },
      { text: "Assign clear owners to every email thread", effect: { clarity: 12, timeSaved: 5, decision: 12, humanAI: 3 }, feedback: "Ownership cures the virus. No more ghost threads." },
      { text: "Weekly digest replacing daily noise", effect: { clarity: 8, timeSaved: 12, decision: 5, humanAI: 5 }, feedback: "Batch > interruption. Time recovered for thinking." },
      { text: "Separate FYI from decision-required emails", effect: { clarity: 12, timeSaved: 8, decision: 10, humanAI: 3 }, feedback: "Signal vs. noise — both get better attention." },
      { text: "Copilot auto-responds to all non-urgent emails", effect: { clarity: -3, timeSaved: 10, decision: -8, humanAI: -5 }, feedback: "Unsupervised Copilot responses damage trust." },
      { text: "Eliminate email — switch to Slack only", effect: { clarity: 3, timeSaved: 5, decision: -5, humanAI: 0 }, feedback: "New channel, same broken thinking." }
    ],
    systemFixSelectCount: "Select 3 improvements",
    systemFixConfirm: "Apply Changes",

    // Phase 4.5 — Workflow Builder
    workflowTitle: "Workflow Builder",
    workflowIntro: "Now design the ideal workflow. Match what COPILOT does, what HUMANS do, and what SYSTEM RULES enforce.",
    workflowComplete: "Workflow assembled! You've designed a frontier operating model.",
    workflowCopilotCol: "COPILOT",
    workflowHumanCol: "HUMAN",
    workflowSystemCol: "SYSTEM",
    workflowTasks: [
      { task: "Summarize long email threads", correct: 0, feedback_good: "Perfect delegation. Copilot compresses, humans read the summary.", feedback_bad: "This is mechanical work — let Copilot handle it." },
      { task: "Decide who owns an escalation", correct: 1, feedback_good: "Ownership is a human judgment call. Can't be automated.", feedback_bad: "Ownership requires accountability — that's human territory." },
      { task: "Flag email threads with no reply >48h", correct: 2, feedback_good: "System rules catch what humans forget. Structural fix.", feedback_bad: "This should be automated at the system level, not done manually." },
      { task: "Draft a reply to a status update", correct: 0, feedback_good: "Routine drafting is Copilot's strength. Human reviews before send.", feedback_bad: "Drafting repetitive replies? That's what Copilot is for." },
      { task: "Review a sensitive HR communication", correct: 1, feedback_good: "Sensitive matters need human empathy and authority.", feedback_bad: "Never delegate sensitive human matters." },
      { task: "Route recurring reports to the right team", correct: 2, feedback_good: "One system rule > 365 manual sorts. Think structurally.", feedback_bad: "Recurring routing is a system-level fix, not a daily chore." }
    ],
    workflowConfirm: "Submit Workflow",

    // Phase 5 — Boss
    bossTitle: "BOSS: Hydra of False Productivity",
    bossIntro: "5 heads. 5 bad habits. For each: what COPILOT does, what HUMANS do, how to FIX THE SYSTEM.",
    bossHP: "Hydra Power",
    bossRound: "Head",
    bossHeadDefeated: "HEAD WEAKENED",
    bossHeadGrew: "HYDRA GROWS",

    bossHeads: [
      {
        name: "Reply-All Chaos",
        desc: "Floods inboxes with noise, drowning real signals.",
        aiOptions: [
          { text: "Copilot auto-deletes all reply-all", effect: -1, feedback: "Too aggressive. Flag, don't delete." },
          { text: "Copilot flags chains >5 replies and summarizes", effect: -2, feedback: "Good. Copilot compresses the noise." },
          { text: "Copilot auto-replies: 'Stop replying all'", effect: 0, feedback: "Annoying and counterproductive." }
        ],
        humanOptions: [
          { text: "Company-wide email about reply-all etiquette", effect: -1, feedback: "Ironic — fighting email with more email." },
          { text: "Define when reply-all is appropriate + train teams", effect: -3, feedback: "Human leadership beats tech fixes." },
          { text: "Ignore it — people will figure it out", effect: 1, feedback: "They won't. Bad habits compound." }
        ],
        systemOptions: [
          { text: "Add reply-all confirmation prompt", effect: -2, feedback: "Smart friction. Makes people pause." },
          { text: "Limit reply-all to threads <10 recipients", effect: -3, feedback: "Systemic guardrail. Remove temptation." },
          { text: "Do nothing to the system", effect: 1, feedback: "Systems don't fix themselves." }
        ]
      },
      {
        name: "Fake Urgency",
        desc: "Everything marked URGENT. Nothing really is.",
        aiOptions: [
          { text: "Copilot marks everything urgent to be safe", effect: 1, feedback: "That IS the problem." },
          { text: "Copilot analyzes content and suggests real urgency", effect: -2, feedback: "Copilot detects patterns. Humans confirm." },
          { text: "Copilot removes all urgency flags", effect: -1, feedback: "Too blunt. Some things ARE urgent." }
        ],
        humanOptions: [
          { text: "Define what qualifies as truly urgent", effect: -3, feedback: "Clarity is a human superpower." },
          { text: "Each person decides urgency themselves", effect: 0, feedback: "Subjective urgency = everything urgent." },
          { text: "Ban the word 'urgent' in emails", effect: -1, feedback: "Extreme, but forces explaining WHY." }
        ],
        systemOptions: [
          { text: "Urgency tiers: Critical / Important / FYI", effect: -3, feedback: "Structure beats ambiguity." },
          { text: "Cry-wolf tracker for urgency overuse", effect: -2, feedback: "Accountability creates change." },
          { text: "More notification sounds for urgent emails", effect: 1, feedback: "More noise ≠ more clarity." }
        ]
      },
      {
        name: "Unclear Ownership",
        desc: "Emails go to 20 people. Nobody acts.",
        aiOptions: [
          { text: "Copilot assigns random owner from CC", effect: 0, feedback: "Random isn't ownership." },
          { text: "Copilot detects no owner and asks 'Who owns this?'", effect: -2, feedback: "Smart nudge. Copilot asks, humans answer." },
          { text: "Copilot picks the most senior person", effect: -1, feedback: "Seniority ≠ ownership." }
        ],
        humanOptions: [
          { text: "Every thread needs a named owner first", effect: -3, feedback: "No owner = no progress." },
          { text: "Whoever responds first owns it", effect: 0, feedback: "Speed-based chaos." },
          { text: "Managers assign ownership weekly", effect: -2, feedback: "Structured but too slow." }
        ],
        systemOptions: [
          { text: "Required 'Owner' field on internal emails", effect: -3, feedback: "Ownership becomes the default." },
          { text: "Color labels: red = no owner, green = owned", effect: -2, feedback: "Visual systems help everyone." },
          { text: "Hope people start owning threads", effect: 1, feedback: "Hope is not a strategy." }
        ]
      },
      {
        name: "Manual Busywork",
        desc: "Hours on tasks Copilot handles in seconds.",
        aiOptions: [
          { text: "Copilot replaces all human email writing", effect: 0, feedback: "Over-delegation. Some emails need your voice." },
          { text: "Copilot handles summaries, scheduling, extraction", effect: -3, feedback: "Perfect split. Mechanical work → Copilot." },
          { text: "Copilot monitors all communication", effect: -1, feedback: "Surveillance ≠ productivity." }
        ],
        humanOptions: [
          { text: "Train people to spot Copilot-appropriate tasks", effect: -3, feedback: "Most valuable skill: knowing WHAT to delegate." },
          { text: "Let each person figure out their Copilot workflow", effect: -1, feedback: "Some thrive, most struggle." },
          { text: "Mandate Copilot for everything", effect: 1, feedback: "Mandating without judgment = new problems." }
        ],
        systemOptions: [
          { text: "Copilot-ready task list for repetitive work", effect: -3, feedback: "Institutionalize delegation. Frontier system." },
          { text: "Remove Copilot until people learn basics", effect: 0, feedback: "Going backwards doesn't help." },
          { text: "Auto-apply Copilot to every email", effect: -1, feedback: "Unsupervised automation = chaos." }
        ]
      },
      {
        name: "Unsupervised Copilot",
        desc: "People blindly trust Copilot. No review. No judgment.",
        aiOptions: [
          { text: "Copilot labels its confidence level on outputs", effect: -2, feedback: "Transparency helps humans step in." },
          { text: "Copilot sends outputs without human review", effect: 1, feedback: "This IS the problem." },
          { text: "Copilot adds 'review needed' flag on outputs", effect: -2, feedback: "Smart friction. Review becomes habit." }
        ],
        humanOptions: [
          { text: "Human-in-the-loop for external communications", effect: -3, feedback: "Essential. Copilot drafts, humans approve." },
          { text: "Trust Copilot completely — it's faster", effect: 2, feedback: "That's what the virus wants you to think." },
          { text: "Review only when stakes are high", effect: -2, feedback: "Pragmatic for high-risk situations." }
        ],
        systemOptions: [
          { text: "Mandatory review before Copilot emails send", effect: -3, feedback: "Systemic accountability." },
          { text: "Dashboards tracking Copilot accuracy over time", effect: -2, feedback: "Data-driven trust. Measure, don't assume." },
          { text: "Remove all review steps for max speed", effect: 2, feedback: "Speed without judgment = faster chaos." }
        ]
      }
    ],
    bossAIAction: "What should COPILOT do?",
    bossHumanAction: "What should HUMANS do?",
    bossSystemAction: "How to FIX THE SYSTEM?",

    bossVictory: "The Hydra is DEFEATED! The Outlook Abyss has been conquered!",
    bossDefeat: "The Hydra overwhelmed you... frontier leaders learn from failure.",
    bossRetry: "Try Again",
    bossContinue: "Continue",

    // Victory
    world1Complete: "WORLD 1 COMPLETE",
    world1Summary: "You diagnosed. Sorted. Supervised Copilot. Redesigned the system.",
    world1Reflection: "Copilot removes friction. Humans provide judgment. Systems make it last.",
    backToLobby: "Back to Lobby",

    // General
    continueText: "SPACE to continue",
    interact: "[SPACE] Talk",
    back: "Back",
    phaseLabel: "Phase",
    score: "Score",
    emailOf: "of",

    // Copilot Outlook Tips (shown between phases)
    copilotTips: [
      "Copilot in Outlook summarizes long threads in one click.",
      "Ask Copilot to draft replies — then review with your judgment.",
      "Copilot can prioritize your inbox by urgency and importance.",
      "Use Copilot to extract action items from any email thread.",
      "Copilot helps write faster. YOUR job: decide WHAT to write."
    ]
  },

  es: {
    // Menu
    title: "Ferpilot: El Cambio Frontera",
    startGame: "Iniciar Juego",
    language: "Idioma",
    credits: "Un juego de pensamiento: juicio humano + Copilot",

    // Metrics labels
    clarity: "Claridad",
    timeSaved: "Tiempo",
    decisionQuality: "Decisiones",
    humanAI: "Humano-Copilot",
    frontierLevel: "Nivel Frontera",

    // Intro
    introLines: [
      "El año es 2025...",
      "Una oficina ha sido infectada por un 'Virus Anti-Productividad'.",
      "El virus no solo rompió flujos — dañó cómo la gente PIENSA.",
      "Emails caóticos... reuniones interminables... decisiones por comité.",
      "La empresa tenía Copilot... pero el virus la empujó a los 90s.",
      "Trabajo manual. Sin dueños. Sin claridad. Sin juicio.",
      "Tú eres Ferpilot — transformas empresas rotas en Firmas Frontera.",
      "Copilot es tu herramienta. TU pensamiento es el arma.",
      "Esto NO es sobre prompts. Es sobre LIDERAR la transformación.",
      "Vamos."
    ],

    // Lobby
    lobbyTitle: "Vestíbulo",
    lobbyHint: "Flechas para mover. ESPACIO para interactuar.",
    npcReceptionist: "Recepcionista",
    npcReceptionistLines: [
      "¡Bienvenido a GlobalCorp! Todo empeoró con el virus.",
      "La gente olvidó cómo priorizar y delegar. Es un caos.",
      "El Abismo de Outlook está por la puerta derecha. Suerte."
    ],
    npcITGuy: "Soporte IT",
    npcITGuyLines: [
      "Servidor de email echando humo. Pero el tech no es el problema.",
      "Reply-all a TODO. Nadie es dueño de nada.",
      "Necesitamos arreglar el SISTEMA, no solo el servidor."
    ],
    enterWorld1: "ESPACIO para entrar al Abismo de Outlook",

    // WORLD 1
    world1Title: "Mundo 1: Abismo de Outlook",
    world1Intro: "Sobrecarga de email, sin dueños. Diagnostica, arregla, rediseña.",

    // Phase transitions
    phaseTransitionReady: "FASE",
    transitionPhase1: "EXPLORAR Y DIAGNOSTICAR",
    transitionPhase2: "CIRUGÍA DE BANDEJA",
    transitionPhase3: "REVISIÓN DE BORRADOR COPILOT",
    transitionPhase4: "REDISEÑO DEL SISTEMA",
    transitionPhase45: "CONSTRUCTOR DE FLUJO",
    transitionPhase5: "BATALLA CONTRA EL JEFE",

    // Feedback
    correctLabel: "CORRECTO",
    incorrectLabel: "ERROR",
    streakLabel: "RACHA",

    npcMarketing: "Líder de Marketing",
    npcMarketingLines: [
      "300 emails/día. La mitad reply-all. No encuentro la señal.",
      "Copilot en Outlook podría resumir hilos — pero nadie lo usa bien.",
      "El virus nos hizo olvidar: la claridad es habilidad HUMANA."
    ],
    npcManager: "Gerente",
    npcManagerLines: [
      "Mi equipo pasa 3 horas/día en email. Probamos resúmenes de Copilot...",
      "...pero nadie los revisa. Confían ciegamente. Cero supervisión.",
      "Copilot sin supervisión es casi tan malo como no tener Copilot."
    ],
    npcIntern: "Pasante Abrumado",
    npcInternLines: [
      "47 emails CC hoy. Mi jefe dijo 'usa Copilot para manejarlo.'",
      "¿Pero CÓMO? Copilot redacta y resume, pero no sé qué importa.",
      "Alguien necesita enseñarnos a PENSAR sobre email."
    ],
    npcCFO: "Director Financiero",
    npcCFOLines: [
      "Aprobación de $2M se perdió en reply-all la semana pasada.",
      "Copilot resume, pero no decide qué es riesgo de $2M.",
      "Arregla el triaje y la propiedad. Entonces Copilot es poderoso."
    ],

    diagnosisPrompt: "¿Cuál es el problema RAÍZ?",
    diagnosisOptions: [
      { text: "No saben usar las herramientas de Outlook", feedback: "Parcial. Las herramientas son secundarias — el PENSAMIENTO está roto.", effect: { clarity: 3, timeSaved: 0, decision: -3, humanAI: 0 } },
      { text: "No hay sistema de priorización ni propiedad", feedback: "Buen diagnóstico. Sin estructura, ni humanos ni Copilot funcionan.", effect: { clarity: 8, timeSaved: 3, decision: 8, humanAI: 5 } },
      { text: "Necesitan más Copilot para el volumen", feedback: "Cuidado — más Copilot sin juicio crea nuevo caos.", effect: { clarity: -3, timeSaved: 5, decision: -5, humanAI: -3 } },
      { text: "Faltan habilidades Y el sistema carece de estructura", feedback: "¡Excelente! Problema humano Y del sistema. Pensamiento frontera.", effect: { clarity: 12, timeSaved: 5, decision: 12, humanAI: 8 } }
    ],
    diagnosisComplete: "Diagnóstico confirmado. A operar.",

    triageTitle: "Cirugía de Bandeja",
    triageInstructions: "Clasifica cada email. No todo necesita Copilot. ¿Qué necesita JUICIO HUMANO?",
    triageComplete: "¡Cirugía de bandeja completa!",

    triageCategories: ["Ignorar", "Resumen Copilot", "Responder", "Escalar", "Automatizar"],
    trigCatShort: ["IGN", "COP", "RESP", "ESC", "AUTO"],

    triageEmails: [
      {
        subject: "RE:RE:RE: Colores del Deck Q3 (47 personas)",
        preview: "47 personas debatiendo Calibri vs. Arial.",
        correct: 0,
        feedback_good: "Puro ruido. Sin acción necesaria.",
        feedback_bad_ai: "¿Copilot para esto? Reconocer ruido ES una habilidad.",
        feedback_bad_reply: "Responder alimenta el caos.",
        feedback_bad_escalate: "No necesita escalamiento — necesita silenciar.",
        feedback_bad_auto: "Caso único. Solo ignora.",
        copilotTip: "En Outlook, silencia hilos para auto-archivar respuestas.",
        effect_correct: { clarity: 8, timeSaved: 8, decision: 5, humanAI: 3 },
        effect_wrong: { clarity: -3, timeSaved: -3, decision: -3, humanAI: 0 }
      },
      {
        subject: "URGENTE: Servidor caído — ventas bloqueado",
        preview: "IT reporta caída crítica que afecta ingresos.",
        correct: 3,
        feedback_good: "Correcto. Escalamiento HUMANO ahora.",
        feedback_bad_ai: "Copilot no decide urgencia. Juicio humano AHORA.",
        feedback_bad_reply: "Una respuesta no basta — necesita el decisor.",
        feedback_bad_ignore: "¿Ignorar problema de ingresos? El virus habla.",
        feedback_bad_auto: "No automatizas respuesta a crisis.",
        copilotTip: "Después de escalar, pide a Copilot redactar actualización de estado.",
        effect_correct: { clarity: 8, timeSaved: 5, decision: 12, humanAI: 5 },
        effect_wrong: { clarity: -5, timeSaved: -3, decision: -8, humanAI: -3 }
      },
      {
        subject: "Newsletter: Rotación de Snacks",
        preview: "Karen de RRHH comparte horario de snacks.",
        correct: 4,
        feedback_good: "¡Sistemático! Un filtro, ahorro permanente.",
        feedback_bad_ai: "¿Copilot para snacks? Sobreingeniería.",
        feedback_bad_reply: "Tiempo perdido sin valor.",
        feedback_bad_escalate: "No escales la rotación de snacks.",
        feedback_bad_ignore: "Funciona una vez. Automatiza el patrón.",
        copilotTip: "Crea reglas en Outlook para auto-clasificar newsletters.",
        effect_correct: { clarity: 5, timeSaved: 12, decision: 8, humanAI: 5 },
        effect_wrong: { clarity: -2, timeSaved: -5, decision: -2, humanAI: 0 }
      },
      {
        subject: "Propuesta de cliente — tu input hoy",
        preview: "VP de Ventas necesita tu opinión en propuesta $500K.",
        correct: 2,
        feedback_good: "Trabajo humano. TU juicio, TUS palabras.",
        feedback_bad_ai: "Copilot ayuda a redactar, pero TU voz es necesaria.",
        feedback_bad_ignore: "¿Ignorar $500K? Es evasión, no priorización.",
        feedback_bad_escalate: "Te pidieron a TI. Asúmelo.",
        feedback_bad_auto: "No automatizas juicio en negocios grandes.",
        copilotTip: "Pide a Copilot que resuma la propuesta, luego escribe TU opinión.",
        effect_correct: { clarity: 5, timeSaved: 0, decision: 12, humanAI: 3 },
        effect_wrong: { clarity: -3, timeSaved: 0, decision: -10, humanAI: -5 }
      },
      {
        subject: "FYI: Política de viajes actualizada (12 págs)",
        preview: "RRHH envía política de viajes actualizada.",
        correct: 1,
        feedback_good: "¡Inteligente! Copilot extrae, TÚ decides.",
        feedback_bad_reply: "Solo deja que Copilot resuma.",
        feedback_bad_ignore: "Las políticas te afectan. Ignorar es riesgo.",
        feedback_bad_escalate: "No necesita escalamiento.",
        feedback_bad_auto: "Documento único. Resumen Copilot gana.",
        copilotTip: "En Outlook, selecciona el adjunto y pide a Copilot resumir cambios.",
        effect_correct: { clarity: 8, timeSaved: 10, decision: 5, humanAI: 10 },
        effect_wrong: { clarity: -2, timeSaved: -5, decision: -2, humanAI: -3 }
      },
      {
        subject: "Notas: Standup Alpha (no estuviste)",
        preview: "Colega comparte notas de reunión a la que faltaste.",
        correct: 1,
        feedback_good: "Copilot te pone al día. Luego decides.",
        feedback_bad_reply: "¿Responder qué? Primero ponte al día.",
        feedback_bad_ignore: "Puedes perder tareas asignadas a ti.",
        feedback_bad_escalate: "No necesita escalamiento — ponte al día.",
        feedback_bad_auto: "Notas varían mucho. Resumen Copilot es correcto.",
        copilotTip: "Pregunta a Copilot: '¿Qué tareas me asignaron?' en cualquier hilo.",
        effect_correct: { clarity: 8, timeSaved: 8, decision: 5, humanAI: 10 },
        effect_wrong: { clarity: -2, timeSaved: -5, decision: -3, humanAI: -3 }
      },
      {
        subject: "Reporte diario: Logs (200 destinatarios)",
        preview: "Reporte automatizado a todos, cada mañana.",
        correct: 4,
        feedback_good: "Perfecto. Ruido recurrente → regla de automatización.",
        feedback_bad_ai: "¿Copilot cada día? Parche. Regla para anomalías.",
        feedback_bad_reply: "¿Responder a reporte automatizado?",
        feedback_bad_escalate: "No es el contenido — es la distribución.",
        feedback_bad_ignore: "Te ahogarás. Una regla ahorra 365 días.",
        copilotTip: "Reglas Outlook + Copilot para solo mostrar anomalías.",
        effect_correct: { clarity: 8, timeSaved: 12, decision: 8, humanAI: 5 },
        effect_wrong: { clarity: -3, timeSaved: -5, decision: -3, humanAI: 0 }
      },
      {
        subject: "Sensible: Queja sobre conducta de líder",
        preview: "Empleado reporta preocupaciones sobre un gerente.",
        correct: 3,
        feedback_good: "Correcto. Sensibilidad humana. NUNCA delegues esto.",
        feedback_bad_ai: "NUNCA dejes que Copilot maneje temas sensibles.",
        feedback_bad_reply: "Escala correctamente, no respondas informal.",
        feedback_bad_ignore: "Ignorar quejas destruye confianza.",
        feedback_bad_auto: "¿Automatizar quejas humanas? Peor instinto.",
        copilotTip: "Algunas cosas requieren solo juicio humano. Conoce el límite.",
        effect_correct: { clarity: 5, timeSaved: 0, decision: 15, humanAI: 8 },
        effect_wrong: { clarity: -5, timeSaved: 0, decision: -12, humanAI: -8 }
      }
    ],

    draftReviewTitle: "Revisión de Borrador Copilot",
    draftReviewIntro: "Copilot redactó una respuesta. Encuentra problemas. Copilot redacta — humanos supervisan.",
    draftReviewContext: "VP de Ventas: 'Perdimos la cuenta Meridian. Cliente dijo que fuimos lentos e impersonales. Plan para el viernes.'",
    draftReviewDraft: [
      "Hola,",
      "",
      "Gracias por informar. Aquí un plan de recuperación:",
      "",
      "1. Enviar email de disculpa al cliente.",
      "2. Ofrecer 10% descuento en próximo contrato.",
      "3. Programar llamada de seguimiento próxima semana.",
      "",
      "Avísame si funciona.",
      "",
      "Saludos"
    ],
    draftReviewIssues: [
      { id: 'tone', lineIndex: 2, fix: "'Asumo total responsabilidad por esta pérdida.'", label: "Tono muy casual para cuenta perdida", effect: { clarity: 8, timeSaved: 0, decision: 8, humanAI: 8 } },
      { id: 'empathy', lineIndex: 4, fix: "'Llamaré al cliente personalmente.'", label: "Debería ser contacto personal", effect: { clarity: 8, timeSaved: 0, decision: 8, humanAI: 8 } },
      { id: 'discount', lineIndex: 5, fix: "'Gerente dedicado, no descuento.'", label: "Descuento = desesperación", effect: { clarity: 5, timeSaved: 0, decision: 8, humanAI: 5 } },
      { id: 'timeline', lineIndex: 6, fix: "'Llamada en 48h — dijeron que somos lentos.'", label: "Cronograma lento", effect: { clarity: 5, timeSaved: 3, decision: 10, humanAI: 5 } },
      { id: 'ownership', lineIndex: 8, fix: "'Yo lidero. Actualizaciones diarias.'", label: "Sin propiedad", effect: { clarity: 5, timeSaved: 0, decision: 10, humanAI: 5 } }
    ],
    draftReviewInstructions: "Clic en líneas que necesitan mejora. Mínimo 3.",
    draftReviewCorrect: "¡Buen ojo! Copilot redactó bien — tus edits lo mejoraron.",
    draftReviewMissed: "Faltaron. Revisa siempre la salida de Copilot.",
    draftReviewComplete: "Copilot ahorra tiempo. Supervisión humana asegura calidad.",
    draftReviewFixPrompt: "Mejor revisión:",
    draftReviewKeepOriginal: "Mantener versión Copilot",
    draftReviewApplyFix: "Aplicar corrección humana",
    draftReviewGoodFix: "Buena decisión. Copilot estuvo cerca — tú lo completaste.",
    draftReviewBadKeep: "Copilot estuvo cerca pero faltó el toque humano.",

    systemFixTitle: "Rediseño del Sistema",
    systemFixIntro: "Arreglaste emails uno por uno. Ahora arregla el SISTEMA. Elige 3.",
    systemFixComplete: "¡Sistema mejorado! Pensamiento frontera: arregla el sistema.",

    systemFixOptions: [
      { text: "Reglas de triaje (urgente / FYI / acción)", effect: { clarity: 12, timeSaved: 8, decision: 5, humanAI: 3 }, feedback: "Claridad estructural." },
      { text: "Criterios claros de escalamiento", effect: { clarity: 8, timeSaved: 5, decision: 12, humanAI: 3 }, feedback: "Decisiones mejoran con caminos claros." },
      { text: "Resúmenes Copilot para emails masivos", effect: { clarity: 8, timeSaved: 12, decision: 3, humanAI: 8 }, feedback: "Copilot comprime ruido." },
      { text: "Dueños claros en cada hilo de email", effect: { clarity: 12, timeSaved: 5, decision: 12, humanAI: 3 }, feedback: "Propiedad cura el virus." },
      { text: "Resumen semanal en vez de ruido diario", effect: { clarity: 8, timeSaved: 12, decision: 5, humanAI: 5 }, feedback: "Lotes > interrupciones." },
      { text: "Separar FYI de emails de decisión", effect: { clarity: 12, timeSaved: 8, decision: 10, humanAI: 3 }, feedback: "Señal vs. ruido mejora ambos." },
      { text: "Copilot auto-responde emails no urgentes", effect: { clarity: -3, timeSaved: 10, decision: -8, humanAI: -5 }, feedback: "Copilot sin supervisión daña confianza." },
      { text: "Eliminar email — solo Slack", effect: { clarity: 3, timeSaved: 5, decision: -5, humanAI: 0 }, feedback: "Nuevo canal, mismo pensamiento roto." }
    ],
    systemFixSelectCount: "Selecciona 3 mejoras",
    systemFixConfirm: "Aplicar Cambios",

    // Phase 4.5 — Workflow Builder
    workflowTitle: "Constructor de Flujo",
    workflowIntro: "Diseña el flujo ideal. Asigna lo que hace COPILOT, lo que hacen HUMANOS, y lo que REGLAS DEL SISTEMA refuerzan.",
    workflowComplete: "¡Flujo armado! Diseñaste un modelo operativo frontera.",
    workflowCopilotCol: "COPILOT",
    workflowHumanCol: "HUMANO",
    workflowSystemCol: "SISTEMA",
    workflowTasks: [
      { task: "Resumir hilos largos de email", correct: 0, feedback_good: "Delegación perfecta. Copilot comprime, humanos leen.", feedback_bad: "Esto es trabajo mecánico — deja que Copilot lo maneje." },
      { task: "Decidir quién es dueño de un escalamiento", correct: 1, feedback_good: "Propiedad es juicio humano. No se automatiza.", feedback_bad: "Propiedad requiere responsabilidad — territorio humano." },
      { task: "Señalar hilos sin respuesta >48h", correct: 2, feedback_good: "Reglas del sistema atrapan lo que humanos olvidan.", feedback_bad: "Esto debe automatizarse a nivel sistema." },
      { task: "Redactar respuesta a actualización de estado", correct: 0, feedback_good: "Redacción rutinaria es la fuerza de Copilot.", feedback_bad: "¿Redactar respuestas repetitivas? Para eso está Copilot." },
      { task: "Revisar comunicación sensible de RRHH", correct: 1, feedback_good: "Asuntos sensibles necesitan empatía humana.", feedback_bad: "Nunca delegues asuntos humanos sensibles." },
      { task: "Redirigir reportes recurrentes al equipo correcto", correct: 2, feedback_good: "Una regla > 365 ordenamientos manuales.", feedback_bad: "Enrutamiento recurrente es fix a nivel sistema." }
    ],
    workflowConfirm: "Enviar Flujo",

    bossTitle: "JEFE: Hidra de Falsa Productividad",
    bossIntro: "5 cabezas. 5 malos hábitos. Para cada una: qué hace COPILOT, qué hacen HUMANOS, cómo ARREGLAR EL SISTEMA.",
    bossHP: "Poder Hidra",
    bossRound: "Cabeza",
    bossHeadDefeated: "CABEZA DEBILITADA",
    bossHeadGrew: "LA HIDRA CRECE",

    bossHeads: [
      {
        name: "Caos Reply-All",
        desc: "Inunda bandejas con ruido.",
        aiOptions: [
          { text: "Copilot auto-elimina reply-all", effect: -1, feedback: "Demasiado agresivo. Señalar, no borrar." },
          { text: "Copilot señala cadenas >5 y resume", effect: -2, feedback: "Buena delegación." },
          { text: "Copilot auto-responde: 'Dejen de reply-all'", effect: 0, feedback: "Molesto y contraproducente." }
        ],
        humanOptions: [
          { text: "Email a todos sobre etiqueta reply-all", effect: -1, feedback: "Irónico — email contra email." },
          { text: "Definir cuándo reply-all es apropiado + capacitar", effect: -3, feedback: "Liderazgo humano supera tech." },
          { text: "Ignorar — se resolverá solo", effect: 1, feedback: "No lo hará. Malos hábitos crecen." }
        ],
        systemOptions: [
          { text: "Prompt de confirmación para reply-all", effect: -2, feedback: "Fricción inteligente." },
          { text: "Limitar reply-all a <10 personas", effect: -3, feedback: "Barrera sistémica." },
          { text: "No cambiar nada", effect: 1, feedback: "Los sistemas no se arreglan solos." }
        ]
      },
      {
        name: "Falsa Urgencia",
        desc: "Todo URGENTE. Nada realmente lo es.",
        aiOptions: [
          { text: "Copilot marca todo urgente por seguridad", effect: 1, feedback: "ESE es el problema." },
          { text: "Copilot analiza contenido y sugiere urgencia", effect: -2, feedback: "Copilot detecta patrones." },
          { text: "Copilot elimina todas las banderas", effect: -1, feedback: "Drástico. Algunas SÍ son urgentes." }
        ],
        humanOptions: [
          { text: "Definir qué califica como urgente", effect: -3, feedback: "Claridad es superpoder humano." },
          { text: "Cada persona decide urgencia sola", effect: 0, feedback: "Urgencia subjetiva = todo urgente." },
          { text: "Prohibir 'urgente' en emails", effect: -1, feedback: "Extremo, pero fuerza explicar." }
        ],
        systemOptions: [
          { text: "Niveles: Crítico / Importante / FYI", effect: -3, feedback: "Estructura vence ambigüedad." },
          { text: "Rastreador de abuso de urgencia", effect: -2, feedback: "Rendición de cuentas." },
          { text: "Más sonidos para urgentes", effect: 1, feedback: "Más ruido ≠ más claridad." }
        ]
      },
      {
        name: "Propiedad Difusa",
        desc: "Emails a 20. Nadie actúa.",
        aiOptions: [
          { text: "Copilot asigna dueño aleatorio", effect: 0, feedback: "Aleatorio no es propiedad." },
          { text: "Copilot detecta sin dueño y pregunta '¿Quién?'", effect: -2, feedback: "Empujón inteligente." },
          { text: "Copilot elige al más senior", effect: -1, feedback: "Antigüedad ≠ propiedad." }
        ],
        humanOptions: [
          { text: "Cada hilo necesita dueño antes de actuar", effect: -3, feedback: "Sin dueño = sin progreso." },
          { text: "Quien responde primero es dueño", effect: 0, feedback: "Caos basado en velocidad." },
          { text: "Gerentes asignan propiedad semanal", effect: -2, feedback: "Estructurado pero lento." }
        ],
        systemOptions: [
          { text: "Campo 'Dueño' obligatorio en emails internos", effect: -3, feedback: "Propiedad como defecto." },
          { text: "Etiquetas color: rojo=sin dueño, verde=con", effect: -2, feedback: "Visual ayuda a todos." },
          { text: "Esperar que la gente asuma hilos", effect: 1, feedback: "Esperanza no es estrategia." }
        ]
      },
      {
        name: "Trabajo Manual",
        desc: "Horas en tareas que Copilot maneja en segundos.",
        aiOptions: [
          { text: "Copilot reemplaza toda escritura humana", effect: 0, feedback: "Sobre-delegación." },
          { text: "Copilot: resúmenes, agenda, extracción", effect: -3, feedback: "División perfecta." },
          { text: "Copilot monitorea toda comunicación", effect: -1, feedback: "Vigilancia ≠ productividad." }
        ],
        humanOptions: [
          { text: "Capacitar para identificar tareas para Copilot", effect: -3, feedback: "Saber QUÉ delegar es lo más valioso." },
          { text: "Cada uno descubre su flujo con Copilot", effect: -1, feedback: "Algunos prosperan, mayoría lucha." },
          { text: "Obligar Copilot para todo", effect: 1, feedback: "Sin juicio = nuevos problemas." }
        ],
        systemOptions: [
          { text: "Lista de tareas Copilot-ready", effect: -3, feedback: "Delegación institucional." },
          { text: "Quitar Copilot hasta aprender básicos", effect: 0, feedback: "Retroceder no ayuda." },
          { text: "Auto-aplicar Copilot a cada email", effect: -1, feedback: "Automatización sin supervisión = caos." }
        ]
      },
      {
        name: "Copilot Sin Supervisión",
        desc: "Confían ciegamente. Sin revisión. Sin juicio.",
        aiOptions: [
          { text: "Copilot etiqueta nivel de confianza", effect: -2, feedback: "Transparencia ayuda a humanos." },
          { text: "Copilot envía sin revisión humana", effect: 1, feedback: "ESTE es el problema." },
          { text: "Copilot agrega bandera 'revisión necesaria'", effect: -2, feedback: "Fricción inteligente." }
        ],
        humanOptions: [
          { text: "Humano-en-el-ciclo para externas", effect: -3, feedback: "Copilot redacta, humanos aprueban." },
          { text: "Confiar en Copilot totalmente — es más rápido", effect: 2, feedback: "Eso quiere el virus." },
          { text: "Revisar solo cuando el riesgo es alto", effect: -2, feedback: "Pragmático para alto riesgo." }
        ],
        systemOptions: [
          { text: "Revisión obligatoria antes de enviar emails Copilot", effect: -3, feedback: "Responsabilidad sistémica." },
          { text: "Dashboards de precisión de Copilot", effect: -2, feedback: "Confianza basada en datos." },
          { text: "Eliminar revisiones para máxima velocidad", effect: 2, feedback: "Velocidad sin juicio = caos rápido." }
        ]
      }
    ],
    bossAIAction: "¿Qué debe hacer COPILOT?",
    bossHumanAction: "¿Qué deben hacer HUMANOS?",
    bossSystemAction: "¿Cómo ARREGLAR EL SISTEMA?",

    bossVictory: "¡La Hidra derrotada! ¡Abismo de Outlook conquistado!",
    bossDefeat: "La Hidra te superó... líderes frontera aprenden del fracaso.",
    bossRetry: "Intentar de Nuevo",
    bossContinue: "Continuar",

    world1Complete: "¡MUNDO 1 COMPLETADO!",
    world1Summary: "Diagnosticaste. Ordenaste. Supervisaste Copilot. Rediseñaste el sistema.",
    world1Reflection: "Copilot elimina fricción. Humanos dan juicio. Sistemas lo hacen durar.",
    backToLobby: "Volver al Vestíbulo",

    continueText: "ESPACIO para continuar",
    interact: "[ESPACIO] Hablar",
    back: "Volver",
    phaseLabel: "Fase",
    score: "Puntuación",
    emailOf: "de",

    copilotTips: [
      "Copilot en Outlook resume hilos largos con un clic.",
      "Pide a Copilot redactar respuestas — luego revisa con tu juicio.",
      "Copilot prioriza tu bandeja por urgencia e importancia.",
      "Usa Copilot para extraer acciones de cualquier hilo.",
      "Copilot escribe más rápido. TU trabajo: decidir QUÉ escribir."
    ]
  }
};

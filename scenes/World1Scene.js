// ============================================================
// World1Scene.js — Outlook Abyss: 5-Phase Human-First Level
// POLISHED: Flash feedback, transitions, score popups,
//           better boss, visual clarity, pacing
// ============================================================

class World1Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'World1Scene' });
  }

  create() {
    const lang = this.registry.get('language') || 'en';
    this.t = TRANSLATIONS[lang];
    this.w = this.cameras.main.width;
    this.h = this.cameras.main.height;

    this.cameras.main.setBackgroundColor('#0d1b2a');

    // --- Systems ---
    this.metricsSystem = new MetricsSystem(this);
    this.metricsSystem.load();
    this.ui = new UI(this, this.metricsSystem);
    this.ui.create();
    this.dialogue = new DialogueSystem(this);
    this.dialogue.create();
    this.decision = new DecisionSystem(this);

    // --- Phase state ---
    this.phase = 'explore';
    this.talkedTo = { marketing: false, manager: false, intern: false, cfo: false };
    this.allTalked = false;
    this.streak = 0;

    // --- Phase indicator ---
    this.phaseNames = ['1: Explore', '2: Inbox Surgery', '3: Draft Review', '4: System Fix', '5: Workflow Builder', '6: Boss'];
    this.phaseIndex = 0;
    this.phaseText = this.add.text(this.w / 2, 85, '', {
      fontFamily: 'monospace', fontSize: '11px', fill: '#888888'
    }).setOrigin(0.5).setDepth(200);
    this.updatePhaseText();

    // --- Transition overlay (reusable) ---
    this.transOverlay = this.add.rectangle(this.w / 2, this.h / 2, this.w, this.h, 0x000000, 0)
      .setDepth(1100).setVisible(false);
    this.transTitle = this.add.text(this.w / 2, this.h / 2 - 20, '', {
      fontFamily: 'monospace', fontSize: '28px', fill: '#00ff88', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(1101).setAlpha(0);
    this.transSub = this.add.text(this.w / 2, this.h / 2 + 25, '', {
      fontFamily: 'monospace', fontSize: '14px', fill: '#ffffff'
    }).setOrigin(0.5).setDepth(1101).setAlpha(0);

    // --- Build first phase ---
    this.buildExplorePhase();
  }

  // =============================================
  // UTILITY: FEEDBACK SYSTEMS
  // =============================================

  // Flash the screen green (correct) or red (wrong) + floating icon
  flashFeedback(isCorrect, x, y) {
    if (isCorrect) {
      this.cameras.main.flash(300, 0, 80, 0, true);
      this.showFloatingIcon('✓', x || this.w / 2, y || this.h / 2, '#00ff88');
      this.streak++;
    } else {
      this.cameras.main.flash(250, 120, 0, 0, true);
      this.cameras.main.shake(150, 0.006);
      this.showFloatingIcon('✗', x || this.w / 2, y || this.h / 2, '#ff4444');
      this.streak = 0;
    }
    // Show streak
    if (this.streak >= 2 && isCorrect) {
      this.showFloatingIcon(`${this.t.streakLabel} x${this.streak}!`, this.w / 2, this.h / 2 + 40, '#ffaa00');
    }
  }

  // Floating text that rises and fades
  showFloatingIcon(text, x, y, color) {
    const icon = this.add.text(x, y, text, {
      fontFamily: 'monospace', fontSize: '22px', fill: color, fontStyle: 'bold',
      stroke: '#000000', strokeThickness: 3
    }).setOrigin(0.5).setDepth(1200);

    this.tweens.add({
      targets: icon, y: y - 50, alpha: 0,
      duration: 900, ease: 'Power2',
      onComplete: () => icon.destroy()
    });
  }

  // Show floating score deltas near HUD
  showScorePopup(effects) {
    const keys = [
      { k: 'clarity', x: 0.16 }, { k: 'timeSaved', x: 0.33 },
      { k: 'decision', x: 0.52 }, { k: 'humanAI', x: 0.72 }
    ];
    keys.forEach(({ k, x }) => {
      const val = effects[k];
      if (!val) return;
      const color = val > 0 ? '#00ff88' : '#ff4444';
      const sign = val > 0 ? '+' : '';
      const txt = this.add.text(this.w * x, 52, `${sign}${val}`, {
        fontFamily: 'monospace', fontSize: '13px', fill: color, fontStyle: 'bold',
        stroke: '#000000', strokeThickness: 2
      }).setOrigin(0.5).setDepth(1200);
      this.tweens.add({
        targets: txt, y: 30, alpha: 0,
        duration: 1100, ease: 'Power2',
        onComplete: () => txt.destroy()
      });
    });
  }

  // Dramatic phase transition banner
  showPhaseTransition(phaseNum, title, callback) {
    this.transOverlay.setVisible(true).setAlpha(0);
    this.transTitle.setText(`${this.t.phaseTransitionReady} ${phaseNum}`).setAlpha(0);
    this.transSub.setText(title).setAlpha(0);

    // Copilot tip for phases 2-5
    const tipIdx = Math.min(phaseNum - 2, (this.t.copilotTips || []).length - 1);
    let tipText = null;
    if (phaseNum >= 2 && this.t.copilotTips && this.t.copilotTips[tipIdx]) {
      tipText = this.add.text(this.w / 2, this.h / 2 + 60, `💡 ${this.t.copilotTips[tipIdx]}`, {
        fontFamily: 'monospace', fontSize: '11px', fill: '#88ccff',
        wordWrap: { width: this.w - 100 }
      }).setOrigin(0.5).setDepth(1101).setAlpha(0);
    }

    this.tweens.add({
      targets: this.transOverlay, alpha: 0.85,
      duration: 300, ease: 'Power2'
    });

    this.time.delayedCall(200, () => {
      this.tweens.add({
        targets: this.transTitle, alpha: 1, scaleX: 1, scaleY: 1,
        duration: 400, ease: 'Back.easeOut'
      });
    });

    this.time.delayedCall(500, () => {
      this.tweens.add({
        targets: this.transSub, alpha: 1,
        duration: 300
      });
      if (tipText) {
        this.tweens.add({
          targets: tipText, alpha: 1,
          duration: 300
        });
      }
    });

    // Fade out after 1.8s
    this.time.delayedCall(2200, () => {
      this.tweens.add({
        targets: [this.transOverlay, this.transTitle, this.transSub],
        alpha: 0, duration: 400,
        onComplete: () => {
          this.transOverlay.setVisible(false);
          if (tipText) tipText.destroy();
          if (callback) callback();
        }
      });
      if (tipText) {
        this.tweens.add({ targets: tipText, alpha: 0, duration: 400 });
      }
    });
  }

  updatePhaseText() {
    this.phaseText.setText(`${this.t.phaseLabel} ${this.phaseNames[this.phaseIndex]}`);
  }

  // =============================================
  // PHASE 1: EXPLORE & DIAGNOSE
  // =============================================
  buildExplorePhase() {
    this.drawEmailAbyss();

    this.titleText = this.add.text(this.w / 2, 65, this.t.world1Title, {
      fontFamily: 'monospace', fontSize: '18px', fill: '#ff6644', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(200);

    this.hintText = this.add.text(this.w / 2, this.h - 20, this.t.lobbyHint, {
      fontFamily: 'monospace', fontSize: '11px', fill: '#555555'
    }).setOrigin(0.5).setDepth(200);

    // Player (stylized Ferpilot token)
    this.charRenderer = new CharacterRenderer(this);
    this.playerContainer = this.charRenderer.drawFerpilot(80, this.h / 2, 0.7);
    // Invisible physics body
    this.player = this.add.rectangle(80, this.h / 2, 28, 36, 0x000000, 0)
      .setDepth(99);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    // NPCs (themed tokens)
    this.npcs = [];
    this.createNPC(200, 170, this.t.npcMarketing, this.t.npcMarketingLines, 'envelope', 'marketing');
    this.createNPC(550, 170, this.t.npcManager, this.t.npcManagerLines, 'clipboard', 'manager');
    this.createNPC(200, 370, this.t.npcIntern, this.t.npcInternLines, 'coffee', 'intern');
    this.createNPC(550, 370, this.t.npcCFO, this.t.npcCFOLines, 'chart', 'cfo');

    this.interactPrompt = this.add.text(0, 0, this.t.interact, {
      fontFamily: 'monospace', fontSize: '12px', fill: '#00ff88',
      backgroundColor: '#000000', padding: { x: 6, y: 3 }
    }).setOrigin(0.5).setDepth(200).setVisible(false);

    this.npcChecks = {};

    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.floatingEmails = [];
    this.createFloatingEmails();

    // NPC count indicator
    this.npcCounter = this.add.text(this.w - 20, 85, '0/4', {
      fontFamily: 'monospace', fontSize: '12px', fill: '#555555'
    }).setOrigin(1, 0.5).setDepth(200);
  }

  drawEmailAbyss() {
    const gfx = this.add.graphics();
    for (let x = 0; x < this.w; x += 60) {
      for (let y = 50; y < this.h; y += 60) {
        gfx.fillStyle(0x0d1b2a, 1);
        gfx.fillRect(x, y, 58, 58);
        if (Math.random() > 0.7) {
          gfx.fillStyle(0x1a2a3a, 1);
          gfx.fillRect(x + 10, y + 15, 38, 28);
          gfx.lineStyle(1, 0x2a3a4a);
          gfx.lineBetween(x + 10, y + 15, x + 29, y + 30);
          gfx.lineBetween(x + 48, y + 15, x + 29, y + 30);
        }
      }
    }
    this.bgGraphics = gfx;
  }

  createFloatingEmails() {
    for (let i = 0; i < 10; i++) {
      const email = this.add.text(
        Phaser.Math.Between(50, this.w - 50),
        Phaser.Math.Between(100, this.h - 80),
        '✉', { fontSize: '16px', fill: '#334466' }
      ).setAlpha(0.25).setDepth(5);
      this.tweens.add({
        targets: email,
        y: email.y + Phaser.Math.Between(-25, 25),
        alpha: 0.08, duration: Phaser.Math.Between(2000, 4000),
        yoyo: true, repeat: -1
      });
      this.floatingEmails.push(email);
    }
  }

  createNPC(x, y, name, lines, type, id) {
    this.charRenderer.drawNPCToken(x, y, type, name);
    this.npcs.push({ name, lines, x, y, id });
  }

  updateNPCCounter() {
    const count = Object.values(this.talkedTo).filter(v => v).length;
    this.npcCounter.setText(`${count}/4`);
    if (count > 0) this.npcCounter.setFill('#00ff88');
  }

  checkAllTalked() {
    const allDone = Object.values(this.talkedTo).every(v => v);
    if (allDone && !this.allTalked) {
      this.allTalked = true;
      this.time.delayedCall(300, () => {
        this.startDiagnosis();
      });
    }
  }

  // =============================================
  // DIAGNOSIS GATE
  // =============================================
  startDiagnosis() {
    this.phase = 'diagnosis';
    this.decision.show(this.t.diagnosisPrompt, this.t.diagnosisOptions, (idx, opt) => {
      const isBest = idx === 3;
      this.flashFeedback(isBest || idx === 1, this.w / 2, this.h / 2);
      this.metricsSystem.applyEffects(opt.effect);
      this.showScorePopup(opt.effect);
      this.ui.update();
      this.dialogue.start('Ferpilot', [opt.feedback, this.t.diagnosisComplete], () => {
        this.startTriageTransition();
      });
    });
  }

  // =============================================
  // PHASE TRANSITIONS
  // =============================================
  startTriageTransition() {
    // Hide explore elements
    if (this.player) this.player.setVisible(false);
    if (this.playerContainer) this.playerContainer.setVisible(false);
    this.interactPrompt.setVisible(false);
    if (this.hintText) this.hintText.setVisible(false);
    if (this.npcCounter) this.npcCounter.setVisible(false);

    this.showPhaseTransition(2, this.t.transitionPhase2, () => {
      this.startTriagePhase();
    });
  }

  startDraftReviewTransition() {
    this.showPhaseTransition(3, this.t.transitionPhase3, () => {
      this.startDraftReview();
    });
  }

  startSystemFixTransition() {
    this.showPhaseTransition(4, this.t.transitionPhase4, () => {
      this.startSystemFix();
    });
  }

  startBossTransition() {
    this.showPhaseTransition(6, this.t.transitionPhase5, () => {
      this.startBossFight();
    });
  }

  // =============================================
  // PHASE 2: INBOX SURGERY
  // =============================================
  startTriagePhase() {
    this.phase = 'triage';
    this.phaseIndex = 1;
    this.updatePhaseText();

    this.triageElements = [];
    this.triageIndex = 0;
    this.triageEmails = this.t.triageEmails;
    this.triageCorrect = 0;
    this.streak = 0;

    this.dialogue.start('Ferpilot', [this.t.triageInstructions], () => {
      this.showTriageEmail();
    });
  }

  showTriageEmail() {
    this.clearTriageElements();

    if (this.triageIndex >= this.triageEmails.length) {
      this.finishTriage();
      return;
    }

    const email = this.triageEmails[this.triageIndex];
    const cats = this.t.triageCategories;

    // Progress bar
    const progBg = this.add.rectangle(this.w / 2, 102, 400, 8, 0x1a1a2e)
      .setStrokeStyle(1, 0x334455).setDepth(960);
    const progFill = this.add.rectangle(
      this.w / 2 - 198 + (this.triageIndex / this.triageEmails.length) * 396 / 2,
      102,
      (this.triageIndex / this.triageEmails.length) * 396,
      6, 0x00ff88
    ).setOrigin(0, 0.5).setDepth(961);
    const progFillObj = this.add.rectangle(this.w / 2 - 198, 102, 0, 6, 0x00ff88)
      .setOrigin(0, 0.5).setDepth(961);
    progFillObj.width = (this.triageIndex / this.triageEmails.length) * 396;
    this.triageElements.push(progBg, progFill);

    // Counter
    const counter = this.add.text(this.w / 2, 118, `${this.t.triageTitle}  ·  ${this.triageIndex + 1}/${this.triageEmails.length}`, {
      fontFamily: 'monospace', fontSize: '13px', fill: '#00ff88', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(960);
    this.triageElements.push(counter);

    // Score display
    const scoreDisplay = this.add.text(this.w - 30, 118, `✓ ${this.triageCorrect}`, {
      fontFamily: 'monospace', fontSize: '12px', fill: '#00ff88'
    }).setOrigin(1, 0.5).setDepth(960);
    this.triageElements.push(scoreDisplay);

    // Email card with gradient border effect
    const cardBg = this.add.rectangle(this.w / 2, 180, 700, 80, 0x111e30, 0.95)
      .setStrokeStyle(2, 0x335577).setDepth(960);
    this.triageElements.push(cardBg);

    // Email icon
    const emailIcon = this.add.text(60, 158, '✉', {
      fontSize: '20px', fill: '#ffaa44'
    }).setDepth(961);
    this.triageElements.push(emailIcon);

    const subjectText = this.add.text(90, 158, email.subject, {
      fontFamily: 'monospace', fontSize: '13px', fill: '#ffaa44', fontStyle: 'bold',
      wordWrap: { width: 600 }
    }).setDepth(961);
    this.triageElements.push(subjectText);

    const previewText = this.add.text(90, 185, email.preview, {
      fontFamily: 'monospace', fontSize: '12px', fill: '#888888',
      wordWrap: { width: 600 }
    }).setDepth(961);
    this.triageElements.push(previewText);

    // Category buttons — improved with icons and better spacing
    const catIcons = ['🚫', '🤖', '✍️', '🔺', '⚙️'];
    const colors = [0x444444, 0x225588, 0x338844, 0xcc5533, 0x885599];
    const hoverColors = [0x555555, 0x3377aa, 0x44aa55, 0xdd7744, 0xaa77bb];
    const btnW = 130;
    const totalW = cats.length * btnW + (cats.length - 1) * 8;
    const startX = (this.w - totalW) / 2 + btnW / 2;

    cats.forEach((cat, i) => {
      const bx = startX + i * (btnW + 8);
      const by = 255;

      const btn = this.add.rectangle(bx, by, btnW, 50, colors[i], 0.9)
        .setStrokeStyle(2, 0x555555).setDepth(960)
        .setInteractive({ useHandCursor: true });

      btn.on('pointerover', () => {
        btn.setFillStyle(hoverColors[i]);
        btn.setStrokeStyle(2, 0xffffff);
      });
      btn.on('pointerout', () => {
        btn.setFillStyle(colors[i]);
        btn.setStrokeStyle(2, 0x555555);
      });
      btn.on('pointerdown', () => this.handleTriageChoice(i, email));

      const icon = this.add.text(bx, by - 10, catIcons[i], {
        fontSize: '14px'
      }).setOrigin(0.5).setDepth(961);

      const label = this.add.text(bx, by + 10, cat, {
        fontFamily: 'monospace', fontSize: '10px', fill: '#ffffff', align: 'center',
        wordWrap: { width: btnW - 10 }
      }).setOrigin(0.5).setDepth(961);

      // Keyboard shortcut hint
      const keyHint = this.add.text(bx + btnW / 2 - 8, by - 22, `${i + 1}`, {
        fontFamily: 'monospace', fontSize: '9px', fill: '#666666'
      }).setOrigin(0.5).setDepth(961);

      this.triageElements.push(btn, icon, label, keyHint);
    });

    // Keyboard shortcuts
    this.triageKeyHandlers = [];
    for (let i = 0; i < Math.min(5, cats.length); i++) {
      const key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE + i);
      const handler = () => {
        if (this.phase !== 'triage') return;
        this.handleTriageChoice(i, email);
      };
      key.on('down', handler);
      this.triageKeyHandlers.push({ key, handler });
    }
  }

  handleTriageChoice(chosenIndex, email) {
    if (this.triageKeyHandlers) {
      this.triageKeyHandlers.forEach(({ key, handler }) => key.off('down', handler));
      this.triageKeyHandlers = [];
    }

    const isCorrect = chosenIndex === email.correct;
    let feedback;

    // Flash feedback
    this.flashFeedback(isCorrect, this.w / 2, 180);

    if (isCorrect) {
      feedback = email.feedback_good;
      this.metricsSystem.applyEffects(email.effect_correct);
      this.showScorePopup(email.effect_correct);
      this.triageCorrect++;
    } else {
      const badKeys = ['feedback_bad_ignore', 'feedback_bad_ai', 'feedback_bad_reply', 'feedback_bad_escalate', 'feedback_bad_auto'];
      feedback = email[badKeys[chosenIndex]] || email.feedback_good;
      this.metricsSystem.applyEffects(email.effect_wrong);
      this.showScorePopup(email.effect_wrong);
    }

    this.ui.update();
    this.clearTriageElements();

    // Show Copilot tip after feedback for correct answers
    const lines = [feedback];
    if (isCorrect && email.copilotTip) {
      lines.push(email.copilotTip);
    }

    this.dialogue.start('Ferpilot', lines, () => {
      this.triageIndex++;
      this.showTriageEmail();
    });
  }

  clearTriageElements() {
    if (this.triageElements) {
      this.triageElements.forEach(e => e.destroy());
      this.triageElements = [];
    }
    if (this.triageKeyHandlers) {
      this.triageKeyHandlers.forEach(({ key, handler }) => key.off('down', handler));
      this.triageKeyHandlers = [];
    }
  }

  finishTriage() {
    this.metricsSystem.save();
    const score = `${this.triageCorrect}/${this.triageEmails.length}`;
    const pct = this.triageCorrect / this.triageEmails.length;
    let grade = pct >= 0.85 ? '⭐ Excellent!' : pct >= 0.6 ? '👍 Good' : '📚 Keep learning';
    this.dialogue.start('Ferpilot', [`${this.t.triageComplete} ${score} — ${grade}`], () => {
      this.startDraftReviewTransition();
    });
  }

  // =============================================
  // PHASE 3: COPILOT DRAFT REVIEW
  // =============================================
  startDraftReview() {
    this.phase = 'draftReview';
    this.phaseIndex = 2;
    this.updatePhaseText();

    this.dialogue.start('Ferpilot', [this.t.draftReviewIntro], () => {
      this.showDraftReviewUI();
    });
  }

  showDraftReviewUI() {
    this.draftElements = [];
    this.foundIssues = [];
    this.issueMap = {};
    this.t.draftReviewIssues.forEach(issue => {
      this.issueMap[issue.lineIndex] = issue;
    });

    // Context box with better styling
    const ctxBg = this.add.rectangle(this.w / 2, 130, this.w - 40, 48, 0x1a1a2e, 0.9)
      .setStrokeStyle(1, 0x445566).setDepth(960);
    this.draftElements.push(ctxBg);

    const ctxText = this.add.text(30, 115, this.t.draftReviewContext, {
      fontFamily: 'monospace', fontSize: '10px', fill: '#aaaaaa',
      wordWrap: { width: this.w - 60 }
    }).setDepth(961);
    this.draftElements.push(ctxText);

    // Title + instructions
    const titleTxt = this.add.text(this.w / 2, 166, `${this.t.draftReviewTitle}  —  ${this.t.draftReviewInstructions}`, {
      fontFamily: 'monospace', fontSize: '11px', fill: '#00ff88'
    }).setOrigin(0.5).setDepth(960);
    this.draftElements.push(titleTxt);

    // "Copilot Draft" label
    const copilotLabel = this.add.text(40, 183, '🤖 Copilot Draft:', {
      fontFamily: 'monospace', fontSize: '10px', fill: '#5588cc', fontStyle: 'bold'
    }).setDepth(960);
    this.draftElements.push(copilotLabel);

    // Draft lines as clickable rows
    const draftLines = this.t.draftReviewDraft;
    const startY = 198;
    const lineH = 21;

    this.draftLineObjects = [];

    draftLines.forEach((line, i) => {
      if (line === '') {
        this.draftLineObjects.push(null);
        return;
      }

      const y = startY + i * lineH;
      const isIssue = this.issueMap[i] !== undefined;

      const bg = this.add.rectangle(this.w / 2, y + lineH / 2, this.w - 60, lineH, 0x0d1b2a, 0.01)
        .setDepth(960);

      if (isIssue) {
        bg.setInteractive({ useHandCursor: true });
        bg.on('pointerover', () => {
          if (!this.foundIssues.includes(i)) {
            bg.setFillStyle(0x223344, 0.8);
            bg.setStrokeStyle(1, 0x4488aa);
          }
        });
        bg.on('pointerout', () => {
          if (!this.foundIssues.includes(i)) {
            bg.setFillStyle(0x0d1b2a, 0.01);
            bg.setStrokeStyle(0);
          }
        });
        bg.on('pointerdown', () => this.handleDraftClick(i));
      }

      const txt = this.add.text(50, y + 3, `  ${line}`, {
        fontFamily: 'monospace', fontSize: '12px', fill: isIssue ? '#dddddd' : '#666666'
      }).setDepth(961);

      // Line number
      const lineNum = this.add.text(35, y + 3, `${i + 1}`, {
        fontFamily: 'monospace', fontSize: '9px', fill: '#333333'
      }).setDepth(961);

      this.draftLineObjects.push({ bg, txt, lineNum, index: i });
      this.draftElements.push(bg, txt, lineNum);
    });

    // Issue counter - more prominent
    this.draftCounterBg = this.add.rectangle(this.w / 2, this.h - 58, 220, 28, 0x1a1a2e, 0.9)
      .setStrokeStyle(1, 0x334455).setDepth(960);
    this.draftElements.push(this.draftCounterBg);

    this.draftCounter = this.add.text(this.w / 2, this.h - 58, `Issues: 0/${this.t.draftReviewIssues.length}`, {
      fontFamily: 'monospace', fontSize: '13px', fill: '#888888', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(960);
    this.draftElements.push(this.draftCounter);

    // Done button (appears after 3+ found)
    this.draftDoneBtn = this.add.rectangle(this.w / 2, this.h - 28, 180, 32, 0x0f3460, 1)
      .setStrokeStyle(2, 0x00ff88).setDepth(960)
      .setInteractive({ useHandCursor: true }).setVisible(false);
    this.draftDoneBtnText = this.add.text(this.w / 2, this.h - 28, this.t.bossContinue, {
      fontFamily: 'monospace', fontSize: '13px', fill: '#00ff88'
    }).setOrigin(0.5).setDepth(961).setVisible(false);
    this.draftDoneBtn.on('pointerdown', () => this.finishDraftReview());
    this.draftElements.push(this.draftDoneBtn, this.draftDoneBtnText);
  }

  handleDraftClick(lineIndex) {
    if (this.foundIssues.includes(lineIndex)) return;
    if (this.phase !== 'draftReview') return;

    const issue = this.issueMap[lineIndex];
    if (!issue) return;

    this.foundIssues.push(lineIndex);

    // Flash green
    this.flashFeedback(true, this.w / 2, 200 + lineIndex * 21);

    // Highlight the line
    const lineObj = this.draftLineObjects[lineIndex];
    if (lineObj) {
      lineObj.bg.setFillStyle(0x003322, 0.9);
      lineObj.bg.setStrokeStyle(1, 0x00ff88);
      lineObj.txt.setFill('#00ff88');

      // Show issue label
      const labelTxt = this.add.text(lineObj.txt.x + lineObj.txt.width + 10, lineObj.txt.y + 3, `← ${issue.label}`, {
        fontFamily: 'monospace', fontSize: '9px', fill: '#ffaa44'
      }).setDepth(962);
      this.draftElements.push(labelTxt);
    }

    // Apply effects
    this.metricsSystem.applyEffects(issue.effect);
    this.showScorePopup(issue.effect);
    this.ui.update();

    // Update counter
    this.draftCounter.setText(`Issues: ${this.foundIssues.length}/${this.t.draftReviewIssues.length}`);
    this.draftCounter.setFill('#00ff88');

    // Show done button after 3 found
    if (this.foundIssues.length >= 3) {
      this.draftDoneBtn.setVisible(true);
      this.draftDoneBtnText.setVisible(true);
      // Pulse animation
      this.tweens.add({
        targets: [this.draftDoneBtn, this.draftDoneBtnText],
        scaleX: 1.05, scaleY: 1.05,
        duration: 500, yoyo: true, repeat: 2
      });
    }
  }

  finishDraftReview() {
    this.clearDraftElements();
    const found = this.foundIssues.length;
    const total = this.t.draftReviewIssues.length;
    const pct = found / total;
    let grade = pct >= 0.8 ? '⭐ Sharp review!' : pct >= 0.6 ? '👍 Good catches' : '📚 Keep supervising';
    const msg = `${this.t.draftReviewComplete} (${found}/${total}) — ${grade}`;
    this.metricsSystem.save();

    this.dialogue.start('Ferpilot', [msg], () => {
      this.startSystemFixTransition();
    });
  }

  clearDraftElements() {
    if (this.draftElements) {
      this.draftElements.forEach(e => e.destroy());
      this.draftElements = [];
    }
    this.draftLineObjects = [];
  }

  // =============================================
  // PHASE 4: SYSTEM FIX (Pick 3)
  // =============================================
  startSystemFix() {
    this.phase = 'systemFix';
    this.phaseIndex = 3;
    this.updatePhaseText();

    this.dialogue.start('Ferpilot', [this.t.systemFixIntro], () => {
      this.showSystemFixUI();
    });
  }

  showSystemFixUI() {
    this.systemFixElements = [];
    this.systemFixSelected = [];

    const opts = this.t.systemFixOptions;
    const panelW = Math.min(this.w - 40, 720);

    // Title with counter
    this.sysTitle = this.add.text(this.w / 2, 108, `${this.t.systemFixTitle}  —  ${this.t.systemFixSelectCount} (0/3)`, {
      fontFamily: 'monospace', fontSize: '13px', fill: '#00ff88', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(960);
    this.systemFixElements.push(this.sysTitle);

    const startY = 132;
    const optH = 35;
    const gap = 5;

    this.systemFixBtns = [];

    opts.forEach((opt, i) => {
      const y = startY + i * (optH + gap);

      // Determine if this is a "trap" option (negative effects)
      const isGood = opt.effect.decision >= 0 && opt.effect.clarity >= 0;

      const bg = this.add.rectangle(this.w / 2, y + optH / 2, panelW, optH, 0x0f3460, 1)
        .setStrokeStyle(1, 0x334455).setDepth(960)
        .setInteractive({ useHandCursor: true });

      const txt = this.add.text(55, y + 8, `${i + 1}. ${opt.text}`, {
        fontFamily: 'monospace', fontSize: '11px', fill: '#cccccc',
        wordWrap: { width: panelW - 50 }
      }).setDepth(961);

      // Checkbox indicator
      const checkbox = this.add.text(38, y + 8, '○', {
        fontFamily: 'monospace', fontSize: '13px', fill: '#555555'
      }).setDepth(961);

      bg.on('pointerover', () => {
        if (!this.systemFixSelected.includes(i)) bg.setFillStyle(0x1a5276);
      });
      bg.on('pointerout', () => {
        if (!this.systemFixSelected.includes(i)) bg.setFillStyle(0x0f3460);
      });
      bg.on('pointerdown', () => this.toggleSystemFix(i));

      this.systemFixBtns.push({ bg, txt, checkbox, index: i });
      this.systemFixElements.push(bg, txt, checkbox);
    });

    // Confirm button
    this.sysConfirmBtn = this.add.rectangle(this.w / 2, this.h - 28, 200, 34, 0x333333, 1)
      .setStrokeStyle(2, 0x555555).setDepth(960)
      .setInteractive({ useHandCursor: true });
    this.sysConfirmTxt = this.add.text(this.w / 2, this.h - 28, this.t.systemFixConfirm, {
      fontFamily: 'monospace', fontSize: '13px', fill: '#555555'
    }).setOrigin(0.5).setDepth(961);
    this.sysConfirmBtn.on('pointerdown', () => this.confirmSystemFix());
    this.systemFixElements.push(this.sysConfirmBtn, this.sysConfirmTxt);
  }

  toggleSystemFix(index) {
    if (this.phase !== 'systemFix') return;

    if (this.systemFixSelected.includes(index)) {
      // Deselect
      this.systemFixSelected = this.systemFixSelected.filter(i => i !== index);
      this.systemFixBtns[index].bg.setFillStyle(0x0f3460);
      this.systemFixBtns[index].bg.setStrokeStyle(1, 0x334455);
      this.systemFixBtns[index].txt.setFill('#cccccc');
      this.systemFixBtns[index].checkbox.setText('○').setFill('#555555');
    } else if (this.systemFixSelected.length < 3) {
      // Select with feedback
      this.systemFixSelected.push(index);
      this.systemFixBtns[index].bg.setFillStyle(0x003322);
      this.systemFixBtns[index].bg.setStrokeStyle(2, 0x00ff88);
      this.systemFixBtns[index].txt.setFill('#00ff88');
      this.systemFixBtns[index].checkbox.setText('●').setFill('#00ff88');

      // Quick pulse
      this.tweens.add({
        targets: this.systemFixBtns[index].bg,
        scaleX: 1.01, scaleY: 1.05,
        duration: 100, yoyo: true
      });
    }

    // Update title counter
    this.sysTitle.setText(`${this.t.systemFixTitle}  —  ${this.t.systemFixSelectCount} (${this.systemFixSelected.length}/3)`);

    // Update confirm button
    if (this.systemFixSelected.length === 3) {
      this.sysConfirmBtn.setFillStyle(0x0f3460);
      this.sysConfirmBtn.setStrokeStyle(2, 0x00ff88);
      this.sysConfirmTxt.setFill('#00ff88');
      // Pulse confirm
      this.tweens.add({
        targets: [this.sysConfirmBtn],
        scaleX: 1.03, scaleY: 1.1,
        duration: 300, yoyo: true, repeat: 1
      });
    } else {
      this.sysConfirmBtn.setFillStyle(0x333333);
      this.sysConfirmBtn.setStrokeStyle(2, 0x555555);
      this.sysConfirmTxt.setFill('#555555');
    }
  }

  confirmSystemFix() {
    if (this.systemFixSelected.length < 3) return;

    const opts = this.t.systemFixOptions;
    const feedbacks = [];
    let hasGood = false;
    let hasBad = false;

    this.systemFixSelected.forEach(i => {
      this.metricsSystem.applyEffects(opts[i].effect);
      this.showScorePopup(opts[i].effect);
      feedbacks.push(opts[i].feedback);
      if (opts[i].effect.decision < 0) hasBad = true;
      else hasGood = true;
    });

    this.ui.update();
    this.metricsSystem.save();
    this.clearSystemFixElements();

    // Flash based on quality
    this.flashFeedback(!hasBad, this.w / 2, this.h / 2);

    this.dialogue.start('Ferpilot', [...feedbacks, this.t.systemFixComplete], () => {
      this.startWorkflowTransition();
    });
  }

  clearSystemFixElements() {
    if (this.systemFixElements) {
      this.systemFixElements.forEach(e => e.destroy());
      this.systemFixElements = [];
    }
    this.systemFixBtns = [];
  }

  // =============================================
  // PHASE 5: WORKFLOW BUILDER
  // =============================================
  startWorkflowTransition() {
    this.showPhaseTransition(5, this.t.transitionPhase45, () => {
      this.startWorkflowBuilder();
    });
  }

  startWorkflowBuilder() {
    this.phase = 'workflow';
    this.phaseIndex = 4;
    this.updatePhaseText();

    this.workflowElements = [];
    this.workflowIndex = 0;
    this.workflowCorrect = 0;
    this.workflowTasks = this.t.workflowTasks;
    this.streak = 0;

    this.dialogue.start('Ferpilot', [this.t.workflowIntro], () => {
      this.showWorkflowTask();
    });
  }

  showWorkflowTask() {
    this.clearWorkflowElements();

    if (this.workflowIndex >= this.workflowTasks.length) {
      this.finishWorkflow();
      return;
    }

    const task = this.workflowTasks[this.workflowIndex];
    const cols = [this.t.workflowCopilotCol, this.t.workflowHumanCol, this.t.workflowSystemCol];
    const colIcons = ['🤖', '👤', '⚙️'];
    const colColors = [0x225588, 0x338844, 0x885599];
    const colHover = [0x3377aa, 0x44aa55, 0xaa77bb];

    // Progress bar
    const progBg = this.add.rectangle(this.w / 2, 102, 400, 8, 0x1a1a2e)
      .setStrokeStyle(1, 0x334455).setDepth(960);
    const progFill = this.add.rectangle(this.w / 2 - 198, 102, 0, 6, 0x00ff88)
      .setOrigin(0, 0.5).setDepth(961);
    progFill.width = (this.workflowIndex / this.workflowTasks.length) * 396;
    this.workflowElements.push(progBg, progFill);

    // Counter
    const counter = this.add.text(this.w / 2, 118, `${this.t.workflowTitle}  ·  ${this.workflowIndex + 1}/${this.workflowTasks.length}`, {
      fontFamily: 'monospace', fontSize: '13px', fill: '#00ff88', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(960);
    this.workflowElements.push(counter);

    // Task card
    const cardBg = this.add.rectangle(this.w / 2, 190, 700, 80, 0x111e30, 0.95)
      .setStrokeStyle(2, 0x335577).setDepth(960);
    this.workflowElements.push(cardBg);

    const taskIcon = this.add.text(60, 172, '📋', { fontSize: '20px' }).setDepth(961);
    this.workflowElements.push(taskIcon);

    const taskText = this.add.text(90, 172, task.task, {
      fontFamily: 'monospace', fontSize: '15px', fill: '#ffffff', fontStyle: 'bold',
      wordWrap: { width: 600 }
    }).setDepth(961);
    this.workflowElements.push(taskText);

    const subText = this.add.text(90, 198, 'Who should handle this?', {
      fontFamily: 'monospace', fontSize: '11px', fill: '#888888'
    }).setDepth(961);
    this.workflowElements.push(subText);

    // 3-column buttons
    const btnW = 200;
    const totalW = 3 * btnW + 2 * 16;
    const startX = (this.w - totalW) / 2 + btnW / 2;

    cols.forEach((col, i) => {
      const bx = startX + i * (btnW + 16);
      const by = 290;

      const btn = this.add.rectangle(bx, by, btnW, 80, colColors[i], 0.9)
        .setStrokeStyle(2, 0x555555).setDepth(960)
        .setInteractive({ useHandCursor: true });

      btn.on('pointerover', () => {
        btn.setFillStyle(colHover[i]);
        btn.setStrokeStyle(2, 0xffffff);
      });
      btn.on('pointerout', () => {
        btn.setFillStyle(colColors[i]);
        btn.setStrokeStyle(2, 0x555555);
      });
      btn.on('pointerdown', () => this.handleWorkflowChoice(i, task));

      const icon = this.add.text(bx, by - 15, colIcons[i], {
        fontSize: '22px'
      }).setOrigin(0.5).setDepth(961);

      const label = this.add.text(bx, by + 15, col, {
        fontFamily: 'monospace', fontSize: '13px', fill: '#ffffff', fontStyle: 'bold'
      }).setOrigin(0.5).setDepth(961);

      // Key hint
      const keyHint = this.add.text(bx + btnW / 2 - 8, by - 36, `${i + 1}`, {
        fontFamily: 'monospace', fontSize: '9px', fill: '#666666'
      }).setOrigin(0.5).setDepth(961);

      this.workflowElements.push(btn, icon, label, keyHint);
    });

    // Keyboard shortcuts
    this.workflowKeyHandlers = [];
    for (let i = 0; i < 3; i++) {
      const key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE + i);
      const handler = () => {
        if (this.phase !== 'workflow') return;
        this.handleWorkflowChoice(i, task);
      };
      key.on('down', handler);
      this.workflowKeyHandlers.push({ key, handler });
    }
  }

  handleWorkflowChoice(chosenIndex, task) {
    if (this.workflowKeyHandlers) {
      this.workflowKeyHandlers.forEach(({ key, handler }) => key.off('down', handler));
      this.workflowKeyHandlers = [];
    }

    const isCorrect = chosenIndex === task.correct;
    const feedback = isCorrect ? task.feedback_good : task.feedback_bad;

    this.flashFeedback(isCorrect, this.w / 2, 190);

    const effect = isCorrect
      ? { clarity: 3, decision: 4, humanAI: 3, timeSaved: 2 }
      : { clarity: -1, decision: -3, humanAI: -2, timeSaved: -1 };

    this.metricsSystem.applyEffects(effect);
    this.showScorePopup(effect);
    this.ui.update();

    if (isCorrect) this.workflowCorrect++;

    this.clearWorkflowElements();

    this.dialogue.start('Ferpilot', [feedback], () => {
      this.workflowIndex++;
      this.showWorkflowTask();
    });
  }

  clearWorkflowElements() {
    if (this.workflowElements) {
      this.workflowElements.forEach(e => e.destroy());
      this.workflowElements = [];
    }
    if (this.workflowKeyHandlers) {
      this.workflowKeyHandlers.forEach(({ key, handler }) => key.off('down', handler));
      this.workflowKeyHandlers = [];
    }
  }

  finishWorkflow() {
    this.metricsSystem.save();
    const score = `${this.workflowCorrect}/${this.workflowTasks.length}`;
    const pct = this.workflowCorrect / this.workflowTasks.length;
    let grade = pct >= 0.85 ? '⭐ Architect!' : pct >= 0.6 ? '👍 Good Design' : '📚 Keep Learning';
    this.dialogue.start('Ferpilot', [`${this.t.workflowComplete} ${score} — ${grade}`], () => {
      this.startBossTransition();
    });
  }

  // =============================================
  // PHASE 6: BOSS BATTLE — Hydra of False Productivity
  // =============================================
  startBossFight() {
    this.phase = 'boss';
    this.phaseIndex = 5;
    this.updatePhaseText();

    this.bossHeadData = this.t.bossHeads;
    this.bossCurrentHead = 0;
    this.bossPower = 50;
    this.bossElements = [];

    this.showBossHPBar();

    // Dramatic title
    const bossNameText = this.add.text(this.w / 2, 145, `🐉 ${this.t.bossTitle}`, {
      fontFamily: 'monospace', fontSize: '14px', fill: '#ff4444', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(955);
    this.bossElements.push(bossNameText);

    this.dialogue.start('Ferpilot', [this.t.bossIntro], () => {
      this.showBossHead();
    });
  }

  showBossHPBar() {
    this.bossHPBg = this.add.rectangle(this.w / 2, 115, 400, 26, 0x330000, 0.8)
      .setStrokeStyle(2, 0xff4444).setDepth(950);
    this.bossHPFill = this.add.rectangle(this.w / 2 - 196, 115, 0, 22, 0xff2244)
      .setOrigin(0, 0.5).setDepth(951);
    this.bossHPText = this.add.text(this.w / 2, 115, '', {
      fontFamily: 'monospace', fontSize: '12px', fill: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(952);

    // Head counter
    this.bossHeadCounter = this.add.text(this.w / 2 + 220, 115, '', {
      fontFamily: 'monospace', fontSize: '10px', fill: '#ff8888'
    }).setOrigin(0, 0.5).setDepth(952);

    this.updateBossHP();
  }

  updateBossHP(animated) {
    const targetW = Math.max(0, Math.min(392, (this.bossPower / 100) * 392));

    if (animated) {
      this.tweens.add({
        targets: this.bossHPFill,
        width: targetW,
        duration: 400,
        ease: 'Power2'
      });
    } else {
      this.bossHPFill.width = targetW;
    }

    this.bossHPText.setText(`${this.t.bossHP}: ${this.bossPower}`);

    // Color HP bar based on power
    if (this.bossPower > 60) {
      this.bossHPFill.setFillStyle(0xff2244);
    } else if (this.bossPower > 30) {
      this.bossHPFill.setFillStyle(0xffaa22);
    } else {
      this.bossHPFill.setFillStyle(0x44cc44);
    }

    // Update head counter
    if (this.bossHeadCounter) {
      this.bossHeadCounter.setText(`${this.t.bossRound} ${this.bossCurrentHead + 1}/5`);
    }
  }

  showBossHead() {
    if (this.bossCurrentHead >= this.bossHeadData.length || this.bossPower <= 0) {
      this.finishBoss();
      return;
    }

    const head = this.bossHeadData[this.bossCurrentHead];
    this.bossSubStep = 0;
    this.bossHeadStartPower = this.bossPower;

    // Dramatic head entrance with CharacterRenderer token
    const headToken = this.charRenderer.drawBossHead(this.w / 2, this.h / 2, this.bossCurrentHead, head.name);
    const headTokenElements = headToken.elements;

    // Scale up entrance
    headTokenElements.forEach(el => { if (el.setAlpha) el.setAlpha(0); if (el.setScale) el.setScale(0.5); });
    this.tweens.add({
      targets: headTokenElements,
      alpha: 1, scaleX: 1, scaleY: 1,
      duration: 500, ease: 'Back.easeOut'
    });

    this.time.delayedCall(1500, () => {
      this.tweens.add({
        targets: headTokenElements, alpha: 0,
        duration: 300,
        onComplete: () => {
          headTokenElements.forEach(el => el.destroy());
          this.showBossSubStep();
        }
      });
    });
  }

  showBossSubStep() {
    const head = this.bossHeadData[this.bossCurrentHead];
    let title, options, stepIcon;

    if (this.bossSubStep === 0) {
      stepIcon = '🤖';
      title = `${stepIcon} ${this.t.bossAIAction}`;
      options = head.aiOptions;
    } else if (this.bossSubStep === 1) {
      stepIcon = '👤';
      title = `${stepIcon} ${this.t.bossHumanAction}`;
      options = head.humanOptions;
    } else {
      stepIcon = '⚙️';
      title = `${stepIcon} ${this.t.bossSystemAction}`;
      options = head.systemOptions;
    }

    // Add head name context
    title = `${head.name} — ${title}`;

    this.decision.show(title, options, (idx, opt) => {
      const prevPower = this.bossPower;
      this.bossPower += opt.effect;
      this.bossPower = Phaser.Math.Clamp(this.bossPower, 0, 100);
      this.updateBossHP(true);

      // Visual feedback based on effect
      if (opt.effect > 0) {
        // Bad choice — Hydra grows
        this.flashFeedback(false, this.w / 2, 115);
        this.showFloatingIcon(this.t.bossHeadGrew, this.w / 2, 140, '#ff4444');
      } else if (opt.effect <= -2) {
        // Great choice
        this.flashFeedback(true, this.w / 2, 115);
        this.showFloatingIcon(`-${Math.abs(opt.effect)}`, this.w / 2, 140, '#00ff88');
      } else if (opt.effect < 0) {
        // Decent choice
        this.cameras.main.flash(200, 0, 50, 0, true);
        this.showFloatingIcon(`-${Math.abs(opt.effect)}`, this.w / 2, 140, '#88cc88');
      }

      // Metrics
      const metricEffect = {
        clarity: opt.effect < 0 ? 3 : -2,
        timeSaved: opt.effect < 0 ? 2 : -1,
        decision: opt.effect <= -2 ? 5 : (opt.effect > 0 ? -3 : 0),
        humanAI: opt.effect <= -2 ? 4 : (opt.effect > 0 ? -2 : 1)
      };
      this.metricsSystem.applyEffects(metricEffect);
      this.showScorePopup(metricEffect);
      this.ui.update();

      this.dialogue.start(`⚔️ ${head.name}`, [opt.feedback], () => {
        this.bossSubStep++;
        if (this.bossSubStep >= 3) {
          // Head complete — show result
          const headDamage = this.bossHeadStartPower - this.bossPower;
          if (headDamage > 3) {
            this.showFloatingIcon(`${this.t.bossHeadDefeated} 💀`, this.w / 2, this.h / 2, '#00ff88');
          }
          this.bossCurrentHead++;
          this.time.delayedCall(600, () => this.showBossHead());
        } else {
          this.showBossSubStep();
        }
      });
    });
  }

  finishBoss() {
    if (this.bossHPBg) this.bossHPBg.destroy();
    if (this.bossHPFill) this.bossHPFill.destroy();
    if (this.bossHPText) this.bossHPText.destroy();
    if (this.bossHeadCounter) this.bossHeadCounter.destroy();
    if (this.bossElements) {
      this.bossElements.forEach(e => e.destroy());
      this.bossElements = [];
    }

    this.metricsSystem.save();

    if (this.bossPower >= 80) {
      this.showDefeatScreen();
    } else {
      this.showVictoryScreen();
    }
  }

  showVictoryScreen() {
    this.phase = 'victory';

    const overlay = this.add.rectangle(this.w / 2, this.h / 2, this.w, this.h, 0x000000, 0)
      .setScrollFactor(0).setDepth(970);
    this.tweens.add({ targets: overlay, alpha: 0.85, duration: 500 });

    // Animated title
    const emoji = this.add.text(this.w / 2, this.h * 0.08, '🎉', { fontSize: '50px' })
      .setOrigin(0.5).setDepth(971).setAlpha(0).setScale(0.3);
    this.tweens.add({
      targets: emoji, alpha: 1, scaleX: 1, scaleY: 1,
      duration: 600, ease: 'Back.easeOut', delay: 300
    });

    const victoryTitle = this.add.text(this.w / 2, this.h * 0.22, this.t.bossVictory, {
      fontFamily: 'monospace', fontSize: '16px', fill: '#00ff88', fontStyle: 'bold',
      wordWrap: { width: this.w - 80 }, align: 'center'
    }).setOrigin(0.5).setDepth(971).setAlpha(0);
    this.tweens.add({ targets: victoryTitle, alpha: 1, duration: 400, delay: 500 });

    const completeText = this.add.text(this.w / 2, this.h * 0.35, this.t.world1Complete, {
      fontFamily: 'monospace', fontSize: '20px', fill: '#ffffff', fontStyle: 'bold',
      wordWrap: { width: this.w - 80 }, align: 'center'
    }).setOrigin(0.5).setDepth(971).setAlpha(0);
    this.tweens.add({ targets: completeText, alpha: 1, duration: 400, delay: 700 });

    const summaryText = this.add.text(this.w / 2, this.h * 0.46, this.t.world1Summary, {
      fontFamily: 'monospace', fontSize: '11px', fill: '#aaaaaa',
      wordWrap: { width: this.w - 80 }, align: 'center'
    }).setOrigin(0.5).setDepth(971).setAlpha(0);
    this.tweens.add({ targets: summaryText, alpha: 1, duration: 400, delay: 900 });

    const reflectionText = this.add.text(this.w / 2, this.h * 0.56, this.t.world1Reflection, {
      fontFamily: 'monospace', fontSize: '12px', fill: '#ffaa44', fontStyle: 'bold',
      wordWrap: { width: this.w - 80 }, align: 'center'
    }).setOrigin(0.5).setDepth(971).setAlpha(0);
    this.tweens.add({ targets: reflectionText, alpha: 1, duration: 400, delay: 1100 });

    // Metrics display with bars
    const m = this.metricsSystem.metrics;
    const fl = this.metricsSystem.frontierLevel;
    const metricsList = [
      { label: this.t.clarity, val: m.clarity },
      { label: this.t.timeSaved, val: m.timeSaved },
      { label: this.t.decisionQuality, val: m.decisionQuality },
      { label: this.t.humanAI, val: m.humanAI }
    ];

    const barY = this.h * 0.66;
    const barW = 100;
    const barH = 10;
    const totalBarW = metricsList.length * (barW + 40);
    const barStartX = (this.w - totalBarW) / 2 + 20;

    metricsList.forEach((met, i) => {
      const x = barStartX + i * (barW + 40);
      // Label
      const lbl = this.add.text(x + barW / 2, barY - 12, `${met.label}`, {
        fontFamily: 'monospace', fontSize: '10px', fill: '#888888'
      }).setOrigin(0.5).setDepth(971).setAlpha(0);
      // Bar bg
      const bg = this.add.rectangle(x, barY + 2, barW, barH, 0x222222)
        .setOrigin(0, 0.5).setDepth(971).setAlpha(0);
      // Bar fill
      const color = met.val >= 70 ? 0x00ff88 : met.val >= 40 ? 0xffaa44 : 0xff4444;
      const fill = this.add.rectangle(x, barY + 2, 0, barH - 2, color)
        .setOrigin(0, 0.5).setDepth(972);
      // Value
      const valText = this.add.text(x + barW / 2, barY + 16, `${met.val}`, {
        fontFamily: 'monospace', fontSize: '11px', fill: '#ffffff', fontStyle: 'bold'
      }).setOrigin(0.5).setDepth(971).setAlpha(0);

      this.tweens.add({ targets: [lbl, bg, valText], alpha: 1, duration: 300, delay: 1300 + i * 100 });
      this.tweens.add({
        targets: fill, width: (met.val / 100) * barW,
        duration: 800, ease: 'Power2', delay: 1300 + i * 100
      });
    });

    // Frontier level
    const flText = this.add.text(this.w / 2, this.h * 0.80, `${this.t.frontierLevel}: ${'⭐'.repeat(fl)}${'☆'.repeat(5 - fl)}`, {
      fontFamily: 'monospace', fontSize: '14px', fill: '#ffdd44', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(971).setAlpha(0);
    this.tweens.add({ targets: flText, alpha: 1, duration: 400, delay: 1800 });

    // Back button
    const btn = this.add.rectangle(this.w / 2, this.h * 0.90, 220, 38, 0x0f3460)
      .setStrokeStyle(2, 0x00ff88).setDepth(972).setAlpha(0)
      .setInteractive({ useHandCursor: true });
    const btnText = this.add.text(this.w / 2, this.h * 0.90, this.t.backToLobby, {
      fontFamily: 'monospace', fontSize: '13px', fill: '#00ff88'
    }).setOrigin(0.5).setDepth(973).setAlpha(0);

    this.tweens.add({ targets: [btn, btnText], alpha: 1, duration: 400, delay: 2100 });

    btn.on('pointerover', () => btn.setFillStyle(0x1a5276));
    btn.on('pointerout', () => btn.setFillStyle(0x0f3460));
    btn.on('pointerdown', () => {
      this.metricsSystem.save();
      this.scene.start('LobbyScene');
    });
  }

  showDefeatScreen() {
    this.phase = 'defeat';

    const overlay = this.add.rectangle(this.w / 2, this.h / 2, this.w, this.h, 0x000000, 0)
      .setScrollFactor(0).setDepth(970);
    this.tweens.add({ targets: overlay, alpha: 0.85, duration: 500 });

    // Shake on defeat
    this.cameras.main.shake(500, 0.01);

    this.add.text(this.w / 2, this.h * 0.30, '💀', { fontSize: '50px' })
      .setOrigin(0.5).setDepth(971);

    this.add.text(this.w / 2, this.h * 0.45, this.t.bossDefeat, {
      fontFamily: 'monospace', fontSize: '16px', fill: '#ff4444', fontStyle: 'bold',
      wordWrap: { width: this.w - 80 }, align: 'center'
    }).setOrigin(0.5).setDepth(971);

    const retryBtn = this.add.rectangle(this.w / 2, this.h * 0.62, 220, 38, 0x660000)
      .setStrokeStyle(2, 0xff4444).setDepth(972)
      .setInteractive({ useHandCursor: true });
    this.add.text(this.w / 2, this.h * 0.62, this.t.bossRetry, {
      fontFamily: 'monospace', fontSize: '13px', fill: '#ff4444'
    }).setOrigin(0.5).setDepth(973);
    retryBtn.on('pointerover', () => retryBtn.setFillStyle(0x880000));
    retryBtn.on('pointerout', () => retryBtn.setFillStyle(0x660000));
    retryBtn.on('pointerdown', () => this.scene.restart());
  }

  // =============================================
  // UPDATE LOOP
  // =============================================
  update() {
    if (this.dialogue.isActive()) {
      if (this.player && this.player.body) this.player.body.setVelocity(0, 0);
      if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
        this.dialogue.advance();
      }
      return;
    }

    if (this.decision.isActive()) {
      if (this.player && this.player.body) this.player.body.setVelocity(0, 0);
      return;
    }

    if (this.phase !== 'explore') return;

    const speed = 160;
    const body = this.player.body;
    body.setVelocity(0, 0);
    if (this.cursors.left.isDown) body.setVelocityX(-speed);
    else if (this.cursors.right.isDown) body.setVelocityX(speed);
    if (this.cursors.up.isDown) body.setVelocityY(-speed);
    else if (this.cursors.down.isDown) body.setVelocityY(speed);

    this.playerContainer.setPosition(this.player.x, this.player.y);

    let nearNPC = null;
    this.npcs.forEach(npc => {
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, npc.x, npc.y);
      if (dist < 60) nearNPC = npc;
    });

    if (nearNPC) {
      this.interactPrompt.setPosition(nearNPC.x, nearNPC.y - 48).setVisible(true);
    } else {
      this.interactPrompt.setVisible(false);
    }

    if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && nearNPC) {
      this.talkedTo[nearNPC.id] = true;

      if (!this.npcChecks[nearNPC.id]) {
        const check = this.add.text(nearNPC.x + 18, nearNPC.y - 28, '✓', {
          fontFamily: 'monospace', fontSize: '14px', fill: '#00ff88', fontStyle: 'bold'
        }).setDepth(200);
        this.npcChecks[nearNPC.id] = check;
        this.updateNPCCounter();
      }

      this.dialogue.start(nearNPC.name, nearNPC.lines, () => {
        this.checkAllTalked();
      });
    }
  }
}

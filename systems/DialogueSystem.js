// ============================================================
// DialogueSystem.js — Shows dialogue boxes with NPC text
// ============================================================

class DialogueSystem {
  constructor(scene) {
    this.scene = scene;
    this.active = false;
    this.lines = [];
    this.currentLine = 0;
    this.onComplete = null;

    // UI elements
    this.box = null;
    this.nameText = null;
    this.bodyText = null;
    this.promptText = null;
  }

  // Create the dialogue box (call once in scene create)
  create() {
    const cam = this.scene.cameras.main;
    const w = cam.width;
    const h = cam.height;
    const boxH = 140;
    const boxY = h - boxH - 10;

    // Dark box at bottom of screen
    this.box = this.scene.add.rectangle(w / 2, boxY + boxH / 2, w - 40, boxH, 0x1a1a2e, 0.95)
      .setStrokeStyle(2, 0x00ff88)
      .setScrollFactor(0).setDepth(950);

    // Speaker name
    this.nameText = this.scene.add.text(40, boxY + 12, '', {
      fontFamily: 'monospace', fontSize: '16px', fill: '#00ff88', fontStyle: 'bold'
    }).setScrollFactor(0).setDepth(951);

    // Dialogue body
    this.bodyText = this.scene.add.text(40, boxY + 38, '', {
      fontFamily: 'monospace', fontSize: '14px', fill: '#ffffff',
      wordWrap: { width: w - 100 }
    }).setScrollFactor(0).setDepth(951);

    // Continue prompt
    const lang = this.scene.registry.get('language') || 'en';
    this.promptText = this.scene.add.text(w - 60, boxY + boxH - 20, TRANSLATIONS[lang].continueText, {
      fontFamily: 'monospace', fontSize: '11px', fill: '#888888'
    }).setOrigin(1, 1).setScrollFactor(0).setDepth(951);

    this.hideAll();
  }

  // Start a dialogue sequence
  // speakerName: string, lines: string[], onComplete: function
  start(speakerName, lines, onComplete) {
    this.active = true;
    this.lines = lines;
    this.currentLine = 0;
    this.speakerName = speakerName;
    this.onComplete = onComplete || null;

    this.showAll();
    this.showLine();
  }

  // Show current line
  showLine() {
    this.nameText.setText(this.speakerName);
    this.bodyText.setText(this.lines[this.currentLine]);
  }

  // Advance to next line (call on SPACE)
  advance() {
    if (!this.active) return;
    this.currentLine++;
    if (this.currentLine >= this.lines.length) {
      this.close();
    } else {
      this.showLine();
    }
  }

  close() {
    this.active = false;
    this.hideAll();
    if (this.onComplete) this.onComplete();
  }

  showAll() {
    this.box.setVisible(true);
    this.nameText.setVisible(true);
    this.bodyText.setVisible(true);
    this.promptText.setVisible(true);
  }

  hideAll() {
    this.box.setVisible(false);
    this.nameText.setVisible(false);
    this.bodyText.setVisible(false);
    this.promptText.setVisible(false);
  }

  isActive() {
    return this.active;
  }
}

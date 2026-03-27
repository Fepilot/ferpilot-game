// ============================================================
// DecisionSystem.js — Shows multiple-choice decisions
// ============================================================

class DecisionSystem {
  constructor(scene) {
    this.scene = scene;
    this.active = false;
    this.elements = [];
  }

  // Show a decision panel
  // title: string, options: [{ text, ...data }], onSelect: function(index, option)
  show(title, options, onSelect) {
    this.active = true;
    this.clear();

    const cam = this.scene.cameras.main;
    const w = cam.width;
    const h = cam.height;
    const panelW = Math.min(w - 60, 700);
    const optionH = 50;
    const panelH = 80 + options.length * (optionH + 10) + 20;
    const startY = (h - panelH) / 2;

    // Background overlay
    const overlay = this.scene.add.rectangle(w / 2, h / 2, w, h, 0x000000, 0.6)
      .setScrollFactor(0).setDepth(960).setInteractive();
    this.elements.push(overlay);

    // Panel with subtle border glow
    const panel = this.scene.add.rectangle(w / 2, startY + panelH / 2, panelW, panelH, 0x16213e, 0.97)
      .setStrokeStyle(2, 0x00ff88)
      .setScrollFactor(0).setDepth(961);
    this.elements.push(panel);

    // Title
    const titleText = this.scene.add.text(w / 2, startY + 25, title, {
      fontFamily: 'monospace', fontSize: '16px', fill: '#00ff88', fontStyle: 'bold',
      wordWrap: { width: panelW - 40 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(962);
    this.elements.push(titleText);

    // Options as clickable buttons
    options.forEach((opt, i) => {
      const optY = startY + 70 + i * (optionH + 10);

      const btn = this.scene.add.rectangle(w / 2, optY + optionH / 2, panelW - 40, optionH, 0x0f3460, 1)
        .setStrokeStyle(1, 0x334466)
        .setScrollFactor(0).setDepth(962)
        .setInteractive({ useHandCursor: true });

      // Hover effects with more juice
      btn.on('pointerover', () => {
        btn.setFillStyle(0x1a5276);
        btn.setStrokeStyle(2, 0x00ff88);
        label.setFill('#00ff88');
      });
      btn.on('pointerout', () => {
        btn.setFillStyle(0x0f3460);
        btn.setStrokeStyle(1, 0x334466);
        label.setFill('#ffffff');
      });
      btn.on('pointerdown', () => {
        // Quick click pulse
        btn.setFillStyle(0x00ff88);
        this.scene.time.delayedCall(80, () => {
          this.active = false;
          this.clear();
          if (onSelect) onSelect(i, opt);
        });
      });

      const label = this.scene.add.text(w / 2, optY + optionH / 2, `${i + 1}. ${opt.text}`, {
        fontFamily: 'monospace', fontSize: '13px', fill: '#ffffff',
        wordWrap: { width: panelW - 80 }
      }).setOrigin(0.5).setScrollFactor(0).setDepth(963);

      this.elements.push(btn, label);
    });

    // Keyboard shortcuts (1-4)
    this.keyHandlers = [];
    options.forEach((opt, i) => {
      if (i < 9) {
        const key = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE + i);
        const handler = () => {
          if (!this.active) return;
          this.active = false;
          this.clear();
          if (onSelect) onSelect(i, opt);
        };
        key.on('down', handler);
        this.keyHandlers.push({ key, handler });
      }
    });
  }

  clear() {
    this.elements.forEach(e => e.destroy());
    this.elements = [];
    if (this.keyHandlers) {
      this.keyHandlers.forEach(({ key, handler }) => key.off('down', handler));
      this.keyHandlers = [];
    }
  }

  isActive() {
    return this.active;
  }
}

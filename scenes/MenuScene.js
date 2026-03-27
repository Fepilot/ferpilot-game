// ============================================================
// MenuScene.js — Main menu with Start Game and Language toggle
// ============================================================

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;

    // Default language
    if (!this.registry.get('language')) {
      this.registry.set('language', 'en');
    }
    const lang = this.registry.get('language');
    const t = TRANSLATIONS[lang];

    // Background
    this.cameras.main.setBackgroundColor('#0a0a23');

    // Decorative grid lines
    const gfx = this.add.graphics();
    gfx.lineStyle(1, 0x16213e, 0.3);
    for (let x = 0; x < w; x += 40) { gfx.lineBetween(x, 0, x, h); }
    for (let y = 0; y < h; y += 40) { gfx.lineBetween(0, y, w, y); }

    // Title
    this.add.text(w / 2, h * 0.22, t.title, {
      fontFamily: 'monospace', fontSize: '36px', fill: '#00ff88', fontStyle: 'bold',
      stroke: '#003322', strokeThickness: 4
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(w / 2, h * 0.32, t.credits, {
      fontFamily: 'monospace', fontSize: '14px', fill: '#5588aa'
    }).setOrigin(0.5);

    // Draw Ferpilot character (stylized token)
    const charRenderer = new CharacterRenderer(this);
    charRenderer.drawFerpilot(w / 2, h * 0.50, 1.3);

    // Start Game button
    this.createButton(w / 2, h * 0.70, t.startGame, () => {
      this.scene.start('IntroScene');
    });

    // Language toggle button
    const langLabel = `${t.language}: ${lang.toUpperCase()}`;
    this.langBtn = this.createButton(w / 2, h * 0.80, langLabel, () => {
      const current = this.registry.get('language');
      const next = current === 'en' ? 'es' : 'en';
      this.registry.set('language', next);
      this.scene.restart();
    });
  }

  // Reusable button creator
  createButton(x, y, text, callback) {
    const btn = this.add.rectangle(x, y, 260, 44, 0x0f3460, 1)
      .setStrokeStyle(2, 0x00ff88)
      .setInteractive({ useHandCursor: true });

    const label = this.add.text(x, y, text, {
      fontFamily: 'monospace', fontSize: '16px', fill: '#00ff88'
    }).setOrigin(0.5);

    btn.on('pointerover', () => { btn.setFillStyle(0x1a5276); label.setFill('#ffffff'); });
    btn.on('pointerout', () => { btn.setFillStyle(0x0f3460); label.setFill('#00ff88'); });
    btn.on('pointerdown', callback);

    return { btn, label };
  }
}

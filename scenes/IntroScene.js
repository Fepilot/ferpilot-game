// ============================================================
// IntroScene.js — Story introduction with typewriter text
// ============================================================

class IntroScene extends Phaser.Scene {
  constructor() {
    super({ key: 'IntroScene' });
  }

  create() {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;
    const lang = this.registry.get('language') || 'en';
    const t = TRANSLATIONS[lang];

    this.cameras.main.setBackgroundColor('#0a0a23');

    this.lines = t.introLines;
    this.currentLine = 0;

    // Title
    this.add.text(w / 2, 40, t.title, {
      fontFamily: 'monospace', fontSize: '20px', fill: '#00ff88', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Central text area
    this.storyText = this.add.text(w / 2, h * 0.45, '', {
      fontFamily: 'monospace', fontSize: '18px', fill: '#ffffff',
      wordWrap: { width: w - 120 }, align: 'center', lineSpacing: 8
    }).setOrigin(0.5);

    // Continue prompt
    this.promptText = this.add.text(w / 2, h - 50, t.continueText, {
      fontFamily: 'monospace', fontSize: '13px', fill: '#555555'
    }).setOrigin(0.5);

    // Blinking prompt
    this.tweens.add({
      targets: this.promptText, alpha: 0.3,
      duration: 600, yoyo: true, repeat: -1
    });

    // Show first line
    this.showLine();

    // SPACE to advance
    this.input.keyboard.on('keydown-SPACE', () => {
      this.currentLine++;
      if (this.currentLine >= this.lines.length) {
        this.scene.start('LobbyScene');
      } else {
        this.showLine();
      }
    });

    // Skip with ESC
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('LobbyScene');
    });
  }

  showLine() {
    // Typewriter effect
    const fullText = this.lines[this.currentLine];
    this.storyText.setText('');
    let i = 0;
    if (this.typeTimer) this.typeTimer.remove();
    this.typeTimer = this.time.addEvent({
      delay: 30,
      repeat: fullText.length - 1,
      callback: () => {
        this.storyText.setText(fullText.substring(0, i + 1));
        i++;
      }
    });

    // Progress dots
    const w = this.cameras.main.width;
    if (this.dots) this.dots.destroy();
    const progress = `${this.currentLine + 1}/${this.lines.length}`;
    this.dots = this.add.text(w / 2, this.cameras.main.height - 80, progress, {
      fontFamily: 'monospace', fontSize: '12px', fill: '#333333'
    }).setOrigin(0.5);
  }
}

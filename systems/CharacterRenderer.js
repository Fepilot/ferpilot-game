// ============================================================
// CharacterRenderer.js — Stylized character tokens/avatars
// Renders Ferpilot + NPCs as composed graphic tokens
// ============================================================

class CharacterRenderer {
  constructor(scene) {
    this.scene = scene;
  }

  // =============================================
  // FERPILOT — The protagonist pilot token
  // Returns a Container that can be moved
  // =============================================
  drawFerpilot(x, y, scale = 1) {
    const s = this.scene;
    const container = s.add.container(x, y).setDepth(100);

    const g = s.add.graphics();

    // Glow ring (pulsing)
    const glow = s.add.circle(0, 0, 24 * scale, 0xffdd00, 0.15);
    s.tweens.add({ targets: glow, scaleX: 1.15, scaleY: 1.15, alpha: 0.05, duration: 1200, yoyo: true, repeat: -1 });
    container.add(glow);

    // Body — pilot jacket (dark navy, rounded)
    g.fillStyle(0x1a3a5c, 1);
    g.fillRoundedRect(-14 * scale, -5 * scale, 28 * scale, 32 * scale, 6 * scale);

    // Red shirt under jacket
    g.fillStyle(0xcc3333, 1);
    g.fillRoundedRect(-9 * scale, -2 * scale, 18 * scale, 22 * scale, 3 * scale);

    container.add(g);

    // "F" on shirt
    const fLetter = s.add.text(0, 8 * scale, 'F', {
      fontFamily: 'monospace', fontSize: `${16 * scale}px`, fill: '#ffdd00', fontStyle: 'bold'
    }).setOrigin(0.5);
    container.add(fLetter);

    // Head graphics
    const gHead = s.add.graphics();

    // Head — skin circle
    gHead.fillStyle(0xf5c6a0, 1);
    gHead.fillCircle(0, -18 * scale, 13 * scale);

    // Aviator sunglasses (reflective)
    gHead.fillStyle(0x1a1a2e, 1);
    gHead.fillRoundedRect(-10 * scale, -22 * scale, 8 * scale, 6 * scale, 2 * scale);
    gHead.fillRoundedRect(2 * scale, -22 * scale, 8 * scale, 6 * scale, 2 * scale);
    // Lens shine
    gHead.fillStyle(0x4488cc, 0.4);
    gHead.fillRect(-9 * scale, -21 * scale, 3 * scale, 2 * scale);
    gHead.fillRect(3 * scale, -21 * scale, 3 * scale, 2 * scale);
    // Bridge
    gHead.lineStyle(1.5 * scale, 0x888833);
    gHead.lineBetween(-2 * scale, -19 * scale, 2 * scale, -19 * scale);

    // Hair
    gHead.fillStyle(0x3a2a1a, 1);
    gHead.fillRoundedRect(-12 * scale, -30 * scale, 24 * scale, 8 * scale, 3 * scale);

    // Pilot cap
    gHead.fillStyle(0x1a1a3e, 1);
    gHead.fillRoundedRect(-14 * scale, -34 * scale, 28 * scale, 8 * scale, 3 * scale);
    // Cap badge
    gHead.fillStyle(0xffdd00, 1);
    gHead.fillCircle(0, -30 * scale, 3 * scale);

    // Shoulder epaulettes
    gHead.fillStyle(0xffdd00, 0.7);
    gHead.fillRoundedRect(-16 * scale, -6 * scale, 6 * scale, 3 * scale, 1);
    gHead.fillRoundedRect(10 * scale, -6 * scale, 6 * scale, 3 * scale, 1);

    container.add(gHead);

    return container;
  }

  // =============================================
  // NPC TOKENS — Office character bubbles
  // =============================================
  drawNPCToken(x, y, type, name) {
    const s = this.scene;
    const g = s.add.graphics().setDepth(90);
    const elements = [g];

    const configs = {
      envelope:  { bg: 0xdd5599, icon: '✉',  accent: 0xff88bb },
      clipboard: { bg: 0x6655cc, icon: '📋', accent: 0x9988ee },
      coffee:    { bg: 0x44aa66, icon: '☕', accent: 0x66cc88 },
      chart:     { bg: 0xcc8833, icon: '📊', accent: 0xeebb55 },
      headset:   { bg: 0x00aa88, icon: '🎧', accent: 0x33ccaa },
      shield:    { bg: 0x5566cc, icon: '🛡', accent: 0x7788ee },
      bot:       { bg: 0x888888, icon: '🤖', accent: 0xaaaaaa },
      calendar:  { bg: 0xaa5577, icon: '📅', accent: 0xcc7799 }
    };

    const cfg = configs[type] || configs.envelope;

    // Outer ring with accent
    g.lineStyle(2, cfg.accent, 0.6);
    g.strokeCircle(x, y, 24);

    // Body circle
    g.fillStyle(cfg.bg, 0.9);
    g.fillCircle(x, y, 20);

    // Inner glow
    g.fillStyle(0xffffff, 0.08);
    g.fillCircle(x - 3, y - 5, 10);

    // Face — small skin circle
    g.fillStyle(0xf5c6a0, 1);
    g.fillCircle(x, y - 6, 8);

    // Eyes
    g.fillStyle(0x222222, 1);
    g.fillCircle(x - 3, y - 7, 1.5);
    g.fillCircle(x + 3, y - 7, 1.5);

    // Icon badge (bottom-right of token)
    const badge = s.add.text(x + 12, y + 8, cfg.icon, {
      fontSize: '12px'
    }).setOrigin(0.5).setDepth(92);
    elements.push(badge);

    // Name label below
    const label = s.add.text(x, y + 30, name, {
      fontFamily: 'monospace', fontSize: '10px', fill: '#ffffff',
      backgroundColor: '#000000aa', padding: { x: 4, y: 2 }
    }).setOrigin(0.5).setDepth(91);
    elements.push(label);

    // Idle float animation
    s.tweens.add({
      targets: [g, badge, label],
      y: '-=3',
      duration: 1800 + Math.random() * 600,
      yoyo: true, repeat: -1,
      ease: 'Sine.easeInOut'
    });

    return { graphics: g, elements, x, y, type, badge, label };
  }

  // =============================================
  // CORRUPTED / VIRUS TOKENS
  // =============================================
  drawCorruptedToken(x, y, icon, name) {
    const s = this.scene;
    const g = s.add.graphics().setDepth(90);
    const elements = [g];

    // Glitchy outer ring
    g.lineStyle(2, 0xff0066, 0.8);
    g.strokeCircle(x, y, 22);
    g.lineStyle(1, 0xff00ff, 0.3);
    g.strokeCircle(x, y, 25);

    // Body — dark with noise effect
    g.fillStyle(0x220022, 0.9);
    g.fillCircle(x, y, 20);

    // Glitch lines
    g.fillStyle(0xff0066, 0.3);
    g.fillRect(x - 15, y - 3, 30, 2);
    g.fillRect(x - 10, y + 5, 20, 1);

    // Icon
    const iconTxt = s.add.text(x, y - 2, icon, {
      fontSize: '18px'
    }).setOrigin(0.5).setDepth(91);
    elements.push(iconTxt);

    // Name
    const label = s.add.text(x, y + 30, name, {
      fontFamily: 'monospace', fontSize: '10px', fill: '#ff4488',
      backgroundColor: '#110011aa', padding: { x: 4, y: 2 }
    }).setOrigin(0.5).setDepth(91);
    elements.push(label);

    // Glitch shake animation
    s.tweens.add({
      targets: [g, iconTxt, label],
      x: x + 2, duration: 80, yoyo: true, repeat: -1,
      repeatDelay: 2000 + Math.random() * 1500
    });

    // Pulse ring
    const ring = s.add.circle(x, y, 22, 0xff0066, 0).setDepth(89);
    s.tweens.add({
      targets: ring,
      scaleX: 1.4, scaleY: 1.4, alpha: 0.3,
      duration: 1500, yoyo: true, repeat: -1
    });
    elements.push(ring);

    return { graphics: g, elements, x, y };
  }

  // =============================================
  // BOSS HEAD TOKENS
  // =============================================
  drawBossHead(x, y, headIndex, name) {
    const s = this.scene;
    const g = s.add.graphics().setDepth(90);
    const elements = [g];

    const icons = ['📨', '🔥', '👻', '🔧', '🤖'];
    const colors = [0xdd4444, 0xff8800, 0x8844cc, 0x4488cc, 0x44cc88];

    const color = colors[headIndex] || 0xdd4444;
    const icon = icons[headIndex] || '💀';

    // Menacing outer ring
    g.lineStyle(3, color, 0.8);
    g.strokeCircle(x, y, 28);

    // Body
    g.fillStyle(0x220000, 0.9);
    g.fillCircle(x, y, 24);

    // Inner pattern
    g.lineStyle(1, color, 0.2);
    for (let i = 0; i < 3; i++) {
      g.strokeCircle(x, y, 10 + i * 5);
    }

    // Icon
    const iconTxt = s.add.text(x, y, icon, {
      fontSize: '24px'
    }).setOrigin(0.5).setDepth(91);
    elements.push(iconTxt);

    // Name
    const label = s.add.text(x, y + 36, name, {
      fontFamily: 'monospace', fontSize: '10px', fill: '#ff6644', fontStyle: 'bold',
      backgroundColor: '#110000aa', padding: { x: 4, y: 2 }
    }).setOrigin(0.5).setDepth(91);
    elements.push(label);

    // Breathing animation
    s.tweens.add({
      targets: [g, iconTxt],
      scaleX: 1.05, scaleY: 1.05,
      duration: 1200, yoyo: true, repeat: -1,
      ease: 'Sine.easeInOut'
    });

    return { graphics: g, elements, x, y, iconTxt, label };
  }
}

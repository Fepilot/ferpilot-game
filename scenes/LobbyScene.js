// ============================================================
// LobbyScene.js — Office hub with movement and NPC interaction
// ============================================================

class LobbyScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LobbyScene' });
  }

  create() {
    const lang = this.registry.get('language') || 'en';
    const t = TRANSLATIONS[lang];
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;

    this.cameras.main.setBackgroundColor('#1a1a2e');

    // --- Metrics ---
    this.metricsSystem = new MetricsSystem(this);
    this.metricsSystem.load();
    this.ui = new UI(this, this.metricsSystem);
    this.ui.create();

    // --- Dialogue ---
    this.dialogue = new DialogueSystem(this);
    this.dialogue.create();

    // --- Draw office environment ---
    this.drawOffice(w, h);

    // --- Player (stylized Ferpilot token) ---
    const charRenderer = new CharacterRenderer(this);
    this.playerContainer = charRenderer.drawFerpilot(w / 2, h / 2 + 40, 0.7);

    // Invisible physics body for movement
    this.player = this.add.rectangle(w / 2, h / 2 + 40, 28, 36, 0x000000, 0)
      .setDepth(99);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    // --- NPCs (themed tokens) ---
    this.charRenderer = new CharacterRenderer(this);
    this.npcs = [];
    this.createNPC(150, 200, t.npcReceptionist, t.npcReceptionistLines, 'headset');
    this.createNPC(650, 200, t.npcITGuy, t.npcITGuyLines, 'shield');

    // --- World 1 door ---
    this.door = this.add.rectangle(w - 30, h / 2, 30, 80, 0xff6600, 0.8)
      .setStrokeStyle(2, 0xffaa00).setDepth(50);
    this.doorLabel = this.add.text(w - 30, h / 2 - 55, '>>>', {
      fontFamily: 'monospace', fontSize: '12px', fill: '#ffaa00'
    }).setOrigin(0.5).setDepth(51);
    this.tweens.add({ targets: this.doorLabel, x: w - 22, duration: 500, yoyo: true, repeat: -1 });

    // --- Hint text ---
    this.hintText = this.add.text(w / 2, h - 25, t.lobbyHint, {
      fontFamily: 'monospace', fontSize: '12px', fill: '#555555'
    }).setOrigin(0.5).setDepth(200);

    // Interaction prompt (hidden by default)
    this.interactPrompt = this.add.text(0, 0, t.interact, {
      fontFamily: 'monospace', fontSize: '12px', fill: '#00ff88',
      backgroundColor: '#000000', padding: { x: 6, y: 3 }
    }).setOrigin(0.5).setDepth(200).setVisible(false);

    // --- Controls ---
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.spaceJustPressed = false;

    // --- Title ---
    this.add.text(w / 2, 65, t.lobbyTitle, {
      fontFamily: 'monospace', fontSize: '20px', fill: '#00ff88', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(200);
  }

  drawOffice(w, h) {
    const gfx = this.add.graphics();

    // Floor tiles
    gfx.fillStyle(0x222244, 1);
    for (let x = 0; x < w; x += 50) {
      for (let y = 50; y < h; y += 50) {
        gfx.fillRect(x + 1, y + 1, 48, 48);
      }
    }

    // Desks
    gfx.fillStyle(0x5c4033, 1);
    gfx.fillRect(100, 300, 120, 40);
    gfx.fillRect(350, 150, 120, 40);
    gfx.fillRect(500, 350, 120, 40);

    // Computer monitors on desks
    gfx.fillStyle(0x333355, 1);
    gfx.fillRect(130, 290, 30, 20);
    gfx.fillRect(380, 140, 30, 20);
    gfx.fillRect(530, 340, 30, 20);
    gfx.fillStyle(0x4488cc, 0.5);
    gfx.fillRect(132, 292, 26, 16);
    gfx.fillRect(382, 142, 26, 16);
    gfx.fillRect(532, 342, 26, 16);

    // Plants
    gfx.fillStyle(0x226633, 1);
    gfx.fillCircle(50, 420, 15);
    gfx.fillCircle(750, 420, 15);
    gfx.fillStyle(0x5c4033, 1);
    gfx.fillRect(44, 425, 12, 20);
    gfx.fillRect(744, 425, 12, 20);

    // Water cooler
    gfx.fillStyle(0x88bbdd, 1);
    gfx.fillRoundedRect(50, 140, 25, 50, 5);
    gfx.fillStyle(0x6699bb, 1);
    gfx.fillRect(55, 130, 15, 15);
  }

  createNPC(x, y, name, lines, type) {
    // Draw themed NPC token
    this.charRenderer.drawNPCToken(x, y, type, name);
    this.npcs.push({ name, lines, x, y });
  }

  update() {
    const speed = 160;
    const body = this.player.body;

    // Don't move during dialogue
    if (this.dialogue.isActive()) {
      body.setVelocity(0, 0);

      // Advance dialogue on SPACE
      if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
        this.dialogue.advance();
      }
      return;
    }

    // Movement
    body.setVelocity(0, 0);
    if (this.cursors.left.isDown) body.setVelocityX(-speed);
    else if (this.cursors.right.isDown) body.setVelocityX(speed);
    if (this.cursors.up.isDown) body.setVelocityY(-speed);
    else if (this.cursors.down.isDown) body.setVelocityY(speed);

    // Update player token position (container follows physics body)
    if (this.playerContainer) {
      this.playerContainer.setPosition(this.player.x, this.player.y);
    }

    // Check NPC proximity
    let nearNPC = null;
    this.npcs.forEach(npc => {
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, npc.x, npc.y);
      if (dist < 60) nearNPC = npc;
    });

    // Check door proximity
    const doorDist = Phaser.Math.Distance.Between(
      this.player.x, this.player.y, this.door.x, this.door.y
    );
    const nearDoor = doorDist < 60;

    // Show interaction prompt
    if (nearNPC) {
      this.interactPrompt.setPosition(nearNPC.x, nearNPC.y - 50).setVisible(true);
    } else if (nearDoor) {
      const lang = this.registry.get('language') || 'en';
      this.interactPrompt.setText(TRANSLATIONS[lang].enterWorld1);
      this.interactPrompt.setPosition(this.door.x - 60, this.door.y - 55).setVisible(true);
    } else {
      this.interactPrompt.setVisible(false);
    }

    // SPACE to interact
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      if (nearNPC) {
        this.dialogue.start(nearNPC.name, nearNPC.lines);
      } else if (nearDoor) {
        this.metricsSystem.save();
        this.scene.start('World1Scene');
      }
    }
  }
}

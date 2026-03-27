// ============================================================
// UI.js — HUD overlay showing player metrics
// ============================================================

class UI {
  constructor(scene, metricsSystem) {
    this.scene = scene;
    this.metricsSystem = metricsSystem;
    this.elements = [];
    this.visible = true;
  }

  // Create the HUD bar at top of screen
  create() {
    const lang = this.scene.registry.get('language') || 'en';
    const t = TRANSLATIONS[lang];
    const w = this.scene.cameras.main.width;

    // Semi-transparent background bar
    this.bg = this.scene.add.rectangle(w / 2, 24, w, 48, 0x000000, 0.7)
      .setScrollFactor(0).setDepth(900);
    this.elements.push(this.bg);

    // Metric labels and values
    const labels = [
      { key: 'clarity', label: t.clarity },
      { key: 'timeSaved', label: t.timeSaved },
      { key: 'decisionQuality', label: t.decisionQuality },
      { key: 'humanAI', label: t.humanAI },
      { key: 'frontierLevel', label: t.frontierLevel }
    ];

    this.metricTexts = {};
    const spacing = w / (labels.length + 1);

    labels.forEach((item, i) => {
      const x = spacing * (i + 1);
      const txt = this.scene.add.text(x, 24, '', {
        fontFamily: 'monospace',
        fontSize: '13px',
        fill: '#00ff88',
        align: 'center'
      }).setOrigin(0.5).setScrollFactor(0).setDepth(901);

      this.metricTexts[item.key] = { text: txt, label: item.label };
      this.elements.push(txt);
    });

    this.update();
  }

  // Refresh displayed values with pulse animation
  update() {
    if (!this.metricTexts) return;
    const m = this.metricsSystem.metrics;
    const fl = this.metricsSystem.frontierLevel;

    const prevValues = this.prevMetrics || {};

    this.updateMetric('clarity', m.clarity, prevValues.clarity);
    this.updateMetric('timeSaved', m.timeSaved, prevValues.timeSaved);
    this.updateMetric('decisionQuality', m.decisionQuality, prevValues.decisionQuality);
    this.updateMetric('humanAI', m.humanAI, prevValues.humanAI);
    this.metricTexts.frontierLevel.text.setText(`${this.metricTexts.frontierLevel.label}: ${'⭐'.repeat(fl)}`);

    this.prevMetrics = { clarity: m.clarity, timeSaved: m.timeSaved, decisionQuality: m.decisionQuality, humanAI: m.humanAI };
  }

  updateMetric(key, val, prevVal) {
    const entry = this.metricTexts[key];
    if (!entry) return;
    entry.text.setText(`${entry.label}: ${val}`);

    // Color based on value
    if (val >= 70) entry.text.setFill('#00ff88');
    else if (val >= 40) entry.text.setFill('#ffaa44');
    else entry.text.setFill('#ff4444');

    // Pulse if changed
    if (prevVal !== undefined && prevVal !== val) {
      this.scene.tweens.add({
        targets: entry.text,
        scaleX: 1.2, scaleY: 1.2,
        duration: 120, yoyo: true, ease: 'Power2'
      });
    }
  }

  // Show/hide the HUD
  setVisible(val) {
    this.visible = val;
    this.elements.forEach(e => e.setVisible(val));
  }

  destroy() {
    this.elements.forEach(e => e.destroy());
    this.elements = [];
    this.metricTexts = null;
  }
}

// ============================================================
// MetricsSystem.js — Tracks and manages player metrics
// ============================================================

class MetricsSystem {
  constructor(scene) {
    this.scene = scene;

    // Core metrics (0-100 scale)
    this.metrics = {
      clarity: 50,
      timeSaved: 50,
      decisionQuality: 50,
      humanAI: 50
    };

    // Frontier Level is computed from the average
    this.frontierLevel = 1;
    this.updateFrontierLevel();
  }

  // Apply effects from a decision: { clarity: +10, timeSaved: -5, ... }
  // Smart scoring: penalizes over-delegation and blind AI trust
  applyEffects(effects) {
    if (effects.clarity) this.metrics.clarity = Phaser.Math.Clamp(this.metrics.clarity + effects.clarity, 0, 100);
    if (effects.timeSaved) this.metrics.timeSaved = Phaser.Math.Clamp(this.metrics.timeSaved + effects.timeSaved, 0, 100);
    if (effects.decision) this.metrics.decisionQuality = Phaser.Math.Clamp(this.metrics.decisionQuality + effects.decision, 0, 100);
    if (effects.humanAI) this.metrics.humanAI = Phaser.Math.Clamp(this.metrics.humanAI + effects.humanAI, 0, 100);

    // Balance check: if timeSaved is much higher than decisionQuality,
    // it means player is over-delegating — nudge decision quality down
    if (this.metrics.timeSaved - this.metrics.decisionQuality > 25) {
      this.metrics.decisionQuality = Math.max(0, this.metrics.decisionQuality - 2);
    }
    // If humanAI is very low but timeSaved is high, player is avoiding AI
    if (this.metrics.timeSaved > 70 && this.metrics.humanAI < 30) {
      this.metrics.humanAI = Math.min(100, this.metrics.humanAI + 1);
    }

    this.updateFrontierLevel();
  }

  // Frontier Level = 1-5 based on average of all metrics
  updateFrontierLevel() {
    const avg = (this.metrics.clarity + this.metrics.timeSaved + this.metrics.decisionQuality + this.metrics.humanAI) / 4;
    if (avg >= 90) this.frontierLevel = 5;
    else if (avg >= 75) this.frontierLevel = 4;
    else if (avg >= 55) this.frontierLevel = 3;
    else if (avg >= 35) this.frontierLevel = 2;
    else this.frontierLevel = 1;
  }

  // Save metrics to registry so they persist across scenes
  save() {
    this.scene.registry.set('metrics', { ...this.metrics });
    this.scene.registry.set('frontierLevel', this.frontierLevel);
  }

  // Load metrics from registry
  load() {
    const saved = this.scene.registry.get('metrics');
    if (saved) {
      this.metrics = { ...saved };
      this.frontierLevel = this.scene.registry.get('frontierLevel') || 1;
    }
  }
}

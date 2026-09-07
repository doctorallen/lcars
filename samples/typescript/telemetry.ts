type SignalLevel = 'nominal' | 'warning' | 'critical';

interface TelemetryReading<TValue = number> {
  readonly source: string;
  readonly timestamp: Date;
  readonly value: TValue;
  readonly level: SignalLevel;
}

enum RelayState {
  Offline = 'offline',
  Calibrating = 'calibrating',
  Ready = 'ready',
}

function audited(target: object, context: ClassMethodDecoratorContext): void {
  context.addInitializer(function () {
    console.info(`Initialized ${target.constructor.name}`);
  });
}

class RelayMonitor {
  #state = RelayState.Offline;
  readonly #history: TelemetryReading[] = [];

  constructor(private readonly relayId: string) {}

  @audited
  async calibrate(samples: readonly number[]): Promise<TelemetryReading<number>> {
    if (samples.length === 0) {
      throw new Error(`Relay ${this.relayId} requires at least one sample.`);
    }

    this.#state = RelayState.Calibrating;
    await new Promise((resolve) => setTimeout(resolve, 25));

    const value = samples.reduce((total, sample) => total + sample, 0) / samples.length;
    const reading: TelemetryReading = {
      source: this.relayId,
      timestamp: new Date(),
      value,
      level: value > 0.9 ? 'critical' : value > 0.7 ? 'warning' : 'nominal',
    };

    this.#history.push(reading);
    this.#state = RelayState.Ready;
    return reading;
  }

  get summary(): string {
    return `${this.relayId}: ${this.#state} (${this.#history.length} readings)`;
  }
}

const monitor = new RelayMonitor('neon-relay');
monitor.calibrate([0.42, 0.68, 0.94]).then((reading) => console.log(reading));

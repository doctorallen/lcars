export type RelayChannel = 'alpha' | 'beta' | 'gamma';
export type SignalLevel = 'nominal' | 'warning' | 'critical';
export type SignalTrend = 'rising' | 'falling' | 'steady';

export interface TelemetryReading {
  readonly id: string;
  readonly label: string;
  readonly source: string;
  readonly timestamp: Date;
  readonly value: number;
  readonly level: SignalLevel;
  readonly trend: SignalTrend;
}

export interface RelaySnapshot {
  readonly channel: RelayChannel;
  readonly cycle: number;
  readonly updatedAt: Date;
  readonly readings: readonly TelemetryReading[];
}

export const EMPTY_RELAY_SNAPSHOT: RelaySnapshot = {
  channel: 'beta',
  cycle: 0,
  updatedAt: new Date(0),
  readings: [],
};

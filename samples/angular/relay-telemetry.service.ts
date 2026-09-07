import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  interval,
  map,
  merge,
  Observable,
  scan,
  shareReplay,
  startWith,
  Subject,
} from 'rxjs';
import type {
  RelayChannel,
  RelaySnapshot,
  TelemetryReading,
} from './relay-telemetry.models';

interface ReadingDefinition {
  readonly id: string;
  readonly label: string;
  readonly source: string;
  readonly baseline: number;
  readonly drift: number;
}

@Injectable({ providedIn: 'root' })
export class RelayTelemetryService {
  private readonly channelSubject = new BehaviorSubject<RelayChannel>('beta');
  private readonly refreshSubject = new Subject<void>();
  private readonly acknowledgementSubject = new Subject<TelemetryReading>();
  private cycle = 0;

  readonly channel$: Observable<RelayChannel> = this.channelSubject.pipe(
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  private readonly refreshTick$ = merge(
    interval(5000),
    this.refreshSubject,
  ).pipe(startWith(0));

  readonly snapshots$: Observable<RelaySnapshot> = combineLatest([
    this.channel$,
    this.refreshTick$,
  ]).pipe(
    map(([channel]) => this.createSnapshot(channel)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly acknowledgementCount$: Observable<number> =
    this.acknowledgementSubject.pipe(
      scan((count) => count + 1, 0),
      startWith(0),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

  readonly lastAcknowledged$: Observable<TelemetryReading | null> =
    this.acknowledgementSubject.pipe(
      startWith(null),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

  selectChannel(channel: RelayChannel): void {
    this.channelSubject.next(channel);
  }

  refresh(): void {
    this.refreshSubject.next();
  }

  acknowledge(reading: TelemetryReading): void {
    this.acknowledgementSubject.next(reading);
  }

  private createSnapshot(channel: RelayChannel): RelaySnapshot {
    const cycle = this.cycle++;
    const updatedAt = new Date();
    const channelOffset: Record<RelayChannel, number> = {
      alpha: -0.04,
      beta: 0,
      gamma: 0.05,
    };
    const definitions: readonly ReadingDefinition[] = [
      {
        id: 'signal-strength',
        label: 'Signal strength',
        source: 'subspace-array',
        baseline: 0.82,
        drift: 0.06,
      },
      {
        id: 'phase-variance',
        label: 'Phase variance',
        source: 'relay-core',
        baseline: 0.68,
        drift: 0.1,
      },
      {
        id: 'thermal-load',
        label: 'Thermal load',
        source: 'coolant-loop',
        baseline: 0.86,
        drift: 0.08,
      },
    ];

    return {
      channel,
      cycle,
      updatedAt,
      readings: definitions.map((definition, index) => {
        const value = this.clamp(
          definition.baseline +
            channelOffset[channel] +
            Math.sin(cycle / 2 + index) * definition.drift,
        );

        return {
          id: definition.id,
          label: definition.label,
          source: definition.source,
          timestamp: updatedAt,
          value,
          level: this.getLevel(value),
          trend: this.getTrend(value, definition.baseline),
        };
      }),
    };
  }

  private clamp(value: number): number {
    return Math.min(0.99, Math.max(0.05, value));
  }

  private getLevel(value: number): TelemetryReading['level'] {
    if (value >= 0.9) {
      return 'critical';
    }

    if (value >= 0.7) {
      return 'warning';
    }

    return 'nominal';
  }

  private getTrend(
    value: number,
    baseline: number,
  ): TelemetryReading['trend'] {
    if (value > baseline + 0.02) {
      return 'rising';
    }

    if (value < baseline - 0.02) {
      return 'falling';
    }

    return 'steady';
  }
}

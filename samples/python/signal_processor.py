from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from functools import wraps
from typing import Callable, Iterable, Iterator, TypeVar

T = TypeVar("T")


@dataclass(frozen=True, slots=True)
class Signal:
    source: str
    strength: float
    received_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))

    @property
    def is_critical(self) -> bool:
        return self.strength >= 0.9


def traced(function: Callable[..., T]) -> Callable[..., T]:
    @wraps(function)
    def wrapper(*args: object, **kwargs: object) -> T:
        print(f"calling {function.__name__}")
        return function(*args, **kwargs)

    return wrapper


@traced
def normalize(signals: Iterable[Signal]) -> Iterator[Signal]:
    for signal in signals:
        if not 0 <= signal.strength <= 1:
            raise ValueError(f"Signal {signal.source!r} has invalid strength.")
        yield Signal(signal.source, round(signal.strength, 2), signal.received_at)


if __name__ == "__main__":
    readings = [Signal("neon-relay", 0.86), Signal("lumen-transit", 0.93)]
    for reading in normalize(readings):
        print(f"{reading.source}: {'CRITICAL' if reading.is_critical else 'nominal'}")

use std::collections::HashMap;

#[derive(Debug, Clone, PartialEq)]
struct Signal {
    source: String,
    strength: f32,
}

#[derive(Debug, PartialEq)]
enum RelayError {
    InvalidStrength(f32),
    MissingSource,
}

trait Classify {
    fn level(&self) -> &'static str;
}

impl Classify for Signal {
    fn level(&self) -> &'static str {
        match self.strength {
            strength if strength >= 0.9 => "critical",
            strength if strength >= 0.7 => "warning",
            _ => "nominal",
        }
    }
}

fn summarize(signals: &[Signal]) -> Result<HashMap<&str, usize>, RelayError> {
    let mut counts = HashMap::new();

    for signal in signals {
        if signal.source.trim().is_empty() {
            return Err(RelayError::MissingSource);
        }
        if !(0.0..=1.0).contains(&signal.strength) {
            return Err(RelayError::InvalidStrength(signal.strength));
        }
        *counts.entry(signal.level()).or_insert(0) += 1;
    }

    Ok(counts)
}

fn main() {
    let signals = vec![
        Signal { source: "neon-relay".into(), strength: 0.82 },
        Signal { source: "lumen-transit".into(), strength: 0.95 },
    ];

    match summarize(&signals) {
        Ok(summary) => println!("Relay summary: {summary:?}"),
        Err(error) => eprintln!("Unable to summarize relays: {error:?}"),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn marks_strong_signals_as_critical() {
        assert_eq!(Signal { source: "test".into(), strength: 0.9 }.level(), "critical");
    }
}

package main

import (
	"errors"
	"fmt"
	"sync"
)

type Signal struct {
	Source   string
	Strength float64
}

type Classifier interface {
	Level() string
}

func (signal Signal) Level() string {
	switch {
	case signal.Strength >= 0.9:
		return "critical"
	case signal.Strength >= 0.7:
		return "warning"
	default:
		return "nominal"
	}
}

func summarize(signals []Signal) (map[string]int, error) {
	counts := make(map[string]int)

	for _, signal := range signals {
		if signal.Source == "" || signal.Strength < 0 || signal.Strength > 1 {
			return nil, errors.New("invalid relay signal")
		}
		counts[signal.Level()]++
	}

	return counts, nil
}

func main() {
	signals := []Signal{
		{Source: "neon-relay", Strength: 0.82},
		{Source: "lumen-transit", Strength: 0.95},
	}

	var group sync.WaitGroup
	group.Add(1)
	go func() {
		defer group.Done()
		counts, err := summarize(signals)
		if err != nil {
			fmt.Printf("relay failure: %v\n", err)
			return
		}
		fmt.Printf("relay counts: %#v\n", counts)
	}()
	group.Wait()
}

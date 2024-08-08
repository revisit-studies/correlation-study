import { Group } from '@mantine/core';
import { useMemo } from 'react';
import ScatterPlots from './ScatterPlots';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ScatterWrapper({ r1, r2, onClick }: {r1: number; r2: number, onClick: (n: number) => void}) {
  const higherFirst = useMemo(() => Math.random() > 0.5, [r1, r2]);

  return higherFirst ? (
    <Group>
      <ScatterPlots onClick={() => onClick(1)} r={r1} />
      <ScatterPlots onClick={() => onClick(2)} r={r2} />
    </Group>
  ) : (
    <Group>
      <ScatterPlots onClick={() => onClick(2)} r={r2} />
      <ScatterPlots onClick={() => onClick(1)} r={r1} />
    </Group>
  );
}

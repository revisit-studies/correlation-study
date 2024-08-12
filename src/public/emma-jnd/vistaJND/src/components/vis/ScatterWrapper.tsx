import { Group, Text } from '@mantine/core';
import { useMemo } from 'react';
import ScatterPlots from './ScatterPlots';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ScatterWrapper({ r1, r2, onClick }: {r1: number; r2: number, onClick: (n: number) => void}) {
  const higherFirst = useMemo(() => Math.random() > 0.5, []);

  return higherFirst ? (
    <Group>
      <ScatterPlots onClick={() => onClick(1)} r={r1} />
      {/* <Text>{r1}</Text> */}
      <ScatterPlots onClick={() => onClick(2)} r={r2} />
      {/* <Text>{r2}</Text> */}
    </Group>
  ) : (
    <Group>
      <ScatterPlots onClick={() => onClick(2)} r={r2} />
      {/* <Text>{r2}</Text> */}
      <ScatterPlots onClick={() => onClick(1)} r={r1} />
      {/* <Text>{r1}</Text> */}

    </Group>
  );
}

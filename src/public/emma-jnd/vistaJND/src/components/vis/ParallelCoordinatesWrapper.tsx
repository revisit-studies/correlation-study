import { Group } from '@mantine/core';
import { useMemo } from 'react';
import ParallelCoordinates from './ParallelCoordinates';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function WindflowWrapper({ r1, r2, onClick }: {r1: number; r2: number, onClick: (n: number) => void}) {
  const higherFirst = useMemo(() => Math.random() > 0.5, [r1, r2]);

  return higherFirst ? (
    <Group>
      <ParallelCoordinates onClick={() => onClick(1)} v={0.8} />
      <ParallelCoordinates onClick={() => onClick(2)} v={0.2} />
    </Group>
  ) : (
    <Group>
      <ParallelCoordinates onClick={() => onClick(2)} v={0.2} />
      <ParallelCoordinates onClick={() => onClick(1)} v={0.8} />
    </Group>
  );
}

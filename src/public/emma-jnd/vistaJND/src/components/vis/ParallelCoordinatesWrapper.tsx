import { Group, Text } from '@mantine/core';
import { useMemo, useState } from 'react';
import ParallelCoordinates from './ParallelCoordinates';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function WindflowWrapper({ r1, r2, onClick }: {r1: number; r2: number, onClick: (n: number) => void}) {
  const higherFirst = useMemo(() => Math.random() > 0.5, [r1, r2]);

  const [key, setKey] = useState<number>(0);

  const handleReset = () => {
    setKey((prevKey) => prevKey + 1); // Increment key to trigger re-render
  };

  const handleClick = (n: number) => {
    onClick(n);
    handleReset();
  };

  return higherFirst ? (
    <Group>
      <ParallelCoordinates key={key} onClick={() => handleClick(1)} v={r1} />
      <Text>{r1}</Text>
      <ParallelCoordinates key={key + 1} onClick={() => handleClick(2)} v={r2} />
      <Text>{r2}</Text>
    </Group>
  ) : (
    <Group>
      <ParallelCoordinates key={key} onClick={() => handleClick(2)} v={r2} />
      <Text>{r2}</Text>
      <ParallelCoordinates key={key + 1} onClick={() => handleClick(1)} v={r1} />
      <Text>{r1}</Text>
    </Group>
  );
}

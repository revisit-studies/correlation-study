import { Group, Text } from '@mantine/core';
import { useMemo, useState } from 'react';
import ScatterPlots from './ScatterPlots';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ScatterWrapper({ r1, r2, onClick }: {r1: number; r2: number, onClick: (n: number) => void}) {
  const higherFirst = useMemo(() => Math.random() > 0.5, [r1, r2]);

  const [key, setKey] = useState<number>(0);

  const handleReset = () => {
    // Increment key to trigger re-render
    setKey((prevKey) => prevKey + 1);
  };

  const handleClick = (n: number) => {
    onClick(n);
    handleReset();
  };

  return higherFirst ? (
    <Group>
      <ScatterPlots key={key} onClick={() => handleClick(1)} r={r1} />
      <Text>{r1}</Text>
      <ScatterPlots key={key + 1} onClick={() => handleClick(2)} r={r2} />
      <Text>{r2}</Text>
    </Group>
  ) : (
    <Group>
      <ScatterPlots key={key} onClick={() => handleClick(2)} r={r2} />
      <Text>{r2}</Text>
      <ScatterPlots key={key + 1} onClick={() => handleClick(1)} r={r1} />
      <Text>{r1}</Text>

    </Group>
  );
}

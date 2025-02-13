/**
 * Authors: The ReVISit team
 * Description:
 *    This file is the wrapper component for the Scatter plots
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Group, Stack, Text } from '@mantine/core';
import { useMemo, useState } from 'react';
import HeatmapPlots from './HeatmapPlots';

/**
 * Holds 2 Scatter Plots
 * @param param0 - r1 is the correlation value for 1, r2 is the correlation value for 2,
 * onClick is a function that determines the functionality when a graph is clicked.
 * @returns 2 Scatter Plots
 */
export default function HeatmapWrapper({
  r1, r2, shouldReRender = true, onClick,
}: {r1: number; r2: number, shouldReRender?: boolean, onClick: (n: number) => void}) {
  const higherFirst = useMemo(() => Math.random() > 0.5, [r1, r2]);

  const [key, setKey] = useState<number>(0);

  const handleReset = () => {
    // Increment key to trigger re-render
    if (shouldReRender) {
      setKey((prevKey) => prevKey + 1);
    }
  };

  const handleClick = (n: number) => {
    onClick(n);
    handleReset();
  };

  return higherFirst ? (
    <Group style={{ gap: '100px' }}>
      <Stack style={{ alignItems: 'center' }}>
        <HeatmapPlots key={key} onClick={() => handleClick(1)} r={r1} />
        <Text>Left</Text>
      </Stack>
      <Stack style={{ alignItems: 'center' }}>
        <HeatmapPlots key={key + 1} onClick={() => handleClick(2)} r={r2} />
        <Text>Right</Text>
      </Stack>
    </Group>
  ) : (
    <Group style={{ gap: '100px' }}>
      <Stack style={{ alignItems: 'center' }}>
        <HeatmapPlots key={key} onClick={() => handleClick(2)} r={r2} />
        <Text>Left</Text>
      </Stack>
      <Stack style={{ alignItems: 'center' }}>
        <HeatmapPlots key={key + 1} onClick={() => handleClick(1)} r={r1} />
        <Text>Right</Text>
      </Stack>
    </Group>
  );
}

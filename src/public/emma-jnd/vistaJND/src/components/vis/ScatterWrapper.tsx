import { Text } from '@mantine/core';
import { StimulusParams } from '../../../../../../store/types';
import ScatterPlots from './ScatterPlots';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ScatterWrapper({ r1, r2 }: {r1: number; r2: number}) {
  return (
    <>
      <ScatterPlots r={r1} />
      <ScatterPlots r={r2} />
      <Text>Hello world</Text>
    </>

  );
}

export default ScatterWrapper;

import { Text } from '@mantine/core';
import { StimulusParams } from '../../../../../../store/types';
import ScatterPlots from './ScatterPlots';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ClickAccuracyTest({ parameters }: StimulusParams<{r1: number, r2: number}>) {
  console.log(parameters);
  return (
    <>
      <ScatterPlots r={parameters.r1} />
      <ScatterPlots r={parameters.r2} />
      <Text>Hello world</Text>
    </>

  );
}

export default ClickAccuracyTest;

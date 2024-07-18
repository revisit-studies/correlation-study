import { StimulusParams } from '../../../../../../store/types';
import ScatterWrapper from './ScatterWrapper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ClickAccuracyTest() {
  const arr1 = [0.3, 0.4, 0.5];
  const arr2 = [0.6, 0.7, 0.8];
  const r1 = arr1[Math.floor(Math.random() * arr1.length)];
  const r2 = arr2[Math.floor(Math.random() * arr2.length)];
  return (
    <ScatterWrapper r1={r1} r2={r2} />
  );
}

export default ClickAccuracyTest;

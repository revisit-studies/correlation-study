import { useCallback, useEffect, useState } from 'react';
import { Center, Stack } from '@mantine/core';
import { StimulusParams } from '../../../../../../store/types';
import ScatterWrapper from './ScatterWrapper';
import { RadioOptions } from './RadioOptions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const startingArr2 = [0.3, 0.4, 0.5];
const startingArr1 = [0.6, 0.7, 0.8];

function JND({ setAnswer } : StimulusParams<Record<string, never>>) {
  const [r1, setR1] = useState(startingArr1[Math.floor(Math.random() * startingArr1.length)]);
  const [r2, setR2] = useState(startingArr2[Math.floor(Math.random() * startingArr2.length)]);

  const [participantSelections, setParticipantSelections] = useState<{r1: number, r2: number, correct: boolean}[]>([]);

  const onClick = useCallback((n: number) => {
    setParticipantSelections([...participantSelections, { r1, r2, correct: n === 1 }]);

    const flip = Math.random() > 0.5;
    // is correct
    if (n === 1) {
      if (flip) {
        setR2(Math.min(r2 + 0.01, 1));
      } else {
        setR1(Math.min(r1 - 0.01, 1));
      }
    } else if (flip) {
      setR2(Math.max(r2 - 0.03, 0));
    } else {
      setR1(Math.max(r1 + 0.03, 0));
    }
  }, [participantSelections, r1, r2]);

  useEffect(() => {
    setAnswer({
      status: true,
      provenanceGraph: undefined,
      answers: { scatterSelections: participantSelections },
    });
  }, [participantSelections]);

  return (
    <Stack style={{ width: '100%', height: '100%' }}>
      {/* <RadioOptions /> */}
      <Center>
        <ScatterWrapper onClick={onClick} r1={r1} r2={r2} />
      </Center>
    </Stack>
  );
}

export default JND;

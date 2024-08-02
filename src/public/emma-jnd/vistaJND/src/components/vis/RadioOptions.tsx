import React, { useState } from 'react';
import { Radio } from '@mantine/core';

export function RadioOptions() {
  const [value, setValue] = useState('');
  return (
    <Radio.Group value={value} onChange={setValue} label="Select an option">
      <Radio value="Option 1" label="Option 1" />
      <Radio value="Option 2" label="Option 2" />
    </Radio.Group>
  );
}

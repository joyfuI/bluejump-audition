'use client';
import { FilterOutlined } from '@ant-design/icons';
import type { CheckboxOptionType } from 'antd';
import { Checkbox, Drawer, FloatButton } from 'antd';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { useId, useState } from 'react';

import { STREAMER_LIST } from '@/constants';

const FilterButton = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useQueryState(
    'userId',
    parseAsArrayOf(parseAsString).withDefault(
      STREAMER_LIST.map((item) => item.id),
    ),
  );
  const checkboxName = useId();

  const options: CheckboxOptionType<string>[] = STREAMER_LIST.map((item) => ({
    label: item.nick,
    value: item.id,
  }));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer onClose={handleClose} open={open} title="필터">
        <Checkbox.Group
          name={checkboxName}
          onChange={setUserId}
          options={options}
          style={{ flexDirection: 'column', gap: 8 }}
          value={userId}
        />
      </Drawer>
      <FloatButton
        icon={<FilterOutlined />}
        onClick={() => setOpen(true)}
        tooltip="필터"
      />
    </>
  );
};

export default FilterButton;

'use client';
import { Alert, Badge, Button, Flex, FloatButton, Modal } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

import type { GetHomeBroadResponse } from '@/api/getHomeBroad';
import type { GetStationInfoResponse } from '@/api/getStationInfo';

export type MultiViewButtonProps = {
  data: (readonly [GetStationInfoResponse, GetHomeBroadResponse | undefined])[];
};

const MultiViewButton = ({ data }: MultiViewButtonProps) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<string[]>([]);

  const handleClick = (userId: string) => {
    let newSelection = [...selection];
    if (selection.includes(userId)) {
      newSelection = newSelection.filter((item) => item !== userId);
    } else {
      newSelection.push(userId);
    }
    setSelection(newSelection);
  };

  const handleOk = () => {
    window.open(`https://mul.live/${selection.join('/')}`, '_blank');
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal onCancel={handleCancel} onOk={handleOk} open={open} title="멀티뷰">
        <Alert
          style={{ marginBottom: 16 }}
          title={
            <>
              Mul.Live 서비스를 이용합니다.
              <br />숲 동시시청 제한은 최대 4개입니다.
            </>
          }
          type="info"
        />
        <Flex gap="small" vertical>
          {data.map((item) => {
            const { userId, userNick } = item[0].station;

            return (
              <Button
                block
                icon={
                  <Badge
                    color="blue"
                    count={selection.findIndex((id) => id === userId) + 1}
                    title=""
                  />
                }
                key={userId}
                onClick={() => handleClick(userId)}
                size="large"
                type={selection.includes(userId) ? 'primary' : 'default'}
              >
                {userNick}
                {item[1]?.broadNo ? <Badge count="LIVE" title="" /> : null}
              </Button>
            );
          })}
        </Flex>
      </Modal>
      <FloatButton
        icon={
          <Image
            alt="Mul.Live"
            draggable={false}
            height={20}
            src="/img/mul-live.svg"
            width={20}
          />
        }
        onClick={() => setOpen(true)}
        tooltip="멀티뷰"
      />
    </>
  );
};

export default MultiViewButton;

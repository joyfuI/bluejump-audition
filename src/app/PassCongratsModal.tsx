'use client';
import { useQueries } from '@tanstack/react-query';
import { Card, Flex, Modal } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti-boom';

import getStationInfo, { REVALIDATE } from '@/api/getStationInfo';
import { PASS_LIST } from '@/constants';

const PassCongratsModal = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    // 처음부터 true면 이상하게 하이드레이션 오류가 떠서 useEffect 사용
    setOpen(true);
  }, []);

  const results = useQueries({
    queries: PASS_LIST.map((item) => ({
      queryKey: ['getStationInfo', item],
      queryFn: () => getStationInfo(item),
      staleTime: REVALIDATE * 1000,
    })),
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        centered
        footer={(_, { OkBtn }) => <OkBtn />}
        mask={false}
        maskClosable={false}
        onCancel={handleClose}
        onOk={handleClose}
        open={open}
        title="블루점프 4기 합격을 축하합니다! 🎉"
      >
        <Flex gap="large" justify="center" wrap>
          {results.map((item) => {
            const { data, isFetched } = item;

            if (!isFetched || !data) {
              return null;
            }

            return (
              <a
                href={`https://www.sooplive.co.kr/station/${data.station.userId}`}
                key={data.station.userId}
                rel="noreferrer"
                target="_blank"
              >
                <Card
                  cover={
                    <Image
                      alt={data.station.userNick}
                      draggable={false}
                      height={180}
                      loading="lazy"
                      src={data.station.profileImage}
                      style={{
                        display: 'block',
                        width: '100%',
                        height: 'auto',
                      }}
                      unoptimized
                      width={180}
                    />
                  }
                  hoverable
                  styles={{
                    root: {
                      display: 'flex',
                      width: 180,
                      flexDirection: 'column',
                    },
                  }}
                >
                  <Card.Meta
                    style={{ textAlign: 'center' }}
                    title={data.station.userNick}
                  />
                </Card>
              </a>
            );
          })}
        </Flex>
      </Modal>
      {open ? (
        <Confetti effectCount={Infinity} mode="boom" particleCount={50} />
      ) : null}
    </>
  );
};

export default PassCongratsModal;

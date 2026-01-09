import ClientLayout from '@/components/ClientLayout';

import ClientCalendar from './ClientCalendar';

const Page = () => {
  return (
    <ClientLayout selectedKey="calendar">
      <ClientCalendar />
    </ClientLayout>
  );
};

export default Page;

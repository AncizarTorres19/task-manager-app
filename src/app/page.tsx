'use client';

import { Auth } from "@/components/Auth";
import { Spinner } from "@/components/Spinner";
import useUserSession from '@/hooks/useUserSession';
import { useEffect, useState } from "react";

const Page = () => {
  const { userInSession } = useUserSession();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (userInSession) {
      window.location.href = '/home';
    }
  }, [userInSession]);

  if (!hydrated) {
    return <Spinner />;
  }

  return (
    <>
      {!userInSession && (
        <div className="flex justify-center items-center h-auto">
          <Auth />
        </div>
      )}
    </>
  );
};

export default Page;

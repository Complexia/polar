'use client';

import { createContext, useContext, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import UserContextProvider from './user-context';

//@ts-ignore

const ContextProvider = ({ children }) => {

  // hard coded - should be fetched from NFT here
  const { address } = useAccount();
  const name = "Carlos Jack";
  const display_name = "carlitos";
  const dp_uri = "https://avatars.dicebear.com/api/human/1.svg";
  

  return (
    <UserContextProvider address={address} name={name} display_name={display_name} dp_uri={dp_uri}>
      {children}
    </UserContextProvider>
  )
};

export default ContextProvider;


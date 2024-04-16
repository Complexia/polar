"use client";

import type { WalletProviderProps } from "@solana/wallet-adapter-react";
import { WalletProvider } from "@solana/wallet-adapter-react";

import { useCallback, useMemo } from "react";
import { WalletModalProvider } from "../components/WalletModalProvider";

import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletError } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { NETWORK } from "@/utils/solana/endpoints";
import { WagmiProvider } from 'wagmi'
import { config } from '@/utils/ethereum/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

export function ClientWalletProvider({
    children
}) {

    const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);
    const onError = useCallback((error: WalletError) => {
        console.error(error);
    }, []);

    const queryClient = new QueryClient()

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                <ConnectionProvider endpoint={NETWORK}>
                    <WalletProvider wallets={wallets} autoConnect={true} onError={onError}>
                        <WalletModalProvider>{children}</WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>

    );
}

export default ClientWalletProvider;

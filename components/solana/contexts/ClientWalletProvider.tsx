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

export function ClientWalletProvider({
    children
}) {

    const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);
    const onError = useCallback((error: WalletError) => {
        console.error(error);
    }, []);

    return (
        <ConnectionProvider endpoint={NETWORK}>
            <WalletProvider wallets={wallets} autoConnect={true} onError={onError}>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default ClientWalletProvider;

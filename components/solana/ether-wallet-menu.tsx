import type { WalletName } from '@solana/wallet-adapter-base';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import type { Wallet } from '@solana/wallet-adapter-react';
import { useWallet } from '@solana/wallet-adapter-react';
import type { FC, MouseEvent } from 'react';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Collapse } from './components/Collapse';
import { WalletListItem } from './components/WalletListItem';
import { WalletSVG } from './components/WalletSVG';
import { useWalletModal } from './components/useWalletModal';
import Web3 from 'web3';



// export const EtherWalletMenu = () => {
//     console.log("ether wallet");

//     const { wallets, select } = useWallet();
//     const { setVisible } = useWalletModal();
//     const [expanded, setExpanded] = useState(false);
//     const [fadeIn, setFadeIn] = useState(false);

//     //test
//     console.log("this is wallet ",wallets);
//     //end.


//     const [listedWallets, collapsedWallets] = useMemo(() => {
//         const installed: Wallet[] = [];
//         const notInstalled: Wallet[] = [];

//         for (const wallet of wallets) {
//             if (wallet.readyState === WalletReadyState.Installed) {
//                 installed.push(wallet);
//             } else {
//                 notInstalled.push(wallet);
//             }
//         }

//         return installed.length ? [installed, notInstalled] : [notInstalled, []];
//     }, [wallets]);

//     const hideModal = useCallback(() => {
//         setFadeIn(false);
//         setTimeout(() => setVisible(false), 150);
//     }, [setVisible]);

//     const handleClose = useCallback(
//         (event: MouseEvent) => {
//             event.preventDefault();
//             hideModal();
//         },
//         [hideModal]
//     );

//     const handleAuthModalClose = () => {
//         const modal = (document.getElementById("auth-modal") as HTMLDialogElement);
//         if (modal && typeof modal.close === "function") {
//             modal.close();

//         }

//     }

//     const handleWalletClick = useCallback(
//         (event: MouseEvent, walletName: WalletName) => {
//             select(walletName);
//             handleAuthModalClose(); 
//         },
//         [select, handleClose]
//     );

//     const handleCollapseClick = useCallback(() => setExpanded(!expanded), [expanded]);







//     return (

//         <div>
//             <div >
//                 <div >

//                     {listedWallets.length ? (
//                         <>

//                             <ul className="wallet-adapter-modal-list">
//                                 {listedWallets.map((wallet) => (
//                                     <WalletListItem
//                                         key={wallet.adapter.name}
//                                         handleClick={(event) => handleWalletClick(event, wallet.adapter.name)}
//                                         wallet={wallet}
//                                     />
//                                 ))}
//                                 {collapsedWallets.length ? (
//                                     <Collapse expanded={expanded} id="wallet-adapter-modal-collapse">
//                                         {collapsedWallets.map((wallet) => (
//                                             <WalletListItem
//                                                 key={wallet.adapter.name}
//                                                 handleClick={(event) =>
//                                                     handleWalletClick(event, wallet.adapter.name)
//                                                 }
//                                                 tabIndex={expanded ? 0 : -1}
//                                                 wallet={wallet}
//                                             />
//                                         ))}
//                                     </Collapse>
//                                 ) : null}
//                             </ul>
//                             {collapsedWallets.length ? (
//                                 <button
//                                     className="wallet-adapter-modal-list-more"
//                                     onClick={handleCollapseClick}
//                                     tabIndex={0}
//                                 >
//                                     <span>{expanded ? 'Less ' : 'More '}options</span>
//                                     <svg
//                                         width="13"
//                                         height="7"
//                                         viewBox="0 0 13 7"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className={`${expanded ? 'wallet-adapter-modal-list-more-icon-rotate' : ''
//                                             }`}
//                                     >
//                                         <path d="M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z" />
//                                     </svg>
//                                 </button>
//                             ) : null}
//                         </>
//                     ) : (
//                         <>
//                             <h1 className="wallet-adapter-modal-title">
//                                 You'll need a wallet on Solana to continue
//                             </h1>
//                             <div className="wallet-adapter-modal-middle">
//                                 <WalletSVG />
//                             </div>
//                             {collapsedWallets.length ? (
//                                 <>
//                                     <button
//                                         className="wallet-adapter-modal-list-more"
//                                         onClick={handleCollapseClick}
//                                         tabIndex={0}
//                                     >
//                                         <span>{expanded ? 'Hide ' : 'Already have a wallet? View '}options</span>
//                                         <svg
//                                             width="13"
//                                             height="7"
//                                             viewBox="0 0 13 7"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             className={`${expanded ? 'wallet-adapter-modal-list-more-icon-rotate' : ''
//                                                 }`}
//                                         >
//                                             <path d="M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z" />
//                                         </svg>
//                                     </button>
//                                     <Collapse expanded={expanded} id="wallet-adapter-modal-collapse">
//                                         <ul className="wallet-adapter-modal-list">
//                                             {collapsedWallets.map((wallet) => (
//                                                 <WalletListItem
//                                                     key={wallet.adapter.name}
//                                                     handleClick={(event) =>
//                                                         handleWalletClick(event, wallet.adapter.name)
//                                                     }
//                                                     tabIndex={expanded ? 0 : -1}
//                                                     wallet={wallet}
//                                                 />
//                                             ))}
//                                         </ul>
//                                     </Collapse>
//                                 </>
//                             ) : null}
//                         </>
//                     )}
//                 </div>
//             </div>

//         </div>


//     );
// };

function EtherWalletMenu() {
    // Define listedWallets within the component function
    const listedWallets = [
        { adapter: { name: "MetaMask", iconUrl: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxLjA3ZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI0MCI+PHBhdGggZmlsbD0iI2UxNzcyNiIgZD0iTTI1MC4wNjYgMEwxNDAuMjE5IDgxLjI3OWwyMC40MjctNDcuOXoiLz48cGF0aCBmaWxsPSIjZTI3NjI1IiBkPSJtNi4xOTEuMDk2bDg5LjE4MSAzMy4yODlsMTkuMzk2IDQ4LjUyOHpNMjA1Ljg2IDE3Mi44NThsNDguNTUxLjkyNGwtMTYuOTY4IDU3LjY0MmwtNTkuMjQzLTE2LjMxMXptLTE1NS43MjEgMGwyNy41NTcgNDIuMjU1bC01OS4xNDMgMTYuMzEybC0xNi44NjUtNTcuNjQzeiIvPjxwYXRoIGZpbGw9IiNlMjc2MjUiIGQ9Im0xMTIuMTMxIDY5LjU1MmwxLjk4NCA2NC4wODNsLTU5LjM3MS0yLjcwMWwxNi44ODgtMjUuNDc4bC4yMTQtLjI0NXptMzEuMTIzLS43MTVsNDAuOSAzNi4zNzZsLjIxMi4yNDRsMTYuODg4IDI1LjQ3OGwtNTkuMzU4IDIuN3pNNzkuNDM1IDE3My4wNDRsMzIuNDE4IDI1LjI1OWwtMzcuNjU4IDE4LjE4MXptOTcuMTM2LS4wMDRsNS4xMzEgNDMuNDQ1bC0zNy41NTMtMTguMTg0eiIvPjxwYXRoIGZpbGw9IiNkNWJmYjIiIGQ9Im0xNDQuOTc4IDE5NS45MjJsMzguMTA3IDE4LjQ1MmwtMzUuNDQ3IDE2Ljg0NmwuMzY4LTExLjEzNHptLTMzLjk2Ny4wMDhsLTIuOTA5IDIzLjk3NGwuMjM5IDExLjMwM2wtMzUuNTMtMTYuODMzeiIvPjxwYXRoIGZpbGw9IiMyMzM0NDciIGQ9Im0xMDAuMDA3IDE0MS45OTlsOS45NTggMjAuOTI4bC0zMy45MDMtOS45MzJ6bTU1Ljk4NS4wMDJsMjQuMDU4IDEwLjk5NGwtMzQuMDE0IDkuOTI5eiIvPjxwYXRoIGZpbGw9IiNjYzYyMjgiIGQ9Im04Mi4wMjYgMTcyLjgzbC01LjQ4IDQ1LjA0bC0yOS4zNzMtNDQuMDU1em05MS45NS4wMDFsMzQuODU0Ljk4NGwtMjkuNDgzIDQ0LjA1N3ptMjguMTM2LTQ0LjQ0NGwtMjUuMzY1IDI1Ljg1MWwtMTkuNTU3LTguOTM3bC05LjM2MyAxOS42ODRsLTYuMTM4LTMzLjg0OXptLTE0OC4yMzcgMGw2MC40MzUgMi43NDlsLTYuMTM5IDMzLjg0OWwtOS4zNjUtMTkuNjgxbC0xOS40NTMgOC45MzV6Ii8+PHBhdGggZmlsbD0iI2UyNzUyNSIgZD0ibTUyLjE2NiAxMjMuMDgybDI4LjY5OCAyOS4xMjFsLjk5NCAyOC43NDl6bTE1MS42OTctLjA1MmwtMjkuNzQ2IDU3Ljk3M2wxLjEyLTI4Ljh6bS05MC45NTYgMS44MjZsMS4xNTUgNy4yN2wyLjg1NCAxOC4xMTFsLTEuODM1IDU1LjYyNWwtOC42NzUtNDQuNjg1bC0uMDAzLS40NjJ6bTMwLjE3MS0uMTAxbDYuNTIxIDM1Ljk2bC0uMDAzLjQ2MmwtOC42OTcgNDQuNzk3bC0uMzQ0LTExLjIwNWwtMS4zNTctNDQuODYyeiIvPjxwYXRoIGZpbGw9IiNmNTg0MWYiIGQ9Im0xNzcuNzg4IDE1MS4wNDZsLS45NzEgMjQuOTc4bC0zMC4yNzQgMjMuNTg3bC02LjEyLTQuMzI0bDYuODYtMzUuMzM1em0tOTkuNDcxIDBsMzAuMzk5IDguOTA2bDYuODYgMzUuMzM1bC02LjEyIDQuMzI0bC0zMC4yNzUtMjMuNTg5eiIvPjxwYXRoIGZpbGw9IiNjMGFjOWQiIGQ9Im02Ny4wMTggMjA4Ljg1OGwzOC43MzIgMTguMzUybC0uMTY0LTcuODM3bDMuMjQxLTIuODQ1aDM4LjMzNGwzLjM1OCAyLjgzNWwtLjI0OCA3LjgzMWwzOC40ODctMTguMjlsLTE4LjcyOCAxNS40NzZsLTIyLjY0NSAxNS41NTNoLTM4Ljg2OWwtMjIuNjMtMTUuNjE3eiIvPjxwYXRoIGZpbGw9IiMxNjE2MTYiIGQ9Im0xNDIuMjA0IDE5My40NzlsNS40NzYgMy44NjlsMy4yMDkgMjUuNjA0bC00LjY0NC0zLjkyMWgtMzYuNDc2bC00LjU1NiA0bDMuMTA0LTI1LjY4MWw1LjQ3OC0zLjg3MXoiLz48cGF0aCBmaWxsPSIjNzYzZTFhIiBkPSJNMjQyLjgxNCAyLjI1TDI1NiA0MS44MDdsLTguMjM1IDM5Ljk5N2w1Ljg2NCA0LjUyM2wtNy45MzUgNi4wNTRsNS45NjQgNC42MDZsLTcuODk3IDcuMTkxbDQuODQ4IDMuNTExbC0xMi44NjYgMTUuMDI2bC01Mi43Ny0xNS4zNjVsLS40NTctLjI0NWwtMzguMDI3LTMyLjA3OHptLTIyOS42MjggMGw5OC4zMjYgNzIuNzc3bC0zOC4wMjggMzIuMDc4bC0uNDU3LjI0NWwtNTIuNzcgMTUuMzY1bC0xMi44NjYtMTUuMDI2bDQuODQ0LTMuNTA4bC03Ljg5Mi03LjE5NGw1Ljk1Mi00LjYwMWwtOC4wNTQtNi4wNzFsNi4wODUtNC41MjZMMCA0MS44MDl6Ii8+PHBhdGggZmlsbD0iI2Y1ODQxZiIgZD0ibTE4MC4zOTIgMTAzLjk5bDU1LjkxMyAxNi4yNzlsMTguMTY1IDU1Ljk4NmgtNDcuOTI0bC0zMy4wMi40MTZsMjQuMDE0LTQ2LjgwOHptLTEwNC43ODQgMGwtMTcuMTUxIDI1Ljg3M2wyNC4wMTcgNDYuODA4bC0zMy4wMDUtLjQxNkgxLjYzMWwxOC4wNjMtNTUuOTg1em04Ny43NzYtNzAuODc4bC0xNS42MzkgNDIuMjM5bC0zLjMxOSA1Ny4wNmwtMS4yNyAxNy44ODVsLS4xMDEgNDUuNjg4aC0zMC4xMTFsLS4wOTgtNDUuNjAybC0xLjI3NC0xNy45ODZsLTMuMzItNTcuMDQ1bC0xNS42MzctNDIuMjM5eiIvPjwvc3ZnPg==" } },
        { adapter: { name: "WalletConnect", iconUrl: "https://logosarchive.com/wp-content/uploads/2022/02/WalletConnect-icon.svg" } },
        { adapter: { name: "TrustWallet", iconUrl: "https://asset.brandfetch.io/idkuLYsjp8/id43rJfEXP.jpeg"}}
    ];

    const handleWalletClick = (walletName) => {
        // Handle the wallet click event here
        console.log(`Clicked on ${walletName}`);
    };

    return (
        <div className="space-y-4">
            {listedWallets.map((wallet, index) => (
                <a
                    key={index}
                    href="#"
                    className="flex items-center p-4 border rounded-md cursor-pointer transition-colors duration-200 hover:bg-purple-900 hover:bg-opacity-20"
                    onClick={() => handleWalletClick(wallet.adapter.name)}
                >
                    {/* Use the img tag for the wallet icon */}
                    <img
                        src={wallet.adapter.iconUrl}
                        alt={wallet.adapter.name}
                        className="w-6 h-6 mr-2"
                    />
                    <span className="font-medium">{wallet.adapter.name}</span>
                </a>
            ))}
        </div>
    );
}

export default EtherWalletMenu;

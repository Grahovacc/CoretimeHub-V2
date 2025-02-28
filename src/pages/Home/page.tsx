import NetworkSelector from "@/components/NetworkSelector";
import styles from "./home.module.scss";
import { networkStarted } from "@/api/connection";
import { useEffect } from "react";
import { Network } from "@/types";
import { useRouter } from "next/router";
import { getExtensions } from "@/wallet";
import WalletSelector from "@/components/WalletSelector";
import AccountSelector from "@/components/AccountSelector";

export default function Home() {
  const router = useRouter();
  const { network } = router.query;

  useEffect(() => {
    let _network = Network.NONE;
    if (!router.isReady) return;
    if (network === 'polkadot') _network = Network.POLKADOT;
    else if (network === 'kusama') _network = Network.KUSAMA;
    else if (network === 'paseo') _network = Network.PASEO;
    else if (network === 'rococo') _network = Network.ROCOCO;
    else if (network === 'westend') _network = Network.WESTEND;
    else {
      // invalid network param. redirect to the default chain: polkadot
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            network: 'polkadot',
          },
        },
        undefined,
        { shallow: false }
      );
    }
    networkStarted(_network);
    // TODO: load accounts here from storage and pass to effector event.
    getExtensions();
  }, [network, router, router.isReady]);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Coretime Hub V2
      </h1>
      <NetworkSelector />
      <WalletSelector />
      <AccountSelector />
    </div>
  );
}

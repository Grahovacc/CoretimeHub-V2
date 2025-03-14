import React, { useState } from 'react';
import styles from './cross-chain.module.scss';
import { Select, AmountInput, AddressInput, Button } from '@region-x/components';
import {
  Kusama as KusamaIcon,
  Paseo as PaseoIcon,
  Polkadot as PolkadotIcon,
  Westend as WestendIcon,
  KusamaCoretime,
  PaseoCoretime,
  PolkadotCoretime,
  RococoCoretime,
  WestendCoretime,
} from '@/assets/networks/relay';
import { useUnit } from 'effector-react';
import { $network } from '@/api/connection';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ChainId, chains } from '@/network/chains';
import { Network } from '@/types';

const CrossChain = () => {
  const network = useUnit($network);

  const [originChain, setOriginChain] = useState<ChainId | null>(null);
  const [destinationChain, setDestinationChain] = useState<ChainId | null>(null);
  const [amount, setAmount] = useState('');
  const [beneficiary, setBeneficiary] = useState('');

  const handleOriginChainChange = (value: ChainId | null) => {
    setOriginChain(value);
  };

  const handleDestinationChainChange = (value: ChainId | null) => {
    setDestinationChain(value);
  };

  const handleBeneficiaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBeneficiary(e.target.value);
  };

  const handleTransfer = () => {
    console.log('Transfer initiated with:', {
      originChain,
      destinationChain,
      amount,
      beneficiary,
    });
  };

  const handleSwapChains = () => {
    const temp = originChain;
    setOriginChain(destinationChain);
    setDestinationChain(temp);
  };

  const networks = [
    {
      value: chains.polkadot.chainId,
      label: 'Polkadot',
      icon: (
        <Image
          src={PolkadotIcon.src}
          alt='Polkadot'
          className={styles.smallIcon}
          width={20}
          height={20}
        />
      ),
    },
    {
      value: chains.kusama.chainId,
      label: 'Kusama',
      icon: (
        <Image
          src={KusamaIcon.src}
          alt='Kusama'
          className={styles.smallIcon}
          width={20}
          height={20}
        />
      ),
    },
    {
      value: chains.paseo.chainId,
      label: 'Paseo',
      icon: (
        <Image
          src={PaseoIcon.src}
          alt='Paseo'
          className={styles.smallIcon}
          width={20}
          height={20}
        />
      ),
    },
    {
      value: chains.westend.chainId,
      label: 'Westend',
      icon: (
        <Image
          src={WestendIcon.src}
          alt='Westend'
          className={styles.smallIcon}
          width={20}
          height={20}
        />
      ),
    },
    {
      value: chains.polkadotCoretime.chainId,
      label: 'Polkadot Coretime',
      icon: (
        <Image
          src={PolkadotCoretime.src}
          alt='Polkadot Coretime'
          className={styles.smallIcon}
          width={20}
          height={20}
        />
      ),
    },
    {
      value: chains.kusamaCoretime.chainId,
      label: 'Kusama Coretime',
      icon: (
        <Image
          src={KusamaCoretime.src}
          alt='Kusama Coretime'
          className={styles.smallIcon}
          width={20}
          height={20}
        />
      ),
    },
    {
      value: chains.paseoCoretime.chainId,
      label: 'Paseo Coretime',
      icon: (
        <Image
          src={PaseoCoretime.src}
          alt='Paseo Coretime'
          className={styles.smallIcon}
          width={20}
          height={20}
        />
      ),
    },
    {
      value: chains.westendCoretime.chainId,
      label: 'Westend Coretime',
      icon: (
        <Image
          src={WestendCoretime.src}
          alt='Westend Coretime'
          className={styles.smallIcon}
          width={20}
          height={20}
        />
      ),
    },
  ];

  const filteredNetworks = networks.filter((n) => {
    if (!network) return true;
    return (
      n.value === chains[network as keyof typeof chains]?.chainId ||
      n.value === chains[`${network}Coretime` as keyof typeof chains]?.chainId
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.chainSelectionContainer}>
        <div className={styles.chainSelection}>
          <label className={styles.sectionLabel}>Origin chain:</label>

          <Select<ChainId>
            selectedValue={originChain}
            onChange={handleOriginChainChange}
            options={filteredNetworks.map((network) => ({
              value: network.value,
              label: network.label,
              icon: network.icon,
            }))}
          />
        </div>

        <div className={styles.swapIcon} onClick={handleSwapChains}>
          ⇅
        </div>

        <div className={styles.chainSelection}>
          <label className={styles.sectionLabel}>Destination chain:</label>

          <Select<ChainId>
            selectedValue={destinationChain}
            onChange={handleDestinationChainChange}
            options={filteredNetworks.map((network) => ({
              value: network.value,
              label: network.label,
              icon: network.icon,
            }))}
          />
        </div>
      </div>

      <div className={styles.transferSection}>
        <label>Transfer to</label>
        <AddressInput
          onChange={handleBeneficiaryChange}
          value={beneficiary}
          placeholder='Address of the recipient'
        />

        <div className={styles.amountSection}>
          <label>Transfer Amount:</label>
          <AmountInput
            currencyOptions={[{ value: network, label: network }]}
            onAmountChange={setAmount}
            placeholder='Enter amount'
          />
        </div>
      </div>

      <div className={styles.buttonContainer}>
        {/* <Button onClick={() => router.push('/')}>Home</Button> */}
        <Button onClick={handleTransfer}>Transfer</Button>
      </div>
    </div>
  );
};

export default CrossChain;

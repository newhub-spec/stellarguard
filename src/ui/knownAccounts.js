const knownAccounts = {
  GCGNWKCJ3KHRLPM3TM6N7D3W5YKDJFL6A2YCXFXNMRTZ4Q66MEMZ6FI2: {
    name: 'Poloniex',
    requiredMemoType: 'MEMO_ID'
  },
  GA5XIGA5C7QTPTWXQHY6MCJRMTRZDOSHR6EFIBNDQTCQHG262N4GGKTM: {
    name: 'Kraken',
    requiredMemoType: 'MEMO_ID'
  },
  GB6YPGW5JFMMP2QB2USQ33EUWTXVL4ZT5ITUNCY3YKVWOJPP57CANOF3: {
    name: 'Bittrex',
    requiredMemoType: 'MEMO_TEXT'
  },
  GB7GRJ5DTE3AA2TCVHQS2LAD3D7NFG7YLTOEWEBVRNUUI2Q3TJ5UQIFM: {
    name: 'BTC38',
    requiredMemoType: 'MEMO_ID'
  },
  GBV4ZDEPNQ2FKSPKGJP2YKDAIZWQ2XKRQD4V4ACH3TCTFY6KPY3OAVS7: {
    name: 'Changelly',
    requiredMemoType: 'MEMO_ID'
  },
  GC4KAS6W2YCGJGLP633A6F6AKTCV4WSLMTMIQRSEQE5QRRVKSX7THV6S: {
    name: 'BitcoinIndonesia',
    requiredMemoType: 'MEMO_TEXT'
  },
  GAHK7EEG2WWHVKDNT4CEQFZGKF2LGDSW2IVM4S5DP42RBW3K6BTODB4A: {
    name: 'Binance',
    requiredMemoType: 'MEMO_ID'
  }
};

function isKnownAccount(publicKey) {
  return knownAccounts[publicKey];
}

export { isKnownAccount };

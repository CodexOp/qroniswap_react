import logo from './logo.svg';
import './App.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./bootstrap.min.css"
import Home from './pages/Home';
import Farming from './pages/Farming';
import Staking from './pages/Staking';
import ReactDOM from 'react-dom/client'
import '@rainbow-me/rainbowkit/dist/index.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const BSCchainTestnet = {
  id: 97,
  name: "BSC - Testnet",
  network: "BSC",
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Binance_Logo.png/600px-Binance_Logo.png?20201023063027",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Binance Smart Chain – Testnet",
    symbol: "BNB",
  },
  rpcUrls: {
    default: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://testnet.bscscan.com" },
    etherscan: { name: "SnowTrace", url: "https://testnet.bscscan.com" },
  },
  testnet: false,
};

const BscMainnet = {
  id: 56,
  name: "BSC - Mainnet",
  network: "BSC",
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Binance_Logo.png/600px-Binance_Logo.png?20201023063027",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Binance Smart Chain",
    symbol: "BNB",
  },
  rpcUrls: {
    default: "https://bsc-dataseed.binance.org/",
  },
  blockExplorers: {
    default: { name: "BSC", url: "https://bscscan.com" },
    etherscan: { name: "BSC", url: "https://bscscan.com" },
  },
  testnet: false,
};

const { chains, provider } = configureChains(
  [
    BSCchainTestnet,
    BscMainnet
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Qroniswap",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = () => {
  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
  <BrowserRouter>
  <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider
                  chains={chains}
                  initialChain={BSCchainTestnet}
                  theme={darkTheme({
                    accentColor: '#7b3fe4',
                    accentColorForeground: 'white',
                    borderRadius: 'small',
                    fontStack: 'system',
                    overlayBlur: 'small',
                  })}
                >  

    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="farming" element={<Farming />} />
      <Route exact path="staking" element={<Staking />} />
    </Routes>
    </RainbowKitProvider>
    </WagmiConfig>
  </BrowserRouter>
</ThemeProvider>
  );
}

export default App;

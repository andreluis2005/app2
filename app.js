// app.js - simples integração ethers + fetch para Farcaster
const connectBtn = document.getElementById('connectBtn');
const switchBaseBtn = document.getElementById('switchBaseBtn');
const walletInfo = document.getElementById('walletInfo');
const balanceEl = document.getElementById('balance');

const fcInput = document.getElementById('fcInput');
const fcSearchBtn = document.getElementById('fcSearchBtn');
const fcResult = document.getElementById('fcResult');

let provider, signer;

// Chain info: Base mainnet chainId = 8453 (hex 0x212)
const BASE_CHAIN_ID_HEX = '0x212';
const BASE_CHAIN_ID_DEC = 8453;

async function connectWallet() {
  if (!window.ethereum) {
    walletInfo.innerText = 'MetaMask não detectada. Instale uma carteira compatível.';
    return;
  }
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    const address = await signer.getAddress();
    walletInfo.innerText = 'Conectado: ' + address;
    await showBalance();
    // listen for chain/account changes
    window.ethereum.on('accountsChanged', () => location.reload());
    window.ethereum.on('chainChanged', () => location.reload());
  } catch (err) {
    walletInfo.innerText = 'Erro ao conectar: ' + err.message;
  }
}

async function showBalance() {
  if (!signer) return;
  try {
    const address = await signer.getAddress();
    const bal = await provider.getBalance(address);
    // ethers v6 BigInt -> format
    const readable = ethers.formatEther(bal);
    balanceEl.innerText = `Endereço: ${address}\nSaldo (ETH): ${readable}`;
  } catch (err) {
    balanceEl.innerText = 'Erro ao buscar saldo: ' + err.message;
  }
}

async function requestSwitchToBase() {
  if (!window.ethereum) {
    walletInfo.innerText = 'MetaMask não detectada.';
    return;
  }
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BASE_CHAIN_ID_HEX }]
    });
    walletInfo.innerText = 'Solicitado switch para Base (se suportado pela carteira).';
    // refresh provider
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    await showBalance();
  } catch (err) {
    // If the chain is not added, wallets may return error; we suggest adding manually
    walletInfo.innerText = 'Não foi possível trocar a rede automaticamente: ' + (err.message || err);
    console.warn(err);
  }
}

// Farcaster lookup (usa API pública se disponível). Esta chamada pode falhar se a API pública mudar.
async function fetchFarcasterProfile(query) {
  fcResult.innerText = 'Buscando...';
  // heurística: se for número puro, trata como fid
  const isFid = /^[0-9]+$/.test(query.trim());
  try {
    if (isFid) {
      // buscar por fid
      const fid = query.trim();
      const res = await fetch(`https://api.farcaster.xyz/v2/user?fid=${fid}`);
      if (!res.ok) throw new Error('Resposta da API: ' + res.status);
      const data = await res.json();
      fcResult.innerText = JSON.stringify(data, null, 2);
    } else {
      // buscar por username (username pode não ser suportado diretamente pela API pública)
      // tentamos via /v2/username/{username} (pode variar)
      const username = encodeURIComponent(query.trim());
      const res = await fetch(`https://api.farcaster.xyz/v2/username/${username}`);
      if (!res.ok) {
        // fallback: apenas mostrar link para o perfil público
        fcResult.innerText = 'Não foi possível buscar via API. Veja o perfil público:\nhttps://www.farcaster.xyz/username/' + username;
        return;
      }
      const data = await res.json();
      fcResult.innerText = JSON.stringify(data, null, 2);
    }
  } catch (err) {
    fcResult.innerText = 'Erro ao consultar Farcaster: ' + err.message + '\n(Se a API mudou, tente abrir o perfil diretamente em https://www.farcaster.xyz/)';
    console.warn(err);
  }
}

connectBtn.onclick = connectWallet;
switchBaseBtn.onclick = requestSwitchToBase;
fcSearchBtn.onclick = () => {
  const q = fcInput.value.trim();
  if (!q) {
    fcResult.innerText = 'Digite um username ou fid.';
    return;
  }
  fetchFarcasterProfile(q);
};

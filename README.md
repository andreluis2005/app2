# App Base + Farcaster (Simples)

Projeto demo para conectar carteira na rede **Base** e buscar perfis do **Farcaster**.

## O que tem aqui
- `index.html` + `app.js`: frontend estático (HTML + JS) que usa `ethers` via CDN.
- Funcionalidades:
  1. Conectar MetaMask / carteira compatível.
  2. Solicitar troca para a rede Base (chainId `8453`).
  3. Buscar perfil Farcaster (API pública — pode variar).

## Como rodar localmente (passo a passo)

### Opção A — Abrir localmente (rápido)
1. Baixe e extraia `app2.zip`.
2. Abra `index.html` no navegador (algumas chamadas `fetch` podem requerer um servidor HTTP; se falhar, use a Opção B).

### Opção B — Servir localmente com Python (recomendado)
1. Navegue até a pasta do projeto:
   ```bash
   cd app2
   ```
2. Inicie um servidor simples (Python 3):
   ```bash
   python -m http.server 3000
   ```
3. Abra no navegador: `http://localhost:3000`

### Observações
- Para usar a parte de carteira, instale/abra MetaMask ou outra carteira que injete `window.ethereum`.
- O app tenta solicitar que a carteira troque para a rede Base (`chainId=8453`). Se a carteira não suportar a troca automática, adicione a rede manualmente.
- As chamadas à API pública do Farcaster podem variar com o tempo — se der erro, abra o perfil direto em `https://www.farcaster.xyz/`.

## Como subir para o GitHub (passo a passo)

1. Crie o repositório remoto no GitHub com o nome `app2`:
   - Vá em https://github.com/new e crie um repo público chamado `app2`.

2. No terminal, dentro da pasta `app2`, execute:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: App Base + Farcaster (simples)"
   git branch -M main
   git remote add origin https://github.com/andreluis2005/app2.git
   git push -u origin main
   ```

3. Se você usa autenticação 2FA, configure um token pessoal (Personal Access Token) e utilize o token ao fazer push via HTTPS, ou configure `ssh` e use a URL SSH.

Pronto! O site está no repositório `andreluis2005/app2`.

## Licença
MIT

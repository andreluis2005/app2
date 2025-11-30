import React from 'react'
import Header from './components/Header'
import WalletCard from './components/WalletCard'

export default function App(){
  return (
    <div className="app">
      <Header />
      <main className="container">
        <section className="intro">
          <h2>Bem-vindo ao Rackathon — Base (Coinbase)</h2>
          <p>Aplicativo de demonstração pronto para ser extendido com integração de carteira, chamadas on-chain e visualização de blocos.</p>
        </section>

        <section className="cards">
          <WalletCard />
          <div className="card">
            <h3>Demo: Informações da Rede</h3>
            <p>Rede alvo: <strong>Base (Coinbase)</strong></p>
            <p>Status: <em>Mock — conecte uma carteira para ver dados reais</em></p>
          </div>
        </section>

        <footer className="footer">
          <small>Feito para o rackathon • Personalize para seu projeto</small>
        </footer>
      </main>
    </div>
  )
}

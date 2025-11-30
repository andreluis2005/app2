import React, { useState } from 'react'

export default function WalletCard(){
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState('')

  function mockConnect(){
    // Mock connection: gera um endereço fictício curto
    const mock = '0x' + Math.random().toString(16).slice(2,10)
    setAddress(mock)
    setConnected(true)
  }

  function disconnect(){
    setAddress('')
    setConnected(false)
  }

  return (
    <div className="card">
      <h3>Carteira</h3>
      {connected ? (
        <>
          <p><strong>Endereço:</strong> {address}</p>
          <button onClick={disconnect} className="btn outline">Desconectar</button>
        </>
      ) : (
        <>
          <p>Sem carteira conectada</p>
          <button onClick={mockConnect} className="btn">Conectar (Mock)</button>
        </>
      )}
    </div>
  )
}

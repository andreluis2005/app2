import React from 'react'
export default function Header(){
  return (
    <header className="header">
      <img src="/public/logo.svg" alt="Logo" className="logo" />
      <div>
        <h1>Base Rackathon App</h1>
        <p className="subtitle">Demo rápida em React — pronta para GitHub + Vercel</p>
      </div>
    </header>
  )
}

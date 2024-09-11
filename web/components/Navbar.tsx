import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-end px-4 p-1'>
        <WalletMultiButton/>
    </div>
  )
}

export default Navbar
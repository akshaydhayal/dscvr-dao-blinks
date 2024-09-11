import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Website Name */}
        <div className="text-2xl font-semibold">
          Daily Diary
        </div>
        
        {/* Wallet Button */}
        <div className="flex items-center">
          <WalletMultiButton />
        </div>
      </div>
    </nav>
    // <div className='flex justify-end px-4 p-1'>
    //     <WalletMultiButton/>
    // </div>
  )
}

export default Navbar
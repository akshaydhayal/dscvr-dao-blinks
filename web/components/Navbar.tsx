import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md h-[10vh]">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Website Name */}
        <div className="text-3xl font-semibold font-serif text-green-300 tracking-wider">
          DSCVR DAO
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
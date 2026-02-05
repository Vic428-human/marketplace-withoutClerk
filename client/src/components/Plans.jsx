import { PricingTable } from '@clerk/clerk-react'
import React from 'react'

const Plans = () => {
  return (
    // max-md =>768px之前 水平 padding 16px
    <div className='max-w-2xl mx-auto z-20 my-20 max-md:px-4'>
        <div className='text-center'>
            <h2 className='text-gray-700 text-4xl font-semibold'>月付方案</h2>
            <p className='text-gray-500 text-sm max-w-md mx-auto'>不同等級的月付方案，可以解鎖不同功能</p>
        </div>
        <div className='mt-14'>
          <PricingTable/>
        </div>
    </div>
  )
}

export default Plans
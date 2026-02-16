import React from 'react'
import { createFileRoute } from '@tanstack/react-router';

const ListingDetails = () => {
  return (
    <div>
        <h1>ListingDetails page</h1>
    </div>
  )
}

export default ListingDetails

export const Route = createFileRoute('/ListingDetails')({  // ✅ 動態 ID
  component: ListingDetails,
  parseParams: (params) => ({ id: params.id }),  // JS 參數解析
});
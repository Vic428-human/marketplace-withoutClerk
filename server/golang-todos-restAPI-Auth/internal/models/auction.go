package models

import "time"

// AuctionListing 對應 auction_listings 資料表　=>　之後從 DB 查一筆拍賣商品時，就可以 scan 進這個 struct。
// 代表一筆拍賣商品目前的狀態
type AuctionListing struct {
	ID              string    `json:"id"`
	SellerID        string    `json:"seller_id"`
	ItemName        string    `json:"item_name"`
	ItemImageURL    string    `json:"item_image_url"`
	ItemDescription string    `json:"item_description"`
	StartingPrice   int64     `json:"starting_price"`
	CurrentPrice    int64     `json:"current_price"`
	MinIncrement    int64     `json:"min_increment"`
	HighestBidderID *string   `json:"highest_bidder_id"`
	Status          string    `json:"status"`
	StartTime       time.Time `json:"start_time"`
	EndTime         time.Time `json:"end_time"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}

// AuctionBid 對應 auction_bids 資料表　=> 之後查某個商品的出價紀錄時，就可以用這個 struct 裝。
// 代表某一次出價紀錄
type AuctionBid struct {
	ID        string    `json:"id"`
	ListingID string    `json:"listing_id"`
	BidderID  string    `json:"bidder_id"`
	BidAmount int64     `json:"bid_amount"`
	CreatedAt time.Time `json:"created_at"`
}

// CreateAuctionListingRequest 是建立拍賣商品時前端送來的資料 => 這是 handler 收前端 request body 用的，也就是使用者建立拍賣時，前端應該送來哪些欄位。
type CreateAuctionListingRequest struct {
	ItemName        string    `json:"item_name" binding:"required"`
	ItemImageURL    string    `json:"item_image_url" binding:"required"`
	ItemDescription string    `json:"item_description"`
	StartingPrice   int64     `json:"starting_price" binding:"required"`
	MinIncrement    int64     `json:"min_increment"`
	EndTime         time.Time `json:"end_time" binding:"required"`
}

// PlaceBidRequest 是某個使用者出價時前端送來的資料 => 這是使用者出價時，前端送進來的資料。
type PlaceBidRequest struct {
	BidAmount int64 `json:"bid_amount" binding:"required"`
}

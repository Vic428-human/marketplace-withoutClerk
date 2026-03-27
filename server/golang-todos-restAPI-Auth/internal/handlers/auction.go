package handlers

import (
	"fmt"
	"net/http"
	"todo_api/internal/config"
	"todo_api/internal/models"
	"todo_api/internal/repository"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

// 從 cookie 裡解析 JWT，拿出目前登入者的 user_id
func getUserIDFromCookie(c *gin.Context, cfg *config.Config) (string, error) {
	tokenString, err := c.Cookie("token")
	if err != nil {
		return "", err
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(cfg.JWTSecret), nil
	})
	if err != nil {
		return "", err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return "", err
	}

	userIDValue, ok := claims["user_id"]
	if !ok {
		return "", err
	}

	userID, ok := userIDValue.(string)
	if !ok {
		return "", err
	}

	return userID, nil
}

// 建立拍賣商品
func CreateAuctionListingHandler(pool *pgxpool.Pool, cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, err := getUserIDFromCookie(c, cfg)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			return
		}

		var req models.CreateAuctionListingRequest
		if err := c.BindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		listing, err := repository.CreateAuctionListing(pool, userID, req)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"message": "auction listing created successfully",
			"data":    listing,
		})
	}
}

// 取得所有拍賣商品
func GetAuctionListingsHandler(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println(">>> HIT GET /auctions")

		listings, err := repository.GetAuctionListings(pool)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": listings,
		})
	}
}

// 取得單一拍賣商品詳情
func GetAuctionListingByIDHandler(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		listingID := c.Param("id")

		listing, err := repository.GetAuctionListingByID(pool, listingID)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "auction listing not found"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": listing,
		})
	}
}

// 對某個拍賣商品出價
func PlaceBidHandler(pool *pgxpool.Pool, cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, err := getUserIDFromCookie(c, cfg)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			return
		}

		listingID := c.Param("id")

		var req models.PlaceBidRequest
		if err := c.BindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		err = repository.PlaceBid(pool, listingID, userID, req.BidAmount)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "bid placed successfully",
		})
	}
}

// 取得某個拍賣商品的所有出價紀錄
func GetAuctionBidsHandler(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		listingID := c.Param("id")

		bids, err := repository.GetAuctionBidsByListingID(pool, listingID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": bids,
		})
	}
}

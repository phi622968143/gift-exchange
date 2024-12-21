# HacKMD

- 文件連結: [https://hackmd.io/PR4_FbP4SpO1Uqc8vTvrPg](https://hackmd.io/PR4_FbP4SpO1Uqc8vTvrPg)

# 後端API

- 抽獎
	- path: /api/lucky-draw
	- method: POST
	- request body
	```json
	{
		"giftPrice": 100,
		"wishlist": ["book", "toy", "game"]
	}
	```
	- response
	```json
	{
		"message": "狀態訊息",
		"selectedGift": {
			"price": 100
		}
	}
	```

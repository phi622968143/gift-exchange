const express = require('express');
const app = express();
const port = 3000;
/*logic set price range to filter gift and then random chose from array. */
/*payload {
	"id": 1,
	"giftPrice": 100,
	"wishlist": ["book", "toy", "game"]
}*/

const gifts = [
	{ id: 101, price: 95, name: "book" },
	{ id: 102, price: 110, name: "game" },
	{ id: 103, price: 130, name: "watch" },
	{ id: 104, price: 155, name: "puzzle" },
	{ id: 105, price: 160, name: "pen" },
];

// Price range +- 20%
function filterGifts(participant, gifts) {
	const minPrice = participant.giftPrice * 0.8;
	const maxPrice = participant.giftPrice * 1.2;

	return gifts.filter(gift =>
		gift.price >= minPrice &&
		gift.price <= maxPrice
	);
}

// Random chose index
function getRandomGift(filteredGifts) {
	if (filteredGifts.length === 0) return null;
	const randomIndex = Math.floor(Math.random() * filteredGifts.length);
	return filteredGifts[randomIndex];
}


app.post('/api/lucky-draw', (req, res) => {
	const participant = req.body;

	console.log('Received data:', participant);

	if (!participant || !participant.giftPrice || !Array.isArray(participant.wishlist)) {
		console.error("Missing or invalid data:", participant);
		return res.status(400).json({ error: "Missing or invalid data." });
	}


	const availableGifts = filterGifts(participant, gifts);

	const selectedGift = getRandomGift(availableGifts);


	if (selectedGift) {
		res.json({
			message: `Participant ${participant.id} gets:`,
			selectedGift: selectedGift
		});
	} else {
		res.json({
			message: `No suitable gift found for Participant ${participant.id}.`
		});
	}
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

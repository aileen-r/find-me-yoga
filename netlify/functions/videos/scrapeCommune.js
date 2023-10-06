import puppeteer from 'puppeteer';

const COMMUNE_LIBRARY_URL = 'https://communeyogastudio.com/categories/full-class-library';

async function scrapeCommune() {
	try {
		// Launch the browser and open a new blank page
		const browser = await puppeteer.launch({ headless: 'new' });
		const page = await browser.newPage();

		// Navigate the page to a URL
		await page.goto(COMMUNE_LIBRARY_URL + '?page=27');

		const data = await page.evaluate(() => {
			const videos = [];
			const container = document.getElementById('category_content');
			const videoCards = container.querySelectorAll('[data-custom=content-card]');
			videoCards.forEach((card) => {
				const cardType = card.getAttribute('data-card').split('_')[0];
				if (cardType !== 'video') {
					return;
				}
				const url = card.querySelector('a.card-image-container')?.href;
				const title = card
					.querySelector('.card-title')
					?.textContent?.replace(/[\n\r]+|[\s]{2,}/g, ' ')
					.trim();
				const thumbnail = card.querySelector('img.card-image')?.src?.split('&')[0];
				const instructor = card.getAttribute('data-author-title-0') || '';
				let duration = card
					.querySelector('.badge-item')
					?.textContent?.replace(/[\n\r]+|[\s]{2,}/g, ' ')
					.trim();
				if (duration.split(':').length < 3) {
					duration = `0:${duration}`;
				}
				videos.push({
					title,
					url,
					instructor,
					thumbnail,
					duration,
					subscription: 'Commune'
				});
			});
			return videos;
		});

		await browser.close();

		return data;
	} catch (err) {
		console.error(err);
	}
}

export default scrapeCommune;

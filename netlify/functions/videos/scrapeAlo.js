import puppeteer from 'puppeteer';

/**
 * Expected URL format
 * Series: https://wellnessclub.aloyoga.com/series/restorative-reset
 * Class in series: https://wellnessclub.aloyoga.com/series/restorative-reset/workouts/9342
 * Standalone class same format: https://wellnessclub.aloyoga.com/series/poetry-in-motion/workouts/10589
 * 
 */

/**
 * 
 * @param {string} url 
 * @returns 
 */
async function scrapeCommune(url) {
	try {
		// Launch the browser and open a new blank page
		const browser = await puppeteer.launch({ headless: 'new' });
		const page = await browser.newPage();

		// Navigate the page to a URL
		await page.goto(url);

		const data = await page.evaluate(() => {
			const videos = [];
      const seriesTitle = document.getElementsByClassName('video-big-title')?.[0]?.textContent?.trim() || '';
      const instructor = document.getElementsByClassName('coach-title')?.[0]?.textContent?.trim() || '';
      const container = document.getElementById('plan-workouts-shell');
      const videoCards = container.querySelectorAll('a');
			videoCards.forEach((card) => {
				const url = card.href;
				const classTitle = card
					.querySelector('#SeriesTitle')
					?.textContent
          ?.trim();
        const title = `${seriesTitle} - ${classTitle}`;
        const img = card.getElementsByTagName('img')?.[0];
				const thumbnail = img?.src;
				let duration = img.parentElement.children?.[1]
					?.textContent
          ?.replace(/[\n\r]+|[\s]{2,}/g, ' ')
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
					subscription: 'Alo Wellness Club'
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

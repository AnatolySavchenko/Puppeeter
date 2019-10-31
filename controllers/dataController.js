

exports.getAllData = (res,req) => {
	const axios = require('axios');
	const cheerio = require('cheerio');

	const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';

axios(url).then((res) => {
		const html = res.data;
		const $ = cheerio.load(html);
		const statsTable = $('.statsTableContainer > tr');
		let topScoresFromEnglandPremierLeage = [];

		statsTable.each(function() {
			const rank = $(this).find('.rank > strong').text();
			const name = $(this).find('.playerName > strong').text();
			const nationality = $(this).find('.playerCountry').text();
			const goals = $(this).find('.mainStat').text();

			let bioPlayer = {
				rank,
				name,
				nationality,
				goals
			};

			topScoresFromEnglandPremierLeage.push(bioPlayer);

		});

		req.send(topScoresFromEnglandPremierLeage);

	}).catch(error => {
		console.log('--------error', error);
});
};
// const axios = require('axios');
// const cheerio = require('cheerio');
//
// const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';
//
// axios(url).then(res => {
// 		const html = res.data;
// 		const $ = cheerio.load(html);
// 		const statsTable = $('.statsTableContainer > tr');
// 		let topScoresFromEnglandPremierLeage = [];
//
// 		statsTable.each(function() {
// 			const rank = $(this).find('.rank > strong').text();
// 			const name = $(this).find('.playerName > strong').text();
// 			const nationality = $(this).find('.playerCountry').text();
// 			const goals = $(this).find('.mainStat').text();
//
// 			let bioPlayer = {
// 				rank,
// 				name,
// 				nationality,
// 				goals
// 			};
//
// 			topScoresFromEnglandPremierLeage.push(bioPlayer);
//
// 		});
//
// 		console.log('--------topScoresFromEnglandPremierLeage', topScoresFromEnglandPremierLeage);
//
//
// 	}).catch(error => {
// 		console.log('--------error', error);
// });

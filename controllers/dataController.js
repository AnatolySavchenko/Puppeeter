const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');

exports.getAllData = async (req,res) => {

		let url = await req.query.url;

	axios(url).then(() => {
	puppeteer
		.launch()
		.then(browser => browser.newPage())
		.then(page => {
			return page.goto(url).then(function() {
				return page.content();
			});
		})
		.then(html => {

			let arrPosts = [];
			const $ = cheerio.load(html);
			
			
			
			const postsHabr = $('.content-list.content-list_posts.shortcuts_items > li');

			postsHabr.each(function () {
					let postName = $(this).find('.post__title > a').text();
					let like = $(this).find('.voting-wjt__counter_positive').text();

					let arrTags = [];
					let tags =  $(this).find('.post__hubs.inline-list > li');

					tags.each(function () {
						let tag = $(this).find('.inline-list__item-link.hub-link').text();
						arrTags.push(tag);
					});

					arrPosts.push({
						postName,
						like,
						arrTags
					})
			});


			res.send(arrPosts);

		})
		.catch(console.error);
		})
};


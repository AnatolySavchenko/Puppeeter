window.onload = () => {
	let data = [];
	const ulForData = document.getElementById('place-for-data');
	const urlOne = document.getElementById('url-one');
	const urlTwo = document.getElementById('url-two');
	const urlThree = document.getElementById('url-three');

	const enterUrl = (event) => {

		let url = event.target.value;

		axios.get('http://localhost:9001/data/', {
			params: {
				url: url
			}
		}).then((res) => {
			data = [...res.data];
			render(data)
		});

		const render = function (array) {
			ulForData.innerHTML = '';
			let stringForAppend = '';
			array.forEach(item => {
				stringForAppend += `<li>{Name:${item.postName},likes:${item.like},tags:${item.arrTags}}</li>`;
			});
			ulForData.innerHTML = stringForAppend;
		};
	};


	urlOne.addEventListener('click', enterUrl);
	urlTwo.addEventListener('click', enterUrl);
	urlThree.addEventListener('click', enterUrl);
};


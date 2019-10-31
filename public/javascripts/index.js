window.onload = () => {

	axios.get('http://localhost:9001/data/').then((res) => {
		console.log(res);
	});

};

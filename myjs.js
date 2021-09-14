let requestURL='https://showherda.github.io/unimate/sdata.txt';
$(document).ready(() => {
	let request=new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType='txt';
	request.send();
	var unis=[];
	request.onload=() => {
		let tmp=request.response.split(';');
		for (let v of tmp)
			unis.push(Array.from(v.trim().split(',')));
		console.log(tmp);
		$('table').DataTable({
			data:unis,
			columns:[
				{title:'Institution'},
				{title:'ED to RD Acceptance Ratio'},
				{title:'Percentage of International Noncitizens to All Undergraduates'},
				{title:'Percentage of International Noncitizens Receiving Aid'},
				{title:'Estimated Family Contribution'}
			]
		});
	}
})

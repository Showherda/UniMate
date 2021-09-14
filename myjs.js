let requestURL='https://showherda.github.io/unimate/sdata.json';
$(document).ready(() => {
	let request=new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType='json';
	request.send();
	var unis;
	request.onload=() => {
		unis=request.response;
		$('table').DataTable({
			data:unis,
			'columns':[
				{'title':'Institution'},
				{'title':'ED to RD Acceptance Ratio'},
				{'title':'Percentage of International Noncitizens to All Undergraduates'},
				{'title':'Percentage of International Noncitizens Receiving Aid'},
				{'title':'Estimated Family Contribution'}
			]
		});
	}
})

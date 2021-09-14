let requestURL='https://showherda.github.io/unimate/data.json';
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
				{'data':'Institution'},
				{'data':'ED Acceptance Rate'},
				{'data':'RD Acceptance Rate'},
				{'data':'Maximum Percent of Class Filled from ED'},
				{'data':'ED to RD Acceptance Ratio'},
				{'data':'Additional Admission Plans'},
				{'data':'Total Cost of Attendance (out-of-state)'},
				{'data':'Full-Time Undergraduates'},
				{'data':'Full-Time International Noncitizen Undergraduates'},
				{'data':'Percentage of International Noncitizens to All Undergraduates'},
				{'data':'Aid Policy:Need-based'},
				{'data':'Aid Policy:Merit'},
				{'data':'Aid Policy:No Aid'},
				{'data':'Average Financial Aid Award'},
				{'data':'Percentage of International Noncitizens Receiving Aid'}
			]
		});
	}
})

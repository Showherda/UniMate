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
				{'title':'Institution'},
				{'title':'ED Acceptance Rate'},
				{'title':'RD Acceptance Rate'},
				{'title':'Maximum Percent of Class Filled from ED'},
				{'title':'ED to RD Acceptance Ratio'},
				{'title':'Additional Admission Plans'},
				{'title':'Total Cost of Attendance (out-of-state)'},
				{'title':'Full-Time Undergraduates'},
				{'title':'Full-Time International Noncitizen Undergraduates'},
				{'title':'Percentage of International Noncitizens to All Undergraduates'},
				{'title':'Aid Policy:Need-based'},
				{'title':'Aid Policy:Merit'},
				{'title':'Aid Policy:No Aid'},
				{'title':'Average Financial Aid Award'},
				{'title':'Percentage of International Noncitizens Receiving Aid'}
			]
		});
	}
})

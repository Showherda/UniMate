const requestURL='https://showherda.github.io/unimate/data.txt';
$(document).ready(() => {
	let request=new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType='txt';
	request.send();
	var all=[[]];
	request.onload=() => {
		document.querySelector('button').disabled=false;
		for (let v of request.response.split(';')){
			v=v.replace('\n', '');
			let t=[], i=0, s='';
			while (i<v.length){
				if (v[i]===',')
					all[all.length-1].push(s),
					s='';
				else if (v[i]==='"'){
					let j=i+1;
					while (v[j]!=='"')
						s+=v[j++];
					t.push(s);
					i=j
				}
				else
					s+=v[i];
				i+=1
			}
			all.push([]);
		}
		all.pop();
	};
	var form=document.querySelector('form');
	var formData=new FormData(form);
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		var res=[], efc=formData.get('efc'), ed=formData.get('ed');
		for (let v of all)
			if (parseInt(v[14])<=efc && ((ed==='on' && parseFloat(v[1])>0) || ed==='off'))
				res.push(v);
		$('table').DataTable({
			data:res,
			columns:[
				{title:'Institution'},
				{title:'ED to RD Acceptance Ratio'},
				{title:'Percentage of International Noncitizens to All Undergraduates'},
				{title:'Percentage of International Noncitizens Receiving Aid'},
				{title:'Estimated Family Contribution'}
			]
		});
	});
});

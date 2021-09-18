const requestURL='https://showherda.github.io/unimate/data.txt';
$(document).ready(() => {
	let request=new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType='txt';
	request.send();
	var all=[[]];
	var form=document.querySelector('form');
	var formData=new FormData(form);
	var res=[[]];
	var table=$('table');
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
			all[all.length-1].push(s);
			all.push([]);
		}
		all.pop();
		for (let v of all){
			for (let i=0; i<v.length; i++)
				if (i==0 || i==4 || i==9 || i==14 || i==15)
					res[res.length-1].push(v[i]);
			res.push([]);
		}
		res.pop();
		table.DataTable({
			data:res,
			columns:[
				{title:'Institution'},
				{title:'ED to RD Acceptance Ratio'},
				{title:'Percentage of International Noncitizens to All Undergraduates'},
				{title:'Percentage of International Noncitizens Receiving Aid'},
				{title:'Estimated Family Contribution'}
			]
		});
	};
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		var efc=formData.get('efc'), ed=formData.get('ed');
		res=[[]];
		for (let v of all)
			if (parseInt(v[v.length-1])<=parseInt(efc) && ((ed==='on' && parseFloat(v[1])>0) || ed==='off')){
				for (let i=0; i<v.length; i++)
					if (i==0 || i==4 || i==9 || i==14 || i==15)
						res[res.length-1].push(v[i]);
				res.push([]);
			}
		res.pop();
		console.log(res);
		table.DataTable().clear().destroy();
		table.DataTable({
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

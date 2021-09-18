const requestURL='https://showherda.github.io/unimate/data.txt';
$(document).ready(() => {
	let request=new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType='text';
	request.send();
	var all=[[]];
	var form=document.querySelector('form');
	var formData;
	var res=[[]];
	var table=$('table'), efc, ed;
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
		$('tr').click((e) => {
			if (e.target.parentNode.parentNode.tagName=='TBODY'){
				let name=e.target.parentNode.childNodes[0].innerHTML;
				$('.modal-title').text(name);
				for (let v of all)
					if (name===v[0])
						$('#ind1').text(v[1]),
						$('#ind2').text(v[2]),
						$('#ind3').text(v[3]),
						$('#ind4').text(v[4]),
						$('#ind5').text(v[5]),
						$('#ind6').text(v[6]),
						$('#ind7').text(v[7]),
						$('#ind8').text(v[8]),
						$('#ind9').text(v[9]),
						$('#ind10').text(v[10]),
						$('#ind11').text(v[11]),
						$('#ind12').text(v[12]),
						$('#ind13').text(v[13]),
						$('#ind14').text(v[14]),
						$('#ind15').text(v[15]);
				$('.modal').modal();
			}
		});
	};
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		formData=new FormData(form);
		efc=formData.get('efc');
		ed=formData.get('ed');
		res=[[]];
		for (let v of all)
			if (parseInt(v[v.length-1])<=parseInt(efc) && ((ed==='on' && parseFloat(v[1])>0) || !ed)){
				for (let i=0; i<v.length; i++)
					if (i==0 || i==4 || i==9 || i==14 || i==15)
						res[res.length-1].push(v[i]);
				res.push([]);
			}
		res.pop();
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
		$('tr').click((e) => {
			if (e.target.parentNode.parentNode.tagName=='TBODY'){
				let name=e.target.parentNode.childNodes[0].innerHTML;
				$('.modal-title').text(name);
				for (let v of all)
					if (name===v[0])
						$('#ind1').text(v[1]),
						$('#ind2').text(v[2]),
						$('#ind3').text(v[3]),
						$('#ind4').text(v[4]),
						$('#ind5').text(v[5]),
						$('#ind6').text(v[6]),
						$('#ind7').text(v[7]),
						$('#ind8').text(v[8]),
						$('#ind9').text(v[9]),
						$('#ind10').text(v[10]),
						$('#ind11').text(v[11]),
						$('#ind12').text(v[12]),
						$('#ind13').text(v[13]),
						$('#ind14').text(v[14]),
						$('#ind15').text(v[15]);
				$('.modal').modal();
			}
		});
	});
});

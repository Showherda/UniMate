let requestURL='https://showherda.github.io/UniMate/data.json';
let request=new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType='json';
request.send();
var data;
request.onload=() => {
	data=request.response;
	document.querySelector('button').disabled=false;
}
let form=document.querySelector('form');
form.addEventListener('submit', (event)=>{
	event.preventDefault();
	let formData=new FormData(form), e, r, nb, m;
	e=formData.get('ed-preference')==='on' || formData.get('ea-preference')==='on';
	r=formData.get('rd-preference')==='on';
	nb=formData.get('nb-preference')==='on';
	m=formData.get('m-preference')==='on';
	for (let i=0; i<data.length; i++){
		data[i]['score']+=data[i]['tcoa']<=formData.get('max-coa');
		data[i]['score']+=data[i]['tcoa']-data[i]['aaa']<=formData.get('max-ecf');
		data[i]['score']+=data[i]['eda'] && formData.get('ed-preference')==='on';
		data[i]['score']+=data[i]['eaa'] && formData.get('ea-preference')==='on';
		data[i]['score']+=data[i]['pnb'] && formData.get('nb-preference')==='on';
		data[i]['score']+=data[i]['pm'] && formData.get('m-preference')==='on';
	}
	data.sort((a, b)=> {
		let score=(b['tcoa']-b['aaa']>a['tcoa']-a['aaa'])*(-10)+(b['ponrara']-a['ponrara'])+(b['pnrataug']-a['pnrataug']);
		if (e)
			score+=(b['ea2a']||b['eaa']||b['ed2a']||b['eda']-a['ea2a']||a['eaa']||a['ed2a']||a['eda'])*(-10)+(b['pocffed']-a['pocffed'])+(b['edar']-a['edar']);
		if (r)
			score+=(b['rdat']-a['rdat'])+(100-b['pocffed']-100+a['pocffed']);
		if (nb)
			score+=(b['pnb']-a['pnb'])*(-10);
		if (m)
			score+=(b['pm']-a['pm'])*(-10);
		score+=(b['score']-a[score]);
		return score;
	});
	let cards=document.querySelector(".cards");
	cards.style.display='block';
	console.log(cards);
	for (v of data){
		let card=document.createElement('div');
		card.classList.add('card');
		cards.appendChild(card);
		let cardBody=document.createElement('div');
		cardBody.classList.add('card-body');
		card.appendChild(cardBody);
		let cardTitle=document.createElement('div');
		cardTitle.classList.add('card-title')
		cardTitle.innerHTML=v['name'];
		cardBody.appendChild(cardTitle);
		let cardText=document.createElement('div');
		cardText.classList.add('card-text');
		cardText.innerHTML=`Total Cost of Attendance: US\$${v['tcoa']}<br>Number of Full Time Undergraduates: ${v['ftug']}<br>Number of Full Time Nonresident Aliens: ${v['ftnra']}<br>Percentage of Nonresident Aliends Receiving Aid: ${v['ponrara']}%<br>`;
		cardBody.appendChild(cardText);
	}
});
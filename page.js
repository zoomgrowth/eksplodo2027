const sector = document.querySelector('#sector');
const topic = document.querySelector('#topic');
for (const name of EX.sectors) sector.add(new Option(name));
for (const name of EX.topics) topic.add(new Option(name));
function updatePDF() {
  const n = 1 + sector.selectedIndex * EX.topics.length + topic.selectedIndex;
  document.querySelector('#pdf').href = 'guides/' + String(n).padStart(3,'0') + '.pdf';
}
sector.onchange = topic.onchange = updatePDF;
function visit(value, checkout) {
  if (!value) {
    document.querySelector('#status').textContent = checkout ? 'Pagesa hapet me nisjen e regjistrimeve.' : 'Hyrja për anëtarët ende nuk është hapur.';
    return;
  }
  const url = new URL(value);
  if (checkout) for (const [k,v] of new URLSearchParams(location.search)) {
    if (['utm_source','utm_campaign','utm_medium','utm_content','utm_term'].includes(k)) url.searchParams.set(k,v);
  }
  location.assign(url);
}
document.querySelectorAll('.buy').forEach(b => b.onclick = () => visit(campaign.stripePaymentLink,true));
document.querySelector('#login').onclick = () => visit(campaign.memberLoginUrl,false);

const recipes = [
  {title:'Krämig citronpasta', category:'Snabbt', time:'20 min', description:'Solig, enkel och alldeles underbar.', image:'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80', ingredients:['300 g pasta','1 citron','2 dl crème fraiche','1 dl riven parmesan','Salt, peppar och färsk basilika'], method:'Koka pastan. Blanda crème fraiche med citronskal, lite citronsaft och parmesan i en panna. Vänd ner pastan med en skvätt pastavatten. Smaka av och toppa med basilika.'},
  {title:'Grön bowl med avokado', category:'Vegetariskt', time:'25 min', description:'En färgglad skål full av god energi.', image:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80', ingredients:['2 dl quinoa','1 avokado','1 burk kikärtor','Valfria gröna blad och grönsaker','Olivolja och citron'], method:'Koka quinoan enligt förpackningen. Skär avokado och grönsaker. Lägg allt i skålar med avsköljda kikärtor och ringla över olivolja och citron.'},
  {title:'Pannkakor med bär', category:'Sött', time:'25 min', description:'För långsamma morgnar och extra mys.', image:'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80', ingredients:['2 ägg','2,5 dl mjöl','5 dl mjölk','1 nypa salt','Smör och färska bär'], method:'Vispa ihop mjöl, hälften av mjölken och salt till en slät smet. Vispa i resten av mjölken och äggen. Stek tunna pannkakor i smör och servera med bär.'},
  {title:'Tomattoast med burrata', category:'Vegetariskt', time:'15 min', description:'En liten stund av ren njutning.', image:'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80', ingredients:['2 skivor gott bröd','2 mogna tomater','1 burrata','Färsk basilika','Olivolja, salt och peppar'], method:'Rosta brödet och skiva tomaterna. Lägg tomat och burrata på brödet. Toppa med basilika, olivolja, salt och peppar.'},
  {title:'Ugnsrostad lax', category:'Snabbt', time:'30 min', description:'En vardagsfavorit med friska smaker.', image:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80', ingredients:['2 laxfiléer','1 citron','400 g småpotatis','Gröna grönsaker efter smak','Olivolja, salt och peppar'], method:'Rosta halverad potatis med olja i 225 grader i cirka 15 minuter. Lägg till lax och grönsaker och tillaga ytterligare cirka 15 minuter, tills laxen är genomstekt. Servera med citron.'},
  {title:'Chokladiga små stunder', category:'Sött', time:'30 min', description:'För att livet blir lite bättre med choklad.', image:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80', ingredients:['100 g smör','2 ägg','2,5 dl socker','1,5 dl mjöl','4 msk kakao'], method:'Smält smöret. Rör ihop ägg och socker, blanda ner mjöl och kakao och sedan smöret. Häll i en smord form och grädda i 175 grader i cirka 15–20 minuter.'}
];
const grid = document.querySelector('#recipe-grid');
const search = document.querySelector('#search');
const empty = document.querySelector('#empty');
const dialog = document.querySelector('#recipe-dialog');
let selected = 'Alla';
function render() {
  const query = search.value.trim().toLocaleLowerCase('sv');
  const matches = recipes.filter(recipe => (selected === 'Alla' || recipe.category === selected) && `${recipe.title} ${recipe.description} ${recipe.category} ${recipe.ingredients.join(' ')}`.toLocaleLowerCase('sv').includes(query));
  grid.innerHTML = matches.map(recipe => `<button class="card" data-title="${recipe.title}"><div class="card-image"><img src="${recipe.image}" alt="" loading="lazy"><span class="card-tag">${recipe.category.toUpperCase()}</span></div><div class="card-meta"><span>✳ SMAKFULLT</span><span>◷ ${recipe.time}</span></div><h3>${recipe.title} <span aria-hidden="true">↗</span></h3><p>${recipe.description}</p></button>`).join('');
  empty.hidden = matches.length !== 0;
}
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  selected = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  render();
}));
search.addEventListener('input', render);
grid.addEventListener('click', event => {
  const card = event.target.closest('.card');
  if (!card) return;
  const recipe = recipes.find(item => item.title === card.dataset.title);
  document.querySelector('#dialog-content').innerHTML = `<img src="${recipe.image}" alt=""><div class="details"><div class="eyebrow">${recipe.category.toUpperCase()} · ${recipe.time.toUpperCase()}</div><h2>${recipe.title}</h2><p>${recipe.description}</p><h3>Ingredienser</h3><ul>${recipe.ingredients.map(item => `<li>${item}</li>`).join('')}</ul><h3>Gör så här</h3><p>${recipe.method}</p></div>`;
  dialog.showModal();
});
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
render();

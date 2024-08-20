
import { fetchPlaceholders,getMetadata } from '../../scripts/aem.js';
const placeholders = await fetchPlaceholders(getMetadata("locale"));

//const { firstName, lastName, gender, email, phone} = placeholders;



async function createList(jsonURL) {
    const resp = await fetch(jsonURL);
    const json = await resp.json();  
    
    //creating list
    const ul = document.createElement('ul');
    json.data.forEach((row,i) => {
       const li = document.createElement("li")
        li.textContent = row.name
        ul.appendChild(li)
    });
    return ul;
}     

export default async function decorate(block) {
    const names = block.querySelector('a[href$=".json"]');
    const parientDiv=document.createElement('div');
    parientDiv.classList.add('contries-block')

     if (names) {
        parientDiv.append(await createList(names.href));
        names.replaceWith(parientDiv);
        
    }
    
  }

  const resp = await fetch(`${jsonURL}?offset=${offset}&limit=${limit}`);
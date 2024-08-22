import { fetchPlaceholders } from '../../scripts/aem.js';

async function createList(jsonURL, offset = 1, limit = 20) {
  // Fetch data with query parameters
  const resp = await fetch(`${jsonURL}?offset=${offset}&limit=${limit}`);
  const json = await resp.json();
  // Create list
  const ul = document.createElement('ul');
  json.data.forEach((row) => {
    const li = document.createElement('li');
    li.textContent = row.name;
    ul.appendChild(li);
  });
  return { ul, total: json.total }; // Return list and total items count
}

async function updateList(parentDiv, jsonURL, page, limit) {
  const placeholders = await fetchPlaceholders();
  const { prev, next } = placeholders;
  const offset = (page - 1) * limit + 1;
  const { ul, total } = await createList(jsonURL, offset, limit);
  // Clear previous content
  parentDiv.textContent = '';
  // Append the new list
  parentDiv.appendChild(ul);
  // Create pagination controls
  const pagination = document.createElement('div');
  pagination.classList.add('pagination-controls');
  // Previous Button
  const prevButton = document.createElement('button');
  prevButton.textContent = prev;
  prevButton.onclick = () => updateList(parentDiv, jsonURL, page - 1, limit);
  prevButton.disabled = page === 1;
  pagination.appendChild(prevButton);

  // Next Button
  const nextButton = document.createElement('button');
  nextButton.textContent = next;
  nextButton.onclick = () => updateList(parentDiv, jsonURL, page + 1, limit);
  nextButton.disabled = offset + limit - 1 >= total;
  pagination.appendChild(nextButton);
  parentDiv.appendChild(pagination);
}

export default async function decorate(block) {
  const names = block.querySelector('a[href$=".json"]');
  const parentDiv = document.createElement('div');
  parentDiv.classList.add('users-block');
  if (names) {
    const currentPage = 1;
    const limit = 20; // Set the limit to 20 items per page
    // Initial list update
    await updateList(parentDiv, names.href, currentPage, limit);
    // Replace the anchor tag with the list and pagination
    names.replaceWith(parentDiv);
  }
}

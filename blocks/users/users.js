
import { fetchPlaceholders,getMetadata } from '../../scripts/aem.js';
const placeholders = await fetchPlaceholders(getMetadata("locale"));




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
export default async function decorate(block) {
    const names = block.querySelector('a[href$=".json"]');
    const parentDiv = document.createElement('div');
    parentDiv.classList.add('users-block');
    if (names) {
        let currentPage = 1;
        const limit = 20; // Set the limit to 20 items per page
        async function updateList(page) {
            currentPage = page;
            const offset = (page - 1) * limit + 1;
            const { ul, total } = await createList(names.href, offset, limit);
            // Clear previous content
            parentDiv.innerHTML = '';
            // Append the new list
            parentDiv.appendChild(ul);
            // Create pagination controls
            const pagination = document.createElement('div');
            pagination.classList.add('pagination-controls');
            // Previous Button
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Previous';
            prevButton.onclick = () => updateList(currentPage - 1);
            prevButton.disabled = currentPage === 1;
            pagination.appendChild(prevButton);

            // Next Button
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.onclick = () => updateList(currentPage + 1);
            nextButton.disabled = offset + limit - 1 >= total;
            pagination.appendChild(nextButton);
            parentDiv.appendChild(pagination);
        }
        // Initial list update
        await updateList(currentPage);
        // Replace the anchor tag with the list and pagination
        names.replaceWith(parentDiv);
    }
}
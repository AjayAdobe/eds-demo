export default function decorate(block) {
  document.title = 'EDS Assignment-1';
  block.firstElementChild.children.forEach((row) => {
    const newContent = document.createTextNode('welcome to eds banner');
    row.appendChild(newContent);
  });
}

export default function decorate(block) {
  document.title = "EDS Assignment-1"
  const cols = [...block.firstElementChild.children].forEach((row) => {

  // and give it some content
  const newContent = document.createTextNode("welcome to eds banner");

  // add the text node to the newly created div
  row.appendChild(newContent);
  } );
  
}

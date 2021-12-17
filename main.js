import ref from './js/reference.js';

function reset() {
  ref.delBtn.disabled = false;
  ref.row.textContent = '';
  for (let i = 0; i < 8; i++) {
    addColumn(i);
  }
}

reset();

function createColumn() {
  const newColumn = document.createElement('div');
  newColumn.id = ref.row.childNodes.length + 1;
  newColumn.classList.add('column');
  newColumn.appendChild(createQuad());
  return newColumn;
}

function addColumn() {
  ref.row.appendChild(createColumn());
  if (ref.row.childNodes.length) {
    ref.delBtn.disabled = false;
  }
}

function deleteColumn() {
  const select = document.getElementById('row');
  if (select.childNodes.length > 0) {
    select.removeChild(select.lastChild);
  }
  if (select.childNodes.length === 0) {
    ref.delBtn.disabled = true;
  }
}

function createQuad() {
  const newQuad = document.createElement('div');
  newQuad.classList.add('quad');
  return newQuad;
}

ref.resBtn.addEventListener('click', reset);
ref.delBtn.addEventListener('click', deleteColumn);
ref.addBtn.addEventListener('click', addColumn);

ref.row.addEventListener('click', addQuad);

function addQuad(event) {
  if (event.target.classList.contains('quad')) {
    const parent = event.target.parentElement;
    if (parent.childNodes.length > 1 && event.target !== parent.firstChild) {
      parent.removeChild(parent.lastChild);
      makeDecision(parent);
      return;
    }
    parent.appendChild(createQuad());

    makeDecision(parent);
  }
}

function makeDecision(parent) {
  if (parent.childNodes.length > 3) {
    makeBlinking(parent);
    return;
  }
  if (parent.childNodes.length < 4) {
    stopBlinking(parent);
    return;
  }
}

function makeBlinking(parent) {
  const array = [...parent.childNodes];
  const duration = array.length / 10;
  parent.textContent = '';
  array.forEach((element, index) => {
    element.style.animationDuration = `${duration}s`;
    element.style.animationDelay = `${index / 10}s`;
  });
  parent.append(...array);
}

function stopBlinking(parent) {
  const array = [...parent.childNodes];
  array.forEach((element, index) => {
    element.style = null;
  });
}

// ES modules default export (used to export single value from module and you can rename your import if you'd like to)
// use type="module" in <script src="./main.js"></script>
// export default
// import anyName from './path'

// ES modules named export (used to expor multiple values from module)
// use type="module" in <script src="./main.js"></script>
// export
// import {exactName1, exactName2} from './path'
// import {exactName1 as newName1, exactName2 as newName2} from './path'

// import anyName, {exactName1, exactName2} from './path' - both default and named import

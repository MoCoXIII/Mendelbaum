function generateTree() {
    const depth = parseInt(document.getElementById('depth').value);
    const parentsElement = document.getElementById('parents');
    const parents = parentsElement.value.split('\n').filter(line => line !== '');

    const treeContainer = document.getElementById('treeContainer');
    treeContainer.innerHTML = '';

    const resultsField = document.createElement('textarea');
    resultsField.id = 'resultsField';
    resultsField.style.resize = 'none';
    resultsField.rows = 1;
    resultsField.cols = 50;
    resultsField.placeholder = 'Results will appear here.';
    treeContainer.appendChild(resultsField);

    let tree = [];
    let allResults = [];
    let lineResults = [];

    for (let i = 0; i < parents.length; i++) {
        for (let j = i + 1; j < parents.length; j++) {
            const combinations = generateCombinations(parents[i], parents[j]);
            tree.push(`${parents[i]} + ${parents[j]} => ${combinations.join(', ')}`);
            allResults.push(...combinations);
            lineResults.push(combinations);
        }
    }

    displayTree(tree, treeContainer, lineResults);
    resultsField.value = allResults.join('\n');
}

function displayTree(tree, container, lineResults) {
    const treeElement = document.createElement('ul');

    console.log(tree);

    const textNode = document.createTextNode('');
    tree.forEach(line => {
        const lineElement = document.createElement('li');
        lineElement.textContent = line;
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy Line';
        copyButton.onclick = () => {
            const lineIndex = tree.indexOf(line);
            const linesToCopy = lineResults[lineIndex].join('\n');
            const textArea = document.createElement('textarea');
            textArea.value = linesToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        };
        const containerDiv = document.createElement('div');
        containerDiv.style.display = 'flex';
        containerDiv.style.alignItems = 'center';

        containerDiv.appendChild(copyButton);
        containerDiv.appendChild(lineElement);

        treeElement.appendChild(containerDiv);

        
        treeElement.appendChild(lineElement);
    });
    treeElement.appendChild(textNode);

    container.appendChild(treeElement);
}

function generateCombinations(parent1, parent2) {
    const combinations = [];

    for (let i = 0; i < parent1.length; i++) {
        for (let j = 0; j < parent2.length; j++) {
            const combination = parent1[i] + parent2[j];
            combinations.push(combination);
        }
    }

    const uniqueCombinations = new Set(combinations);

    return combinations;
}

function copyResults() {
    const resultsField = document.getElementById('resultsField');
    resultsField.select();
    document.execCommand('copy');
}
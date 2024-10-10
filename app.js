const options = document.querySelectorAll('.option');
const blanks = document.querySelectorAll('.blank');

let activeOption = null;
let selectedOptions = [[], []];

// Reset styles of all options
function resetOptionStyles() {
    options.forEach(option => {
        option.style.backgroundColor = '';
        option.style.color = '';
    });
}

// Blank option style
function blankOptionStyle() {
    blanks.forEach(option => {
        option.classList.add('in-blank');
    });
}

// Get the text from the option
function getOptionText(option) {
    return option.childNodes[2].textContent.trim();
}

// Drag-Drop Function
function allowDrop(event) {
    event.preventDefault();
}

function drop(event, index) {
    event.preventDefault();
    const optionId = event.dataTransfer.getData('text/plain');
    const option = document.getElementById(optionId);
    if (option) {
        addOptionToBlank(option, index);
    }
}

// Handle click event
function handleClick(index) {
    if (activeOption) {
        addOptionToBlank(activeOption, index);
        activeOption = null;
    }
}

// Add the option to the blank area
function addOptionToBlank(option, index) {
    blankOptionStyle();
    const optionText = getOptionText(option);
    if (!selectedOptions[index].includes(optionText)) {
        const styledText = `<span class="blank-option-text">${optionText}</span>`;
        blanks[index].innerHTML += styledText + ", ";
        selectedOptions[index].push(optionText);
        option.classList.add('hidden-option');  
    }
}

// Handle drag start
options.forEach(option => {
    option.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', option.id);
    });

    // Handle click to select option for clicking method
    option.addEventListener('click', () => {
        activeOption = option;
        option.style.backgroundColor = 'rgba(99, 135, 218, 0.403)';
        option.style.color = 'white';
    });
});

// Handle double-click to return one option at a time
blanks.forEach((blank, index) => {
    blank.addEventListener('dblclick', () => {
        const optionsText = blank.textContent.split(', ').filter(text => text);
        resetOptionStyles();
        if (optionsText.length > 0) {
            const lastOptionText = optionsText.pop();
            const optionToReturn = Array.from(options).find(option => getOptionText(option) === lastOptionText);
            if (optionToReturn) {
                optionToReturn.classList.remove('hidden-option');
            }
            blank.innerHTML = optionsText.map(text => `<span class="blank-option-text">${text}</span>`).join(', ') + (optionsText.length > 0 ? ', ' : '');
            selectedOptions[index].pop();
        }
    });
});

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const errorMsg = document.getElementById('error-msg');
    const importantArray = document.getElementById('important-array');
    const notImportantArray = document.getElementById('not-important-array');

    errorMsg.textContent = '';
    if (selectedOptions[0].length === 0 || selectedOptions[1].length === 0) {
        errorMsg.textContent = 'Error: Both "Important" and "Not Important" sections must have at least one option.';
        return false;
    }

    importantArray.textContent = selectedOptions[0];
    notImportantArray.textContent = selectedOptions[1];

}
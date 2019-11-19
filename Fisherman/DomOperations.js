export function getNewCatchInfo(doc) {
	const angler = doc.querySelector('#addForm > input.angler').value;
	const weight = doc.querySelector('#addForm > input.weight').value;
	const species = doc.querySelector('#addForm > input.species').value;
	const location = doc.querySelector('#addForm > input.location').value;
	const bait = doc.querySelector('#addForm > input.bait').value;
	const captureTime = doc.querySelector('#addForm > input.captureTime').value;

    if (angler && weight && species && location && bait && captureTime) {
        doc.querySelector('#addForm > input.angler').value = '';
        doc.querySelector('#addForm > input.weight').value = '';
        doc.querySelector('#addForm > input.species').value = '';
        doc.querySelector('#addForm > input.location').value = '';
        doc.querySelector('#addForm > input.bait').value = '';
        doc.querySelector('#addForm > input.captureTime').value = '';
    
        return { angler, weight, species, location, bait, captureTime };
    } else {
        throw new Error('All Fields Are Required!')
    }

}

export function parseCatchesToDom(doc, res) {
	let catches = doc.getElementById('catches');
	catches.innerHTML = ``;
	let inputData = Object.keys(res);

	inputData.forEach(input => {
		let div = doc.createElement('div');
		div.classList = 'catch';
		div.setAttribute('data-id', input);
		div.innerHTML = `
                    <label>Angler</label>
                    <input type="text" class="angler" value="${res[input].angler}">
                    <hr>
                    <label>Weight</label>      
                    <input type="number" class="weight" value="${res[input].weight}">
                    <hr>
                    <label>Species</label>
                    <input type="text" class="species" value="${res[input].species}">
                    <hr>
                    <label>Location</label>
                    <input type="text" class="location" value="${res[input].location}">
                    <hr>
                    <label>Bait</label>
                    <input type="text" class="bait" value="${res[input].bait}">
                    <hr>
                    <label>Capture Time</label>
                    <input type="number" class="captureTime" value="${res[input].captureTime}">
                    <hr>
                    <button class="update">Update</button>
                    <button class="delete">Delete</button>
        `;
		catches.appendChild(div);
	});
}

export function removeElementFromDOM(doc, id) {
	let DOMcatch = doc.querySelectorAll(`[data-id="${id}"]`)[0];
	document.getElementById('catches').removeChild(DOMcatch);
}

export function getUpdateOnCatch(doc, id) {
	let updatedCatch = doc.querySelectorAll(`[data-id="${id}"]`)[0];
	let angler = updatedCatch.querySelector('input.angler').value;
	let weight = updatedCatch.querySelector('input.weight').value;
	let species = updatedCatch.querySelector('input.species').value;
	let location = updatedCatch.querySelector('input.location').value;
	let bait = updatedCatch.querySelector('input.bait').value;
    let captureTime = updatedCatch.querySelector('input.captureTime').value;
    
    if (angler && weight && species && location && bait && captureTime) {
        doc.querySelector('#addForm > input.angler').value = '';
        doc.querySelector('#addForm > input.weight').value = '';
        doc.querySelector('#addForm > input.species').value = '';
        doc.querySelector('#addForm > input.location').value = '';
        doc.querySelector('#addForm > input.bait').value = '';
        doc.querySelector('#addForm > input.captureTime').value = '';
    
        return { angler, weight, species, location, bait, captureTime };
    } else {
        throw new Error('All Fields Are Required!')
    }
}

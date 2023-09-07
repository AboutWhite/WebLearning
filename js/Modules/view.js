
    const vocabularyList= document.getElementById("word-list");
    const overlay = document.getElementById("overlay");
    const popupClosedEvent = new CustomEvent("popupclosed");
   
    function updateView(vocabulary){
        const tableHTML = createTableHTML(vocabulary);
        vocabularyList.innerHTML = tableHTML;
    }

    function createTableHTML(data) {
        //'Wort', 'Übersetzung', 'Spalte 3', 'Tag', 'Wortart', 'Spalte 6', 'Spalte 7', 'Spalte 8', 'Spalte 9', 'Spalte 10']
        const keys = Object.keys(data[0]);
        const headers = [keys[0],keys[1]]; 
        const headerHTML = headers.map(header => `<th>${header}</th>`).join("");
        const rowsHTML = data.map(entry => {
       
        let translationValue;
            // Überprüfe die Wortart, ob es sich um einen Verb-Eintrag handelt
            if (entry[keys[4]] === "Verb") {
                // Hier werden die Werte aus den Spalten "Vergangenheit" und "Gegenwart" zusammengefügt
                translationValue = `${entry[keys[1]]} / ${entry[keys[2]]}`;
                // Füge das Icon-HTML für Verben hinzu  
                
            }else if(entry[keys[4]] === "Nomen"){
                 // Hier werden die Werte aus den Spalten "Übersetzung" und "Plural" zusammengefügt
                translationValue = `${entry[keys[1]]} / ${entry[keys[2]]}`;
            }
            const iconHTML = '<img class="cell-icon" src="./icons/File.svg" alt="Icon">'; // Icon-HTML für Verben
            const rowHTML = headers

            //in der ersten spalte steht arabische schrift darum soll die größer sein
            //schauen ob es der erste wert ist dann ist es deutsche übersetzung sonst ist es der wert in der zweiten spalte der tabelle 
                .map((header, index) => `
                <td class="${index === 1 ? 'large-text' : entry[keys[4]] === 'Verb' ? 'verb-cell' : ''}">
                ${index === 0 && entry[keys[4]] === 'Verb' ? `${entry[keys[0]]} ${iconHTML}` : index === 0 ? entry[keys[0]] : translationValue}
                </td>
                `
                )
                .join("");
            return `<tr class="table-row">${rowHTML}</tr>`;
        }).join("");
        return `
            <table>
                <thead><tr>${headerHTML}</tr></thead>
                <tbody>${rowsHTML}</tbody>
            </table>
        `;     
    } 

    function openPopup(entryVocabulary){
        //zeige overlay
        overlay.style.display = "block";

        const popup = document.createElement("div");
        popup.className = "popup";
        let popupContent = `Hello world`;
        popup.innerHTML = popupContent;
        document.body.appendChild(popup);


        //TODO zeige dden richtigen content

        createCloseButton(popup);
    }

    function createCloseButton(popup){
        const closeIcon = document.createElement("span");
        closeIcon.className = "popup-close";
        closeIcon.innerHTML = "&#10006;";
        popup.appendChild(closeIcon);
    
        // Event Listener für das Schließen des Popups
        closeIcon.addEventListener("click", function() {
            document.dispatchEvent(popupClosedEvent);
            document.body.removeChild(popup); // Entferne das Popup aus dem DOM
            overlay.style.display = "none"; // Verberge das Overlay        
        });
    }


    export{updateView, openPopup};





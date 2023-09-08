
    const vocabularyList= document.getElementById("word-list");
    const overlay = document.getElementById("overlay");
    const popupClosedEvent = new CustomEvent("popupclosed");
   
  
   
    function updateView(vocabulary,tags){
        const tableHTML = createTableHTML(vocabulary);
        vocabularyList.innerHTML = tableHTML;
    }
    function updateList(vocabulary){
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
        let popupContent="";
        //zeige overlay
        overlay.style.display = "block";

        const popup = document.createElement("div");
        popup.className = "popup";

        if(entryVocabulary.Wortart ==="Verb"){
           popupContent= createVerbContent(entryVocabulary);
        }

        popup.innerHTML = popupContent;
        document.body.appendChild(popup);

        createCloseButton(popup);
    }



    function createVerbContent(entry){
         //'Wort', 'Übersetzung', 'Spalte 3', 'Tag', 'Wortart', 'Spalte 6', 'Spalte 7', 'Spalte 8', 'Spalte 9', 'Spalte 10']
        let vergangenheit =[];
        let gegenwart = [];
        let activeParticiple = [];
        let imperative = [];
        let passive = [];

        if(entry["Spalte 6"]==="-"){
            vergangenheit = ["-","-","-","-","-","-","-","-"];
        }else{
            vergangenheit = entry["Spalte 6"].split(", ");
        }
        if(entry["Spalte 7"]==="-"){
            
            gegenwart = ["-","-","-","-","-","-","-","-"];
        }else{
            gegenwart = entry["Spalte 7"].split(", ");
        }
        if(entry["Spalte 9"]==="-"){
            activeParticiple = ["-","-","-","-","-","-","-","-"];
        }else{
            activeParticiple = entry["Spalte 9"].split(", ");
        }
        if(entry["Spalte 8"]==="-"){
            imperative = ["-","-","-","-","-","-","-","-"];
        }else{
            imperative = entry["Spalte 8"].split(", ");
        }
        if(entry["Spalte 10"]==="-"){
            passive = ["-","-","-","-","-","-","-","-"];
        }else{
            passive = entryVocabulary["Spalte 10"].split(", ");
        }


        let popupContent = ` 
            <div id="card-header">
                    <h2>${entry["Wort"]}</h2>
                    <h2> ${entry["Übersetzung"]} / ${entry["Spalte 3"]}</h2>
            </div>
            <div class="popup-content">
                <div class="left-column">
                    <div>
                        <h3 class="right-align-text">Active Participle</h3>
                        <div class="left-col-items">
                            <p class="right-align-text arabic">${activeParticiple[0]}</p>
                            <p class="right-align-text arabic">${activeParticiple[1]}</p>
                            <p class="right-align-text arabic">${activeParticiple[2]}</p>
                        </div>
                    </div>
                    <div>
                        <h3 class="right-align-text">Imperative</h3>
                        <div class="left-col-items">
                            <p class="right-align-text arabic">${imperative[0]}</p>
                            <p class="right-align-text arabic">${imperative[1]}</p>
                            <p class="right-align-text arabic">${imperative[2]}</p>
                        </div>
                    </div>
                    <div>
                        <h3 class="right-align-text">Passiv</h3>
                        <div class="left-col-items">
                            <p class="right-align-text arabic">${passive[0]}</p>
                            <p class="right-align-text arabic">${passive[1]}</p>
                            <p class="right-align-text arabic">${passive[2]}</p>
                        </div>
                    </div>
                </div>
            <div id="rc-containter">
                <div class="right-column">
                    <div class="pronouns">
                        <p class="right-align-text arabic">انا</p>
                        <p class="right-align-text arabic">نحنا</p>
                        <p class="right-align-text arabic">إنت</p>
                        <p class="right-align-text arabic">إنتي</p>
                        <p class="right-align-text arabic">إنتوا</p>
                        <p class="right-align-text arabic">هو</p>
                        <p class="right-align-text arabic">هي</p>
                        <p class="right-align-text arabic" id="last">هنّ</p>
                    </div>
                    <div id="konjugations">
                        <div>
                            <h3 class="right-align-text">Vergangenheit</h3>
                            <p class="right-align-text arabic">${vergangenheit[0]}</p>
                            <p class="right-align-text arabic">${vergangenheit[1]}</p>
                            <p class="right-align-text arabic">${vergangenheit[2]}</p>
                            <p class="right-align-text arabic">${vergangenheit[3]}</p>
                            <p class="right-align-text arabic">${vergangenheit[4]}</p>
                            <p class="right-align-text arabic">${vergangenheit[5]}</p>
                            <p class="right-align-text arabic">${vergangenheit[6]}</p>
                            <p class="right-align-text arabic">${vergangenheit[7]}</p>
                        </div>
                        <div>
                            <h3 class="right-align-text">Gegenwart</h3>
                            <p class="right-align-text arabic">${gegenwart[0]}</p>
                            <p class="right-align-text arabic">${gegenwart[1]}</p>
                            <p class="right-align-text arabic">${gegenwart[2]}</p>
                            <p class="right-align-text arabic">${gegenwart[3]}</p>
                            <p class="right-align-text arabic">${gegenwart[4]}</p>
                            <p class="right-align-text arabic">${gegenwart[5]}</p>
                            <p class="right-align-text arabic">${gegenwart[6]}</p>
                            <p class="right-align-text arabic">${gegenwart[7]}</p>
                        </div>
                    </div>
                </div>
            </div>
             `;


            return popupContent;
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



    export{updateView, openPopup,updateList};





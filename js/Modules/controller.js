import model from '/js/Modules/model.js';
import {updateView,openPopup} from '/js/Modules/view.js';
import dataService from '/js/Modules/dataService.js';



  const searchInput = document.querySelector(".search-input");
  let popup = false;

  async function  init(){
        //click listener für ui elemente
        document.addEventListener("popupclosed", function (){
          popup = false
        });
        try {
            //zuerst will ich die Vokabeln aus der csv Laden 
            const words = await dataService.fetchVocabularyData("./Data/Nomen.csv","./Data/Verben.csv");
            //wenn die daten geladen wurde will ich sie im model setzen
            model.setVocabularyData(words);
            updateView(model.vocabularyData);
            addListener();
          } catch (error) {
            console.error("fetching vocabulary data went wrong",error);
          }    
    }

    function addListener(){

      searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = dataService.getFilteredData(model.vocabularyData,searchTerm)
        model.setSelectedWords(filteredData);
        updateView(model.searchResults);   
      });

      document.querySelector("tbody").addEventListener("click", function(event) {
        //Todo ggf auslagern
        const clickedRow = event.target.closest(".table-row");
        const clickedWord = clickedRow.cells[0].textContent.trim();
        const entryVocabulary = model.vocabularyData.find(item => item.Wort === clickedWord);

        if (clickedRow && entryVocabulary.Wortart !="Nomen" && popup == false) {
            openPopup(entryVocabulary);   
            popup=true;
        }
      });

    }

   

   
   


export {init};
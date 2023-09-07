//liest die daten aus de csv und gibt sie als array mit Objekten zurück
const dataService = {

  async fetchVocabularyData(nounFile, verbFile) {
    const nounF = await fetch(nounFile);
    const verbF = await fetch (verbFile);
    const csvNouns= await nounF.text();
    const csvVerbs = await verbF.text();

    const nouns = this.parseCSV(csvNouns);
    const verbs = this.parseCSV(csvVerbs);
    const words = nouns.concat(verbs);
    
    return words;
  },

   parseCSV(csvText) {
    //die daten der csv werden mit diesen keys eingelesen
    const tableHead1 = "Wort";
    const tableHead2 = "Übersetzung";
    const tableHead3 = "Spalte 3";
    const tableHead4 = "Tag";
    const tableHead5 = "Wortart";
    const tableHead6 = "Spalte 6";
    const tableHead7 = "Spalte 7";
    const tableHead8 = "Spalte 8";
    const tableHead9 = "Spalte 9";
    const tableHead10 = "Spalte 10";

    const headers = [tableHead1, tableHead2,tableHead3,tableHead4, tableHead5, tableHead6, tableHead7, tableHead8,tableHead9,tableHead10]; 
    const rows = Papa.parse(csvText, {
        delimiter: ",",
        header: false, // Deaktiviere die Verwendung der ersten Zeile als Überschriften
        dynamicTyping: true
    }).data.slice(1); // Überspringe die erste Zeile;
    return rows.map(row => {
        const entry = {};
        headers.forEach((header, index) => {
            entry[header] = row[index];
        });
        return entry;
    });
  },

  //bekommt alle daten vom model und den searchterm und gibt dann eine auswahl zurück die auf den suchterm passt
  getFilterData(data, searchTerm){
    const filteredData = data.filter(entry =>
      Object.values(entry).some(value =>
          value.toString().toLowerCase().includes(searchTerm))
    );
    return filteredData;
  }
  
}

export default dataService;










  
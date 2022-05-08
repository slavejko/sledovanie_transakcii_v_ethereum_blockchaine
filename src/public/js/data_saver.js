document.getElementById("myBtn").onclick = function(){

    // getting values of variables from index.html

    var wallet = document.getElementById("myText").value;
    var width = document.getElementById("mySirka").value;
    var depth = document.getElementById("myHlbka").value;
    var direction = document.getElementById("mySmer").value;
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;

    // setting of variables to local storage

    localStorage.setItem("wallet", wallet);
    localStorage.setItem("width", width);
    localStorage.setItem("depth", depth);
    localStorage.setItem("direction", direction);
    localStorage.setItem("inputStartDate", (new Date(startDate)).getTime());                // convert into timestamp
    localStorage.setItem("inputEndDate", ((new Date(endDate)).getTime() + 86399999));       // +86 399 999ms => End of given day

    var proceed = true;

    // necessary checks
  
    if(wallet == ""){
        alert("Nezadaná peňaženka. Prosím, zadajte peňaženku na hľadanie");
        proceed = false
    }else if(direction == ""){
        alert("Nezadaný smer. Prosím, zadajte smer pre pokračovanie.");
        proceed = false;
    }else if(direction != "to" && direction != "from"){
        alert(`Nesprávne zadaný smer - bolo zadané ${direction}. Akceptované sú iba hodnoty "to" alebo "from"`);
        proceed = false;
    }

    if(localStorage.getItem("inputEndDate") < localStorage.getItem("inputStartDate")){
        alert(`Nesprávne zadaný dátum. Konečný dátum nemôže byť menší ako začiatočný dátum.`)
        proceed = false;
    }

    if(proceed){
        window.open('../result.html','_blank');                                                // opens the result page in the new tab
    }
}

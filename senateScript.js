var checkboxes = document.querySelectorAll("input[type=checkbox]");
checkboxes.forEach(checkbox => {
    checkbox.addEventListener( 'change', function(e) {
        if(this.checked) {
            app.filterParty.push(this.value)
        } else {
            app.filterParty.splice(app.filterParty.indexOf(this.value),1)
        }
        loadDataFunction();
    });
})
document.getElementById("states").innerHTML = `<option value=""></option>`
document.getElementById("states").addEventListener( 'change', function(e) {
    app.filterState = this.value;
    loadDataFunction();
});
                

const fillStateOptions = (state) => {
    if(!app.allStates.includes(state)){
        app.allStates.push(state)
        var option = 
        `<option value="${state}">${state}</option>`;
        document.getElementById("states").innerHTML += option
    }
}

const loadDataFunction = () =>{
    document.getElementById("tbody").innerHTML = ''
    
    app.responseData.results.forEach(result => {
        let members = result.members;
        if(app.filterParty.length > 0) members = members.filter(member => app.filterParty.includes(member.party))
        if(app.filterState.length > 0) members = members.filter(member => app.filterState.includes(member.state))
        members.forEach((element,i) => {
            fillStateOptions(element.state);
            var senate = {
                url: element.url,
                fullName : `${element.first_name ? `${element.first_name} ` : ``}${element.middle_name ? `${element.middle_name} ` : ``}${element.last_name ? `${element.last_name} ` : ``}`,
                party : element.party,
                state : element.state,
                seniority : element.seniority,
                percentage : `${element.votes_with_party_pct}%`,
            };
            app.trList.push(senate)
       
        });
    });
}

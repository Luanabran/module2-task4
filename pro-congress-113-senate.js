
var app = new Vue({  
  el: '#app',
  data:{
    trList : [],
    filterParty : [],
    allStates : [],
    filterState : '',
    trList : [],
    responseData:{},
    statisticsData: {
      D: {
        quantity:0,
        percVotedWPartyQuantity:0,
        avgVoted:0,
    },
    R: {
        quantity:0,
        percVotedWPartyQuantity:0,
        avgVoted:0,
    },
    I:{
        quantity:0,
        percVotedWPartyQuantity:0,
        avgVoted:0,
    },
    T:{
        quantity:0,
        percVotedWPartyQuantity:0,
        avgVoted:0,
        mostEngaged:[],
        leastEngaged:[],
        mostLoyal:[],
        leastLoyal:[]
    }  
  }  
  },  
  
}); 

var url = "https://api.propublica.org/congress/v1/113/senate/members.json"
var data;
fetch(url,{
  headers: { "X-API-Key": "sYw5NQgXargbfxaHrlXKP3OYyIoPZvB0p1MEprDm" }
})
.then(response => response.json())
.then(resData => {
  app.responseData = resData;
  loadDataFunction()
});
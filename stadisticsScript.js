const loadDataFunction = () =>{
    app.responseData.results.forEach(result => {
        let members = result.members;
        app.statisticsData.T.quantity = members.length;

        let votes = []
        members.forEach((element,i) => {
            app.statisticsData.T.percVotedWPartyQuantity += element.votes_with_party_pct
            var senate = {
                fullName : `${element.first_name ? `${element.first_name} ` : ``}${element.middle_name ? `${element.middle_name} ` : ``}${element.last_name ? `${element.last_name} ` : ``}`,
                party : element.party,
                percentage : element.votes_with_party_pct,
                missedVotes : element.missed_votes
            };

            switch (element.party) {
                case 'D':
                    app.statisticsData.D.quantity++
                    app.statisticsData.D.percVotedWPartyQuantity += element.votes_with_party_pct
                    break;
                case 'R':
                    app.statisticsData.R.quantity++
                    app.statisticsData.R.percVotedWPartyQuantity += element.votes_with_party_pct
                    break;
                case 'ID':
                    app.statisticsData.I.quantity++
                    app.statisticsData.I.percVotedWPartyQuantity += element.votes_with_party_pct
                break;
                default:
                    break;
            }
            
            votes.push({quantity:element.missed_votes, partyPct: element.votes_with_party_pct, partyVotes: Math.round(element.total_votes * element.votes_with_party_pct / 100),name:senate.fullName, votesWParty: element.missed_votes_pct})

            
            
        });

        let tPer = Math.ceil(app.statisticsData.T.quantity * 0.1)

        app.statisticsData.D.avgVoted = (app.statisticsData.D.percVotedWPartyQuantity / app.statisticsData.D.quantity) || 0
        app.statisticsData.R.avgVoted = (app.statisticsData.R.percVotedWPartyQuantity / app.statisticsData.R.quantity) || 0
        app.statisticsData.I.avgVoted = (app.statisticsData.I.percVotedWPartyQuantity / app.statisticsData.I.quantity) || 0
        app.statisticsData.T.avgVoted = (app.statisticsData.T.percVotedWPartyQuantity / app.statisticsData.T.quantity) || 0
        
        votes.sort((a, b) => b.votesWParty - a.votesWParty);
        app.statisticsData.T.leastEngaged = votes.slice(0,tPer)
        app.statisticsData.T.mostEngaged = votes.slice(Math.ceil(votes.length - tPer, 0))
        app.statisticsData.T.mostEngaged.sort((a, b) => a.votesWParty - b.votesWParty);

        votes.sort((a, b) => b.partyPct - a.partyPct);
        app.statisticsData.T.mostLoyal = votes.slice(0,tPer)
        app.statisticsData.T.leastLoyal = votes.slice(Math.ceil(votes.length - tPer, 0))
        app.statisticsData.T.leastLoyal.sort((a, b) => a.partyPct - b.partyPct);

      

    });
}
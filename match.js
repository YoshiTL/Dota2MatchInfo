var data1;
var json;
function getMatch(matchid, apikey) {
	var url = 'https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id=' + matchid + '&key=' + apikey +'&start_at_match_id=0&result=1';
	$.getJSON("http://query.yahooapis.com/v1/public/yql",
	  {
		q:      "select * from json where url=\"" + url + "\"",
		format: "json"
	  },
	  function(data){
		handleData(data.query.results);
		data1 = data;
	  }
	);
}

function secondsTimeSpanToHMS(s) {
    var h = Math.floor(s/3600); 
    s -= h*3600;
    var m = Math.floor(s/60); 
    s -= m*60;
    return h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
}

function unixToDate(unix) {
	date = new Date(unix * 1000);
	return date.toLocaleString();
} 

function handleData(data) {
	i = 1;
	x = 0;
	
	$('#match_id').html(data.result.match_id);
	$('#season').html(data.result.season);
	$('#gametime').html(secondsTimeSpanToHMS(data.result.duration));
	$('#date').html(unixToDate(data.result.starttime));
	if(data.result.radiant_win) $('#winner').html("Radiant won");
	else $('#winner').html("Dire won");
	players = data.result.players;
	$('.player').children().each(function (a, val) {
		switch(i)
		{
			case 1:
				content = data.result.players[x].account_id;
			break;
			case 2:
				content = "<img src='" + heroes[data.result.players[x].hero_id] + "'/>";
			break;
			case 3:
				content = data.result.players[x].level;
			break;
			case 4:
				content = data.result.players[x].kills;
			break;
			case 5:
				content = data.result.players[x].deaths;
			break;
			case 6:
				content = data.result.players[x].assists;
			break;
			case 7:
				content = "<img width='59' src='" + getItemPicture(data.result.players[x].item_0) + "'/>" +
						  "<img width='59' src='" + getItemPicture(data.result.players[x].item_1) + "'/>" +
						  "<img width='59' src='" + getItemPicture(data.result.players[x].item_2) + "'/>" +
						  "<img width='59' src='" + getItemPicture(data.result.players[x].item_3) + "'/>" +
						  "<img width='59' src='" + getItemPicture(data.result.players[x].item_4) + "'/>" +
						  "<img width='59' src='" + getItemPicture(data.result.players[x].item_5) + "'/>";
			break;
			case 8:
				content = data.result.players[x].last_hits;
			break;
			case 9:
				content = data.result.players[x].denies;
			break;
			case 10:
				content = data.result.players[x].gold_per_min;
			break;			
			case 11:
				content = data.result.players[x].xp_per_min;
			break;
			default:
			break;
		}
		val.innerHTML = content;
		i++;
		if(i > 11) {
			i = 1;
			x++;
		}
	})
/* 	
	for(player in players) {
		alert(players[player]);
	} */
}

function getItemPicture(itemid) {
	if(items[itemid] != undefined) return items[itemid]
	else return "http://i.imgur.com/ABuAzXz.png";
}


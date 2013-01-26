function getMatchList(id, apikey, player, playername) {
	if(player == undefined) player = '';
	window.location.hash = apikey + ";" + id + ";" + player;
	var url = 'https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?matches_requested=100&start_at_match_id='+id+'&format=json&key='+apikey + '&account_id=' + player + '&player_name=' + playername;
	
	$.getJSON("http://query.yahooapis.com/v1/public/yql",
	  {
		q:      "select * from json where url=\"" + url + "\"",
		format: "json"
	  },
	  function(data){
		handleData(data.query.results, apikey);
	  }
	);
	
}
function unixToDate(unix) {
	date = new Date(unix * 1000);
	return date.toLocaleString();
} 
function handleData(data, apikey) {
	matches = data.result.matches
	for( key in matches) {
		radiant = '';
		dire = '';
		match_id = matches[key].match_id;
		matchid = "<a href='match.html#" + apikey + ";" + matches[key].match_id + "'>" + matches[key].match_id + "</a>";
		lobbytype = matches[key].lobby_type;
		starttime = unixToDate(matches[key].start_time);
		for( z in matches[key].players) {
			if(z < 5) radiant = radiant + "<img src='" +heroes[matches[key].players[z].hero_id] +"'/>";
			else dire = dire + "<img src='" +heroes[matches[key].players[z].hero_id] +"'/>";
		}
		$('#matchlist tr:first').after('<tr><td>'+matchid+'</td><td>'+starttime+'</td><td>'+radiant+'</td><td>'+dire+'</td><td>'+lobbytype+'</td></tr>');
	}
	$('#nextpage').val((match_id-1));
}

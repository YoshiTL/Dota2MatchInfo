var number = 0;
var lastmatchid;
var timesarray = new Array();
var maxdate2;
function getMatchList(id, apikey, player, playername, maxdate) {
	querydate = '';
	console.log(maxdate);
	if(maxdate !== undefined) querydate = 'date_max=' + maxdate + '&';
	$("#info").html("The lastest 500 matches are getting loaded.");
	if(player == undefined) player = '';
	window.location.hash = apikey + ";" + maxdate + ";" + player;
	var url = 'https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?' + querydate + 'matches_requested=100&start_at_match_id='+id+'&format=json&key='+apikey + '&account_id=' + player + '&player_name=' + playername;

		
	$.getJSON("http://query.yahooapis.com/v1/public/yql",
	  {
		q:      "select * from json where url=\"" + url + "\"",
		format: "json"
	  },
	  function(data){
		if(data.query.results == null) getMatchList(id, apikey, player, playername);
		handleData(data.query.results, apikey, player, playername, maxdate);
	  }
	);
	
}
function unixToDate(unix) {
	date = new Date(unix * 1000);
	return date.toLocaleString();
} 


function handleData(data, apikey, player, playername) {	
	if(data.result.results_remaining == 0) {
		$('#info').html(number + " Matches were loaded.");
		timesarray.sort();
		maxdate2 = timesarray.shift();
		$('#maxdate').val(maxdate2);
		number = 0;
		return; 
	} 
	matches = data.result.matches
	for( key in matches) {
		radiant = '';
		dire = '';
		match_id = matches[key].match_id;
		matchid = "<a href='match.html#" + apikey + ";" + matches[key].match_id + "'>" + matches[key].match_id + "</a>";
		lobbytype = matches[key].lobby_type;
		timesarray.push(matches[key].start_time);
		starttime = unixToDate(matches[key].start_time);
		for( z in matches[key].players) {
			if(z < 5) radiant = radiant + "<img src='" +heroes[matches[key].players[z].hero_id] +"'/>";
			else dire = dire + "<img src='" +heroes[matches[key].players[z].hero_id] +"'/>";
		}
		$('#matchlist tr:first').after('<tr class="matches"><td>'+matchid+'</td><td>'+starttime+'</td><td>'+radiant+'</td><td>'+dire+'</td><td>'+lobbytype+'</td></tr>');
		number++;
	}
	lastmatchid = match_id-1;

	getMatchList(lastmatchid, apikey, player, playername, maxdate2)
}
function clearMatches() {
	$('tr[class="matches"]').remove();
}
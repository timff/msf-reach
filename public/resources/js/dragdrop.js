function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  var tweetDivId = ev.srcElement.id;
  if (ev.srcElement.id.split('-')[0] === 'twitter'){
    tweetDivId = ($('#'+ev.srcElement.id).parent()[0].id);
  }
  ev.dataTransfer.setData("tweetDivId", tweetDivId);
}

function dropSaveTweet(ev) {
  ev.preventDefault();
  var tweetDivId = ev.dataTransfer.getData("tweetDivId");
  console.log(eventReportLink);
  var tweetEventReportLink = eventReportLink.replace("&", "%26");
  console.log('make put request for save tweet:'+tweetDivId+JSON.stringify(currentEventProperties));
  $('#savedTweets').prepend(document.getElementById(tweetDivId));
  $('#'+tweetDivId).append('<a class="btn btn-primary" href="https://twitter.com/intent/tweet?in_reply_to='+tweetDivId+'&text=Please+send+further+information+'+tweetEventReportLink+'">Reply</a><hr>');

  if (currentEventProperties.metadata.saved_tweets){
    currentEventProperties.metadata.saved_tweets.push({"tweetId":tweetDivId, "html":tweetIdHTMLMap[tweetDivId]});
  }
  else {
    currentEventProperties.metadata.saved_tweets = [{"tweetId":tweetDivId, "html":tweetIdHTMLMap[tweetDivId]}];
  }
  console.log(currentEventProperties.metadata.saved_tweets);
  var body = {
    "status":"active",
    "metadata":{"saved_tweets":currentEventProperties.metadata.saved_tweets}
  };
  $.ajax({
    type: "PUT",
    url: "/api/events/" + currentEventProperties.id,
    data: JSON.stringify(body),
    contentType: 'application/json'
  }).done(function( data, textStatus, req ){
    console.log('save tweet on server');
  }).fail(function (reqm, textStatus, err){
    alert(err);
  });
}

function dropRemoveTweet(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var tweet = ev.dataTransfer.getData("tweet");

  console.log('make put request for save tweet: '+tweet);
  ev.target.appendChild(document.getElementById(data));
}

$(window).on("load", function(){
  $('.li').css({'border':'1px solid red'});
});

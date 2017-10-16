<?php

// POLL.PIZZA pizza_api.php
// Created by Jacob Bates s3490602
// Last updated: 17/10/2017

include('app_functions.php');

if (isset($_GET['poll'])){

	//API Request for Poll 

	$url = cleanse($_GET['poll']);
	$poll = fetchPollbyURL($url);
	echo json_encode($poll);

}elseif(isset($_GET['votes'])){

	//API Request for Votes

	$url = cleanse($_GET['votes']);
	$poll_id = fetchPollIDbyURL($url);
	$votes = fetchVotesbyPoll($poll_id);
	echo json_encode($votes);

}elseif(isset($_GET['recent'])){

	//API Request for Recent Polls
	$recent_polls = fetchRecentPolls();
	echo json_encode($recent_polls);

}elseif(isset($_GET['create_vote'])){

	//API Request to create vote
	createVote();


}elseif(isset($_GET['create_poll'])){

	//API Request to create poll
	createPoll();


}else{

	//No API Request

	echo 'No poll specified. Use ?poll=url or ?votes=url';

}

?>
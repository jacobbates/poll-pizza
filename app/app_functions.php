<?php

//Function cleanse input / strip speacial chars
function cleanse($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

//Fetch IP
function fetchIP(){
	$ip_address = null;
	if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    	$ip_address = $_SERVER['HTTP_CLIENT_IP'];
	}
	//whether ip is from proxy
	elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
		$ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
	}
	//whether ip is from remote address
	else {
		$ip_address = $_SERVER['REMOTE_ADDR'];
	}
	return $ip_address;
}

//Function fetch Poll by its ID
function fetchPollbyID($poll_id) {

	include('sql_config.php');
	
	$poll = array();

	try {

		$dbh = new PDO($dbconnStr,$dbuser,$dbpassword);
	    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	    //SQL
	    $sql =  'SELECT *';
	    $sql .= ' FROM poll';
	    $sql .= ' WHERE poll_id = ?;';

	    $sth = $dbh->prepare($sql);
	    $params = array($poll_id);
	    $sth->execute($params);

		//loop results
	    while ($row = $sth->fetch()){
	    	$poll = array(
					"poll_id" => $row['poll_id'],
					"title" => $row['title'],  
					"question" => $row['question'],
					"url" => $row['url'],
					"creator" => $row['creator'],
					"poll_timestamp" => $row['poll_timestamp'],
					"poll_ip" => $row['poll_ip'],
					"option_1" => $row['option_1'],
					"option_2" => $row['option_2'],
					"option_3" => $row['option_3'],
					"option_4" => $row['option_4']
			);
	    }

	    $dbh = null; //close db connection
	}
    catch(PDOException $e){
      echo "Connection failed: " . $e->getMessage();
    }

	return $poll;

}

//Function fetch Poll ID by its URL
function fetchPollIDbyURL($url) {

	include('sql_config.php');
	
	$poll_id = null;

	try {

		$dbh = new PDO($dbconnStr,$dbuser,$dbpassword);
	    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	    //SQL
	    $sql =  'SELECT *';
	    $sql .= ' FROM poll';
	    $sql .= ' WHERE url = ?';
	    $sql .= ' ORDER BY poll_id DESC';
	    $sql .= ' LIMIT 1;';

	    $sth = $dbh->prepare($sql);
	    $params = array($url);
	    $sth->execute($params);

		//loop results
	    while ($row = $sth->fetch()){

			$poll_id = $row['poll_id'];
	    }

	    $dbh = null; //close db connection
	}
    catch(PDOException $e){
      echo "Connection failed: " . $e->getMessage();
    }

	return $poll_id;

}


//Function fetch Poll by its URL
function fetchPollbyURL($url) {
	
	include('sql_config.php');

	$poll = array();

	try {

		$dbh = new PDO($dbconnStr,$dbuser,$dbpassword);
	    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	    //SQL
	    $sql =  'SELECT *';
	    $sql .= ' FROM poll';
	    $sql .= ' WHERE url = ?;';

	    $sth = $dbh->prepare($sql);
	    $params = array($url);
	    $sth->execute($params);

		//loop results
	    while ($row = $sth->fetch()){
	    	$poll = array(
					"poll_id" => $row['poll_id'],
					"title" => $row['title'],  
					"question" => $row['question'],
					"url" => $row['url'],
					"creator" => $row['creator'],
					"poll_timestamp" => $row['poll_timestamp'],
					"poll_ip" => $row['poll_ip'],
					"option_1" => $row['option_1'],
					"option_2" => $row['option_2'],
					"option_3" => $row['option_3'],
					"option_4" => $row['option_4']
			);
	    }

	    $dbh = null; //close db connection
	}
    catch(PDOException $e){
      echo "Connection failed: " . $e->getMessage();
    }

	return $poll;

}

//Function fetch recent Polls (Specify Limit)
function fetchRecentPolls() {
	
	include('sql_config.php');

	$recent_polls = array();
	$poll = array();

	try {

		$dbh = new PDO($dbconnStr,$dbuser,$dbpassword);
	    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	    //SQL
	    $sql =  'SELECT *';
	    $sql .= ' FROM poll';
	    $sql .= ' ORDER BY poll_id DESC';
	    $sql .= ' LIMIT 5;';

	    $sth = $dbh->prepare($sql);
	    $sth->execute();

		//loop results
	    while ($row = $sth->fetch()){
	    	$poll = array(
					"poll_id" => $row['poll_id'],
					"title" => $row['title'],  
					"question" => $row['question'],
					"url" => $row['url'],
					"creator" => $row['creator'],
					"poll_timestamp" => $row['poll_timestamp'],
					"poll_ip" => $row['poll_ip'],
					"option_1" => $row['option_1'],
					"option_2" => $row['option_2'],
					"option_3" => $row['option_3'],
					"option_4" => $row['option_4']
			);
			array_push($recent_polls,$poll);
	    }

	    $dbh = null; //close db connection
	}
    catch(PDOException $e){
      echo "Connection failed: " . $e->getMessage();
    }

	return $recent_polls;

}

//Function fetch Votes by its ID
function fetchVotesbyPoll($poll_id) {
	
	include('sql_config.php');

	$votes = array();
	$newvote = array();

	try {

		$dbh = new PDO($dbconnStr,$dbuser,$dbpassword);
	    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	    //SQL
	    $sql =  'SELECT *';
	    $sql .= ' FROM vote';
	    $sql .= ' WHERE poll_id = ?;';

	    $sth = $dbh->prepare($sql);
	    $params = array($poll_id);
	    $sth->execute($params);

		//loop results
	    while ($row = $sth->fetch()){
	    	$newvote = array(
					"vote_id" => $row['vote_id'],
					"poll_id" => $row['poll_id'],  
					"voter" => $row['voter'],
					"vote_timestamp" => $row['vote_timestamp'],
					"vote_ip" => $row['vote_ip'],
					"vote" => $row['vote']
			);
			array_push($votes,$newvote);
	    }

	    $dbh = null; //close db connection
	}
    catch(PDOException $e){
      echo "Connection failed: " . $e->getMessage();
    }

	return $votes;

}

//API Function to create a Poll
function createPoll() {
	
	$errors = array();
	$data = array();

	$input = json_decode(file_get_contents("php://input"));

	//Title
	if (isset($input->title)){
	  $title = cleanse($input->title);
	}else{
	  $title = '';
	}

	//Question
	if (isset($input->question)){
	  $question = cleanse($input->question);
	}else{
	  $question = '';
	}

	//URL Text
	if (isset($input->url)){
	  $url = cleanse($input->url);
	}else{
	  $url = '';
	}

	//Creator
	if (isset($input->creator)) {
	  $creator = cleanse($input->creator);
	}else{
	  $creator = 'Anonymous';
	}
	if ($creator === '') {
	  $creator = 'Anonymous';
	}

	// Get Creator's IP address
	$poll_ip = fetchIP();

	//Option 1
	if (isset($input->option_1)){
	  $option_1 = cleanse($input->option_1);
	}else{
	  $option_1 = '';
	}

	//Option 2
	if (isset($input->option_2)){
	  $option_2 = cleanse($input->option_2);
	}else{
	  $option_2 = '';
	}

	//Option 3
	if (isset($input->option_3)) {
	  $option_3 = cleanse($input->option_3);
	}else{
	  $option_3 = null;
	}
	if ($url === '') {
	  $option_3 = null;
	}

	//Option 4
	if (isset($input->option_4)) {
	  $option_4 = cleanse($input->option_4);
	}else{
	  $option_4 = null;
	}
	if ($url === '') {
	  $option_4 = null;
	}

	//VALIDATE INPUT
	if ($title === '') {
	  $errors['title'] = ' Title can\'t be empty!';
	}
	if (strlen($title) < 3) {
	  $errors['title'] = ' Minimum 3 characters!';
	}
	if ($question === '') {
	  $errors['question'] = ' Question can\'t be empty!';
	}
	if (strlen($question) < 4) {
	  $errors['question'] = ' Minimum 4 characters!';
	}
	if ($url === '') {
	  $errors['url'] = ' Specify a URL!';
	}
	if ($url === 'pizza') {
	  $errors['url'] = ' Reserved URL!';
	}
    if ($url == trim($url) && strpos($url, ' ') !== false) {
      $errors['url'] = ' Can\'t contain spaces!';
	}
	if (strlen($url) < 3) {
	  $errors['url'] = ' Minimum 3 characters!';
	}
	if (strlen($url) > 12) {
	  $errors['url'] = ' Max 12 characters!';
	}
	if ($option_1 === '') {
	  $errors['option_1'] = ' Can\'t be empty!';
	}
	if ($option_2 === '') {
	  $errors['option_2'] = ' Can\'t be empty!';
	}
	if ($option_3 == null && $option_4 !== null) {
	  $errors['option_3'] = ' Can\'t be skipped!';
	}

	if (!empty($errors)) {
	  //Validation errors:
	  $data['success'] = false;
	  $data['errors']  = $errors;
	  $data['result'] = 'Hmm... check that again!';
	}else{
	  //No errors in errors array (validated)

	  try {

	    //No validation errors
	    include('sql_config.php');

	    $dbh = new PDO($dbconnStr,$dbuser,$dbpassword);
	    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	    //SQL
	    $sql =  "INSERT INTO poll(title,question,url,creator,poll_ip,option_1,option_2,option_3,option_4)";
	    $sql .= " VALUES(?,?,?,?,?,?,?,?,?);";

	    $sth = $dbh->prepare($sql);
	    $params = array($title,$question,$url,$creator,$poll_ip,$option_1,$option_2,$option_3,$option_4);
	    $sth->execute($params);

	    $dbh = null; //close db connection
	    $data['success']= true;
	    $data['result'] = 'Your poll has been created!';

	  }
	  catch(PDOException $e){

	    error_log("Connection failed: " . $e->getMessage());
	    $data['success']= false;
	    $data['result'] = 'Uh-oh, something went wrong! (SQL failed to execute)';

	  }

	}

	header('Content-Type: application/json');
	echo json_encode($data);

}

//API Function to create a Vote
function createVote() {

	$errors = array();
	$data = array();

	$input = json_decode(file_get_contents("php://input"));

	if (isset($input->poll_id)) {
	  $poll_id = cleanse($input->poll_id);
	}else{
	  $poll_id = null;
	}

	if (isset($input->voter)) {
	  $voter = cleanse($input->voter);
	}else{
	  $voter = 'Anonymous';
	}
	if ($voter === '') {
	  $voter = 'Anonymous';
	}

	if (isset($input->vote)) {
	  $vote = cleanse($input->vote);
	}else{
	  $vote = null;
	}

	// Get Voter's IP address
	$vote_ip = fetchIP();


	//VALIDATE INPUT
	if ($vote!='1'&&$vote!='2'&&$vote!='3'&&$vote!='4') {
	  $errors['vote'] = ' You didn\'t vote!';
	}
	if (!is_numeric($poll_id)) {
	  $errors['vote'] = ' poll ID error!';
	}

	if (!empty($errors)) {
	  //Validation errors:
	  $data['success'] = false;
	  $data['errors']  = $errors;
	  $data['result'] = 'Uh-oh, something went wrong!';
	}else{
	  //No errors in errors array (validated)

	  try {

	    //No validation errors
	    include('sql_config.php');

	    $dbh = new PDO($dbconnStr,$dbuser,$dbpassword);
	    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	    //SQL
	    $sql =  "INSERT INTO vote(poll_id,voter,vote_ip,vote)";
	    $sql .= " VALUES(?,?,?,?);";

	    $sth = $dbh->prepare($sql);
	    $params = array($poll_id,$voter,$vote_ip,$vote);
	    $sth->execute($params);

	    $dbh = null; //close db connection
	    $data['success']= true;
	    $data['result'] = 'Your vote has been submitted!';

	  }
	  catch(PDOException $e){

	    error_log("Connection failed: " . $e->getMessage());
	    $data['success']= false;
	    $data['result'] = 'Uh-oh, something went wrong! (SQL failed to execute)';

	  }

	}

	header('Content-Type: application/json');
	echo json_encode($data);

}

?>
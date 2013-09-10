<?php

require_once(dirname(__FILE__)."/include/include.php");
$db = DBSingleton::getInstance();

$u = quote($_REQUEST["username"]);
$p = quote($_REQUEST["password"]);

$ret = $db->DBSelect("sponsors", "username={$u} and password={$p}");
if(count($ret)){
    $id = $ret[0]["id"];
    $sp = loadSponsor($id);
    if($sp["info"]["is_closed"] == 1){
	print "Your account is deactive. Please contact the support!";
	die();
    }
    $_SESSION["loginInfo"] = $sp;
    print "OK";
}else{
    print "Invalid Login!";
}
?>

<?php


/**
 * @package	Aseman
 * @subpackage	Util
 */
class DBSingleton{
	public static function getInstance()
        {
		global $_db;
		if(!isset($_db)){
		    if(defined('UNIT_TESTING'))
			$_db = new DB(DB_TEST_SERVER, DB_TEST_NAME);
		    else
			$_db = new db(DB_SERVER,DB_NAME);
		}
		return $_db;
	}
}

/**
 * @package	Aseman
 * @subpackage	Util
 */
class DB{

    // check connection (true or false)
    protected $isconnect;

    protected $server;
    protected $dbname;


    // transaction fields
    protected $is_in_transaction;
    protected $transaction_query;

    public $resultArray;
    private $resultSet;
    private $selectArray;


    /** class construcror
    * @access 	public
    * @param	string $server=DB_SERVER
    * @param 	string $dbname=DB_NAME
    * @return 	void
    */
    public function __construct($server = DB_SERVER, $dbname = DB_NAME){
	$this->is_in_transaction = 0;
	$this->transaction_query = "";
	$this->server = $server;
	$this->dbname = $dbname;
	$this->connect($server, $dbname);
    }

    /** class destrucror
    * @access 	public
    * @return 	void
    */
    public function __destruct(){
	/*
	    class destructor
	*/
	if($this->is_in_transaction) {
	    toLog("DB object deleted while still in transaction.");
	}
    }

    /**
    * public connect method
    * can throw exception
    * @access 	public
    * @param	string $server
    * @param 	string $dbname
    * @return 	void
    */
    private function connect($server,$dbname){
	$this->link = mysql_connect('localhost','root','reza');
	$ret = mysql_query("use liwono;");
	if(! $this->link)
	     throw new Exception("DB_CONNECTION_ERROR");
       else
           $this->isconnect = true;
    }

    /**
    * public dbInset method:
    * create and exec Query
    * @access 	public
    * @param 	string $table : table name
    * @param 	array $arg: an array of fields: (field_name => value)
    */
    public function dbInsert($table,$arg){
        $str = "insert into ".$table." (";
        $i=0;
        foreach (array_keys($arg) as $key){
            $i++;
            if ($i==1) $str .=$key;
                else $str .= ",".$key;
        }

	$i=0;

        $str .= ") values (";
        foreach ($arg as $key){
            $i++;
            if ($i==1) $str .= $key;
                else $str .= "," . self::translateVar($key);
        }
        $str .= ")";

	if($this->is_in_transaction){
	$this->transaction_query .= $str . ";\n";
	    return;
	}

	return $this->query($str);
    }

    /**
    * public dbUpdate method:
    * ctreate and exceute update query
    * @access	public
    * @param 	string $table : table name
    * @param 	array $artgs : an array of fields: (field_name => value)
    * @param 	$condition : query condition (can be string or SQLCondition object)
    * @return 	$boolean
    */

    public function dbUpdate($table,$arg,$condition=""){
        $i=0;
	$pairs = array();
        foreach (array_keys($arg) as $key){
	    $pairs[] = $key." = ". self::translateVar($arg[$key]);
        }

	$str = "update ".$table." set " . implode($pairs, ",") . " ";


	if(get_class($condition) == "SQLCondition"){
    	    $str .= "where ".$condition->Get();
	}else if(is_string($condition)){
	    $str .= "where ".$condition;
	}
	if($this->is_in_transaction){
	    $this->transaction_query .= $str . ";\n";
	    return;
	}
        return $this->query($str);
    }

    /**
    *  dbDelete method:
    * create a PGSOL delete query and excute it
    * @access	public
    * @param 	string	$table : table name
    * @param 	$condition : query condition (can be string or SQLCondition object)
    * @return 	$boolean
    */
    public function dbDelete($table, $condition){
        $str = "delete from ".$table." where ";
	if((get_class($condition)) == "SQLCondition"){
	    $str .= $condition->Get();
	}else{
	    $str .= $condition;
	}

	if($this->is_in_transaction){
	    $this->transaction_query .= $str . ";\n";
	    return;
	}
        return $this->query($str);
    }

    /**
    *   dbSelect method:
    *	create and exec a select PGSQL query
    *	return an array of resault
    * 	@access		public
    *	@param 		$table : table name
    *	@param		$fields (optional): array af fileds
    *	@param		$condition (optional) : query condition (can be an string condition or SOLCondition object)
    *	@param		$orderby (optional) : order by field (string)
    *	@param		$from (optional) : int
    *	@param		$limit (optional) : int
    *	@return		array $result
    */
    public function dbSelect($table, $condition="", $orderby="", $from=0, $limit=-1, $fields=array()){

        if (sizeof($fields)==0)
            $query="select * from {$table} ";
        else{
            $query="select ";
            foreach($fields as $m)
                $query.="{$m},";
            $query=substr($query,0,strlen($query)-1);
            $query.=" from {$table} ";
        }
        if ($condition != "")
            $query .= " where ";
	$query.=(get_class($condition)) == "SQLCondition" ? $condition->Get() : $condition;

        if($orderby!="")
                $query.=" order by {$orderby}";

        if($from > 0)
                $query.=" offset {$from} ";

        if($limit>0)
            $query.=" limit {$limit} ";

//	toLog($query);
        $result=$this->query($query);
        $ret = array();
        while($row = mysql_fetch_array($result, MYSQL_ASSOC)){
                   $ret[] = $row;
        }
        return $ret;
    }



    /** query method: get an standard query and exec it
    * return result of query
    * @access		public
    * @param		string $q :query
    * @return		array $result
    */
    public function query($q){
	//print $q."<br>";
	if(!$this->isconnect){
	    throw new Exception('DB_CONNECTION_ERROR');
	}

	// log queries if DB_LOG_FILENAME was defined
	$ret = mysql_query($q.";");
	if($ret === FALSE || is_null($ret)) {
	    throw new Exception("INTERNAL_ERROR".mysql_error());
	}

	return $ret;
    }
    
    /** 
    * Checks whether error is because of the relation between tables or not  
    * @access		protected
    * @param		$error
    */
    
    protected function processError($error)
    {
	if(preg_match('/.*update or delete on ".+" violates foreign key constraint ".+" on "(.+)"\n'.
			'DETAIL:  Key \(.+\)=\(.+\) is still referenced from table "(.+)".*/',
			$error, $matches))
	{
	    throw new Exception("REFRENTIAL_INTEGRITY_ERROR", $matches[1]);
	}else
	    throw new Exception("INTERNAL_ERROR");
    
    }


    public function __wakeup()
    {
	$this->connect($this->server, $this->dbname);
    }
    
    static protected function translateVar($var, $should_quote = false)
    {
	if(is_int($var))
	{
	    return $var;
	}

	if(is_array($var))
	{
	    return self::translateArray($var);
	}
	
	if(is_bool($var))
	    return self::toBoolean($var);
	    
	if(is_null($var))
	    return 'null';
	    
	if($should_quote and !self::isQuoted($var))
	    $var = quote($var);
	return $var;
    }
    
    static function toBoolean($b){
		return $b ? 1 : 0;
    }

}

?>

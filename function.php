<?php
/*
    fofa查询
 */
function fofa_cx() {
  if ( !empty($_POST['fofa_yf']) ) {  // 这里写入你的判断条件，我随便写的一个例子
      
      $email = 'xxxxxxxxxxx'; //配置fofa账号
      $key = 'xxxxxxxxxx';  //配置fofa key
      $size = $_POST['fofa_ts'];
      $data = $_POST['fofa_yf'];
      $fields = 'host,ip,title,port'; 
      $url = 'https://fofa.info/api/v1/search/all?email='.urlencode($email).'&key='.$key.'&size='.$size.'&fields='.$fields.'&qbase64='.base64_encode(stripslashes($data)).'';

      $ch = curl_init();
      $timeout = 3;
      curl_setopt ($ch, CURLOPT_URL, $url);
      curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
      $file_contents = curl_exec($ch);
      curl_close($ch);

      echo $file_contents;
      exit;
  } else {
      echo json_encode('null');
      exit;
  }

}

fofa_cx()


?>
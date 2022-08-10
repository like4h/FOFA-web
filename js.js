    /**
     * fofa
     */
     function run_form() {
      const fofa_yf = document.querySelector('#fofa_yf').value.replace(/&/g,"%26")   //replace 不能去掉否则会无法解析 &
      const fofa_ts = document.querySelector('#fofa_ts').value
      $.ajax({
      //几个参数需要注意一下
          type: "POST",//方法类型
          dataType: "json",//预期服务器返回的数据类型
          url: "function.php" ,//url
          data: `action=fofa_cx&fofa_yf=${fofa_yf}&fofa_ts=${fofa_ts}`,
          beforeSend: function (data){
              document.querySelector('.tsk').style.display='block'
              document.querySelector('.tsk').innerHTML='查询中.............'
          },
          success: function (data) {
              if ( data['error'] == false ) {
                  var json=data['results'];
                  var str = "";
                  str += "<table border='solid'>";
                  for (var i = 0; i < json.length; i++) {
                          str += "<tr>"; 
                          for (var k = 0; k < json[i].length; k++) {
                              str += " <td style='overflow: hidden;white-space: pre;text-align: center;'>" + json[i][k] + "</td>";
                          }
                          str += "</tr>";
                  }
                  str += "</table>";
                  document.getElementById('info').innerHTML=str;
                  document.querySelector('#btn').style.pointerEvents = 'all'
                  document.querySelector('#btn').style.opacity = 'inherit'
                  document.querySelector('.tsk').innerHTML='查询完成';
                  setTimeout(function () {
                      document.querySelector('.tsk').style.display='none'
                  }, 2000);
              } else if( data['errmsg'] == 'Query invalid!' ) {
                  document.querySelector('.tsk').style.display='block'
                  document.querySelector('.tsk').innerHTML='查询语法不得为空，请输入！'
                  setTimeout(function () {
                      document.querySelector('.tsk').style.display='none'
                  }, 2000);
              } else if( data['errmsg'] == 'FOFA coin is not enough!' ){
                  document.querySelector('.tsk').style.display='block'
                  document.querySelector('.tsk').innerHTML='API 接口可能出现问题，请留言告知管理员！'
                  setTimeout(function () {
                      document.querySelector('.tsk').style.display='none'
                  }, 2000);
              };
          },
          statusCode: {
              500: function (){
                  document.querySelector('.tsk').style.display='block'
                  document.querySelector('.tsk').innerHTML='fofa 官网可能被攻击导致查询失败，请重试！'
                  setTimeout(function () {
                      document.querySelector('.tsk').style.display='none'
                  }, 2000);
              },
          },
      });
  }
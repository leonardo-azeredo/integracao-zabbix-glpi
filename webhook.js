var params = JSON.parse(value);
var request = new HttpRequest();
var url = params.glpi_url + "/apirest.php/initSession";

var headers = {
    "App-Token": + params.app_token,
    "Content-Type": "application/json"
};

var data = {
    "user_token": params.usuario_token
};

var response = request.post(url, JSON.stringify(data), headers);

var usertk = JSON.parse(response).session_token;

var request2 = new HttpRequest();
var url2 = params.glpi_url + "/apirest.php/Ticket/";

var data2 = {
    "input": {
        "name": "Problema! " + params.event_name + " em " + params.host_name + "!",
        "content": "O problema inciou em " + params.event_time + " data, " + params.event_date + " nome do problema, " + params.event_name + " host, " + params.host_name + " severidade, " + params.event_severity + " data operacional, " + params.event_opdata + " ID do problema " + params.event_id + " e URL " + params.trigger_url,
        "requesttypes_id": 1,
        "urgency": 3,
        "entities_id": + params.entidade_id,
        "impact": 3,
        "priority": 3,
        "type": 1,
        "users_id_recipient": 135
    }
};

request2.addHeader('Content-Type: application/json');
request2.addHeader('App-Token: ' + params.app_token);
request2.addHeader('Session-Token: ' + usertk);

var response2 = request2.post(url2, JSON.stringify(data2));

return response2;

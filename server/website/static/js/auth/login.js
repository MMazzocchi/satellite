function login() {
    var errorBox = $('#error-box')[0];
    var errorList = $('#error-list')[0];

    var username = $('#username')[0].value;
    var password = $('#password')[0].value;

    var success = true;
    var errors = "";

    if(username.length == 0) {
        success = false;
        errors += "<li>You must enter a username.</li>\n";
        var uBox = $('#username-box')[0];
        if(!uBox.classList.contains('has-error')) {
            uBox.classList.add('has-error');
        }
    } else {
        var uBox = $('#username-box')[0];
        uBox.classList.remove('has-error');
    }

    if(password.length == 0) {
        success = false;
        errors += "<li>You must enter a password.</li>\n";
        var pBox = $('#password-box')[0];
        if(!pBox.classList.contains('has-error')) {
            pBox.classList.add('has-error');
        }
    } else {
        var pBox = $('#password-box')[0];
        pBox.classList.remove('has-error');
    }

    if(!success) {
        errorList.innerHTML = errors;
        errorBox.hidden = false;
    } else {
        var settings = {
            method: 'POST'
        };
        var url = "validate/";
        $.ajax(url, settings).done(function(response) {
            var data = JSON.parse(response);
            if(data.valid) {
              // We're logged in! Redirect to the home page.
              errorBox.hidden = true;
            } else {
                for(var error in data.errors) {
                    errors += "<li>"+data.errors[error]+"</ul>\n";
                }
                errorList.innerHTML = errors;
                errorBox.hidden = false;
            }
        }).fail(function() {
            var error = "<li>The login server couldn't be reached. Refresh the "+
                        "page, check your internet connection, and try logging "+
                        "in again.</li>\n";
            errorList.innerHTML = error;
            errorBox.hidden = false;
        });
    }
}

function loginIfEnter(e) {
    if(e.keyCode == 13) {
        login();
    }
}

$('#login-button').click(login);
$('#username').keyup(loginIfEnter);
$('#password').keyup(loginIfEnter);

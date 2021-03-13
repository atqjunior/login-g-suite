   var googleUser = { };
        var startApp = function () {
        gapi.load('auth2', function () {
            // Recupere o singleton da biblioteca GoogleAuth e configure o cliente.
            auth2 = gapi.auth2.init({
                //Configure aqui o ID do seu cliente.   
                client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                // Solicite escopos além de 'perfil' e 'e-mail'
                // escopo: 'additional_scope'
            });
            attachSignin(document.getElementById('customBtn'));
        });
        };

        function attachSignin(element) {
        console.log(element.id);
            auth2.attachClickHandler(element, { },
                function (googleUser) {
        document.getElementById('name').innerText = "Signed in: " +
        googleUser.getBasicProfile().getName();
                }, function (error) {
        alert(JSON.stringify(error, undefined, 2));
                });
        }



function signInCallback(authResult) {
    if (authResult['code']) {

        // Hide the sign-in button now that the user is authorized, for example:
        $('#signinButton').attr('style', 'display: none');

        // Send the code to the server
        $.ajax({
            type: 'POST',
            url: 'http://example.com/storeauthcode',
            // Always include an `X-Requested-With` header in every AJAX request,
            // to protect against CSRF attacks.
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            contentType: 'application/octet-stream; charset=utf-8',
            success: function (result) {
                // Handle or verify the server response.
            },
            processData: false,
            data: authResult['code']
        });
    } else {
        // There was an error.
    }
}

$('#signinButton').click(function () {
    // signInCallback defined in step 6.
    auth2.grantOfflineAccess().then(signInCallback);
});
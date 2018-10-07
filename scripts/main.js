// Log the user in and out on click
const popupUri = 'popup.html';
$('#login button').click(() => solid.auth.popupLogin({ popupUri }));
$('#logout button').click(() => solid.auth.logout());

// Update components to match the user's login status
solid.auth.trackSession(session => {
    const loggedIn = !!session;
    $('#login').toggle(!loggedIn);
    $('#logout').toggle(loggedIn);
    $('#user').text(session && session.webId);
    $('#issuer').text(session && session.issuer);
    console.log(session);

    if (session) {
        $('#user').text(session.webId);
        // Use the user's WebID as default profile
        if (!$('#profile').val())  // this if doesn't have {} ?
            $('#profile').val(session.webId);
    }
});

/*

Reminder of arrow notation: 


let/const myFuncArrowFuncSyntax = (param1, param2return) => {
	return param2return;
};

// only works if function body is 1 line (?)
let/const myFuncConciseBody = (param1, param2return) => param2return;

let/const myFuncConciseBody = param2return => param2return + 1;
*/
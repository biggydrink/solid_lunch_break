// Log the user in and out on click
const popupUri = 'popup.html';
const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
$('#login button').click(() => solid.auth.popupLogin({ popupUri }));
$('#logout button').click(() => solid.auth.logout());
$('#viewBtn').click(loadProfile);

// Update components to match the user's login status
solid.auth.trackSession(session => {
    const loggedIn = !!session;
    $('#login').toggle(!loggedIn);
    $('#logout').toggle(loggedIn);
    $('#user').text(session && session.webId);
    $('#issuer').text(session && session.issuer);
    $('#ruben').text("https://ruben.verborgh.org/profile/#me");
    console.log(session);

    if (session) {
        $('#user').text(session.webId);
        // Use the user's WebID as default profile
        if (!$('#profile').val())  // this if doesn't have {} ?
            $('#profile').val(session.webId);
    }
});

async function loadProfile() {
    // Set up a local data store and associated data fetcher
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);

    // Load the person's data into the store
    const person = $('#profile').val();
    await fetcher.load(person);

    // Display their details
    const fullName = store.any($rdf.sym(person), FOAF('name'));
    $('#fullName').text(fullName && fullName.value);

    // Display friend details
    const friends = store.each($rdf.sym(person), FOAF('knows'));
    $('#friends').empty();
    friends.forEach(async function(friend) {
        await fetcher.load(friend);
        const fullName = store.any(friend, FOAF('NAME'));
        $('#friends').append($('<li>').text(fullName && fullName.value || friend.value));
    });
};

/*

Reminder of arrow notation: 


let/const myFuncArrowFuncSyntax = (param1, param2return) => {
	return param2return;
};

// only works if function body is 1 line (?)
let/const myFuncConciseBody = (param1, param2return) => param2return;

let/const myFuncConciseBody = param2return => param2return + 1;
*/
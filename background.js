oauth2 auth
Client ID and API key from the Developer Console
      var CLIENT_ID = '21370599354-v23tpi1rh8bcod0895uc2v8ccqhcuo5d.apps.googleusercontent.com';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar";

      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
	function handleClientLoad() {
        gapi.load('client:auth2', initClient);
	}

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
    function initClient() {
        gapi.client.init({
			discoveryDocs: DISCOVERY_DOCS,
			clientId: CLIENT_ID,
			scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        });
		appendPre("Hello World");
    }

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
		  makeCourseEvent();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
    }

    /**
     *  Sign in the user upon button click.
     */
    function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
    }

      /**
       *  Sign out the user upon button click.
       */
    function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
    }

    /**
     * Append a pre element to the body containing the given message
     * as its text node. Used to display the results of the API call.
     *
     * @param {string} message Text to be placed in pre element.
     */
    function appendPre(message) {
		var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
    }

	/**
	 * Print the summary and start datetime/date of the next ten events in
	 * the authorized user's calendar. If no events are found an
	 * appropriate message is printed.
	 */
    function listUpcomingEvents() {
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(function(response) {
          var events = response.result.items;
          appendPre('Upcoming events:');

          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre(event.summary + ' (' + when + ')')
            }
          } else {
            appendPre('No upcoming events found.');
          }
        });
    }
	  
	function initialize(){
		gapi.auth2.init(cliend_id=CLIENT_ID, scope=SCOPES);
	}
	/**
	 * Make a recurring course event with the following parameters:
	 * courseName: The name of the course and the title of the event
	 * startTime: The time when the course begins
	 * endTime: The time when the course ends
	 * classroom: The classroom number for the class
	 * professor: The name of the instructor
	 * startDate: When the class begins
	 * endDate: When the class ends
	 * 
	 * 
	 */
	function makeCourseEvent(){
		var event = {
			'summary': "Poooo",
			'location': '800 Howard St., San Francisco, CA 94103',
			'description': 'A chance to hear more about Google\'s developer products.',
			'start': {
				'dateTime': '2017-03-25T09:00:00',
				'timeZone': 'America/New_York'
			},
			'end': {
				'dateTime': '2017-03-25T12:00:00',
				'timeZone': 'America/New_York'
			},
			'recurrence': [
				'RRULE:FREQ=WEEKLY;BYDAY=TU,FR;UNTIL=20170410'
			],
			'reminders': {
				'useDefault': false,
				'overrides': [
				  {'method': 'email', 'minutes': 24 * 60},
				  {'method': 'popup', 'minutes': 10}
				]
			}
		};

		var request = gapi.client.calendar.events.insert({
			'calendarId': 'primary',
			'resource': event
		});


		request.execute(function(event) {
			appendPre("Event created: " + event.summary)
		});
	}




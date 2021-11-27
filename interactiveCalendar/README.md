# This is a group project; the work was completed in collaboration.
Albert Yang, HappyEureka
Sheng Guo, shengguo8

### Link: http://ec2-3-142-47-53.us-east-2.compute.amazonaws.com/~alberty/module5-group/calendar.html

### About this website:
1. Vistor view is avaiable for unlogged in users. Visitor calendar can view different months.
2. A user is able to login, register new account.
3. When registering new account, the username must be unique; the password must contain at least 6 characters; Of the 6 charactes, at least has to be a number, a special character, and a letter.
4. Logged users are able to add new events, check their own events, and edit their events.
    - all calendars are displayed by month in grid form, allowing user to access "as far in the past or future as desired"
	- once logged in, users can also see the contents of calendars that were shared with them, as well as their own calendar.
		- the user can only see the events associated with the user on their own calendar.
		- when viewing a shared calendar, the user has access to all events, but can not edit the contents of the shared calendar.
		- when viewing their own events, a user is able to add, edit, or delete the event; and, the user is able to add, edit, or delete comments.
	- each event can be tagged with either emeregency or unimportant. The event tag can be updated later.
	- all actions are performed using AJAX. Page refresh is not needed.
	- to add a new event, you have to enter the event message and time for the event to be successfully added. You can optionally enter a group member and select tags.
5. Refresh page will not log the user out. To logout, press the logout button.
6. Passwords are hashed then stored.
7. CRSF protection is enabled for data transmission from site to database.
8. The prepare function is used to protect from SQL injection.
9. Safe from XSS, SQL attacks.
10. session cookie are set to http-only.
11. All pages pass the html validator.
12. Please use Chrome. The website has been tested on Chrome.

### Creative:
1. Sharing calendar
	- Every user that is logged in has the option to share their calendar with other users
        - The user that is being shared with must exist; a user cannot share with the same user multiple times (an error message will be displayed)
        - User that is being shared with has access to all events, but cannot edit, update, or delete the contents of the shared calendar

	- Shared calendar view
    	- The shared calendars automatically display under the personal calendar
    	- Users not logged in will not see any shared calendars

2. Event tag
	- Every event can be tagged with either unimportant or emergency when adding the event. Tag can be enabled/disabled later.

3. Group event
	- When adding an event, you can optionally select a group member. The event will be added for both of you if you choose to add a group member. If you left the group member input blank or if you enter a user that does not exist, the event will only be added for yourself.

3. password checker
	- we check the strength of user's password. The password has to be at least 6 characters length. It must contain at least a number, a special character, and a letter.

4. duplicate user checker
	- we check whether a user with the same username is existed in the database. We only allow unique username to be created

5. Calendar view
	- we color the current month with color black, the current day with color blue, and days from other month with color gray.
	- Daily events can be fouond in each daily modal. The structure of modal is adapted from bootstrap. We thought it would make the view visually appealing and easy to navigate.

### Login Info:
1. Register a new account
2. Use the dummy account
	- account: bob
	- password: bobbob1!
3. You can share calendar with the dummy account "bob", and view it by logging in with "bob" credentials.

## Grading:
 - -1: escaping input instead of output in php
 - +1: Site is visually appealing
 - -1: Group event not deleted among all users

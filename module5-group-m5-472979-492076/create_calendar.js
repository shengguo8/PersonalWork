// remove all children of a node
function removeChildren(e) {
    while (e.firstChild) {
        e.removeChild(e.firstChild);
    }
}

// addEvent component for each day
let addEvent = (displayID) => {
    let addEventDiv = document.createElement("div");
    let infoInputGroup = document.createElement("div");
    infoInputGroup.className = "input-group"
    let infoSpan = document.createElement("span");
    infoSpan.className = "input-group-text";
    infoSpan.innerHTML = "New event";
    // text input
    let textInput = document.createElement("input");
    textInput.className = "form-control";
    textInput.setAttribute("type", "text");
    textInput.setAttribute("id", "addEventText" + displayID);
    textInput.setAttribute("placeholder", "New event...");
    let submitBtn = document.createElement("button");
    submitBtn.className = "btn btn-outline-success";
    submitBtn.innerHTML = "Add event";
    submitBtn.setAttribute("id", "addEventBtn" + displayID);
    submitBtn.setAttribute("type", "button");
    infoInputGroup.appendChild(infoSpan);
    infoInputGroup.appendChild(textInput);
    infoInputGroup.appendChild(submitBtn);
    // time input
    let timeInputGroup = document.createElement("div");
    timeInputGroup.className = "input-group";
    let timeSpan = document.createElement("span");
    timeSpan.className = "input-group-text";
    timeSpan.innerHTML = "Start time";
    let monthInput = document.createElement("input");
    monthInput.className = "form-control";
    monthInput.setAttribute("placeholder", "Hour");
    monthInput.setAttribute("id", "addEventHour" + displayID);
    let dayInput = document.createElement("input");
    dayInput.className = "form-control";
    dayInput.setAttribute("placeholder", "Minute");
    dayInput.setAttribute("id", "addEventMinute" + displayID);
    timeInputGroup.appendChild(timeSpan);
    timeInputGroup.appendChild(monthInput);
    timeInputGroup.appendChild(dayInput);
    // tags
    let tagDiv = document.createElement("div");
    tagDiv.className = "input-group";
    let tagSpan = document.createElement("span");
    tagSpan.className = "input-group-text";
    tagSpan.innerHTML = "Tag";
    let emergencybtn = document.createElement("button");
    emergencybtn.className = "btn btn-outline-danger";
    emergencybtn.innerHTML = "Emergency ";
    emergencybtn.setAttribute("id", "addEmergencyBtn" + displayID);
    emergencybtn.setAttribute("type", "button");
    let emergencyCheckMark = document.createElement("i");
    emergencyCheckMark.className = "bi bi-check-circle-fill";
    emergencyCheckMark.setAttribute("id", "addEmergencyCheckMark" + displayID);
    emergencyCheckMark.style.display = "none";
    emergencybtn.appendChild(emergencyCheckMark);
    let unimportantBtn = document.createElement("button");
    unimportantBtn.className = "btn btn-outline-warning";
    unimportantBtn.innerHTML = "Unimportant ";
    unimportantBtn.setAttribute("id", "addUnimportantBtn" + displayID);
    unimportantBtn.setAttribute("type", "button");
    let unimportantCheckMark = document.createElement("i");
    unimportantCheckMark.className = "bi bi-check-circle-fill";
    unimportantCheckMark.setAttribute("id", "addUnimportantCheckMark" + displayID);
    unimportantCheckMark.style.display = "none";
    unimportantBtn.appendChild(unimportantCheckMark);
    tagDiv.appendChild(tagSpan);
    tagDiv.appendChild(emergencybtn);
    tagDiv.appendChild(unimportantBtn);

    let groupMemberDiv = document.createElement("div");
    groupMemberDiv.className = "input-group";
    let groupMemeberSpan = document.createElement("span");
    groupMemeberSpan.className = "input-group-text";
    groupMemeberSpan.innerHTML = "Add group memeber";
    let groupMemberInput = document.createElement("input");
    groupMemberInput.className = "form-control";
    groupMemberInput.setAttribute("placeholder", "Username");
    groupMemberInput.setAttribute("id", "addGroupMemeber" + displayID);
    groupMemberDiv.appendChild(groupMemeberSpan);
    groupMemberDiv.appendChild(groupMemberInput);

    let lineBreak = document.createElement("p");
    lineBreak.innerHTML = "<br>";

    addEventDiv.appendChild(infoInputGroup);
    addEventDiv.appendChild(timeInputGroup);
    addEventDiv.appendChild(groupMemberDiv);
    addEventDiv.appendChild(tagDiv);
    addEventDiv.appendChild(lineBreak);
    return addEventDiv;
}

// generate the content body
let _createContentBody = (event, token) => {
    // get an ID that is unique for each date
    let displayID = nowMonth.toString() + event['month'] + event['day'];
    // add the addEvent component for each day
    let body = document.createElement('div');
    body.className = "modal-body";
    body.appendChild(addEvent(displayID));
    // retrieve user day info from database and update the display
    let displayInfo = document.createElement('div');
    displayInfo.setAttribute("id", "addContentText" + displayID);
    retrieveDayEvent(event, displayInfo, token);
    body.appendChild(displayInfo);
    return body;
}

// generate an event modal
let createEventModal = (event, token) => {
    let eventTitle = "Event: " + month_dict[event['month']] + " " + event['day'] + ", " + event['year']
    let displayID = nowMonth.toString() + event['month'] + event['day'];
    let aEvent = document.createElement('div');
    // modal trigger btn
    let showDayEvent = document.createElement('button');
    if (is_login) {
        showDayEvent.className = "btn btn-primary";
    } else {
        // hide event modal if not logged in
        showDayEvent.className = "btn btn-primary invisible";
    }
    showDayEvent.setAttribute("data-bs-toggle", "modal");
    showDayEvent.setAttribute("data-bs-target", "#showDayEvent" + displayID);
    showDayEvent.setAttribute("id", "displayBtn" + displayID);
    showDayEvent.innerHTML = "Events";
    // event modal
    let eventModal = document.createElement('div');
    eventModal.className = "modal fade";
    eventModal.setAttribute("id", "showDayEvent" + displayID);
    eventModal.setAttribute("tabindex", "-1");
    eventModal.setAttribute("aria-labelledby", "exampleModalLabel");
    eventModal.setAttribute("aria-hidden", "true");
    // event dialog
    let event_dialog = document.createElement('div');
    event_dialog.className = "modal-dialog modal-dialog-centered modal-dialog-scrollable";
    // content
    let event_content = document.createElement('div');
    event_content.className = "modal-content";
    // content header
    let header = document.createElement('div');
    header.className = "modal-header";
    let header_content = document.createElement('h5');
    header_content.className = "modal-title";
    header_content.setAttribute("id", "exampleModalLabel");
    header_content.innerHTML = eventTitle;
    header.appendChild(header_content);
    // content body
    let body = _createContentBody(event, token);
    // content footer
    let footer = document.createElement('div');
    footer.className = "modal-footer";
    let footer_close_btn = document.createElement('button');
    footer_close_btn.className = "btn btn-secondary";
    footer_close_btn.setAttribute("data-bs-dismiss", "modal");
    footer_close_btn.innerHTML = "Close";
    footer.appendChild(footer_close_btn)

    event_content.appendChild(header);
    event_content.appendChild(body);
    event_content.appendChild(footer);
    event_dialog.appendChild(event_content);
    eventModal.appendChild(event_dialog);

    aEvent.appendChild(showDayEvent);
    aEvent.appendChild(eventModal);
    return aEvent;
}

// create a calendar day component
let _createDay = (event) => {
    let col = document.createElement('div');
    col.className = 'col card';
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerText = event["day"];
    title.className = 'card-title';
    // set day color
    if (event['property'] == "today") {
        title.style.color = "blue";
    } else if (event['property'] == "no") {
        title.style.color = "gray";
    }
    cardBody.appendChild(title);
    // generate event modal
    let showDayEvent = createEventModal(event);
    cardBody.appendChild(showDayEvent);

    col.appendChild(cardBody);
    return col
}

// insert event to database and refresh display using AJAX
let insertEvent = (event, contentDisplay, textInput, hourInput,
    minuteInput, emergencyBtn, unimportantBtn, groupMember, token) => {
    let pathToPhpFile = "./insertEvent.php";
    let data = event;
    data["message"] = textInput;
    data["hourInput"] = hourInput;
    data["minuteInput"] = minuteInput;
    data["emergencyBtn"] = emergencyBtn;
    data["unimportantBtn"] = unimportantBtn;
    data["groupMember"] = groupMember;
    data["token"] = token;

    fetch(pathToPhpFile, {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(function (r) {
            console.log("inserting")
            console.log(r)
            // refresh today's display using AJAX
            retrieveDayEvent(event, contentDisplay, token);
        })
        .catch(error => console.error('Error:', error));
}

// update event from database and refresh display using AJAX
let updateEvent = (event, event_id, contentDisplay,
    textInput, hourInput, minuteInput,
    monthInput, dayInput, yearInput,
    emergencyBtn, unimportantBtn, token) => {
    let pathToPhpFile = "./updateEvent.php";
    let data = event;
    data["event_id"] = event_id;
    data["message"] = textInput;
    // datetime
    data["hourInput"] = hourInput;
    data["minuteInput"] = minuteInput;
    data["monthInput"] = monthInput;
    data["dayInput"] = dayInput;
    data["yearInput"] = yearInput;
    data["emergencyBtn"] = emergencyBtn;
    data["unimportantBtn"] = unimportantBtn;
    // token
    data["token"] = token;

    fetch(pathToPhpFile, {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(function (r) {
            console.log("updating")
            console.log(r);
            // refresh today's display using AJAX
            retrieveDayEvent(event, contentDisplay, token);
        })
        .catch(error => console.error('Error:', error));
}

// delete event from database and refresh display using AJAX
let deleteDayEvent = (event, event_id, contentDisplay, token) => {
    let pathToPhpFile = "./deleteDayEvent.php";
    let data = {};
    data['event_id'] = event_id;
    data['token'] = token;  
    fetch(pathToPhpFile, {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(function () {
            // refresh today's display using AJAX
            retrieveDayEvent(event, contentDisplay, token);
        })
        .catch(error => console.error('Error:', error));
}

// retrieve information of the user of the day from database using AJAX and refresh display
let retrieveDayEvent = (event, contentDisplay, token) => {
    let pathToPhpFile = "./retrieveDayEvent.php";
    let data = event;
    fetch(pathToPhpFile, {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(function (result) {
            contentDisplay.innerHTML = "";
            msg = result['message'];
            for (let i = 0; i < msg.length; i++) {
                let event_text = msg[i][1];
                let dt = new Date(msg[i][2]);
                let day = dt.getDate();
                let month = dt.getMonth() + 1;
                let year = dt.getFullYear();
                let hour = dt.getHours();
                let minute = dt.getMinutes();
                let emergencyBtnState = parseInt(msg[i][3]);
                let unimportantBtnState = parseInt(msg[i][4]);
                // input group
                let infoInputGroup = document.createElement("div");
                infoInputGroup.className = "input-group"
                let infoSpan = document.createElement("span");
                infoSpan.className = "input-group-text";
                infoSpan.innerHTML = i + 1;
                let textInput = document.createElement("input");
                textInput.className = "form-control";
                textInput.setAttribute("type", "text");
                textInput.setAttribute("value", event_text);
                textInput.setAttribute("id", "inputEventText" + msg[i][0]);
                let updateBtn = document.createElement("button");
                updateBtn.className = "btn btn-outline-secondary";
                updateBtn.innerHTML = "Update";
                updateBtn.setAttribute("id", "updateBtn" + msg[i][0]);
                updateBtn.setAttribute("type", "button");
                let deleteBtn = document.createElement("button");
                deleteBtn.className = "btn btn-outline-danger";
                deleteBtn.innerHTML = "Delete";
                deleteBtn.setAttribute("id", "deleteBtn" + msg[i][0]);
                deleteBtn.setAttribute("type", "button");
                infoInputGroup.appendChild(infoSpan);
                infoInputGroup.appendChild(textInput);
                infoInputGroup.appendChild(updateBtn);
                infoInputGroup.appendChild(deleteBtn);
                contentDisplay.appendChild(infoInputGroup);
                // month day year input group
                let mdyInputGroup = document.createElement("div");
                mdyInputGroup.className = "input-group";
                let mdySpan = document.createElement("span");
                mdySpan.className = "input-group-text";
                mdySpan.innerHTML = "Event date";
                let monthInput = document.createElement("input");
                monthInput.className = "form-control";
                monthInput.setAttribute("placeholder", "Month");
                monthInput.setAttribute("value", month);
                monthInput.setAttribute("id", "inputEventMonth" + msg[i][0]);
                let dayInput = document.createElement("input");
                dayInput.className = "form-control";
                dayInput.setAttribute("placeholder", "Day");
                dayInput.setAttribute("value", day);
                dayInput.setAttribute("id", "inputEventDay" + msg[i][0]);
                let yearInput = document.createElement("input");
                yearInput.className = "form-control";
                yearInput.setAttribute("placeholder", "Year");
                yearInput.setAttribute("value", year);
                yearInput.setAttribute("id", "inputEventYear" + msg[i][0]);
                mdyInputGroup.appendChild(mdySpan);
                mdyInputGroup.appendChild(monthInput);
                mdyInputGroup.appendChild(dayInput);
                mdyInputGroup.appendChild(yearInput);
                contentDisplay.appendChild(mdyInputGroup);
                // hour minute input group
                let timeInputGroup = document.createElement("div");
                timeInputGroup.className = "input-group"
                timeInputGroup.innerHTML = "  ";
                let timeSpan = document.createElement("span");
                timeSpan.className = "input-group-text";
                timeSpan.innerHTML = "Start time";
                let hourInput = document.createElement("input");
                hourInput.className = "form-control";
                hourInput.setAttribute("placeholder", "Hour");
                hourInput.setAttribute("value", hour);
                hourInput.setAttribute("id", "inputEventHour" + msg[i][0]);
                let minuteInput = document.createElement("input");
                minuteInput.className = "form-control";
                minuteInput.setAttribute("placeholder", "Minute");
                minuteInput.setAttribute("value", minute);
                minuteInput.setAttribute("id", "inputEventMinute" + msg[i][0]);
                timeInputGroup.appendChild(timeSpan);
                timeInputGroup.appendChild(hourInput);
                timeInputGroup.appendChild(minuteInput);
                contentDisplay.appendChild(timeInputGroup);
                // tags
                let tagDiv = document.createElement("div");
                tagDiv.className = "input-group";
                let tagSpan = document.createElement("span");
                tagSpan.className = "input-group-text";
                tagSpan.innerHTML = "Tag";
                let emergencybtn = document.createElement("button");
                emergencybtn.className = "btn btn-outline-danger";
                emergencybtn.innerHTML = "Emergency ";
                emergencybtn.setAttribute("id", "inputEventEmergencyBtn" + msg[i][0]);
                emergencybtn.setAttribute("type", "button");
                let emergencyCheckMark = document.createElement("i");
                emergencyCheckMark.className = "bi bi-check-circle-fill";
                emergencyCheckMark.setAttribute("id", "inputEventEmergencyCheckMark" + msg[i][0]);
                if (emergencyBtnState) {
                    emergencyCheckMark.style.display = "block";
                } else {
                    emergencyCheckMark.style.display = "none";
                }
                emergencybtn.appendChild(emergencyCheckMark);
                let unimportantBtn = document.createElement("button");
                unimportantBtn.className = "btn btn-outline-warning";
                unimportantBtn.innerHTML = "Unimportant ";
                unimportantBtn.setAttribute("id", "inputEventUnimportantBtn" + msg[i][0]);
                unimportantBtn.setAttribute("type", "button");
                let unimportantCheckMark = document.createElement("i");
                unimportantCheckMark.className = "bi bi-check-circle-fill";
                unimportantCheckMark.setAttribute("id", "inputEventUnimportantCheckMark" + msg[i][0]);
                unimportantCheckMark.style.display = "none";
                if (unimportantBtnState) {
                    unimportantCheckMark.style.display = "block";
                } else {
                    unimportantCheckMark.style.display = "none";
                }
                unimportantBtn.appendChild(unimportantCheckMark);
                tagDiv.appendChild(tagSpan);
                tagDiv.appendChild(emergencybtn);
                tagDiv.appendChild(unimportantBtn);
                contentDisplay.appendChild(tagDiv);

                let lineBreak = document.createElement("p");
                lineBreak.innerHTML = "<br>";
                contentDisplay.appendChild(lineBreak);
            }

            // add event listeners for each update/delete button and each tags
            for (let i = 0; i < msg.length; i++) {
                let event_id = msg[i][0];
                $("#deleteBtn" + event_id).on("click", function () {
                    deleteDayEvent(event, event_id, contentDisplay, token);
                });

                $("#updateBtn" + event_id).on("click", function () {
                    let updatedHour = document.getElementById("inputEventHour" + event_id).value;
                    let updatedMinute = document.getElementById("inputEventMinute" + event_id).value;
                    let updatedDay = document.getElementById("inputEventDay" + event_id).value;
                    let updatedMonth = document.getElementById("inputEventMonth" + event_id).value;
                    let updatedYear = document.getElementById("inputEventYear" + event_id).value;
                    let updatedText = document.getElementById("inputEventText" + event_id).value;

                    if (updatedHour.length != 0 && updatedMinute.length != 0 && updatedDay.length != 0 &&
                        updatedMonth.length != 0 && updatedYear.length != 0 && updatedText.length != 0) {
                        let emergencyBtn;
                        let unimportantBtn;
                        let emergencyCheckMark = document.getElementById("inputEventEmergencyCheckMark" + event_id);
                        let emergencyState = emergencyCheckMark.style.display;
                        if (emergencyState == "none") {
                            emergencyBtn = 0;
                        } else {
                            emergencyBtn = 1;
                        }
                        let unimportantCheckMark = document.getElementById("inputEventUnimportantCheckMark" + event_id);
                        let unimportantState = unimportantCheckMark.style.display;
                        if (unimportantState == "none") {
                            unimportantBtn = 0;
                        } else {
                            unimportantBtn = 1;
                        }

                        updateEvent(event, event_id, contentDisplay,
                            updatedText, updatedHour, updatedMinute,
                            updatedMonth, updatedDay, updatedYear,
                            emergencyBtn, unimportantBtn, token);
                    }
                });

                $("#inputEventEmergencyBtn" + event_id).on("click", function () {
                    let emergencyCheckMark = document.getElementById("inputEventEmergencyCheckMark" + event_id);
                    let curr_state = emergencyCheckMark.style.display;
                    if (curr_state == "none") {
                        emergencyCheckMark.style.display = "block";
                    } else {
                        emergencyCheckMark.style.display = "none";
                    }
                });

                $("#inputEventUnimportantBtn" + event_id).on("click", function () {
                    let unimportantCheckMark = document.getElementById("inputEventUnimportantCheckMark" + event_id);
                    let curr_state = unimportantCheckMark.style.display;
                    if (curr_state == "none") {
                        unimportantCheckMark.style.display = "block";
                    } else {
                        unimportantCheckMark.style.display = "none";
                    }
                });
            }
        })
        .catch(error => console.error('Error:', error));
}

// create a page of user calendar
let _createCalendar = (events, token) => {
    let cardContainer = document.getElementById('card-container');
    removeChildren(cardContainer);
    let row;
    for (let i = 0; i < events.length; i++) {
        if (i == 0) {
            row = document.createElement('div');
            row.className = 'row';
            row.appendChild(_createDay(events[i]))
        } else if ((i + 1) % 7 == 0) {
            row.appendChild(_createDay(events[i]))
            cardContainer.appendChild(row);
            row = document.createElement('div');
            row.className = 'row';
        } else {
            row.appendChild(_createDay(events[i]))
        }
    }
    cardContainer.appendChild(row);

    // add event listeners for add/display/tags
    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let displayID = nowMonth.toString() + event['month'] + event['day'];

        $("#addEventBtn" + displayID).on("click", function () {
            // fetch data and refresh content
            let contentDisplay = document.getElementById("addContentText" + displayID);
            let textInput = document.getElementById('addEventText' + displayID).value;
            let hourInput = document.getElementById('addEventHour' + displayID).value;
            let minuteInput = document.getElementById('addEventMinute' + displayID).value;
            let groupMemeberInput = document.getElementById('addGroupMemeber' + displayID).value;

            if (textInput.length != 0 && hourInput.length != 0 && minuteInput.length != 0) {
                let emergencyBtn;
                let unimportantBtn;

                let addEmergencyCheckMark = document.getElementById("addEmergencyCheckMark" + displayID);
                let emergencyState = addEmergencyCheckMark.style.display;
                if (emergencyState == "none") {
                    emergencyBtn = 0;
                } else {
                    emergencyBtn = 1;
                }
                let addUnimportantCheckMark = document.getElementById("addUnimportantCheckMark" + displayID);
                let unimportantState = addUnimportantCheckMark.style.display;
                if (unimportantState == "none") {
                    unimportantBtn = 0;
                } else {
                    unimportantBtn = 1;
                }
                insertEvent(event, contentDisplay, textInput, hourInput, minuteInput, emergencyBtn, unimportantBtn, groupMemeberInput, token);
            }
        });

        $("#displayBtn" + displayID).on("click", function () {
            // fetch data and refresh content
            let contentDisplay = document.getElementById("addContentText" + displayID);
            retrieveDayEvent(event, contentDisplay, token);
        });

        $("#addEmergencyBtn" + displayID).on("click", function () {
            let addEmergencyCheckMark = document.getElementById("addEmergencyCheckMark" + displayID);
            let curr_state = addEmergencyCheckMark.style.display;
            if (curr_state == "none") {
                addEmergencyCheckMark.style.display = "block";
            } else {
                addEmergencyCheckMark.style.display = "none";
            }
        });

        $("#addUnimportantBtn" + displayID).on("click", function () {
            let addUnimportantCheckMark = document.getElementById("addUnimportantCheckMark" + displayID);
            let curr_state = addUnimportantCheckMark.style.display;
            if (curr_state == "none") {
                addUnimportantCheckMark.style.display = "block";
            } else {
                addUnimportantCheckMark.style.display = "none";
            }
        });
    }
};

// create events (dates) based on given year and month
let createEvents = (aYear, aMonth) => {
    events = [];
    let month = new Month(aYear, aMonth);
    let weeks = month.getWeeks();
    let is_curr_month = false;
    let yesterday = 0;
    weeks.forEach(week => {
        week.getDates().forEach(date => {
            y = date.getFullYear()
            m = date.getMonth();
            d = date.getDate();
            property = "yes"; // is current month
            // check for current month, prev month, future month, and current day
            if (is_curr_month) {
                if (d < yesterday) {
                    property = "no";
                    is_curr_month = false;
                }
            } else {
                if (d == 1) {
                    is_curr_month = true;
                } else {
                    property = "no";
                }
            }
            if (m == currMonth && d == currDay && y == currYear) {
                property = "today";
            }
            events.push({
                "year": y.toString(), "month": m.toString(),
                "day": d.toString(), "property": property,
            });
            yesterday = d;
        })
    })
    return events;
}

// create a user calendar
let createCalendar = (aYear, aMonth, token) => {
    // calendar title
    let calendarTitle = document.getElementById("month_year")
    calendarTitle.innerHTML = month_dict[aMonth] + " " + aYear.toString();
    calendarTitle.style.color = "black";
    createEvents(aYear, aMonth);
    _createCalendar(events, token);
};

// --------- create other calendar (shared-view: the user cannot edit each event but can only view) --------------
// retrieve information of the target user of the day from database using AJAX and refresh display
let retrieveOtherDayEvent = (event, otherID, contentDisplay) => {
    let data = event;
    data['otherID'] = otherID;
    fetch("./retrieveOtherDayEvent.php", {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(function (result) {
            contentDisplay.innerHTML = "";
            msg = result['message'];
            for (let i = 0; i < msg.length; i++) {
                let event_text = msg[i][1];
                let dt = new Date(msg[i][2]);
                let day = dt.getDate();
                let month = dt.getMonth();
                let year = dt.getFullYear();
                let hour = dt.getHours();
                let minute = dt.getMinutes();
                // display events (view-only)
                contentDisplay.innerHTML += i + 1 + ". ";
                contentDisplay.innerHTML += event_text;
                contentDisplay.innerHTML += "<br>";
                contentDisplay.innerHTML += month_dict[month] + ", " + day + " " + year + " " + hour + ":" + minute + "<br>";
            }
        })
        .catch(error => console.error('Error:', error));
}

// generate the content body
let _createOtherContentBody = (uid, username, event) => {
    let displayID = nowMonth.toString() + event['month'] + event['day'] + username;
    let body = document.createElement('div');
    body.className = "modal-body";
    let displayInfo = document.createElement('div');
    displayInfo.setAttribute("id", "addContentText" + displayID);
    // refresh today's display using AJAX
    retrieveOtherDayEvent(event, uid, displayInfo);
    body.appendChild(displayInfo);
    return body;
}

// generate an event modal (view-only)
let createOtherEventModal = (uid, username, event) => {
    let eventTitle = "Event: " + month_dict[event['month']] + " " + event['day'] + ", " + event['year']
    let displayID = nowMonth.toString() + event['month'] + event['day'] + username;

    let aEvent = document.createElement('div');
    // modal trigger btn
    let showDayEvent = document.createElement('button');
    showDayEvent.className = "btn btn-primary";
    showDayEvent.setAttribute("data-bs-toggle", "modal");
    showDayEvent.setAttribute("data-bs-target", "#showDayEvent" + displayID);
    showDayEvent.setAttribute("id", "displayBtn" + displayID);
    showDayEvent.innerHTML = "Events";
    // event modal
    let eventModal = document.createElement('div');
    eventModal.className = "modal fade";
    eventModal.setAttribute("id", "showDayEvent" + displayID);
    eventModal.setAttribute("tabindex", "-1");
    eventModal.setAttribute("aria-labelledby", "exampleModalLabel");
    eventModal.setAttribute("aria-hidden", "true");
    // event dialog
    let event_dialog = document.createElement('div');
    event_dialog.className = "modal-dialog modal-dialog-centered modal-dialog-scrollable";
    // content
    let event_content = document.createElement('div');
    event_content.className = "modal-content";
    // content header
    let header = document.createElement('div');
    header.className = "modal-header";
    let header_content = document.createElement('h5');
    header_content.className = "modal-title";
    header_content.setAttribute("id", "exampleModalLabel");
    header_content.innerHTML = eventTitle;
    header.appendChild(header_content);
    // content body
    let body = _createOtherContentBody(uid, username, event);
    // content footer
    let footer = document.createElement('div');
    footer.className = "modal-footer";
    let footer_close_btn = document.createElement('button');
    footer_close_btn.className = "btn btn-secondary";
    footer_close_btn.setAttribute("data-bs-dismiss", "modal");
    footer_close_btn.innerHTML = "Close";
    footer.appendChild(footer_close_btn)

    event_content.appendChild(header);
    event_content.appendChild(body);
    event_content.appendChild(footer);
    event_dialog.appendChild(event_content);
    eventModal.appendChild(event_dialog);

    aEvent.appendChild(showDayEvent);
    aEvent.appendChild(eventModal);
    return aEvent;
}

// create a calendar day component (view-only)
let _createOtherDay = (uid, username, event) => {
    let col = document.createElement('div');
    col.className = 'col card';
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerText = event["day"];
    title.className = 'card-title';
    // set day color
    if (event['property'] == "today") {
        title.style.color = "blue";
    } else if (event['property'] == "no") {
        title.style.color = "gray";
    }
    cardBody.appendChild(title);

    let showDayEvent = createOtherEventModal(uid, username, event);
    cardBody.appendChild(showDayEvent);

    col.appendChild(cardBody);
    return col;
}

// create shared-view calendar (that the user can only view but not edit)
let _createOtherCalendar = (cardContainer, uid, username, events) => {
    let shared_user = document.createElement("h3");
    shared_user.innerHTML = "<br>" + username;
    cardContainer.appendChild(shared_user);

    let row;
    for (let i = 0; i < events.length; i++) {
        if (i == 0) {
            row = document.createElement('div');
            row.className = 'row';
            row.appendChild(_createOtherDay(uid, username, events[i]))
        } else if ((i + 1) % 7 == 0) {
            row.appendChild(_createOtherDay(uid, username, events[i]))
            cardContainer.appendChild(row);
            row = document.createElement('div');
            row.className = 'row';
        } else {
            row.appendChild(_createOtherDay(uid, username, events[i]))
        }
    }
    cardContainer.appendChild(row);
};

// create shared-view calendar (that the user can only view but not edit)
let createOtherCalendar = (cardContainer, uid, username, aYear, aMonth) => {
    createEvents(aYear, aMonth);
    _createOtherCalendar(cardContainer, uid, username, events);
};

// hide or show html conpoennets of shared users section based on login statuss
let showShareUsers = () => {
    let addUsersToShareDiv = document.getElementById("addUsersToShareDiv");
    let cardContainerOther = document.getElementById("card-container-other");
    if (is_login) {
        addUsersToShareDiv.style.display = "block";
        cardContainerOther.style.display = "block";
    } else {
        addUsersToShareDiv.style.display = "none";
        cardContainerOther.style.display = "none";
    }
}

// get useres who shared content with me generate a shared-veiw calendar for each user
let getSharedUserCalendars = () => {
    if (is_login) {
        fetch("./retrieveSharedUsers.php", {})
            .then(res => res.json())
            .then(function (result) {
                let shared_users = result['shared_users'];
                let otherCardContainer = document.getElementById('card-container-other');
                removeChildren(otherCardContainer);

                for (let i = 0; i < shared_users.length; i++) {
                    let curr_id = shared_users[i][0];
                    let curr_user = shared_users[i][1];
                    createOtherCalendar(otherCardContainer, curr_id, curr_user, nowYear, nowMonth);
                }
            })
            .catch(error => console.error('Error:', error));
    }
}

// check for prev_month button
$("#prev_month").click(function () {
    prevMon = new Month(nowYear, nowMonth).prevMonth();
    nowMonth = prevMon.month;
    nowYear = prevMon.year;
    let token;
    fetch("./isLogin.php", {})
    .then(res => res.json())
    .then(function (result) {
        if (result['isLogin']) {
            is_login = true;
            token = result['token'];
        } else {
            is_login = false;
            token = "";
        }
        // update page content based on login status
        showShareUsers();
        createCalendar(nowYear, nowMonth, token);
        getSharedUserCalendars();
    })
    .catch(error => console.error('Error:', error));
});

// check for next_month button
$("#next_month").click(function () {
    nextMon = new Month(nowYear, nowMonth).nextMonth();
    nowMonth = nextMon.month;
    nowYear = nextMon.year;
    let token;
    fetch("./isLogin.php", {})
    .then(res => res.json())
    .then(function (result) {
        if (result['isLogin']) {
            is_login = true;
            token = result['token'];
        } else {
            is_login = false;
            token = "";
        }
        // update page content based on login status
        showShareUsers();
        createCalendar(nowYear, nowMonth, token);
        getSharedUserCalendars();
    })
    .catch(error => console.error('Error:', error));
});

// prevent reload on submit
$("#register_form").submit(function (e) {
    e.preventDefault();
    let uname = $("#r_username").val().toString();
    let pwd = $("#r_password").val().toString();
    let re_pwd = $("#r_re_password").val().toString();
    const data = { "r_username": uname, "r_password": pwd, "r_re_password": re_pwd };
    const pathToPhpFile = './register.php';
    // update page content based on login status
    fetch(pathToPhpFile, {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(function (result) {
        if (result["success"]) {
            $('#registerModal').modal('hide');
            is_login = true;
            let login_error_msg = document.getElementById("login_error_message");
            login_error_msg.innerHTML = "Success!";
            login_error_msg.style.color = "green";
            // update page content based on login status
            // enable events on calendar
            showShareUsers();
            createCalendar(nowYear, nowMonth, result['token']);
            getSharedUserCalendars();
        } else {
            let register_error_msg = document.getElementById("register_error_message");
            register_error_msg.innerHTML = result["message"];
            register_error_msg.style.color = "red";
        }
        return result;
    })
    .catch(error => console.error('Error:', error));
});

$("#logout").click(function (e) {
    e.preventDefault();
    is_login = false;
    const pathToPhpFile = './logout.php';

    // update page content based on login status
    fetch(pathToPhpFile, {})
        .catch(error => console.error('Error:', error));
    // disable events on calendar
    let token = "";
    showShareUsers();
    createCalendar(nowYear, nowMonth, token);
    getSharedUserCalendars();
});

$("#login_form").submit(function (e) {
    e.preventDefault();
    let uname = $("#l_username").val().toString();
    let pwd = $("#l_password").val().toString();
    const data = { "l_username": uname, "l_password": pwd };
    const pathToPhpFile = './login.php';

    // update page content based on login status
    fetch(pathToPhpFile, {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(function (result) {
            if (result["success"]) {
                $('#loginModal').modal('hide');
                is_login = true;

                let login_error_msg = document.getElementById("login_error_message");
                login_error_msg.innerHTML = "Success!";
                login_error_msg.style.color = "green";

                // enable events on calendar
                showShareUsers();
                createCalendar(nowYear, nowMonth, result['token']);
                getSharedUserCalendars();

            } else {
                let login_error_msg = document.getElementById("login_error_message");
                login_error_msg.innerHTML = result["message"];
                login_error_msg.style.color = "red";
            }
            return result;
        })
        .catch(error => console.error('Error:', error));
});

// add users whom to share content with
$("#addUsersToShareBtn").click(function () {
    let newUser = document.getElementById("addUsersToShare").value;
    let msg = document.getElementById('addUserMsg');
    if (newUser.length != 0) {
        let data = { "newUser": newUser };
        if (is_login) {
            fetch("./addUsersToShare.php", {
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(function (result) {
                msg.innerHTML = result["message"];
                if (result["added"]) {
                    msg.style.color = "green";
                } else {
                    msg.style.color = "red";
                }
            })
            .catch(error => console.error('Error:', error));
        }
    } else {
        msg.innerHTML = "Cannot be empty!";
        msg.style.color = "red";
    }
});

// month year calculation, adapted from https://classes.engineering.wustl.edu/cse330/index.php?title=JavaScript_Calendar_Library
(function () { Date.prototype.deltaDays = function (c) { return new Date(this.getFullYear(), this.getMonth(), this.getDate() + c) }; Date.prototype.getSunday = function () { return this.deltaDays(-1 * this.getDay()) } })();
function Week(c) { this.sunday = c.getSunday(); this.nextWeek = function () { return new Week(this.sunday.deltaDays(7)) }; this.prevWeek = function () { return new Week(this.sunday.deltaDays(-7)) }; this.contains = function (b) { return this.sunday.valueOf() === b.getSunday().valueOf() }; this.getDates = function () { for (var b = [], a = 0; 7 > a; a++)b.push(this.sunday.deltaDays(a)); return b } }
function Month(c, b) { this.year = c; this.month = b; this.nextMonth = function () { return new Month(c + Math.floor((b + 1) / 12), (b + 1) % 12) }; this.prevMonth = function () { return new Month(c + Math.floor((b - 1) / 12), (b + 11) % 12) }; this.getDateObject = function (a) { return new Date(this.year, this.month, a) }; this.getWeeks = function () { var a = this.getDateObject(1), b = this.nextMonth().getDateObject(0), c = [], a = new Week(a); for (c.push(a); !a.contains(b);)a = a.nextWeek(), c.push(a); return c } };

// initalize calendar viiew, set month year to today
let nowDate = new Date();
let nowYear = nowDate.getFullYear();
let nowMonth = nowDate.getMonth();
let nowDay = nowDate.getDate();
let events = [];
let is_login;
let user_id;
// record current day
const currYear = nowYear;
const currMonth = nowMonth;
const currDay = nowDay;
// convert month from int to str
let month_dict = {
    0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun",
    6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec",
};
// check if user is logged in
fetch("./isLogin.php", {})
    .then(res => res.json())
    .then(function (result) {
        if (result['isLogin']) {
            is_login = true;
            token = result['token'];
        } else {
            is_login = false;
            token = "";
        }
        // update page content based on login status
        showShareUsers();
        createCalendar(nowYear, nowMonth, token);
        getSharedUserCalendars();
    })
    .catch(error => console.error('Error:', error));
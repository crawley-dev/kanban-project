"use strict";
// TODO(TOM): click edit doesn't work with drag and drop
/*********************
 * Creating Elements *
 ********************/
function createTicket(list_id, id, ticketData) {
    var ticket = document.createElement('div');
    ticket.className = 'ticket';
    ticket.id = "list_".concat(list_id, "_ticket_").concat(id);
    ticket.draggable = true;
    ticket.innerHTML = "\n        <div class=\"ticketHeader\">\n            <div class=\"ticketName\" onclick=\"this.contentEditable='true';\"><h3>".concat(ticketData.title, "</h3></div>\n            <div class=\"ticketLabel\" onclick=\"this.contentEditable='true';\"><h3>").concat(ticketData.label, "</h3></div>\n            <button class=\"deleteButton\" onclick=\"this.parentElement.parentElement.remove();\">X</button>\n        </div>\n        <p onclick=\"this.contentEditable='true';\">").concat(ticketData.description, "</p>\n    ");
    ticket.addEventListener('mousedown', function (event) {
        setTimeout(function () {
            if (!mouseState.isDown)
                return;
            var rect = ticket.getBoundingClientRect();
            offset = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            };
            draggedElement = ticket;
            draggedElement.style.position = 'absolute';
            draggedElement.style.zIndex = '1000';
            draggedElement.className = "draggedTicket";
            var listId = draggedElement.id.split('_')[1];
            draggedElementSourceListId = parseInt(listId);
            document.body.appendChild(draggedElement);
            moveAt(event.pageX, event.pageY);
        }, 150);
    });
    return ticket;
}
function createList(list_id, title, ticketsData) {
    var list = document.createElement('div');
    list.className = 'listCont';
    list.id = list_id.toString();
    var listTitle = document.createElement('div');
    listTitle.className = 'listTitle';
    listTitle.innerHTML = "\n    <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M7 2C7 2.26522 6.89464 2.51957 6.70711 2.70711C6.51957 2.89464 6.26522 3 6 3C5.73478 3 5.48043 2.89464 5.29289 2.70711C5.10536 2.51957 5 2.26522 5 2C5 1.73478 5.10536 1.48043 5.29289 1.29289C5.48043 1.10536 5.73478 1 6 1C6.26522 1 6.51957 1.10536 6.70711 1.29289C6.89464 1.48043 7 1.73478 7 2ZM10 2C10 2.26522 9.89464 2.51957 9.70711 2.70711C9.51957 2.89464 9.26522 3 9 3C8.73478 3 8.48043 2.89464 8.29289 2.70711C8.10536 2.51957 8 2.26522 8 2C8 1.73478 8.10536 1.48043 8.29289 1.29289C8.48043 1.10536 8.73478 1 9 1C9.26522 1 9.51957 1.10536 9.70711 1.29289C9.89464 1.48043 10 1.73478 10 2ZM7 5C7 5.26522 6.89464 5.51957 6.70711 5.70711C6.51957 5.89464 6.26522 6 6 6C5.73478 6 5.48043 5.89464 5.29289 5.70711C5.10536 5.51957 5 5.26522 5 5C5 4.73478 5.10536 4.48043 5.29289 4.29289C5.48043 4.10536 5.73478 4 6 4C6.26522 4 6.51957 4.10536 6.70711 4.29289C6.89464 4.48043 7 4.73478 7 5ZM10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6C8.73478 6 8.48043 5.89464 8.29289 5.70711C8.10536 5.51957 8 5.26522 8 5C8 4.73478 8.10536 4.48043 8.29289 4.29289C8.48043 4.10536 8.73478 4 9 4C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5ZM7 8C7 8.26522 6.89464 8.51957 6.70711 8.70711C6.51957 8.89464 6.26522 9 6 9C5.73478 9 5.48043 8.89464 5.29289 8.70711C5.10536 8.51957 5 8.26522 5 8C5 7.73478 5.10536 7.48043 5.29289 7.29289C5.48043 7.10536 5.73478 7 6 7C6.26522 7 6.51957 7.10536 6.70711 7.29289C6.89464 7.48043 7 7.73478 7 8ZM10 8C10 8.26522 9.89464 8.51957 9.70711 8.70711C9.51957 8.89464 9.26522 9 9 9C8.73478 9 8.48043 8.89464 8.29289 8.70711C8.10536 8.51957 8 8.26522 8 8C8 7.73478 8.10536 7.48043 8.29289 7.29289C8.48043 7.10536 8.73478 7 9 7C9.26522 7 9.51957 7.10536 9.70711 7.29289C9.89464 7.48043 10 7.73478 10 8ZM7 11C7 11.2652 6.89464 11.5196 6.70711 11.7071C6.51957 11.8946 6.26522 12 6 12C5.73478 12 5.48043 11.8946 5.29289 11.7071C5.10536 11.5196 5 11.2652 5 11C5 10.7348 5.10536 10.4804 5.29289 10.2929C5.48043 10.1054 5.73478 10 6 10C6.26522 10 6.51957 10.1054 6.70711 10.2929C6.89464 10.4804 7 10.7348 7 11ZM10 11C10 11.2652 9.89464 11.5196 9.70711 11.7071C9.51957 11.8946 9.26522 12 9 12C8.73478 12 8.48043 11.8946 8.29289 11.7071C8.10536 11.5196 8 11.2652 8 11C8 10.7348 8.10536 10.4804 8.29289 10.2929C8.48043 10.1054 8.73478 10 9 10C9.26522 10 9.51957 10.1054 9.70711 10.2929C9.89464 10.4804 10 10.7348 10 11ZM7 14C7 14.2652 6.89464 14.5196 6.70711 14.7071C6.51957 14.8946 6.26522 15 6 15C5.73478 15 5.48043 14.8946 5.29289 14.7071C5.10536 14.5196 5 14.2652 5 14C5 13.7348 5.10536 13.4804 5.29289 13.2929C5.48043 13.1054 5.73478 13 6 13C6.26522 13 6.51957 13.1054 6.70711 13.2929C6.89464 13.4804 7 13.7348 7 14ZM10 14C10 14.2652 9.89464 14.5196 9.70711 14.7071C9.51957 14.8946 9.26522 15 9 15C8.73478 15 8.48043 14.8946 8.29289 14.7071C8.10536 14.5196 8 14.2652 8 14C8 13.7348 8.10536 13.4804 8.29289 13.2929C8.48043 13.1054 8.73478 13 9 13C9.26522 13 9.51957 13.1054 9.70711 13.2929C9.89464 13.4804 10 13.7348 10 14Z\" fill=\"black\"/>\n    </svg> \n    <h1 onclick=\"this.contentEditable='true';\">".concat(title, "</h1>\n    <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>\n    ");
    var deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.innerText = "X";
    deleteButton.style.marginRight = "5px";
    deleteButton.onclick = function () { list.innerHTML = ""; list.remove(); };
    listTitle.appendChild(deleteButton);
    list.appendChild(listTitle);
    var tickets = document.createElement('div');
    tickets.className = 'tickets';
    for (var i = 0; i < ticketsData.length; i++) {
        var ticket = createTicket(list_id, i, ticketsData[i]);
        tickets.appendChild(ticket);
    }
    list.appendChild(tickets);
    var newTicket = document.createElement('button');
    newTicket.className = 'addNewTicket';
    newTicket.innerText = "Add new Ticket";
    newTicket.onclick = function () { addNewTicket(list_id); };
    newTicket.innerHTML = "\n    <svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <g clip-path=\"url(#clip0_602_121)\">\n            <path d=\"M10.5 0.75C10.6989 0.75 10.8897 0.829018 11.0303 0.96967C11.171 1.11032 11.25 1.30109 11.25 1.5V10.5C11.25 10.6989 11.171 10.8897 11.0303 11.0303C10.8897 11.171 10.6989 11.25 10.5 11.25H1.5C1.30109 11.25 1.11032 11.171 0.96967 11.0303C0.829018 10.8897 0.75 10.6989 0.75 10.5V1.5C0.75 1.30109 0.829018 1.11032 0.96967 0.96967C1.11032 0.829018 1.30109 0.75 1.5 0.75H10.5ZM1.5 0C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5L0 10.5C0 10.8978 0.158035 11.2794 0.43934 11.5607C0.720644 11.842 1.10218 12 1.5 12H10.5C10.8978 12 11.2794 11.842 11.5607 11.5607C11.842 11.2794 12 10.8978 12 10.5V1.5C12 1.10218 11.842 0.720644 11.5607 0.43934C11.2794 0.158035 10.8978 0 10.5 0L1.5 0Z\" fill=\"black\" stroke=\"black\" stroke-width=\"1.1\"/>\n            <path d=\"M6 3C6.09946 3 6.19484 3.03951 6.26517 3.10984C6.33549 3.18016 6.375 3.27554 6.375 3.375V5.625H8.625C8.72446 5.625 8.81984 5.66451 8.89017 5.73484C8.96049 5.80516 9 5.90054 9 6C9 6.09946 8.96049 6.19484 8.89017 6.26517C8.81984 6.33549 8.72446 6.375 8.625 6.375H6.375V8.625C6.375 8.72446 6.33549 8.81984 6.26517 8.89017C6.19484 8.96049 6.09946 9 6 9C5.90054 9 5.80516 8.96049 5.73484 8.89017C5.66451 8.81984 5.625 8.72446 5.625 8.625V6.375H3.375C3.27554 6.375 3.18016 6.33549 3.10984 6.26517C3.03951 6.19484 3 6.09946 3 6C3 5.90054 3.03951 5.80516 3.10984 5.73484C3.18016 5.66451 3.27554 5.625 3.375 5.625H5.625V3.375C5.625 3.27554 5.66451 3.18016 5.73484 3.10984C5.80516 3.03951 5.90054 3 6 3Z\" fill=\"black\"stroke=\"black\" stroke-width=\"1.1\"/>\n        </g>\n        <defs>\n            <clipPath id=\"clip0_602_121\">\n                <rect width=\"12\" height=\"12\" fill=\"white\"/>\n            </clipPath>\n        </defs>\n    </svg>\n    <h3>&nbsp;Add New Card</h3>\n    ";
    list.appendChild(newTicket);
    return list;
}
/****************
 * Add New Item *
 ***************/
function addNewTicket(parentId) {
    var _a;
    console.log("Adding new ticket to list: " + parentId);
    var lists = Array.from(document.querySelectorAll(".listCont"));
    var list = lists[parentId];
    var nextTicketId = list.querySelectorAll(".ticket").length;
    var ticket = createTicket(parentId, nextTicketId, { title: "New Card", label: "label", description: "test description" });
    (_a = list.querySelector(".tickets")) === null || _a === void 0 ? void 0 : _a.appendChild(ticket);
}
function addNewList() {
    var _a, _b, _c;
    var len = (_b = (_a = document.querySelector('.board')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.listCont').length) !== null && _b !== void 0 ? _b : 0;
    var list = createList(len, "New List", []);
    (_c = document.querySelector('.board')) === null || _c === void 0 ? void 0 : _c.appendChild(list);
}
function moveTicket(targetListId, ticketId, ticketNewId) {
    var targetList = document.getElementById(targetListId.toString());
    if (targetList === null) {
        console.log("Can't move ticket to this list:  ", targetListId);
        return;
    }
    if (draggedElement === null) {
        console.log("Can't find ticket to move");
        return;
    }
    var tickets = targetList.querySelector(".tickets");
    if (tickets === null) {
        console.log("Can't find tickets container in list");
        return;
    }
    var children = Array.from(tickets.childNodes);
    var newTicket = createTicket(targetListId, ticketNewId + 1, {
        title: draggedElement.querySelector(".ticketName h3").innerText,
        label: draggedElement.querySelector(".ticketLabel h3").innerText,
        description: draggedElement.querySelector("p").innerText,
    });
    var ticket = children[ticketId];
    console.log(ticket);
    if (ticketNewId + 1 >= children.length) {
        tickets.appendChild(newTicket);
    }
    else {
        tickets.insertBefore(newTicket, children[ticketNewId]);
    }
    draggedElement.remove();
}
/****************************
 * Save and Load Board Data *
 ***************************/
function populateBoardNamesInDropdown() {
    var saved_data = localStorage.getItem("kanban-boards");
    if (saved_data === "[object Object]" || saved_data === null) {
        console.log("No boards saved in local storage");
        return;
    }
    var boards = JSON.parse(saved_data);
    var dropdown = document.querySelector("#board_dropdown");
    if (dropdown === null)
        return;
    dropdown.innerHTML = ""; // reset
    for (var i = 0; i < boards.length; i++) {
        var option = document.createElement("option");
        option.innerText = boards[i].title;
        option.value = i.toString();
        dropdown.appendChild(option);
    }
}
function onSelectChange(selectObject) {
    var selected_board = selectObject.value;
    var board = document.querySelector(".board");
    if (board === null) {
        console.log("Board not found");
        return;
    }
    board.innerHTML = "";
    loadBoardFromLocal();
}
function loadBoardFromLocal() {
    var element = document.querySelector("#board_dropdown");
    var id = parseInt(element.value);
    var saved_data = localStorage.getItem("kanban-boards");
    if (saved_data === "[object Object]" || saved_data === null) {
        console.log("board ".concat(id, " is not saved in local storage"));
        return;
    }
    var boards = JSON.parse(saved_data);
    var board = boards[id];
    board.lists.forEach(function (list) {
        var _a;
        var listElement = createList(parseInt(list.id), list.title, list.tickets);
        (_a = document.querySelector('.board')) === null || _a === void 0 ? void 0 : _a.appendChild(listElement);
    });
    document.querySelector("#board_name").innerText = board.title;
}
function getCurBoardData() {
    var board = {
        title: document.querySelector("#board_name").innerText,
        lists: [],
    };
    document.querySelectorAll(".listCont").forEach(function (listCont) {
        var listData = {
            id: listCont.id,
            title: listCont.querySelector(".listTitle h1").innerText,
            tickets: [],
        };
        listCont.querySelectorAll(".ticket").forEach(function (ticket) {
            var ticketData = {
                title: ticket.querySelector(".ticketName h3").innerText,
                label: ticket.querySelector(".ticketLabel h3").innerText,
                description: ticket.querySelector("p").innerText,
            };
            console.log("Saving: ".concat(ticketData));
            listData.tickets.push(ticketData);
        });
        board.lists.push(listData);
    });
    return board;
}
function saveBoardToLocal() {
    var curBoardData = getCurBoardData();
    if (curBoardData === null || curBoardData.lists.length === 0) {
        console.log("No data to save");
        return;
    }
    var saved_data = localStorage.getItem("kanban-boards");
    if (saved_data === "[object Object]" || saved_data === null) {
        localStorage.setItem("kanban-boards", JSON.stringify([curBoardData]));
        return;
    }
    // else update the board data
    var boardsData = JSON.parse(saved_data);
    var boardName = document.querySelector("#board_name").innerText;
    var cur_board = null;
    var boardIndex = -1;
    for (var i = 0; i < boardsData.length; i++) {
        if (boardsData[i].title === boardName) {
            cur_board = boardsData[i];
            boardIndex = i;
            break;
        }
    }
    if (cur_board === null) {
        boardsData.push(curBoardData);
    }
    else {
        boardsData[boardIndex] = curBoardData;
    }
    localStorage.setItem("kanban-boards", JSON.stringify(boardsData));
    console.log("Board data saved to local storage ", boardName);
    setTimeout(populateBoardNamesInDropdown, 300);
}
function deleteBoardFromLocal() {
    var curBoardName = document.querySelector("#board_name").innerText;
    var saved_data = localStorage.getItem("kanban-boards");
    if (saved_data === "[object Object]" || saved_data === null) {
        console.log("No boards saved in local storage, unable to delete ", curBoardName);
        return;
    }
    var boardsData = JSON.parse(saved_data);
    var newData = boardsData.filter(function (board) { return board.title !== curBoardName; });
    localStorage.setItem("kanban-boards", JSON.stringify(newData));
    document.querySelector('.board').innerHTML = "";
    console.log("Deleted board from local storage ", curBoardName);
    setTimeout(populateBoardNamesInDropdown, 300);
}
function resetLocalStorage() {
    localStorage.clear();
    localStorage.setItem("kanban-boards", JSON.stringify([{ title: "Default Board", lists: [] }]));
    setTimeout(populateBoardNamesInDropdown, 300);
}
/****************
 * Startup Code *
 ***************/
var draggedElement = null;
var offset = { x: 0, y: 0 };
var draggedElementSourceListId = -1;
function moveAt(pageX, pageY) {
    if (draggedElement === null)
        return;
    draggedElement.style.left = pageX - offset.x + 'px';
    draggedElement.style.top = pageY - offset.y + 'px';
}
document.addEventListener('mousemove', function (event) {
    if (draggedElement === null)
        return;
    moveAt(event.pageX, event.pageY);
});
document.addEventListener('mouseup', function (event) {
    if (draggedElement === null)
        return;
    // TODO(TOM): add to closest list, or place back in original list
    var lists = Array.from(document.querySelectorAll(".listCont"));
    var listsBounds = lists.map(function (list) { return list.getBoundingClientRect(); });
    var draggedBounds = draggedElement.getBoundingClientRect();
    var ticketPlaced = false;
    for (var i = 0; i < listsBounds.length; i++) {
        var listBound = listsBounds[i];
        if (event.x < listBound.left || event.x > listBound.right || event.y < listBound.top || event.y > listBound.bottom)
            continue;
        var tickets = lists[i].querySelectorAll('.ticket');
        for (var j = 0; j < tickets.length; j++) {
            var ticketBound = tickets[j].getBoundingClientRect();
            console.log("".concat(ticketBound.top, " .. ").concat(event.y));
            if (ticketBound.top > event.y) {
                console.log("Adding to list ", lists[i].id, " after index ", j);
                moveTicket(parseInt(lists[i].id), parseInt(draggedElement.id.split('_')[2]), j);
                ticketPlaced = true;
                break;
            }
        }
        if (ticketPlaced === false) {
            // Not in betwetween tickets, append to the end of the list 
            console.log("Adding to end of list ", lists[i].id);
            moveTicket(parseInt(lists[i].id), parseInt(draggedElement.id.split('_')[2]), 10000);
            ticketPlaced = true;
        }
    }
    // Not hovering over a list, send it back to the source list.
    if (ticketPlaced === false) {
        console.log("Adding back to source list ", draggedElementSourceListId);
        moveTicket(draggedElementSourceListId, parseInt(draggedElement.id.split('_')[2]), 1000000);
    }
    draggedElement = null;
});
document.addEventListener('DOMContentLoaded', populateBoardNamesInDropdown);
var mouseState = {
    x: 0,
    y: 0,
    isDown: false,
};
document.addEventListener('mousemove', function (event) {
    mouseState.x = event.clientX;
    mouseState.y = event.clientY;
});
document.addEventListener('mousedown', function () {
    mouseState.isDown = true;
});
document.addEventListener('mouseup', function () {
    mouseState.isDown = false;
});

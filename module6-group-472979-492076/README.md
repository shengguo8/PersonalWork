# CSE330
# CSE330
### Albert Yang, 492076, HappyEureka
### Sheng Guo, 472979, shengguo8

### Link: http://ec2-3-142-47-53.us-east-2.compute.amazonaws.com:3456/


### About this website:
1. This website allows users to communicate chats through a chat service.
2. Once logged in under an arbitrary and unique username (we will check and display error msg is username is not unique), users are able to view all the chat rooms currently active.
3. The user can either join a password-protected chat (private room), a password-free chat (publiic room), or create their own chat (can optionally enter a password to make the room private).
4. Once logged into a chat, users can message the entire chat as well as send private messages to other users in the same chat by optionally specifying the other users' username. If specified, the chat will only avaliable for view between the sender and selected reciever.
    - If the user is the creator of the chat they are in, they are automatically the admin of the room. They are able to kick other users and ban them from the chat.
	- Users see a display of all the active users in the chat and admin(s), and banned user(s).
5. Passes the html validator.
7. When a message is sent, the user will 
6. node-modules folder is ignored by version control
7. Admin can kick/ban others. When kicked, the user is simply forced to leave the room; when banned, the user is forced to leave the room and will be unable to rejoin.

### Creative:
1. Upload image
	- In addition to messaging, users have the option to upload images to a chat using Blob and URL.createObjectURL().
        - This holds all the functionality as standard messaging, and is also formatted to fit the chat visuals. 

2. Transfer admin
    - Room admin can assign other users as admins. Once assigned, the other user becomes admin, so that they can kick/ban/assign others as the admin. This can be accomplished by selecting the "Make admin" button in the user list. Once selected, the user being transferred to will be able to have the same privileges as the original creator and admin.

3. Deleting chat room
    - The admin of a chat room is able to delete the chat room they created.
    - When deleting, all users in the room will be kicked out and the room will be destroyed from public view. No one will be able to join this room again.

### Login Info:
1. Register a new account
2. Tip: Try opening different tabs all at once to see the live updates in the chat!
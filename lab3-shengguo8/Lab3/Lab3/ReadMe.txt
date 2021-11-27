//Author: Sheng Guo, g.sheng@wustl.edu, Lab 3

Errors:
1>H:\Lab3\Lab3\Lab3\Lab3.cpp(30,21): error C2440: 'return': cannot convert from 'int (__cdecl *)(std::string,std::string)' to 'int'
error C2259: 'tictactoegame': cannot instantiate abstract class
'tictactoegame::done': pure specifier or abstract override specifier only allowed on virtual function
no appropriate default constructor available

Output:
1. A game that finishes in a draw.

Player X turnType 'Quit', or the coordinates you wish to place your piece in  'x,y' format3,1
TEAM X PLAY
4
3   X X O
2   O O X
1   X O X
0
  0 1 2 3 4
game ended dra: 9 turn(s) played



2. A game that finishes in a player X win.

Player X turnType 'Quit', or the coordinates you wish to place your piece in  'x,y' format1,3
TEAM X PLAY
4
3   X O
2   X O
1   X
0
  0 1 2 3 4
player Y wins!!!

3. A game that finishes in a player quitting.
Player X turnType 'Quit', or the coordinates you wish to place your piece in  'x,y' format2,3
TEAM X PLAY
4
3   X X O
2     O
1   X O X
0
  0 1 2 3 4
Player O turnType 'Quit', or the coordinates you wish to place your piece in 'x,y' formatQuit
Type 'Quit', or the coordinates you wish to place your piece in 'x,y' formatQuit
User quit: 7 turn(s) played
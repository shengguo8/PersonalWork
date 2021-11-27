#pragma once
#include <string>
#include <iostream>
using namespace std;


enum colors {
	red, black, white, invalid, nocolor
};

string lowercaser(colors somecolor);
colors colorfinder(string inputcolor);

struct game_piece {
	game_piece(colors somecolor2, string name2, string piecedisplay2);
	colors somecolor;
	string name;
	string piecedisplay;
};
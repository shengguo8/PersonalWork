// author: Sheng Guo, g.sheng@wustl.edu, Lab 2
// includes functions that convert piece color
//
#include "Game.h"
using namespace std;

game_piece::game_piece(colors somecolor2, string name2, string piecedisplay2)
	:somecolor(somecolor2), name(name2), piecedisplay(piecedisplay2) {}

string lowercaser(colors somecolor) {
	if (somecolor == red) {
		return "red";
	}
	else if (somecolor == black) {
		return "black";
	}
	else if (somecolor == white) {
		return "white";
	}
	else if (somecolor == nocolor) {
		return "nocolor";
	}
	else {
		return "invalid";
	}
}

colors colorfinder(string inputcolor) {
	if (inputcolor == "red") {
		return colors::red;
	}
	else if (inputcolor == "black") {
		return colors::black;
	}
	else if (inputcolor == "white") {
		return colors::white;
	}
	else if (inputcolor == "nocolor") {
		return colors::nocolor;
	}
	else {
		return colors::invalid;
	}
}
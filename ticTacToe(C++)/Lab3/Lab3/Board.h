#pragma once
#include "Lab3.h" //header file
#include "Game.h" //header file
#include <sstream>
#include <iostream>

using namespace std;

class tictactoegame 
{
public:
	tictactoegame(unsigned int, unsigned int);
	friend std::ostream& operator<<(std::ostream&some_input, const tictactoegame&);
	virtual bool done();
	virtual bool draw ();
	virtual void print();
	int prompt(unsigned int&, unsigned int&);
	int turn();
	unsigned int whoseturn = 0;
	
	static tictactoegame *thegame(int, char* []);
	int play();
private:
	const unsigned int height_;
	const unsigned int width_;
	vector<game_piece>tictacpiece;
	const unsigned int piecenumber_;
	unsigned int showLength_;

};


ostream& operator<<(ostream&some_input, const tictactoegame&);

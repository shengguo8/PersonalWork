// author: Sheng Guo, g.sheng@wustl.edu, Lab 2
// includes functions that create game, takes input, determines player, and outputs board
//

using namespace std;
#include "Board.h"
#include "Game.h"
#include "Lab3.h"

//declaration for tictactoegame
tictactoegame::tictactoegame(unsigned int height, unsigned int width) :width_(width), height_(height), piecenumber_(width_* height_), showLength_(1)
{
	for (unsigned int f = 0; f < piecenumber_; f++) {
		game_piece piece(nocolor, "", " ");
		tictacpiece.push_back(piece);
	}
};

//determines when the game ends
bool tictactoegame::done() 
{
	bool row1 = (tictacpiece[6].piecedisplay == tictacpiece[7].piecedisplay) && (tictacpiece[7].piecedisplay == tictacpiece[8].piecedisplay) && (tictacpiece[8].piecedisplay == tictacpiece[6].piecedisplay) && ((tictacpiece[6].piecedisplay == "X") || (tictacpiece[6].piecedisplay == "O"));
	bool row2 = (tictacpiece[11].piecedisplay == tictacpiece[12].piecedisplay) && (tictacpiece[12].piecedisplay == tictacpiece[13].piecedisplay) && (tictacpiece[13].piecedisplay == tictacpiece[11].piecedisplay) && ((tictacpiece[14].piecedisplay == "X") || (tictacpiece[6].piecedisplay == "O"));
	bool row3 = (tictacpiece[16].piecedisplay == tictacpiece[17].piecedisplay) && (tictacpiece[17].piecedisplay == tictacpiece[18].piecedisplay) && (tictacpiece[18].piecedisplay == tictacpiece[19].piecedisplay) && ((tictacpiece[16].piecedisplay == "X") || (tictacpiece[6].piecedisplay == "O"));
	bool col1 = (tictacpiece[6].piecedisplay == tictacpiece[11].piecedisplay) && (tictacpiece[11].piecedisplay == tictacpiece[16].piecedisplay) && (tictacpiece[16].piecedisplay == tictacpiece[6].piecedisplay) && ((tictacpiece[6].piecedisplay == "X") || (tictacpiece[6].piecedisplay == "O"));
	bool col2 = (tictacpiece[7].piecedisplay == tictacpiece[12].piecedisplay) && (tictacpiece[12].piecedisplay == tictacpiece[17].piecedisplay) && (tictacpiece[17].piecedisplay == tictacpiece[7].piecedisplay) && ((tictacpiece[7].piecedisplay == "X") || (tictacpiece[6].piecedisplay == "O"));
	bool col3 = (tictacpiece[8].piecedisplay == tictacpiece[13].piecedisplay) && (tictacpiece[13].piecedisplay == tictacpiece[18].piecedisplay) && (tictacpiece[18].piecedisplay == tictacpiece[8].piecedisplay) && ((tictacpiece[8].piecedisplay == "X") || (tictacpiece[6].piecedisplay == "O"));
	bool diag1 = (tictacpiece[16].piecedisplay == tictacpiece[12].piecedisplay) && (tictacpiece[12].piecedisplay == tictacpiece[8].piecedisplay) && (tictacpiece[8].piecedisplay == tictacpiece[16].piecedisplay) && ((tictacpiece[8].piecedisplay == "X") || (tictacpiece[6].piecedisplay == "O"));
	bool diag2 = (tictacpiece[6].piecedisplay == tictacpiece[18].piecedisplay) && (tictacpiece[18].piecedisplay == tictacpiece[12].piecedisplay) && (tictacpiece[12].piecedisplay == tictacpiece[6].piecedisplay) && ((tictacpiece[6].piecedisplay == "X") || (tictacpiece[6].piecedisplay == "O"));

	if ((row1 == true) || (row2 == true) || (row3 == true) || (col1 == true) || (col2 == true) || (col3 == true) || (diag1 == true) || (diag2 == true)) 
	{
		return true;
}
	else 
	{
		return false;
	}
};

//Asks user for input and extracts int if valid format, quits if quit
int tictactoegame::prompt(unsigned int& one, unsigned int& two) 
{
	
	string firstnum;
	string secondnum;
	
	bool valid = false;
	while (valid != true) {
		string x;
		cout << "Type 'Quit', or the coordinates you wish to place your piece in  'x,y' format";
		cin >> x;
		if (x == "Quit") 
		{
			return quit;
		}
		//if int is entered, extracts ints
		else {
			for (unsigned int p = 0; p < x.length(); ++p)
			{
				if (x[p] == ',')
				{
					x[p] = ' ';
					break;
					}
				}
			istringstream iss(x);
			if ((iss >> one) && (iss >> two))
			{
				valid = true;
				return success;
			}
				else {
					valid = false;
					return failure;
				}
			
		}
	}

}

//determines whose turn, places piece in location entered
int tictactoegame::turn()
{

	unsigned int x;
	unsigned int y;
	bool valid = false;

	while (valid != true) {
		if (whoseturn == 0) {
			cout << "Player X turn";
		}
		else {
			cout << "Player O turn";
		}
			
			if (prompt(x, y) == success) {
					if (x >= 1 && x < (width_ - 1) && y >= 1 && y < (height_ - 1)) {
						if (tictacpiece[(width_ * y) + x].piecedisplay == " ") {
		
						if (whoseturn == 0) {
							(tictacpiece[(width_ * y) + x].piecedisplay = "X");
							(tictacpiece[(width_ * y) + x].somecolor = black);
							(tictacpiece[(width_ * y) + x].name = "TEAM X");
							cout << "TEAM X PLAY" << endl;
							print();
							//changes player for next turn
							if (whoseturn == 0) {
								++whoseturn;
							}
							else {
								--whoseturn;
							}
							return success;
						}
						else {
							(tictacpiece[(width_ * y) + x].piecedisplay = "O");
							(tictacpiece[(width_ * y) + x].somecolor = red);
							(tictacpiece[(width_ * y) + x].name = "TEAM Y");
							cout << "TEAM Y PLAY" << endl;
							//changes player for next turn
							print();
							if (whoseturn == 0) {
								++whoseturn;
							}
							else {
								--whoseturn;
							}
							return success;
						}
						
					}
					else {
							cout << "this space is taken";
					}
				}
				else {
						cout << "this space does not exist";
				}
			
			}
			else if (prompt(x, y) == quit) {
				return failure;
			}
}
	return failure;
}

void tictactoegame::print()
{
	cout << *this << endl;
}

//checks if game is drawn
bool tictactoegame::draw()
{
	unsigned int spotstaken = 0; 
	bool movepossible = true;
	for (unsigned int x = 1; x < (width_ - 1); ++x)
	{
		for (unsigned int y = 1; y < (height_ - 1); ++y)
		{
			if (tictacpiece[width_ * y + x].piecedisplay != " ") {
				spotstaken++;
			}
		}
	}
	if (spotstaken == 9) {
		return true;
		}
	else {
		return false;
	}
}

ostream& operator<<(ostream& some_input, const tictactoegame& curgame)
{
	for (int y = curgame.height_ - 1; y >= 0; --y)
	{
		some_input.width(1);
		some_input << y;
		for (unsigned int x = 0; x < curgame.width_; ++x)
		{
			some_input.width(1);
			some_input << " ";
			some_input.width(curgame.showLength_);
			some_input << right << curgame.tictacpiece[curgame.width_ * y + x].piecedisplay;
		}
		some_input << endl;
	}
	some_input.width(1);
	some_input << " ";
	for (unsigned int x = 0; x < curgame.width_; ++x)
	{
		some_input.width(1);
		some_input << " ";
		some_input.width(curgame.showLength_);
		some_input << right << x;
	}
	return some_input;
}

//so I can print in the main function
tictactoegame* tictactoegame::thegame(int, char* [])
{
	return new tictactoegame(5,5);
}

//calls other functions to start the game
int tictactoegame::play()
{
	print();
	unsigned int turns = 0;
	cout << endl;

	
	while (true) // repeats until the game ends (quit, draw, or win)
	{

		if (turn() == success)
		{
			++turns;
			if (done())
			{
				if (whoseturn == 0) {
					cout << "player X wins!!!";
				}
				else {
					cout << "player Y wins!!!";
				}
				print();
				return success;
			}
			else
			{
				if (draw())
				{
					cout << "game ended draw: " << turns << " turn(s) played" << endl;
					return drew;
				}
			}
		}
		else
		{
			cout << "user quit: " << turns << " turn(s) played" << endl;
			return quit;
		}

	}
}
//Author: Sheng Guo, g.sheng@wustl.edu, Lab 3
// reads and prints input file, checks for errors
//
#include <iostream>
#include <fstream>
using namespace std;
#include <sstream>
#include <vector>
#include "Lab3.h" //header file
#include "Board.h" //header file
#include "Game.h" //header file


int usage(string name, string functionneeded) {
    cout << "Usage: " << name << "<input_file_name>" << endl;
    return failure;

}

int main(int argc, char* argv[])
{
	tictactoegame* start = tictactoegame::thegame(argc, argv);
	if (start == 0)
	{
		return failure;
	}
	else
	{
		shared_ptr<tictactoegame> spg(start);
		int result = spg->play();
		return result;
	}
}
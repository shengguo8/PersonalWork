//includes variables so I don't have to use hard constants for proname, inputname, linenumbers, success, and failure
//Author: Sheng Guo, g.sheng@wustl.edu

#pragma once
#include <string>
#include <iostream>
#include <vector>
#include <fstream>
#include <sstream>
using namespace std;

enum args {
	proname, inputname, linenumbers
};
enum result {
	success, failure, file_read_error, noextract, noread, nodimension, piece_failed, wrongvectorsize, quit, drew, usager
};

int usage(string name, string functionneeded);

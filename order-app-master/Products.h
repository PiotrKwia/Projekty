#pragma once
#include <iostream>
/** Struktura zawierajaca wyglad danych w pliku i jak maja byc przyporzadkowywane*/
struct Przedstawienia
{
	std::string id;
	std::string name;
	std::string category;
	float price;
	std::string description;
	std::string display;
};

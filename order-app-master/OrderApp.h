#pragma once
#define __STDC_WANT_LIB_EXT1__ 1
#include <iostream>
#include <fstream>
#include <stdio.h>
#include <string>
#include <algorithm>
#include <vector>
#include <cstdlib>
#include <set>
#include <ctime>
#include <stdlib.h>
#include <time.h>
#include "Products.h";
#include "Order.h";

/** Funkcja inicjalizujaca projekt*/
namespace Start {

	/** Klasa glowna posiadajaca wiekszosc parametrow uzytych w programie*/
	class Rezerwacja{
		static std::string name;
		static char separator;
		std::fstream file;
		std::vector <Przedstawienia> Seans; ///< wektor przekierowujacy dane do sruktury przedstawienie
		std::vector <Order> nowyOrder; ///< wektor przekieowujacy nazwe seansu oraz cene do stworzenia paragonu
		std::set <std::string> categories;
		std::vector <int> separators; ///< wektor zawierajace oddzielacze w pliku
		std::string category;
		std::string zamowienie;

	public:
		
		Rezerwacja(std::string zamowienie) : zamowienie(zamowienie) {};

		/** Funkcja inicjalizujaca ladowanie kategorii z pliku oraz danych*/
		void init() {
			load_categories();
			load_data();
		}
		/** Funkcja wczytujaca kategorie przedstawien znajdujacych sie w danych*/
		void load_categories() {

			file.open("../baza.txt", std::ios::in);
			std::string line;

			do
			{
				getline(file, line);
				size_t znalezionaPozycja = line.find(separator);
				separators.push_back(znalezionaPozycja);
				if (znalezionaPozycja == std::string::npos)
				{
					std::cout << "Nie udalo sie odczytac danych z bazy" << std::endl;
					exit(0);
				}

				do
				{
					znalezionaPozycja = line.find(separator, znalezionaPozycja + 1);
					separators.push_back(znalezionaPozycja);
				} while (znalezionaPozycja != std::string::npos);

				category = line.substr(separators[1] + 2, (separators[2]) - (separators[1]) - 2);
				categories.insert(category);
				
				separators.clear();
			} while (!file.eof());
			file.close();
		}
		/** Funkcja wczytujaca dane przedstawien znajdujacych sie w danych*/
		void load_data() {
			
			file.open("../baza.txt", std::ios::in);
			std::string line;

			do
			{
				getline(file, line);
				size_t znalezionaPozycja = line.find(separator);
				separators.push_back(znalezionaPozycja);
				if (znalezionaPozycja == std::string::npos)
				{
					std::cout << "Nie udalo sie odczytac danych z bazy" << std::endl;
					exit(0);
				}

				do
				{
					znalezionaPozycja = line.find(separator, znalezionaPozycja + 1);
					separators.push_back(znalezionaPozycja);
				} while (znalezionaPozycja != std::string::npos);

				Seans.push_back({
					line.substr(0,separators[0]),
					line.substr(separators[0]+2,(separators[1])-(separators[0])-2),
					line.substr(separators[1]+2,(separators[2]) - (separators[1]) - 2),
					std::stof(line.substr(separators[2]+1,separators[3])),
					line.substr(separators[3]+2,std::string::npos),
					line
					});

				separators.clear();

			} while (!file.eof());

			file.close(); 
			showMenu();
		}
		/** Funkcja pokazujaca uzytkownikowi menu glowne*/
		void showMenu() {
			
			char choice_menu;
			std::cout << name << std::endl;
			int number = 1;

			for (auto iter = categories.begin(); iter != categories.end(); ++iter)
			{
				std::cout << number << " " << *iter << std::endl;
				number++;
			}
			
			std::cout << std::endl << '0' << " Zloz rezerwacje" << std::endl;
			std::cout << 'R' << " Wyczysc rezerwacje" << std::endl << std::endl;
			
			do
			{
				std::cout << "Wprowadz numer: ";
				std::cin >> choice_menu;
				choice_menu = toupper(choice_menu);
				switch (choice_menu)
				{	
					case '1': openCategory("Romans");
						break;
					case '2': openCategory("Komedia");
						break;
					case '3': openCategory("Tragedia");
						break;
					case 'R': nowyOrder.clear();
						std::cout << "[#] Zamowienie wyczyszczone!" << std::endl;
						break;
					case '0': completeOrder();
						std::cout << "[#] Rezerwacja " << nowyOrder.size() << " Nr rezerwacji " << zamowienie << " zostalo skompletowane. " << std::endl;
						exit(0);
						break;
					default:
						std::cout << "[ERR] Nieprawidlowy znak. Sprobuj ponownie!" << std::endl;
				}
			} while (choice_menu != '0');
		}
		/** Funkcja wypisujaca zawartosc wybranej kategorii
		@param wybrana kategoria*/
		void openCategory(std::string c) {
			
			std::string choice_category;
			system("CLS");
			std::cout << "|---------| " << c << " |---------|" << std::endl << std::endl;

			for (auto x : Seans) {
				if (x.category == c) {	
					std::cout.flags(std::ios_base::left);
					std::cout.width(3);
					std::cout << x.id;
						
					std::cout.flags(std::ios_base::left);
					std::cout.width(25);
					std::cout << x.name;

					std::cout.flags(std::ios_base::left);
					std::cout.width(5);
					std::cout << x.price;

					std::cout.flags(std::ios_base::left);
					std::cout.width(70);
					std::cout << x.description;

					std::cout << std::endl;
				}
			}

			std::cout.flags(std::ios_base::left);
			std::cout.width(2);
			std::cout << "0" << " Powrot" << std::endl << std::endl;

			do {
				std::cout << "Wprowadz numer: ";
				std::cin >> choice_category;
				for (auto x : Seans) {
					if (x.category == c && x.id == choice_category) {
						nowyOrder.push_back({ x.name, x.price });
						std::cout << "[+] " << x.name << " " << x.price << "PLN" << std::endl;
					}
				}
			} while (choice_category != "0");

			system("CLS");
			showMenu();	
		}
		/** Funkcja tworzaca paragon oraz tworzaca plik z nim*/
		void completeOrder() {

			std::string fileName = "";
			float total_price = 0.00;

			time_t timeSince1970 = time(NULL);
			
			struct tm timeNow;
			localtime_s(&timeNow, &timeSince1970);
			
			fileName = "S" + zamowienie + "_" + std::to_string(timeNow.tm_hour) + "_" + std::to_string(timeNow.tm_min) + ".txt";

			std::ofstream save(fileName);
			save << "Rezerwacja nr " << this->zamowienie << std::endl;
			save << timeNow.tm_hour << ":" << timeNow.tm_min << std::endl << "=====================" << std::endl;
			for (auto product : nowyOrder) {
				save << product.price << " PLN | " << product.name << "\t" << std::endl;
				total_price += product.price;
			}
			save << "=====================" << std::endl << "Do zaplacenia: " << total_price << " PLN";

			save.close();
		}
	};
}


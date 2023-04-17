/** @file */

#ifndef HEADER_H
#define HEADER_H

#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <sstream>

/** Funkcje Bramek logicznych*/
bool NOT(bool a); ///< Bramka NOT
bool AND(bool a, bool b); ///< Bramka AND
bool NAND(bool a, bool b); ///< Bramka NAND
bool OR(bool a, bool b); ///< Bramka OR
bool NOR(bool a, bool b); ///< Bramka NOR
bool XOR(bool a, bool b); ///< Bramka XOR
bool XNOR(bool a, bool b); ///< Bramka XNOR
/** Struktura Wezla*/
struct Wezel {
    int nrWezla; ///< Numer wezla
    int wartosc = -1; ///< Wartosc wezla
};
/** Struktura Bramki*/
struct Bramka {
    std::string TypBramki; ///< Sprawdzenie Typu Bramki Logicznej
    Wezel nrWejscia1; ///< Numer wejscia bramki logicznej
    Wezel nrWejscia2; ///< Numer wejscia bramki logicznej
    Wezel nrWyjscia; ///< Numer wyjscia z bramki logicznej
};


/** Funkcja pobierajaca dane z pliku pierwszego oraz wykonujonca nastepne funkcje
@param Nazwa pliku z ktorego odczytywany jest uklad bramek
@param Nazwa pliku z wartosciami bramek logicznych
@param Nazwa pliku z wynikami rozwiazanego ukladu
@return Przyporadkowanie wartosci do ukladu bramek*/
std::vector<Bramka> pobierzUklad(std::string nazwaPliku, std::string nazwaPlikuUklady, std::string nazwaPlikuWyniki);

/** Funkcja pobierajonca daze z pliku drugiego oraz je przyporzondkuwujonca
@param Nazwa pliku z wartosciami poczatkowymi ukladu
@return Pobranie wartosci wezlow startowych z pliku*/
std::vector<Wezel> pobierzWartosci(std::string nazwaPliku);

/** Funkcja pobierajaca dane z dwoch plikow oraz rozwiazujaca uklad bramek logicznych
@param Wartosci poczatkowe ukladu
@param Uklad bramek logicznych
@param Numer wyjscia z ostatniej bramki w ukladzie
@param Nazwa pliku wyjscowego
@return Wynik przejscia przez bramki logiczne wartosci wezlow*/
std::vector<std::string> rozwiazUklad(std::vector<Wezel> wartosciPoczatkowe, std::vector<Bramka> Bramki, int outNr, std::string nazwaPlikuWyniki);

/** Funkcja zapisujaca rozwiazanie ukladu do pliku
@param Nazwa pliku do jakiego ma byc wynik zapisany
@param Dane z wartosciami poczatkowymi i koncowymi*/
void zapiszWyniki(std::string nazwaPliku, std::vector<std::string> dane);

#endif //HEADER_H
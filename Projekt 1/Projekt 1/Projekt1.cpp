#include "header.h"

using namespace std;
int main(int argc, char* argv[])
{
    string uklad;
    string wartosci;
    string wyniki;

    if (argc > 1 && std::string(argv[1]) == "-h")
    {
        std::cout << "Pliki dostepne\n\t-u uklady\n\t-w wartosci\n\t-o wyniki wyjsciowe\n\n";
        return 0;
    }
    if (argc > 7)
    {
        std::cout << "Za duzo argumentow\n";
        return 0;
    }
    if (argc < 7)
    {
        std::cout << "Za malo argumentow\n";
        return 0;
    }

    for (int i = 1; i < argc; i++)
    {
        if (std::string(argv[i]) == "-u")
        {
            uklad = std::string(argv[++i]);
        }
        else if (std::string(argv[i]) == "-w")
        {
            wartosci = std::string(argv[++i]);
        }
        else if (std::string(argv[i]) == "-o")
        {
            wyniki = std::string(argv[++i]);
        }
    }

    vector<Bramka> Bramki = pobierzUklad(uklad, wartosci, wyniki);
    //vector<Wezel> wartosciPoczatkowe = pobierzWartosci("wartosci.txt");
    //vector<string> doPlikuWyjsciowego = rozwiazUklad(wartosciPoczatkowe, Bramki,8); //łączymy dwie zmienne i dajemy do 1 funkcji  (rozwiąż układ)
    //zapiszWyniki("wyniki.txt", doPlikuWyjsciowego); // tworzy plik o danej nazwie jesli nie istnieje

    return 0;
}
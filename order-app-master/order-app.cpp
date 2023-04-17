#include <iostream>
#include "OrderApp.h";
#include "Products.h";
#include "Order.h";
std::string Start::Rezerwacja::name = "\n      TEATR im.Murasaki Shikibu     \n|--------| REPERTUAR |---------|\n";
char Start::Rezerwacja::separator = ';';

int main(int argc, char* argv[])
{
    
    std::string zamowienie;
    if (argc > 1 && std::string(argv[1]) == "-h") 
    {
        std::cout << "\tUzyj\n\t-s [NR_ZAMOWIENIA], aby zlozyc zamowienie.\n\n";
        return 0;
    }
    if (argc > 3)
    {
        std::cout << "[ERR] Podano za duzo parametrow startowych.\n\n\tUzyj\n\t-s [NR_ZAMOWIENIA], aby zlozyc zamowienie.\n\n";
        return 0;
    }
    if (argc < 3)
    {
        std::cout << "[ERR] Nie podano parametrow startowych.\n\n\tUzyj\n\t-s [NR_ZAMOWIENIA], aby zlozyc zamowienie.\n\n";
        return 0;
    }
    for (int i = 1; i < argc; i++)
    {
        if (std::string(argv[i]) == "-s")
        {
            zamowienie = std::string(argv[++i]);
        }
    }

    Start::Rezerwacja rezerwacja(zamowienie);
    rezerwacja.init();

    return 0;
}

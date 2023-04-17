/** @file */

#include "header.h"
using namespace std;

int Znaki = 0;
int licznik = 0;
bool NOT(bool a) {
    return !a;
}
bool AND(bool a, bool b) {
    if (a == 1 && b == 1)
    {
        return 1;
    }
    else {
        return 0;
    }
}
bool NAND(bool a, bool b) {
    if (a == 1 && b == 1)
    {
        return 0;
    }
    else {
        return 1;
    }
}
bool OR(bool a, bool b) {
    if (a == 0 && b == 0)
    {
        return 0;
    }
    else {
        return 1;
    }
}
bool NOR(bool a, bool b) {
    if (a == 0 && b == 0)
    {
        return 1;
    }
    else {
        return 0;
    }
}
bool XOR(bool a, bool b) {
    if (a == 0 && b == 0)
        return 0;
    if (a == 1 && b == 1)
        return 0;
    if (a == 0 && b == 1)
        return 1;
    if (a == 1 && b == 0)
        return 1;
}
bool XNOR(bool a, bool b) {
    if (a == 0 && b == 0)
        return 1;
    if (a == 1 && b == 1)
        return 1;
    if (a == 0 && b == 1)
        return 0;
    if (a == 1 && b == 0)
        return 0;
}

vector<Bramka> pobierzUklad(string nazwaPliku, string nazwaPlikuUklad, string nazwaPlikuWyniki) { 
    vector<int> IN;
    vector<int> OUT;
    vector<Bramka> Bramki;

    string linia;
    vector<vector<string>> data; 
    fstream uklad; 
    uklad.open(nazwaPliku);

    if (uklad) { 
        while (getline(uklad, linia)) {
            vector<string> rowData;
            istringstream rowStream{ linia };
            string x;
            while (rowStream >> x) {
                rowData.push_back(x);
            }
            data.push_back(move(rowData));
        }

        for (int i = 1; i < data[0].size(); ++i) {  
            IN.push_back(stoi(data[0][i]));
            Znaki++;
        }
        for (int i = 1; i < data[1].size(); ++i) {
            OUT.push_back(stoi(data[1][i]));
        }
        for (int i = 2; i < data.size() - 1; i++) {
            if (data[i][0] != "NOT") 
                Bramki.push_back({ data[i][0],
                                   stoi(data[i][1]),
                                   0,stoi(data[i][2]),
                                   0,
                                   stoi(data[i][3]),
                                   0 });
            else
                Bramki.push_back({ data[i][0],
                                   stoi(data[i][1]),
                                   0,
                                   -1,
                                   0,
                                   stoi(data[i][2]),
                                   0 });
        }
    }
    else cout << "Plik z bramkami nie istnieje";
    uklad.close();
    data.clear();
    vector<Wezel> wartosciPoczatkowe = pobierzWartosci(nazwaPlikuUklad);
    rozwiazUklad(wartosciPoczatkowe, Bramki, OUT[0], nazwaPlikuWyniki);
    return Bramki;
    //return wynik;
}

vector<Wezel> pobierzWartosci(string nazwaPliku) {
    fstream wartosci;
    wartosci.open(nazwaPliku);
    vector<Wezel> wartosciPoczatkowe;

    string linia;
    vector<vector<string>> data;

    if (wartosci)
    {
        while (getline(wartosci, linia)) {
            vector<string> rowData;
            istringstream rowStream{ linia };
            string x;
            while (rowStream >> x) {
                rowData.push_back(x);
            }
            data.push_back(move(rowData));
        }

        for (int i = 0; i < data.size(); ++i) {
            for (int j = 0; j < data[0].size(); ++j) {
                int dzielnik = data[i][j].find_first_of(":"); 
                string nrWezla = data[i][j].substr(0, dzielnik);
                string stan = data[i][j].substr(dzielnik + 1); 
                wartosciPoczatkowe.push_back({ stoi(nrWezla), stoi(stan) });
            }
        }
    }
    else cout << "Plik z wartosciami nie istnieje";

    wartosci.close();
    data.clear();
    return wartosciPoczatkowe; 
}

vector<string> rozwiazUklad(vector<Wezel>wartosciPoczatkowe, vector<Bramka>Bramki, int outNr, string nazwaPlikuWyniki) { 

    vector<string> wyniki; 

    for (int i = 0; i < wartosciPoczatkowe.size(); i += Znaki) { 

        for (int j = 0; j < Bramki.size(); ++j) {
            int it = 0;
            while (it < Znaki) { 
                if (Bramki[j].nrWejscia1.nrWezla == wartosciPoczatkowe[i + it].nrWezla) 
                    Bramki[j].nrWejscia1.wartosc = wartosciPoczatkowe[i + it].wartosc;
                if (Bramki[j].nrWejscia2.nrWezla == wartosciPoczatkowe[i + it].nrWezla)
                    Bramki[j].nrWejscia2.wartosc = wartosciPoczatkowe[i + it].wartosc;
                it++;
            }
        }

        for (int i = 0; i < Bramki.size(); ++i) { 
            if (Bramki[i].TypBramki == "AND") { 
                Bramki[i].nrWyjscia.wartosc = AND(Bramki[i].nrWejscia1.wartosc, Bramki[i].nrWejscia2.wartosc);
            }
            if (Bramki[i].TypBramki == "NAND") {
                Bramki[i].nrWyjscia.wartosc = NAND(Bramki[i].nrWejscia1.wartosc, Bramki[i].nrWejscia2.wartosc);
            }
            if (Bramki[i].TypBramki == "OR") {
                Bramki[i].nrWyjscia.wartosc = OR(Bramki[i].nrWejscia1.wartosc, Bramki[i].nrWejscia2.wartosc);
            }
            if (Bramki[i].TypBramki == "NOR") {
                Bramki[i].nrWyjscia.wartosc = NOR(Bramki[i].nrWejscia1.wartosc, Bramki[i].nrWejscia2.wartosc);
            }
            if (Bramki[i].TypBramki == "XOR") {
                Bramki[i].nrWyjscia.wartosc = XOR(Bramki[i].nrWejscia1.wartosc, Bramki[i].nrWejscia2.wartosc);
            }
            if (Bramki[i].TypBramki == "XNOR") {
                Bramki[i].nrWyjscia.wartosc = XNOR(Bramki[i].nrWejscia1.wartosc, Bramki[i].nrWejscia2.wartosc);
            }
            if (Bramki[i].TypBramki == "NOT") {
                Bramki[i].nrWyjscia.wartosc = NOT(Bramki[i].nrWejscia1.wartosc);
            }

            for (int j = 0; j < Bramki.size(); ++j) {
                if (Bramki[j].nrWejscia1.nrWezla == Bramki[i].nrWyjscia.nrWezla)
                    Bramki[j].nrWejscia1.wartosc = Bramki[i].nrWyjscia.wartosc;

                if (Bramki[j].nrWejscia2.nrWezla == Bramki[i].nrWyjscia.nrWezla)
                    Bramki[j].nrWejscia2.wartosc = Bramki[i].nrWyjscia.wartosc;

            }
        }
        string INy = "IN:\t";
        for (int j = licznik; j < licznik + Znaki; j++) {
            INy += to_string(wartosciPoczatkowe[j].nrWezla) + ":" + to_string(wartosciPoczatkowe[j].wartosc) + "\t";
        }
        licznik += Znaki;
        for (int j = 0; j < Bramki.size(); j++) {
            if (Bramki[j].nrWyjscia.nrWezla == outNr)
                wyniki.push_back(INy + "OUT:\t" + to_string(Bramki[j].nrWyjscia.nrWezla) + ":" + to_string(Bramki.back().nrWyjscia.wartosc) + "\n");
        }

        
    }
    zapiszWyniki(nazwaPlikuWyniki, wyniki); 
    return wyniki;
}
void zapiszWyniki(string nazwaPliku, vector<string>dane) {
    ofstream plik(nazwaPliku);
    for (int i = 0; i < dane.size(); ++i) {
        plik << dane[i];
    }
    cout << "Zapisano " << dane.size() << " przypadki do pliku " << nazwaPliku;
    plik.close();
}
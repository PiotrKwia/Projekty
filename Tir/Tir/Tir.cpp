#include <iostream>
#include <string>
#include <fstream>
#include <vector>
#include <memory>

using namespace std;
/** void menu () funkcja wyswietlajaca mozliwosci menu*/
void menu() 
{
    cout << "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&#GGGG#&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@@@@@@@@@@#5JY5PPPP5PB@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@@@@@@@@@G75###BGGBBBB#@@@@@@@@@@@&#P55P#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@@@@@&&BY7!Y??5555555P#@@@@@@@@@&PYYYY5B&@@Program z tirami i zamowieniami@@@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@@@@@@@#GGJ!75J5P5PB57G@@@@@@@#5?5&@@@@@@@@@@@ Prosze wybrac opcje@@@@@@@@@@@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@@@@@@@@@@PJY#PG&&#B5P@@@@@@#Y7?B@@@@@@@@@1. Wyswietl tiry i ich pojemnosc @@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@@@@@@@@@&YJJ5&&BB#PY&@&@B5Y7?P&@@@@@@@@@@2. Wyswietl zamowienia @@@@@@@@@@@@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@@@@@@@@@PY??7YGBPPP##&&@G5PB&@@@@@@@@@@@@3. Wprowadzanie tirow @@@@@@@@@@@@@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@@@@@@@@BY?777G5?5JG&&&&#&@@@@@@@@@@@@@@@@4. Wprowadzenie zamowienia @@@@@@@@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@@@@@@@#5J777?BBG&&&B5PJ5@@@@@@@@@@@@@@@@@5. Usun element z tirow @@@@@@@@@@@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@@@@@@#5J7777J#&&#&P???7B@@@@@@@@@@@@@@@@@6. Usun element z zamowien @@@@@@@@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@@@@@B5Y?77777JP#&#PGY77B@@@@@@@@@@@@@@@@@7. Znajdz tir po id @@@@@@@@@@@@@@@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@@@&G5Y?77777777YP#&P?775@@@@@@@@@@@@@@@@@8. Znajdz zamowienie po id @@@@@@@@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@@#5PYJ???J555555???7777JB&@@@@@@@@@@@@@@@9. Sortuj malejaco @@@@@@@@@@@@@@@@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@#55YJJJJG#5???77777777777?YG#&@@@@@@@@@@@10.Sortuj rosnaco @@@@@@@@@@@@@@@@@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@PYYYJJJY@J!77777777777777777?YPB###B#&@@@11.Wyjscie z programu@@@@@@@@@@@@@@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@BYGBP555@J7JYYYJ?77777777777B#BP5J??JP&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@@&&@@&##@&#&&&#&&#PJ777777?B&&@@@@&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" << endl;
    cout << "@@@@@@@@@@@@@@@@@@@@@@@@@&&&&&@&&BGGB#&BP55YP&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" << endl;
    
}
/** class Truck klasa zawierajaca informacje o tirach
@param int id_ zmienna zawierajaca id tira
@param int capacity_ zmienna zawierajaca dane o pojemnosci tira
@param bool active_ zmienna zero jedynkowa mowiaca czy tir jest w trasie czy nie
*/
class Truck {
public:
    Truck() {};
	Truck(int id, int capacity, bool active) : id_(id), capacity_(capacity), active_(active) {}

	int id_;
	int capacity_;
	bool active_;

    friend std::ostream& operator<<(std::ostream& os, const Truck& obj);

};
/** class Order klasa zawierajaca informacje o tirach
@param int id_ zmienna zawierajaca id tira
@param int quantity_ zmienna zawierajaca dane o ilosci wykonanych wybranych zamowien
@param bool active_ zmienna zero jedynkowa mowiaca czy zamowienie jest obecnie wykonywane
*/
class Order {
public:
    Order() {};
	Order(int Id, int quantity, bool in_progress) : Id_(Id), quantity_(quantity), in_progress_(in_progress) {}

	int Id_;
	int quantity_;
	bool in_progress_;

    friend std::ostream& operator<<(std::ostream& os, const Order& obj);
};

std::ostream& operator<<(std::ostream& os, const Truck& obj)
{
    os << obj.id_ << '\t' << obj.capacity_ << '\t' << obj.active_;
    return os;
}

std::ostream& operator<<(std::ostream& os, const Order& obj)
{
    os << obj.Id_ << '\t' << obj.quantity_ << '\t' << obj.in_progress_;
    return os;
}
/** template <typename T> szablon dla klasy
    class node klasa zawierajaca dane i dostep do nastepnych i poprzednich danych 
    @param T data zmienna zawierajaca dane
    @param shared_ptr<node<T>> next_ inteligentny wskaznik do nastepnej danej
    @param weak_ptr<node<T>> prev_ inteligentny wskaznik do poprzeniej danej
    */
template <typename T>
class node {
public:
    node(const T& data) : data(data) {}
    T data;
    std::shared_ptr<node<T>> next_;
    std::weak_ptr<node<T>> prev_;
};
/** template <typename T> szablon dla klasy
    class list klasa zawierajaca informacje do glowy i ogona oraz metody
    @param shared_ptr<node<T>> head_ inteligentny wskaznik na pierwszy element listy
    @param weak_ptr<node<T>> tail_ inteligentny wskaznik ma ostatni element listy
    */
template <typename T>
class list {


public:
    std::shared_ptr<node<T>> head_;
    std::shared_ptr<node<T>> tail_;
    list() : head_(nullptr), tail_(nullptr) {}
    ~list() {}
    /** Metoda wstawiajaca na poczatek listy 
    @param wartosc typu T przekazywana jako argument */
    void wstawNaPrzod(const T& data) {
        std::shared_ptr<node<T>> new_node = std::make_shared<node<T>>(data);
        if (head_ == nullptr) {
            head_ = new_node;
            tail_ = new_node;
        }
        else {
            new_node->next_ = head_;
            head_->prev_ = new_node;
            head_ = new_node;
        }
    }
    /** Metoda wyswietlajaca liste*/
    void wyswietl() const {
        std::shared_ptr<node<T>> current = head_;
        while (current != nullptr) {
            std::cout << current->data << " " << endl;
            current = current->next_;
        }
        std::cout << std::endl;
    }
    /** Metoda usuwajaca element z listy na podstawie id*/
    void usunElement(int abc, auto(*lambda)(T&, int&)->bool) {
        std::shared_ptr<node<T>> current = head_;
        while (current != nullptr) {
            if (lambda(current->data, abc)) {
                if (current == head_) {
                    head_ = current->next_;
                }
                else {
                    current->prev_.lock()->next_ = current->next_;
                }
                if (current == tail_) {
                    tail_ = current->prev_.lock();
                }
                else {
                    current->next_->prev_ = current->prev_;
                }
                break;
            }
            current = current->next_;
        }
    }
    /** Metoda znajdojaca dane w liscie na podstawie id w tirach*/
    T znajdz(int iid, auto(*lambda)(T&, int&)->bool) {
        shared_ptr<node<T>> current = head_;
        while (current != nullptr) {
            if (lambda(current->data, iid))
                return current.get()->data;
            current = current->next_;
        }
        T truck;
        truck.id_ = 0;
        return truck;
    }
    /** Znajdoje dane w liscie na podstawie id w zamowieniach*/
    T Znajdz(int iid, auto(*lambda)(T&, int&)->bool) {
        shared_ptr<node<T>> current = head_;
        while (current != nullptr) {
            if (lambda(current->data, iid))
                return current.get()->data;
            current = current->next_;
        }
        T orderr;
        orderr.Id_ = 0;
        return orderr;
    }

    /** Metoda sortujaca liste rosnaco*/
    void sortujRosnaco(auto(*lambda)(T&, T&)->bool) {
        for (std::shared_ptr<node<T>> i = head_; i != tail_; i = i->next_) {
            std::shared_ptr<node<T>> min = i;
            for (std::shared_ptr<node<T>> j = i->next_; j != nullptr; j = j->next_) {
                if (lambda(j->data, min->data))
                    min = j;
            }
            std::swap(i->data, min->data);
        }
    }
    /** Metoda sortujaca liste malejaca*/
    void sortujMalejaco(auto(*lambda)(T&, T&)->bool) {
        for (std::shared_ptr<node<T>> i = head_; i != tail_; i = i->next_) {
            std::shared_ptr<node<T>> max = i;
            for (std::shared_ptr<node<T>> j = i->next_; j != nullptr; j = j->next_) {
                if (lambda(j->data, max->data))
                    max = j;
            }
            std::swap(i->data, max->data);
        }
    }
    /** Metoda sluzaca do serializacji*/
    void zapisBin(string nazwa) {
           ofstream plik;
           plik.open(nazwa, ios::binary | ios::out);
           if (plik) {
               shared_ptr<node<T>> curr = head_;
               while (curr!=nullptr) {
                   plik.write(reinterpret_cast<char*>(&curr->data), sizeof(curr->data));
                   curr = curr->next_;
               }
           }
           plik.close();
       }
};
/** Funkcja sluzaca do przepisywania danych z jednego pliku do drugiego i zapisywanie w nim
    @param sciezka do pliku z tirami ktory ma byc skopiowany
    @param plik z tirami do ktorego dane skopiowane sa wpisywane*/
void copyFile(const std::string& tiry, const std::string& tir) {
    std::string data;
    std::cout << "Wpisz dane, ktore chcesz zapisac do pliku: ";
    std::getline(std::cin, data);

    std::ofstream file;
    file.open("tiry.txt");
    file << data;
    file.close();

    std::cout << "Dane zostaly zapisane do pliku dane.txt" << std::endl;

    std::string line;
    std::ifstream input_file(tiry);
    std::ofstream output_file(tir, std::ios::app);

    if (input_file.is_open() && output_file.is_open()) {
        while (getline(input_file, line)) {
            output_file << line << '\n';
        }
        input_file.close();
        output_file.close();
    }
    else {
        std::cout << "Nie mozna otworzyc plikow" << std::endl;
    }
}
/** Funkcja sluzaca do przepisywania zanych z jednego pliku do drugiego i zapisywanie w nim
    @param sciezka do pliku z zamowienami ktory ma byc skopiowany
    @param plik z zamowieniami do ktorego dane skopiowane sa wpisywane*/
void CopyFile(const std::string& ordery, const std::string& order) {
    std::string data;
    std::cout << "Wpisz dane, ktore chcesz zapisac do pliku: ";
    std::getline(std::cin, data);

    std::ofstream file;
    file.open("ordery.txt");
    file << data;
    file.close();

    std::cout << "Dane zostaly zapisane do pliku dane.txt" << std::endl;

    std::string line;
    std::ifstream input_file(ordery);
    std::ofstream output_file(order, std::ios::app);

    if (input_file.is_open() && output_file.is_open()) {
        while (getline(input_file, line)) {
            output_file << line << '\n';
        }
        input_file.close();
        output_file.close();
    }
    else {
        std::cout << "Nie mozna otworzyc plikow" << std::endl;
    }
}


int main() {
    auto lambda1 = [](Truck& value1, Truck& value2)->bool { return value1.id_ <= value2.id_; };
    auto lambda2 = [](Truck& value1, Truck& value2)->bool { return value1.id_ >= value2.id_; };
    auto lambda3 = [](Truck& value1, int& value2)->bool { return value1.id_ == value2; };
    auto lambda4 = [](Order& value1, Order& value2)->bool { return value1.Id_ <= value2.Id_; };
    auto lambda5 = [](Order& value1, Order& value2)->bool { return value1.Id_ >= value2.Id_; };
    auto lambda6 = [](Order& value1, int& value2)->bool { return value1.Id_ == value2; };
    
    list<Truck> lista;
    ifstream inFile("tir.txt");
    int id_;
    int capacity_;
    bool active_;

    Truck tir;
    while (inFile >> id_ >> capacity_ >> active_)
    {
        tir.id_ = id_;
        tir.capacity_ = capacity_;
        tir.active_ = active_;
        lista.wstawNaPrzod(tir);
    }

    list<Order> lista1;
    ifstream inFFile("order.txt");
    int Id_;
    int quantity_;
    bool in_progress_;
    Order order;
    while (inFFile >> Id_ >> quantity_ >> in_progress_)
    {
        order.Id_ = Id_;
        order.quantity_ = quantity_;
        order.in_progress_ = in_progress_;
        lista1.wstawNaPrzod(order);
    }
    ofstream os;
   
    for (;;) {
        menu();
        cout << "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Wpisz liczbe @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" << endl;
        int choice;
        cout << "                                      Twoj wybor to: " ;
        cin >> choice;
        switch (choice) {
        case 1: {
            cout << "Wybrales wyswietlanie tirow i ich pojemnosci" << endl;
            lista.wyswietl();
            getchar();
            getchar();
            break;
        }
        case 2: {
            cout << "Wybrales wyswietlanie zamowien" << endl;
            lista1.wyswietl();
            getchar();
            getchar();
            break;
        }
        case 3: {
            cout << "Wybrales wprowadzanie nowych tirow" << endl;
            copyFile("tiry.txt", "tir.txt");
            lista.wyswietl();
            std::cout << "Dane zostały dopisane do pliku wyjściowego" << std::endl;
            getchar();
            getchar();
            break;
        }
        case 4: {
            cout << "Wybrales wprowadzanie nowych zamowien" << endl;
            CopyFile("ordery.txt", "order.txt");
            std::cout << "Dane zostały dopisane do pliku wyjściowego" << std::endl;
            getchar();
            getchar();
            break;
        }
        case 5: {
            cout << "Wybrales usowanie elementow z tirow" << endl;
            cout << "Wpisz id ktore chcesz usunac" << endl;
            int liczba;
            cin >> liczba;
            lista.usunElement(liczba, lambda3);
            getchar();
            getchar();
            break;
        }
        case 6: {
            cout << "Wybrales usowanie elementow z zamowien" << endl;
            cout << "Wpisz id ktore chcesz usunac" << endl;
            int liczba;
            cin >> liczba;
            lista1.usunElement(liczba, lambda6);
            getchar();
            getchar();
            break;
        }
        case 7: {
            cout << "Wybrales znalezienie tirow po id" << endl;
            cout << "Wpisz id ktore cie interesuje" << endl;
            int li;
            cin >> li;
            Truck found = lista.znajdz(li, lambda3);
            if (found.id_ != 0) {
                std::cout << "Znaleziono element o wartosci " << found << std::endl;
            }
            else {
                std::cout << "Nie znaleziono elementu o podanej wartosci" << std::endl;
            }
            getchar();
            getchar();
            break;
        }
        case 8: {
            cout << "Wybrales znalezienie zamowien po id" << endl;
            cout << "Wpisz id ktore cie interesuje" << endl;
            int li;
            cin >> li;
            Order found = lista1.Znajdz(li, lambda6);
            if (found.Id_ != 0) {
                std::cout << "Znaleziono element o wartosci " << found << std::endl;
            }
            else {
                std::cout << "Nie znaleziono elementu o podanej wartosci" << std::endl;
            }
            getchar();
            getchar();
            break;
        }
        case 9: {
            cout << "Wybrales sortowanie malejaco" << endl;
            cout << "Wybierz ktore dane chcesz wyswietlic jako posorotwane" << endl;
            int liczb;
            cin >> liczb;
            if (liczb == 1) {
                lista.sortujMalejaco(lambda2);
                lista.wyswietl();
            }
            else {
                lista1.sortujMalejaco(lambda5);
                lista1.wyswietl();
            }
            getchar();
            getchar();
            break;
        }
        case 10: {
            cout << "Wybrales sortowanie rosnaco" << endl;
            cout << "Wybierz ktore dane chcesz wyswietlic jako posorotwane" << endl;
            int liczb;
            cin >> liczb;
            if (liczb == 1) {
                lista.sortujRosnaco(lambda1);
                lista.wyswietl();
            }
            else {
                lista1.sortujRosnaco(lambda4);
                lista1.wyswietl();
            }
            getchar();
            getchar();
            break;

        }
        case 11: {
            cout << "Wyjscie z programu" << endl;
            lista.zapisBin("tirr.bin");
            lista1.zapisBin("zamow.bin");
            exit(0);
            break;
        }
        default: {
            cout << "nie ma takiej opcji wyboru" << endl;
            break;
        }
        }
    }
   

	return 0;
}
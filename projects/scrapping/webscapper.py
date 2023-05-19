import requests
from bs4 import BeautifulSoup
from csv import DictWriter

headers = {
    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"
}


def webscrapper(URL):

    r = requests.get(URL,headers)

    contenido_html = BeautifulSoup(r.content, 'html5lib')

    tuplas = []
    table = contenido_html.find('div', attrs={'id': 'all_quotes'})

    for row in table.findAll('div',
                             attrs={'class': 'col-6 col-lg-4 text-center margin-30px-bottom sm-margin-30px-top'}):
        tupla = {}
        tupla['tema'] = row.h5.text
        tupla['url'] = row.a['href']
        tupla['img'] = row.img['src']
        tupla['contenido'] = row.img['alt'].split(" #")[0]
        tupla['autor'] = row.img['alt'].split(" #")[1]

        tuplas.append(tupla)

    fichero = 'citas.csv'
    with open(fichero, 'w', newline='') as f:
        w = DictWriter(f, ['tema', 'url', 'img', 'contenido', 'autor'])
        w.writeheader()
        for tupla in tuplas:
            w.writerow(tupla)


if __name__ == '__main__':
    webscrapper("http://www.values.com/inspirational-quotes")
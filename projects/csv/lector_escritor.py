from urllib import request
from urllib.error import HTTPError

################################################################################
#COMPRUEBA DE MANERA PRECISA SI EL DATO STRING REPRESENTA UN FLOAT
def comprobarFloat(dato):
    partes = dato.split(".")
    return (len(partes) == 2) and partes[0].isdigit() and partes[1].isdigit()

###################################################################################
#DICCIONARIO PARA FORMATEAR TIPOS DE DATOS DE STRING A AL QUE CORRESPONDA
formatear = {}
formatear["int"] = lambda x: int(x)
formatear["float"] = lambda x: float(x)
formatear["string"] = lambda x: x
formatear["boolean"] = lambda x: eval(x)
#################################################################################

#FUNCION QUE DETECTA EL TIPO DE DATOS DE UN LITERAL Y LO EXPRESA MEDIANTE UN STRING
#COMPATIBLE CON EL DICCIONARIO ANTERIOR
###################################################################################
def tipo(dato):
    resultado = ""
    if dato.isdigit():
        resultado = "int"
    elif comprobarFloat(dato):
        resultado = "float"
    elif dato.title() == "False" or dato.title() == "True":
        resultado = "boolean"
    else:
        resultado = "string"

    return resultado

###################################################################################
def cargarCSV(url):
    try:
        f = request.urlopen(url)
    except HTTPError:
        print("El enlace no funciona")
    else:

        contenido = f.read().decode("utf-8")
        separado = contenido.split("\r\n")
        cabecera = separado[0].split(";")

        lista = list()

        for linea in separado[1:]:
            datos = linea.split(";")
            cerveza = dict(zip(cabecera, datos))
            print(cerveza)
            for atributo in cabecera:
                if cerveza[atributo] == "true" or cerveza[atributo] == "false":
                    cerveza[atributo]=cerveza[atributo].title()
                formato = formatear[tipo(cerveza[atributo])]
                cerveza[atributo] = formato(cerveza[atributo])
            lista.append(cerveza)
    return lista
##############################################################################
def guardarCSV(nom):
    f_escribir = open(nom + ".csv", "w")

    cabecera = lista_cervezas[0].keys()
    f_escribir.write(";".join(cabecera) + "\n")

    for cerveza in lista_cervezas:
        datos = cerveza.values()
        todo_string = list(map(str, datos))
        linea = ";".join(todo_string)
        f_escribir.write(linea + "\n")
    f_escribir.close()

#################################################################################
def buscarCerveza(nom):
    res=None
    for cerveza in lista_cervezas:
        if cerveza["nombre"] == nom:
            res = cerveza
            break;
    return res
###################################################################################
def borrarCerveza(nom):
    for cerveza in lista_cervezas:
        if cerveza["nombre"] == nom:
            lista_cervezas.remove(cerveza)
            break;

######################################################################################################


if __name__=="__main__":
    #CARGO LOS DATOS DEL CSV
    lista_cervezas = cargarCSV(
        "https://firebasestorage.googleapis.com/v0/b/chat-7d403.appspot.com/o/Cervezas.csv?alt=media&token=b285ec18-f95c-408d-a3a3-2dc6f3db10d7")
    print(lista_cervezas)

    #EJECUTA LAS OPCIONES DISPONIBLES PARA ELLOS
    opcion = -1
    while opcion != 6:
        print("1. Buscar")
        print("2. Ordenar")
        print("3. Más cara")
        print("4. Borrar por nombre de cerveza")
        print("5. Guardar")
        print("6. Salir")

        opcion = int(input("Elige una opcion: "))

        if opcion == 1:
            nom = input("Nombre de la cerveza: ")
            res = buscarCerveza(nom)
            if res == None:
                print("no existe esa cerveza")
            else:
                print(res)
        elif opcion == 2:
            ordenado = sorted(lista_cervezas, key=lambda item: item["nombre"])
            for cerveza in ordenado:
                print(cerveza["nombre"] + " - " + str(cerveza["precio"]))
        elif opcion == 3:
            mayor = max(lista_cervezas, key=lambda item: item["precio"])
            print(mayor["nombre"] + " - " + mayor["tipo"] + " - " + str(mayor["precio"]))
        elif opcion == 4:
            nom = input("Nombre de la cerveza: ")
            borrarCerveza(nom)
            print(lista_cervezas)
        elif opcion == 5:
            nom = input("Nombre del fichero que quieres guardar: ")
            guardarCSV(nom)
            print("Datos guardados con éxito")
        elif opcion == 6:
            print("Adiós")

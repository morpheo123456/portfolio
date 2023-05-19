<?php //configura los datos de tu cuenta
include "functions.php";
include "config.php";


$conexion=conectarBD($dbhost,$dbuser,$dbpass);

$sentencia=$conexion->prepare("DROP DATABASE IF EXISTS $dbname");
$sentencia->execute();
echo "Base de datos anterior borrada<br>-------------------------<br>";

$sentencia=$conexion->prepare("CREATE DATABASE IF NOT EXISTS $dbname");
$sentencia->execute();
echo "Base de datos nueva creada<br>-------------------------<br>";

$conexion->select_db($dbname);

echo "Base de datos seleccionada <br>-------------------------<br>";

$sentencia=$conexion->prepare("CREATE TABLE IF NOT EXISTS $dbtable(
                            id VARCHAR(20),
                            title VARCHAR(50),
                            company VARCHAR(50),
                            image VARCHAR(500),
                            price DECIMAL(6,2),
                            PRIMARY KEY(id));");
$sentencia->execute();
echo "Tabla creada correctamente<br>-----------------------------------------<br>";


$sentencia=$conexion->prepare("INSERT INTO $dbtable VALUES 
                     ('rec43w3ipXvP28vog',
                      'high-back bench',
                      'ikea',
                      'https://i.pinimg.com/564x/7d/e5/a2/7de5a27ad244e7a9fae88af56e25e873--settees-dining-tables.jpg',
                      9.99),
                     ('rec4f2RIftFCb7aHh','albany table',
                     'marcos',
                     'https://www.tomfaulkner.co.uk/wp-content/uploads/albany-console-table-1.jpg',
                      79.99),
                      ('rec8kkCmSiMkbkiko'
                      ,'accent chair'
                      ,'caressa',
                      'https://ak1.ostkcdn.com/images/products/is/images/direct/9e97b8930a38e7f37e217af1694a49680eaa7c17/Aston-Modern-Solid-wood-Accent-Chair.jpg',
                      25.99),
                      ('recBohCqQsot4Q4II',
                      'wooden table',
                      'caressa',
                      'https://i.etsystatic.com/15705690/r/il/33dc60/1843727366/il_fullxfull.1843727366_flps.jpg',
                      45.99),
                      ('recDG1JRZnbpRHpoy',
                      'dining table',
                      'caressa',
                      'https://i.etsystatic.com/26008302/r/il/77a603/3416039959/il_1080xN.3416039959_p5o9.jpg',
                      6.99),
                      ('recNWGyP7kjFhSqw3',
                      'sofa set',
                      'liddy',
                      'https://5.imimg.com/data5/QA/ZV/HP/ANDROID-24135102/product-jpeg-500x500.jpg',
                      69.99),
                      ('recZEougL5bbY4AEx',
                      'modern bookshelf',
                      'marcos',
                      'https://m.media-amazon.com/images/I/71TuElSrsdL.jpg',
                      8.99),
                      ('recjMK1jgTb2ld7sv',
                      'emperor bed',
                      'liddy',
                      'https://www.amareliving.com/wp-content/uploads/2020/03/AMARE-LIVING-2627264517-RT-scaled.jpg',
                      21.99),
                      ('recmg2a1ctaEJNZhu',
                      'utopia sofa',
                      'marcos',
                      'https://pbs.twimg.com/media/E-4dMgYVcCkqXA9.jpg',
                      39.95),
                      ('recvKMNR3YFw0bEt3',
                      'entertainment center',
                      'liddy',
                      'https://ahfurniture.ae/images/products/prod_73/sylvan-tv-stand.jpeg',
                      29.98),
                      ('recxaXFy5IW539sgM',
                      'albany sectional',
                      'ikea',
                      'https://cdn.surplusfurniture.com/media/amasty/webp/catalog/product/cache/a88b50c309700c99b909703dc2f932da/_/6/_6_4_6485-albanyslate3piecesectional_2_jpg.webp',
                      10.99),
                      ('recyqtRglGNGtO4Q5',
                      'leather sofa',
                      'liddy',
                      'https://images.afw.com/images/thumbs/0115500_1M-4829S_60679.jpeg',
                      9.99)
                     ,
                      ('recyAtRglGNGtO4Q5',
                      'Midnight Sand and Blue SideBoard',
                      'Tylko',
                      'https://res.cloudinary.com/cstm/image/upload/w_0.5/v1/pdp/gallery/sideboard/cplus/02/02-sand/grid/2/D.avif',
                      499.99)
                      ,
                      ('recyYtRglGNGtO4Q5',
                      'Slim White Pywood Wall Storage',
                      'Tylko',
                      'https://res.cloudinary.com/cstm/image/upload/v1/pdp/gallery/wallstorage/01p/01p-white/1/D.avif',
                      899.99)
                      ,
                      ('recyqHRglGNGtO4Q5',
                      'Large Oak Veneer Tv Stand',
                      'Tylko',
                      'https://res.cloudinary.com/cstm/image/upload/v1/pdp/gallery/tvstand/01v/01v-oak/1/D.avif',
                      1499.99)

                      ,
                      ('recyqRRglGNGtO4Q5',
                      'TV Stand Uain wood',
                      'Sklum',
                      'https://cdn.sklum.com/es/wk/996304/mueble-tv-en-madera-de-mango-uain.jpg?cf-resize=gallery',
                      299.99)

                      ,
                      ('recyqJRglGNGtO4Q5',
                      'Library in Recycled Wood Unain',
                      'Sklum',
                      'https://cdn.sklum.com/es/wk/855413/libreria-con-escalera-en-madera-uain.jpg?_gl=1*1dav07m*_up*MQ..&gclid=EAIaIQobChMI1u-V0YPZ-wIVlKjVCh3xbQr6EAQYAyABEgJrePD_BwE',
                      639.95)

                      ,
                      ('recyqLRglGNGtO4Q5',
                      'bottle rack in Recycled Wood Unain',
                      'Sklum',
                      'https://cdn.sklum.com/es/wk/881769/botellero-en-madera-reciclada-gureh.jpg?cf-resize=gallery',
                      149.95)

                      ,
                      ('recyqORglGNGtO4Q5',
                      'Tarraco',
                      'comifor',
                      'https://cdn.shopify.com/s/files/1/0310/5023/6043/products/2_efaf108d-b4a7-476f-b218-27c4e650ab3f_3000x.jpg?v=1653986287',
                      370.90)

                      ,
                      ('recyqQRglGNGtO4Q5',
                      'Genua',
                      'comifor',
                      'https://cdn.shopify.com/s/files/1/0310/5023/6043/products/onsol_Dorado_1_66c1a05b-26cc-409a-b93d-4ca4ccf8f9d1_3000x.jpg?v=1650363850',
                      503.90)

                      ,
                      ('recyqSRglGNGtO4Q5',
                      'Saona',
                      'Comifor',
                      'https://cdn.shopify.com/s/files/1/0310/5023/6043/products/61P2Sf8N2OL._AC_SL1200_19637ccf-364a-40aa-acc9-2f77db09bcb3_3000x.jpg?v=1650361972',
                      82.90)
                      ,
                      ('recyqOKglGNGtO4Q5',
                      'Sofá Cama Chaise Longue',
                      'Sklum España',
                      'https://cdn.sklum.com/es/wk/993820/sofa-cama-chaise-longue-3-plazas-en-tela-calvin.jpg?cf-resize=gallery',
                      599.95)

                      ,
                      ('recyqQIglGNGtO4Q5',
                      'Sillón Tapizado en Terciopelo Morris Edition',
                      'Sklum España',
                      'https://cdn.sklum.com/es/wk/1649156/sillon-tapizado-en-terciopelo-morris-edition.jpg?cf-resize=gallery',
                      199.95)

                      ,
                      ('recyqSXglGNGtO4Q5',
                      'Sofá Cama de 3 Plazas Brion',
                      'Sklum España',
                      'https://cdn.sklum.com/es/wk/1274441/sofa-cama-de-3-plazas-en-lino-brion.jpg?cf-resize=gallery',
                      329.95)
                      ;");
$sentencia->execute();

echo "Datos insertados correctamente<br>--------------------------------------<br>";

header( "refresh:3;url=index.html" );
?>
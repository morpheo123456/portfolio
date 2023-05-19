package cerveceria;

import java.sql.ResultSetMetaData;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class Cerveceria {

    private Connection conexion;

    public Cerveceria() throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.cj.jdbc.Driver");
        conexion = DriverManager.getConnection("jdbc:mysql://localhost/cerveceria",
                "root", //usuario de la BD
                ""); //contraseña
    }

    public Cerveceria(String nombre_bd, String usuario, String contraseña) throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.jdbc.Driver");
        conexion = DriverManager.getConnection("jdbc:mysql://localhost/" + nombre_bd,
                usuario, //usuario de la BD
                contraseña); //contraseña
    }

    public ArrayList<String[]> cervezasDisponibles() throws SQLException {
        ArrayList<String[]> salida=new ArrayList<>();
        
        Statement sentencia = conexion.createStatement();
        String sql = "SELECT * FROM cervezas";
        ResultSet resul = sentencia.executeQuery(sql);
        ResultSetMetaData metadatos=resul.getMetaData();
        
        int columnas=metadatos.getColumnCount();

        salida.add(atributos_consulta(metadatos));
        
        while (resul.next()) {
            salida.add(valores_fila(resul));
        }

        resul.close(); //Cerrar ResultSet
        
        return salida;
    }
    
    public ArrayList<String[]> masBarataTipo(String tipo) throws SQLException {

        Statement sentencia = conexion.createStatement();
        String sql = "SELECT * FROM cervezas WHERE tipo='"+tipo+"' ORDER BY PRECIO ASC";
        ResultSet resul = sentencia.executeQuery(sql);
        ArrayList<String[]> salida = new ArrayList<>();

        ResultSetMetaData metadatos=resul.getMetaData();
        
        int columnas=metadatos.getColumnCount();

        salida.add(atributos_consulta(metadatos));
        
        while (resul.next()) {
            System.out.println("Hola");
            salida.add(valores_fila(resul));
        }

        resul.close(); //Cerrar ResultSet
        
        return salida;
    }

    public void añadirCerveza(String nombre, String tipo, boolean artesanal, double precio,int existencias) throws SQLException {

        String sql = "INSERT INTO cervezas (nombre,tipo,precio,existencias,artesanal) "
                   + "VALUES ('" + nombre + "', '" + tipo + "', '" + precio + "', '" + existencias + "', " + artesanal + ")";
        System.out.println(sql);
        Statement sentencia = conexion.createStatement();
        sentencia.executeUpdate(sql);

    }

    public void beberCerveza(String nombre, int cantidad) throws SQLException {

        String sql = "UPDATE cervezas SET existencias=existencias-'" + cantidad + "' WHERE nombre='" + nombre + "';";
        Statement sentencia = conexion.createStatement();
        sentencia.executeUpdate(sql);
    }
    
    public void reponerCerveza(String nombre, int cantidad) throws SQLException {

        String sql = "UPDATE cervezas SET existencias=existencias+'" + cantidad + "' WHERE nombre='" + nombre + "';";
        Statement sentencia = conexion.createStatement();
        sentencia.executeUpdate(sql);
    }

    public void borrarCerveza(String nombre) throws SQLException {

        String sql = "DELETE FROM cervezas WHERE nombre='" + nombre + "';";
        Statement sentencia = conexion.createStatement();
        sentencia.executeUpdate(sql);
    }
    
    
    public String[] atributos_consulta(ResultSetMetaData metadatos) throws SQLException{
        String[] nombres_atributos=new String[metadatos.getColumnCount()];
       
        for(int i=0;i<metadatos.getColumnCount();i++){
            nombres_atributos[i]=metadatos.getColumnName(i+1);
        }
        
        return nombres_atributos;
        
    }
    
    
    public String[] valores_fila(ResultSet fila) throws SQLException{
        
        String[] valores=new String[fila.getMetaData().getColumnCount()];
            for(int i=0;i<fila.getMetaData().getColumnCount()-1;i++){
                valores[i]=fila.getString(i+1);
            }
            
            
            
            if(fila.getBoolean(valores.length)){
                valores[valores.length-1]="SI";
            }else{
                valores[valores.length-1]="NO";
            }
            
        return valores;
        
    }
}

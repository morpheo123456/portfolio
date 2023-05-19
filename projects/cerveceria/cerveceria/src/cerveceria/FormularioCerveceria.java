package cerveceria;

import java.awt.BorderLayout;
import java.awt.FlowLayout;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;

import javax.swing.ButtonGroup;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JRadioButton;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;

public class FormularioCerveceria extends JFrame {

    private JButton crear, ver, borrar, beber, reponer, masBarataTipo;
    private JLabel label_nombre, label_precio, label_existencias, label_tipo, label_artesanal, label_comprar;
    private JTextField text_nombre, text_precio, text_existencias, text_comprar;

    private JRadioButton tipo_roja, tipo_rubia, tipo_negra, tipo_tostada;
    private JCheckBox check_artesanal;
    private JTextArea area;
    private ButtonGroup bg;
    private JFileChooser jf;
    private JTable tabla;
    private DefaultTableModel modelo;

    private Cerveceria objeto_cerveceria;

    public FormularioCerveceria() {
        super("Cerveceria EAG");

        tabla = new JTable();
        tabla.setEnabled(false);
        modelo = (DefaultTableModel) tabla.getModel();

        try {
            this.objeto_cerveceria = new Cerveceria();
        } catch (ClassNotFoundException | SQLException ex) {
            JOptionPane.showMessageDialog(FormularioCerveceria.this, ex.getMessage());
        }

        crear = new JButton("Crear nueva cerveza");
        ver = new JButton("Ver todas las cervezas");

        borrar = new JButton("Borrar una cerveza");
        beber = new JButton("Comprar");
        reponer = new JButton("Reponer");
        masBarataTipo = new JButton("Más barata por tipo");

        label_nombre = new JLabel("Nombre");
        label_precio = new JLabel("Precio");
        label_existencias = new JLabel("Existencias");

        label_tipo = new JLabel("Tipo");
        label_artesanal = new JLabel("");
        label_comprar = new JLabel("Cantidad Comprar");

        text_nombre = new JTextField(20);
        text_precio = new JTextField(20);
        text_existencias = new JTextField(20);
        text_comprar = new JTextField(20);

        tipo_rubia = new JRadioButton("Rubia");
        tipo_rubia.setActionCommand("Rubia");
        tipo_roja = new JRadioButton("Roja", true);
        tipo_roja.setActionCommand("Roja");
        tipo_negra = new JRadioButton("Negra");
        tipo_negra.setActionCommand("Negra");
        tipo_tostada = new JRadioButton("Tostada");
        tipo_tostada.setActionCommand("Tostada");

        JScrollPane js = new JScrollPane(tabla);

        bg = new ButtonGroup();
        bg.add(tipo_rubia);
        bg.add(tipo_roja);
        bg.add(tipo_negra);
        bg.add(tipo_tostada);

        check_artesanal = new JCheckBox("Artesanal");

        this.setLayout(new BorderLayout());

        JPanel panel_datos = new JPanel();
        panel_datos.setLayout(new GridLayout(6, 2));

        panel_datos.add(label_nombre);
        panel_datos.add(text_nombre);

        panel_datos.add(label_precio);
        panel_datos.add(text_precio);

        panel_datos.add(label_existencias);
        panel_datos.add(text_existencias);

        panel_datos.add(label_comprar);
        panel_datos.add(text_comprar);

        JPanel panel_tipo = new JPanel();
        panel_tipo.setLayout(new FlowLayout());
        panel_datos.add(label_tipo);
        panel_tipo.add(tipo_roja);
        panel_tipo.add(tipo_negra);
        panel_tipo.add(tipo_rubia);
        panel_tipo.add(tipo_tostada);
        panel_datos.add(panel_tipo);

        panel_datos.add(label_artesanal);
        panel_datos.add(check_artesanal);

        JPanel panel_botones = new JPanel();
        panel_botones.setLayout(new FlowLayout());
        panel_botones.add(crear);

        panel_botones.add(ver);
        panel_botones.add(borrar);
        panel_botones.add(beber);
        panel_botones.add(reponer);
        panel_botones.add(masBarataTipo);

        jf = new JFileChooser();
        jf.setCurrentDirectory(new File("."));
        JLabel b = new JLabel(new ImageIcon("cerveza.png"));
//        b.setEnabled(false);
        this.add(b, BorderLayout.NORTH);
        this.add(panel_botones, BorderLayout.SOUTH);
        this.add(panel_datos, BorderLayout.CENTER);
        this.add(js, BorderLayout.EAST);

        crear.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String nombre;
                int existencias;
                double precio;
                String tipo;
                boolean artesanal;

                try {

                    nombre = text_nombre.getText();
                    existencias = Integer.parseInt(text_existencias.getText());
                    precio = Double.parseDouble(text_precio.getText());
                    tipo = bg.getSelection().getActionCommand();
                    artesanal = check_artesanal.isSelected();
                    objeto_cerveceria.añadirCerveza(nombre, tipo, artesanal, precio, existencias);
                    JOptionPane.showMessageDialog(FormularioCerveceria.this, "Cerveza creada");
                    ArrayList<String[]> datos = objeto_cerveceria.cervezasDisponibles();
                    Iterator<String[]> it = datos.iterator();
                    modelo.setRowCount(0);
                    modelo.setColumnIdentifiers(it.next());
                    while (it.hasNext()) {
                        modelo.addRow(it.next());
                    }
                } catch (SQLException ex) {
                    JOptionPane.showMessageDialog(FormularioCerveceria.this, ex.getMessage());
                } catch (NumberFormatException nfe) {
                    JOptionPane.showMessageDialog(FormularioCerveceria.this, "Se esperaban numeros correctos");
                } finally{
                    text_nombre.setText("");
                    text_existencias.setText("");
                    check_artesanal.setSelected(false);
                    tipo_roja.setSelected(true);
                    text_precio.setText("");
                }
            }
        });

        ver.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {

                    ArrayList<String[]> datos = objeto_cerveceria.cervezasDisponibles();
                    Iterator<String[]> it = datos.iterator();
                    modelo.setRowCount(0);
                    modelo.setColumnIdentifiers(it.next());
                    while (it.hasNext()) {
                        modelo.addRow(it.next());
                    }
                } catch (SQLException ex) {
                    JOptionPane.showMessageDialog(FormularioCerveceria.this, ex.getMessage());
                }
            }
        });

        borrar.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String nombre;

                try {

                    nombre = text_nombre.getText();
                    objeto_cerveceria.borrarCerveza(nombre);
                    JOptionPane.showMessageDialog(FormularioCerveceria.this, "Cerveza borrada");
                    ArrayList<String[]> datos = objeto_cerveceria.cervezasDisponibles();
                    Iterator<String[]> it = datos.iterator();
                    modelo.setRowCount(0);
                    modelo.setColumnIdentifiers(it.next());
                    while (it.hasNext()) {
                        modelo.addRow(it.next());
                    }
                } catch (SQLException ex) {
                    JOptionPane.showMessageDialog(FormularioCerveceria.this, ex.getMessage());
                } finally{
                    text_nombre.setText("");
                    
                }
            }
        });

        beber.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String nombre;
                int cantidad;

                try {

                    nombre = text_nombre.getText();
                    cantidad = Integer.parseInt(text_comprar.getText());
                    objeto_cerveceria.beberCerveza(nombre, cantidad);
                    JOptionPane.showMessageDialog(FormularioCerveceria.this, "Cervezas servidas");
                    ArrayList<String[]> datos = objeto_cerveceria.cervezasDisponibles();
                    Iterator<String[]> it = datos.iterator();
                    modelo.setRowCount(0);
                    modelo.setColumnIdentifiers(it.next());
                    while (it.hasNext()) {
                        modelo.addRow(it.next());
                    }
                } catch (SQLException ex) {
                    JOptionPane.showMessageDialog(FormularioCerveceria.this, ex.getMessage());
                } catch (NumberFormatException nfe) {
                    JOptionPane.showMessageDialog(FormularioCerveceria.this, "Se esperaban numeros correctos");
                } finally{
                    text_nombre.setText("");
                    text_comprar.setText("");
                }
            }
        });

        reponer.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String nombre;
                int cantidad;

                try {

                    nombre = text_nombre.getText();
                    cantidad = Integer.parseInt(text_comprar.getText());
                    objeto_cerveceria.reponerCerveza(nombre, cantidad);
                    JOptionPane.showMessageDialog(FormularioCerveceria.this, "Cervezas repuestas");
                    ArrayList<String[]> datos = objeto_cerveceria.cervezasDisponibles();
                    Iterator<String[]> it = datos.iterator();
                    modelo.setRowCount(0);
                    modelo.setColumnIdentifiers(it.next());
                    while (it.hasNext()) {
                        modelo.addRow(it.next());
                    }
                    
                } catch (SQLException ex) {
                    JOptionPane.showMessageDialog(FormularioCerveceria.this, ex.getMessage());
                } catch (NumberFormatException nfe) {
                    JOptionPane.showMessageDialog(FormularioCerveceria.this, "Se esperaban numeros correctos");
                } finally{
                    text_nombre.setText("");
                    text_comprar.setText("");
                }
            }
        });

        masBarataTipo.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String nombre;
                String tipo;

                try {
                    tipo = bg.getSelection().getActionCommand();
                    ArrayList<String[]> datos = objeto_cerveceria.masBarataTipo(tipo);
                    Iterator<String[]> it = datos.iterator();
                    modelo.setRowCount(0);
                    modelo.setColumnIdentifiers(it.next());
                    while (it.hasNext()) {
                        modelo.addRow(it.next());
                    }
                } catch (SQLException ex) {
                    JOptionPane.showMessageDialog(FormularioCerveceria.this, ex.getMessage());
                }

            }
        });

        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setSize(1100, 320);

        //this.setResizable(false);
        this.setLocationRelativeTo(null);
        this.setVisible(true);

    }

}

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spinsci.XMLIO;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.thoughtworks.xstream.*;
import com.thoughtworks.xstream.io.copy.HierarchicalStreamCopier;
import com.thoughtworks.xstream.io.json.JettisonMappedXmlDriver;
import com.thoughtworks.xstream.io.json.JsonWriter;
import com.thoughtworks.xstream.io.xml.XppReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.OutputStreamWriter;
import java.nio.charset.Charset;
import java.util.*;
import org.json.simple.*;
import org.json.simple.parser.*;
import org.xml.sax.ContentHandler;

/**
 *
 * @author Hiley
 */
public class StartOut extends HttpServlet {

    /**
     * Processes requests for both HTTP
     * <code>GET</code> and
     * <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    public static boolean debugMode = false;
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, SQLException 
    {        
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();      

        try 
        {                        
            //Get callid from request
            String CID = request.getParameter("callid");
            //Create file if not exists
            File yourFile = new File(getServletContext().getRealPath("/")+"/xml/"+CID+".xml");
            //out.println(yourFile.getAbsolutePath());
            if(!yourFile.exists()) {
                yourFile.createNewFile();
            }             
            
            //iterate through all the request parameters
            //Note in java, the POST variables are called PARAMETERS not ATTRIBUTES
            
            /*
            Enumeration attrs =  request.getParameterNames();
            while(attrs.hasMoreElements()) {
                out.println( (String)attrs.nextElement() );
                out.println( request.getParameter( (String)attrs.nextElement() ) );
            }
            */
            
            //FileWriter ofw = new FileWriter(yourFile);
            FileOutputStream fos = new FileOutputStream( yourFile );
            OutputStreamWriter osw = new OutputStreamWriter( fos, Charset.forName("UTF-8").newEncoder() );
            //rather than use a FileWriter object, use a FileOutputStream, then wrap that in an OutputStreamWriter, which allows us to pass an encoding in the constructor.
            //we can then write the data to that. We do this because we need support for UTF8 / foreign character sets.
            osw.write( "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>" );
            osw.write( "<freeze>" );
            
            //note that the value will return as an ARRAY of strings (since the request is allowed to pass multiple keyvalue pairs with the same key)
            //try iterating over a PARAMETERMAP instead
            Map<String,String[]> parms = request.getParameterMap();  
            //Take the keys and build a TreeMap out of them to sort alphabetically. This will gaurentee callguid is first - we want this to be a topmost child
            SortedSet<String> keys = new TreeSet<String>( parms.keySet() );
            boolean pastFirst = false;
            for (String key : keys) 
            { 
                String value = parms.get(key)[0]; //get only the first one                
                if( !pastFirst )
                {
                    osw.write( "<callguid><![CDATA["+value+"]]></callguid><notes></notes><wrapstatus>" );
                }    
                else
                {                    
                    int lastchar = key.length() - 1;                    
                    key = key.substring(7);
                    key = key.substring(0, key.length() - 1);
                    osw.write( "<"+key+"><![CDATA["+value+"]]></"+key+">" );
                }
                //out.println("parameter name:"+key);  
                //out.println("value:"+value); 
                pastFirst = true;
             }
            /*
            for (Iterator iterator = parms.entrySet().iterator(); iterator.hasNext();)  
            {  
                Map.Entry entry = (Map.Entry) iterator.next();  
                String key = (String)entry.getKey();
                String value = (String)entry.getValue();
                if( !key.startsWith("wrapup") )
                {
                    ofw.write( "<callguid><![CDATA["+value+"]]>" );
                }    
                out.println("parameter name:"+key);  
                out.println("value:"+value);  
            }        
            * */
            osw.write( "</wrapstatus></freeze>" );
            osw.close();
            /*
            System.out.println("----------------------------");

            Enumeration attrs2 =  request.getAttributeNames();
            while(attrs2.hasMoreElements()) {
                System.out.println(attrs2.nextElement());
            }            
            */
            /*
            //json string from request, break it into JSONarray, which implements map and list
             String jsonText = "{\"first\": 123, \"second\": [4, 5, 6], \"third\": 789}";
            JSONParser parser = new JSONParser();
            //the below snippet works to break apart the json. but why bother?
            ContainerFactory containerFactory = new ContainerFactory(){
              public List creatArrayContainer() {
                return new LinkedList();
              }

              public Map createObjectContainer() {
                return new LinkedHashMap();
              }

            };

            try{
              Map json = (Map)parser.parse(jsonText, containerFactory);
              Iterator iter = json.entrySet().iterator();
              System.out.println("==iterate result==");
              while(iter.hasNext()){
                Map.Entry entry = (Map.Entry)iter.next();
                out.println(entry.getKey() + "=>" + entry.getValue());
              }

              out.println("==toJSONString()==");
              out.println(JSONValue.toJSONString(json));
            }
            catch(ParseException pe){
              out.println(pe);
            }     
           */ 
            
            
            /*
            XStream xstream = new XStream(new JettisonMappedXmlDriver());       
            
            //convert json to xml, start with JSON SAX adatper...
            ContentHandler ch = new ContentHandler();
            JsonSaxAdapter adapter = new JsonSaxAdapter(json,ch);
            adapter.parse();
            
            
            out.printlnFileWriter ofw = new FileWriter(yourFile);
            out.println( xstream.toXML(json) );
            ofw.close();
            out.println(json);
            */
        }
        catch(Exception se)
        {
            se.printStackTrace(out);
            //out.println( "{\"error\":\"true\"}" );
        }
        finally 
        {            
            out.println( "{\"error\":\"true\"}" );
            out.close();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP
     * <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    /**
     * Handles the HTTP
     * <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spinsci.XMLIO;

import java.io.*;
import java.nio.charset.Charset;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.*;
import org.w3c.dom.*;
/**
 *
 * @author rhiley
 */
public class StartUpdate extends HttpServlet{

    public static ServletOutputStream out;
    public static boolean debugMode = false;
    
    public void writeIfDebug(String stateMent) throws IOException
    {        
        if(debugMode)
            out.println(stateMent);
    }    
    
    public static String xmlToString(Node node) {
        try {
            Source source = new DOMSource(node);
            StringWriter stringWriter = new StringWriter();
            Result result = new StreamResult(stringWriter);
            TransformerFactory factory = TransformerFactory.newInstance();
            Transformer transformer = factory.newTransformer();
            transformer.transform(source, result);
            return stringWriter.getBuffer().toString();
        } catch (TransformerConfigurationException e) {
            e.printStackTrace();
        } catch (TransformerException e) {
            e.printStackTrace();
        }
        return null;
    }    
    public static void doc2file(Node node, String path) {
        try {
            Source source = new DOMSource(node);
            File out = new File(path);            
            FileOutputStream fos = new FileOutputStream( out );
            OutputStreamWriter osw = new OutputStreamWriter( fos, Charset.forName("UTF-8").newEncoder() ); 
            Result result = new StreamResult(osw);
            TransformerFactory factory = TransformerFactory.newInstance();
            Transformer transformer = factory.newTransformer();
            transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
            transformer.transform(source, result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }    
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, SQLException 
    {  
        response.setContentType("application/json;charset=UTF-8"); //This is key. Also be sure to set the charset in the response content type BEFORE creating outputstream
        out = response.getOutputStream();  //This is key. Use this instead of PrintWriter 
        
        String CID = request.getParameter("callid");
        String upKey = request.getParameter("update");        
        String upValue = request.getParameter("updateto");
        writeIfDebug("Helo");
        writeIfDebug(upValue);
        //Create file if not exists
        String filePath = getServletContext().getRealPath("/")+"/xml/"+CID+".xml";
        File yourFile = new File( filePath );        
        if(!yourFile.exists()) {
            yourFile.createNewFile();
        }             

        //open a buffered input stream from the file, making sure to read it whilst minding the UTF8 encoding
        FileInputStream fis = new FileInputStream( yourFile );
        BufferedReader in = new BufferedReader(
		   new InputStreamReader(
                      new FileInputStream(yourFile), "UTF8"));
        Document doc = null;
        try{
            doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(fis);
            //DocumentBuilder.parse cannot use a BufferedReader as an InputSource...
            
            fis.close();
            if(upKey.equals("notes"))
            {
                NodeList wrapRoot = doc.getElementsByTagName(upKey);
                //Using the node "wrapstatus" as the base, get children and iterate through. We'll update the one according to what we've
                wrapRoot.item(0).setNodeValue(upValue);                    
            }
            else
            {
                NodeList wrapRoot = doc.getElementsByTagName("wrapstatus");
                //Using the node "wrapstatus" as the base, get children and iterate through. We'll update the one according to what we've
                NodeList childNodes = wrapRoot.item(0).getChildNodes();
                for (int i = 0; i != childNodes.getLength(); ++i)
                {
                    writeIfDebug("iterating child nodes");                    
                    Node child = childNodes.item(i);
                    writeIfDebug(child.getNodeName());
                    writeIfDebug(upKey);
                    /*
                    if (!(child instanceof Element))
                    {
                        writeIfDebug("Asuka "+upKey);
                        continue;
                    }
                    */  
                    if (child.getNodeName().equals(upKey))
                    {
                        writeIfDebug("NodeValue "+child.getFirstChild().getNodeValue()); //I believe it is right here that UTF8 charset is being lost
                        child.getFirstChild().setNodeValue(upValue) ;   
                        writeIfDebug("NodeValue new "+child.getFirstChild().getNodeValue());
                    }                        
                }                                  
            } 
            doc2file(doc, filePath);
        }catch(Exception e)
        {           
            writeIfDebug(e.getStackTrace().toString());
        }
        finally{
            writeIfDebug( xmlToString(doc) );
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

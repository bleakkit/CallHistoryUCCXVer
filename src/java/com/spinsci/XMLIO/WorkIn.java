package com.spinsci.XMLIO;
 
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.Reader;
import java.io.StringWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import org.xml.sax.Attributes;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;
import org.json.simple.*;
import org.apache.commons.lang3.exception.ExceptionUtils;
 

public class WorkIn extends HttpServlet
{
    public static ServletOutputStream out;
    public JSONObject outerJ;
    public JSONArray innerJ;
    public String rotatingKey = "NULL";
    public static boolean debugMode = false;
    
    public void writeIfDebug(String stateMent) throws IOException
    {        
        if(debugMode)
            out.println(stateMent);
    }
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, SQLException 
    {
    	try {
            //out = response.getWriter();
        outerJ = new JSONObject();
        innerJ = new JSONArray();
        response.setContentType("application/json;charset=UTF-8"); //This is key. Also be sure to set the charset in the response content type BEFORE creating outputstream
        out = response.getOutputStream();  //This is key. Use this instead of PrintWriter            
    	       
            SAXParserFactory factory = SAXParserFactory.newInstance();
    	      SAXParser saxParser = factory.newSAXParser();
 
    	      DefaultHandler handler = new DefaultHandler() {
 
    	        boolean bfname = false;
 
    	        public void startElement(String uri, String localName,
    	            String qName, Attributes attributes)
    	            throws SAXException {
                      try {
                          writeIfDebug("Start Element :" + qName);
                          rotatingKey = qName;
                      } catch (IOException ex) {
                          Logger.getLogger(NewClass.class.getName()).log(Level.SEVERE, null, ex);
                      }
 
    	          if (qName.equalsIgnoreCase("notes")) {
    	        	  bfname = true;
    	          }
 
    	        }
 
    	        public void endElement(String uri, String localName,
    	                String qName)
    	                throws SAXException {
                      try {
                          writeIfDebug("End Element :" + qName);
                      } catch (IOException ex) {
                          Logger.getLogger(NewClass.class.getName()).log(Level.SEVERE, null, ex);
                      }
 
    	        }
 
    	        public void characters(char ch[], int start, int length)
    	            throws SAXException {

    	          if (bfname) {
                      //if notes is an empty node written in shorthand i.e. <notes/> this will not work. it will include the next element as notes which will mess everything    
                      try {
                          JSONObject dirtyPair = new JSONObject();                          
                          writeIfDebug("BFCharacters: "+new String(ch, start, length));
                          dirtyPair.put(rotatingKey,new String(ch, start, length));
                          outerJ.put("notes",dirtyPair);
                            } catch (IOException ex) {
                                Logger.getLogger(NewClass.class.getName()).log(Level.SEVERE, null, ex);
                            }
    	            bfname = false;
    	          }
                  else
                  {
                      try {
                          writeIfDebug("Getting charsting for "+rotatingKey);
                          JSONObject dirtyPair = new JSONObject();                          
                          String oneString = new String(ch, start, length);
                          writeIfDebug("Characters: "+oneString);
                          dirtyPair.put(rotatingKey,oneString);
                          innerJ.add(dirtyPair);
                          writeIfDebug("Finished getting charsting for "+rotatingKey);
                      } catch (Exception ex) {
                          Logger.getLogger(NewClass.class.getName()).log(Level.SEVERE, null, ex);
                      }                      
                  }
                    try {
                        writeIfDebug(innerJ.toJSONString());
                    } catch (IOException ex) {
                        Logger.getLogger(NewClass.class.getName()).log(Level.SEVERE, null, ex);
                    }
 
    	        }
 
    	      };
 
              String CID = request.getParameter("callid");
              String filePath = getServletContext().getRealPath("/")+"/xml/"+CID+".xml";
              File file = new File( filePath );  
    	      InputStream inputStream= new FileInputStream(file);
    	      Reader reader = new InputStreamReader(inputStream,"UTF-8");
 
    	      InputSource is = new InputSource(reader);
    	      is.setEncoding("UTF-8");
 
    	      saxParser.parse(is, handler); //apparently SAX parser doesn't work right if XML isn't formtted pretty with proper linebreaks and indentation.
              outerJ.put("freeze",innerJ);
              out.println(outerJ.toJSONString());
              writeIfDebug(innerJ.toJSONString());
 
    	    } catch (Exception e) {              
              String exceptionalString = ExceptionUtils.getStackTrace(e); //Apache commons-lang-2.2.jar provides this class to write stack trace directly to a string
              writeIfDebug(exceptionalString);
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
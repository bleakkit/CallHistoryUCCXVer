package com.spinsci.XMLIO;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import javax.xml.parsers.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.*;

public class WriteFile {

    public void writeXmlFile(ArrayList<Object> list) {

        try {

            DocumentBuilderFactory dFact = DocumentBuilderFactory.newInstance();
            DocumentBuilder build = dFact.newDocumentBuilder();
            Document doc = build.newDocument();

            Element root = doc.createElement("Studentinfo");
            doc.appendChild(root);

            Element Details = doc.createElement("Details");
            root.appendChild(Details);


            for(int i=0; i<list.size(); i ++ ) {

                Element name = doc.createElement("Name");
                name.appendChild(doc.createTextNode(String.valueOf(list.get(i))));
                Details.appendChild(name);

                Element id = doc.createElement("ID");
                id.appendChild(doc.createTextNode(String.valueOf(list.get(i))));
                Details.appendChild(id);


                Element mmi = doc.createElement("Age");
                mmi.appendChild(doc.createTextNode(String.valueOf(list.get(i))));
                Details.appendChild(mmi);

            }


             // Save the document to the disk file
            TransformerFactory tranFactory = TransformerFactory.newInstance();
            Transformer aTransformer = tranFactory.newTransformer();

            // format the XML nicely
            aTransformer.setOutputProperty(OutputKeys.ENCODING, "ISO-8859-1");

            aTransformer.setOutputProperty(
                    "{http://xml.apache.org/xslt}indent-amount", "4");
            aTransformer.setOutputProperty(OutputKeys.INDENT, "yes");



            DOMSource source = new DOMSource(doc);
            try {
                FileWriter fos = new FileWriter("/home/ros.xml");
                StreamResult result = new StreamResult(fos);
                aTransformer.transform(source, result);

            } catch (IOException e) {

                e.printStackTrace();
            }



        } catch (TransformerException ex) {
            System.out.println("Error outputting document");

        } catch (ParserConfigurationException ex) {
            System.out.println("Error building document");
        }
    }
}
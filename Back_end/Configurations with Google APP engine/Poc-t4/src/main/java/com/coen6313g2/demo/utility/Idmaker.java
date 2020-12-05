package com.coen6313g2.demo.utility;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Base64.Decoder;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.util.ResourceUtils;



public class Idmaker {
	
	
	public  void getIdCard(String name, String profession, String proId) throws IOException
	{
		System.out.println("Inside the idd card aker");
		Resource resource = new ClassPathResource("idtemplate.PNG");

		InputStream input = resource.getInputStream();

		File file = resource.getFile();
		
		BufferedImage new_image = ImageIO.read(input);
		
		//BufferedImage new_image = read_img;
		
		
        Graphics2D  graphics;
		
		AlphaComposite alphaChannel = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 0.3f);
		//GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
		//ge.registerFont(Font.createFont(Font.TRUETYPE_FONT, new File("C:\\Users\\user\\Downloads\\Sacramento\\Sacramento-Regular.ttf")));
		
		graphics = new_image.createGraphics();
		graphics.setComposite(alphaChannel);
		graphics.setColor(Color.BLACK);
		int x = new_image.getHeight();
		System.out.println("the heigh is " + x);
		int y =new_image.getWidth();
		System.out.println("the widhth is " + y);
		Font font = new Font("Sacramento", Font.ITALIC, 42);
		//Font cusFont = Font.createFont(Font.TRUETYPE_FONT, new File("C:\\Users\\user\\Downloads\\Sacramento\\Sacramento-Regular.ttf")).deriveFont(84f);
		graphics.setFont(font);
		graphics.drawString(name, 160, 300);    ///width and height
		graphics.drawString(profession, 200, 390);  // second line
		graphics.drawString(proId, 220, 520);   //third line
			
		//ImageIO.write((RenderedImage) new_image, "jpg", by_outStr);
        System.out.println("writing a image");
       
        
        ByteArrayOutputStream  by_outStr =new ByteArrayOutputStream();
       
		
        ImageIO.write((RenderedImage) new_image, "png", new File("Tpest.png"));
        
//        ImageIO.write(new_image, "png", Base64.getEncoder().wrap(by_outStr));
//        System.out.println( by_outStr.toString(StandardCharsets.ISO_8859_1.name()));
        
        ImageIO.write((RenderedImage)new_image, "png", by_outStr);
        byte[] imageBytes = by_outStr.toByteArray();

        Base64.Encoder encoder = Base64.getEncoder();
        String imageString = encoder.encodeToString(imageBytes);
        System.out.println(imageString);
       
		
	}

	
	
	
	
	
	

}

package com.coen6313g2.demo.utility;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.rekognition.AmazonRekognition;
import com.amazonaws.services.rekognition.model.Attribute;
import com.amazonaws.services.rekognition.model.DetectFacesRequest;
import com.amazonaws.services.rekognition.model.DetectFacesResult;
import com.amazonaws.services.rekognition.model.Image;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.model.MessageAttributeValue;
import com.amazonaws.services.sns.model.PublishRequest;
import com.amazonaws.services.sns.model.PublishResult;
import com.coen6313g2.demo.config.AwsServBuilder;


public class CommonFun {
	

	@Autowired
	private com.coen6313g2.demo.config.AwsServBuilder awsServ;
	
		
	public void humanVerification(MultipartFile file)
	{
		
		AmazonRekognition rekogClientBuilder = awsServ.rekogClientBuilder();
		
		byte[] bytes = null;
		 try {
		        bytes = file.getBytes();
		    } catch (IOException e) {
		        System.err.println("Failed to load image: " + e.getMessage());
		        
		    }
		 ByteBuffer byteBuffer = ByteBuffer.wrap(bytes);
		
		DetectFacesRequest request = new DetectFacesRequest()
	            .withImage(new Image().withBytes(byteBuffer))
	            .withAttributes(Attribute.ALL);
	    DetectFacesResult result = rekogClientBuilder.detectFaces(request);
	    System.out.println(result.getFaceDetails().size());
	    
	    
		
		
	}
	
	public void sendingBookingConfirmation(String PhoneNum, String mesg)
	{
		AwsServBuilder servBuil = new AwsServBuilder();
		AmazonSNS snsClientBuilder = servBuil.snsClientBuilder();
		
		//snsClientBuilder.setRegion(Region.getRegion(Regions.US_WEST_2));
		
		
		
		String message = mesg;
        String phoneNumber = PhoneNum;
        Map<String, MessageAttributeValue> smsAttributes = 
                new HashMap<String, MessageAttributeValue>();
        //<set SMS attributes>
		
		PublishResult result = snsClientBuilder.publish(new PublishRequest()
                .withMessage(message)
                .withPhoneNumber(phoneNumber)
                .withMessageAttributes(smsAttributes));
	}
	
	
	public int dateSlasher(String strDate)
	{
		String date =strDate.substring(0, 2);
		//System.out.println(date);
		String monthe = strDate.substring(3,5);
		//System.out.println(monthe);
		String year = strDate.substring(6,10);
		//System.out.println(year);
		String finalDt = year+monthe+date;
		int parseInt = Integer.parseInt(finalDt);
		//System.out.println(finalDt);
		
		return parseInt;
		
				
	}

}

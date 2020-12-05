package com.coen6313g2.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.amazonaws.ClientConfiguration;
import com.amazonaws.Protocol;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.rekognition.AmazonRekognition;
import com.amazonaws.services.rekognition.AmazonRekognitionClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClient;
import com.amazonaws.services.sns.AmazonSNSClientBuilder;


@Service
public class AwsServBuilder {
	
	
	@Value("${com.coen.assg.aws_key}")
	private   String AWS_KEY;
	
	@Value("${com.coen.assg.aws_value}")
	private  String AWS_VALUE;
	
	
	public  String getAWS_KEY() {
		return AWS_KEY;
	}

	public void setAWS_KEY(String aWS_KEY) {
		AWS_KEY = aWS_KEY;
	}

	public  String getAWS_VALUE() {
		return AWS_VALUE;
	}

	public void setAWS_VALUE(String aWS_VALUE) {
		AWS_VALUE = aWS_VALUE;
	}
	
	
	public  AmazonS3 s3ClientBuilder()
	{
		 AWSCredentials credientials = new BasicAWSCredentials(AWS_KEY,AWS_VALUE);
		ClientConfiguration clientConfig = new ClientConfiguration();
	    clientConfig.setConnectionTimeout(30000);
	    clientConfig.setRequestTimeout(60000);
	    clientConfig.setProtocol(Protocol.HTTPS);
	    
	    System.out.println(AWS_KEY);
		return AmazonS3ClientBuilder
				.standard()
				 .withCredentials(new AWSStaticCredentialsProvider(credientials))
				 .withRegion(Regions.US_EAST_1)
				 .build();
	}
	
	public  AmazonRekognition rekogClientBuilder()
	{
		 AWSCredentials credientials = new BasicAWSCredentials(AWS_KEY,AWS_VALUE);
		ClientConfiguration clientConfig = new ClientConfiguration();
	    clientConfig.setConnectionTimeout(30000);
	    clientConfig.setRequestTimeout(60000);
	    clientConfig.setProtocol(Protocol.HTTPS);
	    
	    return AmazonRekognitionClientBuilder
		        .standard()
		        .withClientConfiguration(clientConfig)
		        .withCredentials(new AWSStaticCredentialsProvider(credientials))
		        .withRegion("eu-west-1")
		        .build();
		
	}
	
	
//	public AmazonSNS snsClientBuilder()
//	{
//		 AWSCredentials credientials = new BasicAWSCredentials("AKIASLVKOKS3RCQRIN5G","ZUIryGT+Tw2qmi274lng/F3b5rfyptoqdsLmx1Uk");
//			ClientConfiguration clientConfig = new ClientConfiguration();
//		    clientConfig.setConnectionTimeout(30000);
//		    clientConfig.setRequestTimeout(60000);
//		    clientConfig.setProtocol(Protocol.HTTPS);
//		    
//		    return AmazonSNSClientBuilder
//			        .standard()
//			        .withClientConfiguration(clientConfig)
//			        .withCredentials(new AWSStaticCredentialsProvider(credientials))
//			        .withRegion("eu-east-1")
//			        .build();
//		    
//		    
//		
//		
//	}
	
	public AmazonSNS snsClientBuilder()
	{
		 AWSCredentials credientials = new BasicAWSCredentials(AWS_KEY,AWS_VALUE);
			ClientConfiguration clientConfig = new ClientConfiguration();
		    clientConfig.setConnectionTimeout(30000);
		    clientConfig.setRequestTimeout(60000);
		    clientConfig.setProtocol(Protocol.HTTPS);
		    
		    return AmazonSNSClientBuilder
			        .standard()
			        .withClientConfiguration(clientConfig)
			        .withCredentials(new AWSStaticCredentialsProvider(credientials))
			        .withRegion("us-east-1")
			        .build();
		    
		    
		
		
	}
	
	
	public AmazonDynamoDB dynamoDBClientBuilder()
	{
		 AWSCredentials credientials = new BasicAWSCredentials(AWS_KEY,AWS_VALUE);
			ClientConfiguration clientConfig = new ClientConfiguration();
		    clientConfig.setConnectionTimeout(30000);
		    clientConfig.setRequestTimeout(60000);
		    clientConfig.setProtocol(Protocol.HTTPS);
		    
		    return AmazonDynamoDBClientBuilder
			        .standard()
			        .withClientConfiguration(clientConfig)
			        .withCredentials(new AWSStaticCredentialsProvider(credientials))
			        .withRegion("us-west-1")
			        .build();
		    
		    
		
		
	}
	

}

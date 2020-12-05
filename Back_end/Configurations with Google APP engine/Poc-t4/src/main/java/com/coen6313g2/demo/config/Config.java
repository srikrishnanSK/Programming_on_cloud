package com.coen6313g2.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;

@Configuration
public class Config {
	
	@Value("${com.matata.sans.aws_key}")
	private   String AWS_KEY;
	
	@Value("${com.matata.sans.aws_value}")
	private  String AWS_VALUE;
	
	@Value("${com.coen.test.aws_ddb_endpoint}")
	private  String DDB_ENDPOINT;
	
	@Value("${com.coen.test.aws.region}")
	private  String REGION;
	
	
	@Bean
	public DynamoDBMapper mapper()
	{
		return new DynamoDBMapper(amazonDBConfig());
	}
	
	
	public AmazonDynamoDB amazonDBConfig()
	{
		return AmazonDynamoDBClientBuilder.standard()
				.withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(DDB_ENDPOINT, REGION))
				.withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(AWS_KEY,AWS_VALUE)))
				.build();
	}
	

}


//com.matata.sans.aws_value =qx7pdrLT13on/owQaiGxJd3CkQyl05gL42RqEQyQ
//com.matata.sans.aws_key=AKIAWSP6RZGIK6VR6DFU


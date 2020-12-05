package com.coen6313g2.demo.utility;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.coen6313g2.demo.model.UserModel;


@Component
public class S3Operations {
	
	
	
	@Value("${com.poc.ff.s3.user.bucket}")
	private   String USERS_KEY;
	
	@Value("${com.poc.ff.s3.user.bucket}")
	private  String PROFESIONAL_KEY;
	

	@Autowired
	private com.coen6313g2.demo.config.AwsServBuilder awsServ;
	
	
	
	public void getFromS3(String bucketName, String key)
	{
		AmazonS3 s3ClientBuilder = awsServ.s3ClientBuilder();
	    S3Object object = s3ClientBuilder.getObject(bucketName,key);
		
		
	}
	
	
	public String getUrl(String bucketName, String key)
	{
		AmazonS3 s3ClientBuilder = awsServ.s3ClientBuilder();
		URL url = s3ClientBuilder.getUrl(bucketName, key);
		return url.toString();
	}
	
	
	public void putIntoS3(MultipartFile file) throws IOException
	{

		AmazonS3 s3ClientBuilder = awsServ.s3ClientBuilder();
		File convertFile = convertFile(file);
		
		PutObjectResult putObject = s3ClientBuilder.putObject("buck anme","file name",convertFile);
		System.out.println("Upload Success");
		
		
	}
	
	
	public String s3KeyGenUser(UserModel user,MultipartFile file)
	{
		String userId = user.getUserId();
		
		String finKey = USERS_KEY+"/"+userId+"/"+ file.getName();
		
		return finKey;
	}
	
	

	public void s3KeyGenProfes()
	{
		
	}
	
	
	public File convertFile(MultipartFile file) throws IOException
	{
		
		File converFile = new File(file.getOriginalFilename());
		converFile.createNewFile();
		FileOutputStream outputStream = new FileOutputStream(converFile);
		outputStream.write(file.getBytes());
		outputStream.close();
		return converFile;
	}
	
	

}

package com.coen6313g2.demo.repo;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.coen6313g2.demo.model.Address;
import com.coen6313g2.demo.model.MakeAppointment;
import com.coen6313g2.demo.model.Professional;
import com.coen6313g2.demo.model.UserModel;



@Repository
public class Repos {
	
	@Autowired
	private DynamoDBMapper mapper;
	
	public int insertInto(UserModel user)
	{
		
		mapper.save(user);
		
		return 0;
	}
	
	public int insertUpdated(UserModel user)
	{
		
		UserModel load = mapper.load(UserModel.class,user.getUserId());
		load.setAddress(user.getAddress());
		load.setEmail(user.getEmail());
		load.setFirstName(user.getFirstName());
		load.setLastName(user.getLastName());
		load.setCognitoId(user.getCognitoId());
		load.setGender(user.getGender());
		load.setTypeOfUser(user.getTypeOfUser());
		load.setMobileNumber(user.getMobileNumber());
		load.setImagebase64(user.getImagebase64());
		
		mapper.save(load);
		
		
		return 0;
	}
	
	
	
	public UserModel readFromDB(String userId)
	{
		UserModel load = mapper.load(UserModel.class, userId);
		return load;
	}
	
	
	
	public int addNewProfe(Professional pro)
	{
		mapper.save(pro);
		return 0;
		
	}
	
	
	public int addUpdateProfes(Professional pro)
	{
		Professional loadPro = mapper.load(Professional.class,pro.getProfessionalID());
		loadPro.setDaysAvailable(pro.getDaysAvailable());
		loadPro.setDescription(pro.getDescription());
		loadPro.setEmail(pro.getEmail());
		loadPro.setMobileNumber(pro.getMobileNumber());
		loadPro.setFirstName(pro.getFirstName());
		loadPro.setLastName(pro.getLastName());
		loadPro.setExperience(pro.getExperience());
		loadPro.setSecondarySkill(pro.getSecondarySkill());
		loadPro.setPrimarySkill(pro.getPrimarySkill());
		loadPro.setProfAddr(pro.getProfAddr());
		loadPro.setPayPerhr(pro.getPayPerhr());
		mapper.save(loadPro);
		
		return 0;
		
		
		
	}
	
	
	public MakeAppointment readFromDBProfess(String appId)
	{
		System.out.println("the appointment id is " + appId);
		MakeAppointment load = mapper.load(MakeAppointment.class,appId);
		System.out.println(load.toString());
		load.setAppointmentStatus("Confirmed");
		mapper.save(load);
		//System.out.println(load.toString());
		return load;
	}
	
	public MakeAppointment cancelAppointmentByProfes(String appId)
	{
		System.out.println("the appointment id is " + appId);
		MakeAppointment load = mapper.load(MakeAppointment.class,appId);
		System.out.println(load.toString());
		load.setAppointmentStatus("Cancelled");
		mapper.save(load);
		//System.out.println(load.toString());
		return load;
	}

	
	public Professional getProfessionalbyId(String proId)
	{
			
	Professional load = mapper.load(Professional.class,proId);
	return load;
		
	}
	
	public UserModel getDetails(String cognitoID)
	{	
		
		Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":val1", new AttributeValue().withS(cognitoID));


         DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
            .withFilterExpression("begins_with(cognitoId,:val1)").withExpressionAttributeValues(eav);


   PaginatedScanList<UserModel> scanResult = mapper.scan(UserModel.class, scanExpression);
   System.out.println(scanResult.size());
   UserModel um1 = new UserModel();
   
   if(scanResult.size()>0)
   {
	  for(UserModel um : scanResult)
	  {System.out.println(um.toString());
		  um1=um;
	  }
   }
   	return um1;
   
  
		
	}


	public Professional getDetailsPro(String cognitoID) {
		
		Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":val1", new AttributeValue().withS(cognitoID));


    DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
            .withFilterExpression("begins_with(cognitoId,:val1)").withExpressionAttributeValues(eav);


   PaginatedScanList<Professional> scanResult = mapper.scan(Professional.class, scanExpression);
   Professional pro1 = new Professional();
   
   if(scanResult.size()>0)
   {
	  for(Professional pr : scanResult)
	  {
		  pro1=pr;
	  }
   }
   	return pro1;
   
		
		
	}
	

}

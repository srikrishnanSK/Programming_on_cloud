package com.coen6313g2.demo.repo;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.coen6313g2.demo.model.MakeAppointment;


@Repository
public class AppointmentRepo {
	
	@Autowired
	private DynamoDBMapper mapper;
	
	
	public void insertInto(MakeAppointment appointment)
	{ 
		System.out.println("Inside the Appointment Repo");
		mapper.save(appointment);
	}
	
	public PaginatedScanList<MakeAppointment> getElements(String profID)
	{
	
		Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":val1", new AttributeValue().withS(profID.trim()));


    DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
            .withFilterExpression("begins_with(professonalId,:val1)").withExpressionAttributeValues(eav);


   PaginatedScanList<MakeAppointment> rel = mapper.scan(MakeAppointment.class, scanExpression);
   System.out.println(rel.size());

   
   return rel;
	
	}
	
	public PaginatedScanList<MakeAppointment> getElementsUser(String profID)
	{
		Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":val1", new AttributeValue().withS(profID));


    DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
            .withFilterExpression("begins_with(userId,:val1)").withExpressionAttributeValues(eav);


   PaginatedScanList<MakeAppointment> rel = mapper.scan(MakeAppointment.class, scanExpression);
   System.out.println(rel.size());
   
  
   
   return rel;
	
	}


}

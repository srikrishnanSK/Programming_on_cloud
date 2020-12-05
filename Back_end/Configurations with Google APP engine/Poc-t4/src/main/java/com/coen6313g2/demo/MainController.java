package com.coen6313g2.demo;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.coen6313g2.demo.model.MakeAppointment;
import com.coen6313g2.demo.model.Professional;
import com.coen6313g2.demo.model.UserModel;
import com.coen6313g2.demo.repo.AppointmentRepo;
import com.coen6313g2.demo.repo.Repos;
import com.coen6313g2.demo.utility.CommonFun;
import com.coen6313g2.demo.utility.Idmaker;
import com.coen6313g2.demo.utility.S3Operations;


@CrossOrigin(origins="*")
@RestController
public class MainController {
	
	@Autowired
	private Repos reppo;
	
	@Autowired
	private AppointmentRepo apntRepo;
	
	
	@Autowired
	private S3Operations s3Oper;
	
	@Autowired
	private MailServConfig notificationService;
	
	CommonFun com = new CommonFun();
	
	
	

	@RequestMapping(value="/tests",method=RequestMethod.GET)
	public String test01()
	{
		
		//MailServConfig  msg = new MailServConfig();
//		notificationService.sendEmail();
			return " ia m here";
	}
	
	@RequestMapping(value="/read", method=RequestMethod.GET)
	public UserModel readUsers() throws IOException
	{

//		Idmaker  ids  = new Idmaker();
//		ids.getIdCard();
		
		UserModel readFromDB = reppo.readFromDB("854d8b34-e931-4f09-871e-60eb64ea429c");
		
		//bookClass.sendingBookingConfirmation();
		System.out.println(readFromDB.toString());
		s3Oper.getFromS3("poc-ff-2020", "pocfUsers/AdobeStock_213490345_Preview.jpeg");
	   return readFromDB;

	}
	

	@RequestMapping(value="/insert", method=RequestMethod.POST)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public  ResponseEntity<String> insert(@RequestBody UserModel user)
	{
		System.out.println(user);
		int result = reppo.insertInto(user);
		String welMesg = "Welcome " + user.getFirstName() +" "+ "Please find the services You need at your door step";
		
		//notificationService.sendEmail(user.getEmail(),welMesg);
		com.sendingBookingConfirmation(user.getMobileNumber(), welMesg);
		return ResponseEntity.status(HttpStatus.OK)
		        .body("User has been added");
		
	}
	
	@RequestMapping(value="/insertUpdateUser", method=RequestMethod.POST)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public  ResponseEntity<String> insertUpdateUser(@RequestBody UserModel user)
	{
		System.out.println(user);
		int result = reppo.insertUpdated(user);
		return ResponseEntity.status(HttpStatus.OK)
		        .body("User has been Updated");
		
	}
	
	

	@RequestMapping(value="/addNewProf", method=RequestMethod.POST)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public ResponseEntity<String> insert(@RequestBody Professional pro)
	{
		System.out.println(pro);
		int result = reppo.addNewProfe(pro);
		String welMesg = "Welcome " + pro.getFirstName() +" "+ "to Click & Go. Make sure you update your skills properly";
		
		com.sendingBookingConfirmation(pro.getMobileNumber(), welMesg);
		//notificationService.sendEmail(pro.getEmail(),welMesg);
		return  ResponseEntity.status(HttpStatus.OK)
		        .body("Professional has been added");
		
	}
	
	@RequestMapping(value="/insertUpdateProf", method=RequestMethod.POST)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public ResponseEntity<String> insertUpdateProfes(@RequestBody Professional pro)
	{
		System.out.println(pro);
		int result = reppo.addUpdateProfes(pro);
		
		return  ResponseEntity.status(HttpStatus.OK)
		        .body("Professional has been added");
		
	}
	
	@RequestMapping(value="/makeAppointment", method=RequestMethod.POST)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public ResponseEntity<String> makeAppointments(@RequestBody MakeAppointment makapmt)
	{
		System.out.println(makapmt.toString());
		UserModel detailsUser = reppo.getDetails(makapmt.getUserId());
		makapmt.setUserAddress(detailsUser.getAddress());
		
		apntRepo.insertInto(makapmt);
		
		//UserModel details = reppo.getDetails(makapmt.getUserId());
		
		
		//com.sendingBookingConfirmation(makapmt.getProfessonalId());
		//UserModel detailsUser = reppo.getDetails(makapmt.getUserId());
		String emailMesg = "You have requested for the Service on " + makapmt.getAppointmentDate().toLowerCase() + "We will confirm you soon";
		com.sendingBookingConfirmation(detailsUser.getMobileNumber(), emailMesg);
		//notificationService.sendEmail(detailsUser.getEmail(),emailMesg);
		
		
		return ResponseEntity.status(HttpStatus.OK)
		        .body("Appointment has been Booked on " + makapmt.getAppointmentDate());
		
	}
	
	@RequestMapping(value="/getPastAppointments", method=RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public ArrayList<MakeAppointment> getPastAppointments(String proID,String typeOfUser) throws ParseException
	{
		ArrayList<MakeAppointment> arrayList= new ArrayList();
		
		Date dateToday = new Date();  
	    SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");  
	    String strDate = formatter.format(dateToday); 
	    
	    CommonFun comfun = new CommonFun();
	    int dateSlasher = comfun.dateSlasher(strDate);
	   
	    
		PaginatedScanList<MakeAppointment> elements = apntRepo.getElements(proID);
		
		for(MakeAppointment ma : elements)
		{
			int dateSlasher2 = comfun.dateSlasher(ma.getAppointmentDate());

			 
			 if(dateSlasher2<dateSlasher && ma.getAppointmentStatus().equals("Confirmed"))
			{
				 arrayList.add(ma);
			}
					
		}
		return arrayList;
		
	}
	
	@RequestMapping(value="/getUpcomingAppointments", method=RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public ArrayList<MakeAppointment> getUpcomingAppointments(String proId,String typeOfUser) throws ParseException
	{
		ArrayList<MakeAppointment> arrayList= new ArrayList();
		
		Date dateToday = new Date();  
	    SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");  
	    String strDate = formatter.format(dateToday); 
	   
	    
	    CommonFun comfun = new CommonFun();
	    int dateSlasher = comfun.dateSlasher(strDate);
; 
		PaginatedScanList<MakeAppointment> elements = apntRepo.getElements(proId);
		
		for(MakeAppointment ma : elements)
		{
			 	
			 int dateSlasher2 = comfun.dateSlasher(ma.getAppointmentDate());

			 
			 if(dateSlasher2>dateSlasher && ma.getAppointmentStatus().equals("Confirmed"))
			{
				 arrayList.add(ma);
			}
					
		}
		return arrayList;
		
			
	}
	
	@RequestMapping(value="/getPendingAppointments", method=RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public ArrayList<MakeAppointment> getPendingAppointments(String proId, String typeOfUser) throws ParseException
	{
		ArrayList<MakeAppointment> arrayList= new ArrayList();
		Date todayDate = new Date();
		//SimpleDateFormat sdfo = new SimpleDateFormat("yyyy-MM-dd"); 
		SimpleDateFormat sdfo = new SimpleDateFormat("MM-dd-yyyy"); 
		PaginatedScanList<MakeAppointment> elements = apntRepo.getElements(proId);
		
		for(MakeAppointment ma : elements)
		{
			
			if(ma.getAppointmentStatus().equals("Pending"))
			{
				 arrayList.add(ma);
			}
					
		}
		return arrayList;
		
			
	}
	
	@RequestMapping(value="/confirmAppByProfes", method=RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public  ResponseEntity<String> confirmAppointmentByProfes(String AppID)
	{
		MakeAppointment readFromDBProfess = (MakeAppointment) reppo.readFromDBProfess(AppID);
		UserModel detailsuser = reppo.getDetails(readFromDBProfess.getUserId());
		Professional professionalbyId =reppo.getProfessionalbyId(readFromDBProfess.getProfessonalId());
		
		String confMesg = "Hey " + detailsuser.getFirstName() + " Your appointment on "+ readFromDBProfess.getAppointmentDate() + "Please find the Professional details "+ professionalbyId.getMobileNumber() + " "+ professionalbyId.getEmail();
	    //notificationService.sendEmail(detailsuser.getEmail(),welMesg);
		com.sendingBookingConfirmation(detailsuser.getMobileNumber(), confMesg);
		
		String mesgToProfes = "Please find the details of user " + detailsuser.getMobileNumber() + " "+ detailsuser.getEmail() + " " + detailsuser.getAddress();
		com.sendingBookingConfirmation(professionalbyId.getMobileNumber(), mesgToProfes);
		
		return ResponseEntity.status(HttpStatus.OK)
		        .body("Appointment Confirmed");
	}
	

	@RequestMapping(value="/cancelAppByprofes", method=RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public  ResponseEntity<String> cancelAppointmentByProfes(String AppID, String ProfId)
	{
		MakeAppointment cancelAppointmentByProfes = reppo.cancelAppointmentByProfes(AppID);
		
		UserModel detailsuser = reppo.getDetails(cancelAppointmentByProfes.getUserId());
		Professional professionalbyId =reppo.getProfessionalbyId(cancelAppointmentByProfes.getProfessonalId());
		
		String confMesg = "Hey " + detailsuser.getFirstName() + " Your appointment on "+ cancelAppointmentByProfes.getAppointmentDate() + "has been cancelled by the Professional";
	   
		com.sendingBookingConfirmation(detailsuser.getMobileNumber(), confMesg);
		

		
		return ResponseEntity.status(HttpStatus.OK)
		        .body("Appointment Cancelled");
	}
	
	@RequestMapping(value="/cancelAppByUser", method=RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public  ResponseEntity<String> cancelAppointmentByUser(String AppID, String ProfId)
	{
		MakeAppointment cancelAppointmentByProfes = reppo.cancelAppointmentByProfes(AppID);
		
		UserModel detailsuser = reppo.getDetails(cancelAppointmentByProfes.getUserId());
		Professional professionalbyId =reppo.getProfessionalbyId(cancelAppointmentByProfes.getProfessonalId());
		
		String confMesg = "Hey " + professionalbyId.getFirstName() + " Your appointment on "+ cancelAppointmentByProfes.getAppointmentDate() + "has been cancelled by the User";
	   
		com.sendingBookingConfirmation(detailsuser.getMobileNumber(), confMesg);
		

		
		return ResponseEntity.status(HttpStatus.OK)
		        .body("Appointment Cancelled");
	}
	
	@RequestMapping(value="/getUserDetails", method=RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public ResponseEntity<UserModel> getDetailsUser(String cognitoId)
	{
		//	String userCogId
		UserModel details = reppo.getDetails(cognitoId);
		
		if(details.getUserId() !=null)
		{
			return ResponseEntity.status(HttpStatus.OK)
			        .body(details);
		}
		else
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			        .body(details);
		}
		
		
	}
	
	@RequestMapping(value="/getProfessDetails", method=RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public ResponseEntity<Professional> getDetailsProf(String profesCogId)
	{
		
		//String profesCogId
		Professional detailsPro = reppo.getDetailsPro(profesCogId);
		
		
		if(detailsPro.getProfessionalID()!=null)
		{
			return ResponseEntity.status(HttpStatus.OK)
			        .body(detailsPro);
		}
		else
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			        .body(detailsPro);
		}
		
	}
	
	@RequestMapping(value="/generateIdCard", method=RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public void GenerateIdCard(String cognitoId) throws IOException
	{
		Professional detailsPro = reppo.getDetailsPro(cognitoId);
		System.out.println(detailsPro.toString());
		Idmaker idmak = new Idmaker();
		
		String Name = detailsPro.getFirstName() + " "+ detailsPro.getLastName();
		String Profession = detailsPro.getPrimarySkill() + " "+ detailsPro.getSecondarySkill();
		String proId = detailsPro.getProfessionalID();
		
		idmak.getIdCard(Name, Profession, proId);
		
	}
	
	@RequestMapping(value="/userUpcomingAppointment", method=RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public ArrayList<MakeAppointment> userUpcomingAppo(String cognitoId) throws IOException, ParseException
	{
		UserModel details = reppo.getDetails(cognitoId);
		
		ArrayList<MakeAppointment> arrayList= new ArrayList();
		Date todayDate = new Date();
		SimpleDateFormat sdfo = new SimpleDateFormat("yyyy-MM-dd"); 
		PaginatedScanList<MakeAppointment> elements = apntRepo.getElementsUser(details.getUserId());
		
		for(MakeAppointment ma : elements)
		{
			 todayDate = sdfo.parse(sdfo.format(new Date()));		 
			 Date d1 = sdfo.parse(ma.getAppointmentDate()); 
			 
			 if(d1.after(todayDate)&&ma.getAppointmentStatus().equals("Confirmed"))
			{
				 arrayList.add(ma);
			}
					
		}
		return arrayList;
		
		
	}
	
	@RequestMapping(value="/userPendingAppointments", method=RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public ArrayList<MakeAppointment> getPendingAppoUser(String proId, String typeOfUser) throws ParseException
	{
		ArrayList<MakeAppointment> arrayList= new ArrayList();
		Date todayDate = new Date();
		SimpleDateFormat sdfo = new SimpleDateFormat("MM-dd-yyyy"); 
		PaginatedScanList<MakeAppointment> elements = apntRepo.getElementsUser(proId);
		
		for(MakeAppointment ma : elements)
		{
			
			if(ma.getAppointmentStatus().equals("Pending"))
			{
				 arrayList.add(ma);
			}
					
		}
		return arrayList;
		
			
	}
	
	@RequestMapping(value="/userUpcomingAppointments", method=RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public ArrayList<MakeAppointment> getUpcomingAppoiUser(String proId,String typeOfUser) throws ParseException
	{
		ArrayList<MakeAppointment> arrayList= new ArrayList();
		
		Date dateToday = new Date();  
	    SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");  
	    String strDate = formatter.format(dateToday); 
	   
	    
	    CommonFun comfun = new CommonFun();
	    int dateSlasher = comfun.dateSlasher(strDate);
; 
		PaginatedScanList<MakeAppointment> elements = apntRepo.getElementsUser(proId);
		
		for(MakeAppointment ma : elements)
		{
			 	
			 int dateSlasher2 = comfun.dateSlasher(ma.getAppointmentDate());

			 
			 if(dateSlasher2>dateSlasher && ma.getAppointmentStatus().equals("Confirmed"))
			{
				 arrayList.add(ma);
			}
					
		}
		return arrayList;
		
			
	}
	
	@RequestMapping(value="/userPastAppointments", method=RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
	public ArrayList<MakeAppointment> getPastAppoiUser(String proId,String typeOfUser) throws ParseException
	{
		ArrayList<MakeAppointment> arrayList= new ArrayList();
		
		Date dateToday = new Date();  
	    SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");  
	    String strDate = formatter.format(dateToday); 
	   
	    
	    CommonFun comfun = new CommonFun();
	    int dateSlasher = comfun.dateSlasher(strDate);
; 
		PaginatedScanList<MakeAppointment> elements = apntRepo.getElementsUser(proId);
		
		for(MakeAppointment ma : elements)
		{
			 	
			 int dateSlasher2 = comfun.dateSlasher(ma.getAppointmentDate());

			 
			 if(dateSlasher2<dateSlasher && ma.getAppointmentStatus().equals("Confirmed"))
			{
				 arrayList.add(ma);
			}
					
		}
		return arrayList;
		
			
	}

	
	
	
	
	
		
}
	
	

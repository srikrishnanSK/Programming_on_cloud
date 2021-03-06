package com.coen6313g2.demo.model;

import java.io.Serializable;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName="Appointments")
public class MakeAppointment implements Serializable {
	
	
	private String appointmentID;
	private String appointmentDate;
	private String appointmentTime;
	private String professonalId;
	private String userId;
	private String appointmentStatus;
	private String appointmentInfo;
	private String appointmentCheckIn;
	private String userAddress;
	

	
	
	@DynamoDBHashKey(attributeName="appointmentID")
	@DynamoDBAutoGeneratedKey
	public String getAppointmentID() {
		return appointmentID;
	}
	public void setAppointmentID(String appointmentID) {
		this.appointmentID = appointmentID;
	}
	
	@DynamoDBAttribute
	public String getAppointmentStatus() {
		return appointmentStatus;
	}
	public void setAppointmentStatus(String appointmentStatus) {
		this.appointmentStatus = appointmentStatus;
	}
	
	
	@DynamoDBAttribute
	public String getUserAddress() {
		return userAddress;
	}
	public void setUserAddress(String userAddress) {
		this.userAddress = userAddress;
	}
	@DynamoDBAttribute
	public String getAppointmentInfo() {
		return appointmentInfo;
	}
	public void setAppointmentInfo(String appointmentInfo) {
		this.appointmentInfo = appointmentInfo;
	}
	
	@DynamoDBAttribute
	public String getAppointmentCheckIn() {
		return appointmentCheckIn;
	}
	public void setAppointmentCheckIn(String appointmentCheckIn) {
		this.appointmentCheckIn = appointmentCheckIn;
	}
	
	@DynamoDBAttribute
	public String getAppointmentDate() {
		return appointmentDate;
	}
	public void setAppointmentDate(String appointmentDate) {
		this.appointmentDate = appointmentDate;
	}
	
	@DynamoDBAttribute
	public String getAppointmentTime() {
		return appointmentTime;
	}
	public void setAppointmentTime(String appointmentTime) {
		this.appointmentTime = appointmentTime;
	}
	
	@DynamoDBAttribute
	public String getProfessonalId() {
		return professonalId;
	}
	public void setProfessonalId(String professonalId) {
		this.professonalId = professonalId;
	}
	
	@DynamoDBAttribute
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	@Override
	public String toString() {
		return "MakeAppointment [appointmentDate=" + appointmentDate + ", appointmentTime=" + appointmentTime
				+ ", professonalId=" + professonalId + ", userId=" + userId + ", appointmentStatus=" + appointmentStatus
				+ ", appointmentInfo=" + appointmentInfo + ", appointmentCheckIn=" + appointmentCheckIn + "]";
	}
	
	
	
	
	
	
	

}

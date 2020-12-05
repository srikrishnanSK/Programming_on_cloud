package com.coen6313g2.demo.model;

import java.io.Serializable;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName="professional")
public class Professional implements Serializable{
	
	private String professionalid;
	private String cognitoId;
	
	private String firstName;
	private String lastName;
	private String mobileNumber;
	private String gender;
	private String experience;
	private String typeOfUser;
	private String description;
	private String email;
	
	private String profAddr;
	
	private String primarySkill;
	private String secondarySkill;
	
	private String payPerhr;
	
	private String daysAvailable;
	
	private String fullName;
	
	private String profileStatus;
	
	private String imagebase64;
	
	
	
	@DynamoDBAttribute
	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	@DynamoDBHashKey(attributeName="professionalid")
	@DynamoDBAutoGeneratedKey
	public String getProfessionalID() {
		return professionalid;
	}

	public void setProfessionalID(String professionalid) {
		this.professionalid = professionalid;
	}
	
	
	
	@DynamoDBAttribute
	public String getImagebase64() {
		return imagebase64;
	}

	public void setImagebase64(String imagebase64) {
		this.imagebase64 = imagebase64;
	}

	@DynamoDBAttribute
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@DynamoDBAttribute
	public String getCognitoId() {
		return cognitoId;
	}

	public void setCognitoId(String cognitoId) {
		this.cognitoId = cognitoId;
	}

	
	@DynamoDBAttribute
	public String getProfileStatus() {
		return profileStatus;
	}

	public void setProfileStatus(String profileStatus) {
		this.profileStatus = profileStatus;
	}

	@DynamoDBAttribute
	public String getProfAddr() {
		return profAddr;
	}

	public void setProfAddr(String profAddr) {
		this.profAddr = profAddr;
	}

	@DynamoDBAttribute
	public String getPrimarySkill() {
		return primarySkill;
	}

	public void setPrimarySkill(String primarySkill) {
		this.primarySkill = primarySkill;
	}

	@DynamoDBAttribute
	public String getSecondarySkill() {
		return secondarySkill;
	}

	public void setSecondarySkill(String secondarySkill) {
		this.secondarySkill = secondarySkill;
	}

	@DynamoDBAttribute
	public String getPayPerhr() {
		return payPerhr;
	}

	public void setPayPerhr(String payPerhr) {
		this.payPerhr = payPerhr;
	}

	

	@DynamoDBAttribute
	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	

	@DynamoDBAttribute
	public String getDaysAvailable() {
		return daysAvailable;
	}

	public void setDaysAvailable(String daysAvailable) {
		this.daysAvailable = daysAvailable;
	}


	@DynamoDBAttribute
	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@DynamoDBAttribute
	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	@DynamoDBAttribute
	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	@DynamoDBAttribute
	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	@DynamoDBAttribute
	public String getTypeOfUser() {
		return typeOfUser;
	}

	public void setTypeOfUser(String typeOfUser) {
		this.typeOfUser = typeOfUser;
	}

	@DynamoDBAttribute
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "Professional [professionalid=" + professionalid + ", cognitoId=" + cognitoId + ", firstName="
				+ firstName + ", lastName=" + lastName + ", mobileNumber=" + mobileNumber + ", gender=" + gender
				+ ", experience=" + experience + ", typeOfUser=" + typeOfUser + ", description=" + description
				+ ", email=" + email + ", profAddr=" + profAddr + ", primarySkill=" + primarySkill + ", secondarySkill="
				+ secondarySkill + ", payPerhr=" + payPerhr + ", daysAvailable=" + daysAvailable + ", fullName="
				+ fullName + ", profileStatus=" + profileStatus + "]";
	}

	

	
	
	

}

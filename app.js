const express = require("express")
const mongoose = require("mongoose")
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/myData", { useNewUrlParser:true, useUnifiedTopology: true})

const schema = new mongoose.Schema({
	PatientID: Number,
	Surname: String,
	Othernames: String,
	Gender: String,
	PhoneNumber: Number,
	ResidentialAdress: String,
	EmergencyName: String,
	Contact: String,
	Relationship: String
})

const Patient = mongoose.model("Patient", schema);
const patients = []
 

app.post('/register', async(req, res) => {
	const {
		PatientID,
		Surname,
		Othernames,
		Gender,
		PhoneNumber,
		ResidentialAdress,
		EmergencyName,
		Contact,
		Relationship
	} = req.body;

	try {
		const isPatientExisting = await Patient.findOne({ PatientID });
		if(isPatientExisting) {
			return res.status(400).json({error:"Patient Already exists"})
		}

		const newPatient = new Patient({
			PatientID,
			Surname,
			Othernames,
			Gender,
			PhoneNumber,
			ResidentialAdress,
			EmergencyName,
			Contact,
			Relationship
		})

		await newPatient.save();
		res.status(201).json({message: 'Patient registered successfully', patient: newPatient});
	} catch(error) {
		console.error(error);
		res.status(500).json({error: 'Internal Error'})
	}
});

app.post('/encouter', async (req, res) => {
	const {
		PatientID,
		dateAndTime,
		type
	} = req.body;

	try {
		const patient = await Patient.findOne({PatientID});
		if(!patient) {
			return res.status(404).json({error:"Patient not Found"})
		}

		const encouter = {
			PatientID,
			dateAndTime,
			type
		};

		res.status(201).json({message: "Enconter Started successfully", encouter})	
	} catch(error) {
		console.error(error);
		res.status(500).json({error: "Internal Error"})
	}
});

const PORT = 3000;
app.listen(PORT, ()=> {
	console.log("Server is running on port "+ PORT)
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { Jobs, JobDetails } = require('./models/jobs'); // Correct import
dotenv.config(); // Optional: Only if you want to use other environment variables

const app = express();

app.use(cors());
app.use(express.json());

// Hard-coded MongoDB URI
const mongoURI = `mongodb+srv://magiakshay98:CatDog@magiakshay.k3bhicf.mongodb.net/?retryWrites=true&w=majority&appName=MagiAkshay`;

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connection is open');
});

// Sending data to db

const addJobs = async () => {
  try {
    const jobDetail = new JobDetails({
      title: "Frontend Engineer",
      companyLogoUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
      companyWebsiteUrl: "https://about.facebook.com/",
      rating: 4,
      location: "Delhi",
      packagePerAnnum: "15 LPA",
      jobDescription: "The Experimentation Platform team builds internal tools with a big impact across the company. We are looking to add a UI engineer to our team to continue to improve our experiment analysis workflow and tools. Ideal candidates will be excited by direct contact with our users, fast feedback, and quick iteration.",
      employmentType: "Part Time", 
      skills: [
        {
          name: "HTML 5",
          imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/html-img.png"
        },
        {
          name: "CSS 3",
          imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/css-img.png"
        },
        {
          name: "Javascript",
          imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/javascript-img.png"
        },
        {
          name: "React JS",
          imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/reactjs-img.png"
        },
        {
          name: "Redux",
          imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/redux-img.png"
        }
      ],
      lifeAtCompany: {
        description: "Our core philosophy is people over process. Our culture has been instrumental to our success. It has helped us attract and retain stunning colleagues, making work here more satisfying. Entertainment, like friendship, is a fundamental human need, and it changes how we feel and gives us common ground. We want to entertain the world.",
        imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/life-facebook-img.png"
      }
    });

    const savedJobDetail = await jobDetail.save();
    console.log('JobDetails saved:', savedJobDetail);

    // Create and save a Job document that uses the same _id as the JobDetail
    const job = new Jobs({
      _id: savedJobDetail._id, // Use the same _id as the JobDetail
      title: "Frontend Engineer",
      companyLogoUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
      companyWebsiteUrl: "https://about.facebook.com/", // Missing in original job creation
      rating: 4,
      location: "Delhi",
      packagePerAnnum: "15 LPA",
      jobDescription: "The Experimentation Platform team builds internal tools with a big impact across the company. We are looking to add a UI engineer to our team to continue to improve our experiment analysis workflow and tools. Ideal candidates will be excited by direct contact with our users, fast feedback, and quick iteration.",
      employmentType: "Part Time",
    });

    const savedJob = await job.save();
    console.log('Job saved:', savedJob);
    
    await mongoose.disconnect();  
  } catch (e) {
    console.error('Error saving job details:', e);
  }
};

// Uncomment the following line to add jobs to the database
addJobs()

app.use('/auth', require('./routes/authRoutes')); // For handling auth routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

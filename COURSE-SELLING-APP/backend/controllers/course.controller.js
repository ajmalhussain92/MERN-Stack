import { Course } from "../models/course.model.js";   // Always include '.js' extension
import { v2 as cloudinary } from "cloudinary";

// Create A New Course
export const createCourse = async (req, res) => {
  // console.log("Course created");
  // const title=req.body.title;
  // const description=req.body.description;
  // const price=req.body.price;
  // const image=req.body.image;

  const {title, description, price} = req.body;

  console.log(title,description,price);   // debug

  try {
    if (!title || !description || !price) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    const {image} = req.files;
    if (!req.files || Object.keys(req.files).length === 0){
      return res.status(400).json({ errors: "No file uploaded" });
    }

    const allowedFormat = ["image/png","image/jpeg"];
    if (!allowedFormat.includes(image.mimetype)){
      return res.status(400).json({ errors: "Invalid file format. Only PNG and JPEG are allowed!" });
    }

    // Cloudinary Upload (Image)
    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
    if (!cloud_response || cloud_response.error) {
      return res.status(400).json({ errors: "Failed to upload image to Cloudinary"});
    }

    const courseData = {
      title,
      description,
      price,
      image: {
        url: cloud_response.secure_url,
        public_id: cloud_response.public_id
      }
    };

    // Save to MongoDB
    const course = await Course.create(courseData);
    res.json({
      message: "Course created successfully",
      course
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Error creating course" });
  }
};

// Update Course
export const updateCourse = async (req, res) => {
  const {courseId} = req.params;
  const {title, description, price, image} = req.body;
  try {
    const course = await Course.updateOne({
      _id: courseId
    }, {
      title,
      description,
      price,
      image: {
        public_id: image?.public_id,
        url: image?.url,
      }
    });
    res.status(201).json({message: "Course updated successfully!"});
  } catch (error) {
    console.log("Error in course updation", error);
    res.status(500).json({ errors: "Error updating course" });
  }
};

// Delete Course
export const deleteCourse = async (req, res) => {
  const {courseId} = req.params;

  try {
    const course = await Course.findOneAndDelete({
      _id: courseId,
    });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    };
    res.status(201).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({errors: "Error in course deletion!"})
    console.log("Error in course deletion!", error);
  }
};

// Show All Courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({errors: "Error in getting courses!"});
    console.log("Error in getting courses!", error);
  }
};

// Show a Particular Course
export const getCourse = async (req, res) => {
  try {
    const {courseId} = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({errors: "Error in getting the course"});
    console.log("Error in getting the course", error);
  }
}
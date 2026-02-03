import express from "express";
import { createCourse, deleteCourse, getAllCourses, getCourse, updateCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.post("/create", createCourse);
router.put("/update/:courseId", updateCourse);
router.delete("/delete/:courseId", deleteCourse);
router.get("/courses", getAllCourses);
router.get("/:courseId", getCourse);

export default router;
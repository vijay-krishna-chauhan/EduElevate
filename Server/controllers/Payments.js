const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

//capture the payment and initiate the razorpay order
exports.capturePayment = async (req, res) => {
  //get courseId and userId
  const { courseId } = req.body;
  const userId = req.user.id;

  //validation
  //valid courseId
  if (!courseId) {
    return res.json({
      success: false,
      message: "Please provide valid course id",
    });
  }
  //valid coursedetails
  let course;
  try {
    course = await Course.findById(courseId);
    if (!course) {
      return res.json({
        success: false,
        message: "Could not find the course",
      });
    }

    //user already pay for the same course
    //const uid = new mongoose.Types.ObjectId(userId); //string id is converted to object id.
    const uid = mongoose.Types.ObjectId(userId); //string id is converted to object id.
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: err.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Please provide valid course id",
    });
  }

  //order create
  const amount = course.price;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      courseId: courseId,
      userId,
    },
  };

  try {
    //initiate the payment using razorpay
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    //return response
    return res.status(200).json({
      success: true,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "could not initiate order",
    });
  }
};

//verify signature of razorpay and server

exports.verifySignature = async (req, res) => {
  const webhookSecret = "12345678";

  const signature = req.headers("x-razorpay-signature");
  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("payment is authorised");

    const { courseId, userId } = req.body.payload.payment.entity.notes;

    try {
      //fulfill the action
      //find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not found",
        });
      }
      console.log(enrolledCourse);

      //find the student and add the course to the list of enrolled course
      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );

      console.log(enrolledStudent);

      //send the confirmatiion mail

      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulations to the EduElevate",
        "Congratulations, you are onboarded into the EduElevate new Course"
      );

      console.log(emailResponse);
      return res.status(200).json({
        success: true,
        message: "Signature verified and course added",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }
};

import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";

import Banner from "../assets/Images/banner.mp4";
import CodeBlock from "../components/core/HomePage/CodeBlock";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
function Home() {
  return (
    <div className="">
      {/* Section 1 */}
      <div className="flex mx-auto relative flex-col text-white w-11/12 items-center justify-between">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold hover:scale-95 transition-all duration-200 w-fit max-w-maxContent">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-3xl md:text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={"Coding Skills"}></HighlightText>
        </div>

        <div className="mt-4 w-[90%] text-left md:text-center md:text-lg text-sm font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkTo={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkTo={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* code section 1 */}
        <div className="">
          <CodeBlock
            position={"lg:flex-row"}
            heading={
              <div className="font-semibold text-2xl lg:text-4xl sm:w-full">
                Unlock your
                <HighlightText text={"coding potential "}></HighlightText>
                with our online courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              active: true,
              linkTo: "/signup",
            }}
            ctabtn2={{
              btnText: "Learn More",
              active: false,
              linkTo: "/login",
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>\n</nav>\n</body>`}
            codecolor={"text-yellow-25"}
            backgroudGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* code section 2 */}
        <div className="">
          <CodeBlock
            position={"lg:flex-row-reverse"}
            heading={
              <div className="font-semibold text-2xl lg:text-4xl sm:w-full">
                Start
                <HighlightText text={"coding in seconds "}></HighlightText>
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              active: true,
              linkTo: "/signup",
            }}
            ctabtn2={{
              btnText: "Learn More",
              active: false,
              linkTo: "/login",
            }}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            codecolor={"text-yellow-25"}
            backgroudGradient={<div className="grad absolute"></div>}
          />
        </div>
        <ExploreMore/>
      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 justify-between mx-auto lg:mt-40">
            <div className="h-[150px]"></div>

            <div className="flex flex-row gap-7 text-white">
              <CTAButton active={true} linkTo={"/signup"}>
                <div className="items-center gap-3 flex">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkTo={"/signup"}>
                <div>Learn more</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          
          <div className="flex flex-row gap-5 mb-10 mt-[95px]">
            <div className="text-4xl font-semibold w-[45%]">
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>

            <div className="flex flex-col gap-10 w-[40%] items-start">
            <div className="text-[16px]">
            The modern StudyNotion is the dictates its own terms. Today, to be a
            competitive specialist requires more than professional skills.
            </div>
            <CTAButton active={true} linkTo={"/signup"}>
            Learn more</CTAButton>
          
          </div>
          
          </div>
          <TimelineSection/>
          <LearningLanguageSection/>
        </div>

        
      </div>

      {/* Setion 3 */}
      <div className="flex flex-col justify-between w-11/12 mx-auto max-w-maxContent gap-8 first-letter:bg-richblack-400 text-white">
      <InstructorSection/>

      <h2 className="text-center text-4xl font-semibold my-10">Review from other learners</h2>
      </div>
    </div>
  );
}

export default Home;

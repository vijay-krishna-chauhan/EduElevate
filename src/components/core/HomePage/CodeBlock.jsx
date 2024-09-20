import React from "react";
import CTAButton from "./CTAButton";
import HighlightText from "./HighlightText";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

function CodeBlock({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  
  codecolor,
  backgroundGradient,
}) {
  return (
    // <div>
    //     <div>Unlock your
    //         <HighlightText text={"coding potential "}></HighlightText>
    //          with our online courses.
    //     </div>
    //     <div className="mt-4 text-left md:text-center text-sm font-bold text-richblack-300">
    //     Our courses are designed and taught by
    //      industry experts who have years of experience in
    //     coding and are passionate about sharing their knowledge with you.
    //     </div>

    //     <div>
    //         <div>
    //         <CTAButton active={true} >Try it Yourself  <FaArrowRight/></CTAButton>
    //         <CTAButton active={false}></CTAButton>
    //         </div>
    //     </div>
    // </div>

    <div className={`flex ${position} my-20 justify-between gap-10 flex-wrap`}>
      {/* section 1 */}
      <div className=" flex flex-col gap-8 lg:w-[50%] p-4">
        {heading}
        <div className="text-richblack-300 font-bold text-sm p-2 md:text-lg">
          {subheading}
        </div>

        <div className="flex gap-7 mt-7 p-2">
          <CTAButton active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 :code block */}
                               {/*  below line code try lg:w-[50%]*/}
      <div className="h-fit glass3 flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">          {/* BG Gradient */}
          {backgroundGradient}
          <div className="flex flex-col text w-[10%] text-richblack-400 font-inter font-bold">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
          </div>

          <div className={`flex flex-col gap-2 w-[90%] font-bold font-mono ${codecolor} pr-2`}>
            <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}

            style = {
              {
                  whiteSpace: "pre-line",
                  display:"block",
                  overflowX:"hidden",
                  fontSize:"16px",
              }
          }
          omitDeletionAnimation={true}
            />
          </div>
        </div>
 




    </div>
  );
}

export default CodeBlock;

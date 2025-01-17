import React from "react";

const Heading = ({
  children,
  subtitle,
  align = "center",
  color = "#1a1a1a",
  highlightColor = "#FF0000",
  maxWidth = "800px",
  subtitleColor = "#666",
  maxWidthsubtitle = "600px",
  className,
}) => {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const wrapperClasses = `flex flex-col ${alignmentClasses[align]} ${
    className || ""
  } mb-8`;

  const headingClasses = `
    text-[1.4rem] md:text-[2.1em]
    font-extrabold
    leading-tight md:leading-normal
    tracking-normal
    w-full
    m-0 p-0
    md:p-0 md:text-${align}
    ${maxWidth ? `max-w-[${maxWidth}]` : ""}
  `;

  const subtitleClasses = `
    text-[0.9rem]
    font-normal
    leading-relaxed md:leading-normal
    m-0 mt-[0.2rem] p-0
    md:text-[0.95rem] md:p-0 md:text-${align}
    ${maxWidthsubtitle ? `max-w-[${maxWidthsubtitle}]` : ""}
  `;

  return (
    <div className={wrapperClasses}>
      <h2 className={headingClasses} style={{ color: color }}>
        {typeof children === "string"
          ? children
              .split(" ")
              .map((word, index) => (
                <span key={index}>
                  {word.includes("::highlight::") ? (
                    <span style={{ color: highlightColor }}>
                      {word.replace("::highlight::", "")}
                    </span>
                  ) : (
                    word + " "
                  )}
                </span>
              ))
          : children}
      </h2>
      {subtitle && (
        <p className={subtitleClasses} style={{ color: subtitleColor }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Heading;

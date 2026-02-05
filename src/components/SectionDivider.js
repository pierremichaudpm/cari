import React from "react";

/**
 * Soft wave divider between sections.
 * @param {string} fillColor - The color of the wave (should match the NEXT section's background)
 * @param {boolean} flip - Flip vertically for bottom-of-section usage
 */
const SectionDivider = ({ fillColor = "#ffffff", flip = false }) => {
  return (
    <div
      className={`section-divider ${flip ? "section-divider-flip" : ""}`}
      style={{ backgroundColor: "transparent" }}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 C360,50 1080,50 1440,0 L1440,60 L0,60 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

export default SectionDivider;

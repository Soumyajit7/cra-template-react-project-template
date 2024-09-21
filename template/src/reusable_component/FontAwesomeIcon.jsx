import React from "react";
import PropTypes from "prop-types";
import "../assets/css/fontAwesome.css";
import fontAwesome_Unicode from "../assets/fontAwesome_Unicode";

const FontAwesomeIcon = ({ icon, size = 16, color = "black", style = {} }) => {
  // Define font mappings
  const fontMappings = {
    "fa-solid": "FontAwesome6-Solid",
    "fa-regular": "FontAwesome6-Regular",
    "fa-light": "FontAwesome6-Light",
    "fa-duotone": "FontAwesome6-Duotone",
    "fa-thin": "FontAwesome6-Thin",
    "fa-brands": "FontAwesome6-Brands",
    "fa-sharp fa-light": "FontAwesome6-SharpLight",
    "fa-sharp fa-regular": "FontAwesome6-SharpRegular",
    "fa-sharp fa-solid": "FontAwesome6-SharpSolid",
    "fa-sharp fa-thin": "FontAwesome6-SharpThin",
  };

  const getIconUnicode = (iconName) => {
    const iconMap = fontAwesome_Unicode;
    const baseIcon = iconName.split(" ").pop();
    return iconMap[baseIcon] || "";
  };

  const getFontFamily = (iconName) => {
    for (const prefix in fontMappings) {
      if (iconName.startsWith(prefix)) {
        return fontMappings[prefix];
      }
    }
    return fontMappings["fa-regular"];
  };

  const iconUnicode = getIconUnicode(icon);
  if (!iconUnicode) {
    console.error(`ERROR: icon not found for icon = ${icon}`);
    return null;
  }

  if (icon.startsWith("fa-duotone")) {
    return (
      <span style={{ position: "relative", ...style }}>
        <span
          style={{
            fontSize: size,
            color,
            fontFamily: getFontFamily(icon),
            opacity: 0.4,
            position: "absolute",
            zIndex: 1,
          }}
        >
          {iconUnicode}
        </span>
        <span
          style={{
            fontSize: size,
            color,
            fontFamily: "FontAwesome6-Solid",
            position: "absolute",
            zIndex: 0,
          }}
        >
          {iconUnicode}
        </span>
      </span>
    );
  }

  return (
    <span
      style={{
        fontSize: size,
        color,
        fontFamily: getFontFamily(icon),
        ...style,
      }}
    >
      {iconUnicode}
    </span>
  );
};

FontAwesomeIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
};

export default FontAwesomeIcon;

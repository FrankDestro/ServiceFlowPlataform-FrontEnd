import { type IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Bars } from "react-loader-spinner";
import "./button.css";

type Props = {
  text: string;
  icon?: IconProp;
  background?: string;
  hoverColor?: string;
  size?: "small" | "medium" | "large";
  borderRadius?: string;
  height?: string;
  width?: string;
  type?: "submit" | "reset" | "button" | undefined;
  isLoading?: boolean;
  color?: string;
  fontWeight?: string;
  fontSize?: string;
  className?: string;
  onClick?: () => void;
};

function Button({
  text,
  icon,
  color,
  background,
  className,
  hoverColor,
  size = "small",
  borderRadius = "12px",
  height = "auto",
  width = "auto",
  type = "button",
  isLoading = false,
  fontWeight = "",
  fontSize = "",
  onClick,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`button-container ${size} ${className ?? ""}`}
      type={type}
      style={{
        background: isHovered && hoverColor ? hoverColor : background,
        borderRadius,
        height,
        width,
        color,
        fontWeight,
        fontSize,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="container-spiner-button-login">
          <Bars
            visible={true}
            height="30"
            width="30"
            color="white"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass="oval-spinner"
          />
          <span>Logando...</span>
        </div>
      ) : (
        <>
          {icon && (
            <FontAwesomeIcon icon={icon} style={{ marginRight: "8px" }} />
          )}
          {text}
        </>
      )}
    </button>
  );
}

export default Button;

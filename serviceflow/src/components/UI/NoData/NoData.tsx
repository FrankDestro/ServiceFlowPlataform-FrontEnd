// NoData.js
import { type IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Empty } from "antd";
import React from "react";

interface NoDataProps {
  icon?: IconDefinition; 
  message?: string;
}

const NoData: React.FC<NoDataProps> = ({ message = "Nenhum dado disponível" }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <Empty description={message} />
    </div>
  );
};

export default NoData;

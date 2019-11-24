import React from "react";

const ContatoShow = ({record}) => {
  return (
    <p style={{fontSize: '16px', lineHeight: '24px'}}>{record.mensagem}</p>
        );
};

export default ContatoShow;

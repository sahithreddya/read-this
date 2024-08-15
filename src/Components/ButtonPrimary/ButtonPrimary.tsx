import { useState } from 'react';
import './ButtonPrimary.scss';
// import { useEffect, useState } from "react";

interface ButtonProps {
    type: 'primary' | 'secondary';
    label: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: any;
}

function ButtonPrimary({ label, type, disabled=false, onClick, loading=false}: ButtonProps) {

    // const [isLoading, setIsLoading] = useState(loading);

    return (
        <button  className={`${(type=='primary') ? 'buttonStyle' : 'buttonStyleSecondary'} ${loading ? 'loading' : ''} `} disabled={disabled} onClick={onClick ? onClick : null}>
        {loading ? <span>Loading...</span> : <span>{label}</span>}
      </button>
    );
}

export default ButtonPrimary;

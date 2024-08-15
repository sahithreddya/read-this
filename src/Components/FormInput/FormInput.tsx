import './FormInput.scss';
import { useEffect, useState } from "react";

interface FormInputProps {
    title?: string;
    type: 'text' | 'password';
    placeholder?: string;
    setValue: any
}

const FormInput = ({ title, type, placeholder='', setValue}: FormInputProps) => {
    const [userValue, setUserValue=setValue] = useState('')

    return (
        <div className='inputContainer'>
            <p className='inputTitle'>{title}</p>
            <input
                className="inputField"
                type={type}
                placeholder={placeholder}
                value={userValue}
                required={true}
                onChange={(e) => {setUserValue(e.target.value); setValue(e.target.value);}}
            />
        </div>
    );
}

export default FormInput;

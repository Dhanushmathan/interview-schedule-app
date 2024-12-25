import PropTypes from 'prop-types';

const FormInput = ({ label, name, type = "text", placeholder, register, error }) => {
    return (
        <div className='space-y-1'>
            <label htmlFor={name}>{label}</label>
            <input type={type} id={name} name={name} placeholder={placeholder} {...register} className='px-4 py-2 bg-gray-200 rounded outline-none w-full' />
            {error && <span className='text-red-500 font-semibold'>{error.message}</span>}
        </div>
    )
};

FormInput.propTyps = {
    type: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    register: PropTypes.object.isRequired,
    error: PropTypes.object,
};

export default FormInput;